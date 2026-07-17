import { DocPage, DocParagraph, DocProse } from '@/components/docs';
import { TypeScriptSdkConnectSection } from './typescript-connect';
import { TypeScriptSdkInstallSection } from './typescript-install';
import { TypeScriptSdkInteractiveSessionSection } from './typescript-interactive-session';
import { TypeScriptSdkRunSection } from './typescript-run';
import { TypeScriptSdkRuntimeClientSection } from './typescript-runtime-client';
import { TypeScriptSdkUtilitiesSection } from './typescript-utilities';
import { TypeScriptSdkWorkerSection } from './typescript-worker';

export function TypeScriptSdkPage() {
  return (
    <DocPage
      title="TypeScript SDK"
      description="The @phrony/sdk client for Node.js — install, run agents and bundles, stream sessions, and register workers."
      eyebrow="SDKs · TypeScript"
    >
      <DocProse>
        <DocParagraph>
          <code>@phrony/sdk</code> is the TypeScript client for the Phrony runtime. It targets Node.js 18+, uses{' '}
          <code>@grpc/grpc-js</code>, and maps proto <code>bytes</code> JSON fields through helpers so you work with
          ordinary JavaScript objects.
        </DocParagraph>
      </DocProse>

      <TypeScriptSdkInstallSection />
      <TypeScriptSdkConnectSection />
      <TypeScriptSdkRunSection />
      <TypeScriptSdkInteractiveSessionSection />
      <TypeScriptSdkWorkerSection />
      <TypeScriptSdkRuntimeClientSection />
      <TypeScriptSdkUtilitiesSection />
    </DocPage>
  );
}
