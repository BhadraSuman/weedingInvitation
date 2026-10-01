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
  Users
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

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(wishes));
  }, [wishes, storageKey]);

  const quickWishes = isBengali ? template.quickWishes.native : template.quickWishes.en;

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
          colors: ['#B0305C', '#D4AF37', '#FCE7F3', '#FFD166']
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
    { month: isBengali ? '৬ মাস' : '6 Months', note: isBengali ? 'হামাগুড়ি ও খেলনা নিয়ে দুষ্টুমি' : 'Sitting & exploring' },
    { month: isBengali ? '৯ মাস' : '9 Months', note: isBengali ? 'ছোট্ট হাতে দাঁড়ানোর মধুর চেষ্টা' : 'Standing tall with support' },
    { month: isBengali ? '১২ মাস' : '12 Months', note: isBengali ? 'এক বছর পূর্ণ! শুভ জন্মদিন রাজকন্যা!' : 'Turning ONE today!' }
  ];

  const funZones = [
    {
      title: isBengali ? 'জাদুকরী ম্যাজিক শো' : 'Live Magic & Illusion Show',
      desc: isBengali ? 'শিশুদের মন ভোলানো রকমারি ম্যাজিক ও সারপ্রাইজ উপহার' : 'Interactive comedy magic and mystery tricks for kids'
    },
    {
      title: isBengali ? 'কার্টুন ফেস পেইন্টিং' : 'Artisanal Face Painting',
      desc: isBengali ? 'প্রিন্সেস ও সুপারহিরোদের রঙিন ফেস আর্ট' : 'Skin-safe face art & cartoon designs'
    },
    {
      title: isBengali ? 'চকোলেট ফাউন্টেন ও কাপকেক' : 'Chocolate Fountain & Sweet Bar',
      desc: isBengali ? 'গরম চকোলেট, মার্শমেলো ও পেস্ট্রির আনন্দ' : 'Belgian chocolate dips with cupcakes and treats'
    },
    {
      title: isBengali ? 'বেলুন আর্ট ও বাবল জোন' : 'Balloon Twisting & Bubble Zone',
      desc: isBengali ? 'রঙিন বেলুনের পুতুল ও বিশাল বুদবুদের খেলা' : 'Fun animal balloons and giant rainbow bubbles'
    }
  ];

  return (
    <div className="relative max-w-4xl mx-auto px-3 sm:px-6 py-8 space-y-12 sm:space-y-14 font-sans">

      {/* 1. Main Birthday Gala Banner */}
      <section className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FDF2F8] to-[#FFFDF9] rounded-3xl p-6 sm:p-12 border-4 border-[#B0305C] shadow-2xl overflow-hidden text-center">
        
        {/* Subtle Starlight Texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#B0305C 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        <div className="relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B0305C]/10 border border-[#B0305C]/40 text-xs font-serif font-bold text-[#B0305C] uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{quotes.invocation}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>

          {/* Guest VIP Badge */}
          {guestName && (
            <div className="my-4 mx-auto max-w-md text-center bg-white/90 border border-[#B0305C]/40 py-2.5 px-6 rounded-full shadow-sm">
              <span className="text-xs uppercase font-serif text-[#B0305C] font-semibold tracking-wider block">
                {isBengali ? 'সাদর আমন্ত্রণ' : 'You are Cordially Invited'}
              </span>
              <span className="text-lg sm:text-xl font-bold font-serif text-[#331A24]">
                {guestName}
              </span>
            </div>
          )}

          {/* Birthday Title */}
          <div className="my-4 space-y-1">
            <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-wide text-[#B0305C]">
              {isBengali ? quotes.nativeWeddingTitle : quotes.weddingTitle}
            </h1>
            <p className="text-xs sm:text-sm uppercase font-serif tracking-[0.25em] text-[#D4AF37] font-semibold">
              {template.cultureLabel}
            </p>
          </div>

          {/* Rhyme Banner */}
          <div className="my-4 max-w-lg mx-auto py-3 px-5 bg-white/90 rounded-2xl border border-[#D4AF37]/50 shadow-sm">
            <p className="text-xs sm:text-sm text-[#5E102E] whitespace-pre-line leading-relaxed italic font-serif">
              {quotes.verse}
            </p>
          </div>

          {/* Birthday Princess Portrait Card */}
          <div className="my-8 max-w-md mx-auto p-6 rounded-3xl bg-white border-2 border-[#D4AF37] shadow-xl text-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full overflow-hidden border-4 border-[#B0305C] shadow-lg mb-4 group relative">
              <img src={princess.image} alt={princess.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            <span className="px-4 py-1 rounded-full bg-[#B0305C] text-white font-serif text-xs font-bold inline-block shadow-sm">
              👑 {isBengali ? princess.nativeRole : princess.role} 👑
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#B0305C] mt-2">
              {isBengali ? princess.nativeName : princess.name}
            </h2>

            <div className="mt-3 p-3 bg-[#FDF2F8] rounded-xl border border-[#B0305C]/30 text-xs font-serif text-[#331A24] space-y-1">
              <p className="font-bold text-[#B0305C]">{isBengali ? princess.nativeParents : princess.parents}</p>
              <p className="opacity-90">{isBengali ? princess.nativeGrandparents : princess.grandparents}</p>
            </div>

            <p className="text-xs italic text-stone-600 mt-3 px-2 font-serif">
              "{isBengali ? princess.nativeAbout : princess.about}"
            </p>
          </div>

          {/* Date & Muhurat Highlight Pill */}
          <div className="my-6 inline-flex flex-wrap items-center justify-center gap-3">
            <div className="px-5 py-2.5 rounded-full bg-[#B0305C] text-white font-serif text-xs sm:text-sm font-bold shadow flex items-center gap-2">
              <Cake className="w-4 h-4 text-[#FCE7F3]" />
              <span>{isBengali ? template.targetDateNative : 'Sunday, 20th December 2026 | Cake Cutting: 7:00 PM'}</span>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-white border border-[#D4AF37] text-[#B0305C] font-serif text-xs sm:text-sm font-bold shadow-sm flex items-center gap-2">
              <span>📍</span>
              <span>{isBengali ? venue.nativeName : venue.name}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive Cake Cutting Countdown */}
      <CountdownTimer template={template} lang={lang} />

      {/* 3. 12-Month Milestone Journey (১ থেকে ১২ মাসের পথচলা) */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/60 shadow-lg text-center font-serif">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#B0305C]/10 border border-[#B0305C]/40 text-xs font-bold text-[#B0305C] uppercase tracking-widest">
            <PartyPopper className="w-3.5 h-3.5 text-[#B0305C]" />
            <span>{isBengali ? 'প্রথম ১২ মাসের মধুর স্মৃতিকথা' : '12 Months Milestone Journey'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#B0305C] mt-2">
            {isBengali ? 'রাজকন্যার এক বছরের রাজকীয় পথচলা' : 'From Sweet Giggles to Big Milestones'}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#FDF2F8] border border-[#B0305C]/30 shadow-sm flex flex-col justify-between"
            >
              <span className="w-8 h-8 mx-auto rounded-full bg-[#B0305C] text-white flex items-center justify-center font-bold text-xs shadow-sm mb-2">
                {idx + 1}
              </span>
              <p className="font-bold text-xs sm:text-sm text-[#B0305C]">{m.month}</p>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">{m.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Birthday Schedule & Fun Activities */}
      <section className="space-y-6" id="events">
        <div className="text-center space-y-2 font-serif">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#B0305C]/10 border border-[#B0305C]/40 text-xs font-bold text-[#B0305C] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isBengali ? 'জন্মদিনের আনন্দ অনুষ্ঠান' : 'Celebration Schedule'}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>
          <h2 className="text-3xl font-bold text-[#B0305C]">
            {isBengali ? 'আনন্দঘন মুহূর্ত ও সময়সূচি' : 'Party Timeline & Activities'}
          </h2>
        </div>

        <div className="space-y-4 font-serif">
          {events.map((evt, idx) => {
            const isCake = evt.key === 'cake_cutting';

            return (
              <div
                key={evt.id}
                className={`rounded-3xl p-5 sm:p-7 border-2 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between ${
                  isCake
                    ? 'bg-gradient-to-r from-[#FDF2F8] to-[#FFF0F5] border-[#B0305C]'
                    : 'bg-white border-[#D4AF37]/50'
                }`}
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                        isCake
                          ? 'bg-[#B0305C] text-white shadow-sm'
                          : 'bg-[#FDF2F8] text-[#B0305C] border border-[#B0305C]/40'
                      }`}
                    >
                      ০{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#B0305C]">
                        {isBengali ? evt.nativeTitle : evt.title}
                      </h3>
                      <p className="text-xs text-[#D4AF37] font-semibold">
                        {isBengali ? evt.nativeTagline : evt.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A3B32] leading-relaxed">
                    {isBengali ? evt.nativeDescription : evt.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {(isBengali ? evt.nativeHighlights : evt.highlights).map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-[11px] px-3 py-0.5 rounded-full bg-[#FFFDF9] text-[#B0305C] border border-[#B0305C]/30"
                      >
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-64 p-4 rounded-2xl bg-[#FFFDF9] border border-[#B0305C]/30 space-y-2 text-xs shrink-0">
                  <p className="font-bold text-[#B0305C]">📅 {isBengali ? evt.nativeDate : evt.date}</p>
                  <p className="text-[#4A3B32]">⏰ {isBengali ? evt.nativeTime : evt.time}</p>
                  <p className="text-[#4A3B32]">📍 {isBengali ? evt.nativeVenueName : evt.venueName}</p>
                  <p className="text-[#B0305C] pt-1 border-t border-[#B0305C]/30 font-medium">
                    👗 {isBengali ? evt.nativeDressCode : evt.dressCode}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Kids & Family Fun Activity Zones */}
      <section className="bg-gradient-to-b from-[#FFFDF9] to-[#FDF2F8] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] shadow-lg text-center font-serif">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#B0305C]/10 border border-[#B0305C]/40 text-xs font-bold text-[#B0305C] uppercase tracking-widest">
            <Wand2 className="w-3.5 h-3.5 text-[#B0305C]" />
            <span>{isBengali ? 'মজাদার খেলা ও আনন্দ কর্নার' : 'Kids Activity & Fun Zones'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#B0305C] mt-2">
            {isBengali ? 'ছোট ও বড় সবার জন্য অফুরন্ত বিনোদন' : 'Unlimited Entertainment For All'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
          {funZones.map((zone, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-2xl p-5 border border-[#B0305C]/30 shadow-sm space-y-1"
            >
              <h3 className="font-bold text-sm sm:text-base text-[#B0305C]">
                ✦ {zone.title}
              </h3>
              <p className="text-xs text-[#4A3B32] leading-relaxed">
                {zone.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Venue Location (আইটিসি সোনার, কলকাতা) */}
      <section className="rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] bg-white shadow-xl text-center font-serif" id="venue">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#B0305C]/10 border border-[#B0305C]/40 text-xs font-bold text-[#B0305C] uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-[#B0305C]" />
            <span>{isBengali ? 'পার্টি ভেন্যু ও দিকনির্দেশ' : 'Venue & Directions'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#B0305C] mt-2">
            {isBengali ? 'কীভাবে পৌঁছাবেন' : 'Party Location'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider inline-block bg-[#B0305C]/10 text-[#B0305C]">
                {isBengali ? 'প্রধান বলরুম ও লন' : 'Grand Ballroom & Lawns'}
              </span>
              <h3 className="text-2xl font-bold text-[#B0305C] mt-2">
                {isBengali ? venue.nativeName : venue.name}
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#4A3B32]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-[#B0305C] mt-0.5" />
                <p className="leading-relaxed">
                  {isBengali ? venue.nativeAddress : venue.address}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 shrink-0 text-[#D4AF37] mt-0.5" />
                <p>
                  <strong className="text-[#B0305C]">{isBengali ? 'ল্যান্ডমার্ক: ' : 'Landmark: '}</strong>
                  {isBengali ? venue.nativeLandmark : venue.landmark}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Smile className="w-5 h-5 shrink-0 text-[#D4AF37] mt-0.5" />
                <p>
                  <strong className="text-[#B0305C]">{isBengali ? 'পার্থিং: ' : 'Parking: '}</strong>
                  {isBengali ? venue.nativeParking : venue.parking}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md bg-[#B0305C] hover:opacity-90"
              >
                <Navigation className="w-4 h-4 text-[#FCE7F3]" />
                <span>{isBengali ? 'গুগল ম্যাপে দিকনির্দেশ' : 'Open in Google Maps'}</span>
              </a>

              <a
                href={`https://m.uber.com/ul/?action=setPickup&client_id=uber&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(venue.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#D4AF37] text-xs sm:text-sm font-semibold text-[#B0305C] bg-[#FFFDF9] hover:bg-[#FCE7F3]/40 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-[#B0305C]" />
                <span>{isBengali ? 'ক্যাব বুক করুন' : 'Book Ride'}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 h-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-inner relative">
            <iframe
              title="ITC Sonar Location"
              src={venue.embedUrl}
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-2 right-2 pointer-events-none bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-[11px] shadow border border-[#D4AF37]/40 text-[#B0305C] font-bold">
              {venue.name}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Birthday Wishes Wall */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/60 shadow-xl font-serif" id="wishes">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#B0305C]/10 border border-[#B0305C]/40 text-xs font-bold text-[#B0305C] uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>{isBengali ? 'ভালোবাসা ও শুভবার্তা' : 'Birthday Wishes'}</span>
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#B0305C] mt-2">
            {isBengali ? 'অনন্যাকে শুভকামনা জানান' : 'Wish Princess Ananya'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 rounded-2xl p-6 border border-[#B0305C]/30 bg-[#FDF2F8]/50 shadow-sm">
            <h3 className="font-bold text-base text-[#B0305C] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{isBengali ? 'জন্মদিনের শুভেচ্ছা বার্তা' : 'Send Birthday Wish'}</span>
            </h3>

            <form onSubmit={handleWishSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#B0305C] mb-1">
                  {isBengali ? 'আপনার শুভ নাম *' : 'Your Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  placeholder={isBengali ? 'যেমন: রোহিত ও পূজা' : 'e.g., Rohit & Pooja'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#B0305C]/40 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B0305C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#B0305C] mb-1">
                  {isBengali ? 'সম্পর্ক (ঐচ্ছিক)' : 'Relation (Optional)'}
                </label>
                <input
                  type="text"
                  value={relation}
                  onChange={e => setRelation(e.target.value)}
                  placeholder={isBengali ? 'যেমন: কাকা / পিসি / বন্ধু' : 'e.g., Uncle / Family Friend'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#B0305C]/40 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B0305C]"
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
                      className="text-[11px] px-2.5 py-1 rounded-full border border-[#B0305C]/30 bg-white text-[#B0305C] hover:bg-[#FDF2F8] transition-colors text-left"
                    >
                      + {q.slice(0, 24)}...
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#B0305C] mb-1">
                  {isBengali ? 'আপনার শুভেচ্ছা বার্তা *' : 'Your Warm Message *'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={isBengali ? 'অনন্যার জন্য শুভেচ্ছা বার্তা লিখুন...' : 'Write your loving birthday message...'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#B0305C]/40 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B0305C] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 bg-[#B0305C] hover:opacity-90"
              >
                <Send className="w-4 h-4 text-[#FCE7F3]" />
                <span>{isSubmitting ? (isBengali ? 'পাঠানো হচ্ছে...' : 'Submitting...') : (isBengali ? 'শুভেচ্ছা পাঠান' : 'Post Wish')}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {wishes.map(wish => (
              <div
                key={wish.id}
                className="bg-[#FFFDF9] rounded-2xl p-4 sm:p-5 border border-[#B0305C]/30 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#B0305C]">
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

                <div className="pt-2 flex items-center justify-between border-t border-[#B0305C]/20 text-xs">
                  <span className="text-[11px] italic text-[#B0305C]/80">
                    {isBengali ? 'ভালোবাসার শুভেচ্ছা' : 'Birthday love'}
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

      {/* 8. RSVP: Suman Bhadra */}
      <section className="rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] bg-[#FFFDF9] shadow-xl text-center font-serif" id="rsvp">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#B0305C]/10 border border-[#B0305C]/40 text-xs font-bold text-[#B0305C] uppercase tracking-widest mb-3">
          <span>{isBengali ? 'উপস্থিতি নিশ্চিতকরণ (RSVP)' : 'RSVP Desk'}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#B0305C]">
          {isBengali ? 'উপস্থিতি জানিয়ে সাহায্য করুন' : 'Confirm Your Attendance'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto my-6 text-left">
          {rsvpContacts.map((contact, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#B0305C]/40 shadow-md flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-base text-[#B0305C]">
                  {isBengali ? contact.nativeName : contact.name}
                </h3>
                <p className="text-xs text-[#D4AF37] font-semibold mb-4">
                  {isBengali ? contact.nativeRelation : contact.relation}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#B0305C]/20">
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
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold border border-[#D4AF37]/50 bg-[#FDF2F8] text-[#B0305C] hover:opacity-80 transition-opacity"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{contact.phone}</span>
                </a>

                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold border border-[#D4AF37]/50 bg-[#FDF2F8] text-[#B0305C] hover:opacity-80 transition-opacity truncate"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#B0305C]/10 via-[#D4AF37]/20 to-[#B0305C]/10 border border-[#D4AF37] max-w-lg mx-auto">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#B0305C]">
            {isBengali ? '॥ ভালোবাসার প্রতীক্ষায় ॥' : '॥ Awaiting Your Smiles ॥'}
          </p>
          <p className="text-lg sm:text-xl font-bold mt-1 text-[#B0305C]">
            {isBengali ? quotes.nativeFamilySignoff : quotes.familySignoff}
          </p>
        </div>
      </section>

      {/* 9. Personalized Invite Link Tool & Footer */}
      <footer className="pt-8 pb-24 sm:pb-12 text-center space-y-8 font-serif">
        <div className="p-6 sm:p-8 bg-white rounded-3xl border-2 border-[#D4AF37]/60 shadow-lg max-w-lg mx-auto text-left">
          <div className="flex items-center gap-2 mb-2 text-[#B0305C]">
            <Share2 className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-bold text-sm sm:text-base">
              {isBengali ? 'অতিথির নাম লিখে জন্মদিনের লিংক পাঠান' : 'Create Personalized Guest Invite Link'}
            </h4>
          </div>

          <form onSubmit={handleGenerateCustomLink} className="flex gap-2">
            <input
              type="text"
              value={customGuest}
              onChange={e => setCustomGuest(e.target.value)}
              placeholder={isBengali ? 'যেমন: সুভাষদা ও পরিবার' : 'e.g., Uncle Joy & Family'}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#B0305C]/40 focus:outline-none focus:ring-1 focus:ring-[#B0305C]"
            />
            <button
              type="submit"
              className="px-4 py-2 text-white text-xs font-semibold rounded-xl bg-[#B0305C] hover:opacity-90 transition-opacity"
            >
              {isBengali ? 'লিংক তৈরি' : 'Generate'}
            </button>
          </form>

          {generatedLink && (
            <div className="mt-3 p-2.5 rounded-xl bg-[#FDF2F8] border border-[#B0305C]/30 flex items-center justify-between gap-2 text-xs">
              <span className="truncate font-mono text-[11px] text-[#B0305C]">
                {generatedLink}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  alert(isBengali ? 'ব্যক্তিগত লিংক কপি করা হয়েছে!' : 'Personalized link copied!');
                }}
                className="px-3 py-1 text-white rounded-lg shrink-0 text-[11px] bg-[#B0305C]"
              >
                {isBengali ? 'কপি' : 'Copy'}
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleCopyMainUrl}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D4AF37] bg-white text-xs font-bold text-[#B0305C] hover:bg-[#FDF2F8] transition-colors shadow-sm"
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
          <p className="text-xs font-bold text-[#B0305C]">
            {isBengali ? quotes.nativeFamilySignoff : quotes.familySignoff}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
            <span className="text-[#4A3B32]">
              {isBengali ? 'যোগাযোগ ও সমন্বয়:' : 'Inquiries & Coordination:'}{' '}
              <strong className="text-[#B0305C]">Suman Bhadra</strong>
            </span>
            <a
              href="tel:+916291898703"
              className="px-3 py-1 rounded-full border border-[#D4AF37]/60 bg-[#FDF2F8] text-[11px] font-semibold text-[#B0305C] hover:opacity-80 flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3" /> +91 6291898703
            </a>
            <a
              href="mailto:bhadrasuman04@gmail.com"
              className="px-3 py-1 rounded-full border border-[#D4AF37]/60 bg-[#FDF2F8] text-[11px] font-semibold text-[#B0305C] hover:opacity-80 flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3" /> bhadrasuman04@gmail.com
            </a>
          </div>

          <p className="text-[11px] text-stone-500 pt-2 font-sans">
            Crafted with joy on UtsavPatra.com
          </p>
        </div>
      </footer>

    </div>
  );
};
