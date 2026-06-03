'use client';

import { ClockIcon, CoinsIcon, ListOrderedIcon, type LucideIcon } from 'lucide-react';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/** Fixed locale + UTC so SSR and browser produce identical strings (avoids hydration mismatch). */
function formatRunAt(value: Date | string): string {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) {
    return '—';
  }
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: true,
  });
}

function shortId(id: string): string {
  return id.length > 12 ? `${id.slice(0, 8)}…` : id;
}


/** Mirrors Cockpit `RunStepChrome` (badges + timestamps). */
export function PreviewRunStepChrome({
  stepOrderLabel,
  typeLabel,
  TypeIcon,
  tokens,
  startedAt,
  finishedAt,
}: {
  stepOrderLabel: string;
  typeLabel: string;
  TypeIcon: LucideIcon;
  tokens?: number;
  startedAt: Date;
  finishedAt: Date | null;
}) {
  return (
    <div className="mb-3 flex min-w-0 flex-col gap-2 border-b border-border/60 pb-3">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <Badge
          variant="outline"
          className="gap-1 border-border/80 bg-muted/85 px-1.5 font-mono text-[11px] tabular-nums dark:bg-muted/70"
        >
          <ListOrderedIcon className="size-3 text-muted-foreground" aria-hidden />
          {stepOrderLabel}
        </Badge>
        <Badge
          variant="secondary"
          className="gap-1 bg-muted px-1.5 text-[11px] font-medium dark:bg-muted/80"
        >
          <TypeIcon className="size-3 shrink-0 opacity-80" aria-hidden />
          {typeLabel}
        </Badge>
        {tokens != null ? (
          <span className="text-muted-foreground flex items-center gap-1 text-[11px] tabular-nums">
            <CoinsIcon className="size-3 shrink-0 opacity-70" aria-hidden />
            {tokens.toLocaleString('en-US')} tokens
          </span>
        ) : null}
      </div>
      <div className="text-muted-foreground flex items-center gap-1.5 text-[11px] tabular-nums">
        <ClockIcon className="size-3 shrink-0 opacity-70" aria-hidden />
        <span>
          {formatRunAt(startedAt)}
          {finishedAt ? ` → ${formatRunAt(finishedAt)}` : ''}
        </span>
      </div>
    </div>
  );
}


export type PreviewPaymentApprovalRequest = {
  claimId: string;
  amount: string;
  method: string;
  summary: string;
  taskId: string;
};

/**
 * Human-readable approval card + Cockpit-style binary Accept / Reject.
 * With `interactive={false}` on the provider, actions render as static chips (snapshot).
 */
export function PreviewUserTaskReqHitlBody({ approval }: { approval: PreviewPaymentApprovalRequest }) {
  const { interactive } = useCockpitMarketingDemo();

  const acceptClass =
    'bg-primary text-primary-foreground inline-flex h-7 w-full items-center justify-center gap-1.5 rounded-[min(var(--radius-md),12px)] border border-transparent px-2.5 text-[0.8rem] font-medium shadow-xs select-none';
  const rejectClass =
    'border-border bg-background inline-flex h-7 w-full items-center justify-center gap-1.5 rounded-[min(var(--radius-md),12px)] border px-2.5 text-[0.8rem] font-medium shadow-xs select-none dark:border-input dark:bg-input/30';

  return (
    <div className="min-w-0 max-w-full space-y-3">
      <div className="bg-background space-y-3 rounded-md border border-border/80 p-3 shadow-xs">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-foreground text-sm font-semibold leading-snug">Release ACH payment</p>
            <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
              Customer email was delivered. Approve to send funds to the policyholder.
            </p>
          </div>
          <Badge variant="outline" className="shrink-0 text-[10px] font-normal">
            Approval required
          </Badge>
        </div>
        <dl className="border-border/60 grid gap-2 border-y py-2 text-[13px] sm:grid-cols-[7.5rem_1fr] sm:gap-x-3">
          <dt className="text-muted-foreground">Claim</dt>
          <dd className="font-mono text-xs text-foreground">{approval.claimId}</dd>
          <dt className="text-muted-foreground">Amount</dt>
          <dd className="text-foreground font-semibold tabular-nums">{approval.amount}</dd>
          <dt className="text-muted-foreground">Method</dt>
          <dd className="text-foreground">{approval.method}</dd>
        </dl>
        <p className="text-foreground text-sm leading-relaxed">{approval.summary}</p>
        <p className="text-muted-foreground font-mono text-[10px] tracking-tight">
          Task <span className="text-foreground/90">{shortId(approval.taskId)}</span>
        </p>
      </div>
      <div className="grid w-full grid-cols-2 gap-2">
        {interactive ? (
          <>
            <button
              type="button"
              tabIndex={-1}
              className={`${acceptClass} hover:bg-primary/90 cursor-default outline-none`}
            >
              Accept
            </button>
            <button
              type="button"
              tabIndex={-1}
              className={`${rejectClass} hover:bg-muted hover:text-foreground cursor-default outline-none dark:hover:bg-input/50`}
            >
              Reject
            </button>
          </>
        ) : (
          <>
            <span className={cn(acceptClass, 'cursor-default')}>Accept</span>
            <span className={cn(rejectClass, 'cursor-default')}>Reject</span>
          </>
        )}
      </div>
    </div>
  );
}

export const PREVIEW_PAYMENT_APPROVAL: PreviewPaymentApprovalRequest = {
  claimId: 'CLM-2026-00412',
  amount: '$4,250.00',
  method: 'ACH',
  summary:
    'Release this payment now? The resolution email has already been delivered to the customer.',
  taskId: 'a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c',
};


type DemoCtx = {
  selectedRunId: string | null;
  setSelectedRunId: (id: string | null) => void;
  /** When false, the demo is a static snapshot (no run switching, no collapsible chrome). */
  interactive: boolean;
};

const CockpitMarketingDemoContext = createContext<DemoCtx | null>(null);

function useCockpitMarketingDemo(): DemoCtx {
  const v = useContext(CockpitMarketingDemoContext);
  if (!v) {
    throw new Error('CockpitMarketingDemoProvider is required');
  }
  return v;
}

/** Shares selected run between Session & runs (gradient) and Run timeline (side column). */
export function CockpitMarketingDemoProvider({
  children,
  interactive = true,
}: {
  children: ReactNode;
  interactive?: boolean;
}) {
  const [selectedRunId, setSelectedRunIdState] = useState<string | null>(null);
  const setSelectedRunId = useCallback(
    (id: string | null) => {
      if (interactive) {
        setSelectedRunIdState(id);
      }
    },
    [interactive],
  );
  const value = useMemo(
    () => ({ selectedRunId, setSelectedRunId, interactive }),
    [selectedRunId, setSelectedRunId, interactive],
  );
  return (
    <CockpitMarketingDemoContext.Provider value={value}>{children}</CockpitMarketingDemoContext.Provider>
  );
}
