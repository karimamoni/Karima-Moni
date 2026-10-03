import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  CmsDatabase,
  HomepageContent,
  ServiceCategory,
  ServiceItem,
  PortfolioProject,
  CaseStudy,
  ReviewItem,
  BlogPost,
  SkillItem,
  ToolItem,
  ExperienceItem,
  EducationCertificate,
  ResumeCV,
  LeadMessage,
  SocialLinks,
  ContactInfo,
  SeoSettings,
  MediaItem,
} from '../types';
import { initialCmsData } from '../data/initialData';
import { api } from '../api/client';

interface CmsContextType {
  data: CmsDatabase;
  isAdmin: boolean;
  isLoading: boolean;
  adminUser: { email: string; name: string } | null;
  saveError: string | null;
  clearSaveError: () => void;
  loginAdmin: (password: string, email?: string) => Promise<{ success: boolean; confirmationRequired?: boolean; error?: string }>;
  signupAdmin: (email: string, password: string) => Promise<{ success: boolean; confirmationRequired?: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;
  changeAdminPassword: (currentPassword: string, newPassword: string) => Promise<void>;
  refreshData: () => Promise<void>;
  refreshLeads: () => Promise<void>;

  // General Updates
  updateHomepage: (patch: Partial<HomepageContent>) => Promise<void>;
  updateSocialLinks: (links: SocialLinks) => Promise<void>;
  updateContactInfo: (info: ContactInfo) => Promise<void>;
  updateSeoSettings: (seo: SeoSettings) => Promise<void>;
  updateSettings: (settings: { cvButtonsEnabled: boolean; stickyCtaEnabled: boolean; availabilityEnabled: boolean; availabilityText: string }) => Promise<void>;
  resetToDefaults: () => Promise<void>;

  // Services
  addServiceCategory: (cat: Omit<ServiceCategory, 'id'>) => Promise<void>;
  updateServiceCategory: (id: string, cat: Partial<ServiceCategory>) => Promise<void>;
  deleteServiceCategory: (id: string) => Promise<void>;
  addService: (srv: Omit<ServiceItem, 'id'>) => Promise<void>;
  updateService: (id: string, srv: Partial<ServiceItem>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  // Projects
  addProject: (proj: Omit<PortfolioProject, 'id'>) => Promise<void>;
  updateProject: (id: string, proj: Partial<PortfolioProject>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  duplicateProject: (id: string) => Promise<void>;

  // Case Studies
  addCaseStudy: (cs: Omit<CaseStudy, 'id'>) => Promise<void>;
  updateCaseStudy: (id: string, cs: Partial<CaseStudy>) => Promise<void>;
  deleteCaseStudy: (id: string) => Promise<void>;

  // Reviews
  addReview: (rev: Omit<ReviewItem, 'id'>) => Promise<void>;
  updateReview: (id: string, rev: Partial<ReviewItem>) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;

  // Blog
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;

  // Skills & Tools
  addSkill: (skill: Omit<SkillItem, 'id'>) => Promise<void>;
  updateSkill: (id: string, skill: Partial<SkillItem>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  addTool: (tool: Omit<ToolItem, 'id'>) => Promise<void>;
  updateTool: (id: string, tool: Partial<ToolItem>) => Promise<void>;
  deleteTool: (id: string) => Promise<void>;

  // Experience & Education
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => Promise<void>;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  addEducation: (edu: Omit<EducationCertificate, 'id'>) => Promise<void>;
  updateEducation: (id: string, edu: Partial<EducationCertificate>) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;

  // CV / Resumes
  addResume: (resume: Omit<ResumeCV, 'id'>) => Promise<void>;
  setActiveResume: (id: string) => Promise<void>;
  deleteResume: (id: string) => Promise<void>;
  uploadResumePdf: (file: File, metadata?: { title?: string; version?: string; date?: string; notes?: string }) => Promise<void>;
  getActiveResume: () => ResumeCV | undefined;

  // Leads
  addLead: (lead: Omit<LeadMessage, 'id' | 'createdAt' | 'status'>) => Promise<{ success: boolean; leadId?: string }>;
  updateLeadStatus: (id: string, status: LeadMessage['status'], notes?: string) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;

  // Media Library
  addMedia: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => Promise<void>;
  uploadMediaFile: (file: File, name?: string) => Promise<MediaItem>;
  deleteMedia: (id: string) => Promise<void>;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CmsDatabase>(initialCmsData);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saveError, setSaveError] = useState<string | null>(null);
  const clearSaveError = useCallback(() => setSaveError(null), []);

  // Bootstrap/fetch site data from Supabase on mount
  const refreshData = useCallback(async () => {
    try {
      const remoteData = await api.bootstrap();
      if (remoteData && remoteData.homepage) {
        setData(remoteData);
      }
    } catch (err) {
      console.warn('[CMS Context] Could not fetch server database, using initial fallback:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch leads if admin
  const refreshLeads = useCallback(async () => {
    try {
      const leads = await api.getLeads();
      setData((prev) => ({ ...prev, leads }));
    } catch {}
  }, []);

  // Check Supabase Auth session on mount
  useEffect(() => {
    let mounted = true;
    async function init() {
      await refreshData();
      try {
        const session = await api.checkSession();
        if (mounted && session.authenticated && session.user) {
          setIsAdmin(true);
          setAdminUser({ email: session.user.email, name: session.user.name });
          refreshLeads();
        } else if (mounted) {
          setIsAdmin(false);
          setAdminUser(null);
        }
      } catch {
        if (mounted) {
          setIsAdmin(false);
          setAdminUser(null);
        }
      }
    }
    init();
    return () => {
      mounted = false;
    };
  }, [refreshData, refreshLeads]);



  // Real Server-Side Login
  const loginAdmin = async (
    password: string,
    email?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await api.login(password, email);
      if (res.success && res.user) {
        setIsAdmin(true);
        setAdminUser({ email: res.user.email, name: res.user.name });
        await refreshLeads();
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Invalid admin credentials' };
    }
  };

  // Real Server-Side Logout
  const logoutAdmin = async (): Promise<void> => {
    try {
      await api.logout();
    } catch {}
    setIsAdmin(false);
    setAdminUser(null);
  };

  const changeAdminPassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    await api.changeAdminPassword(currentPassword, newPassword);
  };

  // General Updates
  const updateHomepage = async (patch: Partial<HomepageContent>) => {
    setData((prev) => ({ ...prev, homepage: { ...prev.homepage, ...patch } }));
    try {
      await api.updateHomepage(patch);
    } catch (e) {
      await refreshData();
      setSaveError('Could not save homepage. Please try again.'); console.error('Failed to save homepage to database:', e);
    }
  };

  const updateSocialLinks = async (links: SocialLinks) => {
    setData((prev) => ({ ...prev, socialLinks: links }));
    try {
      await api.updateSocial(links);
    } catch (e) {
      await refreshData();
      setSaveError('Could not save social links. Please try again.'); console.error('Failed to save social links to database:', e);
    }
  };

  const updateContactInfo = async (info: ContactInfo) => {
    setData((prev) => ({ ...prev, contactInfo: info }));
    try {
      await api.updateContact(info);
    } catch (e) {
      await refreshData();
      setSaveError('Could not save contact info. Please try again.'); console.error('Failed to save contact info to database:', e);
    }
  };

  const updateSeoSettings = async (seo: SeoSettings) => {
    setData((prev) => ({ ...prev, seoSettings: seo }));
    try {
      await api.updateSeo(seo);
    } catch (e) {
      await refreshData();
      setSaveError('Could not save SEO. Please try again.'); console.error('Failed to save SEO to database:', e);
    }
  };

  const updateSettings = async (settings: { cvButtonsEnabled: boolean; stickyCtaEnabled: boolean; availabilityEnabled: boolean; availabilityText: string }) => {
    setData((prev) => ({ ...prev, settings }));
    try {
      await api.updateSettings(settings);
    } catch (e) {
      await refreshData();
      setSaveError('Could not save settings. Please try again.'); console.error('Failed to save settings to database:', e);
    }
  };

  const resetToDefaults = async () => {
    try {
      const res = await api.resetCms();
      if (res.data) setData(res.data);
    } catch (e) {
      await refreshData();
      console.error('Failed to reset CMS:', e);
      setData(initialCmsData);
    }
  };

  // Service Categories
  const addServiceCategory = async (cat: Omit<ServiceCategory, 'id'>) => {
    try {
      const created = await api.addServiceCategory(cat);
      setData((prev) => ({ ...prev, serviceCategories: [...prev.serviceCategories, created] }));
    } catch (e) {
      await refreshData();
      setSaveError('Could not add category. Please try again.'); console.error('Failed to add category:', e);
    }
  };

  const updateServiceCategory = async (id: string, cat: Partial<ServiceCategory>) => {
    setData((prev) => ({
      ...prev,
      serviceCategories: prev.serviceCategories.map((c) => (c.id === id ? { ...c, ...cat } : c)),
    }));
    try {
      await api.updateServiceCategory(id, cat);
    } catch (e) {
      await refreshData();
      setSaveError('Could not update category. Please try again.'); console.error('Failed to update category:', e);
    }
  };

  const deleteServiceCategory = async (id: string) => {
    setData((prev) => ({
      ...prev,
      serviceCategories: prev.serviceCategories.filter((c) => c.id !== id),
    }));
    try {
      await api.deleteServiceCategory(id);
    } catch (e) {
      await refreshData();
      setSaveError('Could not delete category. Please try again.'); console.error('Failed to delete category:', e);
    }
  };

  // Services
  const addService = async (srv: Omit<ServiceItem, 'id'>) => {
    try {
      const created = await api.addService(srv);
      setData((prev) => ({ ...prev, services: [...prev.services, created] }));
    } catch (e) {
      await refreshData();
      setSaveError('Could not add service. Please try again.'); console.error('Failed to add service:', e);
    }
  };

  const updateService = async (id: string, srv: Partial<ServiceItem>) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...srv } : s)),
    }));
    try {
      await api.updateService(id, srv);
    } catch (e) {
      await refreshData();
      setSaveError('Could not update service. Please try again.'); console.error('Failed to update service:', e);
    }
  };

  const deleteService = async (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
    try {
      await api.deleteService(id);
    } catch (e) {
      await refreshData();
      setSaveError('Could not delete service. Please try again.'); console.error('Failed to delete service:', e);
    }
  };

  // Projects
  const addProject = async (proj: Omit<PortfolioProject, 'id'>) => {
    try {
      const created = await api.addProject(proj);
      setData((prev) => ({ ...prev, projects: [created, ...prev.projects] }));
    } catch (e) {
      await refreshData();
      setSaveError('Could not add project. Please try again.'); console.error('Failed to add project:', e);
    }
  };

  const updateProject = async (id: string, proj: Partial<PortfolioProject>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...proj } : p)),
    }));
    try {
      await api.updateProject(id, proj);
    } catch (e) {
      await refreshData();
      setSaveError('Could not update project. Please try again.'); console.error('Failed to update project:', e);
    }
  };

  const deleteProject = async (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    try {
      await api.deleteProject(id);
    } catch (e) {
      await refreshData();
      setSaveError('Could not delete project. Please try again.'); console.error('Failed to delete project:', e);
    }
  };

  const duplicateProject = async (id: string) => {
    try {
      const duplicated = await api.duplicateProject(id);
      setData((prev) => ({ ...prev, projects: [duplicated, ...prev.projects] }));
    } catch (e) {
      await refreshData();
      console.error('Failed to duplicate project:', e);
    }
  };

  // Case Studies
  const addCaseStudy = async (cs: Omit<CaseStudy, 'id'>) => {
    try {
      const created = await api.addCaseStudy(cs);
      setData((prev) => ({ ...prev, caseStudies: [created, ...prev.caseStudies] }));
    } catch (e) {
      await refreshData();
      setSaveError('Could not add case study. Please try again.'); console.error('Failed to add case study:', e);
    }
  };

  const updateCaseStudy = async (id: string, cs: Partial<CaseStudy>) => {
    setData((prev) => ({
      ...prev,
      caseStudies: prev.caseStudies.map((c) => (c.id === id ? { ...c, ...cs } : c)),
    }));
    try {
      await api.updateCaseStudy(id, cs);
    } catch (e) {
      await refreshData();
      setSaveError('Could not update case study. Please try again.'); console.error('Failed to update case study:', e);
    }
  };

  const deleteCaseStudy = async (id: string) => {
    setData((prev) => ({
      ...prev,
      caseStudies: prev.caseStudies.filter((c) => c.id !== id),
    }));
    try {
      await api.deleteCaseStudy(id);
    } catch (e) {
      await refreshData();
      setSaveError('Could not delete case study. Please try again.'); console.error('Failed to delete case study:', e);
    }
  };

  // Reviews
  const addReview = async (rev: Omit<ReviewItem, 'id'>) => {
    try {
      const created = await api.addReview(rev);
      setData((prev) => ({ ...prev, reviews: [created, ...prev.reviews] }));
    } catch (e) {
      await refreshData();
      setSaveError('Could not add review. Please try again.'); console.error('Failed to add review:', e);
    }
  };

  const updateReview = async (id: string, rev: Partial<ReviewItem>) => {
    setData((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) => (r.id === id ? { ...r, ...rev } : r)),
    }));
    try {
      await api.updateReview(id, rev);
    } catch (e) {
      await refreshData();
      setSaveError('Could not update review. Please try again.'); console.error('Failed to update review:', e);
    }
  };

  const deleteReview = async (id: string) => {
    setData((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((r) => r.id !== id),
    }));
    try {
      await api.deleteReview(id);
    } catch (e) {
      await refreshData();
      setSaveError('Could not delete review. Please try again.'); console.error('Failed to delete review:', e);
    }
  };

  // Blog
  const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
    try {
      const created = await api.addBlogPost(post);
      setData((prev) => ({ ...prev, blogPosts: [created, ...prev.blogPosts] }));
    } catch (e) {
      await refreshData();
      setSaveError('Could not add blog post. Please try again.'); console.error('Failed to add blog post:', e);
    }
  };

  const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
    setData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.map((b) => (b.id === id ? { ...b, ...post } : b)),
    }));
    try {
      await api.updateBlogPost(id, post);
    } catch (e) {
      await refreshData();
      setSaveError('Could not update blog post. Please try again.'); console.error('Failed to update blog post:', e);
    }
  };

  const deleteBlogPost = async (id: string) => {
    setData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.filter((b) => b.id !== id),
    }));
    try {
      await api.deleteBlogPost(id);
    } catch (e) {
      await refreshData();
      setSaveError('Could not delete blog post. Please try again.'); console.error('Failed to delete blog post:', e);
    }
  };

  // Skills
  const addSkill = async (skill: Omit<SkillItem, 'id'>) => {
    try {
      const created = await api.addSkill(skill);
      setData((prev) => ({ ...prev, skills: [...prev.skills, created] }));
    } catch (e) {
      await refreshData();
      setSaveError('Could not add skill. Please try again.'); console.error('Failed to add skill:', e);
    }
  };

  const updateSkill = async (id: string, skill: Partial<SkillItem>) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
    }));
    try {
      await api.updateSkill(id, skill);
    } catch (e) {
      await refreshData();
      setSaveError('Could not update skill. Please try again.'); console.error('Failed to update skill:', e);
    }
  };

  const deleteSkill = async (id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
    try {
      await api.deleteSkill(id);
    } catch (e) {
      await refreshData();
      setSaveError('Could not delete skill. Please try again.'); console.error('Failed to delete skill:', e);
    }
  };

  // Tools
  const addTool = async (tool: Omit<ToolItem, 'id'>) => {
    try {
      const created = await api.addTool(tool);
      setData((prev) => ({ ...prev, tools: [...prev.tools, created] }));
    } catch (e) {
      await refreshData();
      setSaveError('Could not add tool. Please try again.'); console.error('Failed to add tool:', e);
    }
  };

  const updateTool = async (id: string, tool: Partial<ToolItem>) => {
    setData((prev) => ({
      ...prev,
      tools: prev.tools.map((t) => (t.id === id ? { ...t, ...tool } : t)),
    }));
    try {
      await api.updateTool(id, tool);
    } catch (e) {
      await refreshData();
      setSaveError('Could not update tool. Please try again.'); console.error('Failed to update tool:', e);
    }
  };

  const deleteTool = async (id: string) => {
    setData((prev) => ({
      ...prev,
      tools: prev.tools.filter((t) => t.id !== id),
    }));
    try {
      await api.deleteTool(id);
    } catch (e) {
      await refreshData();
      setSaveError('Could not delete tool. Please try again.'); console.error('Failed to delete tool:', e);
    }
  };

  // Experience
  const addExperience = async (exp: Omit<ExperienceItem, 'id'>) => {
    try {
      const created = await api.addExperience(exp);
      setData((prev) => ({ ...prev, experience: [...prev.experience, created] }));
    } catch (e) {
      await refreshData();
      setSaveError('Could not add experience. Please try again.'); console.error('Failed to add experience:', e);
    }
  };

  const updateExperience = async (id: string, exp: Partial<ExperienceItem>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, ...exp } : e)),
    }));
    try {
      await api.updateExperience(id, exp);
    } catch (e) {
      await refreshData();
      setSaveError('Could not update experience. Please try again.'); console.error('Failed to update experience:', e);
    }
  };

  const deleteExperience = async (id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
    try {
      await api.deleteExperience(id);
    } catch (e) {
      await refreshData();
      setSaveError('Could not delete experience. Please try again.'); console.error('Failed to delete experience:', e);
    }
  };

  // Education
  const addEducation = async (edu: Omit<EducationCertificate, 'id'>) => {
    try {
      const created = await api.addEducation(edu);
      setData((prev) => ({ ...prev, education: [...prev.education, created] }));
    } catch (e) {
      await refreshData();
      setSaveError('Could not add education. Please try again.'); console.error('Failed to add education:', e);
    }
  };

  const updateEducation = async (id: string, edu: Partial<EducationCertificate>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...edu } : e)),
    }));
    try {
      await api.updateEducation(id, edu);
    } catch (e) {
      await refreshData();
      setSaveError('Could not update education. Please try again.'); console.error('Failed to update education:', e);
    }
  };

  const deleteEducation = async (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
    try {
      await api.deleteEducation(id);
    } catch (e) {
      await refreshData();
      setSaveError('Could not delete education. Please try again.'); console.error('Failed to delete education:', e);
    }
  };

  // Resumes
  const addResume = async (resume: Omit<ResumeCV, 'id'>) => {
    try {
      const created = await api.addResume(resume);
      setData((prev) => {
        const updatedList = resume.isActive
          ? prev.resumes.map((r) => ({ ...r, isActive: false }))
          : prev.resumes;
        return { ...prev, resumes: [created, ...updatedList] };
      });
    } catch (e) {
      await refreshData();
      setSaveError('Could not add resume. Please try again.'); console.error('Failed to add resume:', e);
    }
  };

  const setActiveResume = async (id: string) => {
    setData((prev) => ({
      ...prev,
      resumes: prev.resumes.map((r) => ({ ...r, isActive: r.id === id })),
    }));
    try {
      await api.setActiveResume(id);
    } catch (e) {
      await refreshData();
      setSaveError('Could not activate resume. Please try again.'); console.error('Failed to activate resume:', e);
    }
  };

  const deleteResume = async (id: string) => {
    setData((prev) => ({
      ...prev,
      resumes: prev.resumes.filter((r) => r.id !== id),
    }));
    try {
      await api.deleteResume(id);
    } catch (e) {
      await refreshData();
      setSaveError('Could not delete resume. Please try again.'); console.error('Failed to delete resume:', e);
    }
  };

  const uploadResumePdf = async (
    file: File,
    metadata?: { title?: string; version?: string; date?: string; notes?: string }
  ) => {
    const res = await api.uploadResumePdf(file, metadata);
    if (res.resume) {
      setData((prev) => {
        const others = prev.resumes.map((r) => ({ ...r, isActive: false }));
        return { ...prev, resumes: [res.resume, ...others] };
      });
    }
  };

  const getActiveResume = (): ResumeCV | undefined => {
    return data.resumes.find((r) => r.isActive) || data.resumes[0];
  };

  // Leads (Centralized Persistent Server Lead Capture)
  const addLead = async (lead: Omit<LeadMessage, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; leadId?: string }> => {
    try {
      const res = await api.submitLead(lead);
      if (res.success) {
        return { success: true, leadId: res.leadId };
      }
      return { success: false };
    } catch (err: any) {
      console.error('Error submitting lead:', err);
      throw err;
    }
  };

  const updateLeadStatus = async (id: string, status: LeadMessage['status'], notes?: string) => {
    setData((prev) => ({
      ...prev,
      leads: prev.leads.map((l) =>
        l.id === id ? { ...l, status, notes: notes !== undefined ? notes : l.notes } : l
      ),
    }));
    try {
      await api.updateLeadStatus(id, status, notes);
    } catch (e) {
      await refreshData();
      setSaveError('Could not update lead status. Please try again.'); console.error('Failed to update lead status:', e);
    }
  };

  const deleteLead = async (id: string) => {
    setData((prev) => ({
      ...prev,
      leads: prev.leads.filter((l) => l.id !== id),
    }));
    try {
      await api.deleteLead(id);
    } catch (e) {
      await refreshData();
      setSaveError('Could not delete lead. Please try again.'); console.error('Failed to delete lead:', e);
    }
  };

  // Media Library
  const addMedia = async (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => {
    try {
      const created = await api.addMediaItem(item);
      setData((prev) => ({ ...prev, mediaLibrary: [created, ...prev.mediaLibrary] }));
    } catch (e) {
      await refreshData();
      setSaveError('Could not add media item. Please try again.'); console.error('Failed to add media item:', e);
    }
  };

  const uploadMediaFile = async (file: File, name?: string): Promise<MediaItem> => {
    const res = await api.uploadMedia(file, name);
    if (res.mediaItem) {
      setData((prev) => ({ ...prev, mediaLibrary: [res.mediaItem, ...prev.mediaLibrary] }));
      return res.mediaItem;
    }
    throw new Error('Upload failed');
  };

  const deleteMedia = async (id: string) => {
    setData((prev) => ({
      ...prev,
      mediaLibrary: prev.mediaLibrary.filter((m) => m.id !== id),
    }));
    try {
      await api.deleteMedia(id);
    } catch (e) {
      await refreshData();
      setSaveError('Could not delete media asset. Please try again.'); setSaveError('Could not delete the media asset. Please try again.'); console.error('Failed to delete media asset:', e);
    }
  };

  return (
    <CmsContext.Provider
      value={{
        data,
        isAdmin,
        saveError,
        clearSaveError,
        isLoading,
        adminUser,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        refreshData,
        refreshLeads,
        updateHomepage,
        updateSocialLinks,
        updateContactInfo,
        updateSeoSettings,
        updateSettings,
        resetToDefaults,
        addServiceCategory,
        updateServiceCategory,
        deleteServiceCategory,
        addService,
        updateService,
        deleteService,
        addProject,
        updateProject,
        deleteProject,
        duplicateProject,
        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,
        addReview,
        updateReview,
        deleteReview,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addSkill,
        updateSkill,
        deleteSkill,
        addTool,
        updateTool,
        deleteTool,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addResume,
        setActiveResume,
        deleteResume,
        uploadResumePdf,
        getActiveResume,
        addLead,
        updateLeadStatus,
        deleteLead,
        addMedia,
        uploadMediaFile,
        deleteMedia,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
