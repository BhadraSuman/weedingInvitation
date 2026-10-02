import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CulturalTemplate, Language } from '../../types/wedding';
import { CountdownTimer } from '../CountdownTimer';
import { VenueLocation } from '../VenueLocation';
import { WishesGuestbook } from '../WishesGuestbook';
import { RsvpSection } from '../RsvpSection';
import { Footer } from '../Footer';
import { DigitalShagunSection } from '../DigitalShagunSection';
import { FloatingPetals } from '../common/FloatingPetals';
import {
  Sparkles,
  Heart,
  Calendar,
  Clock,
  MapPin,
  PartyPopper,
  Music,
  Smile,
  Compass,
  MessageCircle,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Chibi3dWeddingViewProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
}

export const Chibi3dWeddingView: React.FC<Chibi3dWeddingViewProps> = ({
  template,
  lang,
  guestName
}) => {
  const { groom, bride, events, quotes, colors } = template;
  const isHindi = lang === 'native';

  // Love Story interactive state
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);

  const loveStories = [
    {
      year: '2021',
      title: isHindi ? 'कॉलेज लाइब्रेरी में पहली नज़र ☕' : 'First Met at College Cafe ☕',
      desc: isHindi
        ? 'एक ही टेबल पर चाय और असाइनमेंट नोट्स शेयर करने से शुरू हुई थी हमारी यह खूबसूरत दोस्ती।'
        : 'Started over an accidental shared table, cold coffee, and debating over who took better notes.',
      emoji: '🎒'
    },
    {
      year: '2023',
      title: isHindi ? 'लेट नाइट लॉन्ग ड्राइव और मैगी 🚗' : 'Midnight Drives & Maggi Runs 🚗',
      desc: isHindi
        ? 'सैकड़ों किलोमीटर की ड्राइविंग, पुराने गानों की प्लेलिस्ट और आधी रात को हाइवे पर गरमा-गरम चाय।'
        : 'Countless highway miles, singing retro Bollywood on loop, and realizing we are completely inseparable.',
      emoji: '🛣️'
    },
    {
      year: '2025',
      title: isHindi ? 'गोवा के समंदर किनारे हां कहा 💍' : 'The Sunset Goa Proposal 💍',
      desc: isHindi
        ? 'ढलते सूरज और लहरों की साक्षी में कुणाल ने पूछा और श्रेया ने मुस्कुराते हुए हां कह दिया!'
        : 'Under the golden twilight at Morjim beach, Kunal bent the knee and Shreya said YES with happy tears!',
      emoji: '🌊'
    },
    {
      year: '2026',
      title: isHindi ? 'शुभ विवाह — जीवन भर का साथ 🔔' : 'Forever & Always — The Wedding 🔔',
      desc: isHindi
        ? 'अब हम अपने नए सफर की शुरुआत कर रहे हैं, आप सभी के प्यार और आशीर्वाद के साथ।'
        : 'Turning our fairytale into reality with our favorite people dancing by our side!',
      emoji: '💒'
    }
  ];

  const handleStoryClick = (idx: number) => {
    setActiveStoryIdx(activeStoryIdx === idx ? null : idx);
    try {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#E11D48', '#8B5CF6', '#F59E0B', '#38BDF8']
      });
    } catch {}
  };

  return (
    <div className="relative max-w-4xl mx-auto px-3 sm:px-6 py-8 space-y-12 sm:space-y-14 font-sans text-[#1E1B4B]">
      
      {/* Floating Petals / Rose Confetti */}
      <FloatingPetals />

      {/* 1. Main 3D Hero Poster Card */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-b from-[#FFF1F2] via-white to-[#FDF4FF] rounded-3xl p-6 sm:p-12 border-4 border-[#FDA4AF] shadow-2xl overflow-hidden text-center"
      >
        {/* Floating Playful 3D Badges */}
        <div className="absolute top-4 left-4 text-3xl animate-bounce pointer-events-none opacity-80">💖</div>
        <div className="absolute top-4 right-4 text-3xl animate-bounce pointer-events-none opacity-80">✨</div>
        <div className="absolute bottom-6 left-6 text-2xl pointer-events-none opacity-70">🌸</div>
        <div className="absolute bottom-6 right-6 text-2xl pointer-events-none opacity-70">🎉</div>

        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#FB7185]/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          
          {/* Invocation Pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border-2 border-[#E11D48] text-xs sm:text-sm font-extrabold text-[#E11D48] uppercase tracking-widest mb-3 shadow-md">
            <Sparkles className="w-4 h-4 text-[#E11D48]" />
            <span>{quotes.invocation}</span>
            <Sparkles className="w-4 h-4 text-[#E11D48]" />
          </div>

          {/* Guest Personalization Callout */}
          {guestName && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="my-4 mx-auto max-w-md text-center bg-white border-2 border-[#8B5CF6] py-3.5 px-6 rounded-2xl shadow-md"
            >
              <span className="text-xs sm:text-sm uppercase font-extrabold text-[#8B5CF6] tracking-wider block">
                {isHindi ? '॥ सादर सप्रेम आमंत्रण ॥' : '॥ You are Specially Invited ॥'}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#1E1B4B]">
                {guestName}
              </span>
              <span className="text-sm text-stone-600 block mt-1 font-medium">
                {isHindi ? quotes.nativeWelcomeNotice : quotes.welcomeNotice}
              </span>
            </motion.div>
          )}

          {/* Wedding Title */}
          <div className="my-4 space-y-1">
            <h1 className="text-4xl sm:text-6xl font-black tracking-wide text-[#E11D48] drop-shadow-sm">
              {isHindi ? quotes.nativeWeddingTitle : quotes.weddingTitle}
            </h1>
            <p className="text-sm sm:text-base uppercase tracking-[0.25em] text-[#8B5CF6] font-extrabold mt-1">
              {isHindi ? '3D एनिमेटेड शाही विवाह उत्सव' : '3D Animated Royal Vivah Carnival'}
            </p>
          </div>

          {/* Cute 3D Couple Portrait Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="my-8 max-w-lg mx-auto p-5 sm:p-7 rounded-3xl bg-white border-3 border-[#FDA4AF] shadow-2xl text-center relative"
          >
            <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-3xl overflow-hidden border-4 border-[#E11D48] shadow-xl mb-4 group relative ring-4 ring-[#FCE7F3]">
              <img
                src={groom.image}
                alt="3D Animated Couple Kunal & Shreya"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="px-4 py-1 rounded-full bg-[#E11D48]/10 text-[#E11D48] text-xs sm:text-sm font-extrabold">
                {isHindi ? 'वर-वधू की प्यारी जोड़ी' : 'Two Hearts • One Love'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B4B]">
              {isHindi ? 'कुणाल एवं श्रेया' : 'Kunal & Shreya'}
            </h2>

            {/* Couple descriptions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-left">
              <div className="p-3.5 bg-rose-50/80 rounded-2xl border border-rose-200">
                <span className="text-xs uppercase font-extrabold text-[#E11D48] block">
                  🤵 {isHindi ? groom.nativeRole : groom.role}
                </span>
                <p className="text-xs sm:text-sm font-bold text-[#1E1B4B] mt-0.5">
                  {isHindi ? groom.nativeParents : groom.parents}
                </p>
                <p className="text-xs text-stone-600 mt-1 italic">
                  "{isHindi ? groom.nativeAbout : groom.about}"
                </p>
              </div>

              <div className="p-3.5 bg-purple-50/80 rounded-2xl border border-purple-200">
                <span className="text-xs uppercase font-extrabold text-[#8B5CF6] block">
                  👰 {isHindi ? bride.nativeRole : bride.role}
                </span>
                <p className="text-xs sm:text-sm font-bold text-[#1E1B4B] mt-0.5">
                  {isHindi ? bride.nativeParents : bride.parents}
                </p>
                <p className="text-xs text-stone-600 mt-1 italic">
                  "{isHindi ? bride.nativeAbout : bride.about}"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Rhyme Banner - Clean, High Contrast */}
          <div className="my-6 max-w-xl mx-auto py-5 px-6 sm:px-8 bg-white/95 rounded-2xl border-2 border-[#FDA4AF] shadow-md relative text-center">
            <p className="font-serif text-base sm:text-lg text-[#1E1B4B] whitespace-pre-line leading-relaxed font-bold">
              {quotes.verse}
            </p>
            <span className="text-sm font-serif font-extrabold text-[#E11D48] block mt-2">
              {quotes.verseAuthor}
            </span>
          </div>

          {/* Date & Muhurat Highlight Pill */}
          <div className="my-6 inline-flex flex-wrap items-center justify-center gap-3">
            <div className="px-5 py-2.5 rounded-full bg-[#E11D48] text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2">
              <Calendar className="w-4 h-4 text-yellow-300" />
              <span>{isHindi ? template.targetDateNative : 'Friday, 18th December 2026 | Vivah: 07:30 PM'}</span>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-white border-2 border-[#8B5CF6] text-[#8B5CF6] font-bold text-xs sm:text-sm shadow-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8B5CF6]" />
              <span>{isHindi ? template.venue.nativeName : template.venue.name}</span>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 2. Interactive "Our Fun Love Story" 3D Timeline */}
      <section className="bg-gradient-to-r from-[#FFF5F7] via-white to-[#F5F3FF] rounded-3xl p-6 sm:p-10 border-2 border-[#FDA4AF] shadow-xl text-center relative overflow-hidden">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-xs sm:text-sm font-extrabold text-[#E11D48] uppercase tracking-widest">
            <PartyPopper className="w-4 h-4 text-[#E11D48]" />
            <span>{isHindi ? 'हमारी प्यारी प्रेम कहानी' : 'Our Fun 3D Love Story'}</span>
            <PartyPopper className="w-4 h-4 text-[#E11D48]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#1E1B4B] mt-2">
            {isHindi ? 'कॉलेज कैफे से सात फेरों तक का सफर' : 'From College Bunking to Wedding Bells'}
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-lg mx-auto">
            {isHindi
              ? 'किसी भी कार्ड पर क्लिक करके उस खास पल की यादों को दोबारा जिएं!'
              : 'Tap any memory card to pop confetti and unlock the story!'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
          {loveStories.map((story, idx) => {
            const isExpanded = activeStoryIdx === idx;

            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStoryClick(idx)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  isExpanded
                    ? 'bg-gradient-to-br from-rose-50 to-purple-50 border-[#E11D48] shadow-lg ring-2 ring-rose-300'
                    : 'bg-white border-rose-200 hover:border-[#8B5CF6] shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-xl bg-rose-100/80">{story.emoji}</span>
                    <div>
                      <span className="text-xs uppercase font-extrabold text-[#E11D48] bg-rose-50 px-2 py-0.5 rounded-md">
                        {story.year}
                      </span>
                      <h3 className="font-extrabold text-base sm:text-lg text-[#1E1B4B] mt-0.5">
                        {story.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#8B5CF6]">
                    {isExpanded ? '▲' : '▼'}
                  </span>
                </div>

                <p className="text-sm text-stone-700 mt-3 leading-relaxed">
                  {story.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Live Countdown to Grand Vivah */}
      <CountdownTimer template={template} lang={lang} />

      {/* 4. Wedding Celebrations & Carnival Timeline */}
      <section className="space-y-6" id="events">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-xs sm:text-sm text-[#8B5CF6] font-extrabold uppercase tracking-widest">
            <Calendar className="w-4 h-4 text-[#8B5CF6]" />
            <span>{isHindi ? 'मांगलिक कार्यक्रम एवं उत्सव' : 'Wedding Schedule & Carnival'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B4B]">
            {isHindi ? 'तीन दिवसीय शादी उत्सव' : '3 Days of Pure Celebration'}
          </h2>
        </div>

        <div className="space-y-4">
          {events.map((evt, idx) => (
            <motion.div
              key={evt.id}
              whileHover={{ y: -3 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-md hover:border-[#E11D48] transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
            >
              <div className="space-y-2.5 max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-gradient-to-r from-[#E11D48] to-[#8B5CF6] text-white font-black text-sm flex items-center justify-center shadow">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#1E1B4B]">
                      {isHindi ? evt.nativeTitle : evt.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-extrabold text-[#E11D48]">
                      {isHindi ? evt.nativeTagline : evt.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                  {isHindi ? evt.nativeDescription : evt.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {(isHindi ? evt.nativeHighlights : evt.highlights).map((h, hIdx) => (
                    <span
                      key={hIdx}
                      className="text-xs sm:text-sm px-3 py-1 rounded-full bg-rose-50 text-[#E11D48] font-bold border border-rose-200 shadow-xs"
                    >
                      ★ {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-64 p-5 rounded-2xl bg-gradient-to-b from-rose-50/70 to-purple-50/70 border border-rose-200 space-y-2.5 text-sm font-semibold shrink-0 shadow-sm">
                <p className="font-extrabold text-[#E11D48]">📅 {isHindi ? evt.nativeDate : evt.date}</p>
                <p className="text-stone-700">⏰ {isHindi ? evt.nativeTime : evt.time}</p>
                <p className="text-stone-700">📍 {isHindi ? evt.nativeVenueName : evt.venueName}</p>
                <p className="text-[#8B5CF6] pt-2 border-t border-rose-200/80 font-bold">
                  👗 {isHindi ? evt.nativeDressCode : evt.dressCode}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Venue Location & Navigation */}
      <VenueLocation template={template} lang={lang} />

      {/* 6. Digital Wishes Guestbook */}
      <WishesGuestbook template={template} lang={lang} />

      {/* 7. Digital Shagun & E-Lifafa */}
      <DigitalShagunSection template={template} lang={lang} />

      {/* 8. RSVP Coordination */}
      <RsvpSection template={template} lang={lang} />

      {/* 9. Footer */}
      <Footer template={template} lang={lang} />

    </div>
  );
};
