import React, { useState, useEffect } from 'react';
import { Language } from './types/wedding';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { AudioPlayer } from './components/AudioPlayer';
import { LanguageToggle } from './components/LanguageToggle';
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
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [lang, setLang] = useState<Language>('bn');
  const [guestName, setGuestName] = useState<string | undefined>();

  useEffect(() => {
    // Extract guest name from URL query parameters (e.g. ?to=Joydeep+Da or ?guest=...)
    const params = new URLSearchParams(window.location.search);
    const recipient = params.get('to') || params.get('guest');
    if (recipient) {
      setGuestName(recipient);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF7EE] text-[#2C1810] font-sans selection:bg-[#8B181B] selection:text-[#F3E5AB]">
      {/* 1. Envelope Opening Screen (First-time / Entry screen) */}
      {!isEnvelopeOpen && (
        <EnvelopeIntro
          lang={lang}
          guestName={guestName}
          onOpen={() => setIsEnvelopeOpen(true)}
        />
      )}

      {/* Floating Controls */}
      <LanguageToggle currentLang={lang} onToggle={setLang} />
      <AudioPlayer />

      {/* Main Wedding Invitation Website */}
      <main className={`transition-opacity duration-1000 ${isEnvelopeOpen ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
        <HeroSection lang={lang} guestName={guestName} />
        <CoupleStory lang={lang} />
        <CountdownTimer lang={lang} />
        <EventsTimeline lang={lang} />
        <PhotoGallery lang={lang} />
        <VenueLocation lang={lang} />
        <WishesGuestbook lang={lang} />
        <RsvpSection lang={lang} />
        <Footer lang={lang} />
      </main>

      {/* Mobile Sticky Navigation Bar */}
      {isEnvelopeOpen && <StickyActionBar lang={lang} />}
    </div>
  );
};

export default App;
