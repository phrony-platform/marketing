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

export function isSdkLanguagePath(pathname: string): boolean {
  const path = normalizeDocsPath(pathname);
  return path === '/docs/sdks/typescript' || path === '/docs/sdks/python';
}

export function docsPathShowsSidebar(pathname: string): boolean {
  const path = normalizeDocsPath(pathname);
  return path.startsWith('/docs/') && path !== '/docs' && path !== '/docs/template';
}

function splitNavHref(href: string): { path: string; hash?: string } {
  const [path, hash] = href.split('#');
  return { path: normalizeDocsPath(path), hash: hash || undefined };
}

export function isNavLinkActive(pathname: string, href: string, currentHash?: string): boolean {
  const current = normalizeDocsPath(pathname);
  const { path: target, hash: targetHash } = splitNavHref(href);

  if (current !== target) {
    return false;
  }

  if (targetHash) {
    const hash = (currentHash ?? '').replace(/^#/, '');
    return hash === targetHash;
  }

  return !currentHash || currentHash === '#';
}

type NavLinkWithChildren = {
  href: string;
  children?: NavLinkWithChildren[];
};

/** True when the link or any nested child matches the current path. */
export function isNavBranchActive(
  pathname: string,
  link: NavLinkWithChildren,
  currentHash?: string,
): boolean {
  if (isNavLinkActive(pathname, link.href, currentHash)) {
    return true;
  }
  return link.children?.some((child) => isNavBranchActive(pathname, child, currentHash)) ?? false;
}
