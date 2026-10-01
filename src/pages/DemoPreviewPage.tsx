import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  decodeDemoParams,
  buildCustomDemoTemplate,
  getWhatsAppOrderFromDemoUrl,
  isPreviewExpired,
  getPreviewRemainingHours,
  DemoFormData
} from '../utils/demoGenerator';
import { PreviewWatermark } from '../components/common/PreviewWatermark';
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
import { audioManager } from '../utils/audioManager';
import {
  Sparkles,
  Home,
  Edit3,
  Share2,
  MessageCircle,
  Check,
  Clock,
  Lock,
  AlertTriangle
} from 'lucide-react';

export const DemoPreviewPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [lang, setLang] = useState<Language>('native');
  const [copied, setCopied] = useState(false);

  // Automatically stop background music when user navigates away or unmounts the page
  useEffect(() => {
    return () => {
      audioManager.stop();
    };
  }, []);

  // 1. Decode demo form data from URL search parameters or fallback to localStorage
  const [formData] = useState<DemoFormData>(() => {
    if (searchParams.has('theme') || searchParams.has('groom') || searchParams.has('child')) {
      return decodeDemoParams(searchParams);
    }
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
  const isExpired = isPreviewExpired(formData.createdAt);
  const remainingHours = getPreviewRemainingHours(formData.createdAt);
  const whatsappOrderUrl = getWhatsAppOrderFromDemoUrl(formData);

  // Update document title
  useEffect(() => {
    if (isExpired) {
      document.title = `[EXPIRED] ${title}`;
    } else {
      document.title = `[TRIAL PREVIEW] ${title}`;
    }
  }, [title, isExpired]);

  const handleSharePreview = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Trial Preview: ${template.quotes.weddingTitle}`,
          text: `Check out our personalized celebration invitation draft on UtsavPatra! (24-Hour Preview)`,
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

  // 2. Render 24-Hour Expired Lock Screen
  if (isExpired) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center font-serif selection:bg-[#8B181B] selection:text-[#F3E5AB]">
        <div className="w-16 h-16 rounded-full bg-red-100 border border-red-300 flex items-center justify-center text-red-600 mb-4 shadow-sm animate-pulse">
          <Clock className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider mb-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>24-Hour Trial Has Expired</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#8B181B] max-w-lg mt-1">
          Trial Preview Expired for <br />
          <span className="text-stone-800">{template.quotes.weddingTitle}</span>
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-stone-600 max-w-md leading-relaxed">
          Free draft previews on UtsavPatra are active for 24 hours for private family evaluation. 
          To launch your permanent official invitation that stays active forever without watermarks (e.g. <code className="text-[#8B181B] bg-stone-100 px-1 py-0.5 rounded font-mono">utsavpatra.com/your-event</code>), message our team on WhatsApp to activate for just ₹999.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
          <a
            href={whatsappOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-serif font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Activate Official Link (₹999)</span>
          </a>

          <Link
            to="/tryout"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-3 px-6 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-serif font-semibold text-xs sm:text-sm shadow-sm transition-all"
          >
            <span>Create New 24-Hour Preview</span>
          </Link>
        </div>

        <div className="mt-12 text-[11px] text-stone-400">
          UtsavPatra by Uddipta Tech Solutions • Support: +91 62038 68358 • uddipta.techsolutions@gmail.com
        </div>
      </div>
    );
  }

  // 3. Render Active Preview (With Diagonal Watermark & 24h Timer)
  return (
    <div
      className="min-h-screen font-sans selection:bg-[#8B181B] selection:text-[#F3E5AB] transition-colors duration-500 relative pb-16 sm:pb-0"
      style={{
        backgroundColor: template.colors.bgParchment,
        color: template.colors.textColor
      }}
    >
      {/* Visual Anti-Abuse Lock: Diagonal Watermark */}
      <PreviewWatermark remainingHours={remainingHours} />

      {/* 1. Top Preview Banner Bar */}
      <div className="sticky top-0 z-50 bg-[#2C1810] text-[#F3E5AB] border-b border-[#D4AF37]/40 px-3 sm:px-6 py-2.5 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs font-serif">
          
          {/* Left badge & Event title */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shrink-0">
              <Clock className="w-3 h-3" />
              <span>Expires in {remainingHours}h</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-red-900/60 text-red-200 border border-red-500/40 font-bold text-[10px] uppercase tracking-wider hidden sm:inline flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" />
              <span>Watermarked Draft</span>
            </span>
            <span className="hidden md:inline text-stone-400">|</span>
            <span className="font-semibold text-white truncate max-w-[180px] sm:max-w-none">
              {template.quotes.weddingTitle}
            </span>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <Link
              to="/tryout"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F3E5AB] border border-white/20 text-[11px] font-semibold transition-all whitespace-nowrap shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </Link>

            <button
              type="button"
              onClick={handleSharePreview}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F3E5AB] border border-white/20 text-[11px] font-semibold transition-all whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-bold shadow-md transition-all active:scale-95 ring-2 ring-emerald-300/40 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span className="hidden md:inline">Remove Watermark &amp; Activate (₹999)</span>
              <span className="md:hidden">Activate (₹999)</span>
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

      {/* 4. Render Cultural Layout */}
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
          <div className="text-[10px] text-amber-300 font-serif font-bold uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            <span>Trial: {remainingHours}h left • Watermarked</span>
          </div>
          <div className="text-xs text-white font-serif font-semibold truncate">
            {template.quotes.weddingTitle}
          </div>
        </div>

        <a
          href={whatsappOrderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] text-white font-serif font-bold text-xs shadow-lg shrink-0 whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Activate (₹999)</span>
        </a>
      </div>

    </div>
  );
};
