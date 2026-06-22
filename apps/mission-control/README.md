# AletheIA Mission Control

This package is the isolated browser host for the read-only Mission Control
projection.

## Current slice

The implementation currently contains:

- the shared full-browser shell;
- the collapsible navigation rail;
- the global operational header;
- a functional Evidence Ledger with derived filters, Work Slice cards, and an evidence inspector;
- a narrow read-only adapter that renders the versioned PR #201 and PR #207 projector snapshots beside typed synthetic records;
- a functional Resource Observatory with nine typed local signal fixtures, three presentation groups, and a provenance inspector;
- navigation, persistence, focus, and responsive tests.

The accepted static prototypes remain the visual and content reference. The first
projection-adapter checkpoint is implemented; live source integration remains
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
- versioned projection snapshots and explicit synthetic fixtures only;
- no write API, persistence, collection, backend, runtime, or event bus;
- no new schema, lifecycle, policy, gate, or decision authority;
- no Adaptive Skills integration;
- Pulso is currently represented through local semantic tokens, not a package dependency.

See the [frontend host decision](../../examples/visual-operations/prototype/frontend-host-decision.md)
and [component implementation handoff](../../examples/visual-operations/prototype/component-implementation-handoff.md).
