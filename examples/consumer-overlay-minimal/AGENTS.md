# Crisis Monitor — agent dispatcher

Crisis Monitor surfaces emerging operational incidents across our regions in under 5 minutes, for the incident-response team. This file is the first thing any AI agent should read when working on this repo.

## Where the overlay lives

All operating-overlay artifacts live under `ops/ai/`. Read in this order before acting:

1. [`ops/ai/constitution/mission.md`](ops/ai/constitution/mission.md)
2. [`ops/ai/constitution/scope.md`](ops/ai/constitution/scope.md)
3. [`ops/ai/constitution/stack.md`](ops/ai/constitution/stack.md)
4. [`ops/ai/constitution/principles.md`](ops/ai/constitution/principles.md)
5. The most recent file in [`ops/ai/handoffs/`](ops/ai/handoffs/)

## Essential commands

```bash
pnpm install            # install deps
pnpm test               # run unit + contract tests
pnpm lint               # eslint + prettier --check
pnpm build              # production build
pnpm dev                # local dev server (port 3000)
```

## Validation gates

Before merge, all of the following MUST be green:

- `pnpm test` — full test suite
- `pnpm lint` — zero warnings
- `pnpm build` — clean build
- At least one human reviewer approves
- A closeout exists in `ops/ai/reports/` for the slice being merged

## Non-negotiable rules

1. **Never silently drop an alert.** If a sink fails, surface the failure as a higher-priority alert. (See `ops/ai/constitution/principles.md` for full list.)
2. **No PII in logs or prompts.** Region IDs are fine; person IDs are not. (See `ops/ai/policies/data-handling-policy.md` if/when created.)
3. **No direct writes to the `incidents` table.** All writes go through the `incident-service` API.
4. **No new external dependencies without an entry in `ops/ai/learnings/` justifying the choice.**

The full principles list lives in [`ops/ai/constitution/principles.md`](ops/ai/constitution/principles.md). The four above are the ones with the highest blast radius if violated.

## Pointers

- For closeouts and progress, see [`ops/ai/reports/`](ops/ai/reports/).
- For local policies that constrain operation, see [`ops/ai/policies/`](ops/ai/policies/).
- For durable lessons that should inform future work, see [`ops/ai/learnings/`](ops/ai/learnings/).
- For framework background, see the AletheIA repo and the [operating-overlay concept doc](https://github.com/nevitonsantana/AletheIA/blob/main/docs/concepts/operating-overlay.md).
