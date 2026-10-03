import React, { useState } from 'react';
import { Plus, Search, Trash2, Copy, Check, Image as ImageIcon, FileText, Video, Upload, Loader2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { MediaItem } from '../types';

export const AdminMediaManager: React.FC = () => {
  const { data, addMedia, uploadMediaFile, deleteMedia, updateSettings } = useCms();
  const { mediaLibrary } = data;

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'pdf' | 'video'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Direct upload states
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoMessage, setLogoMessage] = useState<string | null>(null);

  // Manual URL entry fallback
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<'image' | 'pdf' | 'video' | 'other'>('image');
  const [size, setSize] = useState('350 KB');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const item = await uploadMediaFile(file, file.name);
      setUploadSuccess(`Uploaded "${item.name}" successfully! Link copied.`);
      navigator.clipboard.writeText(item.url);
      setTimeout(() => setUploadSuccess(null), 3000);
    } catch (err: any) {
      setUploadError(err.message || 'File upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUploading(true);
    setLogoMessage(null);
    try {
      if (!file.type.startsWith('image/')) throw new Error('Please choose an image file for the brand logo.');
      const item = await uploadMediaFile(file, 'Karima Moni Brand Logo');
      await updateSettings({ ...data.settings, logoUrl: item.url });
      setLogoMessage('Brand logo updated successfully.');
    } catch (err: any) {
      setLogoMessage(err.message || 'Could not update the brand logo.');
    } finally {
      setLogoUploading(false);
      e.target.value = '';
    }
  };

  const resetLogo = async () => {
    setLogoMessage(null);
    try {
      await updateSettings({ ...data.settings, logoUrl: '/Karima-Moni/images/karima-moni-logo.webp' });
      setLogoMessage('Default logo restored.');
    } catch (err: any) {
      setLogoMessage(err.message || 'Could not restore the default logo.');
    }
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    addMedia({
      name: name.trim(),
      url: url.trim(),
      type,
      size,
    });
    setName('');
    setUrl('');
  };

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = mediaLibrary.filter((m) => {
    if (filterType !== 'all' && m.type !== filterType) return false;
    if (search.trim() !== '') {
      return m.name.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Centralized Media Library</h2>
        <p className="text-xs text-slate-500">
          Upload real image, PDF, and video files to server storage, copy URLs, and manage assets used across the portfolio.
        </p>
      </div>

      {/* Primary Action: Real File Upload Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088]">
              Upload New Media File
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Supports PNG, JPG, WebP, GIF, PDF, MP4, and WebM files (up to 15MB).
            </p>
          </div>

          <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg cursor-pointer shadow-xs transition-colors shrink-0">
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#F4B820]" />
                <span>Uploading to Server...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 text-[#F4B820]" />
                <span>Choose & Upload File</span>
              </>
            )}
            <input
              type="file"
              accept="image/*,application/pdf,video/mp4,video/webm"
              className="hidden"
              disabled={uploading}
              onChange={handleFileUpload}
            />
          </label>
        </div>

        {uploadError && (
          <p className="p-3 bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 rounded-lg">
            {uploadError}
          </p>
        )}

        {uploadSuccess && (
          <p className="p-3 bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 rounded-lg">
            {uploadSuccess}
          </p>
        )}
      </div>

      {/* Brand Logo */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-24 h-24 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
            <img src={data.settings.logoUrl || '/Karima-Moni/images/karima-moni-logo.webp'} alt="Current brand logo" className="max-w-full max-h-full object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088]">Brand Logo</h3>
            <p className="text-xs text-slate-500 mt-1">Upload a new logo to replace the website logo across the Navbar, Footer, and Admin Panel.</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <label className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg cursor-pointer">
                {logoUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 text-[#F4B820]" />}
                <span>{logoUploading ? 'Uploading Logo...' : 'Upload New Logo'}</span>
                <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" disabled={logoUploading} onChange={handleLogoUpload} />
              </label>
              <button type="button" onClick={resetLogo} className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg">Restore Default</button>
            </div>
            {logoMessage && <p className="mt-3 text-xs font-semibold text-slate-600" role="status">{logoMessage}</p>}
          </div>
        </div>
      </div>

      {/* Manual URL Link Registration (Optional) */}
      <details className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs group">
        <summary className="text-xs font-bold uppercase tracking-wider text-slate-700 cursor-pointer flex items-center justify-between">
          <span>Or Register External Media URL Manually</span>
          <span className="text-xs text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>

        <form onSubmit={handleManualAdd} className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Asset Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Campaign Showcase"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Asset URL *</label>
            <input
              type="text"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://... or /src/assets/..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Type</label>
            <div className="flex gap-2">
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
              >
                <option value="image">Image</option>
                <option value="pdf">PDF</option>
                <option value="video">Video</option>
                <option value="other">Other</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-[#003088] rounded hover:bg-[#00205c] shrink-0"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </details>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {(['all', 'image', 'pdf', 'video'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 text-xs font-semibold rounded capitalize transition-colors ${
                filterType === t ? 'bg-[#003088] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}s
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {/* Thumbnail / Icon */}
            <div className="relative aspect-16/10 bg-slate-100 overflow-hidden flex items-center justify-center">
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : item.type === 'pdf' ? (
                <FileText className="w-10 h-10 text-rose-500" />
              ) : item.type === 'video' ? (
                <Video className="w-10 h-10 text-blue-500" />
              ) : (
                <ImageIcon className="w-10 h-10 text-slate-400" />
              )}
              <span className="absolute top-2 left-2 text-[10px] font-bold uppercase bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                {item.type}
              </span>
            </div>

            {/* Info & Copy */}
            <div className="p-3">
              <h4 className="text-xs font-bold text-slate-900 truncate" title={item.name}>
                {item.name}
              </h4>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                {item.size} · {item.uploadedAt}
              </p>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleCopyUrl(item)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#003088] hover:underline"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => deleteMedia(item.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                  title="Delete asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
