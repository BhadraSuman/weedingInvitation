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
  Newspaper,
  Sun,
  Flame,
  Camera,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Quote,
  Layers,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WeddingGazetteViewProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
}

export const WeddingGazetteView: React.FC<WeddingGazetteViewProps> = ({
  template,
  lang,
  guestName
}) => {
  const { colors, quotes, groom, bride, events } = template;
  const isBengali = lang === 'native';
  const [isHalftone, setIsHalftone] = useState(true);
  const [solvedTrivia, setSolvedTrivia] = useState<Record<number, boolean>>({});

  const toggleHalftone = () => {
    setIsHalftone(prev => !prev);
  };

  const handleTriviaAnswer = (qIndex: number, correct: boolean) => {
    if (correct && !solvedTrivia[qIndex]) {
      setSolvedTrivia(prev => ({ ...prev, [qIndex]: true }));
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#B51C12', '#1C1C16', '#D4AF37']
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDF9EF] text-[#1C1C16] selection:bg-[#B51C12] selection:text-white font-serif">
      {/* Newsprint Grain Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0 bg-repeat"
        style={{
          backgroundImage: `radial-gradient(#1C1C16 0.75px, transparent 0.75px)`,
          backgroundSize: '12px 12px'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* NEWSPAPER MASTHEAD */}
        <header className="border-b-4 border-double border-[#1C1C16] pb-4 mb-6 text-center">
          {/* Top Weather & Issue Dateline */}
          <div className="flex flex-wrap items-center justify-between text-xs font-mono uppercase tracking-widest border-b border-[#1C1C16]/30 pb-2 mb-3">
            <div className="flex items-center gap-1.5 text-[#B51C12] font-bold">
              <Sun className="w-3.5 h-3.5" />
              <span>{isBengali ? 'আবহাওয়া: ১০০% আনন্দাশ্রু' : 'FORECAST: 100% TEARS OF JOY & GHEE'}</span>
            </div>
            <span className="font-bold">VOL. I • ISSUE NO. XXIV</span>
            <span className="text-[#B51C12] font-bold">{isBengali ? 'মূল্য: অমূল্য আশীর্বাদ' : 'PRICE: PRICELESS'}</span>
          </div>

          {/* Main Title Masthead */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight font-serif text-[#1C1C16] leading-none mb-1">
            The Wedding Gazette
          </h1>
          <p className="text-xs sm:text-sm italic font-serif text-[#1C1C16]/70 tracking-widest uppercase">
            {isBengali ? 'ঐতিহাসিক শুভ বিবাহ বার্তা • কলকাতা ব্যুরো বিশেষ সংস্করণ' : 'HISTORIC NUPTIAL DISPATCH • SPECIAL COMMEMORATIVE BROADSHEET'}
          </p>

          <div className="flex items-center justify-between border-t border-[#1C1C16]/30 pt-1 mt-2 text-[11px] font-mono uppercase text-[#1C1C16]/80">
            <span>{isBengali ? 'শনিবার, ২৬শে অগ্রহায়ণ ১৪৩৩' : 'AUTUMN 2026 EDITION'}</span>
            <span className="font-bold text-[#B51C12]">FRONT PAGE SPECIAL</span>
            <span>KOLKATA • MUMBAI</span>
          </div>
        </header>

        {/* Personalized Telegraph for VIP Reader */}
        {guestName && (
          <SectionReveal>
            <div className="mb-8 p-4 rounded-xl border-2 border-dashed border-[#B51C12] bg-[#FAF5EB] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-[#B51C12] text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                  VIP DISPATCH
                </span>
                <div>
                  <span className="text-xs font-mono uppercase text-[#1C1C16]/60">
                    {isBengali ? 'সম্মানিত অতিথি পাঠক:' : 'DELIVERED IN HONOUR OF:'}
                  </span>
                  <h3 className="text-xl font-bold font-serif text-[#B51C12]">
                    {guestName}
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono italic text-[#1C1C16]/70">
                {isBengali ? 'সপরিবারে পাঠ ও উপস্থিতির সাদর আহ্বান' : 'Complimentary Nuptial Copy'}
              </span>
            </div>
          </SectionReveal>
        )}

        {/* LEAD ARTICLE: CITY BRACES FOR BIRIYANI */}
        <SectionReveal>
          <div className="border-b-2 border-[#1C1C16] pb-8 mb-8">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="inline-block px-3 py-1 rounded bg-[#B51C12] text-white font-mono text-[10px] font-bold tracking-widest uppercase mb-2">
                {isBengali ? 'বিশেষ শীর্ষ সংবাদ' : '★ BREAKING NUPTIAL HEADLINE ★'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase font-serif text-[#1C1C16] leading-tight mb-3">
                {isBengali ? quotes.nativeWeddingTitle : 'ANIRBAN & DEBOLEENA TO TIE THE KNOT; CITY BRACES FOR BIRIYANI!'}
              </h2>
              <p className="text-sm sm:text-base italic text-[#1C1C16]/80 font-serif leading-relaxed">
                {isBengali ? quotes.nativeWelcomeNotice : 'Seven sacred pheras scheduled under auspicious planetary alignment; lifelong bachelorhood officially declared an endangered species.'}
              </p>
            </div>

            {/* RETRO HALFTONE PHOTO FRAME */}
            <div className="bg-[#FAF5EB] border border-[#1C1C16]/40 p-3 sm:p-4 rounded-2xl shadow-md mb-6">
              <div className="flex items-center justify-between text-xs font-mono text-[#1C1C16]/70 pb-2 mb-2 border-b border-[#1C1C16]/20">
                <span>ARCHIVE WIRE PHOTO #1973-AD</span>
                <span className="font-bold text-[#B51C12]">FIRST EDITION PRESS</span>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-300">
                <img
                  src="/images/couples/vintage_gazette.jpg"
                  alt="Anirban and Deboleena in Vintage Print"
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isHalftone ? 'filter grayscale contrast-125 brightness-95' : 'filter none'
                  }`}
                />

                {/* Halftone Screen Filter Overlay */}
                {isHalftone && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
                    style={{
                      backgroundImage: `radial-gradient(#000000 1.5px, transparent 1.5px)`,
                      backgroundSize: '6px 6px'
                    }}
                  />
                )}

                {/* Red Circular Bureau Stamp */}
                <div className="absolute bottom-4 right-4 bg-white/90 border-2 border-[#B51C12] text-[#B51C12] px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider shadow -rotate-6">
                  {isBengali ? 'প্রেস অনুমোদিত • কলকাতা ব্যুরো' : 'PRESS APPROVED • KOLKATA BUREAU'}
                </div>
              </div>

              {/* Halftone Toggle Bar */}
              <div className="flex items-center justify-between pt-3 mt-1">
                <p className="text-xs italic text-[#1C1C16]/70 font-serif truncate pr-2">
                  {isBengali ? 'বরের হাসিমুখ ও কনের স্নিগ্ধ রূপের ঐতিহাসিক মুহূর্ত' : 'The ecstatic couple pictured in traditional heirloom finery.'}
                </p>
                <button
                  onClick={toggleHalftone}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C1C16] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#B51C12] transition-colors shrink-0 shadow-sm"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{isHalftone ? (isBengali ? 'রঙিন সংস্করণ' : 'Reveal Color Print') : (isBengali ? 'ভিন্টেজ প্রেস' : 'Halftone Print')}</span>
                </button>
              </div>
            </div>

            {/* Pull Quotes Accord Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FAF5EB] p-4 rounded-xl border border-[#1C1C16]/20 text-xs sm:text-sm font-serif">
              <div className="border-l-2 border-[#B51C12] pl-3 italic">
                <strong className="block text-[#1C1C16] font-mono not-italic text-xs uppercase mb-1">
                  {isBengali ? 'কনে দেবলীনা:' : 'Bride Deboleena:'}
                </strong>
                "{isBengali ? 'তিনি এক নিঃশর্ত চুক্তির প্রস্তাব দিয়েছেন: চিরন্তন ফুচকা এবং টেস্ট ক্রিকেটের সময় শান্তি।' : 'He offered an unconditional treaty: perpetual puchkas & quiet during cricket tests.'}"
              </div>
              <div className="border-l-2 border-[#B51C12] pl-3 italic">
                <strong className="block text-[#1C1C16] font-mono not-italic text-xs uppercase mb-1">
                  {isBengali ? 'বর অনির্বাণ:' : 'Groom Anirban:'}
                </strong>
                "{isBengali ? 'বিবাহ চুক্তির অপরিবর্তনীয় শর্ত ছিল: প্রতি প্লেট বিরিয়ানিতে সোনালী ভাজা কলকাতা আলুর নিশ্চয়তা।' : 'The presence of a golden fried Kolkata biryani aloo was non-negotiable in the marriage accord.'}"
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* METEOROLOGICAL BULLETIN & COUNTDOWN */}
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-center">
            {/* Weather Box */}
            <div className="md:col-span-1 bg-[#FAF5EB] p-4 rounded-xl border border-[#1C1C16]/30 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-[#B51C12]">
                <Sun className="w-4 h-4" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                  {isBengali ? 'আবহাওয়া পূর্বাভাষ' : 'WEATHER BULLETIN'}
                </h4>
              </div>
              <p className="text-xs leading-relaxed text-[#1C1C16]/80 font-serif">
                {isBengali
                  ? 'গায়ে হলুদের দিনে উজ্জ্বল হলুদ রোদ ও সরষে বাটার দমকা হাওয়া। বিবাহ লগ্নে ৯৯% শুভ উলুধ্বনি ও শঙ্খনাদ।'
                  : 'Warm sunny smiles with occasional mustard squalls during Gaye Holud. 99% probability of dhol tremors at the Mandap.'}
              </p>
            </div>

            {/* Countdown Clock */}
            <div className="md:col-span-2">
              <CountdownTimer
                template={template}
                lang={lang}
              />
            </div>
          </div>
        </SectionReveal>

        {/* GAZETTE DISPATCHES (EVENTS ITINERARY) */}
        <SectionReveal>
          <div className="mb-14">
            <div className="border-b-2 border-[#1C1C16] pb-2 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#B51C12] font-bold block">
                  {isBengali ? 'সরকারি উৎসব দিনপঞ্জী' : 'OFFICIAL DISPATCHES'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold uppercase font-serif text-[#1C1C16]">
                  {isBengali ? 'মাঙ্গলিক অনুষ্ঠানসূচী' : 'Gazette Event Schedule'}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#1C1C16]/60">
                {events.length} {isBengali ? 'টি মাঙ্গলিক পর্ব' : 'Dispatches'}
              </span>
            </div>

            <div className="space-y-6">
              {events.map((evt, idx) => (
                <div
                  key={evt.id}
                  className="bg-[#FAF5EB] p-5 rounded-2xl border-2 border-[#1C1C16]/20 hover:border-[#B51C12] transition-colors shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1C1C16]/15 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#1C1C16] text-white font-mono text-xs font-bold">
                        DISPATCH 0{idx + 1}
                      </span>
                      <h4 className="text-xl font-bold font-serif text-[#B51C12]">
                        {isBengali ? evt.nativeTitle : evt.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#1C1C16]/70">
                      {isBengali ? evt.nativeDate : evt.date}
                    </span>
                  </div>

                  <p className="text-sm font-serif italic text-[#1C1C16]/80 mb-3">
                    "{isBengali ? evt.nativeTagline : evt.tagline}"
                  </p>
                  <p className="text-xs sm:text-sm text-[#1C1C16]/90 leading-relaxed font-serif mb-4">
                    {isBengali ? evt.nativeDescription : evt.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1C1C16]/10 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-[#1C1C16]/80">
                      <Clock className="w-3.5 h-3.5 text-[#B51C12]" />
                      <span>{isBengali ? evt.nativeTime : evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#1C1C16]/80">
                      <MapPin className="w-3.5 h-3.5 text-[#B51C12]" />
                      <span>{isBengali ? evt.nativeVenueName : evt.venueName}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#1C1C16]/5 border border-[#1C1C16]/15 text-[11px]">
                      👗 {isBengali ? evt.nativeDressCode : evt.dressCode}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* COUPLE CROSSWORD & TRIVIA GAME */}
        <SectionReveal>
          <div className="bg-[#FAF5EB] p-6 rounded-2xl border-2 border-[#1C1C16] shadow-md mb-14">
            <div className="flex items-center gap-2 mb-2 text-[#B51C12]">
              <HelpCircle className="w-5 h-5" />
              <h4 className="text-xl font-bold font-serif uppercase tracking-tight">
                {isBengali ? 'গেজেট কুইজ ও শব্দজব্দ' : 'The Nuptial Crossword & Trivia'}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[#1C1C16]/70 font-serif mb-6">
              {isBengali
                ? 'বর ও কনের পছন্দ নিয়ে ৩টি মজার প্রশ্ন। সঠিক উত্তর দিয়ে জয় করুন মিষ্টি আশীর্বাদ!'
                : 'Test how well you know the couple with these 3 quick trivia questions.'}
            </p>

            <div className="space-y-4">
              {[
                {
                  q: isBengali ? '১. অনির্বাণের সবচেয়ে প্রিয় কলকাতার খাবার কোনটি?' : '1. What is Anirban\'s non-negotiable food requirement?',
                  options: [
                    isBengali ? 'লুচি ও আলুর দম' : 'Luchi Alur Dom',
                    isBengali ? 'কলকাতার বিরিয়ানির মিষ্টি আলু' : 'Kolkata Biryani with Golden Aloo',
                    isBengali ? 'রসগোল্লা' : 'Rosogolla'
                  ],
                  correctIdx: 1
                },
                {
                  q: isBengali ? '২. দেবলীনার সাথে প্রথম সাক্ষাতের গোপন স্থানটি কোথায় ছিল?' : '2. Where did their historic first philosophical debate occur?',
                  options: [
                    isBengali ? 'পার্ক স্ট্রিটের ফ্লুরিস (Flurys)' : 'Flurys on Park Street',
                    isBengali ? 'কফি হাউস' : 'College Street Coffee House',
                    isBengali ? 'ভিক্টোরিয়া মেমোরিয়াল' : 'Victoria Memorial Gardens'
                  ],
                  correctIdx: 0
                }
              ].map((item, qIdx) => (
                <div key={qIdx} className="p-4 rounded-xl bg-white border border-[#1C1C16]/20">
                  <p className="text-sm font-bold font-serif mb-2 text-[#1C1C16]">
                    {item.q}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {item.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleTriviaAnswer(qIdx, optIdx === item.correctIdx)}
                        className={`px-3 py-2 rounded-lg text-xs font-serif text-left border transition-all ${
                          solvedTrivia[qIdx] && optIdx === item.correctIdx
                            ? 'bg-emerald-100 border-emerald-600 text-emerald-900 font-bold'
                            : 'bg-stone-50 border-stone-300 hover:bg-stone-100 text-stone-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {solvedTrivia[qIdx] && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-bold mt-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isBengali ? 'সঠিক উত্তর! ১০০% খাঁটি সমঝদার।' : 'Correct! You know the couple intimately.'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* GLOBAL SUITE */}
        <div className="my-14">
          <NriGlobalSuite template={template} lang={lang} />
        </div>

        {/* VENUE COORDINATES */}
        <div className="my-14">
          <VenueLocation template={template} lang={lang} />
        </div>

        {/* RSVP TELEGRAM */}
        <div className="my-14">
          <RsvpSection template={template} lang={lang} />
        </div>

        {/* NUPTIAL REGISTRY (SHAGUN) */}
        <div className="my-14">
          <DigitalShagunSection template={template} lang={lang} />
        </div>

        {/* GUESTBOOK TELEGRAMS */}
        <div className="my-14">
          <WishesGuestbook template={template} lang={lang} />
        </div>

        {/* FOOTER */}
        <Footer template={template} lang={lang} />
      </div>
    </div>
  );
};
