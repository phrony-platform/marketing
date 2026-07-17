'use client';

import Image from 'next/image';
import { Expand, X } from 'lucide-react';
import { useCallback, useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';

const blogImageBreakoutClass =
  'not-prose relative left-1/2 my-10 w-[min(1120px,calc(100vw-2.5rem))] -translate-x-1/2';

type BlogExpandableImageProps = {
  src: string;
  alt?: string;
  title?: string;
};

export function BlogExpandableImage({ src, alt = '', title }: BlogExpandableImageProps) {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const image = (
    <Image
      src={src}
      alt={alt}
      title={title}
      width={1600}
      height={900}
      className="h-auto w-full"
      sizes="(max-width: 1120px) calc(100vw - 2.5rem), 1120px"
      priority={false}
    />
  );

  return (
    <>
      <figure className={cn(blogImageBreakoutClass, 'overflow-hidden rounded-xl border border-border/80')}>
        <button
          type="button"
          className="group relative block w-full cursor-zoom-in text-left"
          onClick={() => setOpen(true)}
          aria-label={alt ? `Expand image: ${alt}` : 'Expand image'}
        >
          {image}
          <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-background/90 px-2 py-1 text-xs font-medium text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Expand className="size-3.5" strokeWidth={2} aria-hidden />
            Expand
          </span>
        </button>
        {alt ? (
          <figcaption className="border-t border-border/60 bg-muted/15 px-4 py-3 text-center text-sm text-muted-foreground">
            {alt}
          </figcaption>
        ) : null}
      </figure>

      {mounted && open
        ? createPortal(
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8">
              <button
                type="button"
                className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
                aria-label="Close expanded image"
                onClick={close}
              />
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={alt ? titleId : undefined}
                className="relative z-[81] flex max-h-full w-full max-w-[min(1400px,100%)] flex-col"
              >
                <button
                  type="button"
                  onClick={close}
                  className="absolute -top-2 right-0 z-[82] inline-flex size-10 -translate-y-full items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/70 sm:right-0"
                  aria-label="Close"
                >
                  <X className="size-5" strokeWidth={2} aria-hidden />
                </button>
                <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
                  <Image
                    src={src}
                    alt={alt}
                    title={title}
                    width={2000}
                    height={1125}
                    className="h-auto max-h-[min(90vh,900px)] w-full object-contain"
                    sizes="min(1400px, 100vw)"
                    priority
                  />
                </div>
                {alt ? (
                  <p id={titleId} className="mt-3 text-center text-sm text-white/80">
                    {alt}
                  </p>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
