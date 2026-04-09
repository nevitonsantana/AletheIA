# Getting Started with AletheIA

## Goal

This guide is the shortest practical path to start using AletheIA.

It is meant for readers who do not want to read the whole repository first.

---

## One orientation note before you start

AletheIA is still **pre-1.0**.

The repository is in its **late Alpha completion cycle**, which means:

- Alpha 1–3 are already treated as complete enough for the current cycle
- Alpha 4–7 still have explicit completion work before the 1.0 gate
- post-1.0 tracks already exist, but they are intentionally deferred

If you want to understand that maturity map first, read:

1. `docs/roadmap-alpha.md`
2. `docs/release-1.0-readiness.md`

---

## Choose your starting mode

Most readers should start in one of these modes:

### 1. I want to understand the framework

Read in this order:

1. `docs/00-overview.md`
2. `docs/governance.md`
3. `docs/token-policy.md`
4. `docs/durable-decisions.md`
5. `docs/enforcement-boundaries.md`

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

---

## What to look at first in the repository

If you only have a few minutes, look at:

- `README.md`
- `docs/00-overview.md`
- `docs/roadmap-alpha.md`
- `docs/release-1.0-readiness.md`
- `docs/governance.md`
- `examples/hello-world/`
- `scripts/check-governance.sh`

That gives you a compact sense of:

- the problem AletheIA solves
- the operating model
- the governance baseline
- the current maturity map
- the smallest runnable proof

---

## First practical moves

If you want to test AletheIA in practice, start with one of these:

### Option A — inspect the current pre-1.0 baseline

- read the overview, roadmap, and readiness gate
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
- pulling post-1.0 ideas into your first bounded adoption slice

AletheIA works best when adoption starts small and becomes more explicit through use.

---

## Suggested next step after this guide

After `getting-started.md`, choose one of these paths:

- **understand the core** -> `docs/00-overview.md`
- **pilot in an existing project** -> `docs/apply-to-existing-project.md`
- **inspect the operating method** -> `starter-pack/README.md`
- **understand the maturity path** -> `docs/roadmap-alpha.md`
- **understand what still blocks 1.0** -> `docs/release-1.0-readiness.md`
