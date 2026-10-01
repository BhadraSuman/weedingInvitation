import React from 'react';
import { CulturalMotifBadge, CulturalDivider } from './CulturalMotifs';
import { CulturalTemplate, Language } from '../types/wedding';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ template, lang, guestName }) => {
  return (
    <section className="relative pt-20 pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Auspicious Shloka Card */}
      <div
        className="inline-block rounded-2xl px-6 py-4 shadow-sm backdrop-blur-sm mb-8 max-w-lg border"
        style={{
          backgroundColor: `${template.colors.bgCard}E6`,
          borderColor: `${template.colors.accent}66`
        }}
      >
        <div className="flex items-center justify-center gap-2 mb-2" style={{ color: template.colors.primary }}>
          <span className="font-serif text-xs tracking-widest font-semibold uppercase">
            {template.quotes.invocation}
          </span>
        </div>
        <p
          className="text-xs sm:text-sm whitespace-pre-line leading-relaxed font-serif font-medium"
          style={{ color: template.colors.primary }}
        >
          {template.quotes.verse}
        </p>
        {template.quotes.verseAuthor && (
          <p className="text-xs text-right mt-1.5 font-semibold opacity-80" style={{ color: template.colors.accent }}>
            {template.quotes.verseAuthor}
          </p>
        )}
      </div>

      {/* Personalized Welcome Banner if query parameter is provided */}
      {guestName && (
        <div
          className="mb-8 mx-auto max-w-md border-y py-3 px-6 rounded-lg"
          style={{
            borderColor: `${template.colors.accent}80`,
            backgroundColor: `${template.colors.primary}12`
          }}
        >
          <p className="font-serif text-xs tracking-wider uppercase font-semibold" style={{ color: template.colors.primary }}>
            {lang === 'native' ? 'সাদর আহ্বান / हार्दिक स्वागत' : 'Cordially Invited'}
          </p>
          <p className="font-serif text-xl sm:text-2xl font-bold mt-0.5" style={{ color: template.colors.primary }}>
            {guestName}
          </p>
          <p className="text-xs mt-1" style={{ color: template.colors.textColor }}>
            {lang === 'native' ? template.quotes.nativeWelcomeNotice : template.quotes.welcomeNotice}
          </p>
        </div>
      )}

      {/* Cultural Motif Centerpiece */}
      <div className="flex justify-center items-center gap-4 mb-4">
        <div className="w-12 h-[1px]" style={{ backgroundColor: template.colors.accent }} />
        <CulturalMotifBadge templateId={template.id} className="w-16 h-14 transform hover:scale-105 transition-transform duration-300" />
        <div className="w-12 h-[1px]" style={{ backgroundColor: template.colors.accent }} />
      </div>

      {/* Wedding Title Typography */}
      <div className="space-y-1 mb-6">
        <h1
          className="text-4xl sm:text-6xl font-extrabold tracking-wide drop-shadow-sm font-serif"
          style={{ color: template.colors.primary }}
        >
          {lang === 'native' ? template.quotes.nativeWeddingTitle : template.quotes.weddingTitle}
        </h1>
        <p
          className="text-sm sm:text-base tracking-[0.3em] uppercase font-semibold font-serif"
          style={{ color: template.colors.accent }}
        >
          {template.cultureLabel}
        </p>
      </div>

      {/* Cultural Divider */}
      <CulturalDivider templateId={template.id} color={template.colors.accent} />

      {/* The Couple Names */}
      <div className="my-8">
        <p className="font-serif text-xs sm:text-sm tracking-widest uppercase mb-2" style={{ color: template.colors.primary }}>
          {lang === 'native' ? 'শুভ পরিণয় বন্ধনে আবদ্ধ হতে চলেছেন' : 'Together with their families, invite you to celebrate the wedding of'}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-3xl sm:text-5xl font-serif">
          <span className="font-bold hover:opacity-90 transition-opacity" style={{ color: template.colors.primary }}>
            {lang === 'native' ? template.groom.nativeName : template.groom.name}
          </span>
          <span className="italic text-2xl sm:text-4xl" style={{ color: template.colors.accent }}>
            &amp;
          </span>
          <span className="font-bold hover:opacity-90 transition-opacity" style={{ color: template.colors.primary }}>
            {lang === 'native' ? template.bride.nativeName : template.bride.name}
          </span>
        </div>
      </div>

      {/* Wedding Date & Venue Snapshot Badge */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <div
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white shadow-md border"
          style={{
            backgroundColor: template.colors.primary,
            borderColor: `${template.colors.accent}80`
          }}
        >
          <Calendar className="w-4 h-4" style={{ color: template.colors.accent }} />
          <span className="font-serif text-sm sm:text-base font-semibold">
            {lang === 'native' ? template.targetDateNative : template.targetDate.split('T')[0]}
          </span>
        </div>

        <div
          className="flex items-center gap-2 px-5 py-2.5 rounded-full shadow-sm border"
          style={{
            backgroundColor: template.colors.bgCard,
            borderColor: template.colors.accent,
            color: template.colors.primary
          }}
        >
          <MapPin className="w-4 h-4" style={{ color: template.colors.primary }} />
          <span className="font-serif text-sm sm:text-base font-semibold">
            {lang === 'native' ? template.venue.nativeName : template.venue.name}
          </span>
        </div>
      </div>

      {/* Downward indicator */}
      <div className="mt-12 flex justify-center">
        <div
          className="w-8 h-8 rounded-full border flex items-center justify-center animate-bounce"
          style={{
            borderColor: template.colors.accent,
            color: template.colors.primary
          }}
        >
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
};
