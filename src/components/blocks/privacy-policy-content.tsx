const bodyClass =
  'text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[28px]';

const h2Class = 'font-sans text-lg font-semibold tracking-tight text-foreground md:text-xl';

export function PrivacyPolicyContent() {
  return (
    <article className="relative bg-background px-3 py-12 md:px-5 md:py-16">
      <header className="max-w-4xl border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Phrony</p>
        <h1 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Phrony Labs BV&nbsp;&nbsp;|&nbsp;&nbsp;KvK 42039600
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>
      </header>

      <div className="mx-auto mt-12 max-w-4xl space-y-10">
        <section className="space-y-4">
          <h2 className={h2Class}>1. Who we are</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              Phrony Labs BV (&quot;Phrony&quot;, &quot;we&quot;, &quot;our&quot;) is the data controller for personal
              data collected through our website (phrony.com) and for the limited personal data we hold to manage
              licensed-software and Enterprise relationships. Phrony Labs BV is registered in the Netherlands under KvK
              number 42039600.
            </p>
            <p>
              Contact:{' '}
              <a
                href="mailto:compliance@phrony.com"
                className="text-foreground underline underline-offset-4 hover:text-primary"
              >
                compliance@phrony.com
              </a>
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>2. The short version</h2>
          <p className={bodyClass}>
            Phrony is an open specification and a self-hosted runtime. The software runs on infrastructure that you
            control. We do not see your Agents, your traces, or any data your Agents process. The only personal data we
            hold is what you give us through the website and what we need to manage a software or Enterprise
            relationship with you. We do not sell personal data, and we do not use anyone&apos;s data to train AI models.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>3. What we collect</h2>
          <div className="space-y-6">
            <div>
              <p className={`font-medium text-foreground ${bodyClass}`}>Website visitors</p>
              <ul className={`list-disc space-y-2 pl-6 ${bodyClass}`}>
                <li>
                  Contact details you provide (name, email, company) when you request a demo, subscribe to updates, or
                  contact us.
                </li>
                <li>Technical data: IP address, browser type, device type, pages visited, referral source.</li>
                <li>Cookie data: essential and analytics cookies, as described in section 8.</li>
              </ul>
            </div>
            <div>
              <p className={`font-medium text-foreground ${bodyClass}`}>Licensed-software and Enterprise contacts</p>
              <ul className={`list-disc space-y-2 pl-6 ${bodyClass}`}>
                <li>
                  Account and relationship data for license management and Enterprise engagements: name, email,
                  organisation, and role of the individuals we deal with.
                </li>
                <li>
                  Billing and contractual records for Enterprise customers, processed through our payment and accounting
                  providers.
                </li>
              </ul>
            </div>
            <div>
              <p className={`font-medium text-foreground ${bodyClass}`}>What we do not collect</p>
              <p className={bodyClass}>
                We do not collect, access, or receive any data from your self-hosted Runtime. Your Agents, their
                execution traces, and any personal data they process stay entirely on your infrastructure. We have no
                technical means of seeing them.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>4. How we use it</h2>
          <ul className={`list-disc space-y-3 pl-6 ${bodyClass}`}>
            <li>
              To operate the website and respond to enquiries (legal basis: legitimate interest, GDPR Article 6(1)(f), and
              steps prior to contract, Article 6(1)(b)).
            </li>
            <li>
              To manage software licenses and Enterprise relationships, including support (legal basis: performance of
              contract, Article 6(1)(b)).
            </li>
            <li>
              For billing, invoicing, and statutory accounting (legal basis: legal obligation, Article 6(1)(c), and
              performance of contract).
            </li>
            <li>
              For product and website analytics in aggregate (legal basis: legitimate interest, Article 6(1)(f)).
            </li>
            <li>For marketing communications, only with consent (legal basis: consent, Article 6(1)(a)).</li>
          </ul>
          <p className={bodyClass}>
            We do not sell personal data. We do not use customer or visitor data to train AI models.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>5. Self-hosted deployments</h2>
          <p className={bodyClass}>
            For self-hosted use of the Runtime, Phrony is neither a data controller nor a data processor of the data your
            Agents handle. You are the controller and, as applicable, the processor for all data processed on your own
            infrastructure. Phrony has no access to it. The only personal data Phrony holds in connection with
            self-hosted use is the contact and license-management data described in section 3.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>6. Enterprise processing</h2>
          <p className={bodyClass}>
            Where an Enterprise engagement involves Phrony processing personal data on your behalf (for example, in a
            managed deployment), Phrony acts as a data processor under GDPR Article 28, governed by a separate Data
            Processing Agreement. We process that data only on your documented instructions and only to provide the
            agreed service. The current list of sub-processors used in any such engagement is provided as part of the
            Data Processing Agreement, and you are notified of changes with a minimum 14-day notice period and a right
            to object on compliance grounds.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>7. International transfers</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              Phrony is based in the Netherlands (EU) and aims to keep personal data within the European Economic Area.
              Where personal data we control is transferred outside the EEA, we rely on the EU-US Data Privacy
              Framework (where the recipient is certified) or on Standard Contractual Clauses approved by the European
              Commission. Note that for self-hosted use, any transfer of data your Agents process, including calls to LLM
              providers, is determined and controlled by you, not by Phrony.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>8. Cookies</h2>
          <p className={bodyClass}>
            The website uses essential cookies (required to function, no consent needed) and analytics cookies (consent
            required). You can manage analytics cookies through the cookie banner or your browser settings.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>9. Retention</h2>
          <ul className={`list-disc space-y-3 pl-6 ${bodyClass}`}>
            <li>
              Website enquiry and contact data: kept while the enquiry is active and for a reasonable follow-up period,
              then deleted.
            </li>
            <li>
              License and Enterprise relationship data: kept for the duration of the relationship plus 12 months after
              it ends.
            </li>
            <li>Billing records: 7 years (Dutch tax-law requirement).</li>
            <li>Marketing data: until consent is withdrawn.</li>
          </ul>
          <p className={bodyClass}>
            Self-hosted customers control their own data retention entirely. Phrony retains nothing from self-hosted
            deployments.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>10. Your rights</h2>
          <p className={bodyClass}>
            Under the GDPR you have the rights of access (Art. 15), rectification (Art. 16), erasure (Art. 17),
            restriction (Art. 18), data portability (Art. 20), and objection (Art. 21), and the right to withdraw
            consent at any time for consent-based processing. To exercise any of these, contact{' '}
            <a
              href="mailto:compliance@phrony.com"
              className="text-foreground underline underline-offset-4 hover:text-primary"
            >
              compliance@phrony.com
            </a>
            . We will respond within 30 days.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>11. Security</h2>
          <p className={bodyClass}>
            For the data we do hold, we apply appropriate technical and organisational measures, including encryption in
            transit (TLS) and at rest, role-based access control, an encrypted secrets vault for any credentials we
            manage, and regular security assessments. Because self-hosted deployments run on your infrastructure, the
            security of the data your Agents process is your responsibility.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>12. Complaints and contact</h2>
          <div className={`space-y-4 ${bodyClass}`}>
            <p>
              For any question or concern about our data practices, contact{' '}
              <a
                href="mailto:compliance@phrony.com"
                className="text-foreground underline underline-offset-4 hover:text-primary"
              >
                compliance@phrony.com
              </a>
              . Phrony Labs BV, the Netherlands.
            </p>
            <p>
              You also have the right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit
              Persoonsgegevens) at{' '}
              <a
                href="https://autoriteitpersoonsgegevens.nl"
                className="text-foreground underline underline-offset-4 hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                autoriteitpersoonsgegevens.nl
              </a>
              .
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2Class}>13. Changes</h2>
          <p className={bodyClass}>
            We may update this Privacy Policy from time to time. Material changes will be communicated via the website
            or by email. The &quot;Last updated&quot; date above indicates the most recent revision.
          </p>
        </section>
      </div>
    </article>
  );
}
