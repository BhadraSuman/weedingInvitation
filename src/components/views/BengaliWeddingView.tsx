import React from 'react';
import { CulturalTemplate, Language } from '../../types/wedding';
import { AlponaDivider, ToporMukutIcon, ShankhoIcon, PaanPataIcon, CornerAlpona } from '../AlponaMotifs';
import { CountdownTimer } from '../CountdownTimer';
import { VenueLocation } from '../VenueLocation';
import { WishesGuestbook } from '../WishesGuestbook';
import { RsvpSection } from '../RsvpSection';
import { Footer } from '../Footer';
import { DigitalShagunSection } from '../DigitalShagunSection';
import { NriGlobalSuite } from '../common/NriGlobalSuite';
import { FloatingPetals } from '../common/FloatingPetals';
import { Calendar, MapPin, Sparkles, Heart } from 'lucide-react';

interface BengaliWeddingViewProps {
  template: CulturalTemplate;
  lang: Language;
  guestName?: string;
}

export const BengaliWeddingView: React.FC<BengaliWeddingViewProps> = ({
  template,
  lang,
  guestName,
}) => {
  const { groom, bride, events, colors, quotes } = template;

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-12 sm:px-6">
      {/* Sacred Flower Shower Animation */}
      <FloatingPetals />
      
      {/* Top Antique Carved Wooden Scroll Dowel with Gilded Finials */}
      <div className="relative -mb-3.5 z-20 flex items-center justify-between px-2 sm:px-6 pointer-events-none drop-shadow-md">
        <div className="w-5 h-8 sm:w-7 sm:h-10 bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#997819] rounded-l-full shadow-lg border-y border-amber-900/60" />
        <div className="flex-1 h-4 sm:h-5 bg-gradient-to-b from-[#4A1D11] via-[#783516] to-[#2D0F08] shadow-inner rounded-sm border-y border-amber-900/70 flex items-center justify-center">
          <div className="w-3/4 h-1 bg-[#D4AF37]/35 rounded-full" />
        </div>
        <div className="w-5 h-8 sm:w-7 sm:h-10 bg-gradient-to-l from-[#D4AF37] via-[#FFF3B0] to-[#997819] rounded-r-full shadow-lg border-y border-amber-900/60" />
      </div>

      {/* 1. Traditional Bengali "Lagna Patrika" Outer Red Border Frame */}
      <div className="relative bg-[#FFFDF9] rounded-3xl p-4 sm:p-10 border-4 border-[#8B181B] shadow-2xl overflow-hidden">
        
        {/* Ornate Gold Inner Ribbon Border */}
        <div className="border border-[#D4AF37] rounded-2xl p-4 sm:p-8 bg-[#FBF7EE]/60 relative">
          
          {/* Corner Alpona Ornaments */}
          <CornerAlpona position="tl" className="absolute top-2 left-2 w-14 h-14" />
          <CornerAlpona position="tr" className="absolute top-2 right-2 w-14 h-14" />
          <CornerAlpona position="bl" className="absolute bottom-2 left-2 w-14 h-14" />
          <CornerAlpona position="br" className="absolute bottom-2 right-2 w-14 h-14" />

          {/* Top Auspicious Mangalacharan */}
          <div className="text-center pt-2 pb-6">
            <div className="flex items-center justify-center gap-2 mb-2 text-[#8B181B]">
              <ShankhoIcon size={18} />
              <span className="font-bengali text-xs tracking-widest font-bold">
                || শ্রী শ্রী দুর্গা সহায় ||
              </span>
              <ShankhoIcon size={18} />
            </div>

            <div className="my-2 max-w-md mx-auto py-2.5 px-4 bg-[#F4ECD8] rounded-xl border border-[#D4AF37]/50">
              <p className="font-bengali text-xs text-[#5C0C0F] whitespace-pre-line leading-relaxed font-medium">
                {quotes.verse}
              </p>
            </div>
          </div>

          {/* Guest Personalization Callout */}
          {guestName && (
            <div className="mb-6 mx-auto max-w-md text-center bg-gradient-to-r from-[#8B181B]/10 via-[#D4AF37]/20 to-[#8B181B]/10 border-y border-[#D4AF37] py-3 px-6 rounded-lg">
              <p className="font-bengali text-xs text-[#8B181B] font-semibold uppercase tracking-wider">
                {lang === 'native' ? 'সাদর নিমন্ত্রণ' : 'Cordially Invited'}
              </p>
              <p className="font-bengali text-xl text-[#8B181B] font-bold mt-0.5">
                {guestName}
              </p>
              <p className="font-bengali text-xs text-[#5C0C0F] mt-1">
                {quotes.nativeWelcomeNotice}
              </p>
            </div>
          )}

          {/* Topor & Mukut Regal Emblem */}
          <div className="flex justify-center my-4">
            <ToporMukutIcon className="w-20 h-16 transform hover:scale-105 transition-transform" />
          </div>

          {/* Wedding Announcement */}
          <div className="text-center space-y-1 my-4">
            <h1 className="font-bengali text-4xl sm:text-6xl text-[#8B181B] font-extrabold tracking-wide">
              {lang === 'native' ? quotes.nativeWeddingTitle : quotes.weddingTitle}
            </h1>
            <p className="font-royal text-sm tracking-[0.25em] text-[#997819] uppercase font-semibold">
              বাঙালি বিবাহ নিমন্ত্রণপত্র
            </p>
          </div>

          <AlponaDivider className="my-4 max-w-md mx-auto" />

          {/* Traditional Epistolary Greeting (সবিনয় নিবেদন) */}
          <div className="my-6 text-center max-w-lg mx-auto font-bengali text-sm text-[#3E2723] leading-relaxed">
            <p className="italic">
              {lang === 'native'
                ? 'মহাশয় / মহাশয়া, আগামী ১২ই অগ্রহায়ণ, ১৪৩৩ (২৮শে নভেম্বর ২০২৬, শনিবার) আমাদের জ্যেষ্ঠ পুত্র ও কন্যার শুভ বিবাহ সুসম্পন্ন হইবে। উক্ত মাঙ্গলিক অনুষ্ঠানে সবান্ধব সপরিবারে আপনার উপস্থিতি ও শুভাশিস একান্ত প্রার্থনীয়।'
                : 'With the blessings of Almighty and our revered ancestors, we cordially invite you with family and friends to the auspicious wedding ceremony of our beloved children.'}
            </p>
          </div>

          {/* The Couple & Dual Heritage Lineage Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 items-stretch">
            
            {/* Groom Lineage Parchment */}
            <div className="bg-[#FFFDF9] rounded-2xl p-6 border-2 border-[#D4AF37]/60 shadow-sm text-center flex flex-col justify-between">
              <div>
                <div className="w-36 h-44 mx-auto rounded-t-full rounded-b-xl overflow-hidden border-2 border-[#D4AF37] mb-4 shadow">
                  <img src={groom.image} alt={groom.name} className="w-full h-full object-cover" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#8B181B]/10 text-[#8B181B] font-bengali text-xs font-semibold">
                  {lang === 'native' ? groom.nativeRole : groom.role}
                </span>
                <h3 className="font-bengali text-2xl font-bold text-[#8B181B] mt-2">
                  {lang === 'native' ? groom.nativeName : groom.name}
                </h3>
                <div className="text-xs font-bengali text-[#4A3B32] mt-3 space-y-1.5 p-3 bg-[#FBF7EE] rounded-xl border border-[#D4AF37]/30">
                  <p className="font-semibold text-[#8B181B]">{lang === 'native' ? groom.nativeParents : groom.parents}</p>
                  <p className="opacity-90">{lang === 'native' ? groom.nativeGrandparents : groom.grandparents}</p>
                </div>
              </div>
              <p className="font-bengali text-xs italic text-[#6B5A55] mt-4">
                "{lang === 'native' ? groom.nativeAbout : groom.about}"
              </p>
            </div>

            {/* Bride Lineage Parchment */}
            <div className="bg-[#FFFDF9] rounded-2xl p-6 border-2 border-[#D4AF37]/60 shadow-sm text-center flex flex-col justify-between">
              <div>
                <div className="w-36 h-44 mx-auto rounded-t-full rounded-b-xl overflow-hidden border-2 border-[#D4AF37] mb-4 shadow">
                  <img src={bride.image} alt={bride.name} className="w-full h-full object-cover" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#8B181B]/10 text-[#8B181B] font-bengali text-xs font-semibold">
                  {lang === 'native' ? bride.nativeRole : bride.role}
                </span>
                <h3 className="font-bengali text-2xl font-bold text-[#8B181B] mt-2">
                  {lang === 'native' ? bride.nativeName : bride.name}
                </h3>
                <div className="text-xs font-bengali text-[#4A3B32] mt-3 space-y-1.5 p-3 bg-[#FBF7EE] rounded-xl border border-[#D4AF37]/30">
                  <p className="font-semibold text-[#8B181B]">{lang === 'native' ? bride.nativeParents : bride.parents}</p>
                  <p className="opacity-90">{lang === 'native' ? bride.nativeGrandparents : bride.grandparents}</p>
                </div>
              </div>
              <p className="font-bengali text-xs italic text-[#6B5A55] mt-4">
                "{lang === 'native' ? bride.nativeAbout : bride.about}"
              </p>
            </div>

          </div>

          {/* Auspicious Lagna Callout */}
          <div className="my-8 text-center bg-[#8B181B] text-[#F3E5AB] rounded-2xl p-4 border border-[#D4AF37] shadow-md">
            <p className="font-royal text-xs uppercase tracking-widest text-[#D4AF37]">
              শুভ বিবাহ লগ্ন ও স্থান
            </p>
            <p className="font-bengali text-lg sm:text-xl font-bold mt-1">
              ১২ই অগ্রহায়ণ, ১৪৩৩ | ২৮ নভেম্বর ২০২৬ (শনিবার রাত্রি ৮:১৫)
            </p>
            <p className="font-bengali text-xs opacity-90 mt-0.5">
              বাসর: রাজকুটির স্বভূমি, কলকাতা
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Antique Carved Wooden Scroll Dowel with Gilded Finials */}
      <div className="relative -mt-3.5 z-20 flex items-center justify-between px-2 sm:px-6 pointer-events-none drop-shadow-md">
        <div className="w-5 h-8 sm:w-7 sm:h-10 bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#997819] rounded-l-full shadow-lg border-y border-amber-900/60" />
        <div className="flex-1 h-4 sm:h-5 bg-gradient-to-b from-[#4A1D11] via-[#783516] to-[#2D0F08] shadow-inner rounded-sm border-y border-amber-900/70 flex items-center justify-center">
          <div className="w-3/4 h-1 bg-[#D4AF37]/35 rounded-full" />
        </div>
        <div className="w-5 h-8 sm:w-7 sm:h-10 bg-gradient-to-l from-[#D4AF37] via-[#FFF3B0] to-[#997819] rounded-r-full shadow-lg border-y border-amber-900/60" />
      </div>

      {/* 2. Real-Time Countdown */}
      <div className="my-10">
        <CountdownTimer template={template} lang={lang} />
      </div>

      {/* 3. Bengali Rituals Timeline (Aiburobhat, Gaye Holud, Shubho Bibaho, Bou Bhaat) */}
      <section className="my-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-1">
            <PaanPataIcon className="w-5 h-5" />
            <h2 className="font-bengali text-2xl sm:text-3xl font-bold text-[#8B181B]">
              {lang === 'native' ? 'মাঙ্গলিক আচার ও সময়সূচী' : 'Traditional Rituals & Timings'}
            </h2>
            <PaanPataIcon className="w-5 h-5" />
          </div>
          <AlponaDivider className="max-w-xs mx-auto my-2" />
        </div>

        <div className="space-y-6">
          {events.map((evt, idx) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl p-6 border-2 border-[#D4AF37]/50 shadow-md hover:border-[#8B181B] transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#8B181B] text-[#F3E5AB] font-serif font-bold text-xs flex items-center justify-center">
                    ০{idx + 1}
                  </span>
                  <h3 className="font-bengali text-xl font-bold text-[#8B181B]">
                    {lang === 'native' ? evt.nativeTitle : evt.title}
                  </h3>
                </div>
                <p className="font-bengali text-xs text-[#997819] font-medium">
                  {lang === 'native' ? evt.nativeTagline : evt.tagline}
                </p>
                <p className="font-bengali text-xs text-[#4A3B32] leading-relaxed">
                  {lang === 'native' ? evt.nativeDescription : evt.description}
                </p>
                <div className="pt-1 flex flex-wrap gap-2">
                  {(lang === 'native' ? evt.nativeHighlights : evt.highlights).map((h, hIdx) => (
                    <span key={hIdx} className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F4ECD8] text-[#5C0C0F] font-bengali border border-[#D4AF37]/30">
                      ✦ {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#FBF7EE] p-4 rounded-xl border border-[#D4AF37]/40 w-full md:w-64 space-y-2 text-xs font-bengali shrink-0">
                <p className="font-semibold text-[#8B181B]">📅 {lang === 'native' ? evt.nativeDate : evt.date}</p>
                <p className="text-[#5C0C0F]">⏰ {lang === 'native' ? evt.nativeTime : evt.time}</p>
                <p className="text-[#3E2723]">📍 {lang === 'native' ? evt.nativeVenueName : evt.venueName}</p>
                <p className="text-[#6B5A55] pt-1 border-t border-[#D4AF37]/30">
                  🥻 {lang === 'native' ? evt.nativeDressCode : evt.dressCode}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Venue & Map */}
      <VenueLocation template={template} lang={lang} />

      {/* 5. Digital Ashirbaad Guestbook */}
      <WishesGuestbook template={template} lang={lang} />

      {/* 6. NRI & Global Family Suite (Live Stream & Multi-Timezone) */}
      <NriGlobalSuite template={template} lang={lang} guestName={guestName} />

      {/* 7. Auspicious Shagun & E-Lifafa */}
      <DigitalShagunSection template={template} lang={lang} />

      {/* 8. RSVP & Uddipta Tech Solutions Concierge Coordination */}
      <RsvpSection template={template} lang={lang} />

      {/* 7. Footer */}
      <Footer template={template} lang={lang} />

    </div>
  );
};
