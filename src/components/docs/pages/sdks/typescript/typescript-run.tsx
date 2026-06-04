import Link from 'next/link';

import { DocH2, DocPage, DocParagraph, DocProse } from '@/components/docs';
import { MethodExample } from './method-example';
import * as ex from './typescript-examples';
import { TYPESCRIPT_EYEBROW } from './typescript-shared';

export function TypeScriptSdkRunPage() {
  return (
    <DocPage
      title="Run agents"
      description="Use Phrony and PhronyAgent to start sessions and wait for completion."
      eyebrow={TYPESCRIPT_EYEBROW}
    >
      <DocProse>
        <DocParagraph>
          <code>Phrony</code> is the high-level entry point for agent sessions. Connect first — see{' '}
          <Link
            href="/docs/sdks/typescript/connect"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            Connect to the runtime
          </Link>
          .
        </DocParagraph>

        <DocH2>Phrony</DocH2>
        <MethodExample
          name="new Phrony(options?)"
          description="Create a facade. runtimeAddr and optional credentials match RuntimeClientOptions. The client dials lazily on first use."
          code={ex.phronyConstructor}
        />
        <MethodExample
          name="Phrony.connect(options?)"
          description="Connect eagerly and return a ready instance."
          code={ex.phronyConnect}
        />
        <MethodExample name="phrony.close()" description="Close the underlying gRPC client." code={ex.closeClients} />
        <MethodExample
          name={'phrony.agent("namespace/name")'}
          description="Return a PhronyAgent. Accepts namespace/name@version. Bare names without a slash throw AgentRefParseError."
          code={ex.phronyAgentRef}
        />
        <MethodExample
          name="phrony.runtimeClient()"
          description="Return the lazily connected RuntimeClient."
          code={ex.phronyRuntimeClient}
        />

        <DocH2>PhronyAgent</DocH2>
        <MethodExample
          name="run(options?)"
          description="Start a session. wait: true (default) streams until completed; wait: false uses unary RunSession and returns immediately."
          code={ex.phronyRunWait}
        />
        <MethodExample name="run({ wait: false })" description="Fire-and-forget session start." code={ex.phronyRunNoWait} />
        <MethodExample
          name="runInteractive(options?)"
          description="Open RunSessionInteractive without waiting. Consume events() and call close() when done."
          code={ex.phronyRunInteractive}
        />

        <DocParagraph>
          For streaming event types, see{' '}
          <Link
            href="/docs/sdks/typescript/interactive-session"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            Interactive sessions
          </Link>
          . On failure with <code>wait: true</code>, <code>run()</code> throws{' '}
          <code>AgentSessionError</code> — see{' '}
          <Link
            href="/docs/sdks/typescript/utilities"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            Utilities
          </Link>
          .
        </DocParagraph>
      </DocProse>
    </DocPage>
  );
}
