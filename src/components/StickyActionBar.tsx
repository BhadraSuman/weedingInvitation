import React from 'react';
import { CulturalTemplate, Language } from '../types/wedding';
import { Calendar, MapPin, MessageCircleHeart, Users, Share2 } from 'lucide-react';

interface StickyActionBarProps {
  template: CulturalTemplate;
  lang: Language;
}

export const StickyActionBar: React.FC<StickyActionBarProps> = ({ template, lang }) => {
  const { colors } = template;

  const handleShare = async () => {
    const shareData = {
      title: `${template.quotes.weddingTitle} | ${template.groom.name} & ${template.bride.name}`,
      text: `You are cordially invited to the wedding celebration of ${template.groom.name} & ${template.bride.name}.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'native' ? 'লিঙ্ক কপি সম্পন্ন!' : 'Invitation link copied to clipboard!');
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 backdrop-blur-md border-t shadow-[0_-4px_20px_rgba(0,0,0,0.08)] py-2 px-3 sm:hidden"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: `${colors.accent}66`
      }}
    >
      <div className="flex items-center justify-around">
        <button
          onClick={() => scrollTo('events')}
          className="flex flex-col items-center"
          style={{ color: colors.primary }}
        >
          <Calendar className="w-5 h-5" style={{ color: colors.primary }} />
          <span className="text-[10px] font-serif font-semibold mt-0.5">
            {lang === 'native' ? 'অনুষ্ঠান' : 'Events'}
          </span>
        </button>

        <button
          onClick={() => scrollTo('venue')}
          className="flex flex-col items-center"
          style={{ color: colors.primary }}
        >
          <MapPin className="w-5 h-5" style={{ color: colors.primary }} />
          <span className="text-[10px] font-serif font-semibold mt-0.5">
            {lang === 'native' ? 'ম্যাপ' : 'Map'}
          </span>
        </button>

        <button
          onClick={() => scrollTo('wishes')}
          className="flex flex-col items-center"
          style={{ color: colors.primary }}
        >
          <MessageCircleHeart className="w-5 h-5" style={{ color: colors.primary }} />
          <span className="text-[10px] font-serif font-semibold mt-0.5">
            {lang === 'native' ? 'আশীর্বাদ' : 'Wishes'}
          </span>
        </button>

        <button
          onClick={() => scrollTo('rsvp')}
          className="flex flex-col items-center"
          style={{ color: colors.primary }}
        >
          <Users className="w-5 h-5" style={{ color: colors.primary }} />
          <span className="text-[10px] font-serif font-semibold mt-0.5">
            {lang === 'native' ? 'উপস্থিতি' : 'RSVP'}
          </span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center"
          style={{ color: colors.primary }}
        >
          <Share2 className="w-5 h-5" style={{ color: colors.accent }} />
          <span className="text-[10px] font-serif font-semibold mt-0.5">
            {lang === 'native' ? 'শেয়ার' : 'Share'}
          </span>
        </button>
      </div>
    </nav>
  );
};
