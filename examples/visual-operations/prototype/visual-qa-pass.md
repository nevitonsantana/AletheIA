# Mission Control Prototype Visual QA Pass

## Purpose

Review the accepted **Evidence Ledger + Inspector** prototype as a visual product surface before adding new prototype features.

This pass is intentionally docs-first. It does not change the HTML prototype, introduce runtime data, add a backend, create schemas, wire collectors, or integrate Adaptive Skills.

## Current verdict

The prototype direction is accepted as the current baseline.

It successfully moved from a centered mock presentation into a full-browser operational surface with:

- a collapsible left navigation rail;
- a central Evidence Ledger workspace;
- a right-side inspector side sheet;
- narrow interactions for filtering, navigation focus, and inspection;
- read-only/source-authority language visible in the UI.

## Visual strengths to preserve

| Area | Keep |
|---|---|
| Composition | Full-browser shell, not a framed mockup. |
| Workspace | Evidence Ledger remains the central working surface. |
| Detail | Inspector opens on demand as a side sheet, avoiding permanent workspace loss. |
| Tone | Dark, sober, operational, and lower-polish than generic AI dashboards. |
| Color | State color reserved for evidence posture: critical, review, stable, unavailable. |
| Copy | Interface language explains source posture and boundaries, not marketing claims. |

## QA focus for the next prototype edit

| Focus | What to check | Acceptance signal |
|---|---|---|
| Spacing | Topbar, ledger, lane headers, and side sheet spacing at desktop and narrow widths. | Dense but not cramped; no region feels ornamental. |
| Hierarchy | First scan should reveal review prompts, source gaps, and inspector meaning. | A reviewer knows what to inspect next within a few seconds. |
| Empty states | Lanes with no visible matching cards after filters need neutral explanation. | Empty does not look broken or like missing data. |
| Responsive behavior | Full-browser shell should remain usable when the ledger scrolls horizontally. | Navigation, filters, ledger, and side sheet remain reachable. |
| Side sheet behavior | Opening and closing detail should feel like inspection, not mutation. | Close button, backdrop, and Escape keep the interaction reversible. |
| Source visibility | Source refs should invite verification without overwhelming card scan. | Every claim can be traced, but the card remains readable. |
| Unavailable state | Missing telemetry or source gaps should be neutral. | `unavailable` does not look failed, critical, or complete. |

## Implementation notes

The first HTML QA implementation pass addressed this checklist by adding:

- neutral per-lane empty states when filters hide every card in a lane;
- an aria-live filter summary with visible-card count and active filter label;
- explicit `Inspect` affordance on Work Slice cards;
- responsive handling for the filter summary at narrow widths;
- no new data source, backend, runtime, schema, collector, policy engine, or Adaptive Skills integration.

## Non-goals

Do not use this QA pass to add:

- real telemetry;
- runtime data;
- token or cost calculations;
- drag/drop board behavior;
- approve/reject commands;
- backend, persistence, collector, schema, policy engine, or Adaptive Skills integration.

## Recommended next slice

If the next edit changes the prototype HTML, start with a small **Visual QA implementation pass**:

1. add neutral empty states for filtered lanes;
2. tune responsive spacing for full-browser behavior;
3. improve inspector affordance copy and close behavior if needed;
4. keep all data mocked and all source claims provenance-aware.

A Resource Observatory preview should come after this QA implementation pass, not before it.
