
# IONATECH Website

The official marketing site for IONATECH. React 18 + Vite SPA, deployed on Vercel.

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
| Services         | `src/data/services.js`           | `src/Components/Services/ServicesPage.jsx`             |
| Team             | `src/data/team.js`               | `src/Components/Testimonials/Testimonials.jsx`         |
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
3. Add `api/content/<name>.js` (public GET) and `api/admin/<name>.js` plus `api/admin/<name>/[id].js` (CRUD) (Phase 3+).
4. Add list and edit pages under `src/admin/` (e.g. `src/admin/<Name>List.jsx` and `<Name>Edit.jsx`) (Phase 3+).
5. Add or update the public component in `src/Components/<Name>/` to fetch from `/api/content/<name>` (Phase 2+).

### To add a new icon choice

Add the import + entry to `iconRegistry` in `src/data/iconRegistry.js`. The
admin form's icon dropdown auto-derives from `iconNames`.

## Admin panel

Visit `/admin` and sign in. From there you can edit products (with client,
project URL, and tech stack — useful for showcasing real IONATECH work),
services, team members, the about block, and contact info. Image fields
support either pasting a path/URL or uploading a file (stored in Vercel
Blob).

The site uses a fallback pattern: if the database is unreachable or empty,
the public site falls back to the bundled `src/data/` literals so it never
breaks. As soon as the API responds with content, that takes over.

### One-time backend setup

The admin panel needs three pieces of infrastructure provisioned via the
Vercel dashboard:

1. **Neon Postgres** — install from the Vercel Marketplace. It auto-injects
   `DATABASE_URL` into the project. Apply the schema:

   ```bash
   vercel env pull .env.local
   psql "$DATABASE_URL" -f db/schema.sql
   ```

2. **Vercel Blob** — install from the Vercel Marketplace. Auto-injects
   `BLOB_READ_WRITE_TOKEN`.

3. **Manual env vars**:
   - `JWT_SECRET` — 32+ random bytes (`openssl rand -hex 32`).
   - `INITIAL_ADMIN_EMAIL` and `INITIAL_ADMIN_PASSWORD` — used once by the
     seed script to create the first admin. Remove these after seeding.

   Add via `vercel env add JWT_SECRET production` (etc.).

### Seeding

Loads the initial content from `src/data/*` into the DB. Idempotent — safe
to re-run.

```bash
vercel env pull .env.local
node db/seed.mjs
```

If `INITIAL_ADMIN_EMAIL`/`INITIAL_ADMIN_PASSWORD` are set, the seed also
creates the first admin user. Remove those env vars after the first run.

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
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
>>>>>>> origin/first_improvements
