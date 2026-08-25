// Idempotent seed script: loads the existing hardcoded content from src/data/
// into the database. Re-running is safe (uses INSERT ... ON CONFLICT DO NOTHING).
//
// Usage:
//   vercel env pull .env.local        # gets DATABASE_URL from Neon Marketplace integration
//   node db/seed.mjs
//
// Set INITIAL_ADMIN_EMAIL + INITIAL_ADMIN_PASSWORD to also seed the first admin user.
// Remove those env vars after the first run.

import pg from 'pg';
import bcrypt from 'bcryptjs';
import dns from 'node:dns';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { projects as projectsSeed } from '../src/data/projects.js';

// Force IPv4. setDefaultResultOrder isn't honored by all Node versions/paths,
// so monkey-patch dns.lookup as a belt-and-suspenders fix for hosts whose
// IPv6 stack can't reach Neon (CI, some containers).
dns.setDefaultResultOrder('ipv4first');
const originalLookup = dns.lookup;
dns.lookup = (host, opts, cb) => {
  if (typeof opts === 'function') return originalLookup(host, { family: 4 }, opts);
  return originalLookup(host, { ...(opts || {}), family: 4 }, cb);
};

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local if present (no dotenv dep — keep it tiny).
try {
  const env = readFileSync(join(__dirname, '..', '.env.local'), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '');
  }
} catch {}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Run `vercel env pull .env.local` first.');
  process.exit(1);
}

// Tagged-template wrapper over pg so the rest of this file reads like the
// @neondatabase/serverless API. The runtime API (api/_lib/db.js) still uses
// @neondatabase/serverless because Vercel Functions need HTTP-based queries.
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
function sql(strings, ...values) {
  let text = '';
  for (let i = 0; i < strings.length; i++) {
    text += strings[i];
    if (i < values.length) text += `$${i + 1}`;
  }
  return client.query(text, values).then((r) => r.rows);
}

// Hardcoded seed data mirroring src/data/* (text-only — images are referenced
// by their /public/images/ path or left empty so the frontend uses its bundled
// fallback until an admin uploads a replacement).

const productsSeed = [
  {
    slug: 'software-management-system',
    title: 'Software Management System',
    description: 'Comprehensive fleet management solution for modern businesses',
    category: 'Software Solutions',
    icon_name: 'Code',
    image_url: null,
    client: '',
    project_url: '',
    tech_stack: [],
    sort_order: 1,
  },
  {
    slug: 'mobile-applications',
    title: 'Mobile Applications',
    description: 'Cross-platform mobile apps built with cutting-edge technology',
    category: 'Mobile Development',
    icon_name: 'Smartphone',
    image_url: null,
    client: '',
    project_url: '',
    tech_stack: [],
    sort_order: 2,
  },
  {
    slug: 'desktop-applications',
    title: 'Desktop Applications',
    description: 'Powerful desktop solutions for enterprise and personal use',
    category: 'Desktop Development',
    icon_name: 'Monitor',
    image_url: null,
    client: '',
    project_url: '',
    tech_stack: [],
    sort_order: 3,
  },
];

const servicesSeed = [
  {
    slug: 'web-development',
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with cutting-edge technologies',
    icon_name: 'Code',
    icon_image: null,
    image_url: null,
    color_class: 'text-blue-600',
    features: ['React & Next.js', 'Node.js Backend', 'Database Design'],
    details: {
      overview: 'Transform your digital presence with our comprehensive web development services. We focus on speed, security, and scalability.',
      technologies: ['React.js', 'Next.js', 'Node.js', 'Tailwind CSS'],
      benefits: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
    },
    sort_order: 1,
  },
  {
    slug: 'mobile-development',
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications for iOS and Android platforms',
    icon_name: 'Smartphone',
    icon_image: null,
    image_url: null,
    color_class: 'text-purple-600',
    features: ['React Native', 'Flutter', 'App Store Deployment'],
    details: {
      overview: 'Build powerful mobile applications that engage users and drive results. We handle everything from design to App Store launch.',
      technologies: ['React Native', 'Flutter', 'Firebase'],
      benefits: ['Native Performance', 'Offline Capabilities', 'User-Centric UX'],
    },
    sort_order: 2,
  },
  {
    slug: 'graphics-design',
    title: 'Graphics Design',
    description: 'Creative visual solutions including branding and UI/UX design',
    icon_name: 'Palette',
    icon_image: null,
    image_url: null,
    color_class: 'text-pink-600',
    features: ['Brand Identity', 'UI/UX Design', 'Digital Marketing'],
    details: {
      overview: 'Create stunning visual experiences that captivate your audience and build brand authority.',
      technologies: ['Figma', 'Adobe Suite', 'Canva Pro'],
      benefits: ['Brand Consistency', 'Professional Quality', 'Modern Aesthetics'],
    },
    sort_order: 3,
  },
  {
    slug: 'desktop-applications',
    title: 'Desktop Applications',
    description: 'Powerful software solutions for Windows, macOS, and Linux',
    icon_name: 'Monitor',
    icon_image: null,
    image_url: null,
    color_class: 'text-green-600',
    features: ['Cross-Platform', 'Native Performance', 'System Integration'],
    details: {
      overview: 'Develop robust desktop applications designed for heavy performance and deep system reliability.',
      technologies: ['Electron', 'Python', 'Tauri'],
      benefits: ['Data Security', 'Native Feel', 'Offline Reliability'],
    },
    sort_order: 4,
  },
];

const teamSeed = [
  { name: 'Nyombi Elijah',     role: 'Director | Co-founder',          image_url: '/images/elijah.jpg',    sort_order: 1, bio: 'Elijah Nyombi is one of the Directors and Co-founders for iONA Tech, a cutting-edge software company committed to driving innovation and providing impactful technological solutions. With a rich background in journalism, public health, and digital marketing communication, Elijah leads the company with a focus on digital transformation and high-quality software development.' },
  { name: 'Nakunda Lillian',   role: 'Software Engineer | Co-founder', image_url: '/images/lillian.jpg',   sort_order: 2, bio: 'Lillian is an innovative Software Engineering student at Makerere University and a Co-founder at iONA Tech. As a versatile developer, she serves as a Systems Analyst, Web Developer, and Graphic Designer. She specializes in crafting high-quality front-end web experiences and mobile applications, bringing a fresh, modern perspective to the tech space.' },
  { name: 'Baliddawa Allan',   role: 'Director | Co-founder',          image_url: '/images/allanella.jpg', sort_order: 3, bio: 'Allan is a Director, Co-founder, and a passionate, skilled Fullstack Web Developer with a strong background in both front-end and back-end development. He specializes in building responsive, user-friendly, and scalable web applications using modern technologies including ReactJS, Java (Spring Boot), and Node.js.' },
  { name: 'Mulungi Abigail',   role: 'JavaScript Developer | Co-founder', image_url: '/images/jordi.jpg', sort_order: 4, bio: 'Abigail is a passionate JavaScript developer and Co-founder with a keen eye for innovation. With a strong focus on crafting exceptional software experiences, she excels in designing and developing scalable web applications and desktop solutions.' },
  { name: 'Mpairwe Lauben',    role: 'Software Engineer | Co-founder', image_url: '/images/alien.jpg',     sort_order: 5, bio: 'With over five years of hands-on experience, Mpairwe Lauben is a dynamic software engineer and Co-founder with a passion for crafting intelligent, scalable, and user-centric digital solutions. His core expertise lies at the intersection of mobile application development, cloud-native systems, and machine learning technologies.' },
  { name: 'Katongole Samuel',  role: 'Director | Co-founder',          image_url: '/images/sam.jpg',       sort_order: 6, bio: 'Samuel is a Director and Co-founder, and a passionate Java Developer dedicated to crafting software that inspires progress and delivers value. Skilled in building intuitive, functional desktop and web applications, he combines technical expertise with a heart for service, collaboration and faith-driven purpose.' },
];

const aboutSeed = {
  eyebrow: 'Who We Are',
  title_lead: 'Turning Complex Ideas into',
  title_highlight: 'Powerful Software.',
  description: "At iONA Tech, we don't just write code; we architect digital futures. We understand that in a crowded market, your technology needs to be your greatest competitive advantage. We bridge the gap between creative design and robust engineering to help you <strong>make it big.</strong>",
  image_url: null,
  stat_badge_value: '100%',
  stat_badge_label: 'Client Commitment',
  stats: [
    { iconName: 'Rocket',      label: 'Innovation Led',      detail: 'Latest Tech Stacks' },
    { iconName: 'ShieldCheck', label: 'Secure Scalability',  detail: 'Enterprise Standards' },
    { iconName: 'Trophy',      label: 'Excellence',          detail: 'Quality Focused' },
  ],
};

const contactSeed = {
  email: 'ionatec002@gmail.com',
  phone: '',
  address: 'Kampala, Uganda',
  whatsapp_number: '256700966715',
  web3forms_access_key: '059244e1-534a-434e-a22d-7add58b68447',
};

async function seedProducts() {
  for (const p of productsSeed) {
    await sql`
      INSERT INTO products (slug, title, description, category, icon_name, image_url, client, project_url, tech_stack, sort_order)
      VALUES (${p.slug}, ${p.title}, ${p.description}, ${p.category}, ${p.icon_name}, ${p.image_url}, ${p.client}, ${p.project_url}, ${JSON.stringify(p.tech_stack)}::jsonb, ${p.sort_order})
      ON CONFLICT (slug) DO NOTHING
    `;
  }
  console.log(`✓ products seeded (${productsSeed.length})`);
}

// Unlike the other *Seed arrays above (which are stale hand-duplicates of
// older content and have drifted from what's actually live), this one
// imports straight from src/data/projects.js — the same file the public
// Projects section uses as its fallback — so there's exactly one place to
// edit and nothing to keep in sync by hand.
async function seedProjects() {
  for (const p of projectsSeed) {
    await sql`
      INSERT INTO projects (slug, title, description, client, project_url, image_url, icon_name, tech_stack, status, sort_order)
      VALUES (${p.slug}, ${p.title}, ${p.description}, ${p.client}, ${p.projectUrl}, ${p.image}, ${p.iconName}, ${JSON.stringify(p.techStack)}::jsonb, ${p.status}, ${p.sortOrder})
      ON CONFLICT (slug) DO NOTHING
    `;
  }
  console.log(`✓ projects seeded (${projectsSeed.length})`);
}

async function seedServices() {
  for (const s of servicesSeed) {
    await sql`
      INSERT INTO services (slug, title, description, icon_name, icon_image, image_url, color_class, features, details, sort_order)
      VALUES (${s.slug}, ${s.title}, ${s.description}, ${s.icon_name}, ${s.icon_image}, ${s.image_url}, ${s.color_class}, ${JSON.stringify(s.features)}::jsonb, ${JSON.stringify(s.details)}::jsonb, ${s.sort_order})
      ON CONFLICT (slug) DO NOTHING
    `;
  }
  console.log(`✓ services seeded (${servicesSeed.length})`);
}

async function seedTeam() {
  // No unique constraint on team_members.name; only seed if table is empty.
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM team_members`;
  if (count > 0) {
    console.log(`✓ team already has ${count} rows — skipped`);
    return;
  }
  for (const m of teamSeed) {
    await sql`
      INSERT INTO team_members (name, role, bio, image_url, sort_order)
      VALUES (${m.name}, ${m.role}, ${m.bio}, ${m.image_url}, ${m.sort_order})
    `;
  }
  console.log(`✓ team seeded (${teamSeed.length})`);
}

async function seedAbout() {
  await sql`
    INSERT INTO about_content (id, eyebrow, title_lead, title_highlight, description, image_url, stat_badge_value, stat_badge_label, stats)
    VALUES (1, ${aboutSeed.eyebrow}, ${aboutSeed.title_lead}, ${aboutSeed.title_highlight}, ${aboutSeed.description}, ${aboutSeed.image_url}, ${aboutSeed.stat_badge_value}, ${aboutSeed.stat_badge_label}, ${JSON.stringify(aboutSeed.stats)}::jsonb)
    ON CONFLICT (id) DO NOTHING
  `;
  console.log('✓ about seeded');
}

async function seedContact() {
  await sql`
    INSERT INTO contact_info (id, email, phone, address, whatsapp_number, web3forms_access_key)
    VALUES (1, ${contactSeed.email}, ${contactSeed.phone}, ${contactSeed.address}, ${contactSeed.whatsapp_number}, ${contactSeed.web3forms_access_key})
    ON CONFLICT (id) DO NOTHING
  `;
  console.log('✓ contact seeded');
}

async function seedAdmin() {
  const email = process.env.INITIAL_ADMIN_EMAIL;
  const password = process.env.INITIAL_ADMIN_PASSWORD;
  if (!email || !password) {
    console.log('⚠ skipping admin user (set INITIAL_ADMIN_EMAIL + INITIAL_ADMIN_PASSWORD to seed one)');
    return;
  }
  const [existing] = await sql`SELECT COUNT(*)::int AS count FROM admin_users`;
  if (existing.count > 0) {
    console.log(`✓ admin_users already populated (${existing.count}) — skipped`);
    return;
  }
  const hash = await bcrypt.hash(password, 12);
  await sql`INSERT INTO admin_users (email, password_hash) VALUES (${email}, ${hash})`;
  console.log(`✓ admin user created: ${email}`);
  console.log('  Remove INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD from your env now.');
}

(async () => {
  try {
    await seedProducts();
    await seedProjects();
    await seedServices();
    await seedTeam();
    await seedAbout();
    await seedContact();
    await seedAdmin();
    console.log('\nDone.');
  } catch (err) {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
})();
