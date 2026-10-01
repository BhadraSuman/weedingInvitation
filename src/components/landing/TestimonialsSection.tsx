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
    avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
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
    avatar: 'https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
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
    avatar: 'https://images.pexels.com/photos/7648057/pexels-photo-7648057.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
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
    avatar: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=200&h=200&q=80'
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
    avatar: 'https://images.pexels.com/photos/3881185/pexels-photo-3881185.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto" id="testimonials">
      
      {/* Section Header */}
      <div className="text-center mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B181B]/10 border border-[#D4AF37]/50 text-xs font-serif font-bold text-[#8B181B] uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-red-600 fill-current" />
          <span>Real Client Stories</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2C1810]">
          Loved by 1,200+ Families &amp; Wedding Planners
        </h2>

        <p className="text-xs sm:text-sm font-serif text-[#6E5D53] max-w-2xl mx-auto">
          From Kolkata to London, Patna to California — see why modern Indian couples and families choose UtsavPatra for their most sacred celebrations.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="rounded-3xl p-6 sm:p-7 bg-white border border-[#D4AF37]/40 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
          >
            {/* Top Stars & Badge */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-serif font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                  {t.culturalBadge}
                </span>
              </div>

              {/* Bold Highlight Quote */}
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#8B181B] mb-2 leading-snug">
                "{t.highlight}"
              </h3>

              {/* Review Text */}
              <p className="text-xs font-serif text-stone-600 leading-relaxed italic mb-6">
                "{t.review}"
              </p>
            </div>

            {/* Author Profile */}
            <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.coupleName}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#D4AF37] shrink-0"
              />
              <div>
                <div className="font-serif font-bold text-xs text-stone-900 flex items-center gap-1">
                  <span>{t.coupleName}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="text-[10px] font-serif text-stone-500 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-[#D4AF37]" />
                  <span>{t.location} • {t.eventType}</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Trust Banner Callout */}
      <div className="mt-12 rounded-2xl p-6 bg-gradient-to-r from-[#FAF5E8] to-[#FFFDF9] border border-[#D4AF37]/50 text-center flex flex-col sm:flex-row items-center justify-around gap-4">
        <div>
          <span className="text-2xl font-serif font-black text-[#8B181B] block">4.9 / 5.0</span>
          <span className="text-xs font-serif text-stone-600">Average Family Satisfaction</span>
        </div>
        <div className="hidden sm:block w-px h-10 bg-[#D4AF37]/40" />
        <div>
          <span className="text-2xl font-serif font-black text-[#8B181B] block">100%</span>
          <span className="text-xs font-serif text-stone-600">Zero Paper Waste &amp; Carbon Neutral</span>
        </div>
        <div className="hidden sm:block w-px h-10 bg-[#D4AF37]/40" />
        <div>
          <span className="text-2xl font-serif font-black text-[#8B181B] block">24 Hours</span>
          <span className="text-xs font-serif text-stone-600">Guaranteed Delivery on WhatsApp</span>
        </div>
      </div>

    </section>
  );
};
