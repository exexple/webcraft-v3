'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

export function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="section" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '2rem',
          padding: 'clamp(3rem, 6vw, 6rem)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Top accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', top: 0, left: '20%', right: '20%',
              height: '1px',
              background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="label" style={{ display: 'block', marginBottom: '1.5rem' }}>Ready to Start?</span>
            <h2 className="display-2" style={{ marginBottom: '1.5rem' }}>
              Let&apos;s build something<br />
              <span className="text-gradient">unforgettable.</span>
            </h2>
            <p className="body-lg" style={{ maxWidth: '480px', margin: '0 auto 3rem' }}>
              Partner with a team that treats your business goals as seriously as the aesthetics.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary" data-cursor="Let's Talk" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
                Start a Project →
              </Link>
              <a
                href="https://cal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                data-cursor="Open"
                style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}
              >
                Book a Call
              </a>
            </div>

            {/* Trust signals */}
            <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}>
              {['No contracts', 'Response within 24h', 'Free discovery call'].map((s) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{s}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
