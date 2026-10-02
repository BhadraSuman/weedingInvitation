import React from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import { GaneshaIcon, RoyalElephantIcon, JharokhaDivider } from '../CulturalMotifs';
import { CountdownTimer } from '../CountdownTimer';
import { VenueLocation } from '../VenueLocation';
import { WishesGuestbook } from '../WishesGuestbook';
import { RsvpSection } from '../RsvpSection';
import { Footer } from '../Footer';
import { FloatingPetals } from '../common/FloatingPetals';
import { NriGlobalSuite } from '../common/NriGlobalSuite';
import { SectionReveal } from '../common/SectionReveal';
import { Sparkles, Calendar, Clock, MapPin, Music, Sun, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

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

  const triggerRoyalBurst = () => {
    // Gold & crimson fireworks burst
    confetti({
      particleCount: 80,
      angle: 90,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#D4AF37', '#F3E5AB', '#FFD700', '#7B1113', '#fff', '#E5C158'],
      shapes: ['circle', 'square'],
      scalar: 1.3,
    });
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 60,
        origin: { x: 0, y: 0.5 },
        colors: ['#D4AF37', '#F3E5AB', '#FFD700'],
        scalar: 1.2,
      });
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 60,
        origin: { x: 1, y: 0.5 },
        colors: ['#D4AF37', '#F3E5AB', '#FFD700'],
        scalar: 1.2,
      });
    }, 200);
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-10 sm:px-6">

      {/* Rose & Marigold petal shower — royal crimson palette */}
      <FloatingPetals primaryColor="#7B1113" accentColor="#D4AF37" />

      <style>{`
        @keyframes royal-glow {
          0%, 100% { box-shadow: 0 0 16px 4px #D4AF3760; }
          50%       { box-shadow: 0 0 36px 12px #D4AF37bb; }
        }
        .animate-royal-glow { animation: royal-glow 3s ease-in-out infinite; }

        @keyframes elephant-sway {
          0%, 100% { transform: translateX(-3px) rotate(-1deg); }
          50%       { transform: translateX(3px) rotate(1deg); }
        }
        .animate-elephant-sway { animation: elephant-sway 4s ease-in-out infinite; }

        @keyframes jharokha-shine {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        .animate-jharokha-shine { animation: jharokha-shine 2.5s ease-in-out infinite; }

        @keyframes royal-pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.05); }
        }
        .animate-royal-pulse { animation: royal-pulse 2s ease-in-out infinite; }

        @keyframes card-hover-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
        .group:hover .animate-card-float { animation: card-hover-float 0.6s ease-in-out; }
      `}</style>

      {/* 1. Regal Palace Hero */}
      <SectionReveal direction="scale" threshold={0.05}>
        <section
          className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#4A080A] via-[#7B1113] to-[#4A080A] text-white p-6 sm:p-12 text-center cursor-pointer"
          onClick={triggerRoyalBurst}
          title="Tap for royal celebrations 🎉"
        >

          {/* Gold dot wallpaper */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

          {/* Corner jharokha ornaments */}
          <div className="absolute top-3 left-3 w-16 h-16 opacity-25 animate-jharokha-shine pointer-events-none">
            <JharokhaDivider color="#D4AF37" />
          </div>
          <div className="absolute top-3 right-3 w-16 h-16 opacity-25 animate-jharokha-shine pointer-events-none" style={{ animationDelay: '1.2s' }}>
            <JharokhaDivider color="#D4AF37" />
          </div>
          <div className="absolute bottom-3 left-3 w-16 h-16 opacity-25 animate-jharokha-shine pointer-events-none" style={{ animationDelay: '0.6s' }}>
            <JharokhaDivider color="#D4AF37" />
          </div>
          <div className="absolute bottom-3 right-3 w-16 h-16 opacity-25 animate-jharokha-shine pointer-events-none" style={{ animationDelay: '1.8s' }}>
            <JharokhaDivider color="#D4AF37" />
          </div>

          {/* Ganesha invocation */}
          <SectionReveal direction="up" delay={100}>
            <div className="relative z-10 max-w-md mx-auto mb-6">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#3B0709] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg animate-royal-glow">
                <GaneshaIcon className="w-10 h-10" color="#F3E5AB" />
              </div>
              <p className="font-serif text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                {quotes.invocation}
              </p>
              <p className="font-serif text-xs sm:text-sm text-[#F3E5AB] whitespace-pre-line mt-1.5 leading-relaxed italic">
                {quotes.verse}
              </p>
            </div>
          </SectionReveal>

          {/* VIP Guest Badge */}
          {guestName && (
            <SectionReveal direction="scale" delay={150}>
              <div className="relative z-10 inline-block px-6 py-2.5 rounded-full bg-[#3B0709]/80 border border-[#D4AF37] mb-6 shadow-md animate-royal-glow">
                <span className="text-xs uppercase font-serif tracking-widest text-[#D4AF37] block">
                  {lang === 'native' ? 'सादर आमंत्रण' : 'Royal Wedding Guest'}
                </span>
                <span className="text-lg sm:text-xl font-bold font-serif text-white">
                  {guestName}
                </span>
              </div>
            </SectionReveal>
          )}

          {/* Royal Elephant — swaying */}
          <div className="relative z-10 flex justify-center mb-4">
            <div className="animate-elephant-sway">
              <RoyalElephantIcon className="w-20 h-16" color="#D4AF37" />
            </div>
          </div>

          {/* Grand Title — pulsing */}
          <div className="relative z-10 space-y-1 mb-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-wide text-[#F3E5AB] drop-shadow-lg animate-royal-pulse">
              {lang === 'native' ? quotes.nativeWeddingTitle : quotes.weddingTitle}
            </h1>
            <p className="text-xs sm:text-sm uppercase font-serif tracking-[0.3em] text-[#D4AF37]">
              शाही विवाह उत्सव • Grand Celebration
            </p>
          </div>

          <JharokhaDivider className="relative z-10 max-w-xs mx-auto my-4" color="#D4AF37" />

          {/* Couple Name Cards */}
          <div className="relative z-10 my-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
            <SectionReveal direction="left" delay={80}>
              <div className="text-center sm:text-right">
                <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#F3E5AB] hover:text-[#D4AF37] transition-colors duration-300">
                  {lang === 'native' ? groom.nativeName : groom.name}
                </h2>
                <p className="text-xs font-serif text-[#D4AF37] mt-0.5">
                  {lang === 'native' ? groom.nativeParents : groom.parents}
                </p>
              </div>
            </SectionReveal>

            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] bg-[#3B0709] flex items-center justify-center font-serif text-xl font-bold text-[#D4AF37] shadow-md animate-royal-glow shrink-0">
              &amp;
            </div>

            <SectionReveal direction="right" delay={80}>
              <div className="text-center sm:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#F3E5AB] hover:text-[#D4AF37] transition-colors duration-300">
                  {lang === 'native' ? bride.nativeName : bride.name}
                </h2>
                <p className="text-xs font-serif text-[#D4AF37] mt-0.5">
                  {lang === 'native' ? bride.nativeParents : bride.parents}
                </p>
              </div>
            </SectionReveal>
          </div>

          {/* Date & Venue badges */}
          <div className="relative z-10 inline-flex flex-wrap items-center justify-center gap-3 mt-4">
            <div className="px-5 py-2 rounded-full bg-[#3B0709] border border-[#D4AF37] text-xs font-serif text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-[#3B0709] transition-colors duration-300">
              📅 {lang === 'native' ? template.targetDateNative : 'Monday, 14th December 2026'}
            </div>
            <div className="px-5 py-2 rounded-full bg-[#3B0709] border border-[#D4AF37] text-xs font-serif text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-[#3B0709] transition-colors duration-300">
              📍 {lang === 'native' ? template.venue.nativeName : template.venue.name}
            </div>
          </div>

        </section>
      </SectionReveal>

      {/* 2. Live Auspicious Countdown */}
      <SectionReveal direction="up" delay={50} className="my-10">
        <CountdownTimer template={template} lang={lang} />
      </SectionReveal>

      {/* 3. Royal Festival Passes */}
      <section className="my-12">
        <SectionReveal direction="up">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#7B1113]">
              {lang === 'native' ? 'शाही उत्सव एवं समारोह' : 'Royal Wedding Celebrations'}
            </h2>
            <p className="text-xs text-[#997819] font-serif uppercase tracking-widest mt-1">
              Day-wise Celebrations &amp; Dress Themes
            </p>
            <JharokhaDivider className="max-w-xs mx-auto my-3" color="#D4AF37" />
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((evt, idx) => {
            const cardThemes = [
              { bg: 'from-amber-400 via-amber-500 to-yellow-600', icon: <Sun className="w-5 h-5 text-white" /> },
              { bg: 'from-emerald-700 via-teal-800 to-emerald-900', icon: <Music className="w-5 h-5 text-white" /> },
              { bg: 'from-[#7B1113] via-[#5C0C0F] to-[#3B0709]', icon: <Sparkles className="w-5 h-5 text-white" /> },
            ][idx % 3];

            return (
              <SectionReveal key={evt.id} direction="up" delay={idx * 120}>
                <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-[#D4AF37] bg-white flex flex-col justify-between group hover:scale-[1.03] hover:shadow-2xl transition-all duration-300">
                  {/* Event Banner */}
                  <div className={`p-6 bg-gradient-to-br ${cardThemes.bg} text-white relative overflow-hidden`}>
                    {/* Shimmer overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
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

                    <div className="p-3 bg-[#FAF6EE] rounded-xl border border-[#D4AF37]/40 text-xs">
                      <span className="font-serif font-bold text-[#7B1113] block uppercase text-[10px] tracking-wider">
                        {lang === 'native' ? 'थीम एवं पहनावा' : 'Suggested Attire'}
                      </span>
                      <span className="text-[#5C0C0F] font-serif mt-0.5 block">
                        {lang === 'native' ? evt.nativeDressCode : evt.dressCode}
                      </span>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </section>

      {/* 4. Royal Couple Showcase */}
      <SectionReveal direction="up">
        <section className="my-14 bg-[#FAF6EE] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-serif text-[#7B1113]">
              {lang === 'native' ? 'वर-वधू परिणय' : 'The Royal Couple'}
            </h2>
            <JharokhaDivider className="max-w-xs mx-auto my-2" color="#D4AF37" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center max-w-3xl mx-auto">
            <SectionReveal direction="left" delay={100}>
              <div className="text-center group">
                <div className="w-48 h-60 mx-auto rounded-3xl overflow-hidden border-4 border-[#D4AF37] shadow-xl mb-4 animate-royal-glow group-hover:scale-105 transition-transform duration-500">
                  <img src={groom.image} alt={groom.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-[#7B1113]">{groom.name}</h3>
                <p className="text-xs text-[#997819] font-serif">{groom.location}</p>
              </div>
            </SectionReveal>

            <SectionReveal direction="right" delay={100}>
              <div className="text-center group">
                <div className="w-48 h-60 mx-auto rounded-3xl overflow-hidden border-4 border-[#D4AF37] shadow-xl mb-4 animate-royal-glow group-hover:scale-105 transition-transform duration-500">
                  <img src={bride.image} alt={bride.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-[#7B1113]">{bride.name}</h3>
                <p className="text-xs text-[#997819] font-serif">{bride.location}</p>
              </div>
            </SectionReveal>
          </div>
        </section>
      </SectionReveal>

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
