import React from "react";
import { MEMORIAL_DATA } from "../constants";
import { ArrowLeft, Camera } from "lucide-react";

interface VimeoThumbnailProps {
  onBack: () => void;
}

export const VimeoThumbnail: React.FC<VimeoThumbnailProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      {/* UI Controls - Hidden for screenshot */}
      <div className="fixed top-0 left-0 right-0 bg-navy-900/90 text-white p-4 z-50 flex justify-between items-center backdrop-blur-md border-b border-white/10 print:hidden">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="flex items-center text-stone-300 hover:text-white mr-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Website
          </button>
          <div className="flex items-center text-xs font-medium text-stone-400">
            <Camera className="w-4 h-4 mr-2" />
            Vimeo Thumbnail View (16:9) • Press F11 for Fullscreen
          </div>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">
          Take screenshot of the centered area
        </p>
      </div>

      {/* 
        THUMBNAIL CANVAS (16:9)
        Designed to be screenshotted.
      */}
      <div className="relative w-full max-w-5xl aspect-video bg-navy-900 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 group">
        {/* Background Layer: Desaturated Flag */}
        <div
          className="absolute inset-0 z-0 opacity-20 grayscale"
          style={{
            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Gradient Overlays for Depth */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy-900 via-navy-900/40 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/20" />

        {/* Content Container */}
        <div className="relative z-20 h-full w-full flex flex-col justify-between p-12 md:p-16">
          {/* Top Section: Name & Dates */}
          <div className="text-center md:text-left">
            <h1 className="font-serif text-5xl md:text-7xl text-white font-light tracking-tight mb-2 uppercase">
              {MEMORIAL_DATA.name}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-4 text-stone-400 text-sm md:text-xl font-medium tracking-[0.3em] uppercase">
              <span>{MEMORIAL_DATA.dob}</span>
              <span className="text-gold-500">•</span>
              <span>{MEMORIAL_DATA.dod}</span>
            </div>
          </div>

          {/* Middle Section: Split Content */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-between mt-8 md:mt-0">
            {/* Left: Simple Text */}
            <div className="flex flex-col space-y-6 text-center md:text-left max-w-lg">
              <div className="mt-6">
                <p className="text-gold-500 font-serif italic text-2xl md:text-3xl tracking-wide">
                  Military Honors Burial
                </p>
              </div>
            </div>

            {/* Right: Portrait Photo */}
            <div className="relative mt-8 md:mt-0">
              <div className="w-56 h-72 md:w-80 md:h-[420px] bg-white p-2 shadow-2xl rounded-sm">
                <img
                  src={MEMORIAL_DATA.photoUrl}
                  alt={MEMORIAL_DATA.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* EGA Insignia Overlay (Subtle) */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/90/USMC_logo.svg"
                alt=""
                className="absolute -bottom-10 -right-10 w-48 h-48 object-contain grayscale opacity-20 pointer-events-none"
              />
            </div>
          </div>

          {/* Bottom Branding */}
          <div className="flex justify-between items-end border-t border-white/10 pt-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-gold-500"></div>
              <p className="font-serif italic text-gold-500 font-medium text-lg tracking-widest uppercase">
                Semper Fidelis
              </p>
              <div className="h-px w-8 bg-gold-500"></div>
            </div>
            <p className="text-stone-500 text-[10px] tracking-widest uppercase font-bold">
              {MEMORIAL_DATA.service.location.name} • Live Broadcast
            </p>
          </div>
        </div>
      </div>

      <p className="mt-8 text-stone-500 text-sm italic print:hidden">
        Standard 16:9 Aspect Ratio (1.77:1) optimized for video player
        placeholders.
      </p>
    </div>
  );
};
