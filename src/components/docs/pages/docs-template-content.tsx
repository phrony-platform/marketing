'use client';

import {
  DocCallout,
  DocCard,
  DocCardGroup,
  DocCodeBlock,
  DocDanger,
  DocH2,
  DocH3,
  DocInfo,
  DocInlineCode,
  DocInlineTabs,
  DocList,
  DocNote,
  DocWarning,
  DocPage,
  DocParagraph,
  DocProse,
  DocTable,
  DocTableBody,
  DocTableCell,
  DocTableHead,
  DocTableHeaderCell,
  DocTableRow,
} from '@/components/docs';

const sampleTs = `import { Phrony } from "@phrony/sdk";

const phrony = new Phrony({ credentials: process.env.PHRONY_CREDENTIALS! });

const result = await phrony.agent("claims-triage").run({
  input: { claimId: "CLM-48219" },
});`;

const sampleYaml = `apiVersion: phrony.dev/v1
kind: Agent
metadata:
  name: echo-agent
spec:
  model: gpt-4.1-mini
  tools:
    - name: echo`;

export function DocsTemplateContent() {
  return (
    <DocPage
      title="Documentation template"
      description="Reference layout and components for authoring Phrony docs in this site."
      eyebrow="Documentation"
    >
      <DocProse>
        <DocParagraph>
          Build pages with React components from <DocInlineCode>@/components/docs</DocInlineCode>. Register routes in{' '}
          <DocInlineCode>src/lib/docs-pages.ts</DocInlineCode> and add sidebar links in{' '}
          <DocInlineCode>src/lib/docs-navigation.ts</DocInlineCode>.
        </DocParagraph>

        <DocH2>Callouts</DocH2>
        <div className="space-y-4">
          <DocNote>
            <p>Notes highlight context readers should not skip.</p>
          </DocNote>
          <DocInfo>
            <p>Info callouts clarify terminology or protocol details.</p>
          </DocInfo>
          <DocCallout variant="tip" title="Tip">
            <p>Tips suggest workflows or shortcuts.</p>
          </DocCallout>
          <DocWarning>
            <p>Warnings flag behavior that can break sessions or deployments if ignored.</p>
          </DocWarning>
          <DocDanger title="Danger">
            <p>Danger callouts mark destructive or irreversible actions.</p>
          </DocDanger>
        </div>

        <DocH2>Code blocks</DocH2>
        <DocCodeBlock language="typescript" title="main.ts" code={sampleTs} />
        <DocCodeBlock language="yaml" title="agent.yaml" code={sampleYaml} />
        <DocCodeBlock
          language="bash"
          title="terminal"
          code={`phrony publish ./my-agent/agent.yaml
phrony deploy demo/my-agent@1.0.0
phrony run demo/my-agent`}
        />

        <DocH2>Tables</DocH2>
        <DocTable>
          <DocTableHead>
            <tr>
              <DocTableHeaderCell>Component</DocTableHeaderCell>
              <DocTableHeaderCell>Purpose</DocTableHeaderCell>
            </tr>
          </DocTableHead>
          <DocTableBody>
            <DocTableRow>
              <DocTableCell>
                <code>DocCodeBlock</code>
              </DocTableCell>
              <DocTableCell>Syntax-highlighted snippets with copy</DocTableCell>
            </DocTableRow>
            <DocTableRow>
              <DocTableCell>
                <code>DocSidebar</code>
              </DocTableCell>
              <DocTableCell>Topic navigation for the active tab</DocTableCell>
            </DocTableRow>
          </DocTableBody>
        </DocTable>

        <DocH2>Cards</DocH2>
        <DocCardGroup>
          <DocCard title="Paradigm" href="/docs/paradigm">
            Declare, deploy, run — the operational model for agents.
          </DocCard>
          <DocCard title="Agent spec" href="/docs/agent-spec">
            Manifest schema, policies, tools, and conventions.
          </DocCard>
        </DocCardGroup>

        <DocH2>Lists</DocH2>
        <DocList>
          <li>Use ordered lists for sequential steps.</li>
          <li>Use unordered lists for related points.</li>
        </DocList>

        <DocH3>In-page tabs</DocH3>
        <DocInlineTabs
          aria-label="Example tabs"
          tabs={[
            {
              id: 'overview',
              label: 'Overview',
              panel: (
                <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                  <p>
                    Use <DocInlineCode>DocInlineTabs</DocInlineCode> for API samples and language switchers. Top-level
                    areas use <DocInlineCode>DocTabs</DocInlineCode> in the docs shell.
                  </p>
                </div>
              ),
            },
            {
              id: 'code',
              label: 'Code',
              panel: <DocCodeBlock language="typescript" title="example.ts" code={sampleTs} />,
            },
          ]}
        />
      </DocProse>
    </DocPage>
  );
}
