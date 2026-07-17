import { DocH2, DocH3, DocParagraph, DocProse } from '@/components/docs';
import { MethodExample } from './method-example';
import * as ex from './typescript-examples';

export function TypeScriptSdkInteractiveSessionSection() {
  return (
    <DocProse>
      <DocH2 id="interactive-session">Interactive sessions</DocH2>
      <DocParagraph>
        <code>InteractiveSession</code> wraps <code>RunSessionInteractive</code>. Open it from{' '}
        <code>RuntimeClient.runSessionInteractive()</code> or{' '}
        <a href="#run" className="text-foreground underline underline-offset-4 hover:no-underline">
          PhronyAgent.runInteractive()
        </a>{' '}
        or <code>PhronyBundle.runInteractive()</code>. The first client message must be <code>start</code> or{' '}
        <code>attach</code>.
      </DocParagraph>

      <DocH2>Methods</DocH2>
      <MethodExample
        name="start(options)"
        description="New session: agentRef or bundleRef (mutually exclusive), JSON input, optional resolvedSecrets."
        code={ex.interactiveStart}
      />
      <MethodExample
        name="start({ bundleRef })"
        description="Start an interactive session on a deployed bundle."
        code={ex.interactiveStartBundle}
      />
      <MethodExample name="attach(options)" description="Reconnect to an existing sessionId." code={ex.interactiveAttach} />
      <MethodExample
        name="sendUserMessage(text)"
        description="Send a user turn after an awaiting_input event."
        code={ex.interactiveUserMessage}
      />
      <MethodExample
        name="decideToolApproval(options)"
        description="Respond to approval_required: approvalId, approved, optional comment and replacement args."
        code={ex.interactiveApproval}
      />
      <MethodExample
        name="events()"
        description="Async iterable of InteractiveEvent until the stream ends or errors."
        code={ex.interactiveEvents}
      />
      <MethodExample name="close()" description="Half-close the client side of the stream." code={ex.interactiveClose} />

      <DocH2>InteractiveEvent types</DocH2>
      <DocParagraph>Server events are a discriminated union on <code>type</code>:</DocParagraph>
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
