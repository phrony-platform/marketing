import { ArrowRight } from 'lucide-react';

import {
  FinancialDiagramAml,
  FinancialDiagramCredit,
  FinancialDiagramKyc,
  FinancialDiagramReporting,
  FinancialServicesHeroComparison,
} from '@/components/blocks/financial-services-diagrams';
import { cockpitUrl } from '@/lib/cockpit-url';
import { sectorUseCaseSectionClassName } from '@/lib/sector-use-case-section';

const bodyClass =
  'text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[24.25px]';

const useCaseGrid =
  'grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-10 lg:gap-12';

export function FinancialServicesContent() {
  return (
    <section className="relative bg-background py-12 md:py-16">
      <div className="mx-auto w-full px-5 md:px-8">
        <h1 className="max-w-4xl text-balance font-sans text-4xl font-bold tracking-tight text-[rgba(250,250,250,1)] sm:text-5xl md:text-[2.75rem] md:leading-[1.12] lg:text-[60px] lg:leading-[58.36px]">
          KYC in minutes. Fraud caught before it clears. Loan decisions without a committee.
        </h1>

        <p className={`mt-5 max-w-2xl ${bodyClass}`}>
          Most banks are still running these on manual processes or brittle workflows that break the
          moment a case gets complex. Phrony lets you replace that - deploy real agents for your most
          critical financial processes, in one platform, compliant from day one.
        </p>

        <FinancialServicesHeroComparison className="mt-10" />

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0">
              <FinancialDiagramKyc />
            </div>
            <div className="min-w-0">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                KYC &amp; Customer Onboarding
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                An agent that pulls identity documents, cross-references sanctions lists, assesses
                risk, and produces a structured onboarding decision - in minutes, not days. Phrony
                orchestrates the whole process: what data the agent accesses, what it can decide
                autonomously, where it escalates for human review, and a complete audit trail of every
                step.
              </p>
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0 md:order-1">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                AML &amp; Fraud Detection
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Deploy a multi-agent system where one agent monitors transactions in real time, a
                second cross-references behavioral history, and a third assesses contextual risk
                signals - all coordinated through Phrony&apos;s orchestration layer. No fragile API
                chains. No black-box outputs. Every decision logged.
              </p>
            </div>
            <div className="min-w-0 md:order-2">
              <FinancialDiagramAml />
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0">
              <FinancialDiagramCredit />
            </div>
            <div className="min-w-0">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Credit Risk &amp; Loan Decisioning
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Replace static scorecards with agents that reason dynamically across applicant data,
                market conditions, and internal credit policy. Phrony keeps them within your defined
                risk parameters and produces a full decision trail - so when a decision gets
                challenged, the answer is already documented.
              </p>
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0 md:order-1">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Regulatory Reporting
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Agents that assemble, validate, and structure DORA and Basel reports by pulling from
                internal systems - without a team of analysts stitching data together manually. Every
                data source accessed, every validation performed, logged automatically.
              </p>
            </div>
            <div className="min-w-0 md:order-2">
              <FinancialDiagramReporting />
            </div>
          </div>
        </section>

        <div className="mt-10">
          <a
            href={cockpitUrl('/signup')}
            className="group inline-flex origin-center items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-[background-color,scale] duration-500 ease-out hover:scale-105 hover:bg-primary/90 motion-reduce:transition-colors motion-reduce:hover:scale-100"
          >
            Deploy your first financial agent
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
