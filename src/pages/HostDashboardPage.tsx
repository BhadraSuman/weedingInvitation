import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, CheckCircle2, Clock, XCircle, Eye, Send, 
  Share2, Download, Plus, Search, Filter, Phone, 
  Sparkles, Heart, Utensils, IndianRupee, ArrowUpRight, 
  ExternalLink, Check, Copy, AlertCircle, MessageCircle
} from 'lucide-react';

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
  mealPref: 'veg' | 'non_veg' | 'jain';
  lastReminderSent?: string;
  shagunAmount?: number;
}

const INITIAL_GUESTS: GuestRecord[] = [
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
    mealPref: 'veg',
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
    mealPref: 'veg',
    shagunAmount: 2100
  },
  {
    id: 'g-3',
    name: 'Ramesh Verma (Mama Ji)',
    phone: '9123456780',
    category: 'Groom Family',
    linkOpened: true,
    openedAt: '3 days ago',
    openCount: 5,
    rsvpStatus: 'attending',
    adultsCount: 2,
    kidsCount: 0,
    mealPref: 'veg'
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
    mealPref: 'veg'
  },
  {
    id: 'g-5',
    name: 'Dr. Debabrata Roy & Family',
    phone: '9830112233',
    category: 'VIP Guests',
    linkOpened: true,
    openedAt: '5 hours ago',
    openCount: 1,
    rsvpStatus: 'pending',
    adultsCount: 2,
    kidsCount: 1,
    mealPref: 'non_veg'
  },
  {
    id: 'g-6',
    name: 'Joydeep Da & Friends',
    phone: '9836778899',
    category: 'Friends & Colleagues',
    linkOpened: true,
    openedAt: '1 hour ago',
    openCount: 3,
    rsvpStatus: 'attending',
    adultsCount: 3,
    kidsCount: 0,
    mealPref: 'non_veg'
  },
  {
    id: 'g-7',
    name: 'Alok Gupta & Family',
    phone: '9811223344',
    category: 'Bride Family',
    linkOpened: false,
    openCount: 0,
    rsvpStatus: 'pending',
    adultsCount: 2,
    kidsCount: 0,
    mealPref: 'veg'
  },
  {
    id: 'g-8',
    name: 'Vikram Sethi & Family',
    phone: '9822334455',
    category: 'Friends & Colleagues',
    linkOpened: true,
    openedAt: '4 days ago',
    openCount: 1,
    rsvpStatus: 'declined',
    adultsCount: 0,
    kidsCount: 0,
    mealPref: 'veg'
  }
];

export const HostDashboardPage: React.FC = () => {
  const [selectedEventSlug, setSelectedEventSlug] = useState('sandeep-weds-priya');
  const [guests, setGuests] = useState<GuestRecord[]>(INITIAL_GUESTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'attending' | 'pending' | 'unopened' | 'declined'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Add Guest Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestPhone, setNewGuestPhone] = useState('');
  const [newGuestCategory, setNewGuestCategory] = useState<GuestRecord['category']>('Groom Family');
  const [newGuestAdults, setNewGuestAdults] = useState(2);

  // Reminder Blast custom message
  const [reminderNote, setReminderNote] = useState(
    'Namaste! Just a gentle reminder to confirm your attendance for our upcoming wedding celebration. Tap to open your personalized card:'
  );

  const coupleTitle = selectedEventSlug === 'sandeep-weds-priya' 
    ? 'Sandeep & Priya (Shubh Vivah — North Indian Traditions)'
    : 'Anirban & Deboleena (Bengali Lagna Patrika)';
  
  const eventDate = selectedEventSlug === 'sandeep-weds-priya' ? '28 Nov 2026' : '18 Dec 2026';

  // Compute Metrics
  const metrics = useMemo(() => {
    const totalInvited = guests.length;
    const openedCount = guests.filter(g => g.linkOpened).length;
    const attendingGuests = guests.filter(g => g.rsvpStatus === 'attending');
    const pendingCount = guests.filter(g => g.rsvpStatus === 'pending').length;
    const declinedCount = guests.filter(g => g.rsvpStatus === 'declined').length;
    
    const totalAttendingHeads = attendingGuests.reduce((acc, g) => acc + g.adultsCount + g.kidsCount, 0);
    const vegCount = attendingGuests.filter(g => g.mealPref === 'veg').reduce((acc, g) => acc + g.adultsCount + g.kidsCount, 0);
    const nonVegCount = attendingGuests.filter(g => g.mealPref === 'non_veg').reduce((acc, g) => acc + g.adultsCount + g.kidsCount, 0);
    const totalShagun = guests.reduce((acc, g) => acc + (g.shagunAmount || 0), 0);

    return {
      totalInvited,
      openedCount,
      openRate: Math.round((openedCount / totalInvited) * 100),
      attendingFamilies: attendingGuests.length,
      totalAttendingHeads,
      pendingCount,
      declinedCount,
      vegCount,
      nonVegCount,
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
      `🙏 ${reminderNote}\n\n✨ Invitation for: ${guest.name}\n🔗 ${link}\n\nWith warm regards,\nHost Family`
    );
    window.open(`https://wa.me/91${guest.phone}?text=${text}`, '_blank');

    // Update last reminder
    setGuests(prev => prev.map(g => g.id === guest.id ? { ...g, lastReminderSent: 'Just now' } : g));
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
      mealPref: 'veg'
    };

    setGuests([newGuest, ...guests]);
    setIsAddModalOpen(false);
    setNewGuestName('');
    setNewGuestPhone('');
  };

  const exportCsv = () => {
    const headers = ['Guest Name', 'Phone', 'Category', 'Link Opened', 'RSVP Status', 'Adults', 'Kids', 'Meal Preference'];
    const rows = guests.map(g => [
      `"${g.name}"`,
      `"${g.phone}"`,
      `"${g.category}"`,
      g.linkOpened ? 'Opened' : 'Not Opened',
      g.rsvpStatus,
      g.adultsCount,
      g.kidsCount,
      g.mealPref
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedEventSlug}-guest-list.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans pb-20">
      
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif font-black text-xl text-[#8B181B] tracking-tight">
              UtsavPatra
            </span>
          </Link>
          <span className="text-xs bg-[#8B181B]/10 text-[#8B181B] px-2.5 py-0.5 rounded-full font-serif font-bold uppercase tracking-wider">
            Host Portal
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Switch Event */}
          <select
            value={selectedEventSlug}
            onChange={(e) => setSelectedEventSlug(e.target.value)}
            className="text-xs font-serif font-bold bg-stone-100 text-stone-800 rounded-xl px-3 py-1.5 border border-stone-300 outline-none"
          >
            <option value="sandeep-weds-priya">Sandeep &amp; Priya (Shubh Vivah — North Indian)</option>
            <option value="anirban-weds-deboleena">Anirban &amp; Deboleena (Bengali)</option>
          </select>

          <Link
            to={`/${selectedEventSlug}`}
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 text-stone-700 hover:text-[#8B181B] text-xs font-serif font-bold transition-colors"
          >
            <span>Live Card</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        
        {/* Welcome Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#8B181B] to-[#5E0B0E] text-[#F3E5AB] shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-serif uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Event Host Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {coupleTitle}
            </h1>
            <p className="text-xs sm:text-sm font-serif text-[#F3E5AB]/90 mt-1">
              📅 Wedding Date: <strong>{eventDate}</strong> • Real-time guest engagement, RSVPs, and WhatsApp reminder automation.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-serif text-xs font-bold shadow-lg transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Add Guest Link</span>
            </button>
            <button
              onClick={exportCsv}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-serif text-xs font-bold border border-white/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 4 Primary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Metric 1: Total Invited */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-serif font-bold uppercase tracking-wider">Total Invited</span>
              <Users className="w-4 h-4 text-stone-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-extrabold text-stone-900">
              {metrics.totalInvited} <span className="text-xs font-sans font-normal text-stone-400">families</span>
            </div>
            <p className="text-[11px] font-serif text-stone-500 mt-1">
              Personalized links dispatched
            </p>
          </div>

          {/* Metric 2: Links Opened */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-serif font-bold uppercase tracking-wider">Links Opened</span>
              <Eye className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-extrabold text-emerald-700">
              {metrics.openedCount} <span className="text-xs font-sans font-normal text-emerald-600">({metrics.openRate}%)</span>
            </div>
            <p className="text-[11px] font-serif text-stone-500 mt-1">
              Guests who opened their card
            </p>
          </div>

          {/* Metric 3: Confirmed Attending */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-serif font-bold uppercase tracking-wider">Confirmed Attending</span>
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-extrabold text-blue-800">
              {metrics.totalAttendingHeads} <span className="text-xs font-sans font-normal text-blue-600">heads</span>
            </div>
            <p className="text-[11px] font-serif text-stone-500 mt-1">
              {metrics.attendingFamilies} families confirmed
            </p>
          </div>

          {/* Metric 4: Catering Breakdown */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-serif font-bold uppercase tracking-wider">Catering Counts</span>
              <Utensils className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-xl font-serif font-bold text-stone-900 flex items-center gap-3">
              <span>🌿 {metrics.vegCount} Veg</span>
              <span>🍗 {metrics.nonVegCount} Non-Veg</span>
            </div>
            <p className="text-[11px] font-serif text-stone-500 mt-1">
              Exact meals for caterer
            </p>
          </div>

        </div>

        {/* Highlight Banner: Automated WhatsApp Reminder Blast */}
        <div className="rounded-2xl p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-amber-900 uppercase tracking-wider">
                <MessageCircle className="w-4 h-4 text-amber-700" />
                <span>WhatsApp RSVP Reminder Blast</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                You have {metrics.pendingCount} pending families awaiting confirmation
              </h3>
              <p className="text-xs font-serif text-stone-600 max-w-2xl">
                One-click polite WhatsApp reminder. Each message automatically embeds the guest's personalized VIP card link!
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setFilterTab('pending')}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-serif text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Review {metrics.pendingCount} Pending Guests</span>
              </button>
            </div>
          </div>
        </div>

        {/* Guest Management Table Section */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          
          {/* Table Controls (Search & Filter Tabs) */}
          <div className="p-5 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setFilterTab('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
                  filterTab === 'all' ? 'bg-[#8B181B] text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All ({guests.length})
              </button>
              <button
                onClick={() => setFilterTab('attending')}
                className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
                  filterTab === 'attending' ? 'bg-blue-600 text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Confirmed Attending ({metrics.attendingFamilies})
              </button>
              <button
                onClick={() => setFilterTab('pending')}
                className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
                  filterTab === 'pending' ? 'bg-amber-600 text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Awaiting RSVP ({metrics.pendingCount})
              </button>
              <button
                onClick={() => setFilterTab('unopened')}
                className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
                  filterTab === 'unopened' ? 'bg-stone-800 text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Not Opened Yet ({guests.length - metrics.openedCount})
              </button>
              <button
                onClick={() => setFilterTab('declined')}
                className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
                  filterTab === 'declined' ? 'bg-red-600 text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Declined ({metrics.declinedCount})
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
                  <th className="py-3 px-4">Card Engagement</th>
                  <th className="py-3 px-4">RSVP Status</th>
                  <th className="py-3 px-4">Heads &amp; Diet</th>
                  <th className="py-3 px-4">Personalized Link</th>
                  <th className="py-3 px-4 text-right">Reminder Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredGuests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-stone-400 font-serif">
                      No guests match your current filter.
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

                        {/* Link Engagement (Who opened the link) */}
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
                              <span>Attending</span>
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
                            <div>
                              <div className="font-semibold text-stone-800">
                                {g.adultsCount} Adults {g.kidsCount > 0 ? `, ${g.kidsCount} Kids` : ''}
                              </div>
                              <div className="text-[10px] text-stone-500 mt-0.5">
                                {g.mealPref === 'veg' ? '🌿 Pure Veg' : '🍗 Non-Veg'}
                              </div>
                            </div>
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
                              className="px-2 py-1 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 flex items-center gap-1 transition-all"
                              title="Copy personalized link"
                            >
                              {isCopied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 text-stone-500" />
                              )}
                              <span>{isCopied ? 'Copied' : 'Copy'}</span>
                            </button>
                            <a
                              href={personalizedUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-stone-400 hover:text-[#8B181B]"
                              title="Preview personalized guest view"
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
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-sm"
                            title="Send WhatsApp Invitation or Reminder"
                          >
                            <Send className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </button>
                          {g.lastReminderSent && (
                            <div className="text-[9px] text-stone-400 mt-0.5">Sent {g.lastReminderSent}</div>
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

      </main>

      {/* Add Guest Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-[#D4AF37] relative">
            <h3 className="text-xl font-serif font-bold text-stone-900 mb-1">
              Add New Guest &amp; Generate VIP Link
            </h3>
            <p className="text-xs font-serif text-stone-500 mb-5">
              The guest will receive a bespoke wax-sealed card personalized in their family name.
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
