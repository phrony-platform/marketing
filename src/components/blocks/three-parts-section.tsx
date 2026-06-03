import { ThreePartsScrollStory } from '@/components/blocks/three-parts-grid';
import { SectionContainer, SectionEyebrow, SectionSurface } from '@/components/ui/section-surface';

export function ThreePartsSection() {
  return (
    <SectionSurface variant="default" id="how-it-works" className="border-t border-border/60">
      <SectionContainer>
        <div className="pt-12 pb-6 md:pt-16 md:pb-8 lg:pt-20 lg:pb-10">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="mt-3 max-w-2xl text-balance font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-[1.9rem] md:leading-[1.15]">
            Declare it. Deploy it. Run it.
          </h2>

          <p className="mt-8 max-w-3xl text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[28px]">
            Phrony treats an agent as a first-class primitive — the way you already treat services and infrastructure.
          </p>
        </div>
      </SectionContainer>

      <ThreePartsScrollStory />

      <SectionContainer>
        <div className="pb-12 md:pb-16 lg:pb-20">
          <p className="mt-10 max-w-3xl text-pretty font-sans text-base leading-relaxed text-muted-foreground md:mt-12 md:text-lg md:leading-[28px]">
            Technically, this gives you one place where agent behavior is decided. For governance, it means every action
            passes through a single enforcement and evidence point — by construction, not by convention.
          </p>
        </div>
      </SectionContainer>
    </SectionSurface>
  );
}
