export type DocCodeLanguage =
  | 'typescript'
  | 'javascript'
  | 'bash'
  | 'shell'
  | 'yaml'
  | 'json'
  | 'text'
  | 'plaintext';

export function inferDocCodeLanguageFromFilename(filename: string | undefined): DocCodeLanguage | undefined {
  if (!filename) {
    return undefined;
  }

  const lower = filename.toLowerCase();
  if (lower.endsWith('.yaml') || lower.endsWith('.yml')) {
    return 'yaml';
  }
  if (lower.endsWith('.ts') || lower.endsWith('.tsx')) {
    return 'typescript';
  }
  if (lower.endsWith('.js') || lower.endsWith('.jsx')) {
    return 'javascript';
  }
  if (lower.endsWith('.json')) {
    return 'json';
  }
  if (lower === 'terminal' || lower.endsWith('.sh') || lower.endsWith('.bash')) {
    return 'bash';
  }

  return undefined;
}

export function isShellDocCodeLanguage(language: DocCodeLanguage): boolean {
  return language === 'bash' || language === 'shell';
}

export function docCodeLanguageUsesHighlighter(language: DocCodeLanguage): boolean {
  switch (language) {
    case 'typescript':
    case 'javascript':
    case 'json':
    case 'yaml':
    case 'bash':
    case 'shell':
      return true;
    default:
      return false;
  }
}

export function docCodeBlockThemeClass(language: DocCodeLanguage): string | undefined {
  if (!docCodeLanguageUsesHighlighter(language)) {
    return undefined;
  }
  return isShellDocCodeLanguage(language) ? 'docs-terminal' : 'docs-code-highlight';
}
