# Hermes Phase -1 Operational Matrix

## Purpose

This matrix turns ADR 001 and ADR 002 into an executable pre-pilot checklist.

ADR 001 and ADR 002 are the source of decision truth. This matrix references them; it must not re-litigate the role of Hermes, memory policy, or skill promotion policy.

## Timebox and ownership

Phase -1 is a **1-week** setup slice.

It is a single-owner sprint owned by Neviton Santana. Work should be serial inside the week. It is only “parallel” in the sense that it should not block Phase 2 preparation.

If Phase -1 exceeds one week, stop and review whether a decision is still immature instead of producing low-quality ADRs.

## Execution profile

| Surface | Decision |
|---|---|
| Runtime | Hermes as controlled runtime executor |
| Profile | `AletheIA Lab` |
| Autonomy | Low-risk, sandboxed tasks only |
| Human gate | Required for medium/high risk and policy changes |
| Cron | Disabled for real tasks |
| Memory | `memory/proposed/` only |
| Skill promotion | Human review only |
| ADR edits | Human/Codex only, not Hermes |

## Allowed without additional approval

Hermes may run without extra approval only when all conditions hold:

- low risk;
- `AletheIA Lab` profile;
- read or sandbox tools only;
- writes limited to allowed paths;
- no production, security, credential, paid integration, or Crisis Monitor core impact.

## Explicitly allowed write paths

- `memory/proposed/`
- `docs/aletheia/closeouts/`
- isolated test branches
- disposable sandbox repositories

## Critical no-write areas

Hermes must not write to these Crisis Monitor areas, even through PR:

- `src/app/api/`
- `lib/cris*`
- credentials, secrets, and environment files
- production configuration
- auth/security surfaces
- paid or sensitive integrations
- Crisis Monitor product core behavior

## Human-in-the-loop rule

| Case | Required action |
|---|---|
| Low risk inside `AletheIA Lab` | May proceed with recorded closeout |
| Medium/high risk | Human approval before mutation |
| Approval waits over 24 business hours | Fail fast; return to backlog as `awaiting-human` |
| Approval appears unread or rubber-stamped | Stop pilot and revise HITL mechanics |

## Memory and skill gates

| Gate | Rule |
|---|---|
| Candidate memory | Hermes may propose in `memory/proposed/` |
| Semantic memory | Human promotion only |
| Promotion threshold | Promoted memories stay below 30% of proposed memories |
| Candidate skill | Hermes may propose with trigger and risk boundary |
| Skill promotion | Human approval only |
| `default` skill | Preferential routing/loading when trigger and risk match; no automatic execution |

## Baseline windows

| Metric family | Baseline |
|---|---|
| Operational metrics | 2 weeks before pilot |
| Qualitative metrics | Continuous baseline through Phase 5, compared to equivalent post-Hermes work |

Operational metrics:

- time to closeout;
- rework rate;
- context re-explanations;
- cost per task;
- scope/gate violations.

Qualitative metrics:

- perceived handoff quality;
- gaps found after handoff;
- clarity of candidate memories;
- usefulness of proposed skill changes.

## Go / no-go thresholds

| Signal | Go threshold | Contain / no-go trigger |
|---|---|---|
| Scope safety | 0 critical violations | 1+ critical violation |
| Non-critical violations | Fewer than 3 in 7 days | 3+ in 7 days |
| Rework | At or below baseline | Above baseline for 2 consecutive weeks |
| Memory curation | Promotion rate below 30% | Promotion rate at or above 30% without strong justification |
| Cost | Within ADR 001 limits | Above USD 0.50 documentation or USD 2.00 discovery limit |
| HITL quality | Approval is recorded and substantively reviewed | Approval confirmed without effective reading |

## Required Phase -1 artifacts

- `docs/adr/ADR-001-hermes-role.md`
- `docs/adr/ADR-002-memory-and-skill-promotion-policy.md`
- `starter-pack/templates/hermes-closeout-template.md`
- `docs/hermes/manual-simulation-closeout.md`
- this matrix

## Validation for this slice

- stale wording grep has no contradictory hits;
- Markdown link check returns `missing_links 0`;
- `bash scripts/check-governance.sh` passes;
- `git diff --check` passes;
- manual simulation states what was hard to fill, what stayed empty, and whether the matrix was unambiguous.
