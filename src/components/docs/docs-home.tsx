'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Cpu, FileCode, Layers, Rocket } from 'lucide-react';
import Link from 'next/link';

import { DocsAudienceModal } from '@/components/docs/docs-audience-modal';
import {
  docButtonPrimary,
  docCardLink,
  docEyebrow,
  docIconBox,
  docKicker,
  docLabel,
} from '@/components/docs/doc-style';
import { DOC_EXPLORE_TABS, type DocTabId } from '@/lib/docs-navigation';
import { RUNTIME_DOCS_QUICKSTART } from '@/lib/project-urls';
import { cn } from '@/lib/utils';

type DocExploreTabId = Exclude<DocTabId, 'home'>;

const areaMeta: Record<DocExploreTabId, { icon: typeof Layers; index: string }> = {
  'quick-start': { icon: Rocket, index: '00' },
  paradigm: { icon: Layers, index: '01' },
  'agent-spec': { icon: FileCode, index: '02' },
  runtime: { icon: Cpu, index: '03' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function DocsHome() {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <DocsAudienceModal />
      <section className="border-b border-border bg-background">
        <div className="relative mx-auto max-w-[1080px] px-5 py-14 md:px-8 md:py-16 lg:py-20">
          <motion.div
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
            variants={fadeUp}
            custom={0}
          >
            <p className={docEyebrow}>Open specification · Open-source runtime</p>

            <h1 className="mt-6 max-w-xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Documentation
            </h1>
            <p className={cn(docKicker, 'mt-4 max-w-xl text-base leading-7 md:text-[15px]')}>
              Everything you need to adopt Phrony — from the paradigm and manifest schema to installing the reference
              runtime and operating agents in production.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Link href={RUNTIME_DOCS_QUICKSTART} className={docButtonPrimary}>
                Quick start
                <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-background px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-[1080px]">
          <motion.div
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
            variants={fadeUp}
            custom={0.06}
            className="max-w-2xl"
          >
            <p className={docLabel}>Explore</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Start here or go deep</h2>
            <p className={cn(docKicker, 'mt-3 text-base leading-7')}>
              Follow the quick start for a hands-on path, or read paradigm → agent spec → runtime when you want the full
              story behind manifests and the reference implementation.
            </p>
          </motion.div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
            {DOC_EXPLORE_TABS.map((tab, index) => {
              const meta = areaMeta[tab.id];
              const Icon = meta.icon;
              const pageCount = tab.groups.reduce((n, g) => n + g.pages.length, 0);

              return (
                <motion.li
                  key={tab.id}
                  initial={reduceMotion ? false : 'hidden'}
                  animate="show"
                  variants={fadeUp}
                  custom={0.1 + index * 0.06}
                  className="bg-background"
                >
                  <Link href={tab.href} className={cn(docCardLink, 'group h-full border-0 hover:bg-muted/30')}>
                    <div className="flex items-center justify-between gap-3">
                      <span className={docLabel}>{meta.index}</span>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">{pageCount} pages</span>
                    </div>

                    <span className={cn(docIconBox, 'mt-5')} aria-hidden>
                      <Icon className="size-4" strokeWidth={1.5} />
                    </span>

                    <h3 className="mt-4 text-base font-medium text-foreground">{tab.label}</h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">{tab.description}</p>

                    <span className="mt-5 inline-flex items-center gap-1 text-sm text-foreground">
                      Read docs
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-px"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
