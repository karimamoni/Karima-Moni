import React, { useState } from 'react';
import { Eye, Download, CheckCircle2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface AboutSectionProps {
  onOpenCvModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenCvModal }) => {
  const { data, getActiveResume } = useCms();
  const { homepage } = data;
  const activeResume = getActiveResume();
  const [imageError, setImageError] = useState(false);

  const handleDownloadCv = () => {
    if (!activeResume) return;
    // In browser, create a programmatic link or open CV modal
    onOpenCvModal();
  };

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F7F9FC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Visual Profile Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white p-4 rounded-2xl border border-slate-200 shadow-md">
              <div className="relative aspect-4/3 sm:aspect-1/1 w-full rounded-xl overflow-hidden bg-slate-100 mb-5">
                {!imageError ? (
                  <img
                    src={homepage.aboutImage}
                    alt="Karima Moni"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#003088] text-white p-6 text-center">
                    <span className="text-3xl font-extrabold text-[#F4B820]">KM</span>
                    <span className="mt-2 text-sm font-semibold">Karima Moni</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#003088]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#F4B820]">
                    Digital Marketing
                  </div>
                  <div className="text-xl font-bold font-display">Karima Moni</div>
                  <div className="text-xs text-blue-100">{homepage.professionalTitle}</div>
                </div>
              </div>

              <div className="pt-2 text-sm text-slate-600 leading-relaxed">
                Focused on practical marketing execution, creative communication, and work that helps businesses move forward.
              </div>

              {/* CV Action Buttons */}
              {data.settings.cvButtonsEnabled && (
                <div className="mt-5 pt-4 border-t border-slate-200 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={onOpenCvModal}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#003088]" />
                    <span>View CV</span>
                  </button>
                  <button
                    onClick={handleDownloadCv}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-[#F4B820]" />
                    <span>Download CV</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Bio Prose, Capabilities, Mission */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2">
              About Me
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight mb-2">
              {homepage.aboutHeading}
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#003088] mb-6">
              {homepage.aboutSubtitle}
            </p>

            {/* Prose Content */}
            <div className="prose prose-slate max-w-none text-slate-700 space-y-4 mb-8 leading-relaxed">
              {homepage.aboutContent.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Mission Box */}
            <div className="mb-10 p-5 rounded-xl bg-white border-l-4 border-l-[#F4B820] border-y border-r border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#003088] mb-1.5">
                <Award className="w-4 h-4 text-[#F4B820]" />
                <span>My Core Mission</span>
              </div>
              <p className="text-base font-medium text-slate-900 italic">
                "{homepage.aboutMission}"
              </p>
            </div>

            {/* Capabilities Matrix */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
                Core Capabilities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {homepage.aboutCapabilities.map((capability) => (
                  <div
                    key={capability}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/90 text-xs font-medium text-slate-800 hover:border-[#003088]/40 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#003088] shrink-0" />
                    <span className="truncate">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
