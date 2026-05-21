# Closeout — overlay bootstrap

**Date:** 2026-05-20
**Slice:** Adopt the AletheIA operating overlay in Crisis Monitor.

## Done

- `ops/ai/` created with the five required and recommended folders.
- Constitution written (mission, scope, stack, principles).
- `AGENTS.md` and `CLAUDE.md` added at the project root.
- `.claude/rules/` populated with path-scoped rules for `src/` and `tests/`.
- `pr-policy.md` written.
- First handoff committed.

## Pending

- **`learnings/` is empty.** Expected; it accrues over time.
- **`schemas/` and `skills/` not created.** Deferred until a real need appears, per contract §3.5/§3.6.
- **No data-handling policy yet.** Open question recorded in the handoff.
- **No measurement of agent-session-warmup yet.** Will be evaluated after 3–4 sessions.

## Frictions

- The principle "no PII in logs or prompts" surfaced a gap: the existing `logger.info(event)` calls log the whole event object, which sometimes contains a `userId`. Not in scope for this slice (overlay-only) but flagged as the first follow-up slice.
- The `tests.md` rule ("integration tests hit a real Postgres") doesn't match the current CI, which uses a mock. Either the rule or the CI is wrong; both should not coexist. Decision deferred to the next session.
- Writing the constitution forced a question we'd been avoiding: are 90-day retrospectives actually in scope? The scope.md says yes by listing 90-day rolling history; if we change our mind, scope.md is now the single place to fix it.
