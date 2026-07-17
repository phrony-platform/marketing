import { DocH2, DocH3, DocParagraph, DocProse } from '@/components/docs';
import { MethodExample } from '../typescript/method-example';
import * as ex from './python-examples';

export function PythonSdkUtilitiesSection() {
  return (
    <DocProse>
      <DocH2 id="utilities">Utilities</DocH2>

      <DocH2>Agent references</DocH2>
      <MethodExample name="parse_agent_ref(string)" code={ex.parseAgentRef} language="python" />
      <MethodExample name="format_agent_ref(ref)" code={ex.formatAgentRefOnly} language="python" />

      <DocH2>Bundle references</DocH2>
      <MethodExample
        name="parse_bundle_ref(string)"
        description="Version may be semver or a lock hash (sha256:…)."
        code={ex.parseBundleRef}
        language="python"
      />
      <MethodExample name="format_bundle_ref(ref)" code={ex.formatBundleRefOnly} language="python" />
      <MethodExample
        name="parse_bundle_ref_version_required(string)"
        description="Same as parse_bundle_ref but rejects empty @version — use for deploy_bundle."
        code={ex.parseBundleRefVersionRequired}
        language="python"
      />

      <DocH2>JSON bytes</DocH2>
      <MethodExample
        name="json_bytes / parse_json_bytes / json_bytes_map / resolved_secrets_map"
        description="Encode and decode proto bytes fields that carry UTF-8 JSON. resolved_secrets_map stores raw UTF-8 secret values (not JSON-encoded)."
        code={ex.jsonBytesExample}
        language="python"
      />

      <DocH2>Errors</DocH2>
      <MethodExample name="PhronyRuntimeError" code={ex.phronyRuntimeError} language="python" />
      <MethodExample name="wrap_rpc_error(action, err)" code={ex.wrapRpcError} language="python" />
      <MethodExample name="AgentSessionError" code={ex.agentSessionError} language="python" />
      <MethodExample name="AgentRefParseError" code={ex.agentRefParseError} language="python" />
      <MethodExample name="BundleRefParseError" code={ex.bundleRefParseError} language="python" />
      <MethodExample name="ToolError" code={ex.workerToolError} language="python" />

      <DocH2>Constants and helpers</DocH2>
      <MethodExample
        name="SDK_VERSION, DEFAULT_MAX_CONCURRENCY, handler_key, heartbeat_interval_ms"
        code={ex.constantsHelpers}
        language="python"
      />

      <DocH2>Generated types</DocH2>
      <DocParagraph>
        Import typed shapes from <code>phrony</code> for refs, interactive events, and common responses.
        Unary methods with keyword-arg convenience include <code>run_session</code>,{' '}
        <code>cancel_session</code>, <code>complete_session</code>, <code>inspect_session</code>,{' '}
        <code>get_approval</code>, <code>decide_approval</code>, and <code>list_approvals</code>. For
        publish, deploy, and catalog RPCs, pass protobuf request messages from{' '}
        <code>phrony.gen.phrony.runtime.v1</code> — nested <code>agent_ref</code> and{' '}
        <code>bundle_ref</code> fields accept dicts from <code>parse_agent_ref</code> /{' '}
        <code>parse_bundle_ref</code>.
      </DocParagraph>
      <MethodExample name="Type imports" code={ex.generatedTypes} language="python" />

      <DocH3>Commonly used types</DocH3>
      <DocParagraph>
        <code>AgentRef</code>, <code>BundleRef</code>, <code>InteractiveEvent</code>,{' '}
        <code>InteractiveSessionStartOptions</code>, <code>ApprovalDecision</code>,{' '}
        <code>GetVersionResponse</code>, <code>RunSessionResponse</code>
      </DocParagraph>
    </DocProse>
  );
}
