import React, { useState } from 'react';
import { Briefcase, GraduationCap, CheckCircle, ExternalLink, Award, X } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EducationCertificate } from '../types';

export const ExperienceEducationSection: React.FC = () => {
  const { data } = useCms();
  const { experience, education } = data;
  const [selectedCert, setSelectedCert] = useState<EducationCertificate | null>(null);

  return (
    <section className="py-20 md:py-28 bg-[#F7F9FC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Professional Journey (Experience) */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#003088]" />
              <span>Career Trajectory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight mb-8">
              My Professional Journey
            </h2>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
              {experience.map((item) => (
                <div key={item.id} className="relative pl-10">
                  {/* Timeline dot */}
                  <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#003088] shadow-xs" />

                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs hover:border-[#003088]/40 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-base font-bold text-[#101828]">
                        {item.role}
                      </h3>
                      <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-[#003088]">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                      <div className="space-y-1.5 pt-3 border-t border-slate-100">
                        {item.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle className="w-3.5 h-3.5 text-[#003088] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Certifications */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#F4B820]" />
              <span>Accreditation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight mb-8">
              Education & Certifications
            </h2>

            <div className="space-y-6">
              {education.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs hover:border-[#F4B820]/60 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#003088]">
                        {cert.institution}
                      </span>
                      <span className="font-mono text-xs text-slate-500">
                        {cert.date}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#101828] mb-3">
                      {cert.course}
                    </h3>

                    {/* Skills list */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {cert.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Verified Credential
                    </span>
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003088] hover:text-[#00205c] transition-colors"
                    >
                      <Award className="w-3.5 h-3.5 text-[#F4B820]" />
                      <span>View Certificate</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-[#003088]" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#003088]">
              {selectedCert.institution}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">
              {selectedCert.course}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Completed: <span className="font-semibold text-slate-700">{selectedCert.date}</span>
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 text-xs text-slate-700 space-y-2">
              <span className="font-semibold text-slate-900 block">Verified Proficiencies:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCert.skills.map((s, idx) => (
                  <span key={idx} className="bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <a
                href={selectedCert.certificateUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#003088] rounded-md hover:bg-[#00205c]"
              >
                <span>Open Digital Badge</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#F4B820]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
