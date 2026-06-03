/**
 * Source for the Shiki highlighter in `embedded-typescript-sdk-section.tsx`.
 * Renders with `codeToHtml` so the snippet is syntax-colored on the site.
 * Syntax coloring on the public site comes from Shiki, not the TS language service inside this string.
 */
export const EMBEDDED_SDK_MARKETING_EXAMPLE = `import { Phrony } from "@phrony/sdk";

const phrony = new Phrony({ credentials: process.env.PHRONY_CREDENTIALS! });

// Your application references a deployed agent — it does not contain it.
const result = await phrony.agent("claims-triage").run({
  input: { claimId: "CLM-48219" },
});

// result.output when the session completes.
// Every tool call, policy check, and trace — produced by the runtime.`;
