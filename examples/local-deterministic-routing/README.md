# Local deterministic routing experiment

This is a **synthetic, local-only experiment**. `recommendRoute(input)` filters declared route records
by the explicit default-deny request and provider allowlists, route availability, provider availability and every required
capability, then recommends the first eligible route in the supplied `preference` order. The
`provider_policy.default` is explicitly `deny`, so availability never grants permission by itself.
Every input must declare its task requirements, even when the required capability list is empty.

The two task fixtures describe one fictional local environment with exactly three fictional routes:
`fictional-sparrow`, `fictional-heron`, and `fictional-otter`. `task-analysis.json` has two eligible
alternatives; `task-testing.json` changes the required capability and preference order. They are only
replay inputs, not references to real providers or models.

The input schema is validated with the repository's existing Ajv validator. Duplicate provider/route
IDs, duplicate capability values, route capability references outside the catalog, and dangling
allowlist, provider or preference references are rejected. Every declared route must appear once in
`preference`, making the candidate order explicit. Required capabilities absent from the declared
catalog are rejected as unknown; the result is `no_eligible_route` rather than a fallback.

Run the fixtures from the repository root with `pnpm routing:demo`; the dedicated NodeNext compile step writes `dist/routing-demo/` and then runs its JavaScript entry. The runner prints each fixture decision separately and
reports `calculation_duration_ms` as local process overhead only. It is not execution duration, cost,
quality, or an operational performance claim. The result defensively preserves a validated input
snapshot plus its input and experiment versions so the decision can be replayed.
The build copies the experimental JSON schema next to the compiled module. Schema lookup is
module-relative, so importing compiled `recommendRoute()` from another working directory does not
change validation behavior.
`eligible_route_ids` contains every eligible route in preference order; `alternative_route_ids`
contains only those after the selected route. Alternatives are suggestions, not executable fallbacks.

This does not contact a provider, select a real model, invoke tools, switch runtimes or modify kernel
behavior. It is governed by the narrowly scoped ADR-017 exception and changes no public routing or
runtime contract.
