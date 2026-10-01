import React from 'react';
import { CulturalTemplate, Language } from '../types/wedding';
import { CulturalDivider } from './CulturalMotifs';
import { MapPin, Navigation, Car, ExternalLink } from 'lucide-react';

interface VenueLocationProps {
  template: CulturalTemplate;
  lang: Language;
}

export const VenueLocation: React.FC<VenueLocationProps> = ({ template, lang }) => {
  const { venue, colors } = template;

  return (
    <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto" id="venue">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="font-serif text-xs uppercase tracking-widest font-semibold" style={{ color: colors.primary }}>
            {lang === 'native' ? 'অনুষ্ঠানস্থল ও অবস্থান / स्थल' : 'Venue & Directions'}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif" style={{ color: colors.primary }}>
          {lang === 'native' ? 'কীভাবে পৌঁছাবেন' : 'Our Wedding Venue'}
        </h2>
        <CulturalDivider templateId={template.id} color={colors.accent} />
      </div>

      <div
        className="rounded-3xl p-6 sm:p-8 border-2 shadow-xl overflow-hidden"
        style={{
          backgroundColor: colors.bgCard,
          borderColor: `${colors.accent}66`
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Venue Information Column */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span
                className="px-3 py-1 font-serif text-xs font-semibold rounded-full uppercase tracking-wider inline-block"
                style={{
                  backgroundColor: `${colors.primary}1A`,
                  color: colors.primary
                }}
              >
                {lang === 'native' ? 'প্রধান বিবাহ বাসর' : 'The Celebration Grounds'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif mt-2" style={{ color: colors.primary }}>
                {lang === 'native' ? venue.nativeName : venue.name}
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm" style={{ color: colors.textColor }}>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" style={{ color: colors.primary }} />
                <p className="font-serif leading-relaxed">
                  {lang === 'native' ? venue.nativeAddress : venue.address}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 shrink-0 mt-0.5" style={{ color: colors.accent }} />
                <p className="font-serif">
                  <strong style={{ color: colors.primary }}>{lang === 'native' ? 'ল্যান্ডমার্ক: ' : 'Landmark: '}</strong>
                  {lang === 'native' ? venue.nativeLandmark : venue.landmark}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 shrink-0 mt-0.5" style={{ color: colors.accent }} />
                <p className="font-serif">
                  <strong style={{ color: colors.primary }}>{lang === 'native' ? 'পার্কিং: ' : 'Parking: '}</strong>
                  {lang === 'native' ? venue.nativeParking : venue.parking}
                </p>
              </div>
            </div>

            {/* Direct Google Maps Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-white font-serif font-bold text-sm rounded-xl shadow-md transition-opacity hover:opacity-90"
                style={{ backgroundColor: colors.primary }}
              >
                <Navigation className="w-4 h-4" style={{ color: colors.accentLight }} />
                <span>{lang === 'native' ? 'গুগল ম্যাপে দিকনির্দেশ' : 'Open in Google Maps'}</span>
              </a>

              <a
                href={`https://m.uber.com/ul/?action=setPickup&client_id=uber&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(venue.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: colors.bgParchment,
                  borderColor: `${colors.accent}66`,
                  color: colors.primary
                }}
              >
                <ExternalLink className="w-4 h-4" style={{ color: colors.primary }} />
                <span>{lang === 'native' ? 'ক্যাব বুক করুন' : 'Book Ride'}</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div
            className="lg:col-span-7 h-72 sm:h-96 rounded-2xl overflow-hidden border-2 shadow-inner relative group"
            style={{ borderColor: `${colors.accent}66` }}
          >
            <iframe
              title="Wedding Venue Location Map"
              src={venue.embedUrl}
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-2 right-2 pointer-events-none bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-[11px] font-serif shadow-sm">
              {venue.name}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
