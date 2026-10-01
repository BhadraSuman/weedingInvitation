import React from 'react';
import { CulturalTemplate, Language } from '../types/wedding';

interface LanguageToggleProps {
  currentLang: Language;
  template: CulturalTemplate;
  onToggle: (lang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, template, onToggle }) => {
  return (
    <div className="fixed top-4 left-4 z-40">
      <div
        className="flex items-center backdrop-blur-md rounded-full border p-1 shadow-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: `${template.colors.accent}80`
        }}
      >
        <button
          onClick={() => onToggle('native')}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
            currentLang === 'native'
              ? 'text-white shadow-sm'
              : 'text-stone-700 hover:text-black'
          }`}
          style={{
            backgroundColor: currentLang === 'native' ? template.colors.primary : 'transparent'
          }}
        >
          {template.nativeLanguageLabel}
        </button>
        <button
          onClick={() => onToggle('en')}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
            currentLang === 'en'
              ? 'text-white shadow-sm'
              : 'text-stone-700 hover:text-black'
          }`}
          style={{
            backgroundColor: currentLang === 'en' ? template.colors.primary : 'transparent'
          }}
        >
          ENG
        </button>
      </div>
    </div>
  );
};
