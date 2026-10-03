import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, UserPlus, X, Loader2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { KarimaMoniLogo } from '../components/KarimaMoniLogo';

interface AdminLoginProps { isOpen: boolean; onClose: () => void; }

export const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose }) => {
  const { data, loginAdmin, signupAdmin } = useCms();
  const [email, setEmail] = useState(data.contactInfo.email);
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || password.length < (mode === 'signup' ? 12 : 8)) return;
    setIsLoading(true); setErrorMsg(null); setMessage('');
    const res = mode === 'login'
      ? await loginAdmin(password, email)
      : await signupAdmin(email, password);
    setIsLoading(false);
    if (res.success) {
      setPassword('');
      if (mode === 'signup' && res.confirmationRequired) {
        setMessage('Account created. Check your email and confirm the account, then sign in here.');
        setMode('login');
      } else {
        onClose();
      }
    } else {
      setErrorMsg(res.error || 'Authentication failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full" aria-label="Close login dialog"><X className="w-5 h-5" /></button>
        <div className="text-center mb-6">
          <KarimaMoniLogo variant="icon" className="mx-auto mb-3" />
          <h2 className="text-xl font-extrabold text-[#101828]">Admin CMS Portal</h2>
          <p className="text-xs text-slate-500 mt-1">Securely manage the complete website from GitHub Pages + Supabase.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="email" required value={email} onChange={(e) => { setEmail(e.target.value); setErrorMsg(null); }} className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#003088] focus:bg-white" disabled={isLoading} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">{mode === 'login' ? 'Admin Password' : 'Create Password'}</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="password" required minLength={mode === 'signup' ? 12 : 8} value={password} onChange={(e) => { setPassword(e.target.value); setErrorMsg(null); }} placeholder="Enter password..." className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#003088] focus:bg-white" disabled={isLoading} />
            </div>
          </div>
          {errorMsg && <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>}
          {message && <p className="text-xs text-emerald-700 font-medium">{message}</p>}

          <button type="submit" disabled={isLoading} className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg disabled:opacity-50">
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Please wait...</span></> : mode === 'login' ? <><span>Sign In to Admin CMS</span><ArrowRight className="w-3.5 h-3.5 text-[#F4B820]" /></> : <><span>Create Admin Account</span><UserPlus className="w-3.5 h-3.5 text-[#F4B820]" /></>}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center space-y-3">
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrorMsg(null); setMessage(''); }} className="text-xs font-semibold text-[#003088] hover:underline">
            {mode === 'login' ? 'First time? Create the Admin account (12+ characters)' : 'Already have an account? Sign in'}
          </button>
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Supabase Auth + server-side authorization
          </div>
        </div>
      </div>
    </div>
  );
};
