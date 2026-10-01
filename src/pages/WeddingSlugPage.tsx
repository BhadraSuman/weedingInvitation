import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { getWeddingBySlug } from '../data/weddings';
import { EnvelopeIntro } from '../components/EnvelopeIntro';
import { AudioPlayer } from '../components/AudioPlayer';
import { LanguageToggle } from '../components/LanguageToggle';
import { BengaliWeddingView } from '../components/views/BengaliWeddingView';
import { BihariMarwariWeddingView } from '../components/views/BihariMarwariWeddingView';
import { AnnaprashanView } from '../components/views/AnnaprashanView';
import { BirthdayView } from '../components/views/BirthdayView';
import { Language } from '../types/wedding';
import { Sparkles, Home } from 'lucide-react';

export const WeddingSlugPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [lang, setLang] = useState<Language>('native');

  const guestName = searchParams.get('to') || searchParams.get('guest') || undefined;

  const weddingEntry = getWeddingBySlug(slug || '');

  // Set document title dynamically
  useEffect(() => {
    if (weddingEntry) {
      document.title = weddingEntry.title;
    } else {
      document.title = "Celebration Invitation | UtsavPatra.com";
    }
  }, [weddingEntry]);

  if (!weddingEntry) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#8B181B]/10 border border-[#D4AF37] flex items-center justify-center text-[#8B181B] mb-4">
          <Sparkles className="w-8 h-8 text-[#D4AF37]" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#8B181B]">
          Invitation Not Found
        </h1>
        <p className="text-sm font-serif text-stone-600 max-w-md mt-2">
          The event invitation link <code className="bg-stone-100 px-2 py-0.5 rounded text-[#8B181B]">/{slug}</code> does not exist or may have been updated.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/anirban-weds-deboleena"
            className="px-4 py-2 rounded-full bg-[#8B181B] text-[#F3E5AB] font-serif text-xs font-bold shadow hover:bg-[#5E0B0E]"
          >
            🪔 Bengali Wedding
          </Link>
          <Link
            to="/sandeep-weds-priya"
            className="px-4 py-2 rounded-full bg-[#0D4A36] text-[#E5C158] font-serif text-xs font-bold shadow hover:bg-[#042017]"
          >
            🚩 Bihari &amp; Marwari Vivah
          </Link>
          <Link
            to="/aarav-annaprashan"
            className="px-4 py-2 rounded-full bg-[#D97706] text-white font-serif text-xs font-bold shadow hover:bg-[#B45309]"
          >
            🥣 Annaprashan (Rice Ceremony)
          </Link>
          <Link
            to="/ananya-turns-1"
            className="px-4 py-2 rounded-full bg-[#7C3AED] text-white font-serif text-xs font-bold shadow hover:bg-[#5B21B6]"
          >
            🎂 1st Birthday Gala
          </Link>
          <Link
            to="/"
            className="px-4 py-2 rounded-full border border-stone-300 bg-white text-stone-700 font-serif text-xs font-bold shadow-sm hover:bg-stone-50"
          >
            UtsavPatra Home
          </Link>
        </div>
      </div>
    );
  }

  const { template, cultureType } = weddingEntry;

  return (
    <div
      className="min-h-screen font-sans selection:bg-[#8B181B] selection:text-[#F3E5AB] transition-colors duration-500 relative"
      style={{
        backgroundColor: template.colors.bgParchment,
        color: template.colors.textColor
      }}
    >
      {/* Discreet Branding Banner (The Viral Acquisition Loop) */}
      <div className="bg-[#2C1810] text-[#F3E5AB] text-[11px] py-1.5 px-4 text-center font-serif flex items-center justify-center gap-2">
        <span>✨ Digital invitation crafted on <strong>UtsavPatra.com</strong></span>
        <span>•</span>
        <Link to="/" className="underline hover:text-white font-semibold">
          Create Yours
        </Link>
      </div>

      {/* 1. Envelope Opening Screen */}
      {!isEnvelopeOpen && (
        <EnvelopeIntro
          template={template}
          lang={lang}
          guestName={guestName}
          onOpen={() => setIsEnvelopeOpen(true)}
        />
      )}

      {/* Global Controls */}
      <LanguageToggle currentLang={lang} template={template} onToggle={setLang} />
      <AudioPlayer />

      {/* Return to Home pill on top-right */}
      <div className="fixed top-4 right-20 z-40 hidden sm:block">
        <Link
          to="/"
          title="Back to UtsavPatra.com"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D4AF37]/50 text-xs font-serif text-stone-700 hover:text-[#8B181B] shadow-md transition-all"
        >
          <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Home</span>
        </Link>
      </div>

      {/* Render the specific cultural UI layout */}
      <main className={`transition-opacity duration-1000 ${isEnvelopeOpen ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
        {cultureType === 'bengali' && (
          <BengaliWeddingView
            template={template}
            lang={lang}
            guestName={guestName}
          />
        )}
        {cultureType === 'bihari_marwari' && (
          <BihariMarwariWeddingView
            template={template}
            lang={lang}
            guestName={guestName}
          />
        )}
        {cultureType === 'annaprashan' && (
          <AnnaprashanView
            template={template}
            lang={lang}
            guestName={guestName}
          />
        )}
        {cultureType === 'birthday' && (
          <BirthdayView
            template={template}
            lang={lang}
            guestName={guestName}
          />
        )}
      </main>

    </div>
  );
};
