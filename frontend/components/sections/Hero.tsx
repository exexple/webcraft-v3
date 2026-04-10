'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Sparkles, TrendingUp, Users, Star, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';

const stats = [
  { icon: TrendingUp, value: '50+', label: 'Projects Delivered', color: 'text-[#00d4ff]' },
  { icon: Star, value: '98%', label: 'Client Satisfaction', color: 'text-[#64ff6b]' },
  { icon: Users, value: '5x', label: 'Average ROI', color: 'text-[#00d4ff]' },
  { icon: Clock, value: '3yrs', label: 'In Business', color: 'text-[#64ff6b]' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#0a0e27' }}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(0,212,255,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(0,102,255,0.1) 0%, transparent 60%)',
          }}
        />
        {/* Animated orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 animate-float"
          style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15 animate-float [animation-delay:3s]"
          style={{ background: 'radial-gradient(circle, #0066ff, transparent)' }}
        />
        <div
          className="absolute top-2/3 left-1/2 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 animate-float [animation-delay:1.5s]"
          style={{ background: 'radial-gradient(circle, #64ff6b, transparent)' }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8"
          style={{
            borderColor: 'rgba(0,212,255,0.3)',
            background: 'rgba(0,212,255,0.08)',
            color: '#00d4ff',
          }}
        >
          <Sparkles size={14} />
          Premium Web Development Studio
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]"
        >
          <span className="text-white">We Build </span>
          <span
            className="inline-block"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            High-Converting
          </span>
          <br />
          <span className="text-white">Websites for </span>
          <span
            className="inline-block"
            style={{
              background: 'linear-gradient(135deg, #64ff6b 0%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Modern Brands
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: '#b0b5c3' }}
        >
          From stunning landing pages to complex web applications — we craft digital experiences
          that captivate your audience and drive measurable business results.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link href="/contact">
            <Button size="lg" className="group min-w-[180px]">
              Book a Call
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a
            href="https://wa.me/918822322905"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="group min-w-[180px]">
              <MessageCircle size={18} style={{ color: '#64ff6b' }} />
              Get Free Audit
            </Button>
          </a>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(26,31,58,0.8)',
                border: '1px solid rgba(0,212,255,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <stat.icon size={20} className={`${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-extrabold text-white">{stat.value}</div>
              <div className="text-xs mt-1" style={{ color: '#b0b5c3' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2" style={{ color: '#b0b5c3' }}>
            <span className="text-xs">Scroll to explore</span>
            <div className="w-px h-8 mx-auto rounded-full" style={{ background: 'linear-gradient(to bottom, #00d4ff, transparent)' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
