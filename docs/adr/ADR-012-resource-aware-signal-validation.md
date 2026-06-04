# ADR 012 — Resource-Aware Signal Validation Layer

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-06-04 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR-010 (Runtime Effort Governance Contract), ADR-011 (Agent Harness Governance Extension), ADR-006 (Domain agnosticism) |
| Supersedes | — |

## 1. Context

The AletheIA 1.2 resource-aware track closed its build phases (A–F) and then drew an explicit
discipline doc, [resource-aware-next-signals.md](../roadmaps/resource-aware-next-signals.md), to
answer one question: *what real evidence would justify reopening the track toward 1.3+ comparative
evaluation?* Its core rule is restraint — "do not reopen the track because the framework feels
incomplete" — and its thesis is that **evidence is an input, not an authority**: only cross-slice
or cross-project repetition counts, never an anecdote.

But that doc shipped as a *passive* watch-list. Its two sibling contracts in the same track each
shipped with more: the [Runtime Effort Governance Contract](../contracts/runtime-effort-governance-contract.md)
(REGC, ADR-010) and the [Agent Harness Governance Extension](../contracts/agent-harness-governance-extension.md)
(AHGE, ADR-011) each have a phase-5 validation routine and an optional record schema with a vitest
guardrail. The next-signals discipline had neither. There was no repeatable way to take accumulated
real slice evidence and decide, traceably, whether the reopen threshold had been met — the decision
risked being made by intuition, which is precisely the inertia the doc warns against.

## 2. Decision

1. **Operationalize the watch-list as a validation routine, not a trigger.** Ship a docs-first
   [Resource-Aware Next-Signals Validation Checklist](../reference/resource-aware-next-signals-validation-checklist.md),
   the sibling of the [AHGE validation checklist](../reference/agent-harness-governance-validation-checklist.md):
   gather ≥2 real per-slice records, map them to the four healthy signals, apply the
   cross-slice/cross-project threshold, record findings, and decide with restraint. The reopen
   decision remains a **human** judgement.
2. **Formalize the evidence-review event as an optional schema.** Ship
   [`resource-aware-signal-evidence.schema.json`](../../schemas/resource-aware-signal-evidence.schema.json)
   validating the **record produced by one evidence review** — not the prose discipline. It
   aggregates the per-slice REGC records, names which of the four signals fired, and captures the
   decision and its rationale.
3. **Encode the anecdote rule structurally.** The schema makes the core restraint non-bypassable:
   `slice_ids` requires at least two distinct entries, and a `recommend_reopen_1_3` decision is
   only valid when `signal_is_cross_project` is true and `project_count` is at least two. A reopen
   recommendation can therefore never rest on a single slice or a single project. A vitest suite
   exercises each guardrail.
4. **The schema constrains the decision; it never produces it.** Nothing in this layer reopens the
   track automatically. The record forces the human decision to be explicit, traceable, and
   reconcilable with the four-signal catalog.
5. **Keep the deferrals intact.** Vendor ranking, auto-routing, learning-layer behavior,
   orchestration machinery, and benchmark packaging stay deferred to 1.3/1.4, exactly as the
   roadmap and next-signals doc already state.

## 3. Consequences

**Positive**
- Reopening the 1.2 track becomes reviewable rather than inertia-driven: the threshold is now a
  repeatable routine plus a record that fails validation if it tries to reopen on an anecdote.
- The schema makes the "not anecdotal" and "cross-project required" obligations executable,
  mirroring the per-slice record discipline of ADR-010 and ADR-011.
- The track now has phase-5 parity across all three of its governance surfaces (REGC, AHGE,
  next-signals).

**Negative / accepted tradeoffs**
- The schema validates the *record* a review produces, not the prose discipline or a live process;
  a reviewer must map their findings into the record shape. Accepted — same posture as the REGC and
  AHGE per-record schemas.
- Some judgement remains semantic ("comparable review language", "important local differences")
  and cannot be expressed structurally; it lives in the checklist prose.
- The record is optional. A checklist-only outcome is valid, consistent with the next-signals
  thesis that restraint, not machinery, is the point.

## 4. Alternatives considered

- **Leave next-signals passive (docs only).** Rejected: it left no repeatable proof path and made
  the reopen decision vulnerable to intuition — the exact inertia the doc warns against.
- **Build an auto-trigger or scheduler that reopens the track when signals fire.** Rejected:
  directly violates "do not grow by inertia" and the human-decision posture; the layer defines when
  reopening is *justified*, it does not perform it.
- **Add benchmark or learning-layer fields now.** Rejected: explicitly deferred to 1.3/1.4 by the
  roadmap; adding them here would prejudge the very decision this layer is meant to govern.
- **Validate the prose discipline instead of the review record.** Rejected: the review record is
  the artifact a reviewer actually emits and the one worth enforcing in CI.
- **No ADR (docs only).** Rejected: this draws a durable boundary — evidence validation vs. effort
  governance vs. execution governance — that will be cited across PRs; repo convention writes one.

## 5. Relationship

- Builds on ADR-010: the per-slice [REGC records](../../schemas/runtime-effort-governance-contract.schema.json)
  are the raw material this layer aggregates into one evidence-review record.
- Mirrors ADR-011: the [AHGE validation checklist](../reference/agent-harness-governance-validation-checklist.md)
  is the template this routine copies, giving the 1.2 track phase-5 parity across its three surfaces.
- Checklist, schema, fixture, and test:
  [`resource-aware-next-signals-validation-checklist.md`](../reference/resource-aware-next-signals-validation-checklist.md),
  [`schemas/resource-aware-signal-evidence.schema.json`](../../schemas/resource-aware-signal-evidence.schema.json),
  `examples/resource-aware-operations/fixtures/signal-evidence-review.json`,
  `tests/contracts/test-resource-aware-signal-evidence.test.ts`.
- Operationalizes [resource-aware-next-signals.md](../roadmaps/resource-aware-next-signals.md);
  adds schema/test/docs only and modifies no existing contract.

## 6. Review

Revisit this ADR when any of the following becomes true. The
[validation checklist](../reference/resource-aware-next-signals-validation-checklist.md) is the
routine that turns accumulated real slices into the evidence these triggers need.

- More than one cross-project signal recurs and a reopen toward 1.3 is actually recommended.
- The four-signal taxonomy proves too strict or too loose against real reviews (a mapping gap
  recorded in Step 4 of the checklist, seen in more than one review).
- The evidence-review record proves too heavy or too thin for real reviewers.
- A fourth resource-aware governance surface appears and reveals shared structure worth extracting
  alongside the REGC and AHGE records.
