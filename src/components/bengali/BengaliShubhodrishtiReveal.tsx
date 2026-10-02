import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CulturalTemplate, Language } from '../../types/wedding';
import { RealisticPaanLeaf, PadmaAlponaMandala, HeavyAlponaBorder } from '../AlponaMotifs';
import { Sparkles, Eye, RotateCcw, Heart, Calendar, Clock, MapPin } from 'lucide-react';

interface BengaliShubhodrishtiRevealProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
}

export const BengaliShubhodrishtiReveal: React.FC<BengaliShubhodrishtiRevealProps> = ({
  template,
  lang,
  guestName
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const isBengali = lang === 'native';

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#E11D48', '#BE185D', '#F59E0B', '#D4AF37', '#FFFBEB'],
      });
    } catch {
      // ignore
    }
  };

  const handleToggleReveal = () => {
    if (!isRevealed) {
      triggerConfetti();
    }
    setIsRevealed(!isRevealed);
  };

  return (
    <section className="relative my-14 px-3 sm:px-6 max-w-4xl mx-auto" id="shubhodrishti">
      
      {/* Heavy Alpona Top Border */}
      <HeavyAlponaBorder className="mb-6 opacity-90" />

      {/* Main Sacred Stage Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#FFFDF9] border-2 border-[#D4AF37] shadow-2xl p-6 sm:p-10 overflow-hidden text-center">
        
        {/* Sacred Concentric Lotus Alpona Watermark in Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.07]">
          <PadmaAlponaMandala size={500} />
        </div>

        {/* Section Header */}
        <div className="relative z-10 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B181B]/10 border border-[#D4AF37] text-xs sm:text-sm font-serif font-bold text-[#8B181B] uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{isBengali ? 'ঐতিহ্যবাহী শুভদৃষ্টি মহালগ্ন' : 'The Sacred Shubhodrishti Ritual'}</span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-[#8B181B] mt-1">
            {isBengali ? 'পান পাতা উন্মোচন ও শুভদৃষ্টি' : 'Unveil the Auspicious Union'}
          </h2>

          <p className="text-xs sm:text-sm font-serif text-[#6B5A55] max-w-lg mx-auto mt-2 leading-relaxed">
            {isBengali
              ? 'সাতপাক শেষে কনে পান পাতা সরিয়ে বরের চোখের দিকে তাকান—ইহাই চিরন্তন ভালোবাসার শুভদৃষ্টি।'
              : 'As sacred tradition dictates, the bride lowers the auspicious betel leaves (Pan Pata) to meet the groom’s gaze in eternal love.'}
          </p>
        </div>

        {/* The Pan Pata Interactive Reveal Frame */}
        <div className="relative max-w-xl mx-auto my-8 min-h-[380px] sm:min-h-[420px] rounded-3xl bg-white border-2 border-[#D4AF37]/60 shadow-xl overflow-hidden flex items-center justify-center p-6">
          
          {/* UNDERNEATH: The Revealed Couple & Auspicious Details */}
          <div className="w-full flex flex-col items-center justify-center text-center space-y-4">
            
            {/* Couple Portraits Side-by-Side */}
            <div className="flex items-center justify-center gap-4 sm:gap-8">
              {/* Groom */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-36 sm:w-36 sm:h-44 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#D4AF37] shadow-lg ring-4 ring-amber-100">
                  <img
                    src={template.groom.image}
                    alt={template.groom.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-2 text-xs font-serif font-bold text-[#8B181B]">
                  {isBengali ? template.groom.nativeName : template.groom.name}
                </span>
                <span className="text-[11px] font-serif text-[#997819] font-semibold">
                  {isBengali ? 'শ্রীমান বর (Topor)' : 'The Groom'}
                </span>
              </div>

              {/* Auspicious Union Heart Medallion */}
              <div className="flex flex-col items-center justify-center shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#8B181B] text-[#F3E5AB] flex items-center justify-center shadow-lg border-2 border-[#D4AF37] animate-pulse">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <span className="text-[10px] font-serif font-bold uppercase tracking-wider text-[#8B181B] mt-1">
                  {isBengali ? 'শুভ পরিণয়' : 'Weds'}
                </span>
              </div>

              {/* Bride */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-36 sm:w-36 sm:h-44 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#D4AF37] shadow-lg ring-4 ring-amber-100">
                  <img
                    src={template.bride.image}
                    alt={template.bride.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-2 text-xs font-serif font-bold text-[#8B181B]">
                  {isBengali ? template.bride.nativeName : template.bride.name}
                </span>
                <span className="text-[11px] font-serif text-[#997819] font-semibold">
                  {isBengali ? 'শ্রীমতী কনে (Mukut)' : 'The Bride'}
                </span>
              </div>
            </div>

            {/* Auspicious Muhurat Pill */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 pt-2">
              <div className="px-4 py-1.5 rounded-full bg-[#8B181B] text-[#F3E5AB] font-serif text-xs font-bold shadow-sm flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{isBengali ? template.targetDateNative : 'Saturday, 28th Nov 2026'}</span>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-amber-50 text-[#8B181B] border border-[#D4AF37] font-serif text-xs font-bold shadow-sm flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8B181B]" />
                <span>{isBengali ? 'শুভলগ্ন: রাত্রি ৮:১৫ ঘটিকায়' : 'Lagna: 8:15 PM'}</span>
              </div>
            </div>

            {/* Sacred Shlokas on Reveal */}
            <p className="text-xs sm:text-sm font-serif font-semibold text-[#5C0C0F] max-w-md italic px-4">
              {isBengali
                ? '॥ যদিদং হৃদয়ং তব, তদিদং হৃদয়ং মম — তোমার হৃদয় আমার হউক, আমার হৃদয় তোমার হউক ॥'
                : '"May our hearts unite as one sacred bond for seven lifetimes."'}
            </p>
          </div>

          {/* OVERLAY: The Two Sacred Betel Leaves (Pan Pata) Animated with Framer Motion */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            
            {/* Left Betel Leaf */}
            <motion.div
              animate={
                isRevealed
                  ? { x: -160, y: -25, rotate: -38, opacity: 0.15, scale: 0.85 }
                  : { x: -28, y: 0, rotate: -8, opacity: 1, scale: 1 }
              }
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 14,
                mass: 0.8
              }}
              className="absolute z-20 cursor-pointer pointer-events-auto"
              onClick={handleToggleReveal}
            >
              <RealisticPaanLeaf className="w-48 sm:w-60 h-64 sm:h-80" />
            </motion.div>

            {/* Right Betel Leaf */}
            <motion.div
              animate={
                isRevealed
                  ? { x: 160, y: -25, rotate: 38, opacity: 0.15, scale: 0.85 }
                  : { x: 28, y: 0, rotate: 8, opacity: 1, scale: 1 }
              }
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 14,
                mass: 0.8
              }}
              className="absolute z-20 cursor-pointer pointer-events-auto"
              onClick={handleToggleReveal}
            >
              <RealisticPaanLeaf className="w-48 sm:w-60 h-64 sm:h-80" isRightLeaf />
            </motion.div>

          </div>

          {/* Interactive Tap Prompt Badge when Leaves are Closed */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-5 inset-x-0 z-30 flex justify-center pointer-events-none"
              >
                <button
                  type="button"
                  onClick={handleToggleReveal}
                  className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8B181B] via-[#A82025] to-[#8B181B] text-[#F3E5AB] border-2 border-[#D4AF37] font-serif text-xs sm:text-sm font-extrabold shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-amber-300/40"
                >
                  <Eye className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                  <span>{isBengali ? 'আলতো করে পান পাতা সরিয়ে শুভদৃষ্টি করুন' : 'Tap Betel Leaves to Reveal Shubhodrishti'}</span>
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Bottom Control when Revealed */}
        {isRevealed && (
          <div className="relative z-10 flex items-center justify-center gap-3">
            <span className="text-xs sm:text-sm font-serif font-bold text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-300 shadow-sm flex items-center gap-1.5">
              <span>✨</span>
              <span>{isBengali ? 'শুভদৃষ্টি দর্শন সম্পন্ন ও আশীর্বাদপ্রাপ্ত!' : 'Shubhodrishti Blessed & Revealed!'}</span>
            </span>

            <button
              type="button"
              onClick={handleToggleReveal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-serif text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#8B181B]" />
              <span>{isBengali ? 'পুনরায় পাতা ঢাকুন' : 'Cover Again'}</span>
            </button>
          </div>
        )}

      </div>

      {/* Heavy Alpona Bottom Border */}
      <HeavyAlponaBorder className="mt-6 opacity-90 rotate-180" />

    </section>
  );
};
