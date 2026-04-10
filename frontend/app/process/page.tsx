import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Our Process',
  description: 'Learn how Webcraft Studio takes your project from discovery to launch.',
};

const steps = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    description: 'We start with a deep dive into your business goals, target audience, and competitive landscape. This informs every decision that follows.',
    duration: '1-2 days',
  },
  {
    num: '02',
    title: 'Design & Prototyping',
    description: 'Our designers create high-fidelity mockups and interactive prototypes, iterating with your feedback until the design is perfect.',
    duration: '3-5 days',
  },
  {
    num: '03',
    title: 'Development',
    description: 'Our engineers build your project with clean, maintainable code using the latest technologies for performance and scalability.',
    duration: '1-3 weeks',
  },
  {
    num: '04',
    title: 'Testing & QA',
    description: 'Rigorous testing across devices, browsers, and performance benchmarks ensures your site works flawlessly for every user.',
    duration: '2-3 days',
  },
  {
    num: '05',
    title: 'Launch & Deploy',
    description: 'We handle the entire deployment process, DNS configuration, SSL setup, and post-launch monitoring.',
    duration: '1 day',
  },
  {
    num: '06',
    title: 'Support & Growth',
    description: 'Ongoing maintenance, performance optimization, and feature additions to keep your site evolving with your business.',
    duration: 'Ongoing',
  },
];

export default function ProcessPage() {
  return (
    <div className="pt-16">
      <div className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-4">
              How We Work
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              A Proven Process for{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Perfect Results
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Every project follows our battle-tested workflow designed for clarity, quality, and speed.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-0.5" />

            <div className="space-y-12">
              {steps.map((step, i) => (
                <div key={step.num} className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-cyan-500 border-2 border-gray-950 transform -translate-x-2 md:-translate-x-2 mt-6 z-10" />

                  <div className={`pl-20 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/20 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-cyan-400 font-mono font-bold text-sm">{step.num}</span>
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">{step.duration}</span>
                      </div>
                      <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/contact">
              <Button size="lg">Start Your Project</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
