import Link from 'next/link';

import { DocCard, DocCardGroup, DocH2, DocPage, DocParagraph, DocProse } from '@/components/docs';
import { SdkLanguageLogo } from '@/components/docs/language-logos';
import { docLabel } from '@/components/docs/doc-style';
import { sdkLanguageDescriptions } from '@/lib/sdk-language-meta';

const sdkLanguages = [
  { name: 'Python', href: '/docs/sdks/python', language: 'python' as const },
  { name: 'TypeScript', href: '/docs/sdks/typescript', language: 'typescript' as const },
];

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
      </DocProse>

      <div className="not-prose border-t border-border pt-8">
        <p className={docLabel}>Languages</p>
        <DocCardGroup className="mt-3">
          {sdkLanguages.map((sdk) => (
            <DocCard
              key={sdk.name}
              title={sdk.name}
              href={sdk.href}
              icon={<SdkLanguageLogo language={sdk.language} />}
              iconBox={false}
            >
              {sdkLanguageDescriptions[sdk.name] ?? `${sdk.name} SDK reference.`}
            </DocCard>
          ))}
        </DocCardGroup>
      </div>
    </DocPage>
  );
}
