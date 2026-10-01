import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PreviewWatermarkProps {
  remainingHours?: number;
}

export const PreviewWatermark: React.FC<PreviewWatermarkProps> = ({ remainingHours = 24 }) => {
  const [temporarilyHidden, setTemporarilyHidden] = useState(false);

  // 6 widely spaced, gentle watermark rows
  const rows = Array.from({ length: 6 });

  const handleToggleHide = () => {
    setTemporarilyHidden(true);
    // Automatically re-enable after 12 seconds
    setTimeout(() => {
      setTemporarilyHidden(false);
    }, 12000);
  };

  return (
    <>
      {/* Ultra-soft, eye-comfort background watermark */}
      {!temporarilyHidden && (
        <div
          className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none flex flex-col justify-around opacity-[0.04] -rotate-12 scale-110 transition-opacity duration-500"
          aria-hidden="true"
        >
          {rows.map((_, i) => (
            <div
              key={i}
              className="whitespace-nowrap text-[#8B181B] font-serif font-semibold text-sm sm:text-lg tracking-[0.4em] uppercase flex justify-around"
            >
              <span>UTSAVPATRA • TRIAL DRAFT • SAMPLE PREVIEW</span>
              <span className="hidden md:inline">UTSAVPATRA • TRIAL DRAFT</span>
              <span>UTSAVPATRA • SAMPLE PREVIEW</span>
            </div>
          ))}
        </div>
      )}

      {/* Floating Eye Comfort Control for Previewers */}
      <div className="fixed bottom-24 right-4 z-40">
        <button
          type="button"
          onClick={handleToggleHide}
          title={temporarilyHidden ? "Watermark paused" : "Temporarily hide watermark to inspect details"}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 border border-stone-300 shadow-md backdrop-blur-md text-[11px] font-serif font-medium transition-all"
        >
          {temporarilyHidden ? (
            <>
              <EyeOff className="w-3.5 h-3.5 text-amber-600" />
              <span>Watermark paused (12s)</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-stone-500" />
              <span>Soft Watermark</span>
            </>
          )}
        </button>
      </div>
    </>
  );
};
