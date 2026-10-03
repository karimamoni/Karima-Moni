import { createClient } from 'npm:@supabase/supabase-js@2.112.3'
import { corsHeaders } from 'npm:@supabase/supabase-js@2.112.3/cors'

type JsonRecord = Record<string, any>
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const secretKeys = JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') || '{}')
const publishableKeys = JSON.parse(Deno.env.get('SUPABASE_PUBLISHABLE_KEYS') || '{}')
const secretKey = secretKeys.default || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const publishableKey = publishableKeys.default || Deno.env.get('SUPABASE_ANON_KEY')!

const adminDb = createClient(supabaseUrl, secretKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } })
const authDb = createClient(supabaseUrl, publishableKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } })

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { ...corsHeaders, 'Cache-Control': 'no-store' } })

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

async function handleJson(req: Request) {
  const body = await req.json().catch(() => ({}))
  const op = body.op as string

  if (op === 'bootstrap') {
    const existing = await readStore()
    if (!existing.homepage && body.data?.homepage) {
      const initialized = { ...body.data, leads: [], adminEmail: body.adminEmail || body.data.contactInfo?.email || '' }
      await writeStore(initialized)
      return json(publicData(initialized))
    }
    return json(publicData(existing))
  }
  if (op === 'get_site_data') return json(publicData(await readStore()))
  if (op === 'submit_lead') {
    const store = await readStore()
    const leads = Array.isArray(store.leads) ? [...store.leads] : []
    const lead = { ...body.data, id: 'lead-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7), createdAt: new Date().toISOString(), status: 'New' }
    leads.unshift(lead)
    await writeStore({ ...store, leads })
    return json({ success: true, leadId: lead.id }, 201)
  }

  const { store } = await requireAdmin(req)

  if (op === 'reset_cms') {
    const reset = { ...body.data, leads: [], adminEmail: store.adminEmail || store.contactInfo?.email || '' }
    await writeStore(reset)
    return json({ success: true, data: publicData(reset) })
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

  if (op === 'get_leads') return json(store.leads || [])
  if (op === 'update_lead') {
    const leads = (store.leads || []).map((item: JsonRecord) => item.id === body.id ? { ...item, status: body.status, ...(body.notes !== undefined ? { notes: body.notes } : {}) } : item)
    await writeStore({ ...store, leads })
    const updated = leads.find((item: JsonRecord) => item.id === body.id)
    return updated ? json(updated) : json({ error: 'Lead not found' }, 404)
  }
  if (op === 'delete_lead') {
    const before = (store.leads || []).length
    const leads = (store.leads || []).filter((item: JsonRecord) => item.id !== body.id)
    await writeStore({ ...store, leads })
    return json({ success: leads.length < before })
  }

  if (op === 'crud') {
    const cfg = resourceConfig[body.resource]
    if (!cfg) return json({ error: 'Unknown resource' }, 400)
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
      const before = list.length
      const remaining = list.filter((x: JsonRecord) => x.id !== body.id)
      if (body.resource === 'resumes' && remaining.length && !remaining.some((x: JsonRecord) => x.isActive)) remaining[0].isActive = true
      await writeStore({ ...store, [cfg.key]: remaining })
      return json({ success: remaining.length < before })
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
  return json({ error: 'Unknown operation' }, 400)
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
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
    try {
      if (req.method !== 'POST') return json({ error: 'POST required.' }, 405)
      if (req.headers.get('content-type')?.includes('multipart/form-data')) return await handleUpload(req)
      return await handleJson(req)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      const status = /Authentication required|not authorized/i.test(message) ? 401 : 400
      return json({ error: message }, status)
    }
  },
}