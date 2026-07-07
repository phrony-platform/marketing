import { blogEyebrowClass, blogLeadClass } from '@/lib/blog-typography';

export function BlogIndexHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/80">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.97_0_0/50%)_0%,transparent_100%)] dark:bg-[linear-gradient(180deg,oklch(0.205_0_0/35%)_0%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <div className="relative mx-auto max-w-[1120px] px-5 py-16 md:px-8 md:py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className={blogEyebrowClass}>Phrony</p>
          <h1 className="mt-4 font-sans text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-[3.25rem] md:leading-[1.08]">
            Blog
          </h1>
          <p className={`mt-5 max-w-2xl ${blogLeadClass}`}>
            Product updates, engineering notes, and practical guidance for running governed AI agents in production.
          </p>
        </div>
      </div>
    </section>
  );
}
