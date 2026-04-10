import type { Metadata } from 'next';
import Testimonials from '@/components/sections/Testimonials';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Read what our clients say about working with Webcraft Studio.',
};

export default function TestimonialsPage() {
  return (
    <div className="pt-16" style={{ background: '#0a0e27', minHeight: '100vh' }}>
      <div className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #050818 0%, #0a0e27 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-5" style={{ border: '1px solid rgba(251,191,36,0.3)', background: 'rgba(251,191,36,0.08)', color: '#fbbf24' }}>
            Client Reviews
          </span>
          <h1 className="text-5xl font-bold text-white mb-5" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            Don&apos;t Just Take{' '}
            <span style={{ background: 'linear-gradient(135deg, #fbbf24, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Our Word
            </span>
          </h1>
          <p className="text-lg" style={{ color: '#64748b' }}>
            Real feedback from real clients who&apos;ve experienced the Webcraft difference.
          </p>
        </div>
      </div>
      <Testimonials />
      <div className="py-16 text-center" style={{ background: '#0a0e27' }}>
        <Link href="/contact">
          <Button size="lg" className="btn-glow-anim">Join Our Happy Clients</Button>
        </Link>
      </div>
    </div>
  );
}
