import React from 'react';
import { weddingEvents } from '../data/weddingData';
import { Language, WeddingEvent } from '../types/wedding';
import { AlponaDivider, ShankhoIcon, ToporMukutIcon, PaanPataIcon, MangalGhotIcon } from './AlponaMotifs';
import { Calendar, Clock, MapPin, Sparkles, Shirt } from 'lucide-react';

interface EventsTimelineProps {
  lang: Language;
}

// Generate Google Calendar Link
const createGoogleCalendarLink = (event: WeddingEvent): string => {
  const datesMap: Record<string, { start: string; end: string }> = {
    aiburobhat: { start: '20261126T070000Z', end: '20261126T110000Z' },
    gaye_holud: { start: '20261127T043000Z', end: '20261127T090000Z' },
    shubho_bibaho: { start: '20261128T130000Z', end: '20261128T190000Z' },
    bou_bhaat: { start: '20261129T133000Z', end: '20261129T183000Z' }
  };

  const times = datesMap[event.key] || { start: '20261128T130000Z', end: '20261128T190000Z' };
  const title = encodeURIComponent(`${event.title} - Anirban & Deboleena Wedding`);
  const details = encodeURIComponent(`${event.description}\n\nDress Code: ${event.dressCode}`);
  const location = encodeURIComponent(`${event.venueName}, Kolkata`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${times.start}/${times.end}&details=${details}&location=${location}`;
};

export const EventsTimeline: React.FC<EventsTimelineProps> = ({ lang }) => {
  const getEventIcon = (key: WeddingEvent['key']) => {
    switch (key) {
      case 'aiburobhat':
        return <MangalGhotIcon className="w-8 h-8" />;
      case 'gaye_holud':
        return <PaanPataIcon className="w-8 h-8" />;
      case 'shubho_bibaho':
        return <ToporMukutIcon className="w-10 h-8" />;
      case 'bou_bhaat':
        return <ShankhoIcon className="w-8 h-8" size={32} />;
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto" id="events">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShankhoIcon className="w-6 h-6 text-[#8B181B]" />
          <span className="font-royal text-xs uppercase tracking-widest text-[#8B181B] font-semibold">
            {lang === 'bn' ? 'মাঙ্গলিক অনুষ্ঠানসূচী' : 'Wedding Itinerary'}
          </span>
          <ShankhoIcon className="w-6 h-6 text-[#8B181B]" />
        </div>
        <h2 className="font-bengali text-3xl sm:text-4xl text-[#8B181B] font-bold">
          {lang === 'bn' ? 'শুভ উৎসবের দিনপঞ্জী' : 'Celebration Schedule'}
        </h2>
        <AlponaDivider className="my-3 max-w-xs mx-auto" />
        <p className="text-xs sm:text-sm text-[#6B5A55] font-serif max-w-md mx-auto">
          {lang === 'bn' 
            ? 'প্রতিটি লগ্নে আপনাদের উপস্থিতি আমাদের আনন্দকে বহুগুণ বাড়িয়ে তুলবে।'
            : 'Join us across every ritual as we celebrate eternal love and Bengali culture.'}
        </p>
      </div>

      {/* Timeline Grid */}
      <div className="space-y-8">
        {weddingEvents.map((evt, index) => {
          const isWeddingDay = evt.key === 'shubho_bibaho';

          return (
            <div
              key={evt.id}
              className={`relative bg-gradient-to-br ${
                isWeddingDay
                  ? 'from-[#FFF8F0] via-[#FFF1E8] to-[#FFE8E0] border-2 border-[#8B181B] shadow-xl'
                  : 'from-[#FFFDF9] to-[#FBF7EE] border border-[#D4AF37]/50 shadow-md'
              } rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl overflow-hidden`}
            >
              {/* Auspicious Badge for the Main Wedding Day */}
              {isWeddingDay && (
                <div className="absolute top-0 right-0 bg-[#8B181B] text-[#F3E5AB] font-royal text-[11px] font-bold tracking-widest uppercase px-5 py-1.5 rounded-bl-2xl shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{lang === 'bn' ? 'মূল বিবাহ লগ্ন' : 'The Wedding Day'}</span>
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Event Header & Description */}
                <div className="space-y-4 max-w-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-[#F4ECD8] border border-[#D4AF37]/40 text-[#8B181B]">
                      {getEventIcon(evt.key)}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                          0{index + 1}
                        </span>
                        <h3 className="font-bengali text-2xl sm:text-3xl font-bold text-[#8B181B]">
                          {lang === 'bn' ? evt.bengaliTitle : evt.title}
                        </h3>
                      </div>
                      <p className="font-serif italic text-xs sm:text-sm text-[#997819]">
                        {lang === 'bn' ? evt.bengaliTagline : evt.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="font-bengali text-xs sm:text-sm text-[#4A3B32] leading-relaxed">
                    {lang === 'bn' ? evt.bengaliDescription : evt.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(lang === 'bn' ? evt.bengaliHighlights : evt.highlights).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full text-[11px] bg-[#F4ECD8]/70 border border-[#D4AF37]/30 text-[#5C0C0F] font-bengali"
                      >
                        ✦ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Event Logistics (Date, Time, Venue, Attire & Calendar Button) */}
                <div className="lg:w-80 bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-[#D4AF37]/40 space-y-3.5 text-xs sm:text-sm">
                  
                  {/* Date */}
                  <div className="flex items-start gap-2.5 text-[#5C0C0F]">
                    <Calendar className="w-4 h-4 text-[#8B181B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block font-serif">
                        {lang === 'bn' ? evt.bengaliDate : evt.date}
                      </span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-2.5 text-[#5C0C0F]">
                    <Clock className="w-4 h-4 text-[#8B181B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">
                        {lang === 'bn' ? evt.bengaliTime : evt.time}
                      </span>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="flex items-start gap-2.5 text-[#5C0C0F]">
                    <MapPin className="w-4 h-4 text-[#8B181B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">
                        {lang === 'bn' ? evt.bengaliVenueName : evt.venueName}
                      </span>
                    </div>
                  </div>

                  {/* Dress Code */}
                  <div className="flex items-start gap-2.5 text-[#6B5A55] pt-1 border-t border-[#D4AF37]/20">
                    <Shirt className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] text-[#997819] font-royal uppercase tracking-wider block">
                        {lang === 'bn' ? 'পোশাক রীতি' : 'Suggested Attire'}
                      </span>
                      <span className="text-xs text-[#4A3B32] font-bengali">
                        {lang === 'bn' ? evt.bengaliDressCode : evt.dressCode}
                      </span>
                    </div>
                  </div>

                  {/* Add to Google Calendar Button */}
                  <a
                    href={createGoogleCalendarLink(evt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#8B181B] hover:bg-[#5C0C0F] text-[#F3E5AB] rounded-xl text-xs font-serif font-semibold shadow-sm transition-all duration-200"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{lang === 'bn' ? 'ক্যালেন্ডারে সেভ করুন' : 'Add to Calendar'}</span>
                  </a>

                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
