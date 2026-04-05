import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/models/blog';

const BASE_URL = 'https://bfl.design';

const staticRoutes = [
  '/',
  '/about',
  '/about/ray',
  '/contact',
  '/works',
  '/works/methodology',
  '/process',
  '/clients',
  '/newsletter',
  '/products',
  '/products/low-ox-life',
  '/products/bio-break',
  '/products/24-hour-urine-analysis',
  '/products/releases',
  '/transformation',
  '/transformation/workshop',
  '/blog',
  '/ai-ethics',
  '/legal',
  '/privacy',
  '/terms',
  '/support',
  '/support/low-ox-life',
  '/support/bio-break',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));

  const blogSlugs = getAllSlugs();
  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
