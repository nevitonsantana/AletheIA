# Visual Operations Event Model

> Posture: `docs_first`, `read_only_projection`. This contract defines a normalized event envelope;
> it implements no collector, event bus, importer, or runtime.

## Purpose

Define the minimum envelope a Visual Operations projection uses to order and explain existing
AletheIA, project, skill, runtime, and harness signals.

The normalized event is not the authoritative event. Its `source_refs` point to the authoritative
record, including AHGE trace events where applicable.

## Non-goals

- no new audit authority or event store;
- no requirement that every provider emit every event;
- no ingestion, mutation, replay, or workflow execution;
- no storage of full prompts, secrets, or restricted content;
- no provider-specific fields in the core envelope.

## Envelope

```yaml
visual_ops_event:
  event_id:
  project_id:
  work_slice_id:
  timestamp:
  source_type: aletheia | project_record | adaptive_skill | runtime | harness | manual | external
  event_type:
  actor:
  summary:
  payload_metadata: {}
  evidence_refs: []
  source_refs:
    - kind:
      ref:
  sensitivity: public | internal | confidential | restricted | unknown
```

## Required rules

1. `event_id`, `work_slice_id`, `timestamp`, `source_type`, `event_type`, `summary`, and at least one
   `source_refs` entry are required for a usable projected event.
2. `source_refs` identifies where the claim originated. A normalized event without a resolvable
   source is `unverified` and must not drive a confident visual state.
3. `payload_metadata` contains only fields safe for the selected projection. It must not duplicate
   sensitive source bodies.
4. `evidence_refs` points to evidence; it does not convert the event itself into evidence.
5. Normalization must preserve the original timestamp. A separate projection timestamp belongs in
   the generated state, not in the source event.
6. Unknown values remain `unknown` or are omitted when optional. They are never inferred merely to
   complete a card.

## Initial event vocabulary

The vocabulary is intentionally descriptive and extensible:

```txt
work_slice.created
work_slice.framed
work_slice.state_observed
readiness.reviewed
context.minimum_met
context.insufficient
skill.activated
skill.completed
runtime.session_started
runtime.session_completed
tool.call_observed
policy.verdict_observed
evidence.added
validation.passed
validation.failed
human_review.requested
human_review.completed
handoff.created
restart_package.created
reconcile.created
learning.recorded
alert.raised
alert.resolved
```

These names do not replace the vocabularies in their source contracts. `policy.verdict_observed`,
for example, projects a verdict from [Policy Verdicts](policy-verdicts.md) or the authoritative AHGE
decision values; it does not introduce another verdict.

## Source reconciliation

| Projected event | Preferred source |
|---|---|
| Work Slice framing or state | Work Slice artifacts and [Work Slice Pattern](../concepts/work-slice-pattern.md) |
| Readiness outcome | [Readiness Gates Spec](readiness-gates-spec.md) review artifact |
| Runtime or tool activity | AHGE `trace_event` or governed runtime record |
| Policy verdict | [Policy Verdicts](policy-verdicts.md), AHGE record, or agent action audit record |
| Evidence and validation | execution record, test artifact, review record, or evidence reference |
| Handoff or restart | handoff record or restart package |
| Learning | accepted or proposed learning record |

When multiple sources disagree, the projection preserves each reference and emits a conflict or
review alert. It must not silently choose the most convenient source.

## Relationship to AHGE trace events

The [Agent Harness Governance Extension](agent-harness-governance-extension.md) remains authoritative
for harness-level events such as model calls, tool requests, permission decisions, approvals, budget
stops, compaction, and final output. Visual Operations may map those records into the envelope above
for display, while retaining a `source_refs` pointer to the original trace entry.

## Related

- [Work Slice Visual State Contract](work-slice-visual-state-contract.md)
- [Visual Operations Privacy Boundaries](visual-ops-privacy-boundaries.md)
- [Agent Action Audit Record](agent-action-audit-record.md)
- [Execution Audit Record](execution-audit-record.md)
