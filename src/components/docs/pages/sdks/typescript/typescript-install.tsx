import Link from 'next/link';

import { DocH2, DocPage, DocParagraph, DocProse } from '@/components/docs';
import { MethodExample } from './method-example';
import * as ex from './typescript-examples';
import { TYPESCRIPT_EYEBROW } from './typescript-shared';

export function TypeScriptSdkInstallPage() {
  return (
    <DocPage
      title="Install"
      description="Add @phrony/sdk to your Node.js project."
      eyebrow={TYPESCRIPT_EYEBROW}
    >
      <DocProse>
        <DocParagraph>
          Install from your package registry, then{' '}
          <Link
            href="/docs/sdks/typescript/connect"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            connect to a runtime
          </Link>
          . For a guided tool-binding walkthrough, see{' '}
          <Link
            href="/docs/quick-start/tool-binding"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            Add a tool binding
          </Link>
          .
        </DocParagraph>

        <DocH2>Package</DocH2>
        <MethodExample
          name="pnpm add @phrony/sdk"
          description="Requires Node.js 18+."
          code={ex.installPackage}
          language="bash"
        />

        <DocH2>Import paths</DocH2>
        <MethodExample
          name="@phrony/sdk and @phrony/sdk/worker"
          description="Use the main entry for Phrony, RuntimeClient, and Worker. Use the worker subpath when you only need WorkStream and worker types."
          code={ex.importPaths}
        />
      </DocProse>
    </DocPage>
  );
}
