import React from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import { TempleLampIcon, KolamDivider } from '../CulturalMotifs';
import { CountdownTimer } from '../CountdownTimer';
import { VenueLocation } from '../VenueLocation';
import { WishesGuestbook } from '../WishesGuestbook';
import { RsvpSection } from '../RsvpSection';
import { Footer } from '../Footer';
import { Sparkles, Calendar, Clock, MapPin, Heart } from 'lucide-react';

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

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-10 sm:px-6">
      
      {/* 1. Temple Mandapam Arch & Brass Lamp Frame */}
      <div className="relative bg-[#FFFDF9] rounded-3xl p-4 sm:p-10 border-4 border-[#74121D] shadow-2xl overflow-hidden">
        
        {/* Kolam Geometric Lattice Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#74121D_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative z-10 border-2 border-[#D4AF37] rounded-2xl p-6 sm:p-10 bg-[#FDF9F2]">
          
          {/* Temple Lamps on both flanks */}
          <div className="flex items-center justify-between px-2 mb-4">
            <TempleLampIcon className="w-10 h-14" color="#D4AF37" />
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#74121D]">
                {quotes.invocation}
              </span>
              <p className="text-xs font-serif text-[#997819] italic mt-0.5">
                {quotes.subInvocation}
              </p>
            </div>
            <TempleLampIcon className="w-10 h-14" color="#D4AF37" />
          </div>

          {/* Mangalya Suktam Sacred Shloka Card */}
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

          {/* Guest Personalization Callout */}
          {guestName && (
            <div className="mb-6 mx-auto max-w-md text-center bg-[#74121D]/10 border-y border-[#D4AF37] py-2.5 px-6 rounded-lg">
              <span className="text-[11px] uppercase font-serif tracking-widest text-[#74121D] font-bold block">
                {lang === 'native' ? 'நல்வரவு' : 'Welcome With Family'}
              </span>
              <span className="text-lg font-bold font-serif text-[#74121D]">
                {guestName}
              </span>
            </div>
          )}

          {/* Sacred Title */}
          <div className="text-center my-6 space-y-1">
            <h1 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-wide text-[#74121D]">
              {lang === 'native' ? quotes.nativeWeddingTitle : quotes.weddingTitle}
            </h1>
            <p className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#997819] uppercase font-bold">
              சுப முகூர்த்த திருமண அழைப்பிதழ்
            </p>
          </div>

          <KolamDivider className="my-4 max-w-xs mx-auto" color="#D4AF37" />

          {/* The Couple Details in Classical South Indian Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 items-stretch">
            
            {/* Groom Card */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#D4AF37]/60 shadow-sm text-center">
              <div className="w-36 h-44 mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37] mb-3 shadow">
                <img src={groom.image} alt={groom.name} className="w-full h-full object-cover" />
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

            {/* Bride Card */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#D4AF37]/60 shadow-sm text-center">
              <div className="w-36 h-44 mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37] mb-3 shadow">
                <img src={bride.image} alt={bride.name} className="w-full h-full object-cover" />
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

          </div>

          {/* Subha Muhurtham Timing Highlight */}
          <div className="p-4 rounded-2xl bg-[#74121D] text-[#FBE9D0] text-center shadow-lg border border-[#D4AF37]">
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

        </div>
      </div>

      {/* 2. Live Countdown */}
      <div className="my-10">
        <CountdownTimer template={template} lang={lang} />
      </div>

      {/* 3. Sacred Ceremonies Timeline (Oonjal, Muhurtham, Saptapadi) */}
      <section className="my-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif text-[#74121D]">
            {lang === 'native' ? 'திருக்கல்யாண வைபவங்கள்' : 'Sacred Wedding Ceremonies'}
          </h2>
          <KolamDivider className="max-w-xs mx-auto my-2" color="#D4AF37" />
        </div>

        <div className="space-y-6">
          {events.map((evt, idx) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl p-6 border-2 border-[#D4AF37]/60 shadow-md flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:border-[#74121D] transition-all"
            >
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
                    <span key={hIdx} className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F5EBE1] text-[#74121D] font-serif border border-[#D4AF37]/30">
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
          ))}
        </div>
      </section>

      {/* 4. Venue Location */}
      <VenueLocation template={template} lang={lang} />

      {/* 5. Guestbook */}
      <WishesGuestbook template={template} lang={lang} />

      {/* 6. RSVP with Suman Bhadra coordination */}
      <RsvpSection template={template} lang={lang} />

      {/* 7. Footer */}
      <Footer template={template} lang={lang} />

    </div>
  );
};
