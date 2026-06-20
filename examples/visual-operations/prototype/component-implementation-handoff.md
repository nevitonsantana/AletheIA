# Mission Control Component Implementation Handoff

## Status

The static prototype has moved from visual exploration into implementation. The
shared shell and Evidence Ledger now live in `apps/mission-control/`; the typed-fixture
Resource Observatory is also implemented. A first narrow projection adapter now maps
two versioned GitHub pull-request snapshots into the Evidence Ledger without adding
live integration.

This document freezes the accepted interaction model without choosing a frontend framework, creating an application, or changing Visual Operations contracts.

## Problem and objective

The prototype now expresses a coherent Mission Control surface, but its HTML, CSS, mock records, and interactions are duplicated across static files.

The implementation objective is to reproduce the accepted experience with reusable components while preserving one rule: **the interface projects source-backed state; it does not become source truth**.

## Non-goals

- no frontend scaffold in this handoff;
- no backend, collector, runtime, event bus, or persistence;
- no new lifecycle, schema, policy engine, or gate authority;
- no live telemetry or invented operational values;
- no Adaptive Skills integration;
- no framework or Pulso package commitment before a host decision.

## Accepted experience baseline

The future implementation should preserve:

- one full-browser application shell across views;
- one shared collapsible icon rail with labels and collapsed-state tooltips;
- an Evidence Ledger organized by derived review posture;
- a Resource Observatory organized by presentation-only signal groups;
- source references and provenance visible in the working surface;
- details opened through a right-side inspector;
- a clean initial workspace with no inspector pre-opened;
- focus entering the inspector and returning to its initiating card;
- `unavailable` as a neutral absence of evidence;
- alerts as review prompts, never automated decisions.

## Component boundaries

| Component | Owns | Must not own |
|---|---|---|
| `MissionControlShell` | Global header, rail placement, workspace and inspector regions. | Domain state, source resolution, authorization. |
| `NavigationRail` | Expanded state, icons, labels, tooltips, current view. | Routing policy beyond emitting the selected destination. |
| `WorkspaceHeader` | Page title, scope copy, compact projection boundary. | Marketing hero content or hidden business rules. |
| `EvidenceLedger` | Presentation lanes, filter state, visible-card counts. | Work Slice lifecycle mutation or gate decisions. |
| `WorkSliceCard` | Derived posture, confidence, source refs, inspection trigger. | Drag/drop mutation, approval, closure. |
| `ResourceSignalGroup` | Presentation grouping and sourced-signal collection. | A new operational taxonomy. |
| `ResourceSignalCard` | Value or availability, provenance, source ref, inspection trigger. | Collection, calculation, targets, recommendations. |
| `EvidenceInspector` | Contextual source, trace, confidence, interpretation and boundary details. | Editing source records or authorizing actions. |

## State boundaries

### Local interface state

May live inside the frontend:

- navigation expanded or collapsed;
- active visual filter;
- selected card or signal;
- inspector open or closed;
- initiating element used for focus return.

### Projected record state

Must arrive as read-only input:

- Work Slice identity and derived posture;
- signal value or explicit `unknown` / `unavailable`;
- confidence;
- source references;
- provenance: `reported`, `estimated`, or `unavailable`;
- trace context and authorized summaries;
- privacy classification and metadata-only restrictions.

The frontend may format and group these records. It must not infer missing values or persist a competing version of them.

## First implementation slice

The first code slice should be limited to the shared shell:

1. choose and document the frontend host;
2. create the smallest supported application scaffold;
3. implement `MissionControlShell` and `NavigationRail` with static mock input;
4. render two placeholder routes using the same shell;
5. prove rail parity, persistence, keyboard focus and responsive behavior.

Evidence Ledger cards, Resource Observatory signals and source-record adapters stay outside this first slice.

### Acceptance evidence

- both routes render the same shell component;
- the active destination changes correctly;
- rail expansion persists between routes;
- closed icons have accessible labels and tooltips;
- desktop and narrow layouts remain usable;
- no write, collection or domain-authority API exists;
- tests cover the shared shell rather than comparing duplicated HTML.

## Later slices

| Slice | Deliverable | Proof |
|---|---|---|
| 2. Evidence Ledger — implemented | Read-only lanes, cards, filters and inspector using typed mock input. | Derived states and source refs match the accepted prototype; focus returns to the initiating card. |
| 3. Resource Observatory — implemented | Grouped signals and signal inspector using typed mock input. | Nine candidates preserve availability, provenance, and no-authority semantics. |
| 4. Projection adapter — first checkpoint implemented | A pure adapter maps the versioned PR #201 and PR #207 Visual Operations outputs into Evidence Ledger records. Live delivery and additional projector types remain deferred. | Source refs, evidence posture, confidence and trace remain attributable; non-read-only input is rejected. |
| 5. Product QA | Responsive, keyboard, contrast and visual-regression pass. | Critical interaction paths and boundary states are covered. |

## Decisions required before slice 1

- [Frontend host decision](frontend-host-decision.md): use an isolated
  `apps/mission-control/` React + Vite + TypeScript host for the first implementation
  slice;
- select and justify the smallest supported client router and DOM-test dependencies
  in the scaffold PR;
- begin with Pulso-aligned local semantic tokens, then verify package compatibility
  before adding a Pulso dependency;
- keep the first build local-only until a static deployment surface is explicitly
  selected.

The static files remain the visual reference. The application scaffold may begin
only as the shell-only slice defined in the host decision.

## Primary risks

- turning presentation lanes into a mandatory lifecycle;
- letting UI mock structures become new domain schemas;
- adding live telemetry before provenance contracts exist;
- coupling the visual layer directly to one source system;
- implementing generic dashboard components that erase evidence hierarchy;
- duplicating shell behavior across routes instead of sharing components.

## Handoff checkpoint

The prototype phase is complete enough for architectural review when reviewers agree that:

- the static baseline captures the intended experience;
- the first implementation slice remains shell-only;
- the host decision is explicit;
- all future data remains read-only, source-backed and metadata-first.
