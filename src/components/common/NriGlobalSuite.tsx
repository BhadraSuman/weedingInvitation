import React, { useState, useEffect } from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import { Video, Globe, Clock, Calendar, Mic, Heart, Play, Sparkles, Send, CheckCircle2, MapPin, ExternalLink, X } from 'lucide-react';

interface NriGlobalSuiteProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
  liveStreamUrl?: string;
}

interface WorldBlessing {
  id: string;
  name: string;
  location: string;
  flag: string;
  message: string;
  type: 'video' | 'voice' | 'message';
  timestamp: string;
}

const INITIAL_BLESSINGS: WorldBlessing[] = [
  {
    id: 'wb-1',
    name: 'Rajesh & Sunita Sharma',
    location: 'Dallas, Texas (USA)',
    flag: '🇺🇸',
    message: 'Wishing both of you eternal companionship, laughter, and prosperity! We will be tuning in to the live stream at 9:30 AM Dallas time without fail!',
    type: 'video',
    timestamp: '2 hours ago'
  },
  {
    id: 'wb-2',
    name: 'Dr. Debabrata Roy & Family',
    location: 'London (UK)',
    flag: '🇬🇧',
    message: 'Heartiest congratulations from across the oceans! May Goddess Lakshmi shower endless blessings on your union. Tuning in live from London!',
    type: 'voice',
    timestamp: 'Yesterday'
  },
  {
    id: 'wb-3',
    name: 'Ananya & Siddharth',
    location: 'Singapore',
    flag: '🇸🇬',
    message: 'So thrilled for you both! Watching the ceremony live. Cannot wait to celebrate together in India next month!',
    type: 'message',
    timestamp: '3 days ago'
  }
];

interface TimeZoneOption {
  city: string;
  region: string;
  flag: string;
  tzOffsetHours: number; // relative to UTC
  tzOffsetMinutes: number;
}

const TIMEZONES: Record<string, TimeZoneOption> = {
  'IST': { city: 'New Delhi / Kolkata', region: 'India (IST)', flag: '🇮🇳', tzOffsetHours: 5, tzOffsetMinutes: 30 },
  'EDT': { city: 'New York / Toronto', region: 'US Eastern (EDT)', flag: '🇺🇸', tzOffsetHours: -4, tzOffsetMinutes: 0 },
  'PDT': { city: 'San Francisco / Vancouver', region: 'US Pacific (PDT)', flag: '🇺🇸', tzOffsetHours: -7, tzOffsetMinutes: 0 },
  'BST': { city: 'London', region: 'UK (BST)', flag: '🇬🇧', tzOffsetHours: 1, tzOffsetMinutes: 0 },
  'GST': { city: 'Dubai', region: 'UAE (GST)', flag: '🇦🇪', tzOffsetHours: 4, tzOffsetMinutes: 0 },
  'SGT': { city: 'Singapore', region: 'Singapore (SGT)', flag: '🇸🇬', tzOffsetHours: 8, tzOffsetMinutes: 0 },
  'AEST': { city: 'Sydney / Melbourne', region: 'Australia (AEST)', flag: '🇦🇺', tzOffsetHours: 10, tzOffsetMinutes: 0 }
};

export const NriGlobalSuite: React.FC<NriGlobalSuiteProps> = ({
  template,
  lang,
  guestName,
  liveStreamUrl = 'https://youtube.com/live/'
}) => {
  const isNative = lang === 'native';
  const [selectedTz, setSelectedTz] = useState<string>('IST');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [blessings, setBlessings] = useState<WorldBlessing[]>(INITIAL_BLESSINGS);
  const [senderName, setSenderName] = useState(guestName || '');
  const [senderLocation, setSenderLocation] = useState('');
  const [blessingMessage, setBlessingMessage] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Auto-detect user timezone
  useEffect(() => {
    try {
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (userTz.includes('New_York') || userTz.includes('Toronto') || userTz.includes('Eastern')) setSelectedTz('EDT');
      else if (userTz.includes('Los_Angeles') || userTz.includes('Vancouver') || userTz.includes('Pacific')) setSelectedTz('PDT');
      else if (userTz.includes('London')) setSelectedTz('BST');
      else if (userTz.includes('Dubai')) setSelectedTz('GST');
      else if (userTz.includes('Singapore')) setSelectedTz('SGT');
      else if (userTz.includes('Sydney') || userTz.includes('Melbourne')) setSelectedTz('AEST');
      else setSelectedTz('IST');
    } catch {
      setSelectedTz('IST');
    }
  }, []);

  // Time conversion helper
  const convertIstToLocal = (istHour: number, istMinute: number, tzKey: string) => {
    const tz = TIMEZONES[tzKey] || TIMEZONES['IST'];
    // IST is UTC+5:30
    const istTotalMinutes = istHour * 60 + istMinute;
    const utcMinutes = istTotalMinutes - (5 * 60 + 30);
    const localTotalMinutes = utcMinutes + (tz.tzOffsetHours * 60 + tz.tzOffsetMinutes);
    
    let normalizedMinutes = (localTotalMinutes % (24 * 60) + (24 * 60)) % (24 * 60);
    const hours24 = Math.floor(normalizedMinutes / 60);
    const minutes = normalizedMinutes % 60;
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    
    return `${hours12}:${formattedMinutes} ${period}`;
  };

  const handleBlessingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !blessingMessage.trim()) return;

    const newBlessing: WorldBlessing = {
      id: `wb-${Date.now()}`,
      name: senderName.trim(),
      location: senderLocation.trim() || 'Worldwide',
      flag: '🌍',
      message: blessingMessage.trim() + (videoLink ? ` 🎥 [Video Blessing Attached]` : ''),
      type: videoLink ? 'video' : 'message',
      timestamp: 'Just now'
    };

    setBlessings([newBlessing, ...blessings]);
    setSubmitted(true);
    setTimeout(() => {
      setIsVideoModalOpen(false);
      setSubmitted(false);
      setBlessingMessage('');
      setVideoLink('');
    }, 2000);
  };

  return (
    <section className="my-14 relative" id="nri-global-hub">
      <div 
        className="rounded-3xl p-6 sm:p-10 border-2 shadow-2xl relative overflow-hidden backdrop-blur-md"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: template.colors.accent,
          boxShadow: `0 12px 36px ${template.colors.accent}20`
        }}
      >
        {/* Subtle decorative background watermark */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-8xl">
          🌐
        </div>

        {/* Header Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-widest mb-2"
              style={{
                backgroundColor: `${template.colors.primary}12`,
                color: template.colors.primary,
                border: `1px solid ${template.colors.accent}40`
              }}
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isNative ? 'প্রবাসী ও বৈশ্বিক আত্মীয় পরিজন' : 'NRI & Global Family Suite'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {isNative ? 'লাইভ সম্প্রচার ও গ্লোবাল টাইমজোন' : 'Live Stream Broadcast & Global Timezones'}
            </h2>
            <p className="text-xs sm:text-sm font-serif text-stone-600 mt-1 max-w-xl">
              {isNative
                ? 'দূর দেশে থাকা সমস্ত প্রিয়জনদের জন্য সরাসরি সম্প্রচার এবং আপনার স্থানীয় সময়ের শুভ লগ্ন সূচি।'
                : 'For our beloved family and friends across the globe — experience every sacred ritual in real-time, converted to your local time zone.'}
            </p>
          </div>

          {/* Timezone Selector Pill */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-stone-100 p-2 rounded-2xl border border-stone-200">
            <Clock className="w-4 h-4 text-stone-600 shrink-0" />
            <span className="text-xs font-serif font-semibold text-stone-700">Timezone:</span>
            <select
              value={selectedTz}
              onChange={(e) => setSelectedTz(e.target.value)}
              className="text-xs font-serif font-bold bg-white text-stone-800 rounded-lg px-2.5 py-1.5 border border-stone-300 shadow-sm cursor-pointer outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              {Object.entries(TIMEZONES).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.flag} {key} — {val.city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2-Column Main Section: Live Stream Hub + Converted Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          {/* Column 1: Live Stream Player Box (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl overflow-hidden border border-stone-300 bg-stone-900 text-white relative shadow-lg">
            
            {/* Mock Player Header */}
            <div className="p-4 bg-stone-950/80 backdrop-blur-md flex items-center justify-between border-b border-stone-800 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-red-400">
                  Exclusive Live Broadcast
                </span>
              </div>
              <span className="text-[11px] font-mono text-stone-400">
                1080p Ultra HD • 360° Audio
              </span>
            </div>

            {/* Video Placeholder with Play Action */}
            <div className="relative aspect-video flex flex-col items-center justify-center p-6 bg-gradient-to-t from-black via-stone-900 to-black overflow-hidden group">
              <img
                src={template.groom.image || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"}
                alt="Live Stream Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="relative z-10 text-center max-w-sm">
                <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center mx-auto mb-3 shadow-[0_0_24px_rgba(220,38,38,0.8)] group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-100">
                  {template.groom.name} &amp; {template.bride.name}
                </h3>
                <p className="text-xs font-serif text-stone-300 mt-1">
                  Sacred Wedding Ceremony &amp; Saptapadi
                </p>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] text-[#F3E5AB] font-mono">
                  <Clock className="w-3 h-3" />
                  <span>Scheduled in your timezone: {convertIstToLocal(19, 0, selectedTz)} ({selectedTz})</span>
                </div>
              </div>
            </div>

            {/* Stream Footer Actions */}
            <div className="p-4 bg-stone-950 flex flex-wrap items-center justify-between gap-3 border-t border-stone-800">
              <a
                href={liveStreamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-serif text-xs font-bold shadow-md transition-all"
              >
                <Video className="w-4 h-4" />
                <span>Open Official Live Stream</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-[#F3E5AB] border border-amber-400/40 font-serif text-xs font-bold transition-all"
              >
                <Mic className="w-4 h-4 text-[#D4AF37]" />
                <span>Send Video Blessing 🎥</span>
              </button>
            </div>
          </div>

          {/* Column 2: Ceremony Schedule Converted to Local Time (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-200">
                <span className="text-xs font-serif font-bold uppercase tracking-wider text-stone-700">
                  Ceremony Schedule in {TIMEZONES[selectedTz]?.city}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  {TIMEZONES[selectedTz]?.flag} {selectedTz}
                </span>
              </div>

              <div className="space-y-3">
                {template.events.map((evt, idx) => {
                  // Default mock hours: Evening 7 PM (19:00), Afternoon 12 PM (12:00), Morning 9 AM (09:00)
                  const istBaseHour = idx === 0 ? 9 : idx === 1 ? 13 : 19;
                  const localTimeStr = convertIstToLocal(istBaseHour, 30, selectedTz);

                  return (
                    <div 
                      key={evt.id || idx}
                      className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-sm hover:border-[#D4AF37] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif font-bold text-sm text-stone-900">
                            {isNative ? evt.nativeTitle : evt.title}
                          </h4>
                          <p className="text-[11px] font-serif text-stone-500 mt-0.5">
                            {isNative ? evt.nativeVenueName : evt.venueName}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-mono font-bold text-[#8B181B] bg-[#8B181B]/5 px-2 py-1 rounded-md block">
                            {localTimeStr}
                          </span>
                          <span className="text-[10px] text-stone-400 block mt-0.5">
                            (7:30 PM IST)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Calendar Sync Note */}
            <div className="mt-5 p-3 rounded-xl bg-stone-100 text-center border border-stone-200 text-xs font-serif text-stone-600">
              <span>🔔 All ceremonies will send a 15-minute live stream notification alert.</span>
            </div>
          </div>

        </div>

        {/* Global Family Video/Voice Blessings Carousel */}
        <div className="mt-10 pt-8 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>Blessings Received from Around the World</span>
              </h3>
              <p className="text-xs font-serif text-stone-500">
                Heartfelt messages, video notes, and voice blessings from family tuning in across continents.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-[#F3E5AB] font-serif text-xs font-bold transition-all shadow-md self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Record / Send Your Blessing</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {blessings.map((b) => (
              <div 
                key={b.id}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-serif font-bold text-stone-900 flex items-center gap-1">
                      <span>{b.flag}</span>
                      <span>{b.name}</span>
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">{b.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-serif text-stone-500 mb-2">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" />
                    <span>{b.location}</span>
                  </div>
                  <p className="text-xs font-serif text-stone-700 italic leading-relaxed">
                    "{b.message}"
                  </p>
                </div>
                {b.type === 'video' && (
                  <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center gap-1.5 text-[11px] font-serif text-amber-700 font-semibold">
                    <Video className="w-3.5 h-3.5" />
                    <span>Video greeting recorded</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Video / Global Blessing Submission Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border-2 border-[#D4AF37] relative">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2">
                <Video className="w-6 h-6 text-[#8B181B]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Send Long-Distance Blessings
              </h3>
              <p className="text-xs font-serif text-stone-500 mt-1">
                Your video, voice note, or personal blessing will be presented directly to the couple and family during the reception!
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-lg text-stone-800">Blessing Received!</h4>
                <p className="text-xs font-serif text-stone-600">
                  Thank you for showering your love across the miles. The couple will cherish this forever.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBlessingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-serif font-bold text-stone-700 mb-1">
                    Your Name / Family Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Uncle Rajesh & Sunita Sharma"
                    className="w-full text-xs font-serif px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8B181B] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-stone-700 mb-1">
                    Your Current City &amp; Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderLocation}
                    onChange={(e) => setSenderLocation(e.target.value)}
                    placeholder="e.g. Dallas, Texas (USA) or London (UK)"
                    className="w-full text-xs font-serif px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8B181B] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-stone-700 mb-1">
                    Heartfelt Blessing Message *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={blessingMessage}
                    onChange={(e) => setBlessingMessage(e.target.value)}
                    placeholder="Write your wishes for the couple..."
                    className="w-full text-xs font-serif px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8B181B] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-stone-700 mb-1">
                    Video or Voice Note Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    placeholder="YouTube, Google Drive, Loom, or iCloud video link"
                    className="w-full text-xs font-serif px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8B181B] focus:border-transparent outline-none"
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    You can record a 1-minute selfie video on your phone, upload to Drive/YouTube/Loom, and paste the link here.
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-serif font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#8B181B] hover:bg-[#6A1215] text-[#F3E5AB] text-xs font-serif font-bold shadow-lg transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Blessings</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
