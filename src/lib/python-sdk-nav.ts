import type { DocNavLink } from '@/lib/docs-navigation';

export type PythonSdkNavLink = DocNavLink;

/** Section outline for the Python SDK single-page reference. */
export const PYTHON_SDK_SECTIONS: PythonSdkNavLink[] = [
  { title: 'Install', href: '/docs/sdks/python#install' },
  { title: 'Connect', href: '/docs/sdks/python#connect' },
  { title: 'Run agents & bundles', href: '/docs/sdks/python#run' },
  { title: 'Interactive sessions', href: '/docs/sdks/python#interactive-session' },
  { title: 'Tool workers', href: '/docs/sdks/python#worker' },
  { title: 'Runtime client', href: '/docs/sdks/python#runtime-client' },
  { title: 'Utilities', href: '/docs/sdks/python#utilities' },
];

/** Sidebar link when not on the Python SDK page. */
export const PYTHON_SDK_NAV: PythonSdkNavLink[] = [{ title: 'Python', href: '/docs/sdks/python' }];
