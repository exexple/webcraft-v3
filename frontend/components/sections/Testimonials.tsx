'use client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { staggerScrollVariant, slideUpOnScrollVariant } from '@/lib/animations';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, TechFlow',
    content: 'Webcraft Studio transformed our online presence completely. Our conversion rate tripled within the first month after launch. The attention to detail and performance optimization is outstanding.',
    rating: 5,
    avatar: 'SM',
    gradient: 'from-cyan-500 to-violet-600',
  },
  {
    name: 'James Rodriguez',
    role: 'Founder, Luxe Commerce',
    content: 'Working with Webcraft was an incredible experience. They understood our brand vision perfectly and delivered a website that exceeded every expectation. Highly recommend!',
    rating: 5,
    avatar: 'JR',
    gradient: 'from-violet-500 to-pink-600',
  },
  {
    name: 'Priya Sharma',
    role: 'CTO, FinanceHub',
    content: 'The technical expertise at Webcraft Studio is second to none. They built our complex fintech dashboard with flawless execution, on time and on budget.',
    rating: 5,
    avatar: 'PS',
    gradient: 'from-green-500 to-cyan-600',
  },
];

export default function Testimonials() {
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
            What Our Clients{' '}
            <span className="text-yellow-400">Say</span>
          </h2>
          <p className="text-body-base text-gray-400 max-w-xl mx-auto mt-spacing-lg">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say.
          </p>
        </motion.div>

        <motion.div
          variants={staggerScrollVariant}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-spacing-lg"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={slideUpOnScrollVariant}
              whileHover={{
                y: -4,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              }}
              className="bg-gray-900 border border-white/10 rounded-2xl p-spacing-xl hover:border-white/20 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-spacing-sm mb-spacing-lg">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + j * 0.06 }}
                  >
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <p className="text-body-base text-gray-300 leading-relaxed mb-spacing-lg italic">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-spacing-md pt-spacing-lg border-t border-white/10">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-body-base font-semibold text-white font-poppins">{t.name}</p>
                  <p className="text-body-sm text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-spacing-3xl text-center"
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
      </Container>
    </section>
  );
}
