import Link from 'next/link';

import { DocH2, DocPage, DocParagraph, DocProse } from '@/components/docs';
import { MethodExample } from './method-example';
import * as ex from './typescript-examples';
import { TYPESCRIPT_EYEBROW } from './typescript-shared';

const clientPreamble = `import { RuntimeClient } from "@phrony/sdk";

const client = await RuntimeClient.connect();
try {
  // examples below
} finally {
  client.close();
}`;

export function TypeScriptSdkRuntimeClientPage() {
  return (
    <DocPage
      title="Runtime client"
      description="RuntimeClient unary RPCs for agent and bundle lifecycle, sessions, approvals, and catalog."
      eyebrow={TYPESCRIPT_EYEBROW}
    >
      <DocProse>
        <DocParagraph>
          <code>RuntimeClient</code> exposes every runtime unary RPC. Connect via{' '}
          <Link
            href="/docs/sdks/typescript/connect"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            Connect to the runtime
          </Link>
          . For agent runs, prefer{' '}
          <Link
            href="/docs/sdks/typescript/run"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            Phrony
          </Link>
          .
        </DocParagraph>

        <DocH2>Version and sessions</DocH2>
        <MethodExample name="getVersion(request?)" code={ex.getVersion} />
        <MethodExample
          name="runSession(request)"
          description="Unary session start. Set agentRef or bundleRef (mutually exclusive). Encode input and secrets with jsonBytes / jsonBytesMap."
          code={ex.runSessionUnary}
        />
        <MethodExample
          name="runSession({ bundleRef })"
          description="Start a session on a deployed bundle root member."
          code={ex.runSessionBundleUnary}
        />
        <MethodExample name="listSessions(request)" code={ex.listSessions} />
        <MethodExample
          name="inspectSession(request)"
          description="Full persisted session dump: history, timeline, invocations, approvals, and delegated children."
          code={ex.inspectSession}
        />
        <MethodExample name="cancelSession(request)" code={ex.cancelSession} />
        <MethodExample name="completeSession(request)" code={ex.completeSession} />

        <DocH2>Publish and deploy — agents</DocH2>
        <MethodExample name="publish(request)" description="manifest is the raw agent.yaml bytes." code={ex.publish} />
        <MethodExample name="deploy(request)" code={ex.deploy} />
        <MethodExample name="rollback(request)" code={ex.rollback} />
        <MethodExample name="getActiveVersion(request)" code={ex.getActiveVersion} />
        <MethodExample name="listDeployments(request)" code={ex.listDeployments} />
        <MethodExample name="getAgentVersion(request)" code={ex.getAgentVersion} />
        <MethodExample name="retireAgentVersion(request)" code={ex.retireAgentVersion} />
        <MethodExample name="deprecateAgentVersion(request)" code={ex.deprecateAgentVersion} />
        <MethodExample name="archiveAgent(request)" code={ex.archiveAgent} />

        <DocH2>Publish and deploy — bundles</DocH2>
        <DocParagraph>
          Bundle lifecycle RPCs mirror the CLI{' '}
          <Link
            href="/docs/runtime/cli/bundle"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            bundles
          </Link>{' '}
          commands. Publish requires the committed <code>bundle.lock.json</code> bytes alongside the bundle manifest.
        </DocParagraph>
        <MethodExample
          name="publishBundle(request)"
          description="bundleManifest and committedLock are raw bytes; members lists vendored closure packages."
          code={ex.publishBundle}
        />
        <MethodExample
          name="deployBundle(request)"
          description="bundleRef must include @version — use parseBundleRefVersionRequired for deploy-by-hash."
          code={ex.deployBundle}
        />
        <MethodExample name="getActiveBundle(request)" code={ex.getActiveBundle} />
        <MethodExample name="listBundleDeployments(request)" code={ex.listBundleDeployments} />

        <DocH2>Catalog</DocH2>
        <MethodExample name="listAgents(request?)" code={ex.listAgents} />
        <MethodExample name="listAgentVersions(request)" code={ex.listAgentVersions} />
        <MethodExample name="listBundles(request?)" code={ex.listBundles} />
        <MethodExample name="listBundleVersions(request)" code={ex.listBundleVersions} />

        <DocH2>Approvals</DocH2>
        <MethodExample name="getApproval(request)" code={ex.getApproval} />
        <MethodExample name="listApprovals(request?)" code={ex.listApprovals} />
        <MethodExample name="decideApproval(request)" code={ex.decideApproval} />

        <DocH2>Streams</DocH2>
        <MethodExample
          name="work(metadata?, options?)"
          description="Raw grpc-js duplex stream — prefer Worker or WorkStream."
          code={ex.runtimeWorkStream}
        />
        <MethodExample
          name="runSessionInteractive(metadata?, options?)"
          description="Returns InteractiveSession — see Interactive sessions."
          code={ex.runtimeInteractive}
        />

        <DocParagraph className="text-sm text-muted-foreground">
          Typical usage wraps the client in try/finally:
        </DocParagraph>
        <MethodExample name="Pattern" code={clientPreamble} />
      </DocProse>
    </DocPage>
  );
}
