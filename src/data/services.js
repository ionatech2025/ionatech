import coda from '../assets/coda.jpg';
import mobile from '../assets/mobile.jpeg';
import graphics from '../assets/graphics.jpeg';
import Pc from '../assets/Pc.jpg';
import AppDev from '../assets/AppDev.png';
import phoneApp from '../assets/phoneApp.png';
import ManDesk from '../assets/ManDesk.png';

/** @type {import('./schema').Service[]} */
export const services = [
  {
    id: 1,
    slug: 'web-development',
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with cutting-edge technologies',
    iconName: 'Code',
    iconImage: AppDev,
    image: coda,
    colorClass: 'text-blue-600',
    features: ['React & Next.js', 'Node.js Backend', 'Database Design'],
    details: {
      overview:
        'Transform your digital presence with our comprehensive web development services. We focus on speed, security, and scalability.',
      technologies: ['React.js', 'Next.js', 'Node.js', 'Tailwind CSS'],
      benefits: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
    },
    sortOrder: 1,
    published: true,
  },
  {
    id: 2,
    slug: 'mobile-development',
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications for iOS and Android platforms',
    iconName: 'Smartphone',
    iconImage: phoneApp,
    image: mobile,
    colorClass: 'text-purple-600',
    features: ['React Native', 'Flutter', 'App Store Deployment'],
    details: {
      overview:
        'Build powerful mobile applications that engage users and drive results. We handle everything from design to App Store launch.',
      technologies: ['React Native', 'Flutter', 'Firebase'],
      benefits: ['Native Performance', 'Offline Capabilities', 'User-Centric UX'],
    },
    sortOrder: 2,
    published: true,
  },
  {
    id: 3,
    slug: 'graphics-design',
    title: 'Graphics Design',
    description: 'Creative visual solutions including branding and UI/UX design',
    iconName: 'Palette',
    iconImage: ManDesk,
    image: graphics,
    colorClass: 'text-pink-600',
    features: ['Brand Identity', 'UI/UX Design', 'Digital Marketing'],
    details: {
      overview:
        'Create stunning visual experiences that captivate your audience and build brand authority.',
      technologies: ['Figma', 'Adobe Suite', 'Canva Pro'],
      benefits: ['Brand Consistency', 'Professional Quality', 'Modern Aesthetics'],
    },
    sortOrder: 3,
    published: true,
  },
  {
    id: 4,
    slug: 'desktop-applications',
    title: 'Desktop Applications',
    description: 'Powerful software solutions for Windows, macOS, and Linux',
    iconName: 'Monitor',
    iconImage: ManDesk,
    image: Pc,
    colorClass: 'text-green-600',
    features: ['Cross-Platform', 'Native Performance', 'System Integration'],
    details: {
      overview:
        'Develop robust desktop applications designed for heavy performance and deep system reliability.',
      technologies: ['Electron', 'Python', 'Tauri'],
      benefits: ['Data Security', 'Native Feel', 'Offline Reliability'],
    },
    sortOrder: 4,
    published: true,
  },
];
