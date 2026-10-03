import React, { useState, useMemo, useEffect } from 'react';
import { ArrowUpRight, BookOpen, Search, X, Sparkles, Mail, CheckCircle2, Loader2, Send, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCms } from '../context/CmsContext';
import { BlogPost } from '../types';
import { BlogArticleModal } from './BlogArticleModal';
import { calculateReadingTime } from '../utils/readingTime';

const CATEGORY_STORAGE_KEY = 'km_blog_active_category';
const SEARCH_STORAGE_KEY = 'km_blog_search_query';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const BlogSection: React.FC = () => {
  const { data, addLead } = useCms();
  const { blogPosts } = data;

  // Initialize with URL parameter, or sessionStorage, or defaults
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const urlCategory = urlParams.get('blogCategory');
        if (urlCategory) return urlCategory;

        const stored = sessionStorage.getItem(CATEGORY_STORAGE_KEY);
        if (stored) return stored;
      }
    } catch {}
    return 'All';
  });

  const [searchQuery, setSearchQuery] = useState<string>(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const urlSearch = urlParams.get('blogSearch');
        if (urlSearch) return urlSearch;

        const stored = sessionStorage.getItem(SEARCH_STORAGE_KEY);
        if (stored) return stored;
      }
    } catch {}
    return '';
  });

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Newsletter Form Local State Management
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');

    const emailTrimmed = newsletterEmail.trim();
    if (!emailTrimmed) {
      setNewsletterStatus('error');
      setNewsletterError('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      setNewsletterStatus('error');
      setNewsletterError('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    setNewsletterStatus('loading');

    setTimeout(() => {
      try {
        addLead({
          name: 'Newsletter Subscriber',
          email: emailTrimmed,
          whatsapp: '',
          service: 'Newsletter Subscription',
          budget: 'N/A',
          projectDetails: 'Subscribed to marketing updates & growth dispatch from BlogSection.',
        });

        // Store in local storage for subscriber persistence
        const existingSubscribers = JSON.parse(localStorage.getItem('km_newsletter_subscribers') || '[]');
        if (!existingSubscribers.includes(emailTrimmed)) {
          existingSubscribers.push(emailTrimmed);
          localStorage.setItem('km_newsletter_subscribers', JSON.stringify(existingSubscribers));
        }

        setNewsletterStatus('success');
      } catch {
        setNewsletterStatus('error');
        setNewsletterError('Failed to process your subscription. Please try again.');
      }
    }, 800);
  };

  const handleResetNewsletter = () => {
    setNewsletterEmail('');
    setNewsletterStatus('idle');
    setNewsletterError('');
  };

  // Core required category hierarchy: 'Digital Marketing', 'AI', 'Graphic Design', etc.
  const predefinedCategories = [
    'All',
    'Digital Marketing',
    'AI',
    'Graphic Design',
    'SEO',
    'Video Editing',
    'Freelancing',
  ];

  // Dynamically include any additional categories created in CMS
  const categories = useMemo(() => {
    const fromPosts = blogPosts
      .filter((b) => b.status === 'Published')
      .map((b) => b.category);
    const combined = Array.from(new Set([...predefinedCategories, ...fromPosts]));
    return combined;
  }, [blogPosts]);

  // Persist category and search filter state in sessionStorage and sync to URL query params
  useEffect(() => {
    try {
      sessionStorage.setItem(CATEGORY_STORAGE_KEY, activeCategory);
      sessionStorage.setItem(SEARCH_STORAGE_KEY, searchQuery);

      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (activeCategory !== 'All') {
          url.searchParams.set('blogCategory', activeCategory);
        } else {
          url.searchParams.delete('blogCategory');
        }

        if (searchQuery.trim()) {
          url.searchParams.set('blogSearch', searchQuery.trim());
        } else {
          url.searchParams.delete('blogSearch');
        }

        window.history.replaceState({}, '', url.toString());
      }
    } catch (e) {
      console.warn('Filter persistence error:', e);
    }
  }, [activeCategory, searchQuery]);

  // Filtered blog posts (both category and real-time search combined)
  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter((b) => b.status === 'Published')
      .filter((b) => {
        // Category condition
        if (activeCategory !== 'All' && b.category !== activeCategory) {
          return false;
        }

        // Real-time search query condition
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitle = b.title.toLowerCase().includes(q);
          const matchesExcerpt = b.excerpt.toLowerCase().includes(q);
          const matchesCategory = b.category.toLowerCase().includes(q);
          const matchesTags = b.tags ? b.tags.some((tag) => tag.toLowerCase().includes(q)) : false;
          const matchesContent = b.content.toLowerCase().includes(q);

          return matchesTitle || matchesExcerpt || matchesCategory || matchesTags || matchesContent;
        }

        return true;
      });
  }, [blogPosts, activeCategory, searchQuery]);

  // Post counts per category for badge feedback
  const categoryCounts = useMemo(() => {
    const published = blogPosts.filter((b) => b.status === 'Published');
    const counts: Record<string, number> = {
      All: published.length,
    };

    published.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    return counts;
  }, [blogPosts]);

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
  };

  return (
    <section id="blog" className="py-20 md:py-28 bg-[#F7F9FC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F4B820]" />
            <span>Insights, Guides & Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight mb-4">
            My Blog
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Actionable strategies, expert analyses, and practical workflows covering digital marketing, visual graphic design, and generative AI.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8 pb-6 border-b border-slate-200/70">
          {/* Category Filter Tabs (Segmented Controls) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto">
            {categories.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-[#003088] shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-blue-50 text-[#003088]' : 'bg-slate-300/60 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Real-time Search Box */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, keyword, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-white border border-slate-200/90 rounded-lg focus:outline-hidden focus:border-[#003088] focus:ring-1 focus:ring-[#003088] shadow-2xs placeholder:text-slate-400 text-slate-800 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Indicators Strip (Persisted compound feedback) */}
        {(activeCategory !== 'All' || searchQuery) && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 mb-8 bg-blue-50/50 rounded-xl border border-blue-100 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-500">Active Filters:</span>

              {activeCategory !== 'All' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-blue-200 text-[#003088] font-semibold text-xs shadow-2xs">
                  <span>Category: {activeCategory}</span>
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="hover:text-rose-600 transition-colors p-0.5"
                    title="Remove category filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-blue-200 text-[#003088] font-semibold text-xs shadow-2xs">
                  <span>Search: "{searchQuery}"</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:text-rose-600 transition-colors p-0.5"
                    title="Clear search query"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <span className="text-slate-500 font-mono text-[11px] ml-1">
                ({filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found)
              </span>
            </div>

            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-[#003088] hover:text-[#00205c] hover:underline transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Blog Posts Grid with Framer Motion entry and hover animations */}
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  layout
                  variants={cardVariants}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
                  }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => setSelectedPost(post)}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-[#003088]/40 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedPost(post);
                    }
                  }}
                >
                  <div>
                    {/* Image Cover with subtle zoom on hover */}
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Body Content */}
                    <div className="p-6">
                      {/* Unboxed Metadata (Zero-Pill discipline) */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                        <span className="font-semibold text-[#003088]">{post.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.publishDate}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-[11px]">{calculateReadingTime(post.content, post.excerpt)}</span>
                      </div>

                      <h3 className="text-lg font-bold text-[#101828] group-hover:text-[#003088] transition-colors mb-2.5 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#003088]">
                    <span>Read Article</span>
                    <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-[#003088] flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16 px-4 rounded-2xl bg-white border border-dashed border-slate-300"
            >
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">
                No articles found
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {searchQuery && activeCategory !== 'All'
                  ? `No articles found in "${activeCategory}" matching "${searchQuery}".`
                  : searchQuery
                  ? `No articles matching "${searchQuery}".`
                  : `No articles in "${activeCategory}" yet.`}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-3.5 py-1.5 text-xs font-semibold text-[#003088] bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    Clear search term
                  </button>
                )}
                {activeCategory !== 'All' && (
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="px-3.5 py-1.5 text-xs font-semibold text-[#003088] bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    Show all categories
                  </button>
                )}
                <button
                  onClick={handleResetFilters}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 rounded-md hover:bg-slate-200 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Newsletter Subscription Box */}
        <div className="mt-16 sm:mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001D55] via-[#003088] to-[#0A225C] text-white p-8 sm:p-12 shadow-xl border border-blue-400/20">
          {/* Subtle Ambient Glow Elements */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-[#F4B820]/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Header Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#F4B820] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Karima Moni's Growth Dispatch</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
              Get Marketing & Creative Growth Updates
            </h3>

            <p className="text-sm sm:text-base text-blue-100/90 max-w-xl mx-auto mb-8">
              Join founders and marketing teams receiving practical playbooks on Meta advertising, visual branding, and generative AI workflows. Delivered twice a month.
            </p>

            {/* Newsletter Form with Local State Handling */}
            {newsletterStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center max-w-lg mx-auto"
              >
                <div className="w-12 h-12 rounded-full bg-[#F4B820]/20 border border-[#F4B820]/40 flex items-center justify-center mx-auto mb-3 text-[#F4B820]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">
                  You're Subscribed!
                </h4>
                <p className="text-xs sm:text-sm text-blue-100 mb-4">
                  Thank you for subscribing. We've sent a welcome confirmation to <strong className="text-white font-mono">{newsletterEmail}</strong>. Look out for the next growth dispatch!
                </p>
                <button
                  type="button"
                  onClick={handleResetNewsletter}
                  className="text-xs font-semibold text-[#F4B820] hover:text-[#ffd666] underline cursor-pointer"
                >
                  Subscribe another email address
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-xl mx-auto">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-blue-300 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterStatus === 'error') {
                          setNewsletterStatus('idle');
                          setNewsletterError('');
                        }
                      }}
                      placeholder="Enter your email address..."
                      disabled={newsletterStatus === 'loading'}
                      className={`w-full pl-11 pr-4 py-3 text-xs sm:text-sm bg-white/10 hover:bg-white/15 focus:bg-white/20 border ${
                        newsletterStatus === 'error'
                          ? 'border-rose-400 focus:border-rose-400 focus:ring-1 focus:ring-rose-400'
                          : 'border-white/25 focus:border-[#F4B820] focus:ring-1 focus:ring-[#F4B820]'
                      } text-white placeholder:text-blue-200/60 rounded-xl outline-hidden transition-all backdrop-blur-md`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-[#002266] bg-[#F4B820] hover:bg-[#ffc933] active:bg-[#e5ac17] rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {newsletterStatus === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#002266]" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send className="w-3.5 h-3.5 text-[#002266]" />
                      </>
                    )}
                  </button>
                </div>

                {/* Local Error Feedback */}
                {newsletterStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs font-semibold text-rose-300 text-left sm:text-center"
                  >
                    {newsletterError}
                  </motion.p>
                )}

                {/* Trust & Guarantee Indicators */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-blue-200/80">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F4B820]" />
                    <span>No Spam Ever</span>
                  </span>
                  <span>·</span>
                  <span>1-Click Unsubscribe Anytime</span>
                  <span>·</span>
                  <span>Twice-a-Month Insights</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <BlogArticleModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </section>
  );
};
