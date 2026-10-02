import React, { useState, useEffect } from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import { audioManager } from '../../utils/audioManager';
import { Link } from 'react-router-dom';
import {
  Film,
  Volume2,
  VolumeX,
  Home,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Disc,
  Play,
  Pause,
  Ticket,
  Users,
  Send,
  Sparkles,
  Radio
} from 'lucide-react';

interface BollywoodPremiereViewProps {
  template?: CulturalTemplate;
  lang?: Language;
  guestName?: string;
  onLangChange?: (lang: Language) => void;
}

export const BollywoodPremiereView: React.FC<BollywoodPremiereViewProps> = ({
  template,
  lang = 'native',
  guestName,
  onLangChange
}) => {
  const groom = template?.groom?.name || 'Anirban';
  const bride = template?.bride?.name || 'Deboleena';
  const movieTitle = template?.quotes?.weddingTitle && !template.quotes.weddingTitle.includes('&')
    ? template.quotes.weddingTitle
    : 'PREM KI KAHANI';
  const movieTagline = template?.quotes?.verse || '“Do dil. Do parivaar. Ek shaadi.”';
  const directorCredit = template?.quotes?.subInvocation || 'DHARMA & YASH RAJ PARIVAAR PRESENT';

  const isHindi = lang === 'native';
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClassicNoir, setIsClassicNoir] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['B3', 'B4']);
  const [selectedSnack, setSelectedSnack] = useState('Caramel Popcorn');
  const [activeTab, setActiveTab] = useState<'premiere' | 'events' | 'cast' | 'score' | 'rsvp'>('premiere');
  const [currentTrack, setCurrentTrack] = useState({
    title: 'Kala Chashma (Bass Baaraat Mix)',
    artist: 'DJ Rohit & Dhol Squad'
  });
  const [isJukeboxPlaying, setIsJukeboxPlaying] = useState(true);
  const [djSongInput, setDjSongInput] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [rsvpGuestName, setRsvpGuestName] = useState(guestName || '');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3000);
  };

  useEffect(() => {
    const unsub = audioManager.subscribe(playing => {
      setIsPlaying(playing);
      setIsJukeboxPlaying(playing);
    });
    return () => unsub();
  }, []);

  const toggleHeaderAudio = () => {
    if (isPlaying) {
      audioManager.pause();
    } else {
      audioManager.play();
    }
  };

  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleDjRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (djSongInput.trim()) {
      showToast(`Song "${djSongInput}" requested and sent to DJ console! 🎧`);
      setDjSongInput('');
    }
  };

  const playCommentary = (key: string) => {
    const notes: Record<string, string> = {
      sangeet: "Director's Note: Sangeet rehearsals had 4 broken heels and 2 missing dupattas!",
      haldi: "Director's Note: 15 kgs of organic haldi and infinite pool splashes prepared.",
      pheras: "Director's Note: Pheras are synchronized to the golden hour twilight sky.",
      afterparty: "Director's Note: Midnight Biryani handis prepared by master khansamas."
    };
    showToast(notes[key] || "Director's commentary loading...");
  };

  const confirmRsvpViaWhatsApp = () => {
    const name = rsvpGuestName.trim() || 'Honored Guest';
    const seats = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Front Row Standing';
    const snack = selectedSnack;
    const msg =
      `🍿 *THE GRAND PREMIERE RSVP CONFIRMATION*\n\n` +
      `🎬 *Movie:* Prem Ki Kahani (Anirban & Deboleena Wedding)\n` +
      `👤 *Star Guest:* ${name}\n` +
      `🎟️ *Reserved Seats:* ${seats}\n` +
      `🍿 *Snack Preference:* ${snack}\n\n` +
      `See you on 26th December 2026 on the Red Carpet!`;

    const targetNumber = '916203868358';
    const waUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  const scrollTo = (id: string, tab: 'premiere' | 'events' | 'cast' | 'score' | 'rsvp') => {
    setActiveTab(tab);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative min-h-screen bg-[#131315] text-[#E5E1E4] selection:bg-[#F2CA50] selection:text-[#131315] pb-28 antialiased"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* CINEMATIC FIXED HEADER */}
      <header className="sticky top-0 w-full z-50 bg-[#0E0E10]/90 backdrop-blur-xl border-b border-[#F2CA50]/20 shadow-lg">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="w-10 h-10 rounded-full bg-[#1C1B1D] border border-[#F2CA50]/30 flex items-center justify-center text-[#F2CA50] hover:scale-105 transition-transform"
              title="Platform Home"
            >
              <Home className="w-4 h-4" />
            </Link>
            <div className="flex flex-col">
              <span
                className="text-[11px] font-bold tracking-[0.25em] text-[#F2CA50] uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                VIP PREMIERE PASS
              </span>
              <span
                className="text-sm font-semibold uppercase text-white truncate max-w-[170px]"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                The Grand Premiere
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleHeaderAudio}
              className="w-10 h-10 rounded-full bg-[#1C1B1D] border border-white/10 flex items-center justify-center text-[#D0C5AF] hover:text-[#F2CA50] transition-colors"
              title="Toggle Audio Track"
              type="button"
            >
              {isPlaying ? <VolumeX className="w-4 h-4 text-[#F2CA50]" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#F2CA50]/40">
              <img src="/images/couples/bollywood_poster.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-2xl mx-auto">
        {/* RETRO LEADER COUNTDOWN STRIP */}
        <div className="w-full bg-[#0E0E10] px-4 py-2 flex items-center justify-between border-b border-[#F2CA50]/20">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#E50914] animate-ping" />
            <span
              className="text-[10px] sm:text-[11px] text-[#F2CA50] tracking-[0.25em] uppercase font-bold"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              ROLLING REEL • 35MM NITRATE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="px-2 py-0.5 bg-[#2A2A2C] rounded text-[10px] text-[#F2CA50] tracking-[0.2em] font-mono font-bold"
            >
              SYNC: 26 DEC '26
            </div>
            <button
              onClick={() => setIsClassicNoir(!isClassicNoir)}
              className="px-2 py-0.5 bg-[#F2CA50]/15 rounded text-[10px] text-[#F2CA50] hover:bg-[#F2CA50]/30 transition-all uppercase tracking-wider font-bold"
            >
              {isClassicNoir ? 'Bollywood Color' : 'Classic Noir B&W'}
            </button>
          </div>
        </div>

        {/* SECTION 1: BLOCKBUSTER POSTER HERO & WIDESCREEN CINEMATIC CANVAS */}
        <section id="premiere" className="relative w-full flex flex-col items-center overflow-hidden bg-[#0E0E10] scroll-mt-20">
          {/* 2.39:1 Anamorphic Top Matte Bar */}
          <div className="w-full h-7 bg-[#0E0E10] flex items-center justify-between px-4 z-20">
            <span
              className="text-[10px] tracking-[0.3em] text-[#D0C5AF]/70 uppercase font-mono font-bold"
            >
              DOLBY ATMOS 7.1 • 4K SCOPE 2.39:1
            </span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F2CA50]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F2CA50]/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F2CA50]/20" />
            </div>
          </div>

          {/* Main Visual Poster Vitrine */}
          <div className="relative w-full aspect-[2/3] max-h-[640px] overflow-hidden flex items-end justify-center group">
            <img
              id="main-poster-art"
              src="/images/couples/bollywood_poster.jpg"
              alt="Prem Ki Kahani Wedding Poster"
              className={`absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[12000ms] ease-out scale-105 group-hover:scale-110 ${
                isClassicNoir ? 'filter grayscale contrast-125' : ''
              }`}
            />
            {/* Ambient Cinematic Lighting Gradient / Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-[#131315]/60 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-radial-at-t from-[#FFC461]/15 via-transparent to-[#0E0E10]/80 pointer-events-none" />

            {/* Festival Laurels (Cannes / Film Fest parody) */}
            <div className="absolute top-4 left-0 right-0 flex justify-center items-center gap-6 px-4 z-10 pointer-events-none">
              <div className="flex items-center gap-1 text-[#F2CA50] text-center drop-shadow-md">
                <span
                  className="text-[11px] tracking-[0.2em] uppercase font-bold"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  ★ OFFICIAL SELECTION ★<br />
                  <span className="text-white text-[9px] tracking-[0.1em]">MOST ANTICIPATED NUPTIALS 2026</span>
                </span>
              </div>
            </div>

            {/* Poster Title Overlay */}
            <div className="relative z-10 w-full px-4 pb-6 flex flex-col items-center text-center">
              <p
                className="text-[13px] tracking-[0.35em] text-[#F2CA50] uppercase drop-shadow-md mb-1 font-bold"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {directorCredit}
              </p>
              <h1
                className="text-4xl sm:text-5xl text-[#F2CA50] tracking-tight font-black drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-tight uppercase"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                {movieTitle}
              </h1>
              <div className="flex items-center justify-center gap-3 my-1.5">
                <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#F2CA50]" />
                <span className="text-base sm:text-lg text-white uppercase tracking-widest font-semibold font-serif">
                  {groom} <span className="text-[#F2CA50] font-normal">&</span> {bride}
                </span>
                <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#F2CA50]" />
              </div>
              <p className="text-xs sm:text-sm italic text-[#D0C5AF] font-serif tracking-wide mt-1 drop-shadow">
                {movieTagline}
              </p>
              <button
                type="button"
                onClick={() => scrollTo('box-office', 'rsvp')}
                className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-[#F2CA50] text-[#131315] font-bold rounded shadow-[0_0_24px_rgba(242,202,80,0.45)] hover:bg-[#FFC461] transition-transform active:scale-95 text-xs uppercase tracking-widest"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <Ticket className="w-4 h-4" />
                <span>CLAIM PREMIERE SEAT</span>
              </button>
            </div>
          </div>

          {/* 2.39:1 Anamorphic Bottom Matte Bar */}
          <div className="w-full h-4 bg-[#0E0E10] z-20" />

          {/* Authentic Hollywood / Bollywood Technical Billing Block */}
          <div className="w-full bg-[#0E0E10] px-4 py-4 border-t border-b border-[#F2CA50]/20">
            <p
              className="text-[10px] text-[#99907C] tracking-[0.22em] text-center uppercase leading-relaxed max-w-xl mx-auto font-mono"
            >
              DIRECTED BY <span className="text-white font-bold">DESTINY</span> • PRODUCED BY{' '}
              <span className="text-white font-bold">MAA-BAAP ENTERTAINMENT</span> • MUSIC COMPOSED & ARRANGED BY{' '}
              <span className="text-white font-bold">DHOL WALE BHAIYA</span> • SCREENPLAY & STORY BY{' '}
              <span className="text-white font-bold">KISMET</span> • WARDROBE & COSTUMES BY{' '}
              <span className="text-white font-bold">CHANDNI CHOWK ATELIER</span> • CHOREOGRAPHY BY{' '}
              <span className="text-white font-bold">LATE NIGHT COUSINS CLUB</span> • WORLDWIDE SATELLITE & MANDAP RELEASE:{' '}
              <span className="text-[#F2CA50] font-bold">26 DECEMBER 2026</span>
            </p>
          </div>
        </section>

        {/* QUICK ACTION BAR (TICKET BADGES) */}
        <div className="w-full bg-[#1C1B1D] px-4 py-3 flex items-center justify-around gap-2 shadow-inner border-b border-white/5">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-[#F2CA50] tracking-widest uppercase font-mono">CERTIFIED</span>
            <span className="text-sm font-bold text-white">U/A 100%</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-[#F2CA50] tracking-widest uppercase font-mono">RUN TIME</span>
            <span className="text-sm font-bold text-white">3 NIGHTS</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-[#F2CA50] tracking-widest uppercase font-mono">AUDIO</span>
            <span className="text-sm font-bold text-white">LIVE DHOL</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-[#F2CA50] tracking-widest uppercase font-mono">FORMAT</span>
            <span className="text-sm font-bold text-white">70MM IMAX</span>
          </div>
        </div>

        {/* SECTION 2: SYNOPSIS & MULTIPLEX SHOW TIMINGS BOARD */}
        <section id="synopsis-timings" className="w-full px-4 py-8 flex flex-col gap-6 scroll-mt-20">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-1">
              <Film className="w-4 h-4 text-[#F2CA50]" />
              <span
                className="text-xs tracking-[0.25em] text-[#F2CA50] uppercase font-bold"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                NOW SHOWING ACROSS AUDITORIUMS
              </span>
            </div>
            <h2
              className="text-2xl text-white font-bold font-serif"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              Premiere Schedule & Showtimes
            </h2>
            <p className="text-xs text-[#D0C5AF]/70 max-w-sm mt-1">
              Select any show card to reveal venue coordinates, dress codes, and audio commentary preview.
            </p>
          </div>

          {/* Multiplex Marquee Cards */}
          <div className="flex flex-col gap-4">
            {/* SHOW 1: SANGEET */}
            <div className="bg-[#2A2A2C] rounded-lg p-4 flex flex-col gap-3 relative overflow-hidden transition-all hover:shadow-[0_0_24px_rgba(242,202,80,0.15)] border border-white/5">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#F2CA50]/20 text-[#F2CA50] text-[10px] font-mono px-2 py-0.5 rounded tracking-widest uppercase font-bold">
                      SCREEN 1 • IMAX DHOL
                    </span>
                    <span className="text-[10px] text-[#D0C5AF]/60 font-mono">240 MINS</span>
                  </div>
                  <h3
                    className="text-base text-white font-semibold mt-1"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    Sangeet Dance Battle: Soundtrack Launch
                  </h3>
                  <span className="text-xs text-[#F2CA50] font-medium font-mono">24 Dec 2026 • 7:00 PM IST Onwards</span>
                </div>
                <Radio className="w-6 h-6 text-[#F2CA50] shrink-0" />
              </div>
              <p className="text-xs text-[#D0C5AF]/80 leading-relaxed">
                High-energy musical dance warfare between the Ladkewale and Ladkiwale. Clashing rhythms, retro medleys, and dramatic mic drops.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                <div className="flex items-center gap-1.5 text-[#D0C5AF]">
                  <Sparkles className="w-3.5 h-3.5 text-[#F2CA50]" />
                  <span className="truncate">Bollywood Red Carpet Glam</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#D0C5AF]">
                  <MapPin className="w-3.5 h-3.5 text-[#F2CA50]" />
                  <span className="truncate">Grand Crystal Ballroom</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => playCommentary('sangeet')}
                  className="flex items-center gap-1 text-[#F2CA50] text-xs uppercase font-bold tracking-wider hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Director's Commentary</span>
                </button>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-[#353437] text-white rounded text-xs uppercase tracking-wider flex items-center gap-1 hover:bg-[#F2CA50] hover:text-[#131315] transition-colors"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* SHOW 2: HALDI */}
            <div className="bg-[#2A2A2C] rounded-lg p-4 flex flex-col gap-3 relative overflow-hidden transition-all hover:shadow-[0_0_24px_rgba(242,202,80,0.15)] border border-white/5">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#E4A83B]/20 text-[#FFC461] text-[10px] font-mono px-2 py-0.5 rounded tracking-widest uppercase font-bold">
                      SCREEN 2 • COLOR SPLASH
                    </span>
                    <span className="text-[10px] text-[#D0C5AF]/60 font-mono">180 MINS</span>
                  </div>
                  <h3
                    className="text-base text-white font-semibold mt-1"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    Haldi Chronicles: The Yellow Sunshine
                  </h3>
                  <span className="text-xs text-[#FFC461] font-medium font-mono">25 Dec 2026 • 10:30 AM Matinee</span>
                </div>
                <Sparkles className="w-6 h-6 text-[#FFC461] shrink-0" />
              </div>
              <p className="text-xs text-[#D0C5AF]/80 leading-relaxed">
                An organic turmeric war zone with poolside flower petals, bespoke cocktails, and unfiltered joy. Waterproof attire recommended.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                <div className="flex items-center gap-1.5 text-[#D0C5AF]">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFC461]" />
                  <span className="truncate">Shades of Mustard & Marigold</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#D0C5AF]">
                  <MapPin className="w-3.5 h-3.5 text-[#FFC461]" />
                  <span className="truncate">Royal Poolside Gardens</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => playCommentary('haldi')}
                  className="flex items-center gap-1 text-[#FFC461] text-xs uppercase font-bold tracking-wider hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Director's Commentary</span>
                </button>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-[#353437] text-white rounded text-xs uppercase tracking-wider flex items-center gap-1 hover:bg-[#FFC461] hover:text-[#131315] transition-colors"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* SHOW 3: THE MAIN PREMIERE / PHERAS */}
            <div className="bg-[#920703]/20 rounded-lg p-4 flex flex-col gap-3 relative overflow-hidden shadow-[0_0_24px_rgba(146,7,3,0.3)] border border-[#E50914]/40">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#920703] text-white text-[10px] font-mono px-2 py-0.5 rounded tracking-widest uppercase font-bold">
                      SCREEN 3 • WORLD PREMIERE
                    </span>
                    <span className="text-[10px] text-[#FFB4A8] font-mono animate-pulse font-bold">
                      LIVE GOLDEN HOUR
                    </span>
                  </div>
                  <h3
                    className="text-base text-[#FFDAD4] font-bold mt-1"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    The Main Premiere: 7 Sacred Pheras
                  </h3>
                  <span className="text-xs text-[#F2CA50] font-semibold font-mono">26 Dec 2026 • 6:30 PM (Godhuli Vela)</span>
                </div>
                <Film className="w-6 h-6 text-[#FFDAD4] shrink-0" />
              </div>
              <p className="text-xs text-white/90 leading-relaxed">
                The ultimate climax scene: sacred holy fire, Vedic chants, flower showers, and everlasting promises amidst royal Shehnai symphony.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#920703]/40 text-xs">
                <div className="flex items-center gap-1.5 text-[#FFDAD4]">
                  <Sparkles className="w-3.5 h-3.5 text-[#F2CA50]" />
                  <span className="truncate">Traditional Banarasi & Sherwani</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#FFDAD4]">
                  <MapPin className="w-3.5 h-3.5 text-[#F2CA50]" />
                  <span className="truncate">Auspicious Mandap Enclave</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => playCommentary('pheras')}
                  className="flex items-center gap-1 text-[#F2CA50] text-xs uppercase font-bold tracking-wider hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Director's Commentary</span>
                </button>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-[#F2CA50] text-[#131315] font-bold rounded text-xs uppercase tracking-wider flex items-center gap-1 hover:bg-[#FFC461] transition-colors"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: "CAST & CREW" CINEMATIC CREDITS ROLL */}
        <section id="cast-crew" className="w-full bg-[#0E0E10] py-10 px-4 flex flex-col items-center relative overflow-hidden border-t border-b border-[#F2CA50]/20 scroll-mt-20">
          <div className="flex flex-col items-center text-center mb-6">
            <span
              className="text-xs text-[#F2CA50] tracking-[0.3em] uppercase font-bold"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              CLOSING CREDITS SEQUENCE
            </span>
            <h2
              className="text-2xl text-white font-serif mt-1 font-bold"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              Cast & Key Crew
            </h2>
            <p className="text-xs text-[#D0C5AF]/70">The visionary minds and chaotic souls behind this production.</p>
          </div>

          <div className="w-full max-w-md bg-[#1C1B1D] rounded-xl p-5 shadow-2xl relative border border-white/5">
            <div className="flex flex-col gap-4 text-center">
              {/* Lead Stars */}
              <div className="flex flex-col gap-1 pb-3 border-b border-white/10">
                <span
                  className="text-xs text-[#F2CA50] uppercase tracking-[0.25em] font-bold"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  THE HERO (GROOM)
                </span>
                <span
                  className="text-base text-white font-bold"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  Anirban “The Diplomat”
                </span>
                <span className="text-xs text-[#99907C] italic">
                  “Master of negotiating with panditji and smiling through 4-hour photo lines.”
                </span>
              </div>

              <div className="flex flex-col gap-1 pb-3 border-b border-white/10">
                <span
                  className="text-xs text-[#F2CA50] uppercase tracking-[0.25em] font-bold"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  THE HEROINE (BRIDE)
                </span>
                <span
                  className="text-base text-white font-bold"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  Deboleena “The Showstopper”
                </span>
                <span className="text-xs text-[#99907C] italic">
                  “Executive Producer of lehenga perfection and main character energy.”
                </span>
              </div>

              {/* Producers */}
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-white/10 text-left">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#F2CA50] tracking-wider uppercase font-bold font-mono">
                    EXECUTIVE PRODUCERS
                  </span>
                  <span className="text-xs font-semibold text-white">Maa & Papaji</span>
                  <span className="text-[11px] text-[#D0C5AF]/60">Ladkewale Studios</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#F2CA50] tracking-wider uppercase font-bold font-mono">
                    CO-PRODUCERS
                  </span>
                  <span className="text-xs font-semibold text-white">Mummy & Daddy</span>
                  <span className="text-[11px] text-[#D0C5AF]/60">Ladkiwale Productions</span>
                </div>
              </div>

              {/* Quirky Crew Credits */}
              <div className="flex flex-col gap-2.5 text-left text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#D0C5AF]/70">Biryani Quality Controller</span>
                  <span className="font-semibold text-white">Prabir Kaku & Chachaji</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#D0C5AF]/70">Drama Queen & Head Choreographer</span>
                  <span className="font-semibold text-[#F2CA50]">Mousumi Didi</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#D0C5AF]/70">Late Comers & Bar In-Charge</span>
                  <span className="font-semibold text-white">The Cousins Brigade</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#D0C5AF]/70">Official Tear Driers & Aunty Squad</span>
                  <span className="font-semibold text-white">Massi & Bua Syndicate</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <span className="text-[9px] text-[#99907C] uppercase tracking-[0.25em] font-mono block">
                  NO HEARTS WERE BROKEN IN THE MAKING OF THIS MARRIAGE
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SOUNDTRACK JUKEBOX (SANGEET PLAYLIST) */}
        <section id="soundtrack" className="w-full px-4 py-8 flex flex-col gap-6 scroll-mt-20">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-1">
              <Disc className="w-4 h-4 text-[#F2CA50]" />
              <span
                className="text-xs tracking-[0.25em] text-[#F2CA50] uppercase font-bold"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                OFFICIAL ORIGINAL SOUNDTRACK
              </span>
            </div>
            <h2
              className="text-2xl text-white font-bold font-serif"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              The Sangeet Jukebox
            </h2>
            <p className="text-xs text-[#D0C5AF]/70">Crank up the volume! Preview our handpicked chartbusters.</p>
          </div>

          <div className="bg-[#2A2A2C] rounded-xl p-5 shadow-xl flex flex-col gap-4 border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full bg-[#0E0E10] border-2 border-[#F2CA50]/40 flex items-center justify-center relative shadow-lg ${
                    isJukeboxPlaying ? 'animate-spin [animation-duration:6s]' : ''
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-[#F2CA50] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131315]" />
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className="text-sm font-bold text-white truncate"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    {currentTrack.title}
                  </span>
                  <span className="text-xs text-[#F2CA50] truncate font-mono">
                    {isJukeboxPlaying ? 'Playing • Live Sangeet Turntables' : 'Paused • Tap to resume'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (audioManager.isPlaying()) {
                    audioManager.pause();
                  } else {
                    audioManager.play();
                  }
                }}
                className="w-11 h-11 rounded-full bg-[#F2CA50] text-[#131315] flex items-center justify-center shadow-[0_0_16px_rgba(242,202,80,0.5)] active:scale-95 transition-transform"
              >
                {isJukeboxPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>
            </div>

            {/* Live Audio Waveform Simulation */}
            <div className="flex items-end justify-between h-8 px-2 bg-[#0E0E10] rounded gap-1 py-1">
              {[6, 3, 7, 4, 8, 5, 2, 7, 4, 6].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 bg-[#F2CA50] rounded-full transition-all ${
                    isJukeboxPlaying ? 'animate-pulse' : 'opacity-40'
                  }`}
                  style={{ height: `${h * 3}px`, animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>

            {/* Tracks */}
            <div className="flex flex-col gap-2 pt-2">
              {[
                { id: '01', title: 'Kala Chashma (Bass Baaraat Mix)', desc: 'High-octane baaraat anthem' },
                { id: '02', title: 'London Thumakda (Bhangra Overdrive)', desc: 'The aunties floor burner' },
                { id: '03', title: 'Kesariya (Acoustic Shehnai Romance)', desc: 'Couple first-dance track' },
                { id: '04', title: 'Gal Mitthi Mitthi Bol', desc: 'Family grand finale mashup' }
              ].map(tr => (
                <div
                  key={tr.id}
                  onClick={() => {
                    setCurrentTrack({ title: tr.title, artist: 'DJ Rohit & Dhol Squad' });
                    audioManager.setBollywoodSubtrack(tr.id);
                    audioManager.play();
                    showToast(`Now Playing: ${tr.title}`);
                  }}
                  className="flex items-center justify-between p-2.5 rounded bg-[#1C1B1D] cursor-pointer hover:bg-[#353437] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#F2CA50] font-bold">{tr.id}</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-white">{tr.title}</span>
                      <span className="text-[11px] text-[#D0C5AF]/60">{tr.desc}</span>
                    </div>
                  </div>
                  {currentTrack.title === tr.title && isJukeboxPlaying ? (
                    <Radio className="w-4 h-4 text-[#F2CA50] animate-pulse" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-[#D0C5AF]/40" />
                  )}
                </div>
              ))}
            </div>

            {/* Song Request to DJ Form */}
            <form onSubmit={handleDjRequest} className="mt-2 pt-3 border-t border-white/10 flex flex-col gap-2">
              <label
                className="text-[10px] text-[#F2CA50] tracking-wider uppercase font-bold font-mono"
              >
                WANT TO HEAR YOUR FAVORITE TRACK? TELL THE DJ:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={djSongInput}
                  onChange={e => setDjSongInput(e.target.value)}
                  placeholder="e.g. Mauja Hi Mauja, Bole Chudiyan..."
                  className="w-full bg-[#0E0E10] text-white px-3 py-2 rounded text-xs outline-none focus:ring-1 focus:ring-[#F2CA50] border-b border-[#F2CA50]/30"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F2CA50] text-[#131315] rounded text-xs uppercase font-bold shrink-0 hover:bg-[#FFC461] transition-colors"
                >
                  DROP BEAT
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* SECTION 5: "BOX OFFICE" SEAT-SELECTION RSVP */}
        <section id="box-office" className="w-full px-4 py-8 flex flex-col gap-6 bg-[#1C1B1D] border-t border-[#F2CA50]/20 scroll-mt-20">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-1">
              <Ticket className="w-4 h-4 text-[#F2CA50]" />
              <span
                className="text-xs tracking-[0.25em] text-[#F2CA50] uppercase font-bold"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                BOX OFFICE RESERVATIONS
              </span>
            </div>
            <h2
              className="text-2xl text-white font-bold font-serif"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              Reserve Your Premiere Seat
            </h2>
            <p className="text-xs text-[#D0C5AF]/70">Tap seats to reserve your front-row spot for the grand wedding screening.</p>
          </div>

          {/* Curved Screen Visualization */}
          <div className="flex flex-col items-center my-1">
            <div className="w-3/4 h-2 rounded-t-full bg-gradient-to-r from-transparent via-[#F2CA50] to-transparent shadow-[0_0_12px_rgba(242,202,80,0.6)]" />
            <span className="text-[10px] text-[#F2CA50] uppercase tracking-[0.3em] mt-1 font-mono font-bold">
              [ SCREEN THIS WAY • MANDAP VIEW ]
            </span>
          </div>

          {/* Interactive Seating Map */}
          <div className="flex flex-col items-center gap-3 bg-[#0E0E10] p-4 rounded-xl shadow-inner border border-white/5">
            {/* VIP Sofas */}
            <div className="w-full flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-[#FFB4A8] tracking-widest uppercase font-mono font-bold">
                VIP RECLINER SOFAS (FRONT ROW)
              </span>
              <div className="flex gap-2">
                {['VIP-A1', 'VIP-A2', 'VIP-A3', 'VIP-A4', 'VIP-A5'].map(seat => {
                  const isSel = selectedSeats.includes(seat);
                  return (
                    <button
                      key={seat}
                      type="button"
                      onClick={() => toggleSeat(seat)}
                      className={`w-9 h-8 rounded text-[11px] font-mono font-bold transition-all ${
                        isSel
                          ? 'bg-[#F2CA50] text-[#131315] shadow-[0_0_10px_rgba(242,202,80,0.5)]'
                          : 'bg-[#201F21] text-[#D0C5AF]/60 hover:bg-[#F2CA50]/20'
                      }`}
                    >
                      {seat.replace('VIP-', '')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Prime Chairs */}
            <div className="w-full flex flex-col items-center gap-1.5 mt-2">
              <span className="text-[10px] text-[#F2CA50] tracking-widest uppercase font-mono font-bold">
                PRIME GOLD CHAIRS
              </span>
              <div className="flex gap-2">
                {['PRIME-B1', 'PRIME-B2', 'B3', 'B4', 'PRIME-B5'].map(seat => {
                  const label = seat.replace('PRIME-', '');
                  const isSel = selectedSeats.includes(seat) || selectedSeats.includes(label);
                  return (
                    <button
                      key={seat}
                      type="button"
                      onClick={() => toggleSeat(seat)}
                      className={`w-9 h-8 rounded text-[11px] font-mono font-bold transition-all ${
                        isSel
                          ? 'bg-[#F2CA50] text-[#131315] shadow-[0_0_10px_rgba(242,202,80,0.5)]'
                          : 'bg-[#201F21] text-[#D0C5AF]/60 hover:bg-[#F2CA50]/20'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Classic Row */}
            <div className="w-full flex flex-col items-center gap-1.5 mt-2">
              <span className="text-[10px] text-[#D0C5AF]/50 tracking-widest uppercase font-mono font-bold">
                CLASSIC AUDITORIUM
              </span>
              <div className="flex gap-2">
                {['C1', 'C2', 'C3', 'C4', 'C5'].map(seat => {
                  const isSel = selectedSeats.includes(seat);
                  return (
                    <button
                      key={seat}
                      type="button"
                      onClick={() => toggleSeat(seat)}
                      className={`w-9 h-8 rounded text-[11px] font-mono font-bold transition-all ${
                        isSel
                          ? 'bg-[#F2CA50] text-[#131315] shadow-[0_0_10px_rgba(242,202,80,0.5)]'
                          : 'bg-[#201F21] text-[#D0C5AF]/60 hover:bg-[#F2CA50]/20'
                      }`}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-2 pt-2 border-t border-white/10 text-xs text-[#D0C5AF]/70 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#201F21]" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#F2CA50]" />
                <span className="text-[#F2CA50] font-bold">Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#920703]" />
                <span>Booked</span>
              </div>
            </div>
          </div>

          {/* SKEUOMORPHIC MOVIE PASS TICKET PREVIEW */}
          <div className="relative w-full bg-[#2A2A2C] rounded-lg overflow-hidden border-l-4 border-[#F2CA50] shadow-xl">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1C1B1D]" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1C1B1D]" />
            <div className="p-5 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <span
                    className="text-[10px] text-[#F2CA50] tracking-[0.25em] uppercase font-bold"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    VIP RED CARPET ACCESS PASS
                  </span>
                  <h3
                    className="text-base text-white font-bold"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    PREM KI KAHANI: THE WEDDING
                  </h3>
                </div>
                <span className="bg-[#F2CA50]/20 text-[#F2CA50] text-[10px] font-mono px-2 py-1 rounded uppercase tracking-widest font-bold">
                  GATE A
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs border-t border-dashed border-[#F2CA50]/30 pt-3">
                <div>
                  <span className="text-[#D0C5AF]/60 block font-mono text-[10px]">SELECTED SEATS:</span>
                  <span className="text-[#F2CA50] font-bold font-mono">
                    {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                  </span>
                </div>
                <div>
                  <span className="text-[#D0C5AF]/60 block font-mono text-[10px]">TOTAL GUESTS:</span>
                  <span className="text-white font-bold font-mono">
                    {selectedSeats.length} {selectedSeats.length === 1 ? 'Person' : 'Persons'}
                  </span>
                </div>
              </div>

              {/* Cinema Snack Preference */}
              <div className="flex flex-col gap-1.5 pt-2">
                <span className="text-[10px] text-[#D0C5AF]/70 uppercase tracking-wider font-mono">
                  COMPLIMENTARY THEATER REFRESHMENT:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {['Caramel Popcorn', 'Samosa & Chai', 'Gulab Jamun'].map(snack => (
                    <button
                      key={snack}
                      type="button"
                      onClick={() => {
                        setSelectedSnack(snack);
                        showToast(`Snack preference saved: ${snack}!`);
                      }}
                      className={`py-1.5 px-2 rounded text-[10px] font-mono uppercase transition-all ${
                        selectedSnack === snack
                          ? 'bg-[#0E0E10] text-[#F2CA50] border border-[#F2CA50] font-bold'
                          : 'bg-[#1C1B1D] text-[#D0C5AF]/60 hover:text-white'
                      }`}
                    >
                      {snack}
                    </button>
                  ))}
                </div>
              </div>

              {/* Barcode */}
              <div className="flex flex-col items-center pt-2">
                <div className="w-full h-7 flex items-center justify-between px-2 bg-[#0E0E10] rounded opacity-80 overflow-hidden">
                  {[1, 2, 0.5, 3, 1, 2, 0.5, 1.5, 3, 0.5, 2, 1, 3, 1].map((w, idx) => (
                    <div key={idx} className="h-full bg-[#E5E1E4]" style={{ width: `${w * 3}px` }} />
                  ))}
                </div>
                <span className="text-[9px] text-[#99907C] tracking-[0.4em] uppercase font-mono mt-1">
                  PKK-2026-MANDAP-TKT
                </span>
              </div>
            </div>
          </div>

          {/* Form & WhatsApp Button */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={rsvpGuestName}
              onChange={e => setRsvpGuestName(e.target.value)}
              placeholder="Your Full Name (As printed on ticket)"
              className="w-full bg-[#353437] text-white px-4 py-3 rounded text-sm outline-none border-b-2 border-[#F2CA50]/40 focus:border-[#F2CA50]"
            />
            <button
              type="button"
              onClick={confirmRsvpViaWhatsApp}
              className="w-full py-3.5 bg-[#F2CA50] text-[#131315] font-bold tracking-[0.18em] rounded uppercase shadow-[0_0_28px_rgba(242,202,80,0.5)] hover:bg-[#FFC461] transition-transform active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              <Send className="w-4 h-4" />
              <span>BOOK PREMIERE PASS (RSVP VIA WHATSAPP)</span>
            </button>
            <p className="text-xs text-center text-[#99907C] font-mono">
              Admit One Parivaar. Strictly No Spoilers Before 26 December 2026.
            </p>
          </div>
        </section>
      </main>

      {/* TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed bottom-20 left-4 right-4 z-50 bg-[#353437] text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-[#F2CA50]/40">
          <CheckCircle2 className="w-5 h-5 text-[#F2CA50] shrink-0" />
          <span className="text-xs font-mono">{toastMsg}</span>
        </div>
      )}

      {/* FIXED BOTTOM THEATER NAVIGATION BAR */}
      <nav className="fixed bottom-0 w-full z-50 bg-[#0E0E10]/95 backdrop-blur-xl border-t border-[#F2CA50]/20 shadow-[0_-4px_24px_rgba(0,0,0,0.6)]">
        <div className="max-w-md mx-auto flex items-center justify-around h-14 px-2">
          <button
            type="button"
            onClick={() => scrollTo('premiere', 'premiere')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[50px] py-1 px-2 rounded transition-colors ${
              activeTab === 'premiere' ? 'text-[#F2CA50] font-bold' : 'text-[#D0C5AF]/60 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4" />
            <span
              className="text-[9px] uppercase tracking-wider"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Premiere
            </span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo('synopsis-timings', 'events')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[50px] py-1 px-2 rounded transition-colors ${
              activeTab === 'events' ? 'text-[#F2CA50] font-bold' : 'text-[#D0C5AF]/60 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span
              className="text-[9px] uppercase tracking-wider"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Events
            </span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo('cast-crew', 'cast')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[50px] py-1 px-2 rounded transition-colors ${
              activeTab === 'cast' ? 'text-[#F2CA50] font-bold' : 'text-[#D0C5AF]/60 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span
              className="text-[9px] uppercase tracking-wider"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Cast
            </span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo('soundtrack', 'score')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[50px] py-1 px-2 rounded transition-colors ${
              activeTab === 'score' ? 'text-[#F2CA50] font-bold' : 'text-[#D0C5AF]/60 hover:text-white'
            }`}
          >
            <Disc className="w-4 h-4" />
            <span
              className="text-[9px] uppercase tracking-wider"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Score
            </span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo('box-office', 'rsvp')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[50px] py-1 px-2 rounded transition-colors ${
              activeTab === 'rsvp' ? 'text-[#F2CA50] font-bold' : 'text-[#D0C5AF]/60 hover:text-white'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span
              className="text-[9px] uppercase tracking-wider"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              RSVP
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};
