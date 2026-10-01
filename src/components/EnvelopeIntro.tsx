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

    // Play wedding background music
    audioManager.play();

    // Smooth transition
    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 text-[#FDFBF7]"
      style={{
        backgroundColor: template.colors.primaryDark,
        backgroundImage: `radial-gradient(${template.colors.accent} 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
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
          className="relative rounded-2xl p-2 shadow-2xl border-2"
          style={{
            backgroundColor: template.colors.envelopeOuter,
            borderColor: `${template.colors.accent}66`
          }}
        >
          {/* Inner Golden Border Frame */}
          <div
            className={`relative bg-gradient-to-b ${template.colors.envelopeInner} rounded-xl p-6 sm:p-8 border overflow-hidden text-center`}
            style={{ borderColor: `${template.colors.accent}80` }}
          >
            {/* Cultural Alpona / Motif Background Texture */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(${template.colors.accent} 1px, transparent 1px)`,
                backgroundSize: '16px 16px'
              }}
            />

            {/* Corner Decorative Accents */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: template.colors.accent }} />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: template.colors.accent }} />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: template.colors.accent }} />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: template.colors.accent }} />

            {/* Auspicious Invocation Heading */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <p
                className="text-xs tracking-widest font-serif font-bold uppercase"
                style={{ color: template.colors.accentLight }}
              >
                {template.quotes.invocation}
              </p>
            </div>

            {/* Cultural Emblem Centerpiece */}
            <div className="flex justify-center mb-3">
              <CulturalMotifBadge templateId={template.id} className="w-16 h-14" />
            </div>

            {/* Auspicious Wedding Title */}
            <h1
              className="text-3xl sm:text-4xl font-bold tracking-wide drop-shadow-md mb-1 font-serif"
              style={{ color: template.colors.accentLight }}
            >
              {lang === 'native' ? template.quotes.nativeWeddingTitle : template.quotes.weddingTitle}
            </h1>
            <p
              className="text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 font-serif font-semibold"
              style={{ color: template.colors.accent }}
            >
              {template.cultureLabel}
            </p>

            {/* Couple Names Preview */}
            <div
              className="my-5 py-3 border-y rounded-lg"
              style={{
                borderColor: `${template.colors.accent}40`,
                backgroundColor: `${template.colors.primaryDark}80`
              }}
            >
              <p className="text-lg sm:text-xl text-white font-semibold font-serif">
                {lang === 'native' ? template.groom.nativeName : template.groom.name}{' '}
                <span style={{ color: template.colors.accent }}>&amp;</span>{' '}
                {lang === 'native' ? template.bride.nativeName : template.bride.name}
              </p>
            </div>

            {/* Personalized Guest Badge */}
            {guestName ? (
              <div
                className="mb-6 px-4 py-2 rounded-lg border inline-block max-w-full"
                style={{
                  backgroundColor: `${template.colors.primaryDark}B3`,
                  borderColor: `${template.colors.accent}66`
                }}
              >
                <p className="text-[11px] uppercase font-serif tracking-wider" style={{ color: template.colors.accent }}>
                  {lang === 'native' ? 'সাদর নিমন্ত্রণ / सादर निमंत्रण' : 'Cordially Invited'}
                </p>
                <p className="font-serif text-base sm:text-lg text-white font-semibold truncate">
                  {guestName}
                </p>
              </div>
            ) : (
              <div className="mb-6">
                <p className="text-xs italic px-2" style={{ color: template.colors.accentLight }}>
                  {lang === 'native' ? template.quotes.nativeWelcomeNotice : template.quotes.welcomeNotice}
                </p>
              </div>
            )}

            {/* Interactive Open Button */}
            <div className="mt-2 flex flex-col items-center gap-3">
              <button
                onClick={handleOpen}
                className={`group relative cursor-pointer flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r ${template.colors.buttonGradient} text-[#3B0709] font-bold text-base sm:text-lg rounded-full shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all duration-300 hover:scale-105 active:scale-95`}
              >
                <Sparkles className="w-5 h-5 animate-pulse" style={{ color: template.colors.primary }} />
                <span className="font-serif tracking-wide">
                  {lang === 'native' ? 'পত্র উন্মোচন করুন / Open' : 'Open Invitation'}
                </span>
                <Music className="w-4 h-4 group-hover:rotate-12 transition-transform" style={{ color: template.colors.primary }} />
              </button>

              <p className="text-[11px] flex items-center gap-1.5 mt-1 font-serif" style={{ color: `${template.colors.accentLight}B3` }}>
                <span>🎵</span> Tap to enter with traditional wedding music
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
