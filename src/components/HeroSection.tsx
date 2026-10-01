import React from 'react';
import { AlponaDivider, ToporMukutIcon, ShankhoIcon, MangalGhotIcon, CornerAlpona } from './AlponaMotifs';
import { auspiciousQuotes } from '../data/weddingData';
import { Language } from '../types/wedding';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  guestName?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, guestName }) => {
  return (
    <section className="relative pt-20 pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Corner Alpona Ornaments */}
      <CornerAlpona position="tl" className="absolute top-8 left-4 w-12 h-12 sm:w-16 sm:h-16" />
      <CornerAlpona position="tr" className="absolute top-8 right-4 w-12 h-12 sm:w-16 sm:h-16" />

      {/* Auspicious Shloka Card */}
      <div className="inline-block bg-[#F4ECD8]/70 border border-[#D4AF37]/50 rounded-2xl px-6 py-4 shadow-sm backdrop-blur-sm mb-8 max-w-lg">
        <div className="flex items-center justify-center gap-2 mb-2 text-[#8B181B]">
          <ShankhoIcon size={18} />
          <span className="font-bengali text-xs tracking-widest font-semibold uppercase">
            || শ্রী শ্রী দুর্গা সহায় ||
          </span>
          <ShankhoIcon size={18} />
        </div>
        <p className="font-bengali text-xs sm:text-sm text-[#5C0C0F] whitespace-pre-line leading-relaxed font-medium">
          {auspiciousQuotes.shloka}
        </p>
      </div>

      {/* Personalized Welcome Banner if query parameter is provided */}
      {guestName && (
        <div className="mb-8 mx-auto max-w-md bg-gradient-to-r from-[#8B181B]/10 via-[#D4AF37]/20 to-[#8B181B]/10 border-y border-[#D4AF37]/60 py-3 px-6 rounded-lg">
          <p className="font-royal text-xs text-[#8B181B] tracking-wider uppercase">
            {lang === 'bn' ? 'সাদর আহ্বান' : 'Cordially Invited'}
          </p>
          <p className="font-serif text-xl sm:text-2xl text-[#8B181B] font-bold mt-0.5">
            {guestName}
          </p>
          <p className="font-bengali text-xs text-[#5C0C0F] mt-1">
            {lang === 'bn' 
              ? 'আমাদের এই আনন্দপূর্ণ দিনে আপনার ও আপনার পরিবারের শুভাগমন একান্ত কাম্য।' 
              : 'Your gracious presence with your family will make our celebration complete.'}
          </p>
        </div>
      )}

      {/* Topor & Mukut Iconic Centerpiece */}
      <div className="flex justify-center items-center gap-4 mb-4">
        <div className="w-12 h-[1px] bg-[#D4AF37]" />
        <ToporMukutIcon className="w-20 h-16 transform hover:scale-105 transition-transform duration-300" />
        <div className="w-12 h-[1px] bg-[#D4AF37]" />
      </div>

      {/* Shubho Bibaho Typography */}
      <div className="space-y-1 mb-6">
        <h1 className="font-bengali text-4xl sm:text-6xl text-[#8B181B] font-extrabold tracking-wide drop-shadow-sm">
          শুভ বিবাহ
        </h1>
        <p className="font-royal text-base sm:text-lg tracking-[0.3em] text-[#997819] uppercase font-semibold">
          Shubho Bibaho
        </p>
      </div>

      {/* Alpona Divider */}
      <AlponaDivider className="my-6 max-w-md mx-auto" />

      {/* The Couple Names */}
      <div className="my-8">
        <p className="font-royal text-xs sm:text-sm tracking-widest text-[#8B181B] uppercase mb-2">
          {lang === 'bn' ? 'শুভ পরিণয় বন্ধনে আবদ্ধ হইতে চলেছেন' : 'Together with their families, invite you to celebrate the wedding of'}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-3xl sm:text-5xl font-bengali text-[#2C1810]">
          <span className="font-bold text-[#8B181B] hover:text-[#5C0C0F] transition-colors">
            {lang === 'bn' ? 'অনির্বাণ' : 'Anirban'}
          </span>
          <span className="font-serif italic text-2xl sm:text-4xl text-[#D4AF37]">
            &amp;
          </span>
          <span className="font-bold text-[#8B181B] hover:text-[#5C0C0F] transition-colors">
            {lang === 'bn' ? 'দেবলীনা' : 'Deboleena'}
          </span>
        </div>
        <p className="font-serif italic text-sm sm:text-base text-[#6B5A55] mt-2">
          Mukherjee &amp; Banerjee
        </p>
      </div>

      {/* Rabindranath Tagore Couplet */}
      <div className="my-8 max-w-lg mx-auto bg-[#F6EFE2] rounded-xl p-5 border border-[#D4AF37]/40 shadow-inner">
        <p className="font-bengali text-sm sm:text-base text-[#5C0C0F] italic leading-relaxed whitespace-pre-line font-medium">
          "{auspiciousQuotes.rabindraCouplet}"
        </p>
        <p className="font-bengali text-xs text-[#997819] text-right mt-2 font-semibold">
          {auspiciousQuotes.rabindraAuthor}
        </p>
      </div>

      {/* Main Wedding Date & Venue Snapshot Badge */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8B181B] text-[#F3E5AB] shadow-md border border-[#D4AF37]/50">
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-serif text-sm sm:text-base font-semibold">
            {lang === 'bn' ? '১২ই অগ্রহায়ণ, ১৪৩৩ | ২৮ নভেম্বর ২০২৬' : 'Saturday, 28th November 2026'}
          </span>
        </div>

        <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F4ECD8] text-[#5C0C0F] shadow-sm border border-[#D4AF37]">
          <MapPin className="w-4 h-4 text-[#8B181B]" />
          <span className="font-serif text-sm sm:text-base font-semibold">
            {lang === 'bn' ? 'রাজকুটির স্বভূমি, কলকাতা' : 'Raajkutir Swabhumi, Kolkata'}
          </span>
        </div>
      </div>

      {/* Downward indicator */}
      <div className="mt-12 flex justify-center">
        <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#8B181B] animate-bounce">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
};
