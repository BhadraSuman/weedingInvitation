import React, { useState, useEffect } from 'react';
import { Language, TemplateId } from './types/wedding';
import { templatesMap, getTemplateById } from './data/templates';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { AudioPlayer } from './components/AudioPlayer';
import { LanguageToggle } from './components/LanguageToggle';
import { TemplateSelector } from './components/TemplateSelector';
import { StickyActionBar } from './components/StickyActionBar';

// 4 Distinct Cultural Wedding UI Layouts
import { BengaliWeddingView } from './components/views/BengaliWeddingView';
import { RoyalNorthWeddingView } from './components/views/RoyalNorthWeddingView';
import { SouthIndianWeddingView } from './components/views/SouthIndianWeddingView';
import { ModernMinimalWeddingView } from './components/views/ModernMinimalWeddingView';

export const App: React.FC = () => {
  const [templateId, setTemplateId] = useState<TemplateId>('bengali');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [lang, setLang] = useState<Language>('native');
  const [guestName, setGuestName] = useState<string | undefined>();

  useEffect(() => {
    // Check URL parameters for template & personalized guest name
    const params = new URLSearchParams(window.location.search);
    const tmplParam = params.get('template') || params.get('theme');
    if (tmplParam && tmplParam in templatesMap) {
      setTemplateId(tmplParam as TemplateId);
    }

    const recipient = params.get('to') || params.get('guest');
    if (recipient) {
      setGuestName(recipient);
    }
  }, []);

  const currentTemplate = templatesMap[templateId] || getTemplateById('bengali');

  const handleSelectTemplate = (id: TemplateId) => {
    setTemplateId(id);
    const url = new URL(window.location.href);
    url.searchParams.set('template', id);
    window.history.replaceState({}, '', url.toString());
  };

  // Render the tailored UI design according to culture
  const renderCulturalLayout = () => {
    switch (currentTemplate.id) {
      case 'bengali':
        return (
          <BengaliWeddingView
            template={currentTemplate}
            lang={lang}
            guestName={guestName}
          />
        );
      case 'royal_north':
        return (
          <RoyalNorthWeddingView
            template={currentTemplate}
            lang={lang}
            guestName={guestName}
          />
        );
      case 'south_indian':
        return (
          <SouthIndianWeddingView
            template={currentTemplate}
            lang={lang}
            guestName={guestName}
          />
        );
      case 'modern_minimal':
        return (
          <ModernMinimalWeddingView
            template={currentTemplate}
            lang={lang}
            guestName={guestName}
          />
        );
      default:
        return (
          <BengaliWeddingView
            template={currentTemplate}
            lang={lang}
            guestName={guestName}
          />
        );
    }
  };

  return (
    <div
      className="min-h-screen font-sans selection:bg-[#8B181B] selection:text-[#F3E5AB] transition-colors duration-500"
      style={{
        backgroundColor: currentTemplate.colors.bgParchment,
        color: currentTemplate.colors.textColor
      }}
    >
      {/* 1. Envelope Opening Screen (First-time / Entry screen) */}
      {!isEnvelopeOpen && (
        <EnvelopeIntro
          template={currentTemplate}
          lang={lang}
          guestName={guestName}
          onOpen={() => setIsEnvelopeOpen(true)}
        />
      )}

      {/* Floating Global Controls */}
      <LanguageToggle currentLang={lang} template={currentTemplate} onToggle={setLang} />
      <AudioPlayer />
      <TemplateSelector
        currentTemplate={currentTemplate}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Distinct Cultural Wedding UI Layout */}
      <main className={`transition-opacity duration-1000 ${isEnvelopeOpen ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
        {renderCulturalLayout()}
      </main>

      {/* Mobile Sticky Navigation Bar */}
      {isEnvelopeOpen && <StickyActionBar template={currentTemplate} lang={lang} />}
    </div>
  );
};

export default App;
