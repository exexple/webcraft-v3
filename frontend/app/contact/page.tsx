import type { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Webcraft Studio. Book a call or send us a message.',
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <div className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
              Let&apos;s Talk
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Start Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Project Today
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Fill in the form below, or reach out directly. We&apos;ll respond within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <a
                    href="tel:+918822322905"
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-900 border border-white/10 hover:border-cyan-500/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Call Us</div>
                      <div className="text-white text-sm font-medium">+91 88223 22905</div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/918822322905"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-900 border border-white/10 hover:border-green-500/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500/20">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">WhatsApp</div>
                      <div className="text-white text-sm font-medium">Message Us</div>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@webcraftstudio.com"
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-900 border border-white/10 hover:border-violet-500/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Email</div>
                      <div className="text-white text-sm font-medium">hello@webcraftstudio.com</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Location</div>
                      <div className="text-white text-sm font-medium">Remote — Worldwide</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-white/10">
                <div className="text-white font-semibold text-sm mb-1">Response Time</div>
                <div className="text-gray-400 text-xs">We typically respond within 2-4 hours during business hours (IST).</div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-gray-900 border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
