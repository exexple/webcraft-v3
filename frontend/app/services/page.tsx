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
    <div className="pt-16" style={{ background: '#0a0e27', minHeight: '100vh' }}>
      <div className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #050818 0%, #0a0e27 100%)' }}>
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-5" style={{ border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,212,255,0.08)', color: '#00d4ff' }}>
            Our Services
          </span>
          <h1 className="text-5xl font-bold text-white mb-5" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            Everything You Need to{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #64ff6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Succeed Online
            </span>
          </h1>
          <p className="text-lg" style={{ color: '#64748b' }}>
            From design to deployment, we handle every aspect of your digital presence.
          </p>
        </div>
      </div>
      <Services />
      <div className="py-16 text-center" style={{ background: '#0a0e27' }}>
        <Link href="/contact">
          <Button size="lg" className="btn-glow-anim">Discuss Your Project</Button>
        </Link>
      </div>
    </div>
  );
}
