# ADR 011 — Agent Harness Governance Extension

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-06-04 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR-010 (Runtime Effort Governance Contract), ADR-004 (AletheIA as operating overlay), ADR-006 (Domain agnosticism) |
| Supersedes | — |

## 1. Context

The [Runtime Effort Governance Contract](../contracts/runtime-effort-governance-contract.md)
(REGC, ADR-010) governs **how much effort** an agent spends on a work slice: when to start
small, escalate, de-escalate, and stop. But effort decisions alone do not control execution.
An agent can decide effort well and still operate badly if the harness does not control which
tools are exposed, whether a tool call is permitted, how side effects are authorized, what the
runtime budgets are, and how observations are returned. Without this layer AletheIA had strong
decision contracts but little clarity over **real execution**.

The gap is the boundary between the model and the harness. The model proposes actions; it must
not be the thing that authorizes its own side effects, treats the prompt as a security control,
or silently exceeds a budget. That control belongs to a harness/runtime layer that is
provider-agnostic and advisory-first.

The extension shipped first as docs-first in the prior PR: the
[contract](../contracts/agent-harness-governance-extension.md), the
[tool permission matrix](../reference/tool-permission-matrix.md), the
[runtime budget policy](../reference/runtime-budget-policy.md), the
[prompt caching and context cost strategy](../reference/prompt-caching-context-cost-strategy.md),
and an [operational example](../../examples/resource-aware-operations/harness-governance-example.md).
This ADR records the decision and the follow-on choice to formalize the per-action harness
record as an optional schema once the semantics had stabilized.

## 2. Decision

1. **Add a harness control-plane contract, not a runtime.** Ship the Agent Harness Governance
   Extension (AHGE) as a docs-first, advisory-first, provider-agnostic contract that governs
   execution *after* REGC has decided effort. It implements no runtime, no permission engine,
   and no real tools. It replaces neither REGC nor the runtime adapter contract.
2. **The model proposes; the harness authorizes.** The core rule is structural: the model may
   interpret, plan, and request tool calls, but the harness validates arguments, evaluates
   permissions, executes or denies or pauses for approval, enforces budgets, and returns
   structured observations. The model never authorizes its own actions.
3. **Permission lives outside the model.** Every tool carries a risk class, side-effect class,
   and permission policy. The prompt is never a sufficient security control. External
   communication is draft-first; financial, identity/access, destructive, and privileged-admin
   actions require human authority.
4. **Planning mode blocks mutation.** Planning allows read, search, ask, compare, and plan; it
   blocks write, send, delete, payment, permission change, deployment, and any irreversible
   side effect.
5. **Budgets are hard limits.** Turns, tool calls, time, tokens, cost, retries, and result size
   are bounded. Budget exhaustion stops the loop; continuation is a policy or user decision, not
   a model decision.
6. **Formalize the per-action record as an optional schema (this ADR's added decision).** Once
   the semantics stabilized, ship
   [`agent-harness-governance-record.schema.json`](../../schemas/agent-harness-governance-record.schema.json)
   validating the **record a harness emits per model-proposed action** — not the prose contract.
   The schema enforces the invariants structurally: the model never appears as the deciding
   authority; planning mode never commits a mutation; a side effect is never committed without
   an authorizing decision; denied or pending decisions never commit; high-risk commitments
   require a human authority; and a budget stop must name the exhausted budget. A vitest suite
   exercises each guardrail.

## 3. Consequences

**Positive**
- Execution becomes auditable: every permission decision, denial, approval pause, and budget
  stop carries a recorded, defined reason, and a non-conforming record fails validation in CI.
- The schema makes the "model never self-approves" and "no commit without authorization"
  obligations executable, mirroring ADR-009 and ADR-010.
- The layer stays vendor-neutral and additive — no existing contract changes; runtimes opt in
  through their adapter and map their decision into the record shape.

**Negative / accepted tradeoffs**
- The schema validates the *record* a harness produces, not the prose contract or a live
  runtime; the harness must map its decision into the record shape. Accepted — same posture as
  REGC's per-slice record.
- Some invariants remain semantic (e.g. "broad tools should be encapsulated", "secrets never
  enter the context", cache-relevance rules) and cannot be expressed structurally; they live in
  the contract prose, the permission matrix, and the caching strategy.
- A real permission engine, runtime, and adapter-mapping examples are deliberately out of scope
  here; the layer ships docs + an optional record schema and tunes against evidence later.

## 4. Alternatives considered

- **A real permission/runtime engine.** Rejected: out of scope and against the advisory-first
  posture; AHGE defines behavior, it does not execute it. Docs + an optional record schema are
  proportional.
- **Fold AHGE into REGC.** Rejected: REGC governs effort; AHGE governs execution authorization
  and budgets. Conflating them would blur a boundary worth keeping distinct.
- **Ship the schema in the first PR.** Rejected: the package deferred it on purpose — stabilize
  the harness-record semantics in review before validating structure.
- **Validate the prose contract object instead of the per-action record.** Rejected: the record
  is the artifact a harness actually emits and the one worth enforcing in CI.
- **No ADR (docs only).** Rejected: this draws a durable boundary (execution governance vs.
  effort governance vs. runtime adapters) that will be cited across PRs — repo convention writes
  one.

## 5. Relationship

- Complements ADR-010: REGC decides effort; AHGE translates effort into tool visibility,
  permissions, budgets, planning mode, the draft/commit split, and structured observations
  (see the `regc_to_harness_mapping` in the contract).
- Contract, references, and example:
  [`agent-harness-governance-extension.md`](../contracts/agent-harness-governance-extension.md),
  [`tool-permission-matrix.md`](../reference/tool-permission-matrix.md),
  [`runtime-budget-policy.md`](../reference/runtime-budget-policy.md),
  [`prompt-caching-context-cost-strategy.md`](../reference/prompt-caching-context-cost-strategy.md),
  [`harness-governance-example.md`](../../examples/resource-aware-operations/harness-governance-example.md).
- Schema + fixture + test:
  [`schemas/agent-harness-governance-record.schema.json`](../../schemas/agent-harness-governance-record.schema.json),
  `examples/resource-aware-operations/fixtures/harness-action.json`,
  `tests/contracts/test-agent-harness-governance.test.ts`.
- Adds schema/test/docs only; modifies no existing contract.

## 6. Review

Revisit this ADR when any of the following becomes true. The
[validation checklist](../reference/agent-harness-governance-validation-checklist.md) is the
routine that turns a real harness trace into the evidence these triggers need.

- A real runtime or adapter mapping needs record fields the schema does not model.
- The risk taxonomy, decision set, or budget fields change as the contract is validated on real
  tasks.
- A third resource-aware governance surface appears and reveals shared structure worth
  extracting alongside the REGC record.
- The per-action record proves too heavy or too thin for real harness telemetry consumers.
