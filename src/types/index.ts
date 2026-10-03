export type ProjectCategory = 'Performance Marketing' | 'Creative Content';

export type ContentStatus = 'Draft' | 'Published' | 'Archived';

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  badge: string;
  description: string;
  order: number;
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  shortDescription: string;
  iconName?: string;
  overview: string;
  deliverables: string[];
  process: { step: string; title: string; description: string }[];
  tools: string[];
  ctaText?: string;
  published: boolean;
  order: number;
}

export interface PortfolioProject {
  id: string;
  name: string;
  client: string;
  category: ProjectCategory;
  subCategory: string;
  service: string;
  date: string;
  thumbnail: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  role: string;
  toolsUsed: string[];
  challenge: string;
  goal: string;
  strategy: string;
  workDone: string[];
  result: string;
  beforeImage?: string;
  afterImage?: string;
  videoUrl?: string;
  externalUrl?: string;
  isCaseStudy?: boolean;
  featured: boolean;
  status: ContentStatus;
  order: number;
}

export interface CaseStudy {
  id: string;
  projectId?: string;
  title: string;
  client: string;
  category: ProjectCategory;
  service: string;
  thumbnail: string;
  overview: string;
  challenge: string;
  goal: string;
  strategy: string;
  execution: string;
  result: string;
  finalOutcome: string;
  beforeImage?: string;
  afterImage?: string;
  featured: boolean;
  status: ContentStatus;
  date: string;
  order: number;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatar?: string;
  review: string;
  rating: number;
  date: string;
  service: string;
  featured: boolean;
  status: ContentStatus;
  order: number;
}

export type BlogCategory =
  | 'Digital Marketing'
  | 'Graphic Design'
  | 'AI'
  | 'SEO'
  | 'Video Editing'
  | 'Freelancing'
  | string;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  category: BlogCategory;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  publishDate: string;
  status: ContentStatus;
  featured?: boolean;
  order: number;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Digital Marketing' | 'Creative' | 'AI & Video';
  order: number;
}

export interface ToolItem {
  id: string;
  name: string;
  category: string;
  icon?: string;
  order: number;
}

export interface ExperienceItem {
  id: string;
  role: string;
  period: string;
  description: string;
  highlights?: string[];
  order: number;
}

export interface EducationCertificate {
  id: string;
  institution: string;
  course: string;
  skills: string[];
  date: string;
  certificateImage?: string;
  certificatePdf?: string;
  certificateUrl?: string;
  order: number;
}

export interface ResumeCV {
  id: string;
  version: string;
  date: string;
  title: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  isActive: boolean;
  notes?: string;
}

export interface LeadMessage {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  service: string;
  budget: string;
  projectDetails: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Archived';
  notes?: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  whatsapp: string;
  pinterest: string;
  x: string;
  tiktok: string;
}

export interface ContactInfo {
  phone: string;
  whatsappNumber: string;
  email: string;
  location: string;
  workingHours: string;
}

export interface FocusCard {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
}

export interface HomepageContent {
  brandName: string;
  professionalTitle: string;
  positioning: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  heroCtaPrimaryText: string;
  heroCtaSecondaryText: string;
  heroCtaCvText: string;
  quickIntroHeading: string;
  quickIntroText: string;
  focusCards: FocusCard[];
  aboutHeading: string;
  aboutSubtitle: string;
  aboutContent: string;
  aboutMission: string;
  aboutImage: string;
  aboutCapabilities: string[];
  whyChooseHeading: string;
  whyChooseCards: WhyChooseItem[];
  ctaBannerHeading: string;
  ctaBannerSubheading: string;
  ctaBannerText: string;
}

export interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  ogImage: string;
  keywords: string;
  canonicalUrl: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'pdf' | 'video' | 'other';
  size: string;
  uploadedAt: string;
}

export interface CmsDatabase {
  homepage: HomepageContent;
  serviceCategories: ServiceCategory[];
  services: ServiceItem[];
  projects: PortfolioProject[];
  caseStudies: CaseStudy[];
  reviews: ReviewItem[];
  blogPosts: BlogPost[];
  skills: SkillItem[];
  tools: ToolItem[];
  experience: ExperienceItem[];
  education: EducationCertificate[];
  resumes: ResumeCV[];
  socialLinks: SocialLinks;
  contactInfo: ContactInfo;
  seoSettings: SeoSettings;
  leads: LeadMessage[];
  mediaLibrary: MediaItem[];
  settings: {
    cvButtonsEnabled: boolean;
    stickyCtaEnabled: boolean;
    availabilityEnabled: boolean;
    availabilityText: string;
    logoUrl: string;
  };
}
