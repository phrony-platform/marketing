import type { Metadata } from 'next';

import { TermsOfServiceContent } from '@/components/blocks/terms-of-service-content';
import { MarketingShell } from '@/components/marketing-shell';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Phrony Terms of Service: definitions, acceptable use, liability, EU AI Act, governing law (Netherlands), and more.',
};

export default function TermsOfServicePage() {
  return (
    <MarketingShell>
      <TermsOfServiceContent />
    </MarketingShell>
  );
}
