import { DocH2, DocParagraph, DocProse } from '@/components/docs';
import { MethodExample } from '../typescript/method-example';
import * as ex from './python-examples';

export function PythonSdkConnectSection() {
  return (
    <DocProse>
      <DocH2 id="connect">Connect to the runtime</DocH2>
      <DocParagraph>
        Every SDK entrypoint dials the runtime over gRPC. Set <code>PHRONY_RUNTIME_ADDR</code> or pass an explicit
        address. After{' '}
        <a href="#install" className="text-foreground underline underline-offset-4 hover:no-underline">
          installing
        </a>{' '}
        the package, use one of the patterns below. All connection methods are async.
      </DocParagraph>

      <DocH2>RuntimeClient</DocH2>
      <MethodExample
        name="await RuntimeClient.connect(...)"
        description="Dial the runtime and health service. Options: address, credentials, channel_options. The resolved address is available on client.address."
        code={ex.runtimeClientConnect}
        language="python"
      />
      <MethodExample
        name="await client.close()"
        description="Close the gRPC channel when finished."
        code={`client = await RuntimeClient.connect()
# ...
await client.close()`}
        language="python"
      />

      <DocH2>Phrony</DocH2>
      <MethodExample
        name="await Phrony.connect(...)"
        description="High-level facade with the same connection options (runtime_addr maps to address)."
        code={ex.phronyConnect}
        language="python"
      />

      <DocH2>Address resolution</DocH2>
      <MethodExample
        name="resolve_runtime_addr(address?)"
        description="Resolve the gRPC target: explicit argument, then PHRONY_RUNTIME_ADDR, then 127.0.0.1:7777."
        code={ex.resolveRuntimeAddrExample}
        language="python"
      />
      <MethodExample
        name="dial_runtime(...)"
        description="Low-level dial returning channel, runtime stub, health stub, address, and close() without the RuntimeClient wrapper."
        code={ex.dialRuntimeExample}
        language="python"
      />

      <DocH2>TLS</DocH2>
      <MethodExample
        name="credentials (optional)"
        description="By default the SDK uses an insecure channel. Pass grpc.ssl_channel_credentials when the runtime requires TLS."
        code={ex.tlsCredentials}
        language="python"
      />

      <DocH2>Health check</DocH2>
      <MethodExample
        name="client.health()"
        description="Standard gRPC health stub on the same address as the runtime."
        code={ex.healthCheck}
        language="python"
      />

      <DocH2>Cleanup</DocH2>
      <MethodExample
        name="await Phrony.close() / await RuntimeClient.close()"
        code={ex.closeClients}
        language="python"
      />
    </DocProse>
  );
}
