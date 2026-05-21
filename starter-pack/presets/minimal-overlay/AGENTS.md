# {{PROJECT_NAME}} — agent dispatcher

{{PROJECT_ONE_LINER}}. This file is the first thing any AI agent should read when working on this repo.

## Where the overlay lives

All operating-overlay artifacts live under `ops/ai/`. Read in this order before acting:

1. [`ops/ai/constitution/mission.md`](ops/ai/constitution/mission.md)
2. [`ops/ai/constitution/scope.md`](ops/ai/constitution/scope.md)
3. [`ops/ai/constitution/stack.md`](ops/ai/constitution/stack.md)
4. [`ops/ai/constitution/principles.md`](ops/ai/constitution/principles.md)
5. The most recent file in [`ops/ai/handoffs/`](ops/ai/handoffs/)

If `ops/ai/` does not yet exist or is empty beyond the constitution, this project is fresh on the overlay — your job is to start populating it as work proceeds.

## Stack at a glance

{{PRIMARY_STACK}}

## Essential commands

```bash
{{INSTALL_CMD}}            # install deps
{{TEST_CMD}}               # run the test suite
{{LINT_CMD}}               # lint and format check
{{BUILD_CMD}}              # production build
{{DEV_CMD}}                # local dev
```

## Validation gates

Before merge, all of the following MUST be green:

- `{{TEST_CMD}}` — full test suite
- `{{LINT_CMD}}` — zero warnings
- `{{BUILD_CMD}}` — clean build
- At least one human reviewer approves
- A closeout exists in `ops/ai/reports/` for the slice being merged

## Non-negotiable rules

The full list lives in [`ops/ai/constitution/principles.md`](ops/ai/constitution/principles.md). Keep these top-of-mind:

1. **Honor the constitution.** If a request conflicts with `principles.md`, stop and surface the conflict.
2. **Stay inside scope.** If a task drifts past `scope.md`, flag it before acting.
3. **No credentials, secrets, or PII in code, logs, or prompts.**
4. **End every non-trivial session with a handoff** in `ops/ai/handoffs/` (Context / State / Next / Open questions).

If this section grows past 5–7 items, the extras belong in `principles.md`, not here.

## Pointers

- For closeouts and progress, see [`ops/ai/reports/`](ops/ai/reports/).
- For local policies that constrain operation, see [`ops/ai/policies/`](ops/ai/policies/).
- For durable lessons that should inform future work, see [`ops/ai/learnings/`](ops/ai/learnings/).
- For path-scoped rules consumed by Claude Code, see [`.claude/rules/`](.claude/rules/).
- For framework background, see the [AletheIA operating-overlay concept](https://github.com/nevitonsantana/AletheIA/blob/main/docs/concepts/operating-overlay.md) and [contract](https://github.com/nevitonsantana/AletheIA/blob/main/docs/contracts/consumer-project-overlay.md).
