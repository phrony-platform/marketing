import Link from 'next/link';

import {
  DocCodeBlock,
  DocH2,
  DocH3,
  DocPage,
  DocParagraph,
  DocProse,
  DocTable,
  DocTableBody,
  DocTableCell,
  DocTableHead,
  DocTableHeaderCell,
  DocTableRow,
  DocDanger,
} from '@/components/docs';
import { QuickStartConcept, QuickStartStepPanel } from '@/components/docs/quick-start';

export function QuickStartPublishDeployRunPage() {
  return (
    <DocPage
      title="Publish, deploy, and run"
      description="Store an immutable manifest version, activate it, and run the agent."
      eyebrow="Quick start · Step 3"
    >
      <DocProse>
        <DocParagraph>
          You have <code>agent.yaml</code> on disk and a runtime from step 1. Three
          commands finish the story: hand the file to the runtime, choose it as the active version, then run the
          agent. Read each concept box before you run the matching command.
        </DocParagraph>

        <DocH2>Publish</DocH2>
        <QuickStartConcept concept="publish" />
        <DocParagraph>
          Send a resolved snapshot of your manifest to the runtime. The version is keyed by{' '}
          <code>metadata.version</code> and a content hash—it cannot change after publish.
        </DocParagraph>
        <DocCodeBlock language="bash" title="terminal" code="phrony publish ./my-agent/agent.yaml" />
        <DocParagraph>
          On success the CLI prints the agent reference, for example{' '}
          <code>default/my-agent 0.1.0</code>.
        </DocParagraph>

        <DocH2>Deploy</DocH2>
        <QuickStartConcept concept="deploy" />
        <DocParagraph>
          Publishing saves your manifest on the runtime, but nothing runs yet. Deploy tells the runtime which saved
          copy to use when you run this agent—use the same <code>namespace</code>, <code>name</code>, and{' '}
          <code>version</code> as in your file:
        </DocParagraph>
        <DocCodeBlock language="bash" title="terminal" code="phrony deploy default/my-agent@0.1.0" />

        <DocH2>Run</DocH2>
        <QuickStartConcept concept="session" />
        <DocParagraph>
          Run the agent. The CLI uses the version you deployed. By default it runs in the background and prints a
          session id; add <code>--attach</code> to chat interactively. See{' '}
          <Link href="/docs/runtime/cli/run" className="text-foreground underline underline-offset-4 hover:no-underline">
            phrony run
          </Link>
          .
        </DocParagraph>
        <DocCodeBlock
          language="bash"
          title="terminal"
          code={`phrony run default/my-agent
phrony run default/my-agent --attach`}
        />
        <DocDanger title="Expected error">
          <p>
            If you tried the commands above without <code>OPENAI_API_KEY</code> in your environment,{' '}
            <code>phrony run</code> should fail—that is expected. <code>phrony publish</code> only stored a{' '}
            <code>fromEnv</code> reference in the manifest, not the secret itself. A typical message:
          </p>
          <p className="mt-2 font-mono text-[13px] leading-relaxed">
            {'secret "openai": environment variable OPENAI_API_KEY is not set; set OPENAI_API_KEY and retry run'}
          </p>
          <p className="mt-2">
            Continue to the next section to pass the key, then run again.
          </p>
        </DocDanger>

        <DocH3>Provider API keys</DocH3>
        <DocParagraph>
          The runtime needs the provider key at run time. The CLI reads <code>OPENAI_API_KEY</code> from your shell
          (matching <code>secrets.openai.fromEnv</code> in <code>agent.yaml</code>) and sends it with the run request—the
          value is not read from the published manifest.
        </DocParagraph>
        <DocParagraph>
          Option 1 — export in the shell. Set the variable in the same terminal session, then run{' '}
          <code>phrony run</code> again (same commands as above):
        </DocParagraph>
        <DocCodeBlock language="bash" title="terminal" code="export OPENAI_API_KEY=sk-..." />
        <DocParagraph>
          Option 2 — use a <code>.env</code> file. Put one variable per line (<code>KEY=value</code>). The CLI loads the
          file when you pass <code>--env-file</code> (or <code>-e</code>) on <code>phrony run</code>; repeat the flag for
          multiple files. Values already set in your shell are not overwritten.
        </DocParagraph>
        <DocCodeBlock
          language="text"
          title=".env"
          code="OPENAI_API_KEY=sk-..."
        />
        <DocCodeBlock
          language="bash"
          title="terminal"
          code="phrony run default/my-agent --attach --env-file .env"
        />

        <DocH2>End-to-end</DocH2>
        <DocCodeBlock
          language="bash"
          title="terminal"
          code={`export OPENAI_API_KEY=sk-...
phrony publish ./my-agent/agent.yaml
phrony deploy default/my-agent@0.1.0
phrony run default/my-agent --attach`}
        />

        <DocH2>What happens</DocH2>
        <DocTable>
          <DocTableHead>
            <tr>
              <DocTableHeaderCell>Command</DocTableHeaderCell>
              <DocTableHeaderCell>Effect</DocTableHeaderCell>
            </tr>
          </DocTableHead>
          <DocTableBody>
            <DocTableRow>
              <DocTableCell>
                <code>publish</code>
              </DocTableCell>
              <DocTableCell>Immutable version stored in the runtime</DocTableCell>
            </DocTableRow>
            <DocTableRow>
              <DocTableCell>
                <code>deploy</code>
              </DocTableCell>
              <DocTableCell>Version becomes active for new sessions</DocTableCell>
            </DocTableRow>
            <DocTableRow>
              <DocTableCell>
                <code>run</code>
              </DocTableCell>
              <DocTableCell>Session executes the active manifest (model loop, tools, policies, trace)</DocTableCell>
            </DocTableRow>
          </DocTableBody>
        </DocTable>

        <DocParagraph>
          Next in the checklist:{' '}
          <Link
            href="/docs/quick-start/tool-binding"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            add a tool binding
          </Link>
          , then{' '}
          <Link
            href="/docs/quick-start/hitl-approval"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            human-in-the-loop approval
          </Link>
          .
        </DocParagraph>

        <QuickStartStepPanel stepId="publish-deploy-run" />
      </DocProse>
    </DocPage>
  );
}
