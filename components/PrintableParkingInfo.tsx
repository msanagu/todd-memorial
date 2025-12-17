import React from "react";
import { MEMORIAL_DATA } from "../constants";
import { Printer, ArrowLeft, MapPin, Info, Car, Clock } from "lucide-react";

interface PrintParkingInfoProps {
  onBack: () => void;
}

const ParkingCard: React.FC = () => {
  const event = MEMORIAL_DATA.service;
  // Use the src and caption directly from the service object
  const images = event.parkingMapImages || [];

  const programLink = `${window.location.origin}/program`;

  return (
    <div className="w-[4.75in] h-[8in] flex flex-col bg-white overflow-hidden p-4 border-x border-stone-100 relative print:border-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-serif text-lg text-navy-900 font-bold tracking-tight">
          Memorial Service
        </h1>
        <div className="flex items-center text-stone-500">
          <Clock className="w-3 h-3 text-gold-500 mr-1" />
          <span className="text-[10px] font-bold">{event.time}</span>
        </div>
      </div>

      <div className="h-px w-full bg-stone-100 mb-1.5"></div>

      {/* Location Section - QR to the right of address */}
      <div className="flex justify-between items-center mb-1 bg-stone-50/50 p-1.5 rounded-lg border border-stone-100">
        <div className="flex items-center max-w-[70%]">
          <MapPin className="w-3.5 h-3.5 text-navy-900 mr-1.5 shrink-0 mt-0.5" />
          <div className="text-[10px] leading-tight">
            <h2 className="font-bold text-stone-900 mb-0.5">
              {event.location.name}
            </h2>
            <p className="text-stone-600">{event.location.address}</p>
            <p className="text-stone-600">{event.location.cityStateZip}</p>
          </div>
        </div>

        <div className="flex flex-col items-center shrink-0 ml-2 justify-center">
          <div className="bg-white p-0.5 rounded border border-stone-200 shadow-sm">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${encodeURIComponent(
                event.location.mapLink
              )}`}
              alt="Scan for GPS"
              className="w-10 h-10"
            />
          </div>
          <span className="text-[6px] font-bold text-navy-900 uppercase mt-0.5 tracking-tighter">
            Scan for GPS
          </span>
        </div>
      </div>

      {/* Parking Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-start mb-1.5">
          <Car className="w-3 h-3 text-stone-500 mr-1.5 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-bold text-stone-800 text-[9px] uppercase tracking-widest mb-0.5">
              Parking & Arrival
            </h3>
            <p className="text-stone-600 text-[9px] leading-snug">
              {event.parkingInfo}
            </p>
          </div>
        </div>

        {/* Visual Maps with preserved aspect ratios */}
        <div className="flex-1 flex flex-col gap-2 mt-1.5 min-h-0">
          {images[0] && (
            <div className="flex flex-col min-h-0">
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-stone-200 shadow-xs bg-stone-100 relative">
                <img
                  src={images[0].src}
                  alt={images[0].caption || "Parking Map"}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
              <p className="text-[7px] text-stone-400 mt-0.5 text-center uppercase tracking-widest font-bold">
                {"LOCATION GUIDE"}
              </p>
            </div>
          )}

          {images[1] && (
            <div className="flex flex-col min-h-0">
              <div className="aspect-[16/10] rounded-lg overflow-hidden border border-stone-200 shadow-xs bg-stone-100 relative">
                <img
                  src={images[1].src}
                  alt={images[1].caption || "Entrance Photo"}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
              <p className="text-[7px] text-stone-400 mt-0.5 text-center uppercase tracking-widest font-bold">
                {"CHAPEL ENTRANCE ON 4TH AVE"}
              </p>
            </div>
          )}
        </div>

        {/* Important Notes & Program QR - Vertically Centered */}
        <div className="pt-2 mt-auto flex justify-between items-center">
          <div className="flex items-start max-w-[75%]">
            <Info className="w-3 h-3 text-stone-500 mr-1.5 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-stone-800 text-[8px] uppercase tracking-widest mb-0.5">
                Important Notes
              </h3>
              <ul className="space-y-0.5">
                {event.notes &&
                  event.notes.map((note, idx) => (
                    <li
                      key={idx}
                      className="text-stone-500 text-[8px] leading-snug italic"
                    >
                      {note}
                    </li>
                  ))}
                <li className="text-navy-900 text-[8px] leading-snug font-bold italic">
                  The service program may also be viewed on the web using the QR
                  code to the right.
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center shrink-0 ml-2">
            <div className="bg-white p-0.5 rounded border border-stone-200 shadow-sm">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${encodeURIComponent(
                  programLink
                )}`}
                alt="Scan for Program"
                className="w-10 h-10"
              />
            </div>
            <span className="text-[6px] font-bold text-navy-900 uppercase mt-0.5 tracking-tighter whitespace-nowrap">
              Scan for Program
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PrintableParkingInfo: React.FC<PrintParkingInfoProps> = ({
  onBack,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-200 p-8 flex flex-col items-center justify-center font-sans printable-container overflow-auto">
      {/* UI Controls - Hidden when printing */}
      <div className="print:hidden fixed top-0 left-0 right-0 bg-navy-900 text-white p-4 z-50 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="flex items-center text-stone-300 hover:text-white mr-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Website
          </button>
          <span className="text-sm font-medium opacity-80">
            Layout: 2 per page (Landscape 11x8.5) • No Margins • Scale 100%
          </span>
        </div>
        <button
          onClick={handlePrint}
          className="bg-gold-500 text-navy-900 px-6 py-2 rounded-md font-bold hover:bg-yellow-500 transition-colors flex items-center shadow-lg"
        >
          <Printer className="w-5 h-5 mr-2" />
          Print 2 Guides
        </button>
      </div>

      <style>
        {`
          @media print {
            @page {
              size: landscape;
              margin: 0;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              background-color: white;
              margin: 0;
              padding: 0;
            }
            .printable-container {
              display: block !important;
              padding: 0 !important;
              margin: 0 !important;
              background: white !important;
              width: 100% !important;
              height: auto !important;
              min-height: 0 !important;
            }
            .print-sheet {
              width: 11in !important;
              height: 8.5in !important;
              position: relative !important;
              box-shadow: none !important;
              margin: 0 !important;
              border: none !important;
              page-break-after: always;
              break-after: page;
              overflow: hidden !important;
              display: flex !important;
              justify-content: center !important;
            }
          }
        `}
      </style>

      {/* 
        PRINT SHEET: 2x PARKING GUIDES (Landscape 11x8.5)
      */}
      <div className="print-sheet bg-white w-[11in] h-[8.5in] flex items-start shadow-2xl overflow-hidden relative print:mb-0">
        {/* Card 1 - flush left */}
        <ParkingCard />

        {/* Vertical Cutting Guide Line - At the edge of first card */}
        <div className="absolute top-0 bottom-0 w-px border-l border-dashed border-stone-300 z-50 print:opacity-30" style={{ left: '4.75in' }}></div>

        <div className="absolute top-1/2 -translate-y-1/2 z-50 print:hidden pointer-events-none" style={{ left: '4.75in', transform: 'translateX(-50%) translateY(-50%)' }}>
          <div className="bg-white/95 text-stone-400 px-3 py-1 rounded-full text-[10px] font-bold border border-stone-200 uppercase tracking-widest shadow-sm">
            Cut Line
          </div>
        </div>

        {/* Card 2 - immediately after Card 1 */}
        <ParkingCard />
      </div>

      <p className="mt-8 text-stone-500 text-sm italic print:hidden">
        Each card measures 5.5" x 8.5" after cutting. Print with 0 margins for
        exact size.
      </p>
    </div>
  );
};
