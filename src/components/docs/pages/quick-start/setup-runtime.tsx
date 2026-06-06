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
import { RUNTIME_DOCKER_COMPOSE, RUNTIME_DOCKER_COMPOSE_PATH } from '@/lib/runtime-docker-compose';
import { PHRONY_RUNTIME_IMAGE, RUNTIME_DOCKER_COMPOSE_URL, RUNTIME_GITHUB_URL } from '@/lib/project-urls';

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
          Docker Desktop or Docker Engine, and Go 1.25+ to install the operator CLI. The runtime itself is pulled from
          the official image <code>{PHRONY_RUNTIME_IMAGE}</code>.
        </DocParagraph>

        <DocH2>Start the stack</DocH2>
        <DocParagraph>
          Create a working directory, download the Compose file, and start Postgres plus the runtime:
        </DocParagraph>
        <DocCodeBlock
          language="bash"
          title="terminal"
          code={`mkdir phrony-runtime && cd phrony-runtime
curl -fsSLO ${RUNTIME_DOCKER_COMPOSE_URL}
docker compose up -d --wait`}
        />
        <DocParagraph>
          Compose waits for Postgres to become healthy, pulls <code>{PHRONY_RUNTIME_IMAGE}</code>, applies migrations,
          and listens on <code>127.0.0.1:7777</code>. Stop the stack with <code>docker compose down</code>.
        </DocParagraph>

        <DocH3>Compose file</DocH3>
        <DocParagraph>
          The same file is available at{' '}
          <a href={RUNTIME_DOCKER_COMPOSE_PATH} className="text-foreground underline underline-offset-4 hover:no-underline">
            {RUNTIME_DOCKER_COMPOSE_PATH}
          </a>{' '}
          and in the{' '}
          <a href={RUNTIME_GITHUB_URL} className="text-foreground underline underline-offset-4 hover:no-underline">
            runtime repository
          </a>{' '}
          docs.
        </DocParagraph>
        <DocCodeBlock language="yaml" title="docker-compose.yml" code={RUNTIME_DOCKER_COMPOSE} />

        <DocInfo title="Configuration">
          <p>
            The compose runtime service sets database URL, gRPC address, and a dev secrets encryption key—no extra setup
            for this quick start. Replace <code>RUNTIME_SECRETS_ENCRYPTION_KEY</code> before running agents with
            secrets in production.
          </p>
        </DocInfo>

        <DocH2>Install the operator CLI</DocH2>
        <DocParagraph>
          Install <code>phrony</code> with Go and ensure <code>$(go env GOPATH)/bin</code> is on your{' '}
          <code>PATH</code>:
        </DocParagraph>
        <DocCodeBlock
          language="bash"
          title="terminal"
          code={`go build -o "$(go env GOPATH)/bin/phrony" \\
  github.com/phrony-platform/runtime/cmd/cli@latest`}
        />
        <DocParagraph>
          Or clone the{' '}
          <a href={RUNTIME_GITHUB_URL} className="text-foreground underline underline-offset-4 hover:no-underline">
            runtime repository
          </a>{' '}
          and run <code>make install-cli</code> if you are hacking on the daemon.
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
