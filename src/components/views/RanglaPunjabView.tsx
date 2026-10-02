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
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Send,
  Music,
  Flame,
  Ticket,
  Vote,
  PartyPopper
} from 'lucide-react';

interface RanglaPunjabViewProps {
  template?: CulturalTemplate;
  lang?: Language;
  guestName?: string;
  onLangChange?: (lang: Language) => void;
}

interface ConfettiItem {
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

export const RanglaPunjabView: React.FC<RanglaPunjabViewProps> = ({
  template,
  lang = 'native',
  guestName,
  onLangChange
}) => {
  const groom = template?.groom?.name || 'MANPREET';
  const bride = template?.bride?.name || 'SIMRAN';
  const punjabiSlogan = template?.quotes?.subInvocation || 'ANANDUTSAV';

  const [isPlaying, setIsPlaying] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiItem[]>([]);
  const [ticketPunched, setTicketPunched] = useState(false);
  const [wobbleIndex, setWobbleIndex] = useState<number | null>(null);

  // DJ Poll State
  const [pollVotes, setPollVotes] = useState({
    opt1: 42,
    opt2: 38,
    opt3: 15,
    opt4: 5
  });
  const [votedOption, setVotedOption] = useState<number | null>(null);
  const [djSongInput, setDjSongInput] = useState('');
  const [djSongSent, setDjSongSent] = useState(false);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName || '');
  const [rsvpCount, setRsvpCount] = useState('੨');
  const [mealPref, setMealPref] = useState<'punjabi' | 'veg'>('punjabi');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Live Countdown State (Targeting 28 Nov 2026)
  const [timeLeft, setTimeLeft] = useState({
    days: 56,
    hours: 14,
    mins: 38,
    secs: 22
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

  const triggerBalleConfetti = (originX?: number, originY?: number) => {
    const colors = ['#ff4a8d', '#e9c400', '#ff7f1c', '#00ffc4', '#ffd9e1', '#ffffff'];
    const symbols = ['💥', '🥁', '⚡', '✨', '🔥', '🌸', '★'];
    const startX = originX ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 200);
    const startY = originY ?? (typeof window !== 'undefined' ? window.innerHeight / 2 : 300);

    const items: ConfettiItem[] = Array.from({ length: 24 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 180 + 60;
      return {
        id: Date.now() + i + Math.random(),
        x: startX,
        y: startY,
        sym: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 14 + 14,
        targetX: Math.cos(angle) * velocity,
        targetY: Math.sin(angle) * velocity - 60,
        rotation: Math.random() * 360
      };
    });

    setConfetti(prev => [...prev, ...items]);
    setTimeout(() => {
      setConfetti(prev => prev.filter(c => !items.some(it => it.id === c.id)));
    }, 1500);
  };

  const handleVote = (opt: 1 | 2 | 3 | 4) => {
    if (votedOption) return;
    setVotedOption(opt);
    setPollVotes(prev => {
      const key = `opt${opt}` as keyof typeof prev;
      return { ...prev, [key]: prev[key] + 1 };
    });
    triggerBalleConfetti();
  };

  const handleDjSongSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!djSongInput.trim()) return;
    setDjSongSent(true);
    setDjSongInput('');
    triggerBalleConfetti();
    setTimeout(() => setDjSongSent(false), 4000);
  };

  const copyUpi = () => {
    navigator.clipboard.writeText('ranglapunjab@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleWhatsAppRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    const guest = rsvpName.trim() || 'ਵੱਡੇ ਵੀਰ / ਭੈਣ ਜੀ';
    const meal = mealPref === 'punjabi'
      ? (isNative ? 'ਅਸਲੀ ਪੰਜਾਬੀ ਸਵਾਦ (ਬਟਰ ਚਿਕਨ, ਤੰਦੂਰੀ ਕਬਾਬ ਤੇ ਦਾਲ ਮੱਖਣੀ)' : 'Authentic Punjabi Feast (Butter Chicken, Kebabs & Dal Makhani)')
      : (isNative ? 'ਸ਼ੁੱਧ ਸ਼ਾਕਾਹਾਰੀ (ਪਨੀਰ ਟਿੱਕਾ, ਸਰ੍ਹੋਂ ਦਾ ਸਾਗ ਤੇ ਮੱਕੀ ਦੀ ਰੋਟੀ)' : 'Pure Vegetarian (Sarson Da Saag, Makki Di Roti & Paneer Tikka)');

    const message = isNative
      ? `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਜੀ! ਮੈਂ ${guest}, ਮਨਪ੍ਰੀਤ ਤੇ ਸਿਮਰਨ ਦੇ ਵਿਆਹ ਵਿੱਚ ਭੰਗੜਾ ਪਾਉਣ ਜ਼ਰੂਰ ਆਵਾਂਗਾ!\n\nਹਾਜ਼ਰ ਮੈਂਬਰ: ${rsvpCount}\nਖਾਣੇ ਦੀ ਪਸੰਦ: ${meal}\n\nਬੱਲੇ ਬੱਲੇ! ਦੋਵਾਂ ਪਰਿਵਾਰਾਂ ਨੂੰ ਲੱਖ-ਲੱਖ ਵਧਾਈਆਂ!`
      : `Sat Sri Akal! I am ${guest}, thrilled to confirm our presence for Manpreet & Simran's Big Fat Punjabi Wedding.\n\nAttending: ${rsvpCount}\nDining: ${meal}\n\nBalle Balle! Warmest congratulations to Dhillon & Sandhu families!`;

    window.open(`https://wa.me/919814012345?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#1f0b25] text-[#f9d8fc] font-sans antialiased select-none pb-24 relative overflow-x-hidden">
      {/* Floating Confetti Elements */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {confetti.map(c => (
          <div
            key={c.id}
            style={{
              position: 'fixed',
              left: `${c.x}px`,
              top: `${c.y}px`,
              fontSize: `${c.size}px`,
              color: c.color,
              transform: `translate(${c.targetX}px, ${c.targetY}px) rotate(${c.rotation}deg)`,
              opacity: 0,
              transition: 'all 1.3s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {c.sym}
          </div>
        ))}
      </div>

      {/* Swaying Top Parandi Tassels & Header Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#1f0b25]/95 backdrop-blur-xl border-b border-[#ac878f]/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {/* Parandi Tassels Ribbon */}
        <div className="w-full h-3 flex items-center justify-between px-6 bg-gradient-to-r from-[#ff4a8d] via-[#e9c400] to-[#ff7f1c]">
          <span className="w-2 h-2 rounded-full bg-white shadow-sm"></span>
          <span className="w-2 h-2 rounded-full bg-white shadow-sm"></span>
          <span className="w-2 h-2 rounded-full bg-white shadow-sm"></span>
          <span className="w-2 h-2 rounded-full bg-white shadow-sm"></span>
          <span className="w-2 h-2 rounded-full bg-white shadow-sm"></span>
        </div>

        <div className="h-16 px-4 max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="w-9 h-9 rounded-lg bg-[#2c1832] flex items-center justify-center text-[#ffb1c4] hover:bg-[#37223d] transition-colors border border-[#ac878f]/30"
              title="Return Home"
            >
              <Home className="w-4 h-4" />
            </Link>
            <button
              onClick={toggleAudio}
              className={`h-9 px-2.5 rounded-lg flex items-center gap-1.5 transition-colors border ${
                isPlaying
                  ? 'bg-[#ff4a8d] text-white border-[#ff4a8d] shadow-[0_0_12px_rgba(255,74,141,0.5)]'
                  : 'bg-[#2c1832] text-[#e9c400] border-[#ac878f]/40'
              }`}
            >
              <Music className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                {isPlaying ? (isNative ? 'ਢੋਲ ਚੱਲ ਰਿਹਾ' : 'Dhol ON') : (isNative ? 'ਢੋਲ ਬੀਟ' : 'Beat')}
              </span>
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#432d48] border border-[#ff4a8d]/40 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e9c400] animate-ping"></span>
              <span className="text-xs font-bold text-white tracking-wide">
                {isNative ? 'ਰੰਗਲਾ ਪੰਜਾਬ' : 'RANGLA PUNJAB'}
              </span>
            </div>
            <span className="text-[10px] tracking-widest text-[#ffb1c4] uppercase mt-0.5">
              {isNative ? 'ਢੋਲ ਤੇ ਧਮਾਕਾ' : 'Dhol & Dhamaka'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => triggerBalleConfetti(e.clientX, e.clientY)}
              className="h-9 px-3 rounded-lg bg-[#ff4a8d] hover:bg-[#ff7f1c] text-white text-xs font-extrabold uppercase tracking-wider shadow-[0_0_12px_rgba(255,74,141,0.6)] active:scale-95 transition-all flex items-center gap-1"
            >
              <PartyPopper className="w-3.5 h-3.5" />
              <span>BALLE!</span>
            </button>
            <button
              onClick={() => onLangChange?.(isNative ? 'en' : 'native')}
              className="h-9 px-2 rounded-lg bg-[#2c1832] text-[11px] font-bold text-[#e9c400] border border-[#ac878f]/40"
            >
              {isNative ? 'ਪੰ / EN' : 'EN / ਪੰ'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="pt-20 px-3.5 max-w-xl mx-auto space-y-5">
        {/* Parandi Tassels & Dhol BPM Indicator */}
        <div className="flex items-center justify-between px-2 pt-1 text-xs">
          <div className="flex items-center gap-2 text-[#e9c400]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff4a8d] animate-ping"></span>
            <span className="font-extrabold tracking-widest uppercase">128 BPM DHOL PULSE</span>
          </div>
          <span className="text-[#ffb1c4] font-bold text-[11px] bg-[#2c1832] px-2.5 py-0.5 rounded-full border border-[#ac878f]/40">
            🥁 NON-STOP CELEBRATION
          </span>
        </div>

        {/* Kinetic Hero Section */}
        <section className="relative px-2 pt-1 pb-4 flex flex-col items-center text-center space-y-3">
          {/* Gurmukhi Welcome Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#432d48] rounded-full shadow-lg border border-[#e9c400]/40 -rotate-1">
            <span className="text-xs font-bold text-[#e9c400]">ੴ ਲਖ ਖੁਸ਼ੀਆਂ ਪਾਤਸ਼ਾਹੀਆਂ</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4a8d]"></span>
            <span className="text-xs font-extrabold text-[#ff4a8d] tracking-widest uppercase">{punjabiSlogan}</span>
          </div>

          {/* Interactive Wobble Couple Names */}
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {groom.toUpperCase().split('').map((char, idx) => (
                <span
                  key={idx}
                  onClick={() => {
                    setWobbleIndex(idx);
                    setTimeout(() => setWobbleIndex(null), 500);
                    triggerBalleConfetti();
                  }}
                  className={`text-3xl md:text-4xl font-extrabold text-[#ff4a8d] tracking-tight cursor-pointer transition-transform ${
                    wobbleIndex === idx ? 'scale-125 rotate-12 text-[#e9c400]' : 'hover:scale-110'
                  }`}
                >
                  {char}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 my-1">
              <div className="h-0.5 w-10 bg-[#ff7f1c] rounded-full"></div>
              <div className="px-3 py-0.5 bg-[#ff7f1c] text-black font-extrabold text-xs uppercase tracking-widest rounded-full shadow-md">
                {isNative ? 'ਸੰਗ ਵੇਡ੍ਸ & ' : 'WEDS'}
              </div>
              <div className="h-0.5 w-10 bg-[#ff7f1c] rounded-full"></div>
            </div>

            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {bride.toUpperCase().split('').map((char, idx) => (
                <span
                  key={idx}
                  onClick={() => {
                    setWobbleIndex(idx + 10);
                    setTimeout(() => setWobbleIndex(null), 500);
                    triggerBalleConfetti();
                  }}
                  className={`text-3xl md:text-4xl font-extrabold text-[#e9c400] tracking-tight cursor-pointer transition-transform ${
                    wobbleIndex === idx + 10 ? 'scale-125 -rotate-12 text-[#ff4a8d]' : 'hover:scale-110'
                  }`}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Truck Art Punchline */}
          <div className="px-4 py-2 bg-[#ff7f1c] text-black rounded-xl shadow-lg rotate-1 max-w-xs flex items-center justify-center gap-2 font-extrabold text-xs tracking-wider border-2 border-white">
            <span>🚛</span>
            <span>100% SWAG • NON-STOP BHANGRA!</span>
          </div>
        </section>

        {/* Running Marquee Ribbon */}
        <div className="w-full overflow-hidden bg-[#e9c400] text-black py-1.5 shadow-md -rotate-1 font-bold text-xs tracking-wider uppercase">
          <div className="whitespace-nowrap animate-marquee flex gap-6 items-center">
            <span>★ SHAADI DI TYAARI 🥁</span>
            <span>•</span>
            <span>DHOL DHAMAKA ⚡</span>
            <span>•</span>
            <span>BALLE BALLE 🔥</span>
            <span>•</span>
            <span>HORN OK PLEASE 🛺</span>
            <span>★ SHAADI DI TYAARI 🥁</span>
            <span>•</span>
            <span>DHOL DHAMAKA ⚡</span>
            <span>•</span>
            <span>BALLE BALLE 🔥</span>
          </div>
        </div>

        {/* Punjab Express Train Ticket Countdown */}
        <section className="w-full bg-[#2c1832] rounded-2xl p-4 shadow-xl border border-[#ac878f]/40 relative overflow-hidden space-y-3">
          {/* Visual Punch-Hole Cutouts */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1f0b25]"></div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1f0b25]"></div>

          <div className="flex items-center justify-between pb-2 border-b border-[#ac878f]/30">
            <span className="text-xs font-bold text-[#e9c400] flex items-center gap-1.5">
              <span>🚂</span> PUNJAB MAIL EXPRESS • SPECIAL
            </span>
            <span className="text-xs font-extrabold text-[#ff4a8d] tracking-widest">
              PNR: VIVAH2026
            </span>
          </div>

          {/* Route Display */}
          <div className="flex items-center justify-between px-2 text-center">
            <div className="text-left">
              <span className="text-[10px] text-[#e5bcc5] block uppercase">BOARDING</span>
              <span className="text-xl font-extrabold text-white">ASR</span>
              <span className="text-xs text-[#ffb68b]">Amritsar Jn</span>
            </div>
            <div className="flex-1 px-3">
              <span className="text-[10px] text-[#e9c400] uppercase block mb-1">Direct Baaraat Superfast</span>
              <div className="h-0.5 bg-[#e9c400]/40 w-full relative">
                <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ff4a8d]"></span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#e5bcc5] block uppercase">DESTINATION</span>
              <span className="text-xl font-extrabold text-[#ff4a8d]">KAP</span>
              <span className="text-xs text-[#ffb68b]">Wedding Grounds</span>
            </div>
          </div>

          {/* 4 Flip Countdown Blocks */}
          <div className="grid grid-cols-4 gap-2 text-center pt-2">
            <div className="bg-[#19061f] p-2.5 rounded-xl border border-[#ac878f]/30">
              <div className="text-2xl font-black text-[#e9c400]">{timeLeft.days}</div>
              <div className="text-[10px] text-[#e5bcc5] uppercase">DAYS</div>
            </div>
            <div className="bg-[#19061f] p-2.5 rounded-xl border border-[#ac878f]/30">
              <div className="text-2xl font-black text-[#ff4a8d]">{timeLeft.hours}</div>
              <div className="text-[10px] text-[#e5bcc5] uppercase">HOURS</div>
            </div>
            <div className="bg-[#19061f] p-2.5 rounded-xl border border-[#ac878f]/30">
              <div className="text-2xl font-black text-[#ff7f1c]">{timeLeft.mins}</div>
              <div className="text-[10px] text-[#e5bcc5] uppercase">MINS</div>
            </div>
            <div className="bg-[#19061f] p-2.5 rounded-xl border border-[#ac878f]/30">
              <div className="text-2xl font-black text-[#e9c400] animate-pulse">{timeLeft.secs}</div>
              <div className="text-[10px] text-[#e5bcc5] uppercase">SECS</div>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              setTicketPunched(true);
              triggerBalleConfetti(e.clientX, e.clientY);
            }}
            className="w-full h-11 bg-[#ff4a8d] hover:bg-[#ff7f1c] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
          >
            <Ticket className="w-4 h-4" />
            <span>{ticketPunched ? '★ TICKET PUNCHED & READY! ★' : 'Punch Ticket & Celebrate'}</span>
          </button>
        </section>

        {/* 4 Slapped Sticker Event Cards */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#ff7f1c]" />
              <span>{isNative ? 'ਵਿਆਹ ਸਮਾਗਮ' : 'The Celebrations'}</span>
            </h2>
            <span className="text-xs bg-[#432d48] text-[#e9c400] font-bold px-3 py-1 rounded-full border border-[#e9c400]/30">
              4 Mega Events
            </span>
          </div>

          {/* Event 1: Jaggo Night */}
          <div className="p-4 bg-[#28142e] rounded-2xl shadow-md border border-[#ac878f]/40 relative overflow-hidden -rotate-1">
            <span className="absolute top-2 right-2 px-2.5 py-0.5 bg-[#e9c400] text-black font-extrabold text-[10px] uppercase rounded shadow">
              DAY 1 • NIGHT
            </span>
            <h3 className="text-base font-bold text-[#ffb1c4]">
              {isNative ? 'ਜਾਗੋ ਨਾਈਟ ਅਤੇ ਕਾਕਟੇਲ ਪਾਰਟੀ' : 'Jaggo Night & Cocktails'}
            </h3>
            <p className="text-xs text-[#e5bcc5] mt-1 leading-relaxed">
              {isNative
                ? 'ਜਗਮਗਾਉਂਦੇ ਪਿੱਤਲ ਦੇ ਦੀਵੇ, ਗਿੱਧੇ ਦੀਆਂ ਬੋਲੀਆਂ ਅਤੇ ਦੇਸੀ ਢੋਲ ਧਮਾਕਾ।'
                : 'Traditional illuminated brass pots, street folk dance, and giddha showdowns under festive lights.'}
            </p>
            <div className="flex items-center gap-3 mt-3 text-xs text-[#ffb68b]">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5" /> 7:00 PM Onwards
              </span>
              <span className="font-bold text-[#e9c400]">Dress: Phulkari Glam</span>
            </div>
          </div>

          {/* Event 2: Grand Sangeet Dance Off */}
          <div className="p-4 bg-[#37223d] rounded-2xl shadow-md border border-[#ff4a8d]/40 relative overflow-hidden rotate-1">
            <span className="absolute top-2 right-2 px-2.5 py-0.5 bg-[#ff4a8d] text-white font-extrabold text-[10px] uppercase rounded shadow">
              DAY 2 • DHAMAKA
            </span>
            <h3 className="text-base font-bold text-[#ff7f1c]">
              {isNative ? 'ਗ੍ਰੈਂਡ ਸੰਗੀਤ ਅਤੇ ਭੰਗੜਾ ਡਾਂਸ ਆਫ' : 'Grand Sangeet Dance Off'}
            </h3>
            <p className="text-xs text-[#e5bcc5] mt-1 leading-relaxed">
              {isNative
                ? 'ਮੁੰਡੇਵਾਲੇ ਬਨਾਮ ਕੁੜੀਵਾਲੇ ਸਟੇਜ ਮੁਕਾਬਲਾ ਤੇ ਸੁਪਰਹਿਟ ਪੰਜਾਬੀ ਧੁਨਾਂ।'
                : 'Ladkewale vs Ladkiwale high-stakes stage battles, live Punjabi dholis, and midnight cocktails.'}
            </p>
            <div className="flex items-center gap-3 mt-3 text-xs text-[#ffb68b]">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5" /> 8:00 PM Till Late
              </span>
              <span className="font-bold text-[#ff4a8d]">Dress: Indo-Western Dazzle</span>
            </div>
          </div>

          {/* Event 3: Anand Karaj Nuptials */}
          <div className="p-4 bg-[#28142e] rounded-2xl shadow-md border border-[#e9c400]/40 relative overflow-hidden -rotate-1">
            <span className="absolute top-2 right-2 px-2.5 py-0.5 bg-[#ff7f1c] text-black font-extrabold text-[10px] uppercase rounded shadow">
              DAY 3 • SACRED
            </span>
            <h3 className="text-base font-bold text-[#e9c400]">
              {isNative ? 'ਪਵਿੱਤਰ ਅਨੰਦ ਕਾਰਜ ਸਮਾਗਮ' : 'Sacred Anand Karaj Nuptials'}
            </h3>
            <p className="text-xs text-[#e5bcc5] mt-1 leading-relaxed">
              {isNative
                ? 'ਗੁਰਬਾਣੀ ਦੇ ਸ਼ਬਦ ਕੀਰਤਨ, ਚਾਰ ਲਾਵਾਂ ਅਤੇ ਗੁਰੂ ਕਾ ਅਤੁੱਟ ਲੰਗਰ।'
                : 'Morning sacred ceremony with holy shabad hymns, peaceful pheras, followed by traditional community Langar feast.'}
            </p>
            <div className="flex items-center gap-3 mt-3 text-xs text-[#ffb68b]">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5" /> 9:30 AM Sharp
              </span>
              <span className="font-bold text-[#e9c400]">Dress: Pastel Royal (Head Covered)</span>
            </div>
          </div>

          {/* Event 4: Grand Reception */}
          <div className="p-4 bg-[#37223d] rounded-2xl shadow-md border border-[#ac878f]/40 relative overflow-hidden rotate-1">
            <span className="absolute top-2 right-2 px-2.5 py-0.5 bg-[#c9a900] text-black font-extrabold text-[10px] uppercase rounded shadow">
              FINALE • ALL NIGHT
            </span>
            <h3 className="text-base font-bold text-white">
              {isNative ? 'ਸ਼ਾਨਦਾਰ ਰਿਸੈਪਸ਼ਨ ਅਤੇ ਆਫਟਰ ਪਾਰਟੀ' : 'Reception & Sunrise Bash'}
            </h3>
            <p className="text-xs text-[#e5bcc5] mt-1 leading-relaxed">
              {isNative
                ? 'ਸ਼ਾਨਦਾਰ ਜੋੜੀ ਐਂਟਰੀ, ਲਾਈਵ ਤੰਦੂਰ ਕਾਊਂਟਰ ਅਤੇ ਸਵੇਰ ਤੱਕ ਜਸ਼ਨ।'
                : 'Grand couple entry, live tandoor BBQ counters, cake celebration, and world-class DJ party until sunrise.'}
            </p>
            <div className="flex items-center gap-3 mt-3 text-xs text-[#ffb68b]">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5" /> 8:00 PM - Sunrise
              </span>
              <span className="font-bold text-[#ffb1c4]">Dress: Tuxedos & Heavy Silks</span>
            </div>
          </div>
        </section>

        {/* Interactive Sangeet DJ Track Vote Poll */}
        <section className="w-full bg-[#2c1832] rounded-2xl p-4 border border-[#ac878f]/40 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Vote className="w-4 h-4 text-[#e9c400]" />
              <span>{isNative ? 'ਸੰਗੀਤ ਗੀਤ ਵੋਟਿੰਗ • DJ Poll' : 'Midnight Anthem Poll'}</span>
            </h3>
            <span className="text-[10px] uppercase font-bold text-[#ff4a8d] bg-[#432d48] px-2.5 py-0.5 rounded-full border border-[#ff4a8d]/30">
              Live DJ
            </span>
          </div>
          <p className="text-xs text-[#e5bcc5]">
            {isNative
              ? 'ਵੋਟ ਪਾਓ ਕਿਹੜੇ ਗਾਣੇ ਤੇ ਡਾਂਸ ਫਲੋਰ ਤੇ ਅੱਗ ਲੱਗਣੀ ਚਾਹੀਦੀ ਹੈ!'
              : 'Vote for the track that kicks off the midnight dance madness!'}
          </p>

          <div className="space-y-2">
            {[
              { id: 1, title: 'Mundian To Bach Ke (Bass Flip)', votes: pollVotes.opt1, color: '#ff4a8d' },
              { id: 2, title: 'Gud Naal Ishq Mitha (Dhol Mix)', votes: pollVotes.opt2, color: '#ff7f1c' },
              { id: 3, title: 'Boliyaan Wedding Medley', votes: pollVotes.opt3, color: '#e9c400' },
              { id: 4, title: 'Modern Punjabi Bass Drop', votes: pollVotes.opt4, color: '#ff4a8d' }
            ].map(track => {
              const total = pollVotes.opt1 + pollVotes.opt2 + pollVotes.opt3 + pollVotes.opt4;
              const pct = Math.round((track.votes / total) * 100);
              return (
                <div
                  key={track.id}
                  onClick={() => handleVote(track.id as 1 | 2 | 3 | 4)}
                  className={`relative p-3 rounded-xl bg-[#19061f] border transition-all cursor-pointer overflow-hidden ${
                    votedOption === track.id ? 'border-[#e9c400]' : 'border-[#ac878f]/30 hover:border-[#ff4a8d]'
                  }`}
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-[#ff4a8d]/20 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  ></div>
                  <div className="relative flex items-center justify-between z-10 text-xs">
                    <span className="font-semibold text-white">{track.title}</span>
                    <span className="font-extrabold text-[#e9c400]">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Suggest Song Input */}
          <form onSubmit={handleDjSongSubmit} className="pt-2 flex gap-2">
            <input
              type="text"
              value={djSongInput}
              onChange={e => setDjSongInput(e.target.value)}
              placeholder={isNative ? 'ਡੀਜੇ ਨੂੰ ਕੋਈ ਖਾਸ ਗਾਣਾ ਦੱਸੋ...' : 'Got a jam? Tell DJ Sunny...'}
              className="flex-1 h-10 px-3 bg-[#19061f] border border-[#ac878f]/40 rounded-xl text-xs text-white focus:outline-none focus:border-[#e9c400]"
            />
            <button
              type="submit"
              className="px-4 bg-[#e9c400] text-black font-extrabold text-xs rounded-xl shadow uppercase"
            >
              SEND
            </button>
          </form>
          {djSongSent && (
            <p className="text-center text-xs font-bold text-[#e9c400] animate-bounce">
              ★ Jam requested to DJ Sunny! ★
            </p>
          )}
        </section>

        {/* WhatsApp RSVP & Digital Shagun */}
        <section className="w-full bg-[#2c1832] rounded-2xl p-5 border border-[#ac878f]/40 space-y-4 shadow-xl">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#ff4a8d] font-bold">
              {isNative ? 'ਸੱਦਾ ਪੱਤਰ' : 'RSVP'}
            </span>
            <h2 className="text-xl font-bold text-white">
              {isNative ? 'ਵਿਆਹ ਵਿੱਚ ਹਾਜ਼ਰੀ ਦਰਜ ਕਰੋ' : 'Confirm Your Presence'}
            </h2>
          </div>

          <form onSubmit={handleWhatsAppRsvp} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-white block mb-1">
                {isNative ? 'ਹਾਜ਼ਰ ਹੋਣ ਵਾਲੇ ਮੈਂਬਰ:' : 'Attending Members:'}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['੧', '੨', '੩', '੪+'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setRsvpCount(c)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      rsvpCount === c
                        ? 'bg-[#ff4a8d] text-white border-[#ff4a8d] shadow-sm'
                        : 'bg-[#19061f] text-white border-[#ac878f]/40'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-white block mb-1">
                {isNative ? 'ਤੁਹਾਡਾ ਨਾਮ:' : 'Your Name:'}
              </label>
              <input
                type="text"
                value={rsvpName}
                onChange={e => setRsvpName(e.target.value)}
                placeholder={isNative ? 'ਉਦਾਹਰਨ: ਸ. ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ ਢਿੱਲੋਂ' : 'e.g. S. Gurpreet Singh & Family'}
                className="w-full h-10 px-3 bg-[#19061f] border border-[#ac878f]/40 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff4a8d]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-black font-extrabold py-3 rounded-full text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              <span>
                {isNative ? 'ਵਟਸਐਪ ਤੇ ਹਾਜ਼ਰੀ ਭੇਜੋ • Confirm on WhatsApp' : 'Confirm RSVP on WhatsApp'}
              </span>
            </button>
          </form>

          {/* Shagun Pronami Box */}
          <div className="p-3.5 rounded-xl bg-[#19061f] border border-[#ac878f]/40 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-[#e5bcc5] uppercase font-bold block">
                {isNative ? 'ਡਿਜੀਟਲ ਸ਼ਗਨ (UPI)' : 'Digital Shagun (UPI)'}
              </span>
              <span className="font-mono font-bold text-[#e9c400]">ranglapunjab@upi</span>
            </div>
            <button
              type="button"
              onClick={copyUpi}
              className="px-3 py-1.5 bg-[#ff4a8d] text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow"
            >
              {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUpi ? 'ਕਾਪੀ ਹੋ ਗਿਆ' : 'ਕਾਪੀ'}</span>
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-4 border-t border-[#ac878f]/30 space-y-1">
          <div className="text-sm font-bold text-[#e9c400]">
            ॥ ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ ॥
          </div>
          <p className="text-xs text-[#e5bcc5]">
            {isNative
              ? 'ਰੰਗਲਾ ਪੰਜਾਬ — ਢੋਲ, ਧਮਾਕਾ ਤੇ ਭੰਗੜਾ ਵੈੱਡਿੰਗ ਇਨਵੀਟੇਸ਼ਨ'
              : 'Rangla Punjab — High-Energy Punjabi Wedding Celebration'}
          </p>
          <div className="text-[11px] text-[#ac878f] pt-1">
            UtsavPatra • Punjab Folk Heritage
          </div>
        </footer>
      </main>
    </div>
  );
};
