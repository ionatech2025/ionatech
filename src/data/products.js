import Driver from '../assets/Driver.jpg';
import Phone from '../assets/Phone.jpg';
import Pc from '../assets/Pc.jpg';

/** @type {import('./schema').Product[]} */
export const products = [
  {
    id: 1,
    slug: 'software-management-system',
    title: 'Software Management System',
    description: 'Comprehensive fleet management solution for modern businesses',
    category: 'Software Solutions',
    iconName: 'Code',
    image: Driver,
    client: '',
    projectUrl: '',
    techStack: [],
    sortOrder: 1,
    published: true,
  },
  {
    id: 2,
    slug: 'mobile-applications',
    title: 'Mobile Applications',
    description: 'Cross-platform mobile apps built with cutting-edge technology',
    category: 'Mobile Development',
    iconName: 'Smartphone',
    image: Phone,
    client: '',
    projectUrl: '',
    techStack: [],
    sortOrder: 2,
    published: true,
  },
  {
    id: 3,
    slug: 'desktop-applications',
    title: 'Desktop Applications',
    description: 'Powerful desktop solutions for enterprise and personal use',
    category: 'Desktop Development',
    iconName: 'Monitor',
    image: Pc,
    client: '',
    projectUrl: '',
    techStack: [],
    sortOrder: 3,
    published: true,
  },
];
