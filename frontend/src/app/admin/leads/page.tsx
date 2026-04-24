'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { leadsApi } from '@/lib/api';
import type { Lead } from '@webcraft/shared/types';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    try {
      const res = await leadsApi.getAll();
      setLeads(res.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      await leadsApi.updateStatus(id, status);
      await loadLeads();
    } catch (err) {
      alert('Failed to update status');
    }
  }

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <button onClick={() => router.push('/admin/dashboard')} className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>← Back</button>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>Leads</h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Manage contact form submissions</p>
          </div>
        </div>

        <div className="card" style={{ padding: '2.5rem' }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading leads...</p>
          ) : error ? (
            <p style={{ color: '#ef4444' }}>{error}</p>
          ) : leads.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No leads found.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    <th style={{ padding: '1rem' }}>Name</th>
                    <th style={{ padding: '1rem' }}>Email</th>
                    <th style={{ padding: '1rem' }}>Company</th>
                    <th style={{ padding: '1rem' }}>Budget</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} style={{ borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>
                      <td style={{ padding: '1rem' }}>{lead.name}</td>
                      <td style={{ padding: '1rem' }}>{lead.email}</td>
                      <td style={{ padding: '1rem' }}>{lead.company || '-'}</td>
                      <td style={{ padding: '1rem' }}>{lead.budget || '-'}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '1rem', 
                          fontSize: '0.75rem',
                          background: lead.status === 'new' ? 'rgba(59,130,246,0.1)' : lead.status === 'contacted' ? 'rgba(234,179,8,0.1)' : 'rgba(34,197,94,0.1)',
                          color: lead.status === 'new' ? '#3b82f6' : lead.status === 'contacted' ? '#eab308' : '#22c55e'
                        }}>
                          {lead.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => updateStatus(lead.id, 'contacted')} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Mark Contacted</button>
                        <button onClick={() => updateStatus(lead.id, 'qualified')} className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Qualify</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
