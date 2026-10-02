import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

interface FloatingPetalsProps {
  primaryColor?: string;
  accentColor?: string;
}

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  type: 'rose' | 'marigold' | 'jasmine';
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({
  primaryColor = '#8B181B',
  accentColor = '#D4AF37'
}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate 18 floating petals
    const newPetals: Petal[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2, // 2% to 98%
      size: Math.random() * 12 + 10, // 10px to 22px
      duration: Math.random() * 8 + 10, // 10s to 18s
      delay: Math.random() * 8, // 0s to 8s
      rotate: Math.random() * 360,
      type: i % 3 === 0 ? 'marigold' : i % 3 === 1 ? 'rose' : 'jasmine'
    }));
    setPetals(newPetals);
  }, []);

  const triggerPetalBurst = () => {
    // Custom confetti burst simulating a sacred flower shower
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E53E3E', '#DD6B20', '#D69E2E', '#F6E05E', '#FFFFFF'],
      shapes: ['circle'],
      scalar: 1.2
    });
  };

  if (!isEnabled) {
    return (
      <button
        onClick={() => {
          setIsEnabled(true);
          triggerPetalBurst();
        }}
        title="Turn on Flower Shower"
        className="fixed bottom-32 right-4 sm:bottom-20 sm:right-6 z-40 p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D4AF37] text-stone-700 hover:text-[#8B181B] shadow-lg transition-all"
      >
        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
      </button>
    );
  }

  return (
    <>
      {/* Floating Petal Stream */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
        {petals.map((p) => {
          const petalColor =
            p.type === 'rose'
              ? '#9B111E'
              : p.type === 'marigold'
              ? '#FF9933'
              : '#FFF8DC';

          return (
            <div
              key={p.id}
              className="absolute top-[-40px] opacity-70 animate-petal-fall"
              style={{
                left: `${p.left}%`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear'
              }}
            >
              <div
                className="transform transition-transform"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size * 1.3}px`,
                  backgroundColor: petalColor,
                  borderRadius: p.type === 'rose' ? '60% 40% 60% 40% / 70% 30% 70% 30%' : '50% 50% 50% 50%',
                  transform: `rotate(${p.rotate}deg)`,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Floating Toggle & Burst Button */}
      <div className="fixed bottom-32 right-4 sm:bottom-20 sm:right-6 z-40 flex items-center gap-2">
        <button
          onClick={triggerPetalBurst}
          title="Shower Flowers on Couple"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/90 hover:bg-amber-600 text-white backdrop-blur-md shadow-lg border border-amber-300 text-xs font-serif font-bold transition-all hover:scale-105 active:scale-95"
        >
          <span>🌸 Flower Shower</span>
        </button>
      </div>

      {/* CSS Animation Keyframes */}
      <style>{`
        @keyframes petal-fall {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(50vh) translateX(30px) rotate(180deg);
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(105vh) translateX(-20px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-petal-fall {
          animation-name: petal-fall;
        }
      `}</style>
    </>
  );
};
