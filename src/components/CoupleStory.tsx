import React from 'react';
import { groomData, brideData } from '../data/weddingData';
import { ToporMukutIcon, PaanPataIcon, AlponaDivider } from './AlponaMotifs';
import { Language } from '../types/wedding';
import { Heart } from 'lucide-react';

interface CoupleStoryProps {
  lang: Language;
}

export const CoupleStory: React.FC<CoupleStoryProps> = ({ lang }) => {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <PaanPataIcon className="w-6 h-6" />
          <span className="font-royal text-xs uppercase tracking-widest text-[#8B181B] font-semibold">
            {lang === 'bn' ? 'বর ও কনে পরিচিতি' : 'The Bride & Groom'}
          </span>
          <PaanPataIcon className="w-6 h-6" />
        </div>
        <h2 className="font-bengali text-3xl sm:text-4xl text-[#8B181B] font-bold">
          {lang === 'bn' ? 'চিরন্তন প্রণয়গাঁথা' : 'Meet The Couple'}
        </h2>
        <AlponaDivider className="my-3 max-w-xs mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Groom Card */}
        <div className="relative bg-gradient-to-b from-[#FFFDF9] to-[#FBF7EE] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
          {/* Decorative Corner Notch */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#8B181B]/10 rounded-bl-full pointer-events-none" />

          <div>
            {/* Image with Golden Arch Frame */}
            <div className="relative mx-auto w-48 h-56 sm:w-56 sm:h-64 rounded-t-full rounded-b-2xl overflow-hidden border-4 border-[#D4AF37] shadow-lg mb-6 group-hover:scale-[1.02] transition-transform duration-500">
              <img
                src={groomData.image}
                alt={groomData.name}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/40 via-transparent to-transparent" />
            </div>

            {/* Groom Details */}
            <div className="text-center space-y-2">
              <div className="inline-block px-3 py-1 rounded-full bg-[#8B181B]/10 text-[#8B181B] font-serif text-xs uppercase tracking-wider font-semibold">
                {lang === 'bn' ? groomData.bengaliRole : groomData.role}
              </div>
              <h3 className="font-bengali text-2xl sm:text-3xl text-[#8B181B] font-bold">
                {lang === 'bn' ? groomData.bengaliName : groomData.name}
              </h3>
              
              <div className="py-3 px-4 bg-[#F4ECD8]/60 rounded-xl border border-[#D4AF37]/30 my-3 text-xs sm:text-sm text-[#5C0C0F] font-bengali leading-relaxed space-y-1">
                <p className="font-semibold text-[#8B181B]">
                  {lang === 'bn' ? groomData.bengaliParents : groomData.parents}
                </p>
                <p className="opacity-90">
                  {lang === 'bn' ? groomData.bengaliGrandparents : groomData.grandparents}
                </p>
              </div>

              <p className="font-serif italic text-sm text-[#4A3B32] px-2 leading-relaxed">
                "{lang === 'bn' ? groomData.bengaliAbout : groomData.about}"
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#D4AF37]/30 text-center">
            <span className="font-royal text-xs text-[#997819] tracking-wider uppercase font-semibold">
              📍 {groomData.location}
            </span>
          </div>
        </div>

        {/* Bride Card */}
        <div className="relative bg-gradient-to-b from-[#FFFDF9] to-[#FBF7EE] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
          {/* Decorative Corner Notch */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#8B181B]/10 rounded-bl-full pointer-events-none" />

          <div>
            {/* Image with Golden Arch Frame */}
            <div className="relative mx-auto w-48 h-56 sm:w-56 sm:h-64 rounded-t-full rounded-b-2xl overflow-hidden border-4 border-[#D4AF37] shadow-lg mb-6 group-hover:scale-[1.02] transition-transform duration-500">
              <img
                src={brideData.image}
                alt={brideData.name}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/40 via-transparent to-transparent" />
            </div>

            {/* Bride Details */}
            <div className="text-center space-y-2">
              <div className="inline-block px-3 py-1 rounded-full bg-[#8B181B]/10 text-[#8B181B] font-serif text-xs uppercase tracking-wider font-semibold">
                {lang === 'bn' ? brideData.bengaliRole : brideData.role}
              </div>
              <h3 className="font-bengali text-2xl sm:text-3xl text-[#8B181B] font-bold">
                {lang === 'bn' ? brideData.bengaliName : brideData.name}
              </h3>
              
              <div className="py-3 px-4 bg-[#F4ECD8]/60 rounded-xl border border-[#D4AF37]/30 my-3 text-xs sm:text-sm text-[#5C0C0F] font-bengali leading-relaxed space-y-1">
                <p className="font-semibold text-[#8B181B]">
                  {lang === 'bn' ? brideData.bengaliParents : brideData.parents}
                </p>
                <p className="opacity-90">
                  {lang === 'bn' ? brideData.bengaliGrandparents : brideData.grandparents}
                </p>
              </div>

              <p className="font-serif italic text-sm text-[#4A3B32] px-2 leading-relaxed">
                "{lang === 'bn' ? brideData.bengaliAbout : brideData.about}"
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#D4AF37]/30 text-center">
            <span className="font-royal text-xs text-[#997819] tracking-wider uppercase font-semibold">
              📍 {brideData.location}
            </span>
          </div>
        </div>

      </div>

      {/* Union Badge */}
      <div className="mt-8 flex justify-center items-center gap-3">
        <div className="h-[1px] w-16 bg-[#D4AF37]" />
        <div className="flex items-center gap-2 bg-[#8B181B] text-[#F3E5AB] px-4 py-1.5 rounded-full text-xs font-serif shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
          <span>{lang === 'bn' ? 'শুভ পরিণয়ের প্রতীক্ষায়' : 'Bonded in Love & Heritage'}</span>
        </div>
        <div className="h-[1px] w-16 bg-[#D4AF37]" />
      </div>
    </section>
  );
};
