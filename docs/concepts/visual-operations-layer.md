# Visual Operations Layer

## Goal

Explain how AletheIA can make governed AI-assisted work visible without creating a second authority,
runtime, or project-management system.

The **Visual Operations Layer** is a read-only projection over records that already describe a
[Work Slice](work-slice-pattern.md): framing, decisions, execution, validation, handoff, restart,
telemetry, audit, and learning.

Its interface name is **AletheIA Mission Control**.

## Core rule

> The cockpit informs. AletheIA governs.

The layer may normalize, aggregate, filter, and present existing signals. It must not authorize an
action, change a readiness outcome, close a slice, promote a learning, or become the canonical store
for any of those decisions.

```txt
AletheIA contracts and project records
  Work Slice · readiness · decisions · evidence · audit · handoff · learning
        ↓ references / normalizes
Visual Operations projection
  board lanes · cards · trace · alerts · telemetry summaries
        ↓ renders
AletheIA Mission Control
  read-only operational legibility
```

## Layer boundaries

| Layer | Responsibility | Visual Operations relationship |
|---|---|---|
| AletheIA | Frames the Work Slice, governs readiness, risk, decisions, continuity, and learning | Source authority |
| Adaptive Skills | Declares reusable capabilities, expected evidence, verification, and handoff signals | Optional capability signal |
| Runtime / harness | Executes within an approved envelope and emits observations or audit records | Optional execution signal |
| Visual Operations | Projects source records into human-readable views | Read-only consumer |

A skill activation can be shown, but it cannot decide the gate. A runtime event can be shown, but it
cannot prove success without evidence. A board lane can summarize the current posture, but it cannot
replace the source record that established that posture.

## Existing authorities

The first projection reuses these existing surfaces:

- [Work Slice Pattern](work-slice-pattern.md) for the bounded operational unit and derived states;
- [Readiness Gates Spec](../contracts/readiness-gates-spec.md) for `continue`, `tighten`, `review`,
  `handoff`, `escalate`, and `stop` outcomes;
- [Slice Telemetry Model](../contracts/slice-telemetry-model.md) and
  [Context / Resource Telemetry Spec](../contracts/context-resource-telemetry-spec.md) for
  provider-agnostic resource signals;
- [Agent Harness Governance Extension](../contracts/agent-harness-governance-extension.md) for
  trace events emitted by a harness;
- [Agent Action Audit Record](../contracts/agent-action-audit-record.md) and
  [Execution Audit Record](../contracts/execution-audit-record.md) for reviewable action and
  execution evidence;
- decision, execution, handoff, restart, and learning artifacts attached to the Work Slice.

Visual Operations documents define how to **read** these sources together. They do not redefine
their fields or precedence.

## Projection principles

1. **Source references are mandatory.** Every derived state, alert, and evidence item points to the
   record that supports it through `source_refs`.
2. **Unknown remains unknown.** Missing data is rendered as `unknown` or `unavailable`; the
   projection never invents precision.
3. **Telemetry carries provenance.** Token and cost values declare whether they are `reported`,
   `estimated`, or `unavailable`.
4. **Metadata first.** Sensitive content stays in its governed source; the projection carries a
   reference, classification, hash, or authorized summary.
5. **Human review is first-class.** Pending review, the reviewer role, and the open question remain
   visible until the authoritative source resolves them.
6. **Ceremony is proportional.** A small slice may emit only a card and a few events; richer views
   are optional when the risk or evidence burden justifies them.

## What this layer is not

- not a runtime, scheduler, orchestrator, or policy engine;
- not a replacement for GitHub Issues, Projects, Linear, Jira, or another coordination board;
- not a mandatory state machine for every task;
- not a store for full prompts, secrets, personal data, or restricted source content;
- not a productivity ranking based on tokens, cost, speed, or skill usage;
- not a claim that a dashboard is stronger evidence than the records it references.

## First delivery boundary

The docs-first delivery consists of projection contracts, starter templates, and synthetic examples.
It does not generate a dashboard, ingest runtime logs, connect to an external service, or implement a
user interface. Those require separate Work Slices after the vocabulary has been reviewed in use.

## Related

- [Mission Control Cockpit](mission-control-cockpit.md)
- [Visual Operations Event Model](../contracts/visual-operations-event-model.md)
- [Work Slice Visual State Contract](../contracts/work-slice-visual-state-contract.md)
- [Visual Operations Privacy Boundaries](../contracts/visual-ops-privacy-boundaries.md)
