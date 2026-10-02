import React, { useState, useEffect, useRef } from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import { audioManager } from '../../utils/audioManager';
import { Link } from 'react-router-dom';
import {
  Volume2,
  VolumeX,
  Home,
  Check,
  Copy,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Send,
  Heart,
  RotateCw
} from 'lucide-react';

interface SholaWeddingViewProps {
  template?: CulturalTemplate;
  lang?: Language;
  guestName?: string;
  onLangChange?: (lang: Language) => void;
}

export const SholaWeddingView: React.FC<SholaWeddingViewProps> = ({
  template,
  lang = 'native',
  guestName,
  onLangChange
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [toporAngle, setToporAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rsvpGuestName, setRsvpGuestName] = useState(guestName || '');
  const [headcount, setHeadcount] = useState('২');
  const [mealPref, setMealPref] = useState<'traditional' | 'satvik'>('traditional');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Live countdown state (Targeting 12 Dec 2026)
  const [timeLeft, setTimeLeft] = useState({
    days: 72,
    hours: 14,
    mins: 25,
    secs: 40
  });

  const isNative = lang === 'native';

  useEffect(() => {
    const unsub = audioManager.subscribe(playing => {
      setIsPlaying(playing);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioManager.pause();
    } else {
      audioManager.play();
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    setToporAngle(prev => prev + delta * 0.4);
    setDragStartX(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const copyUpi = () => {
    navigator.clipboard.writeText('sholavivah@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleWhatsAppRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    const guest = rsvpGuestName.trim() || (isNative ? 'শ্রদ্ধেয় সুধীজন' : 'Respected Guest');
    const meal = mealPref === 'traditional'
      ? (isNative ? 'ঐতিহ্যবাহী বাঙালি আমিষ ভোজ (চিংড়ি মালাইকারি ও কষা মাংস)' : 'Traditional Bengali Non-Veg (Chingri Malai & Mutton)')
      : (isNative ? 'সাত্বিক নিরামিষ ভোজ (ঘিয়ে ভাজা পোলাও ও ছানার ডালনা)' : 'Satvik Pure Veg (Ghee Pulao & Chanar Dalna)');

    const message = isNative
      ? `নমস্কার! আমি ${guest}, অনিন্দ্য ও মহাশ্বেতার শোলার শুভ পরিণয়ে সানন্দে উপস্থিত থাকব।\n\nউপস্থিত সদস্য: ${headcount} জন\nভোজের পছন্দ: ${meal}\n\nনবদম্পতির আগামী জীবনের জন্য রইল আন্তরিক শুভাশিস!`
      : `Namaste! I am ${guest}, delightedly confirming our attendance for Anindya & Mahashweta's Shola Wedding.\n\nAttending Members: ${headcount}\nDining Preference: ${meal}\n\nWishing the couple a blissful and elegant life together!`;

    window.open(`https://wa.me/919830011223?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#1f1b1a] font-serif antialiased select-none pb-24 relative overflow-x-hidden">
      {/* Floating subtle gold sparkles in background */}
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px] z-0"></div>

      {/* Header Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#fff8f6]/90 backdrop-blur-xl border-b border-[#d1c5b4]/40 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-16 px-4 max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="w-9 h-9 rounded-full bg-[#f6ecea] flex items-center justify-center text-[#775a19] hover:bg-[#eae0de] transition-colors shadow-sm"
              title="Return Home"
            >
              <Home className="w-4 h-4" />
            </Link>
            <button
              onClick={toggleAudio}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors border ${
                isPlaying
                  ? 'bg-[#775a19] text-white border-[#775a19]'
                  : 'bg-[#f6ecea] text-[#775a19] border-[#d1c5b4]/50'
              }`}
              title={isPlaying ? 'Mute' : 'Play Music'}
            >
              {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-[#775a19] leading-none">
              <span className="text-xs">❀</span>
              <span className="font-bold text-base tracking-wider">{isNative ? 'শোভা' : 'SHOLA'}</span>
              <span className="text-xs text-[#d1c5b4]">•</span>
              <span className="text-xs tracking-[0.2em] font-sans uppercase text-[#775a19]">
                {isNative ? 'শুভ পরিণয়' : 'WEDDING'}
              </span>
              <span className="text-xs">❀</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#7f7667] mt-0.5">
              {isNative ? 'শান্তিনিকেতন ও কলকাতা' : 'Santiniketan & Kolkata'}
            </span>
          </div>

          <button
            onClick={() => onLangChange?.(isNative ? 'en' : 'native')}
            className="h-8 px-2.5 rounded-full border border-[#d1c5b4] bg-[#f6ecea] text-xs font-bold text-[#775a19] hover:bg-[#eae0de] transition-colors"
          >
            {isNative ? 'বাংলা / EN' : 'EN / বাংলা'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-3.5 max-w-xl mx-auto space-y-6 relative z-10">
        {/* Section 1: Sacred Invocation & 3D Sholapith Topor Craft */}
        <section className="flex flex-col items-center text-center pt-2">
          {/* Sacred Floral Header */}
          <div className="flex items-center space-x-2 text-[#775a19] mb-2">
            <span className="w-6 h-[1px] bg-[#c5a059]/40"></span>
            <span className="text-xs tracking-[0.2em] font-bold uppercase text-[#775a19]">
              ॥ ওঁ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥
            </span>
            <span className="w-6 h-[1px] bg-[#c5a059]/40"></span>
          </div>
          <p className="text-[11px] text-[#615e54] uppercase tracking-[0.25em] mb-4">
            {isNative ? 'মাঙ্গলিক শুভ পরিণয় নিমন্ত্রণপত্র' : 'An Invitation to the Auspicious Union'}
          </p>

          {/* 3D Sholapith Topor Leaf Interactive Box */}
          <div
            className="relative w-full max-w-[360px] mx-auto rounded-2xl bg-[#fcf1ef] shadow-[0_12px_36px_-6px_rgba(119,90,25,0.1)] p-3 border border-[#d1c5b4]/40 overflow-hidden"
          >
            <div
              className="relative w-full h-[320px] rounded-xl bg-white shadow-inner flex flex-col items-center justify-center p-3 cursor-grab active:cursor-grabbing border border-[#d1c5b4]/30"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              {/* Corner Floral Filigrees */}
              <span className="absolute top-2 left-2 text-[#c5a059]/50 text-xs select-none">❧</span>
              <span className="absolute top-2 right-2 text-[#c5a059]/50 text-xs select-none">☙</span>
              <span className="absolute bottom-2 left-2 text-[#c5a059]/50 text-xs select-none">❧</span>
              <span className="absolute bottom-2 right-2 text-[#c5a059]/50 text-xs select-none">☙</span>

              {/* Sholapith Topor Simulated 3D Sculpture */}
              <div
                className="w-48 h-56 flex flex-col items-center justify-center relative transition-transform duration-75"
                style={{
                  transform: `perspective(600px) rotateY(${toporAngle}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Top Kalash Pinnacle */}
                <div className="w-5 h-7 bg-gradient-to-t from-[#c5a059] to-[#fff8f6] rounded-t-full shadow-md flex items-center justify-center border border-[#775a19]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9b414c]"></span>
                </div>

                {/* Top Tier Cone */}
                <div className="w-20 h-14 bg-gradient-to-b from-[#ffffff] via-[#fff8f6] to-[#f6ecea] rounded-t-full border-2 border-[#c5a059] shadow-md flex items-center justify-center relative overflow-hidden -mt-1">
                  <div className="absolute inset-0 flex items-center justify-around opacity-60">
                    <span className="w-1 h-full bg-[#c5a059]/30"></span>
                    <span className="w-1 h-full bg-[#c5a059]/30"></span>
                    <span className="w-1 h-full bg-[#c5a059]/30"></span>
                  </div>
                  <span className="text-[10px] text-[#775a19] font-bold z-10">শোলার মুকুট</span>
                </div>

                {/* Middle Tier with Floral Shola Cutouts */}
                <div className="w-32 h-16 bg-gradient-to-b from-[#ffffff] to-[#fff8f6] rounded-lg border-2 border-[#c5a059] shadow-lg flex items-center justify-around px-2 relative -mt-1">
                  <div className="w-6 h-6 rounded-full bg-[#fff8f6] border border-[#c5a059] flex items-center justify-center text-xs shadow-inner">
                    ❀
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#f6ecea] border-2 border-[#9b414c] flex items-center justify-center text-xs font-bold text-[#9b414c] shadow-sm">
                    শ্রী
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#fff8f6] border border-[#c5a059] flex items-center justify-center text-xs shadow-inner">
                    ❀
                  </div>
                </div>

                {/* Base Rim of Topor */}
                <div className="w-40 h-10 bg-gradient-to-r from-[#c5a059] via-[#ffffff] to-[#c5a059] rounded-b-xl border-2 border-[#775a19] shadow-md flex items-center justify-between px-3 -mt-1">
                  <span className="w-2 h-2 rounded-full bg-[#9b414c]"></span>
                  <span className="text-[10px] tracking-widest text-[#775a19] font-bold">
                    {isNative ? 'পবিত্র সাতপাক' : 'SHOLAPITH'}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#9b414c]"></span>
                </div>

                {/* Soft Pedestal Shadow */}
                <div className="w-36 h-3 bg-black/10 rounded-full blur-xs mt-3"></div>
              </div>

              {/* 3D Interaction Hint */}
              <div className="absolute bottom-2 flex items-center gap-1.5 px-3 py-1 bg-[#f6ecea] rounded-full text-[10px] text-[#615e54] font-semibold border border-[#d1c5b4]/40 shadow-sm">
                <RotateCw className="w-3 h-3 text-[#775a19] animate-spin" />
                <span>
                  {isNative ? 'স্পর্শে বা টেনে টোপরটি ঘোরান • Drag to rotate Sholapith' : 'Drag to rotate 3D Sholapith Topor'}
                </span>
              </div>
            </div>
          </div>

          {/* Couple Engraved Names */}
          <div className="mt-4 space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1f1b1a] tracking-wide">
              {isNative ? (
                <>
                  অনিন্দ্য <span className="text-[#9b414c] italic font-serif">ও</span> মহাশ্বেতা
                </>
              ) : (
                <>
                  Anindya <span className="text-[#9b414c] italic font-serif">&</span> Mahashweta
                </>
              )}
            </h1>
            <p className="text-sm font-bold text-[#775a19] tracking-wider">
              Anindya & Mahashweta
            </p>
            <div className="flex items-center justify-center my-2 space-x-2 w-32 mx-auto opacity-70">
              <span className="h-[1px] flex-1 bg-[#c5a059]"></span>
              <span className="text-xs text-[#775a19]">❦</span>
              <span className="h-[1px] flex-1 bg-[#c5a059]"></span>
            </div>
            <p className="text-xs text-[#615e54] italic max-w-sm mx-auto leading-relaxed">
              {isNative
                ? 'শান্তিনিকেতনের সুর ও শালবনের স্নিগ্ধ ছায়ায় বাঁধা পড়ল দুই প্রাণ — শুভ পরিণয়।'
                : 'The sacred union of two souls under the floral canopy of Santiniketan and eternal heritage of Kolkata.'}
            </p>
          </div>
        </section>

        {/* Section 2: Auspicious Muhurat Countdown Leaf */}
        <section className="w-full rounded-2xl bg-[#fcf1ef] p-5 text-center shadow-sm border border-[#d1c5b4]/40 space-y-3">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#775a19] block">
            {isNative ? 'শুভ বিবাহ লগ্ন • Sacred Muhurat' : 'Sacred Muhurat'}
          </span>
          <p className="text-base font-bold text-[#1f1b1a]">
            {isNative ? '২৬ অগ্রহায়ণ, ১৪৩৩ • ১২ ডিসেম্বর ২০২৬' : '26 Agrahayana 1433 • 12 December 2026'}
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-semibold text-[#9b414c] border border-[#9b414c]/20 shadow-xs">
            <span>🌅</span>
            <span>{isNative ? 'গোধূলি লগ্ন • সন্ধ্যা ০৬:৪৫ ঘটিকা' : 'Godhuli Lagna • 06:45 PM'}</span>
          </div>

          {/* Tear-Off Countdown Cards */}
          <div className="grid grid-cols-4 gap-2 pt-2 max-w-sm mx-auto">
            <div className="flex flex-col items-center p-2.5 rounded-xl bg-white shadow-xs border-t-2 border-[#775a19]">
              <span className="text-xl font-bold text-[#775a19]">{timeLeft.days}</span>
              <span className="text-[10px] text-[#7f7667] uppercase font-sans mt-0.5">
                {isNative ? 'দিন' : 'Days'}
              </span>
            </div>
            <div className="flex flex-col items-center p-2.5 rounded-xl bg-white shadow-xs border-t-2 border-[#775a19]">
              <span className="text-xl font-bold text-[#775a19]">{timeLeft.hours}</span>
              <span className="text-[10px] text-[#7f7667] uppercase font-sans mt-0.5">
                {isNative ? 'ঘণ্টা' : 'Hours'}
              </span>
            </div>
            <div className="flex flex-col items-center p-2.5 rounded-xl bg-white shadow-xs border-t-2 border-[#775a19]">
              <span className="text-xl font-bold text-[#775a19]">{timeLeft.mins}</span>
              <span className="text-[10px] text-[#7f7667] uppercase font-sans mt-0.5">
                {isNative ? 'মিনিট' : 'Mins'}
              </span>
            </div>
            <div className="flex flex-col items-center p-2.5 rounded-xl bg-white shadow-xs border-t-2 border-[#9b414c]">
              <span className="text-xl font-bold text-[#9b414c] animate-pulse">{timeLeft.secs}</span>
              <span className="text-[10px] text-[#7f7667] uppercase font-sans mt-0.5">
                {isNative ? 'সেকেন্ড' : 'Secs'}
              </span>
            </div>
          </div>
        </section>

        {/* Section 3: Ritual Celebrations Sequence (Parikrama Cards) */}
        <section className="space-y-3.5">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#775a19]">
              {isNative ? 'মাঙ্গলিক আচার ও অনুষ্ঠান' : 'Ritual Parikrama'}
            </span>
            <h2 className="text-xl font-bold text-[#1f1b1a] mt-0.5">
              {isNative ? 'চার পর্বের বিবাহগাঁথা' : 'Celebration Schedule'}
            </h2>
            <div className="w-12 h-0.5 bg-[#c5a059] mx-auto mt-1"></div>
          </div>

          {/* Act 1: Aiburobhat */}
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-[#d1c5b4]/40 space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold tracking-widest text-[#775a19] uppercase bg-[#f6ecea] px-2.5 py-0.5 rounded-full">
                {isNative ? '১ম পর্ব • Act I' : 'Act I'}
              </span>
              <span className="text-xs text-[#7f7667]">10 Dec 2026</span>
            </div>
            <h3 className="text-base font-bold text-[#1f1b1a]">
              {isNative ? '১. আইবুড়োভাত উৎসব' : '1. Aiburobhat Feast'}
            </h3>
            <p className="text-xs text-[#615e54]">
              {isNative
                ? 'শান্তিনিকেতন কুঠিতে ঘরোয়া আবহে পঞ্চব্যঞ্জন ভোজ, রবীন্দ্রসঙ্গীত ও আশীর্বাদ।'
                : 'Traditional farewell bachelorhood feast with home delicacies at Santiniketan Kuthi.'}
            </p>
            <div className="pt-2 bg-[#fcf1ef] -mx-4 -mb-4 px-4 py-2.5 rounded-b-2xl flex items-center justify-between text-xs text-[#615e54] border-t border-[#d1c5b4]/30">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#775a19]" /> 12:30 PM
              </span>
              <span className="text-[#775a19] font-bold">
                {isNative ? 'শান্তিনিকেতনি তসর' : 'Tussar Silk'}
              </span>
            </div>
          </div>

          {/* Act 2: Gaye Holud */}
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-[#d1c5b4]/40 space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold tracking-widest text-[#775a19] uppercase bg-[#f6ecea] px-2.5 py-0.5 rounded-full">
                {isNative ? '২য় পর্ব • Act II' : 'Act II'}
              </span>
              <span className="text-xs text-[#7f7667]">11 Dec 2026</span>
            </div>
            <h3 className="text-base font-bold text-[#775a19]">
              {isNative ? '২. গায়ে হলুদ ও তত্ত্ব' : '2. Gaye Holud Blessing'}
            </h3>
            <p className="text-xs text-[#615e54]">
              {isNative
                ? 'আম্রকুঞ্জ প্রাঙ্গণে শালবনের ছায়ায় কাঁচা হলুদ, সুবাসিত চন্দন ও বাউল গানের সুর।'
                : 'Auspicious turmeric blessing under morning trees accompanied by acoustic folk music.'}
            </p>
            <div className="pt-2 bg-[#fcf1ef] -mx-4 -mb-4 px-4 py-2.5 rounded-b-2xl flex items-center justify-between text-xs text-[#615e54] border-t border-[#d1c5b4]/30">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#775a19]" /> 09:30 AM
              </span>
              <span className="text-[#775a19] font-bold">
                {isNative ? 'বাসন্তী ঢাকাই' : 'Mustard Handloom'}
              </span>
            </div>
          </div>

          {/* Act 3: Shuvo Bibaho & Saat Paak */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#fff8f6] to-[#fcf1ef] shadow-md border border-[#9b414c]/30 space-y-2 relative">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold tracking-widest text-[#9b414c] uppercase bg-[#ffdadb] px-2.5 py-0.5 rounded-full">
                {isNative ? '৩য় পর্ব • মূল লগ্ন' : 'Act III • Main Nuptials'}
              </span>
              <span className="text-xs text-[#9b414c] font-semibold">12 Dec 2026</span>
            </div>
            <h3 className="text-lg font-bold text-[#9b414c]">
              {isNative ? '৩. শুভ বিবাহ ও সাতপাক' : '3. Shuvo Bibaho & Saat Paak'}
            </h3>
            <p className="text-xs text-[#1f1b1a]">
              {isNative
                ? 'শোভাবাজার রাজবাড়ি নাটমন্দিরে শোলার শুভ্রতার মাঝে শুভ দৃষ্টি, মালা বদল ও সিঁদুর দান।'
                : 'Sacred wedding ceremony at Sovabazar Rajbari under magnificent white Sholapith canopies.'}
            </p>
            <div className="pt-2 bg-white/80 -mx-4 -mb-4 px-4 py-2.5 rounded-b-2xl flex items-center justify-between text-xs border-t border-[#9b414c]/20">
              <span className="flex items-center gap-1 font-bold text-[#9b414c]">
                <Clock className="w-3.5 h-3.5" /> 06:45 PM (গোধূলি লগ্ন)
              </span>
              <span className="font-bold text-[#9b414c]">
                {isNative ? 'লাল বেনারসী ও শোলার টোপর' : 'Benarasi & Shola Topor'}
              </span>
            </div>
          </div>

          {/* Act 4: Bou Bhaat & Reception */}
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-[#d1c5b4]/40 space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold tracking-widest text-[#775a19] uppercase bg-[#f6ecea] px-2.5 py-0.5 rounded-full">
                {isNative ? '৪র্থ পর্ব • Act IV' : 'Act IV'}
              </span>
              <span className="text-xs text-[#7f7667]">14 Dec 2026</span>
            </div>
            <h3 className="text-base font-bold text-[#1f1b1a]">
              {isNative ? '৪. প্রীতিভোজ ও বৌভাত' : '4. Bou Bhaat & Reception'}
            </h3>
            <p className="text-xs text-[#615e54]">
              {isNative
                ? 'দ্য গ্লাসহাউসে নববধূর শুভাগমন, রবীন্দ্ররাগ আসর ও রাজকীয় নৈশভোজ।'
                : 'Grand evening reception dinner celebrating new beginnings at The Glasshouse Pavilion.'}
            </p>
            <div className="pt-2 bg-[#fcf1ef] -mx-4 -mb-4 px-4 py-2.5 rounded-b-2xl flex items-center justify-between text-xs text-[#615e54] border-t border-[#d1c5b4]/30">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#775a19]" /> 07:30 PM
              </span>
              <span className="text-[#775a19] font-bold">
                {isNative ? 'মার্জিত সান্ধ্য সাজ' : 'Black Tie / Silk Saree'}
              </span>
            </div>
          </div>
        </section>

        {/* Section 4: Traditional Bhoj Menu Accordion */}
        <section className="w-full rounded-2xl bg-[#f6ecea] p-4 border border-[#d1c5b4]/50">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🍽️</span>
              <div>
                <h3 className="text-sm font-bold text-[#775a19]">
                  {isNative ? 'বাঙালির শুভ ভোজের তালিকা' : 'Curated Royal Feast Menu'}
                </h3>
                <span className="text-[11px] text-[#615e54]">
                  {isNative ? 'রাজকীয় ব্যঞ্জন ও রসগোল্লা' : 'Traditional Bengali Delicacies'}
                </span>
              </div>
            </div>
            {menuOpen ? <ChevronUp className="w-4 h-4 text-[#775a19]" /> : <ChevronDown className="w-4 h-4 text-[#775a19]" />}
          </button>

          {menuOpen && (
            <div className="mt-3.5 pt-3 border-t border-[#d1c5b4]/40 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-[#d1c5b4]/30">
                <span className="font-bold text-[#9b414c] block mb-1">
                  {isNative ? 'প্রথম পাত' : 'Appetizers'}
                </span>
                <p className="text-[11px] text-[#615e54] leading-relaxed">
                  হিং-এর কচুরি, ছোলার ডাল, ভাজা বেগুনি, তোপসে ফ্রাই
                </p>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-[#d1c5b4]/30">
                <span className="font-bold text-[#9b414c] block mb-1">
                  {isNative ? 'প্রধান পদ' : 'Main Course'}
                </span>
                <p className="text-[11px] text-[#615e54] leading-relaxed">
                  বাসন্তী পোলাও, চিংড়ি মালাইকারি, সর্ষে ইলিশ ভাপা, খাসির কষা
                </p>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-[#d1c5b4]/30 col-span-2">
                <span className="font-bold text-[#775a19] block mb-1">
                  {isNative ? 'মিষ্টিমুখ' : 'Desserts'}
                </span>
                <p className="text-[11px] text-[#615e54] leading-relaxed">
                  আমসত্ত্ব চাটনি, কড়াপাকের সন্দেশ, নলেন গুড়ের রসগোল্লা ও নবদ्वीপের ক্ষীর দই
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Section 5: RSVP on WhatsApp & Digital Shagun */}
        <section className="w-full rounded-2xl bg-white p-5 shadow-sm border border-[#d1c5b4]/50 space-y-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#775a19]">
              {isNative ? 'উপস্থিতি পত্র' : 'Confirm Your Presence'}
            </span>
            <h2 className="text-xl font-bold text-[#1f1b1a]">
              {isNative ? 'শুভ উপস্থিতি নিশ্চিত করুন' : 'RSVP & Guest Confirmation'}
            </h2>
          </div>

          <form onSubmit={handleWhatsAppRsvp} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-[#1f1b1a] block mb-1">
                {isNative ? 'উপস্থিত অতিথি সংখ্যা:' : 'Number of Guests Attending:'}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['১', '২', '৩', '৪+'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setHeadcount(c)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      headcount === c
                        ? 'bg-[#775a19] text-white border-[#775a19] shadow-xs'
                        : 'bg-[#fcf1ef] text-[#1f1b1a] border-[#d1c5b4]/60'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1f1b1a] block mb-1">
                {isNative ? 'আপনার শুভ নাম:' : 'Your Name:'}
              </label>
              <input
                type="text"
                value={rsvpGuestName}
                onChange={e => setRsvpGuestName(e.target.value)}
                placeholder={isNative ? 'উদাহরন: শ্রী পার্থ মুখোপাধ্যায়' : 'e.g. Mr. Partha Mukherjee'}
                className="w-full h-10 px-3 bg-[#fcf1ef] border border-[#d1c5b4] rounded-xl text-xs text-[#1f1b1a] focus:outline-none focus:border-[#775a19]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#775a19] hover:bg-[#5d4201] text-white py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              <span>
                {isNative ? 'হোয়াটসঅ্যাপে নিমন্ত্রণ স্বীকার করুন • Confirm on WhatsApp' : 'Confirm on WhatsApp'}
              </span>
            </button>
          </form>

          {/* Shagun Pronami Box */}
          <div className="p-3.5 rounded-xl bg-[#fcf1ef] border border-[#d1c5b4]/50 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-[#7f7667] uppercase font-bold block">
                {isNative ? 'ডিজিটাল শুভ প্রণামী' : 'Digital Pronami (UPI)'}
              </span>
              <span className="font-mono font-bold text-[#775a19]">sholavivah@upi</span>
            </div>
            <button
              type="button"
              onClick={copyUpi}
              className="px-3 py-1.5 bg-[#775a19] text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
            >
              {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUpi ? 'কপি হয়েছে' : 'কপি'}</span>
            </button>
          </div>
        </section>

        {/* Footer Seal */}
        <footer className="text-center py-4 border-t border-[#d1c5b4]/50 space-y-1">
          <div className="text-sm font-bold text-[#775a19]">॥ শুভমস্তু • ইতি ॥</div>
          <p className="text-xs text-[#615e54]">
            {isNative
              ? 'শোলার শুভ্রতায় রচিত অনন্য বাঙালি বিবাহ পত্র'
              : 'Minimal-Luxury Bengali Sholapith Digital Wedding Invitation'}
          </p>
          <div className="text-[11px] text-[#7f7667] pt-1">
            UtsavPatra • Artisanal Craft Edition
          </div>
        </footer>
      </main>
    </div>
  );
};
