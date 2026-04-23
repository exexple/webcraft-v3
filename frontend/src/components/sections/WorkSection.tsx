'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

// Placeholder case studies — replace with CMS data later
const PLACEHOLDER_WORK = [
  {
    id: '1',
    number: '01',
    title: 'Placeholder Project',
    client: 'Your First Client',
    industry: 'SaaS',
    tags: ['Strategy', 'Design', 'Development'],
    description: 'This slot is ready for your first case study. Upload it from the Admin Panel.',
    result: 'Results will appear here.',
    color: '#8B5CF6',
  },
  {
    id: '2',
    number: '02',
    title: 'Second Project',
    client: 'Your Second Client',
    industry: 'E-Commerce',
    tags: ['Branding', 'UI/UX', 'Development'],
    description: 'A second placeholder ready for your real case study content.',
    result: 'Results will appear here.',
    color: '#E8C547',
  },
  {
    id: '3',
    number: '03',
    title: 'Third Project',
    client: 'Your Third Client',
    industry: 'Fintech',
    tags: ['Strategy', 'Design'],
    description: 'Add your case study from the admin panel without touching any code.',
    result: 'Results will appear here.',
    color: '#A78BFA',
  },
];

export function WorkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="section" ref={ref}>
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '5rem',
          flexWrap: 'wrap',
          gap: '2rem',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ height: 1, width: 48, background: 'var(--color-accent)' }} />
              <span className="label">Featured Work</span>
            </div>
            <h2 className="display-3">
              Projects that<br />
              <span className="text-gradient">move the needle.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Link href="/case-studies" className="btn btn-outline" data-cursor="View All">
              View All Work →
            </Link>
          </motion.div>
        </div>

        {/* Work list — vertical stacked with large typography */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {PLACEHOLDER_WORK.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/case-studies/${item.id}`}
                style={{ textDecoration: 'none' }}
                data-cursor="View"
              >
                <div
                  style={{
                    borderTop: '1px solid var(--color-border)',
                    padding: '2.5rem 0',
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr auto',
                    alignItems: 'center',
                    gap: '3rem',
                    transition: 'all 0.3s ease',
                    cursor: 'none',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.paddingLeft = '1rem';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.paddingLeft = '0';
                  }}
                >
                  {/* Number */}
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.8rem',
                    color: 'var(--color-text-dim)',
                    letterSpacing: '0.05em',
                  }}>
                    {item.number}
                  </span>

                  {/* Content */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '0.5rem' }}>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                        fontWeight: 700,
                        color: 'var(--color-text)',
                        letterSpacing: '-0.02em',
                      }}>
                        {item.title}
                      </h3>
                      <span style={{
                        display: 'inline-block',
                        width: 8, height: 8,
                        borderRadius: '50%',
                        background: item.color,
                      }} />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span className="label" style={{ color: 'var(--color-text-dim)' }}>{item.client} — {item.industry}</span>
                    </div>
                  </div>

                  {/* Tags + Arrow */}
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                    <span style={{ marginLeft: '0.5rem', fontSize: '1.25rem', color: 'var(--color-text-muted)' }}>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
