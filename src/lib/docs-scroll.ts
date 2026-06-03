/** Fixed header + doc tabs — keep in sync with `DocsShell` / `scroll-mt-*` on headings. */
export const DOC_SCROLL_OFFSET_PX = 112;

export function scrollToDocHeading(id: string) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY - DOC_SCROLL_OFFSET_PX;
  window.scrollTo({ top, behavior: 'smooth' });
  window.history.replaceState(null, '', `#${id}`);
}
