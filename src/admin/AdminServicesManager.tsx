import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle, X, Layers, Save } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { ServiceItem, ServiceCategory } from '../types';

export const AdminServicesManager: React.FC = () => {
  const { data, addService, updateService, deleteService, addServiceCategory, updateServiceCategory, deleteServiceCategory } = useCms();
  const { services, serviceCategories } = data;

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State for Service
  const [serviceForm, setServiceForm] = useState({
    title: '',
    categoryId: serviceCategories[0]?.id || '',
    slug: '',
    shortDescription: '',
    overview: '',
    deliverablesText: '',
    toolsText: '',
    published: true,
  });

  const handleOpenCreate = () => {
    setEditingService(null);
    setServiceForm({
      title: '',
      categoryId: serviceCategories[0]?.id || '',
      slug: '',
      shortDescription: '',
      overview: '',
      deliverablesText: 'Campaign Setup\nAudience Research\nWeekly Reporting',
      toolsText: 'Meta Business Suite, Canva, Google Ads',
      published: true,
    });
    setIsCreating(true);
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      categoryId: service.categoryId,
      slug: service.slug,
      shortDescription: service.shortDescription,
      overview: service.overview,
      deliverablesText: service.deliverables.join('\n'),
      toolsText: service.tools.join(', '),
      published: service.published,
    });
    setIsCreating(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const deliverables = serviceForm.deliverablesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const tools = serviceForm.toolsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingService) {
      updateService(editingService.id, {
        title: serviceForm.title,
        categoryId: serviceForm.categoryId,
        slug: serviceForm.slug || serviceForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        shortDescription: serviceForm.shortDescription,
        overview: serviceForm.overview,
        deliverables,
        tools,
        published: serviceForm.published,
      });
    } else {
      addService({
        title: serviceForm.title,
        categoryId: serviceForm.categoryId,
        slug: serviceForm.slug || serviceForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        shortDescription: serviceForm.shortDescription,
        overview: serviceForm.overview,
        deliverables,
        process: [
          { step: '01', title: 'Discovery & Audit', description: 'Evaluate current metrics and targets.' },
          { step: '02', title: 'Execution', description: 'Deploy campaign or design assets.' },
        ],
        tools,
        published: serviceForm.published,
        order: services.length + 1,
      });
    }
    setIsCreating(false);
    setEditingService(null);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Services Management</h2>
          <p className="text-xs text-slate-500">
            Create, edit, and organize services across Digital Marketing, Graphic Design, and AI.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4 text-[#F4B820]" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services List grouped by Category */}
      <div className="space-y-8">
        {serviceCategories.map((category) => {
          const categoryServices = services.filter((s) => s.categoryId === category.id);

          return (
            <div key={category.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#003088] uppercase block">
                    {category.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{category.name}</h3>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {categoryServices.length} Services
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {categoryServices.map((service) => (
                  <div
                    key={service.id}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{service.title}</h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            service.published
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {service.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-0.5 line-clamp-1">
                        {service.shortDescription}
                      </p>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Tools: {service.tools.join(', ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenEdit(service)}
                        className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 hover:text-[#003088]"
                        title="Edit Service"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete service "${service.title}"?`)) {
                            deleteService(service.id);
                          }
                        }}
                        className="p-1.5 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create / Edit Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingService ? `Edit Service: ${editingService.title}` : 'Add New Service'}
              </h3>
              <button
                onClick={() => setIsCreating(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    placeholder="e.g. YouTube Marketing"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={serviceForm.categoryId}
                    onChange={(e) => setServiceForm({ ...serviceForm, categoryId: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  >
                    {serviceCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Card Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={serviceForm.shortDescription}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
                  placeholder="1-2 sentences for card grid..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Detailed Overview *
                </label>
                <textarea
                  rows={3}
                  required
                  value={serviceForm.overview}
                  onChange={(e) => setServiceForm({ ...serviceForm, overview: e.target.value })}
                  placeholder="Detailed explanation displayed in service modal..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Deliverables (One per line)
                </label>
                <textarea
                  rows={4}
                  value={serviceForm.deliverablesText}
                  onChange={(e) => setServiceForm({ ...serviceForm, deliverablesText: e.target.value })}
                  placeholder="Audience Research&#10;Pixel Setup&#10;Daily Monitoring"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tools & Platforms (Comma-separated)
                </label>
                <input
                  type="text"
                  value={serviceForm.toolsText}
                  onChange={(e) => setServiceForm({ ...serviceForm, toolsText: e.target.value })}
                  placeholder="Meta Ads Manager, Canva, Google Analytics"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedCheck"
                  checked={serviceForm.published}
                  onChange={(e) => setServiceForm({ ...serviceForm, published: e.target.checked })}
                  className="rounded text-[#003088]"
                />
                <label htmlFor="publishedCheck" className="text-xs font-bold text-slate-800">
                  Publish on website immediately
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#003088] rounded-md hover:bg-[#00205c]"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
