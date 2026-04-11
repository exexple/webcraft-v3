'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import Button from './Button';
import { cn } from '@/lib/utils';
import { Container } from './Container';

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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 origin-left z-[60]"
      />

      <motion.nav
        animate={{
          backgroundColor: scrolled ? 'rgba(3, 7, 18, 0.9)' : 'rgba(0, 0, 0, 0)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          scrolled ? 'border-b border-white/10 shadow-lg shadow-black/20' : ''
        )}
      >
        <Container size="xl" className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow"
              >
                <Zap size={16} className="text-white" />
              </motion.div>
              <span className="font-bold text-lg text-white">
                Webcraft<span className="text-cyan-400">Studio</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3 py-2 text-sm rounded-lg transition-all duration-200',
                    pathname === link.href
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-cyan-500/10 rounded-lg -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
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
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
        </Container>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden bg-gray-950/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block px-4 py-3 rounded-lg text-sm transition-all duration-200',
                        pathname === link.href
                          ? 'text-cyan-400 bg-cyan-500/10'
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: navLinks.length * 0.05 }}
                  className="pt-2"
                >
                  <Link href="/contact" className="block">
                    <Button className="w-full" size="sm">Get Started</Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
