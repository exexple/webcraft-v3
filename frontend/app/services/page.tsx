import type { Metadata } from 'next';
import Services from '@/components/sections/Services';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our full range of web development and digital services.',
};

export default function ServicesPage() {
  return (
    <div style={{ background: '#0a0e27', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative py-28 text-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(0,212,255,0.12) 0%, transparent 70%)',
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
            Our Services
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Everything You Need to{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #64ff6b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Succeed Online
            </span>
          </h1>
          <p className="text-lg" style={{ color: '#b0b5c3' }}>
            From design to deployment, we handle every aspect of your digital presence.
          </p>
        </div>
      </div>

      <Services />

      {/* CTA */}
      <div className="py-16 text-center">
        <p className="text-lg mb-6" style={{ color: '#b0b5c3' }}>
          Not sure which service fits your needs?
        </p>
        <Link href="/contact">
          <Button size="lg">Discuss Your Project</Button>
        </Link>
      </div>
    </div>
  );
}
