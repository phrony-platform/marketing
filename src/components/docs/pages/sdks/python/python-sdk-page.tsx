import { DocPage, DocParagraph, DocProse } from '@/components/docs';
import { PythonSdkConnectSection } from './python-connect';
import { PythonSdkInstallSection } from './python-install';
import { PythonSdkInteractiveSessionSection } from './python-interactive-session';
import { PythonSdkRunSection } from './python-run';
import { PythonSdkRuntimeClientSection } from './python-runtime-client';
import { PythonSdkUtilitiesSection } from './python-utilities';
import { PythonSdkWorkerSection } from './python-worker';

export function PythonSdkPage() {
  return (
    <DocPage
      title="Python SDK"
      description="The phrony client for Python — install, run agents and bundles, stream sessions, and register workers."
      eyebrow="SDKs · Python"
    >
      <DocProse>
        <DocParagraph>
          <code>phrony</code> is the Python client for the Phrony runtime. It targets Python 3.10+, uses{' '}
          <code>grpc.aio</code> for async transport, and maps proto <code>bytes</code> JSON fields through helpers so
          you work with ordinary Python objects. All public APIs are <code>async</code> — run them with{' '}
          <code>asyncio</code>.
        </DocParagraph>
      </DocProse>

      <PythonSdkInstallSection />
      <PythonSdkConnectSection />
      <PythonSdkRunSection />
      <PythonSdkInteractiveSessionSection />
      <PythonSdkWorkerSection />
      <PythonSdkRuntimeClientSection />
      <PythonSdkUtilitiesSection />
    </DocPage>
  );
}
