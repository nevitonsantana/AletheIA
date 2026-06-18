# AletheIA Mission Control Static Prototype

## Purpose

This folder contains a static frontend prototype for the Visual Operations cockpit direction.

It renders the **Evidence Ledger + Inspector** direction as local HTML/CSS/JS with mock data only.
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

## Visual status

This prototype is an architectural and interaction scaffold for the Mission Control surface.
The current direction changes composition rather than polishing the earlier board: it uses an **Evidence Ledger + Inspector** structure inspired by the supplied dark operational references.

Design intent:

- full-browser app shell rather than a framed presentation mock;
- collapsible left navigation that can expand for labels or collapse for workspace focus;
- central evidence ledger for Work Slice posture instead of a generic project-management board;
- right-side evidence inspector as a side sheet for source refs, trace context, confidence, and boundary language;
- trace/events integrated as context rather than a dominant decorative rail;
- flatter surfaces with less glow, less glass, fewer pill-like controls, and tighter radius;
- state color used only for evidence posture: review, critical, stable, and unavailable.

## What to review

- Does the surface feel like an operational evidence tool rather than a generic dashboard?
- Does the central ledger reduce project-management-board vibes?
- Does the inspector make source refs, confidence, trace context, and boundaries easier to read?
- Does `unavailable` look neutral rather than failed?
- Do interactions stay narrow: filter, expand/collapse navigation, and inspect only?
- Does the full-browser shell feel like product UI rather than a centered mockup?
- Does the side sheet make details available without permanently consuming workspace?

## Source design artifacts

- [Prototype iteration plan](iteration-plan.md)
- [Refined visual mock](../cockpit-refined-visual-mock.md)
- [Light wireframe spec](../cockpit-light-wireframe-spec.md)
- [Static board composition](../cockpit-static-board-composition.md)
