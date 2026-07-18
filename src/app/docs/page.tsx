import type { Metadata } from 'next';

import { DocsHome } from '@/components/docs/docs-home';

const description =
  'Phrony documentation: paradigm, agent spec, and runtime guides for declaring, deploying, and running agents.';

export const metadata: Metadata = {
  title: 'Documentation',
  description,
  alternates: {
    canonical: '/docs',
  },
  openGraph: {
    title: 'Documentation · Phrony',
    description,
    type: 'website',
    url: '/docs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documentation · Phrony',
    description,
  },
};

export default function DocsHomePage() {
  return <DocsHome />;
}
