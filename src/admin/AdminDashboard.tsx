import React from 'react';
import {
  FolderGit2,
  Layers,
  Star,
  Users,
  Plus,
  ArrowUpRight,
  FileText,
  Mail,
  CheckCircle,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenCreateProject: () => void;
  onOpenCreateService: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateTab,
  onOpenCreateProject,
  onOpenCreateService,
}) => {
  const { data, updateLeadStatus } = useCms();
  const { projects, services, serviceCategories, reviews, leads, resumes } = data;

  const publishedProjects = projects.filter((p) => p.status === 'Published').length;
  const draftProjects = projects.filter((p) => p.status === 'Draft').length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const activeResume = resumes.find((r) => r.isActive);
  const publishedReviews = reviews.filter((r) => r.status === 'Published').length;
  const publishedServices = services.filter((s) => s.published).length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#003088] to-[#001f5c] text-white p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#F4B820] mb-1">
            Administrative Control Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Karima Moni CMS Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Manage public portfolio content, client leads, reviews, and resume assets in real time.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={onOpenCreateProject}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-[#F4B820] text-[#101828] hover:bg-[#e0a310] rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
          <button
            onClick={onOpenCreateService}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 text-[#F4B820]" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Numerical Metrics Cards (Tabular figures) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Projects */}
        <div
          onClick={() => onNavigateTab('projects')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#003088] cursor-pointer transition-all hover:shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <FolderGit2 className="w-4 h-4 text-[#003088]" />
            <span className="text-[11px] text-slate-500 font-mono">{publishedProjects} Pub</span>
          </div>
          <div className="font-mono text-2xl font-extrabold text-[#101828] tabular-nums">
            {projects.length}
          </div>
          <span className="text-xs font-semibold text-slate-600 block mt-1">Total Projects</span>
        </div>

        {/* Services */}
        <div
          onClick={() => onNavigateTab('services')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#003088] cursor-pointer transition-all hover:shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Layers className="w-4 h-4 text-[#F4B820]" />
            <span className="text-[11px] text-slate-500 font-mono">{serviceCategories.length} Categories</span>
          </div>
          <div className="font-mono text-2xl font-extrabold text-[#101828] tabular-nums">
            {publishedServices}
          </div>
          <span className="text-xs font-semibold text-slate-600 block mt-1">Published Services</span>
        </div>

        {/* Reviews */}
        <div
          onClick={() => onNavigateTab('reviews')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#003088] cursor-pointer transition-all hover:shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Star className="w-4 h-4 text-[#F4B820]" />
            <span className="text-[11px] text-slate-500 font-mono">{publishedReviews} Published</span>
          </div>
          <div className="font-mono text-2xl font-extrabold text-[#101828] tabular-nums">
            {reviews.length}
          </div>
          <span className="text-xs font-semibold text-slate-600 block mt-1">Client Reviews</span>
        </div>

        {/* Leads */}
        <div
          onClick={() => onNavigateTab('leads')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-600 cursor-pointer transition-all hover:shadow-sm relative"
        >
          {newLeads > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-rose-500 animate-ping" />
          )}
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Mail className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-bold text-rose-600 font-mono">{newLeads} New</span>
          </div>
          <div className="font-mono text-2xl font-extrabold text-[#101828] tabular-nums">
            {leads.length}
          </div>
          <span className="text-xs font-semibold text-slate-600 block mt-1">Inbound Leads</span>
        </div>
      </div>

      {/* Main Grid: Recent Inbound Inquiries & Quick Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Inbound Leads */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Project Inquiries</h3>
              <p className="text-xs text-slate-500">Form submissions captured from the public portfolio</p>
            </div>
            <button
              onClick={() => onNavigateTab('leads')}
              className="text-xs font-bold text-[#003088] hover:underline"
            >
              View All ({leads.length}) →
            </button>
          </div>

          {leads.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {leads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{lead.name}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-[#003088] font-semibold">{lead.service}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 font-mono">{lead.budget}</span>
                    </div>
                    <p className="text-slate-600 mt-1 line-clamp-1">
                      {lead.projectDetails}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span>{lead.email}</span>
                      {lead.whatsapp && <span>· WA: {lead.whatsapp}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                      className={`text-[11px] font-bold px-2 py-1 rounded border ${
                        lead.status === 'New'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : lead.status === 'Contacted'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : lead.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 text-xs">
              No inquiries yet. Submissions from the contact form will appear here.
            </div>
          )}
        </div>

        {/* Right Column: CV & System Status */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active CV Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#003088]">
                Active Resume
              </span>
              <button
                onClick={() => onNavigateTab('cv')}
                className="text-xs text-[#003088] font-bold hover:underline"
              >
                Manage
              </button>
            </div>

            {activeResume ? (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{activeResume.version}</span>
                  <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <div className="text-slate-600 truncate">{activeResume.fileName}</div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {activeResume.fileSize} · {activeResume.date}
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400">No active CV configured.</div>
            )}
          </div>

          {/* Quick Navigation Shortcuts */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 font-mono">
              Quick CMS Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigateTab('homepage')}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-left font-medium text-slate-800 transition-colors"
              >
                Homepage Hero
              </button>
              <button
                onClick={() => onNavigateTab('about')}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-left font-medium text-slate-800 transition-colors"
              >
                About & Bio
              </button>
              <button
                onClick={() => onNavigateTab('projects')}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-left font-medium text-slate-800 transition-colors"
              >
                Portfolio
              </button>
              <button
                onClick={() => onNavigateTab('leads')}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-left font-medium text-slate-800 transition-colors"
              >
                Leads
              </button>
              <button
                onClick={() => onNavigateTab('social')}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-left font-medium text-slate-800 transition-colors"
              >
                Social Links
              </button>
              <button
                onClick={() => onNavigateTab('seo')}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-left font-medium text-slate-800 transition-colors"
              >
                SEO Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
