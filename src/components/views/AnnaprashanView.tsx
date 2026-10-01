import React, { useState, useEffect } from 'react';
import { CulturalTemplate, Language, GuestWish } from '../../types/wedding';
import { CountdownTimer } from '../CountdownTimer';
import { DigitalShagunSection } from '../DigitalShagunSection';
import {
  Sparkles,
  Heart,
  Calendar,
  Clock,
  MapPin,
  Send,
  Phone,
  Mail,
  MessageSquare,
  Navigation,
  ExternalLink,
  Share2,
  Copy,
  Check,
  UtensilsCrossed,
  Baby,
  Smile,
  BookOpen,
  Coins,
  Mountain,
  Cookie,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AnnaprashanViewProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
}

interface ThaliItem {
  id: string;
  nameBn: string;
  nameEn: string;
  symbol: string;
  taglineBn: string;
  taglineEn: string;
  prophecyBn: string;
  prophecyEn: string;
  color: string;
}

export const AnnaprashanView: React.FC<AnnaprashanViewProps> = ({
  template,
  lang,
  guestName,
}) => {
  const { groom: baby, bride: parents, events, quotes, venue, rsvpContacts } = template;
  const isBengali = lang === 'native';

  // Wishes state
  const storageKey = `wishes_${template.id}`;
  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return template.initialWishes;
      }
    }
    return template.initialWishes;
  });

  const [authorName, setAuthorName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Personalized link state
  const [customGuest, setCustomGuest] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMain, setCopiedMain] = useState(false);

  // Thali Pariksha Game state
  const [selectedThaliItem, setSelectedThaliItem] = useState<ThaliItem | null>(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(wishes));
  }, [wishes, storageKey]);

  const quickWishes = isBengali ? template.quickWishes.native : template.quickWishes.en;

  const thaliItems: ThaliItem[] = [
    {
      id: 'book_pen',
      nameBn: 'বই ও কলম (বিদ্যা ও জ্ঞান)',
      nameEn: 'Book & Pen (Knowledge & Wisdom)',
      symbol: '📚',
      taglineBn: 'মহাজ্ঞানী পণ্ডিত ও চিন্তাবিদ',
      taglineEn: 'Scholar, Philosopher & Visionary',
      prophecyBn: 'আরভ বই ও কলম বেছে নিয়েছে! আশীর্বাদ করি সে সারাজীবন বিদ্যার আলোয় আলোকিত হয়ে একজন মহান পণ্ডিত, শিক্ষক বা গবেষক হবে। তার লেখনী ও চিন্তাশক্তি সমাজকে সমৃদ্ধ করবে।',
      prophecyEn: 'Baby Aarav grasped the sacred book and quill! Prophesying a life illuminated by knowledge, scholarship, literature, and noble wisdom.',
      color: 'from-amber-400 to-yellow-500'
    },
    {
      id: 'gold_coin',
      nameBn: 'সোনার মোহর (সমৃদ্ধি ও বৈভব)',
      nameEn: 'Gold Coin (Prosperity & Wealth)',
      symbol: '🪙',
      taglineBn: 'সফল উদ্যোক্তা ও বৈভবের অধিকারী',
      taglineEn: 'Fortune, Commerce & Generosity',
      prophecyBn: 'আরভ সোনার মোহরে হাত রেখেছে! তার জীবনে সর্বদা সুখ, অর্থনৈতিক সমৃদ্ধি ও প্রাচুর্য বিরাজ করবে। সে হবে এক সফল উদ্যোক্তা এবং অকাতরে সমাজসেবায় দানশীল।',
      prophecyEn: 'Baby Aarav touched the golden coin! Foreshadowing endless fortune, keen entrepreneurial spirit, and a generous heart that shares prosperity.',
      color: 'from-yellow-400 to-amber-600'
    },
    {
      id: 'sacred_soil',
      nameBn: 'পবিত্র মাটি (ভূমি ও ঐতিহ্য)',
      nameEn: 'Sacred Soil (Heritage & Roots)',
      symbol: '🏺',
      taglineBn: 'মাটির মানুষ ও ঐতিহ্যবাহী সমাজনেতা',
      taglineEn: 'Grounded Leader, Land & Heritage',
      prophecyBn: 'আরভ পবিত্র মাটি স্পর্শ করেছে! সে হবে শিকড়ের প্রতি অনুগত, মাটির মানুষ। বিপুল ভূসম্পত্তির মালিক এবং পরিবার ও দেশের গৌরব রক্ষাকারী এক মহান হৃদয়ের মানুষ।',
      prophecyEn: 'Baby Aarav chose the holy soil! Signifying strong values, love for ancestral heritage, stewardship of land, and a grounded soul.',
      color: 'from-emerald-500 to-teal-700'
    },
    {
      id: 'holy_payesh',
      nameBn: 'পায়েসের বাটি (মিষ্টতা ও পরোপকার)',
      nameEn: 'Holy Payesh (Love & Eloquence)',
      symbol: '🥣',
      taglineBn: 'মিষ্টভাষী, স্নেহশীল ও জনপ্রিয় শিল্পী',
      taglineEn: 'Sweet-Tongued, Artist & Beloved',
      prophecyBn: 'আরভ পায়েসের বাটি স্পর্শ করেছে! সে হবে সদা মিষ্টভাষী, খাদ্যরসিক ও সবার ভালোবাসায় সিক্ত একজন শিল্পী। তার হাসিমুখ সকলকে আনন্দের সাগরে ভাসিয়ে রাখবে।',
      prophecyEn: 'Baby Aarav reached for the sweet payesh bowl! Predicting a sweet-spoken diplomat, a joyous lover of good food and arts, adored by everyone.',
      color: 'from-rose-400 to-amber-500'
    }
  ];

  const handleSelectThali = (item: ThaliItem) => {
    setSelectedThaliItem(item);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D97706', '#F59E0B', '#059669', '#FEF3C7', '#10B981']
      });
    } catch {}
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: GuestWish = {
      id: `ap-wish-${Date.now()}`,
      name: authorName.trim(),
      relation: relation.trim() || undefined,
      message: message.trim(),
      timestamp: isBengali ? 'এইমাত্র' : 'Just now',
      hearts: 1,
    };

    setTimeout(() => {
      setWishes(prev => [newWish, ...prev]);
      setAuthorName('');
      setRelation('');
      setMessage('');
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 60,
          spread: 75,
          origin: { y: 0.8 },
          colors: ['#D97706', '#F59E0B', '#059669', '#FEF3C7', '#10B981']
        });
      } catch {}
    }, 400);
  };

  const handleLikeWish = (id: string) => {
    if (likedMap[id]) return;
    setLikedMap(prev => ({ ...prev, [id]: true }));
    setWishes(prev =>
      prev.map(w => (w.id === id ? { ...w, hearts: w.hearts + 1 } : w))
    );
  };

  const handleGenerateCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGuest.trim()) return;
    const url = `${window.location.origin}${window.location.pathname}?template=${template.id}&to=${encodeURIComponent(customGuest.trim())}`;
    setGeneratedLink(url);
  };

  const handleCopyMainUrl = () => {
    const url = `${window.location.origin}${window.location.pathname}?template=${template.id}`;
    navigator.clipboard.writeText(url);
    setCopiedMain(true);
    setTimeout(() => setCopiedMain(false), 2000);
  };

  const getWhatsAppRsvpUrl = (phone: string) => {
    const text = isBengali
      ? `নমস্কার! আরভের শুভ অন্নপ্রাশন ও মুখে ভাত অনুষ্ঠানে সপরিবারে উপস্থিতির আন্তরিক সম্মতি জানাচ্ছি। শুভকামনা রইল!`
      : `Namaskar! Delighted to confirm our attendance for baby Aarav's Annaprashan & Rice Ceremony. Looking forward!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  // Traditional 5-Bhaja & Bhoj items
  const menuCourses = [
    {
      course: isBengali ? 'পঞ্চব্যঞ্জন ভাজা' : 'The 5 Traditional Fries',
      items: isBengali ? 'ঝিরিঝিরি আলু ভাজা, বেগুন ভাজা, পটল ভাজা, উচ্ছে ভাজা ও রুই মাছ ভাজা' : 'Alu Bhaja, Begun Bhaja, Potol Bhaja, Uchhe Bhaja & Golden Fish Fry'
    },
    {
      course: isBengali ? 'প্রধান পদ ও ব্যঞ্জন' : 'Royal Main Courses',
      items: isBengali ? 'গোবিন্দভোগ চালের বাসন্তী পোলাও, নারকেল দিয়ে ছোলার ডাল, চিংড়ি মাছের মালাইকারি ও গন্ধরাজ ইলিশ ভাপা' : 'Basanti Pulao, Chholar Dal with Coconut, Prawn Malaikari, Ilish Bhapa'
    },
    {
      course: isBengali ? 'মাংসের স্পেশাল' : 'Meat Delicacy',
      items: isBengali ? 'কচি পাঁঠার লাল ঝোল / কষা মাংস' : 'Traditional Slow-cooked Kolkata Mutton Kosha'
    },
    {
      course: isBengali ? 'মিষ্টিমুখ ও পায়েস' : 'Desserts & Holy Payesh',
      items: isBengali ? 'ছোট্ট আরভের শুভ নলেন গুড়ের পায়েস, মিষ্টি দই, রাজকীয় রসগোল্লা ও মুখশুদ্ধি পান' : 'Aarav’s First Nolen Gurer Payesh, Misti Doi, Baked Rosogolla & Meetha Paan'
    }
  ];

  return (
    <div className="relative max-w-4xl mx-auto px-3 sm:px-6 py-8 space-y-12 sm:space-y-14 font-sans text-[#451A03]">
      
      {/* 1. Main Annaprashan Scrapbook Hero Canvas */}
      <section className="relative bg-[#FFFDF5] rounded-3xl p-6 sm:p-12 border-4 border-[#F59E0B] shadow-2xl overflow-hidden text-center">
        
        {/* Sunny Marigold Top Washi Tape Clip Accent */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-amber-300/80 -rotate-1 rounded-sm shadow-sm border border-amber-400/60 z-20 flex items-center justify-center">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-950">
            ★ MUKHE BHAAT SCRAPBOOK ★
          </span>
        </div>

        {/* Delicate Floral / Marigold Border Inner Canvas */}
        <div className="border-2 border-dashed border-[#F59E0B]/70 rounded-2xl p-4 sm:p-8 bg-[#FEFDF9] relative">
          
          {/* Top Auspicious Invocation */}
          <div className="flex items-center justify-center gap-2 mb-2 text-[#D97706]">
            <span className="text-2xl">🌼</span>
            <span className="font-bengali text-sm sm:text-base tracking-widest font-black text-[#78350F]">
              {quotes.invocation}
            </span>
            <span className="text-2xl">🌼</span>
          </div>

          <div className="inline-block px-5 py-1.5 rounded-full bg-emerald-100 border-2 border-emerald-400 text-xs sm:text-sm uppercase tracking-widest text-[#065F46] font-extrabold shadow-sm">
            🌱 {quotes.subInvocation} 🌱
          </div>

          {/* Guest VIP Badge */}
          {guestName && (
            <div className="my-5 mx-auto max-w-md text-center bg-amber-50 border-2 border-amber-300 py-3 px-6 rounded-2xl shadow-md">
              <p className="font-bengali text-xs text-[#92400E] font-bold uppercase tracking-wider">
                {isBengali ? 'সাদর নিমন্ত্রণ' : 'Cordially Invited'}
              </p>
              <p className="font-bengali text-2xl sm:text-3xl text-[#78350F] font-black mt-0.5">
                {guestName}
              </p>
              <p className="font-bengali text-xs sm:text-sm text-[#451A03] font-medium mt-0.5">
                {isBengali ? 'সপরিবারে আপনার উপস্থিতি ও স্নেহাশিস একান্ত কাম্য' : 'Awaiting your loving presence and blessings with family'}
              </p>
            </div>
          )}

          {/* Baby's First Rice Title */}
          <div className="my-5 space-y-1">
            <h1 className="font-bengali text-4xl sm:text-6xl text-[#78350F] font-black tracking-wide drop-shadow-sm">
              {isBengali ? quotes.nativeWeddingTitle : quotes.weddingTitle}
            </h1>
            <p className="font-sans text-xs sm:text-sm tracking-[0.2em] text-[#92400E] uppercase font-extrabold mt-1">
              {isBengali ? 'বাঙালি মুখে ভাত ও অন্নপ্রাশন মহোৎসব' : 'Bengali First Rice & Mukhe Bhaat Ceremony'}
            </p>
          </div>

          {/* Sweet Couplet Banner - Large, High Contrast & Effortless to Read */}
          <div className="my-6 max-w-xl mx-auto py-5 px-6 sm:px-8 bg-amber-50/95 rounded-2xl border-2 border-amber-300 shadow-md relative text-center">
            <div className="absolute -top-3 left-6 text-xl">📌</div>
            <p className="font-bengali text-base sm:text-lg text-[#3B150A] whitespace-pre-line leading-relaxed font-bold">
              {isBengali ? quotes.verse : (quotes.verseTranslation || quotes.verse)}
            </p>
            {isBengali && quotes.verseTranslation && (
              <p className="text-xs text-[#78350F] mt-3 pt-2 border-t border-amber-200/80 italic font-sans leading-relaxed">
                "{quotes.verseTranslation}"
              </p>
            )}
            <span className="text-xs font-bengali font-bold text-[#92400E] block mt-2">
              {quotes.verseAuthor}
            </span>
          </div>

          {/* Baby Aarav Polaroid Frame */}
          <div className="my-8 max-w-sm mx-auto p-4 pb-6 rounded-2xl bg-white border-2 border-stone-200 shadow-2xl text-center transform -rotate-1 hover:rotate-0 transition-transform duration-300 relative">
            {/* Top Washi Tape Clip */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-emerald-200 rotate-2 rounded shadow-sm border border-emerald-400 flex items-center justify-center">
              <span className="text-[10px] uppercase font-black tracking-wider text-emerald-900">
                LITTLE PRINCE
              </span>
            </div>

            <div className="w-52 h-52 sm:w-60 sm:h-60 mx-auto rounded-xl overflow-hidden border-2 border-stone-300 shadow-inner mb-3 group relative">
              <img
                src={baby.image}
                alt={baby.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 right-2 bg-amber-900/90 text-amber-100 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-md">
                🍼 6 Months Old
              </div>
            </div>

            <span className="px-4 py-1 rounded-full bg-amber-100 text-[#78350F] font-bengali text-xs font-black inline-block border border-amber-300">
              👶 {isBengali ? baby.nativeRole : baby.role}
            </span>

            <h2 className="font-bengali text-2xl sm:text-3xl font-black text-[#78350F] mt-1.5">
              {isBengali ? baby.nativeName : baby.name}
            </h2>

            <div className="mt-3 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs sm:text-sm font-bengali text-[#3B150A] space-y-1">
              <p className="font-bold text-[#78350F]">{isBengali ? baby.nativeParents : baby.parents}</p>
              <p className="text-stone-700">{isBengali ? baby.nativeGrandparents : baby.grandparents}</p>
            </div>

            <p className="font-bengali text-xs sm:text-sm italic text-[#451A03] font-medium mt-2.5 px-2">
              "{isBengali ? baby.nativeAbout : baby.about}"
            </p>
          </div>

          {/* Date & Muhurat Highlight Pill */}
          <div className="my-6 inline-flex flex-wrap items-center justify-center gap-3">
            <div className="px-5 py-2.5 rounded-full bg-[#92400E] text-[#FFFBEB] font-bengali text-xs sm:text-sm font-black shadow-md flex items-center gap-2">
              <span>📅</span>
              <span>{isBengali ? template.targetDateNative : 'Sunday, 15th November 2026 | Lagna: 12:30 PM'}</span>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-white border-2 border-emerald-500 text-[#065F46] font-bengali text-xs sm:text-sm font-black shadow-sm flex items-center gap-2">
              <span>📍</span>
              <span>{isBengali ? venue.nativeName : venue.name}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive "Thali Pariksha" Destiny Prophecy Game */}
      <section className="bg-gradient-to-b from-[#FFFDF5] to-[#FEF3C7] rounded-3xl p-6 sm:p-10 border-2 border-[#F59E0B] shadow-xl text-center relative overflow-hidden">
        
        {/* Playful Floating Badges */}
        <div className="absolute top-4 left-4 text-2xl animate-bounce">🥣</div>
        <div className="absolute top-4 right-4 text-2xl animate-bounce">🪙</div>

        <div className="mb-6 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-bengali text-[#B45309] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{isBengali ? 'ঐতিহ্যবাহী আচার খেলা' : 'Interactive Destiny Ritual'}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold font-bengali text-[#92400E] mt-2">
            {isBengali ? '🔮 থালি পরীক্ষা — আরভের ভাগ্য নির্বাচন খেলা' : '🔮 Thali Pariksha — Aarav’s Destiny Game'}
          </h2>
          <p className="text-xs sm:text-sm text-[#78350F] font-bengali mt-1 leading-relaxed">
            {isBengali
              ? 'অন্নপ্রাশনের পবিত্র কাঁসার থালিতে রাখা ৪টি মাঙ্গলিক উপাদানের যেকোনো একটি স্পর্শ করুন এবং দেখুন আরভের ভবিষ্যতের আশীর্বাদবার্তা!'
              : 'Tap any of the 4 sacred items on baby Aarav’s traditional brass thali to reveal his destined prophecy and blessings!'}
          </p>
        </div>

        {/* 4 Thali Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-6">
          {thaliItems.map((item) => {
            const isSelected = selectedThaliItem?.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectThali(item)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer group relative ${
                  isSelected
                    ? 'bg-white border-[#D97706] shadow-xl ring-4 ring-amber-300 -translate-y-1'
                    : 'bg-white/80 border-amber-200 hover:border-amber-400 hover:bg-white hover:shadow-md'
                }`}
              >
                {isSelected && (
                  <span className="absolute -top-2.5 bg-[#059669] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    ✓ {isBengali ? 'নির্বাচিত' : 'Chosen'}
                  </span>
                )}
                <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform mb-2">
                  {item.symbol}
                </span>
                <span className="font-bengali font-bold text-xs sm:text-sm text-[#92400E] line-clamp-1">
                  {isBengali ? item.nameBn : item.nameEn}
                </span>
                <span className="text-[10px] font-bengali text-emerald-700 font-semibold mt-0.5">
                  {isBengali ? item.taglineBn : item.taglineEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Revealed Prophecy Modal/Card */}
        {selectedThaliItem ? (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-5 sm:p-7 border-2 border-emerald-400 shadow-xl text-left animate-fadeIn space-y-3">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedThaliItem.symbol}</span>
                <div>
                  <h4 className="font-bengali text-lg sm:text-xl font-bold text-[#92400E]">
                    {isBengali ? `👶 আরভ বেছে নিল: ${selectedThaliItem.nameBn}` : `👶 Baby Aarav Grasped: ${selectedThaliItem.nameEn}`}
                  </h4>
                  <p className="text-xs font-bengali text-emerald-700 font-bold">
                    {isBengali ? `লক্ষণ: ${selectedThaliItem.taglineBn}` : `Destiny Sign: ${selectedThaliItem.taglineEn}`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedThaliItem(null)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-full text-xs flex items-center gap-1 font-bengali"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="font-bengali text-xs sm:text-sm text-[#451A03] leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-100">
              {isBengali ? selectedThaliItem.prophecyBn : selectedThaliItem.prophecyEn}
            </p>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-amber-800 font-semibold font-bengali">
                ✨ {isBengali ? 'আপনার সস্নেহ আশীর্বাদ আরভের পাথেয় হোক!' : 'May your loving blessings light up Aarav’s journey!'}
              </span>
              <button
                onClick={() => {
                  try {
                    confetti({ particleCount: 30, spread: 50, colors: ['#F59E0B', '#059669', '#FEF3C7'] });
                  } catch {}
                }}
                className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-bold hover:shadow transition-all"
              >
                👏 {isBengali ? 'জয়ধ্বনি' : 'Cheer!'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-white/70 rounded-xl border border-dashed border-amber-300 max-w-md mx-auto text-xs text-amber-800 italic">
            👆 {isBengali ? 'উপরের যেকোনো থালির উপাদানে ক্লিক করে খেলা শুরু করুন' : 'Click any thali item above to play & view the blessing prophecy!'}
          </div>
        )}
      </section>

      {/* 3. Live Countdown to First Spoon of Rice */}
      <CountdownTimer template={template} lang={lang} />

      {/* 4. Baby Aarav's 6-Month Polaroid Scrapbook Journey */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-200 shadow-lg text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-bengali text-[#B45309] font-bold uppercase tracking-widest">
            <Baby className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{isBengali ? 'ছোট্ট আরভের প্রথম ৬ মাসের মিষ্টি অ্যালবাম' : 'Aarav’s 6 Months Scrapbook'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[#92400E] mt-2">
            {isBengali ? 'হাসি, কান্না আর আদরের দিনগুলি' : 'Smiles, Giggles & Milestones'}
          </h2>
          <p className="text-xs text-stone-500 font-bengali mt-1">
            {isBengali ? 'একটি করে মাস পার, ছোট্ট পায়ে ভালোবাসার বিস্তার' : 'Step by step, month by month, filling our world with pure wonder.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-[#FFFDF5] border border-amber-200 shadow-sm text-center relative transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-200/80 rounded -rotate-2" />
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-[#B45309] font-bold font-bengali mb-3 text-sm">
              ১ মাস
            </div>
            <h3 className="font-bengali font-bold text-base text-[#92400E]">
              {isBengali ? 'ধরায় প্রথম আগমন' : 'Welcome to the World'}
            </h3>
            <p className="text-xs font-bengali text-[#78350F] mt-1.5 leading-relaxed">
              {isBengali ? 'পরিবারে প্রথম চাঁদের আলোর মতো আগমন। ছোট্ট নরম হাতের স্পর্শে পূর্ণতা পেল আমাদের জীবন।' : 'Arrived into our arms bringing infinite warmth, love and gentle light.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-[#FFFDF5] border border-amber-200 shadow-sm text-center relative transform rotate-1 hover:rotate-0 transition-transform">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-emerald-200/80 rounded rotate-1" />
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-[#059669] font-bold font-bengali mb-3 text-sm">
              ৩ মাস
            </div>
            <h3 className="font-bengali font-bold text-base text-[#059669]">
              {isBengali ? 'প্রথম মিষ্টি হাসি' : 'First Sweet Giggles'}
            </h3>
            <p className="text-xs font-bengali text-[#78350F] mt-1.5 leading-relaxed">
              {isBengali ? 'রঙিন আলোর দিকে তাকিয়ে খুশির হাসি আর খেলনার ঝুমঝুমির শব্দে মেতে ওঠা।' : 'Discovered sweet baby giggles and loved watching shiny ceiling lights.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-[#FFFDF5] border border-amber-200 shadow-sm text-center relative transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-yellow-200/80 rounded -rotate-1" />
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-[#B45309] font-bold font-bengali mb-3 text-sm">
              ৬ মাস
            </div>
            <h3 className="font-bengali font-bold text-base text-[#92400E]">
              {isBengali ? 'মামার কোলে মুখে ভাত' : 'First Taste of Solid Food'}
            </h3>
            <p className="text-xs font-bengali text-[#78350F] mt-1.5 leading-relaxed">
              {isBengali ? 'আজ মামাবাড়ির রূপোর বাটি থেকে প্রথম সুস্বাদু গোবিন্দভোগ চালের পায়েস খাওয়ার পালা!' : 'Ready for the sacred first spoon of delicious Govindabhog rice payesh!'}
            </p>
          </div>

        </div>
      </section>

      {/* 5. Annaprashan Ceremonies Schedule */}
      <section className="space-y-6" id="events">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-bengali text-[#059669] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isBengali ? 'মাঙ্গলিক আচার ও অনুষ্ঠান নির্ঘণ্ট' : 'Auspicious Rituals & Schedule'}</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          </div>

          <h2 className="text-3xl font-bold font-bengali text-[#92400E]">
            {isBengali ? 'অন্নপ্রাশন উৎসবের শুভ পর্বসমূহ' : 'Annaprashan Ceremony Timeline'}
          </h2>
          <p className="text-xs text-stone-500 font-bengali">
            {isBengali ? 'প্রতিটি ক্ষণ স্নেহ আর আশীর্বাদে মোড়ানো' : 'Each ceremony celebrated with pure devotion and family warmth'}
          </p>
        </div>

        <div className="space-y-4">
          {events.map((evt, idx) => {
            const isHighlight = evt.key === 'mukhe_bhaat';

            return (
              <div
                key={evt.id}
                className={`rounded-3xl p-5 sm:p-7 border-2 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between ${
                  isHighlight
                    ? 'bg-gradient-to-r from-amber-50/90 via-yellow-50/60 to-emerald-50/80 border-[#D97706]'
                    : 'bg-white border-amber-200'
                }`}
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full font-bengali font-bold text-xs flex items-center justify-center shrink-0 ${
                        isHighlight
                          ? 'bg-[#B45309] text-amber-100 shadow'
                          : 'bg-amber-100 text-[#B45309] border border-amber-300'
                      }`}
                    >
                      ০{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-bengali text-[#92400E]">
                        {isBengali ? evt.nativeTitle : evt.title}
                      </h3>
                      <p className="text-xs font-bengali text-[#B45309] font-semibold">
                        {isBengali ? evt.nativeTagline : evt.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#451A03] font-bengali leading-relaxed">
                    {isBengali ? evt.nativeDescription : evt.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {(isBengali ? evt.nativeHighlights : evt.highlights).map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-[11px] px-3 py-0.5 rounded-full bg-emerald-50 text-[#059669] font-bengali border border-emerald-200"
                      >
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-64 p-4 rounded-2xl bg-[#FFFDF5] border border-amber-200 space-y-2 text-xs font-bengali shrink-0">
                  <p className="font-bold text-[#B45309]">📅 {isBengali ? evt.nativeDate : evt.date}</p>
                  <p className="text-[#451A03]">⏰ {isBengali ? evt.nativeTime : evt.time}</p>
                  <p className="text-[#451A03]">📍 {isBengali ? evt.nativeVenueName : evt.venueName}</p>
                  <p className="text-[#059669] pt-1 border-t border-amber-200 font-semibold">
                    👗 {isBengali ? evt.nativeDressCode : evt.dressCode}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Traditional 5-Bhaja & Bhoj Menu Card */}
      <section className="bg-gradient-to-b from-[#FFFDF5] to-[#FEF3C7]/60 rounded-3xl p-6 sm:p-10 border-2 border-amber-300 shadow-xl text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-bengali text-[#059669] font-bold uppercase tracking-widest">
            <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isBengali ? 'ঐতিহ্যবাহী পঞ্চব্যঞ্জন ভোজ' : 'Traditional Bengali Feast Menu'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[#92400E] mt-2">
            {isBengali ? 'মুখরোচক রাজকীয় অন্নপ্রাশন মেনু' : 'The Celebration Bhoj Menu'}
          </h2>
          <p className="text-xs text-[#78350F] font-bengali max-w-md mx-auto mt-1">
            {isBengali
              ? 'বাঙালি ঘরানার আন্তরিক আপ্যায়ন ও রকমারি স্বাদের সমাহার'
              : 'Handcrafted traditional culinary delights to celebrate baby Aarav’s milestone.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
          {menuCourses.map((course, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-2xl p-5 border border-amber-200 shadow-sm space-y-1.5 hover:border-amber-400 transition-colors"
            >
              <div className="flex items-center gap-2 text-[#B45309] font-bengali font-bold text-sm sm:text-base">
                <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-xs text-[#92400E]">
                  {idx + 1}
                </span>
                <span>{course.course}</span>
              </div>
              <p className="text-xs sm:text-sm font-bengali text-[#451A03] pl-8 leading-relaxed">
                {course.items}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Venue Location */}
      <section className="rounded-3xl p-6 sm:p-10 border-2 border-amber-200 bg-white shadow-xl text-center" id="venue">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-bengali text-[#B45309] font-bold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{isBengali ? 'অনুষ্ঠানস্থল ও অবস্থান' : 'Venue & Directions'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[#92400E] mt-2">
            {isBengali ? 'কীভাবে পৌঁছাবেন' : 'Our Celebration Venue'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-5 space-y-4 font-bengali">
            <div>
              <span className="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider inline-block bg-amber-100 text-[#B45309]">
                {isBengali ? 'প্রধান উৎসব প্রাঙ্গণ' : 'Celebration Grounds'}
              </span>
              <h3 className="text-2xl font-bold text-[#92400E] mt-2">
                {isBengali ? venue.nativeName : venue.name}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#451A03] leading-relaxed">
              {isBengali ? venue.nativeAddress : venue.address}
            </p>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-1">
              <p className="font-bold text-[#B45309]">
                📌 {isBengali ? 'বিশেষ নির্দেশনা:' : 'Landmark & Parking:'}
              </p>
              <p className="text-stone-700">
                {isBengali ? venue.nativeLandmark : venue.landmark} • {isBengali ? venue.nativeParking : venue.parking}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-[#B45309] text-white font-bold text-xs sm:text-sm shadow flex items-center gap-2 hover:opacity-95 transition-opacity"
              >
                <Navigation className="w-4 h-4" />
                <span>{isBengali ? 'গুগল ম্যাপে দেখুন' : 'Open in Google Maps'}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 h-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-amber-200 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.184347711467!2d88.39958747602055!3d22.572186833008985!2m3!1f0!2f0!3f0!3m2!1i1024!2f786!4f13.1!3m3!1m2!1s0x3a0276602330aaab%3A0xc3b860b096f9bf36!2sRaajkutir%20-%20IHCL%20SeleQtions!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Raajkutir Swabhumi Venue Map"
            />
          </div>
        </div>
      </section>

      {/* 8. Wishes & Blessings Guestbook */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-200 shadow-xl space-y-8 font-bengali">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs text-[#B45309] font-bold uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>{isBengali ? 'ছোট্ট আরভের আশীর্বাদ বই' : 'Aarav’s Blessing Book'}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#92400E]">
            {isBengali ? 'স্নেহ ও শুভকামনা বার্তা' : 'Send Your Loving Wishes'}
          </h2>
          <p className="text-xs text-stone-500">
            {isBengali ? 'আপনার একটি আশীর্বাদ আমাদের সন্তানের অমূল্য রত্ন' : 'Your heartwarming wishes will be preserved in Aarav’s baby keepsake album.'}
          </p>
        </div>

        {/* Quick Wish Buttons */}
        <div className="space-y-2">
          <p className="text-xs text-stone-500 font-semibold text-center">
            {isBengali ? 'দ্রুত শুভেচ্ছা নির্বাচন করুন:' : 'Pick a quick blessing:'}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickWishes.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMessage(q)}
                className="text-xs px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[#B45309] transition-all hover:scale-105"
              >
                + {q}
              </button>
            ))}
          </div>
        </div>

        {/* Wish Form */}
        <form onSubmit={handleWishSubmit} className="max-w-xl mx-auto space-y-4 bg-amber-50/50 p-5 rounded-2xl border border-amber-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#92400E] mb-1">
                {isBengali ? 'আপনার নাম *' : 'Your Name *'}
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                placeholder={isBengali ? 'উদা: মামা, মাসি, সুব্রত রায়' : 'e.g., Uncle Subrata'}
                className="w-full px-3 py-2 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-[#D97706] text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#92400E] mb-1">
                {isBengali ? 'সম্পর্ক (ঐচ্ছিক)' : 'Relation (Optional)'}
              </label>
              <input
                type="text"
                value={relation}
                onChange={e => setRelation(e.target.value)}
                placeholder={isBengali ? 'উদা: কাকা / বন্ধু' : 'e.g., Family Friend'}
                className="w-full px-3 py-2 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-[#D97706] text-xs bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#92400E] mb-1">
              {isBengali ? 'স্নেহাশিস ও শুভবার্তা *' : 'Blessing Message *'}
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={isBengali ? 'ছোট্ট আরভের জন্য মন খুলে আশীর্বাদ লিখুন...' : 'Write your loving blessings for baby Aarav...'}
              className="w-full px-3 py-2 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-[#D97706] text-xs bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-[#B45309] text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? (isBengali ? 'পাঠানো হচ্ছে...' : 'Sending...') : (isBengali ? 'আশীর্বাদ বার্তা পাঠান' : 'Post Your Blessing')}</span>
          </button>
        </form>

        {/* Existing Wishes Feed */}
        <div className="max-w-2xl mx-auto space-y-3 pt-4">
          <h3 className="font-bold text-sm text-[#92400E] text-center border-b border-amber-200 pb-2">
            💌 {isBengali ? 'অতিথিদের আশীর্বাদের ডালি' : 'Loving Messages from Relatives & Friends'} ({wishes.length})
          </h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {wishes.map(w => (
              <div key={w.id} className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#92400E]">
                    {w.name} {w.relation && <span className="opacity-70 font-normal">({w.relation})</span>}
                  </span>
                  <span className="text-[10px] text-stone-400">{w.timestamp}</span>
                </div>
                <p className="text-[#451A03] leading-relaxed">{w.message}</p>
                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => handleLikeWish(w.id)}
                    className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border transition-all ${
                      likedMap[w.id]
                        ? 'bg-rose-100 border-rose-300 text-rose-700'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-rose-300'
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${likedMap[w.id] ? 'fill-rose-600 text-rose-600' : ''}`} />
                    <span>{w.hearts}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8B. Auspicious Shagun & E-Lifafa (আশীর্বাদী লেফাফা) */}
      <DigitalShagunSection template={template} lang={lang} />

      {/* 9. RSVP & Direct Family Contact */}
      <section className="bg-gradient-to-r from-amber-50 via-[#FFFDF5] to-emerald-50 rounded-3xl p-6 sm:p-10 border-2 border-amber-300 shadow-xl text-center space-y-6 font-bengali">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs text-[#059669] font-bold uppercase tracking-widest">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isBengali ? 'উপস্থিতির সম্মতি ও যোগাযোগ' : 'RSVP & Direct Contact'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#92400E]">
            {isBengali ? 'আমাদের সাথে যোগাযোগ করুন' : 'Confirm Your Attendance'}
          </h2>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            {isBengali
              ? 'অনুগ্রহ করে অনুষ্ঠানে আপনার উপস্থিতি নিশ্চিত করে আমাদের আপ্যায়ন ব্যবস্থাপনায় সহায়তা করুন।'
              : 'Please confirm your attendance via WhatsApp or direct call to help us prepare your banquet seat.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          {rsvpContacts.map((c, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm text-left space-y-2">
              <div>
                <p className="font-bold text-sm text-[#92400E]">{isBengali ? c.nativeName : c.name}</p>
                <p className="text-[11px] text-stone-500">{isBengali ? c.nativeRelation : c.relation}</p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`tel:${c.phone}`}
                  className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-bold text-[#B45309] flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{c.phone}</span>
                </a>

                {c.whatsappNumber && (
                  <a
                    href={getWhatsAppRsvpUrl(c.whatsappNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{isBengali ? 'হোয়াটসঅ্যাপে সম্মতি জানান' : 'Confirm on WhatsApp'}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Generate Custom VIP Invitation Link */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-dashed border-amber-300 shadow-sm text-center space-y-4 font-bengali">
        <h3 className="font-bold text-base text-[#92400E] flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4 text-[#D97706]" />
          <span>{isBengali ? 'ব্যক্তিগত ডিজিটাল নিমন্ত্রণপত্র লিংক তৈরি করুন' : 'Generate Personalized VIP Guest Card'}</span>
        </h3>
        <p className="text-xs text-stone-500 max-w-md mx-auto">
          {isBengali
            ? 'আপনার কোনো আত্মীয়ের নাম লিখে একটি বিশেষ নিমন্ত্রণ লিংক তৈরি করে সরাসরি তাদের হোয়াটসঅ্যাপে পাঠান।'
            : 'Type a guest’s name to create a personalized invite link showing their name on the top scroll.'}
        </p>

        <form onSubmit={handleGenerateCustomLink} className="max-w-md mx-auto flex gap-2">
          <input
            type="text"
            value={customGuest}
            onChange={e => setCustomGuest(e.target.value)}
            placeholder={isBengali ? 'উদা: অনিন্দিতা মাসি ও পরিবার' : 'e.g., Uncle Sandeep & Family'}
            className="flex-1 px-3 py-2 rounded-xl border border-amber-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#D97706]"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-[#B45309] text-white text-xs font-bold shadow hover:opacity-95"
          >
            {isBengali ? 'লিংক বানান' : 'Create'}
          </button>
        </form>

        {generatedLink && (
          <div className="max-w-lg mx-auto p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs flex items-center justify-between gap-2">
            <span className="truncate text-stone-700">{generatedLink}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedLink);
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
              }}
              className="px-3 py-1 rounded bg-[#B45309] text-white font-bold shrink-0 text-[11px]"
            >
              {copiedLink ? 'কপি হয়েছে!' : 'কপি করুন'}
            </button>
          </div>
        )}
      </section>

      {/* 11. Family Sign-off Footer */}
      <footer className="pt-6 pb-12 text-center space-y-3 font-bengali">
        <p className="text-sm font-bold text-[#92400E]">
          {isBengali ? quotes.nativeFamilySignoff : quotes.familySignoff}
        </p>
        <p className="text-xs text-stone-500">
          Roy & Mukherjee Family | Salt Lake, Kolkata | Powered by UtsavPatra
        </p>
      </footer>

    </div>
  );
};
