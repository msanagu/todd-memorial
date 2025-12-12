import React, { useState } from "react";
import {
  Bell,
  CheckCircle,
  Smartphone,
  Users,
  CalendarCheck,
} from "lucide-react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export const RSVPForm: React.FC = () => {
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "1",
    attending: "yes",
    subscribeToUpdates: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);

    try {
      // Save RSVP to Firebase
      await addDoc(collection(db, "rsvps"), {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        guests: formData.guests,
        attending: formData.attending,
        subscribeToUpdates: formData.subscribeToUpdates,
        timestamp: Date.now(),
      });

      // Send confirmation SMS if opted in
      if (formData.subscribeToUpdates) {
        try {
          await fetch("/.netlify/functions/send-rsvp-sms", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name.trim(),
              phone: formData.phone.trim(),
              attending: formData.attending,
            }),
          });
        } catch (smsError) {
          console.error("SMS sending failed:", smsError);
          // Don't block RSVP success if SMS fails
        }
      }

      setStep("success");
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      alert("Failed to submit RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "success") {
    return (
      <div className="bg-white rounded-xl shadow-lg border-l-4 border-gold-500 p-8 mb-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-xl font-serif text-navy-900 font-bold mb-2">
          Thank you, {formData.name.split(" ")[0]}
        </h3>
        <p className="text-stone-600 mb-4">
          We have received your RSVP.
          {formData.subscribeToUpdates && (
            <span className="block mt-2 text-sm font-medium text-navy-900">
              You will receive text updates at {formData.phone} regarding
              parking or schedule changes.
            </span>
          )}
        </p>
        <button
          onClick={() => setStep("form")}
          className="text-gold-500 text-sm hover:text-navy-900 underline underline-offset-4"
        >
          Register another guest
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden mb-8">
      <div className="bg-navy-900 p-6 text-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-gold-500 rounded-full opacity-20 blur-xl"></div>

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <h3 className="font-serif text-2xl font-semibold flex items-center">
              <CalendarCheck className="w-5 h-5 mr-3 text-gold-500" />
              RSVP & Updates
            </h3>
            <p className="text-stone-300 mt-2 text-sm max-w-sm">
              Please let the family know if you will attend. Opt-in for text
              updates to receive real-time notifications about parking or
              schedule changes.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="rsvp-name"
              className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="rsvp-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="block w-full p-3 border border-stone-300 rounded-md bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-navy-900 focus:border-navy-900 transition-colors"
              placeholder="e.g. Jane Doe"
              required
            />
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="rsvp-phone"
              className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-1"
            >
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Smartphone className="h-4 w-4 text-stone-400" />
              </div>
              <input
                type="tel"
                id="rsvp-phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="block w-full pl-10 pr-3 p-3 border border-stone-300 rounded-md bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-navy-900 focus:border-navy-900 transition-colors"
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Attending Selection */}
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">
              Will you be attending?
            </label>
            <div className="flex space-x-4">
              <label
                className={`flex-1 cursor-pointer border rounded-md p-3 flex items-center justify-center transition-all ${
                  formData.attending === "yes"
                    ? "bg-navy-900 border-navy-900 text-white shadow-md"
                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={formData.attending === "yes"}
                  onChange={(e) =>
                    setFormData({ ...formData, attending: e.target.value })
                  }
                  className="sr-only"
                />
                <span className="font-medium">Yes, attending</span>
              </label>
              <label
                className={`flex-1 cursor-pointer border rounded-md p-3 flex items-center justify-center transition-all ${
                  formData.attending === "no"
                    ? "bg-stone-600 border-stone-600 text-white shadow-md"
                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={formData.attending === "no"}
                  onChange={(e) =>
                    setFormData({ ...formData, attending: e.target.value })
                  }
                  className="sr-only"
                />
                <span className="font-medium">Regretfully no</span>
              </label>
            </div>
          </div>

          {/* Guest Count - Only show if attending */}
          <div
            className={`transition-opacity duration-300 ${
              formData.attending === "no"
                ? "opacity-50 pointer-events-none"
                : "opacity-100"
            }`}
          >
            <label
              htmlFor="guests"
              className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-1"
            >
              Total Number of Guests
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-4 w-4 text-stone-400" />
              </div>
              <select
                id="guests"
                value={formData.guests}
                onChange={(e) =>
                  setFormData({ ...formData, guests: e.target.value })
                }
                className="block w-full pl-10 pr-3 p-3 border border-stone-300 rounded-md bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-navy-900 focus:border-navy-900 transition-colors appearance-none"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Person" : "People"}
                  </option>
                ))}
                <option value="7+">7+ People</option>
              </select>
            </div>
          </div>
        </div>

        {/* SMS Consent */}
        <div className="mb-8 bg-gold-500/10 p-4 rounded-lg border border-gold-500/20">
          <label className="flex items-start cursor-pointer">
            <div className="flex items-center h-5">
              <input
                id="updates"
                type="checkbox"
                checked={formData.subscribeToUpdates}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subscribeToUpdates: e.target.checked,
                  })
                }
                className="focus:ring-navy-900 h-4 w-4 text-navy-900 border-stone-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <span className="font-bold text-navy-900 flex items-center">
                <Bell className="w-3 h-3 mr-1" />
                Get text updates
              </span>
              <p className="text-stone-600 mt-1">
                Receive automated text messages about parking updates, schedule
                changes, or livestream links on the day of the service.
              </p>
            </div>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-navy-900 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-900 uppercase tracking-wider transition-all ${
            isSubmitting
              ? "opacity-80"
              : "hover:shadow-lg transform active:scale-[0.99]"
          }`}
        >
          {isSubmitting ? "Sending..." : "Confirm RSVP"}
        </button>
      </form>
    </div>
  );
};
