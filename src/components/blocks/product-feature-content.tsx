import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { EmbeddedAgentsUseCasesSection } from '@/components/blocks/embedded-agents-use-cases-section';
import { EmbeddedTypeScriptSdkSection } from '@/components/blocks/embedded-typescript-sdk-section';
import { getProductVisuals } from '@/components/blocks/product-visuals';
import { BetaPill, NewPill } from '@/components/blocks/product-visuals/_shared';
import type { ProductPageDefinition } from '@/lib/product-page-data';

const bodyClass =
  'text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[28px]';

const h2Class =
  'font-sans text-xl font-semibold tracking-tight text-foreground md:text-2xl';

/** Full width inside the bordered shell; borders/zebra span edge-to-edge. */
const productSectionClass = 'border-t border-border py-12 even:bg-muted/25';

const sectionXPad = 'px-5 md:px-8';

type Props = {
  page: ProductPageDefinition;
};

export function ProductFeatureContent({ page }: Props) {
  const visuals = getProductVisuals(page.slug);
  const { Hero, Mid, Bottom } = visuals;

  return (
    <section className="relative bg-background">
      <div className="w-full pt-8 md:pt-10">
        <div className={sectionXPad}>
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {page.eyebrow}
            </p>
            {page.isBeta ? <BetaPill /> : null}
            {page.isNew ? <NewPill /> : null}
          </div>
          <h1 className="mt-3 text-balance font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
            {page.headline}
          </h1>
          <p className={`mt-5 max-w-3xl ${bodyClass}`}>{page.subheadline}</p>
          {page.documentation != null ? (
            <div className="mt-6">
              {page.documentation.href.startsWith('http') ? (
                <a
                  href={page.documentation.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {page.documentation.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </a>
              ) : (
                <Link
                  href={page.documentation.href}
                  className="group inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {page.documentation.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              )}
            </div>
          ) : null}
        </div>

        {Hero != null ? (
          <div className="mt-10 w-full">
            <Hero />
          </div>
        ) : null}

        {page.sections.map((section, index) => {
          const isLast = index === page.sections.length - 1;
          return (
            <div key={section.title}>
              <section
                className={`${productSectionClass} ${sectionXPad} ${index === 0 && Hero == null ? 'mt-12' : ''}`}
              >
                <h2 className={h2Class}>{section.title}</h2>
                {section.paragraphs?.map((p, pi) => (
                  <p key={`${section.title}-p-${pi}`} className={`mt-4 max-w-3xl ${bodyClass}`}>
                    {p}
                  </p>
                ))}
                {section.bullets != null && section.bullets.length > 0 ? (
                  <ul className="mt-4 max-w-3xl space-y-3">
                    {section.bullets.map((item, bi) => (
                      <li
                        key={`${section.title}-b-${bi}`}
                        className={`relative pl-5 ${bodyClass} before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-muted-foreground/50`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>

              {/* Mid visual sits between "What Phrony does" (index 1) and "What you get" (index 2). */}
              {Mid != null && index === 1 ? (
                <div className="w-full border-t border-border bg-background pt-12">
                  <Mid />
                </div>
              ) : null}

              {/* Bottom visual sits after the last section, before the CTA. */}
              {Bottom != null && isLast ? (
                <div className="w-full border-t border-border bg-background pt-12">
                  <Bottom />
                </div>
              ) : null}
            </div>
          );
        })}

        {page.slug === 'embedded-agents' ? <EmbeddedTypeScriptSdkSection /> : null}
        {page.slug === 'embedded-agents' ? <EmbeddedAgentsUseCasesSection /> : null}

        {page.cta != null ? (
          <div className={`mt-12 ${sectionXPad}`}>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-medium text-foreground">
              {page.cta.href.startsWith('http') ? (
                <a
                  href={page.cta.href}
                  className="group inline-flex items-center gap-2 underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  {page.cta.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </a>
              ) : (
                <Link
                  href={page.cta.href}
                  className="group inline-flex items-center gap-2 underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  {page.cta.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              )}
              {page.ctaSecondary != null ? (
                <>
                  <span className="text-muted-foreground" aria-hidden>
                    &middot;
                  </span>
                  {page.ctaSecondary.href.startsWith('http') ? (
                    <a
                      href={page.ctaSecondary.href}
                      className="underline-offset-4 transition-colors hover:text-primary hover:underline"
                    >
                      {page.ctaSecondary.label}
                    </a>
                  ) : (
                    <Link
                      href={page.ctaSecondary.href}
                      className="underline-offset-4 transition-colors hover:text-primary hover:underline"
                    >
                      {page.ctaSecondary.label}
                    </Link>
                  )}
                </>
              ) : null}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
