# Visual Operations Cockpit Static Board Composition

## Purpose

Place the static cockpit card examples into a board-style reading so designers and reviewers can
check lane semantics, overview counts, and exception summaries before any UI or wireframe work.

This file is not a dashboard implementation, generated projection, schema, backend, collector, or
runtime. It is a static design-facing composition that reuses the card states from
[`cockpit-card-state-examples.md`](cockpit-card-state-examples.md).

## Board frame

| Field | Value |
|---|---|
| Board | AletheIA Mission Control — Visual Operations static composition |
| Projection mode | read-only, illustrative |
| Source posture | synthetic + public dogfood examples |
| Last projected | 2026-06-16T16:30:00Z |
| Authority | none; source records remain authoritative |

## Overview summary

| Metric | Count | How to read it |
|---|---:|---|
| Total visible cards | 5 | Static example set, not a project total. |
| Needs attention | 2 | One pending human review, one conflicted lane. |
| Closed / stable | 2 | Closed cards still show review-source gaps. |
| Unavailable optional signals | 3 | Human review or telemetry unavailable; not failure by itself. |
| Critical alerts | 1 | Validation failed and required review is pending. |
| Warning alerts | 1 | Sources conflict and require review before trusting the lane. |
| Info alerts | 1 | Optional telemetry unavailable. |

## Exception strip

The overview should surface exceptions before normal cards:

1. **Critical:** `Slice auth-002` — validation failed; required human review is pending.
2. **Warning:** `Slice api-guardrail-006` — sources conflict; lane confidence is conflicted.
3. **Info:** `Slice docs-telemetry-004` — optional telemetry unavailable; do not treat as failure.

Design note: the exception strip should not become an enforcement queue. It tells a reviewer what to
inspect first.

## Lane composition

```text
intake            (0)
framing           (0)
context_ready     (0)
planning          (0)
execution         (0)
validation        (1)  ⚠ conflicted
human_review      (1)  critical pending review
reconcile         (1)  info telemetry unavailable
closed            (2)  stable with explicit metadata gaps
blocked           (0)
```

Empty lanes may be hidden or collapsed in a UI prototype, but the model should make clear that lanes
are presentation posture, not mandatory lifecycle stages.

## Board columns

### Validation — 1 card

```text
[validation] [conflicted]
Slice api-guardrail-006 — Confirm restricted-source handling
Evidence: inconclusive
Human review: pending · Governance reviewer
Primary alert: warning · Sources conflict; review before trusting lane.
Source refs: synthetic://slice-api-guardrail-006/test-run · synthetic://slice-api-guardrail-006/review-request
```

Reviewer action: open detail/trace and compare the conflicting validation and review sources before
trusting the lane.

### Human review — 1 card

```text
[human_review] [confirmed]
Slice auth-002 — Restrict sensitive credential flow
Evidence: failed
Human review: pending · Security reviewer · Open: approve mitigation path?
Risk: high
Primary alert: critical · Required human review is pending.
Source refs: synthetic://slice-auth-002/readiness-review · synthetic://slice-auth-002/test-run-02
```

Reviewer action: inspect failed validation and review request; do not move to `closed` without a
resolving source.

### Reconcile — 1 card

```text
[reconcile] [inferred]
Slice docs-telemetry-004 — Reconcile docs-only closeout
Evidence: partial
Human review: not requested
Risk: low
Primary alert: info · Optional telemetry unavailable.
Tokens: unavailable · Cost: unavailable
Source refs: synthetic://slice-docs-telemetry-004/closeout
```

Reviewer action: decide whether missing telemetry matters for this slice. Do not turn missing
optional resource data into a failure.

### Closed — 2 cards

```text
[closed] [confirmed]
PR #207 — Human-review source mapping
Evidence: sufficient
Human review: unavailable
Risk: unknown
Primary alert: none
Source refs: PR #207 · CI run 27626141953 · merge 39f76cf
```

```text
[closed] [confirmed]
PR #201 — Dogfood evidence record
Evidence: sufficient
Human review: unavailable
Risk: unknown
Primary alert: none
Source refs: PR #201 · CI run 27581612377 · dogfood snapshot
```

Reviewer action: treat these as stable closeout cards, but do not read `human_review=unavailable` as
approval, rejection, or failure.

## Empty lane treatment

| Empty lane | Suggested copy | Design caution |
|---|---|---|
| `intake` | “No framed candidate slices in this static example.” | Do not imply no work exists in the real project. |
| `framing` | “No slices currently shown as framing.” | Hidden/collapsed is acceptable in a UI prototype. |
| `context_ready` | “No context-ready slices in this example.” | Avoid treating lane absence as missing process. |
| `planning` | “No active planning cards shown.” | A slice can skip visual lanes when sources do not support them. |
| `execution` | “No active execution cards shown.” | Runtime activity alone is not success evidence. |
| `blocked` | “No blocked cards in this example.” | Critical review pending may be urgent without using the `blocked` lane. |

## Overview-to-card rules

The overview counts should be derived from visible cards only:

- `needs attention` counts cards with warning/critical alerts or pending required review;
- `closed / stable` counts cards in `closed` with confirmed lane confidence;
- `unavailable optional signals` counts visible unavailable human-review or telemetry fields but
  should not increase failure counts;
- `critical alerts` and `warning alerts` count alert severity, not readiness authority;
- empty lanes should not create alerts by themselves.

## Design review questions

Use this composition to review the next artifact:

1. Can a non-engineer identify the two cards needing attention first?
2. Is it clear that closed cards still have metadata gaps?
3. Does `unavailable` read as honest absence of source evidence, not failure?
4. Are pending review, failed validation, and conflicted sources visually distinct?
5. Do telemetry gaps stay lower priority than validation/review risk?
6. Are source refs visible enough to invite verification?
7. Does the board avoid implying drag/drop lifecycle control?

## Next visual step

If this static board composition is accepted, the next safe step is a lightweight wireframe or design
sketch derived from this composition. That wireframe should still avoid backend, runtime, collector,
schema, or policy-engine changes. See [Cockpit light wireframe spec](cockpit-light-wireframe-spec.md).
