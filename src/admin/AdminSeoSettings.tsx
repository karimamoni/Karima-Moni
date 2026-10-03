import React, { useState } from 'react';
import { Save, CheckCircle, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const AdminSeoSettings: React.FC = () => {
  const { data, updateSeoSettings, updateSettings, resetToDefaults, changeAdminPassword } = useCms();
  const [seo, setSeo] = useState({ ...data.seoSettings });
  const [siteSettings, setSiteSettings] = useState({ ...data.settings });
  const [saved, setSaved] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeoSettings(seo);
    updateSettings(siteSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all website content back to initial Karima Moni defaults? Any unsaved edits will be restored to seed values.')) {
      resetToDefaults();
      alert('CMS reset to initial Karima Moni defaults successfully.');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">SEO & Platform Settings</h2>
          <p className="text-xs text-slate-500">
            Control search engine metadata, OpenGraph social share previews, and global UI flags.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          {saved ? <CheckCircle className="w-4 h-4 text-[#F4B820]" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved!' : 'Save SEO & Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SEO Meta Tags */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088]">
            Search Engine Optimization (SEO)
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Website Meta Title (30–60 chars) *
            </label>
            <input
              type="text"
              required
              value={seo.siteTitle}
              onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Meta Description (120–160 chars) *
            </label>
            <textarea
              rows={3}
              required
              value={seo.metaDescription}
              onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                OpenGraph Social Share Image URL
              </label>
              <input
                type="text"
                value={seo.ogImage}
                onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Canonical Website URL
              </label>
              <input
                type="text"
                value={seo.canonicalUrl}
                onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Keywords (Comma-separated)
            </label>
            <input
              type="text"
              value={seo.keywords}
              onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
            />
          </div>
        </div>

        {/* Global UI Toggles */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088]">
            Platform Feature Toggles
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Public CV / Resume Buttons
                </span>
                <span className="text-[11px] text-slate-500">
                  Controls visibility of 'View CV' and 'Download CV' buttons in navbar, hero, and about sections.
                </span>
              </div>
              <input
                type="checkbox"
                checked={siteSettings.cvButtonsEnabled}
                onChange={(e) => setSiteSettings({ ...siteSettings, cvButtonsEnabled: e.target.checked })}
                className="rounded text-[#003088] w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="min-w-0 flex-1 pr-4">
                <span className="text-xs font-bold text-slate-900 block">
                  Availability Badge
                </span>
                <span className="text-[11px] text-slate-500">
                  Show or hide the project availability badge in the hero section.
                </span>
              </div>
              <input
                type="checkbox"
                checked={siteSettings.availabilityEnabled}
                onChange={(e) => setSiteSettings({ ...siteSettings, availabilityEnabled: e.target.checked })}
                className="rounded text-[#003088] w-4 h-4"
              />
            </div>

            {siteSettings.availabilityEnabled && (
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-1">Availability Text</label>
                <input
                  type="text"
                  maxLength={60}
                  value={siteSettings.availabilityText}
                  onChange={(e) => setSiteSettings({ ...siteSettings, availabilityText: e.target.value })}
                  placeholder="Open for New Projects"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded"
                />
              </div>
            )}

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Mobile Sticky Bottom CTA Bar
                </span>
                <span className="text-[11px] text-slate-500">
                  Enables the floating 'WhatsApp Me' and 'Hire Me' bar on mobile devices.
                </span>
              </div>
              <input
                type="checkbox"
                checked={siteSettings.stickyCtaEnabled}
                onChange={(e) => setSiteSettings({ ...siteSettings, stickyCtaEnabled: e.target.checked })}
                className="rounded text-[#003088] w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* Admin Security */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Admin Security
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">Change the admin login password without touching your website content.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current password" autoComplete="current-password" className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded" />
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password (12+ chars)" autoComplete="new-password" className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded" />
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" autoComplete="new-password" className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={async () => {
              setPasswordMessage(''); setPasswordError('');
              if (newPassword.length < 12) { setPasswordError('New password must be at least 12 characters.'); return; }
              if (newPassword !== confirmPassword) { setPasswordError('New password and confirmation do not match.'); return; }
              try { await changeAdminPassword(currentPassword, newPassword); setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); setPasswordMessage('Admin password updated successfully.'); }
              catch (e: any) { setPasswordError(e.message || 'Could not change password.'); }
            }} className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5" /> Change Admin Password
            </button>
            {passwordMessage && <span className="text-xs font-semibold text-emerald-700">{passwordMessage}</span>}
            {passwordError && <span className="text-xs font-semibold text-rose-700">{passwordError}</span>}
          </div>
        </div>

        {/* System Reset Section */}
        <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-200 space-y-3">
          <div className="flex items-center gap-2 text-rose-800 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Danger Zone / Restore Defaults</span>
          </div>
          <p className="text-xs text-rose-700">
            If you ever need to reset the entire database back to the pristine Karima Moni seed data, you can restore defaults here.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-rose-700 bg-white border border-rose-300 rounded-lg hover:bg-rose-100 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Content to Factory Seed</span>
          </button>
        </div>
      </form>
    </div>
  );
};
