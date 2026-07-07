/** Typography tokens for long-form blog content. */
export const blogBodyClass =
  'text-pretty font-sans text-[17px] leading-[1.75] text-foreground/85 md:text-[18px] md:leading-[1.8]';

export const blogLeadClass =
  'text-pretty font-sans text-lg leading-[1.7] text-muted-foreground md:text-xl md:leading-[1.75]';

export const blogH2Class =
  'scroll-mt-28 font-sans text-2xl font-semibold tracking-tight text-foreground md:text-[1.75rem] md:leading-tight';

export const blogH2DividerClass =
  'mt-14 border-t border-border/80 pt-14 first:mt-0 first:border-t-0 first:pt-0';

export const blogH3Class =
  'scroll-mt-28 font-sans text-xl font-semibold tracking-tight text-foreground md:text-[1.35rem]';

export const blogH4Class =
  'scroll-mt-28 font-sans text-lg font-semibold tracking-tight text-foreground';

export const blogInlineCodeClass =
  'box-decoration-clone rounded-[4px] border border-border/70 bg-muted/60 px-1.5 py-0.5 font-mono text-[0.88em] leading-normal text-foreground';

export const blogInlineCodeChildClass = blogInlineCodeClass
  .split(/\s+/)
  .map((token) => `[&_code]:${token}`)
  .join(' ');

export const blogLinkClass =
  'cursor-pointer font-medium text-foreground underline decoration-border underline-offset-[5px] transition-colors hover:decoration-foreground/40';

const blogProseLinkParents = ['p', 'li', 'blockquote'] as const;

export const blogProseLinkSelectorClass = blogProseLinkParents
  .flatMap((parent) => blogLinkClass.split(/\s+/).map((token) => `[&_${parent}_a]:${token}`))
  .join(' ');

export const blogMetaClass = 'text-sm text-muted-foreground';

export const blogEyebrowClass =
  'text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground';
