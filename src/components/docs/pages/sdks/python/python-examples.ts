/** Code samples for Python SDK documentation pages. */

export const installPackage = `pip install phrony`;

export const importPaths = `# Full SDK
from phrony import (
    AgentRef,
    BundleRef,
    InteractiveEvent,
    InteractiveSession,
    Phrony,
    PhronyAgent,
    PhronyBundle,
    RuntimeClient,
    Worker,
)

# Worker subpackage (includes WorkStream)
from phrony.worker import Worker, WorkStream, ToolError`;

export const runtimeClientConnect = `import asyncio
import os

from phrony import RuntimeClient


async def main() -> None:
    client = await RuntimeClient.connect(
        address=os.environ.get("PHRONY_RUNTIME_ADDR", "127.0.0.1:7777"),
    )
    print("Connected to", client.address)
    await client.close()


asyncio.run(main())`;

export const phronyConnect = `import asyncio
import os

from phrony import Phrony


async def main() -> None:
    phrony = await Phrony.connect(
        runtime_addr=os.environ.get("PHRONY_RUNTIME_ADDR"),
    )
    # Same options as RuntimeClient: credentials, runtime_addr
    await phrony.close()


asyncio.run(main())`;

export const resolveRuntimeAddrExample = `from phrony import DEFAULT_RUNTIME_ADDR, resolve_runtime_addr

# Explicit address wins, then PHRONY_RUNTIME_ADDR, then DEFAULT_RUNTIME_ADDR
addr = resolve_runtime_addr()  # e.g. "127.0.0.1:7777"
print(DEFAULT_RUNTIME_ADDR)`;

export const dialRuntimeExample = `import asyncio

from phrony import dial_runtime
from phrony.gen.phrony.runtime.v1 import runtime_pb2


async def main() -> None:
    dial = dial_runtime(address="127.0.0.1:7777")
    try:
        version = await dial.runtime.GetVersion(runtime_pb2.GetVersionRequest())
        print(version)
    finally:
        await dial.close()


asyncio.run(main())`;

export const tlsCredentials = `import asyncio
import grpc

from phrony import RuntimeClient


async def main() -> None:
    with open("ca.pem", "rb") as ca, open("client-key.pem", "rb") as key, open(
        "client-cert.pem", "rb"
    ) as cert:
        credentials = grpc.ssl_channel_credentials(
            root_certificates=ca.read(),
            private_key=key.read(),
            certificate_chain=cert.read(),
        )

    client = await RuntimeClient.connect(
        address="runtime.example.com:7777",
        credentials=credentials,
    )
    await client.close()


asyncio.run(main())`;

export const healthCheck = `import asyncio

from phrony import RuntimeClient
from phrony.gen.grpc.health.v1 import health_pb2


async def main() -> None:
    client = await RuntimeClient.connect()
    health = client.health()
    response = await health.Check(health_pb2.HealthCheckRequest(service=""))
    print(response.status)  # SERVING, NOT_SERVING, etc.
    await client.close()


asyncio.run(main())`;

export const closeClients = `import asyncio

from phrony import Phrony, RuntimeClient


async def main() -> None:
    client = await RuntimeClient.connect()
    await client.close()

    phrony = await Phrony.connect()
    await phrony.close()


asyncio.run(main())`;

export const phronyConstructor = `from phrony import Phrony

phrony = Phrony(runtime_addr="127.0.0.1:7777")
agent = phrony.agent("default/my-agent")
# Client dials lazily on first run() or runtime_client()`;

export const phronyAgentRef = `phrony = await Phrony.connect()

pinned = phrony.agent("default/my-agent@0.2.0")
latest = phrony.agent("default/my-agent")`;

export const phronyBundleRef = `phrony = await Phrony.connect()

semver = phrony.bundle("demo/payment-desk@1.0.0")
lock_hash = phrony.bundle("demo/payment-desk@sha256:abc…")
active = phrony.bundle("demo/payment-desk")`;

export const phronyRunWait = `import asyncio
import os

from phrony import Phrony


async def main() -> None:
    phrony = await Phrony.connect(
        runtime_addr=os.environ.get("PHRONY_RUNTIME_ADDR", "127.0.0.1:7777"),
    )

    result = await phrony.agent("default/my-agent").run(
        input={"claimId": "CLM-48219"},
        resolved_secrets={"openai": os.environ["OPENAI_API_KEY"]},
    )

    print(result.session_id, result.output, result.stop_reason)
    await phrony.close()


asyncio.run(main())`;

export const phronyRunNoWait = `import asyncio

from phrony import Phrony


async def main() -> None:
    phrony = await Phrony.connect()

    result = await phrony.agent("default/my-agent").run(
        input={"claimId": "CLM-48219"},
        wait=False,
    )

    print(result.session_id, result.status)


asyncio.run(main())`;

export const phronyRunInteractive = `import asyncio

from phrony import Phrony


async def main() -> None:
    phrony = await Phrony.connect()

    session = await phrony.agent("default/my-agent").run_interactive(
        input={"question": "Summarize claim CLM-48219"},
    )

    async for event in session.events():
        if event["type"] == "text_delta":
            print(event["delta"], end="", flush=True)

    await session.close()
    await phrony.close()


asyncio.run(main())`;

export const phronyBundleRunWait = `import asyncio
import os

from phrony import Phrony


async def main() -> None:
    phrony = await Phrony.connect()

    result = await phrony.bundle("demo/payment-desk").run(
        input={"message": "Pay 500 USD to Acme"},
        resolved_secrets={"stripe": os.environ["STRIPE_API_KEY"]},
    )

    print(result.session_id, result.output, result.stop_reason)
    await phrony.close()


asyncio.run(main())`;

export const phronyBundleRunNoWait = `import asyncio

from phrony import Phrony


async def main() -> None:
    phrony = await Phrony.connect()

    result = await phrony.bundle("demo/payment-desk").run(
        input={"message": "Pay 500 USD to Acme"},
        wait=False,
    )

    print(result.session_id, result.status)


asyncio.run(main())`;

export const phronyBundleRunInteractive = `import asyncio

from phrony import Phrony


async def main() -> None:
    phrony = await Phrony.connect()

    session = await phrony.bundle("demo/payment-desk").run_interactive(
        input={"message": "Pay 500 USD to Acme"},
    )

    async for event in session.events():
        if event["type"] == "text_delta":
            print(event["delta"], end="", flush=True)

    await session.close()
    await phrony.close()


asyncio.run(main())`;

export const phronyRuntimeClient = `import asyncio

from phrony import Phrony


async def main() -> None:
    phrony = await Phrony.connect()
    client = await phrony.runtime_client()
    agents = await client.list_agents()
    print(agents)


asyncio.run(main())`;

export const interactiveStart = `import asyncio
import os

from phrony import RuntimeClient


async def main() -> None:
    client = await RuntimeClient.connect()
    session = client.run_session_interactive()

    await session.start(
        agent_ref="default/my-agent",
        input={"question": "Hello"},
        resolved_secrets={"openai": os.environ["OPENAI_API_KEY"]},
    )

    await session.close()
    await client.close()


asyncio.run(main())`;

export const interactiveStartBundle = `import asyncio
import os

from phrony import RuntimeClient


async def main() -> None:
    client = await RuntimeClient.connect()
    session = client.run_session_interactive()

    await session.start(
        bundle_ref="demo/payment-desk",
        input={"message": "Pay 500 USD to Acme"},
        resolved_secrets={"stripe": os.environ["STRIPE_API_KEY"]},
    )

    await session.close()
    await client.close()


asyncio.run(main())`;

export const interactiveAttach = `await session.attach(session_id="sess_abc123")`;

export const interactiveUserMessage = `# After an awaiting_input event:
await session.send_user_message("Use a shorter summary.")`;

export const interactiveApproval = `# Inside your events() loop when event["type"] == "approval_required":
await session.decide_tool_approval(
    approval_id=event["approval_id"],
    approved=True,
    comment="Approved by operator",
    args={"city": "Oslo"},
)`;

export const interactiveEvents = `async for event in session.events():
    match event["type"]:
        case "session_started":
            print(event["session_id"], event["agent_version_id"])
        case "text_delta":
            print(event["delta"], end="", flush=True)
        case "completed":
            print(event.get("output"))
        case "failed":
            raise RuntimeError(event["message"])`;

export const interactiveClose = `await session.close()
await client.close()`;

export const workerConstructor = `import os

from phrony.worker import Worker

worker = Worker(
    worker_id="weather-worker-1",
    runtime_addr=os.environ.get("PHRONY_RUNTIME_ADDR"),
    workload_identity="k8s://default/weather-worker",
    image_digest="sha256:abc…",
)`;

export const workerDecorator = `@worker.tool("weather.get-forecast", version="1.0.0", max_concurrency=4)
async def get_forecast(args: dict, ctx) -> dict:
    if not args.get("city"):
        raise ToolError("invalid_args", "city is required")
    return {"temp_c": 12, "city": args["city"]}`;

export const workerRegisterTool = `worker.register_tool(
    tool="weather.get-forecast",
    version="1.0.0",
    max_concurrency=4,
    handler=get_forecast,
)`;

export const workerConnectClose = `import asyncio

from phrony.worker import Worker, ToolError


worker = Worker(worker_id="weather-worker-1")


@worker.tool("weather.get-forecast", version="1.0.0")
async def get_forecast(args: dict, ctx) -> dict:
    return {"temp_c": 12, "city": args["city"]}


async def main() -> None:
    await worker.connect()  # blocks until disconnect
    await worker.close()


asyncio.run(main())`;

export const workerToolError = `from phrony.worker import ToolError

async def handler(args, ctx):
    raise ToolError("UPSTREAM_TIMEOUT", "Weather API timed out")`;

export const workStreamLowLevel = `import asyncio

from phrony import RuntimeClient
from phrony.gen.phrony.runtime.v1 import runtime_pb2
from phrony.worker import WorkStream, build_handler_advertisements
from phrony.worker.types import RegisteredTool


async def main() -> None:
    client = await RuntimeClient.connect()
    stream = WorkStream(client.work())

    await stream.send_register(
        runtime_pb2.WorkRegister(
            worker_id="weather-worker-1",
            handlers=build_handler_advertisements(
                [
                    RegisteredTool(
                        tool="weather.get-forecast",
                        version="1.0.0",
                        handler=lambda args, ctx: {"ok": True},
                        max_concurrency=4,
                    )
                ]
            ),
            in_flight=[
                runtime_pb2.WorkInFlightCall(call_id=call_id)
                for call_id in stream.in_flight_calls()
            ],
        )
    )

    async def on_invoke(invoke: runtime_pb2.WorkInvoke) -> None:
        stream.mark_call_executing(invoke.call_id)
        await stream.send_result(
            runtime_pb2.WorkToolResult(
                call_id=invoke.call_id,
                payload=b'{"ok": true}',
            )
        )

    stream.run(
        on_registered=lambda lease_ttl_ms: print("lease", lease_ttl_ms),
        on_invoke=lambda invoke: asyncio.create_task(on_invoke(invoke)),
    )

    await stream.close()
    await client.close()


asyncio.run(main())`;

export const getVersion = `version = await client.get_version()
print(version.version, version.schema_version)`;

export const runSessionUnary = `import os

response = await client.run_session(
    agent_ref="default/my-agent",
    input={"claimId": "CLM-48219"},
    resolved_secrets={"openai": os.environ["OPENAI_API_KEY"]},
)

print(response.session_id, response.status)`;

export const runSessionBundleUnary = `import os

response = await client.run_session(
    bundle_ref="demo/payment-desk",
    input={"message": "Pay 500 USD to Acme"},
    resolved_secrets={"stripe": os.environ["STRIPE_API_KEY"]},
)

print(response.session_id, response.status)`;

export const publish = `from pathlib import Path

from phrony.gen.phrony.runtime.v1 import runtime_pb2

manifest = Path("agent.yaml").read_bytes()
published = await client.publish(
    runtime_pb2.PublishRequest(
        manifest=manifest,
        actor="ci@example.com",
    )
)

print(published.version_id, published.content_hash)`;

export const deploy = `from phrony import parse_agent_ref
from phrony.gen.phrony.runtime.v1 import runtime_pb2

await client.deploy(
    runtime_pb2.DeployRequest(
        agent_ref=parse_agent_ref("default/my-agent@0.2.0"),
        actor="ci@example.com",
    )
)`;

export const publishBundle = `from pathlib import Path

from phrony.gen.phrony.runtime.v1 import runtime_pb2

bundle_manifest = Path("support/bundle.yaml").read_bytes()
committed_lock = Path("support/bundle.lock.json").read_bytes()

published = await client.publish_bundle(
    runtime_pb2.PublishBundleRequest(
        bundle_manifest=bundle_manifest,
        committed_lock=committed_lock,
        members=[
            # BundleMemberPackage entries for each vendored closure member
        ],
        actor="ci@example.com",
    )
)

print(published.bundle_version_id, published.lock_hash)`;

export const deployBundle = `from phrony import parse_bundle_ref_version_required
from phrony.gen.phrony.runtime.v1 import runtime_pb2

await client.deploy_bundle(
    runtime_pb2.DeployBundleRequest(
        bundle_ref=parse_bundle_ref_version_required("demo/payment-desk@1.0.0"),
        actor="ci@example.com",
    )
)`;

export const getActiveBundle = `from phrony import parse_bundle_ref
from phrony.gen.phrony.runtime.v1 import runtime_pb2

active = await client.get_active_bundle(
    runtime_pb2.GetActiveBundleRequest(
        bundle_ref=parse_bundle_ref("demo/payment-desk"),
    )
)
print(active.version, active.lock_hash)`;

export const listBundles = `response = await client.list_bundles()
for bundle in response.bundles:
    print(bundle.namespace, bundle.name)`;

export const listBundleVersions = `from phrony import parse_bundle_ref
from phrony.gen.phrony.runtime.v1 import runtime_pb2

response = await client.list_bundle_versions(
    runtime_pb2.ListBundleVersionsRequest(
        bundle_ref=parse_bundle_ref("demo/payment-desk"),
    )
)`;

export const listBundleDeployments = `from phrony import parse_bundle_ref
from phrony.gen.phrony.runtime.v1 import runtime_pb2

history = await client.list_bundle_deployments(
    runtime_pb2.ListBundleDeploymentsRequest(
        bundle_ref=parse_bundle_ref("demo/payment-desk"),
    )
)
for deployment in history.deployments:
    print(deployment.version, deployment.lock_hash, deployment.deployed_at)`;

export const rollback = `from phrony import parse_agent_ref
from phrony.gen.phrony.runtime.v1 import runtime_pb2

await client.rollback(
    runtime_pb2.RollbackRequest(
        agent_ref=parse_agent_ref("default/my-agent"),
        to_version="0.1.0",
        actor="ops@example.com",
    )
)`;

export const getActiveVersion = `from phrony import parse_agent_ref
from phrony.gen.phrony.runtime.v1 import runtime_pb2

active = await client.get_active_version(
    runtime_pb2.GetActiveVersionRequest(
        agent_ref=parse_agent_ref("default/my-agent"),
    )
)
print(active.version)`;

export const listDeployments = `from phrony import parse_agent_ref
from phrony.gen.phrony.runtime.v1 import runtime_pb2

history = await client.list_deployments(
    runtime_pb2.ListDeploymentsRequest(
        agent_ref=parse_agent_ref("default/my-agent"),
    )
)
for deployment in history.deployments:
    print(deployment.version, deployment.deployed_at_unix_ms)`;

export const getAgentVersion = `from phrony import parse_agent_ref
from phrony.gen.phrony.runtime.v1 import runtime_pb2

record = await client.get_agent_version(
    runtime_pb2.GetAgentVersionRequest(
        agent_ref=parse_agent_ref("default/my-agent@0.2.0"),
    )
)`;

export const retireAgentVersion = `from phrony import parse_agent_ref
from phrony.gen.phrony.runtime.v1 import runtime_pb2

await client.retire_agent_version(
    runtime_pb2.RetireAgentVersionRequest(
        agent_ref=parse_agent_ref("default/my-agent@0.1.0"),
    )
)`;

export const deprecateAgentVersion = `from phrony import parse_agent_ref
from phrony.gen.phrony.runtime.v1 import runtime_pb2

await client.deprecate_agent_version(
    runtime_pb2.DeprecateAgentVersionRequest(
        agent_ref=parse_agent_ref("default/my-agent@0.1.0"),
    )
)`;

export const archiveAgent = `from phrony import parse_agent_ref
from phrony.gen.phrony.runtime.v1 import runtime_pb2

await client.archive_agent(
    runtime_pb2.ArchiveAgentRequest(
        agent_ref=parse_agent_ref("default/my-agent"),
    )
)`;

export const listAgents = `response = await client.list_agents()
for agent in response.agents:
    print(agent.namespace, agent.name)`;

export const listAgentVersions = `from phrony import parse_agent_ref
from phrony.gen.phrony.runtime.v1 import runtime_pb2

response = await client.list_agent_versions(
    runtime_pb2.ListAgentVersionsRequest(
        agent_ref=parse_agent_ref("default/my-agent"),
    )
)`;

export const listSessions = `from phrony import parse_agent_ref
from phrony.gen.phrony.runtime.v1 import runtime_pb2

response = await client.list_sessions(
    runtime_pb2.ListSessionsRequest(
        agent_ref=parse_agent_ref("default/my-agent"),
        status="running",
        kind="",  # optional: "agent" or "bundle"
    )
)`;

export const inspectSession = `response = await client.inspect_session(session_id="sess_abc123")
# response.timeline — unified chronological narrative for the session and descendants
# response.session.children — delegated child session headers (story lives in timeline)`;

export const cancelSession = `await client.cancel_session(session_id="sess_abc123")`;

export const completeSession = `await client.complete_session(session_id="sess_abc123")`;

export const getApproval = `approval = await client.get_approval(approval_id="appr_xyz")`;

export const listApprovals = `response = await client.list_approvals(
    status="pending",
    session_id="",
    route="",
)`;

export const decideApproval = `from phrony import ApprovalDecision

await client.decide_approval(
    approval_id="appr_xyz",
    decision=ApprovalDecision.APPROVAL_DECISION_APPROVE,
    comment="Looks good",
    args={"city": "Oslo"},
    comprehension_acknowledged=True,
    actor="ops@example.com",
)`;

export const runtimeWorkStream = `raw = client.work()  # grpc.aio stream — prefer Worker`;

export const runtimeInteractive = `session = client.run_session_interactive()`;

export const parseAgentRef = `from phrony import format_agent_ref, parse_agent_ref

ref = parse_agent_ref("default/my-agent@0.2.0")
# {"namespace": "default", "name": "my-agent", "version": "0.2.0"}

format_agent_ref(ref)  # "default/my-agent@0.2.0"`;

export const formatAgentRefOnly = `from phrony import format_agent_ref

format_agent_ref({
    "namespace": "default",
    "name": "my-agent",
    "version": "0.2.0",
})  # "default/my-agent@0.2.0"`;

export const parseBundleRef = `from phrony import format_bundle_ref, parse_bundle_ref

semver = parse_bundle_ref("demo/payment-desk@1.0.0")
# {"namespace": "demo", "name": "payment-desk", "version": "1.0.0"}

lock_hash = parse_bundle_ref("demo/payment-desk@sha256:abc…")
format_bundle_ref(lock_hash)  # "demo/payment-desk@sha256:abc…"`;

export const formatBundleRefOnly = `from phrony import format_bundle_ref

format_bundle_ref({
    "namespace": "demo",
    "name": "payment-desk",
    "version": "1.0.0",
})  # "demo/payment-desk@1.0.0"`;

export const parseBundleRefVersionRequired = `from phrony import parse_bundle_ref_version_required

# Deploy flows require an explicit @version (semver or lock hash)
ref = parse_bundle_ref_version_required("demo/payment-desk@sha256:abc…")`;

export const bundleRefParseError = `from phrony import BundleRefParseError, parse_bundle_ref

try:
    parse_bundle_ref("payment-desk")  # missing namespace/
except BundleRefParseError as err:
    print(err)`;

export const jsonBytesExample = `import os

from phrony import json_bytes, json_bytes_map, parse_json_bytes, resolved_secrets_map

input_bytes = json_bytes({"claimId": "CLM-48219"})
parsed = parse_json_bytes(input_bytes)
secrets = resolved_secrets_map({"openai": os.environ["OPENAI_API_KEY"]})
encoded_map = json_bytes_map({"openai": os.environ["OPENAI_API_KEY"]})`;

export const phronyRuntimeError = `from phrony import PhronyRuntimeError

try:
    await client.get_version()
except PhronyRuntimeError as err:
    print(err.grpc_code, err.action, err.details)`;

export const wrapRpcError = `from phrony import wrap_rpc_error

try:
    await some_grpc_call()
except Exception as err:
    raise wrap_rpc_error("my action", err) from err`;

export const agentSessionError = `import asyncio

from phrony import AgentSessionError, Phrony


async def main() -> None:
    try:
        phrony = await Phrony.connect()
        await phrony.agent("default/my-agent").run(input={})
    except AgentSessionError as err:
        print(err.session_id, err)


asyncio.run(main())`;

export const agentRefParseError = `from phrony import AgentRefParseError, parse_agent_ref

try:
    parse_agent_ref("my-agent")  # missing namespace/
except AgentRefParseError as err:
    print(err)`;

export const constantsHelpers = `from phrony import (
    DEFAULT_MAX_CONCURRENCY,
    SDK_VERSION,
    handler_key,
    heartbeat_interval_ms,
)

print(SDK_VERSION)
print(handler_key("weather.get-forecast", "1.0.0"))  # weather.get-forecast@1.0.0
print(heartbeat_interval_ms(30_000))  # 15000`;

export const generatedTypes = `from phrony import (
    AgentRef,
    ApprovalDecision,
    BundleRef,
    GetVersionResponse,
    InteractiveEvent,
    InteractiveSessionAttachOptions,
    InteractiveSessionStartOptions,
    InteractiveToolApprovalOptions,
    RunSessionResponse,
)

agent_ref: AgentRef = {
    "namespace": "default",
    "name": "my-agent",
    "version": "",
}

# Pass a string ref, dict, or keyword args to run_session / InteractiveSession.start.
# Convenience kwargs: run_session, cancel_session, complete_session, inspect_session,
# get_approval, decide_approval, list_approvals.
# For other unary RPCs, pass protobuf requests from phrony.gen.phrony.runtime.v1.`;
