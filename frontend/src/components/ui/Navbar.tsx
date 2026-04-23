'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          transition: 'all 0.4s ease',
          padding: scrolled ? '0.875rem 0' : '1.5rem 0',
        }}
        className={scrolled ? 'nav-blur' : ''}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '-0.03em',
                color: 'var(--color-text)',
              }}
            >
              webcraft<span style={{ color: 'var(--color-accent)' }}>.</span>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
            }}
            className="hide-mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  color: pathname === link.href
                    ? 'var(--color-text)'
                    : 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                }}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 1,
                      background: 'var(--color-accent)',
                    }}
                  />
                )}
              </Link>
            ))}

            <Link href="/contact" className="btn btn-primary" style={{ padding: '0.625rem 1.5rem', fontSize: '0.875rem' }}>
              Start a Project
            </Link>
          </motion.nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text)',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '4px',
            }}
            aria-label="Toggle menu"
          >
            <span style={{
              display: 'block', width: 24, height: 1.5,
              background: 'var(--color-text)',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: menuOpen ? 'rotate(45deg) translateY(4.5px)' : 'none',
            }} />
            <span style={{
              display: 'block', width: 24, height: 1.5,
              background: 'var(--color-text)',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 0.2s ease',
            }} />
            <span style={{
              display: 'block', width: 24, height: 1.5,
              background: 'var(--color-text)',
              transition: 'transform 0.3s ease',
              transform: menuOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'none',
            }} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'var(--color-bg)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.1 }}
              >
                <Link
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    textDecoration: 'none',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Link href="/contact" className="btn btn-primary">
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
