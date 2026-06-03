import { ArrowRight } from 'lucide-react';

import {
  RetailDiagramCustomerService,
  RetailDiagramInventory,
  RetailDiagramPersonalisation,
  RetailDiagramPricing,
  RetailHeroComparison,
} from '@/components/blocks/retail-ecommerce-diagrams';
import { cockpitUrl } from '@/lib/cockpit-url';
import { sectorUseCaseSectionClassName } from '@/lib/sector-use-case-section';

const bodyClass =
  'text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[24.25px]';

const useCaseGrid =
  'grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-10 lg:gap-12';

export function RetailEcommerceContent() {
  return (
    <section className="relative bg-background py-12 md:py-16">
      <div className="mx-auto w-full px-5 md:px-8">
        <h1 className="max-w-4xl text-balance font-sans text-4xl font-bold tracking-tight text-[rgba(250,250,250,1)] sm:text-5xl md:text-[2.75rem] md:leading-[1.12] lg:text-[60px] lg:leading-[58.36px]">
          One platform. Every agent. On-brief.
        </h1>

        <p className={`mt-5 max-w-2xl ${bodyClass}`}>
          Retail teams often end up with a different AI tool for each use case — no shared
          visibility, and brand risk every time something drifts off-brief. Phrony collapses that into
          one governed surface: every agent connected, every action visible, every boundary enforced
          the same way.
        </p>

        <RetailHeroComparison className="mt-10" />

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0">
              <RetailDiagramCustomerService />
            </div>
            <div className="min-w-0">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Customer Service Agents
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Deploy agents that handle returns, order queries, and product questions — reasoning
                against your policies, applying them consistently, and escalating cleanly when a case
                needs a human. No more off-brand answers. No more inconsistent refund decisions.
              </p>
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0 md:order-1">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Personalisation &amp; Product Discovery
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                An agent that reasons across customer behaviour, purchase history, and product
                catalogue to drive personalised discovery — within the content and data-use boundaries
                you define. Phrony ensures the agent stays on-brief, every session.
              </p>
            </div>
            <div className="min-w-0 md:order-2">
              <RetailDiagramPersonalisation />
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0">
              <RetailDiagramPricing />
            </div>
            <div className="min-w-0">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Dynamic Pricing
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Agents that adjust pricing based on demand signals, inventory levels, and competitive
                data — within the margin floors and commercial rules you&apos;ve configured. They move
                fast. They don&apos;t improvise.
              </p>
            </div>
          </div>
        </section>

        <section className={sectorUseCaseSectionClassName}>
          <div className={useCaseGrid}>
            <div className="min-w-0 md:order-1">
              <h2 className="font-sans text-xl font-bold tracking-tight text-[rgba(250,250,250,1)] md:text-2xl">
                Inventory &amp; Fulfillment
              </h2>
              <p className={`mt-4 max-w-3xl ${bodyClass}`}>
                Deploy agents that monitor stock levels, predict demand, and coordinate fulfillment
                actions across warehouse systems — with anomaly detection that flags unexpected
                patterns before they become stockouts or costly overstocks.
              </p>
            </div>
            <div className="min-w-0 md:order-2">
              <RetailDiagramInventory />
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
