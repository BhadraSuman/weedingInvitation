import React, { useState, useEffect } from 'react';
import { audioManager } from '../utils/audioManager';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlaying(playing);
    });
    setIsPlaying(audioManager.isPlaying());
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    audioManager.toggle();
  };

  return (
    <aside aria-label="Wedding Music Controls" className="fixed top-4 right-4 z-40">
      <button
        onClick={handleToggle}
        title={isPlaying ? "Mute Background Music" : "Play Background Music"}
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
        className={`group flex items-center gap-2 px-3 py-2 rounded-full shadow-lg border backdrop-blur-md transition-all duration-300 whitespace-nowrap shrink-0 ${
          isPlaying
            ? 'bg-[#8B181B]/90 border-[#D4AF37] text-[#F3E5AB] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
            : 'bg-[#FBF7EE]/90 border-[#8B181B]/30 text-[#8B181B] hover:border-[#8B181B]'
        }`}
      >
        {/* Equalizer animation bars when playing */}
        <div className="flex items-center gap-0.5 h-4 w-4 justify-center">
          {isPlaying ? (
            <>
              <span className="w-0.5 h-3 bg-[#D4AF37] rounded-full animate-pulse" />
              <span className="w-0.5 h-4 bg-[#D4AF37] rounded-full animate-pulse [animation-delay:150ms]" />
              <span className="w-0.5 h-2 bg-[#D4AF37] rounded-full animate-pulse [animation-delay:300ms]" />
            </>
          ) : (
            <Music className="w-4 h-4 opacity-70" />
          )}
        </div>

        {/* Music Status Icon */}
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#D4AF37]" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#8B181B]/70" />
        )}

        <span className="text-xs font-serif font-medium hidden sm:inline-block">
          {isPlaying ? "Shehnai Playing" : "Play Music"}
        </span>
      </button>
    </aside>
  );
};
