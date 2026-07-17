import Link from 'next/link';

import { DocH2, DocParagraph, DocProse } from '@/components/docs';
import { MethodExample } from '../typescript/method-example';
import * as ex from './python-examples';

const clientPreamble = `import asyncio

from phrony import RuntimeClient


async def main() -> None:
    client = await RuntimeClient.connect()
    try:
        # examples below
        pass
    finally:
        await client.close()


asyncio.run(main())`;

export function PythonSdkRuntimeClientSection() {
  return (
    <DocProse>
      <DocH2 id="runtime-client">Runtime client</DocH2>
      <DocParagraph>
        <code>RuntimeClient</code> exposes every runtime unary RPC. Connect via{' '}
        <a href="#connect" className="text-foreground underline underline-offset-4 hover:no-underline">
          Connect to the runtime
        </a>
        . For agent runs, prefer{' '}
        <a href="#run" className="text-foreground underline underline-offset-4 hover:no-underline">
          Phrony
        </a>
        .
      </DocParagraph>

      <DocH2>Version and sessions</DocH2>
      <MethodExample name="await get_version(request?)" code={ex.getVersion} language="python" />
      <MethodExample
        name="await run_session(...)"
        description="Unary session start. Pass agent_ref or bundle_ref as a string, dict, or keyword argument (mutually exclusive). input and resolved_secrets accept plain dicts."
        code={ex.runSessionUnary}
        language="python"
      />
      <MethodExample
        name="await run_session(bundle_ref=...)"
        description="Start a session on a deployed bundle root member."
        code={ex.runSessionBundleUnary}
        language="python"
      />
      <MethodExample name="await list_sessions(request)" code={ex.listSessions} language="python" />
      <MethodExample
        name="await inspect_session(session_id=...)"
        description="Full persisted session dump: history, timeline, invocations, approvals, and delegated children."
        code={ex.inspectSession}
        language="python"
      />
      <MethodExample name="await cancel_session(session_id=...)" code={ex.cancelSession} language="python" />
      <MethodExample name="await complete_session(session_id=...)" code={ex.completeSession} language="python" />

      <DocH2>Publish and deploy — agents</DocH2>
      <MethodExample
        name="await publish(request)"
        description="manifest is the raw agent.yaml bytes."
        code={ex.publish}
        language="python"
      />
      <MethodExample name="await deploy(request)" code={ex.deploy} language="python" />
      <MethodExample name="await rollback(request)" code={ex.rollback} language="python" />
      <MethodExample name="await get_active_version(request)" code={ex.getActiveVersion} language="python" />
      <MethodExample name="await list_deployments(request)" code={ex.listDeployments} language="python" />
      <MethodExample name="await get_agent_version(request)" code={ex.getAgentVersion} language="python" />
      <MethodExample name="await retire_agent_version(request)" code={ex.retireAgentVersion} language="python" />
      <MethodExample name="await deprecate_agent_version(request)" code={ex.deprecateAgentVersion} language="python" />
      <MethodExample name="await archive_agent(request)" code={ex.archiveAgent} language="python" />

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
        name="await publish_bundle(request)"
        description="bundle_manifest and committed_lock are raw bytes; members lists vendored closure packages."
        code={ex.publishBundle}
        language="python"
      />
      <MethodExample
        name="await deploy_bundle(request)"
        description="bundle_ref must include @version — use parse_bundle_ref_version_required for deploy-by-hash."
        code={ex.deployBundle}
        language="python"
      />
      <MethodExample name="await get_active_bundle(request)" code={ex.getActiveBundle} language="python" />
      <MethodExample name="await list_bundle_deployments(request)" code={ex.listBundleDeployments} language="python" />

      <DocH2>Catalog</DocH2>
      <MethodExample name="await list_agents(request?)" code={ex.listAgents} language="python" />
      <MethodExample name="await list_agent_versions(request)" code={ex.listAgentVersions} language="python" />
      <MethodExample name="await list_bundles(request?)" code={ex.listBundles} language="python" />
      <MethodExample name="await list_bundle_versions(request)" code={ex.listBundleVersions} language="python" />

      <DocH2>Approvals</DocH2>
      <MethodExample name="await get_approval(approval_id=...)" code={ex.getApproval} language="python" />
      <MethodExample
        name="await list_approvals(...)"
        description="Filter by status, session_id, route, agent_namespace, and agent_name. Omit filters to list all."
        code={ex.listApprovals}
        language="python"
      />
      <MethodExample name="await decide_approval(...)" code={ex.decideApproval} language="python" />

      <DocH2>Streams</DocH2>
      <MethodExample
        name="work(metadata?)"
        description="Raw grpc.aio duplex stream — prefer Worker or WorkStream."
        code={ex.runtimeWorkStream}
        language="python"
      />
      <MethodExample
        name="run_session_interactive(metadata?)"
        description="Returns InteractiveSession — see Interactive sessions."
        code={ex.runtimeInteractive}
        language="python"
      />

      <DocParagraph className="text-sm text-muted-foreground">
        Typical usage wraps the client in try/finally:
      </DocParagraph>
      <MethodExample name="Pattern" code={clientPreamble} language="python" />
    </DocProse>
  );
}
