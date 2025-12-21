import React, { useState, useEffect } from "react";
import { Send, User, MessageSquare, Quote } from "lucide-react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { trackEvent } from "../utils/analytics";

interface GuestMessage {
  id: string;
  name: string;
  message: string;
  date: string;
  timestamp: number;
}

export const Guestbook: React.FC = () => {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load messages from Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: GuestMessage[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        msgs.push({
          id: doc.id,
          name: data.name,
          message: data.message,
          date: new Date(data.timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          timestamp: data.timestamp,
        });
      });
      setMessages(msgs);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "guestbook"), {
        name: name.trim(),
        message: message.trim(),
        timestamp: Date.now(),
      });

      setName("");
      setMessage("");
    } catch (error) {
      console.error("Error adding message:", error);
      alert("Failed to post message. Please try again.");
    } finally {
      trackEvent("guestbook_sign", {
        category: "Engagement",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden">
      <div className="p-6 bg-stone-50 border-b border-stone-100">
        <h3 className="font-serif text-2xl text-navy-900 font-semibold flex items-center">
          <MessageSquare className="w-5 h-5 mr-3 text-gold-500" />
          Guestbook
        </h3>
        <p className="text-stone-600 mt-1 text-sm">
          Share a memory or leave a message for the family.
        </p>
      </div>

      <div className="p-6">
        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-10 rounded-lg border border-stone-100 shadow-sm"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-1"
            >
              Your Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-stone-400" />
              </div>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-stone-300 rounded-md leading-5 bg-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-navy-900 focus:border-navy-900 sm:text-sm"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="block w-full p-3 border border-stone-300 rounded-md leading-5 bg-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-navy-900 focus:border-navy-900 sm:text-sm resize-none"
              placeholder="Share your memory..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-navy-900 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-900 transition-all ${
              isSubmitting
                ? "opacity-80"
                : "shadow-md active:transform active:scale-95"
            }`}
          >
            {isSubmitting ? (
              "Posting..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Sign Guestbook
              </>
            )}
          </button>
        </form>

        {/* Message List */}
        <div className="space-y-8">
          {isLoading && (
            <div className="text-center text-stone-400 py-8">
              Loading messages...
            </div>
          )}
          {!isLoading && messages.length === 0 && (
            <div className="text-center text-stone-400 py-8">
              No messages yet. Be the first to sign the guestbook.
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="relative pl-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              {/* Vertical line deco */}
              <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-gold-500 opacity-30 rounded-full"></div>

              <div className="flex justify-between items-baseline mb-2">
                <h4 className="font-bold text-navy-900 text-base">
                  {msg.name}
                </h4>
                <span className="text-xs text-stone-400 uppercase tracking-wider">
                  {msg.date}
                </span>
              </div>

              <div className="relative">
                <Quote className="absolute -left-1 -top-1 w-3 h-3 text-stone-300 transform -scale-x-100" />
                <p className="text-stone-600 text-sm leading-relaxed italic pl-3">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
