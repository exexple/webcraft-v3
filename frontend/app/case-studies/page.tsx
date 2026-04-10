import type { Metadata } from 'next';
import CaseStudies from '@/components/sections/CaseStudies';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Explore our portfolio of successful web projects and client results.',
};

export default function CaseStudiesPage() {
  return (
    <div style={{ background: '#0a0e27', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative py-28 text-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(100,255,107,0.1) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              border: '1px solid rgba(100,255,107,0.3)',
              background: 'rgba(100,255,107,0.08)',
              color: '#64ff6b',
            }}
          >
            Our Portfolio
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Work That{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #64ff6b 0%, #00d4ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Speaks for Itself
            </span>
          </h1>
          <p className="text-lg" style={{ color: '#b0b5c3' }}>
            Explore our portfolio of successful projects and the measurable results we&apos;ve delivered.
          </p>
        </div>
      </div>

      <CaseStudies />

      {/* CTA */}
      <div className="py-16 text-center">
        <p className="text-lg mb-6" style={{ color: '#b0b5c3' }}>
          Interested in results like these for your business?
        </p>
        <Link href="/contact">
          <Button size="lg">Start Your Project</Button>
        </Link>
      </div>
    </div>
  );
}
