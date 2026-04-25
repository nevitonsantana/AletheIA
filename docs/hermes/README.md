# Hermes Phase -1 Docs Index

Hermes Phase -1 is the pre-pilot baseline for treating Hermes as a controlled runtime executor inside AletheIA.

This index is a navigation aid only. The durable policy sources remain the ADRs and the versioned artifacts linked below.

## Start here

1. `docs/adr/ADR-001-hermes-role.md` — defines Hermes as a controlled runtime executor, not the governor of process, memory, or skills.
2. `docs/adr/ADR-002-memory-and-skill-promotion-policy.md` — defines human-reviewed promotion for memory and skills.
3. `docs/hermes/phase-minus-1-operational-matrix.md` — translates those ADRs into Phase -1 operating gates, thresholds, and stop conditions.
4. `starter-pack/templates/hermes-closeout-template.md` — template used to record Hermes-controlled or simulated executions.

## Baseline closeouts

- `docs/hermes/manual-simulation-closeout.md` — backfilled closeout simulation on an already-closed Crisis Monitor issue.
- `docs/hermes/lab-dry-run-doc-entrypoint-closeout.md` — first low-risk documentation dry-run, simulated manually by Codex.
- `docs/hermes/baseline-phase-minus-1-docs-index-closeout.md` — second low-risk documentation baseline task, focused on this index.

## Current pilot status

- Hermes has not executed as a real runtime yet.
- Current closeouts are simulations run manually by Codex.
- Runtime telemetry remains unavailable until Hermes itself performs a controlled task.
- Memory and skill promotion remain human-reviewed only; no auto-promotion is allowed.

## Baseline rule of thumb

Use this folder to inspect Hermes Phase -1 evidence. Use the ADRs for policy, the operational matrix for gates, and closeouts for task-level evidence.
