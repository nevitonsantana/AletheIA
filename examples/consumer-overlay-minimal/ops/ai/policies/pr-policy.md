# PR policy

## Branch naming

- `feat/<slug>` — new functionality.
- `fix/<slug>` — bug fix.
- `refactor/<slug>` — internal change, no behavior change.
- `chore/<slug>` — deps, CI, tooling.
- `docs/<slug>` — documentation only.

## Required state before opening a PR

- `pnpm test`, `pnpm lint`, `pnpm build` all green locally.
- Closeout drafted in `ops/ai/reports/` for the slice the PR ships.
- If the PR adds an external dependency, an entry in `ops/ai/learnings/` justifies the choice.

## Required state before merge

- At least one human reviewer approves.
- All CI checks green.
- Closeout in `ops/ai/reports/` matches what actually shipped (update before merge if scope drifted).

## What MAY be merged without human review

Nothing in this project. The team is small; the cost of a stuck PR is lower than the cost of a missed regression.

## What MUST NEVER be merged

- Direct writes to the `incidents` table (see `constitution/principles.md` rule 3).
- Schema migrations without a paired rollback migration (rule 6).
- Changes that take p95 detection latency above 5 minutes without a feature flag (rule 4).
