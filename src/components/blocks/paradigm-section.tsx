import { SectionContainer, SectionEyebrow, SectionSurface } from '@/components/ui/section-surface';

export function ParadigmSection() {
  return (
    <SectionSurface variant="muted" id="paradigm" className="border-t border-border/60 scroll-mt-24">
      <SectionContainer>
        <div className="py-12 md:py-16 lg:py-20">
          <SectionEyebrow>The paradigm</SectionEyebrow>
          <h2 className="mt-3 max-w-2xl text-balance font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-[1.9rem] md:leading-[1.15]">
            Agents outgrew the code they were born in
          </h2>

          <p className="mt-8 max-w-3xl text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[28px]">
            Every agent starts small: a prompt, a few tools, some glue inside an app. That&apos;s the right shape for a
            helper inside a feature. But the agents teams ship now have grown up — many tools, real budgets, escalation
            paths, humans in the loop, and constant change. The thing you care about is no longer a function. It&apos;s an
            entity. Code is the wrong place to keep it.
          </p>
        </div>
      </SectionContainer>
    </SectionSurface>
  );
}
