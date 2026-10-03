import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, TrendingUp, Palette } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const HeroSection: React.FC = () => {
  const { data } = useCms();
  const { homepage } = data;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FC] via-[#F7F9FC] to-white pt-7 pb-12 sm:pt-8 sm:pb-14 md:pt-12 md:pb-20">
      {/* Subtle brand ambient decorations (Royal Blue & Gold gentle glow) */}
      <div
        className="pointer-events-none absolute -top-24 right-0 w-96 h-96 rounded-full bg-[#003088]/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#F4B820]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero Content */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Identity Kicker */}
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold text-[#003088] uppercase tracking-wider">
              <span>{homepage.brandName}</span>
              <span className="text-[#F4B820] font-bold">/</span>
              <span className="text-slate-600 font-medium">{homepage.professionalTitle}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#101828] leading-[1.18] sm:leading-[1.15] tracking-tight mb-4 sm:mb-5 max-w-4xl text-balance mx-auto">
              {homepage.heroHeadline}
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed mb-5 sm:mb-6 max-w-2xl mx-auto">
              {homepage.heroSubheadline}
            </p>

            {/* Services Highlight Bar */}
            <div className="mb-5 sm:mb-7 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 w-fit max-w-full justify-center shadow-2xs">
              <span className="inline-flex items-center gap-1.5 text-[#003088]">
                <TrendingUp className="w-4 h-4 text-[#003088]" />
                Digital Marketing
              </span>
              <span className="text-slate-300 font-bold" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 text-slate-800">
                <Palette className="w-4 h-4 text-[#F4B820]" />
                Creative Content
              </span>
              <span className="text-slate-300 font-bold" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 text-[#003088]">
                <Sparkles className="w-4 h-4 text-[#F4B820]" />
                Paid Ads
              </span>
            </div>

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <a
                href="#portfolio"
                className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-md shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                <span>{homepage.heroCtaPrimaryText}</span>
                <ArrowDown className="w-4 h-4 text-[#F4B820]" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#101828] hover:text-[#003088] bg-white border border-slate-300 hover:border-[#003088]/50 rounded-md shadow-xs hover:shadow-md transition-all duration-200"
              >
                <span>{homepage.heroCtaSecondaryText}</span>
                <ArrowUpRight className="w-4 h-4 text-[#F4B820]" />
              </a>


            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
