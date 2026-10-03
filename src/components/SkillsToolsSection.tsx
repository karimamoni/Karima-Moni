import React from 'react';
import { Check, Wrench, Sparkles, TrendingUp, Palette } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const SkillsToolsSection: React.FC = () => {
  const { data } = useCms();
  const { skills, tools } = data;

  const marketingSkills = skills.filter((s) => s.category === 'Digital Marketing');
  const creativeSkills = skills.filter((s) => s.category === 'Creative');
  const aiVideoSkills = skills.filter((s) => s.category === 'AI & Video');

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skills Section */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2">
            Competencies & Stack
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight mb-4">
            My Skills
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A comprehensive set of digital marketing proficiencies, visual design capabilities, and modern AI content workflows.
          </p>
        </div>

        {/* 3 Skill Columns with zero fake percentage bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Digital Marketing Column */}
          <div className="p-7 rounded-2xl bg-[#F7F9FC] border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-200/80">
              <div className="w-9 h-9 rounded-lg bg-blue-100/70 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#003088]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#101828]">Digital Marketing</h3>
                <span className="text-[11px] font-semibold text-slate-500">Acquisition & Organic</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {marketingSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200/80 text-xs font-semibold text-slate-800 shadow-2xs hover:border-[#003088] transition-colors"
                >
                  <Check className="w-3 h-3 text-[#003088]" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Creative Column */}
          <div className="p-7 rounded-2xl bg-[#F7F9FC] border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-200/80">
              <div className="w-9 h-9 rounded-lg bg-amber-100/70 flex items-center justify-center">
                <Palette className="w-5 h-5 text-amber-900" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#101828]">Creative & Visual</h3>
                <span className="text-[11px] font-semibold text-slate-500">Identity & Design</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {creativeSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200/80 text-xs font-semibold text-slate-800 shadow-2xs hover:border-[#F4B820] transition-colors"
                >
                  <Check className="w-3 h-3 text-[#F4B820]" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI & Video Column */}
          <div className="p-7 rounded-2xl bg-[#F7F9FC] border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-200/80">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-100 to-amber-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#003088]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#101828]">AI & Video</h3>
                <span className="text-[11px] font-semibold text-slate-500">Automation & Reels</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {aiVideoSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200/80 text-xs font-semibold text-slate-800 shadow-2xs hover:border-[#003088] transition-colors"
                >
                  <Check className="w-3 h-3 text-[#003088]" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools & Platforms Section */}
        <div className="pt-12 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#003088] mb-2">
            <Wrench className="w-4 h-4 text-[#F4B820]" />
            <span>Operational Arsenal</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight mb-8">
            Tools I Work With
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="group flex flex-col items-center justify-center p-5 rounded-xl bg-[#F7F9FC] border border-slate-200/80 hover:bg-white hover:border-[#003088]/40 hover:shadow-md transition-all text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-[#003088]/5 flex items-center justify-center mb-2.5 border border-slate-200/60 transition-colors">
                  <span className="font-bold text-sm text-[#003088]">
                    {tool.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-[#003088] transition-colors">
                  {tool.name}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  {tool.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
