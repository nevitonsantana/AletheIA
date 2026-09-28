# Ten synthetic advisory review rounds

**Status:** study exercise only. These are ten named cases, not ten real work sessions,
production decisions or model evaluations. All IDs, capabilities and availability declarations
come from fictional fixtures. The corresponding
[executable tests](../../tests/experiments/test-local-routing-advisory-scenarios.test.ts)
check the selected route, alternatives and at least one rejection reason per round.

For each round, a reviewer may inspect the result using the
[review worksheet](advisory-review-worksheet.md). No suggestion is accepted for real execution;
the real-input [boundary proposal](advisory-pilot-boundary-proposal.md) remains pending approval.

| Round | Synthetic change from `task-analysis.json` | Expected recommendation | Reviewer question |
|---|---|---|---|
| 1. Baseline analysis | None. | `fictional-sparrow`; `fictional-otter` is an alternative. | Can the person see why `fictional-heron` lacks `analysis`? |
| 2. Testing task | Use `task-testing.json`. | `fictional-heron`; `fictional-otter` is an alternative. | Does changing the required capability explain the changed route? |
| 3. Preference reversal | Put `fictional-otter` first. | `fictional-otter`; `fictional-sparrow` is an alternative. | Is the choice visibly a preference, not a quality score? |
| 4. Provider blocked | Empty the explicit provider allowlist. | `no_eligible_route`. | Is permission still independent of declared availability? |
| 5. Provider unknown | Declare provider availability `unknown`. | `no_eligible_route`. | Does uncertainty prevent all routes under that provider? |
| 6. Preferred route unknown | Declare `fictional-sparrow` availability `unknown`. | `fictional-otter`; no alternative remains. | Is the rejected preferred route distinguishable from a known outage? |
| 7. All routes unavailable | Declare every route `false`. | `no_eligible_route`. | Does the system avoid inventing a permissive fallback? |
| 8. Unknown requirement | Require `not-declared`, absent from the catalog. | `no_eligible_route`. | Is lack of catalog knowledge kept distinct from known route incompatibility? |
| 9. Requirement not allowed | Remove `analysis` from the request allowlist. | `no_eligible_route`. | Does an allowed provider remain insufficient when the task capability is forbidden? |
| 10. Stale inventory | Use the synthetic `1_000` → `3_001` ms observation/evaluation window with `max_age_ms: 2_000`. | `no_eligible_route` after demotion to `unknown`. | Is stale caller evidence treated as a loss of eligibility, not a health verdict? |

## Result of this exercise

The ten cases rehearse explanation and human inspection of deterministic decisions. They do not
establish that a real model is available, capable, authorized, cheaper or better. A human reviewer
should **defer any operational decision** based solely on these fictional inputs. Passing the tests
is a reason to consider the proposed consultative pilot boundary, not permission to cross it.
