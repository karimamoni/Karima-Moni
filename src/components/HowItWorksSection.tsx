import React from 'react';
import { Compass, Layers3, Rocket, RefreshCw } from 'lucide-react';

const steps = [
  { number: '01', title: 'Discover', description: 'Understand your goals, audience, offer and the problem we need to solve.', icon: Compass },
  { number: '02', title: 'Plan', description: 'Build a focused campaign, content or creative direction around clear priorities.', icon: Layers3 },
  { number: '03', title: 'Create & Launch', description: 'Produce the assets, campaigns and content needed to move the project forward.', icon: Rocket },
  { number: '04', title: 'Optimize', description: 'Review performance, refine what matters and identify the next practical step.', icon: RefreshCw },
];

export const HowItWorksSection: React.FC = () => (
  <section id="process" className="py-10 sm:py-12 md:py-14 bg-[#F7F9FC] border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-6 sm:mb-7">
        <div className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2">Simple Process</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight mb-4">How I Work</h2>
        <p className="text-base sm:text-lg text-slate-600">A clear, collaborative process designed to keep projects focused from the first conversation to the final delivery.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {steps.map(({ number, title, description, icon: Icon }) => (
          <div key={number} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#F4B820]">{number}</span>
              <Icon className="w-5 h-5 text-[#003088]" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-[#101828] mb-2">{title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
