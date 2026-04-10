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
    price: '$2,500',
    description: 'Perfect for small businesses and startups getting started.',
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
    accentColor: '#b0b5c3',
  },
  {
    name: 'Growth',
    price: '$6,500',
    description: 'For growing businesses that need more power and features.',
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
    accentColor: '#00d4ff',
  },
  {
    name: 'Premium',
    price: 'Custom',
    description: 'For enterprise-level projects and ongoing partnerships.',
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
    accentColor: '#64ff6b',
  },
];

export default function PricingPage() {
  return (
    <div style={{ background: '#0a0e27', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative py-28 text-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(0,212,255,0.1) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              border: '1px solid rgba(0,212,255,0.3)',
              background: 'rgba(0,212,255,0.08)',
              color: '#00d4ff',
            }}
          >
            <Zap size={14} />
            Pricing
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Simple,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #64ff6b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Transparent
            </span>{' '}
            Pricing
          </h1>
          <p className="text-lg" style={{ color: '#b0b5c3' }}>
            No hidden fees. No surprises. Just great work at fair prices.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map(plan => (
            <div
              key={plan.name}
              className="relative rounded-2xl p-8 transition-all duration-300"
              style={{
                background: plan.popular
                  ? 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(0,102,255,0.08) 100%)'
                  : 'rgba(26, 31, 58, 0.6)',
                border: plan.popular
                  ? '1px solid rgba(0,212,255,0.4)'
                  : `1px solid rgba(26,31,58,1)`,
                boxShadow: plan.popular ? '0 0 40px rgba(0,212,255,0.15)' : 'none',
                transform: plan.popular ? 'scale(1.03)' : 'scale(1)',
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span
                    className="text-xs font-bold px-4 py-1.5 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)',
                      color: '#0a0e27',
                    }}
                  >
                    ✦ Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
              <p className="text-sm mb-5" style={{ color: '#b0b5c3' }}>{plan.description}</p>
              <div
                className="text-4xl font-extrabold mb-8"
                style={{ color: plan.accentColor }}
              >
                {plan.price}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-sm" style={{ color: '#b0b5c3' }}>
                    <Check size={15} style={{ color: '#64ff6b', flexShrink: 0 }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="block">
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ / Note */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: 'rgba(26, 31, 58, 0.4)',
            border: '1px solid rgba(26, 31, 58, 0.8)',
          }}
        >
          <h3 className="text-white font-bold text-xl mb-3">Need something custom?</h3>
          <p className="text-sm mb-4" style={{ color: '#b0b5c3' }}>
            All prices are starting points. Final pricing depends on project scope and complexity.
          </p>
          <Link href="/contact" style={{ color: '#00d4ff' }} className="text-sm font-medium hover:underline">
            Get a custom quote →
          </Link>
        </div>
      </div>
    </div>
  );
}
