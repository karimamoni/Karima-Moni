# Production deployment

The portfolio frontend is deployed on GitHub Pages. Supabase provides the database, authentication, storage and Edge Function API.

## Architecture

- Frontend: GitHub Pages
- Source: GitHub `main` branch
- Database/Auth/Storage/API: Supabase
- Public URL: https://karimamoni.github.io/Karima-Moni/
- No Render server is required.

## Supabase

The browser uses only the Supabase publishable key. Never put the Supabase secret/service-role key in the repository or frontend. The `portfolio-api` Edge Function uses the server-side secret key for database and storage operations.

## Admin access

Admin login uses Supabase Auth. The account email must match the portfolio admin email stored in the CMS. New admin passwords should be at least 12 characters.

## GitHub Pages

Every push to `main` runs typecheck and production build inside the deployment workflow. Deployment only proceeds if both pass.

## Production checks

- Public homepage loads from the GitHub Pages URL.
- Admin login works.
- CMS changes persist after refresh.
- Contact form creates a lead visible only to the admin.
- Lead submission has basic validation and rate limiting.
- CV/media uploads are restricted by type and size.
- Deleting uploaded CV/media also removes the corresponding Storage object when its public URL is known.
- Supabase RLS/security advisors should remain clean.
