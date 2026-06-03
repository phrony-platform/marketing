import Link from 'next/link';

import {
  DocCodeBlock,
  DocH2,
  DocH3,
  DocInlineTabs,
  DocPage,
  DocParagraph,
  DocProse,
} from '@/components/docs';
import {
  QuickStartConcept,
  QuickStartStepPanel,
  ToolDispatchIllustration,
} from '@/components/docs/quick-start';

const agentWithToolYaml = `apiVersion: phrony.com/v1
kind: Agent

metadata:
  name: my-agent
  namespace: default
  version: 0.2.0

secrets:
  openai:
    fromEnv: OPENAI_API_KEY

spec:
  purpose: Answer questions clearly and concisely.
  instructions:
    text: |
      You are a helpful assistant. Be accurate and concise.
  model:
    provider: openai
    name: gpt-4o
  tools:
    - ref: weather.get-forecast
      as: get_forecast

output:
  format: text`;

const toolBindingYaml = `spec:
  tools:
    - ref: weather.get-forecast
      as: get_forecast`;

const toolKindYaml = `apiVersion: phrony.com/v1
kind: Tool

metadata:
  name: get-forecast
  namespace: weather
  version: 1.0.0

spec:
  description: Look up the weather forecast for a city.
  side_effect_class: read_only
  input_schema:
    inline:
      type: object
      properties:
        city:
          type: string
      required: [city]`;

/** Illustrative worker sample — TypeScript SDK shape for docs (Work stream under the hood). */
const workerSampleTs = `import { Worker } from "@phrony/sdk";

const worker = new Worker({
  runtimeAddr: process.env.PHRONY_RUNTIME_ADDR ?? "127.0.0.1:7777",
  workerId: "weather-worker-1",
});

worker.registerTool({
  tool: "weather.get-forecast",
  version: "1.0.0",
  maxConcurrency: 4,
  async handler({ city }: { city: string }) {
    // Your integration: HTTP API, database, internal service, etc.
    return { temp_c: 12, conditions: "cloudy", city };
  },
});

await worker.connect(); // dial runtime, register handlers, process invoke messages`;

export function QuickStartToolBindingPage() {
  return (
    <DocPage
      title="Add a tool binding"
      description="Declare a tool on your agent and dispatch it through an application worker."
      eyebrow="Quick start · Step 4"
    >
      <DocProse>
        <DocParagraph>
          Steps 1–3 gave you a manifest with no tools. Most agents call at least one capability—here you add a{' '}
          <strong className="font-medium text-foreground">binding</strong> on the Agent and connect a worker that
          implements it.
        </DocParagraph>

        <QuickStartConcept concept="tool" />
        <QuickStartConcept concept="worker" />

        <DocH2>Add a binding on the Agent</DocH2>
        <DocParagraph>
          Add a <code>spec.tools</code> entry on your <code>agent.yaml</code>. The <code>ref</code> identifies the tool;{' '}
          <code>as</code> is the name the model sees. Put schema and side-effect class in the Tool file—bindings only
          need those fields when you narrow or override (see{' '}
          <Link
            href="/docs/agent-spec/resources/tools"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            Tools
          </Link>
          ).
        </DocParagraph>
        <DocCodeBlock language="yaml" title="agent.yaml (excerpt)" code={toolBindingYaml} />

        <DocH3>Reusable Tool document (optional)</DocH3>
        <DocParagraph>
          For shared capabilities, define a separate <code>kind: Tool</code> file in a <code>tools/</code> folder. The
          binding&apos;s <code>ref</code> uses <code>namespace.name</code> without a version suffix—the runtime resolves
          the Tool file&apos;s <code>metadata.version</code>. See{' '}
          <Link
            href="/docs/agent-spec/resources/tool"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            Tool resource
          </Link>
          .
        </DocParagraph>
        <DocCodeBlock language="yaml" title="tools/weather.get-forecast.yaml" code={toolKindYaml} />

        <DocH2>Validate and publish</DocH2>
        <DocCodeBlock
          language="bash"
          title="terminal"
          code={`phrony validate ./my-agent/agent.yaml
phrony publish ./my-agent/agent.yaml
phrony deploy default/my-agent@0.2.0`}
        />
        <DocParagraph>Bump metadata.version whenever you publish a changed manifest.</DocParagraph>

        <DocH2>Connect a worker</DocH2>
        <DocParagraph>
          The runtime does not run your tool code. A{' '}
          <strong className="font-medium text-foreground">worker process</strong> dials the runtime, registers{' '}
          <code>weather.get-forecast@1.0.0</code>, and handles{' '}
          <code>invoke</code> messages on the Work gRPC stream.
        </DocParagraph>
        <ToolDispatchIllustration />
        <DocParagraph>
          A minimal TypeScript worker using the Phrony SDK connects to the runtime, registers{' '}
          <code>weather.get-forecast@1.0.0</code>, and runs your handler on each <code>invoke</code>:
        </DocParagraph>
        <DocCodeBlock language="typescript" title="worker.ts" code={workerSampleTs} />
        <DocParagraph>
          Dispatch flow, failure modes, and integrity checks:{' '}
          <Link
            href="/docs/runtime/tool-dispatch"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            Tool dispatch
          </Link>
          .
        </DocParagraph>

        <DocH2>What you end up with</DocH2>
        <DocParagraph>
          Put it together: the Tool file defines the capability (description, schema, side-effect class);{' '}
          <code>agent.yaml</code> only wires it with <code>ref</code> and <code>as</code>. The binding{' '}
          <code>ref</code> must match the Tool identity (<code>weather.get-forecast</code> here).
        </DocParagraph>
        <DocInlineTabs
          aria-label="Agent and tool manifests"
          defaultTabId="agent"
          tabs={[
            {
              id: 'agent',
              label: 'agent.yaml',
              panel: <DocCodeBlock language="yaml" filename="agent.yaml" code={agentWithToolYaml} />,
            },
            {
              id: 'tool',
              label: 'tools/weather.get-forecast.yaml',
              panel: (
                <DocCodeBlock
                  language="yaml"
                  filename="tools/weather.get-forecast.yaml"
                  code={toolKindYaml}
                />
              ),
            },
          ]}
        />

        <QuickStartStepPanel stepId="tool-binding" />
      </DocProse>
    </DocPage>
  );
}
