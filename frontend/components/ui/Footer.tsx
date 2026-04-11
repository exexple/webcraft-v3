'use client';
import Link from 'next/link';
import { Zap, Globe, AtSign, Terminal, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Process', href: '/process' },
    { label: 'Case Studies', href: '/case-studies' },
  ],
  Resources: [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '#' },
  ],
};

const socials = [
  { icon: Globe, href: '#', label: 'Twitter' },
  { icon: AtSign, href: '#', label: 'LinkedIn' },
  { icon: Terminal, href: '#', label: 'GitHub' },
  { icon: Camera, href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/10 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.4 }}
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20"
              >
                <Zap size={16} className="text-white" />
              </motion.div>
              <span className="font-bold text-lg text-white">
                Webcraft<span className="text-cyan-400">Studio</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-2">
              We build high-converting websites and digital experiences for modern brands worldwide.
            </p>
            <div className="flex items-center gap-1.5 text-sm text-green-400 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for new projects
            </div>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group text-gray-400 text-sm hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-px left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Webcraft Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors relative group">
              Privacy Policy
              <span className="absolute -bottom-px left-0 w-0 h-px bg-gray-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#" className="hover:text-white transition-colors relative group">
              Terms of Service
              <span className="absolute -bottom-px left-0 w-0 h-px bg-gray-400 group-hover:w-full transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
