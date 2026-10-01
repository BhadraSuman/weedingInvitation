import React from 'react';

interface PreviewWatermarkProps {
  remainingHours?: number;
}

export const PreviewWatermark: React.FC<PreviewWatermarkProps> = ({ remainingHours = 24 }) => {
  // Grid of repeating watermark lines
  const rows = Array.from({ length: 14 });

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none flex flex-col justify-around opacity-[0.14] sm:opacity-[0.12] -rotate-12 scale-125"
      aria-hidden="true"
    >
      {rows.map((_, i) => (
        <div
          key={i}
          className="whitespace-nowrap text-stone-900 font-serif font-black text-xs sm:text-base tracking-[0.3em] uppercase flex justify-around"
        >
          <span>SAMPLE PREVIEW • UTSAVPATRA.COM • NOT FOR GUESTS • DRAFT ONLY</span>
          <span className="hidden sm:inline">SAMPLE PREVIEW • UTSAVPATRA.COM • DRAFT ONLY</span>
          <span>SAMPLE PREVIEW • UTSAVPATRA.COM • NOT FOR GUESTS</span>
        </div>
      ))}
    </div>
  );
};
