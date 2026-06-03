import Link from 'next/link';

import {
  DocCodeBlock,
  DocH2,
  DocH3,
  DocInlineTabs,
  DocPage,
  DocParagraph,
  DocProse,
  DocWarning,
} from '@/components/docs';
import { QuickStartConcept, QuickStartStepPanel } from '@/components/docs/quick-start';

const policyYaml = `apiVersion: phrony.com/v1
kind: Policy

metadata:
  name: high-severity-alert-boundary
  namespace: weather
  version: 1.0.0

spec:
  description: High-severity alerts need a human before dispatch.
  conditions:
    field: severity
    op: gt
    value: 3
  decision:
    type: require_approval
    approvals_required: 1
    reason: Severity above delegated limit.
    on_reject: return_to_agent`;

const sendAlertBindingYaml = `    - ref: weather.send-alert
      as: send_alert
      policies:
        - ref: policies/high-severity-alert-boundary.yaml`;

const getForecastBindingYaml = `    - ref: weather.get-forecast
      as: get_forecast`;

const bindingWithPolicyYaml = `spec:
  tools:
${getForecastBindingYaml}
${sendAlertBindingYaml}`;

const sendAlertToolYaml = `apiVersion: phrony.com/v1
kind: Tool

metadata:
  name: send-alert
  namespace: weather
  version: 1.0.0

spec:
  description: Send a weather alert for a region.
  side_effect_class: non_idempotent_write
  input_schema:
    inline:
      type: object
      properties:
        region:
          type: string
        severity:
          type: integer
      required: [region, severity]`;

const agentWithPolicyYaml = `apiVersion: phrony.com/v1
kind: Agent

metadata:
  name: my-agent
  namespace: default
  version: 0.3.0

secrets:
  openai:
    fromEnv: OPENAI_API_KEY

spec:
  purpose: Answer questions clearly and concisely.
  instructions:
    text: |
      You are a helpful assistant. Be accurate and concise.
      Respect approval gates—do not assume a sensitive tool ran until confirmed.
  model:
    provider: openai
    name: gpt-4o
  tools:
${getForecastBindingYaml}
${sendAlertBindingYaml}

output:
  format: text`;

export function QuickStartHitlApprovalPage() {
  return (
    <DocPage
      title="Human-in-the-loop approval"
      description="Pause sensitive tool calls until an operator approves them."
      eyebrow="Quick start · Step 5"
    >
      <DocProse>
        <DocParagraph>
          Not every tool call should run immediately. Attach a{' '}
          <strong className="font-medium text-foreground">Policy</strong> with{' '}
          <code>require_approval</code> so the runtime pauses dispatch until a human
          decides.
        </DocParagraph>

        <QuickStartConcept concept="policy" />
        <QuickStartConcept concept="hitl" />

        <DocH2>Define a Policy</DocH2>
        <DocParagraph>
          Policies evaluate at <strong className="font-medium text-foreground">dispatch time</strong>—before the
          worker runs. Conditions match tool arguments;{' '}
          <code>decision.type: require_approval</code> opens an approval row.
        </DocParagraph>
        <DocCodeBlock language="yaml" title="policies/high-severity-alert-boundary.yaml" code={policyYaml} />

        <DocH2>Attach it to a tool binding</DocH2>
        <DocCodeBlock language="yaml" title="agent.yaml (excerpt)" code={bindingWithPolicyYaml} />
        <DocParagraph>
          Publish and deploy a new agent version, then run a session whose tool args match the condition (for example{' '}
          <code>severity: 5</code>).
        </DocParagraph>

        <DocH2>Approve from the CLI</DocH2>
        <DocParagraph>
          The session moves to <code>awaiting_approval</code>. In another terminal:
        </DocParagraph>
        <DocCodeBlock
          language="bash"
          title="terminal"
          code={`phrony approvals list
phrony approvals show APPROVAL_ID
phrony approvals approve APPROVAL_ID --comment "verified"`}
        />
        <DocParagraph>
          Set <code>PHRONY_ACTOR</code> so decisions are attributed in the audit trail.
          Reject with <code>phrony approvals reject</code>—behavior follows policy{' '}
          <code>on_reject</code>.
        </DocParagraph>

        <DocH3>Detached runs</DocH3>
        <DocParagraph>
          You do not need an interactive <code>--attach</code> session to approve.
          Operators can decide out-of-band while the run stays paused.
        </DocParagraph>

        <DocWarning title="Deny wins">
          <p>
            When multiple policies apply, the most restrictive decision wins—a single deny overrides allows. Stack
            policies carefully on high-risk bindings.
          </p>
        </DocWarning>

        <DocParagraph>
          Quorum, timeouts, and comprehension flags:{' '}
          <Link href="/docs/runtime/hitl" className="text-foreground underline underline-offset-4 hover:no-underline">
            Human-in-the-loop approvals
          </Link>
          ,{' '}
          <Link
            href="/docs/runtime/cli/approvals"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            phrony approvals
          </Link>
          .
        </DocParagraph>

        <DocH2>What you end up with</DocH2>
        <DocParagraph>
          Same layout as tool binding: <code>tools/weather.send-alert.yaml</code> holds the capability (schema, side
          effect class); <code>agent.yaml</code> only lists <code>ref</code>, <code>as</code>, and the policy on{' '}
          <code>send_alert</code>—no duplicate tool definition on the Agent.
        </DocParagraph>
        <DocInlineTabs
          aria-label="Agent, tool, and policy manifests"
          defaultTabId="agent"
          tabs={[
            {
              id: 'agent',
              label: 'agent.yaml',
              panel: <DocCodeBlock language="yaml" filename="agent.yaml" code={agentWithPolicyYaml} />,
            },
            {
              id: 'tool',
              label: 'tools/weather.send-alert.yaml',
              panel: (
                <DocCodeBlock
                  language="yaml"
                  filename="tools/weather.send-alert.yaml"
                  code={sendAlertToolYaml}
                />
              ),
            },
            {
              id: 'policy',
              label: 'policies/high-severity-alert-boundary.yaml',
              panel: (
                <DocCodeBlock
                  language="yaml"
                  filename="policies/high-severity-alert-boundary.yaml"
                  code={policyYaml}
                />
              ),
            },
          ]}
        />

        <QuickStartStepPanel stepId="hitl-approval" />
      </DocProse>
    </DocPage>
  );
}
