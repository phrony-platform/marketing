import Link from 'next/link';

import { DocH2, DocParagraph, DocProse } from '@/components/docs';
import { MethodExample } from '../typescript/method-example';
import * as ex from './python-examples';

export function PythonSdkRunSection() {
  return (
    <DocProse>
      <DocH2 id="run">Run agents &amp; bundles</DocH2>
      <DocParagraph>
        <code>Phrony</code> is the high-level entry point for agent and bundle sessions. Connect first — see{' '}
        <a href="#connect" className="text-foreground underline underline-offset-4 hover:no-underline">
          Connect to the runtime
        </a>
        .
      </DocParagraph>

      <DocH2>Phrony</DocH2>
      <MethodExample
        name="Phrony(...)"
        description="Create a facade. runtime_addr and optional credentials match RuntimeClient options. The client dials lazily on first use."
        code={ex.phronyConstructor}
        language="python"
      />
      <MethodExample
        name="await Phrony.connect(...)"
        description="Connect eagerly and return a ready instance."
        code={ex.phronyConnect}
        language="python"
      />
      <MethodExample
        name="await phrony.close()"
        description="Close the underlying gRPC client."
        code={ex.closeClients}
        language="python"
      />
      <MethodExample
        name={'phrony.agent("namespace/name")'}
        description="Return a PhronyAgent. Accepts namespace/name@version. Bare names without a slash raise AgentRefParseError."
        code={ex.phronyAgentRef}
        language="python"
      />
      <MethodExample
        name={'phrony.bundle("namespace/name")'}
        description="Return a PhronyBundle. Accepts namespace/name@version where version is semver or a lock hash (sha256:…). Bare names without a slash raise BundleRefParseError."
        code={ex.phronyBundleRef}
        language="python"
      />
      <MethodExample
        name="await phrony.runtime_client()"
        description="Return the lazily connected RuntimeClient."
        code={ex.phronyRuntimeClient}
        language="python"
      />

      <DocH2>PhronyAgent</DocH2>
      <MethodExample
        name="await run(...)"
        description="Start a session. wait=True (default) streams until completed; wait=False uses unary RunSession and returns immediately."
        code={ex.phronyRunWait}
        language="python"
      />
      <MethodExample
        name="await run(wait=False)"
        description="Fire-and-forget session start."
        code={ex.phronyRunNoWait}
        language="python"
      />
      <MethodExample
        name="await run_interactive(...)"
        description="Open RunSessionInteractive without waiting. Consume events() and call close() when done."
        code={ex.phronyRunInteractive}
        language="python"
      />

      <DocH2>PhronyBundle</DocH2>
      <DocParagraph>
        Multi-agent systems published as a{' '}
        <Link
          href="/docs/agent-spec/resources/bundle"
          className="text-foreground underline underline-offset-4 hover:no-underline"
        >
          Bundle
        </Link>{' '}
        run through the bundle root member. <code>PhronyBundle</code> mirrors <code>PhronyAgent</code> — same{' '}
        <code>run()</code> options and <code>AgentSessionError</code> on failure.
      </DocParagraph>
      <MethodExample
        name="await run(...)"
        description="Start a session on the bundle root. wait=True (default) streams until completed; wait=False uses unary RunSession with bundle_ref."
        code={ex.phronyBundleRunWait}
        language="python"
      />
      <MethodExample
        name="await run(wait=False)"
        description="Fire-and-forget bundle session start."
        code={ex.phronyBundleRunNoWait}
        language="python"
      />
      <MethodExample
        name="await run_interactive(...)"
        description="Open RunSessionInteractive with bundle_ref without waiting."
        code={ex.phronyBundleRunInteractive}
        language="python"
      />

      <DocParagraph>
        For streaming event types, see{' '}
        <a href="#interactive-session" className="text-foreground underline underline-offset-4 hover:no-underline">
          Interactive sessions
        </a>
        . On failure with <code>wait=True</code>, <code>run()</code> raises <code>AgentSessionError</code> — see{' '}
        <a href="#utilities" className="text-foreground underline underline-offset-4 hover:no-underline">
          Utilities
        </a>
        .
      </DocParagraph>
    </DocProse>
  );
}
