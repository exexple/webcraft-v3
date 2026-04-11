'use client';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Zap, BarChart3, Shield, Palette, ArrowRight } from 'lucide-react';
import { staggerScrollVariant, slideUpOnScrollVariant } from '@/lib/animations';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom websites built with Next.js, React, and modern technologies for blazing-fast performance.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    glow: 'rgba(6, 182, 212, 0.15)',
    accent: 'from-cyan-500/20 to-cyan-600/5',
    badge: 'Most Popular',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Responsive designs that look stunning and convert on every device, from mobile to desktop.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    glow: 'rgba(139, 92, 246, 0.15)',
    accent: 'from-violet-500/20 to-violet-600/5',
    badge: null,
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Lightning-fast load times with Core Web Vitals optimization, CDN setup, and caching strategies.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    glow: 'rgba(234, 179, 8, 0.15)',
    accent: 'from-yellow-500/20 to-yellow-600/5',
    badge: null,
  },
  {
    icon: BarChart3,
    title: 'Conversion Rate Optimization',
    description: 'Data-driven UX improvements that turn visitors into leads and leads into customers.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    glow: 'rgba(34, 197, 94, 0.15)',
    accent: 'from-green-500/20 to-green-600/5',
    badge: 'High ROI',
  },
  {
    icon: Shield,
    title: 'Security & Maintenance',
    description: 'Ongoing security monitoring, updates, and maintenance to keep your site safe and running smoothly.',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    glow: 'rgba(239, 68, 68, 0.15)',
    accent: 'from-red-500/20 to-red-600/5',
    badge: null,
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces designed to delight your users and strengthen your brand identity.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    glow: 'rgba(236, 72, 153, 0.15)',
    accent: 'from-pink-500/20 to-pink-600/5',
    badge: null,
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
            What We Do
          </div>
          <h2 className="text-h2-mobile md:text-h2 font-poppins font-bold tracking-tight text-white mb-4">
            Services That{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Drive Results
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-body-lg font-inter">
            From concept to deployment, we provide end-to-end digital solutions tailored to your business goals.
          </p>
        </motion.div>

        <motion.div
          variants={staggerScrollVariant}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={slideUpOnScrollVariant}
              whileHover={{
                y: -8,
                boxShadow: `0 20px 60px ${service.glow}`,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className={`group relative p-6 rounded-2xl border ${service.border} bg-gray-900/50 hover:bg-gray-900 transition-colors duration-300 cursor-pointer overflow-hidden`}
            >
              {/* Gradient accent on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
              
              {/* Gradient border glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: `inset 0 0 0 1px ${service.glow}` }} />

              {/* Badge */}
              {service.badge && (
                <div className="absolute top-4 right-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${service.bg} ${service.color} border ${service.border}`}>
                    {service.badge}
                  </span>
                </div>
              )}

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className={`w-12 h-12 rounded-xl ${service.bg} border ${service.border} flex items-center justify-center mb-5`}
                >
                  <service.icon className={service.color} size={22} />
                </motion.div>

                <h3 className="text-white font-poppins font-bold text-h4-mobile mb-2 group-hover:text-white transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-body-sm font-inter leading-relaxed mb-5 group-hover:text-gray-300 transition-colors">{service.description}</p>

                {/* Learn more */}
                <div className={`flex items-center gap-1.5 text-sm font-medium ${service.color} opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0`}>
                  Learn more
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight size={14} />
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className="text-gray-500 text-sm">
            Not sure what you need?{' '}
            <a href="/contact" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors">
              Book a free consultation
            </a>
            {' '}— we&apos;ll guide you to the right solution.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
