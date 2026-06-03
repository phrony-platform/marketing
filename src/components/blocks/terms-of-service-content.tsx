import Link from 'next/link';

const bodyClass =
  'text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[28px]';

const h2Class = 'font-sans text-lg font-semibold tracking-tight text-foreground md:text-xl';

const h3Class = 'font-sans text-base font-semibold tracking-tight text-foreground md:text-lg';

export function TermsOfServiceContent() {
  return (
    <article className="relative bg-background px-3 py-12 md:px-5 md:py-16">
      <header className="max-w-4xl border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Phrony</p>
        <h1 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Phrony Labs BV&nbsp;&nbsp;|&nbsp;&nbsp;KVK 42039600
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: April 2026</p>
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
              <span className="font-medium text-foreground">&quot;Customer&quot;, &quot;you&quot;, &quot;your&quot;</span>{' '}
              means the entity or individual accessing or using the Phrony platform.
            </li>
            <li>
              <span className="font-medium text-foreground">&quot;Platform&quot;</span> means the Phrony AI agent
              runtime and governance platform, including all features, APIs, dashboards, documentation, and related
              services.
            </li>
            <li>
              <span className="font-medium text-foreground">&quot;Agent&quot;</span> means an AI agent configured and
              deployed by the Customer on the Platform.
            </li>
            <li>
              <span className="font-medium text-foreground">&quot;Session&quot;</span> means a single execution
              instance of an Agent, from trigger event to completion.
            </li>
            <li>
              <span className="font-medium text-foreground">&quot;LLM&quot;</span> means a large language model
              provided by a third party (for example OpenAI, Anthropic, or Mistral) that powers the reasoning capability
              of an Agent.
            </li>
            <li>
              <span className="font-medium text-foreground">&quot;Order Form&quot;</span> means any written ordering
              document executed between Phrony and the Customer that references these Terms.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>2. Acceptance of terms</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              By accessing or using the Platform, you agree to be bound by these Terms. If you are entering into these
              Terms on behalf of an organisation, you represent and warrant that you have the authority to bind that
              organisation.
            </p>
            <p>
              Phrony may update these Terms from time to time. Material changes will be communicated by email or through
              the Platform with a minimum 30-day notice period. Continued use of the Platform after notice constitutes
              acceptance of the updated Terms. For Enterprise customers under a signed Order Form, changes do not apply
              retroactively to the current subscription term unless expressly agreed.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>3. Description of service</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              Phrony provides an AI agent runtime and governance platform. Phrony is not a chatbot, workflow engine, or
              LLM. Phrony provides the execution environment within which AI agents operate, controlling how they
              reason, act, and make decisions, with full auditability.
            </p>
            <p>
              Phrony does not generate AI decisions itself. The LLM configured by the Customer generates outputs.
              Phrony governs, logs, and enforces guardrails around those outputs.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>4. Service tiers &amp; billing</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              Phrony offers multiple service tiers, including Sandbox, Starter, Pro, and Enterprise. SaaS tiers are
              billed on a session-based model. Enterprise self-hosted deployments are licensed separately under annual
              agreements as set out in the applicable Order Form.
            </p>
            <p>
              LLM token costs are the Customer&apos;s responsibility. Where Phrony routes LLM API calls on behalf of
              the Customer (SaaS tiers), token costs are passed through with transparent per-session cost reporting.
            </p>
            <p>
              Phrony may adjust pricing with 60 days&apos; notice. Active subscriptions will not be affected until the
              next renewal period. For Enterprise customers under a multi-year Order Form, pricing for the committed
              term is fixed except as specifically set out in that Order Form.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>5. Customer responsibilities</h2>
          <p className={bodyClass}>The Customer is responsible for:</p>
          <ul className={`list-disc space-y-3 pl-6 ${bodyClass}`}>
            <li>All content, data, and configurations deployed on the Platform.</li>
            <li>
              Configuring appropriate policy guardrails, HITL thresholds, and access controls for its use case.
            </li>
            <li>
              Ensuring that its use of the Platform complies with all applicable laws and regulations, including but not
              limited to the EU AI Act, GDPR, DORA, and sector-specific regulations.
            </li>
            <li>Maintaining the confidentiality of API keys, credentials, and account access.</li>
            <li>
              Ensuring that qualified human operators are available to respond to HITL escalations within its own
              defined service levels.
            </li>
            <li>
              Determining whether its AI system constitutes a high-risk AI system under the EU AI Act and meeting all
              applicable provider obligations.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>6. Acceptable use</h2>
          <p className={bodyClass}>The Customer shall not use the Platform for any purpose that is:</p>
          <ul className={`list-disc space-y-3 pl-6 ${bodyClass}`}>
            <li>
              Prohibited under the EU AI Act, including but not limited to subliminal manipulation, exploitation of
              vulnerabilities of specific groups, social scoring by public authorities, real-time remote biometric
              identification in public spaces for law enforcement purposes outside permitted exceptions, predictive
              policing based solely on profiling, emotion recognition in workplaces or educational institutions outside
              permitted exceptions, untargeted scraping for facial recognition databases, or biometric categorisation
              based on sensitive attributes.
            </li>
            <li>Illegal under any applicable law or regulation.</li>
            <li>
              Intended to cause harm to individuals, including discrimination, denial of rights, or circumvention of
              human oversight requirements.
            </li>
            <li>In violation of third-party intellectual property rights.</li>
          </ul>
          <p className={bodyClass}>
            Phrony may suspend or terminate access to the Platform if it becomes aware of a violation of this clause,
            with notice to the Customer where practicable.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>7. Intellectual property</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              Phrony retains all intellectual property rights in the Platform, including its software, architecture,
              documentation, and branding. These Terms do not grant the Customer any rights in Phrony&apos;s
              intellectual property except the limited, non-exclusive, non-transferable right to use the Platform as
              described herein and in the applicable Order Form.
            </p>
            <p>
              The Customer retains all intellectual property rights in its data, agent configurations, and outputs
              generated through its use of the Platform. The Customer grants Phrony a limited licence to process such
              data solely to the extent necessary to provide the Platform service.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>8. Data protection</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              Phrony&apos;s data processing practices are described in our{' '}
              <Link href="/privacy-policy" className="text-foreground underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              <span className="font-medium text-foreground">Self-hosted deployments.</span> Phrony does not access,
              process, or store data flowing through your self-hosted Phrony instance. Phrony&apos;s role is limited to
              software licensing, delivery, and support.
            </p>
            <p>
              <span className="font-medium text-foreground">SaaS deployments.</span> Data processing is governed by a
              separate Data Processing Agreement (DPA) provided upon request. Phrony acts as data processor; the
              Customer is the data controller.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>9. EU AI Act compliance</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              Phrony provides governance infrastructure designed to support Customer compliance with the EU AI Act for
              high-risk AI applications. Phrony&apos;s technical controls are designed to support the Customer&apos;s
              compliance obligations under Articles 9, 11, 12, 13, 14, and 15 of Regulation (EU) 2024/1689.
            </p>
            <p>
              Phrony is positioned as a third-party component supplier under Article 25 of the EU AI Act. Phrony is not
              the provider of the Customer&apos;s high-risk AI system. The Customer bears full provider obligations
              under the EU AI Act for its deployed AI system, including conformity assessment, CE marking, EU database
              registration, and post-market monitoring.
            </p>
            <p>
              Customers deploying high-risk AI systems on the Platform may enter into an Article 25 Customer Agreement
              with Phrony, specifying the technical documentation, cooperation, and support Phrony provides.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>10. Service availability</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              Phrony targets 99.9% monthly uptime for SaaS deployments, excluding scheduled maintenance. Scheduled
              maintenance windows will be communicated at least 48 hours in advance. Specific service levels, service
              credits, and measurement methodology for Enterprise customers are set out in the applicable Order Form.
            </p>
            <p>
              Self-hosted deployments operate on the Customer&apos;s infrastructure and are not subject to Phrony&apos;s
              availability commitments.
            </p>
            <p>
              Phrony does not guarantee the availability, accuracy, or performance of third-party LLM providers. Outages
              or degradations of LLM providers are outside Phrony&apos;s control.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>11. Warranties &amp; disclaimers</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              Phrony warrants that the Platform will perform materially in accordance with its published documentation.
              Phrony will use commercially reasonable efforts to correct material defects in the Platform.
            </p>
            <p>
              <span className="font-medium text-foreground">AI output disclaimer.</span> The Customer acknowledges that
              the Platform relies on third-party LLMs to generate reasoning and outputs. Phrony does not warrant the
              accuracy, completeness, or fitness for a particular purpose of any AI-generated reasoning, decision, or
              output. The Customer is responsible for validating AI outputs before using them to make consequential
              decisions.
            </p>
            <p>
              Except as expressly stated in these Terms or in an applicable Order Form, the Platform is provided
              &quot;as is&quot; and Phrony disclaims all other warranties, whether express, implied, or statutory,
              including warranties of merchantability, fitness for a particular purpose, and non-infringement, to the
              maximum extent permitted by Dutch law.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>12. Limitation of liability</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              Subject to the carve-outs in clause 12.2, and to the maximum extent permitted by applicable law, each
              party&apos;s total aggregate liability under or in connection with these Terms shall not exceed the total
              fees paid by the Customer to Phrony in the 12 months preceding the event giving rise to the claim.
            </p>
            <p>Neither party shall be liable for:</p>
            <ul className={`list-disc space-y-2 pl-6 ${bodyClass}`}>
              <li>Indirect, incidental, special, consequential, or punitive damages.</li>
              <li>Loss of profits, revenue, data, or business opportunities.</li>
              <li>
                Decisions made by AI agents, including LLM-generated outputs, except to the extent caused by
                Phrony&apos;s gross negligence or wilful misconduct.
              </li>
              <li>The Customer&apos;s failure to comply with applicable laws or regulations.</li>
              <li>Third-party LLM provider outages or errors.</li>
            </ul>
            <h3 className={`${h3Class} pt-2`}>12.2 Carve-outs from the liability cap</h3>
            <p>The liability cap in clause 12.1 does not apply to:</p>
            <ul className={`list-disc space-y-2 pl-6 ${bodyClass}`}>
              <li>Phrony&apos;s obligations under clause 13 (IP indemnification).</li>
              <li>The Customer&apos;s obligations under clause 14 (Customer indemnification).</li>
              <li>Breach of confidentiality obligations under clause 16.</li>
              <li>Fraud, gross negligence, or wilful misconduct.</li>
              <li>
                Any liability that cannot be limited or excluded under applicable Dutch or EU law, including liability
                for death or personal injury caused by negligence.
              </li>
            </ul>
            <p>
              For claims arising from data protection breaches caused by Phrony, liability is capped at two times the
              fees paid by the Customer to Phrony in the 12 months preceding the claim, subject to the exclusions above.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>13. IP indemnification</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              Phrony will defend the Customer against any third-party claim alleging that the Customer&apos;s use of the
              Platform, as authorised under these Terms, infringes the third party&apos;s intellectual property rights.
              Phrony will pay damages finally awarded against the Customer or amounts agreed in settlement, provided that
              the Customer promptly notifies Phrony of the claim, grants Phrony sole control of the defence, and provides
              reasonable cooperation.
            </p>
            <p>This obligation does not apply to claims arising from:</p>
            <ul className={`list-disc space-y-2 pl-6 ${bodyClass}`}>
              <li>
                The Customer&apos;s combination of the Platform with third-party products or services not provided by
                Phrony, where the claim would not have arisen but for that combination.
              </li>
              <li>Modifications to the Platform made by the Customer or at its direction.</li>
              <li>The Customer&apos;s use of the Platform in breach of these Terms or the applicable Order Form.</li>
              <li>
                Content, data, agent configurations, or outputs supplied by the Customer or generated under the
                Customer&apos;s direction.
              </li>
              <li>
                Outputs generated by third-party LLMs. Customers should refer to the terms of their chosen LLM provider
                for the scope of indemnification, if any, that applies to LLM outputs.
              </li>
            </ul>
            <p>
              If the Platform becomes, or in Phrony&apos;s reasonable opinion is likely to become, the subject of an
              infringement claim, Phrony may at its option procure the right for the Customer to continue using the
              Platform, modify the Platform to be non-infringing, or terminate the affected service with a pro-rata
              refund of prepaid fees.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>14. Customer indemnification</h2>
          <p className={bodyClass}>The Customer will defend Phrony against any third-party claim arising from:</p>
          <ul className={`list-disc space-y-2 pl-6 ${bodyClass}`}>
            <li>The Customer&apos;s use of the Platform in violation of these Terms or applicable law.</li>
            <li>The Customer&apos;s failure to meet its provider obligations under the EU AI Act or equivalent regulation.</li>
            <li>The Customer&apos;s agent configurations, data, or outputs.</li>
            <li>Claims by individuals affected by decisions made or assisted by the Customer&apos;s AI agents.</li>
          </ul>
          <p className={bodyClass}>
            The Customer will pay damages finally awarded against Phrony or amounts agreed in settlement, subject to the
            same cooperation procedure as clause 13.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>15. Termination</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              For SaaS month-to-month subscriptions, either party may terminate with 30 days&apos; written notice.
            </p>
            <p>
              For Enterprise customers under an Order Form, termination rights are governed by the applicable Order Form,
              which typically provides for a fixed term with renewal and, where applicable, termination for cause.
            </p>
            <p>
              Either party may terminate these Terms immediately for cause if the other party materially breaches these
              Terms and fails to cure such breach within 30 days of written notice. Phrony may terminate immediately
              without cure period if the Customer breaches clause 6 (Acceptable Use) or fails to pay invoices within 30
              days of the due date.
            </p>
            <p>
              Upon termination, the Customer&apos;s access to the Platform will be revoked. SaaS customers may export
              their data within 30 days of termination, after which data will be deleted in accordance with the Privacy
              Policy. Self-hosted customers retain their data on their own infrastructure; licence keys will be
              deactivated upon termination.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>16. Confidentiality</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              Each party agrees to treat confidential information received from the other party with the same degree of
              care it uses for its own confidential information, and not less than reasonable care. Confidential
              information includes pricing, technical documentation, business plans, and customer data.
            </p>
            <p>This obligation does not apply to information that is:</p>
            <ul className={`list-disc space-y-2 pl-6 ${bodyClass}`}>
              <li>Publicly available through no fault of the receiving party.</li>
              <li>Independently developed without use of the disclosing party&apos;s confidential information.</li>
              <li>Received from a third party without restriction and without breach of confidentiality obligations.</li>
              <li>
                Required to be disclosed by law, court order, or regulatory authority, in which case the receiving party
                will give the disclosing party prompt notice where legally permissible.
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>17. Force majeure</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              Neither party will be liable for any delay or failure to perform its obligations under these Terms to the
              extent caused by events beyond its reasonable control, including acts of God, war, terrorism, civil
              unrest, government action, labour disputes, pandemics, failures of the internet or public
              telecommunications networks, or failures of third-party service providers not under the affected
              party&apos;s control.
            </p>
            <p>
              The affected party will promptly notify the other party of the event and use commercially reasonable
              efforts to mitigate its impact. This clause does not excuse payment obligations.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>18. Governing law &amp; disputes</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              These Terms are governed by the laws of the Netherlands, excluding its conflict of laws principles and
              excluding the United Nations Convention on Contracts for the International Sale of Goods.
            </p>
            <p>
              Any dispute arising from or in connection with these Terms will first be referred to good-faith
              negotiation between senior representatives of the parties for a period of 30 days. If unresolved, the
              parties will attempt mediation in the Netherlands for a further 60 days. If mediation fails, the dispute
              will be submitted to the exclusive jurisdiction of the competent court in Amsterdam, the Netherlands.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>19. General provisions</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              <span className="font-medium text-foreground">Severability.</span> If any provision of these Terms is held
              to be invalid or unenforceable, the remaining provisions will remain in full force and effect, and the
              invalid provision will be replaced by a valid provision that most closely reflects the original intent.
            </p>
            <p>
              <span className="font-medium text-foreground">Entire agreement.</span> These Terms, together with the
              Privacy Policy, any applicable Order Form, and any DPA or Article 25 Customer Agreement, constitute the
              entire agreement between the parties regarding the subject matter and supersede all prior agreements and
              understandings.
            </p>
            <p>
              <span className="font-medium text-foreground">Order of precedence.</span> In the event of conflict
              between these documents, the order of precedence is: (1) the applicable Order Form, (2) the DPA for data
              protection matters, (3) the Article 25 Customer Agreement for EU AI Act matters, (4) these Terms, (5) the
              Privacy Policy.
            </p>
            <p>
              <span className="font-medium text-foreground">No waiver.</span> Failure to enforce any provision of these
              Terms does not constitute a waiver of that provision.
            </p>
            <p>
              <span className="font-medium text-foreground">Assignment.</span> Neither party may assign these Terms
              without the other party&apos;s prior written consent, except that Phrony may assign to a successor entity
              in connection with a merger, acquisition, or sale of substantially all of its assets.
            </p>
            <p>
              <span className="font-medium text-foreground">Language.</span> These Terms are provided in English. In the
              event of any discrepancy between this version and any translation, the English version prevails.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
