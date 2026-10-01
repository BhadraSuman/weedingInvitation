import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // 1. Automatically scroll to top whenever the route/slug changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  // 2. Show floating button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 p-3 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#D4AF37] text-[#8B181B] shadow-2xl hover:bg-[#8B181B] hover:text-[#F3E5AB] hover:border-[#F3E5AB] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center group ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
      <span className="sr-only">Scroll to top</span>
    </button>
  );
};
