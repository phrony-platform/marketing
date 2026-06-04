import { DocH2, DocH3, DocPage, DocParagraph, DocProse } from '@/components/docs';
import { MethodExample } from './method-example';
import * as ex from './typescript-examples';
import { TYPESCRIPT_EYEBROW } from './typescript-shared';

export function TypeScriptSdkUtilitiesPage() {
  return (
    <DocPage
      title="Utilities"
      description="Agent references, JSON bytes helpers, errors, constants, and proto types."
      eyebrow={TYPESCRIPT_EYEBROW}
    >
      <DocProse>
        <DocH2>Agent references</DocH2>
        <MethodExample name="parseAgentRef(string)" code={ex.parseAgentRef} />
        <MethodExample name="formatAgentRef(ref)" code={ex.formatAgentRefOnly} />

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
          <code>AgentRef</code>, <code>Approval</code>, <code>ApprovalDecision</code>, <code>PublishRequest</code>,{' '}
          <code>DeployRequest</code>, <code>RunSessionRequest</code>, <code>WorkClientMsg</code>,{' '}
          <code>RunSessionInteractiveClientMsg</code>
        </DocParagraph>
      </DocProse>
    </DocPage>
  );
}
