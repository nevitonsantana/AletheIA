# Example 4-Layers — Usage Policy

Usage rules for this pack, derived from its manifest classification (`sensitivity: internal`,
`authority_level: interpretive`) and the [restricted-knowledge-usage-policy](../../../../docs/contracts/restricted-knowledge-usage-policy.md).

## What may be consulted

- The **capsule** (`capsule.md`) is the default surface. Reason from it.
- The full source is **not** consulted by default. It is held outside the workspace
  (see `source-link.md`) and is only reachable under explicit authorization.

## What may be cited

- Citation is **required** when this pack influences a decision: cite as `example-4-layers@1.0.0`.
- Cite the capsule and the conclusion drawn — never paste framework body text.

## What may be summarized

- Operational conclusions (layer mapping, stated bet, falsifier) may be summarized in outputs.
- Inside the project/org boundary: summaries are fine.
- Outside the boundary (`internal` sensitivity): **summary only**, never the source itself.

## What must NOT be exposed

- No verbatim framework text in outputs, logs, traces, or handoffs (`full_text_exposure: forbidden`).
- No export of pack content (`export_allowed: false`).
- No proprietary diagrams, scoring tables, or organization-specific carve-outs.

## When human review is required

Per the manifest `human_review_required_for`:

- `external_publication`
- `client_delivery`
- `policy_conflict` — including any conflict with a mandatory or normative source.

## Retrieval mode

- `capsule_first`. Escalation to the full source requires authorization and a task that genuinely
  needs it; the default analysis runs from the capsule alone.

## Logs and handoffs

- Carry active restrictions forward (no_verbatim, no_export, citation_required).
- Do not let restrictions drop at a boundary. Mask any incidental sensitive content in logs.
