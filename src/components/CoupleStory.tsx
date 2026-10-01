import React from 'react';
import { CulturalDivider, CulturalMotifBadge } from './CulturalMotifs';
import { CulturalTemplate, Language } from '../types/wedding';
import { Heart } from 'lucide-react';

interface CoupleStoryProps {
  template: CulturalTemplate;
  lang: Language;
}

export const CoupleStory: React.FC<CoupleStoryProps> = ({ template, lang }) => {
  const { groom, bride, colors } = template;

  return (
    <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="font-serif text-xs uppercase tracking-widest font-semibold" style={{ color: colors.primary }}>
            {lang === 'native' ? 'বর ও কনে / वर एवं वधू' : 'The Bride & Groom'}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif" style={{ color: colors.primary }}>
          {lang === 'native' ? 'চিরন্তন প্রণয়গাঁথা' : 'Meet The Couple'}
        </h2>
        <CulturalDivider templateId={template.id} color={colors.accent} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Groom Card */}
        <div
          className="relative rounded-3xl p-6 sm:p-8 border-2 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          style={{
            backgroundColor: colors.bgCard,
            borderColor: `${colors.accent}66`
          }}
        >
          <div>
            {/* Image with Golden Arch Frame */}
            <div
              className="relative mx-auto w-48 h-56 sm:w-56 sm:h-64 rounded-t-full rounded-b-2xl overflow-hidden border-4 shadow-lg mb-6 group-hover:scale-[1.02] transition-transform duration-500"
              style={{ borderColor: colors.accent }}
            >
              <img
                src={groom.image}
                alt={groom.name}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Groom Details */}
            <div className="text-center space-y-2">
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-serif uppercase tracking-wider font-semibold"
                style={{
                  backgroundColor: `${colors.primary}1A`,
                  color: colors.primary
                }}
              >
                {lang === 'native' ? groom.nativeRole : groom.role}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif" style={{ color: colors.primary }}>
                {lang === 'native' ? groom.nativeName : groom.name}
              </h3>
              
              <div
                className="py-3 px-4 rounded-xl border my-3 text-xs sm:text-sm leading-relaxed space-y-1"
                style={{
                  backgroundColor: `${colors.bgParchment}`,
                  borderColor: `${colors.accent}40`,
                  color: colors.textColor
                }}
              >
                <p className="font-semibold" style={{ color: colors.primary }}>
                  {lang === 'native' ? groom.nativeParents : groom.parents}
                </p>
                <p className="opacity-90">
                  {lang === 'native' ? groom.nativeGrandparents : groom.grandparents}
                </p>
              </div>

              <p className="font-serif italic text-sm px-2 leading-relaxed opacity-90" style={{ color: colors.textColor }}>
                "{lang === 'native' ? groom.nativeAbout : groom.about}"
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t text-center" style={{ borderColor: `${colors.accent}40` }}>
            <span className="text-xs tracking-wider uppercase font-semibold font-serif" style={{ color: colors.accent }}>
              📍 {groom.location}
            </span>
          </div>
        </div>

        {/* Bride Card */}
        <div
          className="relative rounded-3xl p-6 sm:p-8 border-2 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          style={{
            backgroundColor: colors.bgCard,
            borderColor: `${colors.accent}66`
          }}
        >
          <div>
            {/* Image with Golden Arch Frame */}
            <div
              className="relative mx-auto w-48 h-56 sm:w-56 sm:h-64 rounded-t-full rounded-b-2xl overflow-hidden border-4 shadow-lg mb-6 group-hover:scale-[1.02] transition-transform duration-500"
              style={{ borderColor: colors.accent }}
            >
              <img
                src={bride.image}
                alt={bride.name}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Bride Details */}
            <div className="text-center space-y-2">
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-serif uppercase tracking-wider font-semibold"
                style={{
                  backgroundColor: `${colors.primary}1A`,
                  color: colors.primary
                }}
              >
                {lang === 'native' ? bride.nativeRole : bride.role}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif" style={{ color: colors.primary }}>
                {lang === 'native' ? bride.nativeName : bride.name}
              </h3>
              
              <div
                className="py-3 px-4 rounded-xl border my-3 text-xs sm:text-sm leading-relaxed space-y-1"
                style={{
                  backgroundColor: `${colors.bgParchment}`,
                  borderColor: `${colors.accent}40`,
                  color: colors.textColor
                }}
              >
                <p className="font-semibold" style={{ color: colors.primary }}>
                  {lang === 'native' ? bride.nativeParents : bride.parents}
                </p>
                <p className="opacity-90">
                  {lang === 'native' ? bride.nativeGrandparents : bride.grandparents}
                </p>
              </div>

              <p className="font-serif italic text-sm px-2 leading-relaxed opacity-90" style={{ color: colors.textColor }}>
                "{lang === 'native' ? bride.nativeAbout : bride.about}"
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t text-center" style={{ borderColor: `${colors.accent}40` }}>
            <span className="text-xs tracking-wider uppercase font-semibold font-serif" style={{ color: colors.accent }}>
              📍 {bride.location}
            </span>
          </div>
        </div>

      </div>

      {/* Union Badge */}
      <div className="mt-8 flex justify-center items-center gap-3">
        <div className="h-[1px] w-16" style={{ backgroundColor: colors.accent }} />
        <div
          className="flex items-center gap-2 text-white px-4 py-1.5 rounded-full text-xs font-serif shadow-sm"
          style={{ backgroundColor: colors.primary }}
        >
          <Heart className="w-3.5 h-3.5 fill-current" style={{ color: colors.accent }} />
          <span>{lang === 'native' ? 'শুভ পরিণয়ের প্রতীক্ষায়' : 'Bonded in Love & Heritage'}</span>
        </div>
        <div className="h-[1px] w-16" style={{ backgroundColor: colors.accent }} />
      </div>
    </section>
  );
};
