import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Search, Lightbulb, Palette, Code2, Rocket, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Process',
  description: 'Learn how Webcraft Studio takes your project from discovery to launch.',
};

const steps = [
  { num: '01', icon: Search, title: 'Discovery & Strategy', description: 'We start with a deep dive into your business goals, target audience, and competitive landscape. This informs every decision that follows.', duration: '1-2 days', color: '#00d4ff' },
  { num: '02', icon: Lightbulb, title: 'Design & Prototyping', description: 'Our designers create high-fidelity mockups and interactive prototypes, iterating with your feedback until the design is perfect.', duration: '3-5 days', color: '#64ff6b' },
  { num: '03', icon: Palette, title: 'UI/UX Refinement', description: 'We refine every interaction, animation, and visual detail to create a seamless experience that delights your users.', duration: '2-3 days', color: '#00d4ff' },
  { num: '04', icon: Code2, title: 'Development', description: 'Our engineers build your project with clean, maintainable code using the latest technologies for performance and scalability.', duration: '1-3 weeks', color: '#64ff6b' },
  { num: '05', icon: Rocket, title: 'Launch & Deploy', description: 'We handle the entire deployment process, DNS configuration, SSL setup, and post-launch monitoring to ensure a smooth go-live.', duration: '1-2 days', color: '#00d4ff' },
  { num: '06', icon: HeartHandshake, title: 'Support & Growth', description: 'Ongoing maintenance, performance optimization, and feature additions to keep your site evolving with your business.', duration: 'Ongoing', color: '#64ff6b' },
];

export default function ProcessPage() {
  return (
    <div style={{ background: '#0a0e27', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative py-28 text-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(100,255,107,0.1) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto px-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ border: '1px solid rgba(100,255,107,0.3)', background: 'rgba(100,255,107,0.08)', color: '#64ff6b' }}
          >
            How We Work
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            A Proven Process for{' '}
            <span style={{ background: 'linear-gradient(135deg, #64ff6b 0%, #00d4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Perfect Results
            </span>
          </h1>
          <p className="text-lg" style={{ color: '#b0b5c3' }}>
            Every project follows our battle-tested workflow designed for clarity, quality, and speed.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Process Steps */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px transform -translate-x-px"
            style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.4), rgba(100,255,107,0.4))' }}
          />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`relative flex flex-col md:flex-row gap-8 items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div
                  className="hidden md:flex absolute left-1/2 w-10 h-10 rounded-full items-center justify-center transform -translate-x-5 z-10 font-mono font-bold text-sm"
                  style={{ background: '#0a0e27', border: `2px solid ${step.color}`, color: step.color, top: '24px' }}
                >
                  {step.num}
                </div>

                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div
                    className="p-6 rounded-2xl"
                    style={{ background: 'rgba(26, 31, 58, 0.6)', border: `1px solid ${step.color}20` }}
                  >
                    <div className={`flex items-center gap-3 mb-3 ${i % 2 !== 0 ? '' : 'md:justify-end'}`}>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                      >
                        <step.icon size={18} style={{ color: step.color }} />
                      </div>
                      <span
                        className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}
                      >
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#b0b5c3' }}>{step.description}</p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <p className="text-lg mb-6" style={{ color: '#b0b5c3' }}>Ready to start your project?</p>
          <Link href="/contact">
            <Button size="lg">Start Your Project</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
