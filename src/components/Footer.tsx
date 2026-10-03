import React from 'react';
import { KarimaMoniLogo } from './KarimaMoniLogo';
import { useCms } from '../context/CmsContext';
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  Share2,
  Mail,
  Phone,
} from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { data } = useCms();
  const { contactInfo, socialLinks } = data;

  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#101828] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <KarimaMoniLogo variant="full" theme="white" />
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Creative digital solutions that help businesses build authentic audience connections, scale paid advertising, and deploy cutting-edge AI creative content.
            </p>
            <div className="text-xs text-[#F4B820] font-semibold tracking-wider uppercase">
              Connect. Create. Grow.
            </div>

            {/* Dynamic Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#003088] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#003088] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#003088] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#003088] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {socialLinks.whatsapp && (
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
              {socialLinks.pinterest && (
                <a
                  href={socialLinks.pinterest}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#003088] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="Pinterest"
                >
                  <Share2 className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#F4B820] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 font-mono">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Digital Marketing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Facebook & Google Ads
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Graphic Design & Identity
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 font-mono">
              Contact Channels
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F4B820] shrink-0" />
                <span>{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F4B820] shrink-0" />
                <span className="truncate">{contactInfo.email}</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
                >
                  Manage Portfolio
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Karima Moni. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#003088] font-bold">#003088</span>
            <span>·</span>
            <span className="text-[#F4B820] font-bold">#F4B820</span>
            <span>·</span>
            <span>Connect. Create. Grow.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
