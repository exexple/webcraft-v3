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
      <section className="py-24" style={{ background: '#0a0e27' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="rounded-3xl p-12"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(100,255,107,0.08) 100%)',
              border: '1px solid rgba(0,212,255,0.15)',
              boxShadow: '0 20px 60px rgba(0, 212, 255, 0.1)',
            }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Ready to Build Something{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #64ff6b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Amazing?
              </span>
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#b0b5c3' }}>
              Let&apos;s transform your vision into a high-performing digital experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Start Your Project</Button>
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
