# AletheIA Mission Control Static Prototype

## Purpose

This folder contains a static frontend prototype for the Visual Operations cockpit direction.

It renders the refined **Trace Room + Evidence Desk** mock as local HTML/CSS/JS with mock data only.
It does not collect, store, mutate, or fetch real source records.

## Open locally

Open:

```text
examples/visual-operations/prototype/mission-control-static.html
```

No build step, server, backend, runtime, collector, schema, or package dependency is required.

## Prototype boundaries

- read-only projection only;
- mock data only;
- no drag/drop lane mutation;
- no backend, persistence, collector, runtime, or event bus;
- no schema or policy-engine change;
- no Adaptive Skills integration;
- source refs are illustrative and metadata-first.

## What to review

- Does the trace rail explain why the board says what it says?
- Does the first read prioritize pending review and conflicted validation?
- Does `unavailable` look neutral rather than failed?
- Are source refs visible without overwhelming the card scan?
- Do interactions stay narrow: filter, open detail, show/hide empty lanes?

## Source design artifacts

- [Refined visual mock](../cockpit-refined-visual-mock.md)
- [Light wireframe spec](../cockpit-light-wireframe-spec.md)
- [Static board composition](../cockpit-static-board-composition.md)
