'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, DollarSign, Users, Activity } from 'lucide-react';

const caseStudies = [
  {
    title: 'TechFlow SaaS',
    category: 'Web App',
    description: 'Built a full-featured SaaS dashboard with real-time analytics, resulting in 340% increase in user engagement and sub-second load times.',
    stats: [
      { icon: TrendingUp, label: 'Engagement', value: '+340%' },
      { icon: Activity, label: 'Load Time', value: '0.8s' },
    ],
    accentColor: '#00d4ff',
    gradientFrom: 'rgba(0,212,255,0.08)',
    gradientTo: 'rgba(0,102,255,0.08)',
  },
  {
    title: 'Luxe Commerce',
    category: 'E-commerce',
    description: 'Redesigned a luxury e-commerce platform with advanced filtering and personalization, driving a 215% increase in conversion rate.',
    stats: [
      { icon: TrendingUp, label: 'Conversion', value: '+215%' },
      { icon: DollarSign, label: 'Revenue', value: '+$180k' },
    ],
    accentColor: '#64ff6b',
    gradientFrom: 'rgba(100,255,107,0.08)',
    gradientTo: 'rgba(0,212,255,0.08)',
  },
  {
    title: 'FinanceHub',
    category: 'Fintech',
    description: 'Developed a secure financial dashboard with complex data visualizations for over 50,000 active users with 99.9% uptime.',
    stats: [
      { icon: Users, label: 'Users', value: '50k+' },
      { icon: Activity, label: 'Uptime', value: '99.9%' },
    ],
    accentColor: '#00d4ff',
    gradientFrom: 'rgba(0,212,255,0.08)',
    gradientTo: 'rgba(100,255,107,0.06)',
  },
];

export default function CaseStudies() {
  return (
    <section className="py-24" style={{ background: '#0a0e27' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{
              border: '1px solid rgba(100,255,107,0.3)',
              background: 'rgba(100,255,107,0.08)',
              color: '#64ff6b',
            }}
          >
            Our Work
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Results That{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #64ff6b 0%, #00d4ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Speak Volumes
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: '#b0b5c3' }}>
            Every project is an opportunity to push boundaries and deliver exceptional outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${study.gradientFrom} 0%, ${study.gradientTo} 100%)`,
                border: `1px solid ${study.accentColor}20`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${study.accentColor}50`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px ${study.accentColor}15`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${study.accentColor}20`;
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Category badge */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span
                    className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      color: study.accentColor,
                      background: `${study.accentColor}15`,
                      border: `1px solid ${study.accentColor}30`,
                    }}
                  >
                    {study.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-3">{study.title}</h3>
                </div>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${study.accentColor}15`, border: `1px solid ${study.accentColor}30` }}
                >
                  <ArrowUpRight size={16} style={{ color: study.accentColor }} />
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: '#b0b5c3' }}>
                {study.description}
              </p>

              {/* Stats */}
              <div
                className="flex gap-6 pt-4"
                style={{ borderTop: `1px solid ${study.accentColor}15` }}
              >
                {study.stats.map(stat => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <stat.icon size={14} style={{ color: study.accentColor }} />
                    <div>
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs" style={{ color: '#b0b5c3' }}>{stat.label}</div>
                    </div>
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
