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
    accent: '#00d4ff',
    icon: '🔍',
  },
  {
    num: '02',
    title: 'Design & Prototyping',
    description: 'Our designers create high-fidelity mockups and interactive prototypes, iterating with your feedback until the design is perfect.',
    duration: '3-5 days',
    accent: '#a78bfa',
    icon: '🎨',
  },
  {
    num: '03',
    title: 'Development',
    description: 'Our engineers build your project with clean, maintainable code using the latest technologies for performance and scalability.',
    duration: '1-3 weeks',
    accent: '#64ff6b',
    icon: '⚡',
  },
  {
    num: '04',
    title: 'Testing & QA',
    description: 'Rigorous testing across devices, browsers, and performance benchmarks ensures your site works flawlessly for every user.',
    duration: '2-3 days',
    accent: '#fbbf24',
    icon: '🧪',
  },
  {
    num: '05',
    title: 'Launch & Deploy',
    description: 'We handle the entire deployment process, DNS configuration, SSL setup, and post-launch monitoring to ensure a smooth rollout.',
    duration: '1 day',
    accent: '#f472b6',
    icon: '🚀',
  },
  {
    num: '06',
    title: 'Support & Growth',
    description: 'Ongoing maintenance, performance optimization, and feature additions to keep your site evolving with your business.',
    duration: 'Ongoing',
    accent: '#34d399',
    icon: '📈',
  },
];

export default function ProcessPage() {
  return (
    <div className="pt-16" style={{ background: '#0a0e27', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #050818 0%, #0a0e27 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(100,255,107,0.06) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-5" style={{ border: '1px solid rgba(100,255,107,0.3)', background: 'rgba(100,255,107,0.08)', color: '#64ff6b' }}>
            How We Work
          </span>
          <h1 className="text-5xl font-bold text-white mb-5" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            A Proven Process for{' '}
            <span style={{ background: 'linear-gradient(135deg, #64ff6b, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Perfect Results
            </span>
          </h1>
          <p className="text-lg" style={{ color: '#64748b' }}>
            Every project follows our battle-tested workflow designed for clarity, quality, and speed.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${step.accent}25`,
              }}
            >
              {/* Step number background */}
              <div className="absolute top-4 right-4 text-5xl font-black opacity-[0.04]" style={{ fontFamily: 'Poppins, sans-serif', color: step.accent }}>
                {step.num}
              </div>

              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: `${step.accent}15`, border: `1px solid ${step.accent}30` }}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono" style={{ color: step.accent }}>{step.num}</span>
                    <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: `${step.accent}15`, color: step.accent }}>{step.duration}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/contact">
            <Button size="lg" className="btn-glow-anim">Start Your Project</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
