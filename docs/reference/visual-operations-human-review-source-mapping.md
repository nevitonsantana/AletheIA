# Visual Operations Human Review Source Mapping

## Purpose

Define which source records may populate the `human_review` block in a Visual Operations projection,
and when the projection must preserve `unknown` or `unavailable` instead of inferring review state.

This is a reference mapping only. It does not change readiness gates, create a review authority,
modify the GitHub PR projector, or add a collector, UI, backend, schema, runtime, or integration.

## Why this exists

Two AletheIA dogfood records showed the same limitation: merged PR snapshots were useful for
closeout, but `human_review` stayed `unavailable` because the source evidence did not include a
separate durable review-requirement or review-completion record.

That is a correct projection result, not a bug. The mapping below makes the restraint explicit so a
future projector or manual usage record does not fill the gap with conversation memory, merge
success, or CI success.

## Canonical visual field

The derived Work Slice visual state carries:

```yaml
human_review:
  required: true | false | unknown
  status: not_requested | pending | completed | unavailable
  reviewer_role:
  open_question:
  source_refs: []
```

Every non-empty value must trace to `source_refs`. Missing sources remain `unknown` or
`unavailable`.

## Source mapping

| Source record | May set `required` | May set `status` | Notes |
|---|---:|---:|---|
| Explicit `human_review.requested` Visual Operations event | yes | `pending` | Requires `source_refs`, reviewer role or open question when available. |
| Explicit `human_review.completed` Visual Operations event | yes | `completed` | Completion must cite the review record, not a downstream merge alone. |
| Readiness outcome that requires review | yes | `pending` | Use when the authoritative readiness record says review is required before continuing. |
| AHC `human_review.required` declaration | yes | `not_requested` or `pending` only with companion review evidence | A declaration can establish requirement; it does not prove completion by itself. |
| Knowledge Governance / restricted-source policy requiring review | yes | `pending` when matched to the task | Examples include `human_review_required_for` and restricted/regulated usage policies. |
| GitHub review state `changes_requested` | yes | `pending` | A pending review can block a confident `closed` lane before resolution. |
| GitHub review state `approved` before closure | unknown or yes when project policy declares approval required | `completed` | Approval proves a review occurred; it does not by itself prove review was mandatory. |
| Bounded finding with `requires_human_review: true` | yes | `pending` while unresolved | Findings after closeout should create follow-up slices rather than rewriting historical closure. |
| Author-reported validation text | unknown | unavailable, unless it explicitly cites a durable review record | Treat as `author_reported`; do not promote prose to authoritative review state. |

## Non-sources

Do not derive human review from:

- merged PR state;
- closed PR state;
- green CI checks;
- passing local validation;
- a human operator approving a chat action when that approval is not exported as a durable source;
- absence of review comments;
- author prose that says review happened but cites no durable review source;
- Visual Operations snapshot existence.

These are useful context, but they are not review authority.

## Projection rules

1. `required: true` requires a source that explicitly requires, requests, or records unresolved human
   review.
2. `status: completed` requires a durable completion/approval source and should not be inferred from
   merge success.
3. `status: pending` requires an unresolved review request, changes-requested review, readiness
   review requirement, or unresolved finding that requires human review.
4. `status: unavailable` is correct when the source system exported no review record.
5. `required: unknown` is correct when review may have happened outside the source system but was not
   durably recorded.
6. If sources conflict, set `lane_confidence: conflicted` and raise an alert with all relevant
   `source_refs` instead of choosing the more convenient value.

## GitHub PR projector note

The current GitHub PR projector can map supplied `reviews` and bounded `findings` into human-review
state:

- `changes_requested` reviews and unresolved findings requiring human review support `pending`;
- `approved` reviews before closure support `completed`;
- no supplied reviews or findings leaves `status: unavailable` and `required: unknown`.

This behavior is conservative by design. A future GitHub collector may make review evidence easier
to assemble, but only after repeated manual assembly issues justify that surface.

## Dogfood observation

The first two AletheIA dogfood records both preserved `human_review=unavailable` because PR #200 and
PR #201 had merge authorization and green checks but no supplied durable review record. This mapping
confirms that outcome and prevents backfilling it from conversation history.

## Related

- [Work Slice Visual State Contract](../contracts/work-slice-visual-state-contract.md)
- [Visual Operations Event Model](../contracts/visual-operations-event-model.md)
- [GitHub PR Visual Operations Projector](../guides/github-pr-visual-operations-projector.md)
- [Visual Operations Usage Evidence](../guides/visual-operations-usage-evidence.md)
- [Visual Operations PR #200 dogfood evidence](../pilots/visual-operations-usage-pr-200-dogfood.md)
- [Visual Operations PR #201 dogfood evidence](../pilots/visual-operations-usage-pr-201-dogfood.md)
