import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { initialCmsData } from '../src/data/initialData';
import { hashPassword } from './auth';
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
} from '../src/types';

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface PersistentDatabase extends CmsDatabase {
  users: AdminUser[];
}

class DatabaseService {
  private data: PersistentDatabase;
  private saveTimeout: NodeJS.Timeout | null = null;
  private client!: SupabaseClient;

  constructor() {
    this.data = { ...initialCmsData, users: [] };
  }

  public async initialize(): Promise<void> {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY;
    if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_SECRET_KEY must be configured.');

    this.client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });

    const { data, error } = await this.client
      .from('site_store')
      .select('data')
      .eq('id', 1)
      .maybeSingle<{ data: PersistentDatabase }>();

    if (error) throw new Error(`Supabase database read failed: ${error.message}`);

    if (data?.data) {
      const hadUsers = Boolean(data.data.users?.length);
      this.data = {
        ...initialCmsData,
        ...data.data,
        users: hadUsers ? data.data.users : [this.createDefaultAdminUser()],
      };
      if (!hadUsers) await this.persist();
      return;
    }

    this.data = { ...initialCmsData, users: [this.createDefaultAdminUser()] };
    await this.persist();
  }

  private async persist(): Promise<void> {
    const { error } = await this.client.from('site_store').upsert({
      id: 1,
      data: this.data,
      updated_at: new Date().toISOString(),
    });
    if (error) console.error('[DB Service] Error persisting to Supabase:', error.message);
  }

  private queueSave(): void {
    if (this.saveTimeout) clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      void this.persist();
    }, 100);
  }

  private createDefaultAdminUser(): AdminUser {
    const adminEmail = process.env.ADMIN_EMAIL;
    const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;
    if (!adminEmail) throw new Error('ADMIN_EMAIL must be configured.');
    if (!initialPassword || initialPassword.length < 12) {
      throw new Error('ADMIN_INITIAL_PASSWORD must be set and contain at least 12 characters.');
    }
    return {
      id: 'admin-1',
      email: adminEmail,
      passwordHash: hashPassword(initialPassword),
      name: 'Karima Moni',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  // Auth & User
  public getAdminUser(): AdminUser | undefined {
    return this.data.users.find((u) => u.role === 'admin') || this.data.users[0];
  }

  public getUserByEmail(email: string): AdminUser | undefined {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  public updateAdminPassword(newPasswordHash: string): boolean {
    const admin = this.getAdminUser();
    if (!admin) return false;
    admin.passwordHash = newPasswordHash;
    admin.updatedAt = new Date().toISOString();
    this.queueSave();
    return true;
  }

  // Public Site Data (excludes sensitive admin records)
  public getPublicData(): CmsDatabase {
    const { users, ...publicCms } = this.data;
    return publicCms;
  }

  // Reset to seed defaults
  public resetToDefaults(): void {
    const admin = this.getAdminUser() || this.createDefaultAdminUser();
    this.data = {
      ...initialCmsData,
      users: [admin],
    };
    void this.persist();
  }

  // Homepage
  public updateHomepage(patch: Partial<HomepageContent>): HomepageContent {
    this.data.homepage = { ...this.data.homepage, ...patch };
    this.queueSave();
    return this.data.homepage;
  }

  // Social & Contact & SEO & Settings
  public updateSocial(links: SocialLinks): SocialLinks {
    this.data.socialLinks = { ...this.data.socialLinks, ...links };
    this.queueSave();
    return this.data.socialLinks;
  }

  public updateContact(info: ContactInfo): ContactInfo {
    this.data.contactInfo = { ...this.data.contactInfo, ...info };
    this.queueSave();
    return this.data.contactInfo;
  }

  public updateSeo(seo: SeoSettings): SeoSettings {
    this.data.seoSettings = { ...this.data.seoSettings, ...seo };
    this.queueSave();
    return this.data.seoSettings;
  }

  public updateSettings(settings: { cvButtonsEnabled: boolean; stickyCtaEnabled: boolean }): typeof settings {
    this.data.settings = { ...this.data.settings, ...settings };
    this.queueSave();
    return this.data.settings;
  }

  // Service Categories
  public getServiceCategories(): ServiceCategory[] {
    return this.data.serviceCategories;
  }

  public addServiceCategory(cat: Omit<ServiceCategory, 'id'>): ServiceCategory {
    const newCat: ServiceCategory = { ...cat, id: `cat-${Date.now()}` };
    this.data.serviceCategories.push(newCat);
    this.queueSave();
    return newCat;
  }

  public updateServiceCategory(id: string, patch: Partial<ServiceCategory>): ServiceCategory | null {
    const idx = this.data.serviceCategories.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.data.serviceCategories[idx] = { ...this.data.serviceCategories[idx], ...patch };
    this.queueSave();
    return this.data.serviceCategories[idx];
  }

  public deleteServiceCategory(id: string): boolean {
    const initialLen = this.data.serviceCategories.length;
    this.data.serviceCategories = this.data.serviceCategories.filter((c) => c.id !== id);
    this.queueSave();
    return this.data.serviceCategories.length < initialLen;
  }

  // Services
  public getServices(): ServiceItem[] {
    return this.data.services;
  }

  public addService(srv: Omit<ServiceItem, 'id'>): ServiceItem {
    const newSrv: ServiceItem = { ...srv, id: `srv-${Date.now()}` };
    this.data.services.push(newSrv);
    this.queueSave();
    return newSrv;
  }

  public updateService(id: string, patch: Partial<ServiceItem>): ServiceItem | null {
    const idx = this.data.services.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    this.data.services[idx] = { ...this.data.services[idx], ...patch };
    this.queueSave();
    return this.data.services[idx];
  }

  public deleteService(id: string): boolean {
    const initialLen = this.data.services.length;
    this.data.services = this.data.services.filter((s) => s.id !== id);
    this.queueSave();
    return this.data.services.length < initialLen;
  }

  // Projects
  public getProjects(): PortfolioProject[] {
    return this.data.projects;
  }

  public addProject(proj: Omit<PortfolioProject, 'id'>): PortfolioProject {
    const newProj: PortfolioProject = { ...proj, id: `proj-${Date.now()}` };
    this.data.projects.unshift(newProj);
    this.queueSave();
    return newProj;
  }

  public updateProject(id: string, patch: Partial<PortfolioProject>): PortfolioProject | null {
    const idx = this.data.projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.data.projects[idx] = { ...this.data.projects[idx], ...patch };
    this.queueSave();
    return this.data.projects[idx];
  }

  public deleteProject(id: string): boolean {
    const initialLen = this.data.projects.length;
    this.data.projects = this.data.projects.filter((p) => p.id !== id);
    this.queueSave();
    return this.data.projects.length < initialLen;
  }

  public duplicateProject(id: string): PortfolioProject | null {
    const orig = this.data.projects.find((p) => p.id === id);
    if (!orig) return null;
    const duplicated: PortfolioProject = {
      ...orig,
      id: `proj-${Date.now()}`,
      name: `${orig.name} (Copy)`,
      status: 'Draft',
    };
    this.data.projects.unshift(duplicated);
    this.queueSave();
    return duplicated;
  }

  // Case Studies
  public getCaseStudies(): CaseStudy[] {
    return this.data.caseStudies;
  }

  public addCaseStudy(cs: Omit<CaseStudy, 'id'>): CaseStudy {
    const newCs: CaseStudy = { ...cs, id: `cs-${Date.now()}` };
    this.data.caseStudies.unshift(newCs);
    this.queueSave();
    return newCs;
  }

  public updateCaseStudy(id: string, patch: Partial<CaseStudy>): CaseStudy | null {
    const idx = this.data.caseStudies.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.data.caseStudies[idx] = { ...this.data.caseStudies[idx], ...patch };
    this.queueSave();
    return this.data.caseStudies[idx];
  }

  public deleteCaseStudy(id: string): boolean {
    const initialLen = this.data.caseStudies.length;
    this.data.caseStudies = this.data.caseStudies.filter((c) => c.id !== id);
    this.queueSave();
    return this.data.caseStudies.length < initialLen;
  }

  // Reviews
  public getReviews(): ReviewItem[] {
    return this.data.reviews;
  }

  public addReview(rev: Omit<ReviewItem, 'id'>): ReviewItem {
    const newRev: ReviewItem = { ...rev, id: `rev-${Date.now()}` };
    this.data.reviews.unshift(newRev);
    this.queueSave();
    return newRev;
  }

  public updateReview(id: string, patch: Partial<ReviewItem>): ReviewItem | null {
    const idx = this.data.reviews.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    this.data.reviews[idx] = { ...this.data.reviews[idx], ...patch };
    this.queueSave();
    return this.data.reviews[idx];
  }

  public deleteReview(id: string): boolean {
    const initialLen = this.data.reviews.length;
    this.data.reviews = this.data.reviews.filter((r) => r.id !== id);
    this.queueSave();
    return this.data.reviews.length < initialLen;
  }

  // Blog Posts
  public getBlogPosts(): BlogPost[] {
    return this.data.blogPosts;
  }

  public addBlogPost(post: Omit<BlogPost, 'id'>): BlogPost {
    const newPost: BlogPost = { ...post, id: `blog-${Date.now()}` };
    this.data.blogPosts.unshift(newPost);
    this.queueSave();
    return newPost;
  }

  public updateBlogPost(id: string, patch: Partial<BlogPost>): BlogPost | null {
    const idx = this.data.blogPosts.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    this.data.blogPosts[idx] = { ...this.data.blogPosts[idx], ...patch };
    this.queueSave();
    return this.data.blogPosts[idx];
  }

  public deleteBlogPost(id: string): boolean {
    const initialLen = this.data.blogPosts.length;
    this.data.blogPosts = this.data.blogPosts.filter((b) => b.id !== id);
    this.queueSave();
    return this.data.blogPosts.length < initialLen;
  }

  // Skills
  public getSkills(): SkillItem[] {
    return this.data.skills;
  }

  public addSkill(skill: Omit<SkillItem, 'id'>): SkillItem {
    const newSkill: SkillItem = { ...skill, id: `sk-${Date.now()}` };
    this.data.skills.push(newSkill);
    this.queueSave();
    return newSkill;
  }

  public updateSkill(id: string, patch: Partial<SkillItem>): SkillItem | null {
    const idx = this.data.skills.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    this.data.skills[idx] = { ...this.data.skills[idx], ...patch };
    this.queueSave();
    return this.data.skills[idx];
  }

  public deleteSkill(id: string): boolean {
    const initialLen = this.data.skills.length;
    this.data.skills = this.data.skills.filter((s) => s.id !== id);
    this.queueSave();
    return this.data.skills.length < initialLen;
  }

  // Tools
  public getTools(): ToolItem[] {
    return this.data.tools;
  }

  public addTool(tool: Omit<ToolItem, 'id'>): ToolItem {
    const newTool: ToolItem = { ...tool, id: `tool-${Date.now()}` };
    this.data.tools.push(newTool);
    this.queueSave();
    return newTool;
  }

  public updateTool(id: string, patch: Partial<ToolItem>): ToolItem | null {
    const idx = this.data.tools.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    this.data.tools[idx] = { ...this.data.tools[idx], ...patch };
    this.queueSave();
    return this.data.tools[idx];
  }

  public deleteTool(id: string): boolean {
    const initialLen = this.data.tools.length;
    this.data.tools = this.data.tools.filter((t) => t.id !== id);
    this.queueSave();
    return this.data.tools.length < initialLen;
  }

  // Experience
  public getExperience(): ExperienceItem[] {
    return this.data.experience;
  }

  public addExperience(exp: Omit<ExperienceItem, 'id'>): ExperienceItem {
    const newExp: ExperienceItem = { ...exp, id: `exp-${Date.now()}` };
    this.data.experience.push(newExp);
    this.queueSave();
    return newExp;
  }

  public updateExperience(id: string, patch: Partial<ExperienceItem>): ExperienceItem | null {
    const idx = this.data.experience.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    this.data.experience[idx] = { ...this.data.experience[idx], ...patch };
    this.queueSave();
    return this.data.experience[idx];
  }

  public deleteExperience(id: string): boolean {
    const initialLen = this.data.experience.length;
    this.data.experience = this.data.experience.filter((e) => e.id !== id);
    this.queueSave();
    return this.data.experience.length < initialLen;
  }

  // Education
  public getEducation(): EducationCertificate[] {
    return this.data.education;
  }

  public addEducation(edu: Omit<EducationCertificate, 'id'>): EducationCertificate {
    const newEdu: EducationCertificate = { ...edu, id: `edu-${Date.now()}` };
    this.data.education.push(newEdu);
    this.queueSave();
    return newEdu;
  }

  public updateEducation(id: string, patch: Partial<EducationCertificate>): EducationCertificate | null {
    const idx = this.data.education.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    this.data.education[idx] = { ...this.data.education[idx], ...patch };
    this.queueSave();
    return this.data.education[idx];
  }

  public deleteEducation(id: string): boolean {
    const initialLen = this.data.education.length;
    this.data.education = this.data.education.filter((e) => e.id !== id);
    this.queueSave();
    return this.data.education.length < initialLen;
  }

  // Resumes
  public getResumes(): ResumeCV[] {
    return this.data.resumes;
  }

  public addResume(res: Omit<ResumeCV, 'id'>): ResumeCV {
    const id = `cv-${Date.now()}`;
    if (res.isActive) {
      this.data.resumes.forEach((r) => (r.isActive = false));
    }
    const newRes: ResumeCV = { ...res, id };
    this.data.resumes.unshift(newRes);
    this.queueSave();
    return newRes;
  }

  public setActiveResume(id: string): boolean {
    let found = false;
    this.data.resumes.forEach((r) => {
      if (r.id === id) {
        r.isActive = true;
        found = true;
      } else {
        r.isActive = false;
      }
    });
    if (found) this.queueSave();
    return found;
  }

  public deleteResume(id: string): boolean {
    const initialLen = this.data.resumes.length;
    this.data.resumes = this.data.resumes.filter((r) => r.id !== id);
    // If deleted active resume, set first remaining as active
    if (!this.data.resumes.some((r) => r.isActive) && this.data.resumes.length > 0) {
      this.data.resumes[0].isActive = true;
    }
    this.queueSave();
    return this.data.resumes.length < initialLen;
  }

  // Leads
  public getLeads(): LeadMessage[] {
    return this.data.leads;
  }

  public addLead(lead: Omit<LeadMessage, 'id' | 'createdAt' | 'status'>): LeadMessage {
    const newLead: LeadMessage = {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    this.data.leads.unshift(newLead);
    this.queueSave();
    return newLead;
  }

  public updateLeadStatus(id: string, status: LeadMessage['status'], notes?: string): LeadMessage | null {
    const idx = this.data.leads.findIndex((l) => l.id === id);
    if (idx === -1) return null;
    this.data.leads[idx].status = status;
    if (notes !== undefined) {
      this.data.leads[idx].notes = notes;
    }
    this.queueSave();
    return this.data.leads[idx];
  }

  public deleteLead(id: string): boolean {
    const initialLen = this.data.leads.length;
    this.data.leads = this.data.leads.filter((l) => l.id !== id);
    this.queueSave();
    return this.data.leads.length < initialLen;
  }

  // Media Library
  public getMedia(): MediaItem[] {
    return this.data.mediaLibrary;
  }

  public addMedia(item: Omit<MediaItem, 'id' | 'uploadedAt'>): MediaItem {
    const newItem: MediaItem = {
      ...item,
      id: `media-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    this.data.mediaLibrary.unshift(newItem);
    this.queueSave();
    return newItem;
  }

  public deleteMedia(id: string): boolean {
    const initialLen = this.data.mediaLibrary.length;
    this.data.mediaLibrary = this.data.mediaLibrary.filter((m) => m.id !== id);
    this.queueSave();
    return this.data.mediaLibrary.length < initialLen;
  }
}

export const db = new DatabaseService();
