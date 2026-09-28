# ADR 017 — Local Deterministic Routing Experiment Exception

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-09-27 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR-004 (AletheIA as operating overlay), ADR-016 (Runtime 2.0 Boundary Review), Capability Routing Reconciliation |
| Supersedes | — |

## 1. Context

ADR-016 keeps routing engines, provider adapters and Runtime 2.0 implementation out of AletheIA's
current runtime boundary. A bounded experiment is useful only if it makes its inputs, hard filters and
result inspectable without becoming a runtime authority.

## 2. Decision

Permit one isolated TypeScript function, `recommendRoute(input)`, for local synthetic replay. It uses
existing Ajv validation and selects only the first route eligible under the caller-provided preference
order. The explicit default-deny request/provider allowlists, route availability, provider availability and every required capability are hard filters.
Unknown required capabilities produce `no_eligible_route`; duplicate IDs and dangling references are
rejected. The result preserves the validated input and both version identifiers.

This exception does **not** authorize a routing engine, scheduler, model/provider switching, tool
selection or invocation, network access, kernel change, provider adapter, automatic execution or new
runtime contract.

## 3. Consequences

**Positive**
- The filtering and rejection rationale can be inspected and replayed from a synthetic fixture.
- No hidden scorer or capability inference is introduced.

**Negative / accepted tradeoffs**
- Preference is caller-declared, not learned or optimized.
- The experiment cannot establish provider quality, cost or operational value.

## 4. Alternatives considered

- **Implement a provider-aware router.** Rejected: it would cross the ADR-016 runtime boundary.
- **Document a hypothetical algorithm only.** Rejected: it would not validate deterministic rejection
  behavior or replay fields.
- **Add a reusable public contract or schema.** Rejected: the local input schema remains experimental
  and does not change canonical runtime contracts.

## 5. Relationship

The experiment is subordinate to the Capability Routing Reconciliation: it recommends a declared local
route but cannot approve, execute or govern a Work Slice. The public reconciliation and canonical schemas
were reviewed; this experiment adds only its own local input schema and does not alter `engine/kernel.ts`,
runtime adapters, harness behavior, policies or schemas used by canonical contracts.

## 6. Review

Reopen only with measured, source-backed evidence that this local replay experiment cannot express a
needed decision and a separately approved boundary proposal defines the minimum safe interface.
