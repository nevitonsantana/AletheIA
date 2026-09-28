# Local deterministic routing experiment

The core router remains a **synthetic, local-only experiment**; the separate ADR-018 advisory draft
wrapper accepts caller declarations for later human review, without verifying or executing them.
`recommendRoute(input)` filters declared route records
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
Capability IDs in this experimental input use letters/digits plus `.`, `_`, `/` or `-` after the
first character. Commas, colons and whitespace are rejected so string-encoded rejection reasons
cannot conflate one ID with multiple IDs. Route and provider IDs are not restricted by this rule.

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

### Offline freshness rehearsal

`demoteStaleInventory(input, window)` tests one new hypothesis without runtime discovery. The caller
supplies `observed_at_ms` (or `null`), `evaluated_at_ms`, and `max_age_ms` as nonnegative safe-integer
epoch milliseconds. No clock is read. At the exact age limit, the declaration stays unchanged;
beyond it, or without an observation time, only `available: true` is demoted to `unknown` in a
defensive copy. `false` and `unknown` are never promoted. The assessment preserves the original
input, the explicit window, its calculated age and the prepared routing input for replay.
The demo uses deliberately small synthetic timestamps, not actual runtime observations.
"Within window" means only that a caller-supplied age rule passed; it does **not** prove current
model availability, authorization, health, quality or acceptable latency. The resulting route
decision remains an advisory local recommendation, never an executable fallback.

The [advisory-pilot boundary proposal](advisory-pilot-boundary-proposal.md) was approved only within
the limits of ADR-018. `prepareAdvisoryDraft()` now validates a caller-declared, source-referenced
envelope and explicit freshness window, then returns a `draft_requires_human_review` suggestion.
That preparation step does not verify source truth, record human disposition, invoke a provider or authorize execution.
`recordAdvisoryReview()` now records an explicit reviewer reference, review time, accept/reject/defer
disposition and rationale in a pure return value. It recalculates freshness at review time; accepting
the *suggestion* is disallowed if no route remains eligible. It neither writes a canonical record
nor accepts or executes the route on behalf of the runtime. The caller must attach the returned
evidence to an existing governed record after human inspection. Source references should be local
identifiers; no real task data or pilot outcome is included in this repository. Real-input use still
requires case-by-case care and does not imply provider truth or runtime authorization.
The advisory draft envelope is `v2`: it also requires local references for task requirements,
request/provider permissions, preference order and inventory observation. These references preserve
the caller's stated basis for a decision; the experiment does not resolve or authenticate them.

For a local manual run, use `pnpm routing:advisory <declaration.json> [review.json]` from the
repository root. Both paths are explicit local files; the command makes no network request and
writes no record. Its default stdout is a short suggestion/review summary. After human review,
`pnpm --silent routing:advisory --full-evidence <declaration.json> <review.json>` explicitly emits
the full reviewed JSON to stdout without pnpm's command preamble, with a confidentiality warning
on stderr. Keep the input files and
attach the reviewed evidence through `evidence_refs` in an existing governed record; do not copy the
suggested model into canonical `selected_vehicle` or `selected_capabilities`. Even the short summary
can contain task and route identifiers, so do not paste it
into a public channel without checking confidentiality. A malformed input returns a generic error
without echoing JSON contents. No real pilot case is bundled here.
The [synthetic review worksheet](advisory-review-worksheet.md) rehearses how a person can inspect
and decline a suggestion without creating a second governance record.
The [ten synthetic review rounds](ten-synthetic-review-rounds.md) provide named, tested cases for
that inspection; they do not count as real pilot evidence.
