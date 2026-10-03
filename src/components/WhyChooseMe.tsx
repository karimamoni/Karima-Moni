import React from 'react';
import { Target, Lightbulb, Compass, HeartHandshake, ShieldCheck, BookOpen } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const WhyChooseMe: React.FC = () => {
  const { data } = useCms();
  const { homepage } = data;

  const pillarIcons = [
    <Target className="w-5 h-5 text-[#003088]" key="goal" />,
    <Lightbulb className="w-5 h-5 text-[#F4B820]" key="creative" />,
    <Compass className="w-5 h-5 text-[#003088]" key="strategy" />,
    <HeartHandshake className="w-5 h-5 text-[#003088]" key="client" />,
    <ShieldCheck className="w-5 h-5 text-[#F4B820]" key="commitment" />,
    <BookOpen className="w-5 h-5 text-[#003088]" key="learning" />,
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2">
            Distinctive Value
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight mb-4">
            {homepage.whyChooseHeading}
          </h2>
          <p className="text-base text-slate-600">
            A collaborative partnership built on measurable objectives, transparent communication, and genuine creative dedication.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homepage.whyChooseCards.map((card, index) => (
            <div
              key={card.id}
              className="group p-7 rounded-2xl bg-[#F7F9FC] hover:bg-white border border-slate-200/80 hover:border-[#003088]/40 hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {pillarIcons[index % pillarIcons.length]}
                </div>
                <h3 className="text-lg font-bold text-[#101828] group-hover:text-[#003088] transition-colors mb-2.5">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[11px] font-mono font-medium text-slate-400 group-hover:text-[#003088]">
                  Pillar 0{index + 1}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4B820] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
