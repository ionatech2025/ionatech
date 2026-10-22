/** @type {import('./schema').TeamMember[]} */
export const teamMembers = [
  {
    id: 1,
    name: 'Nyombi Elijah Erusaniya',
    role: 'Director | Finance & Accounts | Client Acquisition Team (CAT)',
    image: '/images/elijah.jpg',
    tag: 'Leadership',
    bio: 'Elijah Nyombi is one of the Directors and Co-founders for iONA Tech, a cutting-edge software company committed to driving innovation and providing impactful technological solutions. With a rich background in journalism, public health, and digital marketing communication, Elijah leads the company with a focus on digital transformation and high-quality software development.',
    skills: ['Digital Strategy', 'Public Health Tech', 'Marketing'],
    sortOrder: 1,
    published: true,
  },
  {
    id: 2,
    name: 'Nakunda Lillian',
    role: 'Software Engineer | Design Lead | Graphics Designer | UI-UX Designer',
    image: '/images/lillian.jpg',
    tag: 'Frontend',
    bio: 'Lillian is an innovative Software Engineering student at Makerere University and a Co-founder at iONA Tech. As a versatile developer, she serves as a Systems Analyst, Web Developer, and Graphic Designer. She specializes in crafting high-quality front-end web experiences and mobile applications, bringing a fresh, modern perspective to the tech space.',
    skills: ['React', 'UI/UX Design', 'Mobile Dev'],
    sortOrder: 2,
    published: true,
  },
  {
    id: 3,
    name: 'Baliddawa Allan',
    role: 'Director | QA Lead | Frontend Lead',
    image: '/images/allanella.jpg',
    tag: 'Fullstack',
    bio: 'Allan is a Director, Co-founder, and a passionate, skilled Fullstack Web Developer with a strong background in both front-end and back-end development. He specializes in building responsive, user-friendly, and scalable web applications using modern technologies including ReactJS, Java (Spring Boot), and Node.js.',
    skills: ['Spring Boot', 'ReactJS', 'Node.js'],
    sortOrder: 3,
    published: true,
  },
  {
    id: 4,
    name: 'Mulungi Abigail',
    role: 'Sales & Growth Lead | Social Media Marketing Lead',
    image: '/images/jordi.jpg',
    tag: 'Sales & Growth Lead',
    bio: 'Abigail is a passionate JavaScript developer and Co-founder with a keen eye for innovation. With a strong focus on crafting exceptional software experiences, she excels in designing and developing scalable web applications and desktop solutions.',
    skills: ['JavaScript', 'Desktop Apps', 'Web Architecture'],
    sortOrder: 4,
    published: true,
  },
  {
    id: 5,
    name: 'Mpairwe Lauben',
    role: 'Engineering Lead | DevOps Lead',
    image: '/images/alien.jpg',
    tag: 'ML & Cloud',
    bio: 'With over five years of hands-on experience, Mpairwe Lauben is a dynamic software engineer and Co-founder with a passion for crafting intelligent, scalable, and user-centric digital solutions. His core expertise lies at the intersection of mobile application development, cloud-native systems, and machine learning technologies.',
    skills: ['Machine Learning', 'Cloud Systems', 'Mobile Dev'],
    sortOrder: 5,
    published: true,
  },
  {
    id: 6,
    name: 'Katongole Samuel',
    role: 'Director | CEO | Product/Project Manager | Client Acquisition Team (CAT)',
    image: '/images/sam.jpg',
    tag: 'Leadership',
    bio: 'Samuel is a Director and Co-founder, and a passionate Java Developer dedicated to crafting software that inspires progress and delivers value. Skilled in building intuitive, functional desktop and web applications, he combines technical expertise with a heart for service, collaboration and faith-driven purpose.',
    skills: ['Spring Boot', 'JavaFX', 'React Ecosystem', 'Product Design'],
    sortOrder: 6,
    published: true,
  },
];

export const tagColors = {
  Leadership: { bg: 'rgba(34, 211, 238, 0.12)', text: '#67e8f9', dot: '#22d3ee' },
  Frontend: { bg: 'rgba(52, 211, 153, 0.12)', text: '#86efac', dot: '#34d399' },
  Fullstack: { bg: 'rgba(56, 189, 248, 0.12)', text: '#7dd3fc', dot: '#38bdf8' },
  'ML & Cloud': { bg: 'rgba(247, 201, 72, 0.12)', text: '#f7c948', dot: '#f7c948' },
  Backend: { bg: 'rgba(96, 165, 250, 0.12)', text: '#93c5fd', dot: '#60a5fa' },
};

export function deriveTagFromRole(role, fallbackTag = 'Team') {
  const raw = typeof role === 'string' ? role.trim() : '';
  if (!raw) return fallbackTag || 'Team';

  const parts = raw
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length === 0) return fallbackTag || 'Team';

  // Legacy generic Co-founder roles fall back to the curated tag.
  if (parts.length === 2 && /^co-?founder$/i.test(parts[1])) {
    return fallbackTag || parts[0];
  }
  if (parts.length === 1 && /&\s*co-?founder$/i.test(parts[0])) {
    return fallbackTag || parts[0].replace(/\s*&\s*co-?founder$/i, '').trim();
  }

  if (parts.length >= 2 && /^director$/i.test(parts[0])) {
    if (/^ceo$/i.test(parts[1])) return 'Director | CEO';
    return parts[1];
  }

  return parts[0];
}

export function getTagStyle(tag, role = '') {
  if (tag && tagColors[tag]) return tagColors[tag];
  const combined = `${tag || ''} ${role || ''}`;
  if (/\b(qa|fullstack|quality)\b/i.test(combined)) return tagColors.Fullstack;
  if (/\b(design|designer|ui|ux|graphic|graphics|frontend)\b/i.test(combined)) return tagColors.Frontend;
  if (/\b(sales|growth|marketing|ml|cloud|devops|ai)\b/i.test(combined)) return tagColors['ML & Cloud'];
  if (/\b(ceo|finance|leadership|accounts|director)\b/i.test(combined)) return tagColors.Leadership;
  if (/\b(backend|product|project|engineer|engineering)\b/i.test(combined)) return tagColors.Backend;
  return tagColors.Leadership;
}

export function mergeTeamMembers(live, fallback = teamMembers) {
  const source = Array.isArray(live) && live.length > 0 ? live : fallback || [];
  const fbList = Array.isArray(fallback) ? fallback : [];
  const fbById = new Map(fbList.map((m) => [m.id, m]));
  const fbByName = new Map(fbList.map((m) => [String(m.name || '').trim().toLowerCase(), m]));

  return source
    .filter((row) => row && row.published !== false)
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || (a.id ?? 0) - (b.id ?? 0))
    .map((row) => {
      const normalizedName = String(row.name || '').trim().toLowerCase();
      const fb =
        fbById.get(row.id) ||
        fbByName.get(normalizedName) ||
        fbList.find((m) => normalizedName.startsWith(String(m.name || '').trim().toLowerCase()));

      const name = (typeof row.name === 'string' && row.name.trim()) || fb?.name || '';
      const role = (typeof row.role === 'string' && row.role.trim()) || fb?.role || '';
      const bio =
        (typeof row.bio === 'string' && row.bio.trim()) ||
        (typeof row.description === 'string' && row.description.trim()) ||
        fb?.bio ||
        fb?.description ||
        '';
      const image = (typeof row.image === 'string' && row.image.trim()) || fb?.image || '/placeholder.svg';
      const skills = Array.isArray(row.skills) && row.skills.length > 0 ? row.skills : fb?.skills || [];
      const tag = deriveTagFromRole(role, row.tag || fb?.tag);

      return {
        ...(fb || {}),
        ...row,
        id: row.id ?? fb?.id,
        name,
        role,
        bio,
        description: bio,
        image,
        skills,
        tag,
      };
    });
}
