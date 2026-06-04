/** Code samples for TypeScript SDK documentation pages. */

export const installPackage = `pnpm add @phrony/sdk`;

export const importPaths = `// Full SDK
import { Phrony, RuntimeClient, Worker } from "@phrony/sdk";

// Worker-only subpath (includes WorkStream)
import { Worker, WorkStream } from "@phrony/sdk/worker";`;

export const runtimeClientConnect = `import { RuntimeClient } from "@phrony/sdk";

const client = await RuntimeClient.connect({
  address: process.env.PHRONY_RUNTIME_ADDR ?? "127.0.0.1:7777",
});

console.log("Connected to", client.address);`;

export const phronyConnect = `import { Phrony } from "@phrony/sdk";

const phrony = await Phrony.connect({
  runtimeAddr: process.env.PHRONY_RUNTIME_ADDR,
});

// Same options as RuntimeClient: credentials, address via runtimeAddr
phrony.close();`;

export const resolveRuntimeAddrExample = `import { resolveRuntimeAddr, DEFAULT_RUNTIME_ADDR } from "@phrony/sdk";

// Explicit address wins, then PHRONY_RUNTIME_ADDR, then DEFAULT_RUNTIME_ADDR
const addr = resolveRuntimeAddr(); // e.g. "127.0.0.1:7777"
console.log(DEFAULT_RUNTIME_ADDR);`;

export const dialRuntimeExample = `import { dialRuntime } from "@phrony/sdk";

const dial = dialRuntime({ address: "127.0.0.1:7777" });
try {
  const version = await new Promise((resolve, reject) => {
    dial.runtime.getVersion({}, (err, res) => (err ? reject(err) : resolve(res)));
  });
  console.log(version);
} finally {
  dial.close();
}`;

export const tlsCredentials = `import { credentials } from "@grpc/grpc-js";
import { readFileSync } from "node:fs";
import { RuntimeClient } from "@phrony/sdk";

const client = await RuntimeClient.connect({
  address: "runtime.example.com:7777",
  credentials: credentials.createSsl(
    readFileSync("ca.pem"),
    readFileSync("client-key.pem"),
    readFileSync("client-cert.pem"),
  ),
});`;

export const healthCheck = `import { RuntimeClient } from "@phrony/sdk";

const client = await RuntimeClient.connect();
const health = client.health();

await new Promise<void>((resolve, reject) => {
  health.check({ service: "" }, (err, res) => {
    if (err) reject(err);
    else {
      console.log(res?.status); // SERVING, NOT_SERVING, etc.
      resolve();
    }
  });
});

client.close();`;

export const closeClients = `import { Phrony, RuntimeClient } from "@phrony/sdk";

const client = await RuntimeClient.connect();
client.close();

const phrony = await Phrony.connect();
phrony.close();`;

export const phronyConstructor = `import { Phrony } from "@phrony/sdk";

const phrony = new Phrony({ runtimeAddr: "127.0.0.1:7777" });
const agent = phrony.agent("default/my-agent");
// Client dials lazily on first run() or runtimeClient()`;

export const phronyAgentRef = `const phrony = await Phrony.connect();

const pinned = phrony.agent("default/my-agent@0.2.0");
const latest = phrony.agent("default/my-agent");`;

export const phronyRunWait = `import { Phrony } from "@phrony/sdk";

const phrony = await Phrony.connect();

const result = await phrony.agent("default/my-agent").run({
  input: { claimId: "CLM-48219" },
  resolvedSecrets: { openai: process.env.OPENAI_API_KEY },
});

console.log(result.sessionId, result.output, result.stopReason);
phrony.close();`;

export const phronyRunNoWait = `import { Phrony } from "@phrony/sdk";

const phrony = await Phrony.connect();

const result = await phrony.agent("default/my-agent").run({
  input: { claimId: "CLM-48219" },
  wait: false,
});

console.log(result.sessionId, result.status);`;

export const phronyRunInteractive = `import { Phrony } from "@phrony/sdk";

const phrony = await Phrony.connect();

const session = await phrony.agent("default/my-agent").runInteractive({
  input: { question: "Summarize claim CLM-48219" },
});

for await (const event of session.events()) {
  if (event.type === "text_delta") process.stdout.write(event.delta);
}
session.close();`;

export const phronyRuntimeClient = `import { Phrony } from "@phrony/sdk";

const phrony = await Phrony.connect();
const client = await phrony.runtimeClient();
const agents = await client.listAgents();`;

export const interactiveStart = `import { RuntimeClient } from "@phrony/sdk";

const client = await RuntimeClient.connect();
const session = client.runSessionInteractive();

session.start({
  agentRef: { namespace: "default", name: "my-agent", version: "" },
  input: { question: "Hello" },
  resolvedSecrets: { openai: process.env.OPENAI_API_KEY },
});`;

export const interactiveAttach = `session.attach({ sessionId: "sess_abc123" });`;

export const interactiveUserMessage = `// After an awaiting_input event:
session.sendUserMessage("Use a shorter summary.");`;

export const interactiveApproval = `// Inside your events() loop when event.type === "approval_required":
session.decideToolApproval({
  approvalId: event.approval.approvalId,
  approved: true,
  comment: "Approved by operator",
  args: { city: "Oslo" },
});`;

export const interactiveEvents = `for await (const event of session.events()) {
  switch (event.type) {
    case "session_started":
      console.log(event.session.sessionId);
      break;
    case "text_delta":
      process.stdout.write(event.delta);
      break;
    case "completed":
      console.log(event.output);
      break;
    case "failed":
      throw new Error(event.message);
  }
}`;

export const interactiveClose = `session.close();
client.close();`;

export const workerConstructor = `import { Worker } from "@phrony/sdk/worker";

const worker = new Worker({
  workerId: "weather-worker-1",
  runtimeAddr: process.env.PHRONY_RUNTIME_ADDR,
  workloadIdentity: "k8s://default/weather-worker",
  imageDigest: "sha256:abc…",
});`;

export const workerRegisterTool = `worker.registerTool({
  tool: "weather.get-forecast",
  version: "1.0.0",
  maxConcurrency: 4,
  handler: async (args: { city: string }, ctx) => {
    if (ctx.signal.aborted) throw new Error("cancelled");
    return { temp_c: 12, city: args.city };
  },
});`;

export const workerConnectClose = `await worker.connect(); // blocks until disconnect
await worker.close();`;

export const workerToolError = `import { ToolError } from "@phrony/sdk/worker";

handler: async () => {
  throw new ToolError("UPSTREAM_TIMEOUT", "Weather API timed out");
}`;

export const workStreamLowLevel = `import { RuntimeClient, WorkStream, buildHandlerAdvertisements } from "@phrony/sdk/worker";

const client = await RuntimeClient.connect();
const stream = new WorkStream(client.work());

stream.sendRegister({
  workerId: "weather-worker-1",
  handlers: buildHandlerAdvertisements([
    { tool: "weather.get-forecast", version: "1.0.0", maxConcurrency: 4 },
  ]),
  inFlight: stream.inFlightCalls(),
});

stream.run({
  onRegistered: (leaseTtlMs) => console.log("lease", leaseTtlMs),
  onInvoke: (invoke) => {
    stream.markCallExecuting(invoke.callId);
    stream.sendResult({
      callId: invoke.callId,
      payload: Buffer.from(JSON.stringify({ ok: true })),
    });
  },
});

stream.close();
client.close();`;

export const getVersion = `const version = await client.getVersion();
console.log(version.version, version.schemaVersion);`;

export const runSessionUnary = `import { jsonBytes, jsonBytesMap } from "@phrony/sdk";

const response = await client.runSession({
  agentRef: { namespace: "default", name: "my-agent", version: "" },
  input: jsonBytes({ claimId: "CLM-48219" }),
  resolvedSecrets: jsonBytesMap({ openai: process.env.OPENAI_API_KEY }),
});

console.log(response.sessionId, response.status);`;

export const publish = `import { readFileSync } from "node:fs";

const manifest = readFileSync("agent.yaml");
const published = await client.publish({
  manifest,
  actor: "ci@example.com",
});

console.log(published.versionId, published.contentHash);`;

export const deploy = `await client.deploy({
  agentRef: { namespace: "default", name: "my-agent", version: "0.2.0" },
  actor: "ci@example.com",
});`;

export const rollback = `await client.rollback({
  agentRef: { namespace: "default", name: "my-agent", version: "" },
  toVersion: "0.1.0",
  actor: "ops@example.com",
});`;

export const getActiveVersion = `const active = await client.getActiveVersion({
  agentRef: { namespace: "default", name: "my-agent", version: "" },
});
console.log(active.version);`;

export const listDeployments = `const history = await client.listDeployments({
  agentRef: { namespace: "default", name: "my-agent", version: "" },
});
for (const d of history.deployments) console.log(d.version, d.deployedAtUnixMs);`;

export const getAgentVersion = `const record = await client.getAgentVersion({
  agentRef: { namespace: "default", name: "my-agent", version: "0.2.0" },
});`;

export const retireAgentVersion = `await client.retireAgentVersion({
  agentRef: { namespace: "default", name: "my-agent", version: "0.1.0" },
});`;

export const deprecateAgentVersion = `await client.deprecateAgentVersion({
  agentRef: { namespace: "default", name: "my-agent", version: "0.1.0" },
});`;

export const archiveAgent = `await client.archiveAgent({
  agentRef: { namespace: "default", name: "my-agent", version: "" },
});`;

export const listAgents = `const { agents } = await client.listAgents();
for (const a of agents) console.log(a.namespace, a.name);`;

export const listAgentVersions = `const { versions } = await client.listAgentVersions({
  agentRef: { namespace: "default", name: "my-agent", version: "" },
});`;

export const listSessions = `const { sessions } = await client.listSessions({
  agentRef: { namespace: "default", name: "my-agent", version: "" },
  status: "running",
});`;

export const cancelSession = `await client.cancelSession({ sessionId: "sess_abc123" });`;

export const completeSession = `await client.completeSession({ sessionId: "sess_abc123" });`;

export const getApproval = `const approval = await client.getApproval({ approvalId: "appr_xyz" });`;

export const listApprovals = `const { approvals } = await client.listApprovals({
  status: "pending",
  sessionId: "",
  route: "",
});`;

export const decideApproval = `import { ApprovalDecision, jsonBytes } from "@phrony/sdk";

await client.decideApproval({
  approvalId: "appr_xyz",
  decision: ApprovalDecision.APPROVAL_DECISION_APPROVE,
  comment: "Looks good",
  args: jsonBytes({ city: "Oslo" }),
  comprehensionAcknowledged: true,
  actor: "ops@example.com",
});`;

export const runtimeWorkStream = `const raw = client.work(); // grpc-js ClientDuplexStream — prefer Worker`;

export const runtimeInteractive = `const session = client.runSessionInteractive();`;

export const parseAgentRef = `import { parseAgentRef, formatAgentRef } from "@phrony/sdk";

const ref = parseAgentRef("default/my-agent@0.2.0");
// { namespace: "default", name: "my-agent", version: "0.2.0" }

formatAgentRef(ref); // "default/my-agent@0.2.0"`;

export const formatAgentRefOnly = `import { formatAgentRef } from "@phrony/sdk";

formatAgentRef({
  namespace: "default",
  name: "my-agent",
  version: "0.2.0",
}); // "default/my-agent@0.2.0"`;

export const jsonBytesExample = `import { jsonBytes, parseJsonBytes, jsonBytesMap } from "@phrony/sdk";

const input = jsonBytes({ claimId: "CLM-48219" });
const parsed = parseJsonBytes<{ claimId: string }>(input);
const secrets = jsonBytesMap({ openai: process.env.OPENAI_API_KEY });`;

export const phronyRuntimeError = `import { PhronyRuntimeError } from "@phrony/sdk";

try {
  await client.getVersion();
} catch (err) {
  if (err instanceof PhronyRuntimeError) {
    console.error(err.grpcCode, err.action, err.details);
  }
}`;

export const wrapRpcError = `import { wrapRpcError } from "@phrony/sdk";

try {
  await someGrpcCall();
} catch (err) {
  throw wrapRpcError("my action", err);
}`;

export const agentSessionError = `import { Phrony, AgentSessionError } from "@phrony/sdk";

try {
  const phrony = await Phrony.connect();
  await phrony.agent("default/my-agent").run({ input: {} });
} catch (err) {
  if (err instanceof AgentSessionError) {
    console.error(err.sessionId, err.message);
  }
}`;

export const agentRefParseError = `import { parseAgentRef, AgentRefParseError } from "@phrony/sdk";

try {
  parseAgentRef("my-agent"); // missing namespace/
} catch (err) {
  if (err instanceof AgentRefParseError) console.error(err.message);
}`;

export const constantsHelpers = `import {
  SDK_VERSION,
  DEFAULT_MAX_CONCURRENCY,
  handlerKey,
  heartbeatIntervalMs,
} from "@phrony/sdk";

console.log(SDK_VERSION);
console.log(handlerKey("weather.get-forecast", "1.0.0")); // weather.get-forecast@1.0.0
console.log(heartbeatIntervalMs(30_000)); // 15000`;

export const generatedTypes = `import type {
  AgentRef,
  PublishRequest,
  RunSessionRequest,
  WorkClientMsg,
} from "@phrony/sdk";

const req: RunSessionRequest = {
  agentRef: { namespace: "default", name: "my-agent", version: "" },
  input: Buffer.alloc(0),
  resolvedSecrets: {},
};`;
