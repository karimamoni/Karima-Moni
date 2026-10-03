import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const ReviewsSection: React.FC = () => {
  const { data } = useCms();
  const { reviews } = data;

  const publishedReviews = reviews.filter((r) => r.status === 'Published');

  if (publishedReviews.length === 0) return null;

  return (
    <section id="reviews" className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2">
            Client Endorsements
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight mb-4">
            What People Say
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Real feedback from founders, directors, and creators who partnered with Karima Moni for digital marketing, brand identity, and AI creative solutions.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-7 rounded-2xl bg-[#F7F9FC] border border-slate-200/90 shadow-2xs hover:border-[#003088]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F4B820] text-[#F4B820]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-300" />
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{rev.review}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{rev.clientName}</span>
                    <span title="Verified Collaboration" className="inline-flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 text-[#003088]" />
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    {rev.role}, <span className="text-slate-700 font-medium">{rev.company}</span>
                  </p>
                </div>

                <span className="text-[11px] font-mono text-slate-400">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
