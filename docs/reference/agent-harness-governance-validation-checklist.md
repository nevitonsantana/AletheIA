# Agent Harness Governance — Validation Checklist

## Goal

Provide a short, repeatable routine for validating the
[Agent Harness Governance Extension](../contracts/agent-harness-governance-extension.md)
against a **real harness trace**, once one exists.

This is the deferred phase-5 step for AHGE. The contract, references, example, and the
[record schema](../../schemas/agent-harness-governance-record.schema.json) shipped docs-first;
this routine is how they get tuned against evidence instead of speculation.

The discipline is the same as [resource-aware-next-signals.md](../roadmaps/resource-aware-next-signals.md)
and the skill-evolution thesis: **evidence is an input, not an authority.** A single trace does
not justify changing the schema, the risk taxonomy, or the budget fields.

---

## When to run this

Run the routine when a real (not synthetic) trace becomes available, such as:

- a runtime or adapter that already emits per-action records;
- a pilot harness instrumented to log tool requests, permission decisions, and outcomes;
- an existing agent log that can be mapped, after the fact, onto the per-action record shape.

Do **not** run it on the shipped fixture
(`examples/resource-aware-operations/fixtures/harness-action.json`) — that fixture only proves
the schema accepts a conforming record. Phase 5 is about real traces.

---

## Step 1 — Capture the trace

For each model-proposed action in the run, capture what the harness actually did:

- the operating mode (planning or execution);
- the tool name and its risk class and side-effect class;
- the permission decision and **who** made it (harness or human);
- whether a side effect was committed;
- the resulting observation status;
- the budget profile and any budget that stopped the loop;
- retries used and result size.

Keep the trace provider-agnostic. Strip secrets and any vendor identifiers before storing it.

---

## Step 2 — Map to the record shape

Translate each captured action into the
[`agent-harness-governance-record`](../../schemas/agent-harness-governance-record.schema.json)
shape. Mapping gaps are themselves findings — record any field the real trace cannot fill, and
any real signal the schema has no field for.

---

## Step 3 — Validate

Validate each mapped record against the schema (the repo's `validateAgainstSchema` helper, the
same path the vitest suite uses). For every failure, classify it:

- **Real violation** — the harness actually breached an invariant (e.g. committed a side effect
  without an authorizing decision, let the model self-approve, mutated in planning mode, or ran
  past a budget without a stop). This is a genuine finding about the harness.
- **Mapping error** — the trace was translated incorrectly. Fix the mapping, not the schema.
- **Schema gap** — the trace is legitimate but the schema is too strict or too loose. Candidate
  for a change, but only under Step 5's discipline.

---

## Step 4 — Record findings

Write down, per trace:

- how many actions validated cleanly;
- each real violation and which invariant it breached;
- each mapping gap (missing field, unmodeled signal);
- each candidate schema gap, with the concrete example that motivated it;
- whether the budget profiles and risk taxonomy fit the real action mix.

---

## Step 5 — Decide changes (with restraint)

A change to the schema, risk taxonomy, or budget fields is justified only when:

- more than one real trace shows the same gap, or one trace shows a clear invariant defect; and
- the change keeps the layer provider-agnostic and advisory-first; and
- it does not turn the docs-first contract into a runtime or permission engine.

If the evidence is a single anecdote, **do not change the contract.** Record the observation and
wait for a second comparable signal — the same posture the
[ADR-011 review section](../adr/ADR-011-agent-harness-governance-extension.md) already names as a
trigger to revisit.

---

## What stays out of scope

Even with real traces, these remain deferred unless evidence becomes unusually strong:

- a real permission engine or runtime in this repo;
- vendor-specific tool policies as core truth;
- auto-routing of tools or models;
- benchmark packaging or a learning layer.

The framework stays provider-agnostic and review-oriented.
