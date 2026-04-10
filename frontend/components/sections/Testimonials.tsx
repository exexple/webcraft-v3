'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO',
    company: 'TechFlow',
    content: 'Webcraft Studio transformed our online presence completely. Our conversion rate tripled within the first month after launch. The attention to detail and performance optimization is outstanding.',
    rating: 5,
    avatar: 'SM',
    color: '#00d4ff',
  },
  {
    name: 'James Rodriguez',
    role: 'Founder',
    company: 'Luxe Commerce',
    content: 'Working with Webcraft was an incredible experience. They understood our brand vision perfectly and delivered a website that exceeded every expectation. Highly recommend!',
    rating: 5,
    avatar: 'JR',
    color: '#64ff6b',
  },
  {
    name: 'Priya Sharma',
    role: 'CTO',
    company: 'FinanceHub',
    content: 'The technical expertise at Webcraft Studio is second to none. They built our complex fintech dashboard with flawless execution, on time and on budget.',
    rating: 5,
    avatar: 'PS',
    color: '#00d4ff',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24" style={{ background: 'rgba(26, 31, 58, 0.3)' }}>
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
            Client Love
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What Our Clients{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #64ff6b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Say
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl transition-all duration-300"
              style={{
                background: 'rgba(26, 31, 58, 0.8)',
                border: '1px solid rgba(26, 31, 58, 1)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${t.color}30`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 30px ${t.color}10`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26, 31, 58, 1)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <Quote size={24} className="mb-4" style={{ color: `${t.color}50` }} />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="#00d4ff" style={{ color: '#00d4ff' }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#b0b5c3' }}>{t.content}</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}40, ${t.color}20)`,
                    border: `1px solid ${t.color}40`,
                    color: t.color,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-xs" style={{ color: '#b0b5c3' }}>
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
