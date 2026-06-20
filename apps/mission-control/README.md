# AletheIA Mission Control

This package is the isolated browser host for the read-only Mission Control
projection.

## Current slice

The implementation intentionally contains only:

- the shared full-browser shell;
- the collapsible navigation rail;
- the global operational header;
- Evidence Ledger and Resource Observatory placeholder routes;
- navigation, persistence, focus, and responsive tests.

The accepted static prototypes remain the visual and content reference. Cards,
inspectors, filters, signals, projection adapters, and live source integration are
outside this slice.

## Run locally

From the repository root:

```bash
pnpm dev:mission-control
```

Then open `http://localhost:5173/`.

## Validate

```bash
pnpm typecheck
pnpm test
pnpm build:mission-control
```

## Boundary

- read-only presentation state only;
- static fixture copy only;
- no write API, persistence, collection, backend, runtime, or event bus;
- no new schema, lifecycle, policy, gate, or decision authority;
- no Adaptive Skills integration;
- Pulso is currently represented through local semantic tokens, not a package dependency.

See the [frontend host decision](../../examples/visual-operations/prototype/frontend-host-decision.md)
and [component implementation handoff](../../examples/visual-operations/prototype/component-implementation-handoff.md).
