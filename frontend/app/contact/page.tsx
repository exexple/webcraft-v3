import type { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Webcraft Studio. Book a call or send us a message.',
};

export default function ContactPage() {
  return (
    <div style={{ background: '#0a0e27', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative py-28 text-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(0,212,255,0.1) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-2xl mx-auto px-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,212,255,0.08)', color: '#00d4ff' }}
          >
            Let&apos;s Talk
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Start Your{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #64ff6b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Project Today
            </span>
          </h1>
          <p className="text-lg" style={{ color: '#b0b5c3' }}>
            Fill in the form below, or reach out directly. We&apos;ll respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-white mb-6">Get in Touch</h2>

            <a
              href="tel:+918822322905"
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: 'rgba(26, 31, 58, 0.6)', border: '1px solid rgba(0,212,255,0.15)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.25)' }}>
                <Phone size={18} style={{ color: '#00d4ff' }} />
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: '#b0b5c3' }}>Call Us</div>
                <div className="text-white text-sm font-medium">+91 88223 22905</div>
              </div>
            </a>

            <a
              href="https://wa.me/918822322905"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: 'rgba(26, 31, 58, 0.6)', border: '1px solid rgba(100,255,107,0.15)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(100,255,107,0.12)', border: '1px solid rgba(100,255,107,0.25)' }}>
                <MessageCircle size={18} style={{ color: '#64ff6b' }} />
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: '#b0b5c3' }}>WhatsApp</div>
                <div className="text-white text-sm font-medium">Message Us Instantly</div>
              </div>
            </a>

            <a
              href="mailto:hello@webcraftstudio.com"
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: 'rgba(26, 31, 58, 0.6)', border: '1px solid rgba(0,212,255,0.15)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.25)' }}>
                <Mail size={18} style={{ color: '#00d4ff' }} />
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: '#b0b5c3' }}>Email</div>
                <div className="text-white text-sm font-medium">hello@webcraftstudio.com</div>
              </div>
            </a>

            <div
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: 'rgba(26, 31, 58, 0.6)', border: '1px solid rgba(26,31,58,1)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(26,31,58,0.8)', border: '1px solid rgba(26,31,58,1)' }}>
                <MapPin size={18} style={{ color: '#b0b5c3' }} />
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: '#b0b5c3' }}>Location</div>
                <div className="text-white text-sm font-medium">Remote — Worldwide</div>
              </div>
            </div>

            {/* Response Time */}
            <div
              className="p-4 rounded-xl"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(100,255,107,0.06) 100%)', border: '1px solid rgba(0,212,255,0.15)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Clock size={14} style={{ color: '#00d4ff' }} />
                <div className="text-white font-semibold text-sm">Response Time</div>
              </div>
              <div className="text-xs" style={{ color: '#b0b5c3' }}>
                We typically respond within 2-4 hours during business hours (IST).
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className="lg:col-span-3 rounded-2xl p-8"
            style={{ background: 'rgba(26, 31, 58, 0.6)', border: '1px solid rgba(26,31,58,1)' }}
          >
            <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
