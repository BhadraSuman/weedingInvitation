import React from 'react';
import { Language } from '../types/wedding';
import { Calendar, MapPin, MessageCircleHeart, Users, Share2 } from 'lucide-react';

interface StickyActionBarProps {
  lang: Language;
}

export const StickyActionBar: React.FC<StickyActionBarProps> = ({ lang }) => {
  const handleShare = async () => {
    const shareData = {
      title: 'শুভ বিবাহ | Anirban & Deboleena Wedding Invitation',
      text: 'You are cordially invited to the wedding celebration of Anirban & Deboleena. Tap the link to view the invitation.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'bn' ? 'লিঙ্ক কপি করা হয়েছে!' : 'Invitation link copied to clipboard!');
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav aria-label="Mobile Navigation" className="fixed bottom-0 inset-x-0 z-40 bg-[#FBF7EE]/95 backdrop-blur-md border-t border-[#D4AF37]/50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] py-2 px-3 sm:hidden">
      <div className="flex items-center justify-around">
        <button
          onClick={() => scrollTo('events')}
          className="flex flex-col items-center text-[#5C0C0F] hover:text-[#8B181B]"
        >
          <Calendar className="w-5 h-5 text-[#8B181B]" />
          <span className="text-[10px] font-bengali font-semibold mt-0.5">
            {lang === 'bn' ? 'অনুষ্ঠান' : 'Events'}
          </span>
        </button>

        <button
          onClick={() => scrollTo('venue')}
          className="flex flex-col items-center text-[#5C0C0F] hover:text-[#8B181B]"
        >
          <MapPin className="w-5 h-5 text-[#8B181B]" />
          <span className="text-[10px] font-bengali font-semibold mt-0.5">
            {lang === 'bn' ? 'ম্যাপ' : 'Map'}
          </span>
        </button>

        <button
          onClick={() => scrollTo('wishes')}
          className="flex flex-col items-center text-[#5C0C0F] hover:text-[#8B181B]"
        >
          <MessageCircleHeart className="w-5 h-5 text-[#8B181B]" />
          <span className="text-[10px] font-bengali font-semibold mt-0.5">
            {lang === 'bn' ? 'আশীর্বাদ' : 'Wishes'}
          </span>
        </button>

        <button
          onClick={() => scrollTo('rsvp')}
          className="flex flex-col items-center text-[#5C0C0F] hover:text-[#8B181B]"
        >
          <Users className="w-5 h-5 text-[#8B181B]" />
          <span className="text-[10px] font-bengali font-semibold mt-0.5">
            {lang === 'bn' ? 'উপস্থিতি' : 'RSVP'}
          </span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center text-[#5C0C0F] hover:text-[#8B181B]"
        >
          <Share2 className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-[10px] font-bengali font-semibold mt-0.5">
            {lang === 'bn' ? 'শেয়ার' : 'Share'}
          </span>
        </button>
      </div>
    </nav>
  );
};
