'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Star, TrendingUp, Globe } from 'lucide-react';
import Button from '@/components/ui/Button';
import { blobAnimation, staggerContainerVariant, slideUpVariant } from '@/lib/animations';
import { useRef } from 'react';

const trustBadges = [
  { text: '50+ Projects Delivered', Icon: CheckCircle2, color: 'text-cyan-400' },
  { text: '98% Client Satisfaction', Icon: Star, color: 'text-yellow-400' },
  { text: '5× Average ROI', Icon: TrendingUp, color: 'text-emerald-400' },
  { text: 'Global Clients', Icon: Globe, color: 'text-violet-400' },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0e1a]">
      {/* Background — subtle, non-competing */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradient layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-5%,rgba(6,182,212,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_85%,rgba(168,85,247,0.08),transparent)]" />

        {/* Blobs — fade-in entrance only, no looping animation */}
        <motion.div
          variants={blobAnimation}
          initial="hidden"
          animate="visible"
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-cyan-500/[0.06] rounded-full blur-3xl"
        />
        <motion.div
          variants={blobAnimation}
          initial="hidden"
          animate="visible"
          className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-violet-600/[0.06] rounded-full blur-3xl"
        />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        variants={staggerContainerVariant}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16"
      >
        {/* Stage 1 — HEADLINE (dominant) */}
        <div className="mb-8 space-y-1">
          {/* Line 1: We Build */}
          <motion.div variants={slideUpVariant}>
            <span className="block text-h1-mobile md:text-h1 font-poppins font-black tracking-tight-sm text-white leading-[1.1]">
              We Build
            </span>
          </motion.div>

          {/* Line 2: High-Converting Websites — cyan accent */}
          <motion.div variants={slideUpVariant}>
            <span className="block text-h1-mobile md:text-h1 font-poppins font-black tracking-tight-sm leading-[1.1] bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              High-Converting Websites
            </span>
          </motion.div>

          {/* Line 3: for Modern Brands — violet accent */}
          <motion.div variants={slideUpVariant}>
            <span className="block text-h1-mobile md:text-h1 font-poppins font-black tracking-tight-sm leading-[1.1]">
              <span className="text-white">for </span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Modern Brands
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-violet-400 to-fuchsia-400 origin-left"
                />
              </span>
            </span>
          </motion.div>
        </div>

        {/* Stage 2 — SUBHEADLINE (secondary) */}
        <motion.p
          variants={slideUpVariant}
          className="text-body-base md:text-body-lg font-inter text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
        >
          From stunning landing pages to complex web applications — we craft digital experiences
          that captivate your audience and drive measurable business results.
        </motion.p>

        {/* Stage 3 — CTA BUTTONS */}
        <motion.div
          variants={slideUpVariant}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          {/* Primary CTA */}
          <Link href="/contact">
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="relative group"
            >
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

          {/* Secondary CTA */}
          <Link href="/case-studies">
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-violet-500/30 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
              <Button
                variant="outline"
                size="lg"
                className="relative gap-2.5 border-2 border-violet-500/60 text-violet-300 hover:border-violet-400 hover:bg-violet-500/10 hover:text-violet-200 px-8 py-4 text-[17px]"
              >
                View Our Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Stage 4 — TRUST INDICATORS (supporting proof) */}
        <motion.div
          variants={slideUpVariant}
          className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-gray-400 text-body-sm pb-4"
        >
          {trustBadges.map(({ text, Icon, color }) => (
            <div key={text} className="flex items-center gap-1.5">
              <Icon size={14} className={color} />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

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
