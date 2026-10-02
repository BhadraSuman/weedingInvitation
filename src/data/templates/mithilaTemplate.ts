import { CulturalTemplate } from '../../types/wedding';

export const mithilaTemplate: CulturalTemplate = {
  id: 'mithila',
  name: 'Mithila Vivah (Madhubani Folk Heritage)',
  nativeName: 'मिथिला विवाह (मधुबनी कोहबर कला)',
  cultureLabel: 'मिथिला परिणय संस्कार',
  cultureTagline: 'Sacred Kohbar Folk Canvas, Maithili Vivah Geet & Royal Darbhanga Traditions',
  badgeEmoji: '🦚',
  nativeLanguageLabel: 'मैथिली / हिंदी',
  nativeLanguageCode: 'mai',
  colors: {
    primary: '#962200',        // Deep terracotta sindoor
    primaryDark: '#5c1300',
    primaryLight: '#b93815',
    accent: '#fe932c',         // Vibrant marigold turmeric
    accentLight: '#ffdcc3',
    bgParchment: '#fdf9f1',    // Natural handmade rice paper
    bgCard: '#f7f3eb',
    border: '#e1bfb7',
    textColor: '#1c1c17',
    envelopeOuter: '#962200',
    envelopeInner: 'from-[#fdf9f1] via-[#ffdcc3] to-[#962200]',
    buttonGradient: 'from-[#962200] via-[#fe932c] to-[#962200]'
  },
  audioTrack: {
    title: 'Sita-Ram Vivah Geet & Shehnai',
    artist: 'Traditional Maithili Folk Artists',
    url: '',
    theme: 'mithila'
  },
  quotes: {
    invocation: '॥ श्री गणेशाय नमः ॥',
    subInvocation: 'सीता-रामक पावन मिथिलाक पावन परिणय सूत्र',
    verse: 'गौरी-शंकर सम प्रेम हो, सीता-राम सन अनुराग।\nमिथिलाक पावन संस्कृति में नवदम्पतिक कल्याण हो॥',
    verseTranslation: 'May their eternal love mirror Gauri-Shankar and Sita-Ram in the blessed soil of King Janak’s Mithila.',
    verseAuthor: '— पारम्परिक मिथिला विवाह आशीष',
    weddingTitle: 'Mithila Vivah: Abhishek & Maithili',
    nativeWeddingTitle: 'मिथिला पावन विवाह: अभिषेक संग मैथिली',
    welcomeNotice: 'With the divine blessings of Lord Shiva and Goddess Janaki, we warmly invite you to witness our auspicious Kohbar wedding ceremony.',
    nativeWelcomeNotice: 'सीता-रामक पावन मिथिलाक भूमिसँ अहाँ सभ सादर आमन्त्रित छी। नव दम्पतिकेँ अपन स्नेह आ आशीर्वाद प्रदान करू।',
    familySignoff: '॥ With blessings of Jha & Choudhary Families ॥',
    nativeFamilySignoff: '॥ दर्शनाभिलाषी: समस्त झा, चौधरी एवं कुमार परिवार (मधुबनी व दरभंगा) ॥'
  },
  targetDate: '2026-11-22T20:30:00+05:30',
  targetDateNative: 'माघ शुक्ल पक्ष, शुभ लगन संवत् २०८२ | रात्रि ०८:३० बजे',
  groom: {
    name: 'Abhishek Kumar',
    nativeName: 'चि० अभिषेक कुमार',
    role: 'Groom (वर)',
    nativeRole: 'वर: चि० अभिषेक कुमार',
    parents: 'S/o Smt. Sunita Devi & Sri Rameshwar Jha',
    nativeParents: 'सुपुत्र: श्रीमती सुनीता देवी एवं श्री रामेश्वर झा',
    grandparents: 'Grandson of Late Pt. Ramnandan Jha',
    nativeGrandparents: 'पौत्र: स्व० पं० रामनन्दन झा एवं श्रीमती गंगा देवी',
    location: 'Ranti, Madhubani (Darbhanga)',
    image: '/images/couples/north-groom.jpg',
    about: 'Software Architect in Bengaluru, devoted Madhubani art enthusiast, and champion of Mithila heritage.',
    nativeAbout: 'सॉफ्टवेयर वास्तुकार, पारम्परिक मिथिला लोककला व संगीत के मर्मज्ञ एवं रांटी के गौरव।'
  },
  bride: {
    name: 'Maithili Jha',
    nativeName: 'आयु० मैथिली झा',
    role: 'Bride (वधू)',
    nativeRole: 'वधू: आयु० मैथिली झा',
    parents: 'D/o Smt. Usha Jha & Sri Bimal Kant Jha',
    nativeParents: 'सुपुत्री: श्रीमती उषा झा एवं श्री बिमल कान्त झा',
    grandparents: 'Granddaughter of Late Acharya Harimohan Jha',
    nativeGrandparents: 'पौत्री: स्व० आचार्य हरिमोहन झा एवं श्रीमती विद्या देवी',
    location: 'Punora Dham, Sitamarhi / Janakpur',
    image: '/images/couples/north-bride.jpg',
    about: 'Assistant Professor of Sanskrit Literature, certified Madhubani painter, and classical vocalist.',
    nativeAbout: 'संस्कृत साहित्य की सहायक प्राध्यापिका, सिद्धहस्त मधुबनी चित्रकार एवं पारम्परिक मिथिला गायिका।'
  },
  events: [
    {
      id: 'mithila-ev-1',
      key: 'matkor_tilak',
      title: 'Matkor & Tilak Ceremony',
      nativeTitle: '१. माटि कोड़ब आ तिलक उत्सव',
      tagline: 'Sacred soil excavation and auspicious groom tilak',
      nativeTagline: 'पवित्र मृत्तिका खनन, कुलदेवता पूजन एवं वर तिलक अनुष्ठान',
      date: '20 Nov 2026',
      nativeDate: '२० नवम्बर २०२६',
      time: '10:00 AM',
      nativeTime: 'प्रातः १०:०० बजे',
      venueName: 'Kula Devata Mandir & Courtyard, Madhubani',
      nativeVenueName: 'कुलदेवता प्रांगण, रांटी, मधुबनी',
      dressCode: 'Peetambari (Turmeric Silk)',
      nativeDressCode: 'पीताम्बरी (Turmeric Silk)',
      colorTheme: '#fe932c',
      accentBg: '#ffdcc3',
      accentBorder: '#fe932c',
      description: 'Digging sacred clay (Matkor) accompanied by joyous women folk choruses, followed by ancestral Tilak ritual.',
      nativeDescription: 'पवित्र मृत्तिका खनन, कुलदेवता पूजन एवं वर तिलक अनुष्ठान पारम्परिक मंगल गीतों के साथ।',
      highlights: ['Matkor Dug Ritual', 'Tilak Samanway', 'Goddess Lakshmi Invocation'],
      nativeHighlights: ['माटि कोड़ब अनुष्ठान', 'वर तिलक अर्पण', 'मंगल सोहर गान'],
      calendarTimes: { start: '2026-11-20T10:00:00', end: '2026-11-20T13:30:00' }
    },
    {
      id: 'mithila-ev-2',
      key: 'haridra_sohar',
      title: 'Haridra Lepan & Sohar Geet',
      nativeTitle: '२. हरिद्रा लेपन आ सोहर गान',
      tagline: 'Fragrant mustard turmeric paste and wedding folk songs',
      nativeTagline: 'सुवासित सरिसव-हरिद्रा लेपन, नहाय-खाय एवं मिथिलाक पारम्परिक बटगवनी',
      date: '21 Nov 2026',
      nativeDate: '२१ नवम्बर २०२६',
      time: '11:30 AM',
      nativeTime: 'पूर्वाह्न ११:३० बजे',
      venueName: 'Aangan (Ancestral Courtyard), Darbhanga',
      nativeVenueName: 'पारिवारिक आँगन, दरभंगा',
      dressCode: 'Basanti Peela (Mustard Cotton/Silk)',
      nativeDressCode: 'बसंती पीला (Mustard)',
      colorTheme: '#c9a900',
      accentBg: '#fff9eb',
      accentBorder: '#c9a900',
      description: 'Traditional Haldi ritual with fresh mustard and wild turmeric, celebrated with Batgavani folk verses.',
      nativeDescription: 'सुवासित सरिसव-हरिद्रा लेपन, नहाय-खाय एवं मिथिलाक पारम्परिक बटगवनी और सोहर।',
      highlights: ['Ubtan Preparation', 'Aangan Folk Choir', 'Nahay-Khay Feast'],
      nativeHighlights: ['सरिसव-हल्दी लेपन', 'बटगवनी एवं सोहर', 'सात्विक नहाय-खाय भोज'],
      calendarTimes: { start: '2026-11-21T11:30:00', end: '2026-11-21T15:00:00' }
    },
    {
      id: 'mithila-ev-3',
      key: 'barat_dwar',
      title: 'Barat Agaman & Dwar Puja',
      nativeTitle: '३. वरयात्री स्वागत व द्वारपूजा',
      tagline: 'Welcoming the procession with conch, dhol and shehnai',
      nativeTagline: 'ढाक, शहनाई आ शंखध्वनि संग वरयात्रीक अगवानी एवं समधी मिलन',
      date: '22 Nov 2026',
      nativeDate: '२२ नवम्बर २०२६',
      time: '06:00 PM',
      nativeTime: 'संध्या ०६:०० बजे',
      venueName: 'Raj Darbhanga Palace Grounds',
      nativeVenueName: 'राज दरभंगा परिसर (किला घाट), दरभंगा',
      dressCode: 'Mithila Paag & Kurta Pajama',
      nativeDressCode: 'मिथिला पाग-दोपटा एवं कुर्ता',
      colorTheme: '#962200',
      accentBg: '#ffdbd2',
      accentBorder: '#962200',
      description: 'Grand reception of groom party with Mithila Paag crowning, Samdhi Milan, and Dwar Puja rites.',
      nativeDescription: 'ढाक, शहनाई आ शंखध्वनि संग वरयात्रीक अगवानी एवं समधी मिलन व द्वारपूजा।',
      highlights: ['Paag Felicitation', 'Samdhi Milan', 'Dwar Char Ritual'],
      nativeHighlights: ['पाग-दोपटा सम्मान', 'समधी मिलन', 'द्वार चार मंगल'],
      calendarTimes: { start: '2026-11-22T18:00:00', end: '2026-11-22T20:30:00' }
    },
    {
      id: 'mithila-ev-4',
      key: 'shubh_vivah',
      title: 'Shubh Vivah & Sindoor Daan',
      nativeTitle: '४. शुभ विवाह व सिन्दूर दान',
      tagline: 'Kanyadaan and sacred seven rounds inside Kohbar Ghar',
      nativeTagline: 'पवित्र कोहबर मण्डप में सप्तपदी, कन्यादान, सिन्दूर दान एवं लाजा होम',
      date: '22 Nov 2026',
      nativeDate: '२२ नवम्बर २०२६',
      time: '08:30 PM (Godhuli Lagna)',
      nativeTime: 'गोधूलि वेला • रात्रि ०८:३० बजे',
      venueName: 'Kohbar Mandap, Raj Darbhanga Palace',
      nativeVenueName: 'कोहबर मण्डप, राज दरभंगा परिसर',
      dressCode: 'Mithila Ceremonial Attire',
      nativeDressCode: 'पारम्परिक वैवाहिक परिधान',
      colorTheme: '#b93815',
      accentBg: '#ffdcc3',
      accentBorder: '#b93815',
      description: 'Vedic nuptials conducted inside the sacred Kohbar enclosure adorned with Surya, Chandra, Bans, and Kamal paintings.',
      nativeDescription: 'पवित्र कोहबर मण्डप में सप्तपदी, कन्यादान, सिन्दूर दान एवं लाजा होम अनुष्ठान।',
      highlights: ['Saptapadi', 'Sindoor Daan', 'Kohbar Pranam'],
      nativeHighlights: ['सप्तपदी सात फेरे', 'सिन्दूर दान', 'कोहबर घर मंगल दर्शन'],
      calendarTimes: { start: '2026-11-22T20:30:00', end: '2026-11-23T02:00:00' }
    }
  ],
  venue: {
    name: 'Raj Darbhanga Palace (Heritage Lawn)',
    nativeName: 'राज दरभंगा परिसर (हेरिटेज लॉन)',
    address: 'Kila Ghat, Darbhanga, Bihar - 846004',
    nativeAddress: 'किला घाट, दरभंगा, बिहार - ८४६००४',
    landmark: 'Near Anand Bagh Palace & Kameshwar Singh Sanskrit University',
    nativeLandmark: 'आनन्द बाग पैलेस एवं संस्कृत विश्वविद्यालय के निकट',
    mapsUrl: 'https://maps.google.com/?q=Darbhanga+Palace+Bihar',
    embedUrl: 'https://maps.google.com/?q=Darbhanga+Palace+Bihar&output=embed',
    parking: 'Dedicated Royal Lawn Valet Parking (500+ Vehicles)',
    nativeParking: 'राजप्रांगण आरक्षित वाहन पार्किंग (५००+ गाड़ियाँ)',
    metroStation: 'Darbhanga Junction (DBG) - 2.2 km | Airport (DBR) - 6.5 km',
    nativeMetroStation: 'दरभंगा जंक्शन (२.२ किमी) | दरभंगा हवाईअड्डा (६.५ किमी)'
  },
  rsvpContacts: [
    {
      name: 'Dr. Prabhakar Jha',
      nativeName: 'डॉ० प्रभाकर झा',
      relation: 'Groom Uncle',
      nativeRelation: 'ज्येष्ठ ताऊ जी',
      phone: '+91 98350 12345',
      whatsappNumber: '919835012345'
    },
    {
      name: 'Er. Ashutosh Kumar',
      nativeName: 'ई० आशुतोष कुमार',
      relation: 'Cousin',
      nativeRelation: 'भ्राता',
      phone: '+91 94310 67890',
      whatsappNumber: '919431067890'
    }
  ],
  initialWishes: [
    {
      id: 'mw-1',
      name: 'प्रो० रश्मि झा',
      relation: 'पारिवारिक स्नेही',
      message: 'सीता-राम सन पावन जोड़ी केँ मिथिलाक समस्त देवगणक असीम आशीर्वाद प्राप्त होय। खूब सुख-समृद्धि पाओल जाउ!',
      timestamp: 'Just now',
      hearts: 28
    },
    {
      id: 'mw-2',
      name: 'पं० मुरलीधर चौधरी',
      relation: 'कुलपुरोहित',
      message: 'मांगलिक लगन में वर-वधू केँ दीर्घायु, यश आ अटूट प्रेमक आशीष!',
      timestamp: '2 hours ago',
      hearts: 19
    }
  ],
  quickWishes: {
    native: [
      'सीता-राम सम पावन अनुराग सदा बनल रहय! 🪔',
      'मिथिलाक पाग आ दोपटाक मर्यादा अमर रहय! 🚩',
      'नव दम्पतिकेँ ढेरो मंगलकामना आ आशीर्वाद! 🌸',
      'सदा हँसैत-खिलैत रहू, दीर्घायु होउ! ✨'
    ],
    en: [
      'Heartiest congratulations to the divine couple! 🪔',
      'May your journey be blessed like Sita-Ram! 🌸',
      'Wishing you eternal happiness and harmony! ✨',
      'Best wishes from all of us! 🎊'
    ]
  },
  shagunConfig: {
    enabled: true,
    recipientName: 'Abhishek & Maithili',
    nativeRecipientName: 'अभिषेक एवं मैथिली',
    upiId: 'mithilavivah@upi',
    phoneNumber: '+91 98350 12345',
    title: 'Digital Shagun / Neg (शुभ आशीर्वाद नेग)',
    nativeTitle: 'डिजिटल शगुन / नेग (शुभ आशीर्वाद)',
    description: 'Your presence is our ultimate blessing. If you wish to send digital love and shagun:',
    nativeDescription: 'अहाँक स्नेह आ आशीर्वाद ही सर्वोपरि अछि। यदि अहाँ नवदम्पति केँ डिजिटल शगुन पठेबाक इच्छुक छी:',
    defaultAmounts: [501, 1001, 2101, 5001]
  }
};
