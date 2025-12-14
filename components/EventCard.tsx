import React, { useState } from "react";
import { EventDetail } from "../types";
import {
  MapPin,
  Clock,
  Info,
  Car,
  ChevronDown,
  ChevronUp,
  Navigation,
} from "lucide-react";
import { trackEvent } from "../utils/analytics";

interface EventCardProps {
  event: EventDetail;
  isFirst?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isFirst = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(isFirst);

  const handleGetDirections = () => {
    trackEvent("click_directions", {
      category: "Navigation",
      label: event.location.name,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden mb-6 transition-all duration-300 hover:shadow-xl">
      {/* Header Section */}
      <div
        className="p-6 cursor-pointer bg-stone-50 hover:bg-white transition-colors border-b border-stone-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-serif text-2xl text-navy-900 font-semibold mb-1">
              {event.title}
            </h3>
            <div className="flex items-center text-stone-600 font-medium text-lg">
              <Clock className="w-5 h-5 mr-2 text-gold-500" />
              {event.time}
            </div>
          </div>
          <button className="text-stone-400 mt-1">
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </div>

      {/* Details Section */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 pt-2">
          {/* Location */}
          <div className="mb-6">
            <div className="flex items-start mb-2">
              <MapPin className="w-5 h-5 mr-2 text-navy-900 mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-stone-900">
                  {event.location.name}
                </p>
                <p className="text-stone-600">{event.location.address}</p>
                <p className="text-stone-600">{event.location.cityStateZip}</p>
              </div>
            </div>
            <a
              href={event.location.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGetDirections}
              className="mt-3 w-full flex items-center justify-center bg-navy-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-900 transition-colors shadow-md active:transform active:scale-95"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </a>
          </div>

          {/* Parking & Details */}
          <div className="bg-stone-50 rounded-lg p-4 border border-stone-100">
            <div className="flex items-start mb-3">
              <Car className="w-5 h-5 mr-2 text-stone-500 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-stone-800 text-sm uppercase tracking-wide mb-1">
                  Parking & Arrival
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {event.parkingInfo}
                </p>
              </div>
            </div>

            {event.notes && event.notes.length > 0 && (
              <div className="flex items-start mt-4 pt-4 border-t border-stone-200">
                <Info className="w-5 h-5 mr-2 text-stone-500 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-800 text-sm uppercase tracking-wide mb-1">
                    Important Notes
                  </h4>
                  <ul className="list-disc list-inside text-stone-600 text-sm">
                    {event.notes.map((note, idx) => (
                      <li key={idx} className="mb-1">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
