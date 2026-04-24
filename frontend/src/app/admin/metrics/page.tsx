'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { metricsApi } from '@/lib/api';
import type { SiteMetric } from '@webcraft/shared/types';

export default function AdminMetricsPage() {
  const [metrics, setMetrics] = useState<SiteMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadMetrics();
  }, []);

  async function loadMetrics() {
    try {
      const res = await metricsApi.getAll();
      setMetrics(res || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load metrics');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(id: string, value: string) {
    setUpdating(id);
    try {
      await metricsApi.update(id, value);
      // Optimistic update
      setMetrics((prev) => prev.map((m) => (m.id === id ? { ...m, value } : m)));
    } catch (err) {
      alert('Failed to update metric');
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
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>Site Metrics</h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Update the statistics shown on the homepage</p>
          </div>
        </div>

        <div className="card" style={{ padding: '2.5rem' }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading metrics...</p>
          ) : error ? (
            <p style={{ color: '#ef4444' }}>{error}</p>
          ) : metrics.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No metrics found. Ensure the database is seeded.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {metrics.map((metric) => (
                <div key={metric.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{metric.label}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>ID: {metric.key}</div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input 
                      className="input" 
                      defaultValue={metric.value} 
                      onBlur={(e) => {
                        if (e.target.value !== metric.value) {
                          handleUpdate(metric.id, e.target.value);
                        }
                      }}
                      style={{ flex: 1 }}
                    />
                    {updating === metric.id && <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Saving...</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
