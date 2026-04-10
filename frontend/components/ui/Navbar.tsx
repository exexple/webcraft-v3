'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Button from './Button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/process', label: 'Process' },
  { href: '/pricing', label: 'Pricing' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      )}
      style={scrolled ? { background: 'rgba(10,14,39,0.88)', borderBottom: '1px solid rgba(255,255,255,0.06)' } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300" style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', boxShadow: '0 0 15px rgba(0,212,255,0.4)' }}>
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg text-white" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
              Webcraft<span style={{ color: '#00d4ff' }}>Studio</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 text-sm rounded-lg transition-all duration-200 relative',
                  pathname === link.href
                    ? 'font-medium'
                    : 'hover:text-white'
                )}
                style={{
                  color: pathname === link.href ? '#00d4ff' : '#94a3b8',
                  background: pathname === link.href ? 'rgba(0,212,255,0.08)' : 'transparent',
                }}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link href="/contact">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-all"
              style={{ color: '#94a3b8' }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(10,14,39,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 rounded-xl text-sm transition-all duration-200"
                  style={{
                    color: pathname === link.href ? '#00d4ff' : '#94a3b8',
                    background: pathname === link.href ? 'rgba(0,212,255,0.08)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/contact" className="block">
                  <Button className="w-full" size="sm">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
