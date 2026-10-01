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

  const isHindi = (template.id === 'bihari_marwari' || template.id === 'royal_north') && lang === 'native';

  const t = {
    justNow: lang === 'en' ? 'Just now' : isHindi ? 'अभी-अभी' : 'এইমাত্র',
    badge: lang === 'en' ? 'Digital Guestbook & Blessings' : isHindi ? 'आशीर्वाद एवं शुभकामनाएं' : 'স্নেহাশিস ও শুভবার্তা',
    title: lang === 'en' ? 'Shower Your Blessings' : isHindi ? 'नवदंपति को शुभाशीर्वाद दें' : 'দাম্পত্য জীবনের আশীর্বাদ',
    subtitle: lang === 'en'
      ? 'Leave your loving blessings and heartfelt words for the couple.'
      : isHindi
      ? 'वर-वधू के नव दांपत्य जीवन हेतु अपने मंगल आशीष एवं शुभकामनाएं प्रेषित करें।'
      : 'নবদম্পতির শুভ সূচনালগ্নে আপনার অন্তরের আশীর্বাদ ও ভালোবাসার বার্তা রেখে যান।',
    formTitle: lang === 'en' ? 'Send Your Blessings' : isHindi ? 'शुभकामना संदेश भेजें' : 'আশীর্বাদপত্র লিখুন',
    nameLabel: lang === 'en' ? 'Your Name *' : isHindi ? 'आपका शुभ नाम *' : 'আপনার শুভ নাম *',
    namePlaceholder: lang === 'en' ? 'e.g., Subhashis Sengupta' : isHindi ? 'जैसे: राहुल अग्रवाल' : 'যেমন: জয়দীপ মুখার্জী',
    relationLabel: lang === 'en' ? 'Relation / City (Optional)' : isHindi ? 'संबंध / शहर (वैकल्पिक)' : 'সম্পর্ক / পরিচয় (ঐচ্ছিক)',
    relationPlaceholder: lang === 'en' ? 'e.g., College Friend / Aunt' : isHindi ? 'जैसे: मित्र / परिवारजन' : 'যেমন: বন্ধু / আত্মীয়',
    quickLabel: lang === 'en' ? 'Quick Ideas:' : isHindi ? 'सुझावित संदेश:' : 'চটজলদি বার্তা:',
    messageLabel: lang === 'en' ? 'Your Warm Message *' : isHindi ? 'आपका शुभकामना संदेश *' : 'আপনার শুভেচ্ছাবার্তা *',
    messagePlaceholder: lang === 'en' ? 'Write your loving message here...' : isHindi ? 'अपने मंगल आशीष एवं शुभकामनाएं यहां लिखें...' : 'আপনার সুন্দর বার্তাটি এখানে লিখুন...',
    submitting: lang === 'en' ? 'Submitting...' : isHindi ? 'संदेश भेजा जा रहा है...' : 'পাঠানো হচ্ছে...',
    submitBtn: lang === 'en' ? 'Post Blessings' : isHindi ? 'शुभकामनाएं भेजें' : 'শুভবার্তা পাঠান',
    sacredBlessing: lang === 'en' ? 'Sacred blessing' : isHindi ? 'मंगल आशीष' : 'মাঙ্গলিক আশীর্বাদ'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: GuestWish = {
      id: `wish-${Date.now()}`,
      name: authorName.trim(),
      relation: relation.trim() || undefined,
      message: message.trim(),
      timestamp: t.justNow,
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
            {t.badge}
          </span>
          <MessageCircleHeart className="w-5 h-5" style={{ color: colors.primary }} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif" style={{ color: colors.primary }}>
          {t.title}
        </h2>
        <CulturalDivider templateId={template.id} color={colors.accent} />
        <p className="text-xs sm:text-sm font-serif max-w-md mx-auto opacity-80" style={{ color: colors.textColor }}>
          {t.subtitle}
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
              {t.formTitle}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-serif font-semibold mb-1" style={{ color: colors.primary }}>
                {t.nameLabel}
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border bg-white/90 text-xs sm:text-sm focus:outline-none focus:ring-2"
                style={{
                  borderColor: `${colors.accent}66`,
                  color: colors.textColor
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-semibold mb-1" style={{ color: colors.primary }}>
                {t.relationLabel}
              </label>
              <input
                type="text"
                value={relation}
                onChange={e => setRelation(e.target.value)}
                placeholder={t.relationPlaceholder}
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
                {t.quickLabel}
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
                {t.messageLabel}
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={t.messagePlaceholder}
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
              <span>{isSubmitting ? t.submitting : t.submitBtn}</span>
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
                  {t.sacredBlessing}
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
