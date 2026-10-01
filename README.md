# 💍 WeedingInv.com — Cultural Digital Wedding Invitation Platform

India's premier digital wedding invitation micro-site platform. Say goodbye to heavy paper cards and 50MB WhatsApp videos. We craft enchanting, lightning-fast cultural wedding micro-sites hosted on **clean, SEO-friendly subpaths (`weedinginv.com/[couple-slug]`)**.

---

## 🌐 Platform Architecture

```
                               ┌────────────────────────────────────────┐
                               │            weedinginv.com              │
                               │        (Company Landing Page)          │
                               │  • Portfolio, Pricing, WhatsApp CTA    │
                               └───────────────────┬────────────────────┘
                                                   │
                                                   ▼
                               ┌────────────────────────────────────────┐
                               │        Dynamic Slug Routing            │
                               │      weedinginv.com/[couple-slug]      │
                               └───────────┬────────────────┬───────────┘
                                           │                │
                        ┌──────────────────┴──┐          ┌──┴──────────────────┐
                        ▼                     ▼          ▼                     ▼
             /anirban-weds-deboleena      /sandeep-weds-priya      /client-03          ...
              (Bengali Patrika UI)       (Bihari & Marwari UI)   (Next Client)
```

---

## 🚀 Live Slugs in this Implementation

| Route | Culture & Tradition | UI Design & Aesthetics | Key Rituals |
| :--- | :--- | :--- | :--- |
| **`/`** | **WeedingInv Platform** | High-converting Agency Landing Page | Live demos, pricing tiers, feature comparison & WhatsApp booking |
| **`/anirban-weds-deboleena`** | **বাঙালি শুভ বিবাহ (Bengali)** | Authentic "Lagna Patrika" scroll with red textile border & Alpona | *Aiburobhat, Gaye Holud & Tattva, Saat Paak, Shubho Drishti, Bou Bhaat* |
| **`/sandeep-weds-priya`** | **बिहारी एवं मारवाड़ी पावन विवाह** | Royal Mithila & Marwar Vivah card with Maur, Toran & Jharokhas | *Tilak, Matkor (soil digging), Mahila Sangeet & Ghoomar, Toran, Saat Phere, Bahu Bhoj* |

---

## ✨ Dynamic Guest Personalization

You can personalize any invitation for a specific guest or family by adding `?to=...`:
* **Bengali Invite for a relative**: `/anirban-weds-deboleena?to=Joydeep+Da+and+Family`
* **Bihari/Marwari Invite for a family**: `/sandeep-weds-priya?to=Sharma+Ji+and+Family`

The guest’s name is dynamically honored on the envelope wax seal, welcome banner, and WhatsApp preview!

---

## 📞 Business Contact & Coordination

- **Parent Company**: Uddipta Tech Solutions
- **Brand**: UtsavPatra
- **WhatsApp / Phone**: `+91 62038 68358`
- **Email**: `uddipta.techsolutions@gmail.com`
- **Studio**: Kolkata, West Bengal • Serving families across India & worldwide

---

## 🛠️ Technology Stack

- **Framework**: React 19, TypeScript, React Router
- **Styling**: Tailwind CSS v4 (with custom `@theme` tokens)
- **Icons & Motion**: Lucide React, Canvas Confetti
- **Audio Engine**: Curated Shehnai / Flute background audio with procedural Web Audio API fallback
- **Performance**: Sub-second load time, optimized for mobile WhatsApp in-app browser

---

## 💻 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit:
- **`http://localhost:5173/`** for the Company Landing Page
- **`http://localhost:5173/anirban-weds-deboleena`** for the Bengali Wedding Invitation
- **`http://localhost:5173/sandeep-weds-priya`** for the Bihari & Marwari Wedding Invitation

---

## 📜 License
MIT © 2026 Uddipta Tech Solutions • UtsavPatra

