import React, { useState } from 'react';
import { Plus, Edit2, Trash2, BookOpen, X, Calendar, Clock, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { BlogPost, ContentStatus } from '../types';
import { calculateReadingTime } from '../utils/readingTime';

export const AdminBlogManager: React.FC = () => {
  const { data, addBlogPost, updateBlogPost, deleteBlogPost } = useCms();
  const { blogPosts } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    coverImage: '/src/assets/images/marketing_campaign_showcase_1790992154996.jpg',
    category: 'Digital Marketing' as BlogPost['category'],
    excerpt: '',
    content: '',
    author: 'Karima Moni',
    readTime: '4 min read',
    tagsText: 'Marketing, Strategy, Growth',
    seoTitle: '',
    seoDescription: '',
    publishDate: 'March 2026',
    status: 'Published' as ContentStatus,
  });

  const handleOpenCreate = () => {
    setEditingPost(null);
    setForm({
      title: '',
      slug: '',
      coverImage: '/src/assets/images/marketing_campaign_showcase_1790992154996.jpg',
      category: 'Digital Marketing',
      excerpt: '',
      content: 'Write your guide or strategy article here...\n\n### Key Takeaways\n1. First principle\n2. Second principle',
      author: 'Karima Moni',
      readTime: '4 min read',
      tagsText: 'Digital Marketing, Growth',
      seoTitle: '',
      seoDescription: '',
      publishDate: 'March 2026',
      status: 'Published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      coverImage: post.coverImage,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      readTime: post.readTime,
      tagsText: post.tags.join(', '),
      seoTitle: post.seoTitle || '',
      seoDescription: post.seoDescription || '',
      publishDate: post.publishDate,
      status: post.status,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = form.tagsText.split(',').map((t) => t.trim()).filter(Boolean);
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingPost) {
      updateBlogPost(editingPost.id, {
        title: form.title,
        slug,
        coverImage: form.coverImage,
        category: form.category,
        excerpt: form.excerpt,
        content: form.content,
        author: form.author,
        readTime: form.readTime,
        tags,
        seoTitle: form.seoTitle,
        seoDescription: form.seoDescription,
        publishDate: form.publishDate,
        status: form.status,
      });
    } else {
      addBlogPost({
        title: form.title,
        slug,
        coverImage: form.coverImage,
        category: form.category,
        excerpt: form.excerpt,
        content: form.content,
        author: form.author,
        readTime: form.readTime,
        tags,
        seoTitle: form.seoTitle,
        seoDescription: form.seoDescription,
        publishDate: form.publishDate,
        status: form.status,
        order: blogPosts.length + 1,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Blog Posts & Articles CMS</h2>
          <p className="text-xs text-slate-500">
            Write, publish, and optimize digital marketing guides, reels strategies, and AI workflows.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4 text-[#F4B820]" />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={post.coverImage}
                alt=""
                className="w-16 h-12 rounded object-cover bg-slate-100 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm">{post.title}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      post.status === 'Published'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="text-[#003088] font-semibold">{post.category}</span>
                  <span>·</span>
                  <span>{post.publishDate}</span>
                  <span>·</span>
                  <span className="font-mono text-[11px]">{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenEdit(post)}
                className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 hover:text-[#003088]"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              {pendingDeleteId === post.id ? (
                <div className="flex items-center gap-1 bg-rose-50 p-1 rounded border border-rose-200">
                  <button
                    onClick={() => {
                      deleteBlogPost(post.id);
                      setPendingDeleteId(null);
                    }}
                    className="px-2 py-0.5 text-[11px] font-bold text-white bg-rose-600 rounded"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setPendingDeleteId(null)}
                    className="px-1 text-[11px] text-slate-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setPendingDeleteId(post.id)}
                  className="p-1.5 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Blog Post Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingPost ? 'Edit Blog Article' : 'Write New Article'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. 5 Tips for Better Short Videos"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  >
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="AI">AI</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="SEO">SEO</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Freelancing">Freelancing</option>
                  </select>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">Estimated Read Time</label>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, readTime: calculateReadingTime(form.content, form.excerpt) })}
                      className="text-[10px] font-semibold text-[#003088] hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-[#F4B820]" />
                      <span>Auto Calc</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    placeholder={calculateReadingTime(form.content, form.excerpt)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Calculated from content: {calculateReadingTime(form.content, form.excerpt)}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Publish Date</label>
                  <input
                    type="text"
                    value={form.publishDate}
                    onChange={(e) => setForm({ ...form, publishDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cover Image URL *</label>
                <input
                  type="text"
                  required
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Excerpt (Grid Summary) *</label>
                <textarea
                  rows={2}
                  required
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Article Prose Content *</label>
                <textarea
                  rows={8}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded font-mono leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">SEO Meta Title</label>
                  <input
                    type="text"
                    value={form.seoTitle}
                    onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                    placeholder="Defaults to article title"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={form.tagsText}
                    onChange={(e) => setForm({ ...form, tagsText: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                  className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-[#003088] rounded-md hover:bg-[#00205c]"
                  >
                    Save Article
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
