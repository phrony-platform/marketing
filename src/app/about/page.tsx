import type { Metadata } from 'next';

import { AboutContent } from '@/components/blocks/about-content';
import { MarketingShell } from '@/components/marketing-shell';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Phrony is a governed runtime for production AI agents — ship without rebuilding the stack, with control over what your agents can do.',
};

export default function AboutPage() {
  return (
    <MarketingShell>
      <AboutContent />
    </MarketingShell>
  );
}
