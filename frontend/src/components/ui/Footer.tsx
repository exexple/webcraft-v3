import Link from 'next/link';

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/case-studies' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      padding: '3rem 0',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.1rem',
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
          }}>
            webcraft<span style={{ color: 'var(--color-accent)' }}>.</span>
          </span>
        </Link>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'color 0.2s',
            }}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', letterSpacing: '0.05em' }}>
          © {year} Webcraft Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
