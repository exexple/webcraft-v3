'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { testimonialsApi } from '@/lib/api';
import type { Testimonial } from '@webcraft/shared/types';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ client_name: '', client_company: '', client_title: '', quote: '', rating: '5' });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    try {
      const res = await testimonialsApi.getAll();
      setTestimonials(res || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  }

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMsg('');

    try {
      await testimonialsApi.create({
        client_name: form.client_name,
        client_company: form.client_company,
        client_title: form.client_title || 'Client',
        quote: form.quote,
        rating: parseInt(form.rating, 10),
      });

      setMsg('✅ Testimonial created successfully!');
      setForm({ client_name: '', client_company: '', client_title: '', quote: '', rating: '5' });
      await loadTestimonials();
    } catch (err) {
      setMsg(`❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <button onClick={() => router.push('/admin/dashboard')} className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>← Back</button>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>Testimonials</h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Manage client quotes and ratings</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem', height: 'fit-content' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>Add New Testimonial</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>Client Name *</label>
                <input className="input" required value={form.client_name} onChange={update('client_name')} placeholder="Jane Doe" />
              </div>
              <div>
                <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>Company</label>
                <input className="input" value={form.client_company} onChange={update('client_company')} placeholder="Acme Corp" />
              </div>
              <div>
                <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
                <input className="input" value={form.client_title} onChange={update('client_title')} placeholder="CEO" />
              </div>
              <div>
                <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>Rating *</label>
                <select className="input" value={form.rating} onChange={update('rating')} style={{ cursor: 'pointer' }}>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              <div>
                <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>Quote *</label>
                <textarea className="input" required value={form.quote} onChange={update('quote')} placeholder="Amazing team to work with..." style={{ minHeight: 100 }} />
              </div>

              {msg && (
                <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: msg.startsWith('✅') ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: msg.startsWith('✅') ? '#22c55e' : '#ef4444', fontSize: '0.875rem' }}>
                  {msg}
                </div>
              )}

              <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%', justifyContent: 'center' }}>
                {submitting ? 'Adding...' : 'Add Testimonial'}
              </button>
            </form>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>Existing Testimonials</h2>
            {loading ? (
              <p style={{ color: 'var(--color-text-muted)' }}>Loading testimonials...</p>
            ) : error ? (
              <p style={{ color: '#ef4444' }}>{error}</p>
            ) : testimonials.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)' }}>No testimonials found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {testimonials.map((t) => (
                  <div key={t.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '0.95rem' }}>{t.client_name} <span style={{ color: 'var(--color-text-muted)', fontWeight: 'normal', fontSize: '0.85rem' }}>{t.client_company && `— ${t.client_title ? `${t.client_title}, ` : ''}${t.client_company}`}</span></strong>
                      <span style={{ color: '#f59e0b', fontSize: '0.875rem' }}>{'★'.repeat(t.rating || 5)}{'☆'.repeat(5 - (t.rating || 5))}</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>"{t.quote}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
