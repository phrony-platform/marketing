import Link from 'next/link';
import { Braces } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { DocCard, DocCardGroup, DocH2, DocPage, DocParagraph, DocProse } from '@/components/docs';
import { docLabel } from '@/components/docs/doc-style';
import { DOC_TABS, type DocNavGroup } from '@/lib/docs-navigation';
import { sdkLanguageDescriptions } from '@/lib/sdk-language-meta';

const sdkLanguageIcons: Record<string, LucideIcon> = {
  TypeScript: Braces,
};

const sdkLanguageGroups =
  DOC_TABS.find((tab) => tab.id === 'sdks')?.groups.filter((group) => group.group !== 'Overview') ?? [];

function sdkLanguageOverviewHref(group: DocNavGroup): string {
  return group.pages.find((page) => page.title === 'Overview')?.href ?? group.pages[0]?.href ?? '/docs/sdks';
}

export function SdksIndexPage() {
  return (
    <DocPage
      title="SDKs"
      description="Client libraries for connecting to the Phrony runtime over gRPC."
      eyebrow="SDKs"
    >
      <DocProse>
        <DocParagraph>
          Phrony SDKs wrap the runtime gRPC API so you can run agents and bundles, stream interactive sessions, and register tool
          workers from your application code. The contract matches the{' '}
          <Link href="/docs/runtime" className="text-foreground underline underline-offset-4 hover:no-underline">
            runtime
          </Link>{' '}
          service — unary RPCs for lifecycle and catalog operations, plus bidirectional streams for{' '}
          <code>Work</code> (tool workers) and <code>RunSessionInteractive</code> (streaming sessions).
        </DocParagraph>

        <DocH2>Available SDKs</DocH2>
        <DocParagraph>
          TypeScript (<code>@phrony/sdk</code>) is the reference client for Node.js 18+. Additional language SDKs may
          follow the same surface: a high-level <code>Phrony</code> facade with <code>PhronyAgent</code> and{' '}
          <code>PhronyBundle</code> handles, a <code>RuntimeClient</code> for full RPC access, and a <code>Worker</code>{' '}
          helper for tool bindings.
        </DocParagraph>
      </DocProse>

      <div className="not-prose border-t border-border pt-8">
        <p className={docLabel}>Languages</p>
        <DocCardGroup className="mt-3">
          {sdkLanguageGroups.map((group) => (
            <DocCard
              key={group.group}
              title={group.group}
              href={sdkLanguageOverviewHref(group)}
              icon={sdkLanguageIcons[group.group]}
            >
              {sdkLanguageDescriptions[group.group] ?? `${group.group} SDK reference.`}
            </DocCard>
          ))}
        </DocCardGroup>
      </div>
    </DocPage>
  );
}
