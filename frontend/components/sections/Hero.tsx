'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Sparkles, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(180deg, #050818 0%, #0a0e27 40%, #0d1433 100%)' }}>
      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(100,255,107,0.04) 0%, transparent 60%)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        {/* Grid */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Gradient overlay bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: 'linear-gradient(to top, #0a0e27, transparent)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium font-mono-display" style={{ border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,212,255,0.08)', color: '#00d4ff' }}>
              <Sparkles size={14} />
              Premium Web Development Studio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.05]"
            style={{ fontFamily: 'Poppins, Inter, sans-serif' }}
          >
            We Build{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #64ff6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              High-Converting
            </span>
            <br />
            <span className="text-white">Websites for</span>{' '}
            <span style={{ background: 'linear-gradient(135deg, #7c3aed, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Modern Brands
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: '#94a3b8' }}
          >
            From stunning landing pages to complex web applications — we craft digital experiences
            that captivate your audience and drive measurable business results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <Button size="lg" className="group btn-glow-anim">
                Book a Free Call
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a
              href="https://wa.me/918822322905"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="group">
                <MessageCircle size={18} className="text-green-400" />
                Get Free Audit
              </Button>
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeInUp}
            className="mt-14 flex flex-wrap justify-center gap-6"
          >
            {[
              { label: '50+ Projects Delivered', color: '#00d4ff' },
              { label: '98% Client Satisfaction', color: '#64ff6b' },
              { label: '5-Star Rated', color: '#f59e0b' },
              { label: 'Global Clients', color: '#a78bfa' },
            ].map(badge => (
              <div key={badge.label} className="flex items-center gap-2 text-sm" style={{ color: '#64748b' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: badge.color, boxShadow: `0 0 6px ${badge.color}` }} />
                {badge.label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: '#475569' }}
        >
          <span className="text-xs tracking-widest uppercase font-mono-display" style={{ fontFamily: 'Space Mono, monospace' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
