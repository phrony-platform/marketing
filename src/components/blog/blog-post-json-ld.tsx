import type { BlogPostMeta } from '@/lib/blog';
import { PHRONY_DOCS_ORIGIN } from '@/lib/project-urls';

type BlogJsonLdProps = {
  post: BlogPostMeta;
  url: string;
  imageUrl: string;
};

export function BlogPostJsonLd({ post, url, imageUrl }: BlogJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    image: [imageUrl],
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author,
          ...(post.authorImage
            ? { image: `${PHRONY_DOCS_ORIGIN}${post.authorImage}` }
            : {}),
        }
      : {
          '@type': 'Organization',
          name: 'Phrony',
          url: PHRONY_DOCS_ORIGIN,
        },
    publisher: {
      '@type': 'Organization',
      name: 'Phrony',
      url: PHRONY_DOCS_ORIGIN,
      logo: {
        '@type': 'ImageObject',
        url: `${PHRONY_DOCS_ORIGIN}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags?.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
