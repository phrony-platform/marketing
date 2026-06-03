const bodyClass =
  'text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[28px]';

const h2Class = 'font-sans text-lg font-semibold tracking-tight text-foreground md:text-xl';

const h3Class = 'font-sans text-base font-semibold tracking-tight text-foreground md:text-lg';

export function EuAiActComplianceContent() {
  return (
    <article className="relative bg-background px-3 py-12 md:px-5 md:py-16">
      <header className="max-w-4xl border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Phrony</p>
        <h1 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
          EU AI Act Compliance
        </h1>
        <p className={`mt-6 font-medium text-foreground ${bodyClass}`}>
          Controls, logs, oversight, and evidence aligned to EU AI Act requirements.
        </p>
        <p className={`mt-4 ${bodyClass}`}>
          Phrony helps regulated teams operate AI agents with runtime governance and audit-ready evidence. For
          companies deploying high-risk AI systems in the European Union, Phrony is positioned as a third-party
          component supplier under Article 25 of the EU AI Act.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Phrony Labs BV&nbsp;&nbsp;|&nbsp;&nbsp;KvK 42039600
        </p>
      </header>

      <div className="mx-auto mt-12 max-w-4xl space-y-10">
        <section className="space-y-6">
          <h2 className={h2Class}>Our role in your compliance</h2>
          <p className={bodyClass}>
            The EU AI Act assigns obligations based on who places the AI system on the market. For AI agents deployed on
            Phrony, the roles are clear.
          </p>
          <div className="space-y-4">
            <h3 className={h3Class}>You — Provider of the high-risk AI system</h3>
            <p className={bodyClass}>
              You decide what your AI agent is used for — credit decisioning, underwriting, claims handling, employment
              screening, or similar. That makes you the Provider under the EU AI Act. You are responsible for the
              conformity assessment, CE marking, EU database registration, and the full set of provider obligations.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className={h3Class}>Phrony — Third-party component supplier</h3>
            <p className={bodyClass}>
              Phrony provides the runtime, governance, and audit infrastructure your AI agent operates within. Under
              Article 25, we supply you with the technical capabilities, documentation, and cooperation needed to meet
              your obligations — formalised in a dedicated Customer Agreement.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>The timeline</h2>
          <p className={bodyClass}>
            Obligations for high-risk AI systems under the EU AI Act apply from{' '}
            <strong className="font-semibold text-foreground">2 August 2026</strong>. Most AI agents deployed in financial
            services, insurance, HR, and related sectors fall within the high-risk classification.
          </p>
          <blockquote className="border-l-4 border-primary/50 bg-muted/40 py-4 pl-6 pr-4 dark:bg-muted/25">
            <p className={`font-semibold text-foreground ${bodyClass}`}>
              2 August 2026 — high-risk AI obligations apply.
            </p>
            <p className={`mt-3 ${bodyClass}`}>
              Risk management, automatic logging, transparency documentation, human oversight, and accuracy / robustness /
              cybersecurity controls must be operational before that date. Phrony is built to support these requirements
              today, so your deployment does not become a last-minute retrofit.
            </p>
          </blockquote>
        </section>

        <section className="space-y-6">
          <h2 className={h2Class}>How the platform supports AI Act compliance</h2>
          <p className={bodyClass}>
            Phrony maps platform capabilities to the high-risk AI system requirements in Chapter III, Section 2 of the
            EU AI Act. Each capability is documented in detail in the Phrony Compliance Documentation Package, available
            to customers under the Article 25 Customer Agreement.
          </p>
          <div className="space-y-4">
            <h3 className={h3Class}>Article 9 — Risk management system</h3>
            <p className={bodyClass}>
              Three-layer detection: real-time inline prevention, statistical behavioural drift analysis, and multi-step
              sequence pattern detection. HITL escalation for residual risk. Continuous rule refinement feeding back into
              real-time enforcement.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className={h3Class}>Article 11 — Technical documentation</h3>
            <p className={bodyClass}>
              Platform architecture, data-flow documentation, control specifications, and governance design — provided
              in a format that can be incorporated into your Annex IV technical documentation file for your conformity
              assessment.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className={h3Class}>Article 12 — Automatic record-keeping</h3>
            <p className={bodyClass}>
              Tamper-resistant session, run, and step logging for every agent execution. Full audit trail from trigger
              to outcome — timestamped, immutable, and exportable. Retention configurable up to five years for Enterprise
              deployments.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className={h3Class}>Article 13 — Transparency &amp; instructions for use</h3>
            <p className={bodyClass}>
              Operator-facing documentation covering platform capabilities, limitations, intended use, and operator
              responsibilities. Clear and explicit about what Phrony is, what it is not, and where accuracy validation
              remains the operator&apos;s responsibility.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className={h3Class}>Article 14 — Human oversight</h3>
            <p className={bodyClass}>
              Human-in-the-loop and agent-in-the-loop escalation with Approve, Reject, and Redirect controls. Manual
              session termination at any point. Full operator-decision audit trail. Supports both AI Act Article 14 and
              GDPR Article 22 requirements.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className={h3Class}>Article 15 — Accuracy, robustness &amp; cybersecurity</h3>
            <p className={bodyClass}>
              Policy guardrails enforced at the runtime level — resistant to prompt-injection of the reasoning layer.
              Session safety limits including maximum tokens, duration, and tool-call depth. Encrypted secrets vault,
              role-based access control, and multi-tenancy isolation.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>What Phrony is not</h2>
          <p className={bodyClass}>
            We hold a clear line on where our obligations end and yours begin. This clarity is what makes Phrony a
            trusted component supplier for regulated deployments.
          </p>
          <p className={`font-medium text-foreground ${bodyClass}`}>Phrony does not:</p>
          <ul className={`list-disc space-y-2 pl-6 ${bodyClass}`}>
            <li>Determine the intended purpose of your AI system.</li>
            <li>Perform the conformity assessment on your behalf.</li>
            <li>Issue the EU declaration of conformity or affix the CE marking.</li>
            <li>Register your high-risk AI system in the EU database.</li>
            <li>Validate domain-specific accuracy of LLM outputs.</li>
            <li>Replace the legal or regulatory advice of qualified counsel.</li>
          </ul>
          <p className={bodyClass}>
            These obligations remain with you as the Provider of your high-risk AI system. Our role is to give you the
            runtime capabilities and documentation that make meeting those obligations operationally possible.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>Request the compliance documentation package</h2>
          <p className={bodyClass}>
            For prospective customers evaluating Phrony for deployment under the EU AI Act, the full Article 25 Customer
            Agreement and compliance documentation package is available under mutual NDA.
          </p>
          <p className={bodyClass}>
            Email:{' '}
            <a
              href="mailto:compliance@phrony.com"
              className="text-foreground underline underline-offset-4 hover:text-primary"
            >
              compliance@phrony.com
            </a>
          </p>
        </section>

        <footer className="border-t border-border pt-10">
          <p className={`text-sm text-muted-foreground ${bodyClass}`}>
            <em>This page is provided for informational purposes only and does not constitute legal advice.</em> © Phrony
            Labs BV | KvK 42039600
          </p>
        </footer>
      </div>
    </article>
  );
}
