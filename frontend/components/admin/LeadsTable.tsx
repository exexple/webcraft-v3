'use client';
import { useState } from 'react';
import { formatDate, statusColors, cn } from '@/lib/utils';
import { Search, Filter, Download, ChevronRight, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';

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

interface LeadsTableProps {
  leads: Lead[];
  total: number;
  onStatusUpdate: (id: string, status: string) => void;
  onRefresh: () => void;
  loading?: boolean;
}

const statuses = ['new', 'contacted', 'qualified', 'closed', 'converted'];

export default function LeadsTable({ leads, total, onStatusUpdate, onRefresh, loading }: LeadsTableProps) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filtered = leads.filter(lead => {
    const matchesSearch = search === '' ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === '' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Status', 'Source', 'Date'];
    const rows = filtered.map(l => [l.name, l.email, l.phone || '', l.status, l.source, formatDate(l.created_at)]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-gray-900 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-gray-900 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
          >
            <option value="">All Status</option>
            {statuses.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
        <button onClick={onRefresh} className="p-2.5 rounded-xl bg-gray-900 border border-white/10 text-gray-400 hover:text-white transition-colors">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 border border-white/10 text-gray-400 hover:text-white text-sm transition-colors">
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-gray-950/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Name</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3 hidden md:table-cell">Email</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3 hidden lg:table-cell">Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-12 text-sm">
                    {loading ? 'Loading...' : 'No leads found'}
                  </td>
                </tr>
              ) : (
                filtered.map(lead => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-white text-sm">{lead.name}</div>
                      <div className="text-gray-500 text-xs md:hidden">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-gray-400 text-sm">{lead.email}</span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status}
                        onChange={e => onStatusUpdate(lead.id, e.target.value)}
                        className={cn(
                          'text-xs font-medium px-2.5 py-1.5 rounded-full border cursor-pointer bg-transparent focus:outline-none',
                          statusColors[lead.status] || 'bg-gray-700 text-gray-300'
                        )}
                      >
                        {statuses.map(s => (
                          <option key={s} value={s} className="bg-gray-900 text-white">
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-gray-500 text-sm">{formatDate(lead.created_at)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        View <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-white/10 text-xs text-gray-500">
          Showing {filtered.length} of {total} leads
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-white font-bold text-lg">{selectedLead.name}</h3>
                <p className="text-gray-400 text-sm">{selectedLead.email}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-gray-500 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase font-medium">Message</label>
                <p className="text-gray-300 text-sm mt-1 bg-gray-800 rounded-lg p-3">{selectedLead.message}</p>
              </div>
              {selectedLead.phone && (
                <div>
                  <label className="text-xs text-gray-500 uppercase font-medium">Phone</label>
                  <p className="text-gray-300 text-sm mt-1">{selectedLead.phone}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase font-medium">Status</label>
                  <span className={cn('block mt-1 text-xs font-medium px-2.5 py-1.5 rounded-full border w-fit', statusColors[selectedLead.status])}>
                    {selectedLead.status}
                  </span>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase font-medium">Date</label>
                  <p className="text-gray-300 text-sm mt-1">{formatDate(selectedLead.created_at)}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setSelectedLead(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
