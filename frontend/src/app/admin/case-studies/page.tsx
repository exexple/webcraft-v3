'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { caseStudiesApi } from '@/lib/api';

type Field = { label: string; key: string; type?: string; required?: boolean; multiline?: boolean; options?: string[] };

const FIELDS: Field[] = [
  { label: 'Title', key: 'title', required: true },
  { label: 'Slug (URL)', key: 'slug', required: true },
  { label: 'Client Name', key: 'client', required: true },
  { label: 'Industry', key: 'industry', required: true },
  { label: 'Tags (comma-separated)', key: 'tags' },
  { label: 'The Problem', key: 'problem', required: true, multiline: true },
  { label: 'Our Solution', key: 'solution', required: true, multiline: true },
  { label: 'The Result', key: 'result', required: true, multiline: true },
  { label: 'Status', key: 'status', options: ['draft', 'published'] },
];

export default function AdminCaseStudiesPage() {
  const [form, setForm] = useState<Record<string, string>>({ status: 'draft' });
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      // 1. Create case study via typed API
      const caseStudy = await caseStudiesApi.create({
        slug: form.slug,
        title: form.title,
        client: form.client,
        industry: form.industry,
        problem: form.problem,
        solution: form.solution,
        result: form.result,
        status: form.status as any,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()) : [],
      });

      // 2. Upload cover image if provided
      if (cover && caseStudy.id) {
        await caseStudiesApi.uploadCover(caseStudy.id, cover);
      }

      setMsg('✅ Case study created successfully!');
      setForm({ status: 'draft' });
      setCover(null);
    } catch (err) {
      setMsg(`❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <button onClick={() => router.push('/admin/dashboard')} className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>← Back</button>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>New Case Study</h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Fill in all fields and upload a cover image</p>
          </div>
        </div>

        <div className="card" style={{ padding: '2.5rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>{f.label}{f.required && ' *'}</label>
                {f.options ? (
                  <select className="input" value={form[f.key] || ''} onChange={update(f.key)} style={{ cursor: 'pointer' }}>
                    {f.options.map((o) => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
                  </select>
                ) : f.multiline ? (
                  <textarea className="input" required={f.required} placeholder={`Write the ${f.label.toLowerCase()} here...`} value={form[f.key] || ''} onChange={update(f.key)} style={{ minHeight: 120 }} />
                ) : (
                  <input className="input" required={f.required} value={form[f.key] || ''} onChange={update(f.key)} placeholder={f.label} />
                )}
              </div>
            ))}

            {/* Cover image upload */}
            <div>
              <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>Cover Image</label>
              <div style={{
                border: '1px dashed var(--color-border-hover)',
                borderRadius: '0.75rem',
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease',
              }}
                onClick={() => document.getElementById('cover-input')?.click()}
              >
                {cover ? (
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-accent)' }}>📎 {cover.name}</p>
                ) : (
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-dim)' }}>Click to upload cover image (JPEG, PNG, WebP — max 10MB)</p>
                )}
              </div>
              <input id="cover-input" type="file" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={(e) => setCover(e.target.files?.[0] || null)} />
            </div>

            {msg && (
              <div style={{
                padding: '1rem 1.25rem',
                borderRadius: '0.75rem',
                background: msg.startsWith('✅') ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                border: `1px solid ${msg.startsWith('✅') ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                fontSize: '0.875rem',
              }}>
                {msg}
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? 'Creating...' : 'Create Case Study →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
