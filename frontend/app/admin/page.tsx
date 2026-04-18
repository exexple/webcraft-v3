'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import LeadsTable from '@/components/admin/LeadsTable';
import { Users, TrendingUp, MessageSquare, CheckCircle, LogOut, Zap } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  phone?: string;
  status: string;
  source: string;
  created_at: string;
}

interface Stats {
  total: number;
  new: number;
  contacted: number;
  converted: number;
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, new: 0, contacted: 0, converted: 0 });
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/admin/login');
      } else {
        setAuthChecked(true);
      }
    });
  }, [router]);

  const fetchLeads = useCallback(async () => {
    if (!authChecked) return;
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();

      // ✅ FORCE refresh if session exists
      let token = session?.access_token;

      if (!token) {
        const { data } = await supabase.auth.refreshSession();
        token = data.session?.access_token;
      }

      console.log("TOKEN:", token); // 🔥 debug

      if (!token) {
        console.error("No token found");
        return;
      }
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch('https://webcraft-v3.onrender.com/api/leads', {
        headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      if (res.ok) {
        const body = await res.json();
        setLeads(body.data || []);
        const total = body.total || 0;
        const newCount = (body.data || []).filter((l: Lead) => l.status === 'new').length;
        const contacted = (body.data || []).filter((l: Lead) => l.status === 'contacted').length;
        const converted = (body.data || []).filter((l: Lead) => l.status === 'converted').length;
        setStats({ total, new: newCount, contacted, converted });
      }
    } catch (e) {
      console.error('Failed to fetch leads', e);
    } finally {
      setLoading(false);
    }
  }, [authChecked]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleStatusUpdate = async (id: string, status: string) => {
    const { data: { session } } = await supabase.auth.getSession();

    let token = session?.access_token;

    if (!token) {
      const { data } = await supabase.auth.refreshSession();
      token = data.session?.access_token;
    }

    if (!token) {
      console.error("No token found");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    await fetch(`${apiUrl}/api/leads/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({ status }),
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-500">Checking authentication...</div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Leads', value: stats.total, icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'New Leads', value: stats.new, icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Contacted', value: stats.contacted, icon: TrendingUp, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'Converted', value: stats.converted, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Admin Navbar */}
      <div className="border-b border-white/10 bg-gray-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-bold text-white">Admin</span>
            <span className="text-gray-600 mx-2">|</span>
            <span className="text-gray-400 text-sm">Lead Management</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(card => (
            <div key={card.label} className="bg-gray-900 border border-white/10 rounded-2xl p-4">
              <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center mb-3`}>
                <card.icon size={18} className={card.color} />
              </div>
              <div className="text-2xl font-bold text-white">{card.value}</div>
              <div className="text-gray-500 text-xs mt-0.5">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Leads Table */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">All Leads</h2>
          <LeadsTable
            leads={leads}
            total={stats.total}
            onStatusUpdate={handleStatusUpdate}
            onRefresh={fetchLeads}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
