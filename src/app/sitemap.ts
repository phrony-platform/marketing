import type { MetadataRoute } from 'next';

import '@/lib/docs-pages';

import { getAllBlogPosts } from '@/lib/blog';
import { getAllDocPages } from '@/lib/docs-registry';
import { PHRONY_DOCS_ORIGIN } from '@/lib/project-urls';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts();
  const docs = getAllDocPages();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: PHRONY_DOCS_ORIGIN,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${PHRONY_DOCS_ORIGIN}/blog`,
      lastModified: posts[0] ? new Date(`${posts[0].date}T12:00:00.000Z`) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${PHRONY_DOCS_ORIGIN}/docs`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${PHRONY_DOCS_ORIGIN}/privacy-policy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${PHRONY_DOCS_ORIGIN}/terms-of-service`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${PHRONY_DOCS_ORIGIN}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T12:00:00.000Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const docRoutes: MetadataRoute.Sitemap = docs.map((page) => ({
    url: `${PHRONY_DOCS_ORIGIN}/docs/${page.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes, ...docRoutes];
}
