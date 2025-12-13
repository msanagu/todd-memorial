import React from "react";
import { MEMORIAL_DATA } from "../constants";
import { Printer, ArrowLeft, HeartHandshake } from "lucide-react";

interface PrintableProgramProps {
  onBack: () => void;
}

export const PrintableProgram: React.FC<PrintableProgramProps> = ({
  onBack,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-200 p-8 flex flex-col items-center justify-center font-sans printable-container">
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
            Instructions: Click Print -{">"} Select "Save as PDF" -{">"} Layout:
            "Landscape" -{">"} Margins: "None"
          </span>
        </div>
        <button
          onClick={handlePrint}
          className="bg-gold-500 text-navy-900 px-6 py-2 rounded-md font-bold hover:bg-yellow-500 transition-colors flex items-center"
        >
          <Printer className="w-5 h-5 mr-2" />
          Print Program
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
            /* Reset root container styles */
            .printable-container {
              display: block !important;
              padding: 0 !important;
              margin: 0 !important;
              background: white !important;
              width: 100% !important;
              height: auto !important;
              min-height: 0 !important;
            }
            .print-hidden {
              display: none !important;
            }
            .print-sheet {
              /* Exact US Letter Landscape dimensions */
              width: 11in !important;
              height: 8.5in !important;
              
              /* Ensure valid positioning */
              position: relative !important;
              
              /* Remove any spacing causing overflow */
              box-shadow: none !important;
              margin: 0 !important;
              border: none !important;
              
              /* Force page break */
              page-break-after: always;
              break-after: page;
              
              /* Clipping */
              overflow: hidden !important;
            }
            .print-sheet:last-child {
              page-break-after: auto !important;
              break-after: auto !important;
            }
          }
        `}
      </style>

      {/* 
        SHEET 1: OUTSIDE 
        Left Panel: Back Cover
        Right Panel: Front Cover
      */}
      <div className="print-sheet bg-white w-[11in] h-[8.5in] flex shadow-2xl overflow-hidden mb-8 relative print:mb-0">
        {/* === BACK COVER (Left Half) === */}
        <div className="w-[5.5in] h-full relative flex flex-col p-12 text-center justify-between border-r border-stone-100">
          {/* Decorative Spine on the right (fold) */}
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-navy-900"></div>

          <div className="mt-8">
            <h3 className="font-serif text-2xl text-navy-900 font-bold mb-6 uppercase tracking-widest">
              Acknowledgements
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed italic font-serif">
              {MEMORIAL_DATA.program.acknowledgements.text}
            </p>
            <p className="text-navy-900 font-bold mt-4 font-serif">
              {MEMORIAL_DATA.program.acknowledgements.signature}
            </p>
          </div>

          {/* Donation / Support Section */}
          <div className="mb-8">
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 text-center">
              <h3 className="font-serif text-xl text-navy-900 font-bold mb-3">
                {MEMORIAL_DATA.program.inLieuOfFlowers.title}
              </h3>

              <p className="text-stone-700 text-sm mb-4 font-serif italic leading-relaxed">
                {MEMORIAL_DATA.program.inLieuOfFlowers.description}
              </p>

              <div className="flex justify-center mb-4">
                <HeartHandshake className="w-6 h-6 text-gold-500" />
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-white p-2 border border-stone-200 shadow-sm rounded-sm">
                  <img
                    src="/qr.png"
                    alt="Donation QR Code"
                    className="w-24 h-24"
                  />
                </div>
                <p className="text-[10px] text-stone-500 mt-2 uppercase tracking-wider font-bold">
                  {MEMORIAL_DATA.program.inLieuOfFlowers.qrCodeLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4 text-center">
            <h4 className="text-xs font-bold text-navy-900 uppercase tracking-widest mb-1">
              {MEMORIAL_DATA.program.parkingAndReception.title}
            </h4>
            <p className="text-[10px] text-stone-600 font-sans leading-relaxed">
              {MEMORIAL_DATA.program.parkingAndReception.text
                .split("\n")
                .map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i <
                      MEMORIAL_DATA.program.parkingAndReception.text.split("\n")
                        .length -
                        1 && <br />}
                  </React.Fragment>
                ))}
            </p>
          </div>
        </div>

        {/* === FRONT COVER (Right Half) === */}
        <div className="w-[5.5in] h-full relative bg-navy-900 text-white flex flex-col items-center">
          {/* Photo Section */}
          <div className="w-full h-[60%] relative overflow-hidden">
            <img
              src={MEMORIAL_DATA.photoUrl}
              alt={MEMORIAL_DATA.name}
              className="w-full h-full object-cover object-top opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
          </div>

          {/* Text Section */}
          <div className="w-full h-[40%] px-10 flex flex-col items-center justify-center relative">
            {/* Decorative Horizontal Line */}
            <div className="w-16 h-1 bg-gold-500 mb-6"></div>

            <p className="font-serif italic text-gold-500 text-lg mb-2">
              Honoring the Life of
            </p>

            <h1 className="font-serif text-3xl font-bold text-center leading-tight tracking-wide mb-3">
              {MEMORIAL_DATA.name}
            </h1>

            <div className="flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-stone-300 mb-6">
              <span>{MEMORIAL_DATA.dob}</span>
              <span className="text-gold-500">•</span>
              <span>{MEMORIAL_DATA.dod}</span>
            </div>

            <div className="text-center text-xs text-stone-400 font-medium uppercase tracking-wide">
              <p>{MEMORIAL_DATA.service.location.name}</p>
              <p>
                {MEMORIAL_DATA.serviceDate} at {MEMORIAL_DATA.service.time}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 
        SHEET 2: INSIDE 
        Left Panel: Obituary
        Right Panel: Order of Service & Prayer
      */}
      <div className="print-sheet bg-white w-[11in] h-[8.5in] flex shadow-2xl overflow-hidden relative print:mb-0">
        {/* === INSIDE LEFT (Obituary) === */}
        <div className="w-[5.5in] h-full p-8 flex flex-col relative bg-stone-50">
          {/* Decorative Bar Left */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-navy-900"></div>

          <div className="border-b-2 border-gold-500 pb-4 mb-4 pl-4">
            <h2 className="font-serif text-2xl text-navy-900 font-bold uppercase tracking-widest leading-none mb-1">
              {MEMORIAL_DATA.program.obituary.title
                .split(" ")
                .slice(0, 2)
                .join(" ")}
              <br />
              {MEMORIAL_DATA.program.obituary.title
                .split(" ")
                .slice(2)
                .join(" ")}
            </h2>
            <p className="font-serif text-stone-600 italic text-sm">
              {MEMORIAL_DATA.program.obituary.subtitle}
            </p>
          </div>

          <div className="flex-1 overflow-hidden text-[10px] text-stone-700 leading-[1.6] text-justify pr-2 font-serif space-y-2">
            {MEMORIAL_DATA.program.obituary.paragraphs.map(
              (paragraph, index) => {
                const isLastParagraph =
                  index ===
                  MEMORIAL_DATA.program.obituary.paragraphs.length - 1;
                return (
                  <p
                    key={index}
                    className={
                      isLastParagraph
                        ? "font-serif text-navy-900 font-semibold text-[10px] tracking-wide"
                        : ""
                    }
                  >
                    {paragraph}
                  </p>
                );
              }
            )}
          </div>
        </div>

        {/* === INSIDE RIGHT (Order of Service) === */}
        <div className="w-[5.5in] h-full p-10 flex flex-col relative">
          <h2 className="font-serif text-3xl text-navy-900 font-bold mb-6 text-center pb-4 border-stone-200">
            {MEMORIAL_DATA.program.orderOfService.title}
          </h2>

          <div className="space-y-4 font-serif text-xs mb-4">
            {MEMORIAL_DATA.program.orderOfService.items.map((item, index) => (
              <div key={index} className="flex justify-between items-baseline">
                <span className="font-semibold text-navy-900">
                  {item.title}
                </span>
                <div className="flex-1 border-b border-dotted border-stone-300 mx-3 mb-1"></div>
                <span className="text-stone-600">{item.performedBy}</span>
              </div>
            ))}
          </div>

          {/* Prayer Section */}
          <div className="mt-auto">
            {/* Decorative Divider */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-gold-500 opacity-40"></div>
              <div className="mx-3 text-gold-500 opacity-60">✦</div>
              <div className="h-px w-12 bg-gold-500 opacity-40"></div>
            </div>

            {/* Title */}
            <h3 className="font-serif font-bold text-center text-navy-900 uppercase tracking-[0.25em] text-xs mb-4">
              Prayer of Comfort
            </h3>

            {/* Prayer Text */}
            <div className="px-6 text-center">
              <div className="font-serif text-stone-700 text-[10px] leading-loose italic space-y-3">
                {MEMORIAL_DATA.program.prayer.paragraphs.map(
                  (paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  )
                )}
              </div>

              {/* Closing */}
              <div className="mt-4 font-serif text-navy-900 font-bold text-[10px] tracking-wide">
                {MEMORIAL_DATA.program.prayer.closing}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
