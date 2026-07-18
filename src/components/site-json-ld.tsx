import { PHRONY_DOCS_ORIGIN } from '@/lib/project-urls';

export function SiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${PHRONY_DOCS_ORIGIN}/#organization`,
        name: 'Phrony',
        url: PHRONY_DOCS_ORIGIN,
        logo: `${PHRONY_DOCS_ORIGIN}/favicon.ico`,
      },
      {
        '@type': 'WebSite',
        '@id': `${PHRONY_DOCS_ORIGIN}/#website`,
        name: 'Phrony',
        url: PHRONY_DOCS_ORIGIN,
        publisher: {
          '@id': `${PHRONY_DOCS_ORIGIN}/#organization`,
        },
        inLanguage: 'en',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
