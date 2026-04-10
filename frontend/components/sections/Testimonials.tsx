'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, TechFlow',
    content: 'Webcraft Studio transformed our online presence completely. Our conversion rate tripled within the first month after launch. The attention to detail and performance optimization is outstanding.',
    rating: 5,
    avatar: 'SM',
  },
  {
    name: 'James Rodriguez',
    role: 'Founder, Luxe Commerce',
    content: 'Working with Webcraft was an incredible experience. They understood our brand vision perfectly and delivered a website that exceeded every expectation. Highly recommend!',
    rating: 5,
    avatar: 'JR',
  },
  {
    name: 'Priya Sharma',
    role: 'CTO, FinanceHub',
    content: 'The technical expertise at Webcraft Studio is second to none. They built our complex fintech dashboard with flawless execution, on time and on budget.',
    rating: 5,
    avatar: 'PS',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-sm font-medium mb-4">
            Client Love
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What Our Clients{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gray-900 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
            >
              <Quote size={24} className="text-cyan-400/50 mb-4" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{t.content}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
