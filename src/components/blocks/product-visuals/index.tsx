import type { ComponentType } from 'react';

import {
  AgentInTheLoopBottom,
  AgentInTheLoopHero,
  AgentInTheLoopMid,
} from './agent-in-the-loop';
import { FirewallBottom, FirewallHero, FirewallMid } from './firewall';
import {
  HumanInTheLoopBottom,
  HumanInTheLoopHero,
  HumanInTheLoopMid,
} from './human-in-the-loop';
import { EmbeddedAgentsHero } from './embedded-agents';
import {
  IntegrationsBottom,
  IntegrationsHero,
  IntegrationsMid,
} from './integrations';
import {
  MultiAgentSystemsBottom,
  MultiAgentSystemsHero,
  MultiAgentSystemsMid,
} from './multi-agent-systems';
import {
  ObservabilityBottom,
  ObservabilityHero,
  ObservabilityMid,
} from './observability-traceability';
import { SecurityBottom, SecurityHero, SecurityMid } from './security';

/** Per-page slots; rendered between page text in `ProductFeatureContent`. */
export type ProductPageVisuals = {
  Hero?: ComponentType;
  Mid?: ComponentType;
  Bottom?: ComponentType;
};

const productVisualsBySlug: Record<string, ProductPageVisuals> = {
  'multi-agent-systems': {
    Hero: MultiAgentSystemsHero,
    Mid: MultiAgentSystemsMid,
    Bottom: MultiAgentSystemsBottom,
  },
  'human-in-the-loop': {
    Hero: HumanInTheLoopHero,
    Mid: HumanInTheLoopMid,
    Bottom: HumanInTheLoopBottom,
  },
  'agent-in-the-loop': {
    Hero: AgentInTheLoopHero,
    Mid: AgentInTheLoopMid,
    Bottom: AgentInTheLoopBottom,
  },
  integrations: {
    Hero: IntegrationsHero,
    Mid: IntegrationsMid,
    Bottom: IntegrationsBottom,
  },
  'embedded-agents': {
    Hero: EmbeddedAgentsHero,
  },
  'observability-traceability': {
    Hero: ObservabilityHero,
    Mid: ObservabilityMid,
    Bottom: ObservabilityBottom,
  },
  firewall: {
    Hero: FirewallHero,
    Mid: FirewallMid,
    Bottom: FirewallBottom,
  },
  security: {
    Hero: SecurityHero,
    Mid: SecurityMid,
    Bottom: SecurityBottom,
  },
};

export function getProductVisuals(slug: string): ProductPageVisuals {
  return productVisualsBySlug[slug] ?? {};
}
