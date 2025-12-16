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
  Maximize2,
  X,
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleGetDirections = () => {
    trackEvent("click_directions", {
      category: "Navigation",
      label: event.location.name,
    });
  };

  return (
    <>
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
            isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
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
                  <p className="text-stone-600">
                    {event.location.cityStateZip}
                  </p>
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
                <div className="flex-1">
                  <h4 className="font-bold text-stone-800 text-sm uppercase tracking-wide mb-1">
                    Parking & Arrival
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                    {event.parkingInfo}
                  </p>

                  {/* Map Images List */}
                  {event.parkingMapImages &&
                    event.parkingMapImages.length > 0 && (
                      <div className="space-y-4 mt-3">
                        {event.parkingMapImages.map((url, idx) => (
                          <div
                            key={idx}
                            className="relative rounded-lg overflow-hidden border border-stone-200 shadow-sm cursor-pointer group hover:shadow-md transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(url);
                            }}
                          >
                            <img
                              src={url}
                              alt={`Parking Map ${idx + 1}`}
                              className="w-full h-auto object-cover block"
                            />
                            {/* Overlay Hint */}
                            <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/10 transition-colors flex items-center justify-center">
                              <div className="bg-white/90 text-navy-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 flex items-center">
                                <Maximize2 className="w-3 h-3 mr-1.5" />
                                Expand
                              </div>
                            </div>
                          </div>
                        ))}
                        <p className="text-[10px] text-stone-400 mt-1 text-center uppercase tracking-widest">
                          Tap maps to enlarge
                        </p>
                      </div>
                    )}
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
      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 md:p-8 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-screen w-full flex items-center justify-center h-full">
            <img
              src={selectedImage}
              alt="Map Full View"
              className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors z-50 backdrop-blur-md"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>
            <p className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-xs pointer-events-none">
              Tap background to close
            </p>
          </div>
        </div>
      )}
    </>
  );
};
