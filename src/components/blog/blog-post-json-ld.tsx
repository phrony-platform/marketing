import type { BlogPostMeta } from '@/lib/blog';

type BlogJsonLdProps = {
  post: BlogPostMeta;
  url: string;
};

export function BlogPostJsonLd({ post, url }: BlogJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author,
          ...(post.authorImage ? { image: post.authorImage } : {}),
        }
      : {
          '@type': 'Organization',
          name: 'Phrony',
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
