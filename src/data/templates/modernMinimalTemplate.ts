import { CulturalTemplate } from '../../types/wedding';

export const modernMinimalTemplate: CulturalTemplate = {
  id: 'modern_minimal',
  name: 'Contemporary Minimalist',
  nativeName: 'Forever & Always (Contemporary Luxe)',
  cultureLabel: 'আধুনিক ওয়েস্টার্ন / সমসাময়িক',
  cultureTagline: 'Botanical Wreaths, Sunset Vows, Champagne & Jazz',
  badgeEmoji: '🕊️',
  nativeLanguageLabel: 'Classic',
  nativeLanguageCode: 'en',
  colors: {
    primary: '#1E3A2F',          // Deep Botanical Forest
    primaryDark: '#0D1E17',
    primaryLight: '#305A4A',
    accent: '#C89D7C',           // Warm Champagne Rose Gold
    accentLight: '#F3E8DC',
    bgParchment: '#F9F7F2',
    bgCard: '#FFFFFF',
    border: '#C89D7C',
    textColor: '#1A2421',
    envelopeOuter: '#1E3A2F',
    envelopeInner: 'from-[#1E3A2F] to-[#0D1E17]',
    buttonGradient: 'from-[#C89D7C] via-[#E4C5AF] to-[#C89D7C]'
  },
  audioTrack: {
    title: 'Acoustic Guitar & Piano Vows',
    artist: 'Serene Sunset Romance',
    url: 'https://amantrran.com/wp-content/uploads/2024/12/Tum-Prem-Ho-Reprise-Lyrical-Video-RadhaKrishn-MOhit-Lalwani-Surya-Raj-Kamal-Bharat-Kamal.mp3'
  },
  quotes: {
    invocation: '— FOREVER STARTS HERE —',
    subInvocation: 'CELEBRATING LOVE & FRIENDSHIP',
    verse: '"Whatever our souls are made of, his and mine are the same."\n\nTwo lives, two stories, intertwined under golden skies.',
    verseTranslation: 'May laughter, courage, and unconditional kindness accompany our journey.',
    verseAuthor: '— Emily Brontë',
    weddingTitle: 'The Wedding Celebration',
    nativeWeddingTitle: 'Together Forever',
    welcomeNotice: 'We invite you to share in our joy as we exchange our lifelong vows.',
    nativeWelcomeNotice: 'Join us for a weekend of coastal sunsets, heartfelt vows, and unforgettable memories.',
    familySignoff: '॥ With Love — Kabir & Alisha and Families ॥',
    nativeFamilySignoff: '॥ Warmly Invited by Roy & Mehta Families ॥'
  },
  targetDate: '2026-12-20T17:00:00+05:30',
  targetDateNative: 'Sunday, December 20, 2026 | Sunset at 05:00 PM',
  groom: {
    name: 'Kabir Roy',
    nativeName: 'Kabir Roy',
    role: 'The Groom',
    nativeRole: 'Groom',
    parents: 'Son of Mr. Vikram & Mrs. Nina Roy',
    nativeParents: 'Son of Vikram & Nina Roy',
    grandparents: 'Grandson of Late Dr. Ranajit Roy',
    nativeGrandparents: 'Grandson of Late Dr. Ranajit Roy',
    location: 'Bandra, Mumbai',
    image: '/images/couples/modern-groom.jpg',
    about: 'Product designer, vinyl collector, and avid coastal surfer who loves brewing pour-over coffee.',
    nativeAbout: 'Designer, music curator, and coffee enthusiast.'
  },
  bride: {
    name: 'Alisha Mehta',
    nativeName: 'Alisha Mehta',
    role: 'The Bride',
    nativeRole: 'Bride',
    parents: 'Daughter of Mr. Sanjay & Mrs. Geeta Mehta',
    nativeParents: 'Daughter of Sanjay & Geeta Mehta',
    grandparents: 'Granddaughter of Late Shri Hasmukh Mehta',
    nativeGrandparents: 'Granddaughter of Late Shri Hasmukh Mehta',
    location: 'Colaba, Mumbai',
    image: '/images/couples/modern-bride.jpg',
    about: 'Architectural journalist, pottery artist, and sun-chaser with a passion for slow travels.',
    nativeAbout: 'Architectural journalist and ceramics artist.'
  },
  events: [
    {
      id: 'mm-event-1',
      key: 'sundowner',
      title: 'Welcome Sunset Cocktails',
      nativeTitle: 'Sunset & Jazz Soirée',
      tagline: 'Coastal Breeze, Acoustic Tunes & Aperitifs',
      nativeTagline: 'Unwinding by the sea with wine & melodies',
      date: 'Saturday, 19th December 2026',
      nativeDate: 'Saturday, 19th December 2026',
      time: '04:30 PM Till Dusk',
      nativeTime: '04:30 PM Onwards',
      venueName: 'The Cliffside Deck, Cabo Serai, South Goa',
      nativeVenueName: 'Cliffside Deck, Cabo Serai, Goa',
      dressCode: 'Resort Chic / Linen Shirts & Flowing Silks',
      nativeDressCode: 'Tropical Casual / Ivory & Pastel Linens',
      colorTheme: 'Sage Green & Champagne Sand',
      accentBg: 'from-emerald-50 to-stone-50',
      accentBorder: 'border-emerald-300',
      description: 'Kickstarting the weekend celebration with fresh coconuts, bespoke botanic cocktails, live acoustic saxophone, and sunset toasts.',
      nativeDescription: 'Relaxed sundowner with ocean views, craft cocktails, woodfired bites, and good vibes.',
      highlights: ['Sunset Jazz & Saxophone', 'Gelato & Aperitif Bar', 'Polaroid Guest Memory Wall'],
      nativeHighlights: ['Live Saxophone', 'Signature Cocktails', 'Polaroid Keepsakes'],
      calendarTimes: { start: '20261219T110000Z', end: '20261219T150000Z' }
    },
    {
      id: 'mm-event-2',
      key: 'vows',
      title: 'The Ceremony & Vows',
      nativeTitle: 'Exchange of Vows & Sunset Feast',
      tagline: 'Promise of a Lifetime Under the Banyan Canopy',
      nativeTagline: 'Two souls, one heartfelt promise',
      date: 'Sunday, 20th December 2026',
      nativeDate: 'Sunday, 20th December 2026',
      time: 'Ceremony: 05:00 PM | Dinner: 07:30 PM',
      nativeTime: '05:00 PM Sunset Ceremony',
      venueName: 'The Coastal Banyan Lawn, Cabo Serai, Goa',
      nativeVenueName: 'Banyan Lawn, Cabo Serai, Goa',
      dressCode: 'Black Tie Optional / Elegant Formal',
      nativeDressCode: 'Cocktail Attire / Muted Earth Tones',
      colorTheme: 'Forest Pine & Muted Champagne',
      accentBg: 'from-stone-50 to-emerald-50',
      accentBorder: 'border-[#1E3A2F]',
      description: 'An intimate sunset vow exchange accompanied by a string quartet, followed by a communal candlelit dinner and dance under fairy-lit trees.',
      nativeDescription: 'Heartwarming ceremony surrounded by loved ones, followed by multi-course dining and midnight dancing.',
      highlights: ['Violin & Cello Processional', 'Personal Written Vows', 'Candlelit Chef Tasting Menu'],
      nativeHighlights: ['String Quartet', 'Champagne Toast', 'Starlit After-Party'],
      calendarTimes: { start: '20261220T113000Z', end: '20261220T173000Z' }
    }
  ],
  venue: {
    name: 'Cabo Serai Eco-Luxe Sanctuary',
    nativeName: 'Cabo Serai Resort, Cabo de Rama',
    address: 'Cabo de Rama Beach, Canaguinim, South Goa 403703',
    nativeAddress: 'Cabo de Rama Beach, South Goa 403703',
    landmark: 'Overlooking Cabo de Rama Fort & Arabian Sea',
    nativeLandmark: 'Adjacent to Cabo de Rama Fort',
    mapsUrl: 'https://maps.google.com/?q=Cabo+Serai+Goa',
    embedUrl: 'https://maps.google.com/maps?q=Cabo%20Serai%20Goa&t=m&z=15&output=embed&iwloc=near',
    parking: 'Private golf buggy transfers from resort reception to beach pavilion.',
    nativeParking: 'Dedicated buggy valet service across venue lawns.'
  },
  rsvpContacts: [
    {
      name: 'Uddipta Tech Solutions Concierge',
      nativeName: 'Uddipta Tech Solutions Concierge',
      relation: 'Wedding Experience Director & RSVP',
      nativeRelation: 'Wedding Experience Director & RSVP',
      phone: '+91 62038 68358',
      whatsappNumber: '916203868358',
      email: 'uddipta.techsolutions@gmail.com'
    },
    {
      name: 'Roy & Mehta Hospitality Desk',
      nativeName: 'Roy & Mehta Hospitality Desk',
      relation: 'Family Hospitality Team',
      nativeRelation: 'Family Hospitality Team',
      phone: '+91 62038 68358',
      whatsappNumber: '916203868358',
      email: 'uddipta.techsolutions@gmail.com'
    }
  ],
  initialWishes: [
    {
      id: 'mm-w-1',
      name: 'Dev & Natasha',
      relation: 'Friends from Design School',
      message: 'So incredibly happy for you both! Cabo Serai is magical and nobody deserves this more. Cheers to a lifetime of love and good coffee!',
      timestamp: 'Today',
      hearts: 34
    }
  ],
  quickWishes: {
    native: [
      'Wishing you both endless adventures and boundless love!',
      'Congratulations Kabir & Alisha! Such a gorgeous dream union.',
      'Here is to love, laughter, and happily ever after!',
      'May your journey ahead be as stunning as this celebration!'
    ],
    en: [
      'Wishing you both endless adventures and boundless love!',
      'Congratulations Kabir & Alisha! Such a gorgeous dream union.',
      'Here is to love, laughter, and happily ever after!',
      'May your journey ahead be as stunning as this celebration!'
    ]
  }
};
