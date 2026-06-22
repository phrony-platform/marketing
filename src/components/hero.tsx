import { ArrowRight, BookOpen, Github } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';

import { InceptionProgramLabel } from '@/components/inception-program-label';
import { HeroManifestIllustration } from '@/components/hero-manifest-illustration';
import { documentationHref } from '@/lib/docs-url';
import { heroDescription, heroTitleLines } from '@/lib/hero-title';
import { PHRONY_GITHUB_ORG_URL } from '@/lib/project-urls';

export function Hero() {
  return (
    <div id="hero" className="relative scroll-mt-24 border-b border-border/60 bg-background text-foreground">
      <section className="mx-auto grid w-full max-w-[1024px] grid-cols-1 items-center gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-10 lg:py-24">
        <div className="min-w-0 text-center lg:text-left">
          <h1 className="mx-auto max-w-full text-balance font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-[2.75rem] md:leading-[1.12] lg:mx-0 lg:text-[3.25rem] lg:leading-[1.1]">
            {heroTitleLines.map((line, index) => (
              <Fragment key={index}>
                {index > 0 ? <br /> : null}
                {line}
              </Fragment>
            ))}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[24.25px] lg:mx-0">
            {heroDescription}
          </p>
          <div className="mt-9 flex justify-center lg:justify-start">
            <div className="flex w-full max-w-xs flex-col gap-3 sm:inline-flex sm:max-w-none sm:w-auto sm:flex-row sm:flex-nowrap sm:items-center">
              <a
                href={PHRONY_GITHUB_ORG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full shrink-0 origin-center items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-colors duration-100 hover:bg-primary/90 motion-reduce:transition-none sm:w-auto sm:justify-start"
              >
                <Github className="size-5 shrink-0" aria-hidden />
                View on GitHub
                <ArrowRight
                  className="size-4 shrink-0 transition-transform duration-100 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  aria-hidden
                />
              </a>
              <Link
                href={documentationHref}
                className="group inline-flex w-full shrink-0 origin-center items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-medium text-muted-foreground transition-colors duration-100 hover:bg-muted/50 hover:text-foreground motion-reduce:transition-none sm:w-auto sm:justify-start"
              >
                <BookOpen className="size-5 shrink-0" aria-hidden />
                Read documentation
                <ArrowRight
                  className="size-4 shrink-0 transition-transform duration-100 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
          <InceptionProgramLabel className="mt-10 md:mt-20" />
        </div>

        <div className="flex min-w-0 justify-center overflow-hidden lg:justify-end">
          <HeroManifestIllustration className="w-full max-w-lg" />
        </div>
      </section>
    </div>
  );
}
