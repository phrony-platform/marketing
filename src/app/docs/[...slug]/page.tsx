import type { Metadata } from 'next';
import Link from 'next/link';

import '@/lib/docs-pages';

import { DocPageJsonLd } from '@/components/docs/doc-page-json-ld';
import { getAllDocPages, getDocPage } from '@/lib/docs-registry';
import { PHRONY_DOCS_ORIGIN } from '@/lib/project-urls';

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllDocPages().map((page) => ({
    slug: page.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocPage(slug);
  if (!page) {
    return { title: 'Not found' };
  }

  const url = `/docs/${page.slug}`;
  const imageUrl = `/docs/og/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
      url,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [imageUrl],
    },
  };
}

export default async function DocSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getDocPage(slug);

  if (!page) {
    return (
      <div className="mx-auto max-w-xl space-y-4 py-8">
        <h1 className="font-sans text-2xl font-semibold text-foreground">Page not found</h1>
        <p className="text-muted-foreground">
          This documentation page has not been migrated yet. Browse existing pages from the sidebar or return to the{' '}
          <Link href="/docs" className="text-foreground underline underline-offset-2">
            docs home
          </Link>
          .
        </p>
      </div>
    );
  }

  const Content = page.component;
  const url = `${PHRONY_DOCS_ORIGIN}/docs/${page.slug}`;

  return (
    <>
      <DocPageJsonLd title={page.title} description={page.description} url={url} />
      <Content />
    </>
  );
}
