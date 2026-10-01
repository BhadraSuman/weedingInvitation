import { CulturalTemplate } from '../../types/wedding';

export const birthdayTemplate: CulturalTemplate = {
  id: 'birthday',
  name: 'Ananya’s Royal 1st Birthday Gala',
  nativeName: 'অনন্যার প্রথম শুভ জন্মদিন উৎসব',
  cultureLabel: 'প্রথম জন্মদিন মহোৎসব (1st Birthday Celebration)',
  cultureTagline: 'এক বছর পূর্ণতার মিষ্টি আনন্দ ও রাজকীয় উৎসব',
  badgeEmoji: '🎂',
  nativeLanguageLabel: 'বাংলা',
  nativeLanguageCode: 'bn',
  colors: {
    primary: '#7C3AED',          // Magical Lavender Violet
    primaryDark: '#4C1D95',      // Deep Royal Violet
    primaryLight: '#A78BFA',     // Soft Pastel Lilac
    accent: '#EC4899',           // Cotton Candy Princess Pink
    accentLight: '#FCE7F3',      // Soft Pastel Pink Tint
    bgParchment: '#FAF5FF',      // Fairytale Lavender Mist
    bgCard: '#FFFFFF',
    border: '#C084FC',           // Pastel Lavender Border
    textColor: '#2E1065',        // Deep Midnight Violet
    envelopeOuter: '#5B21B6',    // Deep Violet Envelope
    envelopeInner: 'from-[#7C3AED] to-[#4C1D95]',
    buttonGradient: 'from-[#7C3AED] via-[#EC4899] to-[#0284C7]'
  },
  audioTrack: {
    title: 'Happy Birthday Celebration & Joyful Melodies',
    artist: 'Acoustic Joy & Celebration Bells',
    url: 'https://amantrran.com/wp-content/uploads/2024/12/Tum-Prem-Ho-Reprise-Lyrical-Video-RadhaKrishn-MOhit-Lalwani-Surya-Raj-Kamal-Bharat-Kamal.mp3'
  },
  quotes: {
    invocation: '✨ OUR LITTLE PRINCESS TURNS ONE ✨',
    subInvocation: 'প্রথম জন্মদিনের আনন্দবার্তা',
    verse: 'ছোট্ট দুটি হাত, মায়াবী সেই হাসি,\nএক বছরেই মন জিতেছে রূপকথার রূপসী!\n\nআমাদের রাজকন্যা "অনন্যা"-র প্রথম জন্মদিনের আনন্দময় সন্ধ্যায় আপনাকে ও আপনার পরিবারকে সাদর নিমন্ত্রণ জানাই।',
    verseTranslation: 'Tiny little hands and a magical sweet smile, our baby princess Ananya has completed a glorious first year! Join us for a delightful evening of celebration, cake cutting, and joy.',
    verseAuthor: '— জন্মদিনের আনন্দগান',
    weddingTitle: 'Ananya Turns One',
    nativeWeddingTitle: 'অনন্যার প্রথম জন্মদিন',
    welcomeNotice: 'Join us to celebrate the magical 1st birthday milestone of our darling daughter Ananya.',
    nativeWelcomeNotice: 'আমাদের পরম আদরের রাজকন্যা অনন্যার ১ম জন্মদিনের আনন্দঘন সন্ধ্যায় সপরিবারে আপনার আন্তরিক উপস্থিতি কামনা করি।',
    familySignoff: '॥ Awaiting Your Smiles — Sen & Banerjee Family ॥',
    nativeFamilySignoff: '॥ একরাশ ভালোবাসা ও প্রতীক্ষায় — সেন ও ব্যানার্জী পরিবার ॥'
  },
  targetDate: '2026-12-20T18:30:00+05:30',
  targetDateNative: 'রবিবার, ২০শে ডিসেম্বর ২০২৬ | কেক কাটার শুভক্ষণ: সন্ধ্যা ৭:০০',
  groom: {
    name: 'Princess Ananya Sen',
    nativeName: 'রাজকন্যা অনন্যা সেন',
    role: 'The Birthday Princess',
    nativeRole: 'জন্মদিনের রাজকন্যা',
    parents: 'Daughter of Rohan Sen & Debashree Banerjee Sen',
    nativeParents: 'পিতামাতা: রোহন সেন ও দেবশ্রী ব্যানার্জী সেন',
    grandparents: 'Granddaughter of Pradip Sen & Rekha Sen, Dilip Banerjee & Chitra Banerjee',
    nativeGrandparents: 'দাদু-ঠাকুমা: প্রদীপ সেন ও রেখা সেন | দাদু-দিদিমা: দিলীপ ব্যানার্জী ও চিত্রা ব্যানার্জী',
    location: 'Ballygunge, Kolkata',
    image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
    about: 'Loves nursery rhymes, dancing to rhythm, blowing bubbles, and tasting chocolate frosting!',
    nativeAbout: 'ছোট্ট পায়ে হাঁটতে শুরু করা আমাদের রূপকথার রাজকুমারী।'
  },
  bride: {
    name: 'Debashree & Rohan Sen',
    nativeName: 'দেবশ্রী ও রোহন সেন',
    role: 'Happy Parents',
    nativeRole: 'আনন্দিত পিতামাতা',
    parents: 'Sen & Banerjee Family',
    nativeParents: 'সেন ও ব্যানার্জী পরিবার',
    grandparents: 'Kolkata',
    nativeGrandparents: 'কলকাতা',
    location: 'Kolkata, West Bengal',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80',
    about: 'Looking forward to hosting you for an unforgettable birthday evening!',
    nativeAbout: 'ছোট্ট অনন্যার প্রথম বছরে আপনাদের সকলের আশীর্বাদ আমাদের সবচেয়ে বড় পাওয়া।'
  },
  events: [
    {
      id: 'bd-event-1',
      key: 'magic_welcome',
      title: 'Princess Arrival & Magic Show',
      nativeTitle: 'রাজকন্যার আগমন ও জাদুকরী শো',
      tagline: 'Bubble Welcoming & Illusion Magic for Kids',
      nativeTagline: 'রঙিন বেলুন ও শিশুদের জন্য চমকপ্রদ ম্যাজিক শো',
      date: 'Sunday, 20th December 2026',
      nativeDate: 'রবিবার, ২০শে ডিসেম্বর ২০২৬',
      time: '06:00 PM Onwards',
      nativeTime: 'সন্ধ্যা ৬:০০ ঘটিকা',
      venueName: 'The Imperial Lawn, ITC Sonar Kolkata',
      nativeVenueName: 'দ্য ইম্পেরিয়াল লন, আইটিসি সোনার, কলকাতা',
      dressCode: 'Pastel Royalty / Smart Party Attire',
      nativeDressCode: 'হালকা প্যাস্টেল রঙের পার্টি পোশাক',
      colorTheme: 'Pastel Rose & Gold',
      accentBg: 'from-pink-50 to-rose-100',
      accentBorder: 'border-pink-300',
      description: 'Welcome drinks, live caricature artist, customized cartoon face-painting, and a mesmerizing 40-minute magic illusion show for all the kids!',
      nativeDescription: 'স্বাগত পানীয়, শিশুদের জন্য ফেস-পেইন্টিং, বেলুন আর্ট ও জাদুকরের আকর্ষণীয় ম্যাজিক প্রদর্শনী।',
      highlights: ['Live Magic Show', 'Face Painting & Balloon Art', 'Bubble Welcome'],
      nativeHighlights: ['লাইভ ম্যাজিক শো', 'ফেস পেইন্টিং ও কার্টুন আর্ট', 'বাবল এন্ট্রান্স'],
      calendarTimes: { start: '20261220T123000Z', end: '20261220T133000Z' }
    },
    {
      id: 'bd-event-2',
      key: 'cake_cutting',
      title: 'Grand Cake Cutting & Chorus',
      nativeTitle: 'রাজকীয় কেক কাটার মাহেন্দ্রক্ষণ',
      tagline: 'Singing Happy Birthday with Confetti & Sparklers',
      nativeTagline: 'কনফেটি ব্লাস্ট ও রঙিন স্পার্কলার্স সহযোগে কেক কাটার উৎসব',
      date: 'Sunday, 20th December 2026',
      nativeDate: 'রবিবার, ২০শে ডিসেম্বর ২০২৬',
      time: '07:15 PM Sharp',
      nativeTime: 'সন্ধ্যা ৭:১৫ ঘটিকা',
      venueName: 'The Grand Ballroom, ITC Sonar Kolkata',
      nativeVenueName: 'গ্র্যান্ড বলরুম, আইটিসি সোনার',
      dressCode: 'Glamorous Evening Wear',
      nativeDressCode: 'সন্ধ্যাকালীন জমকালো পোশাক',
      colorTheme: 'Princess Gold & Velvet Rose',
      accentBg: 'from-rose-50 to-amber-50',
      accentBorder: 'border-rose-400',
      description: 'The golden moment! Ananya cuts her 3-tier fairytale princess castle cake surrounded by family singing in chorus and safe indoor cold pyro sparklers.',
      nativeDescription: 'রূপকথার ৩ তলা ক্যাসেল কেক কাটবে ছোট্ট অনন্যা। আতশবাজি ও জন্মদিনের গানের সুরে মেতে উঠবে সবাই।',
      highlights: ['Fairytale 3-Tier Cake', 'Indoor Cold Pyro', 'Happy Birthday Chorus'],
      nativeHighlights: ['রূপকথার ৩-তলা রাজকীয় কেক', 'রঙিন কনফেটি ও স্পার্কলার্স', 'সমবেত জন্মদিনের গান'],
      calendarTimes: { start: '20261220T134500Z', end: '20261220T143000Z' }
    },
    {
      id: 'bd-event-3',
      key: 'gala_dinner',
      title: 'Celebration Dinner Gala & Live Music',
      nativeTitle: 'উৎসুক নৈশভোজ ও লাইভ মিউজিক',
      tagline: 'Multi-Cuisine Buffet, Chocolate Fountain & Acoustic Beats',
      nativeTagline: 'চকোলেট ফাউন্টেন, লাইভ ফুড কাউন্টার ও সুরমায়ী গান',
      date: 'Sunday, 20th December 2026',
      nativeDate: 'রবিবার, ২০শে ডিসেম্বর ২০২৬',
      time: '08:00 PM Onwards',
      nativeTime: 'রাত ৮:০০ ঘটিকা থেকে',
      venueName: 'The Grand Ballroom & Terrace, ITC Sonar',
      nativeVenueName: 'গ্র্যান্ড বলরুম ও টেরাস, আইটিসি সোনার',
      dressCode: 'Party Wear',
      nativeDressCode: 'পার্টি পরিধান',
      colorTheme: 'Golden Champagne',
      accentBg: 'from-amber-50 to-yellow-50',
      accentBorder: 'border-amber-300',
      description: 'Sumptuous multi-cuisine buffet featuring artisanal pasta counters, dim sums, traditional Kolkata Biryani, Chocolate Fountain, Cupcakes, and live acoustic retro Bollywood.',
      nativeDescription: 'কলকাতা বিরিয়ানি, লাইভ পাস্তা কাউন্টার, চকোলেট ফাউন্টেন, কাপকেক বার ও জনপ্রিয় গানের সুরে রাজকীয় নৈশভোজ।',
      highlights: ['Artisanal Food Counters', 'Chocolate Fountain & Cupcakes', 'Live Acoustic Band'],
      nativeHighlights: ['লাইভ পাস্তা ও চাট কাউন্টার', 'চকোলেট ফাউন্টেন বার', 'লাইভ ব্যান্ডের মনমাতানো গান'],
      calendarTimes: { start: '20261220T143000Z', end: '20261220T180000Z' }
    }
  ],
  venue: {
    name: 'ITC Sonar — Luxury Collection Hotel',
    nativeName: 'আইটিসি সোনার — লাক্সারি প্যালেস',
    address: '1, JBS Haldane Avenue, Tangra, Kolkata, West Bengal 700046',
    nativeAddress: '১, জে বি এস হ্যালডেন এভিনিউ, ই এম বাইপাস, কলকাতা ৭০০০৪৬',
    landmark: 'Opposite Science City, EM Bypass',
    nativeLandmark: 'সায়েন্স সিটির বিপরীতে, ই এম বাইপাস',
    mapsUrl: 'https://maps.google.com/?q=ITC+Sonar+Kolkata',
    embedUrl: 'https://maps.google.com/maps?q=ITC%20Sonar%20Kolkata&t=m&z=15&output=embed&iwloc=near',
    parking: 'Complimentary valet parking & safe designated indoor parking area for 500+ cars.',
    nativeParking: 'সকলের জন্য বিনামূল্যে নিরাপদ ভ্যালেট পার্কিং ও ৫ শতাধিক গাড়ির ব্যবস্থা।'
  },
  rsvpContacts: [
    {
      name: 'Uddipta Tech Solutions Concierge',
      nativeName: 'উদীপ্ত টেক সলিউশনস্ ডেস্ক',
      relation: 'Event Coordinator & Guest Desk',
      nativeRelation: 'অনুষ্ঠান সমন্বয়ক ও অতিথি আপ্যায়ন ডেস্ক',
      phone: '+91 62038 68358',
      whatsappNumber: '916203868358',
      email: 'uddipta.techsolutions@gmail.com'
    },
    {
      name: 'Sen & Banerjee Family Desk',
      nativeName: 'সেন ও ব্যানার্জী পরিবার ডেস্ক',
      relation: 'Family Coordinators',
      nativeRelation: 'পারিবারিক অভ্যর্থনা ডেস্ক',
      phone: '+91 62038 68358',
      whatsappNumber: '916203868358',
      email: 'uddipta.techsolutions@gmail.com'
    }
  ],
  initialWishes: [
    {
      id: 'bd-w-1',
      name: 'Uncle & Aunt',
      relation: 'Mama & Mami',
      message: 'Happy 1st Birthday to our little doll Ananya! You bring so much sparkle and sunshine to our lives. Stay blessed always!',
      timestamp: 'Today',
      hearts: 42
    },
    {
      id: 'bd-w-2',
      name: 'Grandma & Grandpa',
      relation: 'Dadu & Thakuma',
      message: 'এক বছর কীভাবে কেটে গেল বুঝতেই পারলাম না! দাদু-ঠাকুমার অনেক আশীর্বাদ আর অফুরন্ত ভালোবাসা রইল আমাদের রাজকন্যার জন্য।',
      timestamp: 'Yesterday',
      hearts: 38
    }
  ],
  quickWishes: {
    native: [
      'শুভ প্রথম জন্মদিন রাজকন্যা অনন্যা! অনেক ভালোবাসা ও আশীর্বাদ!',
      'আমাদের ছোট্ট পুতুলের জীবন সবসময় খুশিতে ভরে উঠুক।',
      'হ্যাপি বার্থডে মাম্মাম! অনেক বড় হও, মানুষের মতো মানুষ হও।',
      'ঈশ্বর অনন্যাকে সুস্বাস্থ্য, অফুরন্ত আনন্দ ও সমৃদ্ধি দান করুন।'
    ],
    en: [
      'Happy 1st Birthday to little princess Ananya! May your year ahead be pure magic!',
      'Wishing you a lifetime of giggles, sunshine, and endless happiness!',
      'Happy Birthday little darling! You make the world so much sweeter!',
      'Big hugs and tons of love to our favorite one-year-old!'
    ]
  },
  shagunConfig: {
    enabled: true,
    recipientName: 'Princess Ananya Sen',
    nativeRecipientName: 'রাজকন্যা অনন্যা সেন',
    upiId: '6203868358@paytm',
    phoneNumber: '6203868358',
    title: 'Princess Ananya’s Birthday Gift & Lifafa',
    nativeTitle: 'অনন্যার ১ম জন্মদিনের শুভ উপহার ও লেফাফা',
    description: 'Send your warm wishes and blessing gifts to the birthday princess from anywhere.',
    nativeDescription: 'রাজকন্যা অনন্যার ১ম জন্মদিনের আনন্দঘন লগ্নে দূর থেকে আপনার স্নেহাশিস ও উপহার পাঠান।',
    defaultAmounts: [501, 1001, 2001, 5001]
  }
};
