import { escapeHtml, tokenSpan } from '@/lib/sugar-high-tokens';

const PYTHON_KEYWORDS = new Set([
  'False',
  'None',
  'True',
  'and',
  'as',
  'assert',
  'async',
  'await',
  'break',
  'class',
  'continue',
  'def',
  'del',
  'elif',
  'else',
  'except',
  'finally',
  'for',
  'from',
  'global',
  'if',
  'import',
  'in',
  'is',
  'lambda',
  'nonlocal',
  'not',
  'or',
  'pass',
  'raise',
  'return',
  'try',
  'while',
  'with',
  'yield',
]);

const PYTHON_BUILTINS = new Set([
  'Agent',
  'bool',
  'dict',
  'float',
  'int',
  'len',
  'list',
  'print',
  'range',
  'set',
  'str',
  'tuple',
]);

function findCommentIndex(line: string): number {
  let inSingle = false;
  let inDouble = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    const next = line[i + 1];
    const prev = line[i - 1];

    if (!inDouble && ch === "'" && prev !== '\\') {
      if (inSingle && next === "'") {
        i += 2;
        continue;
      }
      inSingle = !inSingle;
      continue;
    }

    if (!inSingle && ch === '"' && prev !== '\\') {
      if (inDouble && next === '"') {
        i += 2;
        continue;
      }
      inDouble = !inDouble;
      continue;
    }

    if (ch === '#' && !inSingle && !inDouble) {
      return i;
    }
  }

  return -1;
}

function readString(line: string, start: number): { value: string; end: number } {
  const quote = line[start];
  let i = start + 1;

  while (i < line.length) {
    const ch = line[i];
    if (ch === '\\' && i + 1 < line.length) {
      i += 2;
      continue;
    }
    if (ch === quote) {
      if (line[i + 1] === quote && line[i + 2] === quote) {
        i += 3;
        continue;
      }
      return { value: line.slice(start, i + 1), end: i + 1 };
    }
    i += 1;
  }

  return { value: line.slice(start), end: line.length };
}

function highlightIdentifier(word: string, nextNonSpace: string | undefined): string {
  if (PYTHON_KEYWORDS.has(word)) {
    return tokenSpan('keyword', word);
  }
  if (PYTHON_BUILTINS.has(word)) {
    return tokenSpan('class', word);
  }
  if (nextNonSpace === '(') {
    return tokenSpan('property', word);
  }
  return tokenSpan('identifier', word);
}

function highlightPythonCode(segment: string): string {
  let html = '';
  let i = 0;

  while (i < segment.length) {
    const ch = segment[i];

    if (ch === "'" || ch === '"') {
      const { value, end } = readString(segment, i);
      html += tokenSpan('string', value);
      i = end;
      continue;
    }

    if (ch === '@') {
      const match = segment.slice(i).match(/^@[A-Za-z_][\w.]*/);
      if (match) {
        html += tokenSpan('keyword', match[0]);
        i += match[0].length;
        continue;
      }
    }

    if (/[0-9]/.test(ch)) {
      const match = segment.slice(i).match(/^(?:0x[0-9a-fA-F]+|0b[01]+|0o[0-7]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)/);
      if (match) {
        html += tokenSpan('entity', match[0]);
        i += match[0].length;
        continue;
      }
    }

    if (/[A-Za-z_]/.test(ch)) {
      const match = segment.slice(i).match(/^[A-Za-z_][\w]*/);
      if (match) {
        const word = match[0];
        const rest = segment.slice(i + word.length);
        const nextNonSpace = rest.match(/^\s*(\S)/)?.[1];
        html += highlightIdentifier(word, nextNonSpace);
        i += word.length;
        continue;
      }
    }

    if (/[()[\]{}:,.=+\-*/%<>!&|^~]/.test(ch)) {
      html += tokenSpan('sign', ch);
      i += 1;
      continue;
    }

    html += escapeHtml(ch);
    i += 1;
  }

  return html;
}

function highlightPythonLine(line: string): string {
  const commentAt = findCommentIndex(line);
  if (commentAt === 0) {
    return tokenSpan('comment', line);
  }
  if (commentAt > 0) {
    return highlightPythonCode(line.slice(0, commentAt)) + tokenSpan('comment', line.slice(commentAt));
  }
  return highlightPythonCode(line);
}

export function highlightPython(code: string): string {
  return code.split('\n').map(highlightPythonLine).join('\n');
}
