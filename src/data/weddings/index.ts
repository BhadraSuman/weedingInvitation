import { CulturalTemplate, EventCategory } from '../../types/wedding';
import { bengaliTemplate } from '../templates/bengaliTemplate';
import { bihariMarwariTemplate } from '../templates/bihariMarwariTemplate';
import { annaprashanTemplate } from '../templates/annaprashanTemplate';
import { birthdayTemplate } from '../templates/birthdayTemplate';
import { chibi3dTemplate } from '../templates/chibi3dTemplate';
import { bollywoodPremiereTemplate } from '../templates/bollywoodPremiereTemplate';
import { weddingGazetteTemplate } from '../templates/weddingGazetteTemplate';
import { vivahExpressTemplate } from '../templates/vivahExpressTemplate';
import { mithilaTemplate } from '../templates/mithilaTemplate';
import { potKathaTemplate } from '../templates/potKathaTemplate';
import { sholaTemplate } from '../templates/sholaTemplate';
import { punjabTemplate } from '../templates/punjabTemplate';

export interface EventSlugEntry {
  slug: string;
  title: string;
  coupleNames: string;
  category: EventCategory;
  cultureType: string;
  cultureName: string;
  badgeEmoji: string;
  template: CulturalTemplate;
  previewImage: string;
}

// Backward compatibility alias
export type WeddingSlugEntry = EventSlugEntry;

export const weddingsRegistry: Record<string, EventSlugEntry> = {
  'anirban-weds-deboleena': {
    slug: 'anirban-weds-deboleena',
    title: 'Anirban & Deboleena — Bengali Wedding Invitation',
    coupleNames: 'Anirban & Deboleena',
    category: 'wedding',
    cultureType: 'bengali',
    cultureName: 'বাঙালি শুভ বিবাহ (Bengali Lagna Patrika)',
    badgeEmoji: '🪔',
    template: bengaliTemplate,
    previewImage: '/images/couples/bengali-couple.jpg'
  },
  'sandeep-weds-priya': {
    slug: 'sandeep-weds-priya',
    title: 'Sandeep & Priya — Shubh Vivah — North Indian Wedding Invitation',
    coupleNames: 'Sandeep & Priya',
    category: 'wedding',
    cultureType: 'bihari_marwari',
    cultureName: 'शुभ विवाह — उत्तर भारतीय परंपरा (North Indian Vivah)',
    badgeEmoji: '🚩',
    template: bihariMarwariTemplate,
    previewImage: '/images/couples/north-couple.jpg'
  },
  'kunal-weds-shreya': {
    slug: 'kunal-weds-shreya',
    title: 'Kunal & Shreya — 3D Animated Royal Vivah Celebration',
    coupleNames: 'Kunal & Shreya',
    category: 'wedding',
    cultureType: 'chibi_3d',
    cultureName: '3D कार्टून एवं एनिमेटेड विवाह (3D Pixar Style)',
    badgeEmoji: '✨',
    template: chibi3dTemplate,
    previewImage: '/images/couples/chibi_couple.jpg'
  },
  'aarav-annaprashan': {
    slug: 'aarav-annaprashan',
    title: 'Baby Aarav — Bengali Mukhe Bhaat & Annaprashan Invitation',
    coupleNames: 'Baby Aarav Roy',
    category: 'annaprashan',
    cultureType: 'annaprashan',
    cultureName: 'শুভ অন্নপ্রাশন ও মুখে ভাত (First Rice Ceremony)',
    badgeEmoji: '🥣',
    template: annaprashanTemplate,
    previewImage: '/images/couples/baby-aarav.jpg'
  },
  'ananya-turns-1': {
    slug: 'ananya-turns-1',
    title: 'Princess Ananya Turns One — 1st Birthday Celebration',
    coupleNames: 'Princess Ananya Sen',
    category: 'birthday',
    cultureType: 'birthday',
    cultureName: 'প্রথম শুভ জন্মদিন উৎসব (1st Birthday Gala)',
    badgeEmoji: '🎂',
    template: birthdayTemplate,
    previewImage: '/images/couples/princess-ananya.jpg'
  },
  'the-grand-premiere': {
    slug: 'the-grand-premiere',
    title: 'The Grand Premiere — Bollywood & OTT Wedding Celebration',
    coupleNames: 'Anirban & Deboleena',
    category: 'wedding',
    cultureType: 'bollywood_premiere',
    cultureName: 'बॉलीवुड ब्लॉकबस्टर वेडिंग (Shaadi Originals)',
    badgeEmoji: '🎬',
    template: bollywoodPremiereTemplate,
    previewImage: '/images/couples/bollywood_poster.jpg'
  },
  'the-wedding-gazette': {
    slug: 'the-wedding-gazette',
    title: 'The Wedding Gazette — Vintage Broadsheet Wedding Invitation',
    coupleNames: 'Anirban & Deboleena',
    category: 'wedding',
    cultureType: 'wedding_gazette',
    cultureName: 'ঐতিহাসিক বিয়ের খবরের কাগজ (Vintage Broadsheet)',
    badgeEmoji: '📰',
    template: weddingGazetteTemplate,
    previewImage: '/images/couples/vintage_gazette.jpg'
  },
  'vivah-express': {
    slug: 'vivah-express',
    title: 'Vivah Express — Indian Railway Boarding Pass Invitation',
    coupleNames: 'Sandeep & Priya',
    category: 'wedding',
    cultureType: 'vivah_express',
    cultureName: 'शाही रेल बोर्डिंग पास (IRCTC Special Express)',
    badgeEmoji: '🚂',
    template: vivahExpressTemplate,
    previewImage: '/images/couples/north-couple.jpg'
  },
  'mithila-vivah': {
    slug: 'mithila-vivah',
    title: 'Mithila Vivah — Madhubani Folk Art Wedding Invitation',
    coupleNames: 'Abhishek & Maithili',
    category: 'wedding',
    cultureType: 'mithila',
    cultureName: 'मिथिला विवाह (Madhubani Kohbar Heritage)',
    badgeEmoji: '🦚',
    template: mithilaTemplate,
    previewImage: '/images/couples/north-couple.jpg'
  },
  'pot-katha': {
    slug: 'pot-katha',
    title: 'Pot Katha — Kalighat Patachitra Wedding Scroll',
    coupleNames: 'Debashish & Aditi',
    category: 'wedding',
    cultureType: 'pot_katha',
    cultureName: 'কালীঘাট পটচিত্র বিবাহগাঁথা (Kalighat Scroll)',
    badgeEmoji: '📜',
    template: potKathaTemplate,
    previewImage: '/images/couples/bengali-couple.jpg'
  },
  'shola': {
    slug: 'shola',
    title: 'Shola — Bengali Minimal-Luxury Wedding Invitation',
    coupleNames: 'Anindya & Mahashweta',
    category: 'wedding',
    cultureType: 'shola',
    cultureName: 'শোভা (Shola Minimal Luxury)',
    badgeEmoji: '🤍',
    template: sholaTemplate,
    previewImage: '/images/couples/bengali_cinematic.jpg'
  },
  'rangla-punjab': {
    slug: 'rangla-punjab',
    title: 'Rangla Punjab — Loud & Joyful Punjabi Wedding Invitation',
    coupleNames: 'Manpreet & Simran',
    category: 'wedding',
    cultureType: 'rangla_punjab',
    cultureName: 'ਰੰਗਲਾ ਪੰਜਾਬ (Dhol & Dhamaka)',
    badgeEmoji: '🥁',
    template: punjabTemplate,
    previewImage: '/images/couples/north-couple.jpg'
  }
};

export const getWeddingBySlug = (slug: string): EventSlugEntry | null => {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();
  
  if (cleanSlug in weddingsRegistry) {
    return weddingsRegistry[cleanSlug];
  }

  // Handy short aliases
  if (cleanSlug === 'bengali' || cleanSlug === 'bengali-demo' || cleanSlug === 'anirban') {
    return weddingsRegistry['anirban-weds-deboleena'];
  }
  if (cleanSlug === 'bihari' || cleanSlug === 'marwari' || cleanSlug === 'North Indian-demo' || cleanSlug === 'sandeep') {
    return weddingsRegistry['sandeep-weds-priya'];
  }
  if (cleanSlug === 'chibi' || cleanSlug === '3d' || cleanSlug === 'chibi-3d' || cleanSlug === 'kunal' || cleanSlug === 'animated') {
    return weddingsRegistry['kunal-weds-shreya'];
  }
  if (cleanSlug === 'annaprashan' || cleanSlug === 'mukhebhaat' || cleanSlug === 'mukhe-bhaat' || cleanSlug === 'aarav') {
    return weddingsRegistry['aarav-annaprashan'];
  }
  if (cleanSlug === 'birthday' || cleanSlug === 'ananya' || cleanSlug === '1st-birthday' || cleanSlug === 'janmadin') {
    return weddingsRegistry['ananya-turns-1'];
  }
  if (cleanSlug === 'premiere' || cleanSlug === 'bollywood' || cleanSlug === 'the-grand-premiere' || cleanSlug === 'shaadi-originals' || cleanSlug === 'ott' || cleanSlug === 'movie') {
    return weddingsRegistry['the-grand-premiere'];
  }
  if (cleanSlug === 'gazette' || cleanSlug === 'newspaper' || cleanSlug === 'the-wedding-gazette' || cleanSlug === 'broadsheet' || cleanSlug === 'vintage-newspaper') {
    return weddingsRegistry['the-wedding-gazette'];
  }
  if (cleanSlug === 'express' || cleanSlug === 'train' || cleanSlug === 'railway' || cleanSlug === 'vivah-express' || cleanSlug === 'boarding-pass' || cleanSlug === 'irctc') {
    return weddingsRegistry['vivah-express'];
  }
  if (cleanSlug === 'mithila' || cleanSlug === 'madhubani' || cleanSlug === 'mithila-vivah' || cleanSlug === 'abhishek-weds-maithili' || cleanSlug === 'abhishek') {
    return weddingsRegistry['mithila-vivah'];
  }
  if (cleanSlug === 'pot-katha' || cleanSlug === 'potkatha' || cleanSlug === 'patachitra' || cleanSlug === 'debashish-weds-aditi' || cleanSlug === 'kalighat' || cleanSlug === 'debashish') {
    return weddingsRegistry['pot-katha'];
  }
  if (cleanSlug === 'shola' || cleanSlug === 'sholapith' || cleanSlug === 'anindya-weds-mahashweta' || cleanSlug === 'anindya' || cleanSlug === 'minimal-bengali') {
    return weddingsRegistry['shola'];
  }
  if (cleanSlug === 'rangla-punjab' || cleanSlug === 'punjab' || cleanSlug === 'punjabi' || cleanSlug === 'manpreet-weds-simran' || cleanSlug === 'manpreet' || cleanSlug === 'dhol') {
    return weddingsRegistry['rangla-punjab'];
  }

  return null;
};



