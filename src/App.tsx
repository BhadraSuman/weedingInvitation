import React, { useState, useEffect } from 'react';
import { Language, TemplateId } from './types/wedding';
import { templatesMap, getTemplateById } from './data/templates';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { AudioPlayer } from './components/AudioPlayer';
import { LanguageToggle } from './components/LanguageToggle';
import { TemplateSelector } from './components/TemplateSelector';
import { HeroSection } from './components/HeroSection';
import { CoupleStory } from './components/CoupleStory';
import { CountdownTimer } from './components/CountdownTimer';
import { EventsTimeline } from './components/EventsTimeline';
import { PhotoGallery } from './components/PhotoGallery';
import { VenueLocation } from './components/VenueLocation';
import { WishesGuestbook } from './components/WishesGuestbook';
import { RsvpSection } from './components/RsvpSection';
import { Footer } from './components/Footer';
import { StickyActionBar } from './components/StickyActionBar';

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
    // Update URL parameter without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('template', id);
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <div
      className="min-h-screen text-[#2C1810] font-sans selection:bg-[#8B181B] selection:text-[#F3E5AB] transition-colors duration-500"
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

      {/* Floating Controls */}
      <LanguageToggle currentLang={lang} template={currentTemplate} onToggle={setLang} />
      <AudioPlayer />
      <TemplateSelector
        currentTemplate={currentTemplate}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Main Wedding Invitation Website */}
      <main className={`transition-opacity duration-1000 ${isEnvelopeOpen ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
        <HeroSection template={currentTemplate} lang={lang} guestName={guestName} />
        <CoupleStory template={currentTemplate} lang={lang} />
        <CountdownTimer template={currentTemplate} lang={lang} />
        <EventsTimeline template={currentTemplate} lang={lang} />
        <PhotoGallery template={currentTemplate} lang={lang} />
        <VenueLocation template={currentTemplate} lang={lang} />
        <WishesGuestbook template={currentTemplate} lang={lang} />
        <RsvpSection template={currentTemplate} lang={lang} />
        <Footer template={currentTemplate} lang={lang} />
      </main>

      {/* Mobile Sticky Navigation Bar */}
      {isEnvelopeOpen && <StickyActionBar template={currentTemplate} lang={lang} />}
    </div>
  );
};

export default App;
