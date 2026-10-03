import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle, X, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { CaseStudy, ProjectCategory, ContentStatus } from '../types';

export const AdminCaseStudiesManager: React.FC = () => {
  const { data, addCaseStudy, updateCaseStudy, deleteCaseStudy } = useCms();
  const { caseStudies } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CaseStudy | null>(null);

  const [form, setForm] = useState({
    title: '',
    client: '',
    category: 'Performance Marketing' as ProjectCategory,
    service: 'Facebook Ads',
    thumbnail: '/src/assets/images/marketing_campaign_showcase_1790992154996.jpg',
    overview: '',
    challenge: '',
    goal: '',
    strategy: '',
    execution: '',
    result: '',
    finalOutcome: '',
    featured: true,
    status: 'Published' as ContentStatus,
    date: 'March 2026',
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setForm({
      title: '',
      client: '',
      category: 'Performance Marketing',
      service: 'Facebook & Instagram Ads',
      thumbnail: '/src/assets/images/marketing_campaign_showcase_1790992154996.jpg',
      overview: '',
      challenge: '',
      goal: '',
      strategy: '',
      execution: '',
      result: 'Campaign delivered consistent qualified traffic without fabricated metrics.',
      finalOutcome: '',
      featured: true,
      status: 'Published',
      date: 'March 2026',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cs: CaseStudy) => {
    setEditingItem(cs);
    setForm({
      title: cs.title,
      client: cs.client,
      category: cs.category,
      service: cs.service,
      thumbnail: cs.thumbnail,
      overview: cs.overview,
      challenge: cs.challenge,
      goal: cs.goal,
      strategy: cs.strategy,
      execution: cs.execution,
      result: cs.result,
      finalOutcome: cs.finalOutcome,
      featured: cs.featured,
      status: cs.status,
      date: cs.date,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateCaseStudy(editingItem.id, {
        ...form,
      });
    } else {
      addCaseStudy({
        ...form,
        order: caseStudies.length + 1,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Case Studies CMS (8-Step Framework)</h2>
          <p className="text-xs text-slate-500">
            Publish structured case studies detailing Overview, Challenge, Goal, Strategy, Execution, Results, and Final Outcome.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4 text-[#F4B820]" />
          <span>Add Case Study</span>
        </button>
      </div>

      <div className="space-y-4">
        {caseStudies.map((cs) => (
          <div
            key={cs.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={cs.thumbnail}
                alt=""
                className="w-16 h-12 rounded object-cover bg-slate-100 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm">{cs.title}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      cs.status === 'Published'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {cs.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Client: {cs.client} · Category: {cs.category} · {cs.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenEdit(cs)}
                className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 hover:text-[#003088]"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete case study "${cs.title}"?`)) {
                    deleteCaseStudy(cs.id);
                  }
                }}
                className="p-1.5 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingItem ? `Edit: ${editingItem.title}` : 'Add 8-Step Case Study'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Client *</label>
                  <input
                    type="text"
                    required
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  >
                    <option value="Performance Marketing">Performance Marketing</option>
                    <option value="Creative Content">Creative Content</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service</label>
                  <input
                    type="text"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Thumbnail URL</label>
                  <input
                    type="text"
                    value={form.thumbnail}
                    onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#003088] mb-1">01 Project Overview *</label>
                <textarea
                  rows={2}
                  required
                  value={form.overview}
                  onChange={(e) => setForm({ ...form, overview: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-rose-800 mb-1">02 Challenge *</label>
                  <textarea
                    rows={2}
                    required
                    value={form.challenge}
                    onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-800 mb-1">03 Goal *</label>
                  <textarea
                    rows={2}
                    required
                    value={form.goal}
                    onChange={(e) => setForm({ ...form, goal: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#003088] mb-1">04 Strategy *</label>
                  <textarea
                    rows={2}
                    required
                    value={form.strategy}
                    onChange={(e) => setForm({ ...form, strategy: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">05 Execution *</label>
                  <textarea
                    rows={2}
                    required
                    value={form.execution}
                    onChange={(e) => setForm({ ...form, execution: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-800 mb-1">
                  06 Result (Honest & Transparent) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.result}
                  onChange={(e) => setForm({ ...form, result: e.target.value })}
                  placeholder="State actual achievements or 'Result data will be added upon completion'..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#003088] mb-1">07 Final Outcome *</label>
                <textarea
                  rows={2}
                  required
                  value={form.finalOutcome}
                  onChange={(e) => setForm({ ...form, finalOutcome: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-[#003088] rounded-md hover:bg-[#00205c]"
                  >
                    Save Case Study
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
