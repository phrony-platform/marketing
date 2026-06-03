import { ArrowRight } from 'lucide-react';

import {
  PublicSectorDiagramBenefits,
  PublicSectorDiagramCompliance,
  PublicSectorDiagramFraud,
  PublicSectorDiagramProcurement,
  PublicSectorHeroFlow,
} from '@/components/blocks/public-sector-diagrams';
import { cockpitUrl } from '@/lib/cockpit-url';
import { sectorUseCaseSectionClassName } from '@/lib/sector-use-case-section';

const bodyClass =
  'text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[24.25px]';

const useCaseGrid =
  'grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-10 lg:gap-12';

export function PublicSectorContent() {
  return (
    <section className="relative bg-background py-12 md:py-16">
      <div className="mx-auto w-full px-5 md:px-8">
        <h1 className="max-w-4xl text-balance font-sans text-4xl font-bold tracking-tight text-[rgba(250,250,250,1)] sm:text-5xl md:text-[2.75rem] md:leading-[1.12] lg:text-[60px] lg:leading-[58.36px]">
          Accountability, by construction.
        </h1>

        <p className={`mt-5 max-w-2xl ${bodyClass}`}>
          Public sector teams face the hardest version of the AI deployment challenge: every agent
          decision has to survive democratic accountability, freedom of information requests, and
          public audit. Phrony makes that accountability structural — not something you retrofit
          after the fact.
        </p>

        <PublicSectorHeroFlow className="mt-10" />

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0">
              <PublicSectorDiagramBenefits />
            </div>
            <div className="min-w-0">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Benefits &amp; Eligibility Processing
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                An agent that assesses applications against eligibility criteria, cross-references
                supporting data, and produces a structured decision - applying rules consistently
                across every case, flagging edge cases for human review. Faster processing, no
                inconsistency, full audit trail.
              </p>
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0 md:order-1">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Procurement Screening
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Deploy agents that apply consistent scoring criteria across procurement submissions -
                surfacing qualified vendors, flagging anomalies, and producing a documented
                evaluation record for every submission reviewed. Consistent, defensible, scalable.
              </p>
            </div>
            <div className="min-w-0 md:order-2">
              <PublicSectorDiagramProcurement />
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0">
              <PublicSectorDiagramFraud />
            </div>
            <div className="min-w-0">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Fraud Detection in Public Programs
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Agents that cross-reference claim data, behavioral patterns, and historical records
                to surface potential fraud for investigation. Every flag comes with the full
                reasoning trail - so investigators know exactly why a case was escalated.
              </p>
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0 md:order-1">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Policy Compliance Monitoring
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Agents that monitor internal processes for compliance with evolving legislation -
                surfacing gaps, flagging deviations, and generating structured reports for oversight
                bodies. Continuous monitoring that manual review can&apos;t match.
              </p>
            </div>
            <div className="min-w-0 md:order-2">
              <PublicSectorDiagramCompliance />
            </div>
          </div>
        </section>

        <div className="mt-10">
          <a
            href={cockpitUrl('/signup')}
            className="group inline-flex origin-center items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-[background-color,scale] duration-500 ease-out hover:scale-105 hover:bg-primary/90 motion-reduce:transition-colors motion-reduce:hover:scale-100"
          >
            Talk to us about public sector deployments
            <span
              className="relative ml-0.5 inline-flex h-6 w-6 shrink-0 overflow-hidden"
              aria-hidden
            >
              <span className="absolute inset-0 flex items-center justify-center transition-[translate] duration-500 ease-out group-hover:translate-x-full motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                <ArrowRight className="size-4" />
              </span>
              <span className="absolute inset-0 flex -translate-x-full items-center justify-center transition-[translate] duration-500 ease-out group-hover:translate-x-0 motion-reduce:hidden">
                <ArrowRight className="size-4" />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
