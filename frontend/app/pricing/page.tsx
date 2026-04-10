import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Check, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent pricing for web development and design services.',
};

const plans = [
  {
    name: 'Starter',
    price: '$2,999',
    description: 'Perfect for small businesses and startups looking to establish their online presence.',
    features: [
      '5-page responsive website',
      'Mobile-first design',
      'Contact form integration',
      'Basic SEO setup',
      '1 month support',
      'Google Analytics',
    ],
    cta: 'Get Started',
    popular: false,
    accentColor: '#00d4ff',
    borderColor: 'rgba(0,212,255,0.2)',
    glowColor: 'rgba(0,212,255,0.08)',
  },
  {
    name: 'Growth',
    price: '$7,999',
    description: 'For growing businesses that need a powerful, conversion-focused digital presence.',
    features: [
      '10-page custom website',
      'Custom UI/UX design',
      'CMS integration',
      'Advanced SEO & performance',
      '3 months support',
      'Analytics dashboard',
      'E-commerce ready',
      'Speed optimization',
    ],
    cta: 'Most Popular',
    popular: true,
    accentColor: '#64ff6b',
    borderColor: 'rgba(100,255,107,0.3)',
    glowColor: 'rgba(100,255,107,0.06)',
  },
  {
    name: 'Premium',
    price: 'Custom',
    description: 'For large-scale projects and ongoing digital partnerships with dedicated support.',
    features: [
      'Unlimited pages',
      'Custom web application',
      'API integrations',
      'Dedicated project manager',
      '12 months support',
      'Priority response',
      'Performance SLA',
      'Custom analytics',
    ],
    cta: 'Contact Us',
    popular: false,
    accentColor: '#a78bfa',
    borderColor: 'rgba(167,139,250,0.2)',
    glowColor: 'rgba(167,139,250,0.06)',
  },
];

export default function PricingPage() {
  return (
    <div className="pt-16" style={{ background: '#0a0e27', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #050818 0%, #0a0e27 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-5" style={{ border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,212,255,0.08)', color: '#00d4ff' }}>
            Pricing
          </span>
          <h1 className="text-5xl font-bold text-white mb-5" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            Simple,{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #64ff6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Transparent
            </span>{' '}
            Pricing
          </h1>
          <p className="text-lg" style={{ color: '#64748b' }}>
            No hidden fees. No surprises. Just great work at fair prices.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl p-8 transition-all duration-300 overflow-hidden"
              style={{
                background: plan.popular ? `${plan.glowColor}` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${plan.borderColor}`,
                transform: plan.popular ? 'scale(1.03)' : undefined,
                boxShadow: plan.popular ? `0 20px 60px ${plan.glowColor}, 0 0 0 1px ${plan.borderColor}` : undefined,
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-px left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${plan.accentColor}, transparent)` }} />
              )}
              {plan.popular && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${plan.accentColor}20`, color: plan.accentColor, border: `1px solid ${plan.accentColor}40` }}>
                    <Zap size={10} />
                    Recommended
                  </span>
                </div>
              )}

              <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>{plan.name}</h3>
              <p className="text-sm mb-5" style={{ color: '#64748b' }}>{plan.description}</p>

              <div className="mb-7">
                <span className="text-4xl font-extrabold text-white" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-sm ml-1" style={{ color: '#64748b' }}>/ project</span>}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-sm" style={{ color: '#94a3b8' }}>
                    <Check size={15} style={{ color: plan.accentColor, flexShrink: 0 }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/contact">
                <Button
                  variant={plan.popular ? 'popular' : 'outline'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm mt-10" style={{ color: '#475569' }}>
          All prices are starting points. Final pricing depends on project scope.{' '}
          <Link href="/contact" style={{ color: '#00d4ff' }} className="hover:underline">Get a custom quote →</Link>
        </p>
      </div>
    </div>
  );
}
