import React, { useState, useEffect } from 'react';
import { Language } from '../types/wedding';
import { Clock, Sparkles } from 'lucide-react';
import { AlponaDivider } from './AlponaMotifs';

interface CountdownTimerProps {
  lang: Language;
}

// Convert English numbers to Bengali numerals
const toBengaliNumber = (num: number): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .padStart(2, '0')
    .split('')
    .map(d => bengaliDigits[parseInt(d, 10)] || d)
    .join('');
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ lang }) => {
  // Wedding Date: November 28, 2026, 20:15:00 IST
  const targetDate = new Date('2026-11-28T20:15:00+05:30').getTime();

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

  const units = [
    {
      label: lang === 'bn' ? 'দিন' : 'Days',
      value: lang === 'bn' ? toBengaliNumber(timeLeft.days) : timeLeft.days.toString().padStart(2, '0')
    },
    {
      label: lang === 'bn' ? 'ঘণ্টা' : 'Hours',
      value: lang === 'bn' ? toBengaliNumber(timeLeft.hours) : timeLeft.hours.toString().padStart(2, '0')
    },
    {
      label: lang === 'bn' ? 'মিনিট' : 'Minutes',
      value: lang === 'bn' ? toBengaliNumber(timeLeft.minutes) : timeLeft.minutes.toString().padStart(2, '0')
    },
    {
      label: lang === 'bn' ? 'সেকেন্ড' : 'Seconds',
      value: lang === 'bn' ? toBengaliNumber(timeLeft.seconds) : timeLeft.seconds.toString().padStart(2, '0')
    }
  ];

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <div className="relative bg-gradient-to-r from-[#8B181B] via-[#751114] to-[#8B181B] rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-[#D4AF37]/60 text-[#FDFBF7] text-center overflow-hidden">
        
        {/* Subtle Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#52090C]/60 border border-[#D4AF37]/40 mb-3 text-xs tracking-widest text-[#F3E5AB] font-royal uppercase">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{lang === 'bn' ? 'শুভ লগ্নের প্রতীক্ষা' : 'Countdown to Auspicious Lagna'}</span>
          </div>

          <h2 className="font-bengali text-2xl sm:text-3xl font-bold text-[#F3E5AB]">
            {lang === 'bn' ? 'আর মাত্র ক’টা দিন বাকি' : 'Counting Down to Forever'}
          </h2>

          <AlponaDivider className="my-3 max-w-xs mx-auto" color="#F3E5AB" />

          {/* Countdown Boxes */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto mt-6">
            {units.map((unit, idx) => (
              <div
                key={idx}
                className="bg-[#5C0C0F]/80 backdrop-blur-sm border border-[#D4AF37]/50 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-lg group hover:border-[#F3E5AB] transition-all"
              >
                <span className="font-serif text-2xl sm:text-4xl font-extrabold text-[#F3E5AB] group-hover:scale-105 transition-transform duration-200">
                  {unit.value}
                </span>
                <span className="font-bengali text-[11px] sm:text-xs text-[#D4AF37] uppercase tracking-wider mt-1 font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs sm:text-sm text-[#F3E5AB]/85 font-bengali">
            {lang === 'bn'
              ? 'শুভ লগ্ন: ১২ই অগ্রহায়ণ, ১৪৩৩ | রাত্রি ৮:১৫ ঘটিকায়'
              : 'Auspicious Lagna: Saturday, 28th November 2026 at 08:15 PM'}
          </p>
        </div>
      </div>
    </section>
  );
};
