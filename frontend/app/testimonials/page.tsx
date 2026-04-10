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
    <div className="pt-16">
      <div className="py-24 bg-gray-950 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-sm font-medium mb-4">
            Client Reviews
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Don&apos;t Just Take{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Our Word
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Real feedback from real clients who&apos;ve experienced the Webcraft difference.
          </p>
        </div>
      </div>
      <Testimonials />
      <div className="py-16 bg-gray-950 text-center">
        <Link href="/contact">
          <Button size="lg">Join Our Happy Clients</Button>
        </Link>
      </div>
    </div>
  );
}
