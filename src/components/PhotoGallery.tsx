import React from 'react';
import { Language } from '../types/wedding';
import { AlponaDivider, ToporMukutIcon } from './AlponaMotifs';
import { Camera, Sparkles } from 'lucide-react';

interface PhotoGalleryProps {
  lang: Language;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ lang }) => {
  const photos = [
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      caption: lang === 'bn' ? "প্রথম দৃষ্টি ও অনুরাগের সূচনা" : "When Eyes Met - The Beginning",
      location: "Princep Ghat, Kolkata"
    },
    {
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      caption: lang === 'bn' ? "লাল পাড় ঢাকাই ও শাঁখা-পলার মায়া" : "Elegance in Red & Ivory",
      location: "Heritage Kolkata"
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      caption: lang === 'bn' ? "একসাথে আগামীর স্বপ্ন আঁকা" : "Laughter and Promises",
      location: "Victoria Memorial Grounds"
    },
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      caption: lang === 'bn' ? "চিরতরে বাঁধার ক্ষণ" : "Two Hearts, One Soul",
      location: "Hooghly Riverfront"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto" id="gallery">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Camera className="w-5 h-5 text-[#8B181B]" />
          <span className="font-royal text-xs uppercase tracking-widest text-[#8B181B] font-semibold">
            {lang === 'bn' ? 'মধুর মুহূর্তমালা' : 'Moments of Love'}
          </span>
          <Camera className="w-5 h-5 text-[#8B181B]" />
        </div>
        <h2 className="font-bengali text-3xl sm:text-4xl text-[#8B181B] font-bold">
          {lang === 'bn' ? 'আমাদের ভালোবাসার খেরোখাতা' : 'Pre-Wedding Glimpses'}
        </h2>
        <AlponaDivider className="my-3 max-w-xs mx-auto" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((item, idx) => (
          <div
            key={idx}
            className="group relative bg-white rounded-2xl p-2.5 border border-[#D4AF37]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3">
              <img
                src={item.url}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-[11px] font-serif text-[#F3E5AB]">
                  📍 {item.location}
                </span>
              </div>
            </div>

            <div className="text-center px-1 pb-1">
              <p className="font-bengali text-xs sm:text-sm font-semibold text-[#8B181B] truncate">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
