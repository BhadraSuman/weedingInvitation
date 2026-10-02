import { CulturalTemplate } from '../../types/wedding';

export const potKathaTemplate: CulturalTemplate = {
  id: 'pot_katha',
  name: 'Pot Katha (Kalighat Patachitra Wedding Scroll)',
  nativeName: 'পট কথা (কালীঘাট পটচিত্র বিবাহগাঁথা)',
  cultureLabel: 'কালীঘাট পটচিত্র ঐতিহ্য',
  cultureTagline: 'Hand-Painted Folk Scroll, Rolling Wooden Dandi, Pure Bengali Rhythm & Vintage Rajbari Grandeur',
  badgeEmoji: '📜',
  nativeLanguageLabel: 'বাংলা',
  nativeLanguageCode: 'bn',
  colors: {
    primary: '#a51611',        // Kalighat vermilion terracotta
    primaryDark: '#660a06',
    primaryLight: '#c83227',
    accent: '#6f4c00',         // Jute mustard & brass
    accentLight: '#ffdeab',
    bgParchment: '#fff9eb',    // Aged scroll handmade parchment
    bgCard: '#f9f3e5',
    border: '#e3beb9',
    textColor: '#1d1c13',
    envelopeOuter: '#6f4c00',
    envelopeInner: 'from-[#fff9eb] via-[#ffdeab] to-[#6f4c00]',
    buttonGradient: 'from-[#a51611] via-[#c83227] to-[#a51611]'
  },
  audioTrack: {
    title: 'Potua Gaan & Shonkho Dhaak Baadya',
    artist: 'Traditional Kalighat Folk Troupe',
    url: 'https://amantrran.com/wp-content/uploads/2024/12/Tum-Prem-Ho-Reprise-Lyrical-Video-RadhaKrishn-MOhit-Lalwani-Surya-Raj-Kamal-Bharat-Kamal.mp3'
  },
  quotes: {
    invocation: '॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥',
    subInvocation: 'কালীঘাট পটচিত্র বিবাহগাঁথা • ঐতিহ্যবাহী কথকতা',
    verse: 'ওহে সুজন শোন দিয়া মন, পট কথা কহি আজ বধূ-বরের মিলন।\nসাত পাকে বাঁধা আজ দুটি মন প্রাণ, শঙ্খ-উলুধ্বনিতে বাজে শুভ গান॥',
    verseTranslation: 'Listen with open hearts as the ancient scroll unrolls to tell the tale of two wandering souls bonded in sacred matrimony.',
    verseAuthor: '— পটশিল্পী ও গায়েন মঙ্গলকাব্য',
    weddingTitle: 'Pot Katha: Debashish & Aditi',
    nativeWeddingTitle: 'পট কথা: দেবাশীষ ও অদিতির শুভ পরিণয়',
    welcomeNotice: 'We cordially invite you to unfurl the sacred folk scroll of our wedding celebrations at Sovabazar Rajbari.',
    nativeWelcomeNotice: 'সকল পরমাত্মীয়, বন্ধু-বান্ধব ও শুভানুধ্যায়ীদের আমাদের এই ঐতিহাসিক পটচিত্র বিবাহলগ্নে সাদর নিমন্ত্রণ জানাই।',
    familySignoff: '॥ With blessings of Roy & Basu Families ॥',
    nativeFamilySignoff: '॥ আশীর্বাদকামী: রায় ও বসু পরিবার, কলকাতা ॥'
  },
  targetDate: '2026-12-12T18:45:00+05:30',
  targetDateNative: '২৬ অগ্রহায়ণ ১৪৩৩ | গোধূলিলগ্ন সন্ধ্যা ০৬:৪৫',
  groom: {
    name: 'Debashish Roy',
    nativeName: 'দেবাশীষ রায়',
    role: 'Groom (বর)',
    nativeRole: 'বর: দেবাশীষ রায়',
    parents: 'Son of Smt. Aparna & Sri Samaresh Roy',
    nativeParents: 'সুপুত্র: শ্রীমতি অপর্ণা ও শ্রী সমরেশ রায়',
    grandparents: 'Grandson of Late B.N. Roy',
    nativeGrandparents: 'পৌত্র: স্বর্গত বীরেন্দ্রনাথ রায়',
    location: 'Ballygunge, Kolkata',
    image: '/images/couples/bengali-groom.jpg',
    about: 'Heritage architect restoring old Calcutta mansions, lover of morning College Street coffee, and classical sitar enthusiast.',
    nativeAbout: 'ঐতিহ্যবাহী স্থাপত্য গবেষক, কফি হাউজের আড্ডাপ্রিয় ও পুরানো কলকাতার ইতিহাসপ্রেমী।'
  },
  bride: {
    name: 'Aditi Basu',
    nativeName: 'অদিতি বসু',
    role: 'Bride (কনে)',
    nativeRole: 'কনে: অদিতি বসু',
    parents: 'Daughter of Smt. Sharmistha & Sri Alok Basu',
    nativeParents: 'সুপুত্রী: শ্রীমতি শর্মিষ্ঠা ও শ্রী অলোক বসু',
    grandparents: 'Granddaughter of Late Prof. S.K. Basu',
    nativeGrandparents: 'পৌত্রী: স্বর্গত অধ্যাপক সত্যকিঙ্কর বসু',
    location: 'Salt Lake, Kolkata',
    image: '/images/couples/bengali-bride.jpg',
    about: 'Classical Odissi dancer, Bengali literature lecturer, and curator of folk textile arts.',
    nativeAbout: 'ওড়িশি নৃত্যশিল্পী, রবীন্দ্র সাহিত্যের গবেষক এবং বাংলার লোকশিল্পের গুণগ্রাহী সমঝদার।'
  },
  events: [
    {
      id: 'pot-ev-1',
      key: 'aiburobhat',
      title: 'Aiburobhat Feast (Pre-Nuptial Blessing)',
      nativeTitle: 'প্রথম পর্ব: আইবুড়োভাত উৎসব',
      tagline: 'Traditional farewell bachelorhood feast with home delicacies',
      nativeTagline: 'কন্যার পৈতৃক ভবনে আশীর্বাদ, শাঁখা-পলা বরণ ও পঞ্চব্যঞ্জন ভোজ',
      date: '10 Dec 2026',
      nativeDate: '১০ ডিসেম্বর ২০২৬',
      time: '12:30 PM',
      nativeTime: 'দুপুর ১২:৩০ ঘটিকা',
      venueName: 'Basu Residence, Ballygunge Circular Road, Kolkata',
      nativeVenueName: 'বসু ভবন, বালিগঞ্জ সার্কুলার রোড, কলকাতা',
      dressCode: 'Santiniketan Handloom Dhakai',
      nativeDressCode: 'শান্তিনিকেতনি তসর ও তাঁতের ঢাকাই',
      colorTheme: '#6f4c00',
      accentBg: '#ffdeab',
      accentBorder: '#6f4c00',
      description: 'The ceremonial last bachelorhood meal lovingly prepared by aunts, grandmothers, and family elders.',
      nativeDescription: 'দুই বাড়ির ঠাকুমা-দিদিমাদের মিষ্টি হাসি, নারকেল নাড়ু ও ভোজের পাতে পদ্মার টাটকা ইলিশের আতিথেয়তা।',
      highlights: ['Panchabyanajan Feast', 'Grandmother Blessings', 'Uludhoni'],
      nativeHighlights: ['পঞ্চব্যঞ্জন ও ইলিশ ভোজ', 'ঠাকুমা-দিদিমার আশীর্বাদ', 'শঙ্খ ও উলুধ্বনি'],
      calendarTimes: { start: '2026-12-10T12:30:00', end: '2026-12-10T16:00:00' }
    },
    {
      id: 'pot-ev-2',
      key: 'gaye_holud',
      title: 'Gaye Holud & Tattwa Exchange',
      nativeTitle: 'দ্বিতীয় পর্ব: গায়ে হলুদ ও তত্ত্ব বিনিময়',
      tagline: 'Pure chandan, turmeric glow, fish tray gifts and rolling laughter',
      nativeTagline: 'সুগন্ধি চন্দন ও মঙ্গল শঙ্খধ্বনি সহ তত্ত্ব বরণ',
      date: '11 Dec 2026',
      nativeDate: '১১ ডিসেম্বর ২০২৬',
      time: '09:00 AM',
      nativeTime: 'সকাল ০৯:০০ ঘটিকা',
      venueName: 'Roy Kutir Aangan, Kolkata',
      nativeVenueName: 'রায় কুটির প্রাঙ্গণ, কলকাতা',
      dressCode: 'Basanti Yellow Cotton / Silk',
      nativeDressCode: 'বাসন্তী হলুদ শাড়ি ও গরদের পাঞ্জাবি',
      colorTheme: '#485f84',
      accentBg: '#d5e3ff',
      accentBorder: '#485f84',
      description: 'Ceremonial turmeric bath accompanied by arrival of the decorated bride-groom fish baskets.',
      nativeDescription: 'সিঁদুর-হলুদে চর্চিত গঙ্গাজলের আশীর্বাদে তত্ত্বের সাজানো রুই-ইলিশ ও মঙ্গল ঢাকের উৎসব।',
      highlights: ['Tattwa Fish Display', 'Ubtan & Chandan', 'Dhaaki Drummers'],
      nativeHighlights: ['সাজানো তত্ত্বের মাছ', 'কাঁচা হলুদ ও চন্দন চর্চা', 'মঙ্গল ঢাকির বাজনা'],
      calendarTimes: { start: '2026-12-11T09:00:00', end: '2026-12-11T13:00:00' }
    },
    {
      id: 'pot-ev-3',
      key: 'shuvo_bibaho',
      title: 'Shuvo Bibaho, Saat Paak & Sindoor Daan',
      nativeTitle: 'তৃতীয় পর্ব: শুভ বিবাহ ও সাতপাক',
      tagline: 'Seven sacred vows around the holy fire at Sovabazar Rajbari',
      nativeTagline: 'শোভাবাজার ঐতিহ্যবাহী রাজবাড়ি প্রাঙ্গণে গোধূলিলগ্নে শুভ দৃষ্টি ও সাতপাক',
      date: '12 Dec 2026',
      nativeDate: '১২ ডিসেম্বর ২০২৬',
      time: '06:45 PM (Godhuli Lagna)',
      nativeTime: 'গোধূলিলগ্ন সন্ধ্যা ০৬:৪৫',
      venueName: 'Sovabazar Rajbari Natmandir, Kolkata',
      nativeVenueName: 'শোভাবাজার রাজবাড়ি নাটমন্দির, কলকাতা',
      dressCode: 'Lal Benarasi & Gorod Dhoti',
      nativeDressCode: 'লাল বেনারসী ও গরদের ধুতি-পাঞ্জাবি',
      colorTheme: '#a51611',
      accentBg: '#ffdad5',
      accentBorder: '#a51611',
      description: 'The magnificent wedding ritual featuring Saat Paak on the Piri, Shubho Drishti, Mala Bodol, and Sindoor Daan.',
      nativeDescription: 'ঐতিহাসিক রাজবাড়ির নাটমন্দিরে শুভ দৃষ্টি, মালা বদল, কন্যাদান ও অগ্নিসাক্ষী সাতপাক।',
      highlights: ['Saat Paak & Shubho Drishti', 'Kanyadaan', 'Sindoor Daan'],
      nativeHighlights: ['সাতপাক ও শুভ দৃষ্টি', 'মালা বদল', 'সিঁদুর দান ও লাজাহোম'],
      calendarTimes: { start: '2026-12-12T18:45:00', end: '2026-12-13T01:00:00' }
    },
    {
      id: 'pot-ev-4',
      key: 'boubhaat',
      title: 'Bou Bhaat & Reception Dinner',
      nativeTitle: 'চতুর্থ পর্ব: প্রীতিভোজ ও বৌভাত',
      tagline: 'Welcoming the new bride and royal Bengali feast',
      nativeTagline: 'বরযাত্রী বরণ, ভাতের থালি দান ও রাজকীয় নৈশভোজ',
      date: '14 Dec 2026',
      nativeDate: '১৪ ডিসেম্বর ২০২৬',
      time: '07:30 PM',
      nativeTime: 'রাত্রি ০৭:৩০ ঘটিকা',
      venueName: 'The Royal Bengal Hall, Kolkata',
      nativeVenueName: 'দ্য রয়্যাল বেঙ্গল ব্যাঙ্কোয়েট, কলকাতা',
      dressCode: 'Regal Formal Festive',
      nativeDressCode: 'জমকালো উৎসবের সাজ',
      colorTheme: '#8e6300',
      accentBg: '#fff9eb',
      accentBorder: '#8e6300',
      description: 'Grand reception dinner with authentic Bengali royal fish curry, mutton kasha, sandesh, and mishti doi.',
      nativeDescription: 'নববধূর ভাত-কাপড় অর্পণ, বিশিষ্ট গুণীজন সংবর্ধনা ও রসনাতৃপ্তিকর প্রীতিভোজ।',
      highlights: ['Bhaat-Kapor Vow', 'Grand Feast', 'Music Mehfil'],
      nativeHighlights: ['ভাত-কাপড়ের দায়িত্ব গ্রহণ', 'রাজকীয় প্রীতিভোজ', 'সুর-সঙ্গীত আসর'],
      calendarTimes: { start: '2026-12-14T19:30:00', end: '2026-12-14T23:30:00' }
    }
  ],
  venue: {
    name: 'Sovabazar Rajbari Courtyard',
    nativeName: 'শোভাবাজার রাজবাড়ি প্রাঙ্গণ',
    address: '36, Nabakrishna Street, Sovabazar, Kolkata, West Bengal - 700005',
    nativeAddress: '৩৬, নবকৃষ্ণ স্ট্রিট, শোভাবাজার, কলকাতা - ৭০০০২৫',
    landmark: 'Opposite Sovabazar Metro Station (Gate 2)',
    nativeLandmark: 'শোভাবাজার মেট্রো স্টেশন (গেট ২)-এর ঠিক বিপরীতে',
    mapsUrl: 'https://maps.google.com/?q=Sovabazar+Rajbari+Kolkata',
    embedUrl: 'https://maps.google.com/?q=Sovabazar+Rajbari+Kolkata&output=embed',
    parking: 'Designated Rajbari Gate 1 parking area with valet service',
    nativeParking: 'রাজবাড়ি প্রধান ফটক সংলগ্ন সংরক্ষিত গাড়ি পার্কিং',
    metroStation: 'Sovabazar Sutanuti Metro Station (2 min walk)',
    nativeMetroStation: 'শোভাবাজার সুতানুটি মেট্রো স্টেশন (হাঁটা পথে ২ মিনিট)'
  },
  rsvpContacts: [
    {
      name: 'Samar Roy',
      nativeName: 'সমরেশ রায়',
      relation: 'Father of Groom',
      nativeRelation: 'বরের পিতা',
      phone: '+91 98301 23456',
      whatsappNumber: '919830123456'
    },
    {
      name: 'Alok Basu',
      nativeName: 'অলোক বসু',
      relation: 'Father of Bride',
      nativeRelation: 'কনের পিতা',
      phone: '+91 98311 67890',
      whatsappNumber: '919831167890'
    }
  ],
  initialWishes: [
    {
      id: 'pw-1',
      name: 'শর্মিষ্ঠা বসু',
      relation: 'কনের মাতা',
      message: 'দেবাশীষ ও অদিতির এই মিলন বাংলার পটচিত্রের মতোই চিরকাল রঙিন ও সুমধুর থাকুক!',
      timestamp: 'Just now',
      hearts: 32
    },
    {
      id: 'pw-2',
      name: 'ডঃ সুব্রত সেনগুপ্ত',
      relation: 'পারিবারিক মিত্র',
      message: 'শোভাবাজার রাজবাড়ির ঐতিহাসিক অঙ্গনে দুই প্রিয়জনের এই নতুন যাত্রায় অন্তরের অফুরান শুভাশিস রইল।',
      timestamp: '1 hour ago',
      hearts: 24
    }
  ],
  quickWishes: {
    native: [
      'সাত পাকে বাঁধা আজ দুটি মন প্রাণ! 🪔',
      'পটচিত্রের রঙের মতোই চিরনবীন থাকুক তোমাদের ভালোবাসা! 📜',
      'শাঁখ আর উলুধ্বনিতে মুখরিত হোক তোমাদের জীবন! 🌸',
      'অদিতি ও দেবাশীষকে প্রাণভরা শুভকামনা ও আশিস! 💫'
    ],
    en: [
      'Heartiest congratulations to Aditi & Debashish! 🪔',
      'May your journey together be as timeless as Kalighat folk art! 📜',
      'Wishing both of you eternal harmony and love! 🌸',
      'Best wishes from our entire family! 💫'
    ]
  },
  shagunConfig: {
    enabled: true,
    recipientName: 'Aditi & Debashish',
    nativeRecipientName: 'অদিতি ও দেবাশীষ',
    upiId: 'aditi.debashish@upi',
    phoneNumber: '+91 98301 23456',
    title: 'Aashirwaad & Pronami (শুভ আশীর্বাদ ও প্রণামী)',
    nativeTitle: 'শুভ আশীর্বাদ ও প্রণামী',
    description: 'Your physical presence is our true gift. If you wish to send loving blessings from afar:',
    nativeDescription: 'আপনার সান্নিধ্যই শ্রেষ্ঠ আশীর্বাদ। দূর থেকে স্নেহ ও ভালোবাসা পাঠানোর জন্য ডিজিটাল শুভ প্রণামী:',
    defaultAmounts: [501, 1001, 2101, 5001]
  }
};
