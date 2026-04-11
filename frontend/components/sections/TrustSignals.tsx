'use client';
import { motion } from 'framer-motion';
import { Shield, Award, Star, TrendingUp, Clock, HeartHandshake } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const trustMetrics = [
  { icon: Star, value: '5.0', label: 'Google Rating', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { icon: Shield, value: '100%', label: 'Secure & Reliable', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { icon: TrendingUp, value: '98%', label: 'Client Satisfaction', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { icon: Clock, value: '24h', label: 'Response Time', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  { icon: Award, value: '50+', label: 'Projects Delivered', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { icon: HeartHandshake, value: '3yr', label: 'In Business', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
];

const clientLogos = [
  'TechFlow', 'Luxe Commerce', 'FinanceHub', 'BuildCo', 'NexGen', 'Velocia',
];

const badges = [
  { text: 'Top Rated on Clutch', color: 'from-cyan-500/20 to-cyan-600/20', border: 'border-cyan-500/30', textColor: 'text-cyan-300' },
  { text: 'Google Partner', color: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/30', textColor: 'text-blue-300' },
  { text: 'ISO Certified Process', color: 'from-green-500/20 to-green-600/20', border: 'border-green-500/30', textColor: 'text-green-300' },
  { text: 'Featured in Forbes', color: 'from-yellow-500/20 to-yellow-600/20', border: 'border-yellow-500/30', textColor: 'text-yellow-300' },
];

export default function TrustSignals() {
  return (
    <section className="py-24 bg-gray-900/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-4">
            <Shield size={14} />
            Trusted by Industry Leaders
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Why Clients{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Trust Us
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Backed by proven results, certifications, and a track record of delivering exceptional digital experiences.
          </p>
        </motion.div>

        {/* Trust metrics grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
        >
          {trustMetrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group flex flex-col items-center p-4 rounded-2xl border ${metric.border} ${metric.bg} text-center transition-all duration-300 hover:shadow-lg`}
            >
              <div className={`w-10 h-10 rounded-xl ${metric.bg} border ${metric.border} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon size={18} className={metric.color} />
              </div>
              <div className={`text-2xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
              <div className="text-gray-500 text-xs leading-tight">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Client logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-8">Trusted by brands worldwide</p>
          <div className="flex flex-wrap justify-center gap-4">
            {clientLogos.map((logo, i) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 font-medium text-sm"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certification badges */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {badges.map((badge) => (
            <motion.div
              key={badge.text}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border ${badge.border} bg-gradient-to-r ${badge.color} ${badge.textColor} text-sm font-medium transition-all duration-300`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-current" />
              {badge.text}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
