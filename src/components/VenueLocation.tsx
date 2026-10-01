import React from 'react';
import { venueDetails } from '../data/weddingData';
import { Language } from '../types/wedding';
import { AlponaDivider, ShankhoIcon } from './AlponaMotifs';
import { MapPin, Navigation, Car, PhoneCall, ExternalLink } from 'lucide-react';

interface VenueLocationProps {
  lang: Language;
}

export const VenueLocation: React.FC<VenueLocationProps> = ({ lang }) => {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto" id="venue">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-[#8B181B]" />
          <span className="font-royal text-xs uppercase tracking-widest text-[#8B181B] font-semibold">
            {lang === 'bn' ? 'অনুষ্ঠানস্থল ও অবস্থান' : 'Venue & Directions'}
          </span>
          <MapPin className="w-5 h-5 text-[#8B181B]" />
        </div>
        <h2 className="font-bengali text-3xl sm:text-4xl text-[#8B181B] font-bold">
          {lang === 'bn' ? 'কীভাবে পৌঁছাবেন' : 'Our Wedding Venue'}
        </h2>
        <AlponaDivider className="my-3 max-w-xs mx-auto" />
      </div>

      <div className="bg-gradient-to-b from-[#FFFDF9] to-[#FBF7EE] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/50 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Venue Information Column */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="px-3 py-1 bg-[#8B181B]/10 text-[#8B181B] font-royal text-xs font-semibold rounded-full uppercase tracking-wider">
                {lang === 'bn' ? 'প্রধান বিবাহ বাসর' : 'The Celebration Grounds'}
              </span>
              <h3 className="font-bengali text-2xl sm:text-3xl font-bold text-[#8B181B] mt-2">
                {lang === 'bn' ? venueDetails.bengaliName : venueDetails.name}
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#4A3B32]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#8B181B] shrink-0 mt-0.5" />
                <p className="font-bengali leading-relaxed">
                  {lang === 'bn' ? venueDetails.bengaliAddress : venueDetails.address}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 text-[#997819] shrink-0 mt-0.5" />
                <p className="font-bengali text-[#5C0C0F]">
                  <strong className="text-[#8B181B]">{lang === 'bn' ? 'ল্যান্ডমার্ক: ' : 'Landmark: '}</strong>
                  {lang === 'bn' ? venueDetails.bengaliLandmark : venueDetails.landmark}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 text-[#997819] shrink-0 mt-0.5" />
                <p className="font-bengali text-[#5C0C0F]">
                  <strong className="text-[#8B181B]">{lang === 'bn' ? 'পার্কিং: ' : 'Parking: '}</strong>
                  {lang === 'bn' ? venueDetails.bengaliParking : venueDetails.parking}
                </p>
              </div>
            </div>

            {/* Direct Google Maps Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={venueDetails.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#8B181B] hover:bg-[#5C0C0F] text-[#F3E5AB] font-serif font-bold text-sm rounded-xl shadow-md transition-all duration-200"
              >
                <Navigation className="w-4 h-4 text-[#D4AF37]" />
                <span>{lang === 'bn' ? 'গুগল ম্যাপে দিকনির্দেশ' : 'Open in Google Maps'}</span>
              </a>

              <a
                href={`https://m.uber.com/ul/?action=setPickup&client_id=uber&pickup=my_location&dropoff[formatted_address]=Raajkutir%20Kolkata`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#F4ECD8] hover:bg-[#EBDDC0] text-[#5C0C0F] font-serif text-sm font-semibold rounded-xl border border-[#D4AF37]/50 transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4 text-[#8B181B]" />
                <span>{lang === 'bn' ? 'ক্যাব বুক করুন' : 'Book Uber / Ola'}</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-7 h-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-inner relative group">
            <iframe
              title="Wedding Venue Location Map"
              src={venueDetails.embedUrl}
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-2 right-2 pointer-events-none bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-[11px] font-serif text-[#8B181B] border border-[#D4AF37]/40 shadow-sm">
              Raajkutir, Kolkata
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
