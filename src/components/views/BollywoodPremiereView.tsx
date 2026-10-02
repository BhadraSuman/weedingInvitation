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
  Film,
  Play,
  Star,
  Award,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Heart,
  Volume2,
  Tv,
  CheckCircle,
  Share2,
  Video
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BollywoodPremiereViewProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
}

export const BollywoodPremiereView: React.FC<BollywoodPremiereViewProps> = ({
  template,
  lang,
  guestName
}) => {
  const { colors, quotes, groom, bride, events } = template;
  const isHindi = lang === 'native';
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1402);

  const triggerRedCarpetConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#E50914', '#D4AF37', '#FFD700', '#FFFFFF']
    });
  };

  const handleLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      setLikeCount(prev => prev + 1);
      triggerRedCarpetConfetti();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0F0F12] text-white selection:bg-[#E50914] selection:text-white font-sans overflow-x-hidden">
      {/* Cinematic Ambient Backdrop Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#E50914]/15 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-0 w-[500px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-[#E50914]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* Top OTT Navigation Bar Banner */}
        <div className="flex items-center justify-between py-3 px-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 mb-8 shadow-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-[#E50914] font-serif uppercase">
              SHAADI<span className="text-white text-base font-light tracking-widest ml-1">ORIGINALS</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              {isHindi ? 'लाइव रिलीज' : 'PREMIERING NOW'}
            </span>
          </div>
        </div>

        {/* Personalized VIP Guest Ticket Banner */}
        {guestName && (
          <SectionReveal>
            <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-red-950/60 via-black/80 to-amber-950/50 border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                    {isHindi ? 'रेड कार्पेट वीआईपी पास' : 'RED CARPET VIP INVITATION'}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white">
                    {guestName}
                  </h3>
                </div>
              </div>
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/90 border border-white/15 font-mono">
                {isHindi ? 'सपरिवार सादर आमंत्रित' : 'Admit With Family'}
              </span>
            </div>
          </SectionReveal>
        )}

        {/* HERO SECTION: THEATRICAL BLOCKBUSTER MOVIE POSTER */}
        <SectionReveal>
          <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black/80 shadow-[0_20px_60px_rgba(229,9,20,0.25)]">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
              <img
                src="/images/couples/bollywood_poster.jpg"
                alt="The Grand Premiere Movie Poster"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-[#0F0F12]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />

              {/* Top Film Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-[#E50914] text-white text-[11px] font-bold uppercase tracking-widest shadow-md">
                  BLOCKBUSTER OF THE YEAR
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                  U/A 100% LOVE
                </span>
              </div>

              {/* Bottom Poster Title Info */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono tracking-widest uppercase font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{isHindi ? 'भाग्य द्वारा निर्देशित • दो परिवारों द्वारा प्रस्तुत' : 'DIRECTED BY DESTINY • PRODUCED BY TWO FAMILIES'}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight drop-shadow-md">
                  {isHindi ? quotes.nativeWeddingTitle : quotes.weddingTitle}
                </h1>
                <p className="text-xs sm:text-sm text-white/80 max-w-xl line-clamp-2">
                  {isHindi ? quotes.nativeWelcomeNotice : quotes.welcomeNotice}
                </p>

                {/* Hero Actions: Watch Teaser & Like */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    onClick={() => setShowTrailerModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm shadow-lg hover:bg-white/90 active:scale-95 transition-all"
                  >
                    <Play className="w-4 h-4 fill-current text-black" />
                    <span>{isHindi ? 'टीज़र ट्रेलर देखें' : 'Watch Teaser Trailer'}</span>
                  </button>

                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-semibold backdrop-blur-md transition-all ${
                      hasLiked
                        ? 'bg-red-600/30 border-red-500 text-red-300'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current text-red-500' : ''}`} />
                    <span>{likeCount} {isHindi ? 'शुभकामनाएं' : 'Claps'}</span>
                  </button>

                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>99% MATCH ON HEARTS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Block Credits Strip */}
            <div className="p-4 bg-black/90 border-t border-white/10 text-center font-mono text-[10px] text-white/50 tracking-widest uppercase">
              {isHindi
                ? '★ अनिर्बान सेन संग देबोलीना रॉय • मुख्य भूमिका • संगीत: शहनाई एवं डीजे • छायांकन: स्मृतियां • रिलीज तिथि: २६ दिसम्बर २०२६ ★'
                : '★ STARRING ANIRBAN SEN & DEBOLEENA ROY • MUSIC BY ACOUSTIC SHEHNAI • EDITORIAL BY ETERNAL MEMORIES • WORLD PREMIERE: 26 DEC 2026 ★'}
            </div>
          </div>
        </SectionReveal>

        {/* COUNTDOWN TIMER: RELEASE IN THEATRES */}
        <div className="my-12">
          <CountdownTimer
            template={template}
            lang={lang}
          />
        </div>

        {/* EPISODES CAROUSEL (CEREMONY ITINERARY) */}
        <SectionReveal>
          <div className="my-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#E50914] font-bold">
                  {isHindi ? 'सीजन १: विवाह उत्सव' : 'SEASON 1 • CEREMONIES'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                  {isHindi ? 'मांगलिक एपिसोड्स' : 'Wedding Episodes & Schedule'}
                </h2>
              </div>
              <span className="text-xs font-mono text-white/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                {events.length} {isHindi ? 'एपिसोड्स' : 'Episodes'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((evt, idx) => (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEpisode(idx)}
                  className={`group relative rounded-2xl p-5 border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    selectedEpisode === idx
                      ? 'bg-gradient-to-b from-red-950/40 to-black/80 border-[#E50914] shadow-[0_8px_30px_rgba(229,9,20,0.3)]'
                      : 'bg-[#18181D] border-white/10 hover:border-white/30 hover:bg-[#202026]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-3">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">
                        EP {idx + 1}
                      </span>
                      <span className="text-amber-400 font-semibold">
                        {isHindi ? evt.nativeDate : evt.date.split(',')[0]}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-serif text-white group-hover:text-amber-300 transition-colors mb-1">
                      {isHindi ? evt.nativeTitle : evt.title}
                    </h3>
                    <p className="text-xs text-white/60 italic font-serif mb-3">
                      {isHindi ? evt.nativeTagline : evt.tagline}
                    </p>
                    <p className="text-xs text-white/70 leading-relaxed line-clamp-3 mb-4">
                      {isHindi ? evt.nativeDescription : evt.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-white/80">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{isHindi ? evt.nativeTime : evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="truncate">{isHindi ? evt.nativeVenueName : evt.venueName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* CAST & CREW (MEET THE LEADING PAIR & PRODUCERS) */}
        <SectionReveal>
          <div className="my-16">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                {isHindi ? 'स्टार कास्ट' : 'THE STAR CAST'}
              </span>
              <h2 className="text-3xl font-bold font-serif text-white mt-1">
                {isHindi ? 'मुख्य किरदार' : 'Meet The Leading Pair'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Groom Hero */}
              <div className="rounded-3xl bg-[#18181D] border border-white/15 p-6 shadow-xl flex flex-col justify-between group hover:border-[#E50914] transition-colors">
                <div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-white/10 relative">
                    <img
                      src={groom.image}
                      alt={groom.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[11px] font-mono text-amber-400 font-bold border border-white/15">
                      {isHindi ? 'नायक (HERO)' : 'THE GROOM'}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-white">
                    {isHindi ? groom.nativeName : groom.name}
                  </h3>
                  <p className="text-xs font-mono text-red-400 font-semibold mb-3">
                    {isHindi ? groom.nativeRole : groom.role}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-serif">
                    "{isHindi ? groom.nativeAbout : groom.about}"
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/50 font-mono">
                  {isHindi ? groom.nativeParents : groom.parents}
                </div>
              </div>

              {/* Bride Heroine */}
              <div className="rounded-3xl bg-[#18181D] border border-white/15 p-6 shadow-xl flex flex-col justify-between group hover:border-[#E50914] transition-colors">
                <div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-white/10 relative">
                    <img
                      src={bride.image}
                      alt={bride.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[11px] font-mono text-amber-400 font-bold border border-white/15">
                      {isHindi ? 'नायिका (HEROINE)' : 'THE BRIDE'}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-white">
                    {isHindi ? bride.nativeName : bride.name}
                  </h3>
                  <p className="text-xs font-mono text-red-400 font-semibold mb-3">
                    {isHindi ? bride.nativeRole : bride.role}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-serif">
                    "{isHindi ? bride.nativeAbout : bride.about}"
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/50 font-mono">
                  {isHindi ? bride.nativeParents : bride.parents}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* GLOBAL NRI PORTAL */}
        <div className="my-16">
          <NriGlobalSuite template={template} lang={lang} />
        </div>

        {/* VENUE & RED CARPET ACCESS */}
        <div className="my-16">
          <VenueLocation template={template} lang={lang} />
        </div>

        {/* RSVP WITH CHIEF PRODUCERS */}
        <div className="my-16">
          <RsvpSection template={template} lang={lang} />
        </div>

        {/* DIGITAL SHAGUN ENVELOPE */}
        <div className="my-16">
          <DigitalShagunSection template={template} lang={lang} />
        </div>

        {/* FAN WISHES & GUESTBOOK */}
        <div className="my-16">
          <WishesGuestbook template={template} lang={lang} />
        </div>

        {/* FOOTER */}
        <Footer template={template} lang={lang} />
      </div>

      {/* TEASER TRAILER MODAL */}
      {showTrailerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#18181D] border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-6">
            <button
              onClick={() => setShowTrailerModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-widest font-bold mb-2">
              <Film className="w-4 h-4" />
              <span>OFFICIAL TEASER TRAILER</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4">
              {isHindi ? 'द ग्रैंड प्रीमियर • ऑफिशियल टीज़र' : 'The Grand Premiere • Official Teaser'}
            </h3>

            {/* Video Mockup Screen */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 flex flex-col items-center justify-center text-center p-6 mb-4">
              <div className="w-16 h-16 rounded-full bg-red-600/30 border border-red-500 flex items-center justify-center mb-3">
                <Play className="w-8 h-8 fill-current text-red-500 ml-1" />
              </div>
              <p className="font-serif italic text-white/90 text-sm sm:text-base max-w-md">
                "Where eyes met across crowded rooms, and destinies entwined forever."
              </p>
              <span className="text-xs font-mono text-amber-400 mt-2">
                Directed with Love by Anirban & Deboleena
              </span>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowTrailerModal(false)}
                className="px-6 py-2 rounded-full bg-white text-black font-semibold text-xs font-mono hover:bg-white/90"
              >
                {isHindi ? 'बंद करें' : 'Close Screen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
