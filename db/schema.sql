-- iONA Tech site database schema.
-- Apply once on a fresh Neon database:
--   psql "$DATABASE_URL" -f db/schema.sql
-- Idempotent: safe to re-run.

CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  category    TEXT,
  icon_name   TEXT,
  image_url   TEXT,
  client      TEXT,
  project_url TEXT,
  tech_stack  JSONB DEFAULT '[]'::jsonb,
  sort_order  INT DEFAULT 0,
  published   BOOLEAN DEFAULT true,
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  icon_name   TEXT,
  icon_image  TEXT,
  image_url   TEXT,
  color_class TEXT,
  features    JSONB DEFAULT '[]'::jsonb,
  details     JSONB DEFAULT '{}'::jsonb,
  sort_order  INT DEFAULT 0,
  published   BOOLEAN DEFAULT true,
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_members (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  role       TEXT,
  bio        TEXT,
  image_url  TEXT,
  sort_order INT DEFAULT 0,
  published  BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS about_content (
  id               INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  eyebrow          TEXT,
  title_lead       TEXT,
  title_highlight  TEXT,
  description      TEXT,
  image_url        TEXT,
  stat_badge_value TEXT,
  stat_badge_label TEXT,
  stats            JSONB DEFAULT '[]'::jsonb,
  updated_at       TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_info (
  id                    INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  email                 TEXT,
  phone                 TEXT,
  address               TEXT,
  whatsapp_number       TEXT,
  web3forms_access_key  TEXT,
  updated_at            TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  key   TEXT PRIMARY KEY,
  value JSONB
);
