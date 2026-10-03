import React from 'react';
import { Target, Sparkles, Users, TrendingUp } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const QuickIntro: React.FC = () => {
  const { data } = useCms();
  const { homepage } = data;

  const cardIcons = [
    <Target className="w-5 h-5 text-[#003088]" key="target" />,
    <Sparkles className="w-5 h-5 text-[#F4B820]" key="sparkles" />,
    <Users className="w-5 h-5 text-[#003088]" key="users" />,
    <TrendingUp className="w-5 h-5 text-[#003088]" key="trending" />,
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2">
            Pillars of Impact
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#101828] tracking-tight mb-4">
            {homepage.quickIntroHeading}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {homepage.quickIntroText}
          </p>
        </div>

        {/* Four Focus Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homepage.focusCards.map((card, index) => (
            <div
              key={card.id}
              className="group relative bg-[#F7F9FC] hover:bg-white p-6 rounded-xl border border-slate-200/80 hover:border-[#003088]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-[#003088]/5 border border-slate-200/60 flex items-center justify-center transition-colors">
                    {cardIcons[index % cardIcons.length]}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-[#003088] transition-colors">
                    {card.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#101828] group-hover:text-[#003088] transition-colors mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Bottom decorative hairline */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-slate-500 group-hover:text-[#003088] transition-colors">
                <span>Objective Oriented</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
