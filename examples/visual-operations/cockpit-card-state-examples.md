# Visual Operations Cockpit Card State Examples

## Purpose

Show concrete, static card readings for the
[Visual Operations Cockpit Visual Model](../../docs/guides/visual-operations-cockpit-visual-model.md).

These examples are not UI components, wireframes, schemas, or runtime output. They are design-facing
fixtures that make the status language easier to review before any dashboard implementation.

## How to read these examples

Each card demonstrates:

- what a reviewer should understand at a glance;
- which fields must remain visible;
- how `unknown` and `unavailable` differ from failure;
- which source references would be required in a real projection.

The source refs below use synthetic identifiers or existing public examples. They are illustrative,
not new authorities.

## Status set covered

| Example | Status family | Main design question |
|---|---|---|
| [Closed with sufficient evidence](#closed-with-sufficient-evidence) | Known positive | Can a closed card still show evidence provenance? |
| [Human review unavailable](#human-review-unavailable) | Unavailable | Can absence of review source look honest instead of failed? |
| [Validation failed, review pending](#validation-failed-review-pending) | Known negative + pending | Can the card clearly show what needs attention? |
| [Telemetry unavailable](#telemetry-unavailable) | Unavailable optional telemetry | Can missing resource data stay visible without dominating the card? |
| [Conflicted sources](#conflicted-sources) | Conflicted | Can disagreement be surfaced without choosing a convenient truth? |

## Closed with sufficient evidence

### Card reading

```text
[closed] [confirmed]
PR #207 — Human-review source mapping
Clarify which durable sources may populate Visual Operations human_review.

Evidence: sufficient
Human review: unavailable
Risk: unknown
Primary alert: none

Source refs: PR #207 · CI run 27626141953 · merge 39f76cf
Projected at: 2026-06-16T15:00:00Z
```

### What the reviewer should understand

The slice is closed because the source PR, merge, checks, and validation evidence support closure.
The card still does **not** claim human review happened, because no durable review source was
supplied.

### Design notes

- `closed` should feel stable, but not absolute.
- `evidence=sufficient` should be visible near the lane.
- `human_review=unavailable` stays visible as a separate metadata gap.
- Do not collapse this into “approved.”

### Required source refs in a real card

- PR or Work Slice closeout record;
- CI/check evidence;
- local validation or author-reported validation provenance;
- merge/closure reference when used for orientation.

## Human review unavailable

### Card reading

```text
[closed] [confirmed]
PR #201 — Dogfood evidence record
Record the first checked-in Visual Operations usage evidence slice.

Evidence: sufficient
Human review: unavailable
Risk: unknown
Primary alert: none

Source refs: PR #201 · CI run 27581612377 · dogfood snapshot
Projected at: 2026-06-15T23:15:00Z
```

### What the reviewer should understand

The card is not saying review failed. It is saying the projection has no authoritative review source.
This is the visual behavior confirmed by the PR #207 dogfood loop.

### Design notes

- Use neutral copy such as “No review source supplied.”
- Avoid red/error styling.
- Consider a tooltip or detail explanation: “Merge authorization and green CI are not review
  authority.”
- Keep the state visible so the dashboard does not hide uncertainty.

### Required source refs in a real card

- projection snapshot;
- source PR/Work Slice;
- human-review source mapping when explaining why the field is unavailable.

## Validation failed, review pending

### Card reading

```text
[human_review] [confirmed]
Slice auth-002 — Restrict sensitive credential flow
Validation failed and readiness outcome requires human review before continuing.

Evidence: failed
Human review: pending · Security reviewer · Open: approve mitigation path?
Risk: high
Primary alert: critical · Required human review is pending.

Source refs: synthetic://slice-auth-002/readiness-review · synthetic://slice-auth-002/test-run-02
Projected at: 2026-06-15T15:05:00Z
```

### What the reviewer should understand

This card needs attention. The source says validation failed and human review is required. The UI
should show the open question and reviewer role when available.

### Design notes

- This is a high-salience state, unlike `unavailable`.
- The alert should explain what to inspect, not merely say “blocked.”
- Keep `evidence=failed` and `human_review=pending` visually separate: one is validation posture,
  the other is decision posture.
- Do not allow a later runtime-completed event to visually override this without a resolving source.

### Required source refs in a real card

- failed validation evidence;
- readiness review or gate outcome;
- human-review request source;
- alert source refs.

## Telemetry unavailable

### Card reading

```text
[reconcile] [inferred]
Slice docs-telemetry-004 — Reconcile docs-only closeout
Documentation closeout is being reconciled; runtime and cost telemetry were not exported.

Evidence: partial
Human review: not requested
Risk: low
Primary alert: info · Optional telemetry unavailable.

Tokens: unavailable
Cost: unavailable
Source refs: synthetic://slice-docs-telemetry-004/closeout
Projected at: 2026-06-16T16:00:00Z
```

### What the reviewer should understand

The missing telemetry is not the main risk. It is optional and unavailable, while the evidence posture
is only partial for another reason.

### Design notes

- Telemetry should be lower in the hierarchy than evidence, risk, and human review.
- `tokens=unavailable` and `cost=unavailable` should include provenance, not blank values.
- Do not invent estimated costs just to complete the card.
- Avoid turning missing spend data into a productivity judgment.

### Required source refs in a real card

- telemetry source if available;
- explicit `unavailable` provenance when no source exists;
- closeout or Work Slice source.

## Conflicted sources

### Card reading

```text
[validation] [conflicted]
Slice api-guardrail-006 — Confirm restricted-source handling
One source reports validation passed; another reports unresolved restricted-source review.

Evidence: inconclusive
Human review: pending · Governance reviewer · Open: reconcile restricted-source approval?
Risk: medium
Primary alert: warning · Sources conflict; review before trusting lane.

Source refs: synthetic://slice-api-guardrail-006/test-run · synthetic://slice-api-guardrail-006/review-request
Projected at: 2026-06-16T16:10:00Z
```

### What the reviewer should understand

The cockpit cannot safely choose the optimistic interpretation. It should show conflict and preserve
all source refs.

### Design notes

- `lane_confidence=conflicted` should be more visually important than the lane itself.
- Avoid showing this as simply “validation passed.”
- The detail view should list both sources and explain the unresolved question.
- Use alert copy that asks for review rather than declaring the outcome.

### Required source refs in a real card

- all conflicting evidence sources;
- precedence or review rule when available;
- alert source refs.

## Cross-example design rules

1. Do not hide uncertainty to make cards look cleaner.
2. Do not style every missing value as an error.
3. Keep evidence, human review, readiness, and telemetry visually distinct.
4. Put source refs close enough that a reviewer can verify the claim.
5. Treat alerts as review prompts, not automated decisions.
6. Preserve `unknown` and `unavailable` as valid outcomes.

## Next visual step

If these state examples are accepted, the next safe step is a lightweight static board composition:
place these cards into lanes and define overview counts/exception summaries without building a UI.
