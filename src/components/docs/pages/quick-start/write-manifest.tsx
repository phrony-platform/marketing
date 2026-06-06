import Link from 'next/link';

import {
  DocCodeBlock,
  DocH2,
  DocH3,
  DocPage,
  DocParagraph,
  DocProse,
} from '@/components/docs';
import { QuickStartConcept, QuickStartStepPanel } from '@/components/docs/quick-start';

const exampleAgentYaml = `apiVersion: phrony.com/v1
kind: Agent

metadata:
  name: my-agent
  namespace: default
  version: 0.1.0

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

output:
  format: text
`;

const manifestHeaderYaml = `apiVersion: phrony.com/v1
kind: Agent`;

const manifestMetadataYaml = `metadata:
  name: my-agent
  namespace: default
  version: 0.1.0`;

const manifestSecretsYaml = `secrets:
  openai:
    fromEnv: OPENAI_API_KEY`;

const manifestPurposeYaml = `spec:
  purpose: Answer questions clearly and concisely.`;

const manifestInstructionsYaml = `spec:
  instructions:
    text: |
      You are a helpful assistant. Be accurate and concise.`;

const manifestModelYaml = `spec:
  model:
    provider: openai
    name: gpt-4o`;

const manifestOutputYaml = `output:
  format: text`;

export function QuickStartWriteManifestPage() {
  return (
    <DocPage
      title="Write your first manifest"
      description="Create agent.yaml and walk through each part of the file."
      eyebrow="Quick start · Step 2"
    >
      <DocProse>
        <QuickStartConcept concept="manifest" />
        <QuickStartConcept concept="agent-spec" />

        <DocParagraph>
          In step 1 you started the runtime and installed the CLI. Now you describe your first agent in a single file—
          the <strong className="font-medium text-foreground">manifest</strong>. Everything the runtime needs to know
          about this agent lives here until you are ready to hand the file over.
        </DocParagraph>

        <DocH2>Scaffold agent.yaml</DocH2>
        <DocParagraph>
          <code>phrony init</code> creates a starter file in your project. You will turn it
          into a complete description (OpenAI plus a declared secret) like the example below. The command only writes
          local files—it does not talk to the runtime. See{' '}
          <Link href="/docs/runtime/cli/init" className="text-foreground underline underline-offset-4 hover:no-underline">
            phrony init
          </Link>{' '}
          for details.
        </DocParagraph>
        <DocCodeBlock language="bash" title="terminal" code="phrony init ./my-agent" />
        <DocParagraph>
          On success you get <code>created ./my-agent/agent.yaml</code>. The command
          fails if <code>agent.yaml</code> already exists in that directory.
        </DocParagraph>

        <DocH2>Example manifest</DocH2>
        <DocParagraph>
          Here is the full picture. The sections below explain each block; use this as your target when editing the
          file from <code>phrony init</code>.
        </DocParagraph>
        <DocCodeBlock language="yaml" title="agent.yaml" code={exampleAgentYaml} />

        <DocH2>What each section does</DocH2>
        <DocParagraph>
          Read the file from top to bottom. Each block answers one question about your agent.
        </DocParagraph>

        <DocH3>apiVersion and kind</DocH3>
        <DocParagraph>
          <strong className="font-medium text-foreground">What kind of document is this?</strong>{' '}
          <code>phrony.com/v1</code> and <code>Agent</code> say “this YAML follows the Phrony agent shape.” Every field
          below is interpreted in that context.
        </DocParagraph>
        <DocCodeBlock language="yaml" title="agent.yaml" code={manifestHeaderYaml} showCopy={false} />

        <DocH3>metadata</DocH3>
        <DocParagraph>
          <strong className="font-medium text-foreground">Who is this agent?</strong>{' '}
          <code>namespace</code> and <code>name</code> are its address (here, <code>default/my-agent</code>).{' '}
          <code>version</code> labels this revision—when you change the file later, bump the version so you can tell
          iterations apart.
        </DocParagraph>
        <DocCodeBlock language="yaml" title="agent.yaml" code={manifestMetadataYaml} showCopy={false} />

        <DocH3>secrets</DocH3>
        <DocParagraph>
          <strong className="font-medium text-foreground">What credentials will this agent need?</strong> Do not put API
          keys in the file. This block is a placeholder: it says that when you run this agent later, you will need an{' '}
          <code>openai</code> credential supplied as <code>OPENAI_API_KEY</code>. Name it <code>openai</code> to match{' '}
          <code>spec.model.provider</code> below. Step 3 shows how to pass that secret to the runtime.
        </DocParagraph>
        <DocCodeBlock language="yaml" title="agent.yaml" code={manifestSecretsYaml} showCopy={false} />

        <DocH3>spec.purpose</DocH3>
        <DocParagraph>
          <strong className="font-medium text-foreground">Why does this agent exist?</strong> A one-line summary for
          humans reading the repo. It is not the prompt the model sees on each turn.
        </DocParagraph>
        <DocCodeBlock language="yaml" title="agent.yaml" code={manifestPurposeYaml} showCopy={false} />

        <DocH3>spec.instructions</DocH3>
        <DocParagraph>
          <strong className="font-medium text-foreground">How should the model behave?</strong> This is the system
          prompt—what the model is told every time. Inline <code>text</code> is enough to start; when the prompt grows
          you can move it to a separate file and reference it with <code>ref</code>.
        </DocParagraph>
        <DocCodeBlock language="yaml" title="agent.yaml" code={manifestInstructionsYaml} showCopy={false} />

        <DocH3>spec.model</DocH3>
        <DocParagraph>
          <strong className="font-medium text-foreground">Which model answers?</strong>{' '}
          <code>provider: openai</code> and <code>name: gpt-4o</code> pick OpenAI’s API and model id. This agent will use
          the <code>openai</code> secret you named above.
        </DocParagraph>
        <DocCodeBlock language="yaml" title="agent.yaml" code={manifestModelYaml} showCopy={false} />

        <DocH3>output</DocH3>
        <DocParagraph>
          <strong className="font-medium text-foreground">What do you get back?</strong>{' '}
          <code>format: text</code> means plain assistant replies—enough for a first chat. JSON shapes come later when
          you need structured answers.
        </DocParagraph>
        <DocCodeBlock language="yaml" title="agent.yaml" code={manifestOutputYaml} showCopy={false} />

        <DocH2>Check the file</DocH2>
        <DocParagraph>
          Run a local sanity check on the manifest you wrote—you do not need your API key in the shell yet:
        </DocParagraph>
        <DocCodeBlock language="bash" title="terminal" code="phrony agents validate ./my-agent/agent.yaml" />
        <DocParagraph>
          Fix anything the command reports. In the next step you will send this file to the runtime and talk to your
          agent. See{' '}
          <Link
            href="/docs/runtime/cli/validate"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            phrony agents validate
          </Link>{' '}
          for details.
        </DocParagraph>

        <QuickStartStepPanel stepId="write-manifest" />
      </DocProse>
    </DocPage>
  );
}
