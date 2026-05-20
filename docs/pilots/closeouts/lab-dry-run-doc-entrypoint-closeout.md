# Hermes Lab Dry-run Closeout — Documentation Entrypoint Links

## 1. Identification

| Field | Value |
|---|---|
| Title | Hermes Lab dry-run — link Phase -1 artifacts from docs entrypoint |
| Issue | AletheIA #94 |
| Repository | AletheIA |
| Start date | 2026-04-25 |
| Executor | Hermes simulated manually by Codex |
| Human operator | Neviton Santana |

## 2. Pre-execution — AletheIA Protocol inputs

**Intent**
Make the Hermes Phase -1 artifacts discoverable from normal AletheIA reading paths.

**Scope**
Add a small documentation entrypoint update and record the first low-risk Hermes Lab dry-run closeout.

**Out of scope**
Do not run Hermes runtime, change ADR decisions, create new governance rules, or alter Crisis Monitor.

**Risk classification**
Low: documentation-only change in AletheIA.

**Applied skill**
`none — ad-hoc execution`; candidate pattern is Hermes Lab dry-run documentation task.

**Selected model**
GPT via Codex. Rationale: low-risk documentation edit with repository context and GitHub workflow.

**Allowed tools**
GitHub issue/project commands, local file editing in AletheIA branch, grep, governance check, Markdown link check, git diff check.

**Expected evidence**
PR with README/getting-started links to Hermes Phase -1 artifacts, this closeout, and validation output.

**Human approval required?**
No before mutation because this is low risk and inside the simulated `AletheIA Lab` profile. Human review occurs through PR review.

## 3. Active sandbox and gates

- [x] `AletheIA Lab` profile represented as simulation only
- [x] Unattended cron disabled
- [x] Writes restricted to documentation paths
- [x] Skill auto-promotion disabled
- [x] Semantic memory write disabled
- [x] Isolated branch active

## 4. Execution — Layer 1, operational core

**Delivered**
Added Hermes pre-pilot navigation links to the README and getting-started guide, plus this dry-run closeout.

**Validated**
Ran stale wording grep, Markdown link check, governance check, and git diff check.

**Current state**
Documentation changes ready for PR review.

**Artifacts**
- Issue: https://github.com/nevitonsantana/AletheIA/issues/94
- README update: `README.md`
- Getting started update: `docs/getting-started.md`
- Closeout: `docs/hermes/lab-dry-run-doc-entrypoint-closeout.md`

**Completeness**
Final for this dry-run.

**Next issue?**
No immediate next issue. A real Hermes baseline/pilot should be opened only when there is a concrete task set.

## 5. Human approval

Omitted before execution because this is a low-risk documentation dry-run. Human approval happens through PR review.

## 6. Learning and memory — Layer 2

### Candidate learning

**Description**
Starting the closeout before editing made tool boundaries and expected evidence explicit enough for a low-risk documentation task.

**Type**
Operational.

**Proposed destination**
Keep in this closeout; do not promote to semantic memory yet.

### Field friction observed

Harder fields to fill in a simulated Hermes task:

- real execution cost, because no paid Hermes runtime ran;
- actual Hermes model-routing decision, because Codex simulated the executor;
- approval effectiveness, because approval happens after PR review.

Consistently omitted fields:

- human approval table before mutation, because task was low risk;
- proposed skill table, because one dry-run is not enough to justify a skill;
- durable decision section, because this task did not change policy.

## 7. Durable decision — Layer 2

Omitted. No new durable decision was made.

## 8. End of cycle — Layer 3

**Roadmap status**
Improves Phase -1 usability by making Hermes guardrails discoverable from normal reading paths.

**Metrics recorded**

| Metric | Value |
|---|---|
| Time to closeout | Same execution window |
| Execution cost | USD 0.00 Hermes runtime cost |
| Context re-explanations | 0 |
| Human corrections | Pending review |
| Scope violations | 0 |

**Key learnings**
The Hermes matrix was unambiguous for a low-risk docs task: allowed tools, no-go areas, and approval expectations were clear.

**Recalibration**
- Model choice was adequate for simulated low-risk documentation work.
- No skill was applied.
- Effort was small and proportional.

## 9. Audit

| Field | Value |
|---|---|
| Did the task violate scope? | no |
| Did the task require human approval? | no before mutation; PR review remains the human review point |
| Was human approval effective? | pending PR review |
| Did any gate fail or get bypassed? | no |
| Was cost inside ADR 001 limit? | yes |

## Dry-run verdict

The first real documentation dry-run is viable. The closeout structure works best when sections 1–3 are written before edits, and the remaining friction is runtime-specific telemetry that cannot exist until Hermes itself runs.
