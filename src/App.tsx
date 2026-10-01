import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/landing/LandingPage';
import { WeddingSlugPage } from './pages/WeddingSlugPage';
import { ScrollToTop } from './components/common/ScrollToTop';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Global Scroll Restoration on Route Change & Floating Scroll-to-Top Button */}
      <ScrollToTop />

      <Routes>
        {/* 1. Main Company Landing Page (weedinginv.com) */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. Dynamic Client Invitation Slugs (e.g. /anirban-weds-deboleena, /sandeep-weds-priya) */}
        <Route path="/:slug" element={<WeddingSlugPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
