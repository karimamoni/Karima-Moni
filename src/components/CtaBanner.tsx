import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const CtaBanner: React.FC = () => {
  const { data } = useCms();
  const { homepage } = data;

  return (
    <section className="py-20 bg-gradient-to-r from-[#003088] via-[#002266] to-[#001744] text-white relative overflow-hidden">
      {/* Decorative Golden Wave Silhouette */}
      <div
        className="pointer-events-none absolute -bottom-10 right-0 w-96 h-96 rounded-full bg-[#F4B820]/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-10 left-0 w-96 h-96 rounded-full bg-white/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F4B820] mb-3 inline-block">
          {homepage.ctaBannerHeading}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-balance">
          {homepage.ctaBannerSubheading}
        </h2>
        <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          {homepage.ctaBannerText}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-[#101828] bg-[#F4B820] hover:bg-[#e0a310] rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-4 h-4 text-[#003088]" />
          </a>

          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200"
          >
            <span>View My Work</span>
            <ArrowDown className="w-4 h-4 text-[#F4B820]" />
          </a>
        </div>
      </div>
    </section>
  );
};
