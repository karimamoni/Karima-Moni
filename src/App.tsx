import React, { useState, useEffect } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileStickyCta } from './components/MobileStickyCta';
import { CvModal } from './components/CvModal';
import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';

function PortfolioApp() {
  const { data, isAdmin, saveError, clearSaveError } = useCms();
  const [isAdminViewOpen, setIsAdminViewOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Runtime SEO Synchronization from database
  useEffect(() => {
    if (data.seoSettings?.siteTitle) {
      document.title = data.seoSettings.siteTitle;
    }
    const seo = data.seoSettings;
    if (seo?.metaDescription) {
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) descMeta.setAttribute('content', seo.metaDescription);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', seo.metaDescription);
    }
    if (seo?.ogImage) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', seo.ogImage);
    }
    if (seo?.canonicalUrl) {
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', seo.canonicalUrl);
    }
  }, [data.seoSettings]);

  // Synchronize admin view state if auth changes
  useEffect(() => {
    if (!isAdmin && isAdminViewOpen) {
      setIsAdminViewOpen(false);
    }
  }, [isAdmin, isAdminViewOpen]);

  const handleOpenAdmin = () => {
    if (isAdmin) {
      setIsAdminViewOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleServiceSelected = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
  };

  if (isAdminViewOpen && isAdmin) {
    return (
      <AdminLayout
        onClose={() => setIsAdminViewOpen(false)}
        onOpenCvPreview={() => setIsCvModalOpen(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101828] flex flex-col antialiased selection:bg-[#F4B820]/30 selection:text-[#003088] pb-16 sm:pb-0">
      {saveError && (
        <div role="alert" className="fixed top-4 left-1/2 z-[70] -translate-x-1/2 w-[min(92vw,520px)] rounded-xl border border-rose-200 bg-white px-4 py-3 shadow-xl flex items-start gap-3">
          <div className="min-w-0 flex-1 text-sm font-medium text-rose-700">{saveError}</div>
          <button type="button" onClick={clearSaveError} className="text-xs font-bold text-slate-500 hover:text-slate-900">Dismiss</button>
        </div>
      )}
      {/* Sticky Top Navigation */}
      <Navbar onOpenCvModal={() => setIsCvModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onOpenCvModal={() => setIsCvModalOpen(true)} />

        {/* About Me & Mission */}
        <AboutSection onOpenCvModal={() => setIsCvModalOpen(true)} />

        {/* Services Spectrum (3 Categories & Modal) */}
        <ServicesSection onSelectServiceForContact={handleServiceSelected} />

        {/* Simple client process */}
        <HowItWorksSection />

        {/* Selected portfolio work */}
        <PortfolioSection onSelectProjectForContact={handleServiceSelected} />


        {/* Client testimonials */}
        <ReviewsSection />

        {/* Contact & Dynamic Inbound Leads Form */}
        <ContactSection preselectedService={preselectedService} />

      </main>

      {/* Footer */}
      <Footer onOpenAdmin={handleOpenAdmin} />

      {/* Mobile Sticky CTA Bar */}
      <MobileStickyCta />

      {/* Dynamic CV / Resume Viewer Modal */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

      {/* Admin Login Dialog */}
      <AdminLogin
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          if (isAdmin) {
            setIsAdminViewOpen(true);
          }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <PortfolioApp />
    </CmsProvider>
  );
}
