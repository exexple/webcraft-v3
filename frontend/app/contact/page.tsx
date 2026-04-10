import type { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Webcraft Studio. Book a call or send us a message.',
};

const contactLinks = [
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 88223 22905',
    href: 'tel:+918822322905',
    color: '#00d4ff',
    external: false,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Message Us',
    href: 'https://wa.me/918822322905',
    color: '#64ff6b',
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@webcraftstudio.com',
    href: 'mailto:hello@webcraftstudio.com',
    color: '#a78bfa',
    external: false,
  },
];

export default function ContactPage() {
  return (
    <div className="pt-16" style={{ background: '#0a0e27', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #050818 0%, #0a0e27 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-5" style={{ border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,212,255,0.08)', color: '#00d4ff' }}>
            Let&apos;s Talk
          </span>
          <h1 className="text-5xl font-bold text-white mb-5" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            Start Your{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #64ff6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Project Today
            </span>
          </h1>
          <p className="text-lg" style={{ color: '#64748b' }}>
            Fill in the form below, or reach out directly. We&apos;ll respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>Get in Touch</h2>

            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
                style={{ background: `${item.color}08`, border: `1px solid ${item.color}25` }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: '#475569' }}>{item.label}</div>
                  <div className="text-white text-sm font-medium">{item.value}</div>
                </div>
              </a>
            ))}

            {/* Location */}
            <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(100,116,139,0.15)', border: '1px solid rgba(100,116,139,0.2)' }}>
                <MapPin size={18} style={{ color: '#64748b' }} />
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: '#475569' }}>Location</div>
                <div className="text-white text-sm font-medium">Remote — Worldwide</div>
              </div>
            </div>

            {/* Response time */}
            <div className="p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(100,255,107,0.06))', border: '1px solid rgba(0,212,255,0.15)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Clock size={14} style={{ color: '#00d4ff' }} />
                <div className="text-white font-semibold text-sm">Response Time</div>
              </div>
              <div className="text-xs" style={{ color: '#64748b' }}>We typically respond within 2–4 hours during business hours (IST).</div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
