# Advisory routing pilot — boundary proposal

**Status:** pilot boundary approved on 2026-09-28 in [ADR-018](../../docs/adr/ADR-018-human-reviewed-advisory-routing-pilot.md); one private real-input case was reviewed and deferred without an eligible route.
**Date:** 2026-09-28. **Owner:** AletheIA study project.

## Decision requested

Whether to permit a small, opt-in **human-reviewed advisory pilot** using manually declared,
source-referenced inputs from real, low-risk tasks. This proposal did not itself amend
[ADR-016](../../docs/adr/ADR-016-runtime-2-boundary-review.md) or
[ADR-017](../../docs/adr/ADR-017-local-deterministic-routing-experiment.md). The current
exception permitted synthetic replay only; the separate approval is recorded in ADR-018.

## Why a separate gate is needed

The [local experiment](README.md) has verified deterministic filtering, ordered preference,
fail-closed unknown availability, replay snapshots and an offline freshness rehearsal. Those tests
establish algorithm behavior, not whether a real model is usable, a capability claim is true, or a
recommendation helps a person make a better decision. The Codex `model/list` feasibility check does
not provide a per-session eligibility verdict. A real-input pilot would cross the synthetic-only
scope of ADR-017 and therefore needs the explicit boundary review required by ADR-016.

## Minimum proposed interface, if approved

1. A person supplies a task reference, required capabilities, provider allowlist and preference order,
   with local references for the requirements, permissions, preference and inventory observation.
2. A person supplies the inventory and capability claims with source references. Unverified
   availability stays `unknown`, explicit unavailability stays `false`, and catalog visibility
   alone never becomes `true`.
3. Observation and evaluation times plus maximum accepted age are explicit. A stale or undated
   declaration can only lose eligibility.
4. The experiment returns the recommendation, rejected candidates, alternatives and replay data.
   A human records whether to accept, reject or defer the suggestion and why.
5. The reviewed decision lives in an existing Work Slice or execution/observation record, using the
   [minimum routing decision record](../../docs/contracts/capability-routing-reconciliation.md#minimum-routing-decision-record)
   where applicable. The experimental model suggestion is attached as evidence; it is not
   reinterpreted as a canonical `selected_vehicle` or `selected_capabilities` field. This proposal
   creates no new canonical schema or lifecycle.

This is a **draft-only decision aid**. The existing runtime/harness remains responsible for any later
execution under its own permissions and Agent Harness Contract. No model, provider or tool is switched
or invoked by AletheIA.

## Explicit exclusions

- No Codex, Claude, Qwen or other provider adapter; no network discovery or account/session probing.
- No automatic route acceptance, fallback, retries, route-up, scheduler, tool selection or execution.
- No cost/quality score, benchmark ranking, learning update, dashboard or Observatory recommendation.
- No new dependency, public API, canonical policy/schema, kernel behavior or Adaptive Skills mutation.
- No interpretation of a `within_window` age check as proof of current authorization or health.

## Pilot evidence and acceptance, if approved

For a small set of individually reviewed, low-risk cases, retain the declared input, source references,
freshness parameters, deterministic result, human choice and explanation of any disagreement.
Redact confidential task material before sharing. Do not infer success rates or model superiority from
the small set. Acceptance requires: no permission expansion; every unknown/stale required condition
fails closed; recommendation and alternatives satisfy identical filters; a reviewer can replay each
decision; the human can decline without runtime side effects.

Stop the pilot if required availability or capability evidence cannot be responsibly declared, if a
recommendation could be mistaken for execution authority, or if existing records cannot retain the
minimum explanation without duplicating governance contracts. Those are findings for boundary review,
not reasons to silently add a runtime layer.

## Approval and next action

**Approved boundary; one private case reviewed:** the project owner explicitly
replied “piloto aprovado” on 2026-09-28. ADR-018 records the limited exception. Source-reference
validation for model claims and decision inputs, fail-closed freshness and pure human-disposition
recording now have synthetic tests.
The first real AletheIA documentation-task case returned `no_eligible_route`; the human reviewer
chose `defer`. Its full evidence and observation are private, ignored files under
`local-pilot-evidence/aletheia-routing-pilot-001/` on the owner's checkout, not part of this
repository's portable source or a success/quality claim. No UI, provider adapter or automated
behavior is authorized.
