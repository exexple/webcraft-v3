'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "Add your first testimonial from the Admin Panel — no code needed.",
    name: "Your Client Name",
    title: "CEO",
    company: "Client Company",
    rating: 5,
  },
  {
    quote: "Testimonials build trust with premium clients. Add them easily from /admin.",
    name: "Another Client",
    title: "Founder",
    company: "Another Company",
    rating: 5,
  },
];

const METRICS = [
  { value: '0+', label: 'Projects Delivered' },
  { value: '0+', label: 'Happy Clients' },
  { value: '0+', label: 'Countries Served' },
  { value: '0+', label: 'Avg. Lighthouse Score' },
];

export function ProofSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="section" ref={ref}>
      <div className="container">
        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '6rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
            <div style={{ height: 1, width: 48, background: 'var(--color-accent)' }} />
            <span className="label">By The Numbers</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3rem' }}>
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.7 }}
              >
                <div className="stat-number">{m.value}</div>
                <div className="label" style={{ marginTop: '0.75rem', color: 'var(--color-text-muted)' }}>{m.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
            <div style={{ height: 1, width: 48, background: 'var(--color-accent)' }} />
            <span className="label">Client Voices</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 + 0.5, duration: 0.7 }}
                style={{ padding: '2.5rem' }}
              >
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} style={{ color: 'var(--color-gold)', fontSize: '0.875rem' }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text)', fontStyle: 'italic', marginBottom: '2rem' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-accent)' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t.title}, {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
