import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { MEMORIAL_DATA } from "./constants";
import { EventCard } from "./components/EventCard";
import { SectionWrapper } from "./components/SectionWrapper";
import { Guestbook } from "./components/Guestbook";
import { RSVPForm } from "./components/RSVPForm";
import { PrintableProgram } from "./components/PrintableProgram";
import { Heart, Printer } from "lucide-react";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translateY(24px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-in {
        animation: fadeUp 2.8s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.08}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F6] font-sans selection:bg-navy-900 selection:text-white">
      {/* Background Flag Effect - subtle overlay */}
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
        {/* Header / Hero Section */}
        <header className="relative text-center pt-12 pb-8 px-6 bg-gradient-to-b from-white to-[#F0F0F0]">
          {/* Decorative Top Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gold-500 opacity-50"></div>

          {/* Name & Title */}
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

            {/* Photo with Frame */}
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

        {/* Date Highlight - Static Flow */}
        <div className="bg-navy-900 text-white text-center py-4 px-4 relative z-20 shadow-md animate-on-scroll">
          <p className="font-serif text-xl md:text-2xl tracking-wide">
            {MEMORIAL_DATA.serviceDate}
          </p>
        </div>

        {/* Main Content */}
        <main className="p-4 md:p-4 bg-[#FDFBF7]">
          <SectionWrapper className="max-w-xl mx-auto">
            <p className="text-center text-stone-600 italic font-serif mb-8 text-lg animate-on-scroll">
              The family invites you to join them in honoring the life and
              service of Todd James San Agustin.
            </p>

            {/* Timeline Line */}
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

            {/* Livestream Section */}
            <div className="mt-8 mb-6 bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden animate-on-scroll">
              <div className="p-6 bg-stone-50 border-b border-stone-100">
                <h3 className="font-serif text-2xl text-navy-900 font-semibold flex items-center">
                  <span className="mr-3 relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  Watch Service Live
                </h3>
                <p className="text-stone-600 mt-1 text-sm">
                  Join us virtually to celebrate Todd's life.
                </p>
              </div>
              <div className="bg-black">
                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                  <iframe
                    src="https://vimeo.com/event/5581149/embed"
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
                    title="Memorial Service Livestream"
                  />
                </div>
              </div>
            </div>

            {/* RSVP Section - Placed after details, before livestream */}
            <div className="mt-8">
              <RSVPForm />
            </div>

            {/* Guestbook Section */}
            <Guestbook />

            {/* Printable Program Feature - commented out until finalized */}
            {/* <div className="mt-8 flex flex-col items-center">
              <button
                onClick={() => navigate("/program")}
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
            </div> */}

            {/* Additional Info / Resources */}
            <div className="mt-10 p-6 bg-stone-100 rounded-xl text-center border border-stone-200 animate-on-scroll">
              <h3 className="font-serif text-xl text-navy-900 mb-3">
                Family Gratitude
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                We are deeply grateful for the outpouring of love, prayers, and
                support during this difficult time. Your kindness has been a
                comfort to us all.
              </p>
              <div className="flex justify-center text-navy-900 opacity-50">
                <Heart className="w-6 h-6 fill-current" />
              </div>
            </div>
          </SectionWrapper>
        </main>

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

const ProgramPage: React.FC = () => {
  const navigate = useNavigate();
  return <PrintableProgram onBack={() => navigate("/")} />;
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/program" element={<ProgramPage />} />
    </Routes>
  );
};

export default App;
