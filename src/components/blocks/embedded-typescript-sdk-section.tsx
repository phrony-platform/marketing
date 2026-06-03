import { ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';

import { EMBEDDED_SDK_MARKETING_EXAMPLE } from '@/components/blocks/embedded-sdk-marketing-snippet-text';
import { MarketingCodeSample } from '@/components/blocks/marketing-code-sample';
import { documentationHref } from '@/lib/docs-url';

const body =
  'text-pretty text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[28px]';

export function EmbeddedTypeScriptSdkSection() {
  return (
    <div className="w-full border-t border-border bg-muted/10">
      <div className="px-5 py-12 md:px-8 md:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          <Package className="mb-0.5 mr-1 inline size-3.5 align-text-bottom" aria-hidden />
          TypeScript SDK
        </p>
        <h2 className="mt-3 text-balance font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-[2rem] md:leading-[1.2]">
          Ship faster with the official client
        </h2>
        <p className={`mt-5 max-w-3xl ${body}`}>
          Call the same public API your dashboard uses: start runs, poll status, read the conversation, and stream
          events. Install{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">@phrony/sdk</code> from
          npm. Keep the API key on your server—never in a browser bundle.
        </p>

        <MarketingCodeSample
          className="mt-8 max-w-3xl"
          fileLabel="your-backend.ts"
          code={EMBEDDED_SDK_MARKETING_EXAMPLE}
        />

        <div className="mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Link
            href="/docs/quick-start/tool-binding"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Read the TypeScript SDK guide
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <span className="hidden text-muted-foreground sm:inline" aria-hidden>
            ·
          </span>
          <a
            href="https://www.npmjs.com/package/@phrony/sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            @phrony/sdk on npm
          </a>
        </div>

        <p className={`mt-8 max-w-3xl text-sm text-muted-foreground`}>
          Prefer raw HTTP? See the{' '}
          <Link href={documentationHref} className="font-medium text-foreground underline-offset-4 hover:underline">
            Phrony documentation
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
