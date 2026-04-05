import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/works/case-studies' },
    sitemap: 'https://bfl.design/sitemap.xml',
  };
}
