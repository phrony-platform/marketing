import { ArrowRight } from 'lucide-react';

import {
  InsuranceDiagramClaims,
  InsuranceDiagramInvestigation,
  InsuranceDiagramSupport,
  InsuranceDiagramUnderwriting,
  InsuranceHeroComparison,
} from '@/components/blocks/insurance-diagrams';
import { cockpitUrl } from '@/lib/cockpit-url';
import { sectorUseCaseSectionClassName } from '@/lib/sector-use-case-section';

const bodyClass =
  'text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[24.25px]';

const useCaseGrid =
  'grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-10 lg:gap-12';

export function InsuranceContent() {
  return (
    <section className="relative bg-background py-12 md:py-16">
      <div className="mx-auto w-full px-5 md:px-8">
        <h1 className="max-w-4xl text-balance font-sans text-4xl font-bold tracking-tight text-[rgba(250,250,250,1)] sm:text-5xl md:text-[2.75rem] md:leading-[1.12] lg:text-[60px] lg:leading-[58.36px]">
          Decisions, governed.
        </h1>

        <p className={`mt-5 max-w-2xl ${bodyClass}`}>
          Insurance decisions sit between humans following checklists and rigid workflows that fail
          on edge cases. Phrony replaces both with policy-bound agents: one platform for claims,
          underwriting, and support — governed, explainable, and traceable from the first run.
        </p>

        <InsuranceHeroComparison className="mt-10" />

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0">
              <InsuranceDiagramClaims />
            </div>
            <div className="min-w-0">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Claims Decisioning
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Deploy an agent that receives an incoming claim, cross-references policy terms, checks
                fraud signals, reviews claim history, and produces an approve / reject / escalate
                decision - with the full reasoning documented. What used to take days of manual
                review runs in minutes, with every decision explainable and compliant.
              </p>
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0 md:order-1">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Underwriting
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                An underwriting agent that reasons dynamically across applicant data, risk factors,
                and market conditions - without encoding every edge case into a rigid decision tree
                that breaks on anything unexpected. Phrony keeps the agent within your risk appetite
                and logs every factor it weighted.
              </p>
            </div>
            <div className="min-w-0 md:order-2">
              <InsuranceDiagramUnderwriting />
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0">
              <InsuranceDiagramSupport />
            </div>
            <div className="min-w-0">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Customer Support (Policy-Bound)
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Deploy agents that handle complex policyholder queries by reasoning directly against
                policy documents and internal knowledge bases. They give accurate answers, escalate
                when uncertain, and never improvise outside the policies you&apos;ve defined -
                because Phrony governs what they can and can&apos;t say.
              </p>
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0 md:order-1">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Multi-Agent Claims Investigation
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                For complex claims, deploy a coordinated team: one agent assesses the claim, a second
                runs fraud detection, a third retrieves precedent cases. Phrony orchestrates them as
                a single governed session - with run trees that show exactly what each agent did and
                why.
              </p>
            </div>
            <div className="min-w-0 md:order-2">
              <InsuranceDiagramInvestigation />
            </div>
          </div>
        </section>

        <div className="mt-10">
          <a
            href={cockpitUrl('/signup')}
            className="group inline-flex origin-center items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-[background-color,scale] duration-500 ease-out hover:scale-105 hover:bg-primary/90 motion-reduce:transition-colors motion-reduce:hover:scale-100"
          >
            Deploy your first claims agent
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
