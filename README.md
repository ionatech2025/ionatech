
# iONA TECH Website

The official marketing site for iONA TECH. React 18 + Vite SPA, deployed on Vercel.

## Local development

```bash
npm install
npm run dev      # Vite dev server
npm run build    # Production build → dist/
```

## Content Management

The site is moving from hardcoded content to a database-backed admin panel in
phases. Until that's complete, all editable content lives as JS literals in
`src/data/` so it can be updated in one place per content type.

### Where content lives

| Section          | Data file                        | Component                                              |
| ---------------- | -------------------------------- | ------------------------------------------------------ |
| Products         | `src/data/products.js`           | `src/Components/Products/Products.jsx`                 |
| Projects         | `src/data/projects.js`           | `src/Components/Projects/Projects.jsx`                 |
| Services         | `src/data/services.js`           | `src/Components/Services/ServicesPage.jsx`             |
| Team             | `src/data/team.js`               | `src/Components/Team/Team.jsx`                         |
| About            | `src/data/about.js`              | `src/Components/About/About.jsx`                       |
| Contact info     | `src/data/contact.js`            | `src/Components/Contacts/Contacts.jsx`                 |

Shapes for every content type are documented as JSDoc typedefs in
`src/data/schema.js`. Lucide icons are referenced by string name and resolved
through `src/data/iconRegistry.js`.

### To update existing content

Edit the relevant file in `src/data/`, commit, push. Vercel redeploys
automatically.

### To add a new editable content type

Follow this 5-step recipe:

1. Add a typedef + `RESOURCES` entry in `src/data/schema.js`.
2. Add a `CREATE TABLE` in `db/schema.sql` (Phase 2+).
3. Add handlers in the shared dynamic API routes (`api/content/[resource].js` and `api/admin/[...path].js`) (Phase 3+).
4. Add list and edit pages under `src/admin/` (e.g. `src/admin/<Name>List.jsx` and `<Name>Edit.jsx`) (Phase 3+).
5. Add or update the public component in `src/Components/<Name>/` to fetch from `/api/content/<name>` (Phase 2+).

### To add a new icon choice

Add the import + entry to `iconRegistry` in `src/data/iconRegistry.js`. The
admin form's icon dropdown auto-derives from `iconNames`.

## Admin panel

Visit `/admin` and sign in. From there you can edit products (with client,
project URL, and tech stack — useful for showcasing real iONA TECH work),
services, team members, the about block, and contact info. Image fields
support either pasting a path/URL or uploading a file (stored in Vercel
Blob).

The site uses a fallback pattern: if the database is unreachable or empty,
the public site falls back to the bundled `src/data/` literals so it never
breaks. As soon as the API responds with content, that takes over.

### One-time backend setup

The admin panel needs three pieces of infrastructure provisioned via the
Vercel dashboard (or CLI — see below). **Status as of 2026-08-25:**

1. **Neon Postgres** — ✅ done. Installed via the Vercel Marketplace
   integration (not `neonctl` directly — this Vercel team's Neon org is
   Vercel-managed, so `neonctl projects create` is rejected with
   `action_restricted`; provisioning has to go through Vercel):

   ```bash
   vercel integration add neon -m region=sin1 -m auth=false -p free_v3 --name ionatech-db
   ```

   - **Resource:** `ionatech-db`, plan Free
   - **Region:** `sin1` (Vercel's code for Neon's `aws-ap-southeast-1`,
     Singapore) — **always use this region for new infra on this
     project**; the audience is Uganda/East Africa and this is the
     lowest-latency common region for it. Don't accept a US-default.
   - **Neon Auth:** explicitly disabled (`auth=false`) — this project has
     its own JWT/bcrypt admin auth (`api/_lib/auth.js`); Neon Auth would be
     a redundant second auth system.
   - **Connected to:** Production, Preview, Development (Vercel env vars
     `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `PGHOST`, `PGUSER`,
     `PGPASSWORD`, `PGDATABASE`, `NEON_PROJECT_ID`, plus `POSTGRES_*`
     aliases — see `vercel env ls` for the full list, values are in the
     Vercel dashboard, never in this repo).
   - Installing requires accepting Neon's marketplace terms in a browser
     first (`vercel integration add` prints a `verification_uri` if this
     hasn't happened yet — it can't be done non-interactively).
   - **Applying the schema:** `psql "$DATABASE_URL" -f db/schema.sql` is the
     documented path, but `psql` may just be a stub with no actual
     `postgresql-client-<version>` package behind it in some environments
     (fails with `You must install at least one postgresql-client-<version>
     package`, no sudo available to fix it). Fallback: run it through the
     `pg` npm package directly instead (same dependency `db/seed.mjs`
     already uses) —
     ```js
     import pg from 'pg';
     import { readFileSync } from 'node:fs';
     const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
     await client.connect();
     await client.query(readFileSync('db/schema.sql', 'utf8'));
     await client.end();
     ```

2. **Vercel Blob** — ⬜ not yet done. Install from the Vercel Marketplace when
   the admin panel actually needs image uploads (`ImageField.jsx` /
   `api/admin/upload`). Auto-injects `BLOB_READ_WRITE_TOKEN`. Until this is
   done, pasting an image URL/path still works in the admin forms — only
   the upload button will 503.

3. **`JWT_SECRET`** — ✅ done. 32 random bytes (`openssl rand -hex 32`), set
   on Production, Preview, and Development via
   `vercel env add JWT_SECRET <environment>`. Rotating it invalidates every
   existing admin session (everyone has to sign in again) — that's the only
   effect, it's safe to rotate any time.

### Known local-dev gotcha: IPv6 and the Neon HTTP driver

In some sandboxed/dev environments, outbound IPv6 is broken (`Network is
unreachable`) but IPv4 works fine. Raw TCP connections — `psql`, the `pg`
package (`db/seed.mjs`, schema setup above) — fall back to IPv4 correctly
and work. The **HTTP-based** driver the actual API routes use at runtime
(`@neondatabase/serverless`'s `neon()`, via `api/_lib/db.js`) goes through
Node's `fetch`/undici, which does *not* reliably fall back the same way in
that situation — it fails fast with `TypeError: fetch failed` /
`AggregateError [ETIMEDOUT]`, even though `curl` to the exact same host
succeeds (via its own IPv4 fallback) in under a second.

If you hit this while testing `npm run dev` locally: it's very likely your
environment's IPv6 config, not the code or the database — Vercel's actual
serverless runtime doesn't have this problem. Don't "fix" it by adding
IPv4-forcing hacks to `api/_lib/db.js` for what's a local-only symptom;
verify against a real deployment (preview or production) instead.

### Seeding

Loads the initial content from `src/data/*` into the DB. Idempotent — safe
to re-run. **Ran once already** (2026-08-25): products, projects (all 11
real client URLs), services, team, about, and contact are populated, and
the first admin user was created.

```bash
vercel env pull .env.local
node db/seed.mjs
```

If `INITIAL_ADMIN_EMAIL`/`INITIAL_ADMIN_PASSWORD` are set (pass them
inline on the command, e.g. `INITIAL_ADMIN_EMAIL=... INITIAL_ADMIN_PASSWORD=... node db/seed.mjs` —
don't write them into `.env.local`, they only need to exist for this one
invocation), the seed also creates the first admin user — it no-ops if
`admin_users` already has rows, so it's safe to re-run without overwriting
an existing admin.

**Current admin login:** `ionatec002@gmail.com`. There's no self-service
password reset yet — rotating it means updating `admin_users.password_hash`
directly (`UPDATE admin_users SET password_hash = ... WHERE email = ...`,
hashed with bcrypt cost 12) or adding a reset flow.

### Local development

```bash
vercel link               # one-time
vercel env pull .env.local
vercel dev                # runs Vite + /api functions on one port
```

## Deployment

Pushed to `main` → Vercel deploys to production. PR branches get preview
deployments automatically. Neon's Vercel integration creates a separate
database branch per preview.

The duplicate `iona-tech/` subdirectory is a frozen historical copy from a
2025-11 merge — do not edit. It will be removed in a separate cleanup commit.
