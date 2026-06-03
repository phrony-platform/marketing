/** Shared sugar-high token spans (colors from `--sh-*` on `.docs-code-highlight` / `.docs-terminal`). */

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function tokenSpan(type: string, text: string): string {
  if (!text) {
    return '';
  }
  return `<span class="sh__token--${type}" style="color:var(--sh-${type})">${escapeHtml(text)}</span>`;
}
