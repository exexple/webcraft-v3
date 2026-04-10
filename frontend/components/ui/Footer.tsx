'use client';
import Link from 'next/link';
import { Zap, Globe, Link2, GitBranch, Share2, Mail, Phone, MessageCircle } from 'lucide-react';

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
  { icon: GitBranch, href: '#', label: 'GitHub' },
  { icon: Share2, href: '#', label: 'Instagram' },
];

const contactItems = [
  { icon: Phone, label: '+91 88223 22905', href: 'tel:+918822322905' },
  { icon: MessageCircle, label: 'WhatsApp Us', href: 'https://wa.me/918822322905' },
  { icon: Mail, label: 'hello@webcraftstudio.com', href: 'mailto:hello@webcraftstudio.com' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0a0e27', borderTop: '1px solid rgba(26, 31, 58, 0.8)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)',
                  boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
                }}
              >
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Webcraft<span style={{ color: '#00d4ff' }}>Studio</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: '#b0b5c3' }}>
              We build high-converting websites and digital experiences for modern brands worldwide.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-6">
              {contactItems.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 text-sm transition-colors"
                  style={{ color: '#b0b5c3' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#00d4ff')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#b0b5c3')}
                >
                  <Icon size={14} style={{ color: '#00d4ff' }} />
                  {label}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    border: '1px solid rgba(26, 31, 58, 1)',
                    color: '#b0b5c3',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#00d4ff';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.4)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#b0b5c3';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26, 31, 58, 1)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <Icon size={15} />
                </a>
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
                      className="text-sm transition-colors"
                      style={{ color: '#b0b5c3' }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => ((e.currentTarget as HTMLElement).style.color = '#00d4ff')}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => ((e.currentTarget as HTMLElement).style.color = '#b0b5c3')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA column */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Start a Project</h3>
            <p className="text-sm mb-4" style={{ color: '#b0b5c3' }}>
              Ready to build something amazing?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)',
                color: '#0a0e27',
                boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
              }}
            >
              Get In Touch
            </Link>
          </div>
        </div>

        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(26, 31, 58, 0.8)' }}
        >
          <p className="text-sm" style={{ color: '#b0b5c3' }}>
            © {new Date().getFullYear()} Webcraft Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm" style={{ color: '#b0b5c3' }}>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
