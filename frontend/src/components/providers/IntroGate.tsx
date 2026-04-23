'use client';

import { useState, useEffect } from 'react';
import { IntroLoader } from '@/components/animations/IntroLoader';

const SESSION_KEY = 'wc_intro_shown';

/**
 * IntroGate — Renders IntroLoader only once per browser session.
 * Uses sessionStorage so it shows again on new tab/window.
 */
export function IntroGate({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (!alreadyShown) {
      setShowIntro(true);
    }
    setReady(true);
  }, []);

  function handleComplete() {
    sessionStorage.setItem(SESSION_KEY, '1');
    setShowIntro(false);
  }

  if (!ready) return null;

  return (
    <>
      {showIntro && <IntroLoader onComplete={handleComplete} />}
      <div
        style={{
          opacity: showIntro ? 0 : 1,
          transition: 'opacity 0.5s ease',
          pointerEvents: showIntro ? 'none' : 'auto',
        }}
      >
        {children}
      </div>
    </>
  );
}
