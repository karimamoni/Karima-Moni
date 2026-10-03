import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Briefcase, GraduationCap, X } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { ExperienceItem, EducationCertificate } from '../types';

export const AdminExperienceManager: React.FC = () => {
  const { data, addExperience, deleteExperience, addEducation, deleteEducation } = useCms();
  const { experience, education } = data;

  const [expRole, setExpRole] = useState('');
  const [expPeriod, setExpPeriod] = useState('2026 – Present');
  const [expDesc, setExpDesc] = useState('');

  const [eduInst, setEduInst] = useState('');
  const [eduCourse, setEduCourse] = useState('');
  const [eduDate, setEduDate] = useState('2026');
  const [eduSkills, setEduSkills] = useState('Marketing, Ads, Design');

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expRole.trim()) return;
    addExperience({
      role: expRole.trim(),
      period: expPeriod.trim(),
      description: expDesc.trim(),
      highlights: ['Campaign execution', 'Client delivery'],
      order: experience.length + 1,
    });
    setExpRole('');
    setExpDesc('');
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduInst.trim()) return;
    addEducation({
      institution: eduInst.trim(),
      course: eduCourse.trim(),
      date: eduDate.trim(),
      skills: eduSkills.split(',').map((s) => s.trim()).filter(Boolean),
      certificateUrl: '#',
      order: education.length + 1,
    });
    setEduInst('');
    setEduCourse('');
  };

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Career & Certifications CMS</h2>
        <p className="text-xs text-slate-500">
          Manage your professional journey timeline and verified educational credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Professional Experience */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088] flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#003088]" />
            <span>Professional Journey Timeline</span>
          </h3>

          <form onSubmit={handleAddExperience} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Role Title *</label>
                <input
                  type="text"
                  required
                  value={expRole}
                  onChange={(e) => setExpRole(e.target.value)}
                  placeholder="e.g. Performance Marketer"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Period *</label>
                <input
                  type="text"
                  required
                  value={expPeriod}
                  onChange={(e) => setExpPeriod(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Description *</label>
              <textarea
                rows={2}
                required
                value={expDesc}
                onChange={(e) => setExpDesc(e.target.value)}
                placeholder="Responsibilities and key contributions..."
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-[#003088] rounded hover:bg-[#00205c] flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-[#F4B820]" />
              <span>Add Journey Milestone</span>
            </button>
          </form>

          <div className="space-y-3">
            {experience.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs flex items-start justify-between gap-3 shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{item.role}</span>
                    <span className="text-[10px] font-mono font-medium text-[#003088] bg-blue-50 px-1.5 py-0.5 rounded">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                </div>
                <button
                  onClick={() => deleteExperience(item.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088] flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#F4B820]" />
            <span>Education & Certificates</span>
          </h3>

          <form onSubmit={handleAddEducation} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Institution *</label>
                <input
                  type="text"
                  required
                  value={eduInst}
                  onChange={(e) => setEduInst(e.target.value)}
                  placeholder="e.g. Digital Academy"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={eduCourse}
                  onChange={(e) => setEduCourse(e.target.value)}
                  placeholder="e.g. Ads Specialization"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Date</label>
                <input
                  type="text"
                  value={eduDate}
                  onChange={(e) => setEduDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={eduSkills}
                  onChange={(e) => setEduSkills(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-[#003088] rounded hover:bg-[#00205c] flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-[#F4B820]" />
              <span>Add Certification</span>
            </button>
          </form>

          <div className="space-y-3">
            {education.map((cert) => (
              <div
                key={cert.id}
                className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs flex items-start justify-between gap-3 shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{cert.course}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{cert.date}</span>
                  </div>
                  <p className="text-[#003088] font-medium mt-0.5">{cert.institution}</p>
                </div>
                <button
                  onClick={() => deleteEducation(cert.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 shrink-0"
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
