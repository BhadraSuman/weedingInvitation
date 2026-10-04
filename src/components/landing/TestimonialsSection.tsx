import React from 'react';
import { Star, Quote, CheckCircle2, Heart, Sparkles, MapPin } from 'lucide-react';

interface Testimonial {
  id: string;
  coupleName: string;
  location: string;
  eventType: string;
  culturalBadge: string;
  stars: number;
  review: string;
  highlight: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    coupleName: 'Anirban & Deboleena Mukherjee',
    location: 'Kolkata & London (UK)',
    eventType: 'Bengali Heritage Wedding',
    culturalBadge: '🪔 বাঙালি শুভ বিবাহ',
    stars: 5,
    highlight: 'Saved ₹45,000 on printing & overseas courier to London',
    review: 'We were dreading physical card printing deadlines and expensive overseas couriers to our family in the UK and USA. UtsavPatra delivered our custom Lagna Patrika in 24 hours. The NRI timezone converter meant our relatives in London watched our live stream at the exact right hour without any confusion!',
    avatar: '/images/couples/bengali-bride.jpg'
  },
  {
    id: 't-2',
    coupleName: 'Vikram & Pooja Sharma',
    location: 'Patna & Bengaluru',
    eventType: 'Shubh Vivah — North Indian Royal Vivah',
    culturalBadge: '🚩 उत्तर भारतीय पावन विवाह',
    stars: 5,
    highlight: 'Host Dashboard saved our caterer from overcooking by 60 plates',
    review: 'The Host Dashboard is what truly separates UtsavPatra from a basic image card. We could see who opened the link and sent polite 1-click WhatsApp reminders to pending relatives. We had our exact Veg/Non-Veg headcount confirmed a week in advance, saving us huge catering expenses.',
    avatar: '/images/couples/north-groom.jpg'
  },
  {
    id: 't-3',
    coupleName: 'Aditya & Meera Subramanian',
    location: 'Chennai & Mumbai',
    eventType: 'South Indian Kalyanam',
    culturalBadge: '🪷 South Indian Vivaham',
    stars: 5,
    highlight: 'Grandparents zoomed in easily, 1-tap Google Maps meant 0 lost guests',
    review: 'Our biggest worry was whether our elderly relatives could navigate a digital invite. Because UtsavPatra supports clean pinch-to-zoom and 1-tap Google Maps navigation, even our 80-year-old grandfather arrived at the venue without asking anyone for directions!',
    avatar: '/images/couples/south-bride.jpg'
  },
  {
    id: 't-4',
    coupleName: 'Sneha & Rahul Roy',
    location: 'Kolkata',
    eventType: 'Baby Aarav\'s Annaprashan',
    culturalBadge: '🥣 শুভ অন্নপ্রাশন',
    stars: 5,
    highlight: 'Digital Shagun UPI E-Lifafa was loved by distant family',
    review: 'For Aarav\'s first rice ceremony, outstation aunts and uncles who couldn\'t travel transferred shagun directly into our account with auspicious +₹1 UPI presets (₹1,001 and ₹2,101). The interactive Thali Pariksha prediction game was shared across all our WhatsApp groups!',
    avatar: '/images/couples/baby-aarav.jpg'
  },
  {
    id: 't-5',
    coupleName: 'Rajesh Singhania',
    location: 'Pan-India Events & Weddings',
    eventType: 'Wedding Planning Agency Partner',
    culturalBadge: '🤝 Agency Partner',
    stars: 5,
    highlight: 'We white-label UtsavPatra for all luxury high-budget clients',
    review: 'We manage high-profile weddings in Udaipur, Jaipur, and Kolkata. Physical card reprints when a muhurat shifts are a nightmare. UtsavPatra gives our clients instant revisions, personalized guest links with wax seals, and an executive RSVP portal. Essential for modern Indian weddings.',
    avatar: '/images/couples/south-groom.jpg'
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-[#24120C] text-[#F3E5AB] relative overflow-hidden" id="testimonials">
      {/* Ambient background glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#8B181B]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-serif font-bold text-[#F3E5AB] uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-current" />
            <span>Real Client Stories</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FFFDF9]">
            Loved by 1,200+ Families &amp; Wedding Planners
          </h2>

          <p className="text-xs sm:text-sm font-serif text-[#D4AF37]/80 max-w-2xl mx-auto">
            From Kolkata to London, Patna to California — see why modern Indian couples and families choose UtsavPatra for their most sacred celebrations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl p-6 sm:p-7 bg-[#1A0B07]/90 border border-[#D4AF37]/30 shadow-xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1 backdrop-blur-sm"
            >
              {/* Top Stars & Badge */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5 text-[#F59E0B]">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-serif font-bold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/30">
                    {t.culturalBadge}
                  </span>
                </div>

                {/* Bold Highlight Quote */}
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#FDFBF7] mb-2 leading-snug">
                  "{t.highlight}"
                </h3>

                {/* Review Text */}
                <p className="text-xs font-serif text-[#E2D2B8]/85 leading-relaxed italic mb-6">
                  "{t.review}"
                </p>
              </div>

              {/* Author Profile */}
              <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.coupleName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#D4AF37] shrink-0"
                />
                <div>
                  <div className="font-serif font-bold text-xs text-[#FFFDF9] flex items-center gap-1">
                    <span>{t.coupleName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[10px] font-serif text-[#D4AF37]/75 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-[#D4AF37]" />
                    <span>{t.location} • {t.eventType}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Trust Banner Callout */}
        <div className="mt-12 rounded-2xl p-6 bg-[#160805]/95 border border-[#D4AF37]/40 text-center flex flex-col sm:flex-row items-center justify-around gap-4 shadow-inner">
          <div>
            <span className="text-2xl font-serif font-black text-[#F3E5AB] block">4.9 / 5.0</span>
            <span className="text-xs font-serif text-[#E2D2B8]/75">Average Family Satisfaction</span>
          </div>
          <div className="hidden sm:block w-px h-10 bg-[#D4AF37]/30" />
          <div>
            <span className="text-2xl font-serif font-black text-[#F3E5AB] block">100%</span>
            <span className="text-xs font-serif text-[#E2D2B8]/75">Zero Paper Waste &amp; Carbon Neutral</span>
          </div>
          <div className="hidden sm:block w-px h-10 bg-[#D4AF37]/30" />
          <div>
            <span className="text-2xl font-serif font-black text-[#F3E5AB] block">24 Hours</span>
            <span className="text-xs font-serif text-[#E2D2B8]/75">Guaranteed Delivery on WhatsApp</span>
          </div>
        </div>
      </div>

    </section>
  );
};
