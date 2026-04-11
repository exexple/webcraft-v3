'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { staggerScrollVariant, slideUpOnScrollVariant } from '@/lib/animations';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, TechFlow',
    content: 'Webcraft Studio transformed our online presence completely. Our conversion rate tripled within the first month after launch. The attention to detail and performance optimization is outstanding.',
    rating: 5,
    avatar: 'SM',
    gradient: 'from-cyan-500 to-violet-600',
    company: 'TechFlow',
    result: '3x Conversion Rate',
  },
  {
    name: 'James Rodriguez',
    role: 'Founder, Luxe Commerce',
    content: 'Working with Webcraft was an incredible experience. They understood our brand vision perfectly and delivered a website that exceeded every expectation. Highly recommend!',
    rating: 5,
    avatar: 'JR',
    gradient: 'from-violet-500 to-pink-600',
    company: 'Luxe Commerce',
    result: '+$180k Revenue',
  },
  {
    name: 'Priya Sharma',
    role: 'CTO, FinanceHub',
    content: 'The technical expertise at Webcraft Studio is second to none. They built our complex fintech dashboard with flawless execution, on time and on budget.',
    rating: 5,
    avatar: 'PS',
    gradient: 'from-green-500 to-cyan-600',
    company: 'FinanceHub',
    result: '99.9% Uptime',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-900/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-sm font-medium mb-4">
            ⭐ Client Love
          </div>
          <h2 className="text-h2-mobile md:text-h2 font-poppins font-bold tracking-tight text-white mb-4">
            What Our Clients{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-body-base font-inter">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say.
          </p>
        </motion.div>

        <motion.div
          variants={staggerScrollVariant}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={slideUpOnScrollVariant}
              whileHover={{
                scale: 1.02,
                y: -4,
                boxShadow: '0 20px 40px rgba(6, 182, 212, 0.1)',
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              }}
              className="group bg-gray-900 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Quote icon with animation */}
              <motion.div
                initial={{ opacity: 0.2, scale: 1 }}
                whileHover={{ opacity: 0.5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 right-4"
              >
                <Quote size={40} className="text-cyan-400/20 group-hover:text-cyan-400/30 transition-colors" />
              </motion.div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + j * 0.06 }}
                  >
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-300 text-body-sm font-inter leading-relaxed mb-6 group-hover:text-white transition-colors duration-300 italic">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Result badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {t.result}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold shadow-lg flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-poppins font-semibold text-body-sm">{t.name}</div>
                  <div className="text-gray-500 text-body-xs font-inter">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Overall rating display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gray-900 border border-white/10">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-white font-semibold">5.0 out of 5</span>
            <span className="text-gray-500 text-sm">based on 50+ reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
