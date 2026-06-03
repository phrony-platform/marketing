import { ArrowRight } from 'lucide-react';

import {
  HealthcareDiagramAdverseEvent,
  HealthcareDiagramClinicalDocs,
  HealthcareDiagramRegulatory,
  HealthcareDiagramTriage,
  HealthcareHeroComparison,
} from '@/components/blocks/healthcare-diagrams';
import { cockpitUrl } from '@/lib/cockpit-url';
import { sectorUseCaseSectionClassName } from '@/lib/sector-use-case-section';

const bodyClass =
  'text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[24.25px]';

const useCaseGrid =
  'grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-10 lg:gap-12';

export function HealthcareContent() {
  return (
    <section className="relative bg-background py-12 md:py-16">
      <div className="mx-auto w-full px-5 md:px-8">
        <h1 className="max-w-4xl text-balance font-sans text-4xl font-bold tracking-tight text-[rgba(250,250,250,1)] sm:text-5xl md:text-[2.75rem] md:leading-[1.12] lg:text-[60px] lg:leading-[58.36px]">
          AI in healthcare, in your control.
        </h1>

        <p className={`mt-5 max-w-2xl ${bodyClass}`}>
          Healthcare teams already know what they want agents to do — the question is how to deploy
          them safely across patient data. Phrony is the answer: explicit control surfaces for what
          each agent can access, what it can decide, and where clinicians stay in the loop.
        </p>

        <HealthcareHeroComparison className="mt-10" />

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0">
              <HealthcareDiagramClinicalDocs />
            </div>
            <div className="min-w-0">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Clinical Documentation &amp; Coding
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                An agent that reasons across clinical notes, lab results, and diagnosis history to
                generate accurate documentation and billing codes - with every output traceable to the
                exact data inputs that produced it. Reduces documentation burden without reducing
                accountability.
              </p>
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0 md:order-1">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Patient Triage Support
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Deploy a triage support agent that pulls patient history, flags risk indicators, and
                surfaces a structured recommendation for clinical staff - with Phrony&apos;s HITL
                layer ensuring a human makes the final call for high-stakes decisions. The agent gets
                the right information in front of the right person faster. The clinician decides.
              </p>
            </div>
            <div className="min-w-0 md:order-2">
              <HealthcareDiagramTriage />
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0">
              <HealthcareDiagramRegulatory />
            </div>
            <div className="min-w-0">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Regulatory &amp; Trial Submissions
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Agents that assemble pharmacovigilance reports and regulatory filings by pulling from
                trial data, validating completeness, and flagging gaps before submission. Every data
                source accessed and every validation step logged - so audit responses are
                straightforward.
              </p>
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0 md:order-1">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Adverse Event Monitoring
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                A continuously running agent that monitors safety signals across patient populations,
                cross-references databases, and surfaces alerts that require human review - with
                anomaly detection catching the unexpected before it becomes an incident.
              </p>
            </div>
            <div className="min-w-0 md:order-2">
              <HealthcareDiagramAdverseEvent />
            </div>
          </div>
        </section>

        <div className="mt-10">
          <a
            href={cockpitUrl('/signup')}
            className="group inline-flex origin-center items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-[background-color,scale] duration-500 ease-out hover:scale-105 hover:bg-primary/90 motion-reduce:transition-colors motion-reduce:hover:scale-100"
          >
            Explore Phrony for Healthcare
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
