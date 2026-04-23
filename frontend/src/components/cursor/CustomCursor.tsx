'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor — Dot + ring follower system
 * - Dot: fast, stays at cursor
 * - Ring: lags behind with smooth lerp
 * - Expands on buttons/links
 * - Shows "View" / "Open" labels
 * - Hidden on mobile (cursor: auto restored in CSS)
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    // Move dot instantly
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    // Lerp ring for lag effect
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
    let raf: number;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      gsap.set(ring, { x: ringX, y: ringY });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // Hover states
    const onMouseEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const cursorLabel = el.dataset.cursor ?? '';
      const isButton = el.tagName === 'BUTTON' || el.tagName === 'A' || !!cursorLabel;

      if (isButton) {
        gsap.to(ring, { scale: 2.5, borderColor: 'var(--color-accent)', duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { scale: 0.3, duration: 0.2 });
        if (cursorLabel) {
          label.textContent = cursorLabel;
          gsap.to(label, { opacity: 1, duration: 0.2 });
        }
      }
    };

    const onMouseLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(255,255,255,0.4)', duration: 0.3, ease: 'power2.out' });
      gsap.to(dot, { scale: 1, duration: 0.2 });
      gsap.to(label, { opacity: 0, duration: 0.15 });
    };

    // Attach to interactive elements
    const selector = 'a, button, [data-cursor]';
    const interactives = document.querySelectorAll<HTMLElement>(selector);
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    document.addEventListener('mousemove', onMouseMove);

    // Hide cursor on mouse leave window
    document.addEventListener('mouseleave', () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 }));
    document.addEventListener('mouseenter', () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 }));

    // Observe DOM mutations to catch dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: '50%',
          background: 'var(--color-accent)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99997,
          mixBlendMode: 'normal',
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.4)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99996,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontSize: '0.5rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: 'var(--color-text)',
            opacity: 0,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        />
      </div>
    </>
  );
}
