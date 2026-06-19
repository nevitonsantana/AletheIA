# Mission Control Prototype Iteration Plan

## Purpose

Record the next safe evolution path for the accepted **Evidence Ledger + Inspector** static prototype.

This is not an implementation plan for a backend, collector, runtime, schema, policy engine, or Adaptive Skills integration. It only defines how future visual prototype slices should evolve without breaking the read-only projection boundary.

## Current accepted baseline

The current baseline is the full-browser **Evidence Ledger + Inspector** prototype:

- collapsible left navigation;
- central Work Slice evidence ledger;
- right-side evidence inspector side sheet;
- integrated trace/event context;
- mock data only;
- source records remain authoritative.

This baseline should remain the reference point unless a later design review explicitly replaces it.

## Next visual slices

The first slice has a docs-first QA artifact: [Mission Control Prototype Visual QA Pass](visual-qa-pass.md).

Pulso Design System may be used as a design acceleration reference for future prototype passes. The boundary and recommended adoption path are recorded in [Pulso Design System Bridge](pulso-design-system-bridge.md), followed by the docs-first [Pulso token comparison pass](pulso-token-comparison.md).

| Slice | Goal | Must preserve | Not included |
|---|---|---|---|
| 1. Visual QA pass | Tighten spacing, hierarchy, empty states, responsive behavior, and interaction clarity. | Full-browser shell, side sheet, read-only semantics. | Runtime data, backend, schemas, collectors. |
| 2. Pulso token alignment | Align prototype CSS vocabulary with Pulso tokens before deeper UI changes. | Static HTML, local aliases, Mission Control-specific governance semantics. | Pulso package import, app build step, shared dependency. |
| 3. Observability preview | Explore a small Resource Observatory preview for sourced operational signals. | `unknown`/`unavailable` for missing sources; provenance on every metric. | Real telemetry collection or unsourced estimates. |
| 4. Source detail depth | Improve inspector treatment for source refs, trace, confidence, and boundary copy. | Metadata-first privacy and source authority. | Prompt bodies, secrets, restricted content. |
| 5. Review workflow readability | Clarify how human review, conflicts, and unavailable telemetry are scanned. | Alerts as review prompts, not decisions. | Approve/reject commands or lifecycle mutation. |

The first review workflow readability pass is represented in the prototype as a compact review-flow rail. It explains review prompt, conflict, source gap, and stable derived postures without adding commands or lifecycle mutation.

## Operational intelligence candidates

Future Resource Observatory views may monitor:

- context tokens;
- token/cost spend;
- retry waste;
- runtime fit;
- review effort;
- quality signals;
- active threads;
- skills usage;
- agent usage.

A signal can appear visually only when it has a source reference and provenance. If no durable source exists, the visual state must be `unknown` or `unavailable`.

The first static preview is included in the prototype as a compact Resource Observatory panel. It uses mock data only and treats APOB as an input/source layer, not as a governance authority.

## Acceptance criteria for future slices

A future prototype slice is acceptable only if:

- the screen still feels like an operational evidence tool, not a generic dashboard;
- Pulso alignment, when used, supports operational clarity rather than adding decorative UI polish;
- the central ledger remains the main workspace;
- details appear on demand through the inspector or side sheet;
- every status, metric, alert, and source claim has source refs or explicit absence;
- `unavailable` remains neutral rather than failure-colored;
- no interaction mutates Work Slice truth;
- no new backend, runtime, collector, schema, policy engine, or Adaptive Skills integration is introduced.
