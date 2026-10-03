import React, { useState } from 'react';
import { Save, CheckCircle, RotateCcw } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { HomepageContent } from '../types';

export const AdminHomepageManager: React.FC = () => {
  const { data, updateHomepage } = useCms();
  const [form, setForm] = useState<HomepageContent>({ ...data.homepage });
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof HomepageContent, val: any) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    setSaved(false);
  };

  const handleFocusCardChange = (index: number, field: 'title' | 'description', val: string) => {
    const updatedCards = [...form.focusCards];
    updatedCards[index] = { ...updatedCards[index], [field]: val };
    setForm((prev) => ({ ...prev, focusCards: updatedCards }));
    setSaved(false);
  };

  const handleWhyChooseChange = (index: number, field: 'title' | 'description', val: string) => {
    const updatedCards = [...form.whyChooseCards];
    updatedCards[index] = { ...updatedCards[index], [field]: val };
    setForm((prev) => ({ ...prev, whyChooseCards: updatedCards }));
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepage(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Homepage & Hero CMS</h2>
          <p className="text-xs text-slate-500">
            Edit hero headlines, taglines, focus cards, and bottom CTA text. Updates reflect immediately on the public website.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          {saved ? <CheckCircle className="w-4 h-4 text-[#F4B820]" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved Successfully!' : 'Save Homepage Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Brand & Hero Identity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088]">
            01. Brand & Hero Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Brand Name
              </label>
              <input
                type="text"
                value={form.brandName}
                onChange={(e) => handleChange('brandName', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Professional Title
              </label>
              <input
                type="text"
                value={form.professionalTitle}
                onChange={(e) => handleChange('professionalTitle', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Positioning Highlight
              </label>
              <input
                type="text"
                value={form.positioning}
                onChange={(e) => handleChange('positioning', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Main Hero Headline
            </label>
            <input
              type="text"
              value={form.heroHeadline}
              onChange={(e) => handleChange('heroHeadline', e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-300 rounded-md focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Supporting Hero Paragraph
            </label>
            <textarea
              rows={3}
              value={form.heroSubheadline}
              onChange={(e) => handleChange('heroSubheadline', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary CTA Button Text
              </label>
              <input
                type="text"
                value={form.heroCtaPrimaryText}
                onChange={(e) => handleChange('heroCtaPrimaryText', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Secondary CTA Button Text
              </label>
              <input
                type="text"
                value={form.heroCtaSecondaryText}
                onChange={(e) => handleChange('heroCtaSecondaryText', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hero Portrait Image URL
              </label>
              <input
                type="text"
                value={form.heroImage}
                onChange={(e) => handleChange('heroImage', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md font-mono"
              />
            </div>
          </div>
        </div>

        {/* Quick Intro & 4 Focus Cards */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088]">
            02. Quick Intro & Focus Cards
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Quick Intro Heading
              </label>
              <input
                type="text"
                value={form.quickIntroHeading}
                onChange={(e) => handleChange('quickIntroHeading', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Quick Intro Supporting Text
              </label>
              <input
                type="text"
                value={form.quickIntroText}
                onChange={(e) => handleChange('quickIntroText', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3">
            {form.focusCards.map((card, idx) => (
              <div key={card.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono text-[11px] font-bold text-[#003088] block">
                  Focus Card {card.number}
                </span>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => handleFocusCardChange(idx, 'title', e.target.value)}
                  placeholder="Card Title"
                  className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-300 rounded"
                />
                <textarea
                  rows={2}
                  value={card.description}
                  onChange={(e) => handleFocusCardChange(idx, 'description', e.target.value)}
                  placeholder="Card Description"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Why Work With Me 6 Cards */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088]">
            03. Why Work With Me (6 Value Pillars)
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Section Heading
            </label>
            <input
              type="text"
              value={form.whyChooseHeading}
              onChange={(e) => handleChange('whyChooseHeading', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {form.whyChooseCards.map((card, idx) => (
              <div key={card.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono text-[11px] font-bold text-slate-500 block">
                  Pillar 0{idx + 1}
                </span>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => handleWhyChooseChange(idx, 'title', e.target.value)}
                  placeholder="Title"
                  className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-300 rounded"
                />
                <textarea
                  rows={2}
                  value={card.description}
                  onChange={(e) => handleWhyChooseChange(idx, 'description', e.target.value)}
                  placeholder="Description"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088]">
            04. Bottom Conversion Banner
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kicker Tagline
              </label>
              <input
                type="text"
                value={form.ctaBannerHeading}
                onChange={(e) => handleChange('ctaBannerHeading', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Main Headline
              </label>
              <input
                type="text"
                value={form.ctaBannerSubheading}
                onChange={(e) => handleChange('ctaBannerSubheading', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Banner Paragraph
            </label>
            <textarea
              rows={2}
              value={form.ctaBannerText}
              onChange={(e) => handleChange('ctaBannerText', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg shadow-sm transition-colors"
          >
            <Save className="w-4 h-4 text-[#F4B820]" />
            <span>Save All Homepage Content</span>
          </button>
        </div>
      </form>
    </div>
  );
};
