import React, { useState } from 'react';
import { CulturalTemplate, Language } from '../types/wedding';
import { CulturalDivider, CulturalMotifBadge } from './CulturalMotifs';
import { Share2, Copy, Check } from 'lucide-react';

interface FooterProps {
  template: CulturalTemplate;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ template, lang }) => {
  const { colors } = template;
  const [copied, setCopied] = useState(false);
  const [customGuest, setCustomGuest] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleCopy = () => {
    const url = `${window.location.origin}${window.location.pathname}?template=${template.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGuest.trim()) return;
    const url = `${window.location.origin}${window.location.pathname}?template=${template.id}&to=${encodeURIComponent(customGuest.trim())}`;
    setGeneratedLink(url);
  };

  return (
    <footer
      className="pt-16 pb-28 sm:pb-16 px-4 text-center border-t"
      style={{
        background: `linear-gradient(to bottom, transparent, ${colors.bgParchment})`,
        borderColor: `${colors.accent}4D`
      }}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        
        <div className="flex justify-center items-center gap-3">
          <CulturalMotifBadge templateId={template.id} className="w-14 h-10" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-serif" style={{ color: colors.primary }}>
          {lang === 'native' ? 'সবান্ধব সপরিবারে সাদর আমন্ত্রণ' : 'You are Cordially Invited'}
        </h3>

        <CulturalDivider templateId={template.id} color={colors.accent} />

        <p className="text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-serif opacity-90" style={{ color: colors.textColor }}>
          {lang === 'native'
            ? 'আমাদের জীবনের এই মাহেন্দ্রক্ষণে আপনাদের সস্নেহ পদধূলি ও শুভাশিস আমাদের একান্ত কাম্য।'
            : 'Your gracious presence and heartfelt blessings will illuminate our new journey together.'}
        </p>

        {/* Personalized Link Generator Tool for the Family */}
        <div
          className="my-8 p-6 bg-white/90 rounded-3xl border shadow-sm max-w-lg mx-auto text-left"
          style={{ borderColor: `${colors.accent}66` }}
        >
          <div className="flex items-center gap-2 mb-2" style={{ color: colors.primary }}>
            <Share2 className="w-4 h-4" style={{ color: colors.accent }} />
            <h4 className="font-serif font-bold text-sm">
              {lang === 'native' ? 'ব্যক্তিগত ডিজিটাল নিমন্ত্রণপত্র পাঠান' : 'Create Personalized Guest Invite Link'}
            </h4>
          </div>
          <p className="text-[11px] mb-3 opacity-80 font-serif" style={{ color: colors.textColor }}>
            {lang === 'native'
              ? 'অতিথির নাম লিখে লিংক তৈরি করুন। লিংকে তাঁদের নাম সম্মানের সহিত প্রদর্শিত হইবে।'
              : 'Enter a guest name to generate a tailored invitation link with their name.'}
          </p>

          <form onSubmit={handleGenerateCustom} className="flex gap-2">
            <input
              type="text"
              value={customGuest}
              onChange={e => setCustomGuest(e.target.value)}
              placeholder={lang === 'native' ? 'যেমন: সুভাষদা ও পরিবার / राहुल एवं परिवार' : 'e.g., Subhash Da & Family'}
              className="flex-1 px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1"
              style={{
                borderColor: `${colors.accent}66`,
                color: colors.textColor
              }}
            />
            <button
              type="submit"
              className="px-4 py-2 text-white text-xs font-semibold rounded-xl transition-opacity hover:opacity-90 font-serif"
              style={{ backgroundColor: colors.primary }}
            >
              {lang === 'native' ? 'লিংক তৈরি' : 'Generate'}
            </button>
          </form>

          {generatedLink && (
            <div
              className="mt-3 p-2 rounded-xl flex items-center justify-between gap-2 text-xs"
              style={{ backgroundColor: colors.bgParchment }}
            >
              <span className="truncate font-mono text-[11px]" style={{ color: colors.primary }}>
                {generatedLink}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  alert(lang === 'native' ? 'ব্যক্তিগত লিংক কপি করা হয়েছে!' : 'Personalized link copied!');
                }}
                className="px-2.5 py-1 text-white rounded-lg font-serif shrink-0 text-[11px]"
                style={{ backgroundColor: colors.primary }}
              >
                কপি
              </button>
            </div>
          )}
        </div>

        {/* Direct Invitation Link Copy */}
        <div className="flex justify-center">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border bg-white text-xs font-serif font-semibold hover:bg-stone-50 transition-colors shadow-sm"
            style={{
              borderColor: colors.accent,
              color: colors.primary
            }}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">{lang === 'native' ? 'কপি সম্পন্ন!' : 'Link Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                <span>{lang === 'native' ? 'ওয়েবসাইট লিংক কপি করুন' : 'Copy Invitation Link'}</span>
              </>
            )}
          </button>
        </div>

        <div className="pt-6 border-t text-center" style={{ borderColor: `${colors.accent}33` }}>
          <p className="text-xs font-semibold font-serif" style={{ color: colors.primary }}>
            {lang === 'native' ? template.quotes.nativeFamilySignoff : template.quotes.familySignoff}
          </p>
          <p className="text-[10px] opacity-70 font-serif mt-1">
            Handcrafted with cultural elegance &amp; heritage
          </p>
        </div>

      </div>
    </footer>
  );
};
