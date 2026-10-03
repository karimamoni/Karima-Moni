import React from 'react';
import { X, Calendar, Clock, User, Share2, Tag, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';
import { calculateReadingTime } from '../utils/readingTime';

interface BlogArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogArticleModal: React.FC<BlogArticleModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
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
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
            aria-label="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Cover Image */}
        <div className="relative aspect-16/9 sm:aspect-21/9 w-full bg-slate-900 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-[#101828]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F4B820] block mb-2">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Metadata Header */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-800">
              <User className="w-3.5 h-3.5 text-[#003088]" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {post.publishDate}
            </span>
            <span className="flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {calculateReadingTime(post.content, post.excerpt)}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#003088] hover:text-[#00205c]"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Article</span>
          </button>
        </div>

        {/* Article Content Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl font-bold text-[#101828] mt-6 mb-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
                const lines = paragraph.split('\n');
                return (
                  <ul key={idx} className="space-y-1.5 list-disc pl-5 my-3">
                    {lines.map((line, lIdx) => (
                      <li key={lIdx} className="text-sm">
                        {line.replace(/^[0-9]+\.\s+/, '').replace(/^-\s+/, '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-base text-slate-700">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-2 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Back to Articles
          </button>

          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#003088] rounded-md hover:bg-[#00205c]"
          >
            <span>Have a Question? Let's Talk</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F4B820]" />
          </a>
        </div>
      </div>
    </div>
  );
};
