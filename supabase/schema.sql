-- ============================================================
-- LNKN Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ============================================================
-- STORAGE BUCKET
-- Create manually in Supabase Dashboard → Storage:
--   Bucket name: "images"
--   Public: true
-- ============================================================

-- ============================================================
-- TABLES
-- ============================================================

-- Images (references Supabase Storage; no more byte[] blobs)
create table if not exists images (
  id          bigserial primary key,
  storage_path text not null,        -- path in the "images" storage bucket
  file_type   text,
  file_name   text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now(),
  is_deleted  boolean     default false,
  deleted_at  timestamptz
);

-- Pages
create table if not exists pages (
  id           bigserial primary key,
  user_id      uuid        references auth.users(id) on delete cascade not null,
  type         text        not null default 'Profile',  -- Profile | Song | Album | Event
  slug         text,
  pixel_id     text,
  name         text        not null,
  is_published boolean     default false,
  theme        text,                -- JSON string
  description  text,
  image_id     bigint      references images(id),
  created_at   timestamptz default now(),
  updated_at   timestamptz default now(),
  is_deleted   boolean     default false,
  deleted_at   timestamptz
);

-- Links
create table if not exists links (
  id         bigserial primary key,
  page_id    bigint      references pages(id) on delete cascade not null,
  type       text        not null default 'Default',  -- Default | Stream | Socials
  title      text        not null default '',
  url        text,
  position   int         not null default 1,
  theme      text,                -- JSON string
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  is_deleted boolean     default false,
  deleted_at timestamptz
);

-- Tags
create table if not exists tags (
  id         bigserial primary key,
  name       text        not null,
  theme      text,
  type       text        not null default 'Default',  -- Default | Artist
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  is_deleted boolean     default false,
  deleted_at timestamptz
);

-- Page Tags (join)
create table if not exists page_tags (
  id         bigserial primary key,
  page_id    bigint      references pages(id) on delete cascade not null,
  tag_id     bigint      references tags(id) on delete cascade not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  is_deleted boolean     default false,
  deleted_at timestamptz
);

-- User Profiles (also stores username and email for lookups)
create table if not exists user_profiles (
  id         bigserial primary key,
  user_id    uuid        references auth.users(id) on delete cascade not null unique,
  username   text        unique,   -- used for public URL: /p/{username}/{slug}
  email      text,                 -- cached for username-based login lookup
  socials    text,                 -- JSON string of SocialLinks
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Regions (reference data)
create table if not exists regions (
  id           bigserial primary key,
  abbreviation varchar(2),
  name         text not null,
  country_code varchar(2),
  country      text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Addresses
create table if not exists addresses (
  id               bigserial primary key,
  user_id          uuid        references auth.users(id) on delete cascade,
  street_address   text,
  street_address_2 text,
  city             text,
  postal_code      text,
  longitude        decimal,
  latitude         decimal,
  region_id        bigint      references regions(id),
  created_at       timestamptz default now(),
  updated_at       timestamptz default now(),
  is_deleted       boolean     default false,
  deleted_at       timestamptz
);

-- ============================================================
-- INDEXES
-- ============================================================
create index if not exists idx_pages_user_id       on pages(user_id) where is_deleted = false;
create index if not exists idx_pages_slug          on pages(slug)    where is_deleted = false;
create index if not exists idx_links_page_id       on links(page_id) where is_deleted = false;
create index if not exists idx_user_profiles_username on user_profiles(username);

-- ============================================================
-- ROW LEVEL SECURITY
-- (drop first so this script is safe to re-run)
-- ============================================================

-- Images
alter table images enable row level security;
drop policy if exists "Public image read"          on images;
drop policy if exists "Authenticated image insert" on images;
drop policy if exists "Authenticated image update" on images;
create policy "Public image read"           on images for select using (is_deleted = false);
create policy "Authenticated image insert"  on images for insert with check (auth.role() = 'authenticated');
create policy "Authenticated image update"  on images for update using (auth.role() = 'authenticated');

-- Pages
alter table pages enable row level security;
drop policy if exists "Owner full access on pages"  on pages;
drop policy if exists "Public read published pages" on pages;
create policy "Owner full access on pages"  on pages using (user_id = auth.uid());
create policy "Public read published pages" on pages for select using (is_published = true and is_deleted = false);

-- Links
alter table links enable row level security;
drop policy if exists "Owner full access on links" on links;
drop policy if exists "Public read links"          on links;
create policy "Owner full access on links"  on links
  using (page_id in (select id from pages where user_id = auth.uid()));
create policy "Public read links"           on links for select
  using (
    is_deleted = false and
    page_id in (select id from pages where is_published = true and is_deleted = false)
  );

-- Tags
alter table tags enable row level security;
drop policy if exists "Authenticated tag read"  on tags;
drop policy if exists "Authenticated tag write" on tags;
create policy "Authenticated tag read"   on tags for select using (auth.role() = 'authenticated' and is_deleted = false);
create policy "Authenticated tag write"  on tags for all   using (auth.role() = 'authenticated');

-- Page Tags
alter table page_tags enable row level security;
drop policy if exists "Owner full access on page_tags" on page_tags;
create policy "Owner full access on page_tags" on page_tags
  using (page_id in (select id from pages where user_id = auth.uid()));

-- User Profiles
alter table user_profiles enable row level security;
drop policy if exists "Owner full access on profile" on user_profiles;
drop policy if exists "Public read profiles"         on user_profiles;
create policy "Owner full access on profile" on user_profiles using (user_id = auth.uid());
create policy "Public read profiles"         on user_profiles for select using (true);

-- Addresses
alter table addresses enable row level security;
drop policy if exists "Owner full access on addresses" on addresses;
create policy "Owner full access on addresses" on addresses using (user_id = auth.uid());

-- Regions
alter table regions enable row level security;
drop policy if exists "Public read regions" on regions;
create policy "Public read regions" on regions for select using (true);

-- ============================================================
-- TRIGGER: auto-create user_profile row on signup
-- ============================================================
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into user_profiles (user_id, username, email)
  values (new.id, new.raw_user_meta_data->>'username', new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
