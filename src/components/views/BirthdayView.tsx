import React, { useState, useEffect } from 'react';
import { CulturalTemplate, Language, GuestWish } from '../../types/wedding';
import { CountdownTimer } from '../CountdownTimer';
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
  PartyPopper,
  Cake,
  Wand2,
  Music,
  Smile,
  Users,
  Flame,
  RotateCcw,
  Crown,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayViewProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
}

export const BirthdayView: React.FC<BirthdayViewProps> = ({
  template,
  lang,
  guestName,
}) => {
  const { groom: princess, bride: parents, events, quotes, venue, rsvpContacts } = template;
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

  // Interactive Candle Blow State
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [blowCount, setBlowCount] = useState(0);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(wishes));
  }, [wishes, storageKey]);

  const quickWishes = isBengali ? template.quickWishes.native : template.quickWishes.en;

  const handleBlowCandle = () => {
    if (!isCandleBlown) {
      setIsCandleBlown(true);
      setBlowCount(prev => prev + 1);
      try {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.65 },
          colors: ['#7C3AED', '#EC4899', '#38BDF8', '#FACC15', '#C084FC']
        });
      } catch {}
    } else {
      setIsCandleBlown(false);
    }
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: GuestWish = {
      id: `bd-wish-${Date.now()}`,
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
          spread: 80,
          origin: { y: 0.8 },
          colors: ['#7C3AED', '#EC4899', '#38BDF8', '#FACC15']
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
      ? `নমস্কার! রাজকন্যা অনন্যার প্রথম শুভ জন্মদিনের অনুষ্ঠানে সপরিবারে উপস্থিতির আন্তরিক সম্মতি জানাচ্ছি। শুভকামনা রইল!`
      : `Hello! Delighted to confirm our attendance for Princess Ananya's 1st Birthday Celebration. Looking forward!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const milestones = [
    { month: isBengali ? '১ মাস' : '1 Month', note: isBengali ? 'ছোট্ট রূপকথার রাজকন্যার আগমন' : 'Welcome little angel' },
    { month: isBengali ? '৩ মাস' : '3 Months', note: isBengali ? 'প্রথম জাদুকরী হাসি ও খুশির কলকাকলি' : 'First sweet giggles' },
    { month: isBengali ? '৬ মাস' : '6 Months', note: isBengali ? 'হামাগুড়ি ও খেলনা নিয়ে দুষ্টুমি' : 'Sitting & exploring toys' },
    { month: isBengali ? '৯ মাস' : '9 Months', note: isBengali ? 'ছোট্ট পায়ে দাঁড়ানোর মধুর চেষ্টা' : 'Standing tall with support' },
    { month: isBengali ? '১২ মাস' : '12 Months', note: isBengali ? 'এক বছর পূর্ণ! শুভ জন্মদিন রাজকন্যা!' : 'Turning ONE today!' }
  ];

  const carnivalZones = [
    {
      title: isBengali ? 'জাদুকরী ম্যাজিক ও ইলুশন' : 'Live Magic & Illusion Show',
      icon: '🪄',
      desc: isBengali ? 'শিশুদের মন ভোলানো রকমারি ম্যাজিক ট্রিকস ও সারপ্রাইজ উপহার' : 'Interactive comedy magic and mystery tricks for kids'
    },
    {
      title: isBengali ? 'কার্টুন ফেস পেইন্টিং' : 'Artisanal Face Painting',
      icon: '🎨',
      desc: isBengali ? 'প্রিন্সেস ও সুপারহিরোদের স্কিন-সেফ রঙিন ফেস আর্ট' : 'Skin-safe face art, sparkles & cartoon characters'
    },
    {
      title: isBengali ? 'চকোলেট ফাউন্টেন ও ট্রিট' : 'Belgian Chocolate Fountain',
      icon: '🍫',
      desc: isBengali ? 'গরম চকোলেট, মার্শমেলো ও কাপকেক কাউন্টার' : 'Flowing warm chocolate dip with marshmallows & cakes'
    },
    {
      title: isBengali ? 'বেলুন আর্ট ও বাবল জোন' : 'Rainbow Bubbles & Balloons',
      icon: '🫧',
      desc: isBengali ? 'রঙিন বেলুনের পুতুল ও বিশাল রামধনু বুদবুদের খেলা' : 'Custom animal balloons and giant rainbow bubble arena'
    }
  ];

  return (
    <div className="relative max-w-4xl mx-auto px-3 sm:px-6 py-8 space-y-12 sm:space-y-14 font-sans text-[#2E1065]">

      {/* 1. Fairytale Wonderland Hero Gala Banner */}
      <section className="relative bg-gradient-to-b from-[#FAF5FF] via-[#FDF2F8] to-[#F0F9FF] rounded-3xl p-6 sm:p-12 border-4 border-[#C084FC] shadow-2xl overflow-hidden text-center">
        
        {/* Floating Playful Pastel Ornaments */}
        <div className="absolute top-4 left-4 text-3xl animate-bounce pointer-events-none opacity-80">🎈</div>
        <div className="absolute top-4 right-4 text-3xl animate-bounce pointer-events-none opacity-80">✨</div>
        <div className="absolute bottom-6 left-6 text-2xl pointer-events-none opacity-70">🎠</div>
        <div className="absolute bottom-6 right-6 text-2xl pointer-events-none opacity-70">🪄</div>

        {/* Starlight Twinkle Canvas Effect */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#7C3AED 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10">
          
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border-2 border-[#7C3AED] text-xs sm:text-sm font-extrabold text-[#5B21B6] uppercase tracking-widest mb-3 shadow-md">
            <Crown className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>{quotes.invocation}</span>
            <Crown className="w-4 h-4 text-amber-500 fill-amber-400" />
          </div>

          {/* Guest VIP Badge */}
          {guestName && (
            <div className="my-4 mx-auto max-w-md text-center bg-white border-2 border-[#BE185D] py-3 px-6 rounded-2xl shadow-md">
              <span className="text-xs uppercase font-extrabold text-[#BE185D] tracking-wider block">
                {isBengali ? 'সাদর নিমন্ত্রণ' : 'You are Cordially Invited'}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#4C1D95]">
                {guestName}
              </span>
              <span className="text-xs text-stone-600 block mt-0.5 font-medium">
                {isBengali ? 'সপরিবারে আমাদের রাজকন্যার প্রথম জন্মদিনে শুভাগমন কামনা করি' : 'Join us with your family to celebrate this fairytale milestone'}
              </span>
            </div>
          )}

          {/* Birthday Title */}
          <div className="my-4 space-y-1">
            <h1 className="text-4xl sm:text-6xl font-black tracking-wide text-[#4C1D95] drop-shadow-sm">
              {isBengali ? quotes.nativeWeddingTitle : quotes.weddingTitle}
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#9D174D] font-extrabold mt-1">
              {template.cultureLabel}
            </p>
          </div>

          {/* Rhyme Banner - Large, High Contrast & Effortless to Read */}
          <div className="my-6 max-w-xl mx-auto py-5 px-6 sm:px-8 bg-white/95 rounded-2xl border-2 border-[#A855F7] shadow-lg relative text-center">
            <div className="absolute -top-3 left-6 text-xl">🎈</div>
            <p className="font-serif text-base sm:text-lg text-[#2E1065] whitespace-pre-line leading-relaxed font-bold">
              {isBengali ? quotes.verse : (quotes.verseTranslation || quotes.verse)}
            </p>
            {isBengali && quotes.verseTranslation && (
              <p className="text-xs text-[#5B21B6] mt-3 pt-2 border-t border-purple-200 italic font-sans leading-relaxed">
                "{quotes.verseTranslation}"
              </p>
            )}
            <span className="text-xs font-serif font-bold text-[#9D174D] block mt-2">
              {quotes.verseAuthor}
            </span>
          </div>

          {/* Birthday Princess Portrait Card */}
          <div className="my-8 max-w-md mx-auto p-6 rounded-3xl bg-white border-2 border-[#C084FC] shadow-2xl text-center relative transform hover:scale-[1.01] transition-transform">
            
            {/* Glowing Tiara Badge */}
            <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden border-4 border-[#7C3AED] shadow-xl mb-4 group relative ring-4 ring-[#FCE7F3]">
              <img
                src={princess.image}
                alt={princess.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4C1D95]/30 to-transparent" />
            </div>

            <span className="px-5 py-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#BE185D] to-[#0284C7] text-white text-xs sm:text-sm font-extrabold inline-block shadow-md">
              👑 {isBengali ? princess.nativeRole : princess.role} 👑
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-[#4C1D95] mt-2">
              {isBengali ? princess.nativeName : princess.name}
            </h2>

            <div className="mt-3 p-3.5 bg-purple-50/90 rounded-2xl border border-purple-200 text-xs sm:text-sm text-[#2E1065] space-y-1">
              <p className="font-bold text-[#5B21B6]">{isBengali ? princess.nativeParents : princess.parents}</p>
              <p className="text-stone-700">{isBengali ? princess.nativeGrandparents : princess.grandparents}</p>
            </div>

            <p className="text-xs sm:text-sm italic text-[#4C1D95] font-semibold mt-2.5 px-2">
              "{isBengali ? princess.nativeAbout : princess.about}"
            </p>
          </div>

          {/* Date & Muhurat Highlight Pill */}
          <div className="my-6 inline-flex flex-wrap items-center justify-center gap-3">
            <div className="px-5 py-2.5 rounded-full bg-[#5B21B6] text-white font-serif text-xs sm:text-sm font-black shadow-md flex items-center gap-2">
              <Cake className="w-4 h-4 text-yellow-300" />
              <span>{isBengali ? template.targetDateNative : 'Sunday, 20th December 2026 | Cake Cutting: 7:00 PM'}</span>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-white border-2 border-[#BE185D] text-[#9D174D] font-serif text-xs sm:text-sm font-black shadow-sm flex items-center gap-2">
              <span>📍</span>
              <span>{isBengali ? venue.nativeName : venue.name}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive "Blow the 1st Birthday Candle" Feature */}
      <section className="bg-gradient-to-r from-[#FAF5FF] via-white to-[#FDF2F8] rounded-3xl p-6 sm:p-10 border-2 border-[#C084FC] shadow-xl text-center relative overflow-hidden">
        
        <div className="mb-6 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-100 border border-purple-300 text-xs font-bold text-[#7C3AED] uppercase tracking-widest">
            <PartyPopper className="w-3.5 h-3.5 text-[#EC4899]" />
            <span>{isBengali ? 'ইন্টারেক্টিভ কেক খেলা' : 'Interactive Cake Cutting Ceremony'}</span>
            <PartyPopper className="w-3.5 h-3.5 text-[#EC4899]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#7C3AED] mt-2">
            🎂 {isBengali ? 'অনন্যার ১ম মোমবাতিতে ফুঁ দিন ও আশীর্বাদ করুন' : 'Make a Wish & Blow the Birthday Candle!'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {isBengali
              ? 'মোমবাতিতে ক্লিক করে ফুঁ দিন এবং রঙিন কনফেটি সহ রাজকন্যা অনন্যাকে শুভকামনা জানান!'
              : 'Tap to blow out the magical golden candle and shower baby Ananya with wishes & confetti!'}
          </p>
        </div>

        {/* The SVG Fairytale Birthday Cake */}
        <div className="my-6 max-w-xs mx-auto flex flex-col items-center">
          
          {/* Candle & Flame */}
          <div className="relative flex flex-col items-center">
            {/* Animated Flame */}
            {!isCandleBlown ? (
              <div className="relative flex flex-col items-center animate-pulse">
                <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full shadow-[0_0_15px_#FACC15] animate-bounce" />
                <div className="w-1 h-2 bg-stone-700" />
              </div>
            ) : (
              <div className="h-8 flex flex-col items-center justify-end text-xs text-stone-400 font-bold animate-fadeIn">
                <span>💨 ~ puff ~</span>
                <div className="w-1 h-2 bg-stone-500" />
              </div>
            )}

            {/* Candle Body ("1") */}
            <div className="w-6 h-12 bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-300 rounded-t-md shadow border border-purple-400 flex items-center justify-center font-extrabold text-xs text-purple-900">
              ১
            </div>
          </div>

          {/* Tier 1 (Top Tier) */}
          <div className="w-36 h-14 bg-gradient-to-b from-pink-200 via-pink-100 to-pink-200 rounded-t-2xl shadow-inner border border-pink-300 relative flex items-center justify-center -mt-0.5">
            {/* Frosting Drips */}
            <div className="absolute top-0 inset-x-0 flex justify-around">
              <span className="w-4 h-3 bg-white rounded-b-full shadow-sm" />
              <span className="w-5 h-4 bg-white rounded-b-full shadow-sm" />
              <span className="w-4 h-3 bg-white rounded-b-full shadow-sm" />
              <span className="w-5 h-4 bg-white rounded-b-full shadow-sm" />
            </div>
            <span className="text-xs font-bold text-pink-600 tracking-wider">★ PRINCESS ★</span>
          </div>

          {/* Tier 2 (Bottom Tier) */}
          <div className="w-52 h-18 bg-gradient-to-b from-purple-200 via-purple-100 to-purple-200 rounded-t-3xl shadow-md border border-purple-300 relative flex items-center justify-center -mt-0.5">
            {/* Frosting Drips */}
            <div className="absolute top-0 inset-x-0 flex justify-around">
              <span className="w-5 h-4 bg-white rounded-b-full shadow-sm" />
              <span className="w-6 h-5 bg-white rounded-b-full shadow-sm" />
              <span className="w-5 h-4 bg-white rounded-b-full shadow-sm" />
              <span className="w-6 h-5 bg-white rounded-b-full shadow-sm" />
              <span className="w-5 h-4 bg-white rounded-b-full shadow-sm" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-[#7C3AED] tracking-widest">
              HAPPY 1ST BIRTHDAY
            </span>
          </div>

          {/* Cake Tray / Base */}
          <div className="w-60 h-3 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 rounded-full shadow-lg border border-amber-400 -mt-0.5" />
        </div>

        {/* Action Button & Feedback */}
        <div className="space-y-4">
          <button
            onClick={handleBlowCandle}
            className={`px-6 py-3 rounded-2xl font-bold text-sm sm:text-base shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto cursor-pointer ${
              !isCandleBlown
                ? 'bg-gradient-to-r from-[#EC4899] via-[#7C3AED] to-[#0284C7] text-white shadow-purple-300'
                : 'bg-white border-2 border-[#7C3AED] text-[#7C3AED] hover:bg-purple-50'
            }`}
          >
            {!isCandleBlown ? (
              <>
                <Flame className="w-5 h-5 text-yellow-300 animate-bounce" />
                <span>{isBengali ? '💨 ফুঁ দিয়ে মোমবাতি নেভান ও উইশ করুন!' : '💨 Blow the Candle & Make a Wish!'}</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>{isBengali ? '✨ পুনরায় মোমবাতি জ্বালান' : '✨ Relight the Candle for Another Wish'}</span>
              </>
            )}
          </button>

          {isCandleBlown && (
            <div className="p-4 bg-purple-50 rounded-2xl border-2 border-dashed border-[#EC4899] max-w-lg mx-auto animate-fadeIn space-y-1">
              <p className="font-extrabold text-base text-[#EC4899]">
                🎉 {isBengali ? 'শুভ ১ম জন্মদিন রাজকন্যা অনন্যা!' : 'Happy 1st Birthday Princess Ananya!'} 🎉
              </p>
              <p className="text-xs text-stone-700">
                {isBengali
                  ? 'আপনার শুভকামনা ও আশীর্বাদ অনন্যার জীবনে অফুরন্ত আনন্দ বয়ে আনবে।'
                  : 'May all her baby giggles turn into a lifetime of health, happiness, and sparkling adventures!'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Live Countdown to Grand Cake Cutting */}
      <CountdownTimer template={template} lang={lang} />

      {/* 4. 12-Month Milestone Journey */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-purple-200 shadow-xl text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-100 border border-purple-300 text-xs font-bold text-[#7C3AED] uppercase tracking-widest">
            <Smile className="w-3.5 h-3.5 text-[#EC4899]" />
            <span>{isBengali ? '১ থেকে ১২ মাসের পথচলা' : '12-Month Milestone Journey'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#7C3AED] mt-2">
            {isBengali ? 'ছোট্ট অনন্যার রূপকথার প্রথম বছর' : 'One Year of Sweet Magic'}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            {isBengali ? 'প্রথম কান্না থেকে আজ এক বছরে রাজকন্যার মধুর পদচারণা' : 'From tiny newborn sighs to royal first steps'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-gradient-to-b from-purple-50/70 to-pink-50/70 border border-purple-200 text-center space-y-2 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-white border-2 border-[#C084FC] flex items-center justify-center font-extrabold text-xs text-[#7C3AED] shadow-sm">
                0{idx + 1}
              </div>
              <p className="font-bold text-xs sm:text-sm text-[#7C3AED]">{m.month}</p>
              <p className="text-[11px] text-stone-600 leading-tight">{m.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Kids Carnival & Entertainment Zones */}
      <section className="bg-gradient-to-b from-[#F0F9FF] to-[#FAF5FF] rounded-3xl p-6 sm:p-10 border-2 border-sky-300 shadow-xl text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-sky-100 border border-sky-300 text-xs font-bold text-sky-800 uppercase tracking-widest">
            <Wand2 className="w-3.5 h-3.5 text-sky-600" />
            <span>{isBengali ? 'বাচ্চাদের আনন্দজোন ও বিনোদন' : 'Carnival & Fun Zones for Kids'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#7C3AED] mt-2">
            {isBengali ? 'উৎসবের রঙিন বিনোদন আয়োজন' : 'Fairytale Carnival Attractions'}
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
            {isBengali
              ? 'সকল কচিকাঁচাদের জন্য অপেক্ষা করছে জাদুকরী ম্যাজিক, ফেস আর্ট ও বেলুনের খেলা'
              : 'Endless fun curated for little guests: illusion tricks, sweets, and giant bubble plays.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
          {carnivalZones.map((z, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-sky-200 shadow-sm flex items-start gap-4 hover:border-purple-300 hover:shadow-md transition-all"
            >
              <span className="text-3xl p-2 rounded-xl bg-purple-50 shrink-0">{z.icon}</span>
              <div className="space-y-1">
                <h3 className="font-bold text-sm sm:text-base text-[#7C3AED]">{z.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{z.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Birthday Schedule of Events */}
      <section className="space-y-6" id="events">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-100 border border-pink-300 text-xs text-[#EC4899] font-bold uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5 text-[#EC4899]" />
            <span>{isBengali ? 'সন্ধ্যায় অনুষ্ঠিতব্য সময়সূচী' : 'Evening Program Timeline'}</span>
          </div>

          <h2 className="text-3xl font-bold text-[#7C3AED]">
            {isBengali ? 'জন্মদিনের আনন্দ নির্ঘণ্ট' : 'Birthday Program Timeline'}
          </h2>
        </div>

        <div className="space-y-4">
          {events.map((evt, idx) => {
            const isHighlight = evt.key === 'cake_cutting';

            return (
              <div
                key={evt.id}
                className={`rounded-3xl p-5 sm:p-7 border-2 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between ${
                  isHighlight
                    ? 'bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 border-[#EC4899]'
                    : 'bg-white border-purple-200'
                }`}
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                        isHighlight
                          ? 'bg-[#EC4899] text-white shadow'
                          : 'bg-purple-100 text-[#7C3AED] border border-purple-300'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#7C3AED]">
                        {isBengali ? evt.nativeTitle : evt.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#EC4899]">
                        {isBengali ? evt.nativeTagline : evt.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {isBengali ? evt.nativeDescription : evt.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {(isBengali ? evt.nativeHighlights : evt.highlights).map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-[11px] px-3 py-0.5 rounded-full bg-purple-50 text-[#7C3AED] border border-purple-200"
                      >
                        ★ {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-64 p-4 rounded-2xl bg-[#FAF5FF] border border-purple-200 space-y-2 text-xs shrink-0">
                  <p className="font-bold text-[#7C3AED]">📅 {isBengali ? evt.nativeDate : evt.date}</p>
                  <p className="text-stone-700">⏰ {isBengali ? evt.nativeTime : evt.time}</p>
                  <p className="text-stone-700">📍 {isBengali ? evt.nativeVenueName : evt.venueName}</p>
                  <p className="text-[#EC4899] pt-1 border-t border-purple-200 font-semibold">
                    👗 {isBengali ? evt.nativeDressCode : evt.dressCode}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Venue Location */}
      <section className="rounded-3xl p-6 sm:p-10 border-2 border-purple-200 bg-white shadow-xl text-center" id="venue">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-100 border border-purple-300 text-xs text-[#7C3AED] font-bold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>{isBengali ? 'অনুষ্ঠানস্থল ও অবস্থান' : 'Venue & Directions'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#7C3AED] mt-2">
            {isBengali ? 'উৎসব প্রাঙ্গণে আগমন' : 'Party Venue: ITC Sonar Kolkata'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider inline-block bg-pink-100 text-[#EC4899]">
                {isBengali ? 'প্রধান পার্টি লন' : 'Imperial Garden Lawn'}
              </span>
              <h3 className="text-2xl font-bold text-[#7C3AED] mt-2">
                {isBengali ? venue.nativeName : venue.name}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {isBengali ? venue.nativeAddress : venue.address}
            </p>

            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs space-y-1">
              <p className="font-bold text-[#7C3AED]">
                🚗 {isBengali ? 'পার্কিং ও ল্যান্ডমার্ক:' : 'Valet & Entry:'}
              </p>
              <p className="text-stone-700">
                {isBengali ? venue.nativeLandmark : venue.landmark} • {isBengali ? venue.nativeParking : venue.parking}
              </p>
            </div>

            <div className="pt-2">
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-bold text-xs sm:text-sm shadow flex items-center gap-2 hover:opacity-95 transition-opacity inline-flex"
              >
                <Navigation className="w-4 h-4" />
                <span>{isBengali ? 'গুগল ম্যাপে নেভিগেট করুন' : 'Get Directions on Google Maps'}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 h-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-purple-200 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.5828453472097!2d88.39783937602018!3d22.557342633558837!2m3!1f0!2f0!3f0!3m2!1i1024!2f786!4f13.1!3m3!1m2!1s0x3a02768058a5c373%3A0xe543c72b2bbcd42a!2sITC%20Sonar%2C%20a%20Luxury%20Collection%20Hotel%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ITC Sonar Venue Map"
            />
          </div>
        </div>
      </section>

      {/* 8. Wishes & Blessings Guestbook */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-purple-200 shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-100 border border-pink-300 text-xs text-[#EC4899] font-bold uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>{isBengali ? 'অনন্যার জন্মদিনের শুভেচ্ছা ডালি' : 'Birthday Wishes & Blessings'}</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#7C3AED]">
            {isBengali ? 'একটি মিষ্টি শুভকামনা জানান' : 'Post Your Sweet Wishes'}
          </h2>
          <p className="text-xs text-stone-500">
            {isBengali ? 'আপনার প্রাণঢালা আশীর্বাদ অনন্যার স্মৃতি অ্যালবামে সংরক্ষিত থাকবে' : 'Your words will be cherished in Ananya’s 1st year commemorative photobook.'}
          </p>
        </div>

        {/* Quick Wish Buttons */}
        <div className="space-y-2">
          <p className="text-xs text-stone-500 font-semibold text-center">
            {isBengali ? 'দ্রুত শুভেচ্ছা নির্বাচন করুন:' : 'Pick a ready wish:'}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickWishes.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMessage(q)}
                className="text-xs px-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[#7C3AED] transition-all hover:scale-105"
              >
                + {q}
              </button>
            ))}
          </div>
        </div>

        {/* Wish Form */}
        <form onSubmit={handleWishSubmit} className="max-w-xl mx-auto space-y-4 bg-purple-50/50 p-5 rounded-2xl border border-purple-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#7C3AED] mb-1">
                {isBengali ? 'আপনার নাম *' : 'Your Name *'}
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                placeholder={isBengali ? 'উদা: রাহুল কাকু ও স্নেহা আন্টি' : 'e.g., Uncle Rahul & Sneha'}
                className="w-full px-3 py-2 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#7C3AED] mb-1">
                {isBengali ? 'সম্পর্ক (ঐচ্ছিক)' : 'Relation (Optional)'}
              </label>
              <input
                type="text"
                value={relation}
                onChange={e => setRelation(e.target.value)}
                placeholder={isBengali ? 'উদা: পারিবারিক বন্ধু' : 'e.g., Family Friend'}
                className="w-full px-3 py-2 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-xs bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#7C3AED] mb-1">
              {isBengali ? 'জন্মদিনের শুভেচ্ছা বার্তা *' : 'Birthday Message *'}
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={isBengali ? 'ছোট্ট রাজকন্যা অনন্যার জন্য আশীর্বাদ লিখুন...' : 'Write your loving blessings for Princess Ananya...'}
              className="w-full px-3 py-2 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-xs bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#0284C7] text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? (isBengali ? 'পাঠানো হচ্ছে...' : 'Sending...') : (isBengali ? 'শুভেচ্ছা পাঠান' : 'Post Birthday Wish')}</span>
          </button>
        </form>

        {/* Existing Wishes Feed */}
        <div className="max-w-2xl mx-auto space-y-3 pt-4">
          <h3 className="font-bold text-sm text-[#7C3AED] text-center border-b border-purple-200 pb-2">
            💌 {isBengali ? 'অতিথিদের পাঠানো শুভেচ্ছা বার্তা' : 'Loving Messages & Wishes'} ({wishes.length})
          </h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {wishes.map(w => (
              <div key={w.id} className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#7C3AED]">
                    {w.name} {w.relation && <span className="opacity-70 font-normal">({w.relation})</span>}
                  </span>
                  <span className="text-[10px] text-stone-400">{w.timestamp}</span>
                </div>
                <p className="text-stone-700 leading-relaxed">{w.message}</p>
                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => handleLikeWish(w.id)}
                    className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border transition-all ${
                      likedMap[w.id]
                        ? 'bg-pink-100 border-pink-300 text-pink-700'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-pink-300'
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${likedMap[w.id] ? 'fill-pink-600 text-pink-600' : ''}`} />
                    <span>{w.hearts}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. RSVP & Direct Family Contact */}
      <section className="bg-gradient-to-r from-purple-50 via-white to-pink-50 rounded-3xl p-6 sm:p-10 border-2 border-purple-300 shadow-xl text-center space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-100 border border-pink-300 text-xs text-[#EC4899] font-bold uppercase tracking-widest">
            <Check className="w-3.5 h-3.5 text-[#EC4899]" />
            <span>{isBengali ? 'উপস্থিতির সম্মতি ও যোগাযোগ' : 'RSVP & Direct Contact'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#7C3AED]">
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
            <div key={idx} className="p-4 rounded-2xl bg-white border border-purple-200 shadow-sm text-left space-y-2">
              <div>
                <p className="font-bold text-sm text-[#7C3AED]">{isBengali ? c.nativeName : c.name}</p>
                <p className="text-[11px] text-stone-500">{isBengali ? c.nativeRelation : c.relation}</p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`tel:${c.phone}`}
                  className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-xs font-bold text-[#7C3AED] flex items-center justify-center gap-2"
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
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-dashed border-purple-300 shadow-sm text-center space-y-4">
        <h3 className="font-bold text-base text-[#7C3AED] flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4 text-[#EC4899]" />
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
            placeholder={isBengali ? 'উদা: সুব্রত কাকু ও পরিবার' : 'e.g., Uncle Sourav & Family'}
            className="flex-1 px-3 py-2 rounded-xl border border-purple-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-xs font-bold shadow hover:opacity-95 cursor-pointer"
          >
            {isBengali ? 'লিংক বানান' : 'Create'}
          </button>
        </form>

        {generatedLink && (
          <div className="max-w-lg mx-auto p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs flex items-center justify-between gap-2">
            <span className="truncate text-stone-700">{generatedLink}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedLink);
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
              }}
              className="px-3 py-1 rounded bg-[#7C3AED] text-white font-bold shrink-0 text-[11px] cursor-pointer"
            >
              {copiedLink ? 'কপি হয়েছে!' : 'কপি করুন'}
            </button>
          </div>
        )}
      </section>

      {/* 11. Family Sign-off Footer */}
      <footer className="pt-6 pb-12 text-center space-y-3">
        <p className="text-sm font-bold text-[#7C3AED]">
          {isBengali ? quotes.nativeFamilySignoff : quotes.familySignoff}
        </p>
        <p className="text-xs text-stone-500">
          Sen & Banerjee Family | Ballygunge, Kolkata | Powered by UtsavPatra
        </p>
      </footer>

    </div>
  );
};
