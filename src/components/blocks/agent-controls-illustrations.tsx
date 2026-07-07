'use client';

import { Check, X } from 'lucide-react';

import {
  stepIllustrationBody,
  stepIllustrationMeta,
  stepIllustrationMuted,
  stepPanel,
} from '@/components/blocks/step-illustration-ui';
import {
  CodePanelIllustration,
  StepHighlight,
  YamlKeyManifest,
  YamlNumManifest,
  YamlStrManifest,
  type CodePanelLine,
} from '@/components/code-panel-illustration';
import { ManifestEditorFrame } from '@/components/manifest-editor-frame';
import { cn } from '@/lib/utils';

const POLICY_LINES: CodePanelLine[] = [
  { n: 1, node: (<><YamlKeyManifest>kind</YamlKeyManifest>: <YamlStrManifest>Policy</YamlStrManifest></>) },
  { n: 2, node: (<><YamlKeyManifest>metadata</YamlKeyManifest>:</>) },
  { n: 3, indent: 1, node: (<><YamlKeyManifest>name</YamlKeyManifest>: <YamlStrManifest>high-severity-approval</YamlStrManifest></>) },
  { n: 4, node: (<><YamlKeyManifest>spec</YamlKeyManifest>:</>) },
  { n: 5, indent: 1, node: (<><YamlKeyManifest>scope</YamlKeyManifest>: <YamlStrManifest>tool:notify_channel</YamlStrManifest></>) },
  { n: 6, indent: 1, node: (<><YamlKeyManifest>conditions</YamlKeyManifest>:</>) },
  { n: 7, indent: 2, node: (<><YamlKeyManifest>field</YamlKeyManifest>: <YamlStrManifest>severity</YamlStrManifest></>) },
  { n: 8, indent: 2, node: (<><YamlKeyManifest>op</YamlKeyManifest>: <YamlStrManifest>gt</YamlStrManifest></>) },
  { n: 9, indent: 2, node: (<><YamlKeyManifest>value</YamlKeyManifest>: <YamlNumManifest>3</YamlNumManifest></>) },
  { n: 10, indent: 1, node: (<><YamlKeyManifest>decision</YamlKeyManifest>:</>) },
  { n: 11, indent: 2, node: (<><YamlKeyManifest>type</YamlKeyManifest>: <YamlStrManifest>require_approval</YamlStrManifest></>) },
];

export function ManifestPoliciesIllustration() {
  return (
    <div className="h-48 sm:h-52" aria-hidden>
      <ManifestEditorFrame filename="policy.yaml" compact fillHeight>
        <CodePanelIllustration
          className="relative h-full min-h-0 overflow-hidden"
          lines={POLICY_LINES}
          highlightLines={[5, 6, 7, 8, 9, 10, 11]}
          highlightMode="block"
          tone="manifest"
          size="compact"
          showLineNumbers
          focusViewport
        />
      </ManifestEditorFrame>
    </div>
  );
}

export function HitlIllustration() {
  return (
    <div className={cn(stepPanel, 'px-3 py-3 sm:px-4 sm:py-3.5')} aria-hidden>
      <div className="flex items-center justify-between gap-3">
        <p className={stepIllustrationBody}>
          <StepHighlight>notify_channel</StepHighlight>
        </p>
        <span className="shrink-0 rounded-sm border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          pending
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="flex items-center justify-center gap-1.5 rounded-sm border border-emerald-600 bg-emerald-600 py-2 font-mono text-sm text-white dark:border-emerald-500 dark:bg-emerald-500">
          <Check className="size-3.5 text-white" strokeWidth={2} aria-hidden />
          Approve
        </div>
        <div className="flex items-center justify-center gap-1.5 rounded-sm border border-border bg-muted/20 py-2 font-mono text-sm text-muted-foreground">
          <X className="size-3.5" strokeWidth={2} aria-hidden />
          Reject
        </div>
      </div>
    </div>
  );
}

const TRACE_ROWS = [
  { phase: 'perceive', detail: 'load manifest', duration: '0.3s' },
  { phase: 'tool_call', detail: 'notify_channel', duration: '0.1s' },
  { phase: 'policy', detail: 'require_approval', duration: '—' },
  { phase: 'approval', detail: 'approved · ops@team', duration: '12s' },
];

function TraceRow({ phase, detail, duration }: (typeof TRACE_ROWS)[number]) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/60 px-3 py-2 last:border-b-0">
      <div className="min-w-0">
        <p className={cn(stepIllustrationMeta, 'uppercase tracking-wide')}>{phase}</p>
        <p className={cn('mt-0.5 truncate', stepIllustrationBody)}>{detail}</p>
      </div>
      <span className={cn('shrink-0 tabular-nums', stepIllustrationMuted)}>{duration}</span>
    </div>
  );
}

export function TracesAuditIllustration() {
  return (
    <div className={cn(stepPanel, 'overflow-hidden px-0 py-0 sm:px-0 sm:py-0')} aria-hidden>
      <div className="flex items-center justify-between gap-3 border-b border-border/60 px-3 py-2.5">
        <div className="min-w-0">
          <p className={stepIllustrationMeta}>Run trace</p>
          <p className={cn('mt-0.5 font-mono text-sm text-foreground', stepIllustrationBody)}>sess_8f2a</p>
        </div>
        <span className="shrink-0 rounded-sm border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          completed
        </span>
      </div>
      {TRACE_ROWS.map((row) => (
        <TraceRow key={row.phase} {...row} />
      ))}
    </div>
  );
}

function CliLine({ prompt, output }: { prompt?: string; output: string }) {
  return (
    <div className="space-y-0.5">
      {prompt ? (
        <p className="font-mono text-[10px] leading-relaxed text-muted-foreground sm:text-[11px]">
          <span className="text-foreground/70">$</span> {prompt}
        </p>
      ) : null}
      <p className="font-mono text-[10px] leading-relaxed text-foreground sm:text-[11px]">{output}</p>
    </div>
  );
}

export function DeployRollbackIllustration() {
  return (
    <div className={cn(stepPanel, 'space-y-3 px-3 py-3 sm:px-4 sm:py-3.5')} aria-hidden>
      <CliLine
        prompt="phrony agents deploy demo/echo-agent@1.2.0"
        output="deployed 1.2.0 (previous: 1.1.0)"
      />
      <CliLine prompt="phrony rollback demo/echo-agent" output="rolled back to 1.1.0 (was: 1.2.0)" />
    </div>
  );
}
