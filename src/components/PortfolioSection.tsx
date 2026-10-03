import React, { useMemo, useState } from 'react';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { PortfolioProject, ProjectCategory } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';

interface PortfolioSectionProps {
  onSelectProjectForContact?: (projectName: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onSelectProjectForContact,
}) => {
  const { data } = useCms();
  const { projects } = data;
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const filterTabs: Array<'All' | ProjectCategory> = [
    'All',
    'Performance Marketing',
    'Creative Content',
  ];

  const filteredProjects = useMemo(
    () =>
      projects
        .filter((project) => project.status === 'Published')
        .filter(
          (project) =>
            activeCategory === 'All' || project.category === activeCategory,
        ),
    [projects, activeCategory],
  );

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2">
            Selected Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight mb-4">
            Selected Work
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A selection of marketing campaigns, creative projects, and brand-focused work.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-slate-100">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveCategory(tab)}
              className={`px-4 py-2.5 text-xs whitespace-nowrap font-semibold rounded-md transition-all ${
                activeCategory === tab
                  ? 'bg-[#003088] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                aria-label={`View project: ${project.name}`}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                className="group bg-[#F7F9FC] rounded-2xl border border-slate-200/90 hover:border-[#003088]/40 hover:bg-white hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src =
                          'images/karima_hero_portrait_1790992143360.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                      <span className="font-medium text-blue-200">{project.client}</span>
                      <span className="font-mono text-[11px] text-[#F4B820]">{project.date}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-[#003088]">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.service}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#101828] group-hover:text-[#003088] transition-colors mb-2 leading-snug">
                      {project.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#003088]">
                  <span>View Project</span>
                  <span className="w-7 h-7 rounded-full bg-white group-hover:bg-[#003088] flex items-center justify-center border border-slate-200 group-hover:border-[#003088] transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#003088] group-hover:text-white transition-colors" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300">
            <FolderGit2 className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No projects found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No published projects match this category yet. Try another category.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#003088] bg-white border border-slate-200 rounded-md hover:bg-slate-100"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProjectForContact={onSelectProjectForContact}
        />
      )}
    </section>
  );
};
