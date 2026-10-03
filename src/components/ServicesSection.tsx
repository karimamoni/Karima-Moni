import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, Palette, Check } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { ServiceItem } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesSectionProps {
  onSelectServiceForContact: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForContact }) => {
  const { data } = useCms();
  const { serviceCategories, services } = data;
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getCategoryTheme = (slug: string) => {
    switch (slug) {
      case 'performance-marketing':
        return {
          icon: <TrendingUp className="w-5 h-5 text-[#003088]" />,
          borderAccent: 'border-l-4 border-l-[#003088]',
          badgeBg: 'bg-blue-50 text-[#003088]',
          headerGradient: 'from-[#003088]/5 to-transparent',
        };
      case 'creative-content':
        return {
          icon: <Palette className="w-5 h-5 text-[#F4B820]" />,
          borderAccent: 'border-l-4 border-l-[#F4B820]',
          badgeBg: 'bg-amber-50 text-amber-900',
          headerGradient: 'from-[#F4B820]/10 to-transparent',
        };
      default:
        return {
          icon: <TrendingUp className="w-5 h-5 text-[#003088]" />,
          borderAccent: 'border-l-4 border-l-[#003088]',
          badgeBg: 'bg-blue-50 text-[#003088]',
          headerGradient: 'from-slate-50 to-transparent',
        };
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2">
            What I Do
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight mb-4">
            How I Can Help
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Focused performance marketing and creative content services built around clear business goals.
          </p>
        </div>

        {/* Service Groups */}
        <div className="space-y-16">
          {serviceCategories.map((category) => {
            const theme = getCategoryTheme(category.slug);
            const categoryServices = services.filter(
              (s) => s.categoryId === category.id && s.published
            );

            return (
              <div key={category.id} className="relative">
                {/* Category Header */}
                <div
                  className={`bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs mb-6 ${theme.borderAccent}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded ${theme.badgeBg}`}>
                          {category.badge}
                        </span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs font-semibold text-slate-500">
                          {categoryServices.length} services
                        </span>
                      </div>
                      <h3 className="text-2xl font-extrabold text-[#101828] tracking-tight">
                        {category.name}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                        {category.description}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                        {theme.icon}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.map((service) => (
                    <div
                      key={service.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`View service: ${service.title}`}
                      onClick={() => setSelectedService(service)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedService(service);
                        }
                      }}
                      className="group bg-white p-6 rounded-xl border border-slate-200/90 hover:border-[#003088] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h4 className="text-base font-bold text-[#101828] group-hover:text-[#003088] transition-colors">
                            {service.title}
                          </h4>
                          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#F4B820] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                          {service.shortDescription}
                        </p>

                        {/* Deliverables snippet */}
                        <div className="space-y-1.5 mb-4">
                          {service.deliverables.slice(0, 2).map((del, i) => (
                            <div key={i} className="flex items-center gap-2 text-[11px] text-slate-600">
                              <Check className="w-3 h-3 text-[#003088] shrink-0" />
                              <span className="truncate">{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Details Affordance */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#003088]">
                        <span>View Details →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSelectServiceForContact={onSelectServiceForContact}
        />
      )}
    </section>
  );
};
