# Pulso Design System Bridge

## Purpose

Record how the Mission Control static prototype can use **Pulso Design System** as a visual acceleration reference without changing the prototype boundary.

This is a design-system bridge note, not an implementation dependency.

## Why Pulso helps

Pulso can reduce rework by giving future Mission Control passes a shared basis for:

- spacing rhythm;
- typography scale;
- surface and border treatment;
- state color discipline;
- component naming;
- interaction affordances for navigation, filters, cards, and side sheets.

For a designer, this means the next visual passes can focus less on inventing UI primitives and more on the actual Mission Control problem: evidence, source posture, review prompts, and traceability.

## Boundary

Using Pulso as a reference must not introduce:

- a frontend app;
- a build step;
- package dependency;
- runtime data;
- backend;
- collector;
- schema;
- policy engine;
- Adaptive Skills integration.

The current prototype remains static HTML/CSS/JS with mock data only.

## Recommended approach

Use Pulso in three gradual steps:

1. **Vocabulary alignment**
   - Map existing prototype regions to Pulso-like primitives: shell, rail, topbar, card, badge, side sheet, table/ledger row, empty state.
   - Keep Mission Control names where they carry governance meaning: Work Slice, source refs, trace context, review prompt, unavailable.

2. **Token alignment**
   - Compare the prototype CSS variables with Pulso tokens for spacing, radius, typography, border, surface, and state color.
   - Only adopt tokens that preserve the sober operational tone.
   - Do not import Pulso code in this phase.

3. **Component migration candidate**
   - If a later phase creates a real frontend prototype, Pulso can become the component source for reusable primitives.
   - That future step should be a separate implementation plan and PR.

## Mission Control-specific rules

Pulso can standardize the interface, but it must not dilute these rules:

- source records remain authoritative;
- Mission Control is a read-only projection;
- lanes are derived presentation, not lifecycle;
- `unavailable` is neutral;
- alerts are review prompts, not decisions;
- every status, alert, metric, and evidence claim needs source refs or explicit absence.

## First practical follow-up

The next safe slice is a **Pulso token comparison pass**:

- inspect Pulso token names and visual primitives;
- list which ones match the current Mission Control prototype;
- document any gaps where Mission Control needs a stricter governance-specific treatment;
- avoid changing the HTML until the mapping is clear.
