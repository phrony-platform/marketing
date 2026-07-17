import Link from 'next/link';

import { DocH2, DocParagraph, DocProse } from '@/components/docs';
import { MethodExample } from '../typescript/method-example';
import * as ex from './python-examples';

export function PythonSdkInstallSection() {
  return (
    <DocProse>
      <DocH2 id="install">Install</DocH2>
      <DocParagraph>
        Install from PyPI, then{' '}
        <a href="#connect" className="text-foreground underline underline-offset-4 hover:no-underline">
          connect to a runtime
        </a>
        . For a guided tool-binding walkthrough, see{' '}
        <Link
          href="/docs/quick-start/tool-binding"
          className="text-foreground underline underline-offset-4 hover:no-underline"
        >
          Add a tool binding
        </Link>
        .
      </DocParagraph>

      <DocH2>Package</DocH2>
      <MethodExample
        name="pip install phrony"
        description="Requires Python 3.10+."
        code={ex.installPackage}
        language="bash"
      />

      <DocH2>Import paths</DocH2>
      <MethodExample
        name="phrony and phrony.worker"
        description="Use the main package for Phrony, RuntimeClient, AgentRef, BundleRef, InteractiveSession, and Worker. Use phrony.worker when you only need WorkStream and worker types."
        code={ex.importPaths}
        language="python"
      />
    </DocProse>
  );
}
