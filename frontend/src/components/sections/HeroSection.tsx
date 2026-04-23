'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HEADLINE = ['We Engineer', 'Digital', 'Perception.'];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger headline lines
      gsap.fromTo(
        '.hero-line',
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power4.out',
          delay: 0.2,
        }
      );

      // Fade in subtext + CTAs
      gsap.fromTo(
        ['.hero-sub', '.hero-ctas'],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.9,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="grid-bg"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '6rem',
      }}
    >
      {/* Radial gradient glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div style={{ y, opacity }} className="container">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <span style={{
            display: 'inline-block',
            width: 8, height: 8,
            borderRadius: '50%',
            background: 'var(--color-accent)',
            animation: 'pulse 2s ease infinite',
          }} />
          <span className="label">Global Digital Experience Agency</span>
        </motion.div>

        {/* Headline */}
        <h1 style={{ marginBottom: '2.5rem', maxWidth: '900px' }}>
          {HEADLINE.map((line, i) => (
            <div key={i} className="text-reveal-wrap" style={{ marginBottom: '0.1em' }}>
              <span
                className={`hero-line display-1 ${i === 2 ? 'text-gradient' : ''}`}
                style={{ display: 'block', opacity: 0 }}
              >
                {line}
              </span>
            </div>
          ))}
        </h1>

        {/* Subtext */}
        <p
          className="hero-sub body-lg"
          style={{
            maxWidth: '520px',
            marginBottom: '3rem',
            opacity: 0,
          }}
        >
          We design and build websites that don&apos;t just look good —
          they drive real business outcomes for brands across the US, UK, and Middle East.
        </p>

        {/* CTAs */}
        <div
          className="hero-ctas"
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            opacity: 0,
          }}
        >
          <Link href="/contact" className="btn btn-primary" data-cursor="Let's Talk">
            Start a Project
            <span style={{ fontSize: '1rem' }}>→</span>
          </Link>
          <Link href="/case-studies" className="btn btn-outline" data-cursor="View">
            See Our Work
          </Link>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span className="label" style={{ fontSize: '0.65rem' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, var(--color-accent), transparent)',
            }}
          />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}
