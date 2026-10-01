import React, { useState, useEffect } from 'react';
import { CulturalTemplate, Language, GuestWish } from '../../types/wedding';
import { AlponaDivider, ShankhoIcon } from '../AlponaMotifs';
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
  UtensilsCrossed,
  Baby,
  Smile,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AnnaprashanViewProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
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

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(wishes));
  }, [wishes, storageKey]);

  const quickWishes = isBengali ? template.quickWishes.native : template.quickWishes.en;

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
          particleCount: 50,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#A82025', '#D4AF37', '#FCE38A', '#2E7D32']
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
      items: isBengali ? 'ঝিরিঝিরি আলু ভাজা, বেগুন ভাজা, পটল ভাজা, উচ্ছে ভাজা ও রুই মাছ ভাজা' : 'Alu Bhaja, Begun Bhaja, Potol Bhaja, Uchhe Bhaja & Fish Fry'
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
    <div className="relative max-w-4xl mx-auto px-3 sm:px-6 py-8 space-y-12 sm:space-y-14 font-sans">
      
      {/* 1. Main Annaprashan Invitation Scroll */}
      <section className="relative bg-[#FFFDF7] rounded-3xl p-6 sm:p-12 border-4 border-[#A82025] shadow-2xl overflow-hidden text-center">
        
        {/* Ornate Gold Inner Frame */}
        <div className="border border-[#D4AF37] rounded-2xl p-4 sm:p-8 bg-[#FBF7EE]/60 relative">
          
          {/* Top Mangalacharan */}
          <div className="flex items-center justify-center gap-2 mb-3 text-[#A82025]">
            <ShankhoIcon size={18} color="#A82025" />
            <span className="font-bengali text-xs sm:text-sm tracking-widest font-bold">
              {quotes.invocation}
            </span>
            <ShankhoIcon size={18} color="#A82025" />
          </div>

          <p className="font-bengali text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
            {quotes.subInvocation}
          </p>

          {/* Guest VIP Badge */}
          {guestName && (
            <div className="my-5 mx-auto max-w-md text-center bg-gradient-to-r from-[#A82025]/10 via-[#D4AF37]/20 to-[#A82025]/10 border-y border-[#D4AF37] py-2.5 px-6 rounded-lg">
              <p className="font-bengali text-xs text-[#A82025] font-semibold uppercase tracking-wider">
                {isBengali ? 'সাদর নিমন্ত্রণ' : 'Cordially Invited'}
              </p>
              <p className="font-bengali text-xl text-[#A82025] font-bold mt-0.5">
                {guestName}
              </p>
              <p className="font-bengali text-xs text-[#5C0C0F] mt-0.5">
                {isBengali ? 'সপরিবারে আপনার উপস্থিতি ও আশীর্বাদ একান্ত কাম্য' : 'Awaiting your presence and blessings with family'}
              </p>
            </div>
          )}

          {/* Baby's First Rice Title */}
          <div className="my-5 space-y-1">
            <h1 className="font-bengali text-4xl sm:text-6xl text-[#A82025] font-extrabold tracking-wide drop-shadow-sm">
              {isBengali ? quotes.nativeWeddingTitle : quotes.weddingTitle}
            </h1>
            <p className="font-royal text-xs sm:text-sm tracking-[0.25em] text-[#997819] uppercase font-semibold">
              {isBengali ? 'বাঙালি মুখে ভাত ও অন্নপ্রাশন লিপি' : 'Bengali First Rice Ceremony Invitation'}
            </p>
          </div>

          <AlponaDivider className="my-4 max-w-md mx-auto" color="#D4AF37" />

          {/* Traditional Couplet / Rhyme */}
          <div className="my-4 max-w-lg mx-auto py-3 px-5 bg-[#F4ECD8]/80 rounded-2xl border border-[#D4AF37]/40 shadow-inner">
            <p className="font-bengali text-xs sm:text-sm text-[#5C0C0F] whitespace-pre-line leading-relaxed italic font-medium">
              {quotes.verse}
            </p>
          </div>

          {/* Baby Centerpiece Card */}
          <div className="my-8 max-w-md mx-auto p-6 rounded-3xl bg-white border-2 border-[#D4AF37]/60 shadow-lg text-center">
            
            {/* Baby Photo in Royal Arch Frame */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-xl mb-4 group relative">
              <img src={baby.image} alt={baby.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <span className="px-3.5 py-1 rounded-full bg-[#A82025]/10 text-[#A82025] font-bengali text-xs font-bold inline-block">
              {isBengali ? baby.nativeRole : baby.role}
            </span>

            <h2 className="font-bengali text-2xl sm:text-3xl font-bold text-[#A82025] mt-1.5">
              {isBengali ? baby.nativeName : baby.name}
            </h2>

            <div className="mt-3 p-3 bg-[#FBF7EE] rounded-xl border border-[#D4AF37]/30 text-xs font-bengali text-[#4A3B32] space-y-1">
              <p className="font-bold text-[#A82025]">{isBengali ? baby.nativeParents : baby.parents}</p>
              <p className="opacity-90">{isBengali ? baby.nativeGrandparents : baby.grandparents}</p>
            </div>

            <p className="font-bengali text-xs italic text-stone-600 mt-3 px-2">
              "{isBengali ? baby.nativeAbout : baby.about}"
            </p>
          </div>

          {/* Date & Muhurat Highlight Pill */}
          <div className="my-6 inline-flex flex-wrap items-center justify-center gap-3">
            <div className="px-5 py-2.5 rounded-full bg-[#A82025] text-[#F3E5AB] font-bengali text-xs sm:text-sm font-bold shadow flex items-center gap-2">
              <span>📅</span>
              <span>{isBengali ? template.targetDateNative : 'Sunday, 15th November 2026 | Lagna: 12:30 PM'}</span>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-[#FBF7EE] border border-[#D4AF37] text-[#A82025] font-bengali text-xs sm:text-sm font-bold shadow-sm flex items-center gap-2">
              <span>📍</span>
              <span>{isBengali ? venue.nativeName : venue.name}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Live Countdown to First Spoon of Rice */}
      <CountdownTimer template={template} lang={lang} />

      {/* 3. Baby Aarav's 6-Month Journey (১ থেকে ৬ মাসের মিষ্টি স্মৃতি) */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/60 shadow-lg text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#A82025]/10 border border-[#D4AF37] text-xs font-bengali text-[#A82025] font-bold uppercase tracking-widest">
            <Baby className="w-3.5 h-3.5 text-[#A82025]" />
            <span>{isBengali ? 'ছোট্ট আরভের প্রথম ৬ মাসের স্মৃতি' : 'Aarav’s 6 Months Journey'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[#A82025] mt-2">
            {isBengali ? 'হাসি, কান্না আর আদরের দিনগুলি' : 'Smiles, Giggles & Milestones'}
          </h2>
          <AlponaDivider className="max-w-xs mx-auto my-2" color="#D4AF37" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          
          <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#D4AF37]/40 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#A82025]/10 border border-[#D4AF37] flex items-center justify-center text-[#A82025] font-bold font-bengali mb-3 text-sm">
              ১ মাস
            </div>
            <h3 className="font-bengali font-bold text-base text-[#A82025]">
              {isBengali ? 'ধরায় প্রথম আগমন' : 'Welcome to the World'}
            </h3>
            <p className="text-xs font-bengali text-[#5C0C0F] mt-1.5 leading-relaxed">
              {isBengali ? 'পরিবারে প্রথম চাঁদের আলোর মতো আগমন। ছোট্ট নরম হাতের স্পর্শে পূর্ণতা পেল আমাদের জীবন।' : 'Arrived into our arms bringing infinite warmth and light.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#D4AF37]/40 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#A82025]/10 border border-[#D4AF37] flex items-center justify-center text-[#A82025] font-bold font-bengali mb-3 text-sm">
              ৩ মাস
            </div>
            <h3 className="font-bengali font-bold text-base text-[#A82025]">
              {isBengali ? 'প্রথম মিষ্টি হাসি' : 'First Sweet Giggles'}
            </h3>
            <p className="text-xs font-bengali text-[#5C0C0F] mt-1.5 leading-relaxed">
              {isBengali ? 'রঙিন আলোর দিকে তাকিয়ে খুশির হাসি আর খেলনার শব্দে মেতে ওঠা।' : 'Discovered sweet baby giggles and loved watching shiny ceiling lights.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#D4AF37]/40 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#A82025]/10 border border-[#D4AF37] flex items-center justify-center text-[#A82025] font-bold font-bengali mb-3 text-sm">
              ৬ মাস
            </div>
            <h3 className="font-bengali font-bold text-base text-[#A82025]">
              {isBengali ? 'মামার কোলে মুখে ভাত' : 'First Taste of Solid Food'}
            </h3>
            <p className="text-xs font-bengali text-[#5C0C0F] mt-1.5 leading-relaxed">
              {isBengali ? 'আজ মামাবাড়ির রূপোর বাটি থেকে প্রথম সুস্বাদু গোবিন্দভোগ চালের পায়েস খাওয়ার পালা!' : 'Ready for the sacred first spoon of delicious Govindabhog rice payesh!'}
            </p>
          </div>

        </div>
      </section>

      {/* 4. Annaprashan Ceremonies (মাঙ্গলিক আচার ও পর্বসমূহ) */}
      <section className="space-y-6" id="events">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#A82025]/10 border border-[#D4AF37] text-xs font-bengali text-[#A82025] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isBengali ? 'মাঙ্গলিক আচার ও অনুষ্ঠান নির্ঘণ্ট' : 'Auspicious Rituals & Schedule'}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>

          <h2 className="text-3xl font-bold font-bengali text-[#A82025]">
            {isBengali ? 'অন্নপ্রাশন উৎসবের শুভ পর্বসমূহ' : 'Annaprashan Ceremony Timeline'}
          </h2>
          <AlponaDivider className="max-w-xs mx-auto my-2" color="#D4AF37" />
        </div>

        <div className="space-y-4">
          {events.map((evt, idx) => {
            const isHighlight = evt.key === 'mukhe_bhaat';

            return (
              <div
                key={evt.id}
                className={`rounded-3xl p-5 sm:p-7 border-2 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between ${
                  isHighlight
                    ? 'bg-gradient-to-r from-[#FFF5F5] to-[#FFF0F2] border-[#A82025]'
                    : 'bg-white border-[#D4AF37]/50'
                }`}
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full font-bengali font-bold text-xs flex items-center justify-center shrink-0 ${
                        isHighlight
                          ? 'bg-[#A82025] text-[#F3E5AB]'
                          : 'bg-[#FBF7EE] text-[#A82025] border border-[#D4AF37]'
                      }`}
                    >
                      ০{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-bengali text-[#A82025]">
                        {isBengali ? evt.nativeTitle : evt.title}
                      </h3>
                      <p className="text-xs font-bengali text-[#997819] font-semibold">
                        {isBengali ? evt.nativeTagline : evt.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A3B32] font-bengali leading-relaxed">
                    {isBengali ? evt.nativeDescription : evt.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {(isBengali ? evt.nativeHighlights : evt.highlights).map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-[11px] px-3 py-0.5 rounded-full bg-[#FFFDF7] text-[#A82025] font-bengali border border-[#D4AF37]/30"
                      >
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-64 p-4 rounded-2xl bg-[#FFFDF7] border border-[#D4AF37]/40 space-y-2 text-xs font-bengali shrink-0">
                  <p className="font-bold text-[#A82025]">📅 {isBengali ? evt.nativeDate : evt.date}</p>
                  <p className="text-[#4A3B32]">⏰ {isBengali ? evt.nativeTime : evt.time}</p>
                  <p className="text-[#4A3B32]">📍 {isBengali ? evt.nativeVenueName : evt.venueName}</p>
                  <p className="text-[#A82025] pt-1 border-t border-[#D4AF37]/30 font-medium">
                    👗 {isBengali ? evt.nativeDressCode : evt.dressCode}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Traditional 5-Bhaja & Bhoj Menu Card (অন্নপ্রাশনের রাজকীয় মেনু) */}
      <section className="bg-gradient-to-b from-[#FFFDF7] to-[#FBF7EE] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] shadow-xl text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#A82025]/10 border border-[#D4AF37] text-xs font-bengali text-[#A82025] font-bold uppercase tracking-widest">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isBengali ? 'ঐতিহ্যবাহী পঞ্চব্যঞ্জন ভোজ' : 'Traditional Bengali Feast Menu'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[#A82025] mt-2">
            {isBengali ? 'মুখরোচক রাজকীয় অন্নপ্রাশন মেনু' : 'The Celebration Bhoj Menu'}
          </h2>
          <AlponaDivider className="max-w-xs mx-auto my-2" color="#D4AF37" />
          <p className="text-xs text-[#5C0C0F] font-bengali max-w-md mx-auto">
            {isBengali
              ? 'বাঙালি ঘরানার আন্তরিক আপ্যায়ন ও রকমারি স্বাদের সমাহার'
              : 'Handcrafted traditional culinary delights to celebrate baby Aarav’s milestone.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
          {menuCourses.map((course, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-2xl p-5 border border-[#D4AF37]/50 shadow-sm space-y-1.5"
            >
              <div className="flex items-center gap-2 text-[#A82025] font-bengali font-bold text-sm sm:text-base">
                <span className="w-6 h-6 rounded-full bg-[#A82025]/10 flex items-center justify-center text-xs">
                  {idx + 1}
                </span>
                <span>{course.course}</span>
              </div>
              <p className="text-xs sm:text-sm font-bengali text-[#4A3B32] pl-8 leading-relaxed">
                {course.items}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Venue Location (রাজকুটির স্বভূমি, কলকাতা) */}
      <section className="rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] bg-white shadow-xl text-center" id="venue">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#A82025]/10 border border-[#D4AF37] text-xs font-bengali text-[#A82025] font-bold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isBengali ? 'অনুষ্ঠানস্থল ও অবস্থান' : 'Venue & Directions'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[#A82025] mt-2">
            {isBengali ? 'কীভাবে পৌঁছাবেন' : 'Our Celebration Venue'}
          </h2>
          <AlponaDivider className="max-w-xs mx-auto my-2" color="#D4AF37" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-5 space-y-4 font-bengali">
            <div>
              <span className="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider inline-block bg-[#A82025]/10 text-[#A82025]">
                {isBengali ? 'প্রধান উৎসব প্রাঙ্গণ' : 'Celebration Grounds'}
              </span>
              <h3 className="text-2xl font-bold text-[#A82025] mt-2">
                {isBengali ? venue.nativeName : venue.name}
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#4A3B32]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-[#A82025] mt-0.5" />
                <p className="leading-relaxed">
                  {isBengali ? venue.nativeAddress : venue.address}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 shrink-0 text-[#D4AF37] mt-0.5" />
                <p>
                  <strong className="text-[#A82025]">{isBengali ? 'ল্যান্ডমার্ক: ' : 'Landmark: '}</strong>
                  {isBengali ? venue.nativeLandmark : venue.landmark}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Smile className="w-5 h-5 shrink-0 text-[#D4AF37] mt-0.5" />
                <p>
                  <strong className="text-[#A82025]">{isBengali ? 'পার্কিং: ' : 'Parking: '}</strong>
                  {isBengali ? venue.nativeParking : venue.parking}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md bg-[#A82025] hover:opacity-90"
              >
                <Navigation className="w-4 h-4 text-[#F3E5AB]" />
                <span>{isBengali ? 'গুগল ম্যাপে দিকনির্দেশ' : 'Open in Google Maps'}</span>
              </a>

              <a
                href={`https://m.uber.com/ul/?action=setPickup&client_id=uber&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(venue.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#D4AF37] text-xs sm:text-sm font-semibold text-[#A82025] bg-[#FBF7EE] hover:bg-[#F3E5AB]/40 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-[#A82025]" />
                <span>{isBengali ? 'ক্যাব বুক করুন' : 'Book Ride'}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 h-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-inner relative">
            <iframe
              title="Raajkutir Swabhumi Location"
              src={venue.embedUrl}
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-2 right-2 pointer-events-none bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-[11px] font-bengali shadow border border-[#D4AF37]/40 text-[#A82025] font-bold">
              {venue.name}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Blessings & Wishes Guestbook (স্নেহাশিস ও শুভবার্তা) */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/60 shadow-xl" id="wishes">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#A82025]/10 border border-[#D4AF37] text-xs font-bengali text-[#A82025] uppercase tracking-widest font-bold">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>{isBengali ? 'স্নেহাশিস ও শুভবার্তা' : 'Shower Your Blessings'}</span>
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[#A82025] mt-2">
            {isBengali ? 'ছোট্ট আরভকে আশীর্বাদ করুন' : 'Leave Loving Blessings for Baby Aarav'}
          </h2>
          <p className="text-xs text-[#4A3B32] font-bengali max-w-md mx-auto mt-1">
            {isBengali
              ? 'আরভের জীবনের প্রথম অন্নগ্রহণের শুভলগ্নে আপনার অন্তরের আশীর্বাদ রেখে যান।'
              : 'Leave your loving words and blessings for baby Aarav on his special milestone.'}
          </p>
          <AlponaDivider className="max-w-xs mx-auto my-2" color="#D4AF37" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 rounded-2xl p-6 border border-[#D4AF37]/50 bg-[#FBF7EE] shadow-sm font-bengali">
            <h3 className="font-bold text-base text-[#A82025] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{isBengali ? 'আশীর্বাদ বার্তা পাঠান' : 'Post Your Blessings'}</span>
            </h3>

            <form onSubmit={handleWishSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#A82025] mb-1">
                  {isBengali ? 'আপনার শুভ নাম *' : 'Your Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  placeholder={isBengali ? 'যেমন: জয়দীপ মুখার্জী' : 'e.g., Uncle Joydeep'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/60 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#A82025]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A82025] mb-1">
                  {isBengali ? 'সম্পর্ক / পরিচয় (ঐচ্ছিক)' : 'Relation (Optional)'}
                </label>
                <input
                  type="text"
                  value={relation}
                  onChange={e => setRelation(e.target.value)}
                  placeholder={isBengali ? 'যেমন: মামা / মাসিমণি / বন্ধু' : 'e.g., Maternal Uncle / Aunt'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/60 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#A82025]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#D4AF37] font-bold mb-1.5">
                  {isBengali ? 'চটজলদি বার্তা:' : 'Quick Ideas:'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {quickWishes.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setMessage(q)}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-[#D4AF37]/40 bg-white text-[#A82025] hover:bg-[#F3E5AB]/40 transition-colors text-left"
                    >
                      + {q.slice(0, 24)}...
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A82025] mb-1">
                  {isBengali ? 'আপনার আশীর্বাদ বার্তা *' : 'Your Blessing Message *'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={isBengali ? 'ছোট্ট আরভের জন্য সুন্দর বার্তা লিখুন...' : 'Write your loving blessings for baby Aarav...'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/60 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#A82025] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 bg-[#A82025] hover:opacity-90"
              >
                <Send className="w-4 h-4 text-[#F3E5AB]" />
                <span>{isSubmitting ? (isBengali ? 'পাঠানো হচ্ছে...' : 'Submitting...') : (isBengali ? 'শুভবার্তা পাঠান' : 'Post Blessings')}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {wishes.map(wish => (
              <div
                key={wish.id}
                className="bg-[#FFFDF7] rounded-2xl p-4 sm:p-5 border border-[#D4AF37]/40 shadow-sm hover:shadow-md transition-all font-bengali"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#A82025]">
                      {wish.name}
                    </h4>
                    {wish.relation && (
                      <span className="text-[11px] block text-[#D4AF37] font-semibold">
                        ✦ {wish.relation}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-500 shrink-0 font-sans">
                    {wish.timestamp}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#4A3B32] leading-relaxed whitespace-pre-line my-2">
                  {wish.message}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-[#D4AF37]/20 text-xs">
                  <span className="text-[11px] italic text-[#A82025]/80">
                    {isBengali ? 'মাঙ্গলিক আশীর্বাদ' : 'Sacred blessing'}
                  </span>
                  <button
                    onClick={() => handleLikeWish(wish.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors ${
                      likedMap[wish.id]
                        ? 'bg-rose-100 text-rose-700 font-semibold'
                        : 'hover:bg-rose-50 text-rose-600'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${likedMap[wish.id] ? 'fill-rose-600 text-rose-600' : 'text-rose-500'}`} />
                    <span>{wish.hearts}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. RSVP & Coordination Desk: Suman Bhadra */}
      <section className="rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] bg-[#FFFDF7] shadow-xl text-center" id="rsvp">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#A82025]/10 border border-[#D4AF37] text-xs font-bengali text-[#A82025] uppercase tracking-widest font-bold mb-3">
          <span>{isBengali ? 'উপস্থিতি নিশ্চিতকরণ (RSVP Desk)' : 'RSVP & Guest Desk'}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[#A82025]">
          {isBengali ? 'সাদর প্রত্যুত্তর ও অভ্যর্থনা' : 'Confirm Your Attendance'}
        </h2>
        <p className="text-xs sm:text-sm font-bengali text-[#4A3B32] max-w-md mx-auto mt-1">
          {isBengali
            ? 'আপ্যায়নের সুবিধার্থে অনুগ্রহপূর্বক আপনার শুভাগমন নিশ্চিত করুন।'
            : 'To help us prepare for your dining and warm hosting, please confirm your attendance.'}
        </p>
        <AlponaDivider className="max-w-xs mx-auto my-3" color="#D4AF37" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto my-6 text-left">
          {rsvpContacts.map((contact, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#D4AF37]/50 shadow-md flex flex-col justify-between font-bengali"
            >
              <div>
                <h3 className="font-bold text-base text-[#A82025]">
                  {isBengali ? contact.nativeName : contact.name}
                </h3>
                <p className="text-xs text-[#D4AF37] font-semibold mb-4">
                  {isBengali ? contact.nativeRelation : contact.relation}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#D4AF37]/30">
                <a
                  href={getWhatsAppRsvpUrl(contact.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{isBengali ? 'হোয়াটসঅ্যাপে জানান' : 'Confirm on WhatsApp'}</span>
                </a>

                <a
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold border border-[#D4AF37]/50 bg-[#FBF7EE] text-[#A82025] hover:opacity-80 transition-opacity"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{contact.phone}</span>
                </a>

                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold border border-[#D4AF37]/50 bg-[#FBF7EE] text-[#A82025] hover:opacity-80 transition-opacity truncate"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#A82025]/10 via-[#D4AF37]/20 to-[#A82025]/10 border border-[#D4AF37] max-w-lg mx-auto font-bengali">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#A82025]">
            {isBengali ? '॥ সস্নেহ আশীর্বাদের প্রতীক্ষায় ॥' : '॥ Awaiting Your Gracious Presence ॥'}
          </p>
          <p className="text-lg sm:text-xl font-bold mt-1 text-[#A82025]">
            {isBengali ? quotes.nativeFamilySignoff : quotes.familySignoff}
          </p>
        </div>
      </section>

      {/* 9. Personalized Invite Link Tool & Footer */}
      <footer className="pt-8 pb-24 sm:pb-12 text-center space-y-8 font-bengali">
        <div className="p-6 sm:p-8 bg-white rounded-3xl border-2 border-[#D4AF37]/60 shadow-lg max-w-lg mx-auto text-left">
          <div className="flex items-center gap-2 mb-2 text-[#A82025]">
            <Share2 className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-bold text-sm sm:text-base">
              {isBengali ? 'অতিথির নাম লিখে অন্নপ্রাশনের লিংক পাঠান' : 'Create Personalized Guest Invite Link'}
            </h4>
          </div>
          <p className="text-xs text-[#4A3B32] mb-3 leading-relaxed">
            {isBengali
              ? 'অতিথির নাম লিখে লিংক তৈরি করুন। লিংকে তাঁদের নাম সম্মানের সহিত প্রদর্শিত হইবে।'
              : 'Enter guest name to generate a tailored invitation link with their name.'}
          </p>

          <form onSubmit={handleGenerateCustomLink} className="flex gap-2">
            <input
              type="text"
              value={customGuest}
              onChange={e => setCustomGuest(e.target.value)}
              placeholder={isBengali ? 'যেমন: সুভাষদা ও পরিবার' : 'e.g., Subhash Da & Family'}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#D4AF37]/60 focus:outline-none focus:ring-1 focus:ring-[#A82025]"
            />
            <button
              type="submit"
              className="px-4 py-2 text-white text-xs font-semibold rounded-xl bg-[#A82025] hover:opacity-90 transition-opacity"
            >
              {isBengali ? 'লিংক তৈরি' : 'Generate'}
            </button>
          </form>

          {generatedLink && (
            <div className="mt-3 p-2.5 rounded-xl bg-[#FBF7EE] border border-[#D4AF37]/40 flex items-center justify-between gap-2 text-xs">
              <span className="truncate font-mono text-[11px] text-[#A82025]">
                {generatedLink}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  alert(isBengali ? 'ব্যক্তিগত লিংক কপি করা হয়েছে!' : 'Personalized link copied!');
                }}
                className="px-3 py-1 text-white rounded-lg shrink-0 text-[11px] bg-[#A82025]"
              >
                {isBengali ? 'কপি' : 'Copy'}
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleCopyMainUrl}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D4AF37] bg-white text-xs font-bold text-[#A82025] hover:bg-[#FBF7EE] transition-colors shadow-sm"
          >
            {copiedMain ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">{isBengali ? 'কপি সম্পন্ন!' : 'Link Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#D4AF37]" />
                <span>{isBengali ? 'ওয়েবসাইট লিংক কপি করুন' : 'Copy Invitation Link'}</span>
              </>
            )}
          </button>
        </div>

        <div className="pt-6 border-t border-[#D4AF37]/30 space-y-2">
          <p className="text-xs font-bold text-[#A82025]">
            {isBengali ? quotes.nativeFamilySignoff : quotes.familySignoff}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
            <span className="text-[#4A3B32]">
              {isBengali ? 'যোগাযোগ ও সমন্বয়:' : 'Inquiries & Coordination:'}{' '}
              <strong className="text-[#A82025]">Suman Bhadra</strong>
            </span>
            <a
              href="tel:+916291898703"
              className="px-3 py-1 rounded-full border border-[#D4AF37]/60 bg-[#FBF7EE] text-[11px] font-semibold text-[#A82025] hover:opacity-80 flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3" /> +91 6291898703
            </a>
            <a
              href="mailto:bhadrasuman04@gmail.com"
              className="px-3 py-1 rounded-full border border-[#D4AF37]/60 bg-[#FBF7EE] text-[11px] font-semibold text-[#A82025] hover:opacity-80 flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3" /> bhadrasuman04@gmail.com
            </a>
          </div>

          <p className="text-[11px] text-stone-500 pt-2 font-sans">
            Crafted with cultural elegance on UtsavPatra.com
          </p>
        </div>
      </footer>

    </div>
  );
};
