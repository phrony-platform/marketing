import { escapeHtml, tokenSpan } from '@/lib/sugar-high-tokens';

/** YAML highlighter outputting sugar-high–compatible spans (uses `--sh-*` in `globals.css`). */

function findInlineCommentIndex(line: string): number {
  let inSingle = false;
  let inDouble = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    const prev = line[i - 1];

    if (ch === '"' && prev !== '\\' && !inSingle) {
      inDouble = !inDouble;
      continue;
    }
    if (ch === "'" && prev !== '\\' && !inDouble) {
      inSingle = !inSingle;
      continue;
    }
    if (ch === '#' && !inSingle && !inDouble) {
      return i;
    }
  }

  return -1;
}

function highlightYamlScalar(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return escapeHtml(value);
  }

  const leading = value.slice(0, value.indexOf(trimmed));
  const trailing = value.slice(leading.length + trimmed.length);

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return tokenSpan('sign', leading) + tokenSpan('string', trimmed) + tokenSpan('sign', trailing);
  }

  if (/^(true|false|null|yes|no|on|off)$/i.test(trimmed)) {
    return tokenSpan('sign', leading) + tokenSpan('keyword', trimmed) + tokenSpan('sign', trailing);
  }

  if (/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:e[+-]?\d+)?$/i.test(trimmed)) {
    return tokenSpan('sign', leading) + tokenSpan('entity', trimmed) + tokenSpan('sign', trailing);
  }

  return tokenSpan('sign', leading) + tokenSpan('string', trimmed) + tokenSpan('sign', trailing);
}

function highlightYamlLine(line: string): string {
  const commentAt = findInlineCommentIndex(line);
  if (commentAt === 0) {
    return tokenSpan('comment', line);
  }
  if (commentAt > 0) {
    return `${highlightYamlLine(line.slice(0, commentAt))}${tokenSpan('comment', line.slice(commentAt))}`;
  }

  const listKey = line.match(/^(\s*)(-\s+)([A-Za-z0-9_.-]+)(:)([\s\S]*)$/);
  if (listKey) {
    const [, indent, dash, key, colon, rest] = listKey;
    return (
      tokenSpan('sign', indent) +
      tokenSpan('sign', dash) +
      tokenSpan('property', key) +
      tokenSpan('sign', colon) +
      highlightYamlScalar(rest)
    );
  }

  const keyValue = line.match(/^(\s*)([A-Za-z0-9_.-]+)(:)([\s\S]*)$/);
  if (keyValue) {
    const [, indent, key, colon, rest] = keyValue;
    return (
      tokenSpan('sign', indent) +
      tokenSpan('property', key) +
      tokenSpan('sign', colon) +
      highlightYamlScalar(rest)
    );
  }

  const listItem = line.match(/^(\s*)(-\s+)([\s\S]*)$/);
  if (listItem) {
    const [, indent, dash, rest] = listItem;
    return tokenSpan('sign', indent) + tokenSpan('sign', dash) + highlightYamlScalar(rest);
  }

  return escapeHtml(line);
}

export function highlightYaml(code: string): string {
  return code.split('\n').map(highlightYamlLine).join('\n');
}
