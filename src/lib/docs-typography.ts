import { cn } from '@/lib/utils';

/** Shared typography tokens for documentation pages. */
export const docBodyClass =
  'text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-[17px] md:leading-[28px]';

export const docLeadClass =
  'text-pretty font-sans text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-[32px]';

export const docH2Class =
  'scroll-mt-28 font-sans text-xl font-semibold tracking-tight text-foreground md:text-2xl';

/** Separates major doc sections; omitted when the H2 is the first child in `DocProse`. */
export const docH2SectionDividerClass =
  'mt-10 border-t border-border pt-10 first:mt-0 first:border-t-0 first:pt-0';

export const docH3Class =
  'scroll-mt-28 font-sans text-lg font-semibold tracking-tight text-foreground md:text-xl';

export const docH4Class =
  'scroll-mt-28 font-sans text-base font-semibold text-foreground md:text-lg';

export const docInlineCodeClass =
  'box-decoration-clone rounded-sm border border-border/80 bg-muted/50 px-1 py-0 font-mono text-[0.85em] leading-normal text-foreground';

/** Apply inline-code tokens to descendant `code` (use on p, li, or table cell wrappers — not DocProse). */
export const docInlineCodeChildClass = docInlineCodeClass
  .split(/\s+/)
  .map((token) => `[&_code]:${token}`)
  .join(' ');

/** Font size for terminal / file code panels (`DocCodeBlock`). */
export const docBlockCodeFontClass = 'text-[14px] leading-relaxed';

/** Reset inline-code chrome on block panels (terminal / file snippets). */
export const docBlockCodeClass =
  'font-mono box-border rounded-none border-0 bg-transparent p-0 text-inherit shadow-none';

/** Inline links in documentation prose and callouts. */
export const docLinkClass =
  'cursor-pointer text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground/50';

const docProseLinkParents = ['p', 'li', 'td', 'th'] as const;

/** Underline prose links only — skips cards and other block links in `DocProse`. */
export const docProseLinkSelectorClass = docProseLinkParents
  .flatMap((parent) => docLinkClass.split(/\s+/).map((token) => `[&_${parent}_a]:${token}`))
  .join(' ');
