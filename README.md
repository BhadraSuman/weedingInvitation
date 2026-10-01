# 💍 শুভ বিবাহ & Shubh Vivah — Multi-Cultural Wedding Invitations

An authentic, ultra-modern digital wedding invitation platform supporting **multiple Indian and contemporary cultural themes**, built with **React 19, TypeScript, and Tailwind CSS v4**.

---

## 🎨 Supported Cultural Wedding Templates

You can preview each cultural style directly via query parameters or using the interactive in-app **Cultural Style Switcher**:

| Template | Culture / Tradition | Key Motifs & Aesthetics | URL Preview |
| :--- | :--- | :--- | :--- |
| **Bengali Heritage** | শুভ বিবাহ (বাঙালি ঐতিহ্য) | Alpona, Topor & Mukut, Shankho, Paan Pata, Rabindra Verses | `?template=bengali` |
| **Royal Rajputana** | शाही शुभ विवाह (उत्तर भारतीय) | Jharokhas, Royal Elephants, Fort Gold, Ganesha Shlokas, Dhol | `?template=royal_north` |
| **South Indian Kalyanam** | சுப கல்யாணம் (தமிழ் மரபு) | Kolam Art, Temple Lamps, Kanjeevaram Maroon, Nadaswaram, Thaali | `?template=south_indian` |
| **Contemporary Minimalist** | Forever & Always (Modern Luxe) | Botanical Wreaths, Sunset Vows, Champagne Rose Gold, Violins | `?template=modern_minimal` |

---

## ✨ Features

- 💌 **3D Tactile Envelope Opening**: Culture-specific wax seals, authentic envelope folding animation, and synchronized marigold/gold confetti burst (`canvas-confetti`).
- 🎵 **Curated Music & Audio Engine**: Traditional Shehnai, Nadaswaram, and acoustic wedding tracks with floating glass equalizer controls and procedural Web Audio API fallback.
- 🌐 **Dynamic Bilingual Support**: Instant toggle between English and the culture's native language (**বাংলা / हिन्दी / தமிழ் / Classic**).
- ⏳ **Auspicious Lagna Countdown**: Real-time countdown to the wedding ceremony with native numeral conversion.
- 🪔 **Authentic Cultural Itineraries**:
  - **Bengali**: *Aiburobhat, Gaye Holud & Tattva, Shubho Bibaho, Bou Bhaat*
  - **Royal North**: *Haldi Carnival, Sangeet & Ring Ceremony, Baraat & Shubh Vivah*
  - **South Indian**: *Oonjal & Jaanavasam, Subha Muhurtham & Mangalya Dharanam*
  - **Modern Minimal**: *Welcome Sunset Cocktails, The Ceremony & Written Vows*
- 📅 **1-Tap Google Calendar**: One-click button generates a pre-filled calendar entry for each ceremony.
- 📍 **Venue & Navigation**: Embedded interactive Google Map, turn-by-turn directions, and Uber/Ola ride booking shortcuts.
- 💖 **Digital "Ashirbaad" Guestbook**: Interactive blessings wall with persistent localStorage storage, heart reactions, and quick wish suggestions.
- 📲 **1-Tap WhatsApp RSVP**: Instant WhatsApp message generator for quick attendance confirmation.
- 🏷️ **Guest Personalization (`?to=...`)**: Dynamic guest names displayed on the envelope and hero banner (e.g. `?template=royal_north&to=Sharma+Family`).
- 🎨 **Live Floating Template Switcher**: Switch cultural themes on the fly with live color swatches and instant styling updates.

---

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/BhadraSuman/weedingInvitation.git

# Navigate to the project directory
cd weedingInvitation

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 📦 Production Build

```bash
npm run build
```

Generates optimized, self-contained production files in `dist/`.

---

## 📜 License
MIT © 2026 Suman Bhadra
