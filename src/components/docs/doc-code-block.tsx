import { DocCodeBlockCopy } from '@/components/docs/doc-code-block-copy';
import { docPanel, docRadius } from '@/components/docs/doc-style';
import { docBlockCodeClass, docBlockCodeFontClass } from '@/lib/docs-typography';
import {
  docCodeBlockThemeClass,
  inferDocCodeLanguageFromFilename,
  isShellDocCodeLanguage,
  normalizeDocCodeLanguage,
  type DocCodeLanguage,
} from '@/lib/doc-code-language';
import {
  docCodeLanguageLabel,
  highlightDocCode,
  withShellPrompt,
} from '@/lib/doc-code-highlight';
import { cn } from '@/lib/utils';

export type { DocCodeLanguage };

type Props = {
  code: string;
  language?: DocCodeLanguage | string;
  /** Shown in the panel header (e.g. `agent.yaml`, `terminal`). */
  title?: string;
  /** Alias for `title`. */
  filename?: string;
  className?: string;
  /** Hide the copy button (e.g. for non-interactive demos). */
  showCopy?: boolean;
  /** Prefix each line with `$` for bash/shell (default true). Copy omits prompts. */
  showShellPrompt?: boolean;
};

export function DocCodeBlock({
  code,
  language: languageProp = 'text',
  title,
  filename,
  className,
  showCopy = true,
  showShellPrompt = true,
}: Props) {
  const headerLabel = title ?? filename;
  const language = inferDocCodeLanguageFromFilename(headerLabel) ?? normalizeDocCodeLanguage(languageProp);
  const isShell = isShellDocCodeLanguage(language);
  const themeClass = docCodeBlockThemeClass(language);

  const trimmedCode = code.trimEnd();
  const displayCode = showShellPrompt && isShell ? withShellPrompt(trimmedCode) : trimmedCode;
  const html = highlightDocCode(displayCode, language);

  return (
    <figure className={cn('not-prose overflow-hidden', docPanel, className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-3 py-2 sm:px-4">
        <div className="min-w-0 flex-1">
          {headerLabel ? (
            <figcaption className="truncate font-mono text-xs text-muted-foreground">
              {headerLabel}
            </figcaption>
          ) : (
            <span className="font-mono text-xs text-muted-foreground">{docCodeLanguageLabel(language)}</span>
          )}
        </div>
        {showCopy ? <DocCodeBlockCopy code={code} /> : null}
      </div>
      <pre
        className={cn(
          'm-0 overflow-x-auto whitespace-pre bg-zinc-950! p-4 text-left',
          docBlockCodeFontClass,
          isShell ? 'text-[#f0e0b8]' : 'text-zinc-100',
        )}
      >
        <code
          className={cn(docBlockCodeClass, 'whitespace-pre', themeClass)}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </figure>
  );
}
