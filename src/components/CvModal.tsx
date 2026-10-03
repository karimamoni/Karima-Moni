import React from 'react';
import { X, Download, Printer, CheckCircle, FileText, Calendar, Award } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const { data, getActiveResume } = useCms();
  const activeResume = getActiveResume();

  if (!isOpen || !activeResume) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const fileUrl = activeResume.fileUrl || '/public/cv/karima_moni_cv_2026.pdf';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = activeResume.fileName || 'Karima_Moni_CV_2026.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#003088] text-white p-6 sm:p-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#F4B820]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Curriculum Vitae</h3>
                <span className="text-[10px] font-mono font-bold bg-[#F4B820] text-[#101828] px-2 py-0.5 rounded">
                  {activeResume.version}
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Active Resume · Updated {activeResume.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Print CV"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CV Preview Document Paper */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-6 bg-slate-50">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6 text-slate-800">
            {/* Header Lockup */}
            <div className="border-b border-slate-200 pb-5">
              <h1 className="text-2xl font-extrabold text-[#003088] tracking-tight">
                KARIMA MONI
              </h1>
              <p className="text-sm font-semibold text-[#F4B820] uppercase tracking-wider">
                Digital Marketing Specialist
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                <span>{data.contactInfo.email}</span>
                <span>·</span>
                <span>{data.contactInfo.whatsappNumber}</span>
                <span>·</span>
                <span>{data.contactInfo.location}</span>
              </div>
            </div>

            {/* Profile Statement */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-1.5 font-mono">
                Professional Profile
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {data.homepage.aboutContent.slice(0, 320)}...
              </p>
            </div>

            {/* Core Competencies */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2 font-mono">
                Key Skills & Disciplines
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {data.skills.slice(0, 9).map((s) => (
                  <div key={s.id} className="flex items-center gap-1.5 text-xs text-slate-700">
                    <CheckCircle className="w-3 h-3 text-[#003088]" />
                    <span className="truncate">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2 font-mono">
                Experience Timeline
              </h4>
              <div className="space-y-3">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{exp.role}</span>
                      <span className="font-mono text-slate-500 font-normal">{exp.period}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2 font-mono">
                Certifications & Training
              </h4>
              <div className="space-y-2">
                {data.education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{edu.course}</span>
                      <span className="font-mono text-slate-500 font-normal">{edu.date}</span>
                    </div>
                    <p className="text-slate-500">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="font-medium text-slate-800">{activeResume.fileName}</span>
            <span>({activeResume.fileSize})</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-md shadow-xs transition-all"
            >
              <Download className="w-4 h-4 text-[#F4B820]" />
              <span>Download Active CV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
