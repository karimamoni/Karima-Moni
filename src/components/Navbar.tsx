import React, { useState, useEffect } from 'react';
import { KarimaMoniLogo } from './KarimaMoniLogo';
import { Menu, X, ArrowUpRight, ShieldCheck, Download } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenCvModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenCvModal }) => {
  const { data, getActiveResume } = useCms();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeResume = getActiveResume();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <a href="#" className="flex items-center group py-2 focus-visible:outline-hidden">
          <KarimaMoniLogo variant="full" />
        </a>

        {/* Zone 2: Navigation Links (Text with clean hover) */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-slate-700">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#003088] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#003088] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {data.settings.cvButtonsEnabled && activeResume && (
            <button
              onClick={onOpenCvModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#003088] bg-slate-100/80 hover:bg-slate-200/70 rounded-md transition-all duration-200"
              title="View & Download CV"
            >
              <Download className="w-3.5 h-3.5 text-[#003088]" />
              <span>Resume</span>
            </button>
          )}

          {/* Admin CMS Access Button */}
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-[#003088] border border-slate-200 rounded-md hover:border-[#003088]/40 transition-colors"
            title="Open Admin CMS"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#003088]" />
            <span>Admin CMS</span>
          </button>

          {/* Primary CTA */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-md shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.98]"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#F4B820]" />
          </a>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-1.5 sm:hidden">
          <button
            onClick={onOpenAdmin}
            className="p-2 text-slate-600 hover:text-[#003088] hover:bg-slate-100 rounded-lg transition-colors"
            title="Admin CMS Portal"
            aria-label="Admin CMS Portal"
          >
            <ShieldCheck className="w-5 h-5 text-[#003088]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-[#003088] hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-800 hover:text-[#003088] hover:bg-slate-50 rounded-md"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#003088]" />
              <span>Admin CMS Portal</span>
            </button>
            {data.settings.cvButtonsEnabled && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCvModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
              >
                <Download className="w-4 h-4 text-[#003088]" />
                <span>View & Download CV</span>
              </button>
            )}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-[#003088] rounded-md shadow-xs active:scale-[0.98]"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-4 h-4 text-[#F4B820]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
