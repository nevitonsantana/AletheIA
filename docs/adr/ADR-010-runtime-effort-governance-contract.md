# ADR 010 — Runtime Effort Governance Contract

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-06-03 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR-004 (AletheIA as operating overlay), ADR-006 (Domain agnosticism) |
| Supersedes | — |

## 1. Context

AletheIA already had the substrate for resource-aware operations in the 1.2 track: a
[token policy](../reference/token-policy.md), [waste heuristics](../reference/waste-heuristics.md),
[planning-depth profiles](../reference/planning-depth-profiles.md) (Lite / Standard /
High-Assurance), [readiness gates](../contracts/readiness-gates-spec.md), a
[slice telemetry model](../contracts/slice-telemetry-model.md), and a provider-agnostic
[runtime adapter contract](../contracts/runtime-adapter-contract.md).

What it lacked was an explicit contract for **how an agent decides how much effort to
spend** on a work slice: when to start small, when to escalate, when to reduce effort, when
to stop, and when to hand the decision to a human. Without it, a runtime can fail in two
opposite directions — under-spend on a complex slice (weak, unsafe, incomplete output) or
over-spend on a trivial one (wasted tokens, tools, and context). Two gaps made this acute:
contradictory **signals** (one says escalate, another says de-escalate) and contradictory
**user intents** (e.g. "be fast, precise, and cheap"). The guiding principle: **quality is
the floor; token saving is secondary** — economy must never justify lost clarity, evidence,
safety, or completeness.

The contract, signal reference, template, and examples shipped first as docs-first in
PR #177. This ADR records the decision and the follow-on choice to formalize the per-slice
record as an optional schema once the semantics had stabilized.

## 2. Decision

1. **Add a governance layer, not an engine.** Ship the
   [Runtime Effort Governance Contract](../contracts/runtime-effort-governance-contract.md) as
   a docs-first, advisory-first, provider-agnostic contract that sits *between* the existing
   resource-aware pieces and the runtime. It defines operational intent; runtime adapters
   translate it. It replaces none of token policy, planning-depth profiles, readiness gates,
   or the adapter contract.
2. **Quality floor is a hard invariant.** `quality_floor` is required and
   `token_saving_priority` is secondary. `cost_saving` can never override `quality_floor`,
   and `quality_floor_at_risk` is an always-escalate signal — economy is never silent.
3. **Escalation is evidence-based.** Effort rises only on a defined, observable trigger.
   The signal set is canonical and shared by the contract and the
   [signal reference](../reference/effort-escalation-signals.md); a record may not cite an
   undefined signal. Every signal in `always_escalate` is also a defined `escalation_trigger`.
4. **Conflicts have a fixed resolution order.** A `signal_priority` order (always_escalate →
   escalate_before_deescalate → conditional_escalation → deescalate_only_when_no_blocking_risk)
   and an `intent_resolution` order (safety → precision → autonomy → speed → cost_saving)
   prevent decision loops.
5. **Human authority is a stop, not more reasoning.** Irreversible actions, external side
   effects, high-cost changes, ambiguous trade-offs, and `risk_exceeds_authority` force a
   human checkpoint. More reasoning must not substitute for human authority.
6. **Formalize the per-slice record as an optional schema (this ADR's added decision).**
   Once the semantics stabilized, ship
   [`runtime-effort-governance-contract.schema.json`](../../schemas/runtime-effort-governance-contract.schema.json)
   validating the **telemetry record an agent emits per slice** — not the prose contract.
   The schema enforces the guardrails structurally: signal names are constrained to the
   defined catalog; escalation/de-escalation counts must match recorded reasons (no silent
   moves); a breached quality floor must coincide with a human checkpoint or an
   authority/budget stop; a triggered checkpoint must stop for an authority or
   irreversibility reason. A vitest suite exercises each guardrail.

## 3. Consequences

**Positive**
- Effort decisions become auditable: every escalation, de-escalation, and stop carries a
  recorded, defined reason, and the quality floor can never be breached silently.
- The schema makes the "never silent" obligations executable, mirroring the Feature Value
  pack (ADR-009): a non-conforming record fails validation in CI.
- The layer stays vendor-neutral and additive — no existing contract changes; runtimes opt
  in through their adapter.

**Negative / accepted tradeoffs**
- The schema validates the *record* a caller produces, not the prose contract; the runtime
  must map its decision into the record shape. Accepted — same posture as the generic
  engine fact model.
- Some invariants remain semantic (e.g. "precision overrides speed when risk is medium or
  high") and cannot be expressed structurally; they live in the contract prose and examples.
- Phase 5 (runtime validation on real tasks) and adapter-mapping examples are deliberately
  out of scope here; the layer ships and tunes against evidence later.

## 4. Alternatives considered

- **A model router / auto-routing layer.** Rejected: out of scope and against the
  advisory-first posture; the contract defines behavior, never selects a vendor or model.
- **A heavy policy engine for effort.** Rejected: duplicates the existing governance-pack
  engine and inflates the core; docs + an optional record schema are proportional.
- **Ship the schema in the first PR.** Rejected: the package (and SDD §3.5) deferred it on
  purpose — stabilize the semantics in review before validating structure.
- **Validate the prose contract object instead of the per-slice record.** Rejected: the
  record is the artifact runtimes actually emit and the one worth enforcing in CI.
- **No ADR (docs only).** Rejected: this draws a durable boundary (effort governance vs.
  routing vs. existing contracts) that will be cited across PRs — repo convention writes one.

## 5. Relationship

- Builds on Phase E of the
  [resource-aware operations roadmap](../roadmaps/resource-aware-operations-roadmap.md)
  (planning-depth profiles + readiness gates).
- Contract, reference, template, and example:
  [`runtime-effort-governance-contract.md`](../contracts/runtime-effort-governance-contract.md),
  [`effort-escalation-signals.md`](../reference/effort-escalation-signals.md),
  [`runtime-effort-policy-template.md`](https://github.com/nevitonsantana/AletheIA/blob/main/starter-pack/templates/runtime-effort-policy-template.md),
  [`runtime-effort-contract-example.md`](../../examples/resource-aware-operations/runtime-effort-contract-example.md).
- Schema + fixture + test:
  [`schemas/runtime-effort-governance-contract.schema.json`](../../schemas/runtime-effort-governance-contract.schema.json),
  `examples/resource-aware-operations/fixtures/standard-slice.json`,
  `tests/contracts/test-runtime-effort-governance.test.ts`.
- Adds schema/test/docs only; modifies no existing contract.

## 6. Review

Revisit this ADR when any of the following becomes true:

- Phase 5 runtime validation reveals the trigger set, signal priority, or intent order needs
  to change.
- Adapter-mapping examples or a project overlay need record fields the schema does not model.
- A second resource-aware governance surface appears and reveals shared structure worth
  extracting.
- The per-slice record proves too heavy or too thin for real telemetry consumers.
