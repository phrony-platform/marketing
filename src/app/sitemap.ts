import type { MetadataRoute } from 'next';

import { getAllBlogPosts } from '@/lib/blog';
import { PHRONY_DOCS_ORIGIN } from '@/lib/project-urls';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts();

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
      url: `${PHRONY_DOCS_ORIGIN}/about`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${PHRONY_DOCS_ORIGIN}/docs`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${PHRONY_DOCS_ORIGIN}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T12:00:00.000Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
