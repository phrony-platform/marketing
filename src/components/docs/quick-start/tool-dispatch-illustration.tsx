'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Cog, LoaderCircle, Server } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { docLabel, docPanel, docRadius } from '@/components/docs/doc-style';
import { cn } from '@/lib/utils';

type Phase = 'invoke' | 'handle' | 'result';

const PHASE_CYCLE: { phase: Phase; holdMs: number }[] = [
  { phase: 'invoke', holdMs: 2200 },
  { phase: 'handle', holdMs: 1100 },
  { phase: 'result', holdMs: 2200 },
];

const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: 'spring' as const, stiffness: 260, damping: 26 };

const phaseAccent: Record<
  Phase,
  { ring: string; beam: string; pill: string; glow: string; dot: string }
> = {
  invoke: {
    ring: 'border-sky-500/50 shadow-[0_0_0_4px_rgba(14,165,233,0.12)]',
    beam: 'from-sky-500/10 via-sky-500/70 to-sky-500/20',
    pill: 'border-sky-400/40 bg-sky-950 text-sky-50 dark:bg-sky-400 dark:text-sky-950',
    glow: 'bg-sky-400/35',
    dot: 'bg-sky-500',
  },
  handle: {
    ring: 'border-amber-500/45 shadow-[0_0_0_4px_rgba(245,158,11,0.1)]',
    beam: 'from-amber-500/10 via-amber-500/60 to-amber-500/15',
    pill: 'border-amber-400/40 bg-amber-950 text-amber-50 dark:bg-amber-400 dark:text-amber-950',
    glow: 'bg-amber-400/30',
    dot: 'bg-amber-500',
  },
  result: {
    ring: 'border-emerald-500/50 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]',
    beam: 'from-emerald-500/10 via-emerald-500/70 to-emerald-500/20',
    pill: 'border-emerald-400/40 bg-emerald-950 text-emerald-50 dark:bg-emerald-400 dark:text-emerald-950',
    glow: 'bg-emerald-400/35',
    dot: 'bg-emerald-500',
  },
};

const captions: Record<Phase, string> = {
  invoke: 'Runtime dispatches invoke to your worker',
  handle: 'Worker executes your tool handler',
  result: 'Result returns to the session',
};

function PhaseStepper({ phase }: { phase: Phase }) {
  const steps: Phase[] = ['invoke', 'handle', 'result'];
  return (
    <div className="flex items-center justify-center gap-2" aria-hidden>
      {steps.map((step) => {
        const active = step === phase;
        return (
          <motion.span
            key={step}
            className={cn('h-1.5 rounded-full bg-border', active ? 'w-6' : 'w-1.5')}
            animate={
              active
                ? { width: 24, backgroundColor: 'var(--foreground)' }
                : { width: 6, backgroundColor: 'var(--border)' }
            }
            transition={{ duration: 0.35, ease }}
          />
        );
      })}
    </div>
  );
}

function NodeCard({
  icon: Icon,
  title,
  subtitle,
  active,
  phase,
  processing,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  active: boolean;
  phase: Phase;
  processing?: boolean;
}) {
  const accent = phaseAccent[active ? phase : 'invoke'];

  return (
    <motion.div
      className="relative"
      animate={active ? { y: -2 } : { y: 0 }}
      transition={spring}
    >
      <AnimatePresence>
        {active ? (
          <motion.span
            key="ring"
            className={cn('pointer-events-none absolute -inset-1 rounded-[calc(var(--radius)+2px)] border', accent.ring)}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease }}
            aria-hidden
          />
        ) : null}
      </AnimatePresence>

      <div
        className={cn(
          docRadius,
          'relative flex min-w-[8.75rem] flex-col items-center border bg-background/95 px-4 py-3.5 text-center backdrop-blur-sm sm:min-w-[9.75rem]',
          active ? 'border-foreground/25' : 'border-border',
        )}
      >
        <motion.span
          className={cn(
            docRadius,
            'relative flex size-10 items-center justify-center border bg-gradient-to-b from-muted/70 to-muted/30 text-foreground',
            active ? 'border-foreground/20' : 'border-border',
          )}
          animate={processing ? { rotate: 360 } : { rotate: 0 }}
          transition={
            processing
              ? { duration: 1.4, repeat: Infinity, ease: 'linear' }
              : { duration: 0.3 }
          }
          aria-hidden
        >
          {processing ? (
            <LoaderCircle className="size-4.5" strokeWidth={1.75} />
          ) : (
            <Icon className="size-4.5" strokeWidth={1.75} />
          )}
        </motion.span>
        <p className="mt-2.5 font-mono text-sm font-medium tracking-tight text-foreground">{title}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function FlowPacket({
  label,
  accent,
  playing,
  layout,
}: {
  label: string;
  accent: (typeof phaseAccent)['invoke'];
  playing: boolean;
  layout: 'horizontal-forward' | 'horizontal-back' | 'vertical-forward' | 'vertical-back';
}) {
  const isHorizontal = layout.startsWith('horizontal');
  const reverse = layout.endsWith('back');

  const position = (() => {
    if (layout === 'horizontal-forward') {
      return playing
        ? { left: ['6%', '74%'], top: '50%', x: '-50%', y: '-50%' }
        : { left: '40%', top: '50%', x: '-50%', y: '-50%' };
    }
    if (layout === 'horizontal-back') {
      return playing
        ? { left: ['74%', '6%'], top: '50%', x: '-50%', y: '-50%' }
        : { left: '40%', top: '50%', x: '-50%', y: '-50%' };
    }
    if (layout === 'vertical-forward') {
      return playing
        ? { top: ['8%', '74%'], left: '50%', x: '-50%', y: '-50%' }
        : { top: '40%', left: '50%', x: '-50%', y: '-50%' };
    }
    return playing
      ? { top: ['74%', '8%'], left: '50%', x: '-50%', y: '-50%' }
      : { top: '40%', left: '50%', x: '-50%', y: '-50%' };
  })();

  return (
    <motion.span
      className={cn(
        'pointer-events-none absolute z-20 flex items-center gap-1',
        isHorizontal ? 'flex-row' : 'flex-col',
      )}
      initial={false}
      animate={
        playing
          ? { ...position, opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 0.9] }
          : { opacity: 0, scale: 0.85 }
      }
      transition={
        playing
          ? { duration: 1.05, ease, times: [0, 0.08, 0.92, 1] }
          : { duration: 0.25 }
      }
    >
      <motion.span
        className={cn('absolute inset-0 rounded-full blur-md', accent.glow)}
        animate={playing ? { opacity: [0.35, 0.85, 0.35], scale: [0.9, 1.15, 0.9] } : { opacity: 0 }}
        transition={playing ? { duration: 1.05, repeat: Infinity, ease: 'easeInOut' } : undefined}
        aria-hidden
      />
      <span
        className={cn(
          docRadius,
          'relative border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] shadow-md',
          accent.pill,
        )}
      >
        {label}
      </span>
      {!reverse ? (
        <ArrowRight
          className={cn('relative size-3 opacity-80', !isHorizontal && 'rotate-90')}
          strokeWidth={2}
          aria-hidden
        />
      ) : (
        <ArrowLeft
          className={cn('relative size-3 opacity-80', !isHorizontal && '-rotate-90')}
          strokeWidth={2}
          aria-hidden
        />
      )}
    </motion.span>
  );
}

function FlowTrack({
  label,
  playing,
  accent,
  layout,
}: {
  label: string;
  playing: boolean;
  accent: (typeof phaseAccent)['invoke'];
  layout: 'horizontal-forward' | 'horizontal-back' | 'vertical-forward' | 'vertical-back';
}) {
  const isHorizontal = layout.startsWith('horizontal');
  const reverse = layout.endsWith('back');

  return (
    <div
      className={cn(
        'relative',
        isHorizontal ? 'h-12 w-[4.5rem] sm:w-32' : 'h-16 w-12',
      )}
      aria-hidden
    >
      <div
        className={cn(
          'absolute bg-border/80',
          isHorizontal ? 'left-0 right-3 top-1/2 h-px -translate-y-1/2' : 'bottom-3 top-0 left-1/2 w-px -translate-x-1/2',
        )}
      />
      <motion.div
        className={cn(
          'absolute bg-gradient-to-r',
          accent.beam,
          isHorizontal
            ? 'left-0 right-3 top-1/2 h-[2px] -translate-y-1/2 origin-left'
            : cn(
                'bottom-3 top-0 left-1/2 w-[2px] -translate-x-1/2 origin-top bg-gradient-to-b',
                accent.beam,
              ),
        )}
        initial={false}
        animate={
          playing
            ? { scaleX: isHorizontal ? [0, 1] : 1, scaleY: isHorizontal ? 1 : [0, 1], opacity: [0.35, 1, 1] }
            : { scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0, opacity: 0.2 }
        }
        transition={{ duration: 1.05, ease }}
      />
      {reverse ? (
        isHorizontal ? (
          <ArrowLeft className="absolute right-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/45" strokeWidth={1.75} />
        ) : (
          <ArrowUp className="absolute top-0 left-1/2 size-4 -translate-x-1/2 text-muted-foreground/45" strokeWidth={1.75} />
        )
      ) : isHorizontal ? (
        <ArrowRight className="absolute right-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/45" strokeWidth={1.75} />
      ) : (
        <ArrowDown className="absolute bottom-0 left-1/2 size-4 -translate-x-1/2 text-muted-foreground/45" strokeWidth={1.75} />
      )}
      <FlowPacket label={label} accent={accent} playing={playing} layout={layout} />
    </div>
  );
}

const trackFade = { duration: 0.28, ease } as const;

function FlowTrackSlot({ phase, orientation }: { phase: Phase; orientation: 'horizontal' | 'vertical' }) {
  const horizontal = orientation === 'horizontal';
  const slotClass = horizontal ? 'h-12 w-[4.5rem] sm:w-32' : 'h-16 w-12';

  return (
    <div className={cn('relative shrink-0', slotClass)} aria-hidden>
      <AnimatePresence mode="wait">
        {phase === 'invoke' ? (
          <motion.div
            key="invoke"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={trackFade}
          >
            <FlowTrack
              label="invoke"
              playing
              accent={phaseAccent.invoke}
              layout={horizontal ? 'horizontal-forward' : 'vertical-forward'}
            />
          </motion.div>
        ) : phase === 'result' ? (
          <motion.div
            key="result"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={trackFade}
          >
            <FlowTrack
              label="result"
              playing
              accent={phaseAccent.result}
              layout={horizontal ? 'horizontal-back' : 'vertical-back'}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function DesktopDiagram({ phase }: { phase: Phase }) {
  return (
    <div className="mx-auto hidden sm:block">
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <NodeCard
          icon={Server}
          title="phrony-runtime"
          subtitle="session"
          active={phase === 'invoke' || phase === 'result'}
          phase={phase === 'result' ? 'result' : 'invoke'}
        />
        <FlowTrackSlot phase={phase} orientation="horizontal" />
        <NodeCard
          icon={Cog}
          title="your worker"
          subtitle="your code"
          active={phase === 'invoke' || phase === 'handle'}
          phase={phase === 'handle' ? 'handle' : 'invoke'}
          processing={phase === 'handle'}
        />
      </div>
    </div>
  );
}

function MobileDiagram({ phase }: { phase: Phase }) {
  return (
    <div className="flex flex-col items-center gap-1 sm:hidden">
      <NodeCard
        icon={Server}
        title="phrony-runtime"
        subtitle="session"
        active={phase === 'invoke' || phase === 'result'}
        phase={phase === 'result' ? 'result' : 'invoke'}
      />
      <FlowTrackSlot phase={phase} orientation="vertical" />
      <NodeCard
        icon={Cog}
        title="your worker"
        subtitle="your code"
        active={phase === 'invoke' || phase === 'handle'}
        phase={phase === 'handle' ? 'handle' : 'invoke'}
        processing={phase === 'handle'}
      />
    </div>
  );
}

function StaticLayout() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
        <NodeCard icon={Server} title="phrony-runtime" subtitle="session" active={false} phase="invoke" />
        <div className="flex flex-col items-center gap-1 text-muted-foreground" aria-hidden>
          <ArrowDown className="size-4 sm:hidden" strokeWidth={1.75} />
          <ArrowRight className="hidden size-4 sm:block" strokeWidth={1.75} />
          <span className="font-mono text-[10px] uppercase tracking-wider">invoke</span>
        </div>
        <NodeCard icon={Cog} title="your worker" subtitle="your code" active={false} phase="invoke" />
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">Tool result returns to the session</p>
    </>
  );
}

export function ToolDispatchIllustration({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('invoke');

  useEffect(() => {
    if (reduceMotion) {
      return;
    }
    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const step = PHASE_CYCLE[index];
      setPhase(step.phase);
      timeout = setTimeout(() => {
        index = (index + 1) % PHASE_CYCLE.length;
        schedule();
      }, step.holdMs);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <figure className={cn('not-prose', docPanel, 'px-4 py-5 sm:px-6 sm:py-6', className)}>
        <StaticLayout />
      </figure>
    );
  }

  return (
    <figure
      className={cn(
        'not-prose relative overflow-hidden',
        docPanel,
        'px-4 py-5 sm:px-6 sm:py-6',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--muted)_0%,transparent_70%)] opacity-60"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden />

      <div className="relative flex flex-col items-center">
        <p className={cn(docLabel, 'text-center')}>Tool dispatch</p>
        <DesktopDiagram phase={phase} />
        <MobileDiagram phase={phase} />
      </div>

      <div className="relative mt-5 space-y-3">
        <PhaseStepper phase={phase} />
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            className="text-center text-xs text-muted-foreground"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.32, ease }}
          >
            {captions[phase]}
          </motion.p>
        </AnimatePresence>
      </div>
    </figure>
  );
}
