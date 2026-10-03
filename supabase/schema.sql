-- Karima Moni Portfolio - Supabase production schema
create table if not exists public.site_store (
  id bigint primary key check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_store enable row level security;
revoke all on table public.site_store from anon, authenticated;
grant all on table public.site_store to service_role;

create or replace function public.set_site_store_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
drop trigger if exists site_store_updated_at on public.site_store;
create trigger site_store_updated_at before update on public.site_store
for each row execute function public.set_site_store_updated_at();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-media','portfolio-media',true,15728640,
array['image/jpeg','image/png','image/webp','image/gif','application/pdf','video/mp4','video/webm'])
on conflict (id) do update set public=excluded.public,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists "Portfolio media public read" on storage.objects;
create policy "Portfolio media public read" on storage.objects for select to public using (bucket_id='portfolio-media');
