'use client';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Zap, BarChart3, Shield, Palette, ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom websites built with Next.js, React, and modern technologies for blazing-fast performance.',
    accent: '#00d4ff',
    glow: 'rgba(0,212,255,0.15)',
    border: 'rgba(0,212,255,0.2)',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Responsive designs that look stunning and convert on every device, from mobile to desktop.',
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.15)',
    border: 'rgba(167,139,250,0.2)',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Lightning-fast load times with Core Web Vitals optimization, CDN setup, and caching strategies.',
    accent: '#fbbf24',
    glow: 'rgba(251,191,36,0.15)',
    border: 'rgba(251,191,36,0.2)',
  },
  {
    icon: BarChart3,
    title: 'Conversion Rate Optimization',
    description: 'Data-driven UX improvements that turn visitors into leads and leads into customers.',
    accent: '#64ff6b',
    glow: 'rgba(100,255,107,0.15)',
    border: 'rgba(100,255,107,0.2)',
  },
  {
    icon: Shield,
    title: 'Security & Maintenance',
    description: 'Ongoing security monitoring, updates, and maintenance to keep your site safe and running smoothly.',
    accent: '#f87171',
    glow: 'rgba(248,113,113,0.15)',
    border: 'rgba(248,113,113,0.2)',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces designed to delight your users and strengthen your brand identity.',
    accent: '#f472b6',
    glow: 'rgba(244,114,182,0.15)',
    border: 'rgba(244,114,182,0.2)',
  },
];

export default function Services() {
  return (
    <section className="py-28" style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #0d1433 50%, #0a0e27 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-5" style={{ border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,212,255,0.08)', color: '#00d4ff' }}>
              What We Do
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: 'Poppins, Inter, sans-serif' }}
          >
            Services That{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #64ff6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Drive Results
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-lg" style={{ color: '#64748b' }}>
            From concept to deployment, we provide end-to-end digital solutions tailored to your business goals.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl p-7 cursor-pointer overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${service.border}`,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `rgba(255,255,255,0.04)`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${service.glow}, 0 0 0 1px ${service.border}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Glow corner */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${service.glow} 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: service.glow, border: `1px solid ${service.border}` }}>
                  <service.icon size={22} style={{ color: service.accent }} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{service.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#64748b' }}>{service.description}</p>
                <div className="flex items-center gap-1 text-sm font-medium transition-all duration-200 group-hover:gap-2" style={{ color: service.accent }}>
                  Learn More <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
