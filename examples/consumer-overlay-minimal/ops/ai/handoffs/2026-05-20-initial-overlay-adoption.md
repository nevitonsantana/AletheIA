# Handoff — initial overlay adoption

**Date:** 2026-05-20
**From:** Neviton (human) + Claude Code session
**To:** Next session (any agent)

## Context

First adoption of the AletheIA operating overlay in Crisis Monitor. Until today this project had no `AGENTS.md`, no `ops/ai/`, and a Claude session was spending its first 5–10 turns asking about project shape and conventions.

## State

**Done.**
- Created `ops/ai/{constitution,handoffs,reports,policies,learnings}/`.
- Wrote the four constitution files (mission, scope, stack, principles).
- Added `AGENTS.md`, `CLAUDE.md`, `.claude/rules/{src,tests}.md`, `.claude/settings.json`.
- Wrote `ops/ai/policies/pr-policy.md`.

**In progress.**
- None.

**Blocked.**
- Nothing blocked.

## Next

1. In the next non-trivial session, write a handoff at session-end. This file is the seed; don't let it become the only one.
2. After the first slice ships post-overlay, write its closeout in `ops/ai/reports/`.
3. Watch whether agent sessions on this repo now reach productive work in ≤2 turns (current baseline: 5–10). Record as a learning if the answer is clear after 3–4 sessions.

## Open questions

- Do we want `ops/ai/skills/` for the incident-triage procedure? Defer until the procedure is stable enough to be reusable.
- Should the data-handling policy live in `ops/ai/policies/data-handling-policy.md` or stay in the legal/security wiki? Pending decision; for now, link from `policies/` rather than duplicating.
