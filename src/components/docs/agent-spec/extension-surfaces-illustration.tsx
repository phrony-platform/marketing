import type { ReactNode } from 'react';
import { ArrowDown } from 'lucide-react';

import { docLabel, docPanel, docRadius } from '@/components/docs/doc-style';
import { cn } from '@/lib/utils';

function FieldChip({ name }: { name: string }) {
  return (
    <div className={cn(docRadius, 'border border-border bg-background px-2.5 py-1.5 font-mono text-xs text-foreground')}>
      {name}
    </div>
  );
}

function SurfacePanel({
  title,
  fields,
  className,
}: {
  title: string;
  fields: string[];
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      <p className={docLabel}>{title}</p>
      <div className={cn(docRadius, 'space-y-1.5 border border-border bg-muted/25 p-3')}>
        {fields.map((field) => (
          <FieldChip key={field} name={field} />
        ))}
      </div>
    </div>
  );
}

function FlowNode({
  children,
  emphasis,
  className,
}: {
  children: ReactNode;
  emphasis?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        docRadius,
        'border px-3 py-2 text-center text-xs leading-snug',
        emphasis
          ? 'border-foreground/30 bg-foreground/[0.04] font-medium text-foreground'
          : 'border-border bg-background text-muted-foreground',
        className,
      )}
    >
      {children}
    </div>
  );
}

function VerticalFlow({
  steps,
  edgeLabel,
}: {
  steps: { label: string; emphasis?: boolean }[];
  edgeLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      {steps.map((step, index) => (
        <div key={step.label} className="flex w-full max-w-[16rem] flex-col items-center gap-1">
          {index > 0 ? (
            <div className="flex flex-col items-center gap-0.5 py-0.5">
              {index === 1 && edgeLabel ? (
                <span className="max-w-[10rem] text-center text-[10px] leading-tight text-muted-foreground">
                  {edgeLabel}
                </span>
              ) : null}
              <ArrowDown className="size-3.5 text-muted-foreground" strokeWidth={1.5} aria-hidden />
            </div>
          ) : null}
          <FlowNode emphasis={step.emphasis} className="w-full">
            {step.label}
          </FlowNode>
        </div>
      ))}
    </div>
  );
}

export function ExtensionSurfacesIllustration() {
  return (
    <figure className={cn('not-prose', docPanel, docRadius, 'p-4 sm:p-6')} aria-label="Portable vs implementation extension surfaces">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-6">
        <div className="space-y-4">
          <SurfacePanel
            title="Portable description"
            fields={['metadata.governance', 'metadata.labels', 'metadata.annotations']}
          />
          <div className="flex justify-center">
            <ArrowDown className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />
          </div>
          <FlowNode>Recorded in evidence</FlowNode>
        </div>

        <div className="space-y-4">
          <SurfacePanel title="Implementation config" fields={['decision.runtime', 'x-phrony blocks']} />
          <div className="flex justify-center">
            <ArrowDown className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />
          </div>
          <FlowNode>Runtime maps to IdP queues and roles</FlowNode>
        </div>
      </div>

      <div className="mt-8 border-t border-dashed border-border pt-6">
        <p className={cn(docLabel, 'mb-4 text-center')}>Governance enforcement path</p>
        <VerticalFlow
          edgeLabel="authority_boundaries only"
          steps={[
            { label: 'metadata.governance', emphasis: true },
            { label: 'Compile to policies', emphasis: true },
            { label: 'Runtime branches', emphasis: true },
          ]}
        />
      </div>
    </figure>
  );
}
