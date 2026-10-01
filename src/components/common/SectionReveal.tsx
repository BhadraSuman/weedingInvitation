import React, { useEffect, useRef, useState } from 'react';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: 'up' | 'left' | 'right' | 'scale';
  threshold?: number;
}

/**
 * Wraps any section in a scroll-triggered reveal animation.
 * Uses IntersectionObserver — no JS animation library needed.
 */
export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.12,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const initialStyles: React.CSSProperties = {
    opacity: 0,
    transform:
      direction === 'up'
        ? 'translateY(32px)'
        : direction === 'left'
        ? 'translateX(-32px)'
        : direction === 'right'
        ? 'translateX(32px)'
        : 'scale(0.93)',
    transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)`,
  };

  const visibleStyles: React.CSSProperties = {
    opacity: 1,
    transform: direction === 'scale' ? 'scale(1)' : 'translate(0)',
    transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)`,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={visible ? visibleStyles : initialStyles}
    >
      {children}
    </div>
  );
};
