import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case Studies — Webcraft Studio',
  description: 'Explore Webcraft Studio case studies — real problems, real solutions, real results.',
};

// In production, this fetches from CMS service
// For now, shows the placeholder state guiding user to admin panel
const PLACEHOLDER_STUDIES = [
  {
    id: '1',
    slug: 'placeholder-1',
    title: 'Your First Case Study',
    client: 'Client Name',
    industry: 'Industry',
    tags: ['Design', 'Development'],
    cover_image_url: null,
    result: 'Upload real results from Admin Panel',
    status: 'published',
  },
];

export default function CaseStudiesPage() {
  return (
    <div style={{ paddingTop: '8rem' }}>
      <div className="container">
        <div style={{ marginBottom: '5rem', maxWidth: '700px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ height: 1, width: 48, background: 'var(--color-accent)' }} />
            <span className="label">Our Work</span>
          </div>
          <h1 className="display-2">
            Stories of<br />
            <span className="text-gradient">transformation.</span>
          </h1>
        </div>

        {/* Admin hint */}
        <div style={{
          background: 'rgba(139,92,246,0.08)',
          border: '1px solid rgba(139,92,246,0.2)',
          borderRadius: '1rem',
          padding: '1.5rem 2rem',
          marginBottom: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <span style={{ fontSize: '1.25rem' }}>💡</span>
          <div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--color-accent)' }}>Admin Panel:</strong>{' '}
              Visit <Link href="/admin" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>/admin</Link> to upload your real case studies — no code needed. Add titles, descriptions, images, metrics, and publish with one click.
            </p>
          </div>
        </div>

        {/* Studies grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {PLACEHOLDER_STUDIES.map((study) => (
            <Link key={study.id} href={`/case-studies/${study.slug}`} style={{ textDecoration: 'none' }} data-cursor="View">
              <div className="card" style={{ overflow: 'hidden', cursor: 'none' }}>
                {/* Cover */}
                <div style={{
                  height: 220,
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(232,197,71,0.08))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '1px solid var(--color-border)',
                }}>
                  <span style={{ fontSize: '3rem', opacity: 0.3 }}>📁</span>
                </div>

                <div style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    {study.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{study.title}</h2>
                  <p className="label" style={{ marginBottom: '1rem' }}>{study.client} — {study.industry}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{study.result}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
