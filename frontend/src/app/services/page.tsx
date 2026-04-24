import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Webcraft Studio',
  description: 'Premium web design, development, strategy, and growth services from Webcraft Studio. Outcome-driven digital solutions for global brands.',
};

const SERVICES = [
  {
    number: '01',
    title: 'Web Design & UI/UX',
    price: 'From $2,500',
    outcomes: ['Conversion-optimized layouts', 'Premium motion design', 'Figma design system', 'Mobile-first, accessibility-ready'],
    desc: 'Interfaces that make visitors stop scrolling and start buying. Every screen designed with intent.',
  },
  {
    number: '02',
    title: 'Web Development',
    price: 'From $4,000',
    outcomes: ['Next.js / React builds', 'CMS integration', '95+ Lighthouse score', 'Production deployment'],
    desc: 'Clean, scalable code built for performance. Not just functional — fast, secure, and future-proof.',
  },
  {
    number: '03',
    title: 'Full Digital Experience',
    price: 'From $8,000',
    outcomes: ['Strategy → Design → Dev → Launch', 'Custom animations & interactions', 'SEO architecture', '3-month post-launch support'],
    desc: 'The complete package. Strategy through launch, with ongoing support built in from day one.',
  },
  {
    number: '04',
    title: 'CRO & Growth Retainer',
    price: 'From $1,500/mo',
    outcomes: ['Monthly A/B testing', 'Analytics reporting', 'Landing page optimization', 'Priority support'],
    desc: 'Keep compounding after launch. Monthly optimization to improve conversions over time.',
  },
];

export default function ServicesPage() {
  return (
    <div style={{ paddingTop: '8rem' }}>
      <div className="container">
        <div style={{ marginBottom: '5rem', maxWidth: '700px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ height: 1, width: 48, background: 'var(--color-accent)' }} />
            <span className="label">Our Services</span>
          </div>
          <h1 className="display-2">
            Everything you need.<br />
            <span className="text-gradient">Nothing you don&apos;t.</span>
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '5rem' }}>
          {SERVICES.map((s) => (
            <div key={s.number} className="card" style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: '2.5rem', alignItems: 'start' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--color-text-dim)', letterSpacing: '0.1em', paddingTop: '0.25rem' }}>{s.number}</span>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', fontWeight: 700, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{s.title}</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.7, maxWidth: '480px', marginBottom: '1.5rem' }}>{s.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {s.outcomes.map((o) => (
                    <li key={o} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      <span style={{ color: 'var(--color-accent)' }}>→</span> {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ textAlign: 'right', paddingTop: '0.25rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-gold)', whiteSpace: 'nowrap' }}>{s.price}</div>
                <a href="/contact" className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.6rem 1.25rem', fontSize: '0.8rem' }}>Get a Quote</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
