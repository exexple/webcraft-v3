'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { staggerContainerVariant, slideUpVariant } from '@/lib/animations';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Background — subtle, non-competing */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-5%,rgba(6,182,212,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_85%,rgba(168,85,247,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <Container size="xl" className="relative z-10">
        <motion.div
          style={{ y, opacity }}
          variants={staggerContainerVariant}
          initial="initial"
          animate="animate"
          className="text-center pt-20 pb-16 space-y-spacing-xl"
        >
          {/* Headline */}
          <div className="space-y-1">
            <motion.div variants={slideUpVariant}>
              <span className="block text-h1-mobile md:text-h1 font-poppins font-black tracking-tight-sm text-white leading-[1.1]">
                We Build
              </span>
            </motion.div>
            <motion.div variants={slideUpVariant}>
              <span className="block text-h1-mobile md:text-h1 font-poppins font-black tracking-tight-sm leading-[1.1] bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                High-Converting Websites
              </span>
            </motion.div>
            <motion.div variants={slideUpVariant}>
              <span className="block text-h1-mobile md:text-h1 font-poppins font-black tracking-tight-sm text-white leading-[1.1]">
                for Modern Brands
              </span>
            </motion.div>
          </div>

          {/* Subheadline */}
          <motion.p
            variants={slideUpVariant}
            className="text-body-base md:text-body-lg font-inter text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            From stunning landing pages to complex web applications — we craft digital experiences
            that captivate your audience and drive measurable business results.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={slideUpVariant}
            className="flex flex-col sm:flex-row gap-spacing-lg justify-center pt-spacing-lg"
          >
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="relative group">
                <div className="absolute -inset-0.5 bg-cyan-500/50 rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                <Button
                  size="lg"
                  className="relative gap-2.5 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/50 border-0 px-8 py-4 text-[17px]"
                >
                  Start Your Project
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
            </Link>

            <Link href="/case-studies">
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="relative group">
                <Button
                  variant="outline"
                  size="lg"
                  className="relative gap-2.5 border-2 border-white/20 text-gray-300 hover:border-white/40 hover:bg-white/5 hover:text-white px-8 py-4 text-[17px]"
                >
                  View Our Work
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={slideUpVariant}
            className="flex flex-col sm:flex-row gap-spacing-2xl justify-center pt-spacing-2xl border-t border-white/10"
          >
            {[
              { value: '50+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '5x', label: 'Average ROI' },
              { value: 'Global', label: 'Clients' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-h5 font-bold text-white">{value}</p>
                <p className="text-body-sm text-gray-400">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 text-xs"
      >
        <span className="uppercase tracking-[0.2em] text-[10px]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-gray-700 flex items-start justify-center p-1"
        >
          <div className="w-1 h-1.5 bg-cyan-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
