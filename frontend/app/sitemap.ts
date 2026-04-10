import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://webcraftstudio.com';
  const routes = [
    '',
    '/services',
    '/case-studies',
    '/about',
    '/process',
    '/testimonials',
    '/pricing',
    '/contact',
  ];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
