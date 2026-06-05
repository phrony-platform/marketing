import Link from 'next/link';

const bodyClass =
  'text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[28px]';

const h2Class = 'font-sans text-lg font-semibold tracking-tight text-foreground md:text-xl';

export function TermsOfServiceContent() {
  return (
    <article className="relative bg-background px-3 py-12 md:px-5 md:py-16">
      <header className="max-w-4xl border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Phrony</p>
        <h1 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Phrony Labs BV&nbsp;&nbsp;|&nbsp;&nbsp;KvK 42039600
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>
        <p className={`mt-6 ${bodyClass}`}>
          Phrony is an open specification and an open runtime for production AI agents. These Terms cover three things:
          the Phrony specification (the manifest format), the Phrony runtime (the self-hosted execution layer), and Phrony
          Enterprise (a commercial offering sold under a separate agreement). Most users of Phrony never sign these Terms
          at all, because the specification and the runtime are governed by their open-source licenses. These Terms exist
          to cover the phrony.com website, the relationship around the licensed software, and the entry point to a
          commercial Enterprise relationship.
        </p>
      </header>

      <div className="mx-auto mt-12 max-w-4xl space-y-10">
        <section className="space-y-4">
          <h2 className={h2Class}>1. Definitions</h2>
          <ul className={`list-none space-y-3 ${bodyClass}`}>
            <li>
              <span className="font-medium text-foreground">&quot;Phrony&quot;, &quot;we&quot;, &quot;our&quot;</span>{' '}
              means Phrony Labs BV, a private limited company registered in the Netherlands under KvK number 42039600.
            </li>
            <li>
              <span className="font-medium text-foreground">&quot;You&quot;, &quot;your&quot;</span> means the
              individual or entity accessing the Phrony website, the Specification, the Runtime, or any Enterprise
              offering.
            </li>
            <li>
              <span className="font-medium text-foreground">&quot;Specification&quot;</span> means the open Phrony
              specification, including the manifest schema, the policy model, the runtime contract, and the trace format,
              made available under the Apache License 2.0.
            </li>
            <li>
              <span className="font-medium text-foreground">&quot;Runtime&quot;</span> means the Phrony reference
              runtime software, made available in source form under the Functional Source License (FSL) and intended to
              be self-hosted on infrastructure that you control.
            </li>
            <li>
              <span className="font-medium text-foreground">&quot;Manifest&quot;</span> means a declarative artifact
              that defines an Agent in conformance with the Specification.
            </li>
            <li>
              <span className="font-medium text-foreground">&quot;Agent&quot;</span> means an AI agent declared in a
              Manifest and executed by the Runtime.
            </li>
            <li>
              <span className="font-medium text-foreground">&quot;LLM&quot;</span> means a large language model
              provided by a third party (for example OpenAI, Anthropic, or Mistral) that an Agent uses for reasoning.
            </li>
            <li>
              <span className="font-medium text-foreground">&quot;Enterprise&quot;</span> means a commercial offering
              provided by Phrony under a signed Order Form and master agreement, including managed services, fleet
              management, support, and additional plugins.
            </li>
            <li>
              <span className="font-medium text-foreground">&quot;Order Form&quot;</span> means a written ordering
              document executed between Phrony and an Enterprise customer that references a master agreement.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>2. Acceptance</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              By using the Phrony website, you agree to these Terms as they relate to the website. Your use of the
              Specification is governed by the Apache License 2.0. Your use of the Runtime is governed by the Functional
              Source License accompanying the Runtime. Where the open-source license and these Terms address the same
              subject, the open-source license controls for that software.
            </p>
            <p>
              If you enter into an Order Form for Enterprise, that Order Form and its master agreement govern the
              Enterprise relationship and take precedence over these Terms for that relationship.
            </p>
            <p>
              We may update these Terms from time to time. Material changes affecting the website or the
              licensed-software relationship will be posted on phrony.com with the revised date. For Enterprise
              customers under a signed Order Form, changes do not apply retroactively to a committed term unless
              expressly agreed.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>3. The Specification</h2>
          <p className={bodyClass}>
            The Specification is open and is licensed under the Apache License 2.0. Anyone may read it, implement a
            conformant runtime against it, build tooling on it, and author Manifests that conform to it. Manifests you
            author are yours. Phrony claims no ownership over Manifests authored by you, and no obligation to support
            runtimes implemented by third parties against the Specification.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>4. The Runtime</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              The Runtime is source-available software licensed under the Functional Source License. You may read it,
              modify it, and run it on your own infrastructure free of charge, subject to the terms of that license.
              The principal restriction under the FSL is that you may not use the Runtime to provide a competing
              commercial product or service; the FSL terms control on this point and convert to an open-source license
              after the period stated in that license.
            </p>
            <p>
              The Runtime is self-hosted. It runs on infrastructure that you operate and control. Phrony does not operate
              the Runtime on your behalf and does not host your Agents under these Terms. Any managed or hosted
              operation of the Runtime by Phrony is part of Enterprise and is governed by a separate agreement.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>5. No managed service under these Terms</h2>
          <p className={bodyClass}>
            Phrony does not, under these Terms, run a multi-tenant service, execute your Agents for you, route your LLM
            calls, store your execution traces, or process data flowing through your Agents. Those activities, where
            Phrony performs them at all, occur only within an Enterprise engagement governed by an Order Form and, where
            personal data is processed, a Data Processing Agreement.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>6. Your responsibilities</h2>
          <p className={bodyClass}>When you run the Runtime and deploy Agents, you are responsible for:</p>
          <ul className={`list-disc space-y-3 pl-6 ${bodyClass}`}>
            <li>All Manifests, content, data, credentials, and configurations you deploy.</li>
            <li>Configuring appropriate policies, limits, and human-in-the-loop triggers for your use case.</li>
            <li>
              Ensuring qualified human operators are available to respond to the escalations your Manifests define.
            </li>
            <li>
              The security of your own infrastructure, including the secrets, credentials, and identities your Agents
              use.
            </li>
            <li>
              Your selection of, and contractual relationship with, any third-party LLM provider, and all token and usage
              costs charged by that provider.
            </li>
            <li>
              Ensuring your use of Phrony complies with all applicable laws and regulations, including the EU AI Act,
              GDPR, DORA, and any sector-specific rules that apply to you.
            </li>
            <li>
              Determining whether your AI system is a high-risk AI system under the EU AI Act and meeting all applicable
              provider obligations.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>7. Acceptable use</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              You shall not use Phrony for any purpose that is prohibited under the EU AI Act, including subliminal
              manipulation, exploitation of the vulnerabilities of specific groups, social scoring by public authorities,
              untargeted scraping for facial-recognition databases, or biometric categorisation based on sensitive
              attributes; that is otherwise illegal under applicable law; that is intended to cause harm to individuals,
              including discrimination, denial of rights, or circumvention of human-oversight requirements; or that
              infringes third-party intellectual property rights.
            </p>
            <p>
              Because the Runtime is self-hosted, Phrony has no technical ability to monitor or suspend your use. This
              clause is a contractual restriction, not a technical control. Where Phrony becomes aware of a violation in
              connection with an Enterprise relationship, it may exercise the remedies in the applicable Order Form.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>8. Intellectual property</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              Phrony retains all intellectual property rights in the Phrony software and the Phrony brand, except as
              expressly granted under the Apache License 2.0 for the Specification and the Functional Source License for
              the Runtime. Those licenses define what you may do with that software, and nothing in these Terms narrows
              the rights they grant.
            </p>
            <p>
              You retain all intellectual property rights in your Manifests, your data, your configurations, and the
              outputs your Agents generate. Running the Runtime on your own infrastructure grants Phrony no rights in
              any of it and gives Phrony no access to it.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>9. Data protection</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              <span className="font-medium text-foreground">Self-hosted Runtime.</span> Phrony does not access, process,
              or store data flowing through your self-hosted Runtime. Your Agents, their traces, and any personal data they
              touch remain entirely on your infrastructure. Phrony has no visibility into them. For self-hosted use,
              Phrony is neither a controller nor a processor of that data; you are.
            </p>
            <p>
              <span className="font-medium text-foreground">Website.</span> Phrony processes limited personal data about
              website visitors and about the individuals who manage licensed-software or Enterprise relationships. This
              is described in the{' '}
              <Link href="/privacy-policy" className="text-foreground underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              <span className="font-medium text-foreground">Enterprise.</span> Where an Enterprise engagement involves
              Phrony processing personal data on your behalf, that processing is governed by a separate Data Processing
              Agreement under which Phrony acts as processor and you act as controller.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>10. EU AI Act positioning</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              Phrony provides governance infrastructure designed to support your compliance with the EU AI Act for
              high-risk AI applications. Its technical controls, such as declared policies, limits, human-in-the-loop
              triggers, and structured traces, are designed to support obligations under Articles 9, 11, 12, 13, 14, and
              15 of Regulation (EU) 2024/1689.
            </p>
            <p>
              Phrony is positioned as a third-party component supplier under Article 25 of the EU AI Act. Phrony is not
              the provider of your high-risk AI system. You bear full provider obligations for your deployed AI system,
              including conformity assessment, CE marking, EU database registration, and post-market monitoring.
              Enterprise customers deploying high-risk AI systems may enter into an Article 25 Customer Agreement
              specifying the technical documentation, cooperation, and support Phrony provides.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>11. Warranties and disclaimers</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              The Specification and the Runtime are provided under their respective open-source licenses, which disclaim
              warranties to the extent stated in those licenses. To the maximum extent permitted by applicable law, and
              except as expressly stated in a signed Enterprise agreement, the Specification, the Runtime, and the
              website are provided &quot;as is&quot;, and Phrony disclaims all warranties, whether express, implied, or
              statutory, including warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            <p>
              <span className="font-medium text-foreground">AI output disclaimer.</span> Agents rely on third-party LLMs
              to generate reasoning and outputs. Phrony does not warrant the accuracy, completeness, or fitness for any
              purpose of any AI-generated reasoning, decision, or output. You are responsible for validating AI outputs
              before relying on them for any consequential decision.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>12. Limitation of liability</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              To the maximum extent permitted by applicable law, Phrony shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, nor for loss of profits, revenue, data, or business
              opportunities, arising out of or in connection with the Specification, the Runtime, or the website.
            </p>
            <p>
              Because the Specification and the Runtime are provided free of charge under open-source licenses,
              Phrony&apos;s aggregate liability arising from them is limited to the maximum extent permitted by
              applicable Dutch law. For any Enterprise relationship, liability is governed by the limitation and
              carve-out provisions of the applicable Order Form and master agreement, not by these Terms.
            </p>
            <p>
              Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable
              Dutch or EU law, including liability for death or personal injury caused by negligence, or for fraud.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>13. Term and changes</h2>
          <p className={bodyClass}>
            These Terms apply for as long as you use the website or the licensed software. You may stop using them at
            any time. The open-source licenses governing the Specification and the Runtime continue to apply to copies
            you hold according to their own terms. Enterprise term, renewal, and termination are governed by the
            applicable Order Form.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>14. Governing law and disputes</h2>
          <p className={bodyClass}>
            These Terms are governed by the laws of the Netherlands, excluding its conflict-of-laws principles and the
            United Nations Convention on Contracts for the International Sale of Goods. Any dispute will first be
            referred to good-faith negotiation between senior representatives for 30 days, then to mediation in the
            Netherlands for a further 60 days, and, if unresolved, to the exclusive jurisdiction of the competent Dutch
            court for Phrony&apos;s registered seat.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>15. General</h2>
          <p className={bodyClass}>
            If any provision is held invalid, the remainder stays in effect and the invalid provision is replaced by a
            valid one reflecting the original intent. These Terms, together with the Privacy Policy and the applicable
            open-source licenses, and, for Enterprise customers, the applicable Order Form, master agreement, DPA, and
            Article 25 Customer Agreement, constitute the entire agreement on their subject matter. In case of conflict,
            the order of precedence is: (1) the applicable Order Form, (2) the master agreement, (3) the DPA, (4) the
            Article 25 Customer Agreement, (5) the applicable open-source license for the relevant software, (6) these
            Terms, (7) the Privacy Policy. Failure to enforce a provision is not a waiver. Neither party may assign
            these Terms without the other&apos;s consent, except that Phrony may assign to a successor in a merger,
            acquisition, or sale of substantially all assets. These Terms are in English; the English version prevails
            over any translation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>16. Contact</h2>
          <div className={`space-y-2 ${bodyClass}`}>
            <p>
              Questions about these Terms:{' '}
              <a
                href="mailto:compliance@phrony.com"
                className="text-foreground underline underline-offset-4 hover:text-primary"
              >
                compliance@phrony.com
              </a>
            </p>
            <p>Phrony Labs BV, the Netherlands. KvK 42039600.</p>
          </div>
        </section>
      </div>
    </article>
  );
}
