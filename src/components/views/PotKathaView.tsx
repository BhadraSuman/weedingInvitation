import React, { useState, useEffect } from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import { audioManager } from '../../utils/audioManager';
import { Link } from 'react-router-dom';
import {
  Volume2,
  VolumeX,
  Home,
  Check,
  Copy,
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronDown,
  Mail,
  Send,
  Heart
} from 'lucide-react';

interface PotKathaViewProps {
  template?: CulturalTemplate;
  lang?: Language;
  guestName?: string;
  onLangChange?: (lang: Language) => void;
}

interface FloatingPetal {
  id: number;
  x: number;
  y: number;
  sym: string;
  color: string;
  size: number;
  targetX: number;
  targetY: number;
  rotation: number;
}

export const PotKathaView: React.FC<PotKathaViewProps> = ({
  template,
  lang = 'native',
  guestName,
  onLangChange
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestCount, setGuestCount] = useState('২ জন');
  const [foodChoice, setFoodChoice] = useState<'nonveg' | 'veg'>('nonveg');
  const [pigeonOpen, setPigeonOpen] = useState(false);
  const [guestNameInput, setGuestNameInput] = useState(guestName || '');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [petals, setPetals] = useState<FloatingPetal[]>([]);

  // Interactive Character Tap Jigs
  const [groomJig, setGroomJig] = useState(false);
  const [brideJig, setBrideJig] = useState(false);
  const [catWiggle, setCatWiggle] = useState(false);
  const [dhaakiBounce, setDhaakiBounce] = useState(false);
  const [fishSwim, setFishSwim] = useState(false);
  const [peacockFan, setPeacockFan] = useState(false);

  const isNative = lang === 'native';

  useEffect(() => {
    const unsub = audioManager.subscribe(playing => {
      setIsPlaying(playing);
    });
    return () => unsub();
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioManager.pause();
    } else {
      audioManager.play();
    }
  };

  const triggerPetalShower = (originX?: number, originY?: number) => {
    const colors = ['#a51611', '#c83227', '#6f4c00', '#ffdeab', '#d5e3ff', '#e9c400'];
    const symbols = ['🌸', '🪔', '✦', '❀', '✿', '•'];
    const startX = originX ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 200);
    const startY = originY ?? (typeof window !== 'undefined' ? window.innerHeight / 2 : 300);

    const newPetals: FloatingPetal[] = Array.from({ length: 15 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 140 + 40;
      return {
        id: Date.now() + i + Math.random(),
        x: startX,
        y: startY,
        sym: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 12 + 12,
        targetX: Math.cos(angle) * velocity,
        targetY: Math.sin(angle) * velocity - 35,
        rotation: Math.random() * 360
      };
    });

    setPetals(prev => [...prev, ...newPetals]);
    setTimeout(() => {
      setPetals(prev => prev.filter(p => !newPetals.some(np => np.id === p.id)));
    }, 1400);
  };

  const copyUpi = () => {
    navigator.clipboard.writeText('aditi.debashish@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleWhatsAppRsvp = () => {
    const guest = guestNameInput.trim() || (isNative ? 'শ্রদ্ধেয় অতিথি' : 'Respected Guest');
    const foodText = foodChoice === 'nonveg'
      ? (isNative ? 'ইলিশ ও খাসি ভোজ (বাঙালির খাঁটি আমিষ)' : 'Authentic Bengali Non-Veg (Ilish & Mutton)')
      : (isNative ? 'সাত্বিক নিরামিষ (ঘিয়ে ভাজা পোলাও-ছানা)' : 'Pure Satvik Vegetarian (Ghee Pulao & Paneer)');

    const message = isNative
      ? `নমস্কার! আমি ${guest} দেবাশীষ ও অদিতির পটচিত্র বিবাহ উৎসবে উপস্থিত থাকব।\n\nউপস্থিতি: ${guestCount}\nভোজের রুচি: ${foodText}\n\nনবদম্পতির জীবনের এই শুভলগ্নে জানাই আন্তরিক শুভকামনা ও আশিস!`
      : `Namaste! I am ${guest}, confirming our presence for Debashish & Aditi's Kalighat Patachitra Wedding.\n\nAttending: ${guestCount}\nFeast Choice: ${foodText}\n\nWishing the couple a lifetime of joy, harmony, and love!`;

    window.open(`https://wa.me/919830123456?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fff9eb] text-[#1d1c13] font-serif antialiased select-none pb-24 relative overflow-x-hidden">
      {/* Floating Petal Particles Container */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {petals.map(p => (
          <div
            key={p.id}
            style={{
              position: 'fixed',
              left: `${p.x}px`,
              top: `${p.y}px`,
              fontSize: `${p.size}px`,
              color: p.color,
              transform: `translate(${p.targetX}px, ${p.targetY}px) rotate(${p.rotation}deg)`,
              opacity: 0,
              transition: 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {p.sym}
          </div>
        ))}
      </div>

      {/* Top Header Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#fff9eb]/95 backdrop-blur-md shadow-sm border-b border-[#e3beb9]/60">
        <div className="h-16 px-4 max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="w-9 h-9 rounded-full bg-[#f3eddf] flex items-center justify-center text-[#a51611] hover:bg-[#eee8da] transition-colors shadow-sm"
              title="Return Home"
            >
              <Home className="w-4 h-4" />
            </Link>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-[#a51611] leading-none tracking-wide">
                {isNative ? 'পট কথা' : 'POT KATHA'}
              </span>
              <span className="text-[11px] tracking-widest text-[#6f4c00] uppercase font-sans mt-0.5">
                {isNative ? 'কালীঘাট পটচিত্র বিবাহগাঁথা' : 'Kalighat Patachitra Scroll'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => onLangChange?.(isNative ? 'en' : 'native')}
              className="h-9 px-3 rounded-full bg-[#f3eddf] hover:bg-[#eee8da] border border-[#e3beb9] text-xs font-bold text-[#a51611] transition-colors"
            >
              {isNative ? 'বাং / EN' : 'EN / বাং'}
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`h-9 px-3 rounded-full flex items-center gap-1.5 transition-colors border ${
                isPlaying
                  ? 'bg-[#a51611] text-white border-[#a51611]'
                  : 'bg-[#f3eddf] text-[#6f4c00] border-[#e3beb9]'
              }`}
            >
              {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="text-[11px] font-bold hidden sm:inline">
                {isPlaying ? (isNative ? 'গান চালু' : 'Playing') : (isNative ? 'গান' : 'Music')}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Scroll Content Area */}
      <main className="pt-20 px-3 max-w-xl mx-auto space-y-4">
        {/* Top Jute Cord & Hanging Knots */}
        <div className="flex flex-col items-center w-full select-none pt-1">
          <div className="w-12 h-5 bg-[#8e6300] rounded-t-full flex items-center justify-center shadow-md">
            <div className="w-3 h-3 bg-[#6f4c00] rounded-full"></div>
          </div>
          <div className="flex justify-between w-64 px-4 -mt-1">
            <div className="w-1 h-8 bg-[#6f4c00] shadow-sm"></div>
            <div className="w-1 h-8 bg-[#6f4c00] shadow-sm"></div>
          </div>

          {/* Upper Scroll Dandi (Wooden Roller Bar with Brass Caps) */}
          <div className="relative w-full flex items-center justify-between bg-[#6f4c00] h-7 rounded-full shadow-lg px-1 border border-[#ffdeab]/40">
            <div className="w-5 h-7 bg-[#ffdeab] rounded-l-full shadow-inner flex items-center justify-center">
              <div className="w-1 h-5 bg-[#8e6300] rounded-full"></div>
            </div>
            <div className="flex-1 flex justify-around px-4">
              <span className="w-2 h-2 rounded-full bg-[#ffdeab]"></span>
              <span className="w-2 h-2 rounded-full bg-[#ffdeab]"></span>
              <span className="w-2 h-2 rounded-full bg-[#ffdeab]"></span>
              <span className="w-2 h-2 rounded-full bg-[#ffdeab]"></span>
              <span className="w-2 h-2 rounded-full bg-[#ffdeab]"></span>
            </div>
            <div className="w-5 h-7 bg-[#ffdeab] rounded-r-full shadow-inner flex items-center justify-center">
              <div className="w-1 h-5 bg-[#8e6300] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Decorative Border Frieze: Kalighat Laata-Pata Bands */}
        <div className="w-full bg-[#a51611] py-1 px-3 flex justify-between items-center rounded shadow-sm text-white">
          <span className="text-[#ffdeab] text-xs tracking-widest font-sans">❖ ❖ ❖</span>
          <span className="text-xs md:text-sm font-bold tracking-widest uppercase">
            {isNative ? 'কালীঘাট পটচিত্র বিবাহগাঁথা' : 'Kalighat Nuptial Chronicle'}
          </span>
          <span className="text-[#ffdeab] text-xs tracking-widest font-sans">❖ ❖ ❖</span>
        </div>

        {/* Scroll Parchment Body */}
        <div className="relative w-full bg-[#f9f3e5] shadow-xl rounded-2xl p-4 md:p-5 flex flex-col gap-5 border border-[#e3beb9]/60">
          {/* Invocation & Benediction Panel */}
          <div className="w-full text-center flex flex-col items-center bg-white p-5 rounded-xl shadow-sm border border-[#e3beb9]/50">
            <div className="w-16 h-1 bg-[#a51611] mb-3 rounded-full"></div>
            <p className="text-base md:text-lg text-[#a51611] font-bold tracking-wide">
              ॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥
            </p>
            <div className="w-10 h-10 my-2 rounded-full bg-[#ffdad5] flex items-center justify-center shadow-sm text-[#a51611]">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-sm text-[#1d1c13] italic max-w-sm leading-relaxed px-2">
              {isNative
                ? '"ওহে সুজন শোন দিয়া মন, পট কথা কহি আজ বধূ-বরের মিলন..."'
                : '"Listen with joyful hearts as the sacred scroll unfurls the story of our union."'}
            </p>
            <div className="flex items-center gap-2 mt-3 text-[#6f4c00] font-bold text-sm">
              <span>{isNative ? 'অদিতি' : 'Aditi'}</span>
              <Heart className="w-4 h-4 text-[#a51611] fill-[#a51611]" />
              <span>{isNative ? 'দেবাশীষ' : 'Debashish'}</span>
            </div>
            <div className="w-16 h-1 bg-[#a51611] mt-3 rounded-full"></div>
          </div>

          {/* Chapter 1: How We Met (কফি হাউজের আড্ডা) */}
          <section className="w-full flex flex-col bg-[#f3eddf] p-4 rounded-xl shadow-sm border border-[#e3beb9]/50 space-y-3">
            <div className="flex justify-between items-center">
              <span className="bg-[#a51611] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {isNative ? 'প্রথম অধ্যায় • কেমন করে দেখা' : 'Chapter I • How We Met'}
              </span>
              <span className="text-xs text-[#5a403d] italic font-semibold">
                {isNative ? 'কফি হাউজের আড্ডা' : 'Coffee House Adda'}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e3beb9]/40 text-center">
              <p className="text-xs text-[#1d1c13] italic">
                {isNative
                  ? '‘এক কাপ কফি আর নচিকেতার গান — সেখানেই বাঁধা পড়েছিল দু\'জোড়া চোখ।’'
                  : '"A warm cup of Kolkata coffee and timeless songs — that was where two hearts found each other."'}
              </p>
            </div>

            {/* Kalighat Characters Display (Interactive Tap Jig) */}
            <div className="grid grid-cols-2 gap-3">
              {/* Groom Card */}
              <button
                type="button"
                onClick={(e) => {
                  setGroomJig(true);
                  setTimeout(() => setGroomJig(false), 600);
                  triggerPetalShower(e.clientX, e.clientY);
                }}
                className={`flex flex-col items-center bg-white p-3 rounded-xl shadow-sm transition-all duration-300 border border-[#e3beb9] ${
                  groomJig ? 'scale-105 rotate-3' : 'hover:shadow-md'
                }`}
              >
                <div className="w-full h-44 rounded-xl overflow-hidden bg-[#eee8da] relative flex items-center justify-center">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBauKDGYMtiLIPMYFDV2XLM1h2P8kFdXQV24zWRcy8Yw8IT4FeEibRb7IpoISxy529-DO61Yg2puH-YZnMf2dHg7G9IyQA-EW3WL3_idZD7OvF_bkLWcA6F_GMwivSm2K58ese2eXXUetfaKH_abFlhRyY-T8bfQC0bgDUeb8bSA8JkPNTVGvfb1jnzfhkQ3o33fs7wxp1r6ixL2kM9ZDcFIum5IrmXOcJkzRI_tDI_tA3pawS1tzn57Q"
                    alt="Groom Debashish"
                    onError={(e) => {
                      // Fallback to local image if LH3 URL fails
                      (e.target as HTMLImageElement).src = '/images/couples/bengali-groom.jpg';
                    }}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <span className="absolute bottom-2 left-2 bg-white/90 text-[#1d1c13] text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {isNative ? 'দেবাশীষ' : 'Debashish'}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-[#a51611] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isNative ? 'নৃত্য দর্শন • Tap' : 'Tap for Jig'}</span>
                </div>
              </button>

              {/* Bride Card */}
              <button
                type="button"
                onClick={(e) => {
                  setBrideJig(true);
                  setTimeout(() => setBrideJig(false), 600);
                  triggerPetalShower(e.clientX, e.clientY);
                }}
                className={`flex flex-col items-center bg-white p-3 rounded-xl shadow-sm transition-all duration-300 border border-[#e3beb9] ${
                  brideJig ? 'scale-105 -rotate-3' : 'hover:shadow-md'
                }`}
              >
                <div className="w-full h-44 rounded-xl overflow-hidden bg-[#eee8da] relative flex items-center justify-center">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc23LXikUjDAbKwFI7pSyn_L-YRUGfc7GD2Np_120oSPkenl2ny0zXKNEiqtqIt04h60TFuVGbx8KouD1m60SjnGryd2tryEQAOYd8E0q3CehpK3o3VxedYSxTH-XES_Qiwtus5PFCYw5QbHDFnJdSJ2eVSVbwgEgiIpDJLkbjYq7QrwREUOuhhZHOVb-UYo0GBrSvQloJtS3x4fGmaIvknk_cRDBQsRPkwZcRbxqpTETIs_jhKBA-6w"
                    alt="Bride Aditi"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/couples/bengali-bride.jpg';
                    }}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <span className="absolute bottom-2 left-2 bg-white/90 text-[#1d1c13] text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {isNative ? 'অদিতি' : 'Aditi'}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-[#a51611] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isNative ? 'নৃত্য দর্শন • Tap' : 'Tap for Jig'}</span>
                </div>
              </button>
            </div>
            <p className="text-[11px] text-center text-[#5a403d]">
              {isNative ? '(পাত্র অথবা পাত্রীকে ছুঁয়ে আনন্দধ্বনি ও পুষ্পবৃষ্টি ছড়ান)' : '(Tap bride or groom to trigger folk celebration)'}
            </p>
          </section>

          {/* Chapter 2: Our Families (আশীর্বাদ ও মঙ্গলধ্বনি) */}
          <section className="w-full flex flex-col bg-[#eee8da] p-4 rounded-xl shadow-sm border border-[#e3beb9]/50 space-y-3">
            <div className="flex justify-between items-center">
              <span className="bg-[#8e6300] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {isNative ? 'দ্বিতীয় অধ্যায় • মেলবন্ধন' : 'Chapter II • The Union'}
              </span>
              <span className="text-xs text-[#5a403d] italic font-semibold">
                {isNative ? 'আশীর্বাদ ও মঙ্গলধ্বনি' : 'Family Blessings'}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e3beb9]/40 text-center">
              <p className="text-xs text-[#1d1c13] italic">
                {isNative
                  ? '‘দুই বাড়ির ঠাকুমা-দিদিমাদের মিষ্টি হাসি আর নারকেল নাড়ুর মধুর ভাগাভাগি!’'
                  : '"Sweet smiles of grandmothers and the joyous sharing of homemade coconut sweets."'}
              </p>
            </div>

            {/* Bengal Cat & Dhaak Drummers */}
            <div className="grid grid-cols-2 gap-3">
              {/* Kalighat Cat */}
              <button
                type="button"
                onClick={(e) => {
                  setCatWiggle(true);
                  setTimeout(() => setCatWiggle(false), 600);
                  triggerPetalShower(e.clientX, e.clientY);
                }}
                className={`flex flex-col items-center bg-white p-3 rounded-xl shadow-sm transition-all duration-300 border border-[#e3beb9] ${
                  catWiggle ? 'scale-105 rotate-6' : 'hover:shadow-md'
                }`}
              >
                <div className="w-full h-36 rounded-xl overflow-hidden bg-[#eee8da] relative flex items-center justify-center">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu5E6X6As5EP6jpLKvTqCuZ3E-yZB_-7oAUdWz79Dy0h_G4gkOsUeq-60E_0dMn-SZeZm-pLddvAlSWY5JxMTF0Uk7VH4WhlHSt26eZ9jCQ1yK13ebMMVvAwivZSakzxexjbGo0gu8tcK6jH6IkqZtX3eFbpp2m0ZT-fwrz7R6ordbSbkNWd7AMcwvg1qR8bRxYM5roszeyyGP4R0EOR0oKRZsDJu4C4SHJ2xuhP6q7WxViaZA5FV-mg"
                    alt="Kalighat Cat"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <span className="absolute bottom-2 left-2 bg-white/90 text-[#1d1c13] text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {isNative ? 'বাঘরোলের ছানা' : 'Playful Cat'}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-[#6f4c00] text-xs font-bold">
                  <span>🐾</span>
                  <span>{isNative ? 'মিউ মিউ ডাক' : 'Tap to Meow'}</span>
                </div>
              </button>

              {/* Dhaak Drummers */}
              <button
                type="button"
                onClick={(e) => {
                  setDhaakiBounce(true);
                  setTimeout(() => setDhaakiBounce(false), 600);
                  triggerPetalShower(e.clientX, e.clientY);
                }}
                className={`flex flex-col items-center bg-white p-3 rounded-xl shadow-sm transition-all duration-300 border border-[#e3beb9] ${
                  dhaakiBounce ? 'scale-105 -rotate-6' : 'hover:shadow-md'
                }`}
              >
                <div className="w-full h-36 rounded-xl overflow-hidden bg-[#eee8da] relative flex items-center justify-center">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvXwnqaOv-TAAcWNVLeTSolQDxQg2A_Rq206_GuvxOPQdw2aFL6SRLabaO6qNg82efaPw6OU6LCZzJucjffF71xOMmIOaGD12p6wxSMN3z5CG5M2h46lpd-RoxKX1whpNPWmKN4UT-SQFAgSb1LgnP6caSs5Vul9e5KY9ciaJCQsqgLGGhjWrXKC5Lvm2dNz73qgqATnzkhDdhDv_XOaDM8BNj8T5oQiBmutME1zl2a7XniB3X-gWSIg"
                    alt="Dhaaki"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <span className="absolute bottom-2 left-2 bg-white/90 text-[#1d1c13] text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {isNative ? 'মঙ্গল ঢাকি' : 'Dhaaki Drummer'}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-[#6f4c00] text-xs font-bold">
                  <span>🥁</span>
                  <span>{isNative ? 'ঢাকের বাদ্যি' : 'Dhaak Beat'}</span>
                </div>
              </button>
            </div>
            <p className="text-[11px] text-center text-[#5a403d]">
              {isNative ? '(ঢাকিকে ছুঁলে ঢাকের উল্লাস বেজে উঠবে)' : '(Tap the drummer to feel the rhythm of Bengali Dhaak)'}
            </p>
          </section>

          {/* Chapter 3: Proposal & Aiburobhat (পাকা কথা ও মাছের পদ) */}
          <section className="w-full flex flex-col bg-[#f3eddf] p-4 rounded-xl shadow-sm border border-[#e3beb9]/50 space-y-3">
            <div className="flex justify-between items-center">
              <span className="bg-[#485f84] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {isNative ? 'তৃতীয় অধ্যায় • আইবুড়োভাত' : 'Chapter III • Aiburobhat'}
              </span>
              <span className="text-xs text-[#5a403d] italic font-semibold">
                {isNative ? 'পাকা কথা ও ভোজ' : 'Engagement & Feast'}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e3beb9]/40 text-center">
              <p className="text-xs text-[#1d1c13] italic">
                {isNative
                  ? '‘গঙ্গার ঘাটে সূর্যাস্তের আলোয় আংটি বদল, আর ভোজের পাতে পদ্মার টাটকা ইলিশ!’'
                  : '"Sunset rings exchanged on the banks of the Ganges, celebrated with an authentic river fish banquet."'}
              </p>
            </div>

            {/* Sacred Fish Swimming Bar */}
            <button
              type="button"
              onClick={(e) => {
                setFishSwim(true);
                setTimeout(() => setFishSwim(false), 600);
                triggerPetalShower(e.clientX, e.clientY);
              }}
              className={`w-full bg-[#d5e3ff]/70 hover:bg-[#d5e3ff] p-3 rounded-xl shadow-sm flex items-center justify-between border border-[#485f84]/30 transition-transform ${
                fishSwim ? 'scale-102 translate-x-2' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-[#bbd3fd] flex items-center justify-center text-xl shadow-sm transition-transform ${fishSwim ? 'rotate-12 scale-110' : ''}`}>
                  🐟
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-sm text-[#001b3c]">
                    {isNative ? 'বিয়ের সাজানো রুই-ইলিশ' : 'Ceremonial Wedding Fish'}
                  </span>
                  <span className="text-[11px] text-[#30476a]">
                    {isNative ? 'সিঁদুর-হলুদে চর্চিত গঙ্গাজলের আশীর্বাদ' : 'Bathed in vermilion, turmeric and river blessings'}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#485f84] bg-white px-2.5 py-1 rounded-full shadow-sm">
                {isNative ? 'লাফাও 🌊' : 'Splash 🌊'}
              </span>
            </button>

            {/* Royal Peacock Panel */}
            <button
              type="button"
              onClick={(e) => {
                setPeacockFan(true);
                setTimeout(() => setPeacockFan(false), 700);
                triggerPetalShower(e.clientX, e.clientY);
              }}
              className={`w-full flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-[#e3beb9] transition-transform ${
                peacockFan ? 'scale-102' : ''
              }`}
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#eee8da]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ8wywhDCxdEeiOyZQJ_W3rLK6n2WRjHGUuZjUJPLQx2r5Zc4A-qzkkDiaVPL1afBgl5J_E6rzEhsyTus_3zkG-O5MdpNKuwlsYgyx9WqeeR4AVkAMOdT3rSuq65rxdPjRVsGXAie6t2wlYvu-nhmmrW-MNEAW6sVyyZfi55FYlxw7DKS9zzYDhund66Bt-fIHZ0f4Nf6OZRzYczYpFNZUpptk_rVken9Iq4viwXw2eDCejFeceF__gw"
                  alt="Peacock"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-left justify-center flex-1">
                <span className="font-bold text-sm text-[#a51611]">
                  {isNative ? 'বরকনের রাজকীয় ময়ূর' : 'Royal Nuptial Peacock'}
                </span>
                <span className="text-xs text-[#5a403d]">
                  {isNative ? 'পেখম তুলে আনন্দের বারতা আনছে' : 'Spreading auspicious feathers of prosperity'}
                </span>
                <span className="text-[11px] text-[#6f4c00] font-semibold mt-0.5">
                  {isNative ? '✨ পেখম মেলা দেখতে চাপুন' : '✨ Tap to view fanned feathers'}
                </span>
              </div>
            </button>
          </section>

          {/* Chapter 4: Sacred Rituals & Sovabazar Rajbari Venue */}
          <section className="w-full flex flex-col bg-[#f9f3e5] p-4 rounded-xl shadow-sm border border-[#e3beb9]/50 space-y-3">
            <div className="flex justify-between items-center">
              <span className="bg-[#a51611] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {isNative ? 'চতুর্থ অধ্যায় • শুভলগ্ন ও আসর' : 'Chapter IV • Sacred Muhurat'}
              </span>
              <span className="text-xs text-[#5a403d] italic font-semibold">
                {isNative ? 'পর্বসূচি' : 'Ceremony Schedule'}
              </span>
            </div>

            {/* Event 1 */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-[#e3beb9]/40">
              <div className="w-11 h-11 rounded-full bg-[#ffdeab] flex items-center justify-center font-bold text-[#6f4c00] text-sm flex-shrink-0 shadow-sm">
                ১০
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-sm text-[#1d1c13]">
                  {isNative ? 'আইবুড়োভাত উৎসব' : 'Aiburobhat Feast'}
                </span>
                <span className="text-xs text-[#5a403d]">
                  {isNative ? '১০ ডিসেম্বর ২০২৬ • দুপুর ১২:৩০ ঘটিকা' : '10 Dec 2026 • 12:30 PM Onwards'}
                </span>
                <span className="text-xs text-[#6f4c00] font-semibold">
                  {isNative ? 'কন্যার পৈতৃক ভবন, বালিগঞ্জ' : 'Bride Residence, Ballygunge'}
                </span>
              </div>
            </div>

            {/* Event 2 */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-[#e3beb9]/40">
              <div className="w-11 h-11 rounded-full bg-[#d5e3ff] flex items-center justify-center font-bold text-[#485f84] text-sm flex-shrink-0 shadow-sm">
                ১১
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-sm text-[#1d1c13]">
                  {isNative ? 'গায়ে হলুদ ও তত্ত্ব বিনিময়' : 'Gaye Holud & Tattwa'}
                </span>
                <span className="text-xs text-[#5a403d]">
                  {isNative ? '১১ ডিসেম্বর ২০২৬ • সকাল ০৯:০০ ঘটিকা' : '11 Dec 2026 • 09:00 AM'}
                </span>
                <span className="text-xs text-[#485f84] font-semibold">
                  {isNative ? 'সুগন্ধি চন্দন ও মঙ্গল শঙ্খধ্বনি সহ' : 'Fragrant Chandan & Conch Sounds'}
                </span>
              </div>
            </div>

            {/* Event 3: The Grand Nuptials */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#ffdad5] to-[#f9f3e5] p-3 rounded-xl shadow-md border border-[#a51611]/30">
              <div className="w-11 h-11 rounded-full bg-[#a51611] flex items-center justify-center font-bold text-white text-sm flex-shrink-0 shadow-sm">
                ১২
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-sm text-[#a51611]">
                  {isNative ? 'শুভ বিবাহ ও সাতপাক' : 'Shuvo Bibaho & Saat Paak'}
                </span>
                <span className="text-xs text-[#930306] font-semibold">
                  {isNative ? '১২ ডিসেম্বর ২০২৬ • গোধূলিলগ্ন সন্ধ্যা ০৬:৪৫' : '12 Dec 2026 • Godhuli Lagna 06:45 PM'}
                </span>
                <span className="text-xs text-[#a51611] font-bold">
                  {isNative ? 'শোভাবাজার ঐতিহ্যবাহী রাজবাড়ি, কলকাতা' : 'Sovabazar Rajbari Natmandir, Kolkata'}
                </span>
              </div>
            </div>

            {/* Event 4 */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-[#e3beb9]/40">
              <div className="w-11 h-11 rounded-full bg-[#feba38] flex items-center justify-center font-bold text-[#281900] text-sm flex-shrink-0 shadow-sm">
                ১৪
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-sm text-[#1d1c13]">
                  {isNative ? 'প্রীতিভোজ ও বৌভাত' : 'Bou Bhaat & Reception'}
                </span>
                <span className="text-xs text-[#5a403d]">
                  {isNative ? '১৪ ডিসেম্বর ২০২৬ • রাত্রি ০৭:৩০ ঘটিকা' : '14 Dec 2026 • 07:30 PM Onwards'}
                </span>
                <span className="text-xs text-[#8e6300] font-semibold">
                  {isNative ? 'বরযাত্রী বরণ ও রাজকীয় ভোজসভা' : 'Grand Nuptial Dinner Reception'}
                </span>
              </div>
            </div>

            {/* Sovabazar Rajbari Venue Card */}
            <div className="w-full bg-white rounded-xl p-3.5 shadow-sm border border-[#e3beb9] space-y-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#a51611]">
                  {isNative ? 'শোভাবাজার রাজবাড়ি প্রাঙ্গণ' : 'Sovabazar Rajbari Grounds'}
                </span>
                <span className="bg-[#f3eddf] text-xs font-semibold px-2.5 py-0.5 rounded-full text-[#6f4c00]">
                  {isNative ? 'দিকদর্শন' : 'Directions'}
                </span>
              </div>

              <div
                className="w-full h-36 bg-cover bg-center rounded-xl shadow-inner relative flex items-end p-2.5 border border-[#e3beb9]/60"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCI7vs0e-viJGgeAIh9xWx1fbmwhW9mi2sY-2cVLu1nS3JHLxpCJIAor0cr4oNMmWXZIBIxqt9-XridN0tR4tZPBTROZwH2GLOXgIeTn6b8FPn4tRe2ajgJpPHZZg9Mqd5htEGz_6BC-99Wl8WhaMfQDimo52jObIwaL4VYeCNOuQssPUEGly_4XACkohs7O6Jly4n1_M7kqEd3OqKrbcVkeeML69pAl9YnZS3MKJZh41JhynSyHNl2iw')`
                }}
              >
                <span className="bg-black/75 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm">
                  {isNative ? '৩৬, নবকৃষ্ণ স্ট্রিট, শোভাবাজার, কলকাতা' : '36, Nabakrishna Street, Sovabazar, Kolkata'}
                </span>
              </div>

              <a
                href="https://maps.google.com/?q=Sovabazar+Rajbari+Kolkata"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#a51611] hover:bg-[#c83227] text-white py-2.5 rounded-full text-xs font-bold shadow-md transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>{isNative ? 'রাজবাড়ির মানচিত্র ও দিকদর্শন' : 'View Venue Map & Directions'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

          {/* Chapter 5: Pigeon RSVP (বার্তাবাহক পায়রা ও নিমন্ত্রণপত্র) */}
          <section className="w-full flex flex-col bg-[#e8e2d4] p-4 rounded-xl shadow-sm border border-[#e3beb9]/60 space-y-3">
            <div className="flex justify-between items-center">
              <span className="bg-[#6f4c00] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {isNative ? 'পঞ্চম অধ্যায় • নিমন্ত্রণপত্র গ্রহণ' : 'Chapter V • The Pigeon Dispatch'}
              </span>
              <span className="text-xs text-[#5a403d] italic font-semibold">
                {isNative ? 'পায়রার বার্তা' : 'Carrier Pigeon'}
              </span>
            </div>

            {/* Carrier Pigeon Sealed Letter Banner */}
            <div
              onClick={() => setPigeonOpen(!pigeonOpen)}
              className="w-full bg-white p-4 rounded-xl shadow-sm border border-[#e3beb9] flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#ffdeab] flex items-center justify-center text-[#6f4c00] mb-2 shadow-sm">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-[#1d1c13]">
                {isNative ? 'বার্তাবাহক পায়রা চিঠি এনেছে' : 'The Carrier Pigeon Has Brought a Letter'}
              </h3>
              <p className="text-xs text-[#5a403d] mt-1">
                {isNative ? 'চিঠির সীলমোহর খুলে আপনার উপস্থিতি নিশ্চিত করুন' : 'Tap to open the sealed scroll and confirm your blessings'}
              </p>
              <div className="mt-3 px-4 py-1.5 bg-[#a51611] text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{pigeonOpen ? (isNative ? 'চিঠি বন্ধ করুন' : 'Close Letter') : (isNative ? 'চিঠি খুলুন (Open RSVP)' : 'Open RSVP')}</span>
              </div>
            </div>

            {/* Unfolded RSVP Card */}
            {pigeonOpen && (
              <div className="bg-white p-4 rounded-xl shadow-md border border-[#e3beb9] space-y-4">
                {/* Guest Count Selection */}
                <div>
                  <label className="text-xs font-bold text-[#1d1c13] block mb-1.5">
                    {isNative ? 'কতজন অতিথি আসছেন? (Guest Count)' : 'How many guests are attending?'}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {['১ জন', '২ জন', '৩ জন', '৪+ জন'].map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setGuestCount(c)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                          guestCount === c
                            ? 'bg-[#a51611] text-white border-[#a51611] shadow-sm'
                            : 'bg-[#f3eddf] text-[#1d1c13] border-[#e3beb9]'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feast Preference Selection */}
                <div>
                  <label className="text-xs font-bold text-[#1d1c13] block mb-1.5">
                    {isNative ? 'ভোজের রুচি নির্বাচন (Feast Choice)' : 'Dining Preference:'}
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setFoodChoice('nonveg')}
                      className={`py-2.5 px-3 rounded-xl border flex flex-col items-center transition-colors ${
                        foodChoice === 'nonveg'
                          ? 'bg-[#a51611] text-white border-[#a51611] shadow'
                          : 'bg-[#f3eddf] text-[#1d1c13] border-[#e3beb9]'
                      }`}
                    >
                      <span className="font-bold">{isNative ? 'ইলিশ ও খাসি ভোজ' : 'Ilish & Mutton'}</span>
                      <span className="text-[10px] opacity-90">{isNative ? 'বাঙালির খাঁটি আমিষ' : 'Authentic Non-Veg'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFoodChoice('veg')}
                      className={`py-2.5 px-3 rounded-xl border flex flex-col items-center transition-colors ${
                        foodChoice === 'veg'
                          ? 'bg-[#a51611] text-white border-[#a51611] shadow'
                          : 'bg-[#f3eddf] text-[#1d1c13] border-[#e3beb9]'
                      }`}
                    >
                      <span className="font-bold">{isNative ? 'সাত্বিক নিরামিষ' : 'Satvik Pure Veg'}</span>
                      <span className="text-[10px] opacity-90">{isNative ? 'ঘিয়ে ভাজা পোলাও-ছানা' : 'Pulao & Paneer'}</span>
                    </button>
                  </div>
                </div>

                {/* Guest Name */}
                <div>
                  <label className="text-xs font-bold text-[#1d1c13] block mb-1">
                    {isNative ? 'আপনার শুভ নাম (Your Name):' : 'Your Name:'}
                  </label>
                  <input
                    type="text"
                    value={guestNameInput}
                    onChange={e => setGuestNameInput(e.target.value)}
                    placeholder={isNative ? 'উদাহরন: শ্রী অমল মুখোপাধ্যায়' : 'e.g. Mr. Amal Mukherjee'}
                    className="w-full h-10 px-3 bg-[#f9f3e5] border border-[#e3beb9] rounded-xl text-xs text-[#1d1c13] focus:outline-none focus:border-[#a51611]"
                  />
                </div>

                {/* WhatsApp RSVP */}
                <button
                  type="button"
                  onClick={handleWhatsAppRsvp}
                  className="w-full bg-[#1E7E34] hover:bg-[#155d27] text-white py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isNative ? 'হোয়াটসঅ্যাপে নিমন্ত্রণ স্বীকার করুন (RSVP)' : 'Confirm RSVP on WhatsApp'}
                  </span>
                </button>
              </div>
            )}

            {/* Pronami Digital Envelope */}
            <div className="bg-white p-4 rounded-xl border border-[#e3beb9] flex flex-col items-center gap-2.5 text-center">
              <div className="flex items-center gap-1.5 text-[#6f4c00] font-bold text-sm">
                <span>🪙</span>
                <span>{isNative ? 'শুভ আশীর্বাদ ও প্রণামী' : 'Blessings & Pronami'}</span>
              </div>
              <p className="text-xs text-[#5a403d]">
                {isNative
                  ? 'আপনার সান্নিধ্যই শ্রেষ্ঠ আশীর্বাদ। দূর থেকে স্নেহ ও ভালোবাসা পাঠানোর জন্য ডিজিটাল শুভ প্রণামী:'
                  : 'Your presence is our treasured blessing. If you wish to send gifts from afar:'}
              </p>
              <div className="flex flex-wrap justify-center gap-2 w-full">
                {[501, 1001, 2101, 5001].map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      window.open(`upi://pay?pa=aditi.debashish@upi&pn=Aditi+and+Debashish&am=${amt}&cu=INR`, '_blank');
                    }}
                    className="bg-[#f3eddf] hover:bg-[#ffdeab] text-[#a51611] font-bold px-3 py-1 rounded-full text-xs border border-[#e3beb9]"
                  >
                    ₹ {amt}
                  </button>
                ))}
              </div>
              <div className="bg-[#f9f3e5] px-4 py-2 rounded-full border border-[#e3beb9] flex items-center gap-2 text-xs">
                <span className="font-semibold text-[#1d1c13]">UPI:</span>
                <span className="text-[#a51611] font-mono font-bold">aditi.debashish@upi</span>
                <button
                  type="button"
                  onClick={copyUpi}
                  className="ml-2 text-[#6f4c00] hover:text-[#a51611]"
                  title="Copy UPI"
                >
                  {copiedUpi ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Lower Scroll Dandi & Hanging Cord */}
        <div className="flex flex-col items-center w-full select-none pt-2">
          {/* Lower Scroll Dandi (Wooden Roller Bar with Brass Caps) */}
          <div className="relative w-full flex items-center justify-between bg-[#6f4c00] h-7 rounded-full shadow-lg px-1 border border-[#ffdeab]/40">
            <div className="w-5 h-7 bg-[#ffdeab] rounded-l-full shadow-inner flex items-center justify-center">
              <div className="w-1 h-5 bg-[#8e6300] rounded-full"></div>
            </div>
            <div className="flex-1 flex justify-around px-4">
              <span className="w-2 h-2 rounded-full bg-[#ffdeab]"></span>
              <span className="w-2 h-2 rounded-full bg-[#ffdeab]"></span>
              <span className="w-2 h-2 rounded-full bg-[#ffdeab]"></span>
              <span className="w-2 h-2 rounded-full bg-[#ffdeab]"></span>
              <span className="w-2 h-2 rounded-full bg-[#ffdeab]"></span>
            </div>
            <div className="w-5 h-7 bg-[#ffdeab] rounded-r-full shadow-inner flex items-center justify-center">
              <div className="w-1 h-5 bg-[#8e6300] rounded-full"></div>
            </div>
          </div>

          <div className="flex justify-between w-64 px-4 -mb-1">
            <div className="w-1 h-8 bg-[#6f4c00] shadow-sm"></div>
            <div className="w-1 h-8 bg-[#6f4c00] shadow-sm"></div>
          </div>
          <div className="w-10 h-4 bg-[#8e6300] rounded-b-full flex items-center justify-center shadow-md">
            <div className="w-2.5 h-2.5 bg-[#6f4c00] rounded-full"></div>
          </div>
        </div>

        {/* Traditional Footer Seal */}
        <footer className="text-center py-4 border-t border-[#e3beb9]/60 space-y-1">
          <div className="text-sm font-bold text-[#a51611]">॥ শুভমস্তু • ইতি ॥</div>
          <p className="text-xs text-[#5a403d]">
            {isNative ? 'কালীঘাট পটচিত্র রীতিতে নির্মিত ডিজিটাল নিমন্ত্রণপত্র' : 'Handcrafted Kalighat Patachitra Digital Wedding Scroll'}
          </p>
          <div className="text-[11px] text-[#8f706b] pt-1">
            UtsavPatra • Bengal Heritage Edition
          </div>
        </footer>
      </main>
    </div>
  );
};
