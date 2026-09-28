# ADR 018 — Human-Reviewed Advisory Routing Pilot Boundary

| Field | Value |
|---|---|
| Status | Accepted — pilot scope only |
| Date | 2026-09-28 |
| Author | AletheIA study project |
| Decider | Neviton Santana (explicit “piloto aprovado” in the 2026-09-28 conversation) |
| Related | ADR-016, ADR-017, Capability Routing Reconciliation |
| Supersedes | — |

## Context

ADR-017 permits synthetic replay only. The local deterministic experiment validates filtering and
replay behavior, not real model eligibility, capability truth, quality or value. The project owner
approved the bounded proposal at `examples/local-deterministic-routing/advisory-pilot-boundary-proposal.md`.
This is the separate boundary decision required by ADR-016, not approval of Runtime 2.0.

## Decision

Permit implementation and local use of an **opt-in, draft-only advisory pilot** for individually
reviewed, low-risk real tasks. A person must explicitly provide the task reference, policy, preference
order, inventory and capability claims, with source references for claims and explicit freshness
parameters. Unknown, stale or unsupported required conditions must fail closed. Catalog visibility
alone cannot establish availability. The deterministic output remains a suggestion with rejection
reasons, alternatives and replay evidence. A person records accept, reject or defer with a reason;
acceptance does not execute or switch anything.

Keep that review in an existing Work Slice or execution/observation record. Attach the experimental
model suggestion as evidence, not as canonical `selected_vehicle` or `selected_capabilities`. No new
canonical contract or lifecycle is authorized. The input/output may include task details, so keep
pilot artifacts local, minimize sensitive content and redact before sharing.

## Boundaries and stop conditions

- No provider adapter, account/session probe, network discovery, model/tool invocation, automatic
  acceptance, fallback, retry, route-up, scheduler, kernel or harness change.
- No claim of current provider authorization from an age check; no score, quality/cost optimization,
  learning update, benchmark ranking, Observatory recommendation or Adaptive Skills mutation.
- Stop if evidence for required availability or capability cannot be responsibly declared, a
  suggestion is mistaken for execution authority, or existing records cannot preserve review and
  rationale without a competing governance contract. Return to boundary review rather than silently
  expanding the pilot.

## Acceptance and review

Before using real inputs, implement and test provenance validation, fail-closed freshness and a
draft-only path. For each case retain the declared input, source references, freshness parameters,
deterministic output and human disposition. Verify that recommendation and alternatives pass the
same filters and that a reviewer can replay the decision. A small pilot cannot establish model
superiority, savings or success rates.

ADR-016 remains authoritative for execution and Runtime 2.0. ADR-017 remains the synthetic
experiment boundary outside this explicit advisory exception. Further automation or integration
requires a new decision.
