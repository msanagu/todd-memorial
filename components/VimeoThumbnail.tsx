import React, { useState } from "react";
import { MEMORIAL_DATA } from "../constants";
import { ArrowLeft, Camera, Layout, Image as ImageIcon } from "lucide-react";

interface VimeoThumbnailProps {
  onBack: () => void;
}

type DesignMode = "livestream" | "nostalgic";

export const VimeoThumbnail: React.FC<VimeoThumbnailProps> = ({ onBack }) => {
  const [mode, setMode] = useState<DesignMode>("livestream");

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
          /* DESIGN 2: NOSTALGIC COLLAGE (STONE/CREAM) */
          <div className="h-full w-full bg-[#F9F8F6] flex items-center justify-center p-12 md:p-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Subtle background texture/elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-stone-100/50 to-transparent pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Collage Layout - Grid-based overlapping imagery */}
            <div className="relative w-full h-full flex flex-col md:flex-row items-center gap-12">
              {/* Left Column: Image Collage */}
              <div className="relative flex-1 h-full w-full min-h-[300px]">
                {/* Main large image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] aspect-[4/5] bg-white p-2 shadow-2xl z-20 transform -rotate-2">
                  <img
                    src={
                      MEMORIAL_DATA.collagePhotos?.[2] || MEMORIAL_DATA.photoUrl
                    }
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>

                {/* Secondary image 1 - Top Left */}
                <div className="absolute top-[10%] left-[5%] w-[35%] aspect-square bg-white p-1.5 shadow-xl z-10 transform rotate-6 border border-stone-100">
                  <img
                    src={
                      MEMORIAL_DATA.collagePhotos?.[0] || MEMORIAL_DATA.photoUrl
                    }
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>

                {/* Secondary image 2 - Bottom Right */}
                <div className="absolute bottom-[5%] right-[5%] w-[40%] aspect-video bg-white p-1.5 shadow-xl z-30 transform -rotate-3 border border-stone-100">
                  <img
                    src={
                      MEMORIAL_DATA.collagePhotos?.[3] || MEMORIAL_DATA.photoUrl
                    }
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>

                {/* Secondary image 3 - Middle Left overlapping */}
                <div className="absolute bottom-[20%] left-[0%] w-[30%] aspect-square bg-white p-1 shadow-lg z-0 transform -rotate-12 border border-stone-100 opacity-80">
                  <img
                    src={
                      MEMORIAL_DATA.collagePhotos?.[1] || MEMORIAL_DATA.photoUrl
                    }
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              </div>

              {/* Right Column: Hero Typography */}
              <div className="flex-1 flex flex-col justify-center text-center md:text-left relative z-40">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center md:justify-start gap-3 mb-4">
                    <div className="h-px w-6 bg-gold-500 opacity-40"></div>
                    <span className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.4em]">
                      In Loving Memory
                    </span>
                    <div className="h-px w-6 bg-gold-500 opacity-40"></div>
                  </div>

                  <h1 className="font-serif text-5xl md:text-7xl text-navy-900 font-bold leading-[1.1] mb-6 tracking-tight">
                    <span className="block">
                      {MEMORIAL_DATA.name.split(" ")[0]}
                    </span>
                    <span className="block text-navy-900/40">
                      {MEMORIAL_DATA.name.split(" ").slice(1).join(" ")}
                    </span>
                  </h1>

                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
                    <div className="text-stone-500">
                      {/* <p className="text-[10px] uppercase tracking-widest font-bold mb-1 opacity-60">
                        Born
                      </p> */}
                      <p className="font-serif text-2xl">{MEMORIAL_DATA.dob}</p>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-stone-200" />
                    <div className="text-stone-500">
                      {/* <p className="text-[10px] uppercase tracking-widest font-bold mb-1 opacity-60">
                        Passed
                      </p> */}
                      <p className="font-serif text-2xl">{MEMORIAL_DATA.dod}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="font-serif text-xl text-navy-900 max-w-sm leading-relaxed">
                    Video tribute coming soon...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 text-stone-500 text-sm italic print:hidden">
        <p>16:9 Aspect Ratio Placeholder • Standard Video Player Dimension</p>
        <div className="bg-stone-800/50 px-4 py-2 rounded-lg border border-white/5 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-navy-900 border border-white/20"></div>
            <span className="text-xs uppercase tracking-tighter font-bold">
              Navy Theme (Broadcast)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F9F8F6] border border-stone-300"></div>
            <span className="text-xs uppercase tracking-tighter font-bold">
              Cream Theme (Collage)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
