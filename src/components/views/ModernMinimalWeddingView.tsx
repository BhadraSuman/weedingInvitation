import React, { useState } from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import { WeddingRingsIcon, BotanicalDivider } from '../CulturalMotifs';
import { CountdownTimer } from '../CountdownTimer';
import { VenueLocation } from '../VenueLocation';
import { WishesGuestbook } from '../WishesGuestbook';
import { RsvpSection } from '../RsvpSection';
import { Footer } from '../Footer';
import { NriGlobalSuite } from '../common/NriGlobalSuite';
import { SectionReveal } from '../common/SectionReveal';
import { Calendar, Clock, MapPin, Sparkles, Wine, Compass, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ModernMinimalWeddingViewProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
}

export const ModernMinimalWeddingView: React.FC<ModernMinimalWeddingViewProps> = ({
  template,
  lang,
  guestName,
}) => {
  const { groom, bride, events, colors, quotes } = template;
  const [hearted, setHearted] = useState(false);

  const triggerElegantBurst = () => {
    // White & blush rose confetti — modern luxury feel
    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.45 },
      colors: ['#ffffff', '#f8c8d4', '#C89D7C', '#1E3A2F', '#a8d5b5'],
      shapes: ['circle'],
      scalar: 0.9,
      gravity: 0.6,
    });
    setHearted(true);
    setTimeout(() => setHearted(false), 2000);
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-12 sm:px-6">

      {/* Subtle floating botanicals (white/sage palette for modern) */}
      <style>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          33%       { transform: translateY(-10px) rotate(3deg); opacity: 0.9; }
          66%       { transform: translateY(-5px) rotate(-2deg); opacity: 0.8; }
        }
        .animate-float-gentle { animation: float-gentle 6s ease-in-out infinite; }

        @keyframes rings-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(200,157,124,0); }
          50%       { transform: scale(1.06); box-shadow: 0 0 20px 6px rgba(200,157,124,0.3); }
        }
        .animate-rings-pulse { animation: rings-pulse 3s ease-in-out infinite; }

        @keyframes line-grow {
          from { width: 0; opacity: 0; }
          to   { width: 100%; opacity: 1; }
        }
        .animate-line-grow { animation: line-grow 1s cubic-bezier(0.22,1,0.36,1) both; }

        @keyframes fade-in-up-sm {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-in-up-sm 0.6s ease-out both; }

        @keyframes shimmer-h {
          0%   { background-position: -300% 0; }
          100% { background-position: 300% 0; }
        }
        .animate-text-shimmer {
          background: linear-gradient(90deg, #1E3A2F 35%, #4A7C59 50%, #1E3A2F 65%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-h 4s ease-in-out infinite;
        }
      `}</style>

      {/* Floating botanical elements */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
        {['🌿', '✦', '🌿', '◇', '🌿', '✦'].map((el, i) => (
          <div
            key={i}
            className="absolute text-[#4A7C59]/20 animate-float-gentle"
            style={{
              left: `${[5, 20, 40, 60, 80, 95][i]}%`,
              top: `${[10, 70, 30, 50, 15, 60][i]}%`,
              fontSize: `${[14, 10, 16, 8, 12, 10][i]}px`,
              animationDelay: `${i * 0.9}s`,
              animationDuration: `${6 + i}s`,
            }}
          >
            {el}
          </div>
        ))}
      </div>

      {/* 1. High-Fashion Editorial Cover */}
      <SectionReveal direction="scale" threshold={0.05}>
        <section
          className="relative bg-white rounded-3xl p-8 sm:p-14 shadow-xl border border-stone-200 text-center overflow-hidden cursor-pointer"
          onClick={triggerElegantBurst}
          title="Tap to celebrate 💐"
        >

          {/* Geometric grid overlay */}
          <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(#1E3A2F_1px,transparent_1px),linear-gradient(90deg,#1E3A2F_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />

          {/* Monogram Seal */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-stone-300 flex items-center justify-center font-serif text-xl tracking-widest text-[#1E3A2F] animate-rings-pulse">
            K&amp;A
          </div>

          {/* Overline label */}
          <SectionReveal direction="up" delay={80}>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#C89D7C] font-semibold mb-2 font-serif">
              {quotes.invocation}
            </p>
          </SectionReveal>

          {/* VIP Guest Badge */}
          {guestName && (
            <SectionReveal direction="scale" delay={100}>
              <div className="my-4 inline-block px-5 py-1.5 rounded-full border border-[#C89D7C]/60 bg-[#F9F7F2] hover:border-[#C89D7C] transition-colors">
                <span className="text-xs uppercase tracking-wider text-[#1E3A2F] font-serif font-medium">
                  A Warm Invitation to {guestName}
                </span>
              </div>
            </SectionReveal>
          )}

          {/* Grand Names — shimmer on hover */}
          <SectionReveal direction="up" delay={120}>
            <h1 className="text-4xl sm:text-7xl font-serif tracking-tight text-[#1E3A2F] my-4 font-normal hover:animate-text-shimmer transition-all duration-700">
              {groom.name}{' '}
              <span className="text-[#C89D7C] font-serif italic text-3xl sm:text-5xl">&amp;</span>{' '}
              {bride.name}
            </h1>
          </SectionReveal>

          {/* Quote */}
          <SectionReveal direction="up" delay={160}>
            <p className="text-xs sm:text-sm text-stone-500 font-serif italic max-w-md mx-auto leading-relaxed my-4">
              "{quotes.verse}"
            </p>
          </SectionReveal>

          {/* Heart CTA */}
          <button
            onClick={(e) => { e.stopPropagation(); triggerElegantBurst(); }}
            className={`inline-flex items-center gap-1.5 text-xs font-sans text-[#C89D7C] hover:text-rose-500 transition-colors my-2 ${hearted ? 'scale-125' : 'scale-100'} transition-transform duration-200`}
          >
            <Heart className={`w-4 h-4 ${hearted ? 'fill-rose-400 text-rose-400' : ''}`} />
            <span>{hearted ? 'With love ❤️' : 'Send blessings'}</span>
          </button>

          <BotanicalDivider className="my-6 max-w-xs mx-auto" color="#4A7C59" />

          {/* Date & Venue badges */}
          <SectionReveal direction="up" delay={80}>
            <div className="inline-flex flex-wrap items-center justify-center gap-3 mt-2 text-xs font-sans tracking-widest uppercase text-[#1E3A2F]">
              <span className="px-4 py-1.5 rounded-full bg-[#F9F7F2] border border-stone-200 hover:border-[#4A7C59] transition-colors">
                December 20, 2026
              </span>
              <span className="px-4 py-1.5 rounded-full bg-[#F9F7F2] border border-stone-200 hover:border-[#4A7C59] transition-colors">
                Cabo Serai, South Goa
              </span>
            </div>
          </SectionReveal>

        </section>
      </SectionReveal>

      {/* 2. Portrait Grid */}
      <section className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <SectionReveal direction="left" delay={80}>
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col items-center text-center group hover:shadow-lg transition-all duration-300 h-full">
            <div className="w-52 h-64 rounded-2xl overflow-hidden mb-4 shadow group-hover:shadow-xl transition-shadow duration-300">
              <img
                src={groom.image}
                alt={groom.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#C89D7C] font-bold font-serif">
              The Groom
            </span>
            <h3 className="text-2xl font-serif text-[#1E3A2F] font-normal mt-1">{groom.name}</h3>
            <p className="text-xs text-stone-500 font-serif mt-1">{groom.parents}</p>
            <p className="text-xs text-stone-600 font-serif italic mt-3 px-4">
              "{groom.about}"
            </p>
          </div>
        </SectionReveal>

        <SectionReveal direction="right" delay={80}>
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col items-center text-center group hover:shadow-lg transition-all duration-300 h-full">
            <div className="w-52 h-64 rounded-2xl overflow-hidden mb-4 shadow group-hover:shadow-xl transition-shadow duration-300">
              <img
                src={bride.image}
                alt={bride.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#C89D7C] font-bold font-serif">
              The Bride
            </span>
            <h3 className="text-2xl font-serif text-[#1E3A2F] font-normal mt-1">{bride.name}</h3>
            <p className="text-xs text-stone-500 font-serif mt-1">{bride.parents}</p>
            <p className="text-xs text-stone-600 font-serif italic mt-3 px-4">
              "{bride.about}"
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* 3. Live Countdown */}
      <SectionReveal direction="up" delay={50} className="my-10">
        <CountdownTimer template={template} lang={lang} />
      </SectionReveal>

      {/* 4. Itinerary */}
      <section className="my-12">
        <SectionReveal direction="up">
          <div className="text-center mb-8">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C89D7C] font-semibold font-sans block">
              Weekend Schedule
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1E3A2F] font-normal mt-1">
              The Celebration Itinerary
            </h2>
            <BotanicalDivider className="max-w-xs mx-auto my-3" color="#4A7C59" />
          </div>
        </SectionReveal>

        <div className="space-y-6">
          {events.map((evt, idx) => (
            <SectionReveal key={evt.id} direction={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 80}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm hover:shadow-md hover:border-[#4A7C59]/30 transition-all duration-300 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center group">
                <div className="space-y-2 max-w-lg">
                  <span className="text-[11px] uppercase tracking-widest font-sans text-[#C89D7C] font-semibold">
                    Part 0{idx + 1}
                  </span>
                  <h3 className="text-2xl font-serif text-[#1E3A2F] font-normal group-hover:text-[#4A7C59] transition-colors duration-300">
                    {evt.title}
                  </h3>
                  <p className="text-xs font-serif italic text-stone-500">
                    {evt.tagline}
                  </p>
                  <p className="text-xs text-stone-600 font-serif leading-relaxed">
                    {evt.description}
                  </p>
                  <div className="pt-1 flex flex-wrap gap-2">
                    {evt.highlights.map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-[11px] px-3 py-1 rounded-full bg-[#F9F7F2] text-[#1E3A2F] font-sans border border-stone-200 hover:bg-[#1E3A2F] hover:text-white transition-colors cursor-default"
                      >
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-64 p-5 rounded-2xl bg-[#F9F7F2] border border-stone-200 space-y-2 text-xs font-sans shrink-0">
                  <p className="font-semibold text-[#1E3A2F]">📅 {evt.date}</p>
                  <p className="text-stone-600">⏰ {evt.time}</p>
                  <p className="text-stone-600">📍 {evt.venueName}</p>
                  <p className="text-[#C89D7C] pt-1 border-t border-stone-200 font-medium">
                    🍸 Attire: {evt.dressCode}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* 5. Venue */}
      <SectionReveal direction="up">
        <VenueLocation template={template} lang={lang} />
      </SectionReveal>

      {/* 6. NRI Suite */}
      <SectionReveal direction="up" delay={50}>
        <NriGlobalSuite template={template} lang={lang} />
      </SectionReveal>

      {/* 7. Guestbook */}
      <SectionReveal direction="up">
        <WishesGuestbook template={template} lang={lang} />
      </SectionReveal>

      {/* 8. RSVP */}
      <SectionReveal direction="up">
        <RsvpSection template={template} lang={lang} />
      </SectionReveal>

      {/* 9. Footer */}
      <Footer template={template} lang={lang} />

    </div>
  );
};
