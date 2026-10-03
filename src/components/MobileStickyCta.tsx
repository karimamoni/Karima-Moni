import React, { useState } from 'react';
import { MessageCircle, ArrowUpRight, X } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const MobileStickyCta: React.FC = () => {
  const { data } = useCms();
  const [dismissed, setDismissed] = useState(false);

  if (!data.settings.stickyCtaEnabled || dismissed) return null;

  // Clean WhatsApp number and format with international prefix cleanly
  const rawWa = data.contactInfo.whatsappNumber.replace(/[^0-9]/g, '');
  const cleanWhatsapp = rawWa.startsWith('880')
    ? rawWa
    : rawWa.startsWith('0')
    ? `880${rawWa.slice(1)}`
    : `880${rawWa}`;

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] shadow-2xl">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* WhatsApp Direct */}
        <a
          href={`https://wa.me/${cleanWhatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs active:scale-[0.98] transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Me</span>
        </a>

        {/* Hire Me CTA */}
        <a
          href="#contact"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#003088] hover:bg-[#00205c] text-white text-xs font-bold shadow-xs active:scale-[0.98] transition-all"
        >
          <span>Hire Me</span>
          <ArrowUpRight className="w-4 h-4 text-[#F4B820]" />
        </a>

        {/* Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          className="p-2 text-slate-400 hover:text-slate-600 rounded-md"
          aria-label="Dismiss sticky CTA"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
