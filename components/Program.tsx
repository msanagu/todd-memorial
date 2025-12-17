import React from "react";
import { MEMORIAL_DATA } from "../constants";
import { ArrowLeft, FileText, Download, HeartHandshake } from "lucide-react";
import { trackEvent } from "../utils/analytics";

interface ProgramProps {
  onBack: () => void;
}

export const Program: React.FC<ProgramProps> = ({ onBack }) => {
  const handleOpenPDF = () => {
    window.open("/Memorial - Todd James San Agustin.pdf", "_blank");
    trackEvent("open_print_program", {
      category: "Engagement",
    });
  };

  const handleSupportClick = () => {
    window.open(
      "https://www.givesendgo.com/SupportSanAgustinFamily?utm_source=sharelink&utm_medium=copy_link&utm_campaign=SupportSanAgustinFamily",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] font-sans">
      {/* Header with Back Button */}
      <div className="sticky top-0 bg-navy-900 text-white p-4 z-50 shadow-lg">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center text-stone-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <button
            onClick={handleOpenPDF}
            className="bg-gold-500 text-navy-900 px-4 py-2 rounded-md font-bold hover:bg-yellow-500 transition-colors flex items-center text-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Save PDF
          </button>
        </div>
      </div>

      {/* Program Content - Mobile Optimized */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Cover Section */}
        <div className="bg-navy-900 text-white rounded-xl p-8 mb-6 text-center shadow-xl">
          <div className="inline-block px-4 py-1 mb-4">
            <div className="h-1 w-16 bg-gold-500 mx-auto"></div>
          </div>

          <p className="text-sm tracking-widest uppercase text-stone-300 mb-4">
            Honoring the Life of
          </p>

          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 tracking-wide">
            TODD JAMES SAN AGUSTIN
          </h1>

          <div className="flex items-center justify-center gap-3 text-stone-300 text-base mb-6">
            <span>{MEMORIAL_DATA.dob}</span>
            <span className="text-gold-500">•</span>
            <span>{MEMORIAL_DATA.dod}</span>
          </div>

          <div className="border-t border-stone-700 pt-6 mt-6">
            <p className="text-sm tracking-wide uppercase text-stone-400 mb-1">
              First Presbyterian Church
            </p>
            <p className="text-base text-white">
              December 19th, 2025 at 12:45 PM
            </p>
          </div>
        </div>

        {/* Order of Service */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6 text-center border-b-2 border-gold-500 pb-3">
            Order of Service
          </h2>

          <div className="space-y-5">
            {MEMORIAL_DATA.program.orderOfService.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start border-b border-stone-100 pb-4"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-navy-900 uppercase tracking-wide text-sm">
                    {item.title}
                  </h3>
                </div>
                {item.performedBy && (
                  <div className="flex-1 text-right">
                    <p className="text-stone-600 italic text-sm">
                      {item.performedBy}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Obituary */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-4 text-center border-b-2 border-gold-500 pb-3">
            In Loving Memory
          </h2>

          <div className="prose prose-sm max-w-none text-stone-700 leading-relaxed space-y-4">
            {MEMORIAL_DATA.program.obituary.paragraphs.map(
              (paragraph, index) => (
                <p key={index}>{paragraph}</p>
              )
            )}
          </div>
        </div>

        {/* Prayer */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6 text-center border-b-2 border-gold-500 pb-3">
            {MEMORIAL_DATA.program.prayer.title}
          </h2>

          <div className="prose prose-sm max-w-none text-stone-700 leading-relaxed space-y-4">
            {MEMORIAL_DATA.program.prayer.paragraphs.map((paragraph, index) => (
              <p key={index} className={"italic"}>
                {paragraph}
              </p>
            ))}
            <p className="text-center font-semibold text-navy-900 mt-6">
              {MEMORIAL_DATA.program.prayer.closing}
            </p>
          </div>
        </div>

        {/* Acknowledgements */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-4 text-center border-b-2 border-gold-500 pb-3">
            Acknowledgements
          </h2>

          <p className="text-stone-700 text-center leading-relaxed italic">
            {MEMORIAL_DATA.program.acknowledgements.text}
          </p>
          <p className="text-navy-900 font-bold text-center mt-4">
            {MEMORIAL_DATA.program.acknowledgements.signature}
          </p>
        </div>

        {/* In Lieu of Flowers */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-4 text-center border-b-2 border-gold-500 pb-3">
            {MEMORIAL_DATA.program.inLieuOfFlowers.title}
          </h2>

          <p className="text-stone-700 text-center leading-relaxed italic mb-6">
            {MEMORIAL_DATA.program.inLieuOfFlowers.description}
          </p>

          <div className="flex flex-col items-center">
            <p className="text-stone-500 uppercase tracking-wider text-sm  font-semibold">
              <button
                onClick={handleSupportClick}
                className="bg-gold-500 text-navy-900 px-4 py-2 rounded-md font-bold hover:bg-yellow-500 transition-colors flex items-center text-sm"
              >
                <HeartHandshake className="w-4 h-4 mr-2" />
                {MEMORIAL_DATA.program.inLieuOfFlowers.buttonLabel}
              </button>
            </p>
          </div>
        </div>

        {/* Parking and Reception Info */}
        <div className="mt-10 p-6 bg-stone-100 rounded-xl text-center border border-stone-200 animate-on-scroll animate-ing">
          <h2 className="font-serif text-xl font-bold mb-4 text-center">
            Parking & Reception
          </h2>

          <div className="text-center space-y-2">
            <p className="text-sm">
              {MEMORIAL_DATA.program.parkingAndReception.text}
            </p>
          </div>
        </div>

        {/* Download PDF Button - Bottom */}
        <div className="mt-8 text-center">
          <button
            onClick={handleOpenPDF}
            className="inline-flex items-center bg-navy-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-900 transition-colors shadow-md active:transform active:scale-95 transition-colors shadow-lg"
          >
            <FileText className="w-5 h-5 mr-3" />
            Download Program PDF
          </button>
        </div>
      </div>
    </div>
  );
};
