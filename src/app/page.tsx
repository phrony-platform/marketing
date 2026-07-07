import { AgentControlsSection } from '@/components/blocks/agent-controls-section';
import { OpenSourceSection } from '@/components/blocks/open-source-section';
import { ThreePartsSection } from '@/components/blocks/three-parts-section';
import { Hero } from '@/components/hero';
import { MarketingShell } from '@/components/marketing-shell';

export default function HomePage() {
  return (
    <MarketingShell>
      <Hero />
      <AgentControlsSection />
      <ThreePartsSection />
      <OpenSourceSection />
    </MarketingShell>
  );
}
