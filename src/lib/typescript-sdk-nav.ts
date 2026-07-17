import type { DocNavLink } from '@/lib/docs-navigation';
import { PYTHON_SDK_NAV, PYTHON_SDK_SECTIONS } from '@/lib/python-sdk-nav';
import { normalizeDocsPath } from '@/lib/docs-path';

export type TypeScriptSdkNavLink = DocNavLink;

/** Section outline for the TypeScript SDK single-page reference. */
export const TYPESCRIPT_SDK_SECTIONS: TypeScriptSdkNavLink[] = [
  { title: 'Install', href: '/docs/sdks/typescript#install' },
  { title: 'Connect', href: '/docs/sdks/typescript#connect' },
  { title: 'Run agents & bundles', href: '/docs/sdks/typescript#run' },
  { title: 'Interactive sessions', href: '/docs/sdks/typescript#interactive-session' },
  { title: 'Tool workers', href: '/docs/sdks/typescript#worker' },
  { title: 'Runtime client', href: '/docs/sdks/typescript#runtime-client' },
  { title: 'Utilities', href: '/docs/sdks/typescript#utilities' },
];

/** Sidebar link when not on the TypeScript SDK page. */
export const TYPESCRIPT_SDK_NAV: TypeScriptSdkNavLink[] = [
  { title: 'TypeScript', href: '/docs/sdks/typescript' },
];

/** Sidebar pages for a tab group (TypeScript SDK uses section outline on its page). */
export function resolveDocSidebarGroupPages(
  tabId: string,
  group: { group: string; pages: TypeScriptSdkNavLink[] },
  pathname: string,
): TypeScriptSdkNavLink[] {
  if (tabId === 'sdks' && group.group === 'TypeScript') {
    if (normalizeDocsPath(pathname) === '/docs/sdks/typescript') {
      return TYPESCRIPT_SDK_SECTIONS;
    }
    return TYPESCRIPT_SDK_NAV;
  }
  if (tabId === 'sdks' && group.group === 'Python') {
    if (normalizeDocsPath(pathname) === '/docs/sdks/python') {
      return PYTHON_SDK_SECTIONS;
    }
    return PYTHON_SDK_NAV;
  }
  return group.pages;
}
