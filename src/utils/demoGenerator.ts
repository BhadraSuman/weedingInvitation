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
  whatsappNumber: string;
  customPhotoUrl?: string;
}

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
  whatsappNumber: '916291898703',
  customPhotoUrl: ''
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
    if (data.theme === 'bengali') {
      template.quotes.nativeWeddingTitle = `${groom} ও ${bride}`;
    } else if (data.theme === 'bihari_marwari') {
      template.quotes.nativeWeddingTitle = `${groom} संग ${bride}`;
    }
    if (data.customPhotoUrl) {
      template.groom.image = data.customPhotoUrl;
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
 * Encode DemoFormData into URL query string
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
  if (data.customPhotoUrl) params.set('photo', data.customPhotoUrl);
  return params.toString();
};

/**
 * Decode URLSearchParams into DemoFormData
 */
export const decodeDemoParams = (searchParams: URLSearchParams): DemoFormData => {
  const theme = (searchParams.get('theme') as TemplateId) || defaultDemoData.theme;
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
    customPhotoUrl: searchParams.get('photo') || ''
  };
};

/**
 * WhatsApp order URL with all customized demo details pre-filled
 */
export const getWhatsAppOrderFromDemoUrl = (data: DemoFormData): string => {
  const names = (data.theme === 'annaprashan' || data.theme === 'birthday')
    ? data.childName
    : `${data.groomName} & ${data.brideName}`;

  const message = [
    `Hello Suman! I created a live preview on UtsavPatra for *${names}* (${data.theme.toUpperCase()}).`,
    `📅 Date: ${data.eventDate || 'TBD'}`,
    `📍 Venue: ${data.venueName || 'TBD'}, ${data.city || 'TBD'}`,
    `I loved the preview! How do we finalize and activate our permanent official link (utsavpatra.com/our-event)?`
  ].join('\n');

  return `https://wa.me/916291898703?text=${encodeURIComponent(message)}`;
};
