import { CulturalTemplate, EventCategory } from '../../types/wedding';
import { bengaliTemplate } from '../templates/bengaliTemplate';
import { bihariMarwariTemplate } from '../templates/bihariMarwariTemplate';
import { annaprashanTemplate } from '../templates/annaprashanTemplate';
import { birthdayTemplate } from '../templates/birthdayTemplate';
import { chibi3dTemplate } from '../templates/chibi3dTemplate';
import { bollywoodPremiereTemplate } from '../templates/bollywoodPremiereTemplate';
import { weddingGazetteTemplate } from '../templates/weddingGazetteTemplate';
import { vivahExpressTemplate } from '../templates/vivahExpressTemplate';

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

  return null;
};
