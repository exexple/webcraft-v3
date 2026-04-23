'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

/**
 * PageTransition — Overlay slide transition between routes
 * Uses a full-screen overlay that slides in from bottom on navigate,
 * then slides out to reveal the new page.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Slide out (reveal new page)
    gsap.fromTo(
      overlay,
      { scaleY: 1, transformOrigin: 'top' },
      {
        scaleY: 0,
        duration: 0.7,
        ease: 'power4.inOut',
        delay: 0.1,
      }
    );
  }, [pathname]);

  const handleLinkClick = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Slide in (hide current page)
    gsap.fromTo(
      overlay,
      { scaleY: 0, transformOrigin: 'bottom' },
      { scaleY: 1, duration: 0.5, ease: 'power4.inOut' }
    );
  };

  return (
    <>
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--color-bg)',
          zIndex: 9990,
          pointerEvents: 'none',
          transformOrigin: 'top',
        }}
      />
      {children}
    </>
  );
}
