// src/models/navigation.ts

export interface NavItem {
  label: string;
  href: string;
  megamenu?: 'products' | 'about';
  children?: NavItem[];
}

export interface MegamenuPanel {
  id: string;
  label: string;
  href: string;
  description: string;
}

export const primaryNav: NavItem[] = [
  { label: 'Our Work', href: '/works' },
  { label: 'Transformation', href: '/transformation' },
  { label: 'Products', href: '#', megamenu: 'products' },
  { label: 'About', href: '/about', megamenu: 'about' },
];

export const secondaryNav: NavItem[] = [
  { label: 'Contact', href: '/contact' },
];

export const productsPanels: MegamenuPanel[] = [
  { id: 'low-ox-life', label: 'Low Ox Life', href: '/products/low-ox-life', description: 'Track and manage oxalate intake with smart food logging.' },
  { id: 'bio-break', label: 'Bio Break', href: '/products/bio-break', description: 'Track bathroom health patterns and insights.' },
  { id: '24h-urine', label: '24-Hour Urine Analysis', href: '/products/24-hour-urine-analysis', description: 'Comprehensive urine analysis tracking.' },
  { id: 'product-releases', label: 'Product Releases', href: '/products/releases', description: 'Latest updates and release notes.' },
  { id: 'legal', label: 'Legal', href: '/legal', description: 'Privacy policies and terms of service.' },
];

export const aboutPanels: MegamenuPanel[] = [
  { id: 'about-us', label: 'About Us', href: '/about', description: 'Learn about Big Freight Life and our mission.' },
  { id: 'process', label: 'Process', href: '/process', description: 'How we approach system design and transformation.' },
  { id: 'ai-ethics', label: 'AI Ethics', href: '/ai-ethics', description: 'Our principles for responsible AI design.' },
  { id: 'newsletter', label: 'Our Newsletter', href: '/newsletter', description: 'Stay updated with our latest thinking.' },
  { id: 'online-design-course', label: 'Online Design Course', href: '/transformation/workshop', description: 'Learn system design principles.' },
  { id: 'support', label: 'Support', href: '/support', description: 'Get help with our products.' },
];

export const mobileTabItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Works', href: '/works' },
  { label: 'Contact', href: '/contact' },
];

export const mobileDrawerItems: NavItem[] = [
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about', children: [
    { label: 'About Us', href: '/about' },
    { label: 'Who We Serve', href: '/clients' },
  ]},
  { label: 'Support', href: '/support' },
  { label: 'Transformation', href: '/transformation' },
];

export const mobileDrawerUtility: NavItem[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export const footerNav = {
  works: [
    { label: 'Case Studies', href: '/works/case-studies' },
    { label: 'Products', href: '/products' },
    { label: 'Methodology', href: '/works/methodology' },
    { label: 'Articles', href: '/blog' },
  ],
  about: [
    { label: 'About Us', href: '/about' },
    { label: 'Who We Serve', href: '/clients' },
  ],
  legal: [
    { label: 'About', href: '/about' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  if (href === '#') return false;
  return pathname === href || pathname.startsWith(href + '/');
}

// Check if any submenu item under a megamenu parent is active
export function isMegamenuActive(pathname: string, megamenu: 'products' | 'about'): boolean {
  const panels = megamenu === 'products' ? productsPanels : aboutPanels;
  return panels.some((panel) => isActiveRoute(pathname, panel.href));
}
