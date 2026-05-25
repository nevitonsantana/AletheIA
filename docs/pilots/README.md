# Pilots

Real adoption evidence, operation records, and case reports. These answer "what actually happened when X was tried?"

> **Pilots are labeled field evidence — not canonical content.** AletheIA is domain-agnostic (see [ADR-006](../adr/ADR-006-domain-agnosticism.md)). The pilots below were the first concrete instances of the patterns the framework codifies; they document *what happened*, not *what must happen*. Crisis Monitor is the first validation case, not the canonical reference — other consumer projects across other domains are expected.

Operation closeouts (session/task records from Hermes and other runtimes) live in [`closeouts/`](closeouts/).

**What NOT to put here:** prescriptive guides on how to run a pilot (those go in `guides/`). A pilot document reports what happened; it does not instruct.

## Contents

| Document | What it records |
|---|---|
| [pilot-crisis-monitor.md](pilot-crisis-monitor.md) | First real product adoption — Crisis Monitor |
| [migration-from-crisis-monitor.md](migration-from-crisis-monitor.md) | Operational boundary between Crisis Monitor pilot and standalone AletheIA |
| [context-graph-decision.md](context-graph-decision.md) | Decision record with real test data (3 controlled tests on Crisis Monitor codebase) |
| [resource-aware-crisis-monitor-reference.md](resource-aware-crisis-monitor-reference.md) | Bounded 1.2-track reference using Crisis Monitor evidence |
| [resource-aware-operations-review.md](resource-aware-operations-review.md) | Consolidation of what the 1.2 track proves |
| [report-core-operating-path-friction-test.md](report-core-operating-path-friction-test.md) | Friction test: is `core-operating-path.md` sufficient for first use? |
| [dev-handoff-2026-05.md](dev-handoff-2026-05.md) | Cycle record — May 2026 |

## In flight

| Pilot | Status | Brief |
|---|---|---|
| Crisis Monitor overlay adoption (Epic 7) | Handed off to Crisis Monitor team; friction log pending | [`guides/pilot-crisis-monitor-overlay-handoff.md`](../guides/pilot-crisis-monitor-overlay-handoff.md) |

The friction log will land here as `pilot-crisis-monitor-overlay-adoption.md` once the pilot reports back. Until then, see the brief in `guides/` for the test plan and log template.

## Closeouts

[`closeouts/`](closeouts/) contains individual operation records from the Hermes pre-pilot and other bounded execution sessions. Each file follows the closeout template.
