import React, { useState } from 'react';
import { Mail, MessageCircle, Trash2, Calendar, DollarSign, Filter, Search, Check, AlertCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { LeadMessage } from '../types';

export const AdminLeadsManager: React.FC = () => {
  const { data, updateLeadStatus, deleteLead } = useCms();
  const { leads } = data;

  const [statusFilter, setStatusFilter] = useState<'All' | LeadMessage['status']>('All');
  const [search, setSearch] = useState('');
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const filteredLeads = leads.filter((l) => {
    if (statusFilter !== 'All' && l.status !== statusFilter) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.service.toLowerCase().includes(q) ||
        l.projectDetails.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Project Leads & Inbound Inquiries</h2>
          <p className="text-xs text-slate-500">
            Real-time client inquiries submitted from the website, stored securely on the database.
          </p>
        </div>

        <span className="text-xs font-mono font-bold bg-blue-50 text-[#003088] px-3 py-1.5 rounded-lg border border-blue-200 self-start sm:self-auto">
          {leads.length} Total Submissions
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {(['All', 'New', 'Contacted', 'In Progress', 'Completed', 'Archived'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                statusFilter === st
                  ? 'bg-[#003088] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:border-[#003088]"
          />
        </div>
      </div>

      {/* Leads List / Responsive Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        {filteredLeads.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredLeads.map((lead) => {
              const rawWa = lead.whatsapp.replace(/[^0-9]/g, '');
              const cleanWa = rawWa.startsWith('880')
                ? rawWa
                : rawWa.startsWith('0')
                ? `880${rawWa.slice(1)}`
                : `880${rawWa}`;

              return (
                <div key={lead.id} className="p-4 sm:p-6 hover:bg-slate-50/60 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Lead Info */}
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 truncate">{lead.name}</h3>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs font-semibold text-[#003088] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                          {lead.service}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {lead.budget}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {lead.createdAt.slice(0, 10)}
                        </span>
                        <span>
                          Email:{' '}
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-[#003088] font-medium hover:underline"
                          >
                            {lead.email}
                          </a>
                        </span>
                        {lead.whatsapp && (
                          <span>
                            WhatsApp:{' '}
                            <span className="font-mono text-slate-800">{lead.whatsapp}</span>
                          </span>
                        )}
                      </div>

                      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                        <span className="font-bold text-slate-900 block mb-1">Project Details:</span>
                        {lead.projectDetails}
                      </div>

                      {lead.notes && (
                        <div className="text-[11px] text-slate-500 italic">
                          Internal Note: {lead.notes}
                        </div>
                      )}
                    </div>

                    {/* Actions Panel */}
                    <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                      {/* Status Selector */}
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-colors ${
                          lead.status === 'New'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : lead.status === 'Contacted'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : lead.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="New">● New</option>
                        <option value="Contacted">● Contacted</option>
                        <option value="In Progress">● In Progress</option>
                        <option value="Completed">● Completed</option>
                        <option value="Archived">● Archived</option>
                      </select>

                      {/* Communication Actions */}
                      <div className="flex items-center gap-1.5">
                        {lead.whatsapp && (
                          <a
                            href={`https://wa.me/${cleanWa}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                            title="Chat on WhatsApp"
                            aria-label="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        )}

                        <a
                          href={`mailto:${lead.email}?subject=Regarding Your Project Request: ${lead.service}`}
                          className="p-2 rounded-lg bg-blue-50 text-[#003088] hover:bg-blue-100 transition-colors"
                          title="Reply via Email"
                          aria-label="Reply via Email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>

                        {pendingDeleteId === lead.id ? (
                          <div className="flex items-center gap-1 bg-rose-50 p-1 rounded border border-rose-200 animate-in fade-in">
                            <button
                              onClick={() => {
                                deleteLead(lead.id);
                                setPendingDeleteId(null);
                              }}
                              className="px-2 py-1 text-[11px] font-bold text-white bg-rose-600 rounded hover:bg-rose-700"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setPendingDeleteId(null)}
                              className="px-1.5 py-1 text-[11px] text-slate-600 hover:text-slate-900"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setPendingDeleteId(lead.id)}
                            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Lead"
                            aria-label="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <Mail className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No lead submissions found</h3>
            <p className="text-xs text-slate-400 mt-1">
              {search ? 'Try clearing the search query.' : 'New submissions from the contact form will appear here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
