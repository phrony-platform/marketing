import type { Metadata } from 'next';

import { PrivacyPolicyContent } from '@/components/blocks/privacy-policy-content';
import { MarketingShell } from '@/components/marketing-shell';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Phrony Privacy Policy: self-hosted runtime data practices, GDPR rights, cookies, retention, and contact.',
};

export default function PrivacyPolicyPage() {
  return (
    <MarketingShell>
      <PrivacyPolicyContent />
    </MarketingShell>
  );
}
