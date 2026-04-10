import type { Metadata } from 'next';
import Testimonials from '@/components/sections/Testimonials';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Read what our clients say about working with Webcraft Studio.',
};

export default function TestimonialsPage() {
  return (
    <div style={{ background: '#0a0e27', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative py-28 text-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(0,212,255,0.1) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              border: '1px solid rgba(0,212,255,0.3)',
              background: 'rgba(0,212,255,0.08)',
              color: '#00d4ff',
            }}
          >
            <Star size={14} />
            Client Reviews
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Don&apos;t Just Take{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #64ff6b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Our Word
            </span>
          </h1>
          <p className="text-lg" style={{ color: '#b0b5c3' }}>
            Real feedback from real clients who&apos;ve experienced the Webcraft difference.
          </p>
          {/* Star rating display */}
          <div className="flex items-center justify-center gap-1 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} fill="#00d4ff" style={{ color: '#00d4ff' }} />
            ))}
            <span className="ml-2 text-sm font-semibold text-white">5.0</span>
            <span className="text-sm" style={{ color: '#b0b5c3' }}> · 98% Satisfaction</span>
          </div>
        </div>
      </div>

      <Testimonials />

      {/* CTA */}
      <div className="py-16 text-center">
        <p className="text-lg mb-6" style={{ color: '#b0b5c3' }}>
          Ready to join our growing list of happy clients?
        </p>
        <Link href="/contact">
          <Button size="lg">Join Our Happy Clients</Button>
        </Link>
      </div>
    </div>
  );
}
