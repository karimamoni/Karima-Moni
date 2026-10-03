import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, X, Loader2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { KarimaMoniLogo } from '../components/KarimaMoniLogo';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose }) => {
  const { loginAdmin } = useCms();
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setIsLoading(true);
    setErrorMsg(null);

    const res = await loginAdmin(password);
    setIsLoading(false);

    if (res.success) {
      setPassword('');
      onClose();
    } else {
      setErrorMsg(res.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  const handleQuickDemo = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    const res = await loginAdmin('karima2026');
    setIsLoading(false);
    if (res.success) {
      setPassword('');
      onClose();
    } else {
      setErrorMsg(res.error || 'Login failed.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close login dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <KarimaMoniLogo variant="icon" className="mx-auto mb-3" />
          <h2 className="text-xl font-extrabold text-[#101828]">Admin CMS Portal</h2>
          <p className="text-xs text-slate-500 mt-1">
            Server-authenticated session to manage portfolio, leads, services, and CV
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="Enter admin password..."
                className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#003088] focus:bg-white"
                disabled={isLoading}
              />
            </div>
            {errorMsg && (
              <p className="text-xs text-rose-600 mt-1.5 font-medium">
                {errorMsg}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg shadow-xs transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#F4B820]" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin CMS</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F4B820]" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-2 text-center">
          <button
            onClick={handleQuickDemo}
            disabled={isLoading}
            className="w-full py-2 px-3 text-xs font-semibold text-[#003088] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4 text-[#003088]" />
            <span>Quick Login with Initial Password</span>
          </button>
          <span className="text-[11px] text-slate-400">
            Protected with bcrypt hashing & secure HTTP-only session cookies
          </span>
        </div>
      </div>
    </div>
  );
};
