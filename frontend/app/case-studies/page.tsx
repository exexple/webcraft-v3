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
    <div className="pt-16" style={{ background: '#0a0e27', minHeight: '100vh' }}>
      <div className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #050818 0%, #0a0e27 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-5" style={{ border: '1px solid rgba(167,139,250,0.3)', background: 'rgba(167,139,250,0.08)', color: '#a78bfa' }}>
            Portfolio
          </span>
          <h1 className="text-5xl font-bold text-white mb-5" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            Our Work Speaks{' '}
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              for Itself
            </span>
          </h1>
          <p className="text-lg" style={{ color: '#64748b' }}>
            Real projects, real results. See how we&apos;ve helped brands transform their digital presence.
          </p>
        </div>
      </div>
      <CaseStudies />
      <div className="py-16 text-center" style={{ background: '#0a0e27' }}>
        <Link href="/contact">
          <Button size="lg" className="btn-glow-anim">Start Your Project</Button>
        </Link>
      </div>
    </div>
  );
}
