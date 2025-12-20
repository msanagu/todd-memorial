import React, { useEffect, useState, useMemo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { MEMORIAL_DATA } from "./constants";
import { EventCard } from "./components/EventCard";
import { SectionWrapper } from "./components/SectionWrapper";
import { Guestbook } from "./components/Guestbook";
import { RSVPForm } from "./components/RSVPForm";
import { Program } from "./components/Program";
import { PrintableProgram } from "./components/PrintableProgram";
import { PrintableParkingInfo } from "./components/PrintableParkingInfo";
import { VimeoThumbnail } from "./components/VimeoThumbnail";
import { Heart, Printer, Clock, CheckCircle, PlayCircle } from "lucide-react";
import { trackEvent } from "./utils/analytics";

const MainPage: React.FC = () => {
  const [activeStream, setActiveStream] = useState<"burial" | "service">(
    "burial"
  );
  const [now, setNow] = useState(new Date());
  const navigate = useNavigate();

  // Update clock every minute to refresh "Live" status
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const streamStatus = useMemo(() => {
    const event =
      activeStream === "burial" ? MEMORIAL_DATA.burial : MEMORIAL_DATA.service;

    try {
      const dateClean = MEMORIAL_DATA.serviceDate.replace(
        /(st|nd|rd|th),/,
        ","
      );
      const dateTimeStr = `${dateClean} ${event.time} PST`;
      const startTime = new Date(dateTimeStr);

      // Assume event is "Live" for 2 hours after start, then "Recording"
      const durationMs = 2 * 60 * 60 * 1000;
      const endTime = new Date(startTime.getTime() + durationMs);

      if (now < startTime) return "scheduled";
      if (now >= startTime && now < endTime) return "live";
      return "recording";
    } catch (e) {
      console.error("Date parsing error:", e);
      return "scheduled";
    }
  }, [activeStream, now]);

  const handleViewProgram = () => {
    navigate("/program");
    trackEvent("view_program", { category: "Engagement" });
  };

  useEffect(() => {
    // Add stable transition styles
    const style = document.createElement("style");
    style.textContent = `
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), 
                    transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        will-change: opacity, transform;
      }
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target); // Reveal once
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -75px 0px",
      }
    );

    // Initial check for elements already in view
    setTimeout(() => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      observer.disconnect();
      if (style.parentNode) style.parentNode.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F6] font-sans selection:bg-navy-900 selection:text-white">
      <div
        className="fixed inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url('https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10 shadow-2xl min-h-screen bg-white/95 backdrop-blur-sm sm:my-8 sm:rounded-xl overflow-hidden border-t-8 border-navy-900 w-full">
        {/* Header Section - Name, Dates, and Portrait */}
        <header className="relative text-center pt-12 pb-8 px-6 bg-gradient-to-b from-white to-[#F0F0F0]">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gold-500 opacity-50"></div>

          <SectionWrapper>
            <h1 className="font-serif text-4xl md:text-5xl text-navy-900 tracking-tight leading-tight mb-2 animate-on-scroll">
              <span className="block font-medium">TODD JAMES</span>
              <span className="block font-bold">SAN AGUSTIN</span>
            </h1>

            <div className="flex items-center justify-center gap-3 text-stone-500 text-sm md:text-base font-medium tracking-widest uppercase mt-4 mb-8 animate-on-scroll">
              <span>{MEMORIAL_DATA.dob}</span>
              <span className="text-gold-500">•</span>
              <span>{MEMORIAL_DATA.dod}</span>
            </div>

            <div className="relative mx-auto w-64 h-80 md:w-72 md:h-96 shadow-2xl rounded-sm p-2 bg-white animate-on-scroll">
              <div className="absolute inset-0 border border-stone-200 m-2 pointer-events-none"></div>
              <img
                src={MEMORIAL_DATA.photoUrl}
                alt={MEMORIAL_DATA.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </SectionWrapper>
        </header>

        {/* Service Date Banner */}
        <div className="bg-navy-900 text-white text-center py-4 px-4 relative z-20 shadow-md animate-on-scroll">
          <p className="font-serif text-xl md:text-2xl tracking-wide">
            {MEMORIAL_DATA.serviceDate}
          </p>
        </div>

        {/* Main Content Area */}
        <main className="p-4 md:p-4 bg-[#FDFBF7]">
          <SectionWrapper className="max-w-xl mx-auto">
            {/* Invitation Text */}
            <p className="text-center text-stone-600 italic font-serif mb-8 text-lg animate-on-scroll">
              The family invites you to join them in honoring the life and
              service of Todd James San Agustin.
            </p>

            {/* Events Timeline */}
            <div className="relative">
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-stone-200 hidden md:block"></div>

              <div className="relative z-10">
                <div className="animate-on-scroll">
                  <EventCard event={MEMORIAL_DATA.burial} isFirst={true} />
                </div>
                <div className="animate-on-scroll">
                  <EventCard event={MEMORIAL_DATA.service} />
                </div>
              </div>
            </div>

            {/* View Program Button */}
            <div className="my-8 flex flex-col items-center animate-on-scroll">
              <button
                onClick={handleViewProgram}
                className="group w-full md:w-auto relative overflow-hidden bg-white border border-stone-200 hover:border-gold-500/50 shadow-lg hover:shadow-xl rounded-xl p-1 pr-6 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center">
                  <div className="bg-navy-900 text-white p-4 rounded-lg mr-4 group-hover:bg-gold-500 transition-colors duration-300">
                    <Printer className="w-6 h-6" />
                  </div>
                  <div className="text-left py-2">
                    <span className="block font-serif text-lg font-bold text-navy-900">
                      View Funeral Program
                    </span>
                    <span className="block text-xs text-stone-500 uppercase tracking-wide group-hover:text-gold-600 transition-colors">
                      Download & Print PDF
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Livestream / Recording Section */}
            <div className="mb-6 bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden animate-on-scroll">
              <div className="p-6 bg-stone-50 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-navy-900 font-semibold flex items-center">
                    {streamStatus === "recording"
                      ? "Watch Recorded Services"
                      : "Watch Services Live"}
                  </h3>
                  <p className="text-stone-600 mt-1 text-sm">
                    {streamStatus === "recording"
                      ? "Broadcasts are now available for viewing."
                      : "Select a service below to join the broadcast."}
                  </p>
                </div>

                <div className="flex bg-stone-200 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveStream("burial")}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${
                      activeStream === "burial"
                        ? "bg-navy-900 text-white shadow-sm"
                        : "text-stone-500 hover:text-navy-900"
                    }`}
                  >
                    Honors Burial
                  </button>
                  <button
                    onClick={() => setActiveStream("service")}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${
                      activeStream === "service"
                        ? "bg-navy-900 text-white shadow-sm"
                        : "text-stone-500 hover:text-navy-900"
                    }`}
                  >
                    Memorial Service
                  </button>
                </div>
              </div>

              <div className="bg-black relative">
                <div className="absolute top-4 left-4 z-10 flex items-center bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <span className="flex h-2 w-2 mr-2 relative">
                    {streamStatus === "live" ? (
                      <>
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </>
                    ) : streamStatus === "recording" ? (
                      <CheckCircle className="w-3 h-3 text-gold-500" />
                    ) : (
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-stone-500"></span>
                    )}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest ${
                      streamStatus === "live"
                        ? "text-green-400"
                        : "text-stone-300"
                    }`}
                  >
                    {streamStatus === "live"
                      ? "Live Now"
                      : streamStatus === "recording"
                      ? "Recorded"
                      : "Scheduled"}
                  </span>
                </div>

                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                  <iframe
                    key={activeStream}
                    src={
                      activeStream === "burial"
                        ? MEMORIAL_DATA.burial.livestreamUrl
                        : MEMORIAL_DATA.service.livestreamUrl
                    }
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    title={`${activeStream} Broadcast`}
                  />
                </div>
              </div>

              <div
                className={`p-4 flex items-center justify-between text-[11px] font-medium tracking-wide transition-colors ${
                  streamStatus === "live"
                    ? "bg-green-900 text-green-50"
                    : "bg-navy-900 text-white"
                }`}
              >
                <div className="flex items-center">
                  {streamStatus === "live" ? (
                    <PlayCircle className="w-3.5 h-3.5 mr-2 animate-pulse" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 mr-2 text-gold-500" />
                  )}
                  <span>
                    {streamStatus === "live"
                      ? "Streaming Live"
                      : streamStatus === "recording"
                      ? "Service Complete - Recorded View"
                      : `Starts at ${
                          activeStream === "burial"
                            ? MEMORIAL_DATA.burial.time
                            : MEMORIAL_DATA.service.time
                        }`}
                  </span>
                </div>
                <span className="opacity-60 uppercase">
                  Pacific Standard Time
                </span>
              </div>
            </div>

            {/* Memorial Video Section */}
            <div className="mb-8 bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden animate-on-scroll">
              <div className="p-6 bg-stone-50 border-b border-stone-200">
                <h3 className="font-serif text-2xl text-navy-900 font-semibold">
                  {MEMORIAL_DATA.service.videoTributeUrl === ""
                    ? `Video tribute coming soon...`
                    : "In Loving Memory of Todd"}
                </h3>
                <p className="text-stone-600 mt-1 text-sm">
                  A collection of treasured memories.
                </p>
              </div>
              <div className="bg-black">
                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                  {MEMORIAL_DATA.service.videoTributeUrl === "" ? (
                    <img
                      src="/video-tribute-thumbnail.png"
                      alt="Video Tribute"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  ) : (
                    <iframe
                      src={MEMORIAL_DATA.service.videoTributeUrl}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      title="In Loving Memory of Todd"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* RSVP Form Section */}
            <div className="mt-8 animate-on-scroll">
              <RSVPForm />
            </div>

            {/* Guestbook Section */}
            <div className="animate-on-scroll">
              <Guestbook />
            </div>

            {/* Family Gratitude Section */}
            <div className="mt-10 p-6 bg-stone-100 rounded-xl text-center border border-stone-200 animate-on-scroll">
              <h3 className="font-serif text-xl text-navy-900 mb-3">
                Family Gratitude
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                We are deeply grateful for the outpouring of love, prayers, and
                support during this difficult time.
              </p>
              <div className="flex justify-center text-navy-900 opacity-50">
                <Heart className="w-6 h-6 fill-current" />
              </div>
            </div>
          </SectionWrapper>
        </main>

        {/* Footer Section */}
        <footer className="relative text-center py-12 px-6 bg-white border-t border-stone-100 overflow-hidden">
          <div className="relative z-10">
            <p className="text-stone-400 text-xs tracking-widest uppercase mb-2">
              In Loving Memory of
            </p>
            <p className="text-navy-900 font-serif font-bold text-lg mb-4 tracking-wide">
              Todd James San Agustin
            </p>

            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-6 bg-gold-500 opacity-60"></div>
              <p className="font-serif italic text-gold-500 font-medium text-sm">
                Semper Fi
              </p>
              <div className="h-px w-6 bg-gold-500 opacity-60"></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/program"
        element={<Program onBack={() => navigate("/")} />}
      />
      <Route
        path="/print-program"
        element={<PrintableProgram onBack={() => navigate("/")} />}
      />
      <Route
        path="/print-parking-info"
        element={<PrintableParkingInfo onBack={() => navigate("/")} />}
      />
      <Route
        path="/vimeo-thumbnail"
        element={<VimeoThumbnail onBack={() => navigate("/")} />}
      />
    </Routes>
  );
};

export default App;
