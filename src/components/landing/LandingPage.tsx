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
  UtensilsCrossed,
  Handshake,
  ChevronDown,
  Building2,
  Percent,
  Award,
  HelpCircle
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | EventCategory>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const whatsappInquiryUrl = (packageTitle: string = "Celebration Invitation") => {
    const text = encodeURIComponent(
      `Hello Suman! I am interested in creating a digital celebration invitation on UtsavPatra.com (${packageTitle}). Could you please share more details?`
    );
    return `https://wa.me/916291898703?text=${text}`;
  };

  const agencyInquiryUrl = () => {
    const text = encodeURIComponent(
      "Hello Suman! I represent an Event Management / Wedding Planning Agency / Photography Studio and would like to partner with UtsavPatra for white-label client digital invitations."
    );
    return `https://wa.me/916291898703?text=${text}`;
  };

  const faqItems = [
    {
      question: "How does the UtsavPatra ordering and delivery process work?",
      answer: "Zero complex software or tech hurdles! Simply share your event details, ceremony timings, photos, and Google Maps venue link with Suman directly on WhatsApp. We design your personalized interactive invitation, provide a live staging preview for family review, and make any revisions within 2 hours. Your final invitation link (utsavpatra.com/your-event) is ready to share with 500+ guests within 24 hours."
    },
    {
      question: "Can UtsavPatra be customized for regional traditions across India?",
      answer: "Absolutely! We do not believe in one generic template. We craft radically differentiated cultural universes: Bengali Vivah (Parchment scrolls, wooden finials, Topor, Alpona, Shehnai audio), Bihari & Marwari Shubh Vivah (Emerald-Gold Darbar architecture with pure Sanskrit/Hindi verses), Annaprashan (First Rice Ceremony with silver Payesh bowl and interactive Thali Pariksha game), and 1st Birthday Galas (interactive cake cutting & balloon burst). South Indian and Pan-Indian themes are also fully supported."
    },
    {
      question: "How does the Digital Shagun (Online UPI E-Lifafa) feature work?",
      answer: "Guests can send auspicious blessings and shagun directly to your bank account via UPI (Google Pay, PhonePe, Paytm, BHIM) with 0% platform commission. We configure authentic +₹1 auspicious presets (₹501, ₹1,001, ₹2,101, ₹5,001) and dynamic instant QR codes, making gifting effortless for out-of-town and NRI relatives."
    },
    {
      question: "How do guests RSVP and how do we track headcount?",
      answer: "Guests click the interactive RSVP button, select attendance status, specify guest counts, and submit diet preferences. You receive structured real-time RSVP updates on WhatsApp, allowing your banquet and catering team to accurately prepare with zero food waste."
    },
    {
      question: "How does the Agency & Wedding Planner Partnership Program work?",
      answer: "We partner with wedding planners, photography studios, event management firms, and print card vendors across India. Partners receive 20%–30% wholesale margins, white-label client delivery (your agency logo & custom domain), express 6-hour turnaround, and a dedicated WhatsApp coordinator for rapid proofing."
    },
    {
      question: "What if our ceremony timing or venue changes after sharing?",
      answer: "Unlike printed paper cards where reprints cost thousands, UtsavPatra digital invitations update instantly! Simply message us on WhatsApp with the new venue or muhurat time, and we update the live link in minutes. Every guest automatically sees the updated information."
    }
  ];

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
          <a href="#partners" className="text-[#8B181B] font-bold hover:text-[#5E0B0E] transition-colors flex items-center gap-1">
            <Handshake className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Agency Partners</span>
          </a>
          <a href="#faq" className="hover:text-[#8B181B] transition-colors">FAQ</a>
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

        {/* Pan-India Geographic Trust Pill */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-serif text-[#7A6A60] max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1 font-bold text-[#8B181B]">
            <MapPin className="w-3 h-3 text-[#D4AF37]" />
            Serving Pan-India:
          </span>
          <span className="hover:text-[#8B181B] transition-colors">Kolkata</span>
          <span>•</span>
          <span className="hover:text-[#8B181B] transition-colors">Delhi NCR</span>
          <span>•</span>
          <span className="hover:text-[#8B181B] transition-colors">Patna</span>
          <span>•</span>
          <span className="hover:text-[#8B181B] transition-colors">Mumbai</span>
          <span>•</span>
          <span className="hover:text-[#8B181B] transition-colors">Jaipur</span>
          <span>•</span>
          <span className="hover:text-[#8B181B] transition-colors">Bengaluru</span>
          <span>•</span>
          <span className="hover:text-[#8B181B] transition-colors">Hyderabad</span>
          <span>•</span>
          <span className="font-semibold text-stone-700">NRI Diaspora Worldwide</span>
        </div>

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

                <div className="my-5">
                  <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#8B181B]">₹999</span>
                  <span className="text-xs text-stone-500 font-serif ml-1">one-time</span>
                </div>

                {/* Timeline & Turnaround Pill */}
                <div className="mb-6 p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 space-y-1 text-xs font-serif">
                  <div className="flex items-center gap-1.5 text-[#8B181B] font-bold">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Turnaround: Ready in 24 Hours</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600 text-[11px] pt-0.5">
                    <span>⏳ Link: 1 Year Active</span>
                    <span>✏️ Edits: 2 Free Rounds</span>
                  </div>
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

                <div className="my-5">
                  <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#8B181B]">₹2,499</span>
                  <span className="text-xs text-stone-500 font-serif ml-1">one-time</span>
                </div>

                {/* Timeline & Turnaround Pill */}
                <div className="mb-6 p-3 bg-amber-50 rounded-xl border border-amber-300 space-y-1 text-xs font-serif">
                  <div className="flex items-center gap-1.5 text-[#8B181B] font-bold">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Turnaround: Fast 12–24 Hours</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-700 text-[11px] pt-0.5">
                    <span>⏳ Link: Lifetime Forever</span>
                    <span>✏️ Edits: Unlimited</span>
                  </div>
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

                <div className="my-5">
                  <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#8B181B]">₹4,999</span>
                  <span className="text-xs text-stone-500 font-serif ml-1">one-time</span>
                </div>

                {/* Timeline & Turnaround Pill */}
                <div className="mb-6 p-3 bg-purple-50/70 rounded-xl border border-purple-200 space-y-1 text-xs font-serif">
                  <div className="flex items-center gap-1.5 text-purple-900 font-bold">
                    <Clock className="w-3.5 h-3.5 text-purple-600" />
                    <span>Turnaround: VIP Express 6–12 Hours</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-700 text-[11px] pt-0.5">
                    <span>⏳ Link: Lifetime + Cloud</span>
                    <span>✏️ Edits: Instant On-Call</span>
                  </div>
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
                    <span>Priority express turnaround</span>
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

          {/* Order-to-Delivery Process Timeline */}
          <div className="mt-14 pt-10 border-t border-[#D4AF37]/40">
            <div className="text-center mb-8">
              <span className="text-xs font-serif uppercase tracking-widest text-[#8B181B] font-bold">
                Order-To-Launch Timeline
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C1810] mt-1">
                From Booking to WhatsApp Sharing in 24 Hours
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-serif max-w-md mx-auto mt-1">
                Zero complicated software or tech hurdles. Suman personally coordinates with your family.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#D4AF37]/50 shadow-sm space-y-2 relative">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#8B181B] text-[#F3E5AB] text-[10px] font-bold font-serif">
                  Hour 00:00 • Step 01
                </span>
                <h4 className="font-bold font-serif text-sm text-[#2C1810]">
                  Share Details on WhatsApp
                </h4>
                <p className="text-xs text-stone-600 font-serif leading-relaxed">
                  Send bride/groom/baby names, rituals schedule, venue Google Map, and favorite photos directly on WhatsApp.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#D4AF37]/50 shadow-sm space-y-2 relative">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#8B181B] text-[#F3E5AB] text-[10px] font-bold font-serif">
                  Hour 06:00 • Step 02
                </span>
                <h4 className="font-bold font-serif text-sm text-[#2C1810]">
                  Bespoke Crafting &amp; Staging
                </h4>
                <p className="text-xs text-stone-600 font-serif leading-relaxed">
                  We design your custom theme with audio shehnai, Google Maps, RSVP counter, and digital shagun E-lifafa.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#D4AF37]/50 shadow-sm space-y-2 relative">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#8B181B] text-[#F3E5AB] text-[10px] font-bold font-serif">
                  Hour 12–18 • Step 03
                </span>
                <h4 className="font-bold font-serif text-sm text-[#2C1810]">
                  Family Review &amp; Edits
                </h4>
                <p className="text-xs text-stone-600 font-serif leading-relaxed">
                  Preview your live staging link with family on phone. We perform any text, photo, or music tweaks within 2 hours.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-400 bg-gradient-to-b from-white to-emerald-50/40 shadow-sm space-y-2 relative">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-bold font-serif">
                  Within 24 Hrs • Step 04
                </span>
                <h4 className="font-bold font-serif text-sm text-emerald-950">
                  Ready to Blast on WhatsApp!
                </h4>
                <p className="text-xs text-stone-600 font-serif leading-relaxed">
                  Your final link <code className="bg-white px-1 text-[11px] rounded text-emerald-800 border border-emerald-200">utsavpatra.com/your-event</code> is live forever, ready for 500+ guests!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5B. Agency & Wedding Planner Partnership Program */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-[#2C1810] via-[#381B15] to-[#20100C] text-[#F3E5AB] relative overflow-hidden" id="partners">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#8B181B]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-xs font-serif font-bold text-[#F3E5AB] uppercase tracking-wider mb-4">
              <Handshake className="w-4 h-4 text-[#D4AF37]" />
              <span>B2B &amp; Agency Partner Program</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#FDFBF7] tracking-tight leading-tight">
              Grow Your Event Business with <br className="hidden sm:inline" />
              <span className="text-[#E5C158] italic font-normal">White-Label Digital E-Patras</span>
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
              Designed for <strong>Wedding Planners, Event Management Agencies, Photography Studios, and Card Printers</strong> across India.
              Offer luxury interactive celebration websites to your clients with zero tech hassle, 6-hour express turnaround, and high-margin partner earnings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white/5 border border-[#D4AF37]/30 rounded-2xl p-6 backdrop-blur-sm hover:border-[#D4AF37] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#E5C158] mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                100% White-Label
              </h3>
              <p className="text-xs font-serif text-stone-300 leading-relaxed">
                Deliver under your own agency branding or co-branded with your logo. Your clients experience a bespoke digital service directly from your firm.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 border border-[#D4AF37]/30 rounded-2xl p-6 backdrop-blur-sm hover:border-[#D4AF37] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                25%+ Partner Margins
              </h3>
              <p className="text-xs font-serif text-stone-300 leading-relaxed">
                Wholesale discounted tier pricing allows your agency to bundle digital invitations into client packages and earn high-margin incremental revenue.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 border border-[#D4AF37]/30 rounded-2xl p-6 backdrop-blur-sm hover:border-[#D4AF37] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                Express 6-Hour Delivery
              </h3>
              <p className="text-xs font-serif text-stone-300 leading-relaxed">
                VIP queue status for agency partners. Staged links ready within hours for client presentations, urgent RSVP blasts, or sudden date changes.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/5 border border-[#D4AF37]/30 rounded-2xl p-6 backdrop-blur-sm hover:border-[#D4AF37] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                Dedicated WhatsApp Desk
              </h3>
              <p className="text-xs font-serif text-stone-300 leading-relaxed">
                Direct channel with founder Suman Bhadra. Send client assets, request instant tweaks, and coordinate multi-event client rosters effortlessly.
              </p>
            </div>
          </div>

          {/* Agency Partnership CTA Box */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#D4AF37]/20 via-[#8B181B]/40 to-[#D4AF37]/20 border border-[#D4AF37]/50 text-center max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
              Ready to Partner with India’s Premier Cultural E-Patra Studio?
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#F3E5AB]/90 max-w-lg mx-auto mb-6">
              Whether you are an established wedding planner or a boutique photographer, let’s collaborate to delight your clients and grow revenue.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={agencyInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Join Agency Partner Network</span>
              </a>
              <a
                href="tel:+916291898703"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 border border-[#D4AF37] text-[#F3E5AB] text-xs sm:text-sm font-serif font-semibold transition-all"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Call +91 6291898703</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5C. Interactive FAQ Section (Generative Engine Optimization & Conversion) */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto" id="faq">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#8B181B]/10 border border-[#D4AF37]/50 text-xs font-serif font-bold text-[#8B181B] uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#8B181B]">
            Everything You Need to Know
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-serif max-w-md mx-auto mt-2">
            Clear answers on turnaround delivery times, Pan-India cultural customization, Digital Shagun safety, and agency partnerships.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqItems.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#D4AF37]/40 shadow-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#2C1810] hover:text-[#8B181B] transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#D4AF37] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#8B181B]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm font-serif text-[#6E5D53] leading-relaxed border-t border-amber-100 bg-[#FFFDF9]">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
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

          <div className="mt-8 pt-6 border-t border-stone-200 text-xs font-serif text-[#7A6A60] flex flex-wrap items-center justify-center gap-3">
            <span>✨ Coordinated by <strong>Suman Bhadra</strong></span>
            <span>•</span>
            <span>📍 HQ: Kolkata, West Bengal</span>
            <span>•</span>
            <span>🇮🇳 Serving Pan-India (Kolkata, Delhi NCR, Mumbai, Patna, Jaipur, Bengaluru, Hyderabad) &amp; Global NRI Families</span>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="py-10 text-center text-xs font-serif text-stone-500 border-t border-stone-200 bg-white/60">
        <p className="font-semibold text-stone-800 text-sm">
          UtsavPatra.com — उत्सवपत्र • Cultural Digital Celebrations &amp; Invitations
        </p>
        <p className="mt-1 text-[11px] text-stone-600 max-w-xl mx-auto">
          Sacred E-Patras for Indian Weddings (Bengali, Bihari, Marwari, South Indian), Annaprashan (Rice Ceremony), 1st Birthdays, and Griha Pravesh.
        </p>
        <p className="mt-2 text-[10px] text-stone-500">
          Pan-India Delivery: Kolkata • Delhi NCR • Patna • Mumbai • Jaipur • Bengaluru • Hyderabad • Pune • Lucknow • NRI Diaspora (USA, UK, Canada, UAE)
        </p>
        <p className="mt-3 text-[10px] opacity-60">
          © {new Date().getFullYear()} UtsavPatra. All rights reserved. • Founder &amp; Lead: Suman Bhadra (+91 6291898703)
        </p>
      </footer>

    </div>
  );
};
