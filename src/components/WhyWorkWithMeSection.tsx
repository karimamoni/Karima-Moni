import React from 'react';
import { MessageSquareText, Lightbulb, CheckCircle2 } from 'lucide-react';

const points = [
  { title: 'Clear Communication', description: 'Straightforward updates, practical next steps and no unnecessary complexity.', icon: MessageSquareText },
  { title: 'Strategy + Creative Thinking', description: 'Performance goals and visual communication work together instead of in separate silos.', icon: Lightbulb },
  { title: 'Reliable Delivery', description: 'A focused workflow with agreed priorities, organized assets and clear handoffs.', icon: CheckCircle2 },
];

export const WhyWorkWithMeSection: React.FC = () => (
  <section id="why-work-with-me" className="py-16 sm:py-20 md:py-24 bg-white border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-10 sm:mb-12">
        <div className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2">Working Together</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight mb-4">Why Work With Me?</h2>
        <p className="text-base sm:text-lg text-slate-600">Focused support for businesses that want thoughtful marketing execution and strong creative communication.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {points.map(({ title, description, icon: Icon }) => (
          <div key={title} className="flex gap-4 p-5 sm:p-6 rounded-2xl bg-[#F7F9FC] border border-slate-200">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center text-[#003088]">
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#101828] mb-1.5">{title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
