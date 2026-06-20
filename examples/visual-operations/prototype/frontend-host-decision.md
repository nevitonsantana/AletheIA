# Mission Control Frontend Host Decision

## Decision status

**Recommended for the first implementation slice.**

Create a small, isolated **React + Vite + TypeScript** application under
`apps/mission-control/`. Keep the existing repository package as the authority for
the AletheIA engine, contracts, tests, and projectors.

This record chooses an implementation host. It does not create the application,
add dependencies, select a deployment provider, or turn the visual layer into a
new source of truth.

## Problem

The accepted static prototype now needs reusable components and shared behavior,
but this repository has no frontend host, workspace manifest, browser runtime, or
router. Implementing components directly in the current root package would mix a
read-only presentation surface with the framework engine and make future ownership
less explicit.

## Decision drivers

- preserve the Visual Operations boundary as a read-only projection;
- keep the first implementation small and reversible;
- support two views with one shared shell and navigation rail;
- use strict TypeScript and the repository's existing pnpm workflow;
- avoid server rendering, backend assumptions, or a framework-specific runtime;
- leave room for Pulso adoption without blocking implementation on package wiring;
- make it obvious which code belongs to the product surface and which belongs to
  AletheIA framework core.

## Recommended host

### Location

```text
apps/mission-control/
```

The directory should own only the browser application. Existing projection logic
remains outside it and should later be consumed through a narrow adapter.

### Stack

| Concern | First choice | Reason |
|---|---|---|
| UI | React | Appropriate for the accepted component and interaction model. |
| Build and development | Vite | Small static frontend host without server or SSR requirements. |
| Language | TypeScript in strict mode | Matches the repository and keeps projected inputs explicit. |
| Routing | A small supported client router | Two real URLs should share one shell without custom routing infrastructure. |
| Tests | Vitest plus DOM-focused component tests | Extends the current test runner while testing behavior rather than duplicated HTML. |
| Styling | Local semantic tokens aligned to the Pulso bridge | Preserves the accepted visual contract before package compatibility is proven. |
| Data | Static typed fixtures in slice 1 | Prevents live integration from entering the shell implementation. |

The exact router and DOM-test packages should be selected and justified in the
scaffold PR. They are not dependencies of this decision record.

## Pulso adoption posture

For the first implementation slice, Pulso should be treated as a **design contract**:

- translate the approved prototype bridge into local semantic tokens;
- use Pulso naming and interaction expectations where they are already documented;
- do not copy unrelated components or styles into the application;
- do not add a Pulso package until its public API, version, licensing, and build
  compatibility with this host are verified.

This is a staged adoption, not a custom design-system fork. If a compatible Pulso
package is confirmed later, local semantic tokens can become a narrow theme adapter.

## Options considered

### 1. Keep evolving standalone HTML

Not selected for implementation. It remains the visual reference, but duplicated
shell, focus, and navigation behavior will become harder to maintain and test.

### 2. React + Vite in an isolated app

Selected. It provides the smallest conventional component host for this UI while
remaining deployable as static files and independent from the framework engine.

### 3. Next.js or another full-stack framework

Not selected. There is no current requirement for SSR, server actions, API routes,
authentication, or framework-managed data loading. Choosing one now would add
runtime and deployment decisions without improving the read-only first slice.

### 4. Add frontend dependencies to the root package

Not selected. It would blur engine and product-surface boundaries and make the root
package responsible for two different runtime shapes.

## First implementation slice

### Goal

Prove that the accepted global shell can exist once and serve both Mission Control
views without introducing domain logic or live data.

### In scope

- scaffold `apps/mission-control/` with strict TypeScript;
- add only the dependencies required by the scaffold, client routing, and tests;
- implement `MissionControlShell`, `NavigationRail`, and `WorkspaceHeader`;
- expose Evidence Ledger and Resource Observatory as two placeholder routes;
- preserve navigation expansion across route changes;
- provide collapsed icon labels and tooltips;
- preserve keyboard focus and usable narrow-screen behavior;
- use static local fixture labels only.

### Out of scope

- Work Slice cards, operational signal cards, or evidence inspectors;
- projection adapters, source fetches, persistence, or telemetry;
- backend, authentication, authorization, collector, runtime, or event bus;
- schema, lifecycle, policy, gate, or source-record changes;
- Adaptive Skills integration;
- production deployment;
- automatic Pulso package adoption.

## Acceptance evidence

- both URLs render the same shell components;
- active navigation and expansion state work across route changes;
- collapsed navigation is understandable with keyboard-accessible labels;
- component tests cover navigation, persistence, and focus behavior;
- the app has no write or collection interface;
- `pnpm check:governance`, the complete test suite, and Visual Operations snapshot
  checks remain green;
- the application boundary and dependency additions are visible in the PR diff.

## Risks and controls

| Risk | Control |
|---|---|
| The app becomes a second domain authority. | Accept projected records as read-only inputs and keep domain logic outside the host. |
| UI fixtures become unofficial schemas. | Name them fixtures, type only what the component consumes, and replace them through a later adapter. |
| Pulso alignment becomes an unreviewed fork. | Keep a documented token bridge and defer package integration until compatibility is verified. |
| The scaffold expands into product infrastructure. | Stop slice 1 at shell, two routes, and interaction tests. |
| Root scripts and dependencies become tangled. | Isolate browser dependencies and commands under the app boundary. |
| A static deployment later needs direct-route support. | Choose the deployment surface before declaring production readiness. |

## Assumptions still requiring confirmation

- the first running build may be local-only;
- authentication and multi-user concerns remain outside the current visual layer;
- a static hosting surface will be sufficient for the read-only pilot;
- Pulso package consumption is optional until compatibility is demonstrated.

If any of these assumptions changes, revisit the host decision before adding product
infrastructure rather than compensating inside components.

## Next bounded action

After this decision is accepted, implement only the shared shell slice. Do not move
Evidence Ledger or Resource Observatory content into React in the same PR.
