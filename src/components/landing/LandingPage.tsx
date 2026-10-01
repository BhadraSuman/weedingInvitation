import React from 'react';
import { Link } from 'react-router-dom';
import { weddingsRegistry } from '../../data/weddings';
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
  Clock
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const whatsappInquiryUrl = (packageTitle: string = "Wedding Invitation") => {
    const text = encodeURIComponent(
      `Hello Suman! I am interested in creating a digital wedding invitation on WeedingInv.com (${packageTitle}). Could you please share more details?`
    );
    return `https://wa.me/916291898703?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C1810] font-sans selection:bg-[#8B181B] selection:text-[#F3E5AB]">
      
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#D4AF37]/30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8B181B] to-[#D4AF37] flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5 text-[#F3E5AB]" />
          </div>
          <div>
            <span className="font-serif font-extrabold text-lg sm:text-xl text-[#8B181B] tracking-tight block">
              WeedingInv<span className="text-[#D4AF37]">.com</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#997819] font-serif font-bold block -mt-1">
              Cultural Digital Wedding Platform
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-serif font-semibold text-[#5C0C0F]">
          <a href="#demos" className="hover:text-[#8B181B] transition-colors">Cultural Demos</a>
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
          <span className="hidden sm:inline">WhatsApp Us</span>
          <span className="sm:hidden">Chat</span>
        </a>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B181B]/10 border border-[#D4AF37]/50 text-xs font-serif font-bold text-[#8B181B] uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>India’s First Cultural Digital Wedding Invitation Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-[#8B181B] tracking-tight leading-tight max-w-3xl mx-auto">
          Sacred Heritage Meets <br className="hidden sm:inline" />
          <span className="text-[#997819] italic font-normal">Modern WhatsApp Elegance</span>
        </h1>

        <p className="mt-5 text-sm sm:text-base text-[#6E5D53] max-w-2xl mx-auto leading-relaxed font-serif">
          No heavy paper cards to courier. No 50MB video files clogging relatives' phones. 
          Send an enchanting, ultra-fast wedding micro-site customized with authentic cultural rituals, 
          1-tap Google Maps directions, and automated RSVP tracking.
        </p>

        {/* Hero Quick Demos Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          <Link
            to="/anirban-weds-deboleena"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#8B181B] hover:bg-[#5E0B0E] text-[#F3E5AB] font-serif font-bold text-sm shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>🪔 Bengali Patrika Demo</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </Link>

          <Link
            to="/sandeep-weds-priya"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#800020] to-[#A31536] hover:opacity-95 text-[#FBE8A6] font-serif font-bold text-sm shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>🚩 Bihari &amp; Marwari Demo</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </Link>
        </div>

        <p className="text-xs text-[#997819] mt-3 font-serif">
          ⚡ Sub-second load time on mobile 4G networks • Works natively on WhatsApp
        </p>
      </section>

      {/* 3. Live Client Slugs Showcase (The Portfolio) */}
      <section className="py-16 px-4 sm:px-6 bg-[#FAF6EE] border-y border-[#D4AF37]/30" id="demos">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-serif uppercase tracking-widest text-[#8B181B] font-bold">
              Live Interactive Micro-Sites
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1810] mt-1">
              Choose Your Cultural Wedding Aesthetic
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6A60] font-serif max-w-md mx-auto mt-2">
              Every invitation gets a dedicated URL like <code className="bg-white px-2 py-0.5 rounded text-[#8B181B] font-mono">weedinginv.com/your-names</code> to share directly on WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Bengali Slug Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/60 shadow-lg flex flex-col justify-between group hover:border-[#8B181B] transition-all">
              <div>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-[#D4AF37]/40 shadow-inner">
                  <img
                    src={weddingsRegistry['anirban-weds-deboleena'].previewImage}
                    alt="Bengali Wedding"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#8B181B] text-[#F3E5AB] font-serif text-xs font-bold px-3 py-1 rounded-full shadow">
                    🪔 Bengali Culture
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md text-white p-2.5 rounded-xl text-xs font-mono">
                    weedinginv.com/anirban-weds-deboleena
                  </div>
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#8B181B]">
                  বাঙালি শুভ বিবাহ (Lagna Patrika)
                </h3>
                <p className="text-xs text-[#997819] font-serif mt-1 font-semibold">
                  Client: Anirban &amp; Deboleena (Raajkutir Swabhumi, Kolkata)
                </p>

                <p className="text-xs text-[#5C0C0F] font-serif mt-3 leading-relaxed">
                  Authentic Alpona art, Topor-Mukut crowns, Tagore blessings couplet, 
                  Aiburobhat, Gaye Holud &amp; Tattva, Saat Paak, and Bou Bhaat feast details.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs font-serif text-stone-500">Live Client Slug</span>
                <Link
                  to="/anirban-weds-deboleena"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8B181B] text-[#F3E5AB] text-xs font-serif font-semibold hover:bg-[#5E0B0E] transition-colors"
                >
                  <span>Open Full Invitation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Bihari & Marwari Slug Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/60 shadow-lg flex flex-col justify-between group hover:border-[#800020] transition-all">
              <div>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-[#D4AF37]/40 shadow-inner">
                  <img
                    src={weddingsRegistry['sandeep-weds-priya'].previewImage}
                    alt="Bihari & Marwari Wedding"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#800020] text-[#FBE8A6] font-serif text-xs font-bold px-3 py-1 rounded-full shadow">
                    🚩 Bihari &amp; Marwari
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md text-white p-2.5 rounded-xl text-xs font-mono">
                    weedinginv.com/sandeep-weds-priya
                  </div>
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#800020]">
                  बिहारी एवं मारवाड़ी पावन विवाह
                </h3>
                <p className="text-xs text-[#D4AF37] font-serif mt-1 font-semibold">
                  Client: Sandeep &amp; Priya (Hotel Maurya, Patna)
                </p>

                <p className="text-xs text-[#4A3B32] font-serif mt-3 leading-relaxed">
                  Groom's traditional Maur, Mithila Madhubani art, Tilak ceremony, 
                  sacred Matkor earth-digging, Ghoomar Sangeet, Toran striking, Saat Phere &amp; Bahu Bhoj.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs font-serif text-stone-500">Live Client Slug</span>
                <Link
                  to="/sandeep-weds-priya"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#800020] text-[#FBE8A6] text-xs font-serif font-semibold hover:bg-[#520014] transition-colors"
                >
                  <span>Open Full Invitation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Why WeedingInv Beats Paper Cards (Feature Grid) */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto" id="why-digital">
        <div className="text-center mb-14">
          <span className="text-xs font-serif uppercase tracking-widest text-[#8B181B] font-bold">
            The Digital Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1810] mt-1">
            Why Modern Families Prefer WeedingInv
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5D53] font-serif max-w-lg mx-auto mt-2">
            Eliminate all friction for out-of-town guests and make wedding coordination seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B181B]/10 flex items-center justify-center text-[#8B181B]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#2C1810]">1-Tap Google Navigation</h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed font-serif">
              No lost relatives calling you 20 times on your wedding night asking for directions. One tap opens turn-by-turn navigation &amp; Uber/Ola.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B181B]/10 flex items-center justify-center text-[#8B181B]">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#2C1810]">1-Tap Calendar Reminder</h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed font-serif">
              Guests easily forget paper dates. Our 1-click button adds all rituals with alarm reminders straight to Google &amp; Apple calendars.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B181B]/10 flex items-center justify-center text-[#8B181B]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#2C1810]">WhatsApp RSVP Concierge</h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed font-serif">
              Pre-filled messages let your guests confirm attendance with one click, giving your catering team accurate headcounts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B181B]/10 flex items-center justify-center text-[#8B181B]">
              <Music className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#2C1810]">Serene Shehnai Melodies</h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed font-serif">
              Tactile envelope opening naturally triggers sacred Shehnai or Rabindrasangeet without annoying video download delays.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B181B]/10 flex items-center justify-center text-[#8B181B]">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#2C1810]">Personalized Guest Links</h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed font-serif">
              Generate links with guest names (<code className="text-[#8B181B]">?to=Sharma+Family</code>) honoring elder relatives with custom greetings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B181B]/10 flex items-center justify-center text-[#8B181B]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#2C1810]">Eco-Friendly &amp; Instant</h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed font-serif">
              Save trees and ₹20,000+ in printing and courier costs. Ready in 24 hours, delivered anywhere in the world instantly.
            </p>
          </div>

        </div>
      </section>

      {/* 5. Pricing Packages */}
      <section className="py-16 px-4 sm:px-6 bg-[#FAF6EE] border-t border-[#D4AF37]/30" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-serif uppercase tracking-widest text-[#8B181B] font-bold">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1810] mt-1">
              Affordable Luxury Packages
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6A60] font-serif max-w-md mx-auto mt-2">
              No hidden fees. Full micro-site active for 1 year with hosting included.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* Silver Tier */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-serif uppercase font-bold text-stone-500">Silver Template</span>
                <div className="my-3">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1810]">₹1,499</span>
                  <span className="text-xs text-stone-500 block font-serif">One-time payment</span>
                </div>
                <ul className="space-y-2.5 text-xs font-serif text-[#4A3B32] my-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Choice of any Cultural Template</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Couple Photos &amp; Lineage Info</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Google Maps &amp; Navigation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>24-Hour Turnaround Delivery</span>
                  </li>
                </ul>
              </div>
              <a
                href={whatsappInquiryUrl("Silver Package (₹1,499)")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 text-center rounded-xl border border-[#D4AF37] font-serif text-xs font-bold text-[#8B181B] hover:bg-[#FAF6EE] transition-colors"
              >
                Choose Silver
              </a>
            </div>

            {/* Gold Tier (Most Popular) */}
            <div className="bg-gradient-to-b from-[#8B181B] to-[#5C0C0F] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-xl flex flex-col justify-between relative transform md:-translate-y-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#5C0C0F] text-[10px] font-serif uppercase tracking-widest font-extrabold px-3 py-1 rounded-full shadow">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-serif uppercase font-bold text-[#F3E5AB]">Gold Cultural Bespoke</span>
                <div className="my-3">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-white">₹2,999</span>
                  <span className="text-xs text-[#F3E5AB]/80 block font-serif">Full Cultural Experience</span>
                </div>
                <ul className="space-y-2.5 text-xs font-serif text-[#FDFBF7] my-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>All Cultural Ritual Cards (Up to 6)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Curated Shehnai / Flute Audio Engine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>1-Tap Add to Google Calendar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Personalized Guest Link Generator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Digital Ashirbaad Wishes Wall</span>
                  </li>
                </ul>
              </div>
              <a
                href={whatsappInquiryUrl("Gold Cultural Bespoke (₹2,999)")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-center rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] font-serif text-xs font-bold text-[#5C0C0F] shadow-lg hover:scale-102 transition-transform"
              >
                Order Gold Package
              </a>
            </div>

            {/* Platinum Tier */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-serif uppercase font-bold text-stone-500">Royal Platinum</span>
                <div className="my-3">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1810]">₹6,999</span>
                  <span className="text-xs text-stone-500 block font-serif">100% Custom Tailored</span>
                </div>
                <ul className="space-y-2.5 text-xs font-serif text-[#4A3B32] my-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>100% Custom Illustrated UI Layout</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Custom Couple Caricature / Monogram</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Live Guest Photo Upload Portal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Priority VIP Same-Day Support</span>
                  </li>
                </ul>
              </div>
              <a
                href={whatsappInquiryUrl("Royal Platinum (₹6,999)")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 text-center rounded-xl border border-[#D4AF37] font-serif text-xs font-bold text-[#8B181B] hover:bg-[#FAF6EE] transition-colors"
              >
                Choose Platinum
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Lead Contact & Founder Section */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto" id="contact">
        <div className="bg-gradient-to-b from-[#FFFDF9] to-[#FBF7EE] rounded-3xl p-8 sm:p-12 border-2 border-[#D4AF37]/60 shadow-xl text-center">
          <span className="text-xs font-serif uppercase tracking-widest text-[#8B181B] font-bold">
            Ready to Celebrate?
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#8B181B] mt-1">
            Let’s Craft Your Digital Invitation
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5D53] font-serif max-w-md mx-auto mt-2 leading-relaxed">
            Message us directly on WhatsApp with your wedding date, venue, and cultural preference. 
            We will set up your personalized invitation link in 24 hours.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+916291898703"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#8B181B] hover:bg-[#5E0B0E] text-white text-xs font-serif font-bold shadow-md transition-all"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Call: +91 6291898703</span>
            </a>

            <a
              href="mailto:bhadrasuman04@gmail.com"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-white hover:bg-stone-50 border border-[#D4AF37] text-[#8B181B] text-xs font-serif font-bold shadow-md transition-all"
            >
              <Mail className="w-4 h-4 text-[#8B181B]" />
              <span>bhadrasuman04@gmail.com</span>
            </a>

            <a
              href={whatsappInquiryUrl("Direct Booking")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-serif font-bold shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200 text-center">
            <p className="text-xs text-[#8B181B] font-serif font-semibold">
              Designed &amp; Managed by Suman Bhadra
            </p>
            <p className="text-[11px] text-stone-500 font-serif mt-0.5">
              Kolkata, West Bengal • Serving Families Across India &amp; Worldwide
            </p>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="py-8 text-center text-xs text-stone-500 font-serif border-t border-[#D4AF37]/30 bg-white">
        <p>&copy; {new Date().getFullYear()} WeedingInv.com — All Rights Reserved.</p>
        <p className="text-[11px] mt-1 text-[#997819]">
          The Modern Cultural Digital Wedding Platform • Phone: +91 6291898703
        </p>
      </footer>

    </div>
  );
};
