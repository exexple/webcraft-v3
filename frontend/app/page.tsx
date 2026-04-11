import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Stats from '@/components/sections/Stats';
import CaseStudies from '@/components/sections/CaseStudies';
import Testimonials from '@/components/sections/Testimonials';
import TrustSignals from '@/components/sections/TrustSignals';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <TrustSignals />
      <Services />
      <CaseStudies />
      <Testimonials />
      {/* CTA Section */}
      <section className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.04)_0%,transparent_70%)]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-white/10 rounded-3xl p-12 relative overflow-hidden">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Ready to Build Something{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                  Amazing?
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-4 max-w-xl mx-auto">
                Let&apos;s transform your vision into a high-performing digital experience.
              </p>
              <p className="text-cyan-400/70 text-sm mb-8 font-medium">
                ⚡ Limited spots available this month — Book your call today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="glow-cyan">Start Your Project</Button>
                </Link>
                <Link href="/case-studies">
                  <Button variant="outline" size="lg">View Our Work</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
