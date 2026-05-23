# Rules — `ops/ai/`

Applies when editing files under `ops/ai/` (the operating overlay folder).

- **Never invent historical artifacts.** Don't backfill handoffs, closeouts, or learnings dated before the project adopted the overlay.
- **Naming is `YYYY-MM-DD-<kebab-slug>.md`** for handoffs, learnings, and reports (`-closeout.md` suffix on closeouts). The date is when the event happened, not when the file was written.
- **Constitution edits are decisions, not refactors.** Treat changes to `mission.md`, `scope.md`, or `principles.md` as durable decisions: capture the why in the commit message (or a `reports/` closeout) so the change survives.
- **Promotion gate.** If a pattern in this project looks generalizable to other projects, do not silently move it to canonical AletheIA. Wait for a second project to need it; record the candidacy in `ops/ai/learnings/`.
- **No secrets, credentials, or PII**, even in examples or "this used to fail" anecdotes inside learnings.

See the [consumer-project-overlay contract](https://github.com/nevitonsantana/AletheIA/blob/main/docs/contracts/consumer-project-overlay.md) for the normative rules these enforce.
