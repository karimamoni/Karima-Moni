import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle, Wrench } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const AdminSkillsToolsManager: React.FC = () => {
  const { data, addSkill, deleteSkill, addTool, deleteTool } = useCms();
  const { skills, tools } = data;

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCat, setNewSkillCat] = useState<'Digital Marketing' | 'Creative' | 'AI & Video'>('Digital Marketing');

  const [newToolName, setNewToolName] = useState('');
  const [newToolCat, setNewToolCat] = useState('Marketing');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill({
      name: newSkillName.trim(),
      category: newSkillCat,
      order: skills.length + 1,
    });
    setNewSkillName('');
  };

  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToolName.trim()) return;
    addTool({
      name: newToolName.trim(),
      category: newToolCat.trim() || 'General',
      order: tools.length + 1,
    });
    setNewToolName('');
  };

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Skills & Tools CMS</h2>
        <p className="text-xs text-slate-500">
          Manage professional skills (chips) and operational marketing tools without editing code.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skills Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088]">
            Professional Skills Checklist
          </h3>

          <form onSubmit={handleAddSkill} className="flex gap-2">
            <input
              type="text"
              required
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="e.g. Lead Funnels"
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
            />
            <select
              value={newSkillCat}
              onChange={(e) => setNewSkillCat(e.target.value as any)}
              className="px-2.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
            >
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Creative">Creative</option>
              <option value="AI & Video">AI & Video</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-[#003088] rounded hover:bg-[#00205c] flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-[#F4B820]" />
              <span>Add</span>
            </button>
          </form>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900">{skill.name}</span>
                  <span className="text-[11px] text-slate-400 block">{skill.category}</span>
                </div>
                <button
                  onClick={() => deleteSkill(skill.id)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                  title="Delete Skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088] flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#F4B820]" />
            <span>Tools & Platforms</span>
          </h3>

          <form onSubmit={handleAddTool} className="flex gap-2">
            <input
              type="text"
              required
              value={newToolName}
              onChange={(e) => setNewToolName(e.target.value)}
              placeholder="e.g. SEMrush"
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
            />
            <input
              type="text"
              value={newToolCat}
              onChange={(e) => setNewToolCat(e.target.value)}
              placeholder="Category"
              className="w-28 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-[#003088] rounded hover:bg-[#00205c] flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-[#F4B820]" />
              <span>Add</span>
            </button>
          </form>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900">{tool.name}</span>
                  <span className="text-[11px] text-slate-400 block">{tool.category}</span>
                </div>
                <button
                  onClick={() => deleteTool(tool.id)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                  title="Delete Tool"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
