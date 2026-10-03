import React from 'react';
import { X, CheckCircle, ArrowRight, Wrench, Layers } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectServiceForContact: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectServiceForContact,
}) => {
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#003088] to-[#001d54] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#F4B820] mb-2">
            Service Deep Dive
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {service.title}
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl">
            {service.shortDescription}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-8">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2">
              Overview & Strategic Value
            </h3>
            <p className="text-slate-700 text-base leading-relaxed">
              {service.overview}
            </p>
          </div>

          {/* Deliverables / What I Do */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#F4B820]" />
              <span>Deliverables & Execution Scope</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800"
                >
                  <CheckCircle className="w-4 h-4 text-[#003088] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Process */}
          {service.process && service.process.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-4">
                Implementation Workflow
              </h3>
              <div className="space-y-3">
                {service.process.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <span className="font-mono text-xs font-bold px-2 py-1 bg-blue-50 text-[#003088] rounded">
                      {step.step}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools Used */}
          {service.tools && service.tools.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-slate-400" />
                <span>Tools & Platforms Leveraged</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md border border-slate-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Close Details
          </button>

          <button
            onClick={() => {
              onSelectServiceForContact(service.title);
              onClose();
              const contactElement = document.getElementById('contact');
              if (contactElement) {
                contactElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-md shadow-xs transition-all"
          >
            <span>Inquire About {service.title}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F4B820]" />
          </button>
        </div>
      </div>
    </div>
  );
};
