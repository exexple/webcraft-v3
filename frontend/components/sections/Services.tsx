'use client';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Zap, BarChart3, Shield, Palette } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { staggerScrollVariant, slideUpOnScrollVariant } from '@/lib/animations';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom websites built with Next.js, React, and modern technologies for blazing-fast performance.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Responsive designs that look stunning and convert on every device, from mobile to desktop.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Lightning-fast load times with Core Web Vitals optimization, CDN setup, and caching strategies.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: BarChart3,
    title: 'Conversion Rate Optimization',
    description: 'Data-driven UX improvements that turn visitors into leads and leads into customers.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: Shield,
    title: 'Security & Maintenance',
    description: 'Ongoing security monitoring, updates, and maintenance to keep your site safe and running smoothly.',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces designed to delight your users and strengthen your brand identity.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
  },
];

export default function Services() {
  return (
    <section className="py-section-spacious bg-gray-950">
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-spacing-3xl"
        >
          <h2 className="text-h2-mobile md:text-h2 font-poppins font-bold tracking-tight text-white mb-spacing-md">
            Services That{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Drive Results
            </span>
          </h2>
          <p className="text-body-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mt-spacing-lg">
            From concept to deployment, we provide end-to-end digital solutions tailored to your business goals.
          </p>
        </motion.div>

        <motion.div
          variants={staggerScrollVariant}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-spacing-lg"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={slideUpOnScrollVariant}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className="bg-gray-900 border border-white/10 rounded-2xl p-spacing-xl hover:border-white/20 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className={`w-16 h-16 rounded-lg ${service.bg} flex items-center justify-center mb-spacing-lg`}
              >
                <service.icon size={28} className={service.color} />
              </motion.div>
              <h3 className="text-h5 font-bold text-white mb-spacing-md font-poppins">
                {service.title}
              </h3>
              <p className="text-body-sm text-gray-400 leading-relaxed">
                {service.description}
              </p>
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
          <p className="text-gray-500 text-sm">
            Not sure what you need?{' '}
            <a href="/contact" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors">
              Book a free consultation
            </a>
            {' '}— we&apos;ll guide you to the right solution.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
