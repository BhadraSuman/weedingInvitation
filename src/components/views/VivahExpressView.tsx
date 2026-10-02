import React, { useState } from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import { SectionReveal } from '../common/SectionReveal';
import { CountdownTimer } from '../CountdownTimer';
import { VenueLocation } from '../VenueLocation';
import { RsvpSection } from '../RsvpSection';
import { DigitalShagunSection } from '../DigitalShagunSection';
import { WishesGuestbook } from '../WishesGuestbook';
import { Footer } from '../Footer';
import { NriGlobalSuite } from '../common/NriGlobalSuite';
import {
  Train,
  CheckCircle,
  Clock,
  MapPin,
  QrCode,
  Sparkles,
  Ticket,
  ShieldCheck,
  Coffee,
  ArrowRight,
  Stamp
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VivahExpressViewProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
}

export const VivahExpressView: React.FC<VivahExpressViewProps> = ({
  template,
  lang,
  guestName
}) => {
  const { colors, quotes, groom, bride, events } = template;
  const isHindi = lang === 'native';
  const [stampClicked, setStampClicked] = useState(false);

  const handleStampClick = () => {
    setStampClicked(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#002046', '#FEA619', '#005323', '#FFFFFF']
    });
  };

  return (
    <div className="relative min-h-screen bg-[#F0F4FC] text-[#0B1C30] selection:bg-[#002046] selection:text-white font-sans overflow-x-hidden">
      {/* Railway Line Blueprint Background Geometry */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-15">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, #002046 1px, transparent 1px), linear-gradient(to bottom, #002046 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* Top IRCTC Navigation Bar */}
        <div className="flex items-center justify-between py-3 px-4 rounded-2xl bg-[#002046] text-white shadow-xl mb-8">
          <div className="flex items-center gap-2 min-w-0">
            <Train className="w-5 h-5 text-[#FEA619] shrink-0" />
            <div className="truncate">
              <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest block">
                {isHindi ? 'भारतीय विवाह रेलवे • विशेष ट्रेन' : 'BHARAT VIVAH EXPRESS • IRCTC SPECIAL'}
              </span>
              <span className="text-base font-bold font-serif tracking-tight truncate">
                {isHindi ? 'शाही बोर्डिंग पास #२०२६' : 'Royal Boarding Pass #2026'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#005323] text-emerald-200 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {isHindi ? 'समय पर (ON TIME)' : 'ON TIME'}
            </span>
          </div>
        </div>

        {/* HERO SECTION: PHYSICAL BOARDING PASS TICKET */}
        <SectionReveal>
          <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-[#002046]/20 overflow-hidden mb-12">
            {/* Top Navy Accent Bar */}
            <div className="h-3 w-full bg-[#002046] flex items-center justify-between px-6">
              <span className="h-1 w-12 bg-[#FEA619] rounded-full" />
              <span className="h-1 w-24 bg-white/40 rounded-full" />
              <span className="h-1 w-12 bg-[#FEA619] rounded-full" />
            </div>

            {/* Ticket Header */}
            <div className="p-5 sm:p-6 bg-[#EFF4FF] border-b border-[#002046]/10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Train className="w-6 h-6 text-[#002046]" />
                  <span className="font-mono text-sm sm:text-base tracking-wider text-[#002046] font-extrabold uppercase">
                    BHARAT VIVAH EXPRESS
                  </span>
                </div>
                <span className="font-mono text-xs bg-[#002046] text-white px-2.5 py-1 rounded font-bold tracking-widest">
                  SPL #2026
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-[#002046]/70">
                <span>{isHindi ? 'मंत्रालय: हर्षोल्लास एवं उत्सव' : 'MINISTRY OF CELEBRATIONS & JOY'}</span>
                <span className="text-[#005323] font-bold">{isHindi ? 'श्रेणी: प्रथम वातानुकूलित (अथाह प्रेम)' : 'CLASS: 1A (PURE LOVE)'}</span>
              </div>
            </div>

            {/* PNR & Security Code Strip */}
            <div className="px-5 sm:px-6 py-2 bg-[#E5EEFF] flex items-center justify-between border-b border-[#002046]/10">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#002046]/60 uppercase tracking-widest">
                  PNR NUMBER
                </span>
                <span className="font-mono text-sm sm:text-base font-black text-[#002046] tracking-widest">
                  2612-SANPRI
                </span>
              </div>

              {/* Barcode Mockup */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-0.5 h-6 opacity-70">
                  <div className="w-1 h-full bg-[#002046]" />
                  <div className="w-0.5 h-full bg-[#002046]" />
                  <div className="w-1.5 h-full bg-[#002046]" />
                  <div className="w-0.5 h-full bg-[#002046]" />
                  <div className="w-2 h-full bg-[#002046]" />
                  <div className="w-1 h-full bg-[#002046]" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#005323] bg-emerald-100 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'क्यूआर प्रमाणित' : 'QR VERIFIED'}</span>
                </div>
              </div>
            </div>

            {/* Main Journey Route (Origin -> Destination) */}
            <div className="p-6">
              <div className="flex items-center justify-between relative mb-6">
                {/* Origin */}
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] text-[#002046]/60 uppercase">
                    ORIGIN (PF 1)
                  </span>
                  <span className="font-serif text-lg sm:text-2xl font-black text-[#002046]">
                    {isHindi ? 'अविवाहित जीवन' : 'SINGLE LIFE'}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#FEA619]">
                    STN CODE: SGL
                  </span>
                </div>

                {/* Trajectory */}
                <div className="flex-1 flex flex-col items-center px-4">
                  <span className="font-mono text-[11px] font-bold text-[#005323] mb-1">
                    {isHindi ? '७ फेरे / आजीवन सफर' : '7 PHERAS / LIFETIME'}
                  </span>
                  <div className="w-full flex items-center relative">
                    <div className="w-full h-0.5 bg-[#002046]/20 border-t-2 border-dashed border-[#002046]/40" />
                    <div className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-[#002046]">
                      <ArrowRight className="w-5 h-5 text-[#002046] animate-pulse" />
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-[#002046]/70 mt-1 uppercase font-semibold">
                    NON-STOP SUPERFAST
                  </span>
                </div>

                {/* Destination */}
                <div className="flex flex-col items-end min-w-0 text-right">
                  <span className="font-mono text-[10px] text-[#002046]/60 uppercase">
                    DESTINATION (PF 7)
                  </span>
                  <span className="font-serif text-lg sm:text-2xl font-black text-[#002046]">
                    {isHindi ? 'सुखद दांपत्य' : 'MARRIED LIFE'}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#FEA619]">
                    STN CODE: MRD
                  </span>
                </div>
              </div>

              {/* Passenger & Seat Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#EFF4FF] p-4 rounded-2xl border border-[#002046]/10 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-[#002046]/60 uppercase block">
                    {isHindi ? 'यात्री का नाम (PASSENGER)' : 'PASSENGER NAME'}
                  </span>
                  <span className="font-bold font-serif text-sm sm:text-base text-[#002046] truncate block">
                    {guestName || (isHindi ? 'सादर आमंत्रित आत्मीय परिजन' : 'Respected Family Guest')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#002046]/60 uppercase block">
                    {isHindi ? 'कोच / बर्थ (COACH / BERTH)' : 'COACH / BERTH'}
                  </span>
                  <span className="font-bold text-sm sm:text-base text-[#002046] block">
                    B-1 / 72 LB <span className="text-xs font-normal text-[#005323]">(Window Seat)</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#002046]/60 uppercase block">
                    {isHindi ? 'प्रस्थान (DEPARTURE)' : 'DEPARTURE'}
                  </span>
                  <span className="font-bold text-sm sm:text-base text-[#002046] block">
                    26 DEC '26 • 18:30 IST
                  </span>
                </div>
              </div>
            </div>

            {/* Perforation Cutout Area */}
            <div className="relative w-full h-8 flex items-center justify-between">
              <div className="w-5 h-10 bg-[#F0F4FC] rounded-r-full -ml-2.5 shadow-inner border border-[#002046]/20 border-l-0" />
              <div className="flex-1 h-0 border-t-2 border-dashed border-[#002046]/30 mx-3" />
              <div className="w-5 h-10 bg-[#F0F4FC] rounded-l-full -mr-2.5 shadow-inner border border-[#002046]/20 border-r-0" />
            </div>

            {/* Lower Stub: Fare & Stamp */}
            <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col text-center sm:text-left">
                <span className="font-mono text-[10px] text-[#002046]/60 uppercase">
                  {isHindi ? 'टिकट किराया (FARE BREAKOUT)' : 'FARE BREAKOUT'}
                </span>
                <span className="font-mono text-base font-black text-[#002046]">
                  {isHindi ? '₹ ०.०० (केवल शुभाशीष एवं प्यार)' : '₹ 0.00 (SHUBH AASHIRVAAD ONLY)'}
                </span>
                <span className="text-xs text-[#005323] font-mono font-semibold">
                  {isHindi ? 'तत्काल कोटा: शत-प्रतिशत स्नेह' : 'Tatkal Quota: 100% Love Guaranteed'}
                </span>
              </div>

              {/* Rubber Stamp "CONFIRMED (CNF)" */}
              <button
                onClick={handleStampClick}
                className={`px-5 py-2.5 rounded-2xl border-2 border-[#005323] bg-emerald-50 text-[#005323] font-mono font-black text-xs sm:text-sm tracking-widest uppercase shadow-md transition-all transform ${
                  stampClicked ? 'scale-105 rotate-[-4deg] bg-emerald-100' : 'hover:scale-102 rotate-[-2deg]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#005323]" />
                  <span>{isHindi ? 'कन्फर्म्ड (CNF) • नो कैंसिलेशन' : 'CONFIRMED (CNF) • ZERO CANCEL'}</span>
                </div>
              </button>
            </div>
          </div>
        </SectionReveal>

        {/* COUNTDOWN TO DEPARTURE */}
        <div className="my-12">
          <CountdownTimer
            template={template}
            lang={lang}
          />
        </div>

        {/* TRANSIT STOPS TIMELINE (STATIONS 1, 2, 3) */}
        <SectionReveal>
          <div className="my-16">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#005323] font-bold block">
                {isHindi ? 'रूट मैप एवं स्टेशन समय सारिणी' : 'ROUTE MAP & STATION TIMETABLE'}
              </span>
              <h2 className="text-3xl font-bold font-serif text-[#002046] mt-1">
                {isHindi ? 'सफर के मांगलिक पड़ाव' : 'Celebration Station Lineage'}
              </h2>
            </div>

            <div className="relative border-l-4 border-[#002046]/30 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10">
              {events.map((evt, idx) => (
                <div key={evt.id} className="relative group">
                  {/* Station Node Marker */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-full bg-[#002046] border-4 border-white flex items-center justify-center text-white shadow-md">
                    <Train className="w-3.5 h-3.5 text-[#FEA619]" />
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#002046]/15 shadow-md group-hover:border-[#002046] transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#002046]/10 pb-3 mb-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#005323] uppercase">
                          PLATFORM {idx + 1} • {isHindi ? 'स्टेशन' : 'STATION'} 0{idx + 1}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#002046]">
                          {isHindi ? evt.nativeTitle : evt.title}
                        </h3>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#FEA619] bg-[#002046] px-3 py-1 rounded-full shrink-0">
                        {isHindi ? evt.nativeDate : evt.date}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-serif italic text-[#002046]/70 mb-3">
                      "{isHindi ? evt.nativeTagline : evt.tagline}"
                    </p>
                    <p className="text-xs sm:text-sm text-[#002046]/80 leading-relaxed font-sans mb-4">
                      {isHindi ? evt.nativeDescription : evt.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#002046]/10 text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-[#002046]">
                        <Clock className="w-3.5 h-3.5 text-[#005323]" />
                        <span>{isHindi ? evt.nativeTime : evt.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#002046]">
                        <MapPin className="w-3.5 h-3.5 text-[#005323]" />
                        <span>{isHindi ? evt.nativeVenueName : evt.venueName}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#002046]/5 text-[#002046] text-[11px] font-semibold">
                        👔 {isHindi ? evt.nativeDressCode : evt.dressCode}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* IRCTC SPECIAL CATERING ADVISORY */}
        <SectionReveal>
          <div className="bg-white p-6 rounded-2xl border border-[#002046]/20 shadow-md mb-14">
            <div className="flex items-center gap-2 mb-2 text-[#002046]">
              <Coffee className="w-5 h-5 text-[#FEA619]" />
              <h3 className="text-xl font-bold font-serif">
                {isHindi ? 'शाही खानपान एवं पेंट्री गाइड' : 'IRCTC Special Nuptial Catering & Pantry'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#002046]/70 mb-4">
              {isHindi
                ? 'सभी सम्मानित यात्रियों के लिए विशेष बनारसी कुल्हड़ चाय, अवधी कबाब एवं शाही प्रीतिभोज की असीमित व्यवस्था।'
                : 'Complimentary Banarasi Kulhad Chai, live street chaat stalls, and five-course royal banquet await all boarding delegates.'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#EFF4FF] border border-[#002046]/10">
                ☕ {isHindi ? 'कुल्हड़ चाय' : 'Kulhad Chai'}
              </div>
              <div className="p-3 rounded-xl bg-[#EFF4FF] border border-[#002046]/10">
                🥘 {isHindi ? 'लाइव चाट ठेला' : 'Live Chaat'}
              </div>
              <div className="p-3 rounded-xl bg-[#EFF4FF] border border-[#002046]/10">
                🍱 {isHindi ? 'शाही दावत' : 'Royal Feast'}
              </div>
              <div className="p-3 rounded-xl bg-[#EFF4FF] border border-[#002046]/10">
                🍨 {isHindi ? 'मलाई कुल्फी' : 'Malai Kulfi'}
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* GLOBAL SUITE */}
        <div className="my-14">
          <NriGlobalSuite template={template} lang={lang} />
        </div>

        {/* STATION JUNCTION LOCATION */}
        <div className="my-14">
          <VenueLocation template={template} lang={lang} />
        </div>

        {/* STATION MASTER RSVP */}
        <div className="my-14">
          <RsvpSection template={template} lang={lang} />
        </div>

        {/* SHUBH YATRA SHAGUN REGISTRY */}
        <div className="my-14">
          <DigitalShagunSection template={template} lang={lang} />
        </div>

        {/* PASSENGER GUESTBOOK */}
        <div className="my-14">
          <WishesGuestbook template={template} lang={lang} />
        </div>

        {/* FOOTER */}
        <Footer template={template} lang={lang} />
      </div>
    </div>
  );
};
