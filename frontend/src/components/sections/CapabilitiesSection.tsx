'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const CAPABILITIES = [
  {
    number: '01',
    title: 'Strategy',
    description: 'Brand positioning, audience research, conversion architecture, and digital roadmaps that align business goals with user needs.',
    bullets: ['Brand Strategy', 'Conversion Architecture', 'Competitive Analysis', 'Digital Roadmapping'],
  },
  {
    number: '02',
    title: 'Design',
    description: "UI/UX systems that feel premium, intentional, and alive. Every interaction earns the user's trust before they consciously notice.",
    bullets: ['UI/UX Systems', 'Motion Design', 'Design Systems', 'Prototyping'],
  },
  {
    number: '03',
    title: 'Development',
    description: 'Production-ready code with Next.js, React, and modern backends. Fast, accessible, SEO-optimized, and built to scale globally.',
    bullets: ['Next.js / React', 'Backend APIs', 'Performance Optimization', 'SEO Architecture'],
  },
  {
    number: '04',
    title: 'Growth',
    description: 'Post-launch analytics, A/B testing, CRO strategies, and ongoing optimization to compound results over time.',
    bullets: ['CRO / A/B Testing', 'Analytics Setup', 'SEO Campaigns', 'Performance Audits'],
  },
];

export function CapabilitiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ height: 1, width: 48, background: 'var(--color-accent)' }} />
            <span className="label">What We Do</span>
          </div>
          <h2 className="display-3" style={{ maxWidth: '600px' }}>
            Four pillars.<br />
            <span className="text-gradient">Infinite outcomes.</span>
          </h2>
        </motion.div>

        <div style={{ borderTop: '1px solid var(--color-border)' }}>
          {CAPABILITIES.map((cap, i) => (
            <motion.div key={cap.number} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.1 + 0.3, duration: 0.7 }}>
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                style={{ width: '100%', background: 'none', border: 'none', borderBottom: '1px solid var(--color-border)', padding: '2rem 0', cursor: 'none', display: 'grid', gridTemplateColumns: '60px 1fr 40px', alignItems: 'center', gap: '2rem', textAlign: 'left', color: 'var(--color-text)' }}
                data-cursor=""
              >
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: activeIndex === i ? 'var(--color-accent)' : 'var(--color-text-dim)', letterSpacing: '0.1em', transition: 'color 0.3s' }}>{cap.number}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.025em', color: activeIndex === i ? 'var(--color-accent)' : 'var(--color-text)', transition: 'color 0.3s' }}>{cap.title}</span>
                <span style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', fontWeight: 300, transition: 'transform 0.3s ease', transform: activeIndex === i ? 'rotate(45deg)' : 'none', display: 'flex', justifyContent: 'center' }}>+</span>
              </button>

              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', padding: '2rem 0 3rem 4.5rem' }}>
                      <p className="body-lg">{cap.description}</p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {cap.bullets.map((b) => (
                          <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            <span style={{ color: 'var(--color-accent)', fontSize: '0.5rem' }}>◆</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
