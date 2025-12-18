import React, { useState } from "react";
import {
  Bell,
  CheckCircle,
  Smartphone,
  Users,
  CalendarCheck,
  X,
} from "lucide-react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { trackEvent } from "../utils/analytics";

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
      // Track the successful RSVP
      trackEvent("rsvp_submit", {
        category: "Engagement",
        label: formData.attending === "yes" ? "Attending" : "Not Attending",
        value: formData.attending === "yes" ? parseInt(formData.guests) : 0,
      });
      setIsSubmitting(false);
    }
  };

  // Helper to format phone numbers as (555) 555-5555
  function formatPhone(phone: string) {
    const cleaned = ("" + phone).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  }

  if (step === "success") {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8 shadow-sm animate-in fade-in slide-in-from-top-2 duration-500">
        <div className="flex items-start gap-4">
          <div className="bg-emerald-100 p-2.5 rounded-full shrink-0">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-emerald-900 font-bold text-lg leading-tight mb-3">
                RSVP Confirmed
              </h3>
              <button
                onClick={() => setStep("form")}
                className="text-emerald-400 hover:text-emerald-600 transition-colors p-1 -mt-1 -mr-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-emerald-800/80 text-sm leading-relaxed mb-4">
              Thank you,{" "}
              <span className="font-bold uppercase">
                {formData.name.split(" ")[0]}
              </span>
              . We've successfully received your attendance details. If you need
              to modify your RSVP, please contact{" "}
              <span className="font-bold">Mary</span> directly at{" "}
              <span className="font-bold">(949) 291-2504</span>.
              {formData.subscribeToUpdates && (
                <span className="block mt-2 font-medium text-emerald-900">
                  Important text updates about parking and schedule changes will
                  be sent to{" "}
                  <span className="font-bold">
                    {formatPhone(formData.phone)}
                  </span>
                  .
                </span>
              )}
            </p>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => setStep("form")}
                className="text-emerald-700 text-xs font-bold uppercase tracking-wider hover:text-emerald-900 underline underline-offset-4 decoration-emerald-300"
              >
                Add another guest
              </button>
            </div>
          </div>
        </div>
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
              Please let the family know if you will attend. Important updates
              will be sent by text message to your mobile number.
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
              className="block w-full p-3 border border-stone-300 rounded-md bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-navy-900 focus:border-navy-900 transition-colors font-sans"
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
                className="block w-full pl-10 pr-3 p-3 border border-stone-300 rounded-md bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-navy-900 focus:border-navy-900 transition-colors font-sans"
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
                className="block w-full pl-10 pr-3 p-3 border border-stone-300 rounded-md bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-navy-900 focus:border-navy-900 transition-colors appearance-none font-sans"
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
        {/* <div className="mb-8 bg-gold-500/10 p-4 rounded-lg border border-gold-500/20">
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
        </div> */}

        {/* Text Updates Notice */}
        <div className="mb-6 bg-sky-50 border border-sky-200 rounded-lg p-4 flex items-start space-x-3">
          <Bell className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-sky-700 font-bold mb-1">Text Notifications</p>
            <p className="text-sky-700">
              You may receive important text updates about parking, schedule
              changes, or livestream links leading up to and on the day of the
              service.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm font-bold text-white bg-navy-900 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-900 transition-all ${
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
