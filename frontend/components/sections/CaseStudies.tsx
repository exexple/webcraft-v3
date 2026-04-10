'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const caseStudies = [
  {
    title: 'TechFlow SaaS',
    category: 'Web App',
    description: 'Built a full-featured SaaS dashboard with real-time analytics, resulting in 340% increase in user engagement.',
    stats: [
      { label: 'Engagement', value: '+340%' },
      { label: 'Load Time', value: '0.8s' },
    ],
    gradient: 'from-cyan-500/20 to-violet-500/20',
    border: 'border-cyan-500/20',
  },
  {
    title: 'Luxe Commerce',
    category: 'E-commerce',
    description: 'Redesigned a luxury e-commerce platform with advanced filtering, resulting in 215% increase in conversion rate.',
    stats: [
      { label: 'Conversion', value: '+215%' },
      { label: 'Revenue', value: '+$180k' },
    ],
    gradient: 'from-violet-500/20 to-pink-500/20',
    border: 'border-violet-500/20',
  },
  {
    title: 'FinanceHub',
    category: 'Fintech',
    description: 'Developed a secure financial dashboard with complex data visualizations for 50,000+ active users.',
    stats: [
      { label: 'Users', value: '50k+' },
      { label: 'Uptime', value: '99.9%' },
    ],
    gradient: 'from-green-500/20 to-cyan-500/20',
    border: 'border-green-500/20',
  },
];

export default function CaseStudies() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">
            Our Work
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Results That{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Speak Volumes
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Every project is an opportunity to push boundaries and deliver exceptional outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative p-6 rounded-2xl border ${study.border} bg-gradient-to-br ${study.gradient} backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{study.category}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{study.title}</h3>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all">
                  <ArrowUpRight size={16} className="text-gray-400 group-hover:text-cyan-400" />
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{study.description}</p>
              <div className="flex gap-4">
                {study.stats.map(stat => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
