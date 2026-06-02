# Skill Evolution Validation Contract

## Goal

Define what a **skill evolution experiment** and its **validation evidence** must satisfy to
be considered governed by AletheIA.

This contract specifies; it does not explain. For conceptual background see
[governed-skill-optimization.md](../concepts/governed-skill-optimization.md). The execution
surface (validation cases, experiments, validator) lives in the Adaptive Skills repository;
this contract governs the **decision**, not the execution.

---

## Principles

1. **Optimization is evidence, not authority.** An experiment may produce evidence, a
   comparison, or a recommendation — never a canonical change.
2. **Governance outranks optimization.** No experimental result overrides AletheIA contracts,
   the Knowledge Governance Layer, or human review.
3. **Synthetic-first.** Validation evidence uses synthetic, public, or explicitly authorized
   material only.
4. **Regression matters.** A change is acceptable only if it improves the target case without
   degrading cases already covered.

---

## Normative requirements

### Evidence

- **R1.** Every experiment MUST reference at least one validation case.
- **R2.** Every validation case MUST declare `sensitivity` using the canonical taxonomy in
  [sensitivity-vocabulary-mapping.md](sensitivity-vocabulary-mapping.md).
- **R3.** Validation cases with sensitivity `confidential`, `restricted`, or `regulated` MUST
  be synthetic-or-capsule only: no raw governed content may appear in any experiment artifact
  (trace, prompt, example, export). This is bound by
  [restricted-knowledge-usage-policy.md](restricted-knowledge-usage-policy.md).
- **R4.** Every experiment MUST reference the skill it targets, and that skill MUST exist.

### Surfaces

- **R5.** An experiment's candidate change MUST target a non-protected skill surface. Protected
  surfaces (skill identity, purpose, when-to-use boundaries, core moves, taxonomy) MUST NOT be
  altered by experimental result.
- **R6.** If an experiment claims to touch a protected surface, it MUST set
  `human_review_required: true`.
- **R7.** No experiment MAY write to a canonical skill document. Auto-writeback is forbidden.

### Outcomes

- **R8.** An experiment's recommendation MAY only be evidence-level — for example
  `reinforced`, `no-change`, `proposal-created`, `defer`, or `rejected`. It MUST NOT be
  `approved` or `merged`.
- **R9.** The strongest authorized outcome is the creation of a proposal in the Evolution
  Layer. Promotion beyond a proposal MUST follow human review and a pull request.
- **R10.** `reinforced` and `no-change` are valid, acceptable outcomes — confirming current
  behavior is governed evidence, not a failure.

### Knowledge-aware skills

- **R11.** Any experiment involving a knowledge-aware skill MUST set
  `human_review_required: true`.
- **R12.** Governed sources MAY appear in such experiments only as simulated metadata or a
  fictional capsule — never as a copied excerpt of a real source.

---

## The authorized flow

```txt
Observation → Validation Case → Experiment → Regression Check
  → Proposal → Human Review → Pull Request → Canonical Skill Update
```

Everything up to and including the experiment is evidence. Everything after the proposal is
human authority.

---

## Conformance

A skill evolution experiment is **conformant** when R1–R12 hold. The Adaptive Skills
repository SHOULD enforce the structural subset of these requirements automatically (a
dependency-free validator) and leave the judgment subset — whether the evidence is strong
enough — to human review. AletheIA does not execute the validator; it requires that
conformance be demonstrable before a derived change is accepted.

---

## Relationship to other contracts

- [restricted-knowledge-usage-policy.md](restricted-knowledge-usage-policy.md) — binds R3, R12.
- [sensitivity-vocabulary-mapping.md](sensitivity-vocabulary-mapping.md) — defines the taxonomy R2 uses.
- [skill-knowledge-dependency-contract.md](skill-knowledge-dependency-contract.md) — how a skill declares knowledge needs; experiments must not bypass it.
- [knowledge-audit-log-spec.md](knowledge-audit-log-spec.md) — audit fields when a governed source influences output.
