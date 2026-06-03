import { ArrowRight } from 'lucide-react';

import {
  TechnologyDiagramDevOpsAgents,
  TechnologyDiagramMultiTenant,
  TechnologyDiagramProductFeatures,
  TechnologyDiagramSalesEnablement,
  TechnologyHeroSalesCycle,
} from '@/components/blocks/technology-diagrams';
import { cockpitUrl } from '@/lib/cockpit-url';
import { sectorUseCaseSectionClassName } from '@/lib/sector-use-case-section';

const bodyClass =
  'text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[24.25px]';

const useCaseGrid =
  'grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-10 lg:gap-12';

export function TechnologyContent() {
  return (
    <section className="relative bg-background py-12 md:py-16">
      <div className="mx-auto w-full px-5 md:px-8">
        <h1 className="max-w-4xl text-balance font-sans text-4xl font-bold tracking-tight text-[rgba(250,250,250,1)] sm:text-5xl md:text-[2.75rem] md:leading-[1.12] lg:text-[60px] lg:leading-[58.36px]">
          Ship agents your enterprise customers can trust.
        </h1>

        <p className={`mt-5 max-w-2xl ${bodyClass}`}>
          Technology companies building agent-powered products are hitting a new gate: the security review. Phrony
          gives you a governed runtime your customers can evaluate — declared agents, structured evidence, and a
          deployment model that separates your application from the agent itself.
        </p>

        <TechnologyHeroSalesCycle className="mt-10" />

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0">
              <TechnologyDiagramProductFeatures />
            </div>
            <div className="min-w-0">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Agent-Powered Product Features
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Declare agents in manifests and call them from your product through the SDK. Every AI feature you
                ship comes with audit trails, policy enforcement, and structured traces — because the runtime
                produces them on every invocation, not because you wired them in.
              </p>
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0 md:order-1">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Internal Engineering &amp; DevOps Agents
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Deploy agents that automate code review, incident triage, and deployment pipelines — each declared
                in a manifest with its own tool surface, limits, and action log for your engineering org.
              </p>
            </div>
            <div className="min-w-0 md:order-2">
              <TechnologyDiagramDevOpsAgents />
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0">
              <TechnologyDiagramMultiTenant />
            </div>
            <div className="min-w-0">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Multi-Tenant SaaS Deployments
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Run isolated agent environments per customer — each with its own manifests, data access boundaries,
                and evidence logs. Build the governance once in the runtime. Deploy it for every tenant.
              </p>
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0 md:order-1">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Enterprise Sales Enablement
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Selling AI-powered products into regulated industries? Phrony&apos;s governed runtime gives your sales
                team something concrete to hand over when the security team asks — manifests, evidence architecture,
                and self-hosted deployment options.
              </p>
            </div>
            <div className="min-w-0 md:order-2">
              <TechnologyDiagramSalesEnablement />
            </div>
          </div>
        </section>

        <div className="mt-10">
          <a
            href={cockpitUrl('/signup')}
            className="group inline-flex origin-center items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-[background-color,scale] duration-500 ease-out hover:scale-105 hover:bg-primary/90 motion-reduce:transition-colors motion-reduce:hover:scale-100"
          >
            Get started with Phrony
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
