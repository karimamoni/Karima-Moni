import React, { useState } from 'react';
import { FileText, CheckCircle2, Upload, Trash2, Eye, Plus, Check, Loader2, Download } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface AdminCvManagerProps {
  onOpenPreviewCv: () => void;
}

export const AdminCvManager: React.FC<AdminCvManagerProps> = ({ onOpenPreviewCv }) => {
  const { data, addResume, setActiveResume, deleteResume, uploadResumePdf, updateSettings } = useCms();
  const { resumes, settings } = data;

  const [version, setVersion] = useState('v2026.2');
  const [date, setDate] = useState('October 2026');
  const [title, setTitle] = useState('Karima Moni – Senior Marketing Resume');
  const [fileUrl, setFileUrl] = useState('/cv/karima_moni_cv_2026.pdf');
  const [fileName, setFileName] = useState('Karima_Moni_CV_2026_Updated.pdf');
  const [fileSize, setFileSize] = useState('450 KB');
  const [notes, setNotes] = useState('Updated with latest campaign case studies');
  const [makeActive, setMakeActive] = useState(true);

  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setUploadError('Only PDF files (.pdf) are accepted.');
      return;
    }

    setUploadingPdf(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      await uploadResumePdf(file, {
        title: title || `${file.name.replace('.pdf', '')} CV`,
        version: version || `v2026.${resumes.length + 1}`,
        date: date || 'October 2026',
        notes: notes || 'Uploaded via Admin CV File Manager',
      });
      setUploadSuccess(`Successfully uploaded and activated "${file.name}"!`);
      setTimeout(() => setUploadSuccess(null), 4000);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload PDF file');
    } finally {
      setUploadingPdf(false);
      e.target.value = '';
    }
  };

  const handleAddCv = (e: React.FormEvent) => {
    e.preventDefault();
    addResume({
      version,
      date,
      title,
      fileUrl,
      fileName,
      fileSize,
      isActive: makeActive,
      notes,
    });
    setVersion(`v2026.${resumes.length + 2}`);
  };

  const activeCv = resumes.find((r) => r.isActive) || resumes[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">CV & Resume System CMS</h2>
          <p className="text-xs text-slate-500">
            Upload, replace, and configure the active CV PDF file used across public Download and View buttons.
          </p>
        </div>

        {/* Global Button Toggle */}
        <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
          <input
            type="checkbox"
            id="cvEnabled"
            checked={settings.cvButtonsEnabled}
            onChange={(e) => updateSettings({ ...settings, cvButtonsEnabled: e.target.checked })}
            className="rounded text-[#003088]"
          />
          <label htmlFor="cvEnabled" className="text-xs font-bold text-slate-800">
            Public CV Buttons Enabled
          </label>
        </div>
      </div>

      {/* Active CV Hero Card */}
      {activeCv && (
        <div className="bg-gradient-to-r from-blue-50 to-amber-50 p-6 rounded-2xl border border-blue-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#003088] text-[#F4B820] flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold bg-[#003088] text-white px-2 py-0.5 rounded">
                  CURRENT ACTIVE CV
                </span>
                <span className="font-bold text-slate-900 text-sm">{activeCv.version}</span>
              </div>
              <h3 className="text-base font-bold text-[#101828] mt-1">{activeCv.title}</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                File: <span className="font-mono font-semibold">{activeCv.fileName}</span> ({activeCv.fileSize}) · Released {activeCv.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={activeCv.fileUrl || '/public/cv/karima_moni_cv_2026.pdf'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-[#003088]" />
              <span>Download Active PDF</span>
            </a>
            <button
              onClick={onOpenPreviewCv}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#003088] bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors shadow-2xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Modal</span>
            </button>
          </div>
        </div>
      )}

      {/* Direct PDF File Upload Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088]">
              Upload Authentic Resume PDF
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select an actual .pdf file from your computer. It will be stored on the server and served on all public CV buttons.
            </p>
          </div>
          <label className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg cursor-pointer shadow-xs transition-colors">
            {uploadingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#F4B820]" />
                <span>Uploading PDF...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 text-[#F4B820]" />
                <span>Choose & Upload PDF</span>
              </>
            )}
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              disabled={uploadingPdf}
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

      {/* Upload / Add Manual Version Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#003088]">
          Add / Configure CV Metadata Record
        </h3>

        <form onSubmit={handleAddCv} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Version Tag *</label>
              <input
                type="text"
                required
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="v2026.2"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Release Date *</label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="October 2026"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">File Size</label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="450 KB"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Resume Document Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Karima Moni – Digital Marketing Specialist CV"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">File Name for Download *</label>
              <input
                type="text"
                required
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Karima_Moni_CV.pdf"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">File / Storage URL</label>
            <input
              type="text"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="/public/cv/karima_moni_cv_2026.pdf"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Internal Revision Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Updated with recent client results"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="makeActive"
              checked={makeActive}
              onChange={(e) => setMakeActive(e.target.checked)}
              className="rounded text-[#003088]"
            />
            <label htmlFor="makeActive" className="text-xs font-semibold text-slate-700">
              Set as Current Active CV immediately
            </label>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#003088] rounded-md hover:bg-[#00205c]"
          >
            <Plus className="w-4 h-4" />
            <span>Save CV Record</span>
          </button>
        </form>
      </div>

      {/* CV Version History */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Resume Version Archive ({resumes.length})
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {resumes.map((res) => (
            <div
              key={res.id}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                res.isActive ? 'bg-blue-50/30' : 'hover:bg-slate-50/60'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2 py-0.5 border border-slate-200 rounded">
                    {res.version}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{res.title}</h4>
                  {res.isActive && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  {res.fileName} · {res.fileSize} · {res.date}
                </p>
                {res.notes && <p className="text-xs text-slate-600 italic">Notes: {res.notes}</p>}
              </div>

              <div className="flex items-center gap-2">
                {!res.isActive && (
                  <button
                    onClick={() => setActiveResume(res.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-[#003088] bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                  >
                    Set as Active
                  </button>
                )}
                {resumes.length > 1 && (
                  <button
                    onClick={() => deleteResume(res.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                    title="Delete version"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
