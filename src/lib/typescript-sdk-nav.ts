import type { DocNavLink } from '@/lib/docs-navigation';

export type TypeScriptSdkNavLink = DocNavLink;

/** Sidebar order for @phrony/sdk docs under the SDKs → TypeScript group. */
export const TYPESCRIPT_SDK_NAV: TypeScriptSdkNavLink[] = [
  { title: 'Overview', href: '/docs/sdks/typescript' },
  { title: 'Install', href: '/docs/sdks/typescript/install' },
  { title: 'Connect', href: '/docs/sdks/typescript/connect' },
  { title: 'Run agents & bundles', href: '/docs/sdks/typescript/run' },
  { title: 'Interactive sessions', href: '/docs/sdks/typescript/interactive-session' },
  { title: 'Tool workers', href: '/docs/sdks/typescript/worker' },
  { title: 'Runtime client', href: '/docs/sdks/typescript/runtime-client' },
  { title: 'Utilities', href: '/docs/sdks/typescript/utilities' },
];

/** Sidebar pages for a tab group (TypeScript SDK uses the canonical nav list). */
export function resolveDocSidebarGroupPages(
  tabId: string,
  group: { group: string; pages: TypeScriptSdkNavLink[] },
): TypeScriptSdkNavLink[] {
  if (tabId === 'sdks' && group.group === 'TypeScript') {
    return TYPESCRIPT_SDK_NAV;
  }
  return group.pages;
}
