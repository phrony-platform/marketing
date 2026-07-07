'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { DeclaredStepIllustration } from '@/components/blocks/declared-step-illustration';
import { DeployedStepIllustration } from '@/components/blocks/deployed-step-illustration';
import { RunStepIllustration } from '@/components/blocks/run-step-illustration';
import { stepShell } from '@/components/blocks/step-illustration-ui';
import { cn } from '@/lib/utils';

const parts = [
  {
    label: 'Declared',
    body: 'Its purpose, tools, policies, limits, and human checkpoints live in one versioned manifest, not scattered across application code.',
    fillHeight: true,
    illustration: 'declared-animation' as const,
  },
  {
    label: 'Deployed',
    body: 'The agent has its own lifecycle — versions, environments, rollouts, rollbacks.',
    fillHeight: true,
    illustration: 'deploy-animation' as const,
  },
  {
    label: 'Run',
    body: 'Your application calls agent.run(), and the runtime executes the manifest, mediates every tool call, and enforces every limit.',
    fillHeight: true,
    illustration: 'run-animation' as const,
  },
] as const;

const STORY_HEADER_OFFSET = 80;
const STORY_HEADER_OFFSET_LG = 96;
const STEP_SNAP_THRESHOLD = 0.5;
const TRACK_HEIGHT_PER_STEP_SVH = 100;
const FINAL_STEP_HOLD_SVH = 100;

const TRANSITION_TRACK_SVH = parts.length * TRACK_HEIGHT_PER_STEP_SVH;
const STORY_TRACK_SVH = TRANSITION_TRACK_SVH + FINAL_STEP_HOLD_SVH;
const TRANSITION_PROGRESS_END = TRANSITION_TRACK_SVH / STORY_TRACK_SVH;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function mapScrollToBarProgress(progress: number) {
  if (progress >= TRANSITION_PROGRESS_END) {
    return 1;
  }

  const transitionProgress = progress / TRANSITION_PROGRESS_END;
  const raw = transitionProgress * parts.length;
  const stepIndex = Math.min(Math.floor(raw), parts.length - 1);
  const localProgress = raw - stepIndex;
  const steppedProgress = localProgress >= STEP_SNAP_THRESHOLD ? 1 : Math.round(localProgress * 100) / 100;

  return (stepIndex + steppedProgress) / parts.length;
}

function mapScrollToActiveStep(progress: number) {
  if (progress >= TRANSITION_PROGRESS_END) {
    return parts.length - 1;
  }

  const transitionProgress = progress / TRANSITION_PROGRESS_END;
  const raw = transitionProgress * parts.length;
  const from = Math.min(Math.floor(raw), parts.length - 1);

  if (from >= parts.length - 1) {
    return parts.length - 1;
  }

  const local = raw - from;

  return local >= STEP_SNAP_THRESHOLD ? from + 1 : from;
}

function getStoryHeaderOffset() {
  if (typeof window === 'undefined') {
    return STORY_HEADER_OFFSET;
  }

  return window.matchMedia('(min-width: 1024px)').matches ? STORY_HEADER_OFFSET_LG : STORY_HEADER_OFFSET;
}

function StepIndicator({ activeStep, progress }: { activeStep: number; progress: number }) {
  const barFill = clamp(Math.round(progress * 100) / 100, 0, 1);

  return (
    <div className="mb-10 flex flex-wrap items-center gap-x-5 gap-y-2 md:mb-12">
      {parts.map((part, index) => (
          <div key={part.label} className="flex items-center gap-2.5">
            <span
              className={cn(
                'font-mono text-xs tabular-nums tracking-wider sm:text-sm',
                index === activeStep ? 'text-foreground' : 'text-muted-foreground/50',
              )}
            >
              0{index + 1}
            </span>
            <span
              className={cn(
                'font-sans text-base font-medium sm:text-lg',
                index === activeStep ? 'text-foreground' : 'text-muted-foreground/50',
              )}
            >
              {part.label}
            </span>
            {index < parts.length - 1 ? (
              <span className="ml-2 hidden text-muted-foreground/30 sm:inline" aria-hidden>
                →
              </span>
            ) : null}
          </div>
      ))}
      <div className="relative ml-auto hidden h-px min-w-[4rem] flex-1 overflow-hidden bg-border sm:block">
        <div
          className="h-full w-full origin-left bg-primary transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{ transform: `scaleX(${barFill})` }}
        />
      </div>
    </div>
  );
}

function StepCopy({ part }: { part: (typeof parts)[number] }) {
  return (
    <div className="min-w-0 space-y-4 md:space-y-5">
      <h3 className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
        {part.label}
      </h3>
      <p className="max-w-xl text-pretty font-sans text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-[32px] lg:text-2xl lg:leading-[36px]">
        {part.label === 'Run' ? (
          <>
            Your application calls{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">agent.run()</code>
            , and the runtime executes the manifest, mediates every tool call, and enforces every limit.
          </>
        ) : (
          part.body
        )}
      </p>
    </div>
  );
}

function stepIllustrationIsActive(label: string, activeStep: number) {
  if (label === 'Declared') {
    return activeStep === 0;
  }
  if (label === 'Deployed') {
    return activeStep === 1;
  }
  if (label === 'Run') {
    return activeStep === 2;
  }
  return false;
}

function StepIllustration({
  part,
  isActive,
}: {
  part: (typeof parts)[number];
  isActive: boolean;
}) {
  const fillHeight = 'fillHeight' in part && part.fillHeight;

  return (
    <div
      className={cn(
        stepShell,
        fillHeight && 'flex h-full min-h-[min(36rem,calc(100svh-14rem))] flex-col justify-stretch lg:min-h-[calc(100svh-18rem)]',
      )}
    >
      {part.illustration === 'declared-animation' ? (
        <DeclaredStepIllustration active={isActive} />
      ) : part.illustration === 'deploy-animation' ? (
        <DeployedStepIllustration active={isActive} />
      ) : (
        <RunStepIllustration active={isActive} />
      )}
    </div>
  );
}

export function ThreePartsScrollStory() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [barProgress, setBarProgress] = useState(0);

  useEffect(() => {
    const updateActiveStep = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) {
        return;
      }

      const containerTop = window.scrollY + container.getBoundingClientRect().top;
      const scrollStart = containerTop - getStoryHeaderOffset();
      const scrolled = window.scrollY - scrollStart;
      const progress = clamp(scrolled / track.offsetHeight, 0, 1);
      const nextActiveStep = mapScrollToActiveStep(progress);
      const nextBarProgress = Math.round(mapScrollToBarProgress(progress) * 100) / 100;

      setActiveStep((current) => (current === nextActiveStep ? current : nextActiveStep));
      setBarProgress((current) => (current === nextBarProgress ? current : nextBarProgress));
    };

    updateActiveStep();
    window.addEventListener('scroll', updateActiveStep, { passive: true });
    window.addEventListener('resize', updateActiveStep);

    return () => {
      window.removeEventListener('scroll', updateActiveStep);
      window.removeEventListener('resize', updateActiveStep);
    };
  }, []);

  const activePart = parts[activeStep];
  const snap = reduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div ref={containerRef} className="relative mt-10 min-w-0 w-full">
      <div className="sticky top-20 z-10 flex min-h-[calc(100svh-5rem)] w-full flex-col justify-center bg-background py-8 lg:top-24 lg:min-h-[calc(100svh-6rem)] lg:py-10">
        <div className="mx-auto w-full max-w-[1024px] px-5 md:px-8">
          <StepIndicator activeStep={activeStep} progress={barProgress} />
        </div>

        <div className="relative grid min-h-0 w-full flex-1 grid-cols-1 items-stretch gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-14 xl:gap-16">
          <div className="relative min-h-[min(36rem,calc(100svh-14rem))] min-w-0 px-5 md:px-8 lg:min-h-[calc(100svh-18rem)] lg:px-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePart.label}
                className="absolute inset-0 h-full min-w-0"
                initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: 16 }}
                transition={snap}
              >
                <StepIllustration
                  part={activePart}
                  isActive={stepIllustrationIsActive(activePart.label, activeStep)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex min-h-[min(36rem,calc(100svh-14rem))] min-w-0 items-center px-5 md:px-8 lg:min-h-[calc(100svh-18rem)] lg:pl-0 lg:pr-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePart.label}
                className="absolute inset-y-0 left-0 right-0 flex min-w-0 items-center px-5 md:px-8 lg:pl-0 lg:pr-[calc(2rem+max(0px,(min(100vw,1077px)-1024px)/2))]"
                initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
                transition={snap}
              >
                <StepCopy part={activePart} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        aria-hidden
        className="relative"
        style={{ height: `${STORY_TRACK_SVH}svh` }}
      />
    </div>
  );
}
