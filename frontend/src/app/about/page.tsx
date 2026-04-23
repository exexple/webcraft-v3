import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Webcraft Studio',
  description: 'Learn about Webcraft Studio — a global digital experience agency building premium websites for forward-thinking brands.',
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '8rem' }}>
      <div className="container">
        {/* Hero */}
        <div style={{ marginBottom: '6rem', maxWidth: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ height: 1, width: 48, background: 'var(--color-accent)' }} />
            <span className="label">About Us</span>
          </div>
          <h1 className="display-2" style={{ marginBottom: '2rem' }}>
            A studio obsessed with<br />
            <span className="text-gradient">digital craftsmanship.</span>
          </h1>
          <p className="body-lg" style={{ maxWidth: '600px' }}>
            Webcraft Studio was built on a single conviction: that a great website is not a cost center —
            it&apos;s the highest-leverage sales asset a business can own.
            We partner with ambitious founders and marketing teams to build digital experiences
            that convert, retain, and impress at every touchpoint.
          </p>
        </div>

        {/* Values */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '6rem' }}>
          {[
            { title: 'Quality Over Volume', desc: 'We take on fewer projects to give each one the attention it deserves. No factories. No templates.' },
            { title: 'Radical Transparency', desc: 'Weekly updates, shared Notion workspaces, and zero hidden costs. You always know what is happening and why.' },
            { title: 'Outcomes, Not Outputs', desc: 'We measure our work by your business results — not pixels delivered or hours billed.' },
          ].map((v) => (
            <div key={v.title} className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--color-text)' }}>{v.title}</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--color-text-muted)' }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '4rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <h2 className="heading-1" style={{ maxWidth: '400px' }}>Ready to work together?</h2>
          <a href="/contact" className="btn btn-primary">Start a Conversation →</a>
        </div>
      </div>
    </div>
  );
}
