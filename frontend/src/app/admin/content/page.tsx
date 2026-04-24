'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { contentBlocksApi } from '@/lib/api';
import type { ContentBlock } from '@webcraft/shared/types';

export default function AdminContentPage() {
  const [pageSelection, setPageSelection] = useState('home');
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadBlocks(pageSelection);
  }, [pageSelection]);

  async function loadBlocks(page: string) {
    setLoading(true);
    try {
      const res = await contentBlocksApi.getByPage(page);
      setBlocks(res || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content blocks');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(id: string, newValue: string) {
    setUpdating(id);
    try {
      await contentBlocksApi.update(id, { value: newValue });
      setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, value: newValue } : b)));
    } catch (err) {
      alert('Failed to update content block');
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <button onClick={() => router.push('/admin/dashboard')} className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>← Back</button>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>Content Blocks</h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Edit text content across the website</p>
          </div>
        </div>

        <div className="card" style={{ padding: '2.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>Select Page to Edit</label>
            <select 
              className="input" 
              value={pageSelection} 
              onChange={(e) => setPageSelection(e.target.value)}
              style={{ cursor: 'pointer', maxWidth: '300px' }}
            >
              <option value="home">Homepage</option>
              <option value="about">About Page</option>
              <option value="services">Services Page</option>
              <option value="contact">Contact Page</option>
            </select>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading blocks...</p>
          ) : error ? (
            <p style={{ color: '#ef4444' }}>{error}</p>
          ) : blocks.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No content blocks found for this page.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {blocks.map((block) => (
                <div key={block.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="label" style={{ fontWeight: 600 }}>{block.key}</label>
                    {updating === block.id && <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Saving...</span>}
                  </div>
                  <textarea 
                    className="input" 
                    defaultValue={block.value}
                    onBlur={(e) => {
                      if (e.target.value !== block.value) {
                        handleUpdate(block.id, e.target.value);
                      }
                    }}
                    style={{ minHeight: '100px', fontFamily: 'inherit' }}
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Type: {block.type}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
