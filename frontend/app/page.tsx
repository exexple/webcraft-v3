import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Stats from '@/components/sections/Stats';
import CaseStudies from '@/components/sections/CaseStudies';
import Testimonials from '@/components/sections/Testimonials';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <CaseStudies />
      <Testimonials />
      {/* CTA Section */}
      <section className="py-28 relative overflow-hidden" style={{ background: '#050818' }}>
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 60%)' }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl p-12 sm:p-16 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,212,255,0.15)' }}>
            {/* Top gradient border */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)' }} />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6" style={{ border: '1px solid rgba(100,255,107,0.3)', background: 'rgba(100,255,107,0.08)', color: '#64ff6b' }}>
              ✦ Ready to get started?
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
              Ready to Build Something{' '}
              <span style={{ background: 'linear-gradient(135deg, #00d4ff, #64ff6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Amazing?
              </span>
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: '#64748b' }}>
              Let&apos;s transform your vision into a high-performing digital experience that converts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="btn-glow-anim">Start Your Project</Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="outline" size="lg">View Our Work</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
