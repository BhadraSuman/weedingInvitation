import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface BalloonItem {
  id: number;
  color: string;
  shineColor: string;
  size: number;
  leftPercent: number;
  initialDelay: number;
  duration: number;
  swayDistance: number;
}

const BALLOON_PALETTES = [
  { color: '#EC4899', shine: '#F472B6' }, // Hot Pink
  { color: '#8B5CF6', shine: '#A78BFA' }, // Purple
  { color: '#38BDF8', shine: '#7DD3FC' }, // Sky Blue
  { color: '#F59E0B', shine: '#FCD34D' }, // Golden Yellow
  { color: '#10B981', shine: '#34D399' }, // Emerald Mint
  { color: '#F43F5E', shine: '#FB7185' }, // Rose Coral
];

const INITIAL_BALLOONS: BalloonItem[] = [
  { id: 1, color: '#EC4899', shineColor: '#FBCFE8', size: 58, leftPercent: 4, initialDelay: 0, duration: 6.5, swayDistance: 16 },
  { id: 2, color: '#8B5CF6', shineColor: '#DDD6FE', size: 66, leftPercent: 12, initialDelay: 1.2, duration: 7.2, swayDistance: -20 },
  { id: 3, color: '#38BDF8', shineColor: '#BAE6FD', size: 54, leftPercent: 22, initialDelay: 0.5, duration: 5.8, swayDistance: 14 },
  { id: 4, color: '#F59E0B', shineColor: '#FEF3C7', size: 62, leftPercent: 74, initialDelay: 0.8, duration: 6.8, swayDistance: -18 },
  { id: 5, color: '#10B981', shineColor: '#A7F3D0', size: 56, leftPercent: 86, initialDelay: 1.6, duration: 6.1, swayDistance: 15 },
  { id: 6, color: '#F43F5E', shineColor: '#FECDD3', size: 64, leftPercent: 94, initialDelay: 0.3, duration: 7.0, swayDistance: -22 },
];

export const FloatingBalloons: React.FC<{ interactive?: boolean }> = ({ interactive = true }) => {
  const [poppedIds, setPoppedIds] = useState<Set<number>>(new Set());
  const [burstCount, setBurstCount] = useState(0);

  // Play micro pop sound via Web Audio API
  const playPopSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // AudioContext unavailable
    }
  };

  const handlePop = (balloon: BalloonItem, event: React.MouseEvent) => {
    if (!interactive) return;

    playPopSound();

    // Trigger local confetti burst at balloon position
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    try {
      confetti({
        particleCount: 28,
        spread: 60,
        origin: { x, y },
        colors: [balloon.color, balloon.shineColor, '#FFFFFF', '#FDE047'],
        scalar: 0.8,
        ticks: 120,
      });
    } catch {
      // ignore
    }

    setPoppedIds((prev) => new Set([...prev, balloon.id]));
    setBurstCount((prev) => prev + 1);

    // Respawns after 4 seconds
    setTimeout(() => {
      setPoppedIds((prev) => {
        const next = new Set(prev);
        next.delete(balloon.id);
        return next;
      });
    }, 4000);
  };

  const handleReleaseAll = () => {
    setPoppedIds(new Set());
    playPopSound();
    try {
      confetti({
        particleCount: 70,
        spread: 100,
        origin: { y: 0.7 },
        colors: ['#EC4899', '#8B5CF6', '#38BDF8', '#F59E0B', '#10B981'],
      });
    } catch {}
  };

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-30 select-none">
      {/* Floating balloons container */}
      {INITIAL_BALLOONS.map((b) => {
        const isPopped = poppedIds.has(b.id);

        return (
          <AnimatePresence key={b.id}>
            {!isPopped && (
              <motion.div
                initial={{ y: '105vh', opacity: 0, scale: 0.6 }}
                animate={{
                  y: ['105vh', '-25vh'],
                  x: [0, b.swayDistance, -b.swayDistance, b.swayDistance / 2, 0],
                  rotate: [-4, 6, -5, 4, -4],
                  opacity: [0, 0.95, 0.95, 0.9, 0],
                  scale: 1,
                }}
                exit={{
                  scale: [1, 1.3, 0],
                  opacity: [1, 0.8, 0],
                  transition: { duration: 0.2 },
                }}
                transition={{
                  duration: b.duration * 3.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                  delay: b.initialDelay,
                  ease: 'easeInOut',
                }}
                className="absolute pointer-events-auto cursor-pointer group"
                style={{
                  left: `${b.leftPercent}%`,
                  width: b.size,
                  height: b.size * 1.25,
                }}
                onClick={(e) => handlePop(b, e)}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.85 }}
                title="Tap to pop balloon! 🎈"
              >
                {/* Balloon SVG with gradient, highlight, and tied string */}
                <svg
                  viewBox="0 0 100 135"
                  className="w-full h-full filter drop-shadow-md group-hover:drop-shadow-xl transition-all"
                >
                  <defs>
                    <radialGradient id={`balloon-grad-${b.id}`} cx="35%" cy="30%" r="65%">
                      <stop offset="0%" stopColor={b.shineColor} />
                      <stop offset="60%" stopColor={b.color} />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
                    </radialGradient>
                  </defs>

                  {/* Balloon Body (Oval pear shape) */}
                  <path
                    d="M 50 5 C 24 5, 5 24, 5 52 C 5 76, 28 98, 46 106 L 50 110 L 54 106 C 72 98, 95 76, 95 52 C 95 24, 76 5, 50 5 Z"
                    fill={`url(#balloon-grad-${b.id})`}
                  />

                  {/* Glossy Curved Highlight */}
                  <ellipse
                    cx="32"
                    cy="34"
                    rx="12"
                    ry="20"
                    transform="rotate(-25 32 34)"
                    fill="#FFFFFF"
                    opacity="0.5"
                  />
                  <ellipse
                    cx="25"
                    cy="25"
                    rx="4"
                    ry="6"
                    transform="rotate(-25 25 25)"
                    fill="#FFFFFF"
                    opacity="0.8"
                  />

                  {/* Balloon Knot */}
                  <polygon points="46,108 54,108 50,114" fill={b.color} />

                  {/* Swaying String */}
                  <path
                    d="M 50 114 Q 55 122, 48 128 T 52 135"
                    stroke="#D1D5DB"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Pop Me Hint on hover */}
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-white bg-purple-900/80 px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
                  Pop! 💥
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}

      {/* Floating Balloon Pop Counter badge at top right */}
      {burstCount > 0 && (
        <div className="pointer-events-auto fixed bottom-6 right-20 sm:right-24 z-40 bg-white/95 backdrop-blur-md border border-purple-200 shadow-xl rounded-full px-3.5 py-1.5 flex items-center gap-2 text-xs font-bold text-purple-700 animate-bounce">
          <span>🎈 Balloons Popped: {burstCount}</span>
          <button
            onClick={handleReleaseAll}
            className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded-full hover:bg-purple-700 active:scale-95 transition"
            title="Reset balloons"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};
