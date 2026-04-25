# Hermes Baseline Closeout — Phase -1 Docs Index

## 1. Identification

| Field | Value |
|---|---|
| Title | Hermes baseline — add Phase -1 docs index |
| Issue | AletheIA #96 |
| Repository | AletheIA |
| Branch | `codex/hermes-phase-minus-1-docs-index` |
| Start date | 2026-04-25 |
| Executor | Hermes simulated manually by Codex |
| Human operator | Neviton Santana |

## 2. Pre-execution — AletheIA Protocol inputs

**Intent**
Make the existing Hermes Phase -1 materials easier to inspect as one baseline package without changing policy.

**Scope**
Add a small `docs/hermes/README.md` index for already-versioned Phase -1 artifacts and record this baseline closeout.

**Out of scope**
Do not run Hermes runtime, change ADR decisions, edit governance logic, alter memory or skill-promotion policy, or create new autonomy rules.

**Risk classification**
Low: documentation-only navigation over existing artifacts.

**Applied skill**
`none — ad-hoc execution`; this is the second low-risk simulated Hermes documentation task, not enough to promote a skill.

**Selected model**
GPT via Codex. Rationale: low-risk documentation edit with repo/GitHub workflow context and no sensitive runtime operation.

**Allowed tools**
GitHub issue/project commands, local file editing on isolated AletheIA branch, grep, Markdown link check, `bash scripts/check-governance.sh`, `git diff --check`, git push, PR creation.

**Expected evidence**
PR with `docs/hermes/README.md`, this closeout, grep proof, Markdown link check, governance check, and whitespace diff check.

**Human approval required?**
No before mutation because this is low-risk documentation work. Human review is required through PR review before merge.

## 3. Active sandbox and gates

- [x] `AletheIA Lab` profile represented as simulation only
- [x] Unattended cron disabled
- [x] Writes restricted to documentation paths under `docs/hermes/`
- [x] Skill auto-promotion disabled
- [x] Semantic memory write disabled
- [x] Isolated branch active

## 4. Execution — Layer 1, operational core

**Delivered**
Added a Hermes Phase -1 docs index and routed the existing README/getting-started entrypoints to it.

**Validated**
Executed grep, Hermes-scoped Markdown link check, `bash scripts/check-governance.sh`, and `git diff --check`; all required validation for this scope passed.

**Current state**
Documentation changes validated locally and ready for PR review.

**Artifacts**
- Issue: https://github.com/nevitonsantana/AletheIA/issues/96
- Docs index: `docs/hermes/README.md`
- README entrypoint: `README.md`
- Getting started entrypoint: `docs/getting-started.md`
- Closeout: `docs/hermes/baseline-phase-minus-1-docs-index-closeout.md`

**Completeness**
Final for this documentation baseline, pending PR review/merge.

**Next issue?**
No new issue from this baseline. Next runtime pilot issue should be opened only when a concrete Hermes-controlled runtime task is selected.

## 5. Human approval

Human approval happens through PR review.

## 6. Learning and memory — Layer 2

### Candidate learning

**Description**
A dedicated Hermes folder index reduces navigation friction without creating new policy or pretending runtime telemetry exists.

**Type**
Operational.

**Proposed destination**
Keep in this closeout only; do not promote to semantic memory.

### Discarded memory

No semantic-memory candidate was promoted. This remains task-level evidence. A whole-document README link scan also surfaced one pre-existing unrelated missing reference (`docs/agent-roles-skills-runtime-adapters.md`); it was not changed in this Hermes baseline scope.

## 7. Durable decision — Layer 2

Omitted. No new durable decision was intended for this baseline task.

## 8. End of cycle — Layer 3

**Roadmap status**
Improves Phase -1 baseline readability by grouping existing Hermes guardrails and closeouts.

**Metrics recorded**

| Metric | Value |
|---|---|
| Time to closeout | Same execution window |
| Execution cost | USD 0.00 Hermes runtime cost |
| Context re-explanations | 0 after user seed |
| Human corrections | Pending review |
| Scope violations | 0 |

**Key learnings**
A docs-index baseline is useful for navigation, but it still does not satisfy the missing runtime telemetry gap.

**Recalibration**
- Model choice was adequate for simulated low-risk documentation work.
- No skill was applied or promoted.
- Effort was proportional to a one-file index plus two entrypoint link updates.

## 9. Audit

| Field | Value |
|---|---|
| Did the task violate scope? | no |
| Did the task require human approval? | no before mutation; PR review remains required before merge |
| Was human approval effective? | pending PR review |
| Did any gate fail or get bypassed? | no |
| Was cost inside ADR 001 limit? | yes; no paid Hermes runtime executed |

## Baseline verdict

The second low-risk Hermes documentation baseline is complete as simulated work. It improves discoverability of Phase -1 evidence, but the central pilot gap remains unchanged: Hermes still needs a real controlled runtime execution before runtime telemetry can be assessed.
