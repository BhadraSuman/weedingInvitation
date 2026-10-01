import React from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import { GaneshaIcon, RoyalElephantIcon, JharokhaDivider } from '../CulturalMotifs';
import { CountdownTimer } from '../CountdownTimer';
import { VenueLocation } from '../VenueLocation';
import { WishesGuestbook } from '../WishesGuestbook';
import { RsvpSection } from '../RsvpSection';
import { Footer } from '../Footer';
import { Sparkles, Calendar, Clock, MapPin, Music, Sun, Heart } from 'lucide-react';

interface RoyalNorthWeddingViewProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
}

export const RoyalNorthWeddingView: React.FC<RoyalNorthWeddingViewProps> = ({
  template,
  lang,
  guestName,
}) => {
  const { groom, bride, events, colors, quotes } = template;

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-10 sm:px-6">
      
      {/* 1. Regal Palace Hero with Jharokha Arch Framing */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#4A080A] via-[#7B1113] to-[#4A080A] text-white p-6 sm:p-12 text-center">
        
        {/* Subtle Palace Wallpaper Texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

        {/* Lord Ganesha Sunburst Invocations */}
        <div className="relative z-10 max-w-md mx-auto mb-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#3B0709] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg">
            <GaneshaIcon className="w-10 h-10" color="#F3E5AB" />
          </div>
          <p className="font-serif text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
            {quotes.invocation}
          </p>
          <p className="font-serif text-xs sm:text-sm text-[#F3E5AB] whitespace-pre-line mt-1.5 leading-relaxed italic">
            {quotes.verse}
          </p>
        </div>

        {/* Guest VIP Badge */}
        {guestName && (
          <div className="relative z-10 inline-block px-6 py-2.5 rounded-full bg-[#3B0709]/80 border border-[#D4AF37] mb-6 shadow-md">
            <span className="text-xs uppercase font-serif tracking-widest text-[#D4AF37] block">
              {lang === 'native' ? 'सादर आमंत्रण' : 'Royal Wedding Guest'}
            </span>
            <span className="text-lg sm:text-xl font-bold font-serif text-white">
              {guestName}
            </span>
          </div>
        )}

        {/* Royal Elephant Emblem */}
        <div className="relative z-10 flex justify-center mb-4">
          <RoyalElephantIcon className="w-20 h-16 transform hover:scale-105 transition-transform" color="#D4AF37" />
        </div>

        {/* Grand Wedding Title */}
        <div className="relative z-10 space-y-1 mb-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-wide text-[#F3E5AB] drop-shadow-lg">
            {lang === 'native' ? quotes.nativeWeddingTitle : quotes.weddingTitle}
          </h1>
          <p className="text-xs sm:text-sm uppercase font-serif tracking-[0.3em] text-[#D4AF37]">
            शाही विवाह उत्सव • Grand Celebration
          </p>
        </div>

        <JharokhaDivider className="relative z-10 max-w-xs mx-auto my-4" color="#D4AF37" />

        {/* The Couple Royal Monogram & Name Cards */}
        <div className="relative z-10 my-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
          <div className="text-center sm:text-right">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#F3E5AB]">
              {lang === 'native' ? groom.nativeName : groom.name}
            </h2>
            <p className="text-xs font-serif text-[#D4AF37] mt-0.5">
              {lang === 'native' ? groom.nativeParents : groom.parents}
            </p>
          </div>

          <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] bg-[#3B0709] flex items-center justify-center font-serif text-xl font-bold text-[#D4AF37] shadow-md">
            &amp;
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#F3E5AB]">
              {lang === 'native' ? bride.nativeName : bride.name}
            </h2>
            <p className="text-xs font-serif text-[#D4AF37] mt-0.5">
              {lang === 'native' ? bride.nativeParents : bride.parents}
            </p>
          </div>
        </div>

        {/* Date & Resort Venue Badge */}
        <div className="relative z-10 inline-flex flex-wrap items-center justify-center gap-3 mt-4">
          <div className="px-5 py-2 rounded-full bg-[#3B0709] border border-[#D4AF37] text-xs font-serif text-[#F3E5AB]">
            📅 {lang === 'native' ? template.targetDateNative : 'Monday, 14th December 2026'}
          </div>
          <div className="px-5 py-2 rounded-full bg-[#3B0709] border border-[#D4AF37] text-xs font-serif text-[#F3E5AB]">
            📍 {lang === 'native' ? template.venue.nativeName : template.venue.name}
          </div>
        </div>

      </section>

      {/* 2. Live Auspicious Countdown */}
      <div className="my-10">
        <CountdownTimer template={template} lang={lang} />
      </div>

      {/* 3. Royal Festival Passes Timeline (Amantrran elevated into Royal UI) */}
      <section className="my-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#7B1113]">
            {lang === 'native' ? 'शाही उत्सव एवं समारोह' : 'Royal Wedding Celebrations'}
          </h2>
          <p className="text-xs text-[#997819] font-serif uppercase tracking-widest mt-1">
            Day-wise Celebrations &amp; Dress Themes
          </p>
          <JharokhaDivider className="max-w-xs mx-auto my-3" color="#D4AF37" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((evt, idx) => {
            // Unique color themes per event pass
            const cardThemes = [
              { bg: 'from-amber-400 via-amber-500 to-yellow-600', badge: 'bg-yellow-700 text-yellow-100', icon: <Sun className="w-5 h-5 text-white" /> },
              { bg: 'from-emerald-700 via-teal-800 to-emerald-900', badge: 'bg-emerald-950 text-emerald-200', icon: <Music className="w-5 h-5 text-white" /> },
              { bg: 'from-[#7B1113] via-[#5C0C0F] to-[#3B0709]', badge: 'bg-red-950 text-rose-200', icon: <Sparkles className="w-5 h-5 text-white" /> },
            ][idx % 3];

            return (
              <div
                key={evt.id}
                className="rounded-3xl overflow-hidden shadow-xl border-2 border-[#D4AF37] bg-white flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Event Top Banner */}
                <div className={`p-6 bg-gradient-to-br ${cardThemes.bg} text-white relative`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-serif uppercase tracking-widest text-[#F3E5AB] font-bold">
                      EVENT 0{idx + 1}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      {cardThemes.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold font-serif">
                    {lang === 'native' ? evt.nativeTitle : evt.title}
                  </h3>
                  <p className="text-xs opacity-90 italic mt-0.5">
                    {lang === 'native' ? evt.nativeTagline : evt.tagline}
                  </p>
                </div>

                {/* Event Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-[#4A3B32] leading-relaxed font-serif">
                    {lang === 'native' ? evt.nativeDescription : evt.description}
                  </p>

                  <div className="space-y-2 py-3 border-y border-stone-200 text-xs font-serif text-[#2C1810]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#7B1113]" />
                      <span className="font-semibold">{lang === 'native' ? evt.nativeDate : evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#7B1113]" />
                      <span>{lang === 'native' ? evt.nativeTime : evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#7B1113]" />
                      <span>{lang === 'native' ? evt.nativeVenueName : evt.venueName}</span>
                    </div>
                  </div>

                  {/* Dress Code Swatch */}
                  <div className="p-3 bg-[#FAF6EE] rounded-xl border border-[#D4AF37]/40 text-xs">
                    <span className="font-serif font-bold text-[#7B1113] block uppercase text-[10px] tracking-wider">
                      {lang === 'native' ? 'थीम एवं पहनावा / Theme' : 'Suggested Attire'}
                    </span>
                    <span className="text-[#5C0C0F] font-serif mt-0.5 block">
                      {lang === 'native' ? evt.nativeDressCode : evt.dressCode}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Couple Royal Showcase Gallery */}
      <section className="my-14 bg-[#FAF6EE] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif text-[#7B1113]">
            {lang === 'native' ? 'वर-वधू परिणय' : 'The Royal Couple'}
          </h2>
          <JharokhaDivider className="max-w-xs mx-auto my-2" color="#D4AF37" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center max-w-3xl mx-auto">
          <div className="text-center">
            <div className="w-48 h-60 mx-auto rounded-3xl overflow-hidden border-4 border-[#D4AF37] shadow-xl mb-4">
              <img src={groom.image} alt={groom.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-[#7B1113]">{groom.name}</h3>
            <p className="text-xs text-[#997819] font-serif">{groom.location}</p>
          </div>

          <div className="text-center">
            <div className="w-48 h-60 mx-auto rounded-3xl overflow-hidden border-4 border-[#D4AF37] shadow-xl mb-4">
              <img src={bride.image} alt={bride.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-[#7B1113]">{bride.name}</h3>
            <p className="text-xs text-[#997819] font-serif">{bride.location}</p>
          </div>
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
