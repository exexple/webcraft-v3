'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

const caseStudies = [
  {
    title: 'TechFlow SaaS',
    category: 'SaaS Platform',
    description: 'Built a full-featured SaaS dashboard with real-time analytics, resulting in 340% increase in user engagement.',
    stats: [
      { label: 'Engagement', value: '+340%' },
      { label: 'Load Time', value: '0.8s' },
    ],
    gradientFrom: '#00d4ff',
    gradientTo: '#7c3aed',
    accent: '#00d4ff',
    tag: 'Web App',
  },
  {
    title: 'Luxe Commerce',
    category: 'E-commerce',
    description: 'Redesigned a luxury e-commerce platform with advanced filtering, resulting in 215% increase in conversion rate.',
    stats: [
      { label: 'Conversion', value: '+215%' },
      { label: 'Revenue', value: '+$180k' },
    ],
    gradientFrom: '#7c3aed',
    gradientTo: '#ec4899',
    accent: '#a78bfa',
    tag: 'E-commerce',
  },
  {
    title: 'FinanceHub',
    category: 'Fintech Dashboard',
    description: 'Developed a secure financial dashboard with complex data visualizations for 50,000+ active users.',
    stats: [
      { label: 'Users', value: '50k+' },
      { label: 'Uptime', value: '99.9%' },
    ],
    gradientFrom: '#64ff6b',
    gradientTo: '#00d4ff',
    accent: '#64ff6b',
    tag: 'Fintech',
  },
];

export default function CaseStudies() {
  return (
    <section className="py-28" style={{ background: '#0a0e27' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-5" style={{ border: '1px solid rgba(167,139,250,0.3)', background: 'rgba(167,139,250,0.08)', color: '#a78bfa' }}>
              Our Work
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: 'Poppins, Inter, sans-serif' }}
          >
            Results That{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Speak Volumes
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-lg" style={{ color: '#64748b' }}>
            Every project is an opportunity to push boundaries and deliver exceptional outcomes.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.title}
              variants={fadeInUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
            >
              {/* Gradient header strip */}
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${study.gradientFrom}, ${study.gradientTo})` }} />

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded-md" style={{ color: study.accent, background: `${study.accent}15` }}>
                      {study.tag}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">{study.title}</h3>
                  </div>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: `${study.accent}15`, border: `1px solid ${study.accent}30` }}>
                    <ArrowUpRight size={16} style={{ color: study.accent }} />
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748b' }}>{study.description}</p>

                {/* Divider */}
                <div className="h-px mb-5" style={{ background: 'rgba(255,255,255,0.04)' }} />

                {/* Stats */}
                <div className="flex gap-6">
                  {study.stats.map(stat => (
                    <div key={stat.label}>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <TrendingUp size={12} style={{ color: study.accent }} />
                        <div className="text-2xl font-bold" style={{ color: study.accent }}>{stat.value}</div>
                      </div>
                      <div className="text-xs" style={{ color: '#475569' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${study.gradientFrom}08, transparent 70%)` }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
