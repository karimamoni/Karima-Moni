import React, { useState } from 'react';
import { Save, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const AdminAboutManager: React.FC = () => {
  const { data, updateHomepage } = useCms();
  const [heading, setHeading] = useState(data.homepage.aboutHeading);
  const [subtitle, setSubtitle] = useState(data.homepage.aboutSubtitle);
  const [content, setContent] = useState(data.homepage.aboutContent);
  const [mission, setMission] = useState(data.homepage.aboutMission);
  const [image, setImage] = useState(data.homepage.aboutImage);
  const [capabilities, setCapabilities] = useState<string[]>([...data.homepage.aboutCapabilities]);
  const [newCap, setNewCap] = useState('');
  const [saved, setSaved] = useState(false);

  const handleAddCapability = () => {
    if (!newCap.trim()) return;
    setCapabilities([...capabilities, newCap.trim()]);
    setNewCap('');
    setSaved(false);
  };

  const handleRemoveCapability = (index: number) => {
    setCapabilities(capabilities.filter((_, i) => i !== index));
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepage({
      aboutHeading: heading,
      aboutSubtitle: subtitle,
      aboutContent: content,
      aboutMission: mission,
      aboutImage: image,
      aboutCapabilities: capabilities,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">About Karima Moni CMS</h2>
          <p className="text-xs text-slate-500">
            Edit personal background, mission statement, capabilities checklist, and profile photography.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          {saved ? <CheckCircle className="w-4 h-4 text-[#F4B820]" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved Successfully!' : 'Save About Profile'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                About Section Heading
              </label>
              <input
                type="text"
                value={heading}
                onChange={(e) => {
                  setHeading(e.target.value);
                  setSaved(false);
                }}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Subtitle / Professional Title
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => {
                  setSubtitle(e.target.value);
                  setSaved(false);
                }}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              About Profile Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
                setSaved(false);
              }}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Main Bio & Background (Supports paragraphs)
            </label>
            <textarea
              rows={8}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setSaved(false);
              }}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-md leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Core Mission Statement
            </label>
            <textarea
              rows={2}
              value={mission}
              onChange={(e) => {
                setMission(e.target.value);
                setSaved(false);
              }}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md font-medium"
            />
          </div>
        </div>

        {/* Capabilities Management */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088]">
            Core Capabilities & Checklist
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={newCap}
              onChange={(e) => setNewCap(e.target.value)}
              placeholder="Add new capability (e.g. Lead Funnels)..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCapability();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddCapability}
              className="px-4 py-2 text-xs font-bold bg-[#003088] text-white rounded-md hover:bg-[#00205c] flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-[#F4B820]" />
              <span>Add</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
              >
                <span className="font-medium text-slate-800 truncate">{cap}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCapability(idx)}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg shadow-sm"
          >
            <Save className="w-4 h-4 text-[#F4B820]" />
            <span>Save About Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
