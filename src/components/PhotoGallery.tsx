import React from 'react';
import { CulturalTemplate, Language } from '../types/wedding';
import { CulturalDivider } from './CulturalMotifs';
import { Camera } from 'lucide-react';

interface PhotoGalleryProps {
  template: CulturalTemplate;
  lang: Language;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ template, lang }) => {
  const { colors } = template;

  const photos = [
    {
      url: template.groom.image,
      caption: lang === 'native' ? 'প্রথম দৃষ্টি ও অনুরাগের সূচনা' : 'When Eyes Met — The Beginning',
      location: template.groom.location
    },
    {
      url: template.bride.image,
      caption: lang === 'native' ? 'স্নিগ্ধ সৌন্দর্য ও ঐতিহ্য' : 'Grace in Timeless Attire',
      location: template.bride.location
    },
    {
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      caption: lang === 'native' ? 'একসাথে আগামীর স্বপ্ন আঁকা' : 'Laughter and Shared Dreams',
      location: template.venue.name
    },
    {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      caption: lang === 'native' ? 'চিরতরে বাঁধার ক্ষণ' : 'Two Souls, One Lifetime',
      location: 'Celebration Grounds'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto" id="gallery">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Camera className="w-5 h-5" style={{ color: colors.primary }} />
          <span className="font-serif text-xs uppercase tracking-widest font-semibold" style={{ color: colors.primary }}>
            {lang === 'native' ? 'মধুর মুহূর্তমালা / यादें' : 'Moments of Love'}
          </span>
          <Camera className="w-5 h-5" style={{ color: colors.primary }} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif" style={{ color: colors.primary }}>
          {lang === 'native' ? 'আমাদের ভালোবাসার খেরোখাতা' : 'Pre-Wedding Glimpses'}
        </h2>
        <CulturalDivider templateId={template.id} color={colors.accent} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((item, idx) => (
          <div
            key={idx}
            className="group relative bg-white rounded-2xl p-2.5 border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            style={{ borderColor: `${colors.accent}66` }}
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3">
              <img
                src={item.url}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-[11px] font-serif text-white">
                  📍 {item.location}
                </span>
              </div>
            </div>

            <div className="text-center px-1 pb-1">
              <p className="font-serif text-xs sm:text-sm font-semibold truncate" style={{ color: colors.primary }}>
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
