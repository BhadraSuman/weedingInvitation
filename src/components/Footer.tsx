import React, { useState } from 'react';
import { Language } from '../types/wedding';
import { AlponaDivider, ToporMukutIcon, ShankhoIcon } from './AlponaMotifs';
import { Share2, Copy, Check, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const [customGuest, setCustomGuest] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + window.location.pathname);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGuest.trim()) return;
    const url = `${window.location.origin}${window.location.pathname}?to=${encodeURIComponent(customGuest.trim())}`;
    setGeneratedLink(url);
  };

  return (
    <footer className="pt-16 pb-28 sm:pb-16 px-4 bg-gradient-to-b from-transparent to-[#F4ECD8]/80 text-center border-t border-[#D4AF37]/30">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <div className="flex justify-center items-center gap-3">
          <ShankhoIcon size={20} className="text-[#8B181B]" />
          <ToporMukutIcon className="w-14 h-10 text-[#8B181B]" />
          <ShankhoIcon size={20} className="text-[#8B181B]" />
        </div>

        <h3 className="font-bengali text-2xl sm:text-3xl text-[#8B181B] font-bold">
          {lang === 'bn' ? 'সবান্ধব সপরিবারে সাদর আমন্ত্রণ' : 'You are Cordially Invited'}
        </h3>

        <AlponaDivider className="my-2 max-w-xs mx-auto" />

        <p className="font-bengali text-xs sm:text-sm text-[#5C0C0F] max-w-lg mx-auto leading-relaxed">
          {lang === 'bn'
            ? 'আমাদের জীবনের এই মাহেন্দ্রক্ষণে আপনাদের সস্নেহ পদধূলি ও শুভাশিস আমাদের একান্ত কাম্য।'
            : 'Your gracious presence and heartfelt blessings will illuminate our new journey together.'}
        </p>

        {/* Personalized Link Generator Tool for the Family */}
        <div className="my-8 p-6 bg-white/80 rounded-3xl border border-[#D4AF37]/50 shadow-sm max-w-lg mx-auto text-left">
          <div className="flex items-center gap-2 mb-2 text-[#8B181B]">
            <Share2 className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-bengali font-bold text-sm">
              {lang === 'bn' ? 'ব্যক্তিগত ডিজিটাল নিমন্ত্রণপত্র পাঠান' : 'Create Personalized Guest Invite Link'}
            </h4>
          </div>
          <p className="text-[11px] text-[#6B5A55] font-bengali mb-3">
            {lang === 'bn'
              ? 'অতিথির নাম লিখে লিংক তৈরি করুন। লিংকে তাঁদের নাম সম্মানের সহিত প্রদর্শিত হইবে।'
              : 'Enter a guest name to generate a tailored invitation link with their name.'}
          </p>

          <form onSubmit={handleGenerateCustom} className="flex gap-2">
            <input
              type="text"
              value={customGuest}
              onChange={e => setCustomGuest(e.target.value)}
              placeholder={lang === 'bn' ? 'যেমন: সুভাষদা ও পরিবার' : 'e.g., Subhash Da & Family'}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#D4AF37]/50 focus:outline-none focus:ring-1 focus:ring-[#8B181B]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#8B181B] hover:bg-[#5C0C0F] text-[#F3E5AB] text-xs font-semibold rounded-xl transition-colors font-bengali"
            >
              {lang === 'bn' ? 'লিংক তৈরি' : 'Generate'}
            </button>
          </form>

          {generatedLink && (
            <div className="mt-3 p-2 bg-[#F4ECD8] rounded-xl flex items-center justify-between gap-2 text-xs">
              <span className="truncate text-[#5C0C0F] font-mono text-[11px]">
                {generatedLink}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  alert(lang === 'bn' ? 'ব্যক্তিগত লিংক কপি করা হয়েছে!' : 'Personalized link copied!');
                }}
                className="px-2.5 py-1 bg-[#8B181B] text-white rounded-lg font-bengali shrink-0 text-[11px]"
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
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37] bg-white text-[#8B181B] text-xs font-serif font-semibold hover:bg-[#F4ECD8] transition-colors shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">{lang === 'bn' ? 'কপি সম্পন্ন!' : 'Link Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{lang === 'bn' ? 'ওয়েবসাইট লিংক কপি করুন' : 'Copy Invitation Link'}</span>
              </>
            )}
          </button>
        </div>

        <div className="pt-6 border-t border-[#D4AF37]/30 text-center">
          <p className="font-bengali text-xs text-[#8B181B] font-semibold">
            {lang === 'bn' ? '॥ ইতি — মুখোপাধ্যায় ও বন্দ্যোপাধ্যায় পরিবার ॥' : '॥ With Warmest Regards — Mukherjee & Banerjee Families ॥'}
          </p>
          <p className="text-[10px] text-[#8C7A73] font-serif mt-1">
            Handcrafted with love &amp; cultural heritage
          </p>
        </div>

      </div>
    </footer>
  );
};
