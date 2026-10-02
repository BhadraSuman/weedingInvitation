export type Language = 'native' | 'en';

export type TemplateId =
  | 'bengali'
  | 'royal_north'
  | 'south_indian'
  | 'modern_minimal'
  | 'bihari_marwari'
  | 'annaprashan'
  | 'birthday'
  | 'chibi_3d'
  | 'bollywood_premiere'
  | 'wedding_gazette'
  | 'vivah_express';

export type EventCategory = 'wedding' | 'annaprashan' | 'birthday' | 'griha_pravesh';

export interface CoupleMember {
  name: string;
  nativeName: string;
  role: string;
  nativeRole: string;
  parents: string;
  nativeParents: string;
  grandparents: string;
  nativeGrandparents: string;
  location: string;
  image: string;
  about: string;
  nativeAbout: string;
}

export interface WeddingEvent {
  id: string;
  key: string;
  title: string;
  nativeTitle: string;
  tagline: string;
  nativeTagline: string;
  date: string;
  nativeDate: string;
  time: string;
  nativeTime: string;
  venueName: string;
  nativeVenueName: string;
  dressCode: string;
  nativeDressCode: string;
  colorTheme: string;
  accentBg: string;
  accentBorder: string;
  description: string;
  nativeDescription: string;
  highlights: string[];
  nativeHighlights: string[];
  calendarTimes: { start: string; end: string };
}

export interface RsvpContact {
  name: string;
  nativeName: string;
  relation: string;
  nativeRelation: string;
  phone: string;
  whatsappNumber: string;
  email?: string;
}

export interface VenueDetails {
  name: string;
  nativeName: string;
  address: string;
  nativeAddress: string;
  landmark: string;
  nativeLandmark: string;
  mapsUrl: string;
  embedUrl: string;
  parking: string;
  nativeParking: string;
  metroStation?: string;
  nativeMetroStation?: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relation?: string;
  message: string;
  timestamp: string;
  hearts: number;
}

export interface CulturalThemeColors {
  primary: string;           // Main rich theme color (e.g. #8B181B or #0D3B2E or #6E1226)
  primaryDark: string;       // Darker shade for gradients
  primaryLight: string;      // Accent highlight
  accent: string;            // Secondary accent (e.g. #D4AF37 Gold)
  accentLight: string;       // Light gold / champagne
  bgParchment: string;       // Page background
  bgCard: string;            // Card background
  border: string;            // Default border color
  textColor: string;         // Primary text color
  envelopeOuter: string;     // Outer envelope color
  envelopeInner: string;     // Inner envelope gradient
  buttonGradient: string;    // Main CTA button gradient
}

export interface CulturalTemplate {
  id: TemplateId;
  name: string;              // English display name
  nativeName: string;        // Culture script name
  cultureLabel: string;      // e.g. "Bengali Heritage", "Royal Rajputana", "South Indian Kalyanam", "Contemporary Luxe"
  cultureTagline: string;    // Short aesthetic description
  badgeEmoji: string;        // Emoji for quick selector
  nativeLanguageLabel: string; // e.g. "বাংলা", "हिंदी", "தமிழ்", "Elegant"
  nativeLanguageCode: string;  // e.g. "bn", "hi", "ta", "en"
  colors: CulturalThemeColors;
  audioTrack: {
    title: string;
    artist: string;
    url: string;
  };
  quotes: {
    invocation: string;
    subInvocation: string;
    verse: string;
    verseTranslation?: string;
    verseAuthor?: string;
    weddingTitle: string;
    nativeWeddingTitle: string;
    welcomeNotice: string;
    nativeWelcomeNotice: string;
    familySignoff: string;
    nativeFamilySignoff: string;
  };
  targetDate: string;        // ISO timestamp for countdown
  targetDateNative: string;
  groom: CoupleMember;
  bride: CoupleMember;
  events: WeddingEvent[];
  venue: VenueDetails;
  rsvpContacts: RsvpContact[];
  initialWishes: GuestWish[];
  quickWishes: {
    native: string[];
    en: string[];
  };
  shagunConfig?: ShagunConfig;
}

export interface ShagunConfig {
  enabled: boolean;
  recipientName: string;
  nativeRecipientName?: string;
  upiId: string;
  phoneNumber?: string;
  title?: string;
  nativeTitle?: string;
  description?: string;
  nativeDescription?: string;
  defaultAmounts?: number[];
}
