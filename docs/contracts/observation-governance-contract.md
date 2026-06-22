# Observation Governance Contract

## Goal

Define the minimum record for turning a verbose tool, runtime, validation, document, or skill return into a compact observation without losing the evidence needed for a decision.

This is a docs-first contract. It does not require an automatic normalizer, evidence database, terminal proxy, schema, or runtime integration.

## Authority boundary

- Source records and raw evidence remain authoritative.
- An observation summarizes evidence; it does not replace, validate, approve, or execute it.
- AletheIA governs the record shape and recovery invariant.
- Runtimes, tools, and skills may produce records that conform to this contract.
- Visual Operations may project the record read-only, but must not infer missing values.

## Minimum record

Each observation must declare:

| Field | Meaning |
|---|---|
| `observation_id` | Stable identifier for the observation. |
| `work_slice_id` | Work Slice that receives the observation. |
| `source` | Source type, name, outcome, and source references. |
| `summary` | Compact statement of what matters for the next decision. |
| `evidence_items` | Decision-relevant facts preserved from the source. |
| `hygiene` | Strategies used, lossiness, and signal-loss risk. |
| `recovery` | Whether recovery is required and the governed pointer when available. |
| `decision_support` | Relevance, escalation posture, and suggested next review. |
| `visibility` | Default presentation depth and whether technical detail is available. |
| `metrics` | Optional measurements with explicit provenance. |

`source.refs` must point to the records that support the observation. The observation itself is not new evidence merely because it is structured.

## Recovery invariant

Allowed lossiness values are:

- `lossless`
- `lossy_with_recovery`
- `unavailable`

The invariant is:

```text
if hygiene.lossiness = lossy_with_recovery
then recovery.required = true
and recovery.pointer must be present
```

`lossy_without_recovery` is invalid. If a producer cannot retain or reference the raw source, it must either emit a lossless observation or declare the observation unavailable for governed use.

A recovery pointer may reference a governed local artifact, CI artifact, runtime trace, source record, or another authorized evidence surface. It must carry sensitivity and retention metadata; it must not embed secrets, prompts, personal data, or restricted source content.

## Evidence preservation

A compact observation should preserve only decision-relevant details, including when applicable:

- outcome and exit code;
- failure or warning counts;
- affected files or records;
- assertion or policy conflict;
- reproduction or validation reference;
- handoff or escalation signal.

Omitted detail must be classified. Repeated lines, successful dependency noise, or duplicated traces may be omitted, but critical failures and conflicting evidence may not be silently removed.

## Unavailable-first metrics

Size, token, cost, compression, and avoided-output metrics are optional. Every reported metric must include one provenance value:

- `reported`
- `estimated`
- `unavailable`

When no reliable measurement exists, use `value: null` with `provenance: unavailable`. Do not derive exact ratios or savings from size classes.

## Progressive visibility

Visibility modes are rendering depths over the same record, not different sources of truth:

- `guided`: plain summary, impact, next review, and whether human attention is needed;
- `practitioner`: compact evidence, source refs, risks, and validation posture;
- `engineer`: recovery pointer, strategy, omitted detail classes, and available runtime metadata.

The modes must not hide an active escalation requirement or make an unavailable value appear healthy.

## Minimum example shape

```yaml
version: "0.1"
observation_id: obs-test-001
work_slice_id: slice-validation-001
source:
  type: test_result
  name: pnpm test
  outcome: failed
  refs:
    - artifact://ci/run-42/test-output
summary: Two validation tests failed in the authorization boundary.
evidence_items:
  - kind: failed_test
    ref: tests/authorization-boundary.test.ts
    detail: Expected deny; received allow.
hygiene:
  strategies: [failure_focus, dedupe_repeated_lines]
  lossiness: lossy_with_recovery
  signal_loss_risk: medium
  omitted_detail_classes: [repeated_stack_trace]
recovery:
  required: true
  pointer: artifact://ci/run-42/test-output
  sensitivity: internal
  retention: project
decision_support:
  relevance: blocks_validation
  escalation_required: true
  next_review: Resolve the policy conflict before closure.
visibility:
  default: practitioner
  engineer_details_available: true
metrics:
  raw_output_size:
    value: null
    provenance: unavailable
```

## Validation rules

1. Required fields are present and identifiers are stable.
2. Every evidence item is source-backed.
3. `lossy_with_recovery` always has a non-empty governed pointer.
4. Missing measurements remain unavailable; they are not invented.
5. Restricted content is represented by metadata or authorized summary only.
6. Escalation and failed outcomes remain visible at every presentation depth.
7. The record does not claim authority to approve, execute, or close a Work Slice.

## Non-goals

This contract does not introduce:

- automatic output interception or normalization;
- an evidence store or retention service;
- a mandatory transport or JSON Schema;
- RTK or provider-specific dependencies;
- automatic telemetry, scoring, routing, or policy decisions;
- Resource Observatory metrics before reliable sources exist.

## Related contracts

- [Context Surface Registry](context-surface-registry.md)
- [Runtime Adapter Contract](runtime-adapter-contract.md)
- [Slice Telemetry Model](slice-telemetry-model.md)
- [Agent Harness Governance Extension](agent-harness-governance-extension.md)
- [Visual Operations Event Model](visual-operations-event-model.md)
