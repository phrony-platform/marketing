'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, LoaderCircle, Play, Terminal } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import {
  stepIllustrationBody,
  stepIllustrationBodyPrimary,
  stepIllustrationChip,
  stepIllustrationChipIcon,
  stepIllustrationChipLabel,
  stepIllustrationMuted,
  stepIllustrationNode,
  stepIllustrationNodeIcon,
  stepIllustrationPanelPad,
  stepPanel,
  stepTypeCursor,
} from '@/components/blocks/step-illustration-ui';
import { CodeMuted, CodePrompt, StepHighlight } from '@/components/code-panel-illustration';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

const TYPE_MS = 26;
const RUN_MS = 750;
const BETWEEN_CMD_MS = 450;

const COMMANDS = [
  {
    command: 'phrony agents publish agent.yaml',
    lines: [{ kind: 'success' as const, text: 'bank/payment-assistant@2.0.0' }],
    variant: 'neutral' as const,
  },
  {
    command: 'phrony agents deploy bank/payment-assistant@2.0.0',
    lines: [
      { kind: 'success' as const, text: 'deployed bank/payment-assistant@2.0.0' },
      { kind: 'policy' as const },
    ],
    variant: 'deploy' as const,
  },
  {
    command: 'phrony agents retire bank/payment-assistant@1.0.0',
    lines: [{ kind: 'retired' as const, text: 'retired bank/payment-assistant@1.0.0' }],
    variant: 'retire' as const,
  },
] as const;

type CmdLine = (typeof COMMANDS)[number]['lines'][number];

type CommandViewState = {
  typedLen: number;
  running: boolean;
  revealedLines: number;
  complete: boolean;
};

const fade = { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };

function DeployChip({ label }: { label: string }) {
  return (
    <div className={cn(stepIllustrationChip, 'right-0 top-0')}>
      <span className={stepIllustrationChipIcon}>
        <Play className="size-4 sm:size-[18px]" strokeWidth={1.75} aria-hidden />
      </span>
      <span className={stepIllustrationChipLabel}>{label}</span>
    </div>
  );
}

function OutputLine({ line }: { line: CmdLine }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={fade}
      className={cn(
        'leading-relaxed',
        stepIllustrationBody,
        line.kind === 'policy' && 'pl-6 sm:pl-7',
      )}
    >
      <CodeMuted>→ </CodeMuted>
      {line.kind === 'success' || line.kind === 'retired' ? (
        <StepHighlight>{line.text}</StepHighlight>
      ) : null}
      {line.kind === 'policy' ? (
        <>
          <CodeMuted>   policy </CodeMuted>
          <StepHighlight>large-payment-approval</StepHighlight>
          <CodeMuted> active</CodeMuted>
        </>
      ) : null}
    </motion.p>
  );
}

function CommandBlock({
  command,
  state,
  variant,
  active,
}: {
  command: string;
  state: CommandViewState;
  variant: (typeof COMMANDS)[number]['variant'];
  active: boolean;
}) {
  const partial = command.slice(0, state.typedLen);
  const typing = active && state.typedLen < command.length;
  const isDeploy = variant === 'deploy';
  const isRetire = variant === 'retire';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={fade}
      className={cn(
        stepPanel,
        stepIllustrationPanelPad,
        isDeploy && 'border-l-2 border-l-foreground/30',
        isRetire && 'border-l-2 border-l-muted-foreground/50',
        state.complete && variant === 'neutral' && 'opacity-80',
      )}
    >
      <div className="flex items-start gap-4">
        <span
          className={cn(
            'mt-0.5 flex shrink-0 items-center justify-center rounded-sm border bg-background',
            stepIllustrationNode,
            state.complete
              ? 'border-border text-foreground/75'
              : active
                ? 'border-foreground/30 text-foreground'
                : 'border-border/70 text-muted-foreground/50',
          )}
        >
          {state.complete ? (
            <CheckCircle2 className={stepIllustrationNodeIcon} strokeWidth={1.75} aria-hidden />
          ) : state.running ? (
            <LoaderCircle className={cn(stepIllustrationNodeIcon, 'animate-spin motion-reduce:animate-none')} strokeWidth={1.75} aria-hidden />
          ) : (
            <Terminal className={stepIllustrationNodeIcon} strokeWidth={1.75} aria-hidden />
          )}
        </span>

        <div className="min-w-0 flex-1 space-y-2.5 sm:space-y-3">
          <p className={stepIllustrationBodyPrimary}>
            <CodePrompt>$ </CodePrompt>
            {partial}
            {typing ? <span className={stepTypeCursor} /> : null}
          </p>

          {state.running ? (
            <div className="flex items-center gap-2.5 py-0.5">
              <Spinner className="size-4 text-muted-foreground motion-reduce:animate-none sm:size-[18px]" />
              <span className={stepIllustrationMuted}>Running…</span>
            </div>
          ) : null}

          <AnimatePresence>
            {COMMANDS.find((c) => c.command === command)?.lines
              .slice(0, state.revealedLines)
              .map((line, index) => (
                <OutputLine key={`${command}-${index}`} line={line} />
              ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function emptyStates(): CommandViewState[] {
  return COMMANDS.map(() => ({
    typedLen: 0,
    running: false,
    revealedLines: 0,
    complete: false,
  }));
}

function completeStates(): CommandViewState[] {
  return COMMANDS.map((cmd) => ({
    typedLen: cmd.command.length,
    running: false,
    revealedLines: cmd.lines.length,
    complete: true,
  }));
}

export function DeployedStepIllustration({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  const [states, setStates] = useState<CommandViewState[]>(emptyStates);
  const [activeIndex, setActiveIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!active) {
      setStates(emptyStates());
      setActiveIndex(0);
      setFinished(false);
      return;
    }

    if (reduceMotion) {
      setStates(completeStates());
      setActiveIndex(COMMANDS.length);
      setFinished(true);
      return;
    }

    let alive = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const delay = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(() => {
          timer = null;
          resolve();
        }, ms);
      });

    const patchState = (index: number, patch: Partial<CommandViewState>) => {
      setStates((current) =>
        current.map((state, i) => (i === index ? { ...state, ...patch } : state)),
      );
    };

    void (async () => {
      setStates(emptyStates());
      setActiveIndex(0);
      setFinished(false);

      for (let cmdIndex = 0; cmdIndex < COMMANDS.length && alive; cmdIndex++) {
        const { command, lines } = COMMANDS[cmdIndex]!;
        setActiveIndex(cmdIndex);

        for (let i = 1; i <= command.length && alive; i++) {
          patchState(cmdIndex, { typedLen: i });
          await delay(TYPE_MS);
        }

        if (!alive) {
          return;
        }

        patchState(cmdIndex, { running: true });
        await delay(RUN_MS);

        if (!alive) {
          return;
        }

        patchState(cmdIndex, { running: false });

        for (let line = 1; line <= lines.length && alive; line++) {
          patchState(cmdIndex, { revealedLines: line });
          await delay(180);
        }

        if (!alive) {
          return;
        }

        patchState(cmdIndex, { complete: true });
        await delay(BETWEEN_CMD_MS);
      }

      if (!alive) {
        return;
      }

      setActiveIndex(COMMANDS.length);
      setFinished(true);
    })();

    return () => {
      alive = false;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [active, reduceMotion]);

  const visibleCount = finished ? COMMANDS.length : activeIndex + 1;

  return (
    <div className="relative min-w-0 pt-12 sm:pt-14" aria-hidden>
      <DeployChip label={finished ? 'Deployed' : 'Deploying'} />

      <div className="space-y-4 sm:space-y-5">
        {COMMANDS.slice(0, visibleCount).map((cmd, index) => (
          <CommandBlock
            key={cmd.command}
            command={cmd.command}
            state={states[index]!}
            variant={cmd.variant}
            active={!finished && index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
