import multer from 'multer';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const storage = multer.memoryStorage();

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
    'video/mp4',
    'video/webm',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}. Allowed: Images, PDF, MP4/WebM videos.`));
  }
};

const uploadOptions: multer.Options = {
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter,
};

export const upload = multer(uploadOptions);

export const cvUpload = multer({
  ...uploadOptions,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf' && path.extname(file.originalname).toLowerCase() === '.pdf') {
      cb(null, true);
      return;
    }
    cb(new Error('Only PDF files are accepted for CV upload.'));
  },
});

export async function uploadFileToSupabase(
  file: Express.Multer.File,
  folder: 'media' | 'cv'
): Promise<string> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'portfolio-media';

  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_SECRET_KEY must be configured.');
  }

  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });

  const ext = path.extname(file.originalname).toLowerCase() || '.bin';
  const baseName = path.basename(file.originalname, ext)
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 50) || 'file';
  const objectPath = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2, 10)}_${baseName}${ext}`;

  const { error } = await client.storage
    .from(bucket)
    .upload(objectPath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
      cacheControl: '31536000',
    });

  if (error) {
    throw new Error(`Supabase Storage upload failed: ${error.message}`);
  }

  const { data } = client.storage.from(bucket).getPublicUrl(objectPath);
  return data.publicUrl;
}
