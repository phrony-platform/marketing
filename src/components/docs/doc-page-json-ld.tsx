type DocPageJsonLdProps = {
  title: string;
  description: string;
  url: string;
};

export function DocPageJsonLd({ title, description, url }: DocPageJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Organization',
      name: 'Phrony',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Phrony',
      url: 'https://phrony.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
