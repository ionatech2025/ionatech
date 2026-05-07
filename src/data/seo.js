export const SITE_URL = 'https://ionatec.com';

export const siteSeo = {
  name: 'IONATECH',
  legalName: 'IONATECH',
  url: SITE_URL,
  logo: `${SITE_URL}/images/Logo.jpg`,
  image: `${SITE_URL}/images/Logo.jpg`,
  email: 'ionatec002@gmail.com',
  telephone: '+256767896608',
  alternateTelephone: '+256752350470',
  address: {
    streetAddress: 'Kampala',
    addressLocality: 'Kampala',
    addressCountry: 'UG',
  },
  sameAs: ['https://github.com/ionatech2025'],
};

export const homeSeo = {
  path: '/',
  metaTitle: 'IONATECH | Web Development, Mobile Apps, AI & Dashboards in Uganda',
  metaDescription:
    'IONATECH builds SEO-ready websites, mobile apps, AI/ML systems, KPI dashboards, monitoring tools and custom software for teams in Uganda and beyond.',
  h1: 'Web Development, Mobile Apps, AI and Custom Software in Uganda',
};

export const servicesIndexSeo = {
  path: '/services',
  metaTitle: 'Technology Services | Web, Mobile, AI/ML, Dashboards & Custom Builds',
  metaDescription:
    'Explore IONATECH services: web development, native and Flutter mobile apps, AI/ML, deep learning, agentic AI, KPI dashboards and custom software builds.',
  h1: 'Technology Services Built for Search, Scale and Measurable Growth',
};

export const seoServices = [
  {
    slug: 'web-development',
    path: '/services/web-development',
    title: 'Web Development',
    shortTitle: 'Web Development',
    metaTitle: 'Web Development Services in Uganda | React, SEO & Custom Websites',
    metaDescription:
      'Custom web development for company websites, portals, dashboards and web apps using React, APIs, databases and technical SEO best practices.',
    tagline: 'SEO-ready websites and web platforms',
    h1: 'Web Development Services for Fast, SEO-Ready Business Websites',
    summary:
      'We design and build responsive company websites, landing pages, portals and web applications that are structured for search visibility, speed, accessibility and conversion.',
    description:
      'Modern, responsive websites and web applications built with clean architecture, strong technical SEO, secure APIs and scalable front-end systems.',
    image: '/images/coda.jpg',
    schemaImage: `${SITE_URL}/images/coda.jpg`,
    iconName: 'Code',
    accentColor: 'from-blue-500 to-cyan-500',
    bgAccent: 'bg-blue-500',
    serviceType: 'Web development',
    features: ['React websites', 'SEO landing pages', 'API integrations', 'Database-backed portals'],
    technologies: ['React', 'Vite', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    outcomes: ['Search-friendly page structure', 'Fast loading experiences', 'Secure forms and APIs', 'Maintainable codebase'],
    deliverables: ['Corporate websites', 'SaaS dashboards', 'Customer portals', 'Content-managed pages'],
    faq: [
      {
        question: 'Can IONATECH build SEO-ready company websites?',
        answer:
          'Yes. We build semantic pages, metadata, structured data, responsive layouts, fast assets and internal links so search engines can understand the business and services clearly.',
      },
      {
        question: 'Do you build custom web applications as well as websites?',
        answer:
          'Yes. We build marketing websites, dashboards, portals and custom browser-based applications with APIs, databases and admin workflows.',
      },
    ],
  },
  {
    slug: 'mobile-app-development',
    path: '/services/mobile-app-development',
    title: 'Mobile App Development',
    shortTitle: 'Mobile Apps',
    metaTitle: 'Mobile App Development | Native, Flutter, iOS, Kotlin & Android',
    metaDescription:
      'Mobile app development for Android, iOS, Kotlin, Swift, Flutter and React Native products, including UX, backend APIs, analytics and app launch support.',
    tagline: 'Native, Flutter, iOS, Kotlin and Android apps',
    h1: 'Mobile App Development for Android, iOS, Kotlin and Flutter Products',
    summary:
      'We build mobile applications for startups, SMEs, NGOs and enterprise teams, covering product strategy, UX, native Android, iOS, Flutter, backend APIs and launch support.',
    description:
      'Cross-platform and native mobile applications for iOS and Android that deliver smooth user experiences, secure data flows and measurable engagement.',
    image: '/images/Phone.jpg',
    schemaImage: `${SITE_URL}/images/Phone.jpg`,
    iconName: 'Smartphone',
    accentColor: 'from-violet-500 to-fuchsia-500',
    bgAccent: 'bg-violet-500',
    serviceType: 'Mobile application development',
    features: ['Native Android', 'iOS apps', 'Flutter apps', 'App analytics'],
    technologies: ['Kotlin', 'Swift', 'Flutter', 'React Native', 'Firebase', 'REST APIs'],
    outcomes: ['Native performance', 'Offline-first workflows', 'Push notifications', 'Store launch support'],
    deliverables: ['Customer apps', 'Field apps', 'Marketplace apps', 'Internal mobile tools'],
    faq: [
      {
        question: 'Do you build both native and Flutter mobile apps?',
        answer:
          'Yes. We can build native Android apps with Kotlin, iOS apps with Swift, or cross-platform apps with Flutter and React Native depending on the product goals.',
      },
      {
        question: 'Can you connect mobile apps to dashboards and APIs?',
        answer:
          'Yes. We design backend APIs, authentication, analytics and admin dashboards so mobile activity can be monitored and managed centrally.',
      },
    ],
  },
  {
    slug: 'ai-ml-deep-learning',
    path: '/services/ai-ml-deep-learning',
    title: 'AI, ML and Deep Learning',
    shortTitle: 'AI/ML',
    metaTitle: 'AI/ML & Deep Learning Services | Models, Automation & Analytics',
    metaDescription:
      'AI, machine learning and deep learning services for prediction, classification, automation, recommendations, data pipelines and business intelligence.',
    tagline: 'Applied AI, machine learning and deep learning',
    h1: 'AI, Machine Learning and Deep Learning Services for Business Automation',
    summary:
      'We help teams turn operational data into models, automations and decision-support systems using practical AI/ML, deep learning, data engineering and evaluation workflows.',
    description:
      'Applied AI and machine learning systems for prediction, classification, recommendations, document processing, automation and data-driven decision support.',
    image: '/images/SoftwareD.webp',
    schemaImage: `${SITE_URL}/images/SoftwareD.webp`,
    iconName: 'BrainCircuit',
    accentColor: 'from-emerald-500 to-teal-500',
    bgAccent: 'bg-emerald-500',
    serviceType: 'AI and machine learning development',
    features: ['Predictive models', 'Deep learning', 'Data pipelines', 'Model evaluation'],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Vector databases', 'MLOps'],
    outcomes: ['Practical automation', 'Model monitoring plans', 'Cleaner data workflows', 'Decision intelligence'],
    deliverables: ['Prediction systems', 'Recommendation tools', 'Computer vision prototypes', 'NLP workflows'],
    faq: [
      {
        question: 'What AI/ML systems can IONATECH build?',
        answer:
          'We build prediction models, classification systems, recommendation engines, document automation, NLP workflows and decision-support tools.',
      },
      {
        question: 'Do you support model monitoring after launch?',
        answer:
          'Yes. We plan for model performance checks, KPI tracking, data quality review and improvement cycles after launch.',
      },
    ],
  },
  {
    slug: 'agentic-ai-modelling',
    path: '/services/agentic-ai-modelling',
    title: 'Agentic AI Modelling',
    shortTitle: 'Agentic AI',
    metaTitle: 'Agentic AI Modelling Services | AI Agents, Workflows & Automation',
    metaDescription:
      'Agentic AI modelling for workflow automation, AI assistants, retrieval-augmented systems, multi-step agents and business process orchestration.',
    tagline: 'AI agents, assistants and workflow orchestration',
    h1: 'Agentic AI Modelling for Assistants, Workflows and Business Automation',
    summary:
      'We design agentic AI workflows that can retrieve information, reason across tasks, call tools, prepare reports and automate repeatable business processes with guardrails.',
    description:
      'AI agent systems for assisted operations, research workflows, customer support, reporting, knowledge retrieval and task automation.',
    image: '/images/Code.jpg',
    schemaImage: `${SITE_URL}/images/Code.jpg`,
    iconName: 'Bot',
    accentColor: 'from-amber-500 to-orange-500',
    bgAccent: 'bg-amber-500',
    serviceType: 'Agentic AI modelling',
    features: ['AI assistants', 'Tool-calling agents', 'RAG workflows', 'Process automation'],
    technologies: ['LLMs', 'RAG', 'Vector search', 'Workflow engines', 'APIs', 'Evaluation suites'],
    outcomes: ['Automated knowledge work', 'Human review checkpoints', 'Traceable outputs', 'Lower manual workload'],
    deliverables: ['Internal AI assistants', 'Research agents', 'Support copilots', 'Report generation agents'],
    faq: [
      {
        question: 'What is agentic AI modelling?',
        answer:
          'Agentic AI modelling designs AI systems that can follow multi-step workflows, use approved tools, retrieve context and complete tasks with defined safeguards.',
      },
      {
        question: 'Can agentic AI be connected to existing company systems?',
        answer:
          'Yes. We can connect agent workflows to approved APIs, databases, documents, CRMs and dashboards while keeping permissions and review controls clear.',
      },
    ],
  },
  {
    slug: 'kpi-monitoring-dashboards',
    path: '/services/kpi-monitoring-dashboards',
    title: 'KPI and Monitoring Dashboards',
    shortTitle: 'KPI Dashboards',
    metaTitle: 'KPI Dashboard Development | Monitoring, Reporting & Analytics',
    metaDescription:
      'Custom KPI dashboards, monitoring dashboards and analytics systems for real-time reporting, project tracking, operations visibility and executive decisions.',
    tagline: 'Real-time KPI, monitoring and reporting dashboards',
    h1: 'KPI and Monitoring Dashboard Development for Data-Led Teams',
    summary:
      'We build dashboards that make performance, operations, projects and impact metrics visible in one place, with clean data models and reporting workflows.',
    description:
      'Custom KPI dashboards, monitoring dashboards and analytics systems for operational visibility, executive reporting, project tracking and impact measurement.',
    image: '/images/Info.jpg',
    schemaImage: `${SITE_URL}/images/Info.jpg`,
    iconName: 'BarChart3',
    accentColor: 'from-sky-500 to-indigo-500',
    bgAccent: 'bg-sky-500',
    serviceType: 'Dashboard development',
    features: ['KPI tracking', 'Monitoring tools', 'Executive reports', 'Data visualization'],
    technologies: ['React', 'SQL', 'PostgreSQL', 'Power BI integrations', 'APIs', 'Charts'],
    outcomes: ['Single source of truth', 'Faster decisions', 'Automated reporting', 'Clear operational metrics'],
    deliverables: ['Executive dashboards', 'Program monitoring tools', 'Sales dashboards', 'Impact reporting systems'],
    faq: [
      {
        question: 'Can you build KPI dashboards for management teams?',
        answer:
          'Yes. We build executive dashboards, operations dashboards, project monitoring tools and reporting systems around the metrics that matter to each team.',
      },
      {
        question: 'Can dashboards connect to existing databases and spreadsheets?',
        answer:
          'Yes. We can connect dashboards to databases, APIs, spreadsheets and other approved sources, then clean and model the data for reporting.',
      },
    ],
  },
  {
    slug: 'custom-software-development',
    path: '/services/custom-software-development',
    title: 'Custom Software Development',
    shortTitle: 'Custom Builds',
    metaTitle: 'Custom Software Development | Portals, Systems & Business Apps',
    metaDescription:
      'Custom software development for business systems, portals, CRMs, internal tools, desktop apps, integrations and secure operational workflows.',
    tagline: 'Custom builds for real operational workflows',
    h1: 'Custom Software Development for Business Systems and Internal Tools',
    summary:
      'We turn manual workflows into reliable custom systems, portals, internal tools, integrations and desktop applications designed around how your team actually works.',
    description:
      'Custom business software, portals, desktop applications and internal tools built for secure workflows, operational reliability and long-term maintainability.',
    image: '/images/Pc.jpg',
    schemaImage: `${SITE_URL}/images/Pc.jpg`,
    iconName: 'Monitor',
    accentColor: 'from-rose-500 to-red-500',
    bgAccent: 'bg-rose-500',
    serviceType: 'Custom software development',
    features: ['Internal tools', 'Business portals', 'Desktop apps', 'Workflow automation'],
    technologies: ['React', 'Node.js', 'Python', 'Electron', 'Tauri', 'PostgreSQL'],
    outcomes: ['Reduced manual work', 'Secure role-based access', 'Reliable records', 'Maintainable systems'],
    deliverables: ['CRMs', 'Admin portals', 'Inventory systems', 'Desktop applications'],
    faq: [
      {
        question: 'Can IONATECH build software around our exact workflow?',
        answer:
          'Yes. We map the workflow, data, roles and reporting needs before designing a custom system around the process.',
      },
      {
        question: 'Do you build desktop applications?',
        answer:
          'Yes. We build desktop applications for Windows, macOS and Linux when offline reliability or deeper system integration is needed.',
      },
    ],
  },
  {
    slug: 'cloud-api-integrations',
    path: '/services/cloud-api-integrations',
    title: 'Cloud and API Integrations',
    shortTitle: 'Cloud & APIs',
    metaTitle: 'Cloud & API Integration Services | Backends, Databases & Automation',
    metaDescription:
      'Cloud backend, API integration, database and automation services for websites, mobile apps, dashboards, payments and third-party systems.',
    tagline: 'Backends, cloud services and third-party integrations',
    h1: 'Cloud and API Integration Services for Connected Digital Products',
    summary:
      'We connect products to secure backends, databases, payments, cloud services and third-party APIs so web, mobile and dashboard systems work together reliably.',
    description:
      'Cloud backends, API integrations, databases, authentication, automation and deployment pipelines for connected software products.',
    image: '/images/HandsCode.jpg',
    schemaImage: `${SITE_URL}/images/HandsCode.jpg`,
    iconName: 'Cloud',
    accentColor: 'from-cyan-500 to-blue-500',
    bgAccent: 'bg-cyan-500',
    serviceType: 'Cloud and API integration',
    features: ['Backend APIs', 'Cloud deployment', 'Payment integrations', 'Authentication'],
    technologies: ['Node.js', 'PostgreSQL', 'Firebase', 'AWS', 'Vercel', 'REST APIs'],
    outcomes: ['Reliable integrations', 'Secure access control', 'Scalable data flows', 'Deployment confidence'],
    deliverables: ['Backend APIs', 'Payment flows', 'Auth systems', 'Data integrations'],
    faq: [
      {
        question: 'Can you integrate payments, APIs and third-party systems?',
        answer:
          'Yes. We integrate payment gateways, external APIs, databases, authentication providers and cloud services for connected digital products.',
      },
      {
        question: 'Do you deploy and maintain cloud systems?',
        answer:
          'Yes. We help with deployment, environment setup, monitoring basics, backups and technical maintenance planning.',
      },
    ],
  },
  {
    slug: 'ui-ux-graphic-design',
    path: '/services/ui-ux-graphic-design',
    title: 'UI/UX and Graphic Design',
    shortTitle: 'UI/UX Design',
    metaTitle: 'UI/UX & Graphic Design Services | Product Design, Branding & Interfaces',
    metaDescription:
      'UI/UX design, product design, branding, interface systems and visual design for websites, mobile apps, dashboards and digital campaigns.',
    tagline: 'Interface design, branding and digital product UX',
    h1: 'UI/UX and Graphic Design for Websites, Apps and Digital Products',
    summary:
      'We design user interfaces, brand systems, product flows and marketing visuals that make digital products easier to use and easier to trust.',
    description:
      'Creative visual and product design services including UI/UX, brand identity, dashboard design, website layouts and digital marketing assets.',
    image: '/images/Studio.jpeg',
    schemaImage: `${SITE_URL}/images/Studio.jpeg`,
    iconName: 'Palette',
    accentColor: 'from-purple-500 to-pink-500',
    bgAccent: 'bg-purple-500',
    serviceType: 'UI/UX and graphic design',
    features: ['Product UX', 'Brand identity', 'Dashboard UI', 'Marketing graphics'],
    technologies: ['Figma', 'Adobe Creative Suite', 'Design systems', 'Wireframes', 'Prototypes'],
    outcomes: ['Clearer user journeys', 'Consistent brand presence', 'Conversion-focused layouts', 'Developer-ready designs'],
    deliverables: ['Wireframes', 'Clickable prototypes', 'Brand kits', 'Interface systems'],
    faq: [
      {
        question: 'Do you design before development starts?',
        answer:
          'Yes. For product work, we can create user flows, wireframes, interface systems and prototypes before engineering begins.',
      },
      {
        question: 'Can you design dashboards and admin panels?',
        answer:
          'Yes. We design dashboard interfaces around scanning, comparison, reporting and repeated operational workflows.',
      },
    ],
  },
];

export function getServiceByPath(pathname) {
  const normalized = normalizePath(pathname);
  return seoServices.find((service) => service.path === normalized) || null;
}

export function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '');
}

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path === '/' ? '/' : path}`;
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteSeo.name,
    legalName: siteSeo.legalName,
    url: siteSeo.url,
    logo: siteSeo.logo,
    image: siteSeo.image,
    email: siteSeo.email,
    telephone: siteSeo.telephone,
    address: {
      '@type': 'PostalAddress',
      ...siteSeo.address,
    },
    sameAs: siteSeo.sameAs,
    areaServed: ['Uganda', 'East Africa', 'Worldwide'],
    description:
      'IONATECH is a software engineering company in Kampala, Uganda building websites, mobile applications, AI/ML systems, dashboards and custom software.',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteSeo.telephone,
        contactType: 'sales',
        areaServed: ['UG', 'KE', 'TZ', 'RW', 'Worldwide'],
        availableLanguage: ['English'],
      },
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteSeo.name,
    url: siteSeo.url,
    inLanguage: 'en',
  };
}

export function buildServiceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} - ${siteSeo.name}`,
    serviceType: service.serviceType,
    url: absoluteUrl(service.path),
    image: service.schemaImage,
    description: service.metaDescription,
    provider: {
      '@type': 'Organization',
      name: siteSeo.name,
      url: siteSeo.url,
      logo: siteSeo.logo,
    },
    areaServed: ['Uganda', 'East Africa', 'Worldwide'],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Startups, SMEs, NGOs, schools, health teams and enterprise teams',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'UGX',
      url: absoluteUrl(service.path),
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} deliverables`,
      itemListElement: service.deliverables.map((deliverable) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: deliverable,
        },
      })),
    },
  };
}

export function buildServiceItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'IONATECH technology services',
    itemListElement: seoServices.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      url: absoluteUrl(service.path),
    })),
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildHomeStructuredData() {
  return [buildOrganizationSchema(), buildWebSiteSchema(), buildServiceItemListSchema()];
}

export function buildServicesIndexStructuredData() {
  return [
    buildOrganizationSchema(),
    buildServiceItemListSchema(),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Technology Services', path: '/services' },
    ]),
  ];
}

export function buildServiceStructuredData(service) {
  return [
    buildOrganizationSchema(),
    buildServiceSchema(service),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Technology Services', path: '/services' },
      { name: service.title, path: service.path },
    ]),
  ];
}

export const staticSeoPages = [
  {
    ...servicesIndexSeo,
    canonical: absoluteUrl('/services'),
    structuredData: buildServicesIndexStructuredData(),
  },
  ...seoServices.map((service) => ({
    ...service,
    canonical: absoluteUrl(service.path),
    structuredData: buildServiceStructuredData(service),
  })),
];
