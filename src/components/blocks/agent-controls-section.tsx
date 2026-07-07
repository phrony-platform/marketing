import { ArrowRight, ClipboardList, FileText, RotateCcw, UserCheck, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import type { ComponentType, ReactNode } from 'react';

import {
  DeployRollbackIllustration,
  HitlIllustration,
  ManifestPoliciesIllustration,
  TracesAuditIllustration,
} from '@/components/blocks/agent-controls-illustrations';
import { SectionContainer, SectionEyebrow, SectionSurface } from '@/components/ui/section-surface';
import { cn } from '@/lib/utils';

/** gap-px hairlines — match section borders (hero, paradigm, etc.). */
const hairline = 'bg-border/60';

type ControlPoint = {
  title: string;
  body: string;
  href: string;
  Icon: LucideIcon;
  Illustration: ComponentType;
};

const controlPoints: ControlPoint[] = [
  {
    title: 'Policies',
    body: 'Tools, limits, and policy rules live in one versioned manifest — not scattered across application code. Each policy declares when it applies and what happens: allow, deny, or require approval.',
    href: '/docs/agent-spec/resources/policy',
    Icon: FileText,
    Illustration: ManifestPoliciesIllustration,
  },
  {
    title: 'Human approval',
    body: 'When a policy requires approval, the session pauses until an operator approves or rejects. Decisions are attributed, snapshotted at request time, and can be made out of band from another terminal.',
    href: '/docs/runtime/hitl',
    Icon: UserCheck,
    Illustration: HitlIllustration,
  },
  {
    title: 'Traces/audit',
    body: 'Every session emits a structured trace — model turns, tool calls, policy decisions, and approvals. Your team can replay runs; auditors get a durable record of what happened and why.',
    href: '/docs/runtime/cli/sessions',
    Icon: ClipboardList,
    Illustration: TracesAuditIllustration,
  },
  {
    title: 'Deploy/rollback',
    body: 'Manifests are published as immutable versions, then deployed to activate. Roll back to a previous version in one command — deployment history stays in the ledger.',
    href: '/docs/runtime/cli/deploy',
    Icon: RotateCcw,
    Illustration: DeployRollbackIllustration,
  },
];

const cellPad = 'bg-background px-5 py-10 md:px-8 md:py-12';

function ControlCopy({
  title,
  body,
  href,
  Icon,
}: Pick<ControlPoint, 'title' | 'body' | 'href' | 'Icon'>) {
  return (
    <Link
      href={href}
      className="group block w-full rounded-lg outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex gap-4">
        <span
          className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground transition-colors group-hover:border-border/80 group-hover:bg-muted/70 group-hover:text-foreground"
          aria-hidden
        >
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="font-sans text-lg font-semibold tracking-tight text-foreground md:text-xl">{title}</p>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base md:leading-relaxed">
            {body}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
            Read in docs
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ControlCell({ children }: { children: ReactNode }) {
  return <div className={cn('flex min-h-0 items-center', cellPad)}>{children}</div>;
}

export function AgentControlsSection() {
  return (
    <SectionSurface variant="default" id="agent-controls">
      <div className={cn('flex flex-col gap-px pt-px', hairline)}>
        <div className="bg-background">
          <SectionContainer>
            <div className="py-12 md:py-16 lg:pb-0 lg:pt-20">
              <SectionEyebrow>Control</SectionEyebrow>
              <h2 className="mt-3 max-w-2xl text-balance font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-[1.9rem] md:leading-[1.15]">
                How Phrony controls agents
              </h2>
              <p className="mt-8 max-w-3xl text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[28px]">
                The agent&apos;s reasoning stays autonomous. What Phrony structures is everything around it — policies
                in the manifest, when humans must weigh in, a durable trace of every action, and controlled deploy and
                rollback.
              </p>
            </div>
          </SectionContainer>
        </div>

        {controlPoints.map(({ title, body, href, Icon, Illustration }, index) => {
          const reverse = index % 2 === 1;

          return (
            <article
              key={title}
              className={cn(
                'grid gap-px',
                hairline,
                'max-md:flex max-md:flex-col max-md:gap-px',
                reverse && 'max-md:flex-col-reverse',
                'md:grid-cols-2',
              )}
            >
              {reverse ? (
                <>
                  <ControlCell>
                    <div className="w-full">
                      <Illustration />
                    </div>
                  </ControlCell>
                  <ControlCell>
                    <ControlCopy title={title} body={body} href={href} Icon={Icon} />
                  </ControlCell>
                </>
              ) : (
                <>
                  <ControlCell>
                    <ControlCopy title={title} body={body} href={href} Icon={Icon} />
                  </ControlCell>
                  <ControlCell>
                    <div className="w-full">
                      <Illustration />
                    </div>
                  </ControlCell>
                </>
              )}
            </article>
          );
        })}
      </div>
    </SectionSurface>
  );
}
