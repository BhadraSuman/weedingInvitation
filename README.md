# 💍 শুভ বিবাহ | Shubho Bibaho — Modern Bengali Wedding Invitation

An authentic, modern, high-performance digital wedding invitation website built with **React 19, TypeScript, and Tailwind CSS v4**.

Designed with rich Bengali cultural heritage (**Alpona, Topor & Mukut, Shankha-Pola, Paan Pata, and Mangal Ghot**) combined with modern mobile-first interactive features.

---

## ✨ Features

- 💌 **3D Tactile Envelope Opening**: Authentic Bengali "শুভ বিবাহ" wax seal and auspicious envelope unfolding animation with marigold confetti burst (`canvas-confetti`).
- 🎵 **Audio Experience**: Background Shehnai / flute wedding melody with a floating glassmorphic equalizer controller and procedural Web Audio API harmonic synthesizer fallback.
- 🌐 **Bilingual Support (বাংলা & English)**: Seamless one-click switch between authentic Bengali and English text.
- ⏳ **Auspicious Lagna Countdown**: Real-time countdown to the wedding date with dynamic Bengali numeral conversion (`০-৯`).
- 🪔 **Authentic Bengali Itinerary**: Dedicated cards for **Aiburobhat**, **Gaye Holud & Tattva**, **Shubho Bibaho**, and **Bou Bhaat & Preeti Bhoj**, featuring suggested attire and **1-Tap Add to Google Calendar** integration.
- 📍 **Venue & Live Navigation**: Raajkutir (Swabhumi, Kolkata) details, embedded interactive Google Maps, turn-by-turn directions, and Uber/Ola ride booking deep link.
- 💖 **Digital "Ashirbaad" Guestbook**: Interactive blessings wall where guests can leave messages without login, use quick wish suggestions, and send hearts.
- 📲 **1-Tap WhatsApp RSVP**: Direct confirmation via WhatsApp with pre-filled guest messages, plus direct phone call links for family elders.
- 🏷️ **Guest Personalization (`?to=...`)**: Share personalized invite links (e.g. `?to=Subhashis+Da+and+Family`) to display custom guest greetings on the envelope and hero banner.
- 📱 **Mobile Sticky Navigation Bar**: Quick-access bottom action bar for mobile guests.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/BhadraSuman/weedingInvitation.git

# Navigate to the project directory
cd weedingInvitation

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 🎨 Customization

All wedding details can be easily updated in a single file:
- **`src/data/weddingData.ts`**:
  - Groom & Bride names, lineages, bios, and portraits
  - Event dates, times, venues, and descriptions
  - RSVP phone numbers and WhatsApp contacts
  - Auspicious quotes and shlokas

---

## 📦 Production Build

```bash
npm run build
```

The output will be generated in the `dist/` directory, ready to deploy for free on **Vercel**, **Cloudflare Pages**, or **GitHub Pages**.

---

## 📜 License
MIT © 2026 Suman Bhadra
