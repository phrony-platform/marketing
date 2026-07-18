import type { Metadata } from 'next';

import { TermsOfServiceContent } from '@/components/blocks/terms-of-service-content';
import { MarketingShell } from '@/components/marketing-shell';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Phrony Terms of Service: open specification, self-hosted runtime, Enterprise, acceptable use, EU AI Act, and governing law.',
  alternates: {
    canonical: '/terms-of-service',
  },
};

export default function TermsOfServicePage() {
  return (
    <MarketingShell>
      <TermsOfServiceContent />
    </MarketingShell>
  );
}
