import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/landing/LandingPage';
import { WeddingSlugPage } from './pages/WeddingSlugPage';
import { TryoutPage } from './pages/TryoutPage';
import { DemoPreviewPage } from './pages/DemoPreviewPage';
import { HostDashboardPage } from './pages/HostDashboardPage';
import { VivahCompanionPage } from './pages/VivahCompanionPage';
import { ScrollToTop } from './components/common/ScrollToTop';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Global Scroll Restoration on Route Change & Floating Scroll-to-Top Button */}
      <ScrollToTop />

      <Routes>
        {/* 1. Main Company Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. Instant Free Tryout Generator */}
        <Route path="/tryout" element={<TryoutPage />} />
        <Route path="/create-demo" element={<TryoutPage />} />

        {/* 3. Live Custom Invitation Preview */}
        <Route path="/preview" element={<DemoPreviewPage />} />

        {/* 4. Host Management Portal & RSVP Dashboard */}
        <Route path="/host-dashboard" element={<HostDashboardPage />} />
        <Route path="/dashboard" element={<HostDashboardPage />} />

        {/* 5. Dedicated Vivah Companion Live Day App */}
        <Route path="/vivah-companion" element={<VivahCompanionPage />} />
        <Route path="/companion" element={<VivahCompanionPage />} />

        {/* 6. Dynamic Client Invitation Slugs (e.g. /anirban-weds-deboleena, /sandeep-weds-priya) */}
        <Route path="/:slug" element={<WeddingSlugPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
