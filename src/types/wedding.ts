export type Language = 'bn' | 'en';

export interface CoupleMember {
  name: string;
  bengaliName: string;
  role: string;
  bengaliRole: string;
  parents: string;
  bengaliParents: string;
  grandparents: string;
  bengaliGrandparents: string;
  location: string;
  image: string;
  about: string;
  bengaliAbout: string;
}

export interface WeddingEvent {
  id: string;
  key: 'aiburobhat' | 'gaye_holud' | 'shubho_bibaho' | 'bou_bhaat';
  title: string;
  bengaliTitle: string;
  tagline: string;
  bengaliTagline: string;
  date: string;
  bengaliDate: string;
  time: string;
  bengaliTime: string;
  venueName: string;
  bengaliVenueName: string;
  dressCode: string;
  bengaliDressCode: string;
  colorTheme: string;
  accentBg: string;
  accentBorder: string;
  description: string;
  bengaliDescription: string;
  highlights: string[];
  bengaliHighlights: string[];
}

export interface RsvpContact {
  name: string;
  bengaliName: string;
  relation: string;
  bengaliRelation: string;
  phone: string;
  whatsappNumber: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relation?: string;
  message: string;
  timestamp: string;
  hearts: number;
}
