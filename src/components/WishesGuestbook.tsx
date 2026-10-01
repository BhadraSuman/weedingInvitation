import React, { useState, useEffect } from 'react';
import { CulturalTemplate, GuestWish, Language } from '../types/wedding';
import { CulturalDivider } from './CulturalMotifs';
import { Heart, Send, Sparkles, MessageCircleHeart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WishesGuestbookProps {
  template: CulturalTemplate;
  lang: Language;
}

export const WishesGuestbook: React.FC<WishesGuestbookProps> = ({ template, lang }) => {
  const { colors } = template;
  const storageKey = `wishes_${template.id}`;

  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return template.initialWishes;
      }
    }
    return template.initialWishes;
  });

  const [authorName, setAuthorName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Reload wishes when template changes
    const saved = localStorage.getItem(`wishes_${template.id}`);
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
        return;
      } catch {}
    }
    setWishes(template.initialWishes);
  }, [template.id]);

  useEffect(() => {
    localStorage.setItem(`wishes_${template.id}`, JSON.stringify(wishes));
  }, [wishes, template.id]);

  const quickWishes = lang === 'native' ? template.quickWishes.native : template.quickWishes.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: GuestWish = {
      id: `wish-${Date.now()}`,
      name: authorName.trim(),
      relation: relation.trim() || undefined,
      message: message.trim(),
      timestamp: lang === 'native' ? 'এইমাত্র / अभी' : 'Just now',
      hearts: 1
    };

    setTimeout(() => {
      setWishes(prev => [newWish, ...prev]);
      setAuthorName('');
      setRelation('');
      setMessage('');
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.8 },
          colors: [colors.primary, colors.accent, '#E11D48']
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
          <MessageCircleHeart className="w-5 h-5" style={{ color: colors.primary }} />
          <span className="font-serif text-xs uppercase tracking-widest font-semibold" style={{ color: colors.primary }}>
            {lang === 'native' ? 'স্নেহাশিস ও শুভবার্তা / शुभकामनाएं' : 'Digital Guestbook & Blessings'}
          </span>
          <MessageCircleHeart className="w-5 h-5" style={{ color: colors.primary }} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif" style={{ color: colors.primary }}>
          {lang === 'native' ? 'দাম্পত্য জীবনের আশীর্বাদ' : 'Shower Your Blessings'}
        </h2>
        <CulturalDivider templateId={template.id} color={colors.accent} />
        <p className="text-xs sm:text-sm font-serif max-w-md mx-auto opacity-80" style={{ color: colors.textColor }}>
          {lang === 'native'
            ? 'নবদম্পতির শুভ সূচনালগ্নে আপনার অন্তরের আশীর্বাদ ও ভালোবাসার বার্তা রেখে যান।'
            : 'Leave your loving blessings and heartfelt words for the couple.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form to Post Wishes */}
        <div
          className="lg:col-span-5 rounded-3xl p-6 border-2 shadow-lg"
          style={{
            backgroundColor: colors.bgCard,
            borderColor: `${colors.accent}66`
          }}
        >
          <div className="flex items-center gap-2 mb-4" style={{ color: colors.primary }}>
            <Sparkles className="w-4 h-4" style={{ color: colors.accent }} />
            <h3 className="font-serif text-lg font-bold">
              {lang === 'native' ? 'আশীর্বাদপত্র লিখুন / संदेश भेजें' : 'Send Your Blessings'}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-serif font-semibold mb-1" style={{ color: colors.primary }}>
                {lang === 'native' ? 'আপনার শুভ নাম *' : 'Your Name *'}
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                placeholder={lang === 'native' ? 'যেমন: জয়দীপ / राहुल' : 'e.g., Subhashis Sengupta'}
                className="w-full px-3.5 py-2.5 rounded-xl border bg-white/90 text-xs sm:text-sm focus:outline-none focus:ring-2"
                style={{
                  borderColor: `${colors.accent}66`,
                  color: colors.textColor
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-semibold mb-1" style={{ color: colors.primary }}>
                {lang === 'native' ? 'সম্পর্ক / পরিচয় (ঐচ্ছিক)' : 'Relation / City (Optional)'}
              </label>
              <input
                type="text"
                value={relation}
                onChange={e => setRelation(e.target.value)}
                placeholder={lang === 'native' ? 'বন্ধু / আত্মীয়' : 'e.g., College Friend / Aunt'}
                className="w-full px-3.5 py-2.5 rounded-xl border bg-white/90 text-xs sm:text-sm focus:outline-none focus:ring-2"
                style={{
                  borderColor: `${colors.accent}66`,
                  color: colors.textColor
                }}
              />
            </div>

            {/* Quick Inspiration Chips */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider mb-1.5 font-semibold font-serif" style={{ color: colors.accent }}>
                {lang === 'native' ? 'চটজলদি বার্তা:' : 'Quick Ideas:'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {quickWishes.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMessage(q)}
                    className="text-[11px] px-2.5 py-1 rounded-full border transition-colors text-left"
                    style={{
                      backgroundColor: colors.bgParchment,
                      borderColor: `${colors.accent}4D`,
                      color: colors.primary
                    }}
                  >
                    + {q.slice(0, 24)}...
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif font-semibold mb-1" style={{ color: colors.primary }}>
                {lang === 'native' ? 'আপনার শুভেচ্ছাবার্তা *' : 'Your Warm Message *'}
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={lang === 'native' ? 'আপনার সুন্দর বার্তাটি এখানে লিখুন...' : 'Write your loving message here...'}
                className="w-full px-3.5 py-2.5 rounded-xl border bg-white/90 text-xs sm:text-sm focus:outline-none focus:ring-2 resize-none font-serif"
                style={{
                  borderColor: `${colors.accent}66`,
                  color: colors.textColor
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 text-white rounded-xl font-serif font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              style={{ backgroundColor: colors.primary }}
            >
              <Send className="w-4 h-4" style={{ color: colors.accentLight }} />
              <span>{isSubmitting ? (lang === 'native' ? 'পাঠানো হচ্ছে...' : 'Submitting...') : (lang === 'native' ? 'শুভবার্তা পাঠান' : 'Post Blessings')}</span>
            </button>
          </form>
        </div>

        {/* Wishes Feed Wall */}
        <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {wishes.map(wish => (
            <div
              key={wish.id}
              className="bg-white/95 rounded-2xl p-4 sm:p-5 border shadow-sm hover:shadow-md transition-all"
              style={{ borderColor: `${colors.accent}4D` }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h4 className="font-serif font-bold text-sm sm:text-base" style={{ color: colors.primary }}>
                    {wish.name}
                  </h4>
                  {wish.relation && (
                    <span className="text-[11px] font-serif block opacity-80" style={{ color: colors.accent }}>
                      ✦ {wish.relation}
                    </span>
                  )}
                </div>
                <span className="text-[10px] opacity-70 font-sans shrink-0">
                  {wish.timestamp}
                </span>
              </div>

              <p className="font-serif text-xs sm:text-sm leading-relaxed whitespace-pre-line my-2" style={{ color: colors.textColor }}>
                {wish.message}
              </p>

              <div className="pt-2 flex items-center justify-between border-t text-xs" style={{ borderColor: `${colors.accent}33` }}>
                <span className="text-[11px] font-serif italic opacity-80" style={{ color: colors.accent }}>
                  {lang === 'native' ? 'মাঙ্গলিক আশীর্বাদ' : 'Sacred blessing'}
                </span>
                <button
                  onClick={() => handleLike(wish.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors ${
                    likedMap[wish.id]
                      ? 'bg-rose-100 text-rose-700 font-semibold'
                      : 'hover:bg-rose-50 text-rose-600'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${likedMap[wish.id] ? 'fill-rose-600 text-rose-600' : 'text-rose-500'}`} />
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
