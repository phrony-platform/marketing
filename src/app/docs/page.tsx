import type { Metadata } from 'next';

import { DocsHome } from '@/components/docs/docs-home';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Phrony documentation: paradigm, agent spec, and runtime guides for declaring, deploying, and running agents.',
};

export default function DocsHomePage() {
  return <DocsHome />;
}
