import React from 'react';
import { Language } from '../types/wedding';

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: (lang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle }) => {
  return (
    <div className="fixed top-4 left-4 z-40">
      <div className="flex items-center bg-[#FBF7EE]/90 backdrop-blur-md rounded-full border border-[#D4AF37]/50 p-1 shadow-md">
        <button
          onClick={() => onToggle('bn')}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
            currentLang === 'bn'
              ? 'bg-[#8B181B] text-[#F3E5AB] shadow-sm'
              : 'text-[#8B181B] hover:text-[#5C0C0F]'
          }`}
        >
          বাংলা
        </button>
        <button
          onClick={() => onToggle('en')}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
            currentLang === 'en'
              ? 'bg-[#8B181B] text-[#F3E5AB] shadow-sm'
              : 'text-[#8B181B] hover:text-[#5C0C0F]'
          }`}
        >
          ENG
        </button>
      </div>
    </div>
  );
};
