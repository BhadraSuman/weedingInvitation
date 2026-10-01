import React from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import { GaneshaIcon, MaurIcon, MadhubaniDivider } from '../CulturalMotifs';
import { CountdownTimer } from '../CountdownTimer';
import { VenueLocation } from '../VenueLocation';
import { WishesGuestbook } from '../WishesGuestbook';
import { RsvpSection } from '../RsvpSection';
import { Footer } from '../Footer';
import { Sparkles, Calendar, Clock, MapPin, Music, Sun, Heart, Flame } from 'lucide-react';

interface BihariMarwariWeddingViewProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
}

export const BihariMarwariWeddingView: React.FC<BihariMarwariWeddingViewProps> = ({
  template,
  lang,
  guestName,
}) => {
  const { groom, bride, events, colors, quotes } = template;

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-10 sm:px-6">
      
      {/* 1. Traditional Mithila & Marwar Heritage Vivah Card */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D4AF37] bg-gradient-to-b from-[#4A0012] via-[#800020] to-[#3B000E] text-white p-6 sm:p-12 text-center">
        
        {/* Sacred Geometric Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

        {/* Lord Ganesha Invocation */}
        <div className="relative z-10 max-w-lg mx-auto mb-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#3B000E] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg">
            <GaneshaIcon className="w-10 h-10" color="#FBE8A6" />
          </div>
          <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
            {quotes.invocation}
          </p>
          <div className="my-3 py-2 px-4 bg-[#3B000E]/70 rounded-xl border border-[#D4AF37]/40">
            <p className="font-serif text-xs sm:text-sm text-[#FBE8A6] whitespace-pre-line leading-relaxed italic">
              {quotes.verse}
            </p>
          </div>
        </div>

        {/* Guest VIP Badge */}
        {guestName && (
          <div className="relative z-10 inline-block px-6 py-2.5 rounded-full bg-[#3B000E]/90 border border-[#D4AF37] mb-6 shadow-md">
            <span className="text-xs uppercase font-serif tracking-widest text-[#D4AF37] block">
              {lang === 'native' ? 'सादर आमंत्रण' : 'Honored Wedding Guest'}
            </span>
            <span className="text-lg sm:text-xl font-bold font-serif text-white">
              {guestName}
            </span>
          </div>
        )}

        {/* Traditional Maur (मौर) Emblem */}
        <div className="relative z-10 flex justify-center mb-4">
          <MaurIcon className="w-20 h-16 transform hover:scale-105 transition-transform" color="#D4AF37" />
        </div>

        {/* Wedding Title */}
        <div className="relative z-10 space-y-1 mb-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-wide text-[#FBE8A6] drop-shadow-lg">
            {lang === 'native' ? quotes.nativeWeddingTitle : quotes.weddingTitle}
          </h1>
          <p className="text-xs sm:text-sm uppercase font-serif tracking-[0.25em] text-[#D4AF37]">
            बिहारी एवं मारवाड़ी पावन विवाह संस्कार
          </p>
        </div>

        <MadhubaniDivider className="relative z-10 max-w-xs mx-auto my-4" color="#D4AF37" />

        {/* The Couple Names & Lineage */}
        <div className="relative z-10 my-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
          <div className="text-center sm:text-right">
            <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] block font-serif">
              {lang === 'native' ? groom.nativeRole : groom.role}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#FBE8A6]">
              {lang === 'native' ? groom.nativeName : groom.name}
            </h2>
            <p className="text-xs font-serif text-stone-200 mt-1">
              {lang === 'native' ? groom.nativeParents : groom.parents}
            </p>
          </div>

          <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] bg-[#3B000E] flex items-center justify-center font-serif text-xl font-bold text-[#D4AF37] shadow-md shrink-0">
            संग
          </div>

          <div className="text-center sm:text-left">
            <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] block font-serif">
              {lang === 'native' ? bride.nativeRole : bride.role}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#FBE8A6]">
              {lang === 'native' ? bride.nativeName : bride.name}
            </h2>
            <p className="text-xs font-serif text-stone-200 mt-1">
              {lang === 'native' ? bride.nativeParents : bride.parents}
            </p>
          </div>
        </div>

        {/* Date & Venue Snapshot */}
        <div className="relative z-10 inline-flex flex-wrap items-center justify-center gap-3 mt-4">
          <div className="px-5 py-2 rounded-full bg-[#3B000E] border border-[#D4AF37] text-xs font-serif text-[#FBE8A6]">
            📅 {lang === 'native' ? template.targetDateNative : 'Saturday, 12th December 2026'}
          </div>
          <div className="px-5 py-2 rounded-full bg-[#3B000E] border border-[#D4AF37] text-xs font-serif text-[#FBE8A6]">
            📍 {lang === 'native' ? template.venue.nativeName : template.venue.name}
          </div>
        </div>

      </section>

      {/* 2. Live Countdown */}
      <div className="my-10">
        <CountdownTimer template={template} lang={lang} />
      </div>

      {/* 3. The 5 Authentic Bihari & Marwari Rituals */}
      <section className="my-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#800020]">
            {lang === 'native' ? 'मांगलिक कार्यक्रम एवं रस्में' : 'Auspicious Rituals & Celebrations'}
          </h2>
          <p className="text-xs text-[#D4AF37] font-serif uppercase tracking-widest mt-1">
            तिलक, मटकोर, महिला संगीत, तोरण-विवाह एवं बहूभोज
          </p>
          <MadhubaniDivider className="max-w-xs mx-auto my-3" color="#D4AF37" />
        </div>

        <div className="space-y-6">
          {events.map((evt, idx) => {
            const isVivahDay = evt.key === 'baraat_vivah';

            return (
              <div
                key={evt.id}
                className={`rounded-3xl p-6 sm:p-8 transition-all duration-300 border-2 shadow-md hover:shadow-xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between ${
                  isVivahDay
                    ? 'bg-gradient-to-r from-[#FFF5F5] to-[#FFF0F2] border-[#800020]'
                    : 'bg-white border-[#D4AF37]/50'
                }`}
              >
                <div className="space-y-3 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#800020] text-[#FBE8A6] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                      ०{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#800020]">
                        {lang === 'native' ? evt.nativeTitle : evt.title}
                      </h3>
                      <p className="text-xs font-serif text-[#D4AF37] font-semibold italic">
                        {lang === 'native' ? evt.nativeTagline : evt.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A3B32] font-serif leading-relaxed">
                    {lang === 'native' ? evt.nativeDescription : evt.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {(lang === 'native' ? evt.nativeHighlights : evt.highlights).map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-[11px] px-3 py-0.5 rounded-full bg-[#FCF8F2] text-[#800020] font-serif border border-[#D4AF37]/30"
                      >
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-64 p-5 rounded-2xl bg-[#FCF8F2] border border-[#D4AF37]/40 space-y-2 text-xs font-serif shrink-0">
                  <p className="font-semibold text-[#800020]">📅 {lang === 'native' ? evt.nativeDate : evt.date}</p>
                  <p className="text-[#4A3B32]">⏰ {lang === 'native' ? evt.nativeTime : evt.time}</p>
                  <p className="text-[#4A3B32]">📍 {lang === 'native' ? evt.nativeVenueName : evt.venueName}</p>
                  <p className="text-[#800020] pt-1 border-t border-[#D4AF37]/30 font-medium">
                    👗 {lang === 'native' ? evt.nativeDressCode : evt.dressCode}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Couple Lineage & Background */}
      <section className="my-14 bg-white rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/60 shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif text-[#800020]">
            {lang === 'native' ? 'वर-वधू परिचय' : 'The Bride & Groom'}
          </h2>
          <MadhubaniDivider className="max-w-xs mx-auto my-2" color="#D4AF37" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-3xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-[#FCF8F2] border border-[#D4AF37]/40 flex flex-col justify-between">
            <div>
              <div className="w-44 h-56 mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-md mb-4">
                <img src={groom.image} alt={groom.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#800020]">{groom.name}</h3>
              <p className="text-xs text-[#D4AF37] font-serif font-semibold">{groom.location}</p>
              <div className="my-3 p-3 bg-white rounded-xl border border-stone-200 text-xs text-[#4A3B32] space-y-1 font-serif">
                <p className="font-semibold text-[#800020]">{lang === 'native' ? groom.nativeParents : groom.parents}</p>
                <p className="opacity-90">{lang === 'native' ? groom.nativeGrandparents : groom.grandparents}</p>
              </div>
            </div>
            <p className="text-xs italic text-stone-600 font-serif">
              "{lang === 'native' ? groom.nativeAbout : groom.about}"
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-[#FCF8F2] border border-[#D4AF37]/40 flex flex-col justify-between">
            <div>
              <div className="w-44 h-56 mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-md mb-4">
                <img src={bride.image} alt={bride.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#800020]">{bride.name}</h3>
              <p className="text-xs text-[#D4AF37] font-serif font-semibold">{bride.location}</p>
              <div className="my-3 p-3 bg-white rounded-xl border border-stone-200 text-xs text-[#4A3B32] space-y-1 font-serif">
                <p className="font-semibold text-[#800020]">{lang === 'native' ? bride.nativeParents : bride.parents}</p>
                <p className="opacity-90">{lang === 'native' ? bride.nativeGrandparents : bride.grandparents}</p>
              </div>
            </div>
            <p className="text-xs italic text-stone-600 font-serif">
              "{lang === 'native' ? bride.nativeAbout : bride.about}"
            </p>
          </div>
        </div>
      </section>

      {/* 5. Venue Location */}
      <VenueLocation template={template} lang={lang} />

      {/* 6. Guestbook */}
      <WishesGuestbook template={template} lang={lang} />

      {/* 7. RSVP with Suman Bhadra coordination */}
      <RsvpSection template={template} lang={lang} />

      {/* 8. Footer */}
      <Footer template={template} lang={lang} />

    </div>
  );
};
