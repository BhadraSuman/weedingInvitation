import { CulturalTemplate } from '../../types/wedding';
import { bengaliTemplate } from '../templates/bengaliTemplate';
import { bihariMarwariTemplate } from '../templates/bihariMarwariTemplate';
import { royalNorthTemplate } from '../templates/royalNorthTemplate';
import { southIndianTemplate } from '../templates/southIndianTemplate';
import { modernMinimalTemplate } from '../templates/modernMinimalTemplate';

export interface WeddingSlugEntry {
  slug: string;
  title: string;
  coupleNames: string;
  cultureType: string;
  cultureName: string;
  badgeEmoji: string;
  template: CulturalTemplate;
  previewImage: string;
}

export const weddingsRegistry: Record<string, WeddingSlugEntry> = {
  'anirban-weds-deboleena': {
    slug: 'anirban-weds-deboleena',
    title: 'Anirban & Deboleena — Bengali Wedding Invitation',
    coupleNames: 'Anirban & Deboleena',
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
    cultureType: 'bihari_marwari',
    cultureName: 'बिहारी एवं मारवाड़ी पावन विवाह (Bihari-Marwari Vivah)',
    badgeEmoji: '🚩',
    template: bihariMarwariTemplate,
    previewImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
  }
};

export const getWeddingBySlug = (slug: string): WeddingSlugEntry | null => {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();
  
  if (cleanSlug in weddingsRegistry) {
    return weddingsRegistry[cleanSlug];
  }

  // Handy short aliases
  if (cleanSlug === 'bengali' || cleanSlug === 'bengali-demo') {
    return weddingsRegistry['anirban-weds-deboleena'];
  }
  if (cleanSlug === 'bihari' || cleanSlug === 'marwari' || cleanSlug === 'bihari-marwari-demo') {
    return weddingsRegistry['sandeep-weds-priya'];
  }

  return null;
};
