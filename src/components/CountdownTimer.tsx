import React, { useState, useEffect } from 'react';
import { CulturalTemplate, Language } from '../types/wedding';
import { Clock } from 'lucide-react';
import { CulturalDivider } from './CulturalMotifs';

interface CountdownTimerProps {
  template: CulturalTemplate;
  lang: Language;
}

// Convert English numbers to Bengali numerals if language is Bengali
const toBengaliNumber = (num: number): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .padStart(2, '0')
    .split('')
    .map(d => bengaliDigits[parseInt(d, 10)] || d)
    .join('');
};

// Convert English numbers to Devanagari numerals if language is Hindi
const toDevanagariNumber = (num: number): string => {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return num
    .toString()
    .padStart(2, '0')
    .split('')
    .map(d => devanagariDigits[parseInt(d, 10)] || d)
    .join('');
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ template, lang }) => {
  const targetDate = new Date(template.targetDate).getTime();
  const { colors } = template;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const isHindi = (template.id === 'bihari_marwari' || template.id === 'royal_north') && lang === 'native';
  const isBengali = template.id === 'bengali' && lang === 'native';

  const formatValue = (num: number): string => {
    if (isBengali) return toBengaliNumber(num);
    if (isHindi) return toDevanagariNumber(num);
    return num.toString().padStart(2, '0');
  };

  const getUnitLabels = () => {
    if (lang === 'en') {
      return { days: 'Days', hours: 'Hours', mins: 'Minutes', secs: 'Seconds' };
    }
    if (isHindi) {
      return { days: 'दिन', hours: 'घंटे', mins: 'मिनट', secs: 'सेकंड' };
    }
    if (template.id === 'south_indian') {
      return { days: 'நாட்கள்', hours: 'மணி', mins: 'நிமிடம்', secs: 'விநாடி' };
    }
    return { days: 'দিন', hours: 'ঘণ্টা', mins: 'মিনিট', secs: 'সেকেন্ড' };
  };

  const labels = getUnitLabels();

  const units = [
    { label: labels.days, value: formatValue(timeLeft.days) },
    { label: labels.hours, value: formatValue(timeLeft.hours) },
    { label: labels.mins, value: formatValue(timeLeft.minutes) },
    { label: labels.secs, value: formatValue(timeLeft.seconds) }
  ];

  const getBadgeText = () => {
    if (lang === 'en') return 'Countdown to Forever';
    if (isHindi) return 'शुभ लग्न की प्रतीक्षा';
    if (template.id === 'south_indian') return 'நல்வேளை நோக்கிய காத்திருப்பு';
    return 'শুভ লগ্নের প্রতীক্ষা';
  };

  const getHeadingText = () => {
    if (lang === 'en') return 'Counting Down to Our Big Day';
    if (isHindi) return 'पावन विवाह में शेष समय';
    if (template.id === 'south_indian') return 'திருமண நாளுக்கான காத்திருப்பு';
    return 'আর মাত্র ক’টা দিন বাকি';
  };

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <div
        className="relative rounded-3xl p-8 sm:p-10 shadow-2xl border-2 text-center overflow-hidden"
        style={{
          backgroundColor: colors.primary,
          borderColor: `${colors.accent}99`,
          color: '#FFFFFF'
        }}
      >
        {/* Subtle Decorative Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(${colors.accent} 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3 text-xs tracking-widest font-serif uppercase font-semibold"
            style={{
              backgroundColor: `${colors.primaryDark}99`,
              borderColor: `${colors.accent}66`,
              color: colors.accentLight
            }}
          >
            <Clock className="w-3.5 h-3.5" style={{ color: colors.accent }} />
            <span>{getBadgeText()}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-serif" style={{ color: colors.accentLight }}>
            {getHeadingText()}
          </h2>

          <CulturalDivider templateId={template.id} color={colors.accentLight} />

          {/* Countdown Boxes */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto mt-6">
            {units.map((unit, idx) => (
              <div
                key={idx}
                className="backdrop-blur-sm border rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-lg group transition-all"
                style={{
                  backgroundColor: `${colors.primaryDark}B3`,
                  borderColor: `${colors.accent}66`
                }}
              >
                <span
                  className="font-serif text-2xl sm:text-4xl font-extrabold group-hover:scale-105 transition-transform duration-200"
                  style={{ color: colors.accentLight }}
                >
                  {unit.value}
                </span>
                <span
                  className="text-[11px] sm:text-xs uppercase tracking-wider mt-1 font-serif font-medium"
                  style={{ color: colors.accent }}
                >
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs sm:text-sm font-serif opacity-90" style={{ color: colors.accentLight }}>
            {lang === 'native' ? template.targetDateNative : `Wedding: ${template.targetDate.replace('T', ' at ').slice(0, 19)}`}
          </p>
        </div>
      </div>
    </section>
  );
};
