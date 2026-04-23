'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

/**
 * IntroLoader — Cinematic entry animation
 * - Runs once per session (localStorage gate)
 * - "webcraft studio" text animates in letter by letter
 * - Screen splits open with clip-path (top/bottom panels)
 * - Reveals homepage beneath
 * - Skip button for impatient visitors
 */
export function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<'text' | 'split' | 'done'>('text');
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const letters = 'webcraft studio'.split('');

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setPhase('split');
        splitReveal();
      },
    });

    // Stagger letter reveal
    tl.fromTo(
      '.intro-letter',
      { y: '120%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power4.out',
        delay: 0.3,
      }
    );

    // Hold on text briefly
    tl.to('.intro-letter', { opacity: 1, duration: 0.6 });
  }, []);

  function splitReveal() {
    const tl = gsap.timeline({
      onComplete: () => {
        setPhase('done');
        setVisible(false);
        onComplete();
      },
    });

    // Fade out text
    tl.to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
    });

    // Split panels apart
    tl.to(
      topRef.current,
      {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
      },
      '-=0.1'
    );

    tl.to(
      bottomRef.current,
      {
        yPercent: 100,
        duration: 1,
        ease: 'power4.inOut',
      },
      '<'
    );
  }

  function handleSkip() {
    gsap.killTweensOf(['.intro-letter', topRef.current, bottomRef.current, textRef.current]);

    gsap.timeline({
      onComplete: () => {
        setPhase('done');
        setVisible(false);
        onComplete();
      },
    })
      .to([topRef.current, bottomRef.current], {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
  }

  if (!visible) return null;

  return (
    <div className="intro-loader" style={{ position: 'fixed', inset: 0, zIndex: 99999 }}>
      {/* Top panel */}
      <div
        ref={topRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '51%',
          background: 'var(--color-bg)',
          zIndex: 2,
        }}
      />

      {/* Bottom panel */}
      <div
        ref={bottomRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '51%',
          background: 'var(--color-bg)',
          zIndex: 2,
        }}
      />

      {/* Center text */}
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          zIndex: 3,
          gap: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            overflow: 'hidden',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--color-text)',
          }}
        >
          {letters.map((letter, i) => (
            <span
              key={i}
              className="intro-letter"
              style={{
                display: 'inline-block',
                opacity: 0,
                color: letter === ' ' ? 'transparent' : undefined,
                marginRight: letter === ' ' ? '0.5em' : undefined,
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '1px',
            width: '60px',
            background: 'var(--color-accent)',
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={handleSkip}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '2.5rem',
          zIndex: 4,
          background: 'transparent',
          border: '1px solid var(--color-border-hover)',
          color: 'var(--color-text-muted)',
          padding: '0.5rem 1.25rem',
          borderRadius: '999px',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        Skip
      </motion.button>
    </div>
  );
}
