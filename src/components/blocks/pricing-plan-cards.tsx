import type { LucideIcon } from 'lucide-react';
import { Building2, Check, Layers, Monitor, Users } from 'lucide-react';

import { bookDemoUrl, cockpitUrl } from '@/lib/cockpit-url';
import { cn } from '@/lib/utils';

export type PricingPlanCardTierId = 'free' | 'premium' | 'business' | 'enterprise';

type PricingPlanCardModel = {
  tierId: PricingPlanCardTierId;
  name: string;
  /** Large price headline, e.g. "€29" or "Free". */
  priceAmount: string;
  /** Optional suffix in smaller type, e.g. " / month" or " / seat / month". */
  pricePeriod?: string;
  priceDetail: string;
  /** Optional sub-line under `priceDetail` (e.g. Free tier). */
  priceDetailLine2?: string;
  icon: LucideIcon;
  tagline: string;
  recommended?: boolean;
  /** Capacity bullets shown under Overview (each row is a checked list item). */
  overview: string[];
  /**
   * Paid tiers: `inheritsTitle` is the line above the checklist (e.g. “Everything in Free plus:”).
   * `newFeatures` are the deltas for this tier. Free has no inherits title — only core features.
   */
  inheritsTitle: string | null;
  newFeatures: string[];
};

/** Keep newFeatures aligned with `featureRows` in `pricing-content.tsx`. */
const planGlanceCards: PricingPlanCardModel[] = [
  {
    tierId: 'free',
    name: 'Free',
    priceAmount: 'Free',
    priceDetail: 'No credit card',
    priceDetailLine2: 'Get started in minutes',
    icon: Layers,
    tagline: 'For individuals and small projects',
    overview: [
      '1 user',
      '500 sessions / month',
      '2 built-in integrations · 50 calls / period',
      '1 hr max active session · 5 min agent wait / session',
    ],
    inheritsTitle: null,
    newFeatures: ['HITL & inline checks (L1)', 'Email + Discord support'],
  },
  {
    tierId: 'premium',
    name: 'Premium',
    priceAmount: '€29',
    pricePeriod: ' / month',
    priceDetail: 'Single user',
    icon: Monitor,
    tagline: 'For teams declaring and deploying agents via manifest',
    overview: [
      '2,000 sessions / month (overage €0.03 / session)',
      'Unlimited agents',
      '10 LLM providers',
      'Unlimited built-in integrations · 10,000 calls / period',
      '6 hr max active session · 48 hr agent wait / session',
    ],
    inheritsTitle: 'Everything in Free plus:',
    newFeatures: [
      'AITL & multi-agent',
      'Custom HTTP integrations (up to 20)',
      'API triggers',
      'Scheduled triggers (max 20)',
    ],
  },
  {
    tierId: 'business',
    name: 'Business',
    priceAmount: '€25',
    pricePeriod: ' / seat / month',
    priceDetail: 'Billed per active seat',
    icon: Users,
    recommended: true,
    tagline: 'For teams scaling throughput and automation',
    overview: [
      '5,000 sessions / month (overage €0.02 / session)',
      'Unlimited agents',
      'Unlimited LLM providers',
      'Unlimited built-in integrations · 50,000 calls / period',
      'Unlimited active session · 7 days agent wait / session',
    ],
    inheritsTitle: 'Everything in Premium plus:',
    newFeatures: [
      'Per-seat billing',
      'Full RBAC (4 roles)',
      'Unlimited custom HTTP integrations',
      'Higher sessions & built-in integration-call limits',
      'Scheduled triggers up to 100',
    ],
  },
  {
    tierId: 'enterprise',
    name: 'Enterprise',
    priceAmount: 'Contact us',
    priceDetail: 'Self-hosted in your cloud',
    icon: Building2,
    tagline: 'For regulated organizations that need data sovereignty',
    overview: [
      'Governed runtime deployed in your VPC — AWS, Azure, or GCP',
    ],
    inheritsTitle: 'Everything in Business plus:',
    newFeatures: [
      'Self-hosted deployment with customer-managed keys',
      'Dedicated support & SLA',
      'Compliance taxonomy, evidence export, and Cockpit consoles',
    ],
  },
];

function tierCtaHref(tierId: PricingPlanCardTierId) {
  return tierId === 'enterprise' ? bookDemoUrl() : cockpitUrl('/signup');
}

/**
 * 1px grid: each side belongs to at most one cell (no doubled seams between
 * `gap-0` cards). Breakpoints match `grid-cols-1` / `sm:grid-cols-2` / `lg:grid-cols-4`.
 */
const planCardEdgeBorders = cn(
  'border-b border-border',
  'max-sm:first:border-t max-sm:border-l max-sm:border-r',
  'sm:max-lg:[&:nth-child(-n+2)]:border-t',
  'sm:max-lg:[&:nth-child(2n+1)]:border-l',
  'sm:max-lg:[&:nth-child(2n)]:border-l sm:max-lg:[&:nth-child(2n)]:border-r',
  'lg:[&:nth-child(-n+4)]:border-t',
  'lg:border-l',
  'lg:[&:nth-child(4n)]:border-r',
);

export function PricingPlanCards() {
  return (
    <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
      {planGlanceCards.map((card) => {
        const Icon = card.icon;
        const href = tierCtaHref(card.tierId);
        return (
          <article
            key={card.tierId}
            className={cn(
              'relative flex min-h-0 flex-col rounded-none px-3 py-4 shadow-sm sm:px-3.5',
              planCardEdgeBorders,
              card.recommended
                ? 'z-1 bg-card ring-1 ring-foreground/10'
                : 'bg-muted/40',
            )}
          >
            {card.recommended ? (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-background px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-foreground shadow-sm">
                Recommended
              </span>
            ) : null}

            <div className="flex flex-col items-center text-center">
              <div
                className={`flex size-8 items-center justify-center rounded-lg border ${
                  card.recommended
                    ? 'border-foreground/15 bg-background/50'
                    : 'border-border bg-background/40'
                }`}
              >
                <Icon className="size-3.5 text-foreground" strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="mt-2.5 font-sans text-base font-semibold tracking-tight text-foreground">
                {card.name}
              </h3>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                {card.tagline}
              </p>
              <p className="mt-3 font-sans text-lg font-semibold tabular-nums tracking-tight text-foreground sm:text-xl">
                {card.priceAmount}
                {card.pricePeriod ? (
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">{card.pricePeriod}</span>
                ) : null}
              </p>
              <div className="mt-0.5 text-[10px] leading-snug text-muted-foreground sm:text-xs">
                <p className="leading-snug">{card.priceDetail}</p>
                {card.priceDetailLine2 ? <p className="mt-0.5 leading-snug">{card.priceDetailLine2}</p> : null}
              </div>
              <a
                href={href}
                className={`mt-3 inline-flex w-full items-center justify-center rounded-md px-2 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  card.recommended
                    ? 'bg-background text-foreground shadow-sm ring-1 ring-border hover:bg-muted/30 dark:bg-white dark:text-zinc-950 dark:ring-white/20 dark:hover:bg-white/95'
                    : 'bg-foreground text-background hover:bg-foreground/90 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900'
                }`}
              >
                Book a demo
              </a>
            </div>

            <div className="mt-4 w-full border-t border-border/80 pt-3 text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Overview
              </p>
              <ul className="mt-2 space-y-1">
                {card.overview.map((line, idx) => (
                  <li
                    key={`${card.tierId}-overview-${idx}`}
                    className="flex gap-1.5 text-[11px] leading-snug text-foreground/95 sm:text-xs"
                  >
                    <Check className="mt-0.5 size-3 shrink-0 text-foreground/80" strokeWidth={2.25} aria-hidden />
                    <span className="min-w-0 wrap-break-word">{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                What&apos;s included
              </p>
              {card.inheritsTitle ? (
                <p className="mt-2 text-[11px] font-semibold leading-snug text-foreground sm:text-xs">
                  {card.inheritsTitle}
                </p>
              ) : null}
              <ul className={`space-y-1.5 ${card.inheritsTitle ? 'mt-1.5' : 'mt-2'}`}>
                {card.newFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-1.5 text-[11px] leading-snug text-foreground/95 sm:text-xs"
                  >
                    <Check className="mt-0.5 size-3 shrink-0 text-foreground/80" strokeWidth={2.25} aria-hidden />
                    <span className="min-w-0 wrap-break-word">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}
