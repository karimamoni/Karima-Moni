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

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(endpoint, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let errorMsg = `Server error (${res.status})`;
    try {
      const errJson = await res.json();
      if (errJson.error) errorMsg = errJson.error;
    } catch {}
    throw new Error(errorMsg);
  }

  return res.json();
}

export const api = {
  // Public Site Data
  async getSiteData(): Promise<CmsDatabase> {
    return request<CmsDatabase>('/api/site/data');
  },

  // Auth
  async checkSession(): Promise<{ authenticated: boolean; user?: { email: string; name: string; role: string } }> {
    try {
      return await request('/api/auth/session');
    } catch {
      return { authenticated: false };
    }
  },

  async login(password: string, email?: string): Promise<{ success: boolean; user: any }> {
    return request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password, email }),
    });
  },

  async logout(): Promise<{ success: boolean }> {
    return request('/api/auth/logout', { method: 'POST' });
  },

  // Lead Submission (Public)
  async submitLead(data: Omit<LeadMessage, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; leadId: string }> {
    return request('/api/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // CMS Reset
  async resetCms(): Promise<{ success: boolean; data: CmsDatabase }> {
    return request('/api/cms/reset', { method: 'POST' });
  },

  // Homepage, Social, Contact, SEO, Settings
  async updateHomepage(patch: Partial<HomepageContent>): Promise<{ success: boolean; homepage: HomepageContent }> {
    return request('/api/home', {
      method: 'PUT',
      body: JSON.stringify(patch),
    });
  },

  async updateSocial(links: SocialLinks): Promise<{ success: boolean; socialLinks: SocialLinks }> {
    return request('/api/social', {
      method: 'PUT',
      body: JSON.stringify(links),
    });
  },

  async updateContact(info: ContactInfo): Promise<{ success: boolean; contactInfo: ContactInfo }> {
    return request('/api/contact-info', {
      method: 'PUT',
      body: JSON.stringify(info),
    });
  },

  async updateSeo(seo: SeoSettings): Promise<{ success: boolean; seoSettings: SeoSettings }> {
    return request('/api/seo', {
      method: 'PUT',
      body: JSON.stringify(seo),
    });
  },

  async updateSettings(settings: { cvButtonsEnabled: boolean; stickyCtaEnabled: boolean }): Promise<{ success: boolean; settings: any }> {
    return request('/api/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },

  // Service Categories
  async addServiceCategory(cat: Omit<ServiceCategory, 'id'>): Promise<ServiceCategory> {
    return request('/api/service-categories', {
      method: 'POST',
      body: JSON.stringify(cat),
    });
  },

  async updateServiceCategory(id: string, patch: Partial<ServiceCategory>): Promise<ServiceCategory> {
    return request(`/api/service-categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patch),
    });
  },

  async deleteServiceCategory(id: string): Promise<{ success: boolean }> {
    return request(`/api/service-categories/${id}`, { method: 'DELETE' });
  },

  // Services
  async addService(srv: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
    return request('/api/services', {
      method: 'POST',
      body: JSON.stringify(srv),
    });
  },

  async updateService(id: string, patch: Partial<ServiceItem>): Promise<ServiceItem> {
    return request(`/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patch),
    });
  },

  async deleteService(id: string): Promise<{ success: boolean }> {
    return request(`/api/services/${id}`, { method: 'DELETE' });
  },

  // Projects
  async addProject(proj: Omit<PortfolioProject, 'id'>): Promise<PortfolioProject> {
    return request('/api/projects', {
      method: 'POST',
      body: JSON.stringify(proj),
    });
  },

  async updateProject(id: string, patch: Partial<PortfolioProject>): Promise<PortfolioProject> {
    return request(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patch),
    });
  },

  async deleteProject(id: string): Promise<{ success: boolean }> {
    return request(`/api/projects/${id}`, { method: 'DELETE' });
  },

  async duplicateProject(id: string): Promise<PortfolioProject> {
    return request(`/api/projects/${id}/duplicate`, { method: 'POST' });
  },

  // Case Studies
  async addCaseStudy(cs: Omit<CaseStudy, 'id'>): Promise<CaseStudy> {
    return request('/api/case-studies', {
      method: 'POST',
      body: JSON.stringify(cs),
    });
  },

  async updateCaseStudy(id: string, patch: Partial<CaseStudy>): Promise<CaseStudy> {
    return request(`/api/case-studies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patch),
    });
  },

  async deleteCaseStudy(id: string): Promise<{ success: boolean }> {
    return request(`/api/case-studies/${id}`, { method: 'DELETE' });
  },

  // Reviews
  async addReview(rev: Omit<ReviewItem, 'id'>): Promise<ReviewItem> {
    return request('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(rev),
    });
  },

  async updateReview(id: string, patch: Partial<ReviewItem>): Promise<ReviewItem> {
    return request(`/api/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patch),
    });
  },

  async deleteReview(id: string): Promise<{ success: boolean }> {
    return request(`/api/reviews/${id}`, { method: 'DELETE' });
  },

  // Blog Posts
  async addBlogPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    return request('/api/blog', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  },

  async updateBlogPost(id: string, patch: Partial<BlogPost>): Promise<BlogPost> {
    return request(`/api/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patch),
    });
  },

  async deleteBlogPost(id: string): Promise<{ success: boolean }> {
    return request(`/api/blog/${id}`, { method: 'DELETE' });
  },

  // Skills
  async addSkill(skill: Omit<SkillItem, 'id'>): Promise<SkillItem> {
    return request('/api/skills', {
      method: 'POST',
      body: JSON.stringify(skill),
    });
  },

  async updateSkill(id: string, patch: Partial<SkillItem>): Promise<SkillItem> {
    return request(`/api/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patch),
    });
  },

  async deleteSkill(id: string): Promise<{ success: boolean }> {
    return request(`/api/skills/${id}`, { method: 'DELETE' });
  },

  // Tools
  async addTool(tool: Omit<ToolItem, 'id'>): Promise<ToolItem> {
    return request('/api/tools', {
      method: 'POST',
      body: JSON.stringify(tool),
    });
  },

  async updateTool(id: string, patch: Partial<ToolItem>): Promise<ToolItem> {
    return request(`/api/tools/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patch),
    });
  },

  async deleteTool(id: string): Promise<{ success: boolean }> {
    return request(`/api/tools/${id}`, { method: 'DELETE' });
  },

  // Experience
  async addExperience(exp: Omit<ExperienceItem, 'id'>): Promise<ExperienceItem> {
    return request('/api/experience', {
      method: 'POST',
      body: JSON.stringify(exp),
    });
  },

  async updateExperience(id: string, patch: Partial<ExperienceItem>): Promise<ExperienceItem> {
    return request(`/api/experience/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patch),
    });
  },

  async deleteExperience(id: string): Promise<{ success: boolean }> {
    return request(`/api/experience/${id}`, { method: 'DELETE' });
  },

  // Education
  async addEducation(edu: Omit<EducationCertificate, 'id'>): Promise<EducationCertificate> {
    return request('/api/education', {
      method: 'POST',
      body: JSON.stringify(edu),
    });
  },

  async updateEducation(id: string, patch: Partial<EducationCertificate>): Promise<EducationCertificate> {
    return request(`/api/education/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patch),
    });
  },

  async deleteEducation(id: string): Promise<{ success: boolean }> {
    return request(`/api/education/${id}`, { method: 'DELETE' });
  },

  // Resumes
  async addResume(res: Omit<ResumeCV, 'id'>): Promise<ResumeCV> {
    return request('/api/resumes', {
      method: 'POST',
      body: JSON.stringify(res),
    });
  },

  async setActiveResume(id: string): Promise<{ success: boolean; resumes: ResumeCV[] }> {
    return request(`/api/resumes/${id}/active`, { method: 'PUT' });
  },

  async deleteResume(id: string): Promise<{ success: boolean; resumes: ResumeCV[] }> {
    return request(`/api/resumes/${id}`, { method: 'DELETE' });
  },

  async uploadResumePdf(file: File, metadata?: { title?: string; version?: string; date?: string; notes?: string }): Promise<{ success: boolean; resume: ResumeCV; fileUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata?.title) formData.append('title', metadata.title);
    if (metadata?.version) formData.append('version', metadata.version);
    if (metadata?.date) formData.append('date', metadata.date);
    if (metadata?.notes) formData.append('notes', metadata.notes);

    const res = await fetch('/api/cv/upload', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(err.error || 'Failed to upload CV PDF');
    }

    return res.json();
  },

  // Leads
  async getLeads(): Promise<LeadMessage[]> {
    return request('/api/leads');
  },

  async updateLeadStatus(id: string, status: LeadMessage['status'], notes?: string): Promise<LeadMessage> {
    return request(`/api/leads/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  },

  async deleteLead(id: string): Promise<{ success: boolean }> {
    return request(`/api/leads/${id}`, { method: 'DELETE' });
  },

  // Media
  async getMedia(): Promise<MediaItem[]> {
    return request('/api/media');
  },

  async uploadMedia(file: File, name?: string): Promise<{ success: boolean; mediaItem: MediaItem; fileUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    if (name) formData.append('name', name);

    const res = await fetch('/api/media/upload', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(err.error || 'Failed to upload media asset');
    }

    return res.json();
  },

  async addMediaItem(item: Omit<MediaItem, 'id' | 'uploadedAt'>): Promise<MediaItem> {
    return request('/api/media', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },

  async deleteMedia(id: string): Promise<{ success: boolean }> {
    return request(`/api/media/${id}`, { method: 'DELETE' });
  },
};
