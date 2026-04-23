import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/admin/dashboard/', '/admin/case-studies/', '/admin/leads/'],
      },
    ],
    sitemap: 'https://webcraftstudio.com/sitemap.xml',
  };
}
