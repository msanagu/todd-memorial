import React from 'react';
import { MEMORIAL_DATA } from './constants';
import { EventCard } from './components/EventCard';
import { SectionWrapper } from './components/SectionWrapper';
import { Heart } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9F8F6] font-sans selection:bg-navy-900 selection:text-white">
      {/* Background Flag Effect - subtle overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url('https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10 shadow-2xl min-h-screen bg-white/80 backdrop-blur-sm sm:my-8 sm:rounded-xl overflow-hidden border-t-8 border-navy-900">
        
        {/* Header / Hero Section */}
        <header className="relative text-center pt-12 pb-8 px-6 bg-gradient-to-b from-white to-[#F0F0F0]">
           {/* Decorative Top Line */}
           <div className="absolute top-0 left-0 right-0 h-1 bg-gold-500 opacity-50"></div>

          {/* Name & Title */}
          <SectionWrapper>
            <h1 className="font-serif text-4xl md:text-5xl text-navy-900 tracking-tight leading-tight mb-2">
              <span className="block font-medium">TODD JAMES</span>
              <span className="block font-bold">SAN AGUSTIN</span>
            </h1>
            
            <div className="flex items-center justify-center gap-3 text-stone-500 text-sm md:text-base font-medium tracking-widest uppercase mt-4 mb-8">
              <span>{MEMORIAL_DATA.dob}</span>
              <span className="text-gold-500">•</span>
              <span>{MEMORIAL_DATA.dod}</span>
            </div>

            {/* Photo with Frame */}
            <div className="relative mx-auto w-64 h-80 md:w-72 md:h-96 shadow-2xl rounded-sm p-2 bg-white transform rotate-1 transition-transform hover:rotate-0 duration-500">
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
        <div className="bg-navy-900 text-white text-center py-4 px-4 relative z-20 shadow-md">
          <p className="font-serif text-xl md:text-2xl tracking-wide">
            {MEMORIAL_DATA.serviceDate}
          </p>
        </div>

        {/* Main Content */}
        <main className="p-4 md:p-8 bg-[#FDFBF7]">
          <SectionWrapper className="max-w-xl mx-auto">
            <p className="text-center text-stone-600 italic font-serif mb-8 text-lg">
              The family invites you to join them in honoring the life and service of Todd James San Agustin.
            </p>

            {/* Timeline Line */}
            <div className="relative">
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-stone-200 hidden md:block"></div>
              
              <div className="relative z-10">
                <EventCard event={MEMORIAL_DATA.burial} isFirst={true} />
                <EventCard event={MEMORIAL_DATA.service} />
              </div>
            </div>

            {/* Additional Info / Resources */}
            <div className="mt-10 p-6 bg-stone-100 rounded-xl text-center border border-stone-200">
              <h3 className="font-serif text-xl text-navy-900 mb-3">Family Gratitude</h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                We are deeply grateful for the outpouring of love, prayers, and support during this difficult time. Your kindness has been a comfort to us all.
              </p>
              <div className="flex justify-center text-navy-900 opacity-50">
                <Heart className="w-6 h-6 fill-current" />
              </div>
            </div>

          </SectionWrapper>
        </main>

        <footer className="text-center py-8 text-stone-400 text-xs bg-white border-t border-stone-100">
          <p>In Loving Memory of Todd James San Agustin</p>
          <p className="mt-1">Semper Fi</p>
        </footer>
      </div>
    </div>
  );
};

export default App;