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
    <div className="pt-16">
      <div className="py-24 bg-gray-950 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
            Our Services
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Succeed Online
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            From design to deployment, we handle every aspect of your digital presence.
          </p>
        </div>
      </div>
      <Services />
      <div className="py-16 bg-gray-950 text-center">
        <Link href="/contact">
          <Button size="lg">Discuss Your Project</Button>
        </Link>
      </div>
    </div>
  );
}
