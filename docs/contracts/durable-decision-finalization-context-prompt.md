# Durable Decision — Finalization Context Prompt

## Title

Require a compact Finalization Context Prompt at slice finalization.

## Status

- accepted

## Context

AletheIA already treated restart packages as the compact continuity artifact for resuming after a boundary.

That baseline was directionally right, but still left an operational gap:

- project identity could stay implicit
- the official work item could remain unstated even when an adapter existed
- operators could reopen already-closed scope by accident
- the decision to open a new execution surface could remain implicit
- too much continuity pressure could still leak into transcript replay, memory dependence, and token waste

This became more visible in real cross-project usage where one operator alternates between multiple repos and bounded slices.

## Decision

AletheIA now requires every finalization-ready slice to leave a compact **Finalization Context Prompt** as part of its restart/finalization package.

That prompt must explicitly include:

- `project_ref`
- `official_work_item_ref` when an adapter exists
- what was proved enough to close the slice
- `do_not_reopen`
- `next_official_step`
- whether the next step should open a new execution surface
- a one-line reason for that choice

## Why

This choice was preferred because it improves continuity without reintroducing transcript-first behavior.

It gives the next execution surface the minimum bounded context needed to resume safely while preserving AletheIA’s portable framing:

- project-aware
- adapter-aware when useful
- execution-surface aware instead of thread-centric
- compact enough to reduce token waste and memory dependence

## Alternatives considered

- **Keep the restart package generic and let projects decide the rest**
  - rejected because too much important continuity stayed implicit

- **Make the next-thread decision an operator-only convention**
  - rejected because it weakens portability and makes cross-project continuity drift too easily

- **Build a heavier ADR or lifecycle system first**
  - rejected because the framework only needed a compact durable rule, not more process machinery

## Consequences

Benefits:

- lower restart ambiguity across projects
- less accidental reopening of closed scope
- better token discipline at slice boundaries
- cleaner distinction between continue-on-current-surface and open-new-surface decisions

Tradeoffs:

- finalization artifacts become slightly richer
- operators must fill a few more fields at closure time
- adapters may later want tighter tool-specific mappings for `official_work_item_ref`

## Boundaries

This decision does **not** decide:

- a global issue schema for all adapters
- any specific GitHub, Jira, or Linear implementation rule
- runtime-local commands for opening a new execution surface
- whether every project must use issues as its only external coordination model

## Related artifacts

- `docs/durable-decisions.md`
- `docs/canonical-definitions.md`
- `docs/slice-finalization-and-restart.md`
- `starter-pack/templates/slice-finalization-review-template.md`
- `starter-pack/templates/restart-bootstrap-prompt-template.md`
- `examples/resource-aware-operations/slice-finalization-reference.md`
