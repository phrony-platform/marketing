import {
  docCodeLanguageUsesHighlighter,
  type DocCodeLanguage,
} from '@/lib/doc-code-language';
import { highlightBash } from '@/lib/highlight-bash';
import { highlightPython } from '@/lib/highlight-python';
import { highlightYaml } from '@/lib/highlight-yaml';
import { highlight } from 'sugar-high';

export function escapeDocCodeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function highlightDocCode(code: string, language: DocCodeLanguage): string {
  if (!docCodeLanguageUsesHighlighter(language)) {
    return escapeDocCodeHtml(code);
  }

  switch (language) {
    case 'typescript':
    case 'javascript':
    case 'json':
      return highlight(code);
    case 'yaml':
      return highlightYaml(code);
    case 'python':
      return highlightPython(code);
    case 'bash':
    case 'shell':
      return highlightBash(code);
    default:
      return escapeDocCodeHtml(code);
  }
}

export function withShellPrompt(code: string): string {
  return code
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed === '' || trimmed.startsWith('#')) {
        return line;
      }
      if (trimmed.startsWith('$')) {
        return line;
      }
      return `$ ${line}`;
    })
    .join('\n');
}

export function docCodeLanguageLabel(language: DocCodeLanguage): string {
  switch (language) {
    case 'typescript':
      return 'TypeScript';
    case 'javascript':
      return 'JavaScript';
    case 'python':
      return 'Python';
    case 'bash':
    case 'shell':
      return 'Shell';
    case 'yaml':
      return 'YAML';
    case 'json':
      return 'JSON';
    default:
      return 'Text';
  }
}
