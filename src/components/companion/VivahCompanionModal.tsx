import React, { useState, useEffect } from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import {
  Compass,
  Clock,
  MapPin,
  Utensils,
  PhoneCall,
  Share2,
  Calendar,
  Sparkles,
  Car,
  AlertCircle,
  Wine,
  Filter,
  CheckCircle,
  Camera,
  ExternalLink,
  X,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VivahCompanionModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
}

export const VivahCompanionModal: React.FC<VivahCompanionModalProps> = ({
  isOpen,
  onClose,
  template,
  lang,
  guestName
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'schedule' | 'transit' | 'menu'>('home');
  const [selectedAllergen, setSelectedAllergen] = useState<string>('all');
  const [photoLiked, setPhotoLiked] = useState<Record<number, boolean>>({});

  const isHindi = (template.nativeLanguageCode === 'hi' || template.id === 'bihari_marwari' || template.id === 'royal_north' || template.id === 'chibi_3d') && lang === 'native';
  const isBengali = (template.nativeLanguageCode === 'bn' || template.id === 'bengali' || template.id === 'annaprashan' || template.id === 'birthday' || template.id === 'wedding_gazette') && lang === 'native';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-xl h-[92vh] sm:h-[88vh] bg-[#0B1326] text-white rounded-t-3xl sm:rounded-3xl border border-white/15 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#131B2E] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <Compass className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                  VIVAH COMPANION
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>
              <h2 className="text-sm font-semibold text-white truncate">
                {template.groom.name} & {template.bride.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Bottom Tab Navigation */}
        <div className="grid grid-cols-4 border-b border-white/10 bg-[#0F172A] shrink-0 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('home')}
            className={`py-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'home'
                ? 'text-amber-400 border-b-2 border-amber-400 bg-white/5'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isHindi ? 'लाइव होम' : isBengali ? 'লাইভ হোম' : 'Live Home'}</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'schedule'
                ? 'text-amber-400 border-b-2 border-amber-400 bg-white/5'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{isHindi ? 'समय सारिणी' : isBengali ? 'সময়সূচী' : 'Timeline'}</span>
          </button>

          <button
            onClick={() => setActiveTab('transit')}
            className={`py-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'transit'
                ? 'text-amber-400 border-b-2 border-amber-400 bg-white/5'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>{isHindi ? 'पार्किंग एवं मैप' : isBengali ? 'পার্কিং ও ম্যাপ' : 'Transit & Map'}</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'menu'
                ? 'text-amber-400 border-b-2 border-amber-400 bg-white/5'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>{isHindi ? 'शाही मेनू' : isBengali ? 'ভোজের মেনু' : 'Live Menu'}</span>
          </button>
        </div>

        {/* Scrollable Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: LIVE HOME */}
          {activeTab === 'home' && (
            <div className="space-y-6">
              {/* Happening Now Live Pulse Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-red-950/40 via-[#171F33] to-amber-950/30 border border-amber-500/40 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>HAPPENING NOW</span>
                  </div>
                  <span className="text-xs font-mono text-amber-400 font-semibold">
                    07:30 PM - Midnight
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
                  {template.events[template.events.length - 1]?.title || 'Main Vivah Gala'}
                </h3>
                <p className="text-xs text-white/70 font-mono flex items-center gap-1.5 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{template.venue.name} • Main Mandap Lawn</span>
                </p>

                {/* Ritual Progress Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs font-mono text-white/80">
                    <span>Ritual Progress: Varmala & Sacred Vows</span>
                    <span className="text-amber-400 font-bold">75%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-red-500 w-[75%]" />
                  </div>
                </div>

                {/* Up Next Strip */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">UP NEXT:</span>
                    <span className="text-white/80">Royal Bhoj & Photo Session</span>
                  </div>
                  <span className="text-white/50">08:45 PM</span>
                </div>
              </div>

              {/* Concierge & Bridesmaid Emergency SOS Hotline */}
              <div className="p-4 rounded-2xl bg-[#171F33] border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                    <PhoneCall className="w-4 h-4" />
                    {isHindi ? 'मेहमान सहायता केंद्र' : isBengali ? 'অতিথি হেল্পলাইন' : 'Guest Concierge & Help'}
                  </span>
                  <span className="text-[11px] font-mono text-white/50">24/7 At Venue</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="tel:+919830011223"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block">Concierge / Valet</span>
                      <span className="text-[11px] text-white/60 font-mono">+91 98300 11223</span>
                    </div>
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                  </a>
                  <a
                    href="tel:+919830144556"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block">Bridesmaid Team</span>
                      <span className="text-[11px] text-white/60 font-mono">+91 98301 44556</span>
                    </div>
                    <PhoneCall className="w-4 h-4 text-pink-400" />
                  </a>
                </div>
              </div>

              {/* Weather & Comfort Advisory */}
              <div className="p-4 rounded-2xl bg-[#171F33] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase font-bold block">
                    Venue Temperature: 22°C (Clear)
                  </span>
                  <p className="text-xs text-white/70 mt-0.5">
                    Outdoor lawn ceremony with heating radiators & shawl counter.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-amber-400 shrink-0">
                  🌤️
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <p className="text-xs font-mono text-white/70 mb-2">
                {isHindi ? 'सभी मांगलिक रस्मों की अद्यतन स्थिति:' : isBengali ? 'সমস্ত মাঙ্গলিক অনুষ্ঠানের বর্তমান স্থিতি:' : 'Real-time status across multi-day celebration rituals:'}
              </p>

              {template.events.map((evt, idx) => {
                const isPast = idx < template.events.length - 1;
                const isCurrent = idx === template.events.length - 1;

                return (
                  <div
                    key={evt.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-[#171F33] border-amber-400 shadow-lg'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {evt.time}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                          isCurrent
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : isPast
                            ? 'bg-white/10 text-white/60'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {isCurrent ? 'HAPPENING NOW' : isPast ? 'COMPLETED' : 'UP NEXT'}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white font-serif mb-1">
                      {isHindi ? evt.nativeTitle : isBengali ? evt.nativeTitle : evt.title}
                    </h4>
                    <p className="text-xs text-white/70 mb-3">
                      {isHindi ? evt.nativeDescription : isBengali ? evt.nativeDescription : evt.description}
                    </p>

                    <div className="flex items-center justify-between text-xs font-mono text-white/60 pt-2 border-t border-white/10">
                      <span>📍 {evt.venueName}</span>
                      <span>👗 {evt.dressCode}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: TRANSIT & MAP */}
          {activeTab === 'transit' && (
            <div className="space-y-6">
              {/* Valet Status */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-[#171F33] border border-emerald-500/40">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Valet Parking Status: ACTIVE
                    </span>
                    <h4 className="text-sm font-semibold text-white">
                      East Porch Gate 2 • Average wait time: 4 mins
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-white/70 font-mono">
                  Keep your valet token card handy when requesting vehicle retrieval.
                </p>
              </div>

              {/* 1-Click Ride Hailing Actions */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=${encodeURIComponent(template.venue.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs flex items-center justify-center gap-2 shadow hover:bg-white/90"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Book Uber Cab</span>
                </a>
                <a
                  href={template.venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-amber-500 text-black font-mono font-bold text-xs flex items-center justify-center gap-2 shadow hover:bg-amber-400"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Google Maps GPS</span>
                </a>
              </div>

              {/* Venue Coordinates Card */}
              <div className="p-4 rounded-2xl bg-[#171F33] border border-white/10 space-y-2 text-xs">
                <span className="font-mono text-amber-400 uppercase font-bold block">
                  Venue Directions & Accessibility
                </span>
                <p className="text-white/90 font-semibold">{template.venue.name}</p>
                <p className="text-white/70">{template.venue.address}</p>
                <div className="pt-2 border-t border-white/10 text-[11px] text-white/60 space-y-1">
                  <p>♿ Wheelchair ramp access available at Main Portico Gate 1.</p>
                  {template.venue.metroStation && (
                    <p>🚇 Nearest Metro: {template.venue.metroStation}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LIVE FOOD & COCKTAIL MENU */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              {/* Allergen Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-white/60 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>
                {['all', 'jain', 'vegan', 'gluten-free'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedAllergen(type)}
                    className={`px-3 py-1 rounded-full text-xs font-mono capitalize transition-all ${
                      selectedAllergen === type
                        ? 'bg-amber-400 text-black font-bold'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Live Counters */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#171F33] border border-white/10">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase mb-2">
                    <Utensils className="w-4 h-4" />
                    <span>Live Street Chaat Station (Open Now)</span>
                  </div>
                  <ul className="text-xs text-white/80 space-y-1.5 list-disc list-inside">
                    <li>Kolkata Puchka with Gandhoraj Lime Infused Water</li>
                    <li>Banarasi Tamatar Chaat & Dahi Bhalla</li>
                    <li>Kurkuri Palak Chaat with Pomegranate Pearls</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#171F33] border border-white/10">
                  <div className="flex items-center gap-2 text-pink-400 font-mono text-xs font-bold uppercase mb-2">
                    <Wine className="w-4 h-4" />
                    <span>Signature Nuptial Bar</span>
                  </div>
                  <ul className="text-xs text-white/80 space-y-1.5 list-disc list-inside">
                    <li><strong>The Bride’s Cosmopolitan:</strong> Cranberry, hibiscus elixir & vodka</li>
                    <li><strong>The Groom’s Old Fashioned:</strong> Bourbon with smoked jaggery & orange bitters</li>
                    <li><strong>The Saffron Sunrise (Mocktail):</strong> Kesar syrup, fresh citrus & sparkling tonic</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#171F33] border border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Main Royal Bhoj Banquet</span>
                  </div>
                  <ul className="text-xs text-white/80 space-y-1.5 list-disc list-inside">
                    <li>Slow-cooked Dum Biryani with Golden Fried Aloo & Mirch Ka Salan</li>
                    <li>Paneer Lababdar & Dal Makhani simmered 24 hours</li>
                    <li>Assorted Artisanal Breads: Sheermal, Taftan & Laccha Paratha</li>
                    <li>Dessert: Warm Baked Mihidana with Rabdi & Nolen Gur Ice Cream</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Signoff */}
        <div className="p-3 bg-[#0F172A] border-t border-white/10 text-center text-[11px] font-mono text-white/50 shrink-0">
          UtsavPatra Vivah Companion • Real-time Event Concierge
        </div>
      </div>
    </div>
  );
};
