import { DocH2, DocH3, DocPage, DocParagraph, DocProse } from '@/components/docs';
import { MethodExample } from './method-example';
import * as ex from './typescript-examples';
import { TYPESCRIPT_EYEBROW } from './typescript-shared';

export function TypeScriptSdkUtilitiesPage() {
  return (
    <DocPage
      title="Utilities"
      description="Agent and bundle references, JSON bytes helpers, errors, constants, and proto types."
      eyebrow={TYPESCRIPT_EYEBROW}
    >
      <DocProse>
        <DocH2>Agent references</DocH2>
        <MethodExample name="parseAgentRef(string)" code={ex.parseAgentRef} />
        <MethodExample name="formatAgentRef(ref)" code={ex.formatAgentRefOnly} />

        <DocH2>Bundle references</DocH2>
        <MethodExample
          name="parseBundleRef(string)"
          description="Version may be semver or a lock hash (sha256:…)."
          code={ex.parseBundleRef}
        />
        <MethodExample name="formatBundleRef(ref)" code={ex.formatBundleRefOnly} />
        <MethodExample
          name="parseBundleRefVersionRequired(string)"
          description="Same as parseBundleRef but rejects empty @version — use for deployBundle."
          code={ex.parseBundleRefVersionRequired}
        />

        <DocH2>JSON bytes</DocH2>
        <MethodExample
          name="jsonBytes / parseJsonBytes / jsonBytesMap"
          description="Encode and decode proto bytes fields that carry UTF-8 JSON."
          code={ex.jsonBytesExample}
        />

        <DocH2>Errors</DocH2>
        <MethodExample name="PhronyRuntimeError" code={ex.phronyRuntimeError} />
        <MethodExample name="wrapRpcError(action, err)" code={ex.wrapRpcError} />
        <MethodExample name="AgentSessionError" code={ex.agentSessionError} />
        <MethodExample name="AgentRefParseError" code={ex.agentRefParseError} />
        <MethodExample name="BundleRefParseError" code={ex.bundleRefParseError} />
        <MethodExample name="ToolError" code={ex.workerToolError} />

        <DocH2>Constants and helpers</DocH2>
        <MethodExample
          name="SDK_VERSION, DEFAULT_MAX_CONCURRENCY, handlerKey, heartbeatIntervalMs"
          code={ex.constantsHelpers}
        />

        <DocH2>Generated types</DocH2>
        <DocParagraph>
          Import proto message types from <code>@phrony/sdk</code> when building requests for{' '}
          <code>RuntimeClient</code> unary methods.
        </DocParagraph>
        <MethodExample name="Type imports" code={ex.generatedTypes} />

        <DocH3>Commonly used types</DocH3>
        <DocParagraph>
          <code>AgentRef</code>, <code>BundleRef</code>, <code>Approval</code>, <code>ApprovalDecision</code>,{' '}
          <code>PublishRequest</code>, <code>PublishBundleRequest</code>, <code>DeployRequest</code>,{' '}
          <code>DeployBundleRequest</code>, <code>BundleSummary</code>, <code>BundleVersionSummary</code>,{' '}
          <code>RunSessionRequest</code>, <code>WorkClientMsg</code>, <code>RunSessionInteractiveClientMsg</code>
        </DocParagraph>
      </DocProse>
    </DocPage>
  );
}
