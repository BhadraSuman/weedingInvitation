import React, { useState } from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import { TempleLampIcon, KolamDivider } from '../CulturalMotifs';
import { CountdownTimer } from '../CountdownTimer';
import { VenueLocation } from '../VenueLocation';
import { WishesGuestbook } from '../WishesGuestbook';
import { RsvpSection } from '../RsvpSection';
import { Footer } from '../Footer';
import { FloatingPetals } from '../common/FloatingPetals';
import { NriGlobalSuite } from '../common/NriGlobalSuite';
import { SectionReveal } from '../common/SectionReveal';
import { Sparkles, Calendar, Clock, MapPin, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SouthIndianWeddingViewProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
}

export const SouthIndianWeddingView: React.FC<SouthIndianWeddingViewProps> = ({
  template,
  lang,
  guestName,
}) => {
  const { groom, bride, events, colors, quotes } = template;

  // Flower burst on couple names click
  const triggerKolamBurst = () => {
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#FF9800', '#FFF176', '#FFCC02', '#E53935', '#74121D'],
      shapes: ['circle', 'square'],
      scalar: 1.1,
    });
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-10 sm:px-6">

      {/* Floating Jasmine & Marigold Petals (South Indian palette) */}
      <FloatingPetals primaryColor="#74121D" accentColor="#D4AF37" />

      {/* Inline animation keyframes */}
      <style>{`
        @keyframes diwa-glow {
          0%, 100% { box-shadow: 0 0 12px 2px #D4AF3755; }
          50%       { box-shadow: 0 0 28px 8px #D4AF37cc; }
        }
        .animate-diwa-glow { animation: diwa-glow 2.5s ease-in-out infinite; }

        @keyframes kolam-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-kolam-spin { animation: kolam-spin 18s linear infinite; }

        @keyframes sway {
          0%, 100% { transform: rotate(-4deg); }
          50%       { transform: rotate(4deg); }
        }
        .animate-sway { animation: sway 3s ease-in-out infinite; }

        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.07); }
        }
        .animate-pulse-scale { animation: pulse-scale 2s ease-in-out infinite; }
      `}</style>

      {/* 1. Temple Mandapam Frame */}
      <SectionReveal direction="scale" threshold={0.05}>
        <div className="relative bg-[#FFFDF9] rounded-3xl p-4 sm:p-10 border-4 border-[#74121D] shadow-2xl overflow-hidden">

          {/* Kolam dot grid background */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#74121D_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />

          {/* Spinning kolam ornament */}
          <div
            className="absolute -top-8 -right-8 w-28 h-28 opacity-10 animate-kolam-spin pointer-events-none"
            aria-hidden="true"
          >
            <KolamDivider color="#D4AF37" />
          </div>
          <div
            className="absolute -bottom-8 -left-8 w-28 h-28 opacity-10 animate-kolam-spin pointer-events-none"
            style={{ animationDirection: 'reverse' }}
            aria-hidden="true"
          >
            <KolamDivider color="#74121D" />
          </div>

          <div className="relative z-10 border-2 border-[#D4AF37] rounded-2xl p-6 sm:p-10 bg-[#FDF9F2]">

            {/* Temple Lamps — swaying */}
            <div className="flex items-center justify-between px-2 mb-4">
              <div className="animate-sway origin-bottom animate-diwa-glow rounded-full p-1">
                <TempleLampIcon className="w-10 h-14" color="#D4AF37" />
              </div>
              <div className="text-center">
                <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#74121D]">
                  {quotes.invocation}
                </span>
                <p className="text-xs font-serif text-[#997819] italic mt-0.5">
                  {quotes.subInvocation}
                </p>
              </div>
              <div className="animate-sway origin-bottom animate-diwa-glow rounded-full p-1"
                style={{ animationDelay: '0.4s' }}>
                <TempleLampIcon className="w-10 h-14" color="#D4AF37" />
              </div>
            </div>

            {/* Sacred Shloka */}
            <SectionReveal direction="up" delay={100}>
              <div className="my-4 p-4 rounded-xl bg-[#F5EBE1] border border-[#D4AF37]/50 text-center max-w-lg mx-auto">
                <p className="font-serif text-xs sm:text-sm text-[#74121D] whitespace-pre-line leading-relaxed font-semibold">
                  {quotes.verse}
                </p>
                {quotes.verseAuthor && (
                  <p className="text-xs text-right mt-1.5 font-serif text-[#997819] font-medium">
                    {quotes.verseAuthor}
                  </p>
                )}
              </div>
            </SectionReveal>

            {/* Guest Welcome */}
            {guestName && (
              <SectionReveal direction="scale" delay={150}>
                <div className="mb-6 mx-auto max-w-md text-center bg-[#74121D]/10 border-y border-[#D4AF37] py-2.5 px-6 rounded-lg">
                  <span className="text-[11px] uppercase font-serif tracking-widest text-[#74121D] font-bold block">
                    {lang === 'native' ? 'நல்வரவு' : 'Welcome With Family'}
                  </span>
                  <span className="text-lg font-bold font-serif text-[#74121D]">
                    {guestName}
                  </span>
                </div>
              </SectionReveal>
            )}

            {/* Sacred Title — clickable burst */}
            <SectionReveal direction="up" delay={200}>
              <div
                className="text-center my-6 space-y-1 cursor-pointer select-none"
                onClick={triggerKolamBurst}
                title="Tap for blessings 🌸"
              >
                <h1 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-wide text-[#74121D] hover:text-[#5a0d13] transition-colors duration-300 animate-pulse-scale">
                  {lang === 'native' ? quotes.nativeWeddingTitle : quotes.weddingTitle}
                </h1>
                <p className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#997819] uppercase font-bold">
                  சுப முகூர்த்த திருமண அழைப்பிதழ்
                </p>
              </div>
            </SectionReveal>

            <KolamDivider className="my-4 max-w-xs mx-auto" color="#D4AF37" />

            {/* Couple Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 items-stretch">

              <SectionReveal direction="left" delay={100}>
                <div className="bg-white rounded-2xl p-6 border-2 border-[#D4AF37]/60 shadow-sm text-center h-full hover:shadow-lg hover:border-[#74121D]/50 transition-all duration-300">
                  <div className="w-36 h-44 mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37] mb-3 shadow animate-diwa-glow">
                    <img src={groom.image} alt={groom.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#74121D]/10 text-[#74121D] font-serif text-xs font-bold uppercase">
                    {lang === 'native' ? groom.nativeRole : groom.role}
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-[#74121D] mt-2">
                    {lang === 'native' ? groom.nativeName : groom.name}
                  </h3>
                  <p className="text-xs font-serif text-[#4A3B32] mt-2 p-2 bg-[#FDF9F2] rounded-lg border border-[#D4AF37]/30">
                    {lang === 'native' ? groom.nativeParents : groom.parents}
                  </p>
                  <p className="text-xs font-serif italic text-[#74121D] mt-3">
                    "{lang === 'native' ? groom.nativeAbout : groom.about}"
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal direction="right" delay={100}>
                <div className="bg-white rounded-2xl p-6 border-2 border-[#D4AF37]/60 shadow-sm text-center h-full hover:shadow-lg hover:border-[#74121D]/50 transition-all duration-300">
                  <div className="w-36 h-44 mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37] mb-3 shadow animate-diwa-glow">
                    <img src={bride.image} alt={bride.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#74121D]/10 text-[#74121D] font-serif text-xs font-bold uppercase">
                    {lang === 'native' ? bride.nativeRole : bride.role}
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-[#74121D] mt-2">
                    {lang === 'native' ? bride.nativeName : bride.name}
                  </h3>
                  <p className="text-xs font-serif text-[#4A3B32] mt-2 p-2 bg-[#FDF9F2] rounded-lg border border-[#D4AF37]/30">
                    {lang === 'native' ? bride.nativeParents : bride.parents}
                  </p>
                  <p className="text-xs font-serif italic text-[#74121D] mt-3">
                    "{lang === 'native' ? bride.nativeAbout : bride.about}"
                  </p>
                </div>
              </SectionReveal>

            </div>

            {/* Muhurtham Timing */}
            <SectionReveal direction="up" delay={80}>
              <div className="p-4 rounded-2xl bg-[#74121D] text-[#FBE9D0] text-center shadow-lg border border-[#D4AF37] animate-diwa-glow">
                <p className="text-[11px] uppercase tracking-widest font-serif text-[#D4AF37] font-bold">
                  சுப முகூர்த்த நேரம் • Auspicious Muhurtham
                </p>
                <p className="text-lg sm:text-xl font-bold font-serif mt-1">
                  வெள்ளிக்கிழமை, 4 டிசம்பர் 2026 | காலை 7:30 - 9:00 மணி
                </p>
                <p className="text-xs font-serif opacity-90 mt-0.5">
                  மணவறை: தாஜ் பிஷர்மேன்ஸ் கோவ், சென்னை
                </p>
              </div>
            </SectionReveal>

          </div>
        </div>
      </SectionReveal>

      {/* 2. Live Countdown */}
      <SectionReveal direction="up" delay={50} className="my-10">
        <CountdownTimer template={template} lang={lang} />
      </SectionReveal>

      {/* 3. Sacred Ceremonies Timeline */}
      <section className="my-12">
        <SectionReveal direction="up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-serif text-[#74121D]">
              {lang === 'native' ? 'திருக்கல்யாண வைபவங்கள்' : 'Sacred Wedding Ceremonies'}
            </h2>
            <KolamDivider className="max-w-xs mx-auto my-2" color="#D4AF37" />
          </div>
        </SectionReveal>

        <div className="space-y-6">
          {events.map((evt, idx) => (
            <SectionReveal key={evt.id} direction={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 80}>
              <div className="bg-white rounded-2xl p-6 border-2 border-[#D4AF37]/60 shadow-md flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:border-[#74121D] hover:shadow-lg transition-all duration-300">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#74121D] text-white font-serif text-xs font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <h3 className="text-xl font-bold font-serif text-[#74121D]">
                      {lang === 'native' ? evt.nativeTitle : evt.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#997819] font-serif font-semibold">
                    {lang === 'native' ? evt.nativeTagline : evt.tagline}
                  </p>
                  <p className="text-xs text-[#4A3B32] font-serif leading-relaxed">
                    {lang === 'native' ? evt.nativeDescription : evt.description}
                  </p>
                  <div className="pt-1 flex flex-wrap gap-2">
                    {(lang === 'native' ? evt.nativeHighlights : evt.highlights).map((h, hIdx) => (
                      <span key={hIdx} className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F5EBE1] text-[#74121D] font-serif border border-[#D4AF37]/30 hover:bg-[#74121D] hover:text-white transition-colors cursor-default">
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FDF9F2] p-4 rounded-xl border border-[#D4AF37]/40 w-full md:w-64 space-y-2 text-xs font-serif shrink-0">
                  <p className="font-semibold text-[#74121D]">📅 {lang === 'native' ? evt.nativeDate : evt.date}</p>
                  <p className="text-[#4A3B32]">⏰ {lang === 'native' ? evt.nativeTime : evt.time}</p>
                  <p className="text-[#4A3B32]">📍 {lang === 'native' ? evt.nativeVenueName : evt.venueName}</p>
                  <p className="text-[#997819] pt-1 border-t border-[#D4AF37]/30 font-medium">
                    🥻 {lang === 'native' ? evt.nativeDressCode : evt.dressCode}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* 4. Venue */}
      <SectionReveal direction="up">
        <VenueLocation template={template} lang={lang} />
      </SectionReveal>

      {/* 5. NRI Suite */}
      <SectionReveal direction="up" delay={50}>
        <NriGlobalSuite template={template} lang={lang} />
      </SectionReveal>

      {/* 6. Guestbook */}
      <SectionReveal direction="up">
        <WishesGuestbook template={template} lang={lang} />
      </SectionReveal>

      {/* 7. RSVP */}
      <SectionReveal direction="up">
        <RsvpSection template={template} lang={lang} />
      </SectionReveal>

      {/* 8. Footer */}
      <Footer template={template} lang={lang} />

    </div>
  );
};
