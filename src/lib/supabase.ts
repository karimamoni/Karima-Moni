import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL || 'https://aohdvlibkksdboohbhgb.supabase.co';
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_wJEYD2GMz8dEey-WJQ3LfA_LOK5tzKt';

if (!publishableKey) {
  console.warn('[Supabase] VITE_SUPABASE_PUBLISHABLE_KEY is not configured. GitHub Pages will use the local CMS fallback until configured.');
}

export const supabase = createClient(
  url,
  publishableKey || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);

export const PORTFOLIO_API_URL = url.replace(/\/$/, '') + '/functions/v1/portfolio-api';
