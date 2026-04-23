'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { leadsApi } from '@/lib/api';
import { useAnalytics } from '@/hooks/useAnalytics';

const SOURCES = ['Google', 'Referral', 'LinkedIn', 'Twitter / X', 'Other'];
const BUDGETS = ['< $3,000', '$3,000–$8,000', '$8,000–$20,000', '$20,000+', 'Let\'s discuss'];

export default function ContactPage() {
  const { trackCtaClick } = useAnalytics();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', source: '', budget: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      await leadsApi.create({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        message: `Budget: ${form.budget}\n\n${form.message}`,
        source: form.source || 'contact_form',
      });
      
      trackCtaClick('submit_contact_form');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '', source: '', budget: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '6rem', alignItems: 'start' }}>
          {/* Left */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ height: 1, width: 48, background: 'var(--color-accent)' }} />
              <span className="label">Get In Touch</span>
            </div>
            <h1 className="display-3" style={{ marginBottom: '1.5rem' }}>
              Let&apos;s start something<br />
              <span className="text-gradient">remarkable.</span>
            </h1>
            <p className="body-lg" style={{ marginBottom: '3rem' }}>
              Tell us about your project. We respond within 24 hours with a no-obligation assessment.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: '✉', label: 'Email', value: 'hello@webcraftstudio.com' },
                { icon: '⏱', label: 'Response Time', value: 'Within 24 hours' },
                { icon: '🌍', label: 'We work with', value: 'US, UK, UAE, India & beyond' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-surface)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>{item.icon}</div>
                  <div>
                    <div className="label" style={{ marginBottom: '0.15rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="card" style={{ padding: '2.5rem' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✨</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', marginBottom: '1rem' }}>Message received!</h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  We&apos;ll review your project details and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>Name *</label>
                    <input className="input" required placeholder="Your name" value={form.name} onChange={update('name')} />
                  </div>
                  <div>
                    <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>Email *</label>
                    <input className="input" type="email" required placeholder="you@company.com" value={form.email} onChange={update('email')} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>Phone</label>
                    <input className="input" placeholder="+1 (555) 000-0000" value={form.phone} onChange={update('phone')} />
                  </div>
                  <div>
                    <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>Budget</label>
                    <select className="input" value={form.budget} onChange={update('budget')} style={{ cursor: 'pointer' }}>
                      <option value="">Select budget range</option>
                      {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>How did you hear about us?</label>
                  <select className="input" value={form.source} onChange={update('source')} style={{ cursor: 'pointer' }}>
                    <option value="">Select source</option>
                    {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>Tell us about your project *</label>
                  <textarea className="input" required placeholder="Describe your project, goals, and timeline..." value={form.message} onChange={update('message')} style={{ minHeight: 140 }} />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === 'sending'}
                  style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem', opacity: status === 'sending' ? 0.7 : 1 }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message →'}
                </button>

                {status === 'error' && (
                  <p style={{ textAlign: 'center', color: '#ef4444', fontSize: '0.875rem' }}>
                    Something went wrong. Please email us directly at hello@webcraftstudio.com
                  </p>
                )}

                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>
                  No spam. We only use your info to respond to your inquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
