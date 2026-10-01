import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TemplateId } from '../types/wedding';
import {
  DemoFormData,
  defaultDemoData,
  encodeDemoDataToParams,
  saveCapturedLead
} from '../utils/demoGenerator';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Baby,
  Cake,
  Home,
  CheckCircle2,
  Wand2,
  Phone,
  CreditCard,
  Image as ImageIcon
} from 'lucide-react';

const samplePresets: Record<TemplateId, DemoFormData> = {
  bengali: {
    theme: 'bengali',
    groomName: 'Subhajit',
    brideName: 'Debasmita',
    childName: '',
    eventDate: '2026-12-18',
    eventTime: '07:30 PM',
    venueName: 'Swabhumi The Heritage Plaza',
    city: 'Kolkata',
    upiId: 'subhajit@okaxis',
    whatsappNumber: '916203868358',
    customPhotoUrl: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  bihari_marwari: {
    theme: 'bihari_marwari',
    groomName: 'Aditya',
    brideName: 'Riddhi',
    childName: '',
    eventDate: '2026-11-24',
    eventTime: '08:00 PM',
    venueName: 'Hotel Maurya Grand Ballroom',
    city: 'Patna',
    upiId: 'aditya@okhdfcbank',
    whatsappNumber: '916203868358',
    customPhotoUrl: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  annaprashan: {
    theme: 'annaprashan',
    groomName: '',
    brideName: '',
    childName: 'Reyansh',
    eventDate: '2026-11-10',
    eventTime: '11:30 AM',
    venueName: 'Club Verde Vista Banquet',
    city: 'Kolkata',
    upiId: 'parents@okaxis',
    whatsappNumber: '916203868358',
    customPhotoUrl: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80'
  },
  birthday: {
    theme: 'birthday',
    groomName: '',
    brideName: '',
    childName: 'Princess Kiara',
    eventDate: '2026-10-25',
    eventTime: '05:30 PM',
    venueName: 'The Westin Lawn',
    city: 'Bengaluru',
    upiId: 'kiaraparty@okaxis',
    whatsappNumber: '916203868358',
    customPhotoUrl: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80'
  },
  royal_north: {
    theme: 'royal_north',
    groomName: 'Kabir',
    brideName: 'Meera',
    childName: '',
    eventDate: '2026-12-20',
    eventTime: '08:00 PM',
    venueName: 'Jai Mahal Palace',
    city: 'Jaipur',
    upiId: '',
    whatsappNumber: '916203868358',
    customPhotoUrl: ''
  },
  south_indian: {
    theme: 'south_indian',
    groomName: 'Karthik',
    brideName: 'Deepa',
    childName: '',
    eventDate: '2026-11-15',
    eventTime: '06:00 AM',
    venueName: 'Mayor Ramanathan Chettiar Hall',
    city: 'Chennai',
    upiId: '',
    whatsappNumber: '916203868358',
    customPhotoUrl: ''
  },
  modern_minimal: {
    theme: 'modern_minimal',
    groomName: 'Rohan',
    brideName: 'Natasha',
    childName: '',
    eventDate: '2026-12-05',
    eventTime: '06:30 PM',
    venueName: 'Soho House Banquet',
    city: 'Mumbai',
    upiId: '',
    whatsappNumber: '916203868358',
    customPhotoUrl: ''
  }
};

export const TryoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DemoFormData>(defaultDemoData);

  const handleThemeChange = (theme: TemplateId) => {
    const preset = samplePresets[theme] || defaultDemoData;
    setFormData({
      ...formData,
      theme,
      groomName: preset.groomName || formData.groomName,
      brideName: preset.brideName || formData.brideName,
      childName: preset.childName || formData.childName,
      venueName: preset.venueName || formData.venueName,
      city: preset.city || formData.city
    });
  };

  const handleFillSample = () => {
    const preset = samplePresets[formData.theme] || defaultDemoData;
    setFormData(preset);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPhone = formData.whatsappNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      alert("Please enter a valid 10-digit WhatsApp number to receive your private 24-hour preview link.");
      return;
    }

    const submissionData: DemoFormData = {
      ...formData,
      whatsappNumber: cleanPhone,
      leadName: formData.leadName || (isBabyEvent ? formData.childName : `${formData.groomName} & ${formData.brideName}`),
      createdAt: Date.now()
    };

    // Save lead to system store for Uddipta Tech Solutions team
    saveCapturedLead(submissionData);

    try {
      localStorage.setItem('utsavpatra_demo_preview', JSON.stringify(submissionData));
    } catch {
      // ignore localStorage quota error
    }
    const query = encodeDemoDataToParams(submissionData);
    navigate(`/preview?${query}`);
  };

  const isBabyEvent = formData.theme === 'annaprashan' || formData.theme === 'birthday';

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C1810] font-sans selection:bg-[#8B181B] selection:text-[#F3E5AB]">
      {/* 1. Header */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#D4AF37]/30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#8B181B] flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-4 h-4 text-[#F3E5AB]" />
          </div>
          <span className="font-serif font-extrabold text-base sm:text-lg text-[#8B181B]">
            UtsavPatra<span className="text-[#D4AF37]">.com</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleFillSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-serif font-bold transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Auto-Fill Sample Data</span>
            <span className="sm:hidden">Sample</span>
          </button>

          <Link
            to="/"
            className="flex items-center gap-1 text-xs font-serif font-semibold text-stone-600 hover:text-[#8B181B]"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </header>

      {/* 2. Main Form Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Title & Introduction */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B181B]/10 border border-[#D4AF37]/50 text-xs font-serif font-bold text-[#8B181B] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>100% Free Instant Preview Generator</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#8B181B] tracking-tight leading-tight">
            Create Your Custom E-Patra <br className="hidden sm:inline" />
            <span className="text-[#997819] italic font-normal">Ready in 60 Seconds</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm font-serif text-[#6E5D53] max-w-lg mx-auto leading-relaxed">
            Enter your celebration details below. Your customized interactive invitation will generate instantly on screen with music, countdown timer, and opening envelope.
          </p>
        </div>

        {/* Form Box */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/50 shadow-xl space-y-8">
          
          {/* Step 1: Select Cultural Celebration Universe */}
          <div>
            <label className="block text-xs font-serif uppercase tracking-widest text-[#8B181B] font-bold mb-3">
              Step 1: Choose Your Celebration Theme
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Bengali Wedding */}
              <button
                type="button"
                onClick={() => handleThemeChange('bengali')}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  formData.theme === 'bengali'
                    ? 'border-[#8B181B] bg-[#FFF8F0] shadow-md ring-2 ring-[#8B181B]/20'
                    : 'border-stone-200 hover:border-amber-300 bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#8B181B]/10 text-[#8B181B] flex items-center justify-center font-serif font-bold text-lg shrink-0">
                  🪔
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#2C1810]">Bengali Wedding</h4>
                  <p className="text-[11px] font-serif text-stone-500 mt-0.5">
                    Parchment scrolls, Topor, Alpona &amp; Shehnai
                  </p>
                </div>
              </button>

              {/* Shubh Vivah — North Indian Traditions */}
              <button
                type="button"
                onClick={() => handleThemeChange('bihari_marwari')}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  formData.theme === 'bihari_marwari'
                    ? 'border-[#0D4A36] bg-[#F2F9F5] shadow-md ring-2 ring-[#0D4A36]/20'
                    : 'border-stone-200 hover:border-emerald-300 bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#0D4A36]/10 text-[#0D4A36] flex items-center justify-center font-serif font-bold text-lg shrink-0">
                  🚩
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#2C1810]">Shubh Vivah — North Indian Traditions</h4>
                  <p className="text-[11px] font-serif text-stone-500 mt-0.5">
                    Emerald Darbar, Pure Sanskrit &amp; Hindi shlokas
                  </p>
                </div>
              </button>

              {/* Baby Annaprashan */}
              <button
                type="button"
                onClick={() => handleThemeChange('annaprashan')}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  formData.theme === 'annaprashan'
                    ? 'border-[#D97706] bg-[#FFFBEB] shadow-md ring-2 ring-[#D97706]/20'
                    : 'border-stone-200 hover:border-amber-300 bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center font-serif font-bold text-lg shrink-0">
                  🥣
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#2C1810]">Baby Annaprashan</h4>
                  <p className="text-[11px] font-serif text-stone-500 mt-0.5">
                    First Rice Ceremony with Thali Pariksha Game
                  </p>
                </div>
              </button>

              {/* 1st Birthday Gala */}
              <button
                type="button"
                onClick={() => handleThemeChange('birthday')}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  formData.theme === 'birthday'
                    ? 'border-[#7C3AED] bg-[#F5F3FF] shadow-md ring-2 ring-[#7C3AED]/20'
                    : 'border-stone-200 hover:border-purple-300 bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center font-serif font-bold text-lg shrink-0">
                  🎂
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#2C1810]">1st Birthday Gala</h4>
                  <p className="text-[11px] font-serif text-stone-500 mt-0.5">
                    Pastel carnival with interactive candle blowing
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Names */}
          <div className="pt-4 border-t border-stone-200">
            <label className="block text-xs font-serif uppercase tracking-widest text-[#8B181B] font-bold mb-3">
              Step 2: Who Are We Celebrating?
            </label>

            {isBabyEvent ? (
              <div>
                <label className="block text-xs font-serif text-stone-700 font-semibold mb-1">
                  Child's / Baby's Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Aarav or Princess Ananya"
                  value={formData.childName}
                  onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B181B] focus:ring-1 focus:ring-[#8B181B] outline-none text-sm font-serif"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif text-stone-700 font-semibold mb-1">
                    Groom's Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul"
                    value={formData.groomName}
                    onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B181B] focus:ring-1 focus:ring-[#8B181B] outline-none text-sm font-serif"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif text-stone-700 font-semibold mb-1">
                    Bride's Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pooja"
                    value={formData.brideName}
                    onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B181B] focus:ring-1 focus:ring-[#8B181B] outline-none text-sm font-serif"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Date, Time & Venue */}
          <div className="pt-4 border-t border-stone-200">
            <label className="block text-xs font-serif uppercase tracking-widest text-[#8B181B] font-bold mb-3">
              Step 3: Event Date &amp; Venue
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-serif text-stone-700 font-semibold mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Celebration Date *</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B181B] focus:ring-1 focus:ring-[#8B181B] outline-none text-sm font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-stone-700 font-semibold mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Ceremony Time</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 07:00 PM onwards"
                  value={formData.eventTime}
                  onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B181B] focus:ring-1 focus:ring-[#8B181B] outline-none text-sm font-serif"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif text-stone-700 font-semibold mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Venue / Banquet Hall *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ITC Sonar / Hotel Maurya"
                  value={formData.venueName}
                  onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B181B] focus:ring-1 focus:ring-[#8B181B] outline-none text-sm font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-stone-700 font-semibold mb-1">
                  City &amp; State
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kolkata / Patna / Delhi NCR"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B181B] focus:ring-1 focus:ring-[#8B181B] outline-none text-sm font-serif"
                />
              </div>
            </div>
          </div>

          {/* Step 4: Contact & WhatsApp Verification (Mandatory Lead Gate) */}
          <div className="pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-serif uppercase tracking-widest text-[#8B181B] font-bold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Step 4: Where Should We Send Your Preview? *</span>
              </label>
              <span className="text-[10px] font-serif bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Mandatory Verification
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif text-stone-700 font-semibold mb-1">
                  Your Name (Host / Contact Person) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Banerjee / Anita Roy"
                  value={formData.leadName || ''}
                  onChange={(e) => setFormData({ ...formData, leadName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B181B] focus:ring-1 focus:ring-[#8B181B] outline-none text-sm font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-stone-700 font-semibold mb-1">
                  Your WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="e.g. 9876543210 (10 digits)"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B181B] focus:ring-1 focus:ring-[#8B181B] outline-none text-sm font-serif"
                />
              </div>
            </div>

            <p className="text-[11px] font-serif text-stone-500 mt-2 flex items-center gap-1">
              <span>🔒</span>
              <span>Your private 24-hour preview and link activation code are registered to this number. 100% spam-free.</span>
            </p>
          </div>

          {/* Step 5: Optional UPI Shagun */}
          <div className="pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-serif uppercase tracking-widest text-[#8B181B] font-bold flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Step 5: Optional Digital Shagun UPI ID</span>
              </label>
              <span className="text-[11px] font-serif text-stone-500 italic">Optional</span>
            </div>

            <div>
              <label className="block text-xs font-serif text-stone-700 font-semibold mb-1">
                UPI ID (Google Pay / PhonePe / Paytm / BHIM)
              </label>
              <input
                type="text"
                placeholder="e.g. yourname@okhdfcbank"
                value={formData.upiId}
                onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B181B] focus:ring-1 focus:ring-[#8B181B] outline-none text-sm font-serif"
              />
              <span className="text-[10px] text-stone-500 font-serif">Leave blank to use sample Shagun E-Lifafa QR</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#8B181B] via-[#A82025] to-[#8B181B] hover:opacity-95 text-[#F3E5AB] font-serif font-bold text-base shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-[#F3E5AB]" />
              <span>Generate My Free Live Preview Now</span>
              <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
            </button>
            <p className="text-center text-[11px] font-serif text-stone-500 mt-2">
              ⚡ Instant rendering • No credit card or registration required • 100% Free
            </p>
          </div>
        </form>

        {/* Value Trust Points */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white/60 rounded-2xl border border-stone-200">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
              ✓
            </div>
            <h5 className="font-serif font-bold text-xs text-[#2C1810]">See It On Your Phone</h5>
            <p className="text-[11px] font-serif text-stone-600 mt-0.5">
              Experience the envelope unseal with authentic cultural shehnai audio.
            </p>
          </div>

          <div className="p-4 bg-white/60 rounded-2xl border border-stone-200">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
              🔗
            </div>
            <h5 className="font-serif font-bold text-xs text-[#2C1810]">Shareable Preview Link</h5>
            <p className="text-[11px] font-serif text-stone-600 mt-0.5">
              Send the generated link to your fiancé or parents to get their instant feedback.
            </p>
          </div>

          <div className="p-4 bg-white/60 rounded-2xl border border-stone-200">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
              ⚡
            </div>
            <h5 className="font-serif font-bold text-xs text-[#2C1810]">Activate for Guests</h5>
            <p className="text-[11px] font-serif text-stone-600 mt-0.5">
              Love it? WhatsApp our team to lock in your official link for ₹999 / ₹2,499.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
