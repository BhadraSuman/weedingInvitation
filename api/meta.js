// Vercel Serverless Function to serve dynamic OpenGraph and WhatsApp preview tags
// for social media crawlers (WhatsApp, Facebook, Twitter, Telegram, LinkedIn, etc.)

export default function handler(req, res) {
  // Extract path and query
  const rawUrl = req.headers['x-forwarded-uri'] || req.url || '';
  const parsedUrl = new URL(rawUrl, 'https://utsavpatra.vercel.app');
  const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
  const slug = (pathParts[0] || req.query.slug || '').toLowerCase();
  
  // Extract guest personalization if present
  const guestName = parsedUrl.searchParams.get('to') || 
                    parsedUrl.searchParams.get('guest') || 
                    (req.query && (req.query.to || req.query.guest)) || 
                    '';

  const baseUrl = 'https://utsavpatra.vercel.app';
  const targetUrl = `${baseUrl}${parsedUrl.pathname}${parsedUrl.search}`;

  // Dedicated event registry
  const events = {
    'anirban-weds-deboleena': {
      title: 'Anirban & Deboleena — Bengali Wedding Lagna Patrika',
      category: 'Bengali Heritage Vivah',
      date: '18th December 2026',
      venue: 'The Rajbari Bawali, Kolkata',
      image: 'https://utsavpatra.vercel.app/images/couples/bengali-couple.jpg',
      summary: 'বাঙালি শুভ বিবাহ | Sacred Lagna Patrika, 1-tap Google Maps to Rajbari Bawali, and Digital Ashirbaad.'
    },
    'sandeep-weds-priya': {
      title: 'Sandeep & Priya — Shubh Vivah — North Indian Royal Vivah',
      category: 'Shubh Vivah — North Indian Royal Wedding',
      date: '28th November 2026',
      venue: 'Patliputra Heritage Palace, Patna',
      image: 'https://utsavpatra.vercel.app/images/couples/north-couple.jpg',
      summary: 'पावन विवाह संस्कार | Sacred Vivah Nimantran, 1-tap Google Maps directions, and Digital Shagun.'
    },
    'mithila-vivah': {
      title: 'Abhishek & Maithili — Mithila Vivah (Madhubani Folk Heritage)',
      category: 'Mithila Vivah & Kohbar',
      date: '22nd November 2026',
      venue: 'Raj Darbhanga Palace, Bihar',
      image: 'https://utsavpatra.vercel.app/images/couples/north-couple.jpg',
      summary: 'मिथिला पावन विवाह | Sacred Kohbar Folk Canvas, Maithili Vivah Geet & Royal Darbhanga Palace.'
    },
    'pot-katha': {
      title: 'Debashish & Aditi — Pot Katha (Kalighat Patachitra Wedding Scroll)',
      category: 'Kalighat Patachitra Scroll',
      date: '12th December 2026',
      venue: 'Sovabazar Rajbari, Kolkata',
      image: 'https://utsavpatra.vercel.app/images/couples/bengali-couple.jpg',
      summary: 'কালীঘাট পটচিত্র বিবাহগাঁথা | Hand-painted folk scroll with wooden dandi rollers & Sovabazar Rajbari celebrations.'
    },
    'shola': {
      title: 'Anindya & Mahashweta — Shola (Bengali Minimal-Luxury Wedding)',
      category: 'Bengali Minimal-Luxury Shola',
      date: '12th December 2026',
      venue: 'Sovabazar Rajbari Natmandir, Kolkata',
      image: 'https://utsavpatra.vercel.app/images/couples/bengali_cinematic.jpg',
      summary: 'শোভা শুভ পরিণয় | Pure Ivory Sholapith Craft, Gold-Foil Shimmer & Santiniketan Traditions.'
    },
    'rangla-punjab': {
      title: 'Manpreet & Simran — Rangla Punjab (Loud & Kinetic Dhol Wedding)',
      category: 'Rangla Punjab Dhol Wedding',
      date: '28th November 2026',
      venue: 'Heritage Haveli, Amritsar',
      image: 'https://utsavpatra.vercel.app/images/couples/north-couple.jpg',
      summary: 'ਰੰਗਲਾ ਪੰਜਾਬ | 128 BPM Dhol Pulse, Swaying Parandi Tassels & High-Octane Bhangra!'
    },
    'the-wedding-gazette': {
      title: 'The Wedding Gazette — Vintage Broadsheet Nuptial Edition',
      category: 'Vintage Broadsheet Newspaper',
      date: '12th December 2026',
      venue: 'The Heritage Townhall Lawns, Kolkata',
      image: 'https://utsavpatra.vercel.app/images/couples/vintage_gazette.jpg',
      summary: 'The Wedding Gazette | Retro Broadsheet Press, Halftone Photography & Front Page Nuptials.'
    },
    'the-grand-premiere': {
      title: 'The Grand Premiere — Bollywood & OTT Blockbuster Wedding',
      category: 'Bollywood Blockbuster Premiere',
      date: '26th December 2026',
      venue: 'The Grand Palace Studios, Mumbai',
      image: 'https://utsavpatra.vercel.app/images/couples/bollywood_poster.jpg',
      summary: 'The Grand Premiere | 35mm Vintage Countdown, Red Carpet Gala & Sangeet Jukebox.'
    },
    'vivah-express': {
      title: 'Vivah Express — Indian Railway Boarding Pass Nuptials',
      category: 'IRCTC Vivah Special Express',
      date: '26th December 2026',
      venue: 'Vivah Dham Junction',
      image: 'https://utsavpatra.vercel.app/images/couples/north-couple.jpg',
      summary: 'Vivah Express | PNR Live Status, Berth Reservation Pass & Ceremonial Stations.'
    },
    'kunal-weds-shreya': {
      title: 'Kunal & Shreya — 3D Animated Royal Vivah Celebration',
      category: '3D Pixar Style Animation',
      date: '18th December 2026',
      venue: 'The Oberoi Sukhvilas Spa Resort, Chandigarh',
      image: 'https://utsavpatra.vercel.app/images/couples/chibi_couple.jpg',
      summary: '3D कार्टून एवं एनिमेटेड विवाह | Pixar style 3D royal mandap with floating petals & blessings.'
    },
    'aarav-annaprashan': {
      title: 'Baby Aarav — Mukhe Bhaat & Annaprashan Ceremony',
      category: 'Annaprashan First Rice Ceremony',
      date: '15th October 2026',
      venue: 'Sonar Bangla Banquet, Salt Lake, Kolkata',
      image: 'https://utsavpatra.vercel.app/images/couples/baby-aarav.jpg',
      summary: 'শুভ অন্নপ্রাশন ও মুখে ভাত | First Rice Ceremony invitation, schedule, venue directions, and blessings.'
    },
    'ananya-turns-1': {
      title: 'Princess Ananya Turns One — 1st Birthday Gala',
      category: '1st Birthday Celebration',
      date: '20th November 2026',
      venue: 'Grand Crystal Ballroom, Kolkata',
      image: 'https://utsavpatra.vercel.app/images/couples/princess-ananya.jpg',
      summary: 'প্রথম শুভ জন্মদিন উৎসব | Join us for Princess Ananya\'s 1st birthday cake cutting, dinner & celebration!'
    }
  };

  let pageTitle = 'UtsavPatra | India\'s Cultural Digital Celebration Platform';
  let pageDesc = 'Bespoke interactive wedding and cultural invitations with 1-tap Google Maps, real-time WhatsApp RSVP, personalized guest links, and direct UPI Shagun. Ready in 24 hours.';
  let pageImage = 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&h=630&q=80';

  const eventData = events[slug];

  if (eventData) {
    if (guestName) {
      pageTitle = `${guestName}'s Invitation • ${eventData.title}`;
      pageDesc = `Namaste ${guestName}! You are warmly invited to grace the ${eventData.category} on ${eventData.date} at ${eventData.venue}. Tap to open your personalized invitation card and view venue directions.`;
    } else {
      pageTitle = eventData.title;
      pageDesc = `Cordially inviting you and your family to celebrate on ${eventData.date} at ${eventData.venue}. ${eventData.summary}`;
    }
    pageImage = eventData.image;
  }

  // Escape HTML entities to prevent injection
  const escapeHtml = (str) =>
    str.replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#039;');

  const safeTitle = escapeHtml(pageTitle);
  const safeDesc = escapeHtml(pageDesc);
  const safeImage = escapeHtml(pageImage);
  const safeTargetUrl = escapeHtml(targetUrl);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDesc}">
  
  <!-- OpenGraph / WhatsApp Link Preview Tags -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="UtsavPatra by Uddipta Tech Solutions">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDesc}">
  <meta property="og:image" content="${safeImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:url" content="${safeTargetUrl}">
  
  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDesc}">
  <meta name="twitter:image" content="${safeImage}">

  <!-- Fast client redirect for non-crawler visitors -->
  <meta http-equiv="refresh" content="0; url=${safeTargetUrl}">
</head>
<body style="font-family: serif; text-align: center; padding: 40px; background: #FFFDF9; color: #8B181B;">
  <h2>${safeTitle}</h2>
  <p>${safeDesc}</p>
  <p><a href="${safeTargetUrl}" style="color: #8B181B; font-weight: bold; font-size: 18px;">Click here to open invitation &rarr;</a></p>
  <script>window.location.replace("${safeTargetUrl}");</script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  return res.status(200).send(html);
}
