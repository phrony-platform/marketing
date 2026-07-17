import { DocH2, DocH3, DocParagraph, DocProse } from '@/components/docs';
import { MethodExample } from '../typescript/method-example';
import * as ex from './python-examples';

export function PythonSdkInteractiveSessionSection() {
  return (
    <DocProse>
      <DocH2 id="interactive-session">Interactive sessions</DocH2>
      <DocParagraph>
        <code>InteractiveSession</code> wraps <code>RunSessionInteractive</code>. Open it from{' '}
        <code>RuntimeClient.run_session_interactive()</code> or{' '}
        <a href="#run" className="text-foreground underline underline-offset-4 hover:no-underline">
          PhronyAgent.run_interactive()
        </a>{' '}
        or <code>PhronyBundle.run_interactive()</code>. The first client message must be <code>start</code> or{' '}
        <code>attach</code>.
      </DocParagraph>

      <DocH2>Methods</DocH2>
      <MethodExample
        name="await start(...)"
        description="New session: agent_ref or bundle_ref as a string (namespace/name), dict, or parsed ref — mutually exclusive. Pass JSON input and optional resolved_secrets as plain dicts."
        code={ex.interactiveStart}
        language="python"
      />
      <MethodExample
        name="await start({ bundle_ref })"
        description="Start an interactive session on a deployed bundle."
        code={ex.interactiveStartBundle}
        language="python"
      />
      <MethodExample
        name="await attach(...)"
        description="Reconnect to an existing session_id."
        code={ex.interactiveAttach}
        language="python"
      />
      <MethodExample
        name="await send_user_message(text)"
        description="Send a user turn after an awaiting_input event."
        code={ex.interactiveUserMessage}
        language="python"
      />
      <MethodExample
        name="await decide_tool_approval(...)"
        description="Respond to approval_required: approval_id, approved, optional comment and replacement args."
        code={ex.interactiveApproval}
        language="python"
      />
      <MethodExample
        name="async for event in session.events()"
        description="Async iterator of event dicts until the stream ends or errors."
        code={ex.interactiveEvents}
        language="python"
      />
      <MethodExample
        name="await session.close()"
        description="Half-close the client side of the stream."
        code={ex.interactiveClose}
        language="python"
      />

      <DocH2>InteractiveEvent types</DocH2>
      <DocParagraph>Server events are dicts with a <code>type</code> key:</DocParagraph>
      <DocH3>Lifecycle</DocH3>
      <DocParagraph>
        <code>session_started</code>, <code>completed</code>, <code>failed</code>, <code>cancelled</code>,{' '}
        <code>stream_end</code>
      </DocParagraph>
      <DocH3>Streaming</DocH3>
      <DocParagraph>
        <code>text_delta</code>, <code>awaiting_input</code>
      </DocParagraph>
      <DocH3>Tools</DocH3>
      <DocParagraph>
        <code>tool_call</code>, <code>tool_result</code>, <code>approval_required</code>
      </DocParagraph>
    </DocProse>
  );
}
