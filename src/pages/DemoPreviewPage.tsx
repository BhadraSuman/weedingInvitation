import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  decodeDemoParams,
  buildCustomDemoTemplate,
  getWhatsAppOrderFromDemoUrl,
  DemoFormData
} from '../utils/demoGenerator';
import { EnvelopeIntro } from '../components/EnvelopeIntro';
import { AudioPlayer } from '../components/AudioPlayer';
import { LanguageToggle } from '../components/LanguageToggle';
import { BengaliWeddingView } from '../components/views/BengaliWeddingView';
import { BihariMarwariWeddingView } from '../components/views/BihariMarwariWeddingView';
import { AnnaprashanView } from '../components/views/AnnaprashanView';
import { BirthdayView } from '../components/views/BirthdayView';
import { RoyalNorthWeddingView } from '../components/views/RoyalNorthWeddingView';
import { SouthIndianWeddingView } from '../components/views/SouthIndianWeddingView';
import { ModernMinimalWeddingView } from '../components/views/ModernMinimalWeddingView';
import { Language } from '../types/wedding';
import {
  Sparkles,
  Home,
  Edit3,
  Share2,
  MessageCircle,
  Check,
  Zap
} from 'lucide-react';

export const DemoPreviewPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [lang, setLang] = useState<Language>('native');
  const [copied, setCopied] = useState(false);

  // 1. Decode demo form data from URL search parameters or fallback to localStorage
  const [formData, setFormData] = useState<DemoFormData>(() => {
    // If URL has theme or groom or child, parse from URL
    if (searchParams.has('theme') || searchParams.has('groom') || searchParams.has('child')) {
      return decodeDemoParams(searchParams);
    }
    // Try localStorage
    try {
      const stored = localStorage.getItem('utsavpatra_demo_preview');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return decodeDemoParams(searchParams);
  });

  const { template, title, cultureType } = buildCustomDemoTemplate(formData);

  // Update document title
  useEffect(() => {
    document.title = `[PREVIEW] ${title}`;
  }, [title]);

  const handleSharePreview = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Preview: ${template.quotes.weddingTitle}`,
          text: `Check out our personalized celebration invitation preview on UtsavPatra!`,
          url
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const whatsappOrderUrl = getWhatsAppOrderFromDemoUrl(formData);

  return (
    <div
      className="min-h-screen font-sans selection:bg-[#8B181B] selection:text-[#F3E5AB] transition-colors duration-500 relative pb-16 sm:pb-0"
      style={{
        backgroundColor: template.colors.bgParchment,
        color: template.colors.textColor
      }}
    >
      {/* 1. Top Preview Banner Bar */}
      <div className="sticky top-0 z-50 bg-[#2C1810] text-[#F3E5AB] border-b border-[#D4AF37]/40 px-3 sm:px-6 py-2.5 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs font-serif">
          
          {/* Left badge & Event title */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#2C1810] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shrink-0">
              <Zap className="w-3 h-3" />
              <span>Free Live Preview</span>
            </span>
            <span className="hidden md:inline text-stone-300">|</span>
            <span className="font-semibold text-white truncate max-w-[200px] sm:max-w-none">
              {template.quotes.weddingTitle}
            </span>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <Link
              to="/tryout"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F3E5AB] border border-white/20 text-[11px] font-semibold transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </Link>

            <button
              type="button"
              onClick={handleSharePreview}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F3E5AB] border border-white/20 text-[11px] font-semibold transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share Preview</span>
                  <span className="sm:hidden">Share</span>
                </>
              )}
            </button>

            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-bold shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Activate Official Link (₹999)</span>
            </a>
          </div>

        </div>
      </div>

      {/* 2. Envelope Opening Screen */}
      {!isEnvelopeOpen && (
        <EnvelopeIntro
          template={template}
          lang={lang}
          onOpen={() => setIsEnvelopeOpen(true)}
        />
      )}

      {/* 3. Global Audio & Language Controls */}
      <LanguageToggle currentLang={lang} template={template} onToggle={setLang} />
      <AudioPlayer />

      {/* Home link pill on top right */}
      <div className="fixed top-14 right-4 z-40 hidden sm:block">
        <Link
          to="/"
          title="Back to Home"
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#D4AF37]/50 text-[11px] font-serif text-stone-700 hover:text-[#8B181B] shadow transition-all"
        >
          <Home className="w-3 h-3 text-[#D4AF37]" />
          <span>Home</span>
        </Link>
      </div>

      {/* 4. Render Culture Layout */}
      <main className={`transition-opacity duration-1000 ${isEnvelopeOpen ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
        {cultureType === 'bengali' && (
          <BengaliWeddingView
            template={template}
            lang={lang}
          />
        )}
        {cultureType === 'bihari_marwari' && (
          <BihariMarwariWeddingView
            template={template}
            lang={lang}
          />
        )}
        {cultureType === 'annaprashan' && (
          <AnnaprashanView
            template={template}
            lang={lang}
          />
        )}
        {cultureType === 'birthday' && (
          <BirthdayView
            template={template}
            lang={lang}
          />
        )}
        {cultureType === 'royal_north' && (
          <RoyalNorthWeddingView
            template={template}
            lang={lang}
          />
        )}
        {cultureType === 'south_indian' && (
          <SouthIndianWeddingView
            template={template}
            lang={lang}
          />
        )}
        {cultureType === 'modern_minimal' && (
          <ModernMinimalWeddingView
            template={template}
            lang={lang}
          />
        )}
      </main>

      {/* 5. Sticky Floating Mobile Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#2C1810]/95 backdrop-blur-md border-t border-[#D4AF37]/40 p-2.5 sm:hidden flex items-center justify-between gap-2 shadow-2xl">
        <div className="flex-1 truncate">
          <div className="text-[10px] text-amber-300 font-serif font-bold uppercase tracking-wider">
            ⚡ Free Live Preview
          </div>
          <div className="text-xs text-white font-serif font-semibold truncate">
            {template.quotes.weddingTitle}
          </div>
        </div>

        <a
          href={whatsappOrderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] text-white font-serif font-bold text-xs shadow-lg shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Activate (₹999)</span>
        </a>
      </div>

    </div>
  );
};
