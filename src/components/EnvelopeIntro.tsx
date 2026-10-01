import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audioManager';
import { CulturalMotifBadge } from './CulturalMotifs';
import { CulturalTemplate, Language } from '../types/wedding';
import { Sparkles, Music } from 'lucide-react';

interface EnvelopeIntroProps {
  template: CulturalTemplate;
  onOpen: () => void;
  guestName?: string;
  lang: Language;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({
  template,
  onOpen,
  guestName,
  lang,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const isAnnaprashan = template.id === 'annaprashan';
  const isBirthday = template.id === 'birthday';
  const isBengali = lang === 'native';

  const handleOpen = () => {
    setIsOpening(true);

    // Auspicious Confetti Burst with theme colors
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: [template.colors.accent, template.colors.primary, '#F59E0B', '#FFFFFF']
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: [template.colors.accent, template.colors.primary]
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: [template.colors.accent, template.colors.primary]
        });
      }, 250);
    } catch {}

    // Play celebration audio track
    audioManager.play();

    // Smooth transition to unveil the full invitation view
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 text-[#FDFBF7]"
      style={{
        backgroundColor: template.colors.primaryDark,
        backgroundImage: `radial-gradient(${template.colors.accent} 1.5px, transparent 1.5px)`,
        backgroundSize: '24px 24px'
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25"
        style={{ backgroundColor: template.colors.accent }}
      />

      {/* Main Envelope Container */}
      <div
        className={`relative w-full max-w-md transition-all duration-1000 ease-out transform ${
          isOpening ? 'scale-105 opacity-0 -translate-y-12' : 'scale-100 opacity-100'
        }`}
      >
        {/* Outer Shadow Envelope Card */}
        <div
          className="relative rounded-3xl p-2.5 shadow-2xl border-2"
          style={{
            backgroundColor: template.colors.envelopeOuter,
            borderColor: `${template.colors.border || template.colors.accent}80`
          }}
        >
          {/* Inner Golden Border Frame */}
          <div
            className={`relative bg-gradient-to-b ${template.colors.envelopeInner} rounded-2xl p-6 sm:p-8 border overflow-hidden text-center`}
            style={{ borderColor: `${template.colors.border || template.colors.accent}90` }}
          >
            {/* Subtle Texture */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#FFFFFF 1px, transparent 1px)`,
                backgroundSize: '16px 16px'
              }}
            />

            {/* Corner Decorative Accents */}
            <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-amber-300/80" />
            <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-amber-300/80" />
            <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-amber-300/80" />
            <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-amber-300/80" />

            {/* Auspicious Invocation Heading */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="text-xs sm:text-sm tracking-widest font-serif font-extrabold uppercase text-[#FEF08A] drop-shadow-sm">
                {template.quotes.invocation}
              </p>
            </div>

            {/* Cultural Emblem Centerpiece */}
            <div className="flex justify-center my-3">
              <CulturalMotifBadge templateId={template.id} className="w-16 h-14 drop-shadow-lg" />
            </div>

            {/* Auspicious Title - High Contrast White & Gold */}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide drop-shadow-md mb-1 font-serif text-white">
              {lang === 'native' ? template.quotes.nativeWeddingTitle : template.quotes.weddingTitle}
            </h1>
            <p className="text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 font-serif font-bold text-[#FDE68A] drop-shadow-sm">
              {template.cultureLabel}
            </p>

            {/* Event Specific Honoree & Family Card */}
            {isAnnaprashan ? (
              <div className="my-4 py-3.5 px-4 border rounded-2xl bg-black/35 backdrop-blur-md border-amber-300/50 shadow-inner text-center space-y-1">
                <span className="text-[11px] uppercase font-serif tracking-wider font-bold text-[#FDE68A] block">
                  🥣 {isBengali ? 'স্নেহের রাজপুত্র' : 'The Little Prince'}
                </span>
                <p className="text-2xl sm:text-3xl text-white font-extrabold font-serif tracking-wide drop-shadow">
                  {isBengali ? template.groom.nativeName : template.groom.name}
                </p>
                <p className="text-xs text-amber-100 font-serif font-medium">
                  {isBengali ? template.groom.nativeParents : template.groom.parents}
                </p>
              </div>
            ) : isBirthday ? (
              <div className="my-4 py-3.5 px-4 border rounded-2xl bg-black/35 backdrop-blur-md border-pink-300/50 shadow-inner text-center space-y-1">
                <span className="text-[11px] uppercase font-serif tracking-wider font-bold text-[#FDE047] block">
                  👑 {isBengali ? 'জন্মদিনের রাজকন্যা' : 'Birthday Princess'}
                </span>
                <p className="text-2xl sm:text-3xl text-white font-extrabold font-serif tracking-wide drop-shadow">
                  {isBengali ? template.groom.nativeName : template.groom.name}
                </p>
                <p className="text-xs text-pink-100 font-serif font-medium">
                  {isBengali ? template.groom.nativeParents : template.groom.parents}
                </p>
              </div>
            ) : (
              <div className="my-4 py-3.5 px-4 border rounded-2xl bg-black/35 backdrop-blur-md border-amber-300/50 shadow-inner text-center">
                <p className="text-xl sm:text-2xl text-white font-extrabold font-serif tracking-wide drop-shadow">
                  {lang === 'native' ? template.groom.nativeName : template.groom.name}{' '}
                  <span className="text-[#FDE68A]">&amp;</span>{' '}
                  {lang === 'native' ? template.bride.nativeName : template.bride.name}
                </p>
              </div>
            )}

            {/* Personalized Guest Badge or Welcome Notice */}
            {guestName ? (
              <div className="my-4 px-4 py-2.5 rounded-xl border border-amber-300/60 bg-black/40 backdrop-blur-md inline-block max-w-full shadow-md">
                <p className="text-[11px] uppercase font-serif tracking-wider text-[#FDE68A] font-bold">
                  {lang === 'en'
                    ? 'Cordially Invited'
                    : template.id === 'bihari_marwari' || template.id === 'royal_north'
                    ? 'सादर निमंत्रण'
                    : 'সাদর নিমন্ত্রণ'}
                </p>
                <p className="font-serif text-lg sm:text-xl text-white font-bold truncate mt-0.5">
                  {guestName}
                </p>
              </div>
            ) : (
              <div className="my-3 max-w-sm mx-auto">
                <p className="text-xs sm:text-sm text-stone-100 font-serif font-medium leading-relaxed px-2 drop-shadow-sm">
                  {lang === 'native' ? template.quotes.nativeWelcomeNotice : template.quotes.welcomeNotice}
                </p>
              </div>
            )}

            {/* High-Contrast Interactive Open Button */}
            <div className="mt-4 flex flex-col items-center gap-2.5">
              <button
                onClick={handleOpen}
                className={`group relative cursor-pointer flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r ${template.colors.buttonGradient} font-serif font-extrabold text-base sm:text-lg rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 ${
                  isBirthday
                    ? 'text-white shadow-purple-900/60 border border-white/40'
                    : 'text-[#3B0709] shadow-amber-900/50 border border-amber-200/50'
                }`}
              >
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span className="tracking-wide">
                  {lang === 'en'
                    ? (isBirthday ? 'Enter Celebration' : 'Open Invitation')
                    : template.id === 'bihari_marwari' || template.id === 'royal_north'
                    ? 'निमंत्रण पत्र खोलें'
                    : isBirthday
                    ? 'উৎসবে প্রবেশ করুন'
                    : 'পত্র উন্মোচন করুন'}
                </span>
                <Music className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </button>

              <p className="text-xs text-stone-200 font-serif font-medium flex items-center gap-1.5 drop-shadow">
                <span>🎵</span>
                <span>
                  {isBirthday
                    ? 'Tap to enter with joyful birthday music'
                    : isAnnaprashan
                    ? 'Tap to enter with auspicious shehnai & flute lullaby'
                    : 'Tap to enter with traditional auspicious shehnai'}
                </span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
