'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  const words = "We don't build websites. We engineer perception.".split(' ');

  return (
    <section className="section" ref={ref} style={{ overflow: 'hidden' }}>
      <div className="container">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
        >
          <div style={{ height: 1, width: 48, background: 'var(--color-accent)' }} />
          <span className="label">Our Philosophy</span>
        </motion.div>

        {/* Word-by-word reveal */}
        <h2
          className="display-2"
          style={{
            maxWidth: '900px',
            lineHeight: 1.15,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.3em',
          }}
          aria-label="We don't build websites. We engineer perception."
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.15, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.05,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                display: 'inline-block',
                color: i >= 8 ? 'var(--color-accent)' : 'var(--color-text)',
              }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="body-lg"
          style={{ maxWidth: '560px', marginTop: '3rem' }}
        >
          Every pixel, animation, and interaction is intentional.
          We craft digital environments that position brands as leaders —
          making visitors feel something before they read a single word.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="divider"
          style={{ marginTop: '6rem', transformOrigin: 'left' }}
        />
      </div>
    </section>
  );
}
