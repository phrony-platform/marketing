import type { Metadata } from 'next';

import { DocsTemplateContent } from '@/components/docs/pages/docs-template-content';

export const metadata: Metadata = {
  title: 'Documentation template',
  description: 'Reference layout and components for authoring Phrony documentation pages.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DocsTemplatePage() {
  return <DocsTemplateContent />;
}
