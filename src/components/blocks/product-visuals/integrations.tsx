'use client';

import { Check, Plug2, Webhook, X } from 'lucide-react';

import { CodeChip, VisualFrame, visualHeading } from './_shared';

const featuredLogos = [
  { src: 'https://svgl.app/library/salesforce.svg', alt: 'Salesforce' },
  { src: 'https://cdn.simpleicons.org/zendesk/03363D', alt: 'Zendesk' },
  { src: 'https://cdn.simpleicons.org/notion/000000', alt: 'Notion' },
  { src: 'https://cdn.simpleicons.org/googledrive/4285F4', alt: 'Google Drive' },
  { src: 'https://cdn.simpleicons.org/slack/4A154B', alt: 'Slack' },
  { src: 'https://cdn.simpleicons.org/hubspot/FF7A59', alt: 'HubSpot' },
  { src: 'https://cdn.simpleicons.org/postgresql/4169E1', alt: 'Postgres' },
  { src: 'https://cdn.simpleicons.org/snowflake/29B5E8', alt: 'Snowflake' },
  { src: 'https://cdn.simpleicons.org/mongodb/47A248', alt: 'MongoDB' },
  { src: 'https://cdn.simpleicons.org/jira/0052CC', alt: 'Jira' },
  { src: 'https://cdn.simpleicons.org/github/181717', alt: 'GitHub' },
  { src: 'https://cdn.simpleicons.org/stripe/635BFF', alt: 'Stripe' },
  { src: 'https://cdn.simpleicons.org/intercom/6AFDEF', alt: 'Intercom' },
  { src: 'https://cdn.simpleicons.org/okta/007DC1', alt: 'Okta' },
  { src: 'https://cdn.simpleicons.org/datadog/632CA6', alt: 'Datadog' },
  { src: 'https://cdn.simpleicons.org/box/0061D5', alt: 'Box' },
  { src: 'https://svgl.app/library/microsoft.svg', alt: 'Microsoft' },
] as const;

export function IntegrationsHero() {
  return (
    <VisualFrame label="Connector library">
      <div className="pt-3 sm:pt-4">
        <div className="grid grid-cols-3 gap-px bg-white/5 sm:grid-cols-6">
          {featuredLogos.map((logo) => (
            <div
              key={logo.alt}
              className="group flex aspect-[4/3] items-center justify-center bg-zinc-950 transition-colors hover:bg-white/[0.03]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                width={80}
                height={28}
                loading="lazy"
                className="pointer-events-none h-7 w-auto max-w-[64px] object-contain opacity-75 transition-opacity group-hover:opacity-100 dark:brightness-0 dark:invert"
              />
            </div>
          ))}
          <div
            className="group flex aspect-[4/3] flex-col items-center justify-center gap-0.5 bg-zinc-950 px-3 text-center text-zinc-400 transition-colors hover:bg-white/[0.03] hover:text-zinc-300"
            aria-label="1500 or more additional connectors"
          >
            <span className="font-mono text-[13px] font-semibold tabular-nums tracking-tight sm:text-sm">
              1500+
            </span>
            <span className="text-[10px] uppercase tracking-[0.16em]">more</span>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

export function IntegrationsMid() {
  return (
    <VisualFrame label="Two paths in">
      <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* Built-in path */}
        <div className="p-5 sm:p-6">
          <p className={visualHeading}>Built-in · one click</p>
          <div className="mt-4 flex items-center justify-between border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center border border-sky-500/30 bg-sky-500/[0.08] text-sky-100">
                <Plug2 className="size-3.5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-[12px] font-medium text-zinc-100">Salesforce</span>
            </div>
            <button
              type="button"
              className="border border-emerald-500/30 bg-emerald-500/[0.08] px-2 py-1 text-[11px] font-medium text-emerald-100"
            >
              Install
            </button>
          </div>
          <p className="mt-3 text-[11px] leading-snug text-zinc-500">
            Pre-built operations, OAuth, scoped per agent.
          </p>
        </div>

        {/* REST API path */}
        <div className="p-5 sm:p-6">
          <p className={visualHeading}>REST API · bring your own</p>
          <div className="mt-4 border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center border border-violet-500/30 bg-violet-500/[0.08] text-violet-100">
                <Webhook className="size-3.5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-[12px] font-medium text-zinc-100">Custom endpoint</span>
            </div>
            <code className="mt-3 block w-full truncate border border-white/10 bg-black/40 px-2 py-1 font-mono text-[11px] text-zinc-300">
              https://api.acme.internal/v2
            </code>
          </div>
          <p className="mt-3 text-[11px] leading-snug text-zinc-500">
            Point Phrony at it. No custom code.
          </p>
        </div>
      </div>
    </VisualFrame>
  );
}

export function IntegrationsBottom() {
  const operations = [
    { label: 'Read contacts', allowed: true },
    { label: 'Create deals', allowed: true },
    { label: 'Update deal stage', allowed: true },
    { label: 'Delete accounts', allowed: false },
    { label: 'Export full database', allowed: false },
  ];
  return (
    <VisualFrame label="Scoped per agent">
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center border border-sky-500/30 bg-sky-500/[0.08] text-sky-100">
            <Plug2 className="size-3.5" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="text-[12px] font-medium text-zinc-100">CRM connector</span>
          <CodeChip className="ml-auto">claims-reviewer</CodeChip>
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {operations.map((op) => (
            <li
              key={op.label}
              className="flex items-center justify-between border border-white/8 bg-white/[0.02] px-2.5 py-2"
            >
              <span className="text-[12px] text-zinc-200">{op.label}</span>
              {op.allowed ? (
                <span className="flex size-5 items-center justify-center border border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-300">
                  <Check className="size-3" strokeWidth={2.5} aria-hidden />
                </span>
              ) : (
                <span className="flex size-5 items-center justify-center border border-rose-500/30 bg-rose-500/[0.08] text-rose-300">
                  <X className="size-3" strokeWidth={2.5} aria-hidden />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </VisualFrame>
  );
}
