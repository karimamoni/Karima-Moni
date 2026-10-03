# Free deployment

This project is a full-stack React/Vite + Express application. GitHub Pages alone is not suitable because the admin API and uploads require a server.

## Supabase setup

1. Create a Supabase project.
2. Open SQL Editor and run supabase/schema.sql once.
3. In Supabase Project Settings/API, copy the project URL and the secret key. Never put the secret key in frontend code or GitHub.
4. Storage bucket portfolio-media is created by the SQL script.

## Render setup

The included render.yaml uses Render's Free web service. It is intentionally stateless: CMS data lives in Supabase and uploaded files live in Supabase Storage.

Set these environment variables in Render:

- NODE_ENV=production
- SUPABASE_URL
- SUPABASE_SECRET_KEY
- SUPABASE_STORAGE_BUCKET=portfolio-media
- SESSION_SECRET (32+ random characters)
- ADMIN_EMAIL
- ADMIN_INITIAL_PASSWORD (12+ characters)

SUPABASE_PUBLISHABLE_KEY is documented for future browser-side integrations but is not required by the current server-rendered API.

## Important

Render Free web services can spin down when idle. The first request after inactivity may therefore take longer. Free instances also have usage limits. This does not delete CMS data because persistence is handled by Supabase.

After the first successful deploy, verify:

- /api/health returns {"ok":true,...}
- public homepage loads
- /admin login works
- creating/editing a project persists after a restart
- media/CV upload creates a Supabase Storage URL
- public API never returns leads or admin users
