import React from 'react';
import { CulturalTemplate, Language, WeddingEvent } from '../types/wedding';
import { CulturalDivider, CulturalMotifBadge } from './CulturalMotifs';
import { Calendar, Clock, MapPin, Sparkles, Shirt } from 'lucide-react';

interface EventsTimelineProps {
  template: CulturalTemplate;
  lang: Language;
}

// Generate Google Calendar Link
const createGoogleCalendarLink = (event: WeddingEvent, template: CulturalTemplate): string => {
  const times = event.calendarTimes || { start: '20261128T130000Z', end: '20261128T190000Z' };
  const title = encodeURIComponent(`${event.title} - ${template.groom.name} & ${template.bride.name} Wedding`);
  const details = encodeURIComponent(`${event.description}\n\nDress Code: ${event.dressCode}`);
  const location = encodeURIComponent(`${event.venueName}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${times.start}/${times.end}&details=${details}&location=${location}`;
};

export const EventsTimeline: React.FC<EventsTimelineProps> = ({ template, lang }) => {
  const { colors, events } = template;

  return (
    <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto" id="events">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="font-serif text-xs uppercase tracking-widest font-semibold" style={{ color: colors.primary }}>
            {lang === 'native' ? 'মাঙ্গলিক অনুষ্ঠানসূচী / कार्यक्रम' : 'Wedding Itinerary'}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif" style={{ color: colors.primary }}>
          {lang === 'native' ? 'শুভ উৎসবের দিনপঞ্জী' : 'Celebration Schedule'}
        </h2>
        <CulturalDivider templateId={template.id} color={colors.accent} />
        <p className="text-xs sm:text-sm font-serif max-w-md mx-auto opacity-80" style={{ color: colors.textColor }}>
          {lang === 'native'
            ? 'প্রতিটি মাঙ্গলিক ক্ষণে আপনাদের উপস্থিতি আমাদের আনন্দকে বহুগুণ বাড়িয়ে তুলবে।'
            : 'Join us across every ritual as we celebrate eternal love and timeless traditions.'}
        </p>
      </div>

      {/* Timeline Grid */}
      <div className="space-y-8">
        {events.map((evt, index) => {
          const isMainDay = index === events.length - 2 || index === events.length - 1;

          return (
            <div
              key={evt.id}
              className="relative rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl overflow-hidden border-2 shadow-md"
              style={{
                backgroundColor: colors.bgCard,
                borderColor: isMainDay ? colors.primary : `${colors.accent}66`
              }}
            >
              {/* Badge for Main Wedding Event */}
              {isMainDay && (
                <div
                  className="absolute top-0 right-0 font-serif text-[11px] font-bold tracking-widest uppercase px-5 py-1.5 rounded-bl-2xl shadow-sm flex items-center gap-1.5 text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Sparkles className="w-3.5 h-3.5" style={{ color: colors.accentLight }} />
                  <span>{lang === 'native' ? 'প্রধান লগ্ন' : 'Special Event'}</span>
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Event Header & Description */}
                <div className="space-y-4 max-w-xl">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-3 rounded-2xl border flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: colors.bgParchment,
                        borderColor: `${colors.accent}66`
                      }}
                    >
                      <CulturalMotifBadge templateId={template.id} className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-xs font-bold uppercase tracking-wider" style={{ color: colors.accent }}>
                          0{index + 1}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold font-serif" style={{ color: colors.primary }}>
                          {lang === 'native' ? evt.nativeTitle : evt.title}
                        </h3>
                      </div>
                      <p className="font-serif italic text-xs sm:text-sm opacity-90" style={{ color: colors.primary }}>
                        {lang === 'native' ? evt.nativeTagline : evt.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed font-serif opacity-90" style={{ color: colors.textColor }}>
                    {lang === 'native' ? evt.nativeDescription : evt.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(lang === 'native' ? evt.nativeHighlights : evt.highlights).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full text-[11px] border font-serif"
                        style={{
                          backgroundColor: colors.bgParchment,
                          borderColor: `${colors.accent}4D`,
                          color: colors.primary
                        }}
                      >
                        ✦ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Event Logistics (Date, Time, Venue, Attire & Calendar Button) */}
                <div
                  className="lg:w-80 rounded-2xl p-5 border space-y-3.5 text-xs sm:text-sm shadow-sm"
                  style={{
                    backgroundColor: colors.bgParchment,
                    borderColor: `${colors.accent}66`
                  }}
                >
                  {/* Date */}
                  <div className="flex items-start gap-2.5" style={{ color: colors.primary }}>
                    <Calendar className="w-4 h-4 shrink-0 mt-0.5" style={{ color: colors.primary }} />
                    <span className="font-semibold block font-serif">
                      {lang === 'native' ? evt.nativeDate : evt.date}
                    </span>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-2.5" style={{ color: colors.primary }}>
                    <Clock className="w-4 h-4 shrink-0 mt-0.5" style={{ color: colors.primary }} />
                    <span className="font-semibold block font-serif">
                      {lang === 'native' ? evt.nativeTime : evt.time}
                    </span>
                  </div>

                  {/* Venue */}
                  <div className="flex items-start gap-2.5" style={{ color: colors.primary }}>
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: colors.primary }} />
                    <span className="font-semibold block font-serif">
                      {lang === 'native' ? evt.nativeVenueName : evt.venueName}
                    </span>
                  </div>

                  {/* Dress Code */}
                  <div className="flex items-start gap-2.5 pt-1 border-t" style={{ borderColor: `${colors.accent}40` }}>
                    <Shirt className="w-4 h-4 shrink-0 mt-0.5" style={{ color: colors.accent }} />
                    <div>
                      <span className="text-[11px] font-serif uppercase tracking-wider block font-semibold" style={{ color: colors.accent }}>
                        {lang === 'native' ? 'পোশাক রীতি / Attire' : 'Suggested Attire'}
                      </span>
                      <span className="text-xs font-serif opacity-90" style={{ color: colors.textColor }}>
                        {lang === 'native' ? evt.nativeDressCode : evt.dressCode}
                      </span>
                    </div>
                  </div>

                  {/* Add to Google Calendar Button */}
                  <a
                    href={createGoogleCalendarLink(evt, template)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2 px-3 text-white rounded-xl text-xs font-serif font-semibold shadow-sm transition-opacity hover:opacity-90 whitespace-nowrap"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Calendar className="w-3.5 h-3.5" style={{ color: colors.accentLight }} />
                    <span>{lang === 'native' ? 'ক্যালেন্ডারে সেভ করুন' : 'Add to Calendar'}</span>
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
