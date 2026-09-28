# Local deterministic routing experiment

This is a **synthetic, local-only experiment**. `recommendRoute(input)` filters declared route records
by the explicit default-deny request and provider allowlists, route availability, provider availability and every required
capability, then recommends the first eligible route in the supplied `preference` order. The
`provider_policy.default` is explicitly `deny`, so availability never grants permission by itself.
Every input must declare its task requirements, even when the required capability list is empty.

The three task fixtures describe one fictional local environment with exactly three fictional routes:
`fictional-sparrow`, `fictional-heron`, and `fictional-otter`. `task-analysis.json` has two eligible
routes; `task-testing.json` changes the required capability and preference order.
`task-unknown-availability.json` marks the provider availability `unknown`, so no route is eligible.
They are only
replay inputs, not references to real providers or models.

The optional `inventory_origin` field records whether an input is a `synthetic_fixture` or a
`caller_declaration`; the result preserves it in the replay snapshot. It is descriptive, not
verified evidence of discovery or eligibility. Older v1 inputs without this field remain accepted
and their origin remains unspecified rather than inferred. The synthetic fixtures set the label
explicitly. A Codex catalog cannot be labeled as `caller_declaration` to imply live availability.

Provider and route availability can be `true`, `false`, or `unknown`. `unknown` is not coerced to
available: it rejects the candidate with an explicit reason. This is an additive experimental
input form, not a claim that a Codex model list attests live availability. The caller still supplies
every value; the router performs no discovery.

The input schema is validated with the repository's existing Ajv validator. Duplicate provider/route
IDs, duplicate capability values, route capability references outside the catalog, and dangling
allowlist, provider or preference references are rejected. Every declared route must appear once in
`preference`, making the candidate order explicit. Required capabilities absent from the declared
catalog are rejected as unknown; the result is `no_eligible_route` rather than a fallback.
An unknown required capability is reported as unknown, not additionally as missing from each route;
`missing_required_capabilities` applies only to capabilities present in the declared catalog.

Run the fixtures from the repository root with `pnpm routing:demo`; the dedicated NodeNext compile step writes `dist/routing-demo/` and then runs its JavaScript entry. The runner prints each fixture decision separately and
reports `calculation_duration_ms` as local process overhead only. It is not execution duration, cost,
quality, or an operational performance claim. The result defensively preserves a validated input
snapshot plus its input and experiment versions so the decision can be replayed.
The build copies the experimental JSON schema next to the compiled module. Schema lookup is
module-relative, so importing compiled `recommendRoute()` from another working directory does not
change validation behavior.
`eligible_route_ids` contains every eligible route in preference order; `alternative_route_ids`
contains only those after the selected route. Alternatives are suggestions, not executable fallbacks.
The test suite also checks 216 synthetic combinations of provider and route availability,
provider and capability allowlists, and preference order. It asserts that the selected route and
every alternative remain inside the same hard filters; this is a combinatorial safety check, not
evidence of model quality or real runtime availability.

This does not contact a provider, select a real model, invoke tools, switch runtimes or modify kernel
behavior. It is governed by the narrowly scoped ADR-017 exception and changes no public routing or
runtime contract.

The [Codex discovery feasibility check](codex-discovery-feasibility-2026-09-28.md) records why the
installed model catalog and local cache are not treated as live availability evidence.
The [ten evidence gates](codex-model-list-evidence-gates.md) separate catalog metadata, visibility,
freshness, permission, and task fitness before considering any Codex inventory adapter.
