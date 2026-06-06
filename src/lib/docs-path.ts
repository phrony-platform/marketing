/** Normalize a docs pathname for comparisons (no trailing slash). */
export function normalizeDocsPath(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/docs';
  }
  return pathname.replace(/\/$/, '');
}

export function isDocsHome(pathname: string): boolean {
  return normalizeDocsPath(pathname) === '/docs';
}

export function isQuickStartPath(pathname: string): boolean {
  const path = normalizeDocsPath(pathname);
  return path === '/docs/quick-start' || path.startsWith('/docs/quick-start/');
}

export function docsPathShowsSidebar(pathname: string): boolean {
  const path = normalizeDocsPath(pathname);
  return path.startsWith('/docs/') && path !== '/docs' && path !== '/docs/template';
}

export function isNavLinkActive(pathname: string, href: string): boolean {
  const current = normalizeDocsPath(pathname);
  const target = normalizeDocsPath(href);
  return current === target;
}

type NavLinkWithChildren = {
  href: string;
  children?: NavLinkWithChildren[];
};

/** True when the link or any nested child matches the current path. */
export function isNavBranchActive(pathname: string, link: NavLinkWithChildren): boolean {
  if (isNavLinkActive(pathname, link.href)) {
    return true;
  }
  return link.children?.some((child) => isNavBranchActive(pathname, child)) ?? false;
}
