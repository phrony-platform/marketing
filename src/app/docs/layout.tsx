import type { Metadata } from 'next';

import { DocsShell } from '@/components/docs';

export const metadata: Metadata = {
  title: {
    default: 'Documentation',
    template: '%s · Documentation · Phrony',
  },
  description:
    'Phrony documentation: paradigm, agent spec, and runtime guides for declaring, deploying, and running agents.',
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
