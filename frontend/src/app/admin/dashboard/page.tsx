'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/verify')
      .then(res => {
        if (!res.ok) window.location.href = '/admin';
        else setToken('valid');
      })
      .catch(() => window.location.href = '/admin');
  }, []);

  async function logout() {
    try {
      const { authApi } = await import('@/lib/api');
      await authApi.logout();
    } finally {
      window.location.href = '/admin';
    }
  }

  if (!token) return null;

  const panels = [
    { href: '/admin/case-studies', icon: '📁', title: 'Case Studies', desc: 'Create and publish case studies with images and metrics' },
    { href: '/admin/testimonials', icon: '💬', title: 'Testimonials', desc: 'Add client quotes and star ratings' },
    { href: '/admin/metrics', icon: '📊', title: 'Site Metrics', desc: 'Update the stats shown on the homepage' },
    { href: '/admin/content', icon: '✏️', title: 'Content Blocks', desc: 'Edit headlines, taglines, and text across all pages' },
    { href: '/admin/leads', icon: '📬', title: 'Leads', desc: 'View and manage contact form submissions' },
  ];

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>Admin Panel</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Manage all website content without touching any code.</p>
          </div>
          <button onClick={logout} className="btn btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>Sign out</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {panels.map((p) => (
            <Link key={p.href} href={p.href} style={{ textDecoration: 'none' }} data-cursor="Open">
              <div className="card" style={{ padding: '2rem', cursor: 'none' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{p.icon}</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{p.title}</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
