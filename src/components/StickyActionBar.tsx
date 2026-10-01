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

  const getNavLabel = (type: 'events' | 'map' | 'wishes' | 'rsvp' | 'share') => {
    if (lang === 'en') {
      const enMap = { events: 'Events', map: 'Map', wishes: 'Wishes', rsvp: 'RSVP', share: 'Share' };
      return enMap[type];
    }
    if (template.id === 'bihari_marwari' || template.id === 'royal_north') {
      const hiMap = { events: 'कार्यक्रम', map: 'स्थान', wishes: 'शुभकामनाएं', rsvp: 'उपस्थिति', share: 'शेयर' };
      return hiMap[type];
    }
    if (template.id === 'south_indian') {
      const taMap = { events: 'நிகழ்ச்சி', map: 'இடம்', wishes: 'வாழ்த்துக்கள்', rsvp: 'வருகை', share: 'பகிர்' };
      return taMap[type];
    }
    // Default Bengali
    const bnMap = { events: 'অনুষ্ঠান', map: 'ম্যাপ', wishes: 'আশীর্বাদ', rsvp: 'উপস্থিতি', share: 'শেয়ার' };
    return bnMap[type];
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
          className="flex flex-col items-center whitespace-nowrap shrink-0"
          style={{ color: colors.primary }}
        >
          <Calendar className="w-5 h-5" style={{ color: colors.primary }} />
          <span className="text-[10px] font-serif font-semibold mt-0.5 whitespace-nowrap">
            {getNavLabel('events')}
          </span>
        </button>

        <button
          onClick={() => scrollTo('venue')}
          className="flex flex-col items-center whitespace-nowrap shrink-0"
          style={{ color: colors.primary }}
        >
          <MapPin className="w-5 h-5" style={{ color: colors.primary }} />
          <span className="text-[10px] font-serif font-semibold mt-0.5 whitespace-nowrap">
            {getNavLabel('map')}
          </span>
        </button>

        <button
          onClick={() => scrollTo('wishes')}
          className="flex flex-col items-center whitespace-nowrap shrink-0"
          style={{ color: colors.primary }}
        >
          <MessageCircleHeart className="w-5 h-5" style={{ color: colors.primary }} />
          <span className="text-[10px] font-serif font-semibold mt-0.5 whitespace-nowrap">
            {getNavLabel('wishes')}
          </span>
        </button>

        <button
          onClick={() => scrollTo('rsvp')}
          className="flex flex-col items-center whitespace-nowrap shrink-0"
          style={{ color: colors.primary }}
        >
          <Users className="w-5 h-5" style={{ color: colors.primary }} />
          <span className="text-[10px] font-serif font-semibold mt-0.5 whitespace-nowrap">
            {getNavLabel('rsvp')}
          </span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center whitespace-nowrap shrink-0"
          style={{ color: colors.primary }}
        >
          <Share2 className="w-5 h-5" style={{ color: colors.accent }} />
          <span className="text-[10px] font-serif font-semibold mt-0.5 whitespace-nowrap">
            {getNavLabel('share')}
          </span>
        </button>
      </div>
    </nav>
  );
};
