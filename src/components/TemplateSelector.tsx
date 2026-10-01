import React, { useState } from 'react';
import { CulturalTemplate, TemplateId } from '../types/wedding';
import { templatesList } from '../data/templates';
import { Palette, X, Check, Sparkles } from 'lucide-react';

interface TemplateSelectorProps {
  currentTemplate: CulturalTemplate;
  onSelectTemplate: (templateId: TemplateId) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentTemplate,
  onSelectTemplate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Template Trigger Button */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-2xl border border-[#D4AF37] bg-white/95 backdrop-blur-md text-[#2C1810] hover:scale-105 active:scale-95 transition-all duration-300"
          title="Change Cultural Wedding Template"
          aria-label="Change Cultural Wedding Template"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#8B181B] via-[#D4AF37] to-[#1E3A2F] flex items-center justify-center text-white shadow-sm">
            <Palette className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#997819]">
              Cultural Style
            </span>
            <span className="text-xs font-semibold font-serif flex items-center gap-1">
              <span>{currentTemplate.badgeEmoji}</span>
              <span>{currentTemplate.name}</span>
            </span>
          </div>
        </button>
      </div>

      {/* Modal Drawer to select templates */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#FAF6EE] rounded-3xl p-6 sm:p-7 border-2 border-[#D4AF37] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2C1810]">
                    Select Cultural Wedding Theme
                  </h3>
                  <p className="text-xs text-[#7A6A60] font-sans">
                    Choose from authentic regional Indian and contemporary templates
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Template Cards List */}
            <div className="py-4 space-y-3 overflow-y-auto pr-1">
              {templatesList.map((tmpl) => {
                const isSelected = tmpl.id === currentTemplate.id;

                return (
                  <button
                    key={tmpl.id}
                    onClick={() => {
                      onSelectTemplate(tmpl.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4 relative overflow-hidden group ${
                      isSelected
                        ? 'border-[#D4AF37] bg-white shadow-md ring-2 ring-[#D4AF37]/30'
                        : 'border-stone-200 bg-white/70 hover:bg-white hover:border-[#D4AF37]/60'
                    }`}
                  >
                    {/* Color Swatch Accent Bar */}
                    <div
                      className="w-3.5 h-16 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: tmpl.colors.primary }}
                    />

                    {/* Template Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{tmpl.badgeEmoji}</span>
                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#2C1810] truncate">
                          {tmpl.name}
                        </h4>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-[#7A6A60] font-medium shrink-0">
                          {tmpl.nativeName.split(' ')[0]}
                        </span>
                      </div>

                      <p className="text-xs text-[#997819] font-serif font-medium mt-0.5">
                        {tmpl.cultureLabel}
                      </p>

                      <p className="text-[11px] text-[#6E5D53] mt-1 line-clamp-1">
                        {tmpl.cultureTagline}
                      </p>

                      {/* Color dots preview */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: tmpl.colors.primary }}
                          title="Primary"
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: tmpl.colors.accent }}
                          title="Accent"
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: tmpl.colors.bgParchment }}
                          title="Background"
                        />
                      </div>
                    </div>

                    {/* Selected Indicator */}
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#D4AF37] text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer tip */}
            <div className="pt-3 border-t border-[#D4AF37]/30 text-center text-[11px] text-[#8C7A70] font-sans">
              💡 Switching templates updates motifs, colors, rituals, music, and couple lineages instantly.
            </div>

          </div>
        </div>
      )}
    </>
  );
};
