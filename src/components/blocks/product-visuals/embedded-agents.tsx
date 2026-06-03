'use client';

import { Bot, MessageCircle, MonitorSmartphone, Wrench, RefreshCw } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { CodeChip, visualHeading, VisualFrame } from './_shared';
import { cn } from '@/lib/utils';

const DESTINATIONS: { icon: typeof MessageCircle; label: string }[] = [
  { icon: MessageCircle, label: 'Support chat' },
  { icon: MonitorSmartphone, label: 'Mobile app' },
  { icon: Wrench, label: 'Internal tool' },
  { icon: RefreshCw, label: 'Backend workflow' },
];

function PulseDot({ index, reducedMotion }: { index: number; reducedMotion: boolean | null }) {
  return (
    <motion.span
      className="relative z-10 size-2 shrink-0 rounded-full bg-primary shadow-[0_0_10px_2px_hsl(var(--primary)/0.32)]"
      initial={false}
      animate={
        reducedMotion
          ? { opacity: 0.9 }
          : { opacity: [0.45, 1, 0.45], scale: [1, 1.12, 1] }
      }
      transition={
        reducedMotion
          ? undefined
          : {
              duration: 1.8,
              repeat: Infinity,
              delay: 0.45 + index * 0.32,
              ease: 'easeInOut',
            }
      }
      aria-hidden
    />
  );
}

function DestinationTile({ icon: Icon, label }: (typeof DESTINATIONS)[0]) {
  return (
    <div
      className={cn(
        'flex min-w-0 max-w-[200px] items-center gap-2.5 border border-white/10 bg-white/[0.04] px-2.5 py-2',
        'sm:max-w-[220px] sm:px-3',
      )}
    >
      <span
        className="flex size-7 shrink-0 items-center justify-center border border-white/10 bg-zinc-950/80 text-zinc-300"
        aria-hidden
      >
        <Icon className="size-3.5" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 text-[11px] font-medium leading-snug text-zinc-200 sm:text-[12px]">
        {label}
      </span>
    </div>
  );
}

export function EmbeddedAgentsHero() {
  const reducedMotion = useReducedMotion();

  return (
    <VisualFrame>
      <div>
        <div className="px-4 py-8 sm:px-6 sm:py-10 md:px-8">
          <p className={cn(visualHeading, 'mb-6 text-center md:text-left')}>
            <span className="inline-block rounded border border-white/8 bg-white/[0.04] px-2 py-1 text-[9px] font-medium tracking-[0.16em] text-zinc-400 sm:text-[10px]">
              Phrony Runtime
            </span>
          </p>

          <div className="flex flex-col items-stretch gap-8 md:flex-row md:items-center md:gap-0 md:pl-2">
            <div className="mx-auto w-full max-w-[min(100%,240px)] shrink-0 md:mx-0">
              <div
                className={cn(
                  'rounded-xl border border-white/10 bg-zinc-900/40 p-4 shadow-[0_0_0_1px_hsl(var(--primary)/0.18)_inset]',
                  'ring-1 ring-primary/25',
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-md border border-sky-500/25 bg-sky-500/10 text-sky-100">
                    <Bot className="size-4" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="text-[13px] font-medium tracking-tight text-zinc-100">Deployed agent</span>
                </div>
                <div className="mt-2 pl-[42px]">
                  <CodeChip>claims-reviewer &middot; v3</CodeChip>
                </div>
              </div>
            </div>

            <div className="min-w-0 flex-1 md:pl-2 md:pr-2">
              <div className="flex flex-col gap-3 sm:gap-3.5">
                {DESTINATIONS.map((d, i) => (
                  <div key={d.label} className="flex min-w-0 items-center gap-0">
                    <div
                      className="min-w-8 flex-1 md:min-w-[12px]"
                      aria-hidden
                    >
                      <div className="flex h-7 items-center pr-0">
                        <div className="h-px w-full max-w-full bg-gradient-to-r from-white/18 via-white/8 to-white/4" />
                      </div>
                    </div>
                    <div className="mr-1.5 flex w-2 shrink-0 items-center justify-center md:mx-0">
                      <PulseDot index={i} reducedMotion={reducedMotion} />
                    </div>
                    <div className="min-w-0 flex-1 md:flex-none">
                      <DestinationTile {...d} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-zinc-950/80 px-4 py-4 sm:px-6 md:px-8">
          <pre className="font-mono text-[10px] leading-relaxed text-zinc-400 sm:text-[11px]">
            <code>
              {`await phrony.agent("claims-reviewer").run({
  input: { case_id: "48219" }
})`}
            </code>
          </pre>
        </div>
      </div>
    </VisualFrame>
  );
}
