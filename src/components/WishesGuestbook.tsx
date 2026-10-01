import React, { useState, useEffect } from 'react';
import { initialWishes } from '../data/weddingData';
import { GuestWish, Language } from '../types/wedding';
import { AlponaDivider, ShankhoIcon } from './AlponaMotifs';
import { Heart, Send, Sparkles, MessageCircleHeart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WishesGuestbookProps {
  lang: Language;
}

export const WishesGuestbook: React.FC<WishesGuestbookProps> = ({ lang }) => {
  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    const saved = localStorage.getItem('wedding_wishes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialWishes;
      }
    }
    return initialWishes;
  });

  const [authorName, setAuthorName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
  }, [wishes]);

  const quickWishes = lang === 'bn' ? [
    "নতুন জীবনের পথচলা আনন্দে ভরে উঠুক!",
    "অনির্বাণ ও দেবলীনার যুগল জীবন চিরকল্যাণময় হোক।",
    "অনেক অনেক ভালোবাসা ও শুভকামনা রইল!",
    "দুজনকে রাজযোটক মানিয়েছে, চিরসুখী হও।"
  ] : [
    "Wishing you both a lifetime of love and happiness!",
    "Congratulations Anirban & Deboleena! Such a gorgeous couple.",
    "May your bond grow stronger with each passing day!",
    "Heartiest congratulations to both families on this joyous union."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: GuestWish = {
      id: `wish-${Date.now()}`,
      name: authorName.trim(),
      relation: relation.trim() || undefined,
      message: message.trim(),
      timestamp: lang === 'bn' ? 'এইমাত্র' : 'Just now',
      hearts: 1
    };

    setTimeout(() => {
      setWishes(prev => [newWish, ...prev]);
      setAuthorName('');
      setRelation('');
      setMessage('');
      setIsSubmitting(false);

      // Trigger celebratory heart confetti
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#8B181B', '#D4AF37', '#E11D48']
        });
      } catch {}
    }, 400);
  };

  const handleLike = (id: string) => {
    if (likedMap[id]) return;
    setLikedMap(prev => ({ ...prev, [id]: true }));
    setWishes(prev =>
      prev.map(w => (w.id === id ? { ...w, hearts: w.hearts + 1 } : w))
    );
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto" id="wishes">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MessageCircleHeart className="w-5 h-5 text-[#8B181B]" />
          <span className="font-royal text-xs uppercase tracking-widest text-[#8B181B] font-semibold">
            {lang === 'bn' ? 'স্নেহাশিস ও শুভবার্তা' : 'Digital Guestbook & Blessings'}
          </span>
          <MessageCircleHeart className="w-5 h-5 text-[#8B181B]" />
        </div>
        <h2 className="font-bengali text-3xl sm:text-4xl text-[#8B181B] font-bold">
          {lang === 'bn' ? 'দাম্পত্য জীবনের আশীর্বাদ' : 'Shower Your Wishes'}
        </h2>
        <AlponaDivider className="my-3 max-w-xs mx-auto" />
        <p className="text-xs sm:text-sm text-[#6B5A55] font-bengali max-w-md mx-auto">
          {lang === 'bn'
            ? 'নবদম্পতির শুভ সূচনালগ্নে আপনার অন্তরের আশীর্বাদ ও ভালোবাসার বার্তা রেখে যান।'
            : 'Leave your loving blessings and heartfelt words for Anirban & Deboleena.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form to Post Wishes */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#FFFDF9] to-[#FBF7EE] rounded-3xl p-6 border-2 border-[#D4AF37]/50 shadow-lg">
          <div className="flex items-center gap-2 mb-4 text-[#8B181B]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-bengali text-lg font-bold">
              {lang === 'bn' ? 'আশীর্বাদপত্র লিখুন' : 'Send Your Blessings'}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-serif font-semibold text-[#5C0C0F] mb-1">
                {lang === 'bn' ? 'আপনার শুভ নাম *' : 'Your Name *'}
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                placeholder={lang === 'bn' ? 'যেমন: সুভাষিস সেনগুপ্ত' : 'e.g., Subhashis Sengupta'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white/90 text-xs sm:text-sm text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#8B181B]/40"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-semibold text-[#5C0C0F] mb-1">
                {lang === 'bn' ? 'সম্পর্ক / পরিচয় (ঐচ্ছিক)' : 'Relation / City (Optional)'}
              </label>
              <input
                type="text"
                value={relation}
                onChange={e => setRelation(e.target.value)}
                placeholder={lang === 'bn' ? 'যেমন: কনের মাসিমণি / বন্ধু' : 'e.g., College Friend / Aunt'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white/90 text-xs sm:text-sm text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#8B181B]/40"
              />
            </div>

            {/* Quick Inspiration Chips */}
            <div>
              <label className="block text-[11px] font-royal uppercase tracking-wider text-[#997819] mb-1.5 font-semibold">
                {lang === 'bn' ? 'চটজলদি বার্তা পছন্দ করুন:' : 'Quick Ideas:'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {quickWishes.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMessage(q)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-[#F4ECD8] hover:bg-[#D4AF37]/30 text-[#5C0C0F] border border-[#D4AF37]/30 transition-colors text-left"
                  >
                    + {q.slice(0, 24)}...
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif font-semibold text-[#5C0C0F] mb-1">
                {lang === 'bn' ? 'আপনার শুভেচ্ছাবার্তা *' : 'Your Warm Message *'}
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={lang === 'bn' ? 'আপনার সুন্দর বার্তাটি এখানে লিখুন...' : 'Write your loving message here...'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white/90 text-xs sm:text-sm text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#8B181B]/40 resize-none font-bengali"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-[#8B181B] hover:bg-[#5C0C0F] text-[#F3E5AB] rounded-xl font-bengali font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Send className="w-4 h-4 text-[#D4AF37]" />
              <span>{isSubmitting ? (lang === 'bn' ? 'পাঠানো হচ্ছে...' : 'Submitting...') : (lang === 'bn' ? 'শুভবার্তা পাঠান' : 'Post Blessings')}</span>
            </button>
          </form>
        </div>

        {/* Wishes Feed Wall */}
        <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {wishes.map(wish => (
            <div
              key={wish.id}
              className="bg-white/90 rounded-2xl p-4 sm:p-5 border border-[#D4AF37]/40 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h4 className="font-bengali font-bold text-sm sm:text-base text-[#8B181B]">
                    {wish.name}
                  </h4>
                  {wish.relation && (
                    <span className="text-[11px] font-serif text-[#997819] block">
                      ✦ {wish.relation}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-[#7A6960] font-sans shrink-0">
                  {wish.timestamp}
                </span>
              </div>

              <p className="font-bengali text-xs sm:text-sm text-[#382823] leading-relaxed whitespace-pre-line my-2">
                {wish.message}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-[#D4AF37]/20 text-xs">
                <span className="text-[11px] text-[#997819] font-serif italic">
                  {lang === 'bn' ? 'মাঙ্গলিক祝福' : 'Sacred blessing'}
                </span>
                <button
                  onClick={() => handleLike(wish.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors ${
                    likedMap[wish.id]
                      ? 'bg-rose-100 text-rose-700 font-semibold'
                      : 'hover:bg-rose-50 text-[#8B181B]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${likedMap[wish.id] ? 'fill-rose-600 text-rose-600' : 'text-[#8B181B]'}`} />
                  <span>{wish.hearts}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
