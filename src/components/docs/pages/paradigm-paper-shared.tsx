import type { ReactNode } from 'react';

import { DocParagraph } from '@/components/docs';

export const claimsManifestYaml = `apiVersion: phrony.dev/v1
kind: Agent
metadata:
  name: claims-triage
  owner: claims-platform-team
  version: 2.4.0
spec:
  purpose: >
    Triage incoming motor insurance claims and route them to the
    appropriate handler queue. Read-only access to claim and policy
    data. No customer communication. No payment authority.

  model:
    provider: anthropic
    name: claude-sonnet
    parameters:
      temperature: 0.2

  tools:
    - ref: claims-db.read-claim
    - ref: policy-db.read-policy
    - ref: routing.assign-queue
      policy: require-approval-above-severity-3

  policies:
    - name: no-pii-in-prompts
      scope: model-input
      action: redact
    - name: route-only-known-queues
      scope: tool:routing.assign-queue
      allow: [motor-standard, motor-complex, motor-fraud-review]

  limits:
    max_tokens_per_run: 20000
    max_loop_iterations: 8
    max_wall_clock_seconds: 60
    max_cost_per_run_usd: 0.50

  hitl:
    - trigger: tool:routing.assign-queue
      condition: severity >= 3
      route: claims-supervisor-queue

  identity:
    service_account: claims-triage-agent
    credentials:
      - claims-db-readonly
      - policy-db-readonly`;

export function ParadigmBoldLead({ lead, children }: { lead: string; children: ReactNode }) {
  return (
    <DocParagraph>
      <strong className="font-medium text-foreground">{lead}</strong> {children}
    </DocParagraph>
  );
}
