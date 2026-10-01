import { CulturalTemplate, EventCategory } from '../../types/wedding';
import { bengaliTemplate } from '../templates/bengaliTemplate';
import { bihariMarwariTemplate } from '../templates/bihariMarwariTemplate';
import { annaprashanTemplate } from '../templates/annaprashanTemplate';
import { birthdayTemplate } from '../templates/birthdayTemplate';

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
    previewImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'
  },
  'sandeep-weds-priya': {
    slug: 'sandeep-weds-priya',
    title: 'Sandeep & Priya — Bihari & Marwari Wedding Invitation',
    coupleNames: 'Sandeep & Priya',
    category: 'wedding',
    cultureType: 'bihari_marwari',
    cultureName: 'बिहारी एवं मारवाड़ी पावन विवाह (Bihari-Marwari Vivah)',
    badgeEmoji: '🚩',
    template: bihariMarwariTemplate,
    previewImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
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
    previewImage: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80'
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
    previewImage: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80'
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
  if (cleanSlug === 'bihari' || cleanSlug === 'marwari' || cleanSlug === 'bihari-marwari-demo' || cleanSlug === 'sandeep') {
    return weddingsRegistry['sandeep-weds-priya'];
  }
  if (cleanSlug === 'annaprashan' || cleanSlug === 'mukhebhaat' || cleanSlug === 'mukhe-bhaat' || cleanSlug === 'aarav') {
    return weddingsRegistry['aarav-annaprashan'];
  }
  if (cleanSlug === 'birthday' || cleanSlug === 'ananya' || cleanSlug === '1st-birthday' || cleanSlug === 'janmadin') {
    return weddingsRegistry['ananya-turns-1'];
  }

  return null;
};
