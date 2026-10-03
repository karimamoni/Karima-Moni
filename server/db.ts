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

const STORAGE_ROOT = path.resolve(process.env.STORAGE_PATH || process.cwd());
const DATA_DIR = path.resolve(STORAGE_ROOT, 'data');
const DB_FILE = path.resolve(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
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
      this.data = {
        ...initialCmsData,
        ...data.data,
        users: data.data.users?.length ? data.data.users : [this.createDefaultAdminUser()],
      };
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


