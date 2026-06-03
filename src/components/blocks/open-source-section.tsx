import { ArrowRight, BookOpen, Github } from 'lucide-react';
import Link from 'next/link';

import { SectionContainer, SectionSurface } from '@/components/ui/section-surface';
import { documentationHref } from '@/lib/docs-url';
import { RUNTIME_GITHUB_REPO, RUNTIME_GITHUB_URL } from '@/lib/project-urls';

const points = [
  {
    title: 'Open specification',
    body: 'The manifest schema, policy model, runtime contract, and trace format are open. Anyone can implement a conformant runtime. Manifests are portable.',
  },
  {
    title: 'Open-source runtime',
    body: 'The reference implementation is on GitHub. Run it locally with Docker, validate manifests, deploy agents, and drive sessions with the operator CLI.',
  },
  {
    title: 'What the runtime handles',
    body: 'Session lifecycle, the model loop, tool dispatch, policy enforcement, limits, human-in-the-loop pauses, and structured traces — so you do not rebuild that stack in every service.',
  },
] as const;

export function OpenSourceSection() {
  return (
    <SectionSurface variant="muted" id="open-source" className="border-t border-border/60">
      <SectionContainer>
        <div className="py-12 md:py-16 lg:py-20">
          <h2 className="max-w-xl text-balance font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-[1.9rem] md:leading-[1.15]">
            Built to be adopted, not locked in
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Phrony is offered as a methodology and a runtime you can run yourself. The spec is the standard; the
            open-source project is the reference implementation.
          </p>

          <ul className="mt-10 max-w-2xl space-y-8 border-l border-border/60 pl-5">
            {points.map(({ title, body }) => (
              <li key={title}>
                <p className="font-sans text-base font-semibold tracking-tight text-foreground md:text-[1.05rem]">
                  {title}
                </p>
                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                  {body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={RUNTIME_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Github className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
              {RUNTIME_GITHUB_REPO}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
            <Link
              href={documentationHref}
              className="group inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <BookOpen className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
              Documentation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </SectionContainer>
    </SectionSurface>
  );
}
