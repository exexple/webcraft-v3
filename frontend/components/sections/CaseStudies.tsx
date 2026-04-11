'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Clock, Users, DollarSign } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const caseStudies = [
  {
    title: 'TechFlow SaaS',
    category: 'Web App',
    categoryColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    description: 'Built a full-featured SaaS dashboard with real-time analytics, resulting in 340% increase in user engagement.',
    metrics: [
      { icon: TrendingUp, label: 'Engagement', value: '+340%', color: 'text-cyan-400' },
      { icon: Clock, label: 'Load Time', value: '0.8s', color: 'text-green-400' },
    ],
    gradient: 'from-cyan-500/20 to-violet-500/20',
    border: 'border-cyan-500/20',
    hoverGlow: 'rgba(6, 182, 212, 0.12)',
    accentColor: 'cyan',
  },
  {
    title: 'Luxe Commerce',
    category: 'E-commerce',
    categoryColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    description: 'Redesigned a luxury e-commerce platform with advanced filtering, resulting in 215% increase in conversion rate.',
    metrics: [
      { icon: TrendingUp, label: 'Conversion', value: '+215%', color: 'text-violet-400' },
      { icon: DollarSign, label: 'Revenue', value: '+$180k', color: 'text-green-400' },
    ],
    gradient: 'from-violet-500/20 to-pink-500/20',
    border: 'border-violet-500/20',
    hoverGlow: 'rgba(139, 92, 246, 0.12)',
    accentColor: 'violet',
  },
  {
    title: 'FinanceHub',
    category: 'Fintech',
    categoryColor: 'text-green-400 bg-green-500/10 border-green-500/20',
    description: 'Developed a secure financial dashboard with complex data visualizations for 50,000+ active users.',
    metrics: [
      { icon: Users, label: 'Active Users', value: '50k+', color: 'text-green-400' },
      { icon: TrendingUp, label: 'Uptime', value: '99.9%', color: 'text-cyan-400' },
    ],
    gradient: 'from-green-500/20 to-cyan-500/20',
    border: 'border-green-500/20',
    hoverGlow: 'rgba(34, 197, 94, 0.12)',
    accentColor: 'green',
  },
];

export default function CaseStudies() {
  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">
            Our Work
          </div>
          <h2 className="text-h2-mobile md:text-h2 font-poppins font-bold tracking-tight text-white mb-4">
            Results That{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Speak Volumes
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-body-lg font-inter">
            Every project is an opportunity to push boundaries and deliver exceptional outcomes.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.title}
              variants={fadeInUp}
              whileHover={{
                y: -8,
                boxShadow: `0 25px 70px ${study.hoverGlow}`,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className={`group relative p-6 rounded-2xl border ${study.border} bg-gradient-to-br ${study.gradient} backdrop-blur-sm cursor-pointer overflow-hidden`}
            >
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`text-body-xs font-space-mono font-semibold uppercase tracking-looser px-2.5 py-1 rounded-full border ${study.categoryColor}`}>
                      {study.category}
                    </span>
                    <h3 className="text-h4-mobile font-poppins font-bold text-white mt-3">{study.title}</h3>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    transition={{ duration: 0.2 }}
                    className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors flex-shrink-0"
                  >
                    <ArrowUpRight size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                  </motion.div>
                </div>

                <p className="text-gray-400 text-body-sm font-inter leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">{study.description}</p>

                {/* Metric badges */}
                <div className="flex gap-4 flex-wrap">
                  {study.metrics.map((metric, j) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 + j * 0.1 }}
                      className="flex-1 min-w-0 bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/10"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <metric.icon size={12} className={metric.color} />
                        <span className="text-gray-500 text-body-xs font-inter">{metric.label}</span>
                      </div>
                      <div className={`text-h5-mobile font-poppins font-bold ${metric.color}`}>{metric.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <a href="/case-studies" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors group">
            View all case studies
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
