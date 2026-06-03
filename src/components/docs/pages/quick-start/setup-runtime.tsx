import {
  DocCodeBlock,
  DocH2,
  DocH3,
  DocInfo,
  DocPage,
  DocInlineCode,
  DocParagraph,
  DocProse,
  DocTable,
  DocTableBody,
  DocTableCell,
  DocTableHead,
  DocTableHeaderCell,
  DocTableRow,
} from '@/components/docs';
import { QuickStartConcept, QuickStartStepPanel } from '@/components/docs/quick-start';
import { RUNTIME_GITHUB_URL } from '@/lib/project-urls';

export function QuickStartSetupRuntimePage() {
  return (
    <DocPage
      title="Set up the runtime"
      description="Start Postgres and phrony-runtime locally, then install the phrony operator CLI."
      eyebrow="Quick start · Step 1"
    >
      <DocProse>
        <QuickStartConcept concept="runtime" />

        <DocParagraph>
          Everything in this quick start runs on your machine. First you bring up the{' '}
          <strong className="font-medium text-foreground">runtime</strong>—a long-lived daemon (
          <code>phrony-runtime</code>) backed by Postgres—and install the{' '}
          <code>phrony</code> CLI to talk to it on port{' '}
          <code>7777</code>.
        </DocParagraph>

        <QuickStartConcept concept="grpc" />

        <DocH2>Prerequisites</DocH2>
        <DocParagraph>
          Docker (for local Postgres and the runtime container) and Go 1.25+ if you build binaries on your host. Clone
          the{' '}
          <a href={RUNTIME_GITHUB_URL} className="text-foreground underline underline-offset-4 hover:no-underline">
            runtime repository
          </a>{' '}
          to follow the commands below.
        </DocParagraph>

        <DocH2>Start the stack</DocH2>
        <DocParagraph>
          From the repository root, bring up Postgres and the runtime with one Make target:
        </DocParagraph>
        <DocCodeBlock
          language="bash"
          title="terminal"
          code={`git clone ${RUNTIME_GITHUB_URL}.git
cd runtime
make dev-up`}
        />
        <DocParagraph>
          Compose waits for Postgres to become healthy, builds <code>phrony-runtime</code>,
          applies migrations, and listens on{' '}
          <code>127.0.0.1:7777</code>. Stop the stack with{' '}
          <code>make dev-down</code>.
        </DocParagraph>

        <DocInfo title="Configuration">
          <p>
            <code>make</code> loads <code>.env</code> or{' '}
            <code>.env.example</code> automatically. The compose runtime service sets
            database URL, gRPC address, and a dev secrets encryption key—no extra setup for this quick start.
          </p>
        </DocInfo>

        <DocH2>Install the operator CLI</DocH2>
        <DocParagraph>
          Build <code>phrony</code> and add it to your shell{' '}
          <code>PATH</code>:
        </DocParagraph>
        <DocCodeBlock language="bash" title="terminal" code="make install-cli" />
        <DocParagraph>
          Open a new terminal (or <code>source</code> your shell rc) so{' '}
          <code>phrony</code> is available.
        </DocParagraph>

        <DocH2>Verify</DocH2>
        <DocCodeBlock language="bash" title="terminal" code="phrony status" />
        <DocParagraph>
          You should see the runtime reachable at the default address. Pass <DocInlineCode>--runtime-addr</DocInlineCode>{' '}
          to override <DocInlineCode>127.0.0.1:7777</DocInlineCode>.
        </DocParagraph>

        <DocH3>Binaries</DocH3>
        <DocTable>
          <DocTableHead>
            <tr>
              <DocTableHeaderCell>Binary</DocTableHeaderCell>
              <DocTableHeaderCell>Role</DocTableHeaderCell>
            </tr>
          </DocTableHead>
          <DocTableBody>
            <DocTableRow>
              <DocTableCell>
                <code>phrony-runtime</code>
              </DocTableCell>
              <DocTableCell>Daemon: Postgres, gRPC server, runs agent sessions</DocTableCell>
            </DocTableRow>
            <DocTableRow>
              <DocTableCell>
                <code>phrony</code>
              </DocTableCell>
              <DocTableCell>Operator CLI—talks to the daemon and works with manifest files</DocTableCell>
            </DocTableRow>
          </DocTableBody>
        </DocTable>

        <QuickStartStepPanel stepId="setup-runtime" />
      </DocProse>
    </DocPage>
  );
}
