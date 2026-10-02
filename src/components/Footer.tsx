import React, { useState } from 'react';
import { CulturalTemplate, Language } from '../types/wedding';
import { CulturalDivider, CulturalMotifBadge } from './CulturalMotifs';
import { Share2, Copy, Check, Phone, Mail } from 'lucide-react';

interface FooterProps {
  template: CulturalTemplate;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ template, lang }) => {
  const { colors } = template;
  const [copied, setCopied] = useState(false);
  const [customGuest, setCustomGuest] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const isHindi = (template.nativeLanguageCode === 'hi' || template.id === 'bihari_marwari' || template.id === 'royal_north' || template.id === 'chibi_3d') && lang === 'native';
  const isBengali = (template.nativeLanguageCode === 'bn' || template.id === 'bengali' || template.id === 'annaprashan' || template.id === 'birthday') && lang === 'native';

  const t = {
    title: lang === 'en' ? 'You are Cordially Invited' : isHindi ? 'सबान्धव सपरिवार सादर आमंत्रण' : isBengali ? 'সবান্ধব সপরিবারে সাদর আমন্ত্রণ' : 'You are Cordially Invited',
    subtitle: lang === 'en'
      ? 'Your gracious presence and heartfelt blessings will illuminate our new journey together.'
      : isHindi
      ? 'हमारे जीवन के इस पावन मांगलिक अवसर पर आपकी स्नेहिल उपस्थिति एवं शुभाशीर्वाद हमारे लिए अमूल्य है।'
      : isBengali
      ? 'আমাদের জীবনের এই মাহেন্দ্রক্ষণে আপনাদের সস্নেহ পদধূলি ও শুভাশিস আমাদের একান্ত কাম্য।'
      : 'Your gracious presence and heartfelt blessings will illuminate our new journey together.',
    createLinkTitle: lang === 'en' ? 'Create Personalized Guest Invite Link' : isHindi ? 'अतिथि के नाम का व्यक्तिगत निमंत्रण लिंक बनाएं' : isBengali ? 'ব্যক্তিগত ডিজিটাল নিমন্ত্রণপত্র পাঠান' : 'Create Personalized Guest Invite Link',
    createLinkSub: lang === 'en'
      ? 'Enter a guest name to generate a tailored invitation link with their name.'
      : isHindi
      ? 'अतिथि का नाम लिखकर लिंक तैयार करें। लिंक खोलने पर उनका नाम आदर सहित प्रदर्शित होगा।'
      : isBengali
      ? 'অতিথির নাম লিখে লিংক তৈরি করুন। লিংকে তাঁদের নাম সম্মানের সহিত প্রদর্শিত হইবে।'
      : 'Enter a guest name to generate a tailored invitation link with their name.',
    placeholder: lang === 'en' ? 'e.g., Subhash Da & Family' : isHindi ? 'जैसे: आदरणीय शर्मा जी एवं परिवार' : isBengali ? 'যেমন: সুভাষদা ও পরিবার' : 'e.g., Guest Name & Family',
    genBtn: lang === 'en' ? 'Generate' : isHindi ? 'लिंक बनाएं' : isBengali ? 'লিংক তৈরি' : 'Generate',
    copyBtn: lang === 'en' ? 'Copy' : isHindi ? 'कॉपी करें' : isBengali ? 'কপি' : 'Copy',
    copiedAlert: lang === 'en' ? 'Personalized link copied!' : isHindi ? 'निमंत्रण लिंक कॉपी हो गया!' : isBengali ? 'ব্যক্তিগত লিংক কপি করা হয়েছে!' : 'Personalized link copied!',
    copyFullLink: lang === 'en' ? 'Copy Invitation Link' : isHindi ? 'विवाह लिंक कॉपी करें' : isBengali ? 'ওয়েবসাইট লিংক কপি করুন' : 'Copy Invitation Link',
    linkCopiedBadge: lang === 'en' ? 'Link Copied!' : isHindi ? 'कॉपी संपन्न!' : isBengali ? 'কপি সম্পন্ন!' : 'Link Copied!',
    inquiries: lang === 'en' ? 'Inquiries & Coordination:' : isHindi ? 'संपर्क एवं समन्वय:' : isBengali ? 'যোগাযোগ ও সমন্বয়:' : 'Inquiries & Coordination:'
  };

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
          {t.title}
        </h3>

        <CulturalDivider templateId={template.id} color={colors.accent} />

        <p className="text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-serif opacity-90" style={{ color: colors.textColor }}>
          {t.subtitle}
        </p>

        {/* Personalized Link Generator Tool for the Family */}
        <div
          className="my-8 p-6 bg-white/90 rounded-3xl border shadow-sm max-w-lg mx-auto text-left"
          style={{ borderColor: `${colors.accent}66` }}
        >
          <div className="flex items-center gap-2 mb-2" style={{ color: colors.primary }}>
            <Share2 className="w-4 h-4" style={{ color: colors.accent }} />
            <h4 className="font-serif font-bold text-sm">
              {t.createLinkTitle}
            </h4>
          </div>
          <p className="text-[11px] mb-3 opacity-80 font-serif" style={{ color: colors.textColor }}>
            {t.createLinkSub}
          </p>

          <form onSubmit={handleGenerateCustom} className="flex gap-2">
            <input
              type="text"
              value={customGuest}
              onChange={e => setCustomGuest(e.target.value)}
              placeholder={t.placeholder}
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
              {t.genBtn}
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
                  alert(t.copiedAlert);
                }}
                className="px-2.5 py-1 text-white rounded-lg font-serif shrink-0 text-[11px]"
                style={{ backgroundColor: colors.primary }}
              >
                {t.copyBtn}
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
                <span className="text-emerald-700">{t.linkCopiedBadge}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                <span>{t.copyFullLink}</span>
              </>
            )}
          </button>
        </div>

        <div className="pt-6 border-t text-center space-y-2" style={{ borderColor: `${colors.accent}33` }}>
          <p className="text-xs font-semibold font-serif" style={{ color: colors.primary }}>
            {lang === 'native' ? template.quotes.nativeFamilySignoff : template.quotes.familySignoff}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-serif">
            <span className="opacity-80" style={{ color: colors.textColor }}>
              {t.inquiries} <strong style={{ color: colors.primary }}>Uddipta Tech Solutions</strong>
            </span>
            <a
              href="tel:+916203868358"
              className="px-3 py-1 rounded-full border text-[11px] font-semibold hover:opacity-80 transition-opacity flex items-center gap-1.5"
              style={{
                borderColor: `${colors.accent}80`,
                backgroundColor: colors.bgParchment,
                color: colors.primary
              }}
            >
              <Phone className="w-3 h-3" /> +91 62038 68358
            </a>
            <a
              href="mailto:uddipta.techsolutions@gmail.com"
              className="px-3 py-1 rounded-full border text-[11px] font-semibold hover:opacity-80 transition-opacity flex items-center gap-1.5"
              style={{
                borderColor: `${colors.accent}80`,
                backgroundColor: colors.bgParchment,
                color: colors.primary
              }}
            >
              <Mail className="w-3 h-3" /> uddipta.techsolutions@gmail.com
            </a>
          </div>

          <div className="flex items-center justify-center gap-3 text-[11px] font-serif pt-1 opacity-80">
            <span>Handcrafted on UtsavPatra.com</span>
            <span>•</span>
            <a href="/host-dashboard" className="underline font-bold hover:opacity-100">
              👑 Event Host Portal
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
