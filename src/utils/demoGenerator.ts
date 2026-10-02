import { CulturalTemplate, TemplateId } from '../types/wedding';
import { templatesMap, bengaliTemplate } from '../data/templates';

export interface DemoFormData {
  theme: TemplateId;
  groomName: string;
  brideName: string;
  childName: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  city: string;
  upiId: string;
  whatsappNumber: string; // Required for Lead Capture
  leadName?: string;     // Lead contact person
  customPhotoUrl?: string;
  createdAt?: number;    // Timestamp in ms for 24-hr expiry

  // Theme-Specific Customization Fields
  trainName?: string;          // vivah_express: e.g. "BHARAT VIVAH EXPRESS #2026"
  trainPnr?: string;           // vivah_express: e.g. "2612-ANIDEB"
  newspaperHeadline?: string;  // wedding_gazette: e.g. "ANIRBAN & DEBOLEENA TO TIE THE KNOT; CITY BRACES FOR BIRIYANI!"
  newspaperSubhead?: string;   // wedding_gazette: e.g. "Seven Sacred Pheras Scheduled Under Auspicious Constellation"
  movieTagline?: string;       // bollywood_premiere: e.g. "A Blockbuster Romance Written in the Stars"
  directorCredit?: string;     // bollywood_premiere: e.g. "Directed by Destiny & Two Families"
  punjabiSlogan?: string;      // rangla_punjab: e.g. "Chak De Phatte! Non-Stop Bhangra & Celebration!"
  bhojSpecialty?: string;      // mithila / pot_katha / shola: e.g. "Macha-Bhaat, Rohu Curry & Makhana Kheer"
}

export const PREVIEW_VALIDITY_HOURS = 24;

export const defaultDemoData: DemoFormData = {
  theme: 'bengali',
  groomName: 'Rahul',
  brideName: 'Pooja',
  childName: 'Aarav',
  eventDate: '2026-12-15',
  eventTime: '07:00 PM',
  venueName: 'The Heritage Grand Palace',
  city: 'Kolkata',
  upiId: '',
  whatsappNumber: '916203868358',
  leadName: 'Rahul Banerjee',
  customPhotoUrl: '',
  createdAt: Date.now(),
  trainName: 'BHARAT VIVAH EXPRESS',
  trainPnr: '2612-VIVAH',
  newspaperHeadline: 'HISTORIC NUPTIAL ALLIANCE DECLARED; LIFELONG TOGETHERNESS AHEAD!',
  newspaperSubhead: 'Seven Sacred Pheras Scheduled Under Planetary Alignment',
  movieTagline: 'A Blockbuster Romance Written in the Stars — 100% Certified Fresh',
  directorCredit: 'Directed by Destiny • Produced by Two Loving Families',
  punjabiSlogan: 'Chak De Phatte! Balle Balle Celebration in Full Swing!',
  bhojSpecialty: 'Traditional Regional Bhoj & Sweet Delicacies'
};

/**
 * Checks if a preview is older than 24 hours
 */
export const isPreviewExpired = (createdAt?: number): boolean => {
  if (!createdAt) return false;
  const elapsedMs = Date.now() - createdAt;
  const maxMs = PREVIEW_VALIDITY_HOURS * 60 * 60 * 1000;
  return elapsedMs > maxMs;
};

/**
 * Returns remaining hours of the 24-hour preview
 */
export const getPreviewRemainingHours = (createdAt?: number): number => {
  if (!createdAt) return PREVIEW_VALIDITY_HOURS;
  const elapsedMs = Date.now() - createdAt;
  const maxMs = PREVIEW_VALIDITY_HOURS * 60 * 60 * 1000;
  const remainingMs = maxMs - elapsedMs;
  if (remainingMs <= 0) return 0;
  return Math.max(1, Math.ceil(remainingMs / (60 * 60 * 1000)));
};

/**
 * Saves a captured lead to localStorage repository
 */
export const saveCapturedLead = (data: DemoFormData): void => {
  try {
    const existingRaw = localStorage.getItem('utsavpatra_leads');
    const leads = existingRaw ? JSON.parse(existingRaw) : [];
    const newLead = {
      id: `lead_${Date.now()}`,
      timestamp: new Date().toISOString(),
      leadName: data.leadName || data.groomName || data.childName || 'Guest Lead',
      whatsapp: data.whatsappNumber,
      theme: data.theme,
      names: (data.theme === 'annaprashan' || data.theme === 'birthday')
        ? data.childName
        : `${data.groomName} & ${data.brideName}`,
      eventDate: data.eventDate,
      venue: `${data.venueName}, ${data.city}`
    };
    leads.unshift(newLead);
    // Keep last 50 leads
    localStorage.setItem('utsavpatra_leads', JSON.stringify(leads.slice(0, 50)));
  } catch {
    // ignore storage error
  }
};

/**
 * Builds a custom CulturalTemplate populated with user-submitted demo details
 */
export const buildCustomDemoTemplate = (data: DemoFormData): {
  template: CulturalTemplate;
  title: string;
  cultureType: string;
} => {
  const base = templatesMap[data.theme] || bengaliTemplate;
  const template: CulturalTemplate = JSON.parse(JSON.stringify(base));

  const targetDateISO = data.eventDate ? `${data.eventDate}T19:00:00` : template.targetDate;
  template.targetDate = targetDateISO;
  template.targetDateNative = data.eventDate || template.targetDateNative;

  if (data.theme === 'annaprashan') {
    const baby = data.childName.trim() || 'Aarav';
    template.quotes.weddingTitle = `Master ${baby}'s Annaprashan`;
    template.quotes.nativeWeddingTitle = `আদরের ${baby}-র শুভ অন্নপ্রাশন`;
    template.groom.name = baby;
    template.groom.nativeName = baby;
    if (data.customPhotoUrl) {
      template.groom.image = data.customPhotoUrl;
    }
  } else if (data.theme === 'birthday') {
    const child = data.childName.trim() || 'Ananya';
    template.quotes.weddingTitle = `${child} Turns One!`;
    template.quotes.nativeWeddingTitle = `${child}-র প্রথম শুভ জন্মদিন`;
    template.bride.name = child;
    template.bride.nativeName = child;
    if (data.customPhotoUrl) {
      template.bride.image = data.customPhotoUrl;
    }
  } else {
    // Wedding
    const groom = data.groomName.trim() || 'Rahul';
    const bride = data.brideName.trim() || 'Pooja';
    template.groom.name = groom;
    template.bride.name = bride;
    template.quotes.weddingTitle = `${groom} & ${bride}`;
    if (data.theme === 'bengali' || data.theme === 'pot_katha' || data.theme === 'shola') {
      template.quotes.nativeWeddingTitle = `${groom} ও ${bride}`;
    } else if (data.theme === 'bihari_marwari' || data.theme === 'mithila') {
      template.quotes.nativeWeddingTitle = `${groom} संग ${bride}`;
    } else if (data.theme === 'rangla_punjab') {
      template.quotes.nativeWeddingTitle = `${groom} ਤੇ ${bride}`;
    }
    if (data.customPhotoUrl) {
      template.groom.image = data.customPhotoUrl;
    }
  }

  // Theme-Specific Overrides
  if (data.theme === 'vivah_express') {
    if (data.trainName) {
      template.quotes.weddingTitle = data.trainName;
    }
    if (data.trainPnr) {
      template.quotes.subInvocation = `PNR: ${data.trainPnr} • CONFIRMED (CNF)`;
    }
  } else if (data.theme === 'wedding_gazette') {
    if (data.newspaperHeadline) {
      template.quotes.verse = data.newspaperHeadline;
    }
    if (data.newspaperSubhead) {
      template.quotes.subInvocation = data.newspaperSubhead;
    }
  } else if (data.theme === 'bollywood_premiere') {
    if (data.movieTagline) {
      template.quotes.verse = data.movieTagline;
    }
    if (data.directorCredit) {
      template.quotes.subInvocation = data.directorCredit;
    }
  } else if (data.theme === 'rangla_punjab') {
    if (data.punjabiSlogan) {
      template.quotes.subInvocation = data.punjabiSlogan;
    }
  } else if (data.theme === 'mithila' || data.theme === 'pot_katha' || data.theme === 'shola') {
    if (data.bhojSpecialty) {
      template.quotes.subInvocation = data.bhojSpecialty;
    }
  }

  // Venue & Location
  if (data.venueName) {
    template.venue.name = data.venueName;
    template.venue.nativeName = data.venueName;
    template.venue.address = `${data.venueName}, ${data.city || 'India'}`;
    template.venue.nativeAddress = `${data.venueName}, ${data.city || 'India'}`;
  }

  // Shagun
  if (data.upiId && data.upiId.trim()) {
    template.shagunConfig = {
      ...template.shagunConfig,
      enabled: true,
      recipientName: template.quotes.weddingTitle,
      upiId: data.upiId.trim(),
      title: "Digital Shagun & Blessings (Online E-Lifafa)",
      description: "Direct bank-to-bank transfer via UPI with zero fees."
    };
  }

  // RSVP WhatsApp
  if (data.whatsappNumber && data.whatsappNumber.trim()) {
    if (template.rsvpContacts && template.rsvpContacts.length > 0) {
      template.rsvpContacts[0].whatsappNumber = data.whatsappNumber.trim();
    }
  }

  const cultureType = data.theme;
  const title = `${template.quotes.weddingTitle} — Interactive Digital Invitation Preview`;

  return { template, title, cultureType };
};

/**
 * Encode DemoFormData into URL query string with expiration timestamp & lead tracking
 */
export const encodeDemoDataToParams = (data: DemoFormData): string => {
  const params = new URLSearchParams();
  params.set('theme', data.theme);
  if (data.groomName) params.set('groom', data.groomName);
  if (data.brideName) params.set('bride', data.brideName);
  if (data.childName) params.set('child', data.childName);
  if (data.eventDate) params.set('date', data.eventDate);
  if (data.eventTime) params.set('time', data.eventTime);
  if (data.venueName) params.set('venue', data.venueName);
  if (data.city) params.set('city', data.city);
  if (data.upiId) params.set('upi', data.upiId);
  if (data.whatsappNumber) params.set('wa', data.whatsappNumber);
  if (data.leadName) params.set('lead', data.leadName);
  if (data.customPhotoUrl) params.set('photo', data.customPhotoUrl);

  // Theme-Specific Parameters
  if (data.trainName) params.set('train', data.trainName);
  if (data.trainPnr) params.set('pnr', data.trainPnr);
  if (data.newspaperHeadline) params.set('headline', data.newspaperHeadline);
  if (data.newspaperSubhead) params.set('subhead', data.newspaperSubhead);
  if (data.movieTagline) params.set('tagline', data.movieTagline);
  if (data.directorCredit) params.set('director', data.directorCredit);
  if (data.punjabiSlogan) params.set('slogan', data.punjabiSlogan);
  if (data.bhojSpecialty) params.set('bhoj', data.bhojSpecialty);

  // Timestamp for 24-hr expiration lock
  params.set('ts', (data.createdAt || Date.now()).toString());
  return params.toString();
};

/**
 * Decode URLSearchParams into DemoFormData
 */
export const decodeDemoParams = (searchParams: URLSearchParams): DemoFormData => {
  const theme = (searchParams.get('theme') as TemplateId) || defaultDemoData.theme;
  const tsRaw = searchParams.get('ts');
  const createdAt = tsRaw ? parseInt(tsRaw, 10) : Date.now();

  return {
    theme: theme in templatesMap ? theme : defaultDemoData.theme,
    groomName: searchParams.get('groom') || defaultDemoData.groomName,
    brideName: searchParams.get('bride') || defaultDemoData.brideName,
    childName: searchParams.get('child') || defaultDemoData.childName,
    eventDate: searchParams.get('date') || defaultDemoData.eventDate,
    eventTime: searchParams.get('time') || defaultDemoData.eventTime,
    venueName: searchParams.get('venue') || defaultDemoData.venueName,
    city: searchParams.get('city') || defaultDemoData.city,
    upiId: searchParams.get('upi') || '',
    whatsappNumber: searchParams.get('wa') || defaultDemoData.whatsappNumber,
    leadName: searchParams.get('lead') || '',
    customPhotoUrl: searchParams.get('photo') || '',
    createdAt,
    trainName: searchParams.get('train') || undefined,
    trainPnr: searchParams.get('pnr') || undefined,
    newspaperHeadline: searchParams.get('headline') || undefined,
    newspaperSubhead: searchParams.get('subhead') || undefined,
    movieTagline: searchParams.get('tagline') || undefined,
    directorCredit: searchParams.get('director') || undefined,
    punjabiSlogan: searchParams.get('slogan') || undefined,
    bhojSpecialty: searchParams.get('bhoj') || undefined
  };
};

/**
 * WhatsApp order URL with all customized demo details and lead contact pre-filled
 */
export const getWhatsAppOrderFromDemoUrl = (data: DemoFormData): string => {
  const names = (data.theme === 'annaprashan' || data.theme === 'birthday')
    ? data.childName
    : `${data.groomName} & ${data.brideName}`;

  const message = [
    `*🚨 LEAD ALERT / ACTIVATION REQUEST — UTSAVPATRA*`,
    `🏢 Brand: Uddipta Tech Solutions`,
    `👤 Contact Name: ${data.leadName || names}`,
    `📱 WhatsApp: ${data.whatsappNumber || 'Not provided'}`,
    `🎉 Event: ${names} (${data.theme.toUpperCase()})`,
    `📅 Date: ${data.eventDate || 'TBD'}`,
    `📍 Venue: ${data.venueName || 'TBD'}, ${data.city || 'TBD'}`,
    ``,
    `Hello! I created a live preview on UtsavPatra by Uddipta Tech Solutions. I loved the demo and want to unlock the official permanent ad-free link (utsavpatra.com/our-event). Please share payment details!`
  ].join('\n');

  return `https://wa.me/916203868358?text=${encodeURIComponent(message)}`;
};
