import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent pricing for web development and design services.',
};

const plans = [
  {
    name: 'Starter',
    price: '$2,500',
    description: 'Perfect for small businesses and startups.',
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
    accent: 'border-white/10',
    badge: '',
  },
  {
    name: 'Professional',
    price: '$6,500',
    description: 'For growing businesses that need more.',
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
    accent: 'border-cyan-500/50',
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale projects and ongoing partnerships.',
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
    accent: 'border-violet-500/30',
    badge: '',
  },
];

export default function PricingPage() {
  return (
    <div className="pt-16">
      <section className="py-section-spacious bg-gray-950">
        <Container size="lg">
          <div className="text-center mb-spacing-3xl">
            <h1 className="text-h2-mobile md:text-h2 font-poppins font-bold text-white mb-spacing-md">
              Simple, Transparent{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-body-lg text-gray-400 max-w-2xl mx-auto mt-spacing-lg">
              No hidden fees. No surprises. Just great work at fair prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-spacing-lg">
            {plans.map(plan => (
              <div
                key={plan.name}
                className={`relative bg-gray-900 border ${plan.accent} rounded-2xl p-spacing-2xl ${plan.popular ? 'shadow-xl shadow-cyan-500/10 scale-105' : ''} hover:border-white/20 transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-cyan-500 text-gray-950 text-xs font-bold px-4 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <h3 className="text-h4 font-bold text-white mb-spacing-md font-poppins">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-spacing-xl">{plan.description}</p>
                <div className="text-h2 font-extrabold text-cyan-400 mb-spacing-md font-poppins">{plan.price}</div>
                <ul className="space-y-spacing-md mb-spacing-xl">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center gap-spacing-md text-sm text-gray-400">
                      <Check size={16} className="text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
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

          <p className="text-center text-gray-500 text-sm mt-spacing-xl">
            All prices are starting points. Final pricing depends on project scope.{' '}
            <Link href="/contact" className="text-cyan-400 hover:underline">Get a custom quote →</Link>
          </p>
        </Container>
      </section>
    </div>
  );
}
