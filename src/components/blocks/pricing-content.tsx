import { Check } from 'lucide-react';

import { bookDemoUrl } from '@/lib/cockpit-url';

import { PricingPlanCards } from '@/components/blocks/pricing-plan-cards';

const bodyClass =
  'text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[28px]';

const tiers = [
  { id: 'free', name: 'Free', priceLine: 'Free', priceDetail: 'No credit card' },
  { id: 'premium', name: 'Premium', priceLine: '€29', priceDetail: 'per month · single user' },
  { id: 'business', name: 'Business', priceLine: '€25', priceDetail: 'per seat / month' },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceLine: 'Contact us',
    priceDetail: 'Self-hosted in your cloud · data sovereignty',
  },
] as const;

type TierId = (typeof tiers)[number]['id'];

const featureRows: ({
  feature: string;
} & Record<TierId, string>)[] = [
  {
    feature: 'Sessions/month',
    free: '500',
    premium: '2,000',
    business: '5,000',
    enterprise: 'Per license (self-hosted)',
  },
  {
    feature: 'Session overage',
    free: '—',
    premium: '€0.03 / session',
    business: '€0.02 / session',
    enterprise: 'Negotiated',
  },
  {
    feature: 'Agents',
    free: '2',
    premium: 'Unlimited',
    business: 'Unlimited',
    enterprise: 'Per license tier',
  },
  {
    feature: 'Users',
    free: '1',
    premium: '1',
    business: 'Per seat (€25 / seat / month)',
    enterprise: 'Per license tier',
  },
  {
    feature: 'LLM providers',
    free: '1',
    premium: '10',
    business: 'Unlimited',
    enterprise: 'No limit',
  },
  {
    feature: 'Tool calls per run',
    free: '6',
    premium: '16',
    business: '32',
    enterprise: 'Configurable',
  },
  {
    feature: 'Max active session time',
    free: '1 hour',
    premium: '6 hours',
    business: 'Unlimited',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Agent wait budget (per session)',
    free: '5 minutes',
    premium: '48 hours',
    business: '7 days',
    enterprise: 'Per license (typical: Business)',
  },
  {
    feature: 'Custom HTTP integrations',
    free: '0',
    premium: '20',
    business: 'Unlimited',
    enterprise: '✓',
  },
  {
    feature: 'Built-in integrations',
    free: '2',
    premium: 'Unlimited',
    business: 'Unlimited',
    enterprise: 'Per license tier',
  },
  {
    feature: 'Built-in integration calls',
    free: '50 / period',
    premium: '10,000 / period; +10k packs €4.99 each (stackable)',
    business: '50,000 / period; +10k packs €4.99 each (stackable)',
    enterprise: 'Negotiated',
  },
  {
    feature: 'API triggers',
    free: '—',
    premium: '✓',
    business: '✓',
    enterprise: '✓',
  },
  {
    feature: 'Scheduled triggers',
    free: '—',
    premium: '✓ (max 20)',
    business: '✓ (max 100)',
    enterprise: '✓ (no cap)',
  },
  {
    feature: 'Inline checker (L1)',
    free: '✓',
    premium: '✓',
    business: '✓',
    enterprise: '✓',
  },
  {
    feature: 'Async Firewall (L1+L2)',
    free: '—',
    premium: 'Add-on (€99 / period)',
    business: 'Add-on (€99 / period)',
    enterprise: '✓',
  },
  {
    feature: 'Alerts',
    free: '—',
    premium: 'Unlimited',
    business: 'Unlimited',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Multi-agent',
    free: '—',
    premium: '✓ (3 sub, depth 2)',
    business: '✓ (5 sub, depth 3)',
    enterprise: '✓',
  },
  { feature: 'HITL', free: '✓', premium: '✓', business: '✓', enterprise: '✓' },
  { feature: 'AITL', free: '—', premium: '✓', business: '✓', enterprise: '✓' },
  {
    feature: 'RBAC roles',
    free: 'Owner',
    premium: '3 roles',
    business: 'All 4 roles',
    enterprise: 'All 4 roles',
  },
  {
    feature: 'Deployment',
    free: 'SaaS',
    premium: 'SaaS',
    business: 'SaaS',
    enterprise: 'Self-hosted',
  },
  {
    feature: 'Support',
    free: 'Email + Discord',
    premium: 'Email + Discord',
    business: 'Email + Discord',
    enterprise: 'Dedicated + SLA',
  },
  {
    feature: 'Agent Architect',
    free: '—',
    premium: '—',
    business: '—',
    enterprise: 'Sales-led SKU (quote)',
  },
];

function CellContent({ value }: { value: string }) {
  if (value === '✓') {
    return (
      <span className="inline-flex justify-center" aria-label="Included">
        <Check className="size-4 text-emerald-500/90" strokeWidth={2.25} aria-hidden />
      </span>
    );
  }
  if (value === '—') {
    return <span className="text-muted-foreground/60">—</span>;
  }
  return <span className="text-foreground/95">{value}</span>;
}

const thFeature =
  'sticky left-0 z-20 w-[min(42%,240px)] min-w-[140px] border-b border-border border-r border-border bg-muted/25 px-4 py-6 text-left align-bottom sm:px-5';
const thTierBase =
  'border-b border-border px-3 py-6 text-center align-bottom sm:px-5';
const thTierFree = 'border-r border-border';
const thTierBusiness = 'border-x border-border/80 bg-muted/20';

const tdFeature =
  'sticky left-0 z-10 border-b border-border border-r border-border bg-background px-4 py-3.5 text-left text-sm font-normal leading-snug text-muted-foreground group-hover:bg-muted/15 sm:px-5 sm:py-4';
const tdValueBase =
  'border-b border-border px-3 py-3.5 text-center text-sm leading-snug sm:px-5 sm:py-4';
const tdFreeCol = 'border-r border-border';
const tdBusinessCol = 'border-x border-border/80 bg-muted/10 group-hover:bg-muted/25';

export function PricingContent() {
  return (
    <section className="relative bg-background py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1100px] px-5 md:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Plans &amp; limits
        </p>
        <h1 className="mt-3 max-w-2xl text-balance font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
          Pricing for declared, governed agents
        </h1>

        <p className={`mt-5 max-w-2xl ${bodyClass}`}>
          Compare capacity, governance, and deployment across tiers. Open-core runtime for development; managed SaaS
          for teams getting started; Enterprise self-hosted for regulated organizations that need data sovereignty.
        </p>

        <div className="mt-10 -mx-5 md:-mx-8">
          <PricingPlanCards />
        </div>

        <div
          id="pricing-full-matrix"
          className="mt-0 -mx-5 scroll-mt-24 px-5 pt-6 md:-mx-8 md:px-8 md:scroll-mt-28"
        >
          <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
            Full capability matrix
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Every feature and limit in one place, column by column. Active session time is how long agents can work
            in a session excluding completed built-in waits; the agent wait budget is the total scheduled wait time
            allowed in one session.
          </p>

          <div className="mt-8 -mx-5 overflow-x-auto md:-mx-8 md:px-0">
            <div className="inline-block min-w-full px-5 md:px-0">
              <div className="overflow-hidden border border-border bg-card/40 shadow-sm ring-1 ring-white/5">
                <table className="w-full min-w-[720px] border-collapse text-foreground">
                <thead>
                  <tr className="bg-muted/15">
                    <th scope="col" className={`${thFeature} py-4! align-middle`}>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Capability
                      </span>
                    </th>
                    {tiers.map((tier) => (
                      <th
                        key={tier.id}
                        scope="col"
                        className={`${thTierBase} py-4! align-middle ${tier.id === 'free' ? thTierFree : ''} ${tier.id === 'business' ? thTierBusiness : ''}`}
                      >
                        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {tier.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map((row) => (
                    <tr key={row.feature} className="group transition-colors hover:bg-muted/15">
                      <th scope="row" className={tdFeature}>
                        {row.feature}
                      </th>
                      {tiers.map((tier) => (
                        <td
                          key={tier.id}
                          className={`${tdValueBase} ${tier.id === 'free' ? tdFreeCol : ''} ${tier.id === 'business' ? tdBusinessCol : ''}`}
                        >
                          <CellContent value={row[tier.id]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Need self-hosted deployment in your VPC, a custom SLA, or help with regulator-facing evidence? Our team
            can align an Enterprise agreement to your procurement process.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <a
              href={bookDemoUrl()}
              className="inline-flex shrink-0 items-center justify-center rounded-md bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Book a demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
