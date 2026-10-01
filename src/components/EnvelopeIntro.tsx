import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audioManager';
import { ToporMukutIcon, ShankhoIcon } from './AlponaMotifs';
import { Language } from '../types/wedding';
import { Sparkles, Music } from 'lucide-react';

interface EnvelopeIntroProps {
  onOpen: () => void;
  guestName?: string;
  lang: Language;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ onOpen, guestName, lang }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);

    // Auspicious Marigold & Gold Confetti Burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#8B181B', '#F59E0B', '#F3E5AB', '#FFFFFF']
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#D4AF37', '#F59E0B', '#8B181B']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#D4AF37', '#F59E0B', '#8B181B']
        });
      }, 250);
    } catch {
      // Confetti fallback
    }

    // Play auspicious wedding background music
    audioManager.play();

    // Smooth transition to main invite view
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#200A0C] bg-[radial-gradient(#8B181B_1px,transparent_1px)] [background-size:24px_24px] p-4 text-[#FDFBF7]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Envelope Container */}
      <div
        className={`relative w-full max-w-md transition-all duration-1000 ease-out transform ${
          isOpening ? 'scale-105 opacity-0 -translate-y-12' : 'scale-100 opacity-100'
        }`}
      >
        {/* Outer Shadow Envelope Card */}
        <div className="relative bg-[#7A1316] rounded-2xl p-2 shadow-2xl border-2 border-[#D4AF37]/40">
          {/* Inner Golden Border Frame */}
          <div className="relative bg-gradient-to-b from-[#8B181B] to-[#5C0C0F] rounded-xl p-6 sm:p-8 border border-[#D4AF37]/50 overflow-hidden text-center">
            
            {/* Bengali Traditional Alpona Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Corner Decorative Accents */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />

            {/* Auspicious Mangal Heading */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <ShankhoIcon className="w-5 h-5 text-[#D4AF37]" size={20} />
              <p className="font-bengali text-xs tracking-widest text-[#F3E5AB]">
                || শ্রী শ্রী দুর্গা সহায় ||
              </p>
              <ShankhoIcon className="w-5 h-5 text-[#D4AF37]" size={20} />
            </div>

            {/* Crown Motif */}
            <div className="flex justify-center mb-3">
              <ToporMukutIcon className="w-16 h-12" />
            </div>

            {/* Auspicious Title */}
            <h1 className="font-bengali text-3xl sm:text-4xl text-[#F3E5AB] font-bold tracking-wide drop-shadow-md mb-1">
              শুভ বিবাহ
            </h1>
            <p className="font-royal text-sm sm:text-base tracking-[0.25em] text-[#D4AF37] uppercase mb-4">
              Shubho Bibaho
            </p>

            {/* Couple Names Preview */}
            <div className="my-5 py-3 border-y border-[#D4AF37]/30 bg-[#4F070A]/40 rounded-lg">
              <p className="font-bengali text-lg sm:text-xl text-[#FFFFFF] font-semibold">
                অনির্বাণ <span className="text-[#D4AF37] font-serif">&amp;</span> দেবলীনা
              </p>
              <p className="font-serif italic text-sm text-[#F3E5AB]/90 mt-0.5">
                Anirban Mukherjee &amp; Deboleena Banerjee
              </p>
            </div>

            {/* Personalized Guest Badge */}
            {guestName ? (
              <div className="mb-6 px-4 py-2 bg-[#52090C] rounded-lg border border-[#D4AF37]/40 inline-block max-w-full">
                <p className="text-xs text-[#D4AF37] uppercase font-royal tracking-wider">
                  {lang === 'bn' ? 'সাদর আমন্ত্রণ' : 'Cordially Invited'}
                </p>
                <p className="font-serif text-base sm:text-lg text-white font-semibold truncate">
                  {guestName}
                </p>
              </div>
            ) : (
              <div className="mb-6">
                <p className="text-xs text-[#F3E5AB] font-bengali italic">
                  সবান্ধব সপরিবারে আপনার উপস্থিতি ও শুভকামনা একান্ত প্রার্থনীয়
                </p>
              </div>
            )}

            {/* Interactive Wax Seal / Open Button */}
            <div className="mt-2 flex flex-col items-center gap-3">
              <button
                onClick={handleOpen}
                className="group relative cursor-pointer flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#5C0C0F] font-bold text-base sm:text-lg rounded-full shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-5 h-5 text-[#8B181B] animate-pulse" />
                <span className="font-bengali tracking-wide">
                  {lang === 'bn' ? 'পত্র উন্মোচন করুন' : 'Open Invitation'}
                </span>
                <Music className="w-4 h-4 text-[#8B181B] group-hover:rotate-12 transition-transform" />
              </button>

              <p className="text-[11px] text-[#F3E5AB]/70 flex items-center gap-1.5 mt-1 font-serif">
                <span>🎵</span> Tap to enter with traditional wedding music
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
