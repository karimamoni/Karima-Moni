import React, { useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const AdminSocialContactManager: React.FC = () => {
  const { data, updateSocialLinks, updateContactInfo } = useCms();
  const [socials, setSocials] = useState({ ...data.socialLinks });
  const [contact, setContact] = useState({ ...data.contactInfo });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSocialLinks(socials);
    updateContactInfo(contact);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Social Media & Contact Information</h2>
          <p className="text-xs text-slate-500">
            Manage public social profiles, WhatsApp business numbers, and email routing.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          {saved ? <CheckCircle className="w-4 h-4 text-[#F4B820]" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved!' : 'Save Contact & Socials'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Info Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088]">
            Core Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Email Address *</label>
              <input
                type="email"
                required
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Business Number *</label>
              <input
                type="text"
                required
                value={contact.whatsappNumber}
                onChange={(e) => setContact({ ...contact, whatsappNumber: e.target.value })}
                placeholder="01714-810035"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Display Phone</label>
              <input
                type="text"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Office / Working Location</label>
              <input
                type="text"
                value={contact.location}
                onChange={(e) => setContact({ ...contact, location: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Working Hours / Availability</label>
            <input
              type="text"
              value={contact.workingHours}
              onChange={(e) => setContact({ ...contact, workingHours: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088]">
            Social Media Handles & Links
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Facebook URL</label>
              <input
                type="text"
                value={socials.facebook}
                onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Instagram URL</label>
              <input
                type="text"
                value={socials.instagram}
                onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn Profile</label>
              <input
                type="text"
                value={socials.linkedin}
                onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">YouTube Channel</label>
              <input
                type="text"
                value={socials.youtube}
                onChange={(e) => setSocials({ ...socials, youtube: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Direct Link</label>
              <input
                type="text"
                value={socials.whatsapp}
                onChange={(e) => setSocials({ ...socials, whatsapp: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Pinterest Profile</label>
              <input
                type="text"
                value={socials.pinterest}
                onChange={(e) => setSocials({ ...socials, pinterest: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">X (Twitter) Profile</label>
              <input
                type="text"
                value={socials.x}
                onChange={(e) => setSocials({ ...socials, x: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">TikTok Handle URL</label>
              <input
                type="text"
                value={socials.tiktok}
                onChange={(e) => setSocials({ ...socials, tiktok: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg shadow-sm"
          >
            <Save className="w-4 h-4 text-[#F4B820]" />
            <span>Save All Contact & Social Data</span>
          </button>
        </div>
      </form>
    </div>
  );
};
