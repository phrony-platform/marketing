import Link from 'next/link';

import { PhronyLogo } from '@/components/phrony-logo';
import { documentationHref } from '@/lib/docs-url';
import { RUNTIME_GITHUB_URL } from '@/lib/project-urls';

const linkClass =
  'text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1488px] px-5 py-12 md:px-8 md:py-14">
        <div className="mb-10">
          <Link href="/" className="inline-flex">
            <PhronyLogo className="h-6 w-auto" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <nav className="lg:col-span-4" aria-labelledby="footer-project-heading">
            <h2 id="footer-project-heading" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Project
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a href={RUNTIME_GITHUB_URL} className={linkClass} target="_blank" rel="noopener noreferrer">
                  Runtime (GitHub)
                </a>
              </li>
              <li>
                <Link href={documentationHref} className={linkClass}>
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/about" className={linkClass}>
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="lg:col-span-4" aria-labelledby="footer-legal-heading">
            <h2 id="footer-legal-heading" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Legal
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link href="/terms-of-service" className={linkClass}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={linkClass}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {year} Phrony. Open specification and open-source runtime.
          </p>
        </div>
      </div>
    </footer>
  );
}
