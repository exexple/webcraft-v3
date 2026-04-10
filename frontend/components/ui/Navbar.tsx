'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Button from './Button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/process', label: 'Process' },
  { href: '/testimonials', label: 'Reviews' },
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
        scrolled ? 'shadow-lg' : ''
      )}
      style={{
        background: scrolled
          ? 'rgba(10, 14, 39, 0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26, 31, 58, 0.8)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)',
                boxShadow: '0 4px 15px rgba(0, 212, 255, 0.4)',
              }}
            >
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg text-white">
              Webcraft<span style={{ color: '#00d4ff' }}>Studio</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 text-sm rounded-lg transition-all duration-200 font-medium',
                  pathname === link.href
                    ? 'text-[#00d4ff]'
                    : 'text-[#b0b5c3] hover:text-white'
                )}
                style={pathname === link.href ? { background: 'rgba(0, 212, 255, 0.08)' } : {}}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Link href="/contact">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-all"
              style={{ color: '#b0b5c3' }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden"
          style={{
            background: 'rgba(10, 14, 39, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(26, 31, 58, 0.8)',
          }}
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-4 py-3 rounded-lg text-sm transition-all duration-200 font-medium',
                  pathname === link.href
                    ? 'text-[#00d4ff]'
                    : 'text-[#b0b5c3] hover:text-white'
                )}
                style={pathname === link.href ? { background: 'rgba(0, 212, 255, 0.08)' } : {}}
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
        </div>
      )}
    </nav>
  );
}
