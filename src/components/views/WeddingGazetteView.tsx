import React, { useState, useEffect } from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import { audioManager } from '../../utils/audioManager';
import { Link } from 'react-router-dom';
import {
  Sun,
  Camera,
  Calendar,
  Clock,
  MapPin,
  Quote,
  Sparkles,
  Send,
  Printer,
  CheckCircle2,
  Volume2,
  VolumeX,
  Home,
  Newspaper,
  BookOpen,
  Utensils,
  Mail,
  ExternalLink,
  HelpCircle,
  RotateCcw,
  Award,
  Disc
} from 'lucide-react';

interface WeddingGazetteViewProps {
  template?: CulturalTemplate;
  lang?: Language;
  guestName?: string;
  onLangChange?: (lang: Language) => void;
}

export const WeddingGazetteView: React.FC<WeddingGazetteViewProps> = ({
  template,
  lang: initialLang = 'native',
  guestName,
  onLangChange
}) => {
  // Languages: 'bn' (Bengali / Native), 'hi' (Hindi), 'en' (English)
  const [currentLang, setCurrentLang] = useState<'bn' | 'hi' | 'en'>(
    initialLang === 'native' ? 'bn' : initialLang === 'en' ? 'en' : 'bn'
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHalftone, setIsHalftone] = useState(true);
  const [isVintageSepia, setIsVintageSepia] = useState(false);

  // Crossword state
  const [grid1, setGrid1] = useState<string[]>(['P', '', '', '', '', 'A']);
  const [grid2, setGrid2] = useState<string[]>(['', '', '', '']);
  const [grid3, setGrid3] = useState<string[]>(['G', '', '', '', '', '', 'I']);
  const [showCrosswordSol, setShowCrosswordSol] = useState(false);

  // Puzzle verification
  const isPuzzleSolved = showCrosswordSol || (
    grid1.join('').toUpperCase() === 'PUCHKA' &&
    grid2.join('').toUpperCase() === 'ALOO' &&
    grid3.join('').toUpperCase() === 'GODHULI'
  );

  // RSVP Form State
  const [readerName, setReaderName] = useState(guestName || '');
  const [attendance, setAttendance] = useState('Yes! Attending in full splendour');
  const [feast, setFeast] = useState('Royal Kolkata Biryani & Non-Veg Delicacies');
  const [readerNote, setReaderNote] = useState('');
  const [isTelegraphSent, setIsTelegraphSent] = useState(false);

  // Active Bottom Nav Tab
  const [activeTab, setActiveTab] = useState<'front-page' | 'classifieds' | 'feasts' | 'reply'>('front-page');

  const handleLangToggle = (newLang: 'bn' | 'hi' | 'en') => {
    setCurrentLang(newLang);
    if (onLangChange) {
      onLangChange(newLang === 'bn' ? 'native' : 'en');
    }
  };

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

  const handleRevealCrossword = () => {
    setShowCrosswordSol(true);
    setGrid1(['P', 'U', 'C', 'H', 'K', 'A']);
    setGrid2(['A', 'L', 'O', 'O']);
    setGrid3(['G', 'O', 'D', 'H', 'U', 'L', 'I']);
  };

  const handleResetCrossword = () => {
    setShowCrosswordSol(false);
    setGrid1(['P', '', '', '', '', 'A']);
    setGrid2(['', '', '', '']);
    setGrid3(['G', '', '', '', '', '', 'I']);
  };

  const handleCellChange = (
    gridNum: 1 | 2 | 3,
    idx: number,
    value: string,
    gridLength: number
  ) => {
    const clean = value.replace(/[^a-zA-Z]/g, '').toUpperCase();
    const char = clean.slice(-1);

    if (gridNum === 1) {
      const next = [...grid1];
      next[idx] = char;
      setGrid1(next);
    } else if (gridNum === 2) {
      const next = [...grid2];
      next[idx] = char;
      setGrid2(next);
    } else if (gridNum === 3) {
      const next = [...grid3];
      next[idx] = char;
      setGrid3(next);
    }

    // Auto-focus next block if a letter was typed
    if (char && idx < gridLength - 1) {
      const nextEl = document.getElementById(`cw-cell-${gridNum}-${idx + 1}`);
      if (nextEl) {
        (nextEl as HTMLInputElement).focus();
        (nextEl as HTMLInputElement).select();
      }
    }
  };

  const handleCellKeyDown = (
    gridNum: 1 | 2 | 3,
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const currentVal = gridNum === 1 ? grid1[idx] : gridNum === 2 ? grid2[idx] : grid3[idx];
    if (e.key === 'Backspace') {
      if (!currentVal && idx > 0) {
        const prevEl = document.getElementById(`cw-cell-${gridNum}-${idx - 1}`);
        if (prevEl) {
          (prevEl as HTMLInputElement).focus();
        }
      }
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      const prevEl = document.getElementById(`cw-cell-${gridNum}-${idx - 1}`);
      if (prevEl) {
        (prevEl as HTMLInputElement).focus();
      }
    } else if (e.key === 'ArrowRight') {
      const nextEl = document.getElementById(`cw-cell-${gridNum}-${idx + 1}`);
      if (nextEl) {
        (nextEl as HTMLInputElement).focus();
      }
    }
  };

  const handleCellPaste = (
    gridNum: 1 | 2 | 3,
    e: React.ClipboardEvent<HTMLInputElement>,
    gridLength: number
  ) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').toUpperCase().replace(/[^A-Z]/g, '');
    if (!pasted) return;

    const chars = pasted.slice(0, gridLength).split('');
    if (gridNum === 1) {
      const next = [...grid1];
      chars.forEach((c, i) => { if (i < gridLength) next[i] = c; });
      setGrid1(next);
    } else if (gridNum === 2) {
      const next = [...grid2];
      chars.forEach((c, i) => { if (i < gridLength) next[i] = c; });
      setGrid2(next);
    } else if (gridNum === 3) {
      const next = [...grid3];
      chars.forEach((c, i) => { if (i < gridLength) next[i] = c; });
      setGrid3(next);
    }

    const targetIdx = Math.min(chars.length, gridLength) - 1;
    const targetEl = document.getElementById(`cw-cell-${gridNum}-${targetIdx}`);
    if (targetEl) {
      (targetEl as HTMLInputElement).focus();
    }
  };

  const groom = template?.groom?.name || 'Anirban';
  const bride = template?.bride?.name || 'Deboleena';
  const customHeadline = template?.quotes?.verse;
  const customSubhead = template?.quotes?.subInvocation;

  // Dynamic Events
  const events = template?.events || [];
  const sangeetEvent = events.find(e => e.key === 'sangeet' || e.key === 'gaye_holud' || e.key === 'haldi') || events[0];
  const vivahEvent = events.find(e => e.key === 'wedding' || e.key === 'vivah') || events[1] || events[0];
  const receptionEvent = events.find(e => e.key === 'reception') || events[2] || events[events.length - 1];

  const mainDateStr = template?.targetDateNative || (template?.targetDate ? new Date(template.targetDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '12 Dec 2026');
  const mainVenueName = template?.venue?.name || 'The Heritage Rajbari';

  const handleAddToCalendar = (title: string, isoDate: string) => {
    const text = encodeURIComponent(`${title} — ${groom} & ${bride}'s Wedding`);
    const cleanDate = isoDate.replace(/-|:|\.\d\d\d/g, '');
    const dates = encodeURIComponent(`${cleanDate}/${cleanDate}`);
    const details = encodeURIComponent('Grand nuptial celebrations. See The Wedding Gazette for dress code & feasts!');
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}`;
    window.open(gcalUrl, '_blank');
  };

  const handleDispatchTelegraph = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTelegraphSent(true);

    const message =
      `📰 *THE WEDDING GAZETTE TELEGRAPH RSVP*\n\n` +
      `👤 *Passenger:* ${readerName || 'Respected Guest'}\n` +
      `💌 *Dispatch:* ${attendance}\n` +
      `🍛 *Feast Preference:* ${feast}\n` +
      `✍️ *Telegram Note:* ${readerNote || 'Heartiest congratulations to ' + groom + ' & ' + bride + '!'}`;

    const hostNumber = template?.rsvpContacts?.[0]?.whatsappNumber?.replace(/[^0-9]/g, '');
    const targetNumber = hostNumber || '916203868358';
    const waUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 700);
  };

  const scrollToSection = (id: string, tab: 'front-page' | 'classifieds' | 'feasts' | 'reply') => {
    setActiveTab(tab);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamic Headline by language
  const headlines = {
    en: {
      edition: 'THE SPECIAL EDITION • AUTUMN 2026',
      subdeck: customSubhead || 'Seven sacred pheras scheduled under auspicious planetary alignment; lifelong bachelorhood officially declared an endangered species.',
      mainTitle: customHeadline || `${groom.toUpperCase()} & ${bride.toUpperCase()} TO TIE THE KNOT; CITY BRACES FOR BIRIYANI!`,
      articleTitle: `A CHRONICLE OF TWO HEARTS: ${groom.toUpperCase()} & ${bride.toUpperCase()}'S SACRED MATRIMONY`,
      articleText:
        'It commenced on a lukewarm autumn dusk when our correspondents noted mutual skirmishes over the bill at Flurys. What seemed to neutral observers as a routine philosophical debate on cinema rapidly matured into an unbreakable treaty. Over four hundred cups of Darjeeling tea, cross-state train commutes, and shared playlists, the verdict was rendered unanimous: life without the other was simply substandard editorial prose.',
      brideQuote: `"He offered an unconditional treaty: perpetual puchkas & quiet during cricket tests." — ${bride}`,
      groomQuote: `"The presence of a golden fried Kolkata biryani aloo was non-negotiable in the marriage accord." — ${groom}`
    },
    bn: {
      edition: 'মাঙ্গলিক বিশেষ সংস্করণ • কার্তিক ১৪৩৩',
      subdeck: customSubhead || 'শুভ গ্রহসমাবেশে মাঙ্গলিক সাত পাকের দিন ধার্য; ব্যাচেলরহুড আনুষ্ঠানিকভাবে বিলুপ্ত প্রজাতি ঘোষিত।',
      mainTitle: customHeadline || `${groom} ও ${bride}-র শুভ পরিণয়; শহরের বিরিয়ানি রসিকরা প্রস্তুত!`,
      articleTitle: `দুই হৃদয়ের শুভ মিলন কথা: ${groom} ও ${bride}-র শুভ পরিণয় বার্তা`,
      articleText:
        'কলকাতার এক মনোরম শরতের সন্ধ্যায় ফ্লুরিসে চায়ের কাপে শুরু হয়েছিল সম্পর্কের শুভ সূচনা। যা ছিল শুধুই সাহিত্যের বিতর্ক, সময়ের সাথে সাথে তা রূপ নিল গভীর প্রণয়ে। চারশত কাপ দার্জিলিং চা, রবীন্দ্রসঙ্গীতের সুর আর মান-অভিমানের পথ পেরিয়ে আজ তারা একসূত্রে বাঁধা। জীবনের এই শুভক্ষণে দুই পরিবার সাক্ষী হতে চলেছে এক অনন্য ঐতিহাসিক মিলন উৎসবের।',
      brideQuote: `"বিবাহের অপরিবর্তনীয় চুক্তি: অফুরন্ত ফুচকা এবং টেস্ট ক্রিকেটের সময় শান্তি। কাবুলিওয়ালার দেশে ভালোবাসা চিরন্তন।" — ${bride}`,
      groomQuote: `"কলকাতা বিরিয়ানির প্রতিটি প্লেটে সোনালী ভাজা আলুর উপস্থিতি এই বৈবাহিক চুক্তির প্রধান শর্ত ছিল।" — ${groom}`
    },
    hi: {
      edition: 'विशेष वैवाहिक संस्करण • शरद ऋतु २०२६',
      subdeck: customSubhead || 'शुभ लग्न और वैदिक मंत्रोच्चार के साथ सात फेरों की घोषणा; बैचलरहुड की विदाई समारोह शुरू।',
      mainTitle: customHeadline || `${groom} एवं ${bride} का शुभ विवाह; कोलकाता में जश्न का ऐलान!`,
      articleTitle: `दो दिलों की अमर दास्तान: ${groom} और ${bride} के सात जन्मों का बंधन`,
      articleText:
        'यह दास्तान शुरू हुई पार्क स्ट्रीट की एक हसीन शाम, जब दोनों परिवारों का स्नेह एक धागे में पिरोया गया। समय के साथ यह दोस्ती अटूट प्रेम और विश्वास में बदल गई। आज ढोल-नगाड़ों और शंखनाद के बीच दोनों जीवन साथी बनने जा रहे हैं। कोलकाता से दिल्ली तक जश्न का माहौल है और सभी आत्मीय परिजन इस मांगलिक उत्सव के साक्षी बन रहे हैं।',
      brideQuote: `"विवाह की पूर्व शर्त: कभी न खत्म होने वाली फुचका पार्टी और क्रिकेट मैच के दौरान पूर्ण शांति।" — ${bride}`,
      groomQuote: `"शाही कोलकाता दम बिरयानी में खुशबूदार बड़ा आलू हमारे इस नए गठबंधन की सबसे अहम शर्त थी।" — ${groom}`
    }
  };

  const content = headlines[currentLang];

  return (
    <div
      className={`relative min-h-screen ${
        isVintageSepia ? 'bg-[#F4EBD0]' : 'bg-[#FDF9EF]'
      } text-[#1C1C16] selection:bg-[#B51C12] selection:text-white pb-28 antialiased transition-colors duration-500`}
      style={{
        fontFamily: "'Newsreader', Georgia, serif"
      }}
    >
      {/* AUTHENTIC PRINT BROADSHEET STYLING */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm 12mm;
          }
          body, html {
            background-color: #ffffff !important;
            color: #000000 !important;
            font-size: 10pt !important;
          }
          header, nav, button, .print\\:hidden, #readers-reply form button, a[href*="maps.google.com"], input, textarea {
            display: none !important;
          }
          #front-page, #classifieds, #feasts-and-fun, #readers-reply {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          img {
            filter: grayscale(100%) contrast(140%) !important;
            max-width: 100% !important;
          }
          .shadow-sm, .shadow-md, .shadow-lg, .shadow-xl {
            box-shadow: none !important;
          }
          .border, .border-t, .border-b {
            border-color: #000000 !important;
          }
          .bg-\\[\\#ECE8DE\\], .bg-\\[\\#F2EEE4\\], .bg-\\[\\#E6E2D8\\] {
            background-color: #f7f7f7 !important;
          }
        }
      `}</style>

      {/* Vertical Broadsheet Centerfold Crease */}
      {isVintageSepia && (
        <div className="pointer-events-none fixed inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-black/5 via-black/15 to-black/5 shadow-[0_0_8px_rgba(0,0,0,0.08)] z-30 print:hidden" />
      )}

      {/* VINTAGE BROADSHEET MASTHEAD HEADER */}
      <header className="sticky top-0 w-full z-50 bg-[#FDF9EF]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-[#1C1C16]/20 print:hidden">
        <div className="max-w-2xl mx-auto px-4 py-2 flex flex-col justify-between">
          {/* Top Line: Weather, Issue, Home Link & Audio */}
          <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-[#1C1C16]/70 pb-1 border-b border-[#1C1C16]/10">
            <div className="flex items-center gap-1.5 text-[#B51C12] font-bold">
              <Sun className="w-3.5 h-3.5" />
              <span>76°F • CLEAR SKIES</span>
            </div>
            <span className="uppercase font-bold tracking-widest text-[#B51C12]">ISSUE NO. XXIV</span>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleAudio}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full transition-all border ${
                  isPlaying
                    ? 'bg-[#B51C12] text-white border-[#B51C12] shadow-xs'
                    : 'bg-[#1C1C16]/5 hover:bg-[#1C1C16]/10 text-[#1C1C16] border-[#1C1C16]/15'
                }`}
                title={isPlaying ? 'Pause Vintage Gramophone' : 'Play 1920s Acoustic Gramophone'}
                type="button"
              >
                <Disc className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
                <span className="font-mono text-[9px] uppercase font-bold tracking-wider hidden sm:inline">
                  {isPlaying ? '78 RPM Live' : 'Phonograph'}
                </span>
                {isPlaying ? <Volume2 className="w-3 h-3 text-white" /> : <VolumeX className="w-3 h-3 text-[#1C1C16]/60" />}
              </button>
              <Link
                to="/"
                className="w-7 h-7 rounded-full bg-[#1C1C16] flex items-center justify-center text-[#FDF9EF] hover:bg-[#B51C12] transition-colors shadow-sm"
                title="Back to Platform Home"
              >
                <Home className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Masthead Main Title */}
          <div className="flex flex-col items-center justify-center text-center py-1">
            <h1
              className="text-2xl sm:text-3xl tracking-tight text-[#1C1C16] leading-tight uppercase font-black"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              The Wedding Gazette
            </h1>
            <span className="text-[11px] italic text-[#1C1C16]/60 tracking-wider font-serif">
              বিয়ের খবর • शादी समाचार • THE WEDDING CHRONICLE
            </span>
          </div>

          {/* Sub-masthead line */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#1C1C16]/60 pt-0.5 border-t border-[#1C1C16]/10">
            <span className="uppercase">{content.edition}</span>
            <span className="uppercase text-[#1C1C16] font-bold tracking-widest px-2 py-0.5 bg-[#1C1C16]/5 rounded">
              Front Page
            </span>
            <span className="uppercase">KOLKATA BUREAU</span>
          </div>
        </div>
      </header>

      {/* MAIN BROADSHEET NEWSPAPER CANVAS */}
      <main className="max-w-2xl mx-auto px-4 pt-4">
        {/* VINTAGE NEWSPRINT DATELINE BANNER & LANGUAGE SWITCHER */}
        <div className="flex flex-col bg-[#ECE8DE] text-[#1C1C16] px-4 py-2.5 mb-5 rounded shadow-sm border border-[#1C1C16]/10">
          <div className="flex flex-wrap items-center justify-between gap-y-1 font-mono text-[11px] text-[#B51C12] font-bold tracking-widest pb-1 border-b border-[#1C1C16]/10">
            <span>VOL. I, ISSUE 1</span>
            <span>KOLKATA & DELHI EDITIONS</span>
            <span>PRICE: PRICELESS</span>
          </div>
          <div className="flex items-center justify-between pt-1.5 font-mono text-[11px] text-[#1C1C16]/70">
            <div className="flex items-center gap-1 truncate pr-2">
              <span className="text-[#B51C12] text-xs">★</span>
              <span className="truncate">FORECAST: 100% TEARS OF JOY & HIGH GHEE</span>
            </div>

            {/* Multilingual Toggle Pills and Vintage Sepia Toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsVintageSepia(!isVintageSepia)}
                className={`font-mono text-[10px] px-2 py-0.5 rounded transition-all border flex items-center gap-1 ${
                  isVintageSepia
                    ? 'bg-[#8B5A2B] text-white border-[#8B5A2B] shadow-xs'
                    : 'bg-[#E6E2D8] text-[#1C1C16] border-[#1C1C16]/20 hover:border-[#B51C12]'
                }`}
                title="Toggle 1920s Aged Newsprint Patina & Centerfold Crease"
              >
                <span>{isVintageSepia ? '🗞️ Aged 1926' : '📰 Fresh Press'}</span>
              </button>

              <div className="flex items-center gap-1 bg-[#E6E2D8] px-2 py-0.5 rounded-full shrink-0 border border-[#1C1C16]/15">
                <button
                  type="button"
                  onClick={() => handleLangToggle('bn')}
                  className={`font-mono text-[10px] px-2 py-0.5 rounded transition-all ${
                    currentLang === 'bn' ? 'bg-[#1C1C16] text-[#FDF9EF] font-bold shadow-sm' : 'text-[#1C1C16] hover:text-[#B51C12]'
                  }`}
                >
                  বিয়ের খবর
                </button>
                <span className="text-[#1C1C16]/30 text-[10px]">•</span>
                <button
                  type="button"
                  onClick={() => handleLangToggle('hi')}
                  className={`font-mono text-[10px] px-2 py-0.5 rounded transition-all ${
                    currentLang === 'hi' ? 'bg-[#1C1C16] text-[#FDF9EF] font-bold shadow-sm' : 'text-[#1C1C16] hover:text-[#B51C12]'
                  }`}
                >
                  शादी समाचार
                </button>
                <span className="text-[#1C1C16]/30 text-[10px]">•</span>
                <button
                  type="button"
                  onClick={() => handleLangToggle('en')}
                  className={`font-mono text-[10px] px-2 py-0.5 rounded transition-all ${
                    currentLang === 'en' ? 'bg-[#1C1C16] text-[#FDF9EF] font-bold shadow-sm' : 'text-[#1C1C16] hover:text-[#B51C12]'
                  }`}
                >
                  ENG
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: FRONT-PAGE LEAD BANNER HEADLINE */}
        <section id="front-page" className="scroll-mt-28">
          <div className="flex flex-col text-center mb-6">
            <div className="inline-block self-center mb-2 bg-[#B51C12] text-white font-mono text-[10px] px-2.5 py-0.5 tracking-widest uppercase rounded-sm font-bold shadow-sm">
              ★ SPECIAL NUPTIAL DISPATCH ★
            </div>
            <h2
              className="text-2xl sm:text-3xl text-[#1C1C16] tracking-tight font-black uppercase leading-tight mb-2"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              {content.mainTitle}
            </h2>
            <p className="text-sm italic text-[#1C1C16]/70 leading-snug max-w-xl mx-auto font-serif">
              {content.subdeck}
            </p>
          </div>

          {/* HERO HALFTONE / RETRO PRINT PHOTOGRAPH WITH LIVE PLATE TOGGLE */}
          <div className="flex flex-col bg-[#ECE8DE] rounded p-2.5 shadow-sm mb-6 border border-[#1C1C16]/10 relative overflow-hidden">
            {/* Archival Inspection Stamp */}
            <div className="flex items-center justify-between mb-1.5 font-mono text-[11px] text-[#1C1C16]/70">
              <span className="flex items-center gap-1 font-semibold">
                <Camera className="w-3.5 h-3.5 text-[#B51C12]" />
                ARCHIVE PRESS NEGATIVE #1973-AD
              </span>
              <span className="text-[#B51C12] font-bold tracking-widest uppercase">FIRST EDITION WIRE</span>
            </div>

            {/* The Image Frame with Vintage Halftone effect toggle */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded bg-[#E6E2D8] border border-[#1C1C16]/15">
              <img
                src="/images/couples/vintage_gazette.jpg"
                alt="Anirban and Deboleena in traditional wedding finery"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isHalftone ? 'filter grayscale contrast-125 brightness-95' : 'filter brightness-100 contrast-105'
                }`}
              />
              {/* Vintage Dot Matrix Screen Filter Overlay */}
              <div
                className={`absolute inset-0 pointer-events-none mix-blend-multiply bg-[radial-gradient(circle,#000_1.5px,transparent_1.5px)] [background-size:6px_6px] transition-opacity duration-500 ${
                  isHalftone ? 'opacity-40' : 'opacity-0'
                }`}
              />
              {/* Stamp rotated on photo */}
              <div className="absolute bottom-3 right-3 pointer-events-none rotate-[-8deg] bg-[#FDF9EF]/95 text-[#B51C12] px-2.5 py-1 rounded shadow-md border border-[#B51C12]/30">
                <span className="font-mono text-[10px] font-black tracking-widest uppercase">
                  PRESS APPROVED • KOLKATA BUREAU
                </span>
              </div>
            </div>

            {/* Toggle Press Button */}
            <div className="flex items-center justify-between mt-2 pt-1 bg-[#F2EEE4] rounded px-3 py-1.5 border border-[#1C1C16]/10">
              <div className="text-xs text-[#1C1C16]/70 italic truncate pr-2 font-serif">
                {isHalftone ? 'Plate: 1973 Letterpress Monochrome' : 'Plate: 4-Color Offset Chromatic'}
              </div>
              <button
                type="button"
                onClick={() => setIsHalftone(!isHalftone)}
                className="flex items-center gap-1.5 bg-[#1C1C16] text-[#FDF9EF] font-mono text-[10px] uppercase font-bold px-3 py-1.5 rounded transition-transform active:scale-95 shadow-sm hover:bg-[#B51C12]"
              >
                <span>{isHalftone ? 'Reveal Color Print' : 'Restore 1973 Newsprint'}</span>
              </button>
            </div>

            {/* Historical Editorial Caption & Pull Quotes */}
            <div className="mt-2.5 bg-[#FFFFFF] p-3 rounded border border-[#1C1C16]/10">
              <p className="text-xs text-[#1C1C16] leading-snug mb-2 font-serif">
                <strong className="font-mono uppercase tracking-wider text-[#1C1C16] text-[10px] block mb-0.5">
                  OFFICIAL MEMOIR:
                </strong>
                The ecstatic couple pictured exchanging varmalas amidst showered rose petals and auspicious conch shelling.
              </p>
              <div className="flex flex-col gap-2 font-serif text-xs italic text-[#1C1C16]/80 pt-1 border-t border-[#1C1C16]/10">
                <div className="flex items-start gap-1.5">
                  <Quote className="w-3.5 h-3.5 text-[#B51C12] shrink-0 mt-0.5" />
                  <span>
                    <strong>Bride Deboleena:</strong> {content.brideQuote}
                  </span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Quote className="w-3.5 h-3.5 text-[#B51C12] shrink-0 mt-0.5" />
                  <span>
                    <strong>Groom Anirban:</strong> {content.groomQuote}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION I: BROADSHEET ARTICLES & HUMOROUS WEATHER */}
          <div className="flex flex-col gap-4 mb-6">
            {/* Lead Column Article with Drop-Cap */}
            <article className="bg-[#F2EEE4] p-4 rounded shadow-sm border border-[#1C1C16]/10">
              <div className="flex items-center justify-between font-mono text-[10px] text-[#B51C12] font-bold tracking-wider mb-1.5">
                <span>EXCLUSIVE FRONT PAGE FEATURE</span>
                <span>PARK STREET DISPATCH</span>
              </div>
              <h3
                className="text-lg sm:text-xl text-[#1C1C16] font-bold mb-2 leading-tight"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                {content.articleTitle}
              </h3>
              <div className="text-xs sm:text-sm text-[#1C1C16] text-justify leading-relaxed font-serif">
                <span
                  className="float-left text-4xl leading-none font-bold pr-2 pt-0.5 text-[#B51C12]"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  {currentLang === 'bn' ? 'ক' : currentLang === 'hi' ? 'य' : 'I'}
                </span>
                {content.articleText}
              </div>
            </article>

            {/* Humorous Weekend Weather Forecast Table */}
            <div className="bg-[#ECE8DE] p-4 rounded shadow-sm border border-[#1C1C16]/10">
              <div className="flex items-center gap-2 mb-1.5">
                <Sun className="w-5 h-5 text-[#B51C12]" />
                <h4
                  className="text-base text-[#1C1C16] font-bold uppercase tracking-tight"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  METEOROLOGICAL BULLETIN
                </h4>
              </div>
              <p className="text-xs italic text-[#1C1C16]/70 mb-3 font-serif">
                Special weekend wedding barometric outlook for all visiting delegates:
              </p>
              <div className="flex flex-col gap-2 text-xs font-serif">
                {/* Friday */}
                <div className="flex items-start gap-3 bg-[#F2EEE4] p-2.5 rounded border border-[#1C1C16]/10">
                  <div className="w-20 shrink-0 font-mono text-[10px] font-bold text-[#B51C12] uppercase">
                    FRI • 11 DEC
                  </div>
                  <div className="flex flex-col text-[#1C1C16]">
                    <span className="font-bold">Gaye Holud & Mustard Squalls</span>
                    <span className="text-[#1C1C16]/75">
                      Torrential shower of turmeric pastes and sweet mustard oil. Visual range severely reduced to bright yellow; high silk stain hazard.
                    </span>
                  </div>
                </div>

                {/* Saturday */}
                <div className="flex items-start gap-3 bg-[#F2EEE4] p-2.5 rounded border border-[#1C1C16]/10">
                  <div className="w-20 shrink-0 font-mono text-[10px] font-bold text-[#B51C12] uppercase">
                    SAT • 12 DEC
                  </div>
                  <div className="flex flex-col text-[#1C1C16]">
                    <span className="font-bold">The Main Shubh Vivah Gala</span>
                    <span className="text-[#1C1C16]/75">
                      Intense humidity of unscripted maternal advice; 99% probability of dhol-induced tectonic tremors across the mandap perimeter.
                    </span>
                  </div>
                </div>

                {/* Sunday */}
                <div className="flex items-start gap-3 bg-[#F2EEE4] p-2.5 rounded border border-[#1C1C16]/10">
                  <div className="w-20 shrink-0 font-mono text-[10px] font-bold text-[#B51C12] uppercase">
                    SUN • 13 DEC
                  </div>
                  <div className="flex flex-col text-[#1C1C16]">
                    <span className="font-bold">Bhoj Feast & Reception Gale</span>
                    <span className="text-[#1C1C16]/75">
                      Severe gale-force aromas of Mutton Rezala and steaming Basmati. Zero percent resistance to second helpings of warm rosogollas.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION II: THE CLASSIFIEDS & PUBLIC NOTICES */}
        <section id="classifieds" className="scroll-mt-28 mb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-5 h-5 text-[#B51C12]" />
              <h3
                className="text-lg sm:text-xl text-[#1C1C16] font-bold uppercase tracking-tight"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                The Classifieds & Public Notices
              </h3>
            </div>
            <span className="font-mono text-[10px] text-[#1C1C16]/60 uppercase tracking-widest">PAGE IV</span>
          </div>

          <div className="flex flex-col gap-3">
            {/* Box 1 */}
            <div className="bg-[#FFFFFF] p-4 rounded shadow-sm border border-[#1C1C16]/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] text-[#B51C12] font-bold mb-1">
                  <span>CLASSIFIED NO. 0812</span>
                  <span>AIBUROBHAT & SANGEET</span>
                </div>
                <h4
                  className="text-base text-[#1C1C16] font-bold mb-1"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  SITUATION VACANT: Groomhood Assumed
                </h4>
                <p className="text-xs text-[#1C1C16]/80 mb-3 font-serif">
                  Bachelor status formally revoked by order of council. Candidate will present himself for final family feast (Aiburobhat) followed by unrestrained rhythmic choreography.
                </p>
                <div className="flex flex-wrap gap-2 text-[#1C1C16] font-mono text-[11px] mb-3 bg-[#F2EEE4] p-2 rounded border border-[#1C1C16]/10">
                  <span><strong>DATE:</strong> {sangeetEvent?.date || '11 Dec 2026'}</span>
                  <span>•</span>
                  <span><strong>DRESS:</strong> {sangeetEvent?.dressCode || 'Handloom Tussar & Kurtas'}</span>
                  <span>•</span>
                  <span><strong>TIME:</strong> {sangeetEvent?.time || '6:00 PM Onwards'}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleAddToCalendar(sangeetEvent?.title || 'Aiburobhat & Sangeet', sangeetEvent?.calendarTimes?.start || '2026-12-11T18:00:00')}
                className="self-start flex items-center gap-1.5 bg-[#1C1C16] text-[#FDF9EF] font-mono text-[10px] uppercase px-3 py-1.5 rounded transition-transform active:scale-95 shadow-sm hover:bg-[#B51C12]"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Add To Calendar</span>
              </button>
            </div>

            {/* Box 2 */}
            <div className="bg-[#F2EEE4] p-4 rounded shadow-sm border border-[#1C1C16]/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] text-[#B51C12] font-bold mb-1">
                  <span>SPECIAL GAZETTE NOTICE</span>
                  <span>THE WEDDING CEREMONY</span>
                </div>
                <h4
                  className="text-base text-[#1C1C16] font-bold mb-1"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  PUBLIC NOTICE: Shubh Vivah & Saat Paak
                </h4>
                <p className="text-xs text-[#1C1C16]/80 mb-3 font-serif">
                  All esteemed kin and comrades are summoned under the sacred canopy for the saat paak, sindoor daan, and auspicious blowing of shankhas at Godhuli lagna.
                </p>
                <div className="flex flex-wrap gap-2 text-[#1C1C16] font-mono text-[11px] mb-3 bg-[#ECE8DE] p-2 rounded border border-[#1C1C16]/10">
                  <span><strong>DATE:</strong> {vivahEvent?.date || mainDateStr}</span>
                  <span>•</span>
                  <span><strong>LAGNA:</strong> {vivahEvent?.time || '6:45 PM Sharp'}</span>
                  <span>•</span>
                  <span><strong>VENUE:</strong> {vivahEvent?.venueName || mainVenueName}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleAddToCalendar(vivahEvent?.title || 'Shubh Vivah Nuptials', vivahEvent?.calendarTimes?.start || (template?.targetDate || '2026-12-12T18:45:00'))}
                className="self-start flex items-center gap-1.5 bg-[#B51C12] text-white font-mono text-[10px] uppercase px-3 py-1.5 rounded transition-transform active:scale-95 shadow-sm hover:bg-[#1C1C16]"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Summon to Calendar</span>
              </button>
            </div>

            {/* Box 3 */}
            <div className="bg-[#FFFFFF] p-4 rounded shadow-sm border border-[#1C1C16]/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] text-[#B51C12] font-bold mb-1">
                  <span>GASTRONOMIC NOTICE</span>
                  <span>THE ROYAL RECEPTION</span>
                </div>
                <h4
                  className="text-base text-[#1C1C16] font-bold mb-1"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  WANTED: Voracious Appetites for Royal Bhoj
                </h4>
                <p className="text-xs text-[#1C1C16]/80 mb-3 font-serif">
                  Generous provisions of Kolkata Mutton Rezala, Bhetki Paturi, and hot syrupy sweets prepared for guests of honor. Tight waistbands strictly discouraged.
                </p>
                <div className="flex flex-wrap gap-2 text-[#1C1C16] font-mono text-[11px] mb-3 bg-[#F2EEE4] p-2 rounded border border-[#1C1C16]/10">
                  <span><strong>DATE:</strong> {receptionEvent?.date || '13 Dec 2026'}</span>
                  <span>•</span>
                  <span><strong>DINNER:</strong> {receptionEvent?.time || '7:30 PM Till Midnight'}</span>
                  <span>•</span>
                  <span><strong>HALL:</strong> {receptionEvent?.venueName || mainVenueName}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleAddToCalendar(receptionEvent?.title || 'Royal Reception & Feast', receptionEvent?.calendarTimes?.start || '2026-12-13T19:30:00')}
                className="self-start flex items-center gap-1.5 bg-[#1C1C16] text-[#FDF9EF] font-mono text-[10px] uppercase px-3 py-1.5 rounded transition-transform active:scale-95 shadow-sm hover:bg-[#B51C12]"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Add To Calendar</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION III: ASTRO-GUIDANCE & OBITUARY COLUMN */}
        <section id="feasts-and-fun" className="scroll-mt-28 mb-6">
          <div className="flex flex-col gap-4">
            {/* Astrological Predictions */}
            <div className="bg-[#ECE8DE] p-4 rounded shadow-sm border border-[#1C1C16]/10">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] text-[#B51C12] font-bold uppercase tracking-wider">
                  ASTRO-GUIDANCE
                </span>
                <Sparkles className="w-4 h-4 text-[#B51C12]" />
              </div>
              <h3
                className="text-base sm:text-lg text-[#1C1C16] font-bold mb-2"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                Today's Nuptial Zodiac for Attendees
              </h3>
              <div className="flex flex-col gap-2 text-xs font-serif">
                <div className="bg-[#F2EEE4] p-2.5 rounded border border-[#1C1C16]/10">
                  <span className="font-bold text-[#1C1C16] block mb-0.5">THE FOODIE (Taurus / Vrishabha):</span>
                  <p className="text-[#1C1C16]/75">
                    Planetary transit guarantees inner nirvana beside the mutton counter. Cease conversational pleasantries while savoring crispy luchi.
                  </p>
                </div>
                <div className="bg-[#F2EEE4] p-2.5 rounded border border-[#1C1C16]/10">
                  <span className="font-bold text-[#1C1C16] block mb-0.5">THE DANCE BARON (Leo / Simha):</span>
                  <p className="text-[#1C1C16]/75">
                    Mars encourages bold footwork upon the dhol's second cadence. Be mindful of sherwani seams during rapid pirouettes.
                  </p>
                </div>
                <div className="bg-[#F2EEE4] p-2.5 rounded border border-[#1C1C16]/10">
                  <span className="font-bold text-[#1C1C16] block mb-0.5">THE WEEPING ELDER (Cancer / Kark):</span>
                  <p className="text-[#1C1C16]/75">
                    Emotional downpours forecast during the Kanyadaan. Station embroidered linen kerchiefs directly within top pockets.
                  </p>
                </div>
              </div>
            </div>

            {/* Humorous Obituary Column */}
            <div className="bg-[#FFFFFF] p-4 rounded shadow-sm border border-[#1C1C16]/15 relative overflow-hidden">
              <div className="flex items-center justify-center gap-2 mb-2 text-[#B51C12] font-bold">
                <span className="font-mono text-[11px] uppercase tracking-widest">OBITUARY NOTICES</span>
              </div>
              <div className="text-center bg-[#F2EEE4] p-3 rounded border border-[#1C1C16]/10">
                <h4
                  className="text-sm sm:text-base text-[#1C1C16] font-bold uppercase mb-1"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  IN LOVING MEMORY OF BACHELORHOOD
                </h4>
                <div className="font-mono text-[10px] text-[#B51C12] mb-2">
                  (BORN CIRCA 1995 — SOLEMNLY DEPARTED 2026)
                </div>
                <p className="text-xs text-[#1C1C16]/75 italic mb-2 leading-relaxed font-serif">
                  Survived by unmade mattresses, 2 AM video game lobbies, spontaneous road trips, and questionable kitchen experiments. Rejoicing in its place is blissful domestic partnership, gourmet dinners, and joint calendar invites.
                </p>
                <span className="font-mono text-[9px] text-[#1C1C16] font-bold tracking-wider uppercase block">
                  NO WREATHS NECESSARY • SHOWER BLESSINGS & ENVELOPES ONLY
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION IV: INTERACTIVE WEDDING CROSSWORD / PUZZLE */}
        <section className="mb-6">
          <div className="flex flex-col bg-[#ECE8DE] p-4 rounded shadow-sm border border-[#1C1C16]/10">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] text-[#B51C12] font-bold uppercase tracking-wider">
                DAILY BRAIN-TEASER
              </span>
              <HelpCircle className="w-4 h-4 text-[#B51C12]" />
            </div>
            <h3
              className="text-base sm:text-lg text-[#1C1C16] font-bold mb-1"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              The Nuptial Crossword Gazette
            </h3>
            <p className="text-xs text-[#1C1C16]/70 italic mb-3 font-serif">
              Test your intimacy with the bride and groom before the first toast:
            </p>

            {/* Crossword mini puzzle board */}
            <div className="flex flex-col gap-2.5 bg-[#F2EEE4] p-3 rounded mb-3 border border-[#1C1C16]/10">
              {/* Clue 1 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#1C1C16]">
                  <span>1 ACROSS: Groom's preferred weekend street food (6)</span>
                  {showCrosswordSol && (
                    <span className="font-mono font-bold text-[#B51C12]">PUCHKA</span>
                  )}
                </div>
                <div className="flex gap-1.5">
                  {grid1.map((val, idx) => (
                    <input
                      key={`g1-${idx}`}
                      id={`cw-cell-1-${idx}`}
                      type="text"
                      maxLength={1}
                      value={val}
                      onChange={e => handleCellChange(1, idx, e.target.value, grid1.length)}
                      onKeyDown={e => handleCellKeyDown(1, idx, e)}
                      onPaste={e => handleCellPaste(1, e, grid1.length)}
                      className="w-8 h-8 text-center uppercase font-mono font-bold text-[#1C1C16] bg-[#FFFFFF] rounded shadow-sm border border-[#1C1C16]/20 focus:outline-none focus:border-[#B51C12]"
                    />
                  ))}
                </div>
              </div>

              {/* Clue 2 */}
              <div className="flex flex-col gap-1 pt-1">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#1C1C16]">
                  <span>2 ACROSS: The true soul of Kolkata Biryani (4)</span>
                  {showCrosswordSol && (
                    <span className="font-mono font-bold text-[#B51C12]">ALOO</span>
                  )}
                </div>
                <div className="flex gap-1.5">
                  {grid2.map((val, idx) => (
                    <input
                      key={`g2-${idx}`}
                      id={`cw-cell-2-${idx}`}
                      type="text"
                      maxLength={1}
                      value={val}
                      onChange={e => handleCellChange(2, idx, e.target.value, grid2.length)}
                      onKeyDown={e => handleCellKeyDown(2, idx, e)}
                      onPaste={e => handleCellPaste(2, e, grid2.length)}
                      className="w-8 h-8 text-center uppercase font-mono font-bold text-[#1C1C16] bg-[#FFFFFF] rounded shadow-sm border border-[#1C1C16]/20 focus:outline-none focus:border-[#B51C12]"
                    />
                  ))}
                </div>
              </div>

              {/* Clue 3 */}
              <div className="flex flex-col gap-1 pt-1">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#1C1C16]">
                  <span>3 ACROSS: Auspicious twilight hour of nuptials (7)</span>
                  {showCrosswordSol && (
                    <span className="font-mono font-bold text-[#B51C12]">GODHULI</span>
                  )}
                </div>
                <div className="flex gap-1.5">
                  {grid3.map((val, idx) => (
                    <input
                      key={`g3-${idx}`}
                      id={`cw-cell-3-${idx}`}
                      type="text"
                      maxLength={1}
                      value={val}
                      onChange={e => handleCellChange(3, idx, e.target.value, grid3.length)}
                      onKeyDown={e => handleCellKeyDown(3, idx, e)}
                      onPaste={e => handleCellPaste(3, e, grid3.length)}
                      className="w-8 h-8 text-center uppercase font-mono font-bold text-[#1C1C16] bg-[#FFFFFF] rounded shadow-sm border border-[#1C1C16]/20 focus:outline-none focus:border-[#B51C12]"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Solve / Reset Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRevealCrossword}
                className="flex items-center gap-1 bg-[#B51C12] text-white font-mono text-[10px] uppercase font-bold px-3 py-1.5 rounded transition-transform active:scale-95 shadow-sm hover:bg-[#1C1C16]"
              >
                <span>Reveal Clue Answers</span>
              </button>
              <button
                type="button"
                onClick={handleResetCrossword}
                className="flex items-center gap-1 bg-[#F2EEE4] text-[#1C1C16] font-mono text-[10px] uppercase font-bold px-3 py-1.5 rounded transition-transform active:scale-95 border border-[#1C1C16]/10 hover:bg-[#ECE8DE]"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Victory Rubber Stamp */}
            {isPuzzleSolved && (
              <div className="mt-3 p-3.5 bg-[#FFFFFF] rounded-lg border-2 border-dashed border-[#B51C12] text-center transform -rotate-1 shadow-md animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center justify-center gap-1.5 text-[#B51C12] font-mono text-xs font-black uppercase tracking-widest">
                  <Award className="w-4 h-4 text-[#B51C12]" />
                  <span>★ 100% PUZZLE SOLVED • CERTIFIED BY CHIEF EDITOR ★</span>
                </div>
                <p className="text-xs font-serif italic text-[#1C1C16] mt-1">
                  Official Gazette Stamp: You are formally accredited as an Honorary VIP Wedding Delegate! Unlimited golden puchkas authorized by editorial order.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SECTION V: READER'S REPLY (RSVP VIA TELEGRAPH) */}
        <section id="readers-reply" className="scroll-mt-28 mb-6">
          <div className="flex flex-col bg-[#F2EEE4] p-4 rounded shadow-sm border border-[#1C1C16]/15 relative">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] text-[#B51C12] font-bold uppercase tracking-wider">
                OFFICIAL CORRESPONDENCE
              </span>
              <span className="font-mono text-[10px] text-[#1C1C16]/60">WIRE FORM #RSVP-26</span>
            </div>
            <h3
              className="text-base sm:text-lg text-[#1C1C16] font-bold mb-1"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              Reader's Reply: Letters to the Editor
            </h3>
            <p className="text-xs italic text-[#1C1C16]/70 mb-3 font-serif">
              Please dispatch your attendance intent so the executive kitchens may requisition sufficient basmati and floral garlands.
            </p>

            <form onSubmit={handleDispatchTelegraph} className="flex flex-col gap-3 font-serif">
              {/* Guest Name Input */}
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase text-[#1C1C16] font-bold mb-1">
                  Full Name of Passenger / Reader
                </label>
                <input
                  type="text"
                  required
                  value={readerName}
                  onChange={e => setReaderName(e.target.value)}
                  placeholder="E.g., Dr. Siddhartha Sengupta & Family"
                  className="w-full bg-[#FFFFFF] text-[#1C1C16] p-2 text-xs rounded shadow-sm border border-[#1C1C16]/20 focus:outline-none focus:border-[#B51C12]"
                />
              </div>

              {/* Attendance Dispatch Selection */}
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase text-[#1C1C16] font-bold mb-1">
                  Dispatch Orders
                </span>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-2 bg-[#FFFFFF] p-2 rounded cursor-pointer shadow-sm border border-[#1C1C16]/10 text-xs">
                    <input
                      type="radio"
                      name="attendance"
                      value="Yes! Attending in full splendour"
                      checked={attendance === 'Yes! Attending in full splendour'}
                      onChange={e => setAttendance(e.target.value)}
                      className="accent-[#B51C12] w-4 h-4"
                    />
                    <span>I will attend in full splendour (Front Page Yes!)</span>
                  </label>
                  <label className="flex items-center gap-2 bg-[#FFFFFF] p-2 rounded cursor-pointer shadow-sm border border-[#1C1C16]/10 text-xs">
                    <input
                      type="radio"
                      name="attendance"
                      value="Regretfully sending love from afar"
                      checked={attendance === 'Regretfully sending love from afar'}
                      onChange={e => setAttendance(e.target.value)}
                      className="accent-[#B51C12] w-4 h-4"
                    />
                    <span>Sending warm wishes from afar (Virtual Dispatch)</span>
                  </label>
                </div>
              </div>

              {/* Feast Preference Selection */}
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase text-[#1C1C16] font-bold mb-1">
                  Bhoj & Feast Preference
                </span>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-2 bg-[#FFFFFF] p-2 rounded cursor-pointer shadow-sm border border-[#1C1C16]/10 text-xs">
                    <input
                      type="radio"
                      name="feast"
                      value="Royal Kolkata Biryani & Non-Veg Delicacies"
                      checked={feast === 'Royal Kolkata Biryani & Non-Veg Delicacies'}
                      onChange={e => setFeast(e.target.value)}
                      className="accent-[#B51C12] w-4 h-4"
                    />
                    <span>Royal Kolkata Biryani & Non-Veg Delicacies</span>
                  </label>
                  <label className="flex items-center gap-2 bg-[#FFFFFF] p-2 rounded cursor-pointer shadow-sm border border-[#1C1C16]/10 text-xs">
                    <input
                      type="radio"
                      name="feast"
                      value="Heritage Satvik & Vegetarian Spread"
                      checked={feast === 'Heritage Satvik & Vegetarian Spread'}
                      onChange={e => setFeast(e.target.value)}
                      className="accent-[#B51C12] w-4 h-4"
                    />
                    <span>Heritage Satvik & Pure Vegetarian Spread</span>
                  </label>
                </div>
              </div>

              {/* Telegram Note */}
              <div className="flex flex-col">
                <label className="font-mono text-[10px] uppercase text-[#1C1C16] font-bold mb-1">
                  Telegrammic Note to Couple
                </label>
                <textarea
                  rows={2}
                  value={readerNote}
                  onChange={e => setReaderNote(e.target.value)}
                  placeholder="Send your editorial blessings, memories, or song requests..."
                  className="w-full bg-[#FFFFFF] text-[#1C1C16] p-2 text-xs rounded shadow-sm border border-[#1C1C16]/20 focus:outline-none focus:border-[#B51C12]"
                />
              </div>

              {/* Submission Buttons */}
              <div className="flex flex-col gap-2 mt-1">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-[#1C1C16] text-[#FDF9EF] font-mono text-[11px] font-bold uppercase py-2.5 px-4 rounded tracking-wider transition-transform active:scale-95 shadow-md hover:bg-[#B51C12]"
                >
                  <Send className="w-4 h-4 text-[#F3E5AB]" />
                  <span>Telegraph RSVP Via WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-1.5 bg-[#E6E2D8] text-[#1C1C16] font-mono text-[11px] font-bold uppercase py-2 px-3 rounded transition-colors hover:bg-[#ECE8DE] border border-[#1C1C16]/10"
                >
                  <Printer className="w-4 h-4" />
                  <span>Fold Paper / Print Edition</span>
                </button>
              </div>

              {/* Confirmation Stamp */}
              {isTelegraphSent && (
                <div className="mt-2 p-3 bg-[#FFDAD4] text-[#410000] rounded flex items-center gap-2.5 border border-[#B51C12]/30">
                  <CheckCircle2 className="w-5 h-5 text-[#B51C12] shrink-0" />
                  <div className="flex flex-col text-xs font-serif">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#B51C12]">
                      TELEGRAM PREPARED FOR DISPATCH
                    </span>
                    <span>Connecting to wireless network telegraph line...</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* VENUE & CARRIAGE REGULATIONS */}
        <section className="bg-[#FFFFFF] p-4 rounded shadow-sm border border-[#1C1C16]/15 flex flex-col mb-6">
          <div className="flex items-center gap-2 mb-1.5 text-[#B51C12]">
            <MapPin className="w-5 h-5" />
            <h4
              className="text-base text-[#1C1C16] font-bold uppercase tracking-tight"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              Venue & Carriage Regulations
            </h4>
          </div>
          <p className="text-xs text-[#1C1C16]/75 mb-3 font-serif">
            Valet concierges stationed at the main portico. Kindly grant absolute right-of-way to the groom's horse carriage and the spontaneous dancing procession.
          </p>
          <div className="w-full p-4 rounded bg-[#F2EEE4] border border-[#1C1C16]/10 space-y-2 mb-3 text-xs font-serif">
            <h5 className="font-bold text-[#1C1C16] text-sm font-serif">
              {template?.venue?.name || 'The Heritage Rajbari'}
            </h5>
            <p className="text-[#1C1C16]/80">{template?.venue?.address || '4 Esplanade Row West, B.B.D. Bagh, Kolkata'}</p>
            <p className="text-[11px] text-[#1C1C16]/60">📍 Landmark: {template?.venue?.landmark || 'Opposite High Court Gate 3'}</p>
            <a
              href={template?.venue?.mapsUrl || 'https://maps.google.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#B51C12] font-mono text-[10px] font-bold uppercase hover:underline pt-1"
            >
              <span>Open in Google Maps GPS</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex justify-between items-center font-mono text-[10px] text-[#1C1C16]/60 pt-1 border-t border-[#1C1C16]/10">
            <span>LAT: 22.5726° N, 88.3639° E</span>
            <span className="text-[#B51C12] font-bold uppercase">KOLKATA HERITAGE SECTOR</span>
          </div>
        </section>

        {/* BROADSHEET FOOTER IMPRINT */}
        <footer className="flex flex-col items-center justify-center text-center py-6 text-[#1C1C16]/60 border-t border-[#1C1C16]/20">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-px w-10 bg-[#1C1C16]/20" />
            <span
              className="text-sm font-bold tracking-widest text-[#1C1C16] uppercase"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              The Wedding Gazette
            </span>
            <span className="h-px w-10 bg-[#1C1C16]/20" />
          </div>
          <p className="text-xs italic mb-1.5 font-serif">
            Published with love, laughter, and an excess of Kolkata sweets. All rights to happiness reserved.
          </p>
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#B51C12] font-bold">
            PRINTED AT PRESS BUREAU • EDITION 2026
          </span>
        </footer>
      </main>

      {/* FIXED BOTTOM NEWSPAPER SECTION NAVIGATION BAR (FROM STITCH) */}
      <nav className="fixed bottom-0 w-full z-50 bg-[#FDF9EF]/95 backdrop-blur-md border-t border-[#1C1C16]/20 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] print:hidden">
        <div className="max-w-md mx-auto flex justify-around items-center h-14 px-2">
          <button
            type="button"
            onClick={() => scrollToSection('front-page', 'front-page')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[50px] py-1 px-2 rounded transition-colors ${
              activeTab === 'front-page'
                ? 'text-[#B51C12] bg-[#F2EEE4] font-bold'
                : 'text-[#1C1C16]/60 hover:text-[#1C1C16]'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span className="font-mono text-[9px] uppercase tracking-wider">Front Page</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('classifieds', 'classifieds')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[50px] py-1 px-2 rounded transition-colors ${
              activeTab === 'classifieds'
                ? 'text-[#B51C12] bg-[#F2EEE4] font-bold'
                : 'text-[#1C1C16]/60 hover:text-[#1C1C16]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="font-mono text-[9px] uppercase tracking-wider">Classifieds</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('feasts-and-fun', 'feasts')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[50px] py-1 px-2 rounded transition-colors ${
              activeTab === 'feasts'
                ? 'text-[#B51C12] bg-[#F2EEE4] font-bold'
                : 'text-[#1C1C16]/60 hover:text-[#1C1C16]'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span className="font-mono text-[9px] uppercase tracking-wider">Feasts & Fun</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('readers-reply', 'reply')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[50px] py-1 px-2 rounded transition-colors ${
              activeTab === 'reply'
                ? 'text-[#B51C12] bg-[#F2EEE4] font-bold'
                : 'text-[#1C1C16]/60 hover:text-[#1C1C16]'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span className="font-mono text-[9px] uppercase tracking-wider">Reader's Reply</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
