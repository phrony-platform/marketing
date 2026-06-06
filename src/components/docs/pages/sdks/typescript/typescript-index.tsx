import { Braces, Download, Link2, Play, Radio, Server, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { DocCard, DocCardGroup, DocPage, DocParagraph, DocProse } from '@/components/docs';
import { docLabel } from '@/components/docs/doc-style';
import { typescriptSdkPageDescriptions } from '@/lib/typescript-sdk-page-meta';
import { TYPESCRIPT_SDK_NAV } from '@/lib/typescript-sdk-nav';

const typescriptPageIcons: Record<string, LucideIcon> = {
  '/docs/sdks/typescript/install': Download,
  '/docs/sdks/typescript/connect': Link2,
  '/docs/sdks/typescript/run': Play,
  '/docs/sdks/typescript/interactive-session': Radio,
  '/docs/sdks/typescript/worker': Wrench,
  '/docs/sdks/typescript/runtime-client': Server,
  '/docs/sdks/typescript/utilities': Braces,
};

const typescriptTopicPages = TYPESCRIPT_SDK_NAV.filter((page) => page.href !== '/docs/sdks/typescript');

export function TypeScriptSdkIndexPage() {
  return (
    <DocPage
      title="Overview"
      description="The @phrony/sdk client for Node.js — install, run agents and bundles, stream sessions, and register workers."
      eyebrow="SDKs · TypeScript"
    >
      <DocProse>
        <DocParagraph>
          <code>@phrony/sdk</code> is the TypeScript client for the Phrony runtime. It targets Node.js 18+, uses{' '}
          <code>@grpc/grpc-js</code>, and maps proto <code>bytes</code> JSON fields through helpers so you work with
          ordinary JavaScript objects.
        </DocParagraph>
      </DocProse>

      <div className="not-prose border-t border-border pt-8">
        <p className={docLabel}>Topics</p>
        <DocCardGroup className="mt-3">
          {typescriptTopicPages.map((page) => (
              <DocCard
                key={page.href}
                title={page.title}
                href={page.href}
                icon={typescriptPageIcons[page.href]}
              >
                {typescriptSdkPageDescriptions[page.href] ?? 'TypeScript SDK reference.'}
              </DocCard>
            ))}
        </DocCardGroup>
      </div>
    </DocPage>
  );
}
