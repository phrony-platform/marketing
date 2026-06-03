'use client';

import { Check, Copy } from 'lucide-react';
import { useCallback, useState } from 'react';

import { docRadius } from '@/components/docs/doc-style';

type Props = {
  code: string;
};

export function DocCodeBlockCopy({ code }: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [code]);

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`${docRadius} inline-flex shrink-0 cursor-pointer items-center gap-1.5 border border-border bg-background px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted/60`}
      aria-label={copied ? 'Copied' : 'Copy code'}
    >
      {copied ? (
        <Check className="size-3.5" strokeWidth={2} aria-hidden />
      ) : (
        <Copy className="size-3.5" strokeWidth={1.75} aria-hidden />
      )}
      <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
