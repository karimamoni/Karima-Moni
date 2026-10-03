import { createClient } from 'npm:@supabase/supabase-js@2.112.3'

type JsonRecord = Record<string, any>
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const secretKeys = JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') || '{}')
const publishableKeys = JSON.parse(Deno.env.get('SUPABASE_PUBLISHABLE_KEYS') || '{}')
const secretKey = secretKeys.default || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const publishableKey = publishableKeys.default || Deno.env.get('SUPABASE_ANON_KEY')!

const LEAD_WINDOW_MS = 10 * 60 * 1000
const LEAD_MAX_PER_WINDOW = 5
const leadAttempts = new Map<string, number[]>()
const MAX_TEXT = 2000
const MAX_MESSAGE = 6000

const adminDb = createClient(supabaseUrl, secretKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } })
const authDb = createClient(supabaseUrl, publishableKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } })

const ALLOWED_ORIGIN = 'https://karimamoni.github.io'
const responseHeaders = (req: Request) => ({
  'Access-Control-Allow-Origin': req.headers.get('Origin') === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Vary': 'Origin',
  'Cache-Control': 'no-store',
})
const json = (body: unknown, status = 200, req?: Request) =>
  Response.json(body, { status, headers: responseHeaders(req || new Request('https://localhost')) })

async function readStore(): Promise<JsonRecord> {
  const { data, error } = await adminDb.from('site_store').select('data').eq('id', 1).maybeSingle()
  if (error) throw new Error(error.message)
  return (data?.data || {}) as JsonRecord
}
async function writeStore(value: JsonRecord) {
  const { error } = await adminDb.from('site_store').upsert({ id: 1, data: value, updated_at: new Date().toISOString() })
  if (error) throw new Error(error.message)
}
function publicData(store: JsonRecord) {
  const { users, adminEmail, ...data } = store
  return { ...data, leads: [] }
}
async function requireAdmin(req: Request) {
  const token = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '')
  if (!token) throw new Error('Authentication required.')
  const { data, error } = await authDb.auth.getUser(token)
  if (error || !data.user?.email) throw new Error('Authentication required.')
  const store = await readStore()
  const adminEmail = String(store.adminEmail || store.contactInfo?.email || '').toLowerCase()
  if (!adminEmail || data.user.email.toLowerCase() !== adminEmail) throw new Error('This account is not authorized to manage the portfolio.')
  return { user: data.user, store }
}
const resourceConfig: Record<string, { key: string; prefix: string; prepend?: boolean }> = {
  serviceCategories: { key: 'serviceCategories', prefix: 'cat-' },
  services: { key: 'services', prefix: 'srv-' },
  projects: { key: 'projects', prefix: 'proj-', prepend: true },
  caseStudies: { key: 'caseStudies', prefix: 'cs-', prepend: true },
  reviews: { key: 'reviews', prefix: 'rev-', prepend: true },
  blogPosts: { key: 'blogPosts', prefix: 'blog-', prepend: true },
  skills: { key: 'skills', prefix: 'sk-' },
  tools: { key: 'tools', prefix: 'tool-' },
  experience: { key: 'experience', prefix: 'exp-' },
  education: { key: 'education', prefix: 'edu-' },
  resumes: { key: 'resumes', prefix: 'cv-', prepend: true },
  mediaLibrary: { key: 'mediaLibrary', prefix: 'media-', prepend: true },
}
function newId(prefix: string) { return prefix + Date.now() + '-' + Math.random().toString(36).slice(2, 7) }

function clientKey(req: Request) {
  return (req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown').split(',')[0].trim()
}
function allowLead(req: Request) {
  const key = clientKey(req)
  const now = Date.now()
  const recent = (leadAttempts.get(key) || []).filter(t => now - t < LEAD_WINDOW_MS)
  if (recent.length >= LEAD_MAX_PER_WINDOW) return false
  recent.push(now)
  leadAttempts.set(key, recent)
  return true
}
function text(value: unknown, max = MAX_TEXT) {
  return String(value ?? '').trim().slice(0, max)
}
function storagePathFromUrl(url: unknown) {
  try {
    const pathname = new URL(String(url)).pathname
    const marker = '/storage/v1/object/public/portfolio-media/'
    return pathname.includes(marker) ? decodeURIComponent(pathname.split(marker)[1]) : null
  } catch { return null }
}
async function removeStorageObject(url: unknown) {
  const path = storagePathFromUrl(url)
  if (!path) return
  await adminDb.storage.from('portfolio-media').remove([path]).catch(() => undefined)
}

async function handleJson(req: Request) {
  const body = await req.json().catch(() => ({}))
  const op = body.op as string

  if (op === 'bootstrap') {
    const existing = await readStore()
    if (!existing.homepage && body.data?.homepage) {
      const initialized = { ...body.data, leads: [], adminEmail: body.adminEmail || body.data.contactInfo?.email || '' }
      await writeStore(initialized)
      return json(publicData(initialized), 200, req)
    }
    return json(publicData(existing), 200, req)
  }
  if (op === 'get_site_data') return json(publicData(await readStore()), 200, req)
  if (op === 'submit_lead') {
    if (!allowLead(req)) return json({ error: 'Too many messages. Please try again later.' }, 429, req)
    const data = body.data && typeof body.data === 'object' ? body.data : {}
    if (text(data.website)) return json({ error: 'Invalid submission.' }, 400, req)
    const name = text(data.name, 120)
    const email = text(data.email, 160).toLowerCase()
    const message = text(data.message, MAX_MESSAGE)
    if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Please provide a valid name, email and message.' }, 400, req)
    const store = await readStore()
    const leads = Array.isArray(store.leads) ? [...store.leads] : []
    const lead = { name, email, phone: text(data.phone, 60), company: text(data.company, 160), message, id: 'lead-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7), createdAt: new Date().toISOString(), status: 'New' }
    leads.unshift(lead)
    await writeStore({ ...store, leads })
    return json({ success: true, leadId: lead.id }, 201, req)
  }

  const { store } = await requireAdmin(req)

  if (op === 'reset_cms') {
    const reset = { ...body.data, leads: [], adminEmail: store.adminEmail || store.contactInfo?.email || '' }
    if (reset.seoSettings) reset.seoSettings = { ...reset.seoSettings, canonicalUrl: 'https://karimamoni.github.io/Karima-Moni/' }
    await writeStore(reset)
    return json({ success: true, data: publicData(reset) }, 200, req)
  }

  const fieldMap: Record<string, string> = {
    update_homepage: 'homepage', update_social: 'socialLinks', update_contact: 'contactInfo',
    update_seo: 'seoSettings', update_settings: 'settings',
  }
  if (fieldMap[op]) {
    const key = fieldMap[op]
    const updated = { ...(store[key] || {}), ...(body.data || {}) }
    await writeStore({ ...store, [key]: updated })
    return json({ success: true, [key]: updated })
  }

  if (op === 'get_leads') return json(store.leads || [], 200, req)
  if (op === 'update_lead') {
    const leads = (store.leads || []).map((item: JsonRecord) => item.id === body.id ? { ...item, status: body.status, ...(body.notes !== undefined ? { notes: body.notes } : {}) } : item)
    await writeStore({ ...store, leads })
    const updated = leads.find((item: JsonRecord) => item.id === body.id)
    return updated ? json(updated, 200, req) : json({ error: 'Lead not found' }, 404, req)
  }
  if (op === 'delete_lead') {
    const before = (store.leads || []).length
    const leads = (store.leads || []).filter((item: JsonRecord) => item.id !== body.id)
    await writeStore({ ...store, leads })
    return json({ success: leads.length < before }, 200, req)
  }

  if (op === 'crud') {
    const cfg = resourceConfig[body.resource]
    if (!cfg) return json({ error: 'Unknown resource' }, 400, req)
    const list = Array.isArray(store[cfg.key]) ? [...store[cfg.key]] : []
    if (body.action === 'add') {
      const item = { ...(body.data || {}), id: newId(cfg.prefix) }
      if (body.resource === 'resumes' && item.isActive) list.forEach((x: JsonRecord) => x.isActive = false)
      if (cfg.prepend) list.unshift(item); else list.push(item)
      await writeStore({ ...store, [cfg.key]: list })
      return json(item, 201)
    }
    if (body.action === 'update') {
      const index = list.findIndex((x: JsonRecord) => x.id === body.id)
      if (index < 0) return json({ error: 'Item not found' }, 404)
      list[index] = { ...list[index], ...(body.data || {}) }
      await writeStore({ ...store, [cfg.key]: list })
      return json(list[index])
    }
    if (body.action === 'delete') {
      const existing = list.find((x: JsonRecord) => x.id === body.id)
      const before = list.length
      const remaining = list.filter((x: JsonRecord) => x.id !== body.id)
      if (body.resource === 'resumes' && remaining.length && !remaining.some((x: JsonRecord) => x.isActive)) remaining[0].isActive = true
      await writeStore({ ...store, [cfg.key]: remaining })
      if (existing && (body.resource === 'mediaLibrary' || body.resource === 'resumes')) await removeStorageObject(existing.url || existing.fileUrl)
      return json({ success: remaining.length < before }, 200, req)
    }
    if (body.action === 'duplicate' && body.resource === 'projects') {
      const original = list.find((x: JsonRecord) => x.id === body.id)
      if (!original) return json({ error: 'Project not found' }, 404)
      const copy = { ...original, id: newId('proj-'), name: String(original.name || '') + ' (Copy)', status: 'Draft' }
      list.unshift(copy)
      await writeStore({ ...store, [cfg.key]: list })
      return json(copy, 201)
    }
    if (body.action === 'active' && body.resource === 'resumes') {
      let found = false
      list.forEach((x: JsonRecord) => { x.isActive = x.id === body.id; if (x.isActive) found = true })
      if (!found) return json({ error: 'Resume not found' }, 404)
      await writeStore({ ...store, [cfg.key]: list })
      return json({ success: true, resumes: list })
    }
  }
  return json({ error: 'Unknown operation' }, 400, req)
}

async function handleUpload(req: Request) {
  const { store } = await requireAdmin(req)
  const form = await req.formData()
  const file = form.get('file')
  if (!(file instanceof File)) return json({ error: 'No file was uploaded.' }, 400)
  const kind = String(form.get('kind') || 'media')
  if (kind === 'cv' && file.type !== 'application/pdf') return json({ error: 'Only PDF format is accepted for CV upload.' }, 400)
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'video/mp4', 'video/webm']
  if (!allowed.includes(file.type)) return json({ error: 'Unsupported file type.' }, 400)
  if (file.size > 15 * 1024 * 1024) return json({ error: 'Maximum file size is 15MB.' }, 400)

  const folder = kind === 'cv' ? 'cv' : 'media'
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
  const path = folder + '/' + Date.now() + '-' + crypto.randomUUID() + '-' + safeName
  const bytes = new Uint8Array(await file.arrayBuffer())
  const { error } = await adminDb.storage.from('portfolio-media').upload(path, bytes, { contentType: file.type, cacheControl: '31536000', upsert: false })
  if (error) return json({ error: error.message }, 500)
  const { data: publicUrl } = adminDb.storage.from('portfolio-media').getPublicUrl(path)
  const url = publicUrl.publicUrl

  if (kind === 'cv') {
    const resumes = Array.isArray(store.resumes) ? [...store.resumes] : []
    resumes.forEach((x: JsonRecord) => x.isActive = false)
    const resume = {
      id: newId('cv-'), title: String(form.get('title') || 'Karima Moni – Professional CV'),
      version: String(form.get('version') || 'Current'),
      date: String(form.get('date') || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })),
      fileUrl: url, fileName: file.name, fileSize: (file.size / 1024).toFixed(1) + ' KB',
      isActive: true, notes: String(form.get('notes') || 'Uploaded via Admin CV Manager'),
    }
    resumes.unshift(resume)
    await writeStore({ ...store, resumes })
    return json({ success: true, resume, fileUrl: url }, 201)
  }

  const mediaLibrary = Array.isArray(store.mediaLibrary) ? [...store.mediaLibrary] : []
  const mediaItem = {
    id: newId('media-'), name: String(form.get('name') || file.name), url,
    type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'pdf',
    size: (file.size / 1024).toFixed(1) + ' KB', uploadedAt: new Date().toISOString().slice(0, 10),
  }
  mediaLibrary.unshift(mediaItem)
  await writeStore({ ...store, mediaLibrary })
  return json({ success: true, mediaItem, fileUrl: url }, 201)
}

export default {
  async fetch(req: Request) {
    if (req.method === 'OPTIONS') return new Response('ok', { status: 204, headers: responseHeaders(req) })
    try {
      if (req.method !== 'POST') return json({ error: 'POST required.' }, 405)
      if (req.headers.get('content-type')?.includes('multipart/form-data')) return await handleUpload(req)
      return await handleJson(req)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      const status = /Authentication required|not authorized/i.test(message) ? 401 : 400
      return json({ error: message }, status, req)
    }
  },
}