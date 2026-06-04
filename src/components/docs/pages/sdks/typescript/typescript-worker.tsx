import Link from 'next/link';

import { DocH2, DocPage, DocParagraph, DocProse } from '@/components/docs';
import { MethodExample } from './method-example';
import * as ex from './typescript-examples';
import { TYPESCRIPT_EYEBROW } from './typescript-shared';

export function TypeScriptSdkWorkerPage() {
  return (
    <DocPage
      title="Tool workers"
      description="Register tool handlers on the Work stream with Worker and WorkStream."
      eyebrow={TYPESCRIPT_EYEBROW}
    >
      <DocProse>
        <DocParagraph>
          Workers implement tools declared on agents over the <code>Work</code> stream. See{' '}
          <Link
            href="/docs/runtime/tool-workers"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            Tool workers
          </Link>{' '}
          in the runtime docs.
        </DocParagraph>

        <DocH2>Worker</DocH2>
        <MethodExample
          name="new Worker(options)"
          description="workerId is required. Optional runtimeAddr, workloadIdentity, imageDigest."
          code={ex.workerConstructor}
        />
        <MethodExample
          name="registerTool(options)"
          description="Register before connect(). handler receives (args, context) with AbortSignal for cancellation."
          code={ex.workerRegisterTool}
        />
        <MethodExample
          name="connect() / close()"
          description="connect() blocks until the stream ends; close() aborts in-flight calls and shuts down."
          code={ex.workerConnectClose}
        />
        <MethodExample
          name="ToolError"
          description="Throw from a handler to return a structured tool failure to the runtime."
          code={ex.workerToolError}
        />

        <DocH2>WorkStream</DocH2>
        <DocParagraph>
          Low-level helper from <code>@phrony/sdk/worker</code> for custom registration or reconnect logic.
        </DocParagraph>
        <MethodExample
          name="WorkStream"
          description="sendRegister, run(handlers), sendResult, sendNack, inFlightCalls, close, buildHandlerAdvertisements."
          code={ex.workStreamLowLevel}
        />
      </DocProse>
    </DocPage>
  );
}
