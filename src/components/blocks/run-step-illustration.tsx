'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import {
  Bot,
  Brain,
  Check,
  CheckCircle2,
  Circle,
  LoaderCircle,
  Shield,
  UserCheck,
  X,
  XCircle,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import {
  stepActionButtonDanger,
  stepActionButtonDangerActive,
  stepIllustrationBody,
  stepIllustrationBodyPrimary,
  stepIllustrationChip,
  stepIllustrationChipIcon,
  stepIllustrationChipLabel,
  stepIllustrationMeta,
  stepIllustrationMuted,
  stepIllustrationNode,
  stepIllustrationNodeIcon,
  stepIllustrationPanelPad,
  stepPanel,
  stepPanelInset,
  stepTypeCursor,
} from '@/components/blocks/step-illustration-ui';
import { StepHighlight } from '@/components/code-panel-illustration';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

const runTitle =
  'font-mono text-base font-medium tracking-tight text-foreground sm:text-lg';

const runStatusBadge =
  'inline-flex shrink-0 items-center gap-1 rounded-sm border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground sm:text-xs';

const runActionButton =
  'flex items-center justify-center gap-1.5 rounded-sm border border-border bg-background px-3 py-2 font-mono text-sm text-foreground sm:px-3.5 sm:py-2.5 sm:text-base';

const CUSTOMER_NAME = 'Maria K.';
const PAYMENT_AMOUNT = '€1,500';
const POLICY_THRESHOLD = '€1,000';
const ACCOUNT_ID = 'ACC-2910';

type RunPhase = 'thinking' | 'submitting' | 'policy' | 'approval' | 'rejecting' | 'rejected';

const PHASE_ORDER: RunPhase[] = [
  'thinking',
  'submitting',
  'policy',
  'approval',
  'rejecting',
  'rejected',
];

const REASONING_TYPE_MS = 24;

const REASONING_SEGMENTS = [
  { text: 'Customer ', highlight: false },
  { text: CUSTOMER_NAME, highlight: true },
  { text: ' is due a payout. I should send ', highlight: false },
  { text: PAYMENT_AMOUNT, highlight: true },
  { text: ' via ', highlight: false },
  { text: 'submit_payment', highlight: true },
  { text: ' to account ', highlight: false },
  { text: ACCOUNT_ID, highlight: true },
  { text: '.', highlight: false },
] as const;

const REASONING_FULL_TEXT = REASONING_SEGMENTS.map((segment) => segment.text).join('');

const POLICY_NAME = 'large-payment-approval';
const POLICY_RULE = 'amount_eur > €1,000';
const POLICY_ACTUAL = 'amount_eur = €1,500';

const POLICY_SCENE_MS = {
  checking: 1400,
  compare: 2000,
  matched: 2400,
} as const;

type PolicyEvalScene = 'idle' | 'checking' | 'compare' | 'matched';

const PHASE_HOLD_MS: Record<RunPhase, number> = {
  thinking: Math.max(3200, REASONING_FULL_TEXT.length * REASONING_TYPE_MS + 700),
  submitting: 2400,
  policy: POLICY_SCENE_MS.checking + POLICY_SCENE_MS.compare + POLICY_SCENE_MS.matched + 600,
  approval: 2600,
  rejecting: 900,
  rejected: 3600,
};

const fade = { duration: 0.34, ease: [0.22, 1, 0.36, 1] as const };

const TRACE_STEP_GAP_PX = 16;

const TRACE_STEPS = ['thinking', 'submitting', 'policy', 'approval', 'rejected'] as const;

/** Highest step index mounted in the timeline (steps appear one by one). */
function getMaxRevealedStepIndex(phase: RunPhase, reduceMotion: boolean | null): number {
  if (reduceMotion) {
    return TRACE_STEPS.length - 1;
  }

  switch (phase) {
    case 'thinking':
      return 0;
    case 'submitting':
      return 1;
    case 'policy':
      return 2;
    case 'approval':
    case 'rejecting':
      return 3;
    case 'rejected':
      return 4;
  }
}

function isTraceStepRevealed(
  step: (typeof TRACE_STEPS)[number],
  phase: RunPhase,
  reduceMotion: boolean | null,
) {
  return TRACE_STEPS.indexOf(step) <= getMaxRevealedStepIndex(phase, reduceMotion);
}

/** Index of the top step in the two-step viewport window. */
function getWindowTopIndex(phase: RunPhase): number {
  switch (phase) {
    case 'thinking':
    case 'submitting':
      return 0;
    case 'policy':
      return 1;
    case 'approval':
    case 'rejecting':
      return 2;
    case 'rejected':
      return 3;
  }
}

const slideSpring = { type: 'spring' as const, stiffness: 170, damping: 32, mass: 1.05 };

type StepStatus = 'pending' | 'active' | 'complete' | 'failed';

function stepStatus(
  phase: RunPhase,
  step: 'thinking' | 'submitting' | 'policy' | 'approval' | 'rejected',
): StepStatus {
  const phaseIndex = PHASE_ORDER.indexOf(phase);
  const stepIndex =
    step === 'thinking'
      ? 0
      : step === 'submitting'
        ? 1
        : step === 'policy'
          ? 2
          : step === 'approval'
            ? 3
            : PHASE_ORDER.indexOf('rejected');

  if (step === 'rejected') {
    if (phase === 'rejected') {
      return 'failed';
    }
    return 'pending';
  }

  if (phaseIndex > stepIndex || phase === 'rejecting' || phase === 'rejected') {
    return 'complete';
  }
  if (phaseIndex === stepIndex) {
    return 'active';
  }
  return 'pending';
}

function RunTraceChip({ phase }: { phase: RunPhase }) {
  const label =
    phase === 'thinking'
      ? 'Thinking'
      : phase === 'submitting'
        ? 'Running'
        : phase === 'policy'
          ? 'Policy'
          : phase === 'approval' || phase === 'rejecting'
            ? 'HITL'
            : 'Rejected';

  return (
    <motion.div
      key={label}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
      className={cn(stepIllustrationChip, 'right-0 top-0 z-20')}
    >
      <span className={stepIllustrationChipIcon}>
        {phase === 'thinking' ? (
          <Brain className="size-4 sm:size-[18px]" strokeWidth={1.75} aria-hidden />
        ) : phase === 'rejected' ? (
          <X className="size-4 sm:size-[18px]" strokeWidth={1.75} aria-hidden />
        ) : phase === 'approval' || phase === 'rejecting' ? (
          <UserCheck className="size-4 sm:size-[18px]" strokeWidth={1.75} aria-hidden />
        ) : phase === 'policy' ? (
          <Shield className="size-4 sm:size-[18px]" strokeWidth={1.75} aria-hidden />
        ) : (
          <Bot className="size-4 sm:size-[18px]" strokeWidth={1.75} aria-hidden />
        )}
      </span>
      <span className={stepIllustrationChipLabel}>{label}</span>
    </motion.div>
  );
}

function TimelineNode({ status }: { status: StepStatus }) {
  return (
    <div className={cn('relative z-10 flex shrink-0 items-center justify-center', stepIllustrationNode)}>
      <span
        className={cn(
          'relative flex items-center justify-center rounded-sm border bg-background',
          stepIllustrationNode,
          status === 'complete' && 'border-border text-foreground/80',
          status === 'active' && 'border-foreground/35 text-foreground',
          status === 'failed' && 'border-foreground/35 text-foreground/90',
          status === 'pending' && 'border-border/80 bg-muted/30 text-muted-foreground/35',
        )}
      >
        {status === 'complete' ? (
          <CheckCircle2 className={stepIllustrationNodeIcon} strokeWidth={1.75} aria-hidden />
        ) : status === 'failed' ? (
          <XCircle className={stepIllustrationNodeIcon} strokeWidth={1.75} aria-hidden />
        ) : status === 'active' ? (
          <LoaderCircle
            className={cn(stepIllustrationNodeIcon, 'animate-spin motion-reduce:animate-none')}
            strokeWidth={1.75}
            aria-hidden
          />
        ) : (
          <Circle className="size-3 sm:size-3.5" strokeWidth={1.75} aria-hidden />
        )}
      </span>
    </div>
  );
}

function TimelineStep({
  title,
  status,
  children,
  showConnector = false,
  reduceMotion,
}: {
  title: string;
  status: StepStatus;
  children?: ReactNode;
  showConnector?: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.li
      data-trace-step
      className="relative flex shrink-0 gap-3 sm:gap-4"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : slideSpring}
    >
      <div className="flex flex-col items-center">
        <TimelineNode status={status} />
        {showConnector ? (
          <span
            className={cn(
              'mt-1.5 min-h-4 w-px flex-1',
              status === 'pending' ? 'bg-border/40' : 'bg-border/70',
            )}
            aria-hidden
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1 pb-2 sm:pb-3">
        <p
          className={cn(
            runTitle,
            status === 'complete' && 'text-foreground/75',
            status === 'pending' && 'text-muted-foreground/50',
          )}
        >
          {title}
        </p>
        {children ? <div className="mt-2 min-w-0 sm:mt-2.5">{children}</div> : null}
      </div>
    </motion.li>
  );
}

const TRACE_VIEWPORT_EDGE_FADE_PX = 56;

const traceViewportMaskStyle = {
  maskImage: `linear-gradient(to bottom, transparent 0px, black ${TRACE_VIEWPORT_EDGE_FADE_PX}px, black calc(100% - ${TRACE_VIEWPORT_EDGE_FADE_PX}px), transparent 100%)`,
  WebkitMaskImage: `linear-gradient(to bottom, transparent 0px, black ${TRACE_VIEWPORT_EDGE_FADE_PX}px, black calc(100% - ${TRACE_VIEWPORT_EDGE_FADE_PX}px), transparent 100%)`,
} as const;

function measureTraceSlide(
  topIndex: number,
  list: HTMLOListElement | null,
  containerHeight: number,
) {
  const items = list?.querySelectorAll<HTMLElement>('[data-trace-step]');
  if (!items?.length || containerHeight <= 0) {
    return 0;
  }

  const heights = Array.from(items, (item) => item.offsetHeight);
  const offsets: number[] = [0];

  for (let index = 0; index < heights.length; index += 1) {
    const gap = index < heights.length - 1 ? TRACE_STEP_GAP_PX : 0;
    offsets.push(offsets[index]! + heights[index]! + gap);
  }

  const clampedTop = Math.min(Math.max(topIndex, 0), Math.max(0, heights.length - 1));
  const windowEndIndex = Math.min(clampedTop + 2, heights.length);
  const contentTop = offsets[clampedTop] ?? 0;
  const windowHeight = Math.max(offsets[windowEndIndex]! - contentTop, heights[clampedTop] ?? 0);
  const centerPadding = Math.max(0, (containerHeight - windowHeight) / 2);

  return contentTop - centerPadding;
}

function RunTraceSlideViewport({
  topIndex,
  reduceMotion,
  revealedCount,
  children,
}: {
  topIndex: number;
  reduceMotion: boolean | null;
  revealedCount: number;
  children: ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  const remeasure = useCallback(() => {
    const containerHeight = viewportRef.current?.clientHeight ?? 0;
    setOffsetY(measureTraceSlide(topIndex, listRef.current, containerHeight));
  }, [topIndex, revealedCount]);

  useLayoutEffect(() => {
    remeasure();
  }, [remeasure, topIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!viewport || !list) {
      return;
    }

    const observer = new ResizeObserver(remeasure);
    observer.observe(viewport);
    observer.observe(list);
    for (const item of list.querySelectorAll('[data-trace-step]')) {
      observer.observe(item);
    }

    return () => observer.disconnect();
  }, [remeasure]);

  return (
    <div
      ref={viewportRef}
      className="relative min-h-0 flex-1 overflow-hidden pt-9 sm:pt-10"
      style={traceViewportMaskStyle}
    >
      <motion.div
        className="relative will-change-transform"
        animate={{ y: -offsetY }}
        transition={reduceMotion ? { duration: 0 } : slideSpring}
      >
        <ol
          ref={listRef}
          className="relative m-0 flex list-none flex-col p-0"
          style={{ gap: TRACE_STEP_GAP_PX }}
        >
          {children}
        </ol>
      </motion.div>
    </div>
  );
}

function ReasoningTypewriter({
  active,
  complete,
  reduceMotion,
}: {
  active: boolean;
  complete: boolean;
  reduceMotion: boolean | null;
}) {
  const [typedLen, setTypedLen] = useState(0);
  const showCursor = active && !complete && !reduceMotion && typedLen < REASONING_FULL_TEXT.length;

  useEffect(() => {
    if (reduceMotion || complete) {
      setTypedLen(REASONING_FULL_TEXT.length);
      return;
    }

    if (!active) {
      setTypedLen(0);
      return;
    }

    setTypedLen(0);
    let alive = true;
    let index = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      if (!alive) {
        return;
      }

      index += 1;
      setTypedLen(index);

      if (index < REASONING_FULL_TEXT.length) {
        timer = setTimeout(tick, REASONING_TYPE_MS);
      }
    };

    timer = setTimeout(tick, REASONING_TYPE_MS);

    return () => {
      alive = false;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [active, complete, reduceMotion]);

  let offset = 0;
  const nodes: ReactNode[] = [];

  for (const segment of REASONING_SEGMENTS) {
    if (typedLen <= offset) {
      break;
    }

    const visiblePart = segment.text.slice(0, typedLen - offset);
    if (visiblePart) {
      nodes.push(
        segment.highlight ? (
          <StepHighlight key={offset}>{visiblePart}</StepHighlight>
        ) : (
          <span key={offset}>{visiblePart}</span>
        ),
      );
    }

    offset += segment.text.length;
  }

  return (
    <p className={cn('mt-1.5 leading-relaxed', stepIllustrationBody)}>
      {nodes}
      {showCursor ? <span className={stepTypeCursor} aria-hidden /> : null}
    </p>
  );
}

function SubmitPaymentPanel({ active }: { active: boolean }) {
  return (
    <div className={cn(stepPanel, stepIllustrationPanelPad)}>
      <div className="flex items-center gap-2">
        {active ? (
          <Spinner className="size-4 shrink-0 text-muted-foreground motion-reduce:animate-none sm:size-5" />
        ) : (
          <Bot className="size-4 shrink-0 text-muted-foreground sm:size-5" strokeWidth={1.75} aria-hidden />
        )}
        <p className={stepIllustrationBodyPrimary}>
          Calling <StepHighlight>submit_payment</StepHighlight>
        </p>
      </div>
      <p className={cn('mt-2 leading-relaxed', stepIllustrationMuted)}>
        Transferring <StepHighlight>{PAYMENT_AMOUNT}</StepHighlight> to account{' '}
        <StepHighlight>{ACCOUNT_ID}</StepHighlight>
      </p>
    </div>
  );
}

function AgentThinkingPanel({
  active,
  complete,
  reduceMotion,
}: {
  active: boolean;
  complete: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <div className={cn(stepPanel, stepIllustrationPanelPad)}>
      <div className="flex items-center gap-2">
        {active ? (
          <Spinner className="size-4 shrink-0 text-muted-foreground motion-reduce:animate-none sm:size-5" />
        ) : (
          <Brain className="size-4 shrink-0 text-muted-foreground sm:size-5" strokeWidth={1.75} aria-hidden />
        )}
        <p className={stepIllustrationBodyPrimary}>
          Agent is thinking
          {active ? (
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            >
              …
            </motion.span>
          ) : (
            '…'
          )}
        </p>
      </div>

      <div className={cn(stepPanelInset, 'mt-2.5 sm:mt-3')}>
        <p className={stepIllustrationMeta}>Reasoning</p>
        <ReasoningTypewriter active={active} complete={complete} reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}

const spring = { type: 'spring' as const, stiffness: 420, damping: 32 };

function PolicyEvaluationPanel({
  active,
  complete,
  reduceMotion,
}: {
  active: boolean;
  complete: boolean;
  reduceMotion: boolean | null;
}) {
  const [scene, setScene] = useState<PolicyEvalScene>('idle');

  useEffect(() => {
    if (reduceMotion || complete) {
      setScene('matched');
      return;
    }

    if (!active) {
      setScene('idle');
      return;
    }

    setScene('checking');
    let alive = true;
    const compareTimer = setTimeout(() => {
      if (alive) {
        setScene('compare');
      }
    }, POLICY_SCENE_MS.checking);
    const matchedTimer = setTimeout(() => {
      if (alive) {
        setScene('matched');
      }
    }, POLICY_SCENE_MS.checking + POLICY_SCENE_MS.compare);

    return () => {
      alive = false;
      clearTimeout(compareTimer);
      clearTimeout(matchedTimer);
    };
  }, [active, complete, reduceMotion]);

  return (
    <div className={cn(stepPanel, stepIllustrationPanelPad)}>
      <div className="flex items-center justify-between gap-3">
        <p className={cn(stepIllustrationMeta, 'min-w-0 truncate')}>
          Policy ·{' '}
          <span className="normal-case tracking-normal">
            <StepHighlight>{POLICY_NAME}</StepHighlight>
          </span>
        </p>
        {scene === 'checking' ? (
          <Spinner className="size-4 shrink-0 text-muted-foreground motion-reduce:animate-none sm:size-5" />
        ) : scene === 'matched' ? (
          <span className={runStatusBadge}>
            <CheckCircle2 className="size-3.5 sm:size-4" strokeWidth={1.75} aria-hidden />
            Matched
          </span>
        ) : null}
      </div>

      <AnimatePresence mode="wait">
        {scene === 'checking' ? (
          <motion.p
            key="checking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn('mt-2 leading-snug', stepIllustrationMuted)}
          >
            Comparing request against policy conditions…
          </motion.p>
        ) : null}

        {scene === 'compare' || scene === 'matched' ? (
          <motion.div
            key="compare"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={fade}
            className="mt-2.5 space-y-2 sm:mt-3"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2.5 sm:gap-3">
              <div className={cn(stepPanelInset, 'min-w-0')}>
                <p className={stepIllustrationMeta}>Rule</p>
                <p className={cn('mt-0.5 truncate', stepIllustrationBody)}>
                  <StepHighlight>{POLICY_RULE}</StepHighlight>
                </p>
              </div>

              <span className={cn(stepIllustrationMeta, 'text-muted-foreground/50')} aria-hidden>
                vs
              </span>

              <div className={cn(stepPanelInset, 'min-w-0', scene === 'matched' && 'border-foreground/25 bg-muted/35')}>
                <p className={stepIllustrationMeta}>Actual</p>
                <p className={cn('mt-0.5 truncate', stepIllustrationBody)}>
                  <StepHighlight>{POLICY_ACTUAL}</StepHighlight>
                </p>
              </div>
            </div>

            {scene === 'matched' ? (
              <motion.p
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...fade, delay: 0.08 }}
                className={cn('flex items-center gap-1.5 leading-snug', stepIllustrationBody)}
              >
                <CheckCircle2 className="size-4 shrink-0 text-muted-foreground sm:size-5" strokeWidth={1.75} aria-hidden />
                {PAYMENT_AMOUNT} exceeds {POLICY_THRESHOLD} — approval required
              </motion.p>
            ) : (
              <p className={cn('flex items-center gap-1.5 leading-snug', stepIllustrationMuted)}>
                <LoaderCircle className="size-4 shrink-0 animate-spin motion-reduce:animate-none sm:size-5" strokeWidth={1.75} aria-hidden />
                Checking match…
              </p>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ApprovalPanel({
  phase,
  reduceMotion,
}: {
  phase: RunPhase;
  reduceMotion: boolean | null;
}) {
  const rejectPressed = phase === 'rejecting' || phase === 'rejected';
  const showCursor = phase === 'approval' && !reduceMotion;
  const statusLabel =
    phase === 'rejecting' ? 'Rejecting…' : phase === 'rejected' ? 'Rejected' : 'Pending';

  return (
    <div className={cn(stepPanel, stepIllustrationPanelPad)}>
      <div className="flex items-start justify-between gap-2.5">
        <div className="min-w-0">
          <p className={stepIllustrationMeta}>Manager approval</p>
          <p className={cn('mt-1', stepIllustrationBodyPrimary)}>
            Payment <StepHighlight>{PAYMENT_AMOUNT}</StepHighlight>
          </p>
          <p className={cn('mt-0.5', stepIllustrationMuted)}>
            Account {ACCOUNT_ID} · exceeds {POLICY_THRESHOLD} threshold
          </p>
        </div>
        <span className={runStatusBadge}>{statusLabel}</span>
      </div>

      <div className="relative mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:gap-3">
        <motion.div
          className={cn(runActionButton, rejectPressed && 'opacity-45')}
          animate={rejectPressed ? { scale: 1 } : undefined}
        >
          <Check className="size-4" strokeWidth={2} aria-hidden />
          Approve
        </motion.div>

        <motion.div
          className={cn(
            runActionButton,
            stepActionButtonDanger,
            rejectPressed && stepActionButtonDangerActive,
          )}
          animate={
            rejectPressed
              ? { scale: reduceMotion ? 1 : [1, 0.97, 1] }
              : showCursor
                ? { scale: [1, 1.01, 1] }
                : undefined
          }
          transition={
            rejectPressed
              ? { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
              : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <X className="size-4" strokeWidth={2} aria-hidden />
          Reject
        </motion.div>

        <AnimatePresence>
          {showCursor ? (
            <motion.div
              className="pointer-events-none absolute bottom-[-0.25rem] right-[22%] z-20 sm:right-[24%]"
              initial={{ opacity: 0, x: 28, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            >
              <svg width="24" height="28" viewBox="0 0 22 26" fill="none">
                <path
                  d="M3 2L3 18.5L8.5 14.5L12.5 22.5L15 21L11 13L17.5 12.5L3 2Z"
                  fill="hsl(var(--foreground))"
                  stroke="hsl(var(--background))"
                  strokeWidth="1.5"
                />
              </svg>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

function AgentRejectedOutcome() {
  return (
    <div className={cn(stepPanel, stepIllustrationPanelPad)}>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={stepIllustrationChipIcon}>
          <Bot className="size-4 sm:size-[18px]" strokeWidth={1.75} aria-hidden />
        </span>
        <span className={stepIllustrationMeta}>Agent response</span>
      </div>
      <p className={cn('leading-relaxed', stepIllustrationBodyPrimary)}>
        The payment was rejected — the manager declined the {PAYMENT_AMOUNT} transfer.
      </p>
    </div>
  );
}

function RunTraceContent({ phase, reduceMotion }: { phase: RunPhase; reduceMotion: boolean | null }) {
  const windowTopIndex = getWindowTopIndex(phase);
  const maxRevealed = getMaxRevealedStepIndex(phase, reduceMotion);
  const policyComplete = PHASE_ORDER.indexOf(phase) > PHASE_ORDER.indexOf('policy');

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col">
      <RunTraceChip phase={phase} />

      <RunTraceSlideViewport
        topIndex={windowTopIndex}
        reduceMotion={reduceMotion}
        revealedCount={maxRevealed + 1}
      >
        {isTraceStepRevealed('thinking', phase, reduceMotion) ? (
          <TimelineStep
            title="Reason"
            status={stepStatus(phase, 'thinking')}
            showConnector={maxRevealed > 0}
            reduceMotion={reduceMotion}
          >
            <AgentThinkingPanel
              active={phase === 'thinking'}
              complete={phase !== 'thinking'}
              reduceMotion={reduceMotion}
            />
          </TimelineStep>
        ) : null}

        {isTraceStepRevealed('submitting', phase, reduceMotion) ? (
          <TimelineStep
            title="Submit payment"
            status={stepStatus(phase, 'submitting')}
            showConnector={maxRevealed > 1}
            reduceMotion={reduceMotion}
          >
            <SubmitPaymentPanel active={phase === 'submitting'} />
          </TimelineStep>
        ) : null}

        {isTraceStepRevealed('policy', phase, reduceMotion) ? (
          <TimelineStep
            title="Evaluate policy"
            status={stepStatus(phase, 'policy')}
            showConnector={maxRevealed > 2}
            reduceMotion={reduceMotion}
          >
            <PolicyEvaluationPanel
              active={phase === 'policy'}
              complete={policyComplete}
              reduceMotion={reduceMotion}
            />
          </TimelineStep>
        ) : null}

        {isTraceStepRevealed('approval', phase, reduceMotion) ? (
          <TimelineStep
            title="Route for approval"
            status={stepStatus(phase, 'approval')}
            showConnector={maxRevealed > 3}
            reduceMotion={reduceMotion}
          >
            <ApprovalPanel phase={phase} reduceMotion={reduceMotion} />
          </TimelineStep>
        ) : null}

        {isTraceStepRevealed('rejected', phase, reduceMotion) ? (
          <TimelineStep
            title="Payment rejected"
            status={stepStatus(phase, 'rejected')}
            reduceMotion={reduceMotion}
          >
            <AgentRejectedOutcome />
          </TimelineStep>
        ) : null}
      </RunTraceSlideViewport>
    </div>
  );
}

export function RunStepIllustration({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<RunPhase>('thinking');

  useEffect(() => {
    if (!active) {
      setPhase('thinking');
      return;
    }

    if (reduceMotion) {
      setPhase('rejected');
      return;
    }

    let alive = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const schedulePhase = (index: number) => {
      if (!alive) {
        return;
      }

      const current = PHASE_ORDER[index]!;
      setPhase(current);

      const nextIndex = index + 1;
      if (nextIndex >= PHASE_ORDER.length) {
        return;
      }

      timer = setTimeout(() => {
        schedulePhase(nextIndex);
      }, PHASE_HOLD_MS[current]);
    };

    schedulePhase(0);

    return () => {
      alive = false;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [active, reduceMotion]);

  return (
    <div className="relative flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden" aria-hidden>
      <RunTraceContent phase={phase} reduceMotion={reduceMotion} />
    </div>
  );
}
