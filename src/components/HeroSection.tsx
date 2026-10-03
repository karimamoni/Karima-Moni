import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Download, Sparkles, TrendingUp, Palette } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface HeroSectionProps {
  onOpenCvModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCvModal }) => {
  const { data } = useCms();
  const { homepage } = data;
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FC] via-[#F7F9FC] to-white pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-16 md:pb-28">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Typographic Identity & Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Identity Kicker */}
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold text-[#003088] uppercase tracking-wider">
              <span>{homepage.brandName}</span>
              <span className="text-[#F4B820] font-bold">/</span>
              <span className="text-slate-600 font-medium">{homepage.professionalTitle}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#101828] leading-[1.18] sm:leading-[1.15] tracking-tight mb-4 sm:mb-5 max-w-2xl text-balance">
              {homepage.heroHeadline}
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8 max-w-xl">
              {homepage.heroSubheadline}
            </p>

            {/* Services Highlight Bar */}
            <div className="mb-6 sm:mb-9 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 w-full sm:w-auto shadow-2xs">
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
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
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

              {data.settings.cvButtonsEnabled && (
                <button
                  onClick={onOpenCvModal}
                  className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-slate-700 hover:text-[#003088] hover:bg-slate-100 rounded-md transition-colors"
                >
                  <Download className="w-4 h-4 text-[#003088]" />
                  <span>{homepage.heroCtaCvText}</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Karima Moni Branding Portrait & Visual Anchor */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Outer decorative card frame with brand gold corner highlight */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#003088]/20 via-[#F4B820]/30 to-transparent rounded-2xl blur-xs transform -rotate-1" />

              <div className="relative bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden w-full">
                <div className="relative aspect-4/3 sm:aspect-1/1 w-full rounded-xl overflow-hidden bg-slate-100">
                  {!imageError ? (
                    <img
                      src={homepage.heroImage}
                      alt="Karima Moni – Digital Marketing Specialist"
                      className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#003088] to-[#001d54] text-white p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-3">
                        <span className="text-2xl font-bold text-[#F4B820]">KM</span>
                      </div>
                      <h3 className="text-lg font-bold">Karima Moni</h3>
                      <p className="text-xs text-blue-200 mt-1">Digital Marketing Specialist</p>
                    </div>
                  )}

                  {/* Gradient Scrim for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/60 via-transparent to-transparent pointer-events-none" />

                  {/* Badge Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs bg-black/35 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/15">
                    <span className="font-semibold tracking-wide">Digital Marketing · Paid Ads · Creative Content</span>
                  </div>
                </div>

                {/* Sub-card trust indicator */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    {data.settings.availabilityEnabled && <span className="text-xs font-semibold text-slate-700">{data.settings.availabilityText}</span>}
                  </div>
                  <span className="text-[11px] font-semibold text-[#003088]">
                    Digital Marketing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
