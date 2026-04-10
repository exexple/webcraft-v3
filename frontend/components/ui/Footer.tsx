'use client';
import Link from 'next/link';
import { Zap, Globe, Link2, GitFork, Share2, Mail } from 'lucide-react';

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
  { icon: Link2, href: '#', label: 'LinkedIn' },
  { icon: GitFork, href: '#', label: 'GitHub' },
  { icon: Share2, href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#050818', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Top gradient line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', boxShadow: '0 0 15px rgba(0,212,255,0.3)' }}>
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg text-white" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
                Webcraft<span style={{ color: '#00d4ff' }}>Studio</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: '#64748b' }}>
              We build high-converting websites and digital experiences for modern brands worldwide.
            </p>
            {/* Contact info */}
            <div className="space-y-2 mb-6">
              <a href="tel:+918822322905" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: '#64748b' }}>
                <span style={{ color: '#00d4ff' }}>📞</span>
                +91 88223 22905
              </a>
              <a href="mailto:hello@webcraftstudio.com" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: '#64748b' }}>
                <span style={{ color: '#00d4ff' }}>✉️</span>
                hello@webcraftstudio.com
              </a>
            </div>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#00d4ff';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.4)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#64748b';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-5">{title}</h3>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: '#64748b' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-sm" style={{ color: '#475569' }}>
            © {new Date().getFullYear()} Webcraft Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm" style={{ color: '#475569' }}>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
