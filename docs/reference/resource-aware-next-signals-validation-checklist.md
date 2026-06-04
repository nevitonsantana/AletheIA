# Resource-Aware Next-Signals — Validation Checklist

## Goal

Provide a short, repeatable routine for validating the
[Resource-Aware Next Signals](../roadmaps/resource-aware-next-signals.md) discipline against
**real, accumulated slice evidence**, once it exists.

This is the deferred phase-5 step for the AletheIA 1.2 resource-aware track as a whole. It is the
sibling of the
[Agent Harness Governance — Validation Checklist](agent-harness-governance-validation-checklist.md):
the next-signals roadmap shipped docs-first as a *passive* watch-list; this routine is how that
watch-list gets exercised against evidence instead of left to intuition.

The discipline is the same as the next-signals doc itself and the skill-evolution thesis:
**evidence is an input, not an authority.** A single slice — however interesting — never justifies
reopening the 1.2 track toward 1.3. Only cross-slice or cross-project repetition does.

---

## When to run this

Run the routine when **multiple** real (non-synthetic) slice records have accumulated, such as:

- a batch of [Runtime Effort Governance](../contracts/runtime-effort-governance-contract.md)
  per-slice records emitted by real work;
- review notes from more than one comparable slice across one or more projects;
- recurring local rules that several projects independently invented for the same operational
  pressure (restart-package tightening, review-pause timing, slice stopping criteria).

Do **not** run it on a single slice, a single fixture, or one unusually hard task. The next-signals
doc is explicit that those are *inputs, not thresholds*
([resource-aware-next-signals.md](../roadmaps/resource-aware-next-signals.md) §"Signals that are
not enough by themselves"). Running this routine on one record proves nothing.

---

## Step 1 — Gather comparable slices

Collect **at least two** real per-slice records in the
[`runtime-effort-governance-contract`](../../schemas/runtime-effort-governance-contract.schema.json)
shape, drawn from comparable work. For each, note:

- the `task_type`, `classification` (reversibility, blast radius, uncertainty, risk), and `user_intent`;
- the effort path (`initial_effort` → `final_effort`) and the `escalation_reasons` / `stop_reason`;
- whether a `human_checkpoint_triggered` and whether `quality_floor_maintained`;
- the originating project, kept as a coarse label only.

Strip secrets and vendor identifiers before storing anything. Keep the gathered set
provider-agnostic.

---

## Step 2 — Map slices to the four healthy signals

For each candidate signal from
[resource-aware-next-signals.md](../roadmaps/resource-aware-next-signals.md) §"Healthy signals to
watch for", tally which gathered slices exhibit it:

| Healthy signal | What to look for across the slices |
|---|---|
| **Repeated comparable slices** | similar shape, similar resource-aware pressure, similar review outcomes |
| **Repeated late-stage waste** | context drag, retry growth, handoff inflation, or runtime-fit mismatch discovered too late, more than once |
| **Repeated local translations** | several projects independently inventing similar local rules for the same pressure |
| **Stable reinforced outcomes** | multiple slices ending `reinforced` or `no-change` for the same broad pattern |

A signal that appears in only one slice is **not** a hit. Record it as an input and move on.

---

## Step 3 — Apply the threshold rule

A signal counts toward reopening the track only when it is **cross-slice or cross-project**, not
anecdotal. Resolve each tallied signal against the rule in
[resource-aware-next-signals.md](../roadmaps/resource-aware-next-signals.md) §"What can justify
1.3+":

- one interesting example, one hard slice, one project's preference, one vendor choice → **input, not threshold**;
- the same pattern across more than one believable slice, with comparable review language → **a real signal**.

If no signal clears this bar, the routine ends at *keep 1.2 stable*. That is the expected outcome
most of the time, and it is a healthy result, not a failure.

---

## Step 4 — Record findings

Write down, per gathered set:

- which of the four signals fired, and in how many slices / projects;
- whether each firing signal was cross-project or confined to one project;
- the outcome distribution (`reinforced` / `no-change` / other) across the slices;
- which local translations recurred, if any;
- mapping gaps — any real signal the four-signal taxonomy has no slot for. **A mapping gap is
  itself a finding**, the same way it is in the AHGE checklist.

If the optional
[`resource-aware-signal-evidence`](../../schemas/resource-aware-signal-evidence.schema.json) record
is in use, capture this review as one conforming record so the decision stays explicit, traceable,
and reconcilable with the signal catalog.

---

## Step 5 — Decide (with restraint)

Reopening the 1.2 track toward 1.3+ comparative evaluation is justified **only** when the
combination named in
[resource-aware-next-signals.md](../roadmaps/resource-aware-next-signals.md) §"What can justify
1.3+" holds:

- more than one believable real-world slice; **and**
- comparable review language across those slices; **and**
- enough structure to compare without hiding important local differences; **and**
- no need yet for learning-layer or auto-routing claims.

In order of discipline:

1. **repeated evidence first**, 2. **comparative framing second**, 3. **benchmark packaging only after that.**

If the evidence is a single anecdote, **do not reopen the track.** Record the observation and wait
for a second comparable signal — the same posture
[ADR-012](../adr/ADR-012-resource-aware-signal-validation.md) names as the trigger to revisit. The
reopen decision is always a **human** judgement; nothing in this routine reopens the track
automatically.

---

## What stays out of scope

Even with stronger signals, these stay deferred unless the evidence becomes unusually strong, per
[resource-aware-next-signals.md](../roadmaps/resource-aware-next-signals.md) §"What should still
stay deferred":

- vendor ranking as core truth;
- auto-routing claims;
- learning-layer behavior;
- orchestration-heavy policy machinery;
- benchmark packaging before repeated evidence and comparative framing exist.

The framework stays provider-agnostic and review-oriented.
