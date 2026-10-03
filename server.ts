import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { db } from './server/db';
import {
  comparePassword,
  generateToken,
  setAuthCookie,
  clearAuthCookie,
  requireAdmin,
  AuthenticatedRequest,
} from './server/auth';
import { upload, cvUpload } from './server/upload';
import { sanitizeString } from './server/sanitize';
import { sendLeadNotification } from './server/email';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

// Basic security & parsing middlewares
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.set('trust proxy', 1);

// Small, dependency-free request throttling for public/auth endpoints.
type RateLimitEntry = { count: number; resetAt: number };
const rateLimits = new Map<string, RateLimitEntry>();

function rateLimit(windowMs: number, max: number, prefix: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = `${prefix}:${req.ip || 'unknown'}`;
    const now = Date.now();
    const current = rateLimits.get(key);
    if (!current || current.resetAt <= now) {
      rateLimits.set(key, { count: 1, resetAt: now + windowMs });
      next();
      return;
    }
    current.count += 1;
    if (current.count > max) {
      res.status(429).json({ error: 'Too many requests. Please try again later.' });
      return;
    }
    next();
  };
}

// Baseline browser security headers.
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (isProd) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

// Static file serving for uploads and public folder
const uploadsPath = path.resolve(process.cwd(), 'uploads');
const publicPath = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });
if (!fs.existsSync(publicPath)) fs.mkdirSync(publicPath, { recursive: true });

app.use('/uploads', express.static(uploadsPath));
app.use('/public', express.static(publicPath));
app.use('/cv', express.static(path.resolve(publicPath, 'cv')));

// ==========================================
// 1. AUTHENTICATION ENDPOINTS
// ==========================================

// POST /api/auth/login
app.post('/api/auth/login', rateLimit(15 * 60 * 1000, 10, 'login'), (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!password) {
    res.status(400).json({ error: 'Password is required' });
    return;
  }

  // Find user by email or fallback to admin
  const user = email ? db.getUserByEmail(email) : db.getAdminUser();

  if (!user || !comparePassword(password, user.passwordHash)) {
    res.status(401).json({ error: 'Invalid credentials. Please verify your password.' });
    return;
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: 'admin',
  });

  setAuthCookie(res, token);

  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
});

// POST /api/auth/logout
app.post('/api/auth/logout', (_req: Request, res: Response) => {
  clearAuthCookie(res);
  res.json({ success: true, message: 'Successfully signed out' });
});

// GET /api/auth/session
app.get('/api/auth/session', (req: AuthenticatedRequest, res: Response) => {
  const token = req.cookies?.km_admin_session;
  if (!token) {
    res.json({ authenticated: false });
    return;
  }

  try {
    const { verifyToken } = require('./server/auth');
    const payload = verifyToken(token);
    if (!payload || payload.role !== 'admin') {
      res.json({ authenticated: false });
      return;
    }

    const admin = db.getAdminUser();
    res.json({
      authenticated: true,
      user: {
        email: payload.email,
        name: admin?.name || 'Karima Moni',
        role: payload.role,
      },
    });
  } catch {
    res.json({ authenticated: false });
  }
});

// ==========================================
// 2. PUBLIC DATA & LEADS ENDPOINTS
// ==========================================

// GET /api/site/data (Public read of entire portfolio CMS)
app.get('/api/site/data', (_req: Request, res: Response) => {
  res.json(db.getPublicData());
});

// POST /api/leads (Public form submission)
app.post('/api/leads', rateLimit(15 * 60 * 1000, 5, 'lead'), async (req: Request, res: Response) => {
  const { name, email, whatsapp, service, budget, projectDetails, notes } = req.body;

  if (!name || !email) {
    res.status(400).json({ error: 'Name and email are required fields.' });
    return;
  }

  // Basic email pattern validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email).trim())) {
    res.status(400).json({ error: 'Please provide a valid email address.' });
    return;
  }

  // Sanitize inputs
  const sanitizedLead = {
    name: sanitizeString(name),
    email: sanitizeString(email),
    whatsapp: sanitizeString(whatsapp || ''),
    service: sanitizeString(service || 'General Inquiry'),
    budget: sanitizeString(budget || 'Undecided'),
    projectDetails: sanitizeString(projectDetails || ''),
    notes: sanitizeString(notes || 'Submitted via public portfolio contact form.'),
  };

  const newLead = db.addLead(sanitizedLead);

  // Trigger server-side notification (email/webhook)
  sendLeadNotification(newLead).catch((err) =>
    console.error('[Leads API] Notification error:', err)
  );

  res.status(201).json({
    success: true,
    message: 'Thank you! Your project inquiry has been received.',
    leadId: newLead.id,
  });
});

// ==========================================
// 3. PROTECTED ADMIN CMS ENDPOINTS
// ==========================================

// Reset CMS to default seed
app.post('/api/cms/reset', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  db.resetToDefaults();
  res.json({ success: true, data: db.getPublicData() });
});

// Homepage Content
app.put('/api/home', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateHomepage(req.body);
  res.json({ success: true, homepage: updated });
});

// Social Links & Contact & SEO & Settings
app.put('/api/social', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateSocial(req.body);
  res.json({ success: true, socialLinks: updated });
});

app.put('/api/contact-info', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateContact(req.body);
  res.json({ success: true, contactInfo: updated });
});

app.put('/api/seo', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateSeo(req.body);
  res.json({ success: true, seoSettings: updated });
});

app.put('/api/settings', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateSettings(req.body);
  res.json({ success: true, settings: updated });
});

// Service Categories
app.post('/api/service-categories', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newCat = db.addServiceCategory(req.body);
  res.status(201).json(newCat);
});

app.put('/api/service-categories/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateServiceCategory(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/service-categories/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const deleted = db.deleteServiceCategory(req.params.id);
  res.json({ success: deleted });
});

// Services
app.post('/api/services', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newSrv = db.addService(req.body);
  res.status(201).json(newSrv);
});

app.put('/api/services/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateService(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Service not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/services/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const deleted = db.deleteService(req.params.id);
  res.json({ success: deleted });
});

// Projects
app.post('/api/projects', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newProj = db.addProject(req.body);
  res.status(201).json(newProj);
});

app.put('/api/projects/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateProject(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/projects/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const deleted = db.deleteProject(req.params.id);
  res.json({ success: deleted });
});

app.post('/api/projects/:id/duplicate', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const duplicated = db.duplicateProject(req.params.id);
  if (!duplicated) {
    res.status(404).json({ error: 'Project not found to duplicate' });
    return;
  }
  res.status(201).json(duplicated);
});

// Case Studies
app.post('/api/case-studies', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newCs = db.addCaseStudy(req.body);
  res.status(201).json(newCs);
});

app.put('/api/case-studies/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateCaseStudy(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Case study not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/case-studies/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const deleted = db.deleteCaseStudy(req.params.id);
  res.json({ success: deleted });
});

// Reviews
app.post('/api/reviews', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newRev = db.addReview(req.body);
  res.status(201).json(newRev);
});

app.put('/api/reviews/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateReview(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/reviews/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const deleted = db.deleteReview(req.params.id);
  res.json({ success: deleted });
});

// Blog Posts
app.post('/api/blog', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newPost = db.addBlogPost(req.body);
  res.status(201).json(newPost);
});

app.put('/api/blog/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateBlogPost(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Blog post not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/blog/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const deleted = db.deleteBlogPost(req.params.id);
  res.json({ success: deleted });
});

// Skills
app.post('/api/skills', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newSkill = db.addSkill(req.body);
  res.status(201).json(newSkill);
});

app.put('/api/skills/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateSkill(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Skill not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/skills/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const deleted = db.deleteSkill(req.params.id);
  res.json({ success: deleted });
});

// Tools
app.post('/api/tools', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newTool = db.addTool(req.body);
  res.status(201).json(newTool);
});

app.put('/api/tools/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateTool(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Tool not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/tools/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const deleted = db.deleteTool(req.params.id);
  res.json({ success: deleted });
});

// Experience & Education
app.post('/api/experience', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newExp = db.addExperience(req.body);
  res.status(201).json(newExp);
});

app.put('/api/experience/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateExperience(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Experience not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/experience/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const deleted = db.deleteExperience(req.params.id);
  res.json({ success: deleted });
});

app.post('/api/education', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newEdu = db.addEducation(req.body);
  res.status(201).json(newEdu);
});

app.put('/api/education/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateEducation(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Education not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/education/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const deleted = db.deleteEducation(req.params.id);
  res.json({ success: deleted });
});

// Resumes (CV)
app.post('/api/resumes', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newRes = db.addResume(req.body);
  res.status(201).json(newRes);
});

app.put('/api/resumes/:id/active', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const success = db.setActiveResume(req.params.id);
  if (!success) {
    res.status(404).json({ error: 'Resume not found' });
    return;
  }
  res.json({ success: true, resumes: db.getResumes() });
});

app.delete('/api/resumes/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const deleted = db.deleteResume(req.params.id);
  res.json({ success: deleted, resumes: db.getResumes() });
});

// CV File Upload endpoint
app.post(
  '/api/cv/upload',
  requireAdmin,
  cvUpload.single('file'),
  (req: AuthenticatedRequest, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: 'No PDF file was uploaded' });
      return;
    }

    if (req.file.mimetype !== 'application/pdf') {
      res.status(400).json({ error: 'Only PDF format is accepted for CV upload.' });
      return;
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const fileSize = `${(req.file.size / 1024).toFixed(1)} KB`;
    const title = req.body.title || 'Karima Moni – Senior Marketing Resume';
    const version = req.body.version || `v2026.${Date.now().toString().slice(-3)}`;
    const date = req.body.date || 'October 2026';
    const notes = req.body.notes || 'Uploaded via Admin CV Manager';

    const newResume = db.addResume({
      title,
      version,
      date,
      fileUrl,
      fileName: req.file.originalname,
      fileSize,
      isActive: true,
      notes,
    });

    res.status(201).json({
      success: true,
      resume: newResume,
      fileUrl,
    });
  }
);

// Admin Leads Management (Protected!)
app.get('/api/leads', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  res.setHeader('Cache-Control', 'no-store');
  res.json(db.getLeads());
});

app.patch('/api/leads/:id/status', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { status, notes } = req.body;
  const updated = db.updateLeadStatus(req.params.id, status, notes);
  if (!updated) {
    res.status(404).json({ error: 'Lead message not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/leads/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const deleted = db.deleteLead(req.params.id);
  res.json({ success: deleted });
});

// Media Library
app.get('/api/media', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  res.json(db.getMedia());
});

app.post('/api/media', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const newItem = db.addMedia(req.body);
  res.status(201).json(newItem);
});

// Real Media File Upload via Multer
app.post(
  '/api/media/upload',
  requireAdmin,
  upload.single('file'),
  (req: AuthenticatedRequest, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: 'No file was uploaded' });
      return;
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    let type: 'image' | 'pdf' | 'video' | 'other' = 'other';
    if (req.file.mimetype.startsWith('image/')) type = 'image';
    else if (req.file.mimetype === 'application/pdf') type = 'pdf';
    else if (req.file.mimetype.startsWith('video/')) type = 'video';

    const size = req.file.size > 1024 * 1024
      ? `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${(req.file.size / 1024).toFixed(1)} KB`;

    const mediaItem = db.addMedia({
      name: req.body.name || req.file.originalname,
      url: fileUrl,
      type,
      size,
    });

    res.status(201).json({
      success: true,
      mediaItem,
      fileUrl,
    });
  }
);

app.delete('/api/media/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const deleted = db.deleteMedia(req.params.id);
  res.json({ success: deleted });
});

// Centralized error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server Error Handler]:', err.message || err);
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong on the server. Please try again.',
  });
});

// ==========================================
// 4. VITE / FRONTEND SERVING
// ==========================================

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Karima Moni Server] Listening on http://0.0.0.0:${PORT} (Mode: ${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[Server Launch Failure]:', err);
});
