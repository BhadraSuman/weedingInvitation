import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, CheckCircle2, Clock, XCircle, Eye, Send, 
  Download, Plus, Search, Sparkles, Utensils, 
  ExternalLink, Check, Copy, MessageCircle, Music,
  Train, Film, Radio, Disc, ThumbsUp
} from 'lucide-react';
import { weddingsRegistry } from '../data/weddings';

interface GuestRecord {
  id: string;
  name: string;
  phone: string;
  category: 'Groom Family' | 'Bride Family' | 'VIP Guests' | 'Friends & Colleagues';
  linkOpened: boolean;
  openedAt?: string;
  openCount: number;
  rsvpStatus: 'attending' | 'pending' | 'declined';
  adultsCount: number;
  kidsCount: number;
  mealPref: 'traditional' | 'satvik';
  seatOrBerth?: string;
  requestedSong?: string;
  lastReminderSent?: string;
  shagunAmount?: number;
}

interface DJRequest {
  id: string;
  guestName: string;
  songTitle: string;
  submittedAt: string;
  status: 'queued' | 'approved' | 'played';
  votes: number;
}

const INITIAL_GUESTS: Record<string, GuestRecord[]> = {
  'rangla-punjab': [
    {
      id: 'g-rp-1',
      name: 'Harpreet Singh & Family',
      phone: '9876541234',
      category: 'Groom Family',
      linkOpened: true,
      openedAt: '1 hour ago',
      openCount: 5,
      rsvpStatus: 'attending',
      adultsCount: 4,
      kidsCount: 2,
      mealPref: 'traditional',
      requestedSong: '3 Peg (Sharry Mann)',
      shagunAmount: 11000
    },
    {
      id: 'g-rp-2',
      name: 'Gurinder & Jasleen Sandhu',
      phone: '9812345678',
      category: 'Bride Family',
      linkOpened: true,
      openedAt: '3 hours ago',
      openCount: 3,
      rsvpStatus: 'attending',
      adultsCount: 2,
      kidsCount: 1,
      mealPref: 'traditional',
      requestedSong: 'Morni Banke (Bhangra Mix)',
      shagunAmount: 5100
    },
    {
      id: 'g-rp-3',
      name: 'Daljeet Chawla (Mama Ji)',
      phone: '9833445566',
      category: 'Groom Family',
      linkOpened: true,
      openedAt: 'Yesterday',
      openCount: 2,
      rsvpStatus: 'attending',
      adultsCount: 3,
      kidsCount: 0,
      mealPref: 'satvik',
      requestedSong: 'Sauda Khara Khara',
      shagunAmount: 21000
    },
    {
      id: 'g-rp-4',
      name: 'Simranjeet & Friends',
      phone: '9899887766',
      category: 'Friends & Colleagues',
      linkOpened: false,
      openCount: 0,
      rsvpStatus: 'pending',
      adultsCount: 2,
      kidsCount: 0,
      mealPref: 'traditional'
    }
  ],
  'mithila-vivah': [
    {
      id: 'g-mv-1',
      name: 'Pt. Vidyadhar Jha & Family',
      phone: '9835012345',
      category: 'Groom Family',
      linkOpened: true,
      openedAt: '2 hours ago',
      openCount: 4,
      rsvpStatus: 'attending',
      adultsCount: 4,
      kidsCount: 1,
      mealPref: 'traditional',
      shagunAmount: 5100
    },
    {
      id: 'g-mv-2',
      name: 'Raghunath Mishra (Mama Ji)',
      phone: '9835098765',
      category: 'Bride Family',
      linkOpened: true,
      openedAt: 'Yesterday',
      openCount: 3,
      rsvpStatus: 'attending',
      adultsCount: 3,
      kidsCount: 0,
      mealPref: 'satvik',
      shagunAmount: 11000
    },
    {
      id: 'g-mv-3',
      name: 'Dr. Anand Choudhary & Family',
      phone: '9835112233',
      category: 'VIP Guests',
      linkOpened: false,
      openCount: 0,
      rsvpStatus: 'pending',
      adultsCount: 2,
      kidsCount: 0,
      mealPref: 'traditional'
    }
  ],
  'default': [
    {
      id: 'g-1',
      name: 'Sharma Ji & Family',
      phone: '9876543210',
      category: 'Groom Family',
      linkOpened: true,
      openedAt: '2 hours ago',
      openCount: 4,
      rsvpStatus: 'attending',
      adultsCount: 4,
      kidsCount: 1,
      mealPref: 'traditional',
      shagunAmount: 5100
    },
    {
      id: 'g-2',
      name: 'Mishra Ji & Family',
      phone: '9834123456',
      category: 'Bride Family',
      linkOpened: true,
      openedAt: 'Yesterday',
      openCount: 2,
      rsvpStatus: 'attending',
      adultsCount: 3,
      kidsCount: 0,
      mealPref: 'satvik',
      shagunAmount: 2100
    },
    {
      id: 'g-3',
      name: 'Dr. Debabrata Roy & Family',
      phone: '9830112233',
      category: 'VIP Guests',
      linkOpened: true,
      openedAt: '5 hours ago',
      openCount: 1,
      rsvpStatus: 'pending',
      adultsCount: 2,
      kidsCount: 1,
      mealPref: 'traditional'
    },
    {
      id: 'g-4',
      name: 'Rajeev & Sunita Agarwal',
      phone: '9871239870',
      category: 'VIP Guests',
      linkOpened: false,
      openCount: 0,
      rsvpStatus: 'pending',
      adultsCount: 2,
      kidsCount: 0,
      mealPref: 'satvik'
    },
    {
      id: 'g-5',
      name: 'Vikram Sethi & Family',
      phone: '9822334455',
      category: 'Friends & Colleagues',
      linkOpened: true,
      openedAt: '4 days ago',
      openCount: 1,
      rsvpStatus: 'declined',
      adultsCount: 0,
      kidsCount: 0,
      mealPref: 'satvik'
    }
  ]
};

const INITIAL_DJ_REQUESTS: DJRequest[] = [
  { id: 'dj-1', guestName: 'Harpreet Singh', songTitle: '3 Peg — Sharry Mann', submittedAt: '1 hour ago', status: 'approved', votes: 14 },
  { id: 'dj-2', guestName: 'Jasleen Sandhu', songTitle: 'London Thumakda — Queen', submittedAt: '2 hours ago', status: 'approved', votes: 19 },
  { id: 'dj-3', guestName: 'Daljeet Chawla', songTitle: 'Sauda Khara Khara — Good Newwz', submittedAt: 'Yesterday', status: 'queued', votes: 9 },
  { id: 'dj-4', guestName: 'Simran & Gang', songTitle: 'Kala Chashma — Baar Baar Dekho', submittedAt: 'Yesterday', status: 'queued', votes: 24 },
  { id: 'dj-5', guestName: 'Rohit Verma', songTitle: 'Mundian To Bach Ke — Panjabi MC', submittedAt: '2 days ago', status: 'played', votes: 31 }
];

const CULTURAL_FEAST_NAMES: Record<string, { label: string; tradName: string; satvikName: string }> = {
  'rangla-punjab': {
    label: 'Majha Royal Dhaba Feast',
    tradName: '🍗 Amritsari Butter Chicken & Mutton Rogan Josh',
    satvikName: '🌿 Sarson Da Saag, Makki Roti & Dal Makhani'
  },
  'mithila-vivah': {
    label: 'Mithilanchal Paramparik Bhoj',
    tradName: '🐟 Mithila Macha-Bhaat (Rohu & Katla)',
    satvikName: '🌿 Satvik Ol-Tarua, Kadhi-Bari & Makhana Kheer'
  },
  'pot-katha': {
    label: 'Kalighat Shahi Bhojon',
    tradName: '🦐 Daab Chingri & Ilish Bhapa',
    satvikName: '🍚 Ghee Basanti Pulao, Dhokar Dalna & Chhanar Kalia'
  },
  'shola': {
    label: 'Santiniketan Luxury Rajbari Menu',
    tradName: '🐟 Bhetki Paturi & Chingri Malai Curry',
    satvikName: '🍚 Gobindobhog Pulao & Radhabhallavi Chholar Dal'
  },
  'the-wedding-gazette': {
    label: 'Grand Imperial Banquet Menu',
    tradName: '🍗 Royal Kolkata Mutton Biryani & Chaap',
    satvikName: '🌿 Awadhi Paneer Pulao & Zafrani Dum Aloo'
  },
  'the-grand-premiere': {
    label: 'Blockbuster Red Carpet Catering',
    tradName: '🍿 Gourmet Theater Non-Veg Platter & Biryani',
    satvikName: '🥗 VIP Director’s Satvik Bento'
  },
  'vivah-express': {
    label: 'IRCTC Royal Express Dining Car',
    tradName: '🍱 Executive Non-Veg Pantry Thali',
    satvikName: '🥗 Satvik Jain Express Casserole'
  },
  'anirban-weds-deboleena': {
    label: 'Subho Bibaha Bhoj',
    tradName: '🐟 Chingri Malai & Bhetki Fry',
    satvikName: '🍚 Ghee Pulao & Potoler Dorma'
  },
  'sandeep-weds-priya': {
    label: 'Shubh Vivah Mahabhoj',
    tradName: '🍗 Mughlai Rogan Josh & Shahi Mutton',
    satvikName: '🌿 Dal Baati Churma, Paneer Lababdar & Kesariya Kheer'
  }
};

const CULTURAL_GREETINGS: Record<string, string> = {
  'mithila-vivah': 'प्रणाम! मिथिलाक पावन परिणय में अहाँक सपरिवार सादर निमंत्रণ अछि। अपन पत्रिका देखबाक लेल लिंक पर क्लिक करू:',
  'pot-katha': 'নমস্কার! আমাদের পরিবারের শুভ পরিণয় অনুষ্ঠানে পটচিত্র বিবাহগাঁথায় আপনার সপরিবারে আন্তরিক আমন্ত্রণ রইল:',
  'shola': 'নমস্কার! শোলার শুভ পরিণয় বাসরে আপনার সস্নেহ উপস্থিতি ও আশীর্বাদ একান্ত প্রার্থনা করি:',
  'rangla-punjab': 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਸਾਡੇ ਵਿਆਹ ਸਮਾਗਮ ਵਿੱਚ ਬੱਲੇ-ਬੱਲੇ ਅਤੇ ਧਮਾਲਾਂ ਪਾਉਣ ਲਈ ਤੁਹਾਨੂੰ ਸੱਦਾ ਹੈ:',
  'the-wedding-gazette': 'Extra! Extra! Nuptial Dispatch: You are on the front-page VIP guest roster. Tap to read your personal broadsheet:',
  'the-grand-premiere': 'Lights, Camera, Shaadi! You are invited to The Grand Premiere. Tap to view your VIP theater ticket & schedule:',
  'vivah-express': 'All Aboard Vivah Express! Your confirmed seat (CNF) is ready. Tap to view your luxury railway boarding pass:',
  'anirban-weds-deboleena': 'নমস্কার! আমাদের পরিবারের শুভ পরিণয় অনুষ্ঠানে আপনার সপরিবারে আন্তরিক উপস্থিতি ও আশীর্বাদ একান্ত কাম্য:',
  'sandeep-weds-priya': 'सादर प्रणाम! हमारे परिवार के मांगलिक वैवाहिक उत्सव में आपका सपरिवार हार्दिक स्वागत एवं अभिनंदन है:'
};

export const HostDashboardPage: React.FC = () => {
  const [selectedEventSlug, setSelectedEventSlug] = useState('rangla-punjab');
  const [guestStore, setGuestStore] = useState<Record<string, GuestRecord[]>>(INITIAL_GUESTS);
  const [djRequests, setDjRequests] = useState<DJRequest[]>(INITIAL_DJ_REQUESTS);
  const [activeViewTab, setActiveViewTab] = useState<'guests' | 'dj' | 'feast'>('guests');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'attending' | 'pending' | 'unopened' | 'declined'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Add Guest Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestPhone, setNewGuestPhone] = useState('');
  const [newGuestCategory, setNewGuestCategory] = useState<GuestRecord['category']>('Groom Family');
  const [newGuestAdults, setNewGuestAdults] = useState(2);
  const [newGuestMeal, setNewGuestMeal] = useState<'traditional' | 'satvik'>('traditional');

  // Active Wedding Entry
  const currentWedding = weddingsRegistry[selectedEventSlug] || weddingsRegistry['rangla-punjab'];
  const cultureType = currentWedding?.cultureType || 'rangla_punjab';
  const coupleTitle = currentWedding?.title || 'Wedding Celebration';
  const eventDate = currentWedding?.template?.targetDateNative || 'Winter 2026';
  
  // Custom greeting message based on selected event
  const reminderNote = CULTURAL_GREETINGS[selectedEventSlug] || 
    'Namaste! Just a gentle reminder to confirm your attendance for our upcoming celebration. Tap to open your personalized card:';

  // Get guests for current event
  const guests = guestStore[selectedEventSlug] || guestStore['default'] || [];

  // Compute Metrics
  const metrics = useMemo(() => {
    const totalInvited = guests.length;
    const openedCount = guests.filter(g => g.linkOpened).length;
    const attendingGuests = guests.filter(g => g.rsvpStatus === 'attending');
    const pendingCount = guests.filter(g => g.rsvpStatus === 'pending').length;
    const declinedCount = guests.filter(g => g.rsvpStatus === 'declined').length;
    
    const totalAttendingHeads = attendingGuests.reduce((acc, g) => acc + g.adultsCount + g.kidsCount, 0);
    const traditionalMealCount = attendingGuests.filter(g => g.mealPref === 'traditional').reduce((acc, g) => acc + g.adultsCount + g.kidsCount, 0);
    const satvikMealCount = attendingGuests.filter(g => g.mealPref === 'satvik').reduce((acc, g) => acc + g.adultsCount + g.kidsCount, 0);
    const totalShagun = guests.reduce((acc, g) => acc + (g.shagunAmount || 0), 0);

    return {
      totalInvited,
      openedCount,
      openRate: totalInvited > 0 ? Math.round((openedCount / totalInvited) * 100) : 0,
      attendingFamilies: attendingGuests.length,
      totalAttendingHeads,
      pendingCount,
      declinedCount,
      traditionalMealCount,
      satvikMealCount,
      totalShagun
    };
  }, [guests]);

  // Filtered List
  const filteredGuests = useMemo(() => {
    return guests.filter(g => {
      const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.phone.includes(searchQuery);
      if (!matchesSearch) return false;

      if (filterTab === 'attending') return g.rsvpStatus === 'attending';
      if (filterTab === 'pending') return g.rsvpStatus === 'pending';
      if (filterTab === 'unopened') return !g.linkOpened;
      if (filterTab === 'declined') return g.rsvpStatus === 'declined';
      return true;
    });
  }, [guests, searchQuery, filterTab]);

  const getPersonalizedUrl = (guestName: string) => {
    const encoded = encodeURIComponent(guestName);
    return `https://utsavpatra.vercel.app/${selectedEventSlug}?to=${encoded}`;
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendWhatsAppReminder = (guest: GuestRecord) => {
    const link = getPersonalizedUrl(guest.name);
    const text = encodeURIComponent(
      `✨ *INVITATION: ${coupleTitle}*\n\n${reminderNote}\n\n👤 *Guest:* ${guest.name}\n🔗 *Open Card:* ${link}\n\nWith warm regards,\nHost Family`
    );
    window.open(`https://wa.me/91${guest.phone}?text=${text}`, '_blank');

    // Update last reminder sent
    setGuestStore(prev => {
      const currentList = prev[selectedEventSlug] || prev['default'] || [];
      const updated = currentList.map(g => g.id === guest.id ? { ...g, lastReminderSent: 'Just now' } : g);
      return { ...prev, [selectedEventSlug]: updated };
    });
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    const newGuest: GuestRecord = {
      id: `g-${Date.now()}`,
      name: newGuestName.trim(),
      phone: newGuestPhone.trim() || '9876543210',
      category: newGuestCategory,
      linkOpened: false,
      openCount: 0,
      rsvpStatus: 'pending',
      adultsCount: Number(newGuestAdults) || 2,
      kidsCount: 0,
      mealPref: newGuestMeal
    };

    setGuestStore(prev => {
      const currentList = prev[selectedEventSlug] || prev['default'] || [];
      return { ...prev, [selectedEventSlug]: [newGuest, ...currentList] };
    });

    setIsAddModalOpen(false);
    setNewGuestName('');
    setNewGuestPhone('');
  };

  const toggleDjStatus = (id: string) => {
    setDjRequests(prev => prev.map(req => {
      if (req.id !== id) return req;
      const nextStatus = req.status === 'queued' ? 'approved' : req.status === 'approved' ? 'played' : 'queued';
      return { ...req, status: nextStatus };
    }));
  };

  const copyDjPlaylist = () => {
    const approved = djRequests.filter(r => r.status === 'approved');
    const text = `🎧 *MIDNIGHT SANGEET DJ PLAYLIST*\n\n` +
      approved.map((r, i) => `${i + 1}. ${r.songTitle} (Requested by ${r.guestName} • ${r.votes} votes)`).join('\n') +
      `\n\n🎶 Total Approved Songs: ${approved.length}`;
    navigator.clipboard.writeText(text);
    alert('DJ Playlist copied to clipboard! You can paste it directly to your DJ or sound coordinator via WhatsApp.');
  };

  const exportCsv = () => {
    const headers = ['Guest Name', 'Phone', 'Category', 'Card Opened', 'RSVP Status', 'Adults', 'Kids', 'Feast Choice', 'Song Request'];
    const rows = guests.map(g => [
      `"${g.name}"`,
      `"${g.phone}"`,
      `"${g.category}"`,
      g.linkOpened ? 'Opened' : 'Not Opened',
      g.rsvpStatus,
      g.adultsCount,
      g.kidsCount,
      g.mealPref === 'traditional' ? 'Traditional Regional' : 'Satvik Pure Veg',
      `"${g.requestedSong || 'None'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedEventSlug}-host-rsvp-roster.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const feastInfo = CULTURAL_FEAST_NAMES[selectedEventSlug] || {
    label: 'Catering & Dining Service',
    tradName: '🍛 Traditional Feast',
    satvikName: '🌿 Satvik Pure Veg'
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans pb-24 antialiased">
      
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#8B181B] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4 text-[#F3E5AB]" />
            </div>
            <span className="font-serif font-black text-xl text-[#8B181B] tracking-tight">
              UtsavPatra
            </span>
          </Link>
          <span className="text-xs bg-[#8B181B]/10 text-[#8B181B] px-2.5 py-0.5 rounded-full font-serif font-bold uppercase tracking-wider">
            Host Dashboard
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Multi-Celebration Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif font-bold text-stone-500 hidden md:inline">Celebration:</span>
            <select
              value={selectedEventSlug}
              onChange={(e) => setSelectedEventSlug(e.target.value)}
              className="text-xs font-serif font-bold bg-stone-100 text-stone-800 rounded-xl px-3 py-1.5 border border-stone-300 outline-none hover:bg-stone-200 transition-colors"
            >
              {Object.values(weddingsRegistry).map((w) => (
                <option key={w.slug} value={w.slug}>
                  {w.badgeEmoji} {w.coupleNames} — {w.cultureName}
                </option>
              ))}
            </select>
          </div>

          <Link
            to={`/${selectedEventSlug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 text-stone-700 hover:text-[#8B181B] text-xs font-serif font-bold transition-colors bg-white shadow-sm"
          >
            <span>View Invite</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        
        {/* Welcome Celebration Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#8B181B] via-[#6F1013] to-[#45080A] text-[#F3E5AB] shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden border border-[#D4AF37]/30">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-serif uppercase tracking-wider mb-2">
              <span className="text-base">{currentWedding?.badgeEmoji || '✨'}</span>
              <span>{currentWedding?.cultureName || 'Cultural Celebration'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {coupleTitle}
            </h1>
            <p className="text-xs sm:text-sm font-serif text-[#F3E5AB]/90 mt-1 max-w-2xl">
              📅 Date: <strong>{eventDate}</strong> • Live guest link clicks, regional feast counts, and DJ song requests.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-serif text-xs font-bold shadow-lg transition-transform hover:scale-105 whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create VIP Link</span>
            </button>
            <button
              onClick={exportCsv}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-serif text-xs font-bold border border-white/20 transition-all whitespace-nowrap shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Export Roster (CSV)</span>
            </button>
          </div>
        </div>

        {/* 4 Primary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Metric 1: Total Invited */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-serif font-bold uppercase tracking-wider">Invited Families</span>
              <Users className="w-4 h-4 text-stone-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-extrabold text-stone-900">
              {metrics.totalInvited} <span className="text-xs font-sans font-normal text-stone-400">links dispatched</span>
            </div>
            <p className="text-[11px] font-serif text-stone-500 mt-1">
              Personalized guest cards
            </p>
          </div>

          {/* Metric 2: Links Opened */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-serif font-bold uppercase tracking-wider">Link Open Rate</span>
              <Eye className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-extrabold text-emerald-700">
              {metrics.openedCount} <span className="text-xs font-sans font-normal text-emerald-600">({metrics.openRate}%)</span>
            </div>
            <p className="text-[11px] font-serif text-stone-500 mt-1">
              Opened by guests on mobile
            </p>
          </div>

          {/* Metric 3: Confirmed Attending */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-serif font-bold uppercase tracking-wider">Confirmed Guests</span>
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-extrabold text-blue-800">
              {metrics.totalAttendingHeads} <span className="text-xs font-sans font-normal text-blue-600">heads</span>
            </div>
            <p className="text-[11px] font-serif text-stone-500 mt-1">
              {metrics.attendingFamilies} families confirmed
            </p>
          </div>

          {/* Metric 4: Shagun & Blessings */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-serif font-bold uppercase tracking-wider">Shagun Logged</span>
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-700">
              ₹{metrics.totalShagun.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] font-serif text-stone-500 mt-1">
              Direct UPI ashivaad gifts
            </p>
          </div>

        </div>

        {/* Culture-Specific Feast & Catering Live Breakdown Card */}
        <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/70 rounded-3xl p-6 border-2 border-amber-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  {feastInfo.label} — Live Headcount for Caterer
                </h3>
                <p className="text-xs font-serif text-stone-600">
                  Calculated automatically as guests confirm their feast preference via their personal invitation.
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-serif font-bold text-amber-900 bg-amber-200/60 px-3 py-1 rounded-full">
                Total Plates Required: {metrics.totalAttendingHeads}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-serif uppercase tracking-wider text-amber-800 font-bold block mb-1">
                  Menu Choice A: Traditional Delicacy
                </span>
                <span className="font-serif font-bold text-stone-900 text-sm">
                  {feastInfo.tradName}
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-serif font-black text-amber-800">{metrics.traditionalMealCount}</span>
                <span className="text-xs text-stone-500 block">guests</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-serif uppercase tracking-wider text-emerald-800 font-bold block mb-1">
                  Menu Choice B: Pure Satvik Vegetarian
                </span>
                <span className="font-serif font-bold text-stone-900 text-sm">
                  {feastInfo.satvikName}
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-serif font-black text-emerald-800">{metrics.satvikMealCount}</span>
                <span className="text-xs text-stone-500 block">guests</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs: Guest Roster vs Midnight DJ Console */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
          <button
            onClick={() => setActiveViewTab('guests')}
            className={`px-4 py-2 rounded-2xl text-xs font-serif font-bold transition-all flex items-center gap-2 ${
              activeViewTab === 'guests'
                ? 'bg-[#8B181B] text-white shadow-md'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Guest Roster &amp; RSVP Links ({guests.length})</span>
          </button>

          <button
            onClick={() => setActiveViewTab('dj')}
            className={`px-4 py-2 rounded-2xl text-xs font-serif font-bold transition-all flex items-center gap-2 ${
              activeViewTab === 'dj'
                ? 'bg-purple-900 text-[#F3E5AB] shadow-md'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Midnight DJ Console &amp; Requests ({djRequests.length})</span>
          </button>
        </div>

        {/* VIEW 1: GUEST ROSTER TABLE */}
        {activeViewTab === 'guests' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            
            {/* Table Controls (Search & Filter Tabs) */}
            <div className="p-5 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setFilterTab('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold whitespace-nowrap shrink-0 transition-all ${
                    filterTab === 'all' ? 'bg-[#8B181B] text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  All ({guests.length})
                </button>
                <button
                  onClick={() => setFilterTab('attending')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold whitespace-nowrap shrink-0 transition-all ${
                    filterTab === 'attending' ? 'bg-blue-600 text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Confirmed ({metrics.attendingFamilies})
                </button>
                <button
                  onClick={() => setFilterTab('pending')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold whitespace-nowrap shrink-0 transition-all ${
                    filterTab === 'pending' ? 'bg-amber-600 text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Awaiting RSVP ({metrics.pendingCount})
                </button>
                <button
                  onClick={() => setFilterTab('unopened')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold whitespace-nowrap shrink-0 transition-all ${
                    filterTab === 'unopened' ? 'bg-stone-800 text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Unopened ({guests.length - metrics.openedCount})
                </button>
              </div>

              {/* Search Input */}
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search guest or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-1.5 text-xs font-serif rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8B181B]"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-serif">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Guest / Family Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Engagement</th>
                    <th className="py-3 px-4">RSVP Status</th>
                    <th className="py-3 px-4">Dining Choice</th>
                    <th className="py-3 px-4">Personalized VIP Link</th>
                    <th className="py-3 px-4 text-right">WhatsApp Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {filteredGuests.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-stone-400 font-serif">
                        No guests found for this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredGuests.map((g) => {
                      const personalizedUrl = getPersonalizedUrl(g.name);
                      const isCopied = copiedId === g.id;

                      return (
                        <tr key={g.id} className="hover:bg-amber-50/40 transition-colors">
                          
                          {/* Name & Phone */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-stone-900 text-sm">{g.name}</div>
                            <div className="text-[11px] text-stone-400 font-mono mt-0.5">{g.phone}</div>
                          </td>

                          {/* Category */}
                          <td className="py-3.5 px-4">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-semibold">
                              {g.category}
                            </span>
                          </td>

                          {/* Link Engagement */}
                          <td className="py-3.5 px-4">
                            {g.linkOpened ? (
                              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                                <Eye className="w-3.5 h-3.5 shrink-0" />
                                <span>Opened {g.openedAt} ({g.openCount}x)</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-stone-400">
                                <Clock className="w-3.5 h-3.5 shrink-0" />
                                <span>Not opened yet</span>
                              </div>
                            )}
                          </td>

                          {/* RSVP Status */}
                          <td className="py-3.5 px-4">
                            {g.rsvpStatus === 'attending' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Attending ({g.adultsCount + g.kidsCount} heads)</span>
                              </span>
                            )}
                            {g.rsvpStatus === 'pending' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
                                <Clock className="w-3 h-3" />
                                <span>Pending</span>
                              </span>
                            )}
                            {g.rsvpStatus === 'declined' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 font-bold border border-red-200">
                                <XCircle className="w-3 h-3" />
                                <span>Declined</span>
                              </span>
                            )}
                          </td>

                          {/* Heads & Meal */}
                          <td className="py-3.5 px-4">
                            {g.rsvpStatus === 'attending' ? (
                              <span className="font-semibold text-stone-800">
                                {g.mealPref === 'traditional' ? '🍖 Traditional Feast' : '🌿 Satvik Pure Veg'}
                              </span>
                            ) : (
                              <span className="text-stone-400">—</span>
                            )}
                          </td>

                          {/* Personalized Link */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleCopy(g.id, personalizedUrl)}
                                className="px-2 py-1 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 flex items-center gap-1 transition-all whitespace-nowrap shrink-0"
                                title="Copy personalized link"
                              >
                                {isCopied ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                                )}
                                <span>{isCopied ? 'Copied' : 'Copy VIP Link'}</span>
                              </button>
                              <a
                                href={personalizedUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 text-stone-400 hover:text-[#8B181B] shrink-0"
                                title="Open guest view"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>

                          {/* WhatsApp Reminder Action */}
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleSendWhatsAppReminder(g)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-sm whitespace-nowrap shrink-0"
                              title="Send WhatsApp Invitation"
                            >
                              <Send className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </button>
                            {g.lastReminderSent && (
                              <div className="text-[9px] text-stone-400 mt-0.5 whitespace-nowrap">Sent {g.lastReminderSent}</div>
                            )}
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* VIEW 2: MIDNIGHT DJ CONSOLE */}
        {activeViewTab === 'dj' && (
          <div className="bg-stone-900 text-[#F3E5AB] rounded-3xl p-6 border-2 border-[#D4AF37]/40 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] text-stone-950 flex items-center justify-center font-bold shadow-lg">
                  <Disc className="w-6 h-6 animate-spin [animation-duration:6s]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    Live Sangeet DJ Request Queue
                  </h3>
                  <p className="text-xs font-serif text-[#F3E5AB]/70">
                    Real-time songs requested by guests via Rangla Punjab and Bollywood Premiere turntable polls.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={copyDjPlaylist}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C29D2C] text-stone-950 text-xs font-serif font-bold transition-transform active:scale-95 shadow-lg whitespace-nowrap self-start sm:self-auto"
              >
                <Radio className="w-4 h-4" />
                <span>Export Approved Playlist for DJ</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {djRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{req.songTitle}</span>
                      <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full font-bold">
                        {req.votes} guest votes
                      </span>
                    </div>
                    <p className="text-xs text-stone-400">
                      Requested by <strong>{req.guestName}</strong> • {req.submittedAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleDjStatus(req.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        req.status === 'approved'
                          ? 'bg-emerald-500 text-stone-950 shadow-md'
                          : req.status === 'played'
                          ? 'bg-stone-700 text-stone-400'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {req.status === 'approved' ? '✓ Approved' : req.status === 'played' ? 'Played' : 'Queued'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Add Guest Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-[#D4AF37] relative">
            <h3 className="text-xl font-serif font-bold text-stone-900 mb-1">
              Add New Guest &amp; Generate VIP Link
            </h3>
            <p className="text-xs font-serif text-stone-500 mb-5">
              The guest will receive a bespoke invitation personalized in their family name.
            </p>

            <form onSubmit={handleAddGuest} className="space-y-4">
              <div>
                <label className="block text-xs font-serif font-bold text-stone-700 mb-1">
                  Guest / Family Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Babu & Family"
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  className="w-full text-xs font-serif px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8B181B] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-stone-700 mb-1">
                  WhatsApp Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={newGuestPhone}
                  onChange={(e) => setNewGuestPhone(e.target.value)}
                  className="w-full text-xs font-serif px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8B181B] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-serif font-bold text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newGuestCategory}
                    onChange={(e) => setNewGuestCategory(e.target.value as any)}
                    className="w-full text-xs font-serif px-3 py-2.5 rounded-xl border border-stone-300 bg-white outline-none"
                  >
                    <option value="Groom Family">Groom Family</option>
                    <option value="Bride Family">Bride Family</option>
                    <option value="VIP Guests">VIP Guests</option>
                    <option value="Friends & Colleagues">Friends &amp; Colleagues</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-stone-700 mb-1">
                    Expected Heads
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newGuestAdults}
                    onChange={(e) => setNewGuestAdults(Number(e.target.value))}
                    className="w-full text-xs font-serif px-3 py-2.5 rounded-xl border border-stone-300 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-stone-700 mb-1">
                  Feast Preference
                </label>
                <select
                  value={newGuestMeal}
                  onChange={(e) => setNewGuestMeal(e.target.value as any)}
                  className="w-full text-xs font-serif px-3 py-2.5 rounded-xl border border-stone-300 bg-white outline-none"
                >
                  <option value="traditional">Traditional Regional Feast</option>
                  <option value="satvik">Pure Satvik Vegetarian</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-serif font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#8B181B] hover:bg-[#6A1215] text-[#F3E5AB] text-xs font-serif font-bold shadow-lg transition-all"
                >
                  Save &amp; Generate Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
