# Mission Control Cockpit

## Goal

Describe the human-facing views that can make an AletheIA-governed Work Slice legible without
turning presentation state into framework truth.

The cockpit is a read-only view over the [Visual Operations Layer](visual-operations-layer.md).

## Primary audience

The first audience is a technical-adjacent product, design, governance, or delivery practitioner who
needs to understand what the AI-assisted work is doing without reviewing every tool call or line of
code. Engineers and maintainers may use the same views to find source evidence faster.

## Views

### Project overview

Shows counts and exceptions, not a replacement project plan:

- active and blocked Work Slices;
- slices waiting for human review;
- validation and evidence posture;
- unresolved alerts;
- telemetry availability and high-level resource signals;
- recent learning and reconcile references.

### Work Slice board

Groups cards into presentation lanes defined by the
[Work Slice Visual State Contract](../contracts/work-slice-visual-state-contract.md).

The lanes are derived readings. Moving a card visually must not mutate the source Work Slice or imply
that a readiness gate passed.

### Slice detail

Shows the bounded objective, scope, risk, planning depth, current lane, authoritative gate outcome,
skill activations, runtime sessions, evidence, alerts, decisions, telemetry, handoff or restart
references, and reconcile state.

Each derived section links back through `source_refs`.

### Trace timeline

Orders normalized events for review. A trace may mix manual, AletheIA, skill, runtime, harness, and
project-record sources, but each event retains its original source reference and timestamp.

The timeline is a navigation aid. It is not the authoritative audit log.

### Skills observatory

Shows declared skill activations and their evidence or verification posture. It may summarize usage,
retries, handoffs, or potential evolution signals only when the underlying records support those
claims.

It must not rank people, declare a skill successful from activation count alone, or promote a skill
change outside the governed evolution process.

### Knowledge and documentation health

Shows metadata-only signals such as missing documentation, stale references, decisions without a
durable record, repeated context gaps, or restricted sources that affected the slice.

Restricted content is never copied into the cockpit.

### Tokens, cost, and efficiency

Shows optional resource signals in context:

- token usage and cost with provenance;
- retry count and whether strategy changed;
- handoff and restart burden;
- human review or manual rescue burden;
- evidence produced for the effort spent.

No single scalar is a productivity score. `unavailable` is a valid value.

### Learnings and reconcile

Shows what changed, what was learned, what needs documentation, and what remains open. A visual
learning item is only a pointer until the authoritative learning or decision record accepts it.

## Card minimum

A useful card should reveal:

- slice identity and objective;
- derived presentation lane;
- risk and planning depth when known;
- primary skill and runtime when recorded;
- evidence status and current gate outcome;
- whether human review is pending;
- telemetry availability;
- `source_refs` and last projection time.

## Alert posture

Alerts are derived review prompts, not enforcement decisions. A healthy alert includes:

- type and severity;
- reason in plain language;
- suggested review action;
- `source_refs` supporting the signal;
- resolution reference when closed.

Examples include missing validation, review overdue, repeated retries without strategy change,
runtime mismatch, weak handoff, recurring documentation gap, and scope expansion without rationale.

## Empty and partial states

- Missing optional telemetry: show `unavailable`.
- Source exists but does not answer the field: show `unknown`.
- No evidence has been recorded: show `none`, not `failed`.
- Evidence is contradictory: show `inconclusive` and preserve all relevant `source_refs`.
- Projection cannot resolve precedence: show a review alert instead of selecting a preferred truth.

## Related

- [Visual Operations Cockpit Visual Model](../guides/visual-operations-cockpit-visual-model.md)
- [Visual Operations Layer](visual-operations-layer.md)
- [Visual Operations Event Model](../contracts/visual-operations-event-model.md)
- [Work Slice Visual State Contract](../contracts/work-slice-visual-state-contract.md)
- [Visual Operations Privacy Boundaries](../contracts/visual-ops-privacy-boundaries.md)
