'use client';

import { useEffect, useState, type ReactNode } from 'react';
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
  stepPanel,
  stepPanelInset,
  stepTypeCursor,
} from '@/components/blocks/step-illustration-ui';
import { StepHighlight } from '@/components/code-panel-illustration';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

const runTitle =
  'font-mono text-sm font-medium tracking-tight text-foreground sm:text-base md:text-lg';

const runBody =
  'font-mono text-xs leading-relaxed text-foreground sm:text-sm md:text-base';

const runBodyPrimary =
  'font-mono text-sm leading-snug text-foreground sm:text-base md:text-lg';

const runMuted =
  'font-mono text-xs text-muted-foreground sm:text-sm md:text-base';

const runMeta =
  'font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:text-[11px]';

const runPanelPad = 'px-4 py-3 sm:px-5 sm:py-4';

const runInsetPad = 'px-3 py-2.5 sm:px-3.5 sm:py-3';

const runNode = 'size-8 sm:size-9';

const runNodeIcon = 'size-3.5 sm:size-4';

const runChip =
  'absolute z-10 flex items-center gap-1.5 rounded-sm border border-border bg-background px-2 py-1 whitespace-nowrap sm:gap-2 sm:px-2.5 sm:py-1.5';

const runChipIcon =
  'flex size-6 items-center justify-center rounded-sm border border-border bg-muted/40 text-muted-foreground sm:size-7';

const runChipLabel =
  'font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-foreground sm:text-[11px]';

const runStatusBadge =
  'inline-flex shrink-0 items-center gap-1 rounded-sm border border-border bg-muted/30 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground sm:text-[10px]';

const runActionButton =
  'flex items-center justify-center gap-1.5 rounded-sm border border-border bg-background px-3 py-2 font-mono text-xs text-foreground sm:text-[13px]';

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
      className={cn(runChip, 'right-1 top-0 sm:right-2')}
    >
      <span className={runChipIcon}>
        {phase === 'thinking' ? (
          <Brain className="size-3.5 sm:size-4" strokeWidth={1.75} aria-hidden />
        ) : phase === 'rejected' ? (
          <X className="size-3.5 sm:size-4" strokeWidth={1.75} aria-hidden />
        ) : phase === 'approval' || phase === 'rejecting' ? (
          <UserCheck className="size-3.5 sm:size-4" strokeWidth={1.75} aria-hidden />
        ) : phase === 'policy' ? (
          <Shield className="size-3.5 sm:size-4" strokeWidth={1.75} aria-hidden />
        ) : (
          <Bot className="size-3.5 sm:size-4" strokeWidth={1.75} aria-hidden />
        )}
      </span>
      <span className={runChipLabel}>{label}</span>
    </motion.div>
  );
}

function TimelineNode({ status }: { status: StepStatus }) {
  return (
    <div className={cn('relative z-10 flex shrink-0 items-center justify-center', runNode)}>
      <span
        className={cn(
          'relative flex items-center justify-center rounded-sm border bg-background',
          runNode,
          status === 'complete' && 'border-border text-foreground/80',
          status === 'active' && 'border-foreground/35 text-foreground',
          status === 'failed' && 'border-foreground/35 text-foreground/90',
          status === 'pending' && 'border-border/80 bg-muted/30 text-muted-foreground/35',
        )}
      >
        {status === 'complete' ? (
          <CheckCircle2 className={runNodeIcon} strokeWidth={1.75} aria-hidden />
        ) : status === 'failed' ? (
          <XCircle className={runNodeIcon} strokeWidth={1.75} aria-hidden />
        ) : status === 'active' ? (
          <LoaderCircle className={cn(runNodeIcon, 'animate-spin motion-reduce:animate-none')} strokeWidth={1.75} aria-hidden />
        ) : (
          <Circle className="size-3.5 sm:size-4" strokeWidth={1.75} aria-hidden />
        )}
      </span>
    </div>
  );
}

function TimelineStep({
  title,
  status,
  visible,
  children,
  isLast = false,
}: {
  title: string;
  status: StepStatus;
  visible: boolean;
  children?: ReactNode;
  isLast?: boolean;
}) {
  if (!visible) {
    return null;
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={fade}
      className="relative flex gap-3 sm:gap-4"
    >
      <div className="flex flex-col items-center">
        <TimelineNode status={status} />
        {!isLast ? (
          <motion.span
            className={cn(
              'mt-1.5 w-px flex-1 min-h-[1.5rem]',
              status === 'pending' ? 'bg-border/40' : 'bg-border/70',
            )}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ originY: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1 pb-5 sm:pb-6">
        <p
          className={cn(
            runTitle,
            status === 'complete' && 'text-foreground/75',
            status === 'pending' && 'text-muted-foreground/50',
          )}
        >
          {title}
        </p>
        {children ? <div className="mt-2.5 min-w-0">{children}</div> : null}
      </div>
    </motion.li>
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
    <p className={cn('mt-2 leading-relaxed', runBody)}>
      {nodes}
      {showCursor ? <span className={stepTypeCursor} aria-hidden /> : null}
    </p>
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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className={cn(stepPanel, runPanelPad)}
    >
      <div className="flex items-center gap-2.5">
        {active ? (
          <Spinner className="size-3.5 shrink-0 text-muted-foreground motion-reduce:animate-none sm:size-4" />
        ) : (
          <Brain className="size-3.5 shrink-0 text-muted-foreground sm:size-4" strokeWidth={1.75} aria-hidden />
        )}
        <p className={runBodyPrimary}>
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

      <div className={cn(stepPanelInset, runInsetPad, 'mt-3')}>
        <p className={runMeta}>Reasoning</p>
        <ReasoningTypewriter active={active} complete={complete} reduceMotion={reduceMotion} />
      </div>
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className={cn(stepPanel, runPanelPad)}
    >
      <div className="flex items-center justify-between gap-3">
        <p className={cn(runMeta, 'min-w-0 truncate')}>
          Policy ·{' '}
          <span className="normal-case tracking-normal">
            <StepHighlight>{POLICY_NAME}</StepHighlight>
          </span>
        </p>
        {scene === 'checking' ? (
          <Spinner className="size-3.5 shrink-0 text-muted-foreground motion-reduce:animate-none sm:size-4" />
        ) : scene === 'matched' ? (
          <span className={runStatusBadge}>
            <CheckCircle2 className="size-3" strokeWidth={1.75} aria-hidden />
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
            className={cn('mt-3 leading-snug', runMuted)}
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
            className="mt-3 space-y-2"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
              <div className={cn(stepPanelInset, runInsetPad, 'min-w-0')}>
                <p className={runMeta}>Rule</p>
                <p className={cn('mt-1 truncate', runBody)}>
                  <StepHighlight>{POLICY_RULE}</StepHighlight>
                </p>
              </div>

              <span className={cn(runMeta, 'text-muted-foreground/50')} aria-hidden>
                vs
              </span>

              <div className={cn(stepPanelInset, runInsetPad, 'min-w-0', scene === 'matched' && 'border-foreground/25 bg-muted/35')}>
                <p className={runMeta}>Actual</p>
                <p className={cn('mt-1 truncate', runBody)}>
                  <StepHighlight>{POLICY_ACTUAL}</StepHighlight>
                </p>
              </div>
            </div>

            {scene === 'matched' ? (
              <motion.p
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...fade, delay: 0.08 }}
                className={cn('flex items-center gap-2 leading-snug', runBody)}
              >
                <CheckCircle2 className="size-3.5 shrink-0 text-muted-foreground sm:size-4" strokeWidth={1.75} aria-hidden />
                {PAYMENT_AMOUNT} exceeds {POLICY_THRESHOLD} — approval required
              </motion.p>
            ) : (
              <p className={cn('flex items-center gap-2 leading-snug', runMuted)}>
                <LoaderCircle className="size-3.5 shrink-0 animate-spin motion-reduce:animate-none sm:size-4" strokeWidth={1.75} aria-hidden />
                Checking match…
              </p>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
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
  const showPanel = phase === 'approval' || phase === 'rejecting';

  return (
    <AnimatePresence mode="wait">
      {showPanel ? (
        <motion.div
          key="approval-panel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={spring}
          className={cn(stepPanel, runPanelPad)}
        >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={runMeta}>Manager approval</p>
          <p className={cn('mt-1.5', runBodyPrimary)}>
            Payment <StepHighlight>{PAYMENT_AMOUNT}</StepHighlight>
          </p>
          <p className={cn('mt-1', runMuted)}>
            Account {ACCOUNT_ID} · exceeds {POLICY_THRESHOLD} threshold
          </p>
        </div>
        <span className={runStatusBadge}>
          {phase === 'rejecting' ? 'Rejecting…' : 'Pending'}
        </span>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
        <motion.div
          className={cn(runActionButton, rejectPressed && 'opacity-45')}
          animate={rejectPressed ? { scale: 1 } : undefined}
        >
          <Check className="size-3.5 sm:size-4" strokeWidth={2} aria-hidden />
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
          <X className="size-3.5 sm:size-4" strokeWidth={2} aria-hidden />
          Reject
        </motion.div>

        <AnimatePresence>
          {showCursor ? (
            <motion.div
              className="pointer-events-none absolute bottom-[-0.35rem] right-[22%] z-20 sm:right-[24%]"
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
        </motion.div>
      ) : (
        <motion.p
          key="approval-summary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={runMuted}
        >
          Manager rejected the {PAYMENT_AMOUNT} payment
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function AgentRejectedOutcome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={fade}
      className={cn(stepPanel, runPanelPad)}
    >
      <div className="mb-2.5 flex items-center gap-2.5">
        <span className={runChipIcon}>
          <Bot className="size-3.5 sm:size-4" strokeWidth={1.75} aria-hidden />
        </span>
        <span className={runMeta}>Agent response</span>
      </div>
      <p className={cn('leading-relaxed', runBodyPrimary)}>
        The payment was rejected — the manager declined the {PAYMENT_AMOUNT} transfer.
      </p>
    </motion.div>
  );
}

function RunTraceContent({ phase, reduceMotion }: { phase: RunPhase; reduceMotion: boolean | null }) {
  const phaseIndex = PHASE_ORDER.indexOf(phase);
  const showThinking = phaseIndex >= 0;
  const showSubmitting = phaseIndex >= 1;
  const showPolicy = phaseIndex >= 2;
  const showApproval = phaseIndex >= 3;
  const showRejectedStep = phaseIndex >= PHASE_ORDER.indexOf('rejected');

  return (
    <div className="relative pt-12 sm:pt-14">
      <RunTraceChip phase={phase} />

      <ol className="relative m-0 list-none p-0">
        {showThinking ? (
          <TimelineStep title="Reason" status={stepStatus(phase, 'thinking')} visible>
            <AgentThinkingPanel
              active={phase === 'thinking'}
              complete={phase !== 'thinking'}
              reduceMotion={reduceMotion}
            />
          </TimelineStep>
        ) : null}

        {showSubmitting ? (
          <TimelineStep title="Submit payment" status={stepStatus(phase, 'submitting')} visible>
            <p className={cn('leading-relaxed', runMuted)}>
              Calling <StepHighlight>submit_payment</StepHighlight> for {PAYMENT_AMOUNT}
            </p>
          </TimelineStep>
        ) : null}

        {showPolicy ? (
          <TimelineStep
            title="Evaluate policy"
            status={stepStatus(phase, 'policy')}
            visible
          >
            <PolicyEvaluationPanel
              active={phase === 'policy'}
              complete={PHASE_ORDER.indexOf(phase) > PHASE_ORDER.indexOf('policy')}
              reduceMotion={reduceMotion}
            />
          </TimelineStep>
        ) : null}

        {showApproval ? (
          <TimelineStep
            title="Route for approval"
            status={stepStatus(phase, 'approval')}
            visible
          >
            <ApprovalPanel phase={phase} reduceMotion={reduceMotion} />
          </TimelineStep>
        ) : null}

        {showRejectedStep ? (
          <TimelineStep
            title="Payment rejected"
            status={stepStatus(phase, 'rejected')}
            visible
            isLast
          >
            <AgentRejectedOutcome />
          </TimelineStep>
        ) : null}
      </ol>
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
    <div className="relative min-w-0" aria-hidden>
      <RunTraceContent phase={phase} reduceMotion={reduceMotion} />
    </div>
  );
}
