import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  Star,
  CheckCircle,
  X,
  Search,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { PortfolioProject, ProjectCategory, ContentStatus } from '../types';

export const AdminPortfolioManager: React.FC = () => {
  const { data, addProject, updateProject, deleteProject, duplicateProject } = useCms();
  const { projects } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | ContentStatus>('All');
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    client: '',
    category: 'Performance Marketing' as ProjectCategory,
    subCategory: '',
    service: 'Facebook Ads',
    date: '2026',
    thumbnail: '/src/assets/images/marketing_campaign_showcase_1790992154996.jpg',
    shortDescription: '',
    description: '',
    role: 'Digital Marketing Specialist',
    toolsText: 'Meta Business Suite, Canva, Google Ads',
    challenge: '',
    goal: '',
    strategy: '',
    workDoneText: '',
    result: '',
    isCaseStudy: false,
    featured: false,
    status: 'Published' as ContentStatus,
  });

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      name: '',
      client: '',
      category: 'Performance Marketing',
      subCategory: 'Paid Ads',
      service: 'Facebook Ads',
      date: 'March 2026',
      thumbnail: '/src/assets/images/marketing_campaign_showcase_1790992154996.jpg',
      shortDescription: '',
      description: '',
      role: 'Lead Digital Marketing Specialist',
      toolsText: 'Meta Ads Manager, Canva Pro',
      challenge: '',
      goal: '',
      strategy: '',
      workDoneText: 'Audience Research\nCreative Testing\nBudget Optimization',
      result: 'Campaign completed successfully with verified milestone tracking.',
      isCaseStudy: false,
      featured: false,
      status: 'Published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      client: project.client,
      category: project.category,
      subCategory: project.subCategory,
      service: project.service,
      date: project.date,
      thumbnail: project.thumbnail,
      shortDescription: project.shortDescription,
      description: project.description,
      role: project.role,
      toolsText: project.toolsUsed.join(', '),
      challenge: project.challenge,
      goal: project.goal,
      strategy: project.strategy,
      workDoneText: project.workDone.join('\n'),
      result: project.result,
      isCaseStudy: project.isCaseStudy || false,
      featured: project.featured,
      status: project.status,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const toolsUsed = formData.toolsText.split(',').map((s) => s.trim()).filter(Boolean);
    const workDone = formData.workDoneText.split('\n').map((s) => s.trim()).filter(Boolean);

    if (editingProject) {
      updateProject(editingProject.id, {
        name: formData.name,
        client: formData.client,
        category: formData.category,
        subCategory: formData.subCategory,
        service: formData.service,
        date: formData.date,
        thumbnail: formData.thumbnail,
        shortDescription: formData.shortDescription,
        description: formData.description,
        role: formData.role,
        toolsUsed,
        challenge: formData.challenge,
        goal: formData.goal,
        strategy: formData.strategy,
        workDone,
        result: formData.result,
        isCaseStudy: formData.isCaseStudy,
        featured: formData.featured,
        status: formData.status,
      });
    } else {
      addProject({
        name: formData.name,
        client: formData.client,
        category: formData.category,
        subCategory: formData.subCategory,
        service: formData.service,
        date: formData.date,
        thumbnail: formData.thumbnail,
        gallery: [formData.thumbnail],
        shortDescription: formData.shortDescription,
        description: formData.description,
        role: formData.role,
        toolsUsed,
        challenge: formData.challenge,
        goal: formData.goal,
        strategy: formData.strategy,
        workDone,
        result: formData.result,
        isCaseStudy: formData.isCaseStudy,
        featured: formData.featured,
        status: formData.status,
        order: projects.length + 1,
      });
    }
    setIsModalOpen(false);
  };

  const filteredProjects = projects.filter((p) => {
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.service.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Portfolio Projects CMS</h2>
          <p className="text-xs text-slate-500">
            Create, edit, duplicate, and manage case details for all creative & marketing projects.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4 text-[#F4B820]" />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          {(['All', 'Published', 'Draft', 'Archived'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                statusFilter === st
                  ? 'bg-[#003088] text-white'
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
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Project</th>
              <th className="py-3 px-4">Category / Service</th>
              <th className="py-3 px-4">Client</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Featured</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProjects.map((project) => (
              <tr key={project.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={project.thumbnail}
                      alt=""
                      className="w-12 h-9 object-cover rounded bg-slate-100 shrink-0"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">{project.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{project.date}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="font-semibold text-[#003088]">{project.category}</span>
                  <span className="text-slate-400 block text-[11px]">{project.service}</span>
                </td>
                <td className="py-3 px-4 font-medium text-slate-700">{project.client}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      project.status === 'Published'
                        ? 'bg-emerald-50 text-emerald-700'
                        : project.status === 'Draft'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => updateProject(project.id, { featured: !project.featured })}
                    className="p-1 text-slate-400 hover:text-[#F4B820]"
                    title="Toggle featured status"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        project.featured ? 'fill-[#F4B820] text-[#F4B820]' : ''
                      }`}
                    />
                  </button>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      onClick={() => duplicateProject(project.id)}
                      className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                      title="Duplicate Project"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(project)}
                      className="p-1.5 rounded text-slate-400 hover:text-[#003088] hover:bg-slate-100"
                      title="Edit Project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {pendingDeleteId === project.id ? (
                      <div className="flex items-center gap-1 bg-rose-50 p-0.5 rounded border border-rose-200">
                        <button
                          onClick={() => {
                            deleteProject(project.id);
                            setPendingDeleteId(null);
                          }}
                          className="px-1.5 py-0.5 text-[10px] font-bold text-white bg-rose-600 rounded"
                        >
                          Del
                        </button>
                        <button
                          onClick={() => setPendingDeleteId(null)}
                          className="px-1 text-[10px] text-slate-600"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setPendingDeleteId(project.id)}
                        className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Cards View */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredProjects.map((project) => (
            <div key={project.id} className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={project.thumbnail}
                  alt=""
                  className="w-16 h-12 object-cover rounded-lg bg-slate-100 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-slate-900 text-sm truncate">{project.name}</span>
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        project.status === 'Published'
                          ? 'bg-emerald-50 text-emerald-700'
                          : project.status === 'Draft'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#003088] font-semibold">{project.category} · {project.service}</p>
                  <p className="text-[11px] text-slate-400 font-mono">Client: {project.client} · {project.date}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => updateProject(project.id, { featured: !project.featured })}
                  className="flex items-center gap-1 text-xs text-slate-500"
                >
                  <Star
                    className={`w-3.5 h-3.5 ${
                      project.featured ? 'fill-[#F4B820] text-[#F4B820]' : 'text-slate-400'
                    }`}
                  />
                  <span>{project.featured ? 'Featured' : 'Standard'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => duplicateProject(project.id)}
                    className="p-1.5 rounded text-slate-600 bg-slate-100 hover:bg-slate-200"
                    title="Duplicate"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="p-1.5 rounded text-[#003088] bg-blue-50 hover:bg-blue-100"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {pendingDeleteId === project.id ? (
                    <div className="flex items-center gap-1 bg-rose-50 p-1 rounded border border-rose-200">
                      <button
                        onClick={() => {
                          deleteProject(project.id);
                          setPendingDeleteId(null);
                        }}
                        className="px-2 py-0.5 text-[11px] font-bold text-white bg-rose-600 rounded"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setPendingDeleteId(null)}
                        className="px-1 text-[11px] text-slate-600"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setPendingDeleteId(project.id)}
                      className="p-1.5 rounded text-rose-600 bg-rose-50 hover:bg-rose-100"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Create / Edit Full Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingProject ? `Edit Project: ${editingProject.name}` : 'Create Portfolio Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Client / Brand *</label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  >
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="AI Services">AI Services</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Label *</label>
                  <input
                    type="text"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Thumbnail Image URL *</label>
                <input
                  type="text"
                  required
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Description (Cards) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Case Narrative *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">The Challenge</label>
                  <textarea
                    rows={2}
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">The Goal</label>
                  <textarea
                    rows={2}
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">The Strategy</label>
                  <textarea
                    rows={2}
                    value={formData.strategy}
                    onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Work Done / Execution (One per line)</label>
                <textarea
                  rows={3}
                  value={formData.workDoneText}
                  onChange={(e) => setFormData({ ...formData, workDoneText: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Verified Project Result *</label>
                <input
                  type="text"
                  required
                  value={formData.result}
                  onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                  placeholder="e.g. Scaled campaign while lowering CPA by 28%."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="featuredCheck"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-[#003088]"
                  />
                  <label htmlFor="featuredCheck" className="text-xs font-bold text-slate-800">
                    Feature on Homepage
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
