const bodyClass =
  'text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[28px]';

const h2Class = 'font-sans text-lg font-semibold tracking-tight text-foreground md:text-xl';

export function AboutContent() {
  return (
    <article className="relative bg-background px-3 py-12 md:px-5 md:py-16">
      <header className="max-w-4xl border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Phrony</p>
        <h1 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
          About Phrony
        </h1>
      </header>

      <div className="mx-auto mt-12 max-w-4xl space-y-10">
        <div className={`space-y-4 ${bodyClass}`}>
          <p>
            Phrony is a methodology for building AI agents and an open-source runtime that implements it. The idea is
            simple: agents deserve the same treatment as other long-lived infrastructure — declared, deployed, and run
            as first-class entities rather than buried in application code.
          </p>
          <p>
            The open specification defines the manifest schema, policy model, runtime contract, and trace format. The
            reference runtime on GitHub loads deployed manifests, executes agent sessions, mediates tool calls, and
            produces structured traces. Anyone can run it, inspect it, or build conformant tooling on top of the spec.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className={h2Class}>What Phrony is not</h2>
          <ul className={`list-disc space-y-2 pl-5 ${bodyClass}`}>
            <li>Not a workflow engine — the manifest describes what the agent operates within, not its reasoning path.</li>
            <li>Not a framework replacement — frameworks remain useful for building tools and application logic.</li>
            <li>Not a prompt registry — prompts are part of the manifest, but the manifest is the agent.</li>
            <li>Not for every agent — prototypes and one-offs do not need this weight; long-lived production agents do.</li>
          </ul>
        </section>
      </div>
    </article>
  );
}
