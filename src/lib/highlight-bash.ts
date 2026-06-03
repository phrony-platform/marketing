import { escapeHtml, tokenSpan } from '@/lib/sugar-high-tokens';

/** Non-collapsing space between highlighted bash tokens. */
const TOKEN_GAP = '\u00a0';

function highlightBashWord(word: string, isCommand: boolean): string {
  if (isCommand) {
    return tokenSpan('keyword', word);
  }
  if (word.startsWith('-')) {
    return tokenSpan('entity', word);
  }
  if (
    (word.startsWith('"') && word.endsWith('"')) ||
    (word.startsWith("'") && word.endsWith("'")) ||
    word.includes('/') ||
    word.includes('.') ||
    word.includes('@')
  ) {
    return tokenSpan('string', word);
  }
  if (/^[A-Z][A-Z0-9_]*=/.test(word)) {
    const eq = word.indexOf('=');
    return (
      tokenSpan('property', word.slice(0, eq)) +
      tokenSpan('sign', '=') +
      tokenSpan('string', word.slice(eq + 1))
    );
  }
  return tokenSpan('string', word);
}

function highlightBashArgs(rest: string): string {
  const trimmed = rest.trimStart();
  if (!trimmed) {
    return escapeHtml(rest);
  }

  const leading = rest.slice(0, rest.indexOf(trimmed));
  const words = trimmed.split(/\s+/).filter(Boolean);
  let html = escapeHtml(leading);

  words.forEach((word, index) => {
    if (index > 0) {
      html += TOKEN_GAP;
    }
    html += highlightBashWord(word, index === 0);
  });

  return html;
}

function highlightBashLine(line: string): string {
  const trimmed = line.trim();
  if (trimmed.startsWith('#')) {
    return tokenSpan('comment', line);
  }

  const exportMatch = line.match(/^(\s*)(export)(\s+)([\s\S]*)$/);
  if (exportMatch) {
    const [, indent, exportKw, space, rest] = exportMatch;
    const eq = rest.indexOf('=');
    if (eq > 0) {
      const name = rest.slice(0, eq);
      const value = rest.slice(eq);
      return (
        escapeHtml(indent) +
        tokenSpan('keyword', exportKw) +
        escapeHtml(space) +
        tokenSpan('property', name) +
        tokenSpan('sign', '=') +
        tokenSpan('string', value.slice(1))
      );
    }
  }

  const promptMatch = line.match(/^(\s*\$\s+)([\s\S]*)$/);
  if (promptMatch) {
    const [, prompt, command] = promptMatch;
    return tokenSpan('sign', prompt) + highlightBashArgs(command);
  }

  return highlightBashArgs(line);
}

export function highlightBash(code: string): string {
  return code.split('\n').map(highlightBashLine).join('<br />');
}
