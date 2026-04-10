'use client';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Zap, BarChart3, Shield, Palette } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom websites built with Next.js, React, and modern technologies for blazing-fast performance.',
    color: '#00d4ff',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Responsive designs that look stunning and convert on every device, from mobile to desktop.',
    color: '#00d4ff',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Lightning-fast load times with Core Web Vitals optimization, CDN setup, and caching strategies.',
    color: '#64ff6b',
  },
  {
    icon: BarChart3,
    title: 'Conversion Rate Optimization',
    description: 'Data-driven UX improvements that turn visitors into leads and leads into customers.',
    color: '#64ff6b',
  },
  {
    icon: Shield,
    title: 'Security & Maintenance',
    description: 'Ongoing security monitoring, updates, and maintenance to keep your site safe and running smoothly.',
    color: '#00d4ff',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces designed to delight your users and strengthen your brand identity.',
    color: '#64ff6b',
  },
];

export default function Services() {
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
              border: '1px solid rgba(0,212,255,0.3)',
              background: 'rgba(0,212,255,0.08)',
              color: '#00d4ff',
            }}
          >
            What We Do
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Services That{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Drive Results
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: '#b0b5c3' }}>
            From concept to deployment, we provide end-to-end digital solutions tailored to your business goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group p-6 rounded-2xl transition-all duration-300 cursor-default"
              style={{
                background: 'rgba(26, 31, 58, 0.5)',
                border: '1px solid rgba(26, 31, 58, 1)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(100,255,107,0.05) 100%)';
                (e.currentTarget as HTMLElement).style.border = '1px solid rgba(0,212,255,0.3)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.1)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(26, 31, 58, 0.5)';
                (e.currentTarget as HTMLElement).style.border = '1px solid rgba(26, 31, 58, 1)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}
              >
                <service.icon size={22} style={{ color: service.color }} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#b0b5c3' }}>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
