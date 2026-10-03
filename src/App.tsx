import React, { useState, useEffect } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ContactSection } from './components/ContactSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { MobileStickyCta } from './components/MobileStickyCta';
import { CvModal } from './components/CvModal';
import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';
import { Loader2 } from 'lucide-react';

function PortfolioApp() {
  const { data, isAdmin, isLoading } = useCms();
  const [isAdminViewOpen, setIsAdminViewOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Runtime SEO Synchronization from database
  useEffect(() => {
    if (data.seoSettings?.siteTitle) {
      document.title = data.seoSettings.siteTitle;
    }
    if (data.seoSettings?.metaDescription) {
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute('content', data.seoSettings.metaDescription);
      }
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', data.seoSettings.metaDescription);
      }
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
      {/* Sticky Top Navigation */}
      <Navbar
        onOpenAdmin={handleOpenAdmin}
        onOpenCvModal={() => setIsCvModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onOpenCvModal={() => setIsCvModalOpen(true)} />

        {/* About Me & Mission */}
        <AboutSection onOpenCvModal={() => setIsCvModalOpen(true)} />

        {/* Services Spectrum (3 Categories & Modal) */}
        <ServicesSection onSelectServiceForContact={handleServiceSelected} />

        {/* Selected portfolio work */}
        <PortfolioSection onSelectProjectForContact={handleServiceSelected} />

        {/* Client testimonials */}
        <ReviewsSection />

        {/* Contact & Dynamic Inbound Leads Form */}
        <ContactSection preselectedService={preselectedService} />

        {/* Conversion CTA Banner */}
        <CtaBanner />
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
