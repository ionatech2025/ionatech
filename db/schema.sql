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

-- Bumped on every password change/reset. Embedded in signed JWTs and checked
-- on every request (see requireAdmin in api/_lib/auth.js) so that changing a
-- password invalidates every session issued before the change — not just
-- the credential itself. ADD COLUMN IF NOT EXISTS keeps this file idempotent
-- for databases that already had admin_users before this column existed.
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS token_version INT NOT NULL DEFAULT 0;

-- Password reset tokens, kept in their own table (not columns on
-- admin_users) so a full request history is preserved for auditing and so
-- issuing a new token never has to clobber a still-valid one. Only a hash
-- of the token is ever stored — the raw token exists only in the emailed
-- link and briefly in memory while verifying, the same principle as
-- password_hash never storing a plaintext password.
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id         SERIAL PRIMARY KEY,
  user_id    INT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);

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

CREATE TABLE IF NOT EXISTS projects (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  client      TEXT,
  project_url TEXT,
  image_url   TEXT,
  icon_name   TEXT,
  tech_stack  JSONB DEFAULT '[]'::jsonb,
  status      TEXT DEFAULT 'live',
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
