import React, { useState } from "react";
import { MEMORIAL_DATA } from "../constants";
import { ArrowLeft, Camera, Layout, Image as ImageIcon } from "lucide-react";

interface VimeoThumbnailProps {
  onBack: () => void;
}

type DesignMode = "livestream" | "nostalgic";

export const VimeoThumbnail: React.FC<VimeoThumbnailProps> = ({ onBack }) => {
  const [mode, setMode] = useState<DesignMode>("nostalgic");

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
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMode("livestream")}
              className={`flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                mode === "livestream"
                  ? "bg-navy-900 text-white border border-gold-500"
                  : "bg-transparent text-stone-400 border border-white/10 hover:border-white/30"
              }`}
            >
              <Layout className="w-3 h-3 mr-2" />
              Livestream UI
            </button>
            <button
              onClick={() => setMode("nostalgic")}
              className={`flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                mode === "nostalgic"
                  ? "bg-stone-100 text-navy-900 border border-gold-500 shadow-lg"
                  : "bg-transparent text-stone-400 border border-white/10 hover:border-white/30"
              }`}
            >
              <ImageIcon className="w-3 h-3 mr-2" />
              Nostalgic Collage
            </button>
          </div>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-gold-500 font-bold hidden md:block">
          F11 for Fullscreen • Take screenshot of the 16:9 area
        </p>
      </div>

      {/* 
        THUMBNAIL CANVAS (16:9)
        Standard 16:9 aspect ratio container (e.g., 1920x1080 equivalent)
      */}
      <div className="relative w-full max-w-5xl aspect-video overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.7)] border border-white/5 bg-white">
        {mode === "livestream" ? (
          /* DESIGN 1: LIVESTREAM BROADCAST (NAVY) */
          <div className="h-full w-full bg-navy-900 flex flex-col justify-between p-12 md:p-16 animate-in fade-in duration-500">
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
            <div className="relative z-20 h-full w-full flex flex-col justify-between">
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
                {/* Left: Event Details */}
                <div className="flex flex-col space-y-8 text-center md:text-left max-w-lg">
                  <div className="relative">
                    <p className="font-serif text-gold-500 italic text-xl mb-1">
                      Service scheduled for
                    </p>
                    <h2 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight">
                      {MEMORIAL_DATA.serviceDate.toUpperCase()}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-stone-300 font-bold text-lg uppercase tracking-widest mb-1">
                        {MEMORIAL_DATA.burial.title}
                      </h3>
                      <p className="text-stone-400 text-2xl font-serif">
                        {MEMORIAL_DATA.burial.time}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-stone-300 font-bold text-lg uppercase tracking-widest mb-1">
                        {MEMORIAL_DATA.service.title}
                      </h3>
                      <p className="text-stone-400 text-2xl font-serif">
                        {MEMORIAL_DATA.service.time}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Portrait Photo */}
                <div className="relative mt-8 md:mt-0">
                  <div className="w-56 h-72 md:w-80 md:h-[420px] bg-white p-2 shadow-2xl rounded-sm transform rotate-2 transition-transform duration-700 hover:rotate-0">
                    <div className="absolute inset-0 border border-stone-200 m-2 pointer-events-none"></div>
                    <img
                      src={MEMORIAL_DATA.photoUrl}
                      alt={MEMORIAL_DATA.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Eagle_Globe_Anchor.svg/800px-Eagle_Globe_Anchor.svg.png"
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
        ) : (
          /* DESIGN 2: NOSTALGIC COLLAGE (EXACT REPLICA OF USER REFERENCE) */
          <div className="h-full w-full bg-[#f4f3f1] flex flex-col items-center justify-between py-12 md:py-16 animate-in fade-in duration-700 overflow-hidden">
            {/* Header: Fixed top section to prevent overlap */}
            <div className="text-center w-full z-40 mb-4 px-8">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="h-px w-10 bg-gold-500/30" />
                <span className="text-[11px] md:text-[13px] font-bold text-gold-500 uppercase tracking-[0.5em] font-sans">
                  In Loving Memory
                </span>
                <div className="h-px w-10 bg-gold-500/30" />
              </div>

              <h1 className="font-serif text-navy-900 text-2xl md:text-[3rem] font-bold uppercase tracking-tight leading-none mb-4">
                TODD JAMES SAN AGUSTIN
              </h1>

              <div className="flex items-center justify-center gap-8 font-serif text-lg md:text-2xl text-stone-400">
                <span>{MEMORIAL_DATA.dob}</span>
                <div className="w-[1px] h-6 md:h-8 bg-gold-500/30" />
                <span>{MEMORIAL_DATA.dod}</span>
              </div>
            </div>

            {/* Photo Collage Layer - Lowered and refined transformation */}
            <div className="relative w-full h-[60%] flex items-end justify-center px-8 md:px-16 pb-8">
              <div className="relative w-full max-w-6xl flex items-end justify-center -space-x-8 md:-space-x-12">
                {/* Photo 1: Kid/Football - Rotated Left, Low */}
                <div className="w-[24%] bg-white p-3 md:p-4 shadow-xl border border-stone-200/40 rounded-sm transform rotate-[-4deg] -translate-y-2 z-10 transition-transform duration-500 hover:rotate-0 hover:z-50">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={
                        MEMORIAL_DATA.collagePhotos?.[0] ||
                        MEMORIAL_DATA.photoUrl
                      }
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>

                {/* Photo 2: High School Football - Rotated Right, Slightly Higher */}
                <div className="w-[24%] bg-white p-3 md:p-4 shadow-xl border border-stone-200/40 rounded-sm transform rotate-[3deg] -translate-y-6 z-20 transition-transform duration-500 hover:rotate-0 hover:z-50">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={
                        MEMORIAL_DATA.collagePhotos?.[1] ||
                        MEMORIAL_DATA.photoUrl
                      }
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>

                {/* Photo 3: Family Photo - Rotated Left, Highest in middle */}
                <div className="w-[24%] bg-white p-3 md:p-4 shadow-2xl border border-stone-200/40 rounded-sm transform rotate-[-2deg] -translate-y-10 z-30 transition-transform duration-500 hover:rotate-0 hover:z-50">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={
                        MEMORIAL_DATA.collagePhotos?.[2] ||
                        MEMORIAL_DATA.photoUrl
                      }
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>

                {/* Photo 4: Military - Rotated Right, High but lower than middle */}
                <div className="w-[24%] bg-white p-3 md:p-4 shadow-xl border border-stone-200/40 rounded-sm transform rotate-[5deg] -translate-y-6 z-10 transition-transform duration-500 hover:rotate-0 hover:z-50">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={
                        MEMORIAL_DATA.collagePhotos?.[3] ||
                        MEMORIAL_DATA.photoUrl
                      }
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 text-stone-500 text-sm italic print:hidden text-center">
        <p>
          16:9 Aspect Ratio Placeholder • Take screenshot for Vimeo thumbnail
        </p>
        <div className="bg-stone-800/50 px-4 py-2 rounded-lg border border-white/5 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-navy-900 border border-white/20"></div>
            <span className="text-xs uppercase tracking-tighter font-bold">
              Navy Theme
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f4f3f1] border border-stone-300"></div>
            <span className="text-xs uppercase tracking-tighter font-bold">
              Nostalgic Theme
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
