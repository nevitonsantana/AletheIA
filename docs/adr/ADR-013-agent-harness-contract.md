# ADR 013 — Agent Harness Contract (per-task declaration)

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-06-05 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR-010 (Runtime Effort Governance Contract), ADR-011 (Agent Harness Governance Extension), ADR-008 (Knowledge Governance Layer) |
| Supersedes | — |

## 1. Context

The repository already governs three distinct questions about agent work:

- **REGC** (ADR-010) governs *how much effort* a slice deserves — when to start small, escalate,
  de-escalate, and stop, under a quality floor.
- **AHGE** (ADR-011) governs *execution per action* — tool permission decisions, the draft/commit
  split, planning mode, runtime budgets, and the structured per-action record.
- **Knowledge Governance** (ADR-008) governs *which context is authorized* — sources, authority,
  sensitivity, precedence, restrictions.

The Agent Harness Improvement Pack (an external docs-first proposal) raised a question none of
these answer directly: **before a task starts, what is the declared envelope the agent operates
within?** Its proposed "Agent Harness Contract" declares the autonomy level, allowed tools and
skills, blocked actions, required gates, expected sensors, rollback strategy, human-review
requirement, and the context policy — *up front*, as a per-task declaration.

This is upstream of AHGE. AHGE records what actually happened per action; it does not declare, in
advance, the envelope those actions must stay within. The pack also explicitly cautions (PRD §15)
against creating a new "Harness Governance Layer" — the term *layer* should stay reserved.

## 2. Decision

1. **Add an Agent Harness Contract (AHC) as a per-task declaration, not a new layer.** AHC is a
   docs-first, advisory-first, provider-agnostic *contract* declaring the operating envelope for a
   task before it runs. It is not a runtime, orchestrator, policy engine, or permission automation.
2. **AHC composes the existing surfaces; it does not restate them.** The three artifacts form a
   chain, each at its own granularity:

   ```
   REGC (how much effort, per-slice)
     → AHC (the declared envelope, per-task)
       → AHGE (execution + record, per-action)
         → Knowledge Governance (authorized context)
   ```

   AHC references each through an explicit mapping block and never re-decides their concerns:
   it does not set effort (REGC), does not authorize individual actions (AHGE), and does not decide
   source authority or sensitivity (Knowledge Governance).
3. **AHGE's per-action record *is* AHC's observability trace.** AHC declares `observability`
   requirements (`trace_required`, etc.); the trace itself is the
   [AHGE per-action record](../../schemas/agent-harness-governance-record.schema.json). Therefore
   **no new harness-observability concept document is created** — RF5 of the pack is satisfied by
   reference.
4. **Autonomy is a declared taxonomy mapped onto AHGE semantics.** The four levels — `observe`,
   `advise`, `act_with_approval`, `autonomous_within_bounds` — map onto AHGE's planning/execution
   mode and `decision_authority` rather than introducing a parallel permission model.
5. **Formalize the declaration as an optional schema.** Ship
   [`agent-harness-contract.schema.json`](../../schemas/agent-harness-contract.schema.json)
   validating the **declaration** (distinct from the per-action record). It enforces the pack's
   safety invariants structurally: a write/execute tool above low risk requires a write gate; a
   hard-to-reverse task requires rollback and human review; `autonomous_within_bounds` requires
   blocked actions and rollback. A vitest suite exercises each guardrail.

## 3. Consequences

**Positive**
- The pre-task envelope becomes explicit and reviewable, closing the gap between effort (REGC) and
  per-action execution (AHGE).
- Safety obligations (no unguarded write above low risk, no irreversible action without rollback +
  human review) become executable in CI, mirroring REGC/AHGE.
- The framework stays additive and vendor-neutral: no existing contract changes; AHC references them.

**Negative / accepted tradeoffs**
- One more artifact to keep aligned with REGC/AHGE/KGL. Mitigated by the mapping block and a shared
  vocabulary; drift is caught by the cross-phase consistency checks.
- The schema validates the *declaration*, not a runtime; a harness must still honor it. Accepted —
  same posture as the REGC and AHGE record schemas.
- Some fields (sensors, ACI design quality) remain advisory prose; they are not mechanically
  enforced here.

## 4. Alternatives considered

- **Implement the pack as specified, standalone.** Rejected: it would duplicate AHGE's contract,
  schema, and observability, contradicting the anti-duplication discipline.
- **Create a new "Harness Governance Layer".** Rejected: the pack itself (PRD §15) cautions against
  the term; AHC is a contract, not a layer.
- **Fold AHC fields into AHGE.** Rejected: AHGE is per-action execution; AHC is a per-task
  declaration. Conflating them would blur a boundary worth keeping (declaration vs. execution).
- **A new observability document.** Rejected: the AHGE per-action record already is the trace.
- **A real validator/runtime now (`validate_harness_contracts.py`).** Rejected: out of scope and
  deferred by the pack (Fase 5); the JSON Schema + vitest is the structural validator for this phase.

## 5. Relationship

- Sits between ADR-010 (REGC, effort) and ADR-011 (AHGE, per-action execution); references both and
  ADR-008 (Knowledge Governance) for the context policy.
- Concept, contract, references, examples:
  [`agent-harness-contract.md`](../concepts/agent-harness-contract.md) (concept),
  [`agent-harness-contract.md`](../contracts/agent-harness-contract.md) (contract),
  [`agent-computer-interface.md`](../concepts/agent-computer-interface.md),
  [`context-rot-controls.md`](../concepts/context-rot-controls.md),
  [`harness-expiration-review-checklist.md`](../reference/harness-expiration-review-checklist.md),
  `examples/harness/codex-debugging-harness.md`, `examples/harness/codex-testing-harness.md`.
- Schema + fixture + test:
  [`schemas/agent-harness-contract.schema.json`](../../schemas/agent-harness-contract.schema.json),
  `examples/resource-aware-operations/fixtures/agent-harness-contract-debugging.json`,
  `tests/contracts/test-agent-harness-contract.test.ts`.
- A complementary template set lives in the Adaptative Skills repo (`templates/`).
- Adds docs + an optional declaration schema only; modifies no existing contract.

## 6. Review

Revisit this ADR when any of the following becomes true:

- A real Codex (or other) task trace shows the declaration is too heavy or too thin for practical use.
- The autonomy taxonomy, gate set, or sensor fields need to change once validated on real tasks.
- The mapping between AHC, REGC, and AHGE drifts and needs a shared field instead of a reference.
- Repeated real evidence justifies the pack's deferred Fase 5 (a real structural validator beyond
  the JSON Schema). Until then, evidence is an input, not an authority.
