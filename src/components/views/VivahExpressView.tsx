import React, { useState, useEffect } from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import { audioManager } from '../../utils/audioManager';
import { Link } from 'react-router-dom';
import {
  Train,
  Volume2,
  VolumeX,
  Home,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  QrCode,
  Check,
  Send,
  Sparkles,
  PhoneCall,
  Utensils,
  Luggage,
  ShieldAlert,
  ArrowRight,
  Stamp
} from 'lucide-react';

interface VivahExpressViewProps {
  template?: CulturalTemplate;
  lang?: Language;
  guestName?: string;
  onLangChange?: (lang: Language) => void;
}

export const VivahExpressView: React.FC<VivahExpressViewProps> = ({
  template,
  lang = 'native',
  guestName,
  onLangChange
}) => {
  const groom = template?.groom?.name || 'Sandeep';
  const bride = template?.bride?.name || 'Priya';
  const trainName = template?.quotes?.weddingTitle || 'BHARAT VIVAH EXPRESS';
  const trainPnr = template?.quotes?.subInvocation?.includes('PNR:')
    ? template.quotes.subInvocation.replace(/.*PNR:\s*([^\s•]+).*/, '$1')
    : '2612-ANIDEB';
  const departureDate = template?.targetDateNative || "26 DEC '26";
  const venueTitle = template?.venue?.name || 'Vivah Dham Junction';

  const [isPlaying, setIsPlaying] = useState(false);
  const [stampBouncing, setStampBouncing] = useState(true);
  const [passengerName, setPassengerName] = useState(guestName || 'Shri Sharma & Family');
  const [berthCount, setBerthCount] = useState<number | string>(1);
  const [mealOption, setMealOption] = useState<'veg' | 'nonveg'>('veg');
  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);
  const [activeTab, setActiveTab] = useState<'pass' | 'route' | 'services' | 'seat'>('pass');

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 28,
    hours: 14,
    mins: 42,
    secs: 35
  });

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

  useEffect(() => {
    const unsub = audioManager.subscribe(playing => {
      setIsPlaying(playing);
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

  const handleSlamStamp = () => {
    setStampBouncing(false);
    setTimeout(() => {
      setStampBouncing(true);
      if (navigator.vibrate) {
        navigator.vibrate([40, 60, 40]);
      }
    }, 150);
  };

  const handleAddToCalendar = (title: string, isoDate: string, venue: string) => {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${title}\nLOCATION:${venue}\nDESCRIPTION:Vivah Express Wedding Event\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpConfirmed(true);
    handleSlamStamp();

    const mealLabel = mealOption === 'veg' ? 'Veg Maharaja (Pure Satvik/Jain)' : 'Royal Non-Veg (Awadhi Feast)';
    const msg =
      `🚂 *VIVAH EXPRESS (TRAIN #2026) RSVP CONFIRMATION*\n\n` +
      `👤 *Primary Passenger:* ${passengerName}\n` +
      `🎟 *Berths Requested:* ${berthCount}\n` +
      `🍛 *Pantry Meal Choice:* ${mealLabel}\n` +
      `📋 *PNR:* 2612-ANIDEB\n` +
      `Status: Allotted (CNF). Looking forward to the wedding journey!`;

    const targetNumber = '916203868358';
    const waUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodeURIComponent(msg)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 900);
  };

  const scrollTo = (id: string, tab: 'pass' | 'route' | 'services' | 'seat') => {
    setActiveTab(tab);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative min-h-screen bg-[#F8F9FF] text-[#0B1C30] selection:bg-[#002046] selection:text-[#F8F9FF] pb-28 antialiased"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* IRCTC FIXED HEADER */}
      <header className="sticky top-0 w-full z-50 bg-[#002046] text-[#F8F9FF] shadow-[0_1px_8px_rgba(0,0,0,0.1)]">
        <div className="max-w-xl mx-auto h-20 px-4 flex flex-col justify-center">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="p-2 rounded-full bg-[#1B365D] text-[#FEA619] shrink-0">
                <Train className="w-5 h-5" />
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase truncate text-[#D3E4FE]">
                  VIVAH EXPRESS • IRCTC SPECIAL
                </span>
                <span className="text-base sm:text-lg font-bold tracking-tight text-white truncate leading-tight">
                  Boarding Pass
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-mono text-[#D3E4FE] font-bold">18:42 IST</span>
                <div className="flex items-center gap-1 bg-[#003F19] px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#79DB8D] animate-pulse" />
                  <span className="text-[10px] font-mono text-[#79DB8D] font-bold leading-none">ON TIME</span>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleHeaderAudio}
                className="w-8 h-8 rounded-full bg-[#1B365D] flex items-center justify-center text-[#D3E4FE] hover:text-[#FEA619] transition-colors"
                title="Toggle Audio"
              >
                {isPlaying ? <VolumeX className="w-4 h-4 text-[#FEA619]" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <Link
                to="/"
                className="w-8 h-8 rounded-full bg-[#1B365D] flex items-center justify-center text-white hover:bg-[#FEA619] hover:text-[#002046] transition-colors"
                title="Platform Home"
              >
                <Home className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-xl mx-auto px-4 py-4 flex flex-col gap-6">
        {/* HERO SECTION: PHYSICAL RAILWAY BOARDING PASS */}
        <section id="boarding-pass" className="relative w-full scroll-mt-24">
          <div className="relative bg-[#FFFDF9] rounded-xl shadow-lg border border-[#002046]/10 overflow-hidden">
            {/* Top Train Class Accent Bar */}
            <div className="h-2 w-full bg-[#1B365D] flex items-center justify-between px-3">
              <span className="h-1 w-8 bg-[#FEA619] rounded-full" />
              <span className="h-1 w-16 bg-white/40 rounded-full" />
              <span className="h-1 w-8 bg-[#FEA619] rounded-full" />
            </div>

            {/* Ticket Header: Indian Railways Aesthetic */}
            <div className="p-4 bg-[#EFF4FF] flex flex-col gap-1 border-b border-[#002046]/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Train className="w-5 h-5 text-[#002046]" />
                  <span
                    className="text-base tracking-wider text-[#002046] font-bold"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {trainName}
                  </span>
                </div>
                <span className="text-[11px] font-mono bg-[#002046] text-white px-2 py-0.5 rounded tracking-widest font-bold">
                  SPL #2026
                </span>
              </div>
              <div className="flex items-center justify-between text-[#44474E] text-[11px] font-mono">
                <span>MINISTRY OF CELEBRATIONS • IRCTC SPECIAL</span>
                <span className="text-[#855300] font-bold">CLASS: 1A (PURE LOVE)</span>
              </div>
            </div>

            {/* PNR & Security Strip */}
            <div className="px-4 py-2 bg-[#E5EEFF] flex items-center justify-between border-b border-[#002046]/10">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-[#44474E] uppercase">PNR NUMBER</span>
                <span
                  className="text-sm text-[#002046] font-bold tracking-widest uppercase"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {trainPnr}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Stylized Micro Barcode */}
                <div className="h-5 flex items-center gap-[2px] opacity-75">
                  <span className="w-1 h-full bg-[#0B1C30]" />
                  <span className="w-[2px] h-full bg-[#0B1C30]" />
                  <span className="w-1.5 h-full bg-[#0B1C30]" />
                  <span className="w-[1px] h-full bg-[#0B1C30]" />
                  <span className="w-2 h-full bg-[#0B1C30]" />
                  <span className="w-[1px] h-full bg-[#0B1C30]" />
                  <span className="w-1 h-full bg-[#0B1C30]" />
                </div>
                <div className="bg-[#002046]/10 text-[#002046] px-1.5 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3 text-[#005323]" /> QR VERIFIED
                </div>
              </div>
            </div>

            {/* Main Transit Route: SGL -> MRD */}
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between relative">
                {/* Origin */}
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono text-[#44474E]">ORIGIN (PF 1)</span>
                  <span
                    className="text-base text-[#002046] font-extrabold tracking-wider"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    SINGLE LIFE
                  </span>
                  <span className="text-[11px] font-mono text-[#855300] font-bold">STN CODE: SGL</span>
                </div>

                {/* Train Route Trajectory Icon */}
                <div className="flex-1 flex flex-col items-center px-2">
                  <span className="text-[10px] font-mono text-[#44474E] font-bold mb-1">
                    7 PHERAS / LIFETIME
                  </span>
                  <div className="w-full flex items-center relative">
                    <div className="w-full h-0.5 bg-[#C4C6CF]" />
                    <div className="absolute left-1/2 -translate-x-1/2 bg-[#FFFDF9] px-1 text-[#002046]">
                      <ArrowRight className="w-4 h-4 animate-pulse" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#005323] mt-1 font-bold">
                    NON-STOP SUPERFAST
                  </span>
                </div>

                {/* Destination */}
                <div className="flex flex-col items-end min-w-0 text-right">
                  <span className="text-[10px] font-mono text-[#44474E]">DESTINATION (PF 7)</span>
                  <span
                    className="text-base text-[#002046] font-extrabold tracking-wider"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    MARRIED LIFE
                  </span>
                  <span className="text-[11px] font-mono text-[#855300] font-bold">STN CODE: MRD</span>
                </div>
              </div>

              {/* Passenger & Berth Grid */}
              <div className="grid grid-cols-3 gap-2 bg-[#EFF4FF] p-3 rounded-lg border border-[#002046]/10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[#44474E]">PASSENGER NAME</span>
                  <span className="text-xs text-[#002046] font-bold truncate">
                    {passengerName}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[#44474E]">COACH / BERTH</span>
                  <span
                    className="text-xs text-[#002046] font-bold"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    B-1 / 72 LB
                  </span>
                  <span className="text-[10px] text-[#005323]">Window Seat</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[#44474E]">DEPARTURE</span>
                  <span
                    className="text-xs text-[#002046] font-bold uppercase truncate"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {departureDate}
                  </span>
                  <span className="text-[10px] font-mono text-[#855300] font-bold">18:30 HRS IST</span>
                </div>
              </div>
            </div>

            {/* Ticket Perforation Cutout Area */}
            <div className="relative w-full h-6 flex items-center justify-between">
              <div className="w-4 h-8 bg-[#F8F9FF] rounded-r-full -ml-2 shadow-inner border border-[#002046]/15 border-l-0" />
              <div className="flex-1 h-0 border-t-2 border-dashed border-[#C4C6CF] mx-2" />
              <div className="w-4 h-8 bg-[#F8F9FF] rounded-l-full -mr-2 shadow-inner border border-[#002046]/15 border-r-0" />
            </div>

            {/* Lower Tear-Off Stub */}
            <div className="p-4 bg-[#FFFFFF] flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-[#44474E]">FARE BREAKOUT</span>
                <span
                  className="text-sm text-[#002046] font-bold"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  ₹ 0.00 (SHUBH AASHIRVAAD)
                </span>
                <span className="text-[10px] font-mono text-[#005323] font-bold">
                  Tatkal Quota: Pure Blessings & Love
                </span>
              </div>
              <div className="bg-[#E5EEFF] p-1.5 rounded flex flex-col items-center border border-[#002046]/10">
                <QrCode className="w-7 h-7 text-[#002046]" />
                <span className="text-[8px] font-mono tracking-tighter text-[#44474E] uppercase">SCAN AT MANDAP</span>
              </div>
            </div>

            {/* SLAMMING ANIMATED RUBBER STAMP */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transform -rotate-12 transition-all duration-300 opacity-95 ${
                stampBouncing ? 'animate-bounce' : 'scale-125'
              }`}
            >
              <div className="bg-[#003F19]/90 text-[#79DB8D] px-4 py-2 rounded-lg shadow-2xl flex flex-col items-center justify-center border-2 border-[#79DB8D]/60 backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-5 h-5 text-[#79DB8D]" />
                  <span
                    className="text-sm font-black tracking-widest"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    CONFIRMED (CNF)
                  </span>
                </div>
                <span className="text-[9px] font-mono tracking-wider text-white">
                  COACH S-1 • SEAT 24 • ZERO CANCEL
                </span>
              </div>
            </div>
          </div>

          {/* Stamp Re-trigger Tap Button */}
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={handleSlamStamp}
              className="bg-[#E5EEFF] hover:bg-[#D3E4FE] text-[#002046] px-3 py-1.5 rounded-lg flex items-center gap-1 text-[11px] font-mono font-bold shadow-sm transition-all active:scale-95 border border-[#002046]/10"
            >
              <Check className="w-3.5 h-3.5 text-[#005323]" />
              <span>RE-STAMP PRS TICKET</span>
            </button>
          </div>
        </section>

        {/* LIVE DEPARTURE BOARD COUNTDOWN */}
        <section className="bg-[#10141D] p-4 rounded-xl shadow-lg flex flex-col gap-2 text-white border border-[#002046]/30">
          <div className="flex items-center justify-between pb-1 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEA619] animate-ping" />
              <span className="text-[10px] font-mono tracking-wider text-[#FEA619] uppercase font-bold">
                PLATFORM ELECTRONIC DISPLAY • VIVAH COUNTDOWN
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#D3E4FE]">TRAIN 2026</span>
          </div>

          {/* Monospace Amber Flip Digits Grid */}
          <div className="grid grid-cols-4 gap-2 text-center py-2">
            <div className="flex flex-col items-center bg-[#1B2230] py-2 px-1 rounded-md shadow-inner">
              <span
                className="text-2xl text-[#FFBE3B] font-black tracking-widest drop-shadow-[0_0_8px_rgba(255,190,59,0.7)]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
              </span>
              <span className="text-[10px] font-mono text-[#D3E4FE] font-bold mt-0.5">DAYS</span>
            </div>
            <div className="flex flex-col items-center bg-[#1B2230] py-2 px-1 rounded-md shadow-inner">
              <span
                className="text-2xl text-[#FFBE3B] font-black tracking-widest drop-shadow-[0_0_8px_rgba(255,190,59,0.7)]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
              </span>
              <span className="text-[10px] font-mono text-[#D3E4FE] font-bold mt-0.5">HRS</span>
            </div>
            <div className="flex flex-col items-center bg-[#1B2230] py-2 px-1 rounded-md shadow-inner">
              <span
                className="text-2xl text-[#FFBE3B] font-black tracking-widest drop-shadow-[0_0_8px_rgba(255,190,59,0.7)]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {timeLeft.mins < 10 ? `0${timeLeft.mins}` : timeLeft.mins}
              </span>
              <span className="text-[10px] font-mono text-[#D3E4FE] font-bold mt-0.5">MINS</span>
            </div>
            <div className="flex flex-col items-center bg-[#1B2230] py-2 px-1 rounded-md shadow-inner">
              <span
                className="text-2xl text-[#FFBE3B] font-black tracking-widest drop-shadow-[0_0_8px_rgba(255,190,59,0.7)]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {timeLeft.secs < 10 ? `0${timeLeft.secs}` : timeLeft.secs}
              </span>
              <span className="text-[10px] font-mono text-[#D3E4FE] font-bold mt-0.5">SECS</span>
            </div>
          </div>

          {/* Running LED Marquee Ticker */}
          <div className="overflow-hidden bg-[#090B10] py-1 px-2 rounded flex items-center">
            <div className="whitespace-nowrap inline-block animate-marquee text-[10px] font-mono text-[#FEA619] font-bold tracking-wider">
              ★★★ TRAIN NO. 2026 VIVAH EXPRESS IS RUNNING STRICTLY ON TIME ★ GUESTS REQUESTED TO ASSEMBLE AT PLATFORM 1 ★ NO WAITING LIST (WL) / NO RAC — ALL TICKETS DIRECTLY CONFIRMED (CNF) WITH ROYAL HOSPITALITY ★★★
            </div>
          </div>
        </section>

        {/* VERTICAL RAILWAY ROUTE ITINERARY (STATIONS & EVENTS) */}
        <section id="route-map" className="flex flex-col gap-4 scroll-mt-24">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Train className="w-5 h-5 text-[#002046]" />
              <h2 className="text-xl text-[#002046] font-bold">Route Schedule</h2>
            </div>
            <span className="text-[11px] font-mono text-[#44474E] bg-[#E5EEFF] px-2 py-1 rounded font-bold">
              4 STOPS PLANNED
            </span>
          </div>

          {/* Vertical Track Line */}
          <div className="relative pl-6 flex flex-col gap-6">
            <div className="absolute left-2 top-3 bottom-3 w-1 bg-[#C4C6CF] flex flex-col justify-around items-center">
              <span className="w-3 h-0.5 bg-[#74777F]" />
              <span className="w-3 h-0.5 bg-[#74777F]" />
              <span className="w-3 h-0.5 bg-[#74777F]" />
              <span className="w-3 h-0.5 bg-[#74777F]" />
            </div>

            {/* Station 1: Haldi Junction */}
            <div className="relative flex flex-col gap-2">
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#FEA619] flex items-center justify-center text-[#002046] shadow">
                <Train className="w-3 h-3 font-bold" />
              </div>
              <div className="bg-[#FBC02D] text-[#1E293B] p-2.5 rounded-lg shadow-sm flex flex-col">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono block opacity-75">हल्दी जंक्शन</span>
                    <span
                      className="text-sm font-black tracking-wide"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      HALDI JUNCTION (HLD)
                    </span>
                  </div>
                  <span className="bg-[#1E293B] text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                    PF 1
                  </span>
                </div>
              </div>
              <div className="bg-[#FFFFFF] p-4 rounded-xl shadow-sm border border-[#002046]/10 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#002046] font-bold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#005323]" /> ARR: 10:00 IST
                  </span>
                  <span>DEP: 12:30 IST</span>
                  <span className="bg-[#EFF4FF] px-1.5 py-0.5 rounded text-[#44474E]">HALT: 2h 30m</span>
                </div>
                <div className="text-xs text-[#0B1C30]">
                  <strong>Platform:</strong> Peeli Kothi Lawns, Grand Heritage Palace.
                </div>
                <div className="p-2 bg-[#FFDDB8]/50 rounded text-[#855300] text-[11px] flex items-start gap-1">
                  <span><strong>Station Rule:</strong> Yellow Kurta/Saree mandatory. Certified high-speed Haldi flying zone!</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToCalendar('Haldi Junction - Vivah Express', '2026-12-24T10:00:00', 'Peeli Kothi Lawns')}
                  className="mt-1 bg-[#EFF4FF] hover:bg-[#D3E4FE] text-[#002046] text-xs font-mono py-1.5 px-3 rounded flex items-center justify-center gap-1.5 font-bold transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" /> ADD TO IRCTC CALENDAR
                </button>
              </div>
            </div>

            {/* Station 2: Sangeet Terminal */}
            <div className="relative flex flex-col gap-2">
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#002046] flex items-center justify-center text-white shadow">
                <Sparkles className="w-3 h-3" />
              </div>
              <div className="bg-[#FBC02D] text-[#1E293B] p-2.5 rounded-lg shadow-sm flex flex-col">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono block opacity-75">संगीत एवं डांस टर्मिनल</span>
                    <span
                      className="text-sm font-black tracking-wide"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      SANGEET CENTRAL TERMINAL (SNG)
                    </span>
                  </div>
                  <span className="bg-[#1E293B] text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                    PF 2
                  </span>
                </div>
              </div>
              <div className="bg-[#FFFFFF] p-4 rounded-xl shadow-sm border border-[#002046]/10 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#002046] font-bold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#005323]" /> ARR: 18:00 IST
                  </span>
                  <span>DEP: 23:59 IST</span>
                  <span className="bg-[#EFF4FF] px-1.5 py-0.5 rounded text-[#44474E]">NIGHT SUPERFAST</span>
                </div>
                <div className="text-xs text-[#0B1C30]">
                  <strong>Platform:</strong> Courtyard Grand Ballroom.
                </div>
                <div className="p-2 bg-[#FFDDB8]/50 rounded text-[#855300] text-[11px] flex items-start gap-1">
                  <span><strong>Caution:</strong> Loud dhol frequency, heavy bhangra overtaking on the dance track.</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToCalendar('Sangeet Central - Vivah Express', '2026-12-25T18:00:00', 'Courtyard Grand Ballroom')}
                  className="mt-1 bg-[#EFF4FF] hover:bg-[#D3E4FE] text-[#002046] text-xs font-mono py-1.5 px-3 rounded flex items-center justify-center gap-1.5 font-bold transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" /> ADD TO IRCTC CALENDAR
                </button>
              </div>
            </div>

            {/* Station 3: Shubh Vivah Central */}
            <div className="relative flex flex-col gap-2">
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#FEA619] flex items-center justify-center text-[#002046] shadow ring-2 ring-[#002046]">
                <Train className="w-3 h-3 font-bold" />
              </div>
              <div className="bg-[#FBC02D] text-[#1E293B] p-2.5 rounded-lg shadow-sm flex flex-col">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono block opacity-75">शुभ विवाह सेंट्रल (मुख्य जंक्शन)</span>
                    <span
                      className="text-sm font-black tracking-wide"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      SHUBH VIVAH CENTRAL (VIV)
                    </span>
                  </div>
                  <span className="bg-[#1E293B] text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                    MANDAP PF
                  </span>
                </div>
              </div>
              <div className="bg-[#FFFFFF] p-4 rounded-xl shadow-sm border border-[#002046]/10 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#002046] font-bold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#005323]" /> GODHULI VELA: 18:30 IST
                  </span>
                  <span className="bg-[#003F19] text-[#79DB8D] px-2 py-0.5 rounded font-bold">MAIN EVENT</span>
                </div>
                <div className="text-xs text-[#0B1C30]">
                  <strong>Platform:</strong> Sheesh Mandap, Poolside Enclave.
                </div>
                <div className="p-2 bg-[#79DB8D]/20 rounded text-[#005323] text-[11px] flex items-start gap-1">
                  <span><strong>Junction Highlights:</strong> 7 Sacred Pheras, Sindoor Daan, Kanyadaan. Auspicious silence requested during Vedic mantras.</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToCalendar('Shubh Vivah Central - Vivah Express', '2026-12-26T18:30:00', 'Sheesh Mandap Poolside')}
                  className="mt-1 bg-[#EFF4FF] hover:bg-[#D3E4FE] text-[#002046] text-xs font-mono py-1.5 px-3 rounded flex items-center justify-center gap-1.5 font-bold transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" /> ADD TO IRCTC CALENDAR
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PASSENGER SERVICES & TRAVEL AMENITIES */}
        <section id="services" className="flex flex-col gap-3 scroll-mt-24">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Luggage className="w-5 h-5 text-[#002046]" />
              <h2 className="text-xl text-[#002046] font-bold">Transit Amenities</h2>
            </div>
            <span className="text-[10px] font-mono bg-[#FFDDB8] text-[#855300] font-bold px-2 py-0.5 rounded">
              ALL-INCLUSIVE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Baggage */}
            <div className="bg-[#FFFFFF] p-4 rounded-xl shadow-sm border border-[#002046]/10 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#002046]">
                <Luggage className="w-4 h-4 text-[#855300]" />
                <span className="text-xs font-bold font-mono">Baggage & Dress Code</span>
              </div>
              <p className="text-xs text-[#44474E] leading-relaxed">
                <strong>Recommended Luggage:</strong> Heavy silks, regal sherwanis, colorful lehengas. Weight limit: Unlimited joy & dancing stamina.
              </p>
              <div className="text-[#BA1A1A] text-[10px] font-mono flex items-center gap-1 mt-auto pt-1">
                <span>🚫 Prohibited: Frowns & low battery cameras.</span>
              </div>
            </div>

            {/* Catering */}
            <div className="bg-[#FFFFFF] p-4 rounded-xl shadow-sm border border-[#002046]/10 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#002046]">
                <Utensils className="w-4 h-4 text-[#855300]" />
                <span className="text-xs font-bold font-mono">Pantry Car & Dining</span>
              </div>
              <p className="text-xs text-[#44474E] leading-relaxed">
                <strong>Executive Wedding Thali:</strong> Dal Makhani, Paneer Lababdar, Awadhi Biryani, Hot Jalebi-Rabdi & 24/7 cutting kulhad chai.
              </p>
              <span className="text-[10px] font-mono text-[#005323] font-bold flex items-center gap-1 mt-auto pt-1">
                🌿 Pure Jain & Satvik options prepared.
              </span>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-[#FFFFFF] p-4 rounded-xl shadow-sm border border-[#002046]/10 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#002046]">
                <PhoneCall className="w-4 h-4 text-[#855300]" />
                <span className="text-xs font-bold font-mono">SOS & Guard Incharge</span>
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex items-center justify-between">
                  <span>Train Superintendent (Papa ji):</span>
                  <a href="tel:+919811033445" className="font-mono text-[#002046] font-bold underline">
                    +91 98110 33445
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Station Master (Mama ji):</span>
                  <a href="tel:+919811155667" className="font-mono text-[#002046] font-bold underline">
                    +91 98111 55667
                  </a>
                </div>
              </div>
            </div>

            {/* Venue Navigation */}
            <div className="bg-[#FFFFFF] p-4 rounded-xl shadow-sm border border-[#002046]/10 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#002046]">
                <MapPin className="w-4 h-4 text-[#855300]" />
                <span className="text-xs font-bold font-mono">Venue Terminal</span>
              </div>
              <p className="text-xs text-[#44474E]">
                <strong>The Royal Heritage Lawns, GT Road, Sector 62</strong><br />
                Airport: 24 km | Central Metro: 4 mins
              </p>
              <div className="flex gap-2 mt-auto pt-2">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#EFF4FF] hover:bg-[#D3E4FE] py-1.5 px-2 rounded text-center text-[10px] font-mono text-[#002046] font-bold"
                >
                  GOOGLE MAPS
                </a>
                <a
                  href="https://m.uber.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#EFF4FF] hover:bg-[#D3E4FE] py-1.5 px-2 rounded text-center text-[10px] font-mono text-[#002046] font-bold"
                >
                  BOOK CAB
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE RSVP: "CONFIRM YOUR SEAT / CHART PREPARED" */}
        <section id="confirm-seat" className="bg-[#EFF4FF] p-4 rounded-xl shadow-md border border-[#002046]/10 flex flex-col gap-4 scroll-mt-24">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#44474E] uppercase font-bold">RESERVATION CHARTING STATUS</span>
              <h2 className="text-xl text-[#002046] font-bold">Confirm Your Berth</h2>
            </div>
            <div className="flex items-center gap-1 bg-[#003F19] text-[#79DB8D] px-2 py-1 rounded text-[10px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#79DB8D] animate-ping" />
              <span>CHART ACTIVE</span>
            </div>
          </div>

          <form onSubmit={handleConfirmReservation} className="flex flex-col gap-4">
            {/* Berth Count */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-[#44474E] font-bold uppercase">
                1. NUMBER OF PASSENGERS / BERTHS:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, '4+ (Family)'].map(cnt => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setBerthCount(cnt)}
                    className={`py-2 text-center rounded font-mono font-bold shadow-sm transition-all text-xs ${
                      berthCount === cnt
                        ? 'bg-[#002046] text-white'
                        : 'bg-white text-[#002046] hover:bg-[#D3E4FE]'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>

            {/* Meal Preference */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-[#44474E] font-bold uppercase">
                2. PANTRY CAR MEAL BOOKING:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="cursor-pointer bg-white p-2.5 rounded-lg flex items-center gap-2 shadow-sm border border-[#002046]/10">
                  <input
                    type="radio"
                    name="meal"
                    checked={mealOption === 'veg'}
                    onChange={() => setMealOption('veg')}
                    className="w-4 h-4 accent-[#002046]"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#002046]">Veg Maharaja</span>
                    <span className="text-[10px] text-[#44474E] font-mono">Thali / Satvik / Jain</span>
                  </div>
                </label>
                <label className="cursor-pointer bg-white p-2.5 rounded-lg flex items-center gap-2 shadow-sm border border-[#002046]/10">
                  <input
                    type="radio"
                    name="meal"
                    checked={mealOption === 'nonveg'}
                    onChange={() => setMealOption('nonveg')}
                    className="w-4 h-4 accent-[#002046]"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#002046]">Royal Non-Veg</span>
                    <span className="text-[10px] text-[#44474E] font-mono">Awadhi Gosht & Murgh</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Passenger Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-[#44474E] font-bold uppercase">
                3. PRIMARY PASSENGER NAME:
              </label>
              <input
                type="text"
                required
                value={passengerName}
                onChange={e => setPassengerName(e.target.value)}
                placeholder="Enter Full Name"
                className="w-full bg-white px-3 py-2.5 rounded-lg text-xs text-[#002046] font-bold focus:outline-none shadow-sm border border-[#002046]/20"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#002046] hover:bg-[#1B365D] text-white py-3.5 px-4 rounded-xl font-mono text-sm font-bold tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98]"
            >
              <CheckCircle2 className="w-4 h-4 text-[#FEA619]" />
              <span>CONFIRM MY BERTH ON TRAIN</span>
            </button>

            {rsvpConfirmed && (
              <div className="p-3 bg-[#003F19] text-[#79DB8D] rounded-xl flex flex-col items-center justify-center text-center gap-1 shadow-md">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-[#79DB8D]" />
                  <span
                    className="text-xs font-black tracking-widest uppercase"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    BERTH CONFIRMED & ALLOTTED
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white">
                  PNR #2612-ANIDEB RECORDED • DISPATCHING PASS VIA WHATSAPP
                </span>
              </div>
            )}
          </form>
        </section>

        {/* IRCTC FOOTER SIGN OFF */}
        <footer className="text-center py-4 flex flex-col items-center gap-1 text-xs text-[#44474E] font-mono border-t border-[#002046]/10">
          <div className="flex items-center gap-2 font-bold text-[#002046]">
            <span>BHARAT SHUBH RAILWAYS</span>
            <span>•</span>
            <span>COACH #LOVE-2026</span>
            <span>•</span>
            <span>HAPPY JOURNEY</span>
          </div>
          <span className="text-[11px] text-[#74777F]">{groom} &amp; {bride}'s Wedding Transit Portal</span>
        </footer>
      </main>

      {/* FIXED BOTTOM RAILWAY NAVIGATION BAR */}
      <nav className="fixed bottom-0 w-full z-50 bg-[#F8F9FF]/95 backdrop-blur-xl border-t border-[#002046]/10 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-md mx-auto grid grid-cols-4 items-center h-14 px-2">
          <button
            type="button"
            onClick={() => scrollTo('boarding-pass', 'pass')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded transition-colors ${
              activeTab === 'pass' ? 'text-[#002046] font-bold' : 'text-[#44474E] hover:text-[#002046]'
            }`}
          >
            <Train className="w-4 h-4" />
            <span className="text-[10px] font-mono">Pass</span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo('route-map', 'route')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded transition-colors ${
              activeTab === 'route' ? 'text-[#002046] font-bold' : 'text-[#44474E] hover:text-[#002046]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span className="text-[10px] font-mono">Route Map</span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo('services', 'services')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded transition-colors ${
              activeTab === 'services' ? 'text-[#002046] font-bold' : 'text-[#44474E] hover:text-[#002046]'
            }`}
          >
            <Luggage className="w-4 h-4" />
            <span className="text-[10px] font-mono">Services</span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo('confirm-seat', 'seat')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded transition-colors ${
              activeTab === 'seat' ? 'text-[#002046] font-bold' : 'text-[#44474E] hover:text-[#002046]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] font-mono">Confirm Seat</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
