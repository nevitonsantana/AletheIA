# Visual Operations + Adaptive Skills dogfood

## Status

First bounded cross-repository observability checkpoint, recorded on 2026-06-22.

This pilot uses an existing Adaptive Skills capability while evolving AletheIA's
Resource Observatory. It does not add a runtime, collector, telemetry service, or
write-back path.

## What was exercised

| Layer | Role in this slice |
|---|---|
| AletheIA | Defines the read-only projection boundary and remains the macro-governance layer. |
| Adaptive Skills | Supplies the versioned `feature-planning` capability used to define the smallest useful integration slice. |
| Mission Control | Adapts the execution record into a sourced Resource Observatory signal. |

The canonical capability source is
[`feature-planning@0.1.0`](https://github.com/nevitonsantana/adaptive-skills/blob/9064ec8e7bef7f3c9b649232d736f079164dfcb8/skills/feature-planning/SKILL.md).
The consumer-owned execution record is
[`adaptive-skills-feature-planning-dogfood-record.json`](../../examples/visual-operations/adaptive-skills-feature-planning-dogfood-record.json).

## Why the activation gate is satisfied

The Visual Operations phase closeout required a durable, non-sensitive activation
record plus a reviewed mapping that preserves AletheIA authority. This checkpoint
provides both:

- the checked-in record identifies skill, version, source revision, context,
  activated modules, result, evidence references, and attribution guess;
- `governance_authority` is explicitly `false`;
- the adapter rejects records that claim governance authority;
- the Resource Observatory labels the signal as reported trace evidence;
- no prompt, secret, personal data, or restricted source body is stored.

## Observable result

The previous synthetic `ACT-552` card is replaced by a signal reconstructed from
the execution record:

- label: `Skill usage`;
- value: `feature-planning`;
- provenance: `reported`;
- source: `as-exec-2026-06-22-mission-control-001`;
- interpretation: activation evidence does not control gates or decisions.

## Boundary and follow-up

This is a versioned snapshot integration, not automatic telemetry. The next useful
cross-repository step should be another real execution record only when a distinct
skill or outcome adds evidence. Repeated records may later justify a collector, but
this single checkpoint does not.
