'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, Star, TrendingUp, Globe } from 'lucide-react';
import Button from '@/components/ui/Button';
import { blobAnimation } from '@/lib/animations';
import { useRef } from 'react';

const trustBadges = [
  { text: '50+ Projects Delivered', Icon: CheckCircle2, color: 'text-cyan-400' },
  { text: '98% Client Satisfaction', Icon: Star, color: 'text-yellow-400' },
  { text: '5× Average ROI', Icon: TrendingUp, color: 'text-emerald-400' },
  { text: 'Global Clients', Icon: Globe, color: 'text-violet-400' },
];

const particles = [
  { color: 'bg-cyan-400', size: 'w-1.5 h-1.5' },
  { color: 'bg-violet-400', size: 'w-1 h-1' },
  { color: 'bg-emerald-400', size: 'w-1 h-1' },
  { color: 'bg-cyan-400', size: 'w-1 h-1' },
  { color: 'bg-fuchsia-400', size: 'w-1.5 h-1.5' },
  { color: 'bg-cyan-300', size: 'w-1 h-1' },
  { color: 'bg-violet-300', size: 'w-1 h-1' },
  { color: 'bg-emerald-400', size: 'w-1.5 h-1.5' },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0e1a]">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradient layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-5%,rgba(6,182,212,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_85%,rgba(168,85,247,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_15%_70%,rgba(16,185,129,0.06),transparent)]" />

        {/* Animated blobs */}
        <motion.div
          variants={blobAnimation}
          initial="hidden"
          animate="visible"
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-cyan-500/[0.07] rounded-full blur-3xl"
        />
        <motion.div
          variants={blobAnimation}
          initial="hidden"
          animate="visible"
          className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-violet-600/[0.07] rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-3xl bg-cyan-500/[0.06]"
        />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -28, 0],
              x: [0, (i % 2 === 0 ? 12 : -12), 0],
              opacity: [0.15, 0.55, 0.15],
            }}
            transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
            className={`absolute rounded-full ${p.color} ${p.size}`}
            style={{ left: `${8 + i * 12}%`, top: `${12 + (i % 4) * 18}%` }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-8"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-10 relative"
        >
          {/* Ping ring */}
          <span
            className="absolute inset-0 rounded-full animate-ping bg-cyan-500/10 pointer-events-none"
            style={{ animationDuration: '3s' }}
          />
          <motion.span animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
            <Sparkles size={14} />
          </motion.span>
          <span>Premium Web Development Studio</span>
          <span className="absolute -inset-px rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-sm -z-10" />
        </motion.div>

        {/* Headline — three staggered lines */}
        <div className="mb-8 space-y-1">
          {/* Line 1: We Build */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block text-[3rem] sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.1]">
              We Build
            </span>
          </motion.div>

          {/* Line 2: High-Converting Websites — cyan→violet gradient */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block text-[3rem] sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
              High-Converting Websites
            </span>
          </motion.div>

          {/* Line 3: for Modern Brands */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block text-[3rem] sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.1]">
              <span className="text-white">for </span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto] [animation-delay:2s]">
                  Modern Brands
                </span>
                {/* Underline accent */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-violet-400 to-cyan-400 origin-left"
                />
              </span>
            </span>
          </motion.div>
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
        >
          From stunning landing pages to complex web applications — we craft digital experiences
          that captivate your audience and drive measurable business results.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          {/* Primary CTA */}
          <Link href="/contact">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
              <Button
                size="lg"
                className="relative gap-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-950 font-bold hover:shadow-glow-cyan border-0 px-8 py-4"
              >
                Start Your Project
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </motion.div>
          </Link>

          {/* Secondary CTA */}
          <Link href="/case-studies">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              <Button
                variant="outline"
                size="lg"
                className="relative gap-2.5 border-violet-500/40 text-violet-300 hover:border-violet-400/70 hover:bg-violet-500/8 hover:text-violet-200 px-8 py-4"
              >
                View Case Studies
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-gray-500 text-sm mb-20"
        >
          {trustBadges.map(({ text, Icon, color }) => (
            <motion.div
              key={text}
              whileHover={{ color: '#fff' }}
              className="flex items-center gap-2 transition-colors duration-200"
            >
              <Icon size={14} className={color} />
              <span>{text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
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
