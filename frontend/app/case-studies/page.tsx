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
    <div className="pt-16">
      <div className="py-24 bg-gray-950 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">
            Portfolio
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Our Work Speaks{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              for Itself
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Real projects, real results. See how we&apos;ve helped brands transform their digital presence.
          </p>
        </div>
      </div>
      <CaseStudies />
      <div className="py-16 bg-gray-950 text-center">
        <Link href="/contact">
          <Button size="lg">Start Your Project</Button>
        </Link>
      </div>
    </div>
  );
}
