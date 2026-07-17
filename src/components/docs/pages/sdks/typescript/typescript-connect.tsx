import { DocH2, DocParagraph, DocProse } from '@/components/docs';
import { MethodExample } from './method-example';
import * as ex from './typescript-examples';

export function TypeScriptSdkConnectSection() {
  return (
    <DocProse>
      <DocH2 id="connect">Connect to the runtime</DocH2>
      <DocParagraph>
        Every SDK entrypoint dials the runtime over gRPC. Set <code>PHRONY_RUNTIME_ADDR</code> or pass an explicit
        address. After{' '}
        <a href="#install" className="text-foreground underline underline-offset-4 hover:no-underline">
          installing
        </a>{' '}
        the package, use one of the patterns below.
      </DocParagraph>

      <DocH2>RuntimeClient</DocH2>
      <MethodExample
        name="RuntimeClient.connect(options?)"
        description="Dial the runtime and health service. Options: address, credentials, clientOptions. The resolved address is available on client.address."
        code={ex.runtimeClientConnect}
      />
      <MethodExample
        name="client.close()"
        description="Close runtime and health gRPC clients when finished."
        code={`const client = await RuntimeClient.connect();
// ...
client.close();`}
      />

      <DocH2>Phrony</DocH2>
      <MethodExample
        name="Phrony.connect(options?)"
        description="High-level facade with the same connection options (runtimeAddr maps to address)."
        code={ex.phronyConnect}
      />

      <DocH2>Address resolution</DocH2>
      <MethodExample
        name="resolveRuntimeAddr(address?)"
        description="Resolve the gRPC target: explicit argument, then PHRONY_RUNTIME_ADDR, then 127.0.0.1:7777."
        code={ex.resolveRuntimeAddrExample}
      />
      <MethodExample
        name="dialRuntime(options?)"
        description="Low-level dial returning runtime, health, address, and close() without the RuntimeClient wrapper."
        code={ex.dialRuntimeExample}
      />

      <DocH2>TLS</DocH2>
      <MethodExample
        name="credentials (optional)"
        description="By default the SDK uses insecure credentials. Pass createSsl from @grpc/grpc-js when the runtime requires TLS."
        code={ex.tlsCredentials}
      />

      <DocH2>Health check</DocH2>
      <MethodExample
        name="client.health()"
        description="Standard gRPC health client on the same address as the runtime."
        code={ex.healthCheck}
      />

      <DocH2>Cleanup</DocH2>
      <MethodExample name="Phrony.close() / RuntimeClient.close()" code={ex.closeClients} />
    </DocProse>
  );
}
