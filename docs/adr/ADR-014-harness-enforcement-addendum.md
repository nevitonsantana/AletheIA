# ADR 014 — Harness Enforcement Addendum: vocabulary reconciliation

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-06-08 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR-011 (Agent Harness Governance Extension), ADR-013 (Agent Harness Contract), ADR-008 (Knowledge Governance Layer), Adaptive Skills ADR-007 (Per-skill harness requirements) |
| Supersedes | — |

## 1. Context

The Agent Harness Enforcement Addendum (an external docs-first proposal) asked AletheIA to define the
contracts a harness enforces against when a skill declares its operating envelope: autonomy levels, a
tool-risk taxonomy, policy verdicts, and an agent-action audit record — plus two worked examples.

The repository already owns most of this surface, at higher fidelity:

- **Autonomy** is fixed by the AHC schema (ADR-013): `observe`, `advise`, `act_with_approval`,
  `autonomous_within_bounds`.
- **Tool risk** is a 15-class taxonomy with per-class default policy in
  `docs/reference/tool-permission-matrix.md` and the tool registry contract in AHGE (ADR-011).
- **Verdicts** exist as the AHGE permission-decision values: `allow`, `deny`, `ask_user`,
  `approval_required`, `require_stronger_auth`, `run_in_sandbox`, `run_as_draft_only`.
- **Audit** exists as the AHGE `trace_event` model plus the governance-record schema, and
  `knowledge-audit-log-spec.md` / `slice-telemetry-model.md`.

The addendum's drafts, however, use a *different and lighter* vocabulary: a five-level autonomy model
(adding `bounded_autonomous` and an unbounded `autonomous`), a coarse four-class risk scale
(low/medium/high/critical), and five verdicts (`allow`/`deny`/`require_approval`/`transform`/
`log_only`). The open question: adopt the drafts' vocabulary, or reconcile it with what AletheIA
already owns — without forking into two competing canons?

## 2. Decision

1. **Reconcile, do not fork.** The new addendum docs are thin **projections** that defer to the
   existing authorities. Where vocabularies overlap, the existing AletheIA artifact is the source of
   truth: the permission matrix for risk, AHGE for verdicts/decisions, the AHC schema for autonomy.
2. **Autonomy stays the canonical four levels.** Map the drafts' `bounded_autonomous` →
   `autonomous_within_bounds`; treat unbounded `autonomous` as out of scope for this phase. Recorded
   in `docs/concepts/autonomy-levels.md`.
3. **Two risk scales, one authority.** Keep the coarse four-class scale for *skill declaration*
   convenience (`docs/concepts/tool-risk-taxonomy.md`), explicitly mapped onto the authoritative
   15-class matrix, with a "the matrix wins on conflict" rule.
4. **Verdicts are a declaration projection.** `docs/contracts/policy-verdicts.md` defines the five
   verdicts and maps each onto AHGE decision values (`transform` → `run_as_draft_only`/`run_in_sandbox`;
   `log_only` → `allow` + `full_structured_event`); `ask_user` has no declaration verdict.
5. **Audit record is a skill-oriented view.** `docs/contracts/agent-action-audit-record.md` names the
   minimum `skill → tool → verdict → evidence → approval` fields and reconciles with the governance
   record schema, which remains authoritative for structure.
6. **Evolve overlaps with marked sections; create only the non-overlapping.** `enforcement-boundaries.md`
   and `agent-harness-governance-extension.md` gain addendum sections (no new competing files); the
   four projection docs and the two `examples/agent-harness/` examples are new.
7. **Docs-first, no runtime.** No policy engine, permission engine, sandbox, or vendor dependency
   (no AGT/OPA/Cedar/SPIFFE/mTLS/IAM) is introduced.

## 3. Consequences

**Positive**
- One canon, not two: the addendum is usable without diverging from the AHC schema or the permission
  matrix, so a future policy-as-code step has a single vocabulary to bind to.
- The declaration → envelope → enforcement chain is explicit:
  per-skill `harness_requirements` (Adaptive Skills) → per-task AHC (ADR-013) → per-action AHGE (ADR-011).

**Negative / tradeoffs**
- A coarse and a fine risk scale coexist; readers must follow the mapping. Accepted because forcing
  skills to choose among 15 classes for "reads files and runs tests" is worse.
- `transform` and `log_only` have no 1:1 AHGE decision; documented as compositions rather than new
  primitives, to avoid expanding the enforcement vocabulary.

## 4. Alternatives considered

- **Adopt the drafts' five-level autonomy and five-verdict vocabulary as-is.** Rejected: forks the
  AHC schema and AHGE, creating two canons and breaking the structural invariants ADR-013 enforces.
- **Add only the coarse vocabulary and drop the authoritative mapping.** Rejected: would let skill
  labels silently override the permission matrix.
- **Skip the projection docs and point skills directly at AHGE/the matrix.** Rejected: skills need a
  small declaration vocabulary; the 15-class taxonomy is too heavy as a declaration surface.

## 5. Relationship

- Sits downstream of ADR-011 (AHGE) and ADR-013 (AHC); consumes the permission matrix and governance
  record schema.
- Pairs with Adaptive Skills ADR-007, which defines the per-skill `harness_requirements` declaration
  that these contracts are the enforcement counterpart to.

## 6. Review

Reopen if: the project adopts an unbounded `autonomous` level; the coarse↔authoritative risk mapping
proves lossy in practice; `transform`/`log_only` need to become first-class AHGE decisions; or a real
policy-as-code engine is introduced (at which point the projections may collapse into the engine's
schema).
