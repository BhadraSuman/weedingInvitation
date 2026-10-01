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

  // Set document title and OpenGraph metadata dynamically
  useEffect(() => {
    if (weddingEntry) {
      const pageTitle = guestName 
        ? `${guestName}'s Invitation • ${weddingEntry.title}`
        : weddingEntry.title;
      document.title = pageTitle;

      // Update meta tags for browser history and dynamic sharers
      const updateMeta = (prop: string, content: string, isName = false) => {
        const selector = isName ? `meta[name="${prop}"]` : `meta[property="${prop}"]`;
        let el = document.querySelector(selector);
        if (!el) {
          el = document.createElement('meta');
          if (isName) el.setAttribute('name', prop);
          else el.setAttribute('property', prop);
          document.head.appendChild(el);
        }
        el.setAttribute('content', content);
      };

      updateMeta('og:title', pageTitle);
      updateMeta('twitter:title', pageTitle, true);
      if (weddingEntry.previewImage) {
        updateMeta('og:image', weddingEntry.previewImage);
        updateMeta('twitter:image', weddingEntry.previewImage, true);
      }
    } else {
      document.title = "Celebration Invitation | UtsavPatra.com";
    }
  }, [weddingEntry, guestName]);

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
