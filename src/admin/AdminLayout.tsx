import React, { useState } from 'react';
import {
  LayoutDashboard,
  Home,
  User,
  Layers,
  FolderGit2,
  TrendingUp,
  Star,
  BookOpen,
  Wrench,
  GraduationCap,
  FileText,
  Image as ImageIcon,
  Mail,
  Share2,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Plus,
} from 'lucide-react';
import { KarimaMoniLogo } from '../components/KarimaMoniLogo';
import { useCms } from '../context/CmsContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminHomepageManager } from './AdminHomepageManager';
import { AdminAboutManager } from './AdminAboutManager';
import { AdminServicesManager } from './AdminServicesManager';
import { AdminPortfolioManager } from './AdminPortfolioManager';
import { AdminReviewsManager } from './AdminReviewsManager';
import { AdminCvManager } from './AdminCvManager';
import { AdminMediaManager } from './AdminMediaManager';
import { AdminLeadsManager } from './AdminLeadsManager';
import { AdminSocialContactManager } from './AdminSocialContactManager';
import { AdminSeoSettings } from './AdminSeoSettings';

interface AdminLayoutProps {
  onClose: () => void;
  onOpenCvPreview: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onClose, onOpenCvPreview }) => {
  const { logoutAdmin, data } = useCms();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const newLeadsCount = data.leads.filter((l) => l.status === 'New').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'homepage', label: 'Homepage & Hero', icon: <Home className="w-4 h-4" /> },
    { id: 'about', label: 'About & Mission', icon: <User className="w-4 h-4" /> },
    { id: 'services', label: 'Services Spectrum', icon: <Layers className="w-4 h-4" /> },
    { id: 'projects', label: 'Portfolio Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'reviews', label: 'Client Reviews', icon: <Star className="w-4 h-4" /> },
    { id: 'cv', label: 'CV / Resume Manager', icon: <FileText className="w-4 h-4" /> },
    { id: 'media', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> },
    {
      id: 'leads',
      label: 'Leads & Messages',
      icon: <Mail className="w-4 h-4" />,
      badge: newLeadsCount > 0 ? `${newLeadsCount} New` : undefined,
    },
    { id: 'social', label: 'Social & Contact Info', icon: <Share2 className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO & Site Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-[#001f5c] text-white shrink-0 border-r border-slate-800">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <KarimaMoniLogo variant="compact" theme="white" />
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === item.id
                  ? 'bg-[#003088] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={activeTab === item.id ? 'text-[#F4B820]' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/15 rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#F4B820]" />
            <span>View Public Site</span>
          </button>
          <button
            onClick={() => {
              logoutAdmin();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Administrative Work Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono font-bold text-[#003088] uppercase bg-blue-50 px-2.5 py-1 rounded">
              CMS Engine · Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#101828] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#003088]" />
              <span>Back to Public Website</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <AdminDashboard
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenCreateProject={() => setActiveTab('projects')}
              onOpenCreateService={() => setActiveTab('services')}
            />
          )}
          {activeTab === 'homepage' && <AdminHomepageManager />}
          {activeTab === 'about' && <AdminAboutManager />}
          {activeTab === 'services' && <AdminServicesManager />}
          {activeTab === 'projects' && <AdminPortfolioManager />}
          {activeTab === 'reviews' && <AdminReviewsManager />}
          {activeTab === 'cv' && <AdminCvManager onOpenPreviewCv={onOpenCvPreview} />}
          {activeTab === 'media' && <AdminMediaManager />}
          {activeTab === 'leads' && <AdminLeadsManager />}
          {activeTab === 'social' && <AdminSocialContactManager />}
          {activeTab === 'seo' && <AdminSeoSettings />}
        </main>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-[#001f5c] text-white flex flex-col p-4 z-10 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <KarimaMoniLogo variant="compact" theme="white" />
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                    activeTab === item.id
                      ? 'bg-[#003088] text-white'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </button>
              ))}
            </nav>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  onClose();
                }}
                className="w-full py-2 text-xs font-semibold bg-white/10 text-white rounded"
              >
                View Public Site
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
