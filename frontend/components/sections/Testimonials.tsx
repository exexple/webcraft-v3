'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, TechFlow',
    content: 'Webcraft Studio transformed our online presence completely. Our conversion rate tripled within the first month after launch. The attention to detail and performance optimization is outstanding.',
    rating: 5,
    avatar: 'SM',
    accentColor: '#00d4ff',
  },
  {
    name: 'James Rodriguez',
    role: 'Founder, Luxe Commerce',
    content: 'Working with Webcraft was an incredible experience. They understood our brand vision perfectly and delivered a website that exceeded every expectation. Highly recommend!',
    rating: 5,
    avatar: 'JR',
    accentColor: '#a78bfa',
  },
  {
    name: 'Priya Sharma',
    role: 'CTO, FinanceHub',
    content: 'The technical expertise at Webcraft Studio is second to none. They built our complex fintech dashboard with flawless execution, on time and on budget.',
    rating: 5,
    avatar: 'PS',
    accentColor: '#64ff6b',
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #0d1433 50%, #0a0e27 100%)' }}>
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)' }} />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-5" style={{ border: '1px solid rgba(251,191,36,0.3)', background: 'rgba(251,191,36,0.08)', color: '#fbbf24' }}>
              Client Love
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: 'Poppins, Inter, sans-serif' }}
          >
            What Our Clients{' '}
            <span style={{ background: 'linear-gradient(135deg, #fbbf24, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Say
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl p-6 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Gradient top border */}
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${t.accentColor}60, transparent)` }} />

              <Quote size={24} className="mb-4" style={{ color: `${t.accentColor}50` }} />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                ))}
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>{t.content}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${t.accentColor}, ${t.accentColor}80)`, boxShadow: `0 0 15px ${t.accentColor}30` }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-xs" style={{ color: '#475569' }}>{t.role}</div>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: `radial-gradient(circle at 50% 100%, ${t.accentColor}06, transparent 70%)`, border: `1px solid ${t.accentColor}20` }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
