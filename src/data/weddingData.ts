import { CoupleMember, WeddingEvent, RsvpContact, GuestWish } from '../types/wedding';

export const groomData: CoupleMember = {
  name: "Anirban Mukherjee",
  bengaliName: "অনির্বাণ মুখোপাধ্যায়",
  role: "The Groom (বর)",
  bengaliRole: "শ্রীমান অনির্বাণ",
  parents: "Son of Dr. Subrata & Mrs. Sharmila Mukherjee",
  bengaliParents: "ডঃ সুব্রত মুখোপাধ্যায় ও শ্রীমতী শর্মিলা মুখোপাধ্যায়ের জ্যেষ্ঠ পুত্র",
  grandparents: "Grandson of Late Priyanath & Late Binapani Mukherjee",
  bengaliGrandparents: "স্বর্গীয় প্রিয়নাথ মুখোপাধ্যায় ও স্বর্গীয়া বীণাপাণি মুখোপাধ্যায়ের পৌত্র",
  location: "Ballygunge, Kolkata",
  image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
  about: "Software Architect with a heart for old Kolkata lanes, Rabindrasangeet on vinyl, and weekend football.",
  bengaliAbout: "প্রযুক্তিপ্রেমী, সান্ধ্য রবিগান আর সাবেক কলকাতার গলিঘুঁজির একনিষ্ঠ রসিক।"
};

export const brideData: CoupleMember = {
  name: "Deboleena Banerjee",
  bengaliName: "দেবলীনা বন্দ্যোপাধ্যায়",
  role: "The Bride (কনে)",
  bengaliRole: "শ্রীমতী দেবলীনা",
  parents: "Daughter of Mr. Soumen & Mrs. Arpita Banerjee",
  bengaliParents: "শ্রী সৌমেন বন্দ্যোপাধ্যায় ও শ্রীমতী অর্পিতা বন্দ্যোপাধ্যায়ের কন্যা",
  grandparents: "Granddaughter of Late Bimal Krishna & Late Kalyani Banerjee",
  bengaliGrandparents: "স্বর্গীয় বিমলকৃষ্ণ বন্দ্যোপাধ্যায় ও স্বর্গীয়া কল্যাণী বন্দ্যোপাধ্যায়ের পৌত্রী",
  location: "Salt Lake, Kolkata",
  image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
  about: "Classical dancer, literature enthusiast, and creator of warmth wherever she goes.",
  bengaliAbout: "কথক নৃত্যশিল্পী, কথাসাহিত্যের মুগ্ধ পাঠক এবং হাসিখুশি প্রাণোচ্ছ্বল এক মন।"
};

export const weddingEvents: WeddingEvent[] = [
  {
    id: "event-1",
    key: "aiburobhat",
    title: "Aiburobhat",
    bengaliTitle: "আইবুড়োভাত",
    tagline: "The Traditional Bachelorhood Feast",
    bengaliTagline: "মধুর স্মৃতি ও স্নেহের পঞ্চব্যঞ্জন",
    date: "Thursday, 26th November 2026",
    bengaliDate: "১০ই অগ্রহায়ণ, ১৪৩৩ (বৃহস্পতিবার)",
    time: "12:30 PM Onwards",
    bengaliTime: "দুপুর ১২:৩০ ঘটিকা হইতে",
    venueName: "Mukherjee Residence, Ballygunge",
    bengaliVenueName: "মুখোপাধ্যায় নিবাস, বালিগঞ্জ, কলকাতা",
    dressCode: "Traditional Cotton Dhoti / Tant Saree",
    bengaliDressCode: "সুতির ফতুয়া-ধুতি / সুতি তাঁতের শাড়ি",
    colorTheme: "Pastel Ivory & Gold",
    accentBg: "from-amber-50 to-orange-50",
    accentBorder: "border-amber-300",
    description: "The heartwarming traditional farewell feast to bachelorhood, blessed by maternal aunts and elders with 5 kinds of fried delicacies, fish delicacies, and grandmother's secret payesh.",
    bengaliDescription: "পারিবারিক স্নেহ আর আদরের আয়োজনে পঞ্চভাজা, ইলিশ-চিংড়ি ও পায়েস সহযোগে আইবুড়ো জীবনের শেষ মধুর মধ্যাহ্নভোজ।",
    highlights: ["Maternal Blessings", "5-Course Traditional Thali", "Kahaar Songs"],
    bengaliHighlights: ["স্নেহাশিস ও শঙ্খধ্বনি", "পঞ্চব্যঞ্জনে অন্নপ্রসাদ", "পারিবারিক স্মৃতিচারণ"]
  },
  {
    id: "event-2",
    key: "gaye_holud",
    title: "Gaye Holud & Tattva",
    bengaliTitle: "গায়ে হলুদ ও শুভ অধিবাস",
    tagline: "Turmeric, Dhaak & Laughter",
    bengaliTagline: "হরিদ্রার ছোঁয়া ও উলুধ্বনির উল্লাস",
    date: "Friday, 27th November 2026",
    bengaliDate: "১১ই অগ্রহায়ণ, ১৪৩৩ (শুক্রবার)",
    time: "10:00 AM Onwards",
    bengaliTime: "প্রভাত ১০:০০ ঘটিকা হইতে",
    venueName: "The Courtyard, Raajkutir Swabhumi",
    bengaliVenueName: "রাজকুটির কোর্টইয়ার্ড, স্বভূমি, কলকাতা",
    dressCode: "Bright Mustard Yellow & Marigold Accents",
    bengaliDressCode: "বাসন্তী হলুদ ও কাঁচা হলুদের সাজ",
    colorTheme: "Marigold Yellow & Terracotta",
    accentBg: "from-yellow-50 to-amber-100",
    accentBorder: "border-yellow-400",
    description: "The groom's family touches raw turmeric to him, which travels to the bride along with ornate Tattva trays, sweets, decorated Rohu fish, and vibrant Dhaak beats.",
    bengaliDescription: "বর ও কনেকে শুভ কাঁচা হলুদের স্নিগ্ধ ছোঁয়া, বরতত্ত্ব ও কনেতত্ত্ব বিনিময়, আর ঢাকের তালে প্রাঙ্গণ মাতানো উৎসব।",
    highlights: ["Tattva Unveiling", "Live Dhaak & Shankho", "Mishti & Kulfi Bar"],
    bengaliHighlights: ["তত্ত্ব প্রদর্শনী", "লাইভ ঢাকের বোল ও উলুধ্বনি", "রসগোল্লা ও কুলফি ভোজ"]
  },
  {
    id: "event-3",
    key: "shubho_bibaho",
    title: "Shubho Bibaho (The Wedding)",
    bengaliTitle: "শুভ বিবাহ",
    tagline: "Saat Paak, Shubho Drishti & Sindoor Daan",
    bengaliTagline: "সাত পাক, শুভ দৃষ্টি ও চিরন্তন বন্ধন",
    date: "Saturday, 28th November 2026",
    bengaliDate: "১২ই অগ্রহায়ণ, ১৪৩৩ (শনিবার)",
    time: "Bor Jatri: 6:30 PM | Lagna: 8:15 PM",
    bengaliTime: "বরযাত্রী: সন্ধ্যা ৬:৩০ | শুভ লগ্ন: রাত্রি ৮:১৫",
    venueName: "The Royal Ballroom, Raajkutir Swabhumi",
    bengaliVenueName: "রয়্যাল বলরুম, রাজকুটির স্বভূমি, কলকাতা",
    dressCode: "Lal Paad Benarasi, Dhakai Jamdani & Tussar Silk Kurta",
    bengaliDressCode: "লাল চেলি/বেনারসী, ঢাকাই জামদানি ও সিল্কের ধুতি-পাঞ্জাবি",
    colorTheme: "Sindoor Red & Antique Gold",
    accentBg: "from-red-50 to-rose-100",
    accentBorder: "border-[#8B181B]",
    description: "The sacred Bengali marriage solemnized under Vedic mantras, Seven Sacred Steps (Saat Paak) on the wooden piri, the magical betel leaf peek (Shubho Drishti), exchange of floral garlands (Mala Badal), and Sindoor Daan.",
    bengaliDescription: "বৈদিক মন্ত্রোচ্চারণে পিঁড়িতে বসে সাত পাক, পান পাতার আড়ালে প্রথম মিলন শুভ দৃষ্টি, মালা বদল, কন্যাদান এবং পবিত্র সিঁদুর দান।",
    highlights: ["Bor Boron", "Saat Paak & Shubho Drishti", "Sindoor Daan & Saptapadi"],
    bengaliHighlights: ["বরণ ডালা ও বর বরণ", "সাত পাক ও শুভ দৃষ্টি", "সিঁদুর দান ও যজ্ঞাহুতি"]
  },
  {
    id: "event-4",
    key: "bou_bhaat",
    title: "Bou Bhaat & Preeti Bhoj",
    bengaliTitle: "বৌভাত ও প্রীতিভোজ",
    tagline: "Welcoming The Bride & Grand Banquet",
    bengaliTagline: "ভাত-কাপড় সংকল্প ও আনন্দ সংবর্ধনা",
    date: "Sunday, 29th November 2026",
    bengaliDate: "১৩ই অগ্রহায়ণ, ১৪৩৩ (রবিবার)",
    time: "7:00 PM Onwards",
    bengaliTime: "সন্ধ্যা ৭:০০ ঘটিকা হইতে",
    venueName: "Grand Crystal Lawn, ITC Sonar, Kolkata",
    bengaliVenueName: "গ্র্যান্ড ক্রিস্টাল লন, আইটিসি সোনার, কলকাতা",
    dressCode: "Regal Evening Attire / Silk Sarees & Suits",
    bengaliDressCode: "আভিজাত্যপূর্ণ সান্ধ্য পোশাক / সিল্ক শাড়ি ও জহর কোট",
    colorTheme: "Royal Indigo & Champagne Gold",
    accentBg: "from-amber-50 to-orange-50",
    accentBorder: "border-[#D4AF37]",
    description: "The groom presents the bride with a plate of rice, ghee, and clothes (Bhaat Kapor), pledging lifelong care, followed by an illustrious gala reception featuring the finest royal Bengali cuisine.",
    bengaliDescription: "ভাত-কাপড়ের অঙ্গীকারে নতুন কনেকে পরিবারের বরণ, আত্মীয়-পরিজনের মিলনমেলা এবং সুস্বাদু রাজকীয় নৈশভোজ।",
    highlights: ["Bhaat Kapor Ceremony", "Royal Bengali Buffet", "Live Acoustic Rabindrasangeet"],
    bengaliHighlights: ["ভাত-কাপড় অনুষ্ঠান", "রাজকীয় ভোজ ও মিষ্টি সম্ভার", "লাইভ সুরের মূর্ছনা"]
  }
];

export const rsvpContacts: RsvpContact[] = [
  {
    name: "Dr. Subrata Mukherjee",
    bengaliName: "ডঃ সুব্রত মুখোপাধ্যায়",
    relation: "Father of the Groom",
    bengaliRelation: "বরের পিতা",
    phone: "+91 98301 23456",
    whatsappNumber: "919830123456"
  },
  {
    name: "Mr. Soumen Banerjee",
    bengaliName: "শ্রী সৌমেন বন্দ্যোপাধ্যায়",
    relation: "Father of the Bride",
    bengaliRelation: "কনের পিতা",
    phone: "+91 98310 98765",
    whatsappNumber: "919831098765"
  },
  {
    name: "Koushik Mukherjee",
    bengaliName: "কৌশিক মুখোপাধ্যায়",
    relation: "Brother & Coordinator",
    bengaliRelation: "ভ্রাতা ও সমন্বয়ক",
    phone: "+91 98365 43210",
    whatsappNumber: "919836543210"
  }
];

export const venueDetails = {
  name: "Raajkutir - IHCL SeleQtions",
  bengaliName: "রাজকুটির - আইএইচসিএল সিলেক্শনস",
  address: "89C, Narkeldanga Main Rd, Phool Bagan, Kankurgachi, Kolkata, West Bengal 700054",
  bengaliAddress: "৮৯সি, নারকেলডাঙ্গা মেন রোড, ফুলবাগান, কাঁকুড়গাছি, কলকাতা ৭০০০৫৪",
  landmark: "Near Swabhumi / Mani Square Mall",
  bengaliLandmark: "স্বভূমি / মণি স্কয়ার মলের সন্নিকটে",
  mapsUrl: "https://maps.google.com/?q=Raajkutir+IHCL+SeleQtions+Kolkata",
  embedUrl: "https://maps.google.com/maps?q=Raajkutir+IHCL+SeleQtions+Kolkata&t=m&z=15&output=embed&iwloc=near",
  parking: "Valet parking available for all guests at the main porch.",
  bengaliParking: "সকল অতিথিদের জন্য মূল প্রবেশদ্বারে ভ্যালেট পার্কিং-এর সুব্যবস্থা রহিয়াছে।"
};

export const initialWishes: GuestWish[] = [
  {
    id: "wish-1",
    name: "Joydeep Da & Pampa Boudi",
    relation: "Cousin & Sister-in-law",
    message: "হৃদয়ভরা ভালোবাসা আর অফুরন্ত শুভকামনা রইল তোদের দুজনকে। নতুন জীবনের প্রতিটি অধ্যায় যেন আনন্দে ভরে থাকে!",
    timestamp: "2 hours ago",
    hearts: 14
  },
  {
    id: "wish-2",
    name: "Prof. Amitava Sen",
    relation: "Family Elder",
    message: "অনির্বাণ ও দেবলীনার যুগল মিলন কল্যাণময় হোক। সংসারের সব অমঙ্গল দূর করে তোমরা সুখী হও। আন্তরিক আশীর্বাদ রইল।",
    timestamp: "Yesterday",
    hearts: 21
  },
  {
    id: "wish-3",
    name: "Roshni & Saptarshi",
    relation: "College Friends",
    message: "Can't wait to see Anirban in Topor and Deboleena doing Shubho Drishti! Get ready for some crazy dance at the reception!",
    timestamp: "3 days ago",
    hearts: 9
  }
];

export const auspiciousQuotes = {
  shloka: "মঙ্গলং ভগবান বিষ্ণুঃ মঙ্গলং গরুড়ধ্বজঃ।\nমঙ্গলং পুণ্ডরীকাক্ষো মঙ্গলায় তনো হরিঃ॥",
  shlokaTranslation: "May Lord Vishnu, the protector of the universe, bestow his supreme divine blessings upon this auspicious union.",
  rabindraCouplet: "তোমার অসীমে প্রাণমন লয়ে যত দূরে আমি ধাই—\nকোথাও দুঃখ, কোথাও মৃত্যু, কোথা বিচ্ছেদ নাই।",
  rabindraAuthor: "— রবীন্দ্রনাথ ঠাকুর",
  englishLoveQuote: "Two souls, two families, woven into one eternal journey of love, culture, and shared laughter."
};
