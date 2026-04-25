# Getting Started with AletheIA

## Goal

This guide is the shortest practical path to start using AletheIA.

It is meant for readers who do not want to read the whole repository first.

---

## One orientation note before you start

AletheIA is now **1.0.0**.

That means:

- the Alpha 1–7 baseline is considered done enough for public reuse
- the framework now has a stable baseline reading path
- future work now moves into **1.x evolution**, not more Alpha buildup

If you want to understand that maturity map first, read:

1. `docs/roadmap-alpha.md`
2. `docs/release-1.0-readiness.md`
3. `CHANGELOG.md`

---

## Choose your starting mode

Most readers should start in one of these modes:

### 1. I want to understand the framework

Read in this order:

1. `docs/canonical-vocabulary.md`
2. `docs/00-overview.md`
3. `docs/governance.md`
4. `starter-pack/guides/daily-operations.md`
5. `docs/token-policy.md`
6. `docs/durable-decisions.md`
7. `docs/enforcement-boundaries.md`

### 2. I want to try the framework quickly

Read and run in this order:

1. `README.md`
2. `examples/`
3. `tests/`
4. `bash scripts/check-governance.sh`

### 3. I want to apply it to an existing project

Read in this order:

1. `docs/apply-to-existing-project.md`
2. `docs/project-extension-pattern.md`
3. `docs/pilot-conversion.md`
4. `starter-pack/README.md`

---

## The smallest useful mental model

AletheIA helps turn this:

`prompt -> output -> execution`

into this:

`intent -> context -> decision -> execution -> validation -> learning`

If you understand that shift, you already understand the core idea of the framework.

If you are unsure what counts as a Work Item, Work Slice, Restart Package, or Execution Surface, read:

- `docs/canonical-vocabulary.md`

---

## What to look at first in the repository

If you only have a few minutes, look at:

- `README.md`
- `docs/00-overview.md`
- `docs/roadmap-alpha.md`
- `docs/governance.md`
- `examples/hello-world/`
- `scripts/check-governance.sh`

That gives you a compact sense of:

- the problem AletheIA solves
- the operating model
- the governance baseline
- the maturity map behind 1.0
- the smallest runnable proof

---

## First practical moves

If you want to test AletheIA in practice, start with one of these:

### Option A — inspect the 1.0 baseline

- read the overview, roadmap, and readiness note
- inspect the starter-pack
- run the lightweight examples and tests

### Option B — pilot one real slice in your own project

- choose one bounded slice
- define the local extension boundary
- apply the minimum operating layer
- validate what helped and what remained local

See also:

- `docs/apply-to-existing-project.md`

---

## What not to do first

Do not start by:

- trying to automate the entire framework at once
- copying every artifact into your repo before one real pilot exists
- assuming your local rules are already reusable framework rules
- pulling post-1.0 tracks into your first bounded adoption slice

AletheIA works best when adoption starts small and becomes more explicit through use.

---

## Suggested next step after this guide

After `getting-started.md`, choose one of these paths:

- **understand the core** -> `docs/00-overview.md`
- **pilot in an existing project** -> `docs/apply-to-existing-project.md`
- **inspect the operating method** -> `starter-pack/README.md`
- **inspect Hermes pre-pilot guardrails** -> `docs/hermes/README.md`
- **understand the maturity path** -> `docs/roadmap-alpha.md`
- **understand how 1.0 was framed** -> `docs/release-1.0-readiness.md`
