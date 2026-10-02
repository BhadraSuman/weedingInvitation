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
  ChevronUp,
  Clock,
  Calendar,
  Send,
  Plane,
  Train
} from 'lucide-react';

interface MithilaVivahViewProps {
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

export const MithilaVivahView: React.FC<MithilaVivahViewProps> = ({
  template,
  lang = 'native',
  guestName,
  onLangChange
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [headcount, setHeadcount] = useState('२');
  const [feastChoice, setFeastChoice] = useState<'traditional' | 'satvik'>('traditional');
  const [nameInput, setNameInput] = useState(guestName || '');
  const [shagunOpen, setShagunOpen] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [petals, setPetals] = useState<FloatingPetal[]>([]);
  
  // Interactive Kohbar SVG animations
  const [fishLeftAnim, setFishLeftAnim] = useState(false);
  const [fishRightAnim, setFishRightAnim] = useState(false);
  const [parrotAnim, setParrotAnim] = useState(false);
  const [peacockAnim, setPeacockAnim] = useState(false);
  const [lotusGlow, setLotusGlow] = useState(false);
  const [suryaGlow, setSuryaGlow] = useState(false);
  const [chandraGlow, setChandraGlow] = useState(false);

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
    const colors = ['#fe932c', '#ffdcc3', '#ffddd5', '#95f8a7', '#b93815', '#e9c400'];
    const symbols = ['❀', '✿', '•', '✦', '❋', '🌸'];
    const startX = originX ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 200);
    const startY = originY ?? (typeof window !== 'undefined' ? window.innerHeight / 2 : 300);

    const newPetals: FloatingPetal[] = Array.from({ length: 14 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 150 + 50;
      return {
        id: Date.now() + i + Math.random(),
        x: startX,
        y: startY,
        sym: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 12 + 12,
        targetX: Math.cos(angle) * velocity,
        targetY: Math.sin(angle) * velocity - 40,
        rotation: Math.random() * 360
      };
    });

    setPetals(prev => [...prev, ...newPetals]);
    setTimeout(() => {
      setPetals(prev => prev.filter(p => !newPetals.some(np => np.id === p.id)));
    }, 1400);
  };

  const copyUpi = () => {
    navigator.clipboard.writeText('mithilavivah@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleWhatsAppRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    const guest = nameInput.trim() || 'शुभ आगंतुक';
    const feastText = feastChoice === 'traditional'
      ? (isNative ? 'मिथिला पारम्परिक (माछ-भात, रोहू, मखाना खीर)' : 'Traditional Mithila (Fish & Rice, Makhana Kheer)')
      : (isNative ? 'सात्विक शुद्ध शाकाहारी (ओल तरुआ, कढ़ी-बड़ी, मखाना खीर)' : 'Satvik Pure Veg (Ol Tarua, Kadhi Bari)');
    
    const message = isNative
      ? `प्रणाम! हम ${guest} मिथिला विवाह में उपस्थित होब।\n\nউপস্থিত परिजन: ${headcount} जन\nभोज रुचि: ${feastText}\n\nनव दम्पतिकेँ ढेर सारा आशीर्वाद आ मंगलकामना!`
      : `Namaste! I am ${guest}, gladly confirming our attendance for Abhishek & Maithili's Mithila Wedding.\n\nAttending Members: ${headcount}\nDining Preference: ${feastText}\n\nWishing the couple a blessed lifetime together!`;

    window.open(`https://wa.me/919835012345?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fdf9f1] text-[#1c1c17] font-serif antialiased select-none pb-20 relative overflow-x-hidden">
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
      <header className="fixed top-0 w-full z-50 bg-[#fdf9f1]/95 backdrop-blur-md shadow-sm border-b border-[#e1bfb7]/40">
        {/* Festive Marigold Ribbon */}
        <div className="w-full h-1.5 flex items-center justify-between px-2 bg-gradient-to-r from-[#fe932c] via-[#b93815] to-[#007635] opacity-90">
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
        </div>

        <div className="h-16 px-4 max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="w-9 h-9 rounded-lg bg-[#f1ede6] flex items-center justify-center text-[#962200] hover:bg-[#ece8e0] transition-colors shadow-sm"
              title="Return Home"
            >
              <Home className="w-4 h-4" />
            </Link>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-[#962200] leading-none tracking-wide">
                {isNative ? 'मिथिला विवाह' : 'MITHILA VIVAH'}
              </span>
              <span className="text-[11px] tracking-widest text-[#59413b] uppercase mt-0.5">
                {isNative ? 'कोहबर कला • मधुबनी' : 'Kohbar Folk Art • Madhubani'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switch */}
            <button
              onClick={() => onLangChange?.(isNative ? 'en' : 'native')}
              className="h-9 px-3 rounded-lg bg-[#f1ede6] hover:bg-[#ece8e0] border border-[#e1bfb7]/50 text-xs font-bold text-[#962200] transition-colors"
            >
              {isNative ? 'मै / EN' : 'EN / मै'}
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`h-9 px-2.5 rounded-lg flex items-center gap-1.5 transition-colors border ${
                isPlaying 
                  ? 'bg-[#962200] text-white border-[#962200]' 
                  : 'bg-[#f1ede6] text-[#904d00] border-[#e1bfb7]/50'
              }`}
              title={isPlaying ? 'Mute Geeta' : 'Play Maithili Geet'}
            >
              {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="text-[11px] font-bold hidden sm:inline">
                {isPlaying ? (isNative ? 'गीत चालू' : 'Playing') : (isNative ? 'गीत' : 'Music')}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="pt-20 px-3 max-w-xl mx-auto space-y-5">
        {/* Auspicious Toran Garland */}
        <div className="w-full py-1 overflow-hidden">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-1.5 animate-pulse">
              <span className="w-3.5 h-3.5 rounded-full bg-[#fe932c] shadow-sm flex items-center justify-center text-[8px] text-[#663500] font-bold">❀</span>
              <span className="w-4 h-2 bg-[#007635] rounded-b-full"></span>
              <span className="w-3 h-3 rounded-full bg-[#b93815] flex items-center justify-center text-[7px] text-white">✿</span>
              <span className="w-4 h-2 bg-[#007635] rounded-b-full"></span>
            </div>
            <div className="px-3 py-1 bg-[#ece8e0] rounded-full flex items-center gap-1.5 shadow-sm border border-[#e1bfb7]">
              <Sparkles className="w-3.5 h-3.5 text-[#962200]" />
              <span className="text-xs text-[#962200] font-bold tracking-widest uppercase">
                {isNative ? 'शुभ विवाह • मांगलिक लग्न' : 'Shubh Vivah • Auspicious Union'}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#962200]" />
            </div>
            <div className="flex items-center space-x-1.5 animate-pulse">
              <span className="w-4 h-2 bg-[#007635] rounded-b-full"></span>
              <span className="w-3 h-3 rounded-full bg-[#b93815] flex items-center justify-center text-[7px] text-white">✿</span>
              <span className="w-4 h-2 bg-[#007635] rounded-b-full"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#fe932c] shadow-sm flex items-center justify-center text-[8px] text-[#663500] font-bold">❀</span>
            </div>
          </div>
        </div>

        {/* Sacred Invocation Card */}
        <section className="w-full bg-[#f7f3eb] rounded-2xl p-5 text-center relative overflow-hidden shadow-sm border border-[#e1bfb7]/50">
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="w-8 h-0.5 bg-[#b93815] rounded"></span>
            <span className="text-xs text-[#962200] font-bold tracking-widest uppercase">
              ॥ श्री गणेशाय नमः ॥
            </span>
            <span className="w-8 h-0.5 bg-[#b93815] rounded"></span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-[#1c1c17] tracking-wide mb-1 leading-snug">
            {isNative ? 'गौरी-शंकर सम प्रेम हो, सीता-राम सन अनुराग' : 'May eternal love blossom like Sita & Ram in blessed Mithila'}
          </h1>
          <p className="text-xs md:text-sm text-[#59413b] italic mb-3">
            {isNative ? '"सीता-रामक पावन मिथिलाक पावन परिणय सूत्र"' : '"A sacred wedding bond woven with age-old Madhubani heritage"'}
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ece8e0] rounded-lg text-[#904d00] text-xs font-bold border border-[#e1bfb7]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isNative ? 'माघ शुक्ल पक्ष • शुभ लगन संवत् २०८२' : 'Shukla Paksha • Auspicious Wedding Lagna'}</span>
          </div>
        </section>

        {/* Interactive Madhubani Kohbar Canvas Section */}
        <section className="w-full bg-[#f1ede6] rounded-2xl p-4 shadow-sm border border-[#e1bfb7] relative">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#962200]"></span>
              <h2 className="text-lg font-bold text-[#962200]">
                {isNative ? 'कोहबर घर चित्र' : 'Sacred Kohbar Painting'}
              </h2>
            </div>
            <span className="text-xs bg-[#e6e2da] px-2.5 py-0.5 rounded text-[#59413b] font-semibold">
              {isNative ? 'कचनी आ भरनी कला' : 'Kachni & Bharni Art'}
            </span>
          </div>

          {/* SVG Canvas Area */}
          <div className="w-full bg-white rounded-xl p-2 relative shadow-inner overflow-hidden border border-[#e1bfb7]/60">
            <svg
              className="w-full h-auto drop-shadow-sm select-none"
              viewBox="0 0 400 320"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="kachniHatch"
                  patternTransform="rotate(45 0 0)"
                  patternUnits="userSpaceOnUse"
                  width="8"
                  height="8"
                >
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#8d7169" strokeWidth="0.8" opacity="0.45" />
                </pattern>
              </defs>

              {/* Decorative Outer Borders */}
              <rect x="6" y="6" width="388" height="308" rx="8" fill="none" stroke="#b93815" strokeWidth="2.5" strokeDasharray="8,4" />
              <rect x="12" y="12" width="376" height="296" rx="6" fill="url(#kachniHatch)" opacity="0.25" />
              <rect x="16" y="16" width="368" height="288" rx="4" fill="none" stroke="#1c1c17" strokeWidth="1.2" />

              {/* Sacred Sun (Surya) Top Left */}
              <g
                className="cursor-pointer transition-transform duration-300 active:scale-95"
                transform="translate(48, 50)"
                onClick={(e) => {
                  setSuryaGlow(true);
                  setTimeout(() => setSuryaGlow(false), 800);
                  triggerPetalShower(e.clientX, e.clientY);
                }}
              >
                <circle cx="0" cy="0" r={suryaGlow ? "20" : "16"} fill="#fe932c" stroke="#962200" strokeWidth="1.8" className="transition-all" />
                <circle cx="0" cy="0" r="8" fill="#ffdcc3" />
                <path
                  d="M0 -22 L0 -17 M0 22 L0 17 M-22 0 L-17 0 M22 0 L17 0 M-15 -15 L-12 -12 M15 15 L12 12 M-15 15 L-12 12 M15 -15 L12 -12"
                  stroke="#962200"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
                <text x="0" y="3" textAnchor="middle" fill="#962200" fontSize="7" fontWeight="bold">
                  {isNative ? 'सूर्य' : 'Sun'}
                </text>
              </g>

              {/* Sacred Moon (Chandra) Top Right */}
              <g
                className="cursor-pointer transition-transform duration-300 active:scale-95"
                transform="translate(352, 50)"
                onClick={(e) => {
                  setChandraGlow(true);
                  setTimeout(() => setChandraGlow(false), 800);
                  triggerPetalShower(e.clientX, e.clientY);
                }}
              >
                <path
                  d="M-10 -16 A18 18 0 1 0 12 16 A14 14 0 1 1 -10 -16 Z"
                  fill="#ffdcc3"
                  stroke="#904d00"
                  strokeWidth="1.6"
                />
                <circle cx="-2" cy="-4" r="2" fill="#904d00" />
                <text x="3" y="4" textAnchor="middle" fill="#904d00" fontSize="7" fontWeight="bold">
                  {isNative ? 'चन्द्र' : 'Moon'}
                </text>
              </g>

              {/* Bamboo Grove (Bans) for Lineage Growth */}
              <g stroke="#007635" strokeWidth="1.5" fill="none" opacity="0.85">
                <path d="M28 290 Q26 210 32 120" />
                <path d="M372 290 Q374 210 368 120" />
                <line x1="24" y1="210" x2="35" y2="208" />
                <line x1="25" y1="160" x2="36" y2="158" />
                <line x1="365" y1="210" x2="376" y2="208" />
                <line x1="364" y1="160" x2="375" y2="158" />
                <path d="M30 180 Q45 170 50 178 Q38 185 30 180" fill="#79db8d" />
                <path d="M370 180 Q355 170 350 178 Q362 185 370 180" fill="#79db8d" />
              </g>

              {/* Sacred Central Lotus (Kamal) */}
              <g
                className="cursor-pointer"
                transform="translate(200, 150)"
                onClick={(e) => {
                  setLotusGlow(true);
                  setTimeout(() => setLotusGlow(false), 900);
                  triggerPetalShower(e.clientX, e.clientY);
                }}
              >
                <circle cx="0" cy="0" r={lotusGlow ? "22" : "18"} fill="#ffdcc3" stroke="#b93815" strokeWidth="2" className="transition-all" />
                <circle cx="0" cy="0" r="8" fill="#fe932c" />
                <path d="M0 -18 C -12 -38, -32 -32, -18 -12" fill="#ffb4a2" stroke="#962200" strokeWidth="1.2" />
                <path d="M0 -18 C 12 -38, 32 -32, 18 -12" fill="#ffb4a2" stroke="#962200" strokeWidth="1.2" />
                <path d="M18 -12 C 38 -12, 38 12, 18 12" fill="#ffb4a2" stroke="#962200" strokeWidth="1.2" />
                <path d="M18 12 C 32 32, 12 38, 0 18" fill="#ffb4a2" stroke="#962200" strokeWidth="1.2" />
                <path d="M0 18 C -12 38, -32 32, -18 12" fill="#ffb4a2" stroke="#962200" strokeWidth="1.2" />
                <path d="M-18 12 C -38 12, -38 -12, -18 -12" fill="#ffb4a2" stroke="#962200" strokeWidth="1.2" />
                <text x="0" y="3" textAnchor="middle" fill="#962200" fontSize="9" fontWeight="bold">
                  {isNative ? 'कमल' : 'Lotus'}
                </text>
              </g>

              {/* Pair of Sacred Fish (Machhli) - Left Fish */}
              <g
                className="cursor-pointer transition-transform duration-500 ease-out"
                transform={fishLeftAnim ? "translate(110, 210) rotate(-12) scale(1.12)" : "translate(130, 220)"}
                onClick={(e) => {
                  setFishLeftAnim(true);
                  setTimeout(() => setFishLeftAnim(false), 550);
                  triggerPetalShower(e.clientX, e.clientY);
                }}
              >
                <path d="M-36 0 C -25 -22, 18 -18, 32 0 C 18 18, -25 22, -36 0 Z" fill="#ffdcc3" stroke="#962200" strokeWidth="1.8" />
                <path d="M-12 -12 C -2 -4, -2 4, -12 12 M0 -14 C 10 -4, 10 4, 0 14" fill="none" stroke="#904d00" strokeWidth="1.2" />
                <circle cx="20" cy="-3" r="2.5" fill="#1c1c17" />
                <polygon points="-36,0 -54,-14 -46,0 -54,14" fill="#fe932c" stroke="#962200" strokeWidth="1.4" />
                <text x="-4" y="24" textAnchor="middle" fill="#962200" fontSize="8" fontWeight="bold">
                  {isNative ? 'मत्स्य युग्म' : 'Twin Fish'}
                </text>
              </g>

              {/* Pair of Sacred Fish (Machhli) - Right Fish */}
              <g
                className="cursor-pointer transition-transform duration-500 ease-out"
                transform={fishRightAnim ? "translate(290, 210) rotate(12) scale(1.12)" : "translate(270, 220)"}
                onClick={(e) => {
                  setFishRightAnim(true);
                  setTimeout(() => setFishRightAnim(false), 550);
                  triggerPetalShower(e.clientX, e.clientY);
                }}
              >
                <path d="M36 0 C 25 -22, -18 -18, -32 0 C -18 18, 25 22, 36 0 Z" fill="#ffdcc3" stroke="#962200" strokeWidth="1.8" />
                <path d="M12 -12 C 2 -4, 2 4, 12 12 M0 -14 C -10 -4, -10 4, 0 14" fill="none" stroke="#904d00" strokeWidth="1.2" />
                <circle cx="-20" cy="-3" r="2.5" fill="#1c1c17" />
                <polygon points="36,0 54,-14 46,0 54,14" fill="#fe932c" stroke="#962200" strokeWidth="1.4" />
              </g>

              {/* Sacred Parrot (Sugga / Tota) - Left Top */}
              <g
                className="cursor-pointer transition-all duration-500"
                transform={parrotAnim ? "translate(100, 75) rotate(-15) scale(1.15)" : "translate(100, 95)"}
                onClick={(e) => {
                  setParrotAnim(true);
                  setTimeout(() => setParrotAnim(false), 600);
                  triggerPetalShower(e.clientX, e.clientY);
                }}
              >
                <path d="M0 0 C 15 -15, 38 -5, 30 18 C 24 30, 0 25, 0 0 Z" fill="#79db8d" stroke="#005b27" strokeWidth="1.6" />
                <circle cx="10" cy="-3" r="2" fill="#1c1c17" />
                <path d="M2 -2 L-8 2 L1 5" fill="#b93815" stroke="#962200" strokeWidth="0.8" />
                <path d="M26 20 Q 36 42 42 62 Q 35 48 24 25" fill="#007635" stroke="#005b27" strokeWidth="1" />
                <text x="12" y="32" textAnchor="middle" fill="#005b27" fontSize="7" fontWeight="bold">
                  {isNative ? 'सुग्गा' : 'Parrot'}
                </text>
              </g>

              {/* Sacred Peacock (Mayur) - Right Top */}
              <g
                className="cursor-pointer transition-transform duration-300"
                transform={peacockAnim ? "translate(295, 80) rotate(12) scale(1.15)" : "translate(295, 95)"}
                onClick={(e) => {
                  setPeacockAnim(true);
                  setTimeout(() => setPeacockAnim(false), 600);
                  triggerPetalShower(e.clientX, e.clientY);
                }}
              >
                <path d="M0 0 C -12 -15, -34 -5, -26 18 C -20 30, 0 25, 0 0 Z" fill="#95f8a7" stroke="#005b27" strokeWidth="1.6" />
                <circle cx="-8" cy="-3" r="2" fill="#1c1c17" />
                <path d="M-2 -2 L8 2 L-1 5" fill="#fe932c" stroke="#904d00" strokeWidth="0.8" />
                <path d="M-24 18 Q -48 30 -58 48 Q -40 38 -20 22" fill="#79db8d" stroke="#005b27" strokeWidth="1" />
                <text x="-12" y="32" textAnchor="middle" fill="#005b27" fontSize="7" fontWeight="bold">
                  {isNative ? 'मयूर' : 'Peacock'}
                </text>
              </g>

              {/* Auspicious Turtle (Kachhap) Base */}
              <g transform="translate(200, 275)">
                <ellipse cx="0" cy="0" rx="20" ry="12" fill="#e6e2da" stroke="#59413b" strokeWidth="1.6" />
                <path d="M-12 -6 L-4 6 M0 -8 L8 4 M-14 4 L6 -6" stroke="#8d7169" strokeWidth="1" />
                <circle cx="24" cy="0" r="4" fill="#dddad2" stroke="#59413b" strokeWidth="1" />
                <text x="0" y="3" textAnchor="middle" fill="#59413b" fontSize="6" fontWeight="bold">
                  {isNative ? 'कच्छप' : 'Tortoise'}
                </text>
              </g>
            </svg>
          </div>

          {/* Interactive Hint */}
          <div className="mt-2.5 flex items-center justify-center gap-2 py-1.5 px-3 bg-[#ece8e0] rounded-full text-xs text-[#904d00] font-semibold border border-[#e1bfb7]">
            <Sparkles className="w-3.5 h-3.5 text-[#962200] animate-bounce" />
            <span>
              {isNative ? 'मत्स्य आ सुग्गा केँ स्पर्श करू • Tap fish & parrot to interact' : 'Tap on the fish, parrot or lotus for blessings!'}
            </span>
          </div>
        </section>

        {/* Couple Introduction Section */}
        <section className="w-full bg-[#f7f3eb] rounded-2xl p-5 shadow-sm border border-[#e1bfb7]/50 space-y-4">
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest text-[#962200] font-bold">॥ परिणय बन्धन ॥</span>
            <h2 className="text-2xl font-bold text-[#962200] mt-0.5">
              {isNative ? 'वर - वधू परिचय' : 'The Bride & Groom'}
            </h2>
            <div className="w-16 h-1 bg-[#fe932c] mx-auto rounded-full mt-1"></div>
          </div>

          {/* Groom Card */}
          <div className="p-4 bg-white rounded-xl shadow-sm border border-[#e1bfb7]/60 flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#b93815] text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
              {isNative ? 'वर' : 'G'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-[#1c1c17]">
                  {isNative ? 'चि० अभिषेक कुमार' : 'Abhishek Kumar'}
                </h3>
                <span className="px-2 py-0.5 bg-[#ece8e0] text-[#962200] rounded text-[11px] font-bold">
                  {isNative ? 'सॉफ्टवेयर वास्तुकार' : 'Software Architect'}
                </span>
              </div>
              <p className="text-xs text-[#59413b] mt-1 leading-relaxed">
                {isNative ? (
                  <>
                    सुपुत्र: श्रीमती सुनीता देवी एवं श्री रामेश्वर झा<br />
                    मूल निवास: रांटी, मधुबनी (दरभंगा)
                  </>
                ) : (
                  <>
                    Son of Smt. Sunita Devi & Sri Rameshwar Jha<br />
                    Native of Ranti, Madhubani (Darbhanga)
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Traditional Folk Song Quote */}
          <div className="p-3 bg-[#f1ede6] rounded-xl text-center border-l-4 border-[#962200] shadow-inner">
            <p className="text-xs md:text-sm text-[#962200] font-medium italic">
              "राम जी के हाथे धनुष टूटि गेलै, मिथिला नगरिया निहाल भ' गेलै..."
            </p>
            <span className="text-[11px] text-[#59413b] font-bold tracking-wider mt-1 block">
              — पारम्परिक विवाह गीत (Traditional Maithili Geet)
            </span>
          </div>

          {/* Bride Card */}
          <div className="p-4 bg-white rounded-xl shadow-sm border border-[#e1bfb7]/60 flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#fe932c] text-[#663500] flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
              {isNative ? 'वधू' : 'B'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-[#1c1c17]">
                  {isNative ? 'आयु० मैथिली झा' : 'Maithili Jha'}
                </h3>
                <span className="px-2 py-0.5 bg-[#ece8e0] text-[#904d00] rounded text-[11px] font-bold">
                  {isNative ? 'सहायक प्राध्यापिका' : 'Assistant Professor'}
                </span>
              </div>
              <p className="text-xs text-[#59413b] mt-1 leading-relaxed">
                {isNative ? (
                  <>
                    सुपुत्री: श्रीमती उषा झा एवं श्री बिमल कान्त झा<br />
                    मूल निवास: पुनौरा धाम, जनकपुर / सीतामढ़ी
                  </>
                ) : (
                  <>
                    Daughter of Smt. Usha Jha & Sri Bimal Kant Jha<br />
                    Native of Punora Dham, Sitamarhi
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Cultural Motifs Strip */}
          <div className="p-2.5 bg-[#ece8e0] rounded-xl flex items-center justify-around text-xs text-[#59413b] font-semibold border border-[#e1bfb7]">
            <span>🌿 सुसज्जित डोली</span>
            <span className="text-[#8d7169]">•</span>
            <span>🪔 मंगल कलश</span>
            <span className="text-[#8d7169]">•</span>
            <span>🎨 ऐरिपन रंगोली</span>
          </div>
        </section>

        {/* Auspicious Wedding Rituals & Events */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#962200] font-bold">
                {isNative ? 'मांगलिक बेला' : 'Sacred Schedule'}
              </span>
              <h2 className="text-xl font-bold text-[#1c1c17]">
                {isNative ? 'विवाह कार्यक्रम' : 'Wedding Itinerary'}
              </h2>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#f1ede6] flex items-center justify-center text-[#962200] border border-[#e1bfb7]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>

          {/* Event 1: Matkor & Tilak */}
          <article className="p-4 bg-[#f7f3eb] rounded-xl shadow-sm border border-[#e1bfb7]/60 space-y-2">
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-0.5 rounded-lg bg-[#ffdcc3] text-[#904d00] text-xs font-bold">
                {isNative ? '१. मटकोर व तिलक' : '1. Matkor & Tilak'}
              </span>
              <span className="text-xs text-[#59413b] font-semibold">20 Nov 2026</span>
            </div>
            <h3 className="text-base font-bold text-[#962200]">
              {isNative ? 'माटि कोड़ब आ तिलक उत्सव' : 'Sacred Soil Mining & Groom Tilak'}
            </h3>
            <p className="text-xs text-[#59413b]">
              {isNative
                ? 'पवित्र मृत्तिका खनन, कुलदेवता पूजन एवं वर तिलक अनुष्ठान पारम्परिक मंगल गीतों के साथ।'
                : 'Sacred clay excavation and ancestral groom tilak ceremony accompanied by folk choruses.'}
            </p>
            <div className="pt-2 bg-white/70 rounded-lg p-2.5 flex items-center justify-between text-xs border border-[#e1bfb7]/30">
              <span className="flex items-center gap-1 font-bold text-[#1c1c17]">
                <Clock className="w-3.5 h-3.5 text-[#fe932c]" /> 10:00 AM
              </span>
              <span className="font-semibold text-[#904d00]">
                {isNative ? 'परिधान: पीताम्बरी' : 'Dress: Turmeric Silk'}
              </span>
            </div>
          </article>

          {/* Event 2: Haldi & Ubtan */}
          <article className="p-4 bg-[#f7f3eb] rounded-xl shadow-sm border border-[#e1bfb7]/60 space-y-2">
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-0.5 rounded-lg bg-[#ffdcc3] text-[#904d00] text-xs font-bold">
                {isNative ? '२. हरिद्रा लेपन' : '2. Haldi & Sohar'}
              </span>
              <span className="text-xs text-[#59413b] font-semibold">21 Nov 2026</span>
            </div>
            <h3 className="text-base font-bold text-[#904d00]">
              {isNative ? 'हल्दी, उबटन आ सोहर गान' : 'Haldi & Sohar Singing'}
            </h3>
            <p className="text-xs text-[#59413b]">
              {isNative
                ? 'सुवासित सरिसव-हरिद्रा लेपन, नहाय-खाय एवं मिथिलाक पारम्परिक बटगवनी और सोहर।'
                : 'Mustard and turmeric paste ceremony followed by Nahay-Khay feast and women’s wedding melodies.'}
            </p>
            <div className="pt-2 bg-white/70 rounded-lg p-2.5 flex items-center justify-between text-xs border border-[#e1bfb7]/30">
              <span className="flex items-center gap-1 font-bold text-[#1c1c17]">
                <Clock className="w-3.5 h-3.5 text-[#fe932c]" /> 11:30 AM
              </span>
              <span className="font-semibold text-[#904d00]">
                {isNative ? 'परिधान: बसंती पीला' : 'Dress: Mustard Yellow'}
              </span>
            </div>
          </article>

          {/* Event 3: Barat Agaman */}
          <article className="p-4 bg-[#f7f3eb] rounded-xl shadow-sm border border-[#e1bfb7]/60 space-y-2">
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-0.5 rounded-lg bg-[#ffdbd2] text-[#962200] text-xs font-bold">
                {isNative ? '३. बरियात आगमन' : '3. Barat Agaman'}
              </span>
              <span className="text-xs text-[#59413b] font-semibold">22 Nov 2026</span>
            </div>
            <h3 className="text-base font-bold text-[#962200]">
              {isNative ? 'वरयात्री स्वागत व द्वारपूजा' : 'Barat Welcome & Dwar Puja'}
            </h3>
            <p className="text-xs text-[#59413b]">
              {isNative
                ? 'ढाक, शहनाई आ शंखध्वनि संग वरयात्रीक अगवानी एवं समधी मिलन व द्वारपूजा।'
                : 'Welcoming the groom procession with shehnai, conch shells, and sacred door rites.'}
            </p>
            <div className="pt-2 bg-white/70 rounded-lg p-2.5 flex items-center justify-between text-xs border border-[#e1bfb7]/30">
              <span className="flex items-center gap-1 font-bold text-[#1c1c17]">
                <Clock className="w-3.5 h-3.5 text-[#962200]" /> 06:00 PM
              </span>
              <span className="font-semibold text-[#962200]">
                {isNative ? 'स्थान: राज दरभंगा राजप्रांगण' : 'Darbhanga Raj Palace'}
              </span>
            </div>
          </article>

          {/* Event 4: Main Nuptials (Lagna) */}
          <article className="p-4 bg-gradient-to-br from-[#962200] to-[#b93815] text-white rounded-xl shadow-md space-y-2">
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-0.5 rounded-lg bg-white text-[#962200] text-xs font-bold">
                {isNative ? '४. मुख्य परिणय लग्न' : '4. Sacred Nuptials'}
              </span>
              <span className="text-xs text-white/90 font-semibold">22 Nov 2026</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {isNative ? 'शुभ विवाह व सिन्दूर दान' : 'Shubh Vivah & Sindoor Daan'}
            </h3>
            <p className="text-xs text-white/90">
              {isNative
                ? 'पवित्र कोहबर मण्डप में सप्तपदी, कन्यादान, सिन्दूर दान एवं लाजा होम अनुष्ठान।'
                : 'Sacred seven circumambulations, Kanyadaan, and Sindoor Daan inside the decorated Kohbar.'}
            </p>
            <div className="pt-2 bg-white/10 rounded-lg p-2.5 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#ffdcc3]" />
                {isNative ? 'गोधूलि वेला • रात्रि ०८:३० बजे' : 'Godhuli Lagna • 08:30 PM'}
              </span>
              <span className="font-bold text-[#ffdcc3]">
                {isNative ? 'मिथिला पाग-दोपटा' : 'Mithila Paag'}
              </span>
            </div>
          </article>
        </section>

        {/* Sacred Venue Section */}
        <section className="w-full bg-[#f7f3eb] rounded-2xl p-5 shadow-sm border border-[#e1bfb7]/50 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#962200] font-bold">
                {isNative ? 'मंगलमय वेन्यू' : 'The Wedding Venue'}
              </span>
              <h2 className="text-xl font-bold text-[#1c1c17]">
                {isNative ? 'विवाह स्थल' : 'Darbhanga Raj Palace'}
              </h2>
            </div>
            {/* Glowing Diya */}
            <div className="relative flex items-center justify-center p-2">
              <div className="w-6 h-6 rounded-full bg-[#fe932c]/40 animate-ping absolute"></div>
              <div className="w-8 h-8 rounded-full bg-[#fe932c] flex items-center justify-center text-[#663500] shadow-md font-bold text-xs">
                🪔
              </div>
            </div>
          </div>

          <div
            className="w-full h-44 bg-cover bg-center rounded-xl shadow-inner relative flex items-end p-3 border border-[#e1bfb7]"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuARCXb9aPwXjyW82jejUSiNoeQLbylQq5bixR9yvaUay45lbSesrC2FfUvWzry6GaKvJ_m3agzFzXJieM9QjaIJxWVjl-0u5JXjL8F0zR4TvdQPXVuM8l-RwNJFBdSiepvKTkftHiYVdhem-njJzPi4M5IGSKBR5ceohPz6GQ73_s0qwDAYtbRaG30iHmmPTE56UMdAkl2ZTIfbg4l52kJIEdLJ8XZwFD-K-J61KYsJeqzBTPEiiYCc0A')`
            }}
          >
            <div className="w-full bg-white/95 backdrop-blur-md rounded-lg p-2.5 shadow-sm border border-stone-200">
              <h3 className="text-sm font-bold text-[#962200]">
                {isNative ? 'राज दरभंगा परिसर (हेरिटেজ लॉन)' : 'Raj Darbhanga Palace (Heritage Lawn)'}
              </h3>
              <p className="text-xs text-[#59413b]">
                {isNative ? 'किला घाट, दरभंगा, बिहार - ८४६००४' : 'Kila Ghat, Darbhanga, Bihar - 846004'}
              </p>
            </div>
          </div>

          {/* Travel Distances */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-white rounded-lg border border-[#e1bfb7]/50 flex items-center gap-2">
              <Plane className="w-5 h-5 text-[#904d00]" />
              <div>
                <span className="text-[11px] text-[#59413b] block">दरभंगा हवाईअड्डा</span>
                <span className="font-bold text-[#1c1c17]">6.5 km (DBR)</span>
              </div>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-[#e1bfb7]/50 flex items-center gap-2">
              <Train className="w-5 h-5 text-[#007635]" />
              <div>
                <span className="text-[11px] text-[#59413b] block">दरभंगा जंक्शन</span>
                <span className="font-bold text-[#1c1c17]">2.2 km (DBG)</span>
              </div>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Darbhanga+Palace+Bihar"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 bg-[#962200] hover:bg-[#b93815] text-white rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span>{isNative ? 'गूगल मैप्स पर रास्ता देखें • Navigate to Venue' : 'Open in Google Maps'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </section>

        {/* Parivarik Aashirwaad */}
        <section className="w-full bg-[#f1ede6] rounded-2xl p-5 shadow-sm border border-[#e1bfb7] text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#962200] font-bold">॥ आशीर्वादाभिलाषी ॥</span>
          <h3 className="text-lg font-bold text-[#1c1c17]">
            {isNative ? 'वरदहस्त एवं स्नेह' : 'Family Blessings'}
          </h3>
          <p className="text-xs md:text-sm text-[#59413b] italic">
            {isNative
              ? '"अहाँ सबहक पावन उपस्थितिए नव दम्पतिक जीवन केँ सुख, शान्ति आ समृद्धिक नव प्रभात प्रदान करत।"'
              : '"Your divine presence and loving blessings shall illuminate the beginning of their new journey together."'}
          </p>
          <div className="p-3 bg-white rounded-xl text-left border border-[#e1bfb7]/50 mt-3">
            <span className="text-xs font-bold text-[#962200] block mb-1">
              {isNative ? 'दर्शनाभिलाषी:' : 'Cordially Invited By:'}
            </span>
            <p className="text-xs text-[#59413b] leading-relaxed">
              {isNative ? (
                <>
                  समस्त झा, चौधरी एवं कुमार परिवार (मधुबनी, दरभंगा एवं सीतामढ़ी)<br />
                  स्वागताकांक्षी: डॉ० प्रभाकर झा, ई० आशुतोष कुमार, प्रो० रश्मि झा
                </>
              ) : (
                <>
                  Entire Jha, Choudhary and Kumar Families (Madhubani, Darbhanga & Sitamarhi)<br />
                  Warm Regards: Dr. Prabhakar Jha, Er. Ashutosh Kumar, Prof. Rashmi Jha
                </>
              )}
            </p>
          </div>
        </section>

        {/* Interactive RSVP & Neg Form */}
        <section className="w-full bg-[#f7f3eb] rounded-2xl p-5 shadow-sm border border-[#e1bfb7]/60 space-y-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#962200] font-bold">
              {isNative ? 'स्वीकृति पत्र' : 'RSVP Acceptance'}
            </span>
            <h2 className="text-xl font-bold text-[#1c1c17]">
              {isNative ? 'शुभ उपस्थिति एवं नेग' : 'Confirm Your Presence & Neg'}
            </h2>
          </div>

          <form onSubmit={handleWhatsAppRsvp} className="space-y-4">
            {/* Headcount */}
            <div>
              <label className="text-xs font-bold text-[#1c1c17] block mb-1.5">
                {isNative ? 'उपस्थित परिजन संख्या (Attending Members):' : 'Attending Members:'}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['१', '२', '३', '४+'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setHeadcount(c)}
                    className={`h-10 rounded-xl font-bold text-xs transition-colors border ${
                      headcount === c
                        ? 'bg-[#962200] text-white border-[#962200] shadow'
                        : 'bg-white text-[#1c1c17] border-[#e1bfb7] hover:bg-[#f1ede6]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Feast Preference */}
            <div>
              <label className="text-xs font-bold text-[#1c1c17] block mb-1.5">
                {isNative ? 'मिथिला पावन भोज रुचि (Dining Preference):' : 'Dining Preference:'}
              </label>
              <div className="space-y-2 text-xs">
                <label
                  onClick={() => setFeastChoice('traditional')}
                  className={`flex items-center gap-2.5 p-3 rounded-xl cursor-pointer border transition-colors ${
                    feastChoice === 'traditional'
                      ? 'bg-white border-[#962200] shadow-sm text-[#962200] font-bold'
                      : 'bg-white/60 border-[#e1bfb7] text-[#1c1c17]'
                  }`}
                >
                  <input
                    type="radio"
                    name="feast"
                    checked={feastChoice === 'traditional'}
                    onChange={() => setFeastChoice('traditional')}
                    className="accent-[#962200]"
                  />
                  <span>
                    {isNative
                      ? 'मिथिला पारम्परिक (माछ-भात, रोहू / कतला, मखाना खीर)'
                      : 'Traditional Mithila (Fresh Rohu Fish Curry, Rice & Makhana Kheer)'}
                  </span>
                </label>
                <label
                  onClick={() => setFeastChoice('satvik')}
                  className={`flex items-center gap-2.5 p-3 rounded-xl cursor-pointer border transition-colors ${
                    feastChoice === 'satvik'
                      ? 'bg-white border-[#962200] shadow-sm text-[#962200] font-bold'
                      : 'bg-white/60 border-[#e1bfb7] text-[#1c1c17]'
                  }`}
                >
                  <input
                    type="radio"
                    name="feast"
                    checked={feastChoice === 'satvik'}
                    onChange={() => setFeastChoice('satvik')}
                    className="accent-[#962200]"
                  />
                  <span>
                    {isNative
                      ? 'सात्विक शुद्ध शाकाहारी (ओल तरुआ, कढ़ी-बड़ी, मखाना खीर)'
                      : 'Satvik Pure Vegetarian (Ol Tarua, Kadhi Bari & Makhana Kheer)'}
                  </span>
                </label>
              </div>
            </div>

            {/* Guest Name */}
            <div>
              <label className="text-xs font-bold text-[#1c1c17] block mb-1">
                {isNative ? 'अहाँक नाम (Your Name):' : 'Your Name:'}
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder={isNative ? 'उदा० श्री नवीन झा' : 'e.g. Mr. Rajesh Kumar & Family'}
                className="w-full h-11 px-3 bg-white border border-[#e1bfb7] rounded-xl text-xs text-[#1c1c17] focus:outline-none focus:border-[#962200]"
                required
              />
            </div>

            {/* WhatsApp RSVP CTA */}
            <button
              type="submit"
              className="w-full h-12 bg-[#904d00] hover:bg-[#6e3900] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition-transform active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              <span>
                {isNative ? 'व्हाट्सएप पर उपस्थिति दर्ज करें • Confirm on WhatsApp' : 'Confirm RSVP on WhatsApp'}
              </span>
            </button>
          </form>

          {/* Shagun / Neg Accordion */}
          <div className="pt-3 border-t border-[#e1bfb7]/60">
            <button
              type="button"
              onClick={() => setShagunOpen(!shagunOpen)}
              className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-[#e1bfb7] text-left"
            >
              <div className="flex items-center gap-2 text-[#962200] font-bold text-xs">
                <span>💰</span>
                <span>{isNative ? 'डिजिटल शगुन / नेग (Blessing)' : 'Digital Shagun / Neg (Gift)'}</span>
              </div>
              {shagunOpen ? <ChevronUp className="w-4 h-4 text-[#59413b]" /> : <ChevronDown className="w-4 h-4 text-[#59413b]" />}
            </button>

            {shagunOpen && (
              <div className="mt-3 p-3 bg-white rounded-xl border border-[#e1bfb7] space-y-3 text-xs">
                <p className="text-[#59413b]">
                  {isNative
                    ? 'अहाँक स्नेह आ आशीर्वाद ही सर्वोपरि अछि। यदि अहाँ नवदम्पति केँ डिजिटल शगुन पठेबाक इच्छुक छी:'
                    : 'Your presence is our supreme blessing. If you wish to send a gift digitally:'}
                </p>
                <div className="flex gap-2">
                  {[501, 1001, 2101, 5001].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        window.open(`upi://pay?pa=mithilavivah@upi&pn=Abhishek+and+Maithili&am=${amt}&cu=INR`, '_blank');
                      }}
                      className="flex-1 py-1.5 bg-[#f1ede6] hover:bg-[#ffdcc3] text-[#962200] font-bold rounded-lg border border-[#e1bfb7] text-center"
                    >
                      ₹ {amt}
                    </button>
                  ))}
                </div>
                <div className="p-3 bg-[#f7f3eb] rounded-lg flex items-center justify-between border border-[#e1bfb7]">
                  <div>
                    <span className="text-[10px] text-[#59413b] block uppercase">UPI ID</span>
                    <span className="font-mono font-bold text-xs text-[#1c1c17]">mithilavivah@upi</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyUpi}
                    className="px-3 py-1 bg-[#962200] text-white rounded text-xs font-bold flex items-center gap-1 shadow"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUpi ? 'कॉपी भेल' : 'कॉपी'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Ambient Petal Shower Trigger */}
        <div className="w-full flex items-center justify-center py-2">
          <button
            type="button"
            onClick={(e) => triggerPetalShower(e.clientX, e.clientY)}
            className="px-5 py-2.5 bg-[#962200] hover:bg-[#b93815] text-white rounded-full font-bold text-xs flex items-center gap-2 shadow-md active:scale-95 transition-transform"
          >
            <Sparkles className="w-4 h-4 text-[#fe932c]" />
            <span>{isNative ? 'पुष्प वर्षा • Shower Petals' : 'Shower Rose Petals'}</span>
          </button>
        </div>

        {/* Footer Seal */}
        <footer className="text-center py-4 border-t border-[#e1bfb7]/50 space-y-1">
          <div className="text-sm font-bold text-[#962200]">॥ शुभम भवतु ॥</div>
          <p className="text-xs text-[#59413b]">
            {isNative ? 'पारम्परिक मिथिला हस्तकला आधारित डिजिटल आमन्त्रण पत्र' : 'Traditional Mithila Madhubani Digital Wedding Invitation'}
          </p>
          <div className="text-[11px] text-[#8d7169] pt-1">
            UtsavPatra • Bihar Cultural Heritage
          </div>
        </footer>
      </main>
    </div>
  );
};
