import { supabase, PORTFOLIO_API_URL } from '../lib/supabase';
import {
  CmsDatabase, HomepageContent, ServiceCategory, ServiceItem, PortfolioProject, CaseStudy,
  ReviewItem, BlogPost, SkillItem, ToolItem, ExperienceItem, EducationCertificate, ResumeCV,
  LeadMessage, SocialLinks, ContactInfo, SeoSettings, MediaItem,
} from '../types';
import { initialCmsData } from '../data/initialData';

// Dedicated CMS admin identity. This is intentionally separate from the public contact email.
const ADMIN_EMAIL = 'karimamonimarketer@gmail.com';

async function invoke<T>(body: Record<string, any>): Promise<T> {
  const { data, error } = await supabase.functions.invoke('portfolio-api', { body });
  if (error) {
    let message = error.message || 'Request failed';
    if ((error as any).context) {
      try {
        const payload = await (error as any).context.json();
        if (payload?.error) message = payload.error;
      } catch {}
    }
    throw new Error(message);
  }
  return data as T;
}

async function upload(formData: FormData) {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  const res = await fetch(PORTFOLIO_API_URL, {
    method: 'POST',
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
    body: formData,
  });
  const data = await res.json().catch(() => ({ error: 'Upload failed' }));
  if (!res.ok) throw new Error(data.error || 'Upload failed');
  return data;
}

const crud = async <T>(resource: string, action: string, data?: any, id?: string): Promise<T> =>
  invoke<T>({ op: 'crud', resource, action, data, id });

export const api = {
  async bootstrap(): Promise<CmsDatabase> {
    // Public clients only read the already-initialized store. Initialization is never performed by a browser request.
    return invoke<CmsDatabase>({ op: 'get_site_data' });
  },
  async getSiteData(): Promise<CmsDatabase> {
    return invoke<CmsDatabase>({ op: 'get_site_data' });
  },

  async checkSession(): Promise<{ authenticated: boolean; user?: { email: string; name: string; role: string } }> {
    const { data } = await supabase.auth.getUser();
    if (!data.user?.email) return { authenticated: false };
    try {
      await invoke<LeadMessage[]>({ op: 'get_leads' });
      return { authenticated: true, user: { email: data.user.email, name: 'Karima Moni', role: 'admin' } };
    } catch {
      await supabase.auth.signOut();
      return { authenticated: false };
    }
  },

  async login(password: string, email?: string): Promise<{ success: boolean; user: any }> {
    const targetEmail = (email || ADMIN_EMAIL).trim();
    const { data, error } = await supabase.auth.signInWithPassword({ email: targetEmail, password });
    if (error || !data.user) throw new Error(error?.message || 'Invalid admin credentials.');
    return { success: true, user: { email: data.user.email, name: 'Karima Moni', role: 'admin' } };
  },

  async logout(): Promise<{ success: boolean }> {
    await supabase.auth.signOut();
    return { success: true };
  },

  async changeAdminPassword(currentPassword: string, newPassword: string): Promise<{ success: boolean }> {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const email = userData.user?.email;
    if (userError || !email) throw new Error('Your admin session has expired. Please sign in again.');
    const { error: verifyError } = await supabase.auth.signInWithPassword({ email, password: currentPassword });
    if (verifyError) throw new Error('Current password is incorrect.');
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw new Error(error.message);
    return { success: true };
  },

  async submitLead(data: Omit<LeadMessage, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; leadId: string }> {
    return invoke({ op: 'submit_lead', data });
  },

  async resetCms(): Promise<{ success: boolean; data: CmsDatabase }> {
    return invoke({ op: 'reset_cms', data: initialCmsData });
  },

  async updateHomepage(patch: Partial<HomepageContent>) { return invoke({ op: 'update_homepage', data: patch }); },
  async updateSocial(links: SocialLinks) { return invoke({ op: 'update_social', data: links }); },
  async updateContact(info: ContactInfo) { return invoke({ op: 'update_contact', data: info }); },
  async updateSeo(seo: SeoSettings) { return invoke({ op: 'update_seo', data: seo }); },
  async updateSettings(settings: { cvButtonsEnabled: boolean; stickyCtaEnabled: boolean; availabilityEnabled: boolean; availabilityText: string; logoUrl: string }) { return invoke({ op: 'update_settings', data: settings }); },

  async addServiceCategory(x: Omit<ServiceCategory, 'id'>) { return crud<ServiceCategory>('serviceCategories','add',x); },
  async updateServiceCategory(id: string, x: Partial<ServiceCategory>) { return crud<ServiceCategory>('serviceCategories','update',x,id); },
  async deleteServiceCategory(id: string) { return crud<{success:boolean}>('serviceCategories','delete',undefined,id); },

  async addService(x: Omit<ServiceItem, 'id'>) { return crud<ServiceItem>('services','add',x); },
  async updateService(id: string, x: Partial<ServiceItem>) { return crud<ServiceItem>('services','update',x,id); },
  async deleteService(id: string) { return crud<{success:boolean}>('services','delete',undefined,id); },

  async addProject(x: Omit<PortfolioProject, 'id'>) { return crud<PortfolioProject>('projects','add',x); },
  async updateProject(id: string, x: Partial<PortfolioProject>) { return crud<PortfolioProject>('projects','update',x,id); },
  async deleteProject(id: string) { return crud<{success:boolean}>('projects','delete',undefined,id); },
  async duplicateProject(id: string) { return crud<PortfolioProject>('projects','duplicate',undefined,id); },

  async addCaseStudy(x: Omit<CaseStudy, 'id'>) { return crud<CaseStudy>('caseStudies','add',x); },
  async updateCaseStudy(id: string, x: Partial<CaseStudy>) { return crud<CaseStudy>('caseStudies','update',x,id); },
  async deleteCaseStudy(id: string) { return crud<{success:boolean}>('caseStudies','delete',undefined,id); },

  async addReview(x: Omit<ReviewItem, 'id'>) { return crud<ReviewItem>('reviews','add',x); },
  async updateReview(id: string, x: Partial<ReviewItem>) { return crud<ReviewItem>('reviews','update',x,id); },
  async deleteReview(id: string) { return crud<{success:boolean}>('reviews','delete',undefined,id); },

  async addBlogPost(x: Omit<BlogPost, 'id'>) { return crud<BlogPost>('blogPosts','add',x); },
  async updateBlogPost(id: string, x: Partial<BlogPost>) { return crud<BlogPost>('blogPosts','update',x,id); },
  async deleteBlogPost(id: string) { return crud<{success:boolean}>('blogPosts','delete',undefined,id); },

  async addSkill(x: Omit<SkillItem, 'id'>) { return crud<SkillItem>('skills','add',x); },
  async updateSkill(id: string, x: Partial<SkillItem>) { return crud<SkillItem>('skills','update',x,id); },
  async deleteSkill(id: string) { return crud<{success:boolean}>('skills','delete',undefined,id); },

  async addTool(x: Omit<ToolItem, 'id'>) { return crud<ToolItem>('tools','add',x); },
  async updateTool(id: string, x: Partial<ToolItem>) { return crud<ToolItem>('tools','update',x,id); },
  async deleteTool(id: string) { return crud<{success:boolean}>('tools','delete',undefined,id); },

  async addExperience(x: Omit<ExperienceItem, 'id'>) { return crud<ExperienceItem>('experience','add',x); },
  async updateExperience(id: string, x: Partial<ExperienceItem>) { return crud<ExperienceItem>('experience','update',x,id); },
  async deleteExperience(id: string) { return crud<{success:boolean}>('experience','delete',undefined,id); },

  async addEducation(x: Omit<EducationCertificate, 'id'>) { return crud<EducationCertificate>('education','add',x); },
  async updateEducation(id: string, x: Partial<EducationCertificate>) { return crud<EducationCertificate>('education','update',x,id); },
  async deleteEducation(id: string) { return crud<{success:boolean}>('education','delete',undefined,id); },

  async addResume(x: Omit<ResumeCV, 'id'>) { return crud<ResumeCV>('resumes','add',x); },
  async setActiveResume(id: string) { return crud<{success:boolean;resumes:ResumeCV[]}>('resumes','active',undefined,id); },
  async deleteResume(id: string) { return crud<{success:boolean;resumes:ResumeCV[]}>('resumes','delete',undefined,id); },

  async uploadResumePdf(file: File, metadata?: { title?: string; version?: string; date?: string; notes?: string }) {
    const fd = new FormData();
    fd.append('kind','cv'); fd.append('file',file);
    Object.entries(metadata || {}).forEach(([k,v]) => v && fd.append(k,v));
    return upload(fd) as Promise<{success:boolean;resume:ResumeCV;fileUrl:string}>;
  },

  async getLeads() { return invoke<LeadMessage[]>({ op: 'get_leads' }); },
  async updateLeadStatus(id: string, status: LeadMessage['status'], notes?: string) { return invoke<LeadMessage>({ op:'update_lead', id, status, notes }); },
  async deleteLead(id: string) { return invoke<{success:boolean}>({ op:'delete_lead', id }); },

  async getMedia() { return invoke<MediaItem[]>({ op:'get_site_data' }).then((x:any) => x.mediaLibrary || []); },
  async uploadMedia(file: File, name?: string) {
    const fd = new FormData(); fd.append('kind','media'); fd.append('file',file); if(name) fd.append('name',name);
    return upload(fd) as Promise<{success:boolean;mediaItem:MediaItem;fileUrl:string}>;
  },
  async addMediaItem(item: Omit<MediaItem,'id'|'uploadedAt'>) { return crud<MediaItem>('mediaLibrary','add',item); },
  async deleteMedia(id: string) { return crud<{success:boolean}>('mediaLibrary','delete',undefined,id); },
};
