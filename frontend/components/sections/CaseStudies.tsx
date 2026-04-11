'use client';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Users, DollarSign } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { staggerScrollVariant, slideUpOnScrollVariant } from '@/lib/animations';

const caseStudies = [
  {
    title: 'TechFlow SaaS',
    category: 'Web App',
    description: 'Built a full-featured SaaS dashboard with real-time analytics, resulting in 340% increase in user engagement.',
    metrics: [
      { icon: TrendingUp, label: 'Engagement', value: '+340%', color: 'text-cyan-400' },
      { icon: Clock, label: 'Load Time', value: '0.8s', color: 'text-green-400' },
    ],
  },
  {
    title: 'Luxe Commerce',
    category: 'E-commerce',
    description: 'Redesigned a luxury e-commerce platform with advanced filtering, resulting in 215% increase in conversion rate.',
    metrics: [
      { icon: TrendingUp, label: 'Conversion', value: '+215%', color: 'text-violet-400' },
      { icon: DollarSign, label: 'Revenue', value: '+$180k', color: 'text-green-400' },
    ],
  },
  {
    title: 'FinanceHub',
    category: 'Fintech',
    description: 'Developed a secure financial dashboard with complex data visualizations for 50,000+ active users.',
    metrics: [
      { icon: Users, label: 'Active Users', value: '50k+', color: 'text-green-400' },
      { icon: TrendingUp, label: 'Uptime', value: '99.9%', color: 'text-cyan-400' },
    ],
  },
];

export default function CaseStudies() {
  return (
    <section className="py-section-spacious bg-gray-900/50">
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-spacing-3xl"
        >
          <h2 className="text-h2-mobile md:text-h2 font-poppins font-bold tracking-tight text-white mb-spacing-md">
            Our Work Speaks for{' '}
            <span className="text-cyan-400">Itself</span>
          </h2>
          <p className="text-body-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mt-spacing-lg">
            See how we&apos;ve helped leading brands achieve their goals.
          </p>
        </motion.div>

        <motion.div
          variants={staggerScrollVariant}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          className="space-y-spacing-2xl"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.title}
              variants={slideUpOnScrollVariant}
              className="bg-gray-900 border border-white/10 rounded-2xl p-spacing-2xl hover:border-white/20 transition-all duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-spacing-2xl items-center">
                {/* Content */}
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold text-cyan-400 mb-spacing-md">
                    {study.category}
                  </p>
                  <h3 className="text-h3-mobile md:text-h3 font-poppins font-bold text-white mb-spacing-lg">
                    {study.title}
                  </h3>
                  <p className="text-body-base text-gray-400 leading-relaxed mb-spacing-xl">
                    {study.description}
                  </p>
                  <div className="grid grid-cols-2 gap-spacing-lg">
                    {study.metrics.map((metric) => (
                      <div key={metric.label}>
                        <p className={`text-h4 font-bold font-poppins ${metric.color}`}>{metric.value}</p>
                        <p className="text-body-sm text-gray-400">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Image placeholder */}
                <div className="bg-gray-800 rounded-xl h-64 md:h-80 flex items-center justify-center">
                  <p className="text-gray-600 text-sm">Project Preview</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-spacing-3xl"
        >
          <a href="/case-studies" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            View all case studies →
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
