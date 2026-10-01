import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { weddingsRegistry } from '../../data/weddings';
import { EventCategory } from '../../types/wedding';
import {
  Sparkles,
  MapPin,
  Calendar,
  MessageCircle,
  Music,
  Share2,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
  Clock,
  Baby,
  Cake,
  Heart,
  UtensilsCrossed
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | EventCategory>('all');

  const whatsappInquiryUrl = (packageTitle: string = "Celebration Invitation") => {
    const text = encodeURIComponent(
      `Hello Suman! I am interested in creating a digital celebration invitation on UtsavPatra.com (${packageTitle}). Could you please share more details?`
    );
    return `https://wa.me/916291898703?text=${text}`;
  };

  const allEvents = Object.values(weddingsRegistry);
  const filteredEvents = selectedCategory === 'all'
    ? allEvents
    : allEvents.filter(e => e.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C1810] font-sans selection:bg-[#8B181B] selection:text-[#F3E5AB]">
      
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#D4AF37]/30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8B181B] via-[#A82025] to-[#D4AF37] flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5 text-[#F3E5AB]" />
          </div>
          <div>
            <span className="font-serif font-extrabold text-lg sm:text-xl text-[#8B181B] tracking-tight block">
              UtsavPatra<span className="text-[#D4AF37]">.com</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#997819] font-serif font-bold block -mt-1">
              উৎসবপত্র • Cultural Celebrations
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-serif font-semibold text-[#5C0C0F]">
          <a href="#demos" className="hover:text-[#8B181B] transition-colors">Celebration Demos</a>
          <a href="#why-digital" className="hover:text-[#8B181B] transition-colors">Why Digital?</a>
          <a href="#pricing" className="hover:text-[#8B181B] transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-[#8B181B] transition-colors">Contact</a>
        </nav>

        <a
          href={whatsappInquiryUrl("General Inquiry")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold shadow-md transition-all active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp Booking</span>
          <span className="sm:hidden">Chat</span>
        </a>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B181B]/10 border border-[#D4AF37]/50 text-xs font-serif font-bold text-[#8B181B] uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>India’s Premier Digital Celebration &amp; Cultural Invitation Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-[#8B181B] tracking-tight leading-tight max-w-3xl mx-auto">
          Every Life Milestone <br className="hidden sm:inline" />
          <span className="text-[#997819] italic font-normal">Deserves a Sacred Digital E-Patra</span>
        </h1>

        <p className="mt-5 text-sm sm:text-base text-[#6E5D53] max-w-2xl mx-auto leading-relaxed font-serif">
          From grand <strong>Weddings</strong> to baby's <strong>Annaprashan</strong> (First Rice Ceremony) and joyous <strong>1st Birthdays</strong>. 
          Share authentic cultural rituals, 1-tap Google Maps directions, and automated WhatsApp RSVPs with zero paper courier hassles.
        </p>

        {/* Hero Quick Demos Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
          <Link
            to="/anirban-weds-deboleena"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#8B181B] hover:bg-[#5E0B0E] text-[#F3E5AB] font-serif font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
          >
            <span>🪔 Bengali Wedding</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </Link>

          <Link
            to="/sandeep-weds-priya"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0D4A36] hover:bg-[#042017] text-[#E5C158] font-serif font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
          >
            <span>🚩 Bihari &amp; Marwari Vivah</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E5C158]" />
          </Link>

          <Link
            to="/aarav-annaprashan"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#D97706] hover:bg-[#B45309] text-white font-serif font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
          >
            <span>🥣 Baby Annaprashan</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FEF3C7]" />
          </Link>

          <Link
            to="/ananya-turns-1"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-serif font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
          >
            <span>🎂 1st Birthday Gala</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FCE7F3]" />
          </Link>
        </div>

        <p className="text-xs text-[#997819] mt-4 font-serif">
          ⚡ Sub-second load time on mobile 4G networks • Designed natively for WhatsApp sharing
        </p>
      </section>

      {/* 3. Live Client Slugs Showcase (The Portfolio with Category Filter) */}
      <section className="py-16 px-4 sm:px-6 bg-[#FAF6EE] border-y border-[#D4AF37]/30" id="demos">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-serif uppercase tracking-widest text-[#8B181B] font-bold">
              Live Interactive Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1810] mt-1">
              Select Your Celebration Category
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6A60] font-serif max-w-md mx-auto mt-2">
              Every client gets a clean, dedicated URL like <code className="bg-white px-2 py-0.5 rounded text-[#8B181B] font-mono">utsavpatra.com/your-event</code> to send directly on WhatsApp.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            {[
              { id: 'all', label: '🌟 All Celebrations (4)' },
              { id: 'wedding', label: '💍 Weddings (2)' },
              { id: 'annaprashan', label: '🥣 Annaprashan (1)' },
              { id: 'birthday', label: '🎂 Birthdays (1)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-4 sm:px-5 py-2 rounded-full font-serif text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-[#8B181B] text-[#F3E5AB] shadow-md scale-105'
                    : 'bg-white border border-[#D4AF37]/40 text-[#5C0C0F] hover:bg-stone-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Live Micro-Sites Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredEvents.map(evt => (
              <div
                key={evt.slug}
                className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/60 shadow-lg flex flex-col justify-between group hover:border-[#8B181B] transition-all"
              >
                <div>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-[#D4AF37]/40 shadow-inner">
                    <img
                      src={evt.previewImage}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute top-3 left-3 font-serif text-xs font-bold px-3 py-1 rounded-full shadow"
                      style={{
                        backgroundColor: evt.template.colors.primary,
                        color: evt.template.colors.accentLight || '#FFFFFF'
                      }}
                    >
                      {evt.badgeEmoji} {evt.cultureName.split('(')[0].trim()}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md text-white p-2 rounded-xl text-xs font-mono">
                      utsavpatra.com/{evt.slug}
                    </div>
                  </div>

                  <h3
                    className="text-2xl font-serif font-bold"
                    style={{ color: evt.template.colors.primary }}
                  >
                    {evt.title.split('—')[0].trim()}
                  </h3>
                  <p className="text-xs text-[#997819] font-serif mt-1 font-semibold">
                    {evt.template.cultureLabel} • {evt.template.venue.name}
                  </p>

                  <p className="text-xs text-[#5C0C0F] font-serif mt-3 leading-relaxed">
                    {evt.template.cultureTagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-xs font-serif text-stone-500">Live Client Demo</span>
                  <Link
                    to={`/${evt.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-serif font-semibold shadow hover:opacity-90 transition-opacity"
                    style={{
                      backgroundColor: evt.template.colors.primary,
                      color: '#FFFFFF'
                    }}
                  >
                    <span>Open E-Patra</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Why UtsavPatra Beats Paper Cards (Feature Grid) */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto" id="why-digital">
        <div className="text-center mb-14">
          <span className="text-xs font-serif uppercase tracking-widest text-[#8B181B] font-bold">
            The Digital Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1810] mt-1">
            Why Modern Families Prefer UtsavPatra
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5D53] font-serif max-w-lg mx-auto mt-2">
            Eliminate all friction for out-of-town guests and make event coordination effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B181B]/10 flex items-center justify-center text-[#8B181B]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#2C1810]">1-Tap Google Navigation</h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed font-serif">
              No lost relatives calling you 20 times asking for directions. One tap opens turn-by-turn navigation &amp; Uber/Ola ride booking.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B181B]/10 flex items-center justify-center text-[#8B181B]">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#2C1810]">1-Tap Calendar Reminder</h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed font-serif">
              Guests easily forget paper dates. Our 1-click button adds the muhurat with alarm reminders straight to Google &amp; Apple calendars.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B181B]/10 flex items-center justify-center text-[#8B181B]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#2C1810]">Instant WhatsApp RSVPs</h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed font-serif">
              Know your exact guest headcounts in advance. Guests confirm attendance directly to your coordinator’s WhatsApp with pre-filled respectful messages.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B181B]/10 flex items-center justify-center text-[#8B181B]">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#2C1810]">VIP Guest Link Generator</h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed font-serif">
              Make honored guests feel special. Generate tailored links that greet relatives personally with their family title on top.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B181B]/10 flex items-center justify-center text-[#8B181B]">
              <Music className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#2C1810]">Sacred Shehnai &amp; Melodies</h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed font-serif">
              Envelope unfolds with traditional Indian Shehnai, flutes, and auspicious wedding chimes, setting an emotional festive mood.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B181B]/10 flex items-center justify-center text-[#8B181B]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#2C1810]">Eco-Friendly &amp; Instant</h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed font-serif">
              Save thousands on paper printing, envelope stamps, and courier losses. Share your personalized site across WhatsApp in 1 second.
            </p>
          </div>

        </div>
      </section>

      {/* 5. Transparent Packages & Pricing */}
      <section className="py-20 px-4 sm:px-6 bg-[#FAF6EE] border-y border-[#D4AF37]/30" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-serif uppercase tracking-widest text-[#8B181B] font-bold">
              Transparent Investment
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1810] mt-1">
              Celebration Packages
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6A60] font-serif max-w-md mx-auto mt-2">
              Ready within 24 hours. Custom URL, unlimited WhatsApp shares, and live forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Silver Tier: Annaprashan & Birthdays */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-serif font-bold text-[#997819] uppercase tracking-wider block">
                  Silver Package
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2C1810] mt-1">
                  Milestone Celebrations
                </h3>
                <p className="text-xs text-stone-500 font-serif mt-1">
                  Ideal for Annaprashan, 1st Birthdays &amp; Griha Pravesh
                </p>

                <div className="my-6">
                  <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#8B181B]">₹999</span>
                  <span className="text-xs text-stone-500 font-serif ml-1">one-time</span>
                </div>

                <ul className="space-y-3 text-xs font-serif text-[#4A3B32]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dedicated slug: utsavpatra.com/your-name</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Interactive envelope animation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Traditional bhoj / party menu card</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>1-Tap Google Maps location embed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>RSVP confirmation to WhatsApp</span>
                  </li>
                </ul>
              </div>

              <a
                href={whatsappInquiryUrl("Silver Package (₹999)")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-3 px-4 rounded-xl border border-[#8B181B] text-[#8B181B] font-serif font-bold text-xs text-center hover:bg-[#8B181B] hover:text-white transition-colors"
              >
                Book Silver Package
              </a>
            </div>

            {/* Gold Tier: Weddings (Most Popular) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-xl flex flex-col justify-between relative transform md:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#8B181B] text-[#F3E5AB] font-serif font-bold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow">
                ★ Most Popular For Weddings ★
              </div>

              <div>
                <span className="text-xs font-serif font-bold text-[#8B181B] uppercase tracking-wider block">
                  Gold Package
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2C1810] mt-1">
                  Traditional Shubh Vivah
                </h3>
                <p className="text-xs text-stone-500 font-serif mt-1">
                  Full cultural wedding suite (Bengali, Marwari, South Indian)
                </p>

                <div className="my-6">
                  <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#8B181B]">₹2,499</span>
                  <span className="text-xs text-stone-500 font-serif ml-1">one-time</span>
                </div>

                <ul className="space-y-3 text-xs font-serif text-[#4A3B32]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Everything in Silver package</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Multi-ritual schedule with Calendar add</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Family lineage &amp; couple photo profiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Personalized guest link generator tool</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Interactive wishes guestbook with hearts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>English &amp; native language toggle</span>
                  </li>
                </ul>
              </div>

              <a
                href={whatsappInquiryUrl("Gold Wedding Package (₹2,499)")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-3.5 px-4 rounded-xl bg-[#8B181B] text-[#F3E5AB] font-serif font-bold text-xs text-center shadow-lg hover:bg-[#5E0B0E] transition-colors"
              >
                Book Gold Wedding Package
              </a>
            </div>

            {/* Platinum Tier: Royal Multi-Day */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-serif font-bold text-[#997819] uppercase tracking-wider block">
                  Platinum Package
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2C1810] mt-1">
                  Royal Multi-Day Grand Gala
                </h3>
                <p className="text-xs text-stone-500 font-serif mt-1">
                  Destination weddings &amp; custom multi-event extravaganzas
                </p>

                <div className="my-6">
                  <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#8B181B]">₹4,999</span>
                  <span className="text-xs text-stone-500 font-serif ml-1">one-time</span>
                </div>

                <ul className="space-y-3 text-xs font-serif text-[#4A3B32]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Everything in Gold package</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unlimited sub-events (Tilak, Sangeet, Reception)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Custom background audio selection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Multi-venue map support for all days</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Priority 12-hour express turnaround</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dedicated RSVP coordinator desk</span>
                  </li>
                </ul>
              </div>

              <a
                href={whatsappInquiryUrl("Platinum Royal Package (₹4,999)")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-3 px-4 rounded-xl border border-[#8B181B] text-[#8B181B] font-serif font-bold text-xs text-center hover:bg-[#8B181B] hover:text-white transition-colors"
              >
                Book Platinum Package
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Contact & WhatsApp Call to Action */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center" id="contact">
        <div className="bg-gradient-to-b from-[#FFFDF9] to-[#FAF6EE] rounded-3xl p-8 sm:p-12 border-2 border-[#D4AF37] shadow-xl">
          <span className="text-xs uppercase font-serif tracking-widest text-[#8B181B] font-bold block mb-2">
            Ready to Celebrate?
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#8B181B]">
            Launch Your Event E-Patra in 24 Hours
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-serif text-[#6E5D53] max-w-lg mx-auto leading-relaxed">
            Message us on WhatsApp with your event details, ceremony timings, and venue. 
            We design your invitation, share a live preview link, and have it ready for guests within 24 hours.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappInquiryUrl("Direct Inquiry")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-semibold shadow-lg transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Message Suman on WhatsApp</span>
            </a>

            <a
              href="tel:+916291898703"
              className="inline-flex items-center gap-2 py-3.5 px-6 rounded-full border-2 border-[#8B181B] text-[#8B181B] text-sm font-serif font-bold hover:bg-[#8B181B] hover:text-white transition-all shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +91 6291898703</span>
            </a>

            <a
              href="mailto:bhadrasuman04@gmail.com"
              className="inline-flex items-center gap-2 py-3.5 px-6 rounded-full border border-stone-300 bg-white text-[#2C1810] text-sm font-serif font-semibold hover:bg-stone-50 transition-all shadow-sm"
            >
              <Mail className="w-4 h-4 text-[#8B181B]" />
              <span>Email: bhadrasuman04@gmail.com</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200 text-xs font-serif text-[#7A6A60] flex flex-wrap items-center justify-center gap-4">
            <span>✨ Coordinated by <strong>Suman Bhadra</strong></span>
            <span>•</span>
            <span>📍 Kolkata, West Bengal</span>
            <span>•</span>
            <span>🇮🇳 Serving clients nationwide &amp; globally</span>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="py-8 text-center text-xs font-serif text-stone-500 border-t border-stone-200">
        <p className="font-semibold text-stone-700">
          UtsavPatra.com — उत्सवपत्र • Cultural Digital Celebrations
        </p>
        <p className="mt-1 text-[11px] opacity-80">
          Weddings • Annaprashan (Rice Ceremony) • Birthdays • Griha Pravesh
        </p>
        <p className="mt-2 text-[10px] opacity-60">
          © {new Date().getFullYear()} UtsavPatra. All rights reserved.
        </p>
      </footer>

    </div>
  );
};
