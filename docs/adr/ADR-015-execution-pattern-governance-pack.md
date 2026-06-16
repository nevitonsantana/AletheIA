# ADR 015 — Execution Pattern Governance Pack

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-06-12 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR-008 (Knowledge Governance Layer), ADR-009 (Feature Value Governance Pack), ADR-010 (Runtime Effort Governance Contract), ADR-011 (Agent Harness Governance Extension), ADR-013 (Agent Harness Contract), ADR-014 (Harness Enforcement Addendum) |
| Supersedes | — (replaces the never-built "Loop Engineering Addendum" proposal) |

## 1. Context

The repository governs effort (REGC, ADR-010), the per-task envelope (AHC, ADR-013), per-action
execution (AHGE, ADR-011/014), and authorized context (Knowledge Governance, ADR-008). None of
these answer a question that the rise of agentic workflows makes urgent: **which shape of execution
should this task run in at all?** A single agent? A fan-out with synthesis? An adversarial
maker-checker pair? A loop?

The pressure is real: external runtimes now make loops and orchestrated workflows cheap to start,
which creates a default-to-loop failure mode — point tasks become unnecessary automations,
judgment work gets treated as a technical loop, fan-out without synthesis produces volume without
decision, and loops without stop conditions burn budget. The external pack that motivated this
layer began as a "Loop Engineering Addendum" and was deliberately broadened: loop is one execution
shape among many, and the governing decision is *which shape is proportional*.

A vocabulary risk comes with the references: the primary external source uses vendor-specific
workflow terminology. AletheIA and Adaptative Skills must learn from it without adopting that
nomenclature as a conceptual dependency.

## 2. Decision

1. **Add an Execution Pattern Governance layer: pattern selection happens before execution, upstream
   of the AHC.** AletheIA does not decide only which agent or skill to use; it decides **which
   execution pattern is proportional** to the work type, risk, cost, context, and available
   verification. The chain becomes:

   ```
   request → task assessment → execution pattern selection (per-task topology)
     → orchestration contract (when orchestrated)
       → AHC (per-task envelope, ADR-013)
         → skills → AHGE (per-action execution, ADR-011) → audit → human review
   ```

2. **A ten-pattern, vendor-agnostic library is canonical.** `manual_prompt`, `single_agent`,
   `classify_and_act`, `fan_out_and_synthesize`, `adversarial_verification`, `generate_and_filter`,
   `tournament_compare`, `loop_until_done`, `scheduled_stateful_loop`, `human_led_workflow`.
   Loop is one pattern among ten, never the default. Three orthogonal axes are kept distinct:
   **pattern = topology**, **mode = depth** (Adaptative Skills), **autonomy = authority** (AHC).
3. **The loop rule is structural.** A loop is admissible only with an objective stop condition, a
   budget, persistent state when recurring, an objective gate when artifacts change, and human
   review before irreversible action. Without an objective gate there is no autonomous loop — the
   vehicle degrades to a human-led workflow.
4. **Skills declare compatibility; they do not select or enforce.** The Adaptative Skills repo
   ships `skill_execution_patterns` declarations (compatible/incompatible patterns with rationales,
   evidence by pattern, escalation triggers). A skill does not decide alone that it can run in any
   topology; an agent checker is never the only gate on a critical task (maker-checker policy).
5. **Reconcile, never duplicate.** The execution audit record is an **extension view** over the
   AHGE per-action record — no parallel record. Maker-checker outcomes map onto AHGE verdicts.
   The objective gate policy references AHC `gates`. Selection consumes REGC's classification.
   Knowledge Governance restricts what loop state may persist.
6. **Vendor workflow terms are not canonical.** Vendor-specific workflow phrases appear only in
   [`external-references-execution-patterns.md`](../reference/external-references-execution-patterns.md).
7. **Formalize the declarations as optional schemas.** Ship
   [`execution-pattern-selection.schema.json`](../../schemas/execution-pattern-selection.schema.json)
   and [`skill-execution-patterns.schema.json`](../../schemas/skill-execution-patterns.schema.json),
   enforcing the loop rule structurally (invariants 1–4: loop ⇒ gate + budget; recurrence ⇒ state +
   audit; no verification ⇒ no approved loop; irreversibility ⇒ human review) and the declaration
   discipline (incompatibility carries a rationale; loop compatibility keeps the
   `objective_gate_missing` escalation trigger). A vitest suite exercises each invariant.
   An `orchestration-contract` schema is deferred (see §6).

## 3. Consequences

**Positive**
- The topology decision becomes explicit, reviewable, and auditable — closing the gap where
  "make it a loop" happened by default and unreviewed.
- The loop rule becomes executable in CI, mirroring the REGC/AHC/AHGE schema posture.
- Judgment work gains protected negative space: feature value review and similar skills declare
  loop patterns inadmissible with recorded rationales.
- The framework stays additive and vendor-neutral; existing contracts are referenced, not changed.

**Negative / accepted tradeoffs**
- A fourth governance artifact per task (selection + AHC + AHGE record + audit) raises declaration
  overhead. Accepted: proportionality applies to governance itself — `manual_prompt` and
  `single_agent` selections are one-screen declarations.
- The schemas validate declarations, not behavior; a runtime must still honor them. Same posture
  as REGC/AHC/AHGE.
- Comprehension debt review remains a discipline, not an enforcement — it depends on humans
  actually reading.

## 4. Alternatives considered

- **Keep the original "Loop Engineering Addendum" scope.** Rejected: it would canonize loop as the
  center of the system; loop engineering survives as a subset (`loop_until_done`,
  `scheduled_stateful_loop`).
- **Adopt the external vendor workflow vocabulary.** Rejected: vendor coupling in canonical
  language; the abstraction (execution patterns) survives vendor churn.
- **Fold pattern selection into the AHC.** Rejected: the AHC declares the envelope of a task whose
  shape is already chosen; conflating topology selection with envelope declaration would blur the
  selection-before-envelope boundary (same reasoning that kept AHC separate from AHGE in ADR-013).
- **A domain pack instead of a cross-domain layer.** Rejected: the existing
  product-value-governance orchestration pattern is domain-specific; topology selection applies to
  engineering, research, and governance work alike.
- **An orchestration runtime or scheduler.** Rejected: docs-first phase; no runtime, no scheduler,
  no policy engine, no real automation.

## 5. Relationship

- Sits upstream of ADR-013 (AHC) and composes with ADR-010 (REGC, effort), ADR-011/014 (AHGE,
  execution + verdicts), and ADR-008 (Knowledge Governance, context and state restrictions).
- Concepts: [`execution-pattern-governance.md`](../concepts/execution-pattern-governance.md),
  [`execution-pattern-library.md`](../concepts/execution-pattern-library.md),
  [`execution-vehicle-selection.md`](../concepts/execution-vehicle-selection.md),
  [`comprehension-debt.md`](../concepts/comprehension-debt.md).
- Contracts: [`execution-pattern-selection.md`](../contracts/execution-pattern-selection.md),
  [`orchestration-contract.md`](../contracts/orchestration-contract.md),
  [`loop-state-contract.md`](../contracts/loop-state-contract.md),
  [`objective-gate-policy.md`](../contracts/objective-gate-policy.md),
  [`maker-checker-policy.md`](../contracts/maker-checker-policy.md),
  [`execution-audit-record.md`](../contracts/execution-audit-record.md).
- Examples: `examples/execution-patterns/` (four worked selections + JSON fixtures).
- Schemas + tests:
  [`execution-pattern-selection.schema.json`](../../schemas/execution-pattern-selection.schema.json),
  [`skill-execution-patterns.schema.json`](../../schemas/skill-execution-patterns.schema.json),
  `tests/contracts/test-execution-pattern-selection.test.ts`,
  `tests/contracts/test-skill-execution-patterns.test.ts`.
- Counterpart in the Adaptative Skills repo: `docs/execution-patterns-for-skills.md`,
  `docs/looping-models-for-skills.md`, `docs/skills-in-orchestrated-workflows.md`,
  `docs/pattern-compatibility-guidelines.md`, `templates/skill-execution-patterns.yaml`,
  `templates/orchestration-step-requirements.yaml`, `examples/execution-patterns/`.
- External references evaluated:
  [`external-references-execution-patterns.md`](../reference/external-references-execution-patterns.md).
- Adds docs + optional declaration schemas only; modifies no existing contract.

## 6. Review

Revisit this ADR when any of the following becomes true:

- Real task traces show pattern selection is too heavy for small tasks or too thin for orchestrated
  ones (live validation on ≥2 real slices is deferred, mirroring ADR-013 §6).
- The ten-pattern library needs a new pattern or a split — additions require worked examples and at
  least one real selection that did not fit.
- An `orchestration-contract.schema.json` becomes justified by real orchestrated runs (deferred in
  this phase).
- Comprehension-debt reviews show the declaration exists but is not read — then the discipline,
  not the schema, needs redesign.
