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
      <section className="py-24 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-white/10 rounded-3xl p-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Ready to Build Something{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Amazing?
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
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
