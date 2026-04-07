export interface CaseStudyCredentials {
  email: string;
  password: string;
}

export function validateCredentials(creds: CaseStudyCredentials): string | null {
  if (!creds.email.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(creds.email)) return 'Invalid email';
  if (!creds.password) return 'Password is required';
  return null;
}

export interface CaseStudy {
  label: string;
  title: string;
  excerpt: string;
  year: string;
  imageUrl: string;
  link: string;
  gradient: string;
}

export const caseStudies: CaseStudy[] = [
  {
    label: 'Health & Wellness',
    title: 'Low Ox Life: What Empathy Really Means in Design',
    excerpt:
      'Empathy is not a workshop exercise. It is the discipline of building for a problem you have actually carried — and using design to make a hard daily reality navigable for the people living it.',
    year: '2026',
    imageUrl: '/images/case-studies/lowoxlife-empathy.jpg',
    link: '/products/low-ox-life',
    gradient: 'linear-gradient(135deg, #24A89C, #0B3733)',
  },
  {
    label: 'Government & Permitting',
    title: 'PlanFlow: Structuring How Plan Reviews Get Decided',
    excerpt:
      'A plan submission and review system for agencies managing permits and approvals — structured workflows, role-based reviews, and AI that sharpens human judgment instead of replacing it.',
    year: '2026',
    imageUrl: '/images/case-studies/planflow-engineers.jpg',
    link: '#',
    gradient: 'linear-gradient(135deg, #f59e0b, #ea580c)',
  },
  {
    label: 'Creative Services',
    title: 'Designing a Portfolio When Anyone Can Build Anything',
    excerpt:
      'In a world where generative AI can produce websites in seconds, how do you make a portfolio that actually means something?',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    link: '/case-study-style-1/',
    gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
  },
  {
    label: 'Enterprise Software',
    title: 'Hyland OnBase Integration',
    excerpt:
      'Enterprise document management meets Salesforce. Drag-and-drop content management with automatic indexing.',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    link: '/hyland-onbase-salesforce-integration/',
    gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
  },
  {
    label: 'Enterprise Software',
    title: 'Hyland for Workday Integration',
    excerpt:
      'Unified content management embedded directly into Workday screens. No middleware. No custom code.',
    year: '2025',
    imageUrl: '',
    link: '/works/case-studies/hyland-for-workday-integration/',
    gradient: 'linear-gradient(180deg, #0f172a, #1e293b)',
  },
  {
    label: 'Case Study',
    title: 'Salesforce Migration Editorial',
    excerpt:
      'Designed for clarity. Built for adoption. A unified platform transformation.',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    link: '#',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
];

