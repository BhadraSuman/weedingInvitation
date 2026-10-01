import React, { useState, useEffect } from 'react';
import { CulturalTemplate, Language, GuestWish } from '../../types/wedding';
import { GaneshaIcon, MaurIcon, MadhubaniDivider } from '../CulturalMotifs';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Send,
  Heart,
  Phone,
  Mail,
  MessageSquare,
  Navigation,
  ExternalLink,
  Share2,
  Copy,
  Check,
  Music,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BihariMarwariWeddingViewProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
}

// Convert numbers to Devanagari numerals
const toDevanagari = (num: number): string => {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return num
    .toString()
    .padStart(2, '0')
    .split('')
    .map(d => devanagariDigits[parseInt(d, 10)] || d)
    .join('');
};

export const BihariMarwariWeddingView: React.FC<BihariMarwariWeddingViewProps> = ({
  template,
  lang,
  guestName,
}) => {
  const { groom, bride, events, quotes, venue, rsvpContacts } = template;
  const isHindi = lang === 'native';

  // Countdown state
  const targetDate = new Date(template.targetDate).getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

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

  const quickWishes = isHindi ? template.quickWishes.native : template.quickWishes.en;

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: GuestWish = {
      id: `bm-wish-${Date.now()}`,
      name: authorName.trim(),
      relation: relation.trim() || undefined,
      message: message.trim(),
      timestamp: isHindi ? 'अभी-अभी' : 'Just now',
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
          colors: ['#D4AF37', '#800020', '#E65100', '#FBE8A6']
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
    const text = isHindi
      ? `सादर प्रणाम! ${groom.name} एवं ${bride.name} के मांगलिक विवाह समारोह में सपरिवार उपस्थिति की पुष्टि करते हैं। हार्दिक शुभकामनाएं!`
      : `Namaskar! Delighted to confirm our attendance for ${groom.name} & ${bride.name}'s wedding celebration. Looking forward!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const getCalendarUrl = (evt: typeof events[0]) => {
    const title = isHindi ? evt.nativeTitle : evt.title;
    const desc = isHindi ? evt.nativeDescription : evt.description;
    const vName = isHindi ? evt.nativeVenueName : evt.venueName;
    const start = evt.calendarTimes?.start || '20261212T130000Z';
    const end = evt.calendarTimes?.end || '20261212T190000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(vName)}`;
  };

  return (
    <div className="relative max-w-5xl mx-auto px-3 sm:px-6 py-8 space-y-12 sm:space-y-16">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: ROYAL HAVELI / RAJWADA PALACE ENTRANCE                  */}
      {/* ========================================================================= */}
      <section className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-[#D4AF37] bg-gradient-to-b from-[#38000B] via-[#660018] to-[#2B0008] text-white p-6 sm:p-12 text-center">
        
        {/* Sacred Rajasthani Jaali Lattice Texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#D4AF37 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#D4AF37]/20 blur-3xl rounded-full pointer-events-none" />

        {/* Ganesha Stuti & Auspicious Invocation */}
        <div className="relative z-10 max-w-xl mx-auto mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-full bg-gradient-to-b from-[#520014] to-[#240007] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <GaneshaIcon className="w-10 h-10 sm:w-12 sm:h-12" color="#FBE8A6" />
          </div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-[#D4AF37] text-sm">卐</span>
            <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              {quotes.invocation}
            </p>
            <span className="text-[#D4AF37] text-sm">卐</span>
          </div>

          <div className="my-3 py-3 px-4 sm:px-6 bg-[#240007]/80 rounded-2xl border border-[#D4AF37]/40 shadow-inner">
            <p className="font-serif text-xs sm:text-sm text-[#FBE8A6] whitespace-pre-line leading-relaxed italic">
              {quotes.verse}
            </p>
          </div>
        </div>

        {/* VIP Atithi Badge if Guest Name is present */}
        {guestName && (
          <div className="relative z-10 inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37]/20 via-[#38000B]/90 to-[#D4AF37]/20 border border-[#D4AF37] mb-6 shadow-lg backdrop-blur-sm">
            <span className="text-[11px] uppercase font-serif tracking-[0.2em] text-[#D4AF37] block font-semibold">
              {isHindi ? '॥ सादर आमंत्रण ॥' : '॥ Cordially Invited ॥'}
            </span>
            <span className="text-xl sm:text-2xl font-bold font-serif text-white">
              {guestName}
            </span>
            <span className="text-[10px] text-[#FBE8A6]/80 block font-serif mt-0.5">
              {isHindi ? 'सपरिवार सादर आमंत्रित हैं' : 'Invited with Family'}
            </span>
          </div>
        )}

        {/* Traditional Maur (मौर) Emblem */}
        <div className="relative z-10 flex flex-col items-center justify-center my-3">
          <MaurIcon className="w-20 h-20 sm:w-24 sm:h-24 transform hover:scale-105 transition-transform drop-shadow-[0_5px_15px_rgba(212,175,55,0.4)]" color="#D4AF37" />
          <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-serif mt-1 font-semibold">
            {isHindi ? 'पावन मौर एवं तोरण' : 'Sacred Maur & Toran'}
          </span>
        </div>

        {/* Grand Wedding Title */}
        <div className="relative z-10 space-y-2 mb-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-serif tracking-wider text-[#FBE8A6] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            {isHindi ? quotes.nativeWeddingTitle : quotes.weddingTitle}
          </h1>
          <p className="text-xs sm:text-sm uppercase font-serif tracking-[0.3em] text-[#D4AF37] font-semibold">
            {isHindi ? 'बिहारी एवं मारवाड़ी पावन विवाह संस्कार' : 'Bihari & Marwari Royal Wedding Celebration'}
          </p>
        </div>

        <MadhubaniDivider className="relative z-10 max-w-sm mx-auto my-4" color="#D4AF37" />

        {/* The Couple Names & Gotra/Lineage */}
        <div className="relative z-10 my-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          
          {/* Groom Header Card */}
          <div className="text-center sm:text-right p-4 rounded-2xl bg-[#240007]/60 border border-[#D4AF37]/30 sm:border-0 sm:bg-transparent sm:p-0">
            <span className="text-xs uppercase tracking-wider text-[#D4AF37] block font-serif font-semibold">
              {isHindi ? groom.nativeRole : groom.role}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#FBE8A6] mt-0.5">
              {isHindi ? groom.nativeName : groom.name}
            </h2>
            <p className="text-xs font-serif text-stone-200 mt-1 max-w-xs sm:ml-auto">
              {isHindi ? groom.nativeParents : groom.parents}
            </p>
            <p className="text-[11px] font-serif text-[#D4AF37] opacity-90">
              {isHindi ? groom.nativeGrandparents : groom.grandparents}
            </p>
          </div>

          {/* Regal 'Sang' / 'Weds' Medallion */}
          <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37] bg-gradient-to-br from-[#800020] to-[#240007] flex items-center justify-center font-serif text-xl font-bold text-[#FBE8A6] shadow-[0_0_15px_rgba(212,175,55,0.4)] shrink-0">
            {isHindi ? 'संग' : 'weds'}
          </div>

          {/* Bride Header Card */}
          <div className="text-center sm:text-left p-4 rounded-2xl bg-[#240007]/60 border border-[#D4AF37]/30 sm:border-0 sm:bg-transparent sm:p-0">
            <span className="text-xs uppercase tracking-wider text-[#D4AF37] block font-serif font-semibold">
              {isHindi ? bride.nativeRole : bride.role}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#FBE8A6] mt-0.5">
              {isHindi ? bride.nativeName : bride.name}
            </h2>
            <p className="text-xs font-serif text-stone-200 mt-1 max-w-xs sm:mr-auto">
              {isHindi ? bride.nativeParents : bride.parents}
            </p>
            <p className="text-[11px] font-serif text-[#D4AF37] opacity-90">
              {isHindi ? bride.nativeGrandparents : bride.grandparents}
            </p>
          </div>

        </div>

        {/* Date & Muhurat Snapshot Badges */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mt-6 pt-4 border-t border-[#D4AF37]/30">
          <div className="px-5 py-2.5 rounded-full bg-[#240007]/90 border border-[#D4AF37] text-xs sm:text-sm font-serif text-[#FBE8A6] shadow-sm flex items-center gap-2">
            <span>📅</span>
            <span>{isHindi ? template.targetDateNative : 'Saturday, 12th December 2026 | Lagna: 09:15 PM'}</span>
          </div>
          <div className="px-5 py-2.5 rounded-full bg-[#240007]/90 border border-[#D4AF37] text-xs sm:text-sm font-serif text-[#FBE8A6] shadow-sm flex items-center gap-2">
            <span>📍</span>
            <span>{isHindi ? venue.nativeName : venue.name}</span>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. ROYAL MEDALLION COUNTDOWN: PURE DEVANAGARI NUMERALS                     */}
      {/* ========================================================================= */}
      <section className="relative rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/70 bg-gradient-to-r from-[#4A0012] via-[#6E001B] to-[#4A0012] text-white shadow-xl text-center overflow-hidden">
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#240007] border border-[#D4AF37]/60 text-xs font-serif text-[#FBE8A6] uppercase tracking-widest font-semibold mb-3">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isHindi ? 'शुभ लग्न की प्रतीक्षा' : 'Countdown to Sacred Union'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#FBE8A6]">
            {isHindi ? 'पावन विवाह में शेष समय' : 'Counting Down to Our Auspicious Day'}
          </h2>

          <MadhubaniDivider className="max-w-xs mx-auto my-3" color="#D4AF37" />

          {/* 4 Gilded Medallion Dials */}
          <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-lg mx-auto mt-6">
            {[
              {
                label: isHindi ? 'दिन' : 'Days',
                value: isHindi ? toDevanagari(timeLeft.days) : timeLeft.days.toString().padStart(2, '0')
              },
              {
                label: isHindi ? 'घंटे' : 'Hours',
                value: isHindi ? toDevanagari(timeLeft.hours) : timeLeft.hours.toString().padStart(2, '0')
              },
              {
                label: isHindi ? 'मिनट' : 'Minutes',
                value: isHindi ? toDevanagari(timeLeft.minutes) : timeLeft.minutes.toString().padStart(2, '0')
              },
              {
                label: isHindi ? 'सेकंड' : 'Seconds',
                value: isHindi ? toDevanagari(timeLeft.seconds) : timeLeft.seconds.toString().padStart(2, '0')
              },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-3 sm:p-5 bg-gradient-to-b from-[#240007] to-[#38000B] border-2 border-[#D4AF37] shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition-transform"
              >
                <span className="font-serif text-2xl sm:text-4xl font-extrabold text-[#FBE8A6] drop-shadow">
                  {unit.value}
                </span>
                <span className="text-[11px] sm:text-xs uppercase font-serif tracking-wider text-[#D4AF37] font-semibold mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs sm:text-sm font-serif text-[#FBE8A6]/90">
            {isHindi
              ? '॥ शनिवार, १२ दिसम्बर २०२६ | पटना, बिहार ॥'
              : '॥ Saturday, 12th December 2026 | Patna, Bihar ॥'}
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE 5 ROYAL FESTIVAL EVENT PASSES (शाही निमंत्रण प्रवेश पत्र)          */}
      {/* ========================================================================= */}
      <section className="space-y-6" id="events">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#800020]/10 border border-[#D4AF37] text-xs font-serif text-[#800020] uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isHindi ? 'मांगलिक कार्यक्रम एवं रस्में' : 'Auspicious Rituals & Schedule'}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#800020]">
            {isHindi ? 'पावन विवाह उत्सव के ५ मुख्य पर्व' : 'Five Grand Festive Celebrations'}
          </h2>
          <p className="text-xs text-[#800020]/80 font-serif max-w-lg mx-auto">
            {isHindi
              ? 'तिलक, पवित्र मटकोर, महिला संगीत-घूमर, तोरण द्वार विवाह एवं शाही बहूभोज'
              : 'Tilak, Sacred Matkor, Mahila Sangeet & Ghoomar, Toran Vivah and Bahu Bhoj'}
          </p>
          <MadhubaniDivider className="max-w-xs mx-auto my-3" color="#D4AF37" />
        </div>

        {/* 5 Distinctly Themed Royal Event Passes */}
        <div className="space-y-6">
          {events.map((evt, idx) => {
            const isMainVivah = evt.key === 'baraat_vivah';
            const passNumber = toDevanagari(idx + 1);

            return (
              <div
                key={evt.id}
                className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 border-2 shadow-md hover:shadow-2xl overflow-hidden ${
                  isMainVivah
                    ? 'bg-gradient-to-r from-[#38000B] via-[#660018] to-[#2B0008] text-white border-[#D4AF37]'
                    : 'bg-white border-[#D4AF37]/50 text-[#291417]'
                }`}
              >
                {/* Visual Pass Badge */}
                {isMainVivah && (
                  <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#38000B] font-serif font-extrabold text-[10px] sm:text-xs uppercase px-4 py-1 rounded-bl-2xl tracking-wider shadow">
                    ⭐ {isHindi ? 'मुख्य विवाह संस्कार' : 'Main Sacred Ceremony'} ⭐
                  </div>
                )}

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  
                  {/* Left Column: Details & Highlights */}
                  <div className="space-y-3 max-w-xl">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-9 h-9 rounded-full font-serif font-bold text-xs flex items-center justify-center shrink-0 border ${
                          isMainVivah
                            ? 'bg-[#D4AF37] text-[#38000B] border-[#FBE8A6]'
                            : 'bg-[#800020] text-[#FBE8A6] border-[#D4AF37]'
                        }`}
                      >
                        {isHindi ? passNumber : `0${idx + 1}`}
                      </span>

                      <div>
                        <h3 className={`text-xl sm:text-2xl font-bold font-serif ${isMainVivah ? 'text-[#FBE8A6]' : 'text-[#800020]'}`}>
                          {isHindi ? evt.nativeTitle : evt.title}
                        </h3>
                        <p className={`text-xs font-serif italic font-semibold ${isMainVivah ? 'text-[#D4AF37]' : 'text-[#800020]/80'}`}>
                          {isHindi ? evt.nativeTagline : evt.tagline}
                        </p>
                      </div>
                    </div>

                    <p className={`text-xs sm:text-sm font-serif leading-relaxed ${isMainVivah ? 'text-stone-200' : 'text-[#4A3B32]'}`}>
                      {isHindi ? evt.nativeDescription : evt.description}
                    </p>

                    {/* Highlights Chips */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {(isHindi ? evt.nativeHighlights : evt.highlights).map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className={`text-[11px] px-3 py-1 rounded-full font-serif border ${
                            isMainVivah
                              ? 'bg-[#240007]/80 text-[#FBE8A6] border-[#D4AF37]/50'
                              : 'bg-[#FCF8F2] text-[#800020] border-[#D4AF37]/40'
                          }`}
                        >
                          ✦ {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Time, Venue & Action Pass */}
                  <div
                    className={`w-full lg:w-72 p-5 rounded-2xl border space-y-2.5 text-xs font-serif shrink-0 ${
                      isMainVivah
                        ? 'bg-[#240007]/90 border-[#D4AF37]/50 text-white'
                        : 'bg-[#FCF8F2] border-[#D4AF37]/40 text-[#291417]'
                    }`}
                  >
                    <p className={`font-bold ${isMainVivah ? 'text-[#FBE8A6]' : 'text-[#800020]'}`}>
                      📅 {isHindi ? evt.nativeDate : evt.date}
                    </p>
                    <p className="flex items-center gap-1.5 opacity-90">
                      <span>⏰</span>
                      <span>{isHindi ? evt.nativeTime : evt.time}</span>
                    </p>
                    <p className="flex items-start gap-1.5 opacity-90">
                      <span>📍</span>
                      <span className="leading-tight">{isHindi ? evt.nativeVenueName : evt.venueName}</span>
                    </p>
                    <p className={`pt-2 border-t ${isMainVivah ? 'border-[#D4AF37]/30 text-[#D4AF37]' : 'border-[#D4AF37]/30 text-[#800020]'} font-semibold`}>
                      👗 {isHindi ? evt.nativeDressCode : evt.dressCode}
                    </p>

                    {/* Add to Calendar Button */}
                    <a
                      href={getCalendarUrl(evt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-2 w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-[11px] font-bold transition-all shadow-sm ${
                        isMainVivah
                          ? 'bg-[#D4AF37] hover:bg-[#FBE8A6] text-[#38000B]'
                          : 'bg-[#800020] hover:bg-[#520014] text-white'
                      }`}
                    >
                      <Calendar className="w-3 h-3" />
                      <span>{isHindi ? 'कैलेंडर में जोड़ें' : 'Add to Calendar'}</span>
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. VAR-VADHU JHAROKHA DARSHAN (झरोखा दर्शन एवं कुल-परंपरा)                 */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/60 shadow-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#800020]/10 border border-[#D4AF37] text-xs font-serif text-[#800020] uppercase tracking-widest font-bold">
            <span>{isHindi ? 'वर-वधू परिचय एवं कुल-परंपरा' : 'Bride & Groom Heritage'}</span>
          </div>
          <h2 className="text-3xl font-bold font-serif text-[#800020] mt-2">
            {isHindi ? 'झरोखा दर्शन — दो कुलों का मंगल संगम' : 'The Auspicious Union of Two Families'}
          </h2>
          <MadhubaniDivider className="max-w-xs mx-auto my-2" color="#D4AF37" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          
          {/* Groom Card */}
          <div className="text-center p-6 rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FCF8F2] border-2 border-[#D4AF37]/50 shadow-md flex flex-col justify-between">
            <div>
              {/* Jharokha Arched Frame for Groom Photo */}
              <div className="relative w-44 h-56 mx-auto mb-4 overflow-hidden rounded-t-[3.5rem] rounded-b-2xl border-4 border-[#D4AF37] shadow-xl group">
                <img src={groom.image} alt={groom.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-2 inset-x-0 text-center text-[10px] uppercase font-serif tracking-widest text-[#FBE8A6] font-bold">
                  {isHindi ? groom.nativeRole : groom.role}
                </span>
              </div>

              <h3 className="text-2xl font-bold font-serif text-[#800020]">
                {isHindi ? groom.nativeName : groom.name}
              </h3>
              <p className="text-xs text-[#D4AF37] font-serif font-bold mt-0.5">
                {groom.location}
              </p>

              <div className="my-4 p-3.5 bg-white rounded-2xl border border-[#D4AF37]/30 text-xs text-[#4A3B32] space-y-1.5 font-serif shadow-sm">
                <p className="font-bold text-[#800020]">{isHindi ? groom.nativeParents : groom.parents}</p>
                <p className="opacity-90">{isHindi ? groom.nativeGrandparents : groom.grandparents}</p>
              </div>
            </div>

            <p className="text-xs italic text-stone-600 font-serif px-2">
              "{isHindi ? groom.nativeAbout : groom.about}"
            </p>
          </div>

          {/* Bride Card */}
          <div className="text-center p-6 rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FCF8F2] border-2 border-[#D4AF37]/50 shadow-md flex flex-col justify-between">
            <div>
              {/* Jharokha Arched Frame for Bride Photo */}
              <div className="relative w-44 h-56 mx-auto mb-4 overflow-hidden rounded-t-[3.5rem] rounded-b-2xl border-4 border-[#D4AF37] shadow-xl group">
                <img src={bride.image} alt={bride.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-2 inset-x-0 text-center text-[10px] uppercase font-serif tracking-widest text-[#FBE8A6] font-bold">
                  {isHindi ? bride.nativeRole : bride.role}
                </span>
              </div>

              <h3 className="text-2xl font-bold font-serif text-[#800020]">
                {isHindi ? bride.nativeName : bride.name}
              </h3>
              <p className="text-xs text-[#D4AF37] font-serif font-bold mt-0.5">
                {bride.location}
              </p>

              <div className="my-4 p-3.5 bg-white rounded-2xl border border-[#D4AF37]/30 text-xs text-[#4A3B32] space-y-1.5 font-serif shadow-sm">
                <p className="font-bold text-[#800020]">{isHindi ? bride.nativeParents : bride.parents}</p>
                <p className="opacity-90">{isHindi ? bride.nativeGrandparents : bride.grandparents}</p>
              </div>
            </div>

            <p className="text-xs italic text-stone-600 font-serif px-2">
              "{isHindi ? bride.nativeAbout : bride.about}"
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ROYAL VENUE (मांगलिक स्थल: होटल मौर्या, पटना)                            */}
      {/* ========================================================================= */}
      <section className="rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] bg-white shadow-xl" id="venue">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#800020]/10 border border-[#D4AF37] text-xs font-serif text-[#800020] uppercase tracking-widest font-bold">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isHindi ? 'मांगलिक स्थल एवं दिशा-निर्देश' : 'Venue & Directions'}</span>
          </div>

          <h2 className="text-3xl font-bold font-serif text-[#800020] mt-2">
            {isHindi ? 'विवाह स्थल एवं सुगम मार्ग' : 'Celebration Grounds'}
          </h2>
          <MadhubaniDivider className="max-w-xs mx-auto my-2" color="#D4AF37" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Venue Info */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="px-3 py-1 font-serif text-xs font-bold rounded-full uppercase tracking-wider inline-block bg-[#800020]/10 text-[#800020]">
                {isHindi ? 'मुख्य विवाह प्रांगण' : 'Grand Wedding Grounds'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#800020] mt-2">
                {isHindi ? venue.nativeName : venue.name}
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#4A3B32] font-serif">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-[#800020] mt-0.5" />
                <p className="leading-relaxed">
                  {isHindi ? venue.nativeAddress : venue.address}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 shrink-0 text-[#D4AF37] mt-0.5" />
                <p>
                  <strong className="text-[#800020]">{isHindi ? 'पहचान चिन्ह: ' : 'Landmark: '}</strong>
                  {isHindi ? venue.nativeLandmark : venue.landmark}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 shrink-0 text-[#D4AF37] mt-0.5" />
                <p>
                  <strong className="text-[#800020]">{isHindi ? 'पार्किंग: ' : 'Parking: '}</strong>
                  {isHindi ? venue.nativeParking : venue.parking}
                </p>
              </div>
            </div>

            {/* Navigation Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-white font-serif font-bold text-xs sm:text-sm rounded-xl shadow-md transition-opacity hover:opacity-90 bg-[#800020]"
              >
                <Navigation className="w-4 h-4 text-[#FBE8A6]" />
                <span>{isHindi ? 'गूगल मैप्स पर देखें' : 'Open in Google Maps'}</span>
              </a>

              <a
                href={`https://m.uber.com/ul/?action=setPickup&client_id=uber&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(venue.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#D4AF37] text-xs sm:text-sm font-semibold text-[#800020] bg-[#FCF8F2] hover:bg-[#FBE8A6]/30 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-[#800020]" />
                <span>{isHindi ? 'कैब बुक करें' : 'Book Ride'}</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-7 h-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-inner relative">
            <iframe
              title="Hotel Maurya Patna Wedding Venue"
              src={venue.embedUrl}
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-2 right-2 pointer-events-none bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-[11px] font-serif shadow border border-[#D4AF37]/40 text-[#800020] font-bold">
              {venue.name}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SHUBHKAMNAYEIN & BLESSINGS GUESTBOOK (शुभकामना मंडप)                    */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/60 shadow-xl" id="wishes">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#800020]/10 border border-[#D4AF37] text-xs font-serif text-[#800020] uppercase tracking-widest font-bold">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>{isHindi ? 'आशीर्वाद एवं शुभकामनाएं' : 'Digital Guestbook & Blessings'}</span>
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
          </div>

          <h2 className="text-3xl font-bold font-serif text-[#800020] mt-2">
            {isHindi ? 'संदीप एवं प्रिया को शुभाशीर्वाद दें' : 'Shower Your Loving Blessings'}
          </h2>
          <p className="text-xs text-[#4A3B32] font-serif max-w-md mx-auto mt-1">
            {isHindi
              ? 'वर-वधू के नव दांपत्य जीवन हेतु अपने मंगल आशीष एवं शुभकामनाएं प्रेषित करें।'
              : 'Leave your loving blessings and heartfelt words for the couple.'}
          </p>
          <MadhubaniDivider className="max-w-xs mx-auto my-2" color="#D4AF37" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Post Wish Form */}
          <div className="lg:col-span-5 rounded-2xl p-6 border border-[#D4AF37]/50 bg-[#FCF8F2] shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#800020] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{isHindi ? 'शुभकामना संदेश भेजें' : 'Write Your Blessing'}</span>
            </h3>

            <form onSubmit={handleWishSubmit} className="space-y-4 font-serif">
              <div>
                <label className="block text-xs font-bold text-[#800020] mb-1">
                  {isHindi ? 'आपका शुभ नाम *' : 'Your Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  placeholder={isHindi ? 'जैसे: राहुल अग्रवाल' : 'e.g., Rahul Agarwal'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/60 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#800020] mb-1">
                  {isHindi ? 'संबंध / शहर (वैकल्पिक)' : 'Relation / City (Optional)'}
                </label>
                <input
                  type="text"
                  value={relation}
                  onChange={e => setRelation(e.target.value)}
                  placeholder={isHindi ? 'जैसे: मित्र / परिवारजन' : 'e.g., College Friend / Patna'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/60 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                />
              </div>

              {/* Quick Inspiration Chips */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#D4AF37] font-bold mb-1.5">
                  {isHindi ? 'सुझावित संदेश:' : 'Quick Ideas:'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {quickWishes.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setMessage(q)}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-[#D4AF37]/40 bg-white text-[#800020] hover:bg-[#FBE8A6]/40 transition-colors text-left"
                    >
                      + {q.slice(0, 24)}...
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#800020] mb-1">
                  {isHindi ? 'आपका शुभकामना संदेश *' : 'Your Warm Message *'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={isHindi ? 'अपने मंगल आशीष एवं शुभकामनाएं यहां लिखें...' : 'Write your loving message here...'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/60 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 text-white rounded-xl font-serif font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 bg-[#800020] hover:bg-[#520014]"
              >
                <Send className="w-4 h-4 text-[#FBE8A6]" />
                <span>{isSubmitting ? (isHindi ? 'संदेश भेजा जा रहा है...' : 'Submitting...') : (isHindi ? 'शुभकामनाएं भेजें' : 'Post Blessings')}</span>
              </button>
            </form>
          </div>

          {/* Wishes Feed */}
          <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {wishes.map(wish => (
              <div
                key={wish.id}
                className="bg-[#FCF8F2] rounded-2xl p-4 sm:p-5 border border-[#D4AF37]/40 shadow-sm hover:shadow-md transition-all font-serif"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#800020]">
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
                  <span className="text-[11px] italic text-[#800020]/80">
                    {isHindi ? 'मंगल आशीष' : 'Sacred blessing'}
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

      {/* ========================================================================= */}
      {/* 7. RSVP DESK: SUMAN BHADRA COORDINATION (अतिथि सत्कार एवं उपस्थिति)      */}
      {/* ========================================================================= */}
      <section className="rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] bg-gradient-to-b from-[#FFFDF9] via-[#FCF8F2] to-[#FFFDF9] shadow-xl text-center" id="rsvp">
        
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#800020]/10 border border-[#D4AF37] text-xs font-serif text-[#800020] uppercase tracking-widest font-bold mb-3">
          <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{isHindi ? 'उपस्थिति की पुष्टि (RSVP Desk)' : 'RSVP & Guest Relations'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#800020]">
          {isHindi ? 'सादर आमंत्रण एवं उपस्थिति' : 'Confirm Your Presence'}
        </h2>
        <p className="text-xs sm:text-sm font-serif text-[#4A3B32] max-w-md mx-auto mt-1">
          {isHindi
            ? 'विवाह में आपके स्वागत एवं सुगम आतिथ्य सत्कार की व्यवस्था हेतु कृपया अपनी उपस्थिति अवश्य बताएं।'
            : 'To help us prepare for your gracious hosting and dining arrangements, please confirm your attendance.'}
        </p>
        <MadhubaniDivider className="max-w-xs mx-auto my-3" color="#D4AF37" />

        {/* Contacts Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto my-6 text-left">
          {rsvpContacts.map((contact, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#D4AF37]/50 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#800020]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#800020] mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#800020]">
                  {isHindi ? contact.nativeName : contact.name}
                </h3>
                <p className="text-xs font-serif text-[#D4AF37] font-semibold mb-4">
                  {isHindi ? contact.nativeRelation : contact.relation}
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
                  <span>{isHindi ? 'व्हाट्सएप पर सूचित करें' : 'Confirm on WhatsApp'}</span>
                </a>

                <a
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-serif font-semibold border border-[#D4AF37]/50 bg-[#FCF8F2] text-[#800020] hover:bg-[#FBE8A6]/40 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{contact.phone}</span>
                </a>

                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-serif font-semibold border border-[#D4AF37]/50 bg-[#FCF8F2] text-[#800020] hover:bg-[#FBE8A6]/40 transition-colors truncate"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Traditional Family Signoff Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#800020]/10 via-[#D4AF37]/20 to-[#800020]/10 border border-[#D4AF37] max-w-lg mx-auto">
          <p className="text-xs uppercase tracking-widest font-semibold font-serif text-[#800020]">
            {isHindi ? '॥ सस्नेह उपस्थिति की प्रतीक्षा में ॥' : '॥ Awaiting Your Gracious Presence ॥'}
          </p>
          <p className="text-lg sm:text-xl font-bold mt-1 font-serif text-[#800020]">
            {isHindi ? quotes.nativeFamilySignoff : quotes.familySignoff}
          </p>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 8. PERSONALIZED LINK GENERATOR & FOOTER (शाही निमंत्रण लिंक)              */}
      {/* ========================================================================= */}
      <footer className="pt-8 pb-24 sm:pb-12 text-center space-y-8 font-serif">
        
        {/* Tool to generate custom guest invite links */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border-2 border-[#D4AF37]/60 shadow-lg max-w-lg mx-auto text-left">
          <div className="flex items-center gap-2 mb-2 text-[#800020]">
            <Share2 className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-bold text-sm sm:text-base">
              {isHindi ? 'अतिथि के नाम का विशेष डिजिटल निमंत्रण बनाएं' : 'Create Personalized Guest Invite Link'}
            </h4>
          </div>
          <p className="text-xs text-[#4A3B32] mb-3 leading-relaxed">
            {isHindi
              ? 'अतिथि का नाम लिखकर लिंक तैयार करें। लिंक खोलने पर उनका नाम आदर सहित प्रदर्शित होगा।'
              : 'Enter a guest name to generate a tailored invitation link with their name.'}
          </p>

          <form onSubmit={handleGenerateCustomLink} className="flex gap-2">
            <input
              type="text"
              value={customGuest}
              onChange={e => setCustomGuest(e.target.value)}
              placeholder={isHindi ? 'जैसे: आदरणीय शर्मा जी एवं परिवार' : 'e.g., Sharma Family'}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#D4AF37]/60 focus:outline-none focus:ring-1 focus:ring-[#800020]"
            />
            <button
              type="submit"
              className="px-4 py-2 text-white text-xs font-semibold rounded-xl bg-[#800020] hover:bg-[#520014] transition-colors"
            >
              {isHindi ? 'लिंक बनाएं' : 'Generate'}
            </button>
          </form>

          {generatedLink && (
            <div className="mt-3 p-2.5 rounded-xl bg-[#FCF8F2] border border-[#D4AF37]/40 flex items-center justify-between gap-2 text-xs">
              <span className="truncate font-mono text-[11px] text-[#800020]">
                {generatedLink}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  alert(isHindi ? 'निमंत्रण लिंक कॉपी हो गया!' : 'Personalized link copied!');
                }}
                className="px-3 py-1 text-white rounded-lg shrink-0 text-[11px] bg-[#800020] hover:bg-[#520014]"
              >
                {isHindi ? 'कॉपी करें' : 'Copy'}
              </button>
            </div>
          )}
        </div>

        {/* Copy General Website Link */}
        <div className="flex justify-center">
          <button
            onClick={handleCopyMainUrl}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D4AF37] bg-white text-xs font-bold text-[#800020] hover:bg-[#FCF8F2] transition-colors shadow-sm"
          >
            {copiedMain ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">{isHindi ? 'कॉपी संपन्न!' : 'Link Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#D4AF37]" />
                <span>{isHindi ? 'विवाह वेबसाइट लिंक कॉपी करें' : 'Copy Wedding Link'}</span>
              </>
            )}
          </button>
        </div>

        {/* Closing Inquiries and Coordination Signoff */}
        <div className="pt-6 border-t border-[#D4AF37]/30 space-y-2">
          <p className="text-xs font-bold text-[#800020]">
            {isHindi ? quotes.nativeFamilySignoff : quotes.familySignoff}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
            <span className="text-[#4A3B32]">
              {isHindi ? 'संपर्क एवं समन्वय:' : 'Inquiries & Coordination:'}{' '}
              <strong className="text-[#800020]">Suman Bhadra</strong>
            </span>
            <a
              href="tel:+916291898703"
              className="px-3 py-1 rounded-full border border-[#D4AF37]/60 bg-[#FCF8F2] text-[11px] font-semibold text-[#800020] hover:opacity-80 flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3" /> +91 6291898703
            </a>
            <a
              href="mailto:bhadrasuman04@gmail.com"
              className="px-3 py-1 rounded-full border border-[#D4AF37]/60 bg-[#FCF8F2] text-[11px] font-semibold text-[#800020] hover:opacity-80 flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3" /> bhadrasuman04@gmail.com
            </a>
          </div>

          <p className="text-[11px] text-stone-500 pt-2">
            Handcrafted with authentic cultural elegance on WeedingInv.com
          </p>
        </div>

      </footer>

    </div>
  );
};
