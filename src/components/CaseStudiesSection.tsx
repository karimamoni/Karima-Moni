import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, X, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { CaseStudy } from '../types';

export const CaseStudiesSection: React.FC = () => {
  const { data } = useCms();
  const { caseStudies } = data;
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const publishedCaseStudies = caseStudies.filter((cs) => cs.status === 'Published');

  return (
    <section id="case-studies" className="py-20 md:py-28 bg-[#F7F9FC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2">
            In-Depth Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight mb-4">
            Real Projects. Real Strategy. Real Results.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A transparent, step-by-step look at how thoughtful planning, data-driven execution, and creative precision produce real-world business outcomes.
          </p>
        </div>

        {/* Featured Case Studies Cards */}
        <div className="space-y-12">
          {publishedCaseStudies.map((cs) => (
            <div
              key={cs.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden hover:border-[#003088]/40 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Visual Preview Left */}
                <div className="lg:col-span-5 relative bg-slate-900 min-h-[260px] lg:min-h-full overflow-hidden">
                  <img
                    src={cs.thumbnail}
                    alt={cs.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#F4B820] block mb-1">
                      {cs.category} · {cs.service}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                      {cs.title}
                    </h3>
                    <p className="text-xs text-blue-200 mt-2">
                      Client: <span className="text-white font-medium">{cs.client}</span>
                    </p>
                  </div>
                </div>

                {/* 8-Part Snapshot Right */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* 01 Overview */}
                    <div>
                      <span className="font-mono text-xs font-bold text-[#003088] uppercase tracking-wider block mb-1">
                        01 Project Overview
                      </span>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {cs.overview}
                      </p>
                    </div>

                    {/* 02 Challenge & 03 Goal */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                        <span className="font-mono text-[11px] font-bold text-rose-800 uppercase block mb-1">
                          02 Challenge
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {cs.challenge}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                        <span className="font-mono text-[11px] font-bold text-amber-800 uppercase block mb-1">
                          03 Goal
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {cs.goal}
                        </p>
                      </div>
                    </div>

                    {/* 06 Verified Result */}
                    <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#003088] uppercase mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#003088]" />
                        <span>06 Results & Outcome</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                        {cs.result}
                      </p>
                    </div>
                  </div>

                  {/* Read full 8-point breakdown trigger */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      Published {cs.date}
                    </span>
                    <button
                      onClick={() => setSelectedCaseStudy(cs)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003088] hover:text-[#00205c] transition-colors"
                    >
                      <span>Read Full 8-Step Breakdown</span>
                      <ChevronRight className="w-4 h-4 text-[#F4B820]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Deep-Dive Modal */}
      {selectedCaseStudy && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedCaseStudy(null)}
        >
          <div
            className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-[#003088] to-[#001d54] text-white p-6 sm:p-8 relative">
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs font-bold uppercase tracking-wider text-[#F4B820] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Complete 8-Step Case Study</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {selectedCaseStudy.title}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 mt-1">
                Client: {selectedCaseStudy.client} · Category: {selectedCaseStudy.category}
              </p>
            </div>

            {/* 8-Step Timeline Content */}
            <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-6">
              {/* 01 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <h4 className="text-xs font-bold font-mono uppercase text-[#003088] mb-1">
                  01 Project Overview
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedCaseStudy.overview}
                </p>
              </div>

              {/* 02 */}
              <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/30">
                <h4 className="text-xs font-bold font-mono uppercase text-rose-800 mb-1">
                  02 Challenge
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedCaseStudy.challenge}
                </p>
              </div>

              {/* 03 */}
              <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/30">
                <h4 className="text-xs font-bold font-mono uppercase text-amber-900 mb-1">
                  03 Goal
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedCaseStudy.goal}
                </p>
              </div>

              {/* 04 */}
              <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/30">
                <h4 className="text-xs font-bold font-mono uppercase text-[#003088] mb-1">
                  04 Strategy
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedCaseStudy.strategy}
                </p>
              </div>

              {/* 05 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <h4 className="text-xs font-bold font-mono uppercase text-slate-800 mb-1">
                  05 Execution
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedCaseStudy.execution}
                </p>
              </div>

              {/* 06 */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <h4 className="text-xs font-bold font-mono uppercase text-emerald-800 mb-1">
                  06 Result
                </h4>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                  {selectedCaseStudy.result}
                </p>
              </div>

              {/* 07 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <h4 className="text-xs font-bold font-mono uppercase text-[#003088] mb-1">
                  07 Final Outcome
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedCaseStudy.finalOutcome}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close Breakdown
              </button>
              <a
                href="#contact"
                onClick={() => setSelectedCaseStudy(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#003088] rounded-md hover:bg-[#00205c]"
              >
                <span>Discuss Similar Strategy</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F4B820]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
