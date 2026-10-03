import React, { useState } from 'react';
import { X, ArrowRight, ExternalLink, Calendar, User, Wrench, CheckCircle } from 'lucide-react';
import { PortfolioProject } from '../types';

interface ProjectDetailModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onSelectProjectForContact?: (projectName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectProjectForContact,
}) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!project) return null;

  const currentHeroImage = activeImage || project.thumbnail;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-4xl max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-3rem)] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header bar with close button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Visual Area */}
        <div className="relative aspect-16/9 sm:aspect-21/9 w-full bg-slate-900 overflow-hidden">
          <img
            src={currentHeroImage}
            alt={project.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-[#101828]/50 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-semibold text-blue-200">
              <span className="text-[#F4B820] font-bold">{project.category}</span>
              <span>·</span>
              <span>{project.service}</span>
              <span>·</span>
              <span className="font-mono">{project.date}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-1">
              {project.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Client: <span className="text-white font-medium">{project.client}</span>
            </p>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-8 max-h-[55dvh] sm:max-h-[60vh] overflow-y-auto space-y-8">
          {/* Key Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block mb-1">Client / Brand</span>
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#003088]" />
                {project.client}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">My Role</span>
              <span className="font-bold text-slate-900">{project.role}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Timeline</span>
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#003088]" />
                {project.date}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Subcategory</span>
              <span className="font-bold text-[#003088]">{project.subCategory}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2">
              Project Overview
            </h3>
            <p className="text-slate-700 text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Challenge, Goal & Strategy (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-1.5">
                01. The Challenge
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5">
                02. The Objective
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {project.goal}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-1.5">
                03. The Strategy
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {project.strategy}
              </p>
            </div>
          </div>

          {/* Work Done Checklist */}
          {project.workDone && project.workDone.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-3">
                Execution Scope & Tasks Completed
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.workDone.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800"
                  >
                    <CheckCircle className="w-4 h-4 text-[#003088] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results & Outcome */}
          <div className="p-5 rounded-xl bg-[#003088]/5 border border-[#003088]/20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-1.5">
              Verified Project Outcome & Impact
            </h3>
            <p className="text-sm font-medium text-slate-900 leading-relaxed">
              {project.result}
            </p>
          </div>

          {/* Gallery Thumbnails */}
          {project.gallery && project.gallery.length > 1 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Project Visuals Gallery
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {project.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      currentHeroImage === img ? 'border-[#003088] scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tools Used */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-slate-400" />
              <span>Tools & Technologies Used</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.toolsUsed.map((tool, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono bg-slate-100 text-slate-800 px-3 py-1 rounded-md border border-slate-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Back to Portfolio
          </button>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
              >
                <span>Live View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={() => {
                if (onSelectProjectForContact) {
                  onSelectProjectForContact(project.name);
                }
                onClose();
                const contactEl = document.getElementById('contact');
                if (contactEl) {
                  contactEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-md shadow-xs transition-all"
            >
              <span>Discuss Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F4B820]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
