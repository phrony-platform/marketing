import type { MetadataRoute } from 'next';

import { PHRONY_DOCS_ORIGIN } from '@/lib/project-urls';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/docs/template'],
    },
    sitemap: `${PHRONY_DOCS_ORIGIN}/sitemap.xml`,
  };
}
