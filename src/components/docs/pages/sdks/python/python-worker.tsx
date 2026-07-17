import Link from 'next/link';

import { DocH2, DocParagraph, DocProse } from '@/components/docs';
import { MethodExample } from '../typescript/method-example';
import * as ex from './python-examples';

export function PythonSdkWorkerSection() {
  return (
    <DocProse>
      <DocH2 id="worker">Tool workers</DocH2>
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
        name="Worker(...)"
        description="worker_id is required. Optional runtime_addr, workload_identity, image_digest."
        code={ex.workerConstructor}
        language="python"
      />
      <MethodExample
        name="@worker.tool(name, *, version, ...)"
        description="Primary registration path — decorator sugar over register_tool. Returns the original function unchanged."
        code={ex.workerDecorator}
        language="python"
      />
      <MethodExample
        name="register_tool(...)"
        description="Imperative alternative. Register before connect(). handler receives (args, context) with cancellation via asyncio."
        code={ex.workerRegisterTool}
        language="python"
      />
      <MethodExample
        name="await connect() / await close()"
        description="connect() blocks until the stream ends; close() aborts in-flight calls and shuts down."
        code={ex.workerConnectClose}
        language="python"
      />
      <MethodExample
        name="ToolError"
        description="Raise from a handler to return a structured tool failure to the runtime."
        code={ex.workerToolError}
        language="python"
      />

      <DocH2>WorkStream</DocH2>
      <DocParagraph>
        Low-level helper from <code>phrony.worker</code> for custom registration or reconnect logic.
      </DocParagraph>
      <MethodExample
        name="WorkStream"
        description="send_register, run, send_result, send_nack, in_flight_calls, close, build_handler_advertisements."
        code={ex.workStreamLowLevel}
        language="python"
      />
    </DocProse>
  );
}
