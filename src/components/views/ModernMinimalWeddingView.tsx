import React from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import { WeddingRingsIcon, BotanicalDivider } from '../CulturalMotifs';
import { CountdownTimer } from '../CountdownTimer';
import { VenueLocation } from '../VenueLocation';
import { WishesGuestbook } from '../WishesGuestbook';
import { RsvpSection } from '../RsvpSection';
import { Footer } from '../Footer';
import { Calendar, Clock, MapPin, Sparkles, Wine, Compass } from 'lucide-react';

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

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-12 sm:px-6">
      
      {/* 1. High-Fashion Editorial Cover Page */}
      <section className="relative bg-white rounded-3xl p-8 sm:p-14 shadow-xl border border-stone-200 text-center">
        
        {/* Monogram Seal */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-stone-300 flex items-center justify-center font-serif text-xl tracking-widest text-[#1E3A2F]">
          K&amp;A
        </div>

        <p className="text-[11px] uppercase tracking-[0.35em] text-[#C89D7C] font-semibold mb-2 font-serif">
          {quotes.invocation}
        </p>

        {/* Guest VIP Badge */}
        {guestName && (
          <div className="my-4 inline-block px-5 py-1.5 rounded-full border border-[#C89D7C]/60 bg-[#F9F7F2]">
            <span className="text-xs uppercase tracking-wider text-[#1E3A2F] font-serif font-medium">
              A Warm Invitation to {guestName}
            </span>
          </div>
        )}

        {/* Minimalist Editorial Headline */}
        <h1 className="text-4xl sm:text-7xl font-serif tracking-tight text-[#1E3A2F] my-4 font-normal">
          {groom.name} <span className="text-[#C89D7C] font-serif italic text-3xl sm:text-5xl">&amp;</span> {bride.name}
        </h1>

        <p className="text-xs sm:text-sm text-stone-500 font-serif italic max-w-md mx-auto leading-relaxed my-4">
          "{quotes.verse}"
        </p>

        <BotanicalDivider className="my-6 max-w-xs mx-auto" color="#4A7C59" />

        {/* Ceremony Date & Coastal Destination */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 mt-2 text-xs font-serif tracking-widest uppercase text-[#1E3A2F]">
          <span className="px-4 py-1.5 rounded-full bg-[#F9F7F2] border border-stone-200">
            December 20, 2026
          </span>
          <span className="px-4 py-1.5 rounded-full bg-[#F9F7F2] border border-stone-200">
            Cabo Serai, South Goa
          </span>
        </div>

      </section>

      {/* 2. Asymmetric Portrait Grid */}
      <section className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-52 h-64 rounded-2xl overflow-hidden mb-4 shadow">
            <img src={groom.image} alt={groom.name} className="w-full h-full object-cover" />
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

        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-52 h-64 rounded-2xl overflow-hidden mb-4 shadow">
            <img src={bride.image} alt={bride.name} className="w-full h-full object-cover" />
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
      </section>

      {/* 3. Live Countdown */}
      <div className="my-10">
        <CountdownTimer template={template} lang={lang} />
      </div>

      {/* 4. Curated Itinerary (Modern Minimalist Timeline) */}
      <section className="my-12">
        <div className="text-center mb-8">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C89D7C] font-semibold font-serif block">
            Weekend Schedule
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1E3A2F] font-normal mt-1">
            The Celebration Itinerary
          </h2>
          <BotanicalDivider className="max-w-xs mx-auto my-3" color="#4A7C59" />
        </div>

        <div className="space-y-6">
          {events.map((evt, idx) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between gap-6 items-start md:items-center"
            >
              <div className="space-y-2 max-w-lg">
                <span className="text-[11px] uppercase tracking-widest font-serif text-[#C89D7C] font-semibold">
                  Part 0{idx + 1}
                </span>
                <h3 className="text-2xl font-serif text-[#1E3A2F] font-normal">
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
                    <span key={hIdx} className="text-[11px] px-3 py-1 rounded-full bg-[#F9F7F2] text-[#1E3A2F] font-serif border border-stone-200">
                      ✦ {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-64 p-5 rounded-2xl bg-[#F9F7F2] border border-stone-200 space-y-2 text-xs font-serif shrink-0">
                <p className="font-semibold text-[#1E3A2F]">📅 {evt.date}</p>
                <p className="text-stone-600">⏰ {evt.time}</p>
                <p className="text-stone-600">📍 {evt.venueName}</p>
                <p className="text-[#C89D7C] pt-1 border-t border-stone-200 font-medium">
                  🍸 Attire: {evt.dressCode}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Venue Location */}
      <VenueLocation template={template} lang={lang} />

      {/* 6. Guestbook */}
      <WishesGuestbook template={template} lang={lang} />

      {/* 7. RSVP with Uddipta Tech Solutions contact coordination */}
      <RsvpSection template={template} lang={lang} />

      {/* 8. Footer */}
      <Footer template={template} lang={lang} />

    </div>
  );
};
