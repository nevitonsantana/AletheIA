# Visual Operations Privacy Boundaries

> Posture: `metadata_first`, `deny_sensitive_copy_by_default`. This contract defines what a Visual
> Operations projection may expose. It implements no redaction service or access-control system.

## Purpose

Keep the Mission Control projection useful without turning dashboards, traces, examples, exports,
or logs into a second uncontrolled copy of sensitive source content.

## Core rule

The projection stores and renders **metadata by default**. Sensitive source bodies remain in their
governed location.

## Never project by default

- secrets, API keys, credentials, session tokens, or private keys;
- full prompts, full model responses, or unrestricted tool output;
- personal, confidential, restricted, or regulated data;
- proprietary source text or documents;
- raw environment values, headers, cookies, or authentication material;
- evidence bodies whose source policy forbids copying into logs or handoffs.

## Allowed representation

When a sensitive source influenced a Work Slice, the projection may carry only the minimum safe
representation:

```yaml
sensitive_source_reference:
  source_id:
  classification: internal | confidential | restricted | regulated | unknown
  reference:
  content_hash:
  authorized_summary:
  restrictions_applied: []
  source_refs: []
```

`authorized_summary` is optional and must comply with the source's usage restrictions. A hash proves
identity or change only when the project defines how it is computed; it does not make the content
safe to expose.

## Prompt and trace policy

- Record prompt presence, purpose, model, or size class only when useful and allowed.
- Do not record full prompt content by default.
- Summarize tool calls using action type, risk, verdict, result, and evidence reference rather than
  raw arguments or output.
- Preserve restriction metadata across handoff, restart, export, and reconcile views.

## Telemetry policy

Token and cost fields are optional. When present, each value declares:

- `reported`: emitted by an authoritative provider or governed runtime record;
- `estimated`: computed from an explicit local method;
- `unavailable`: not safely or reliably known.

The projection must not infer provider cost from a stale price table or turn resource values into
individual productivity rankings.

## Unknown and unavailable data

- `unknown` means a source exists, but the projection cannot establish the value.
- `unavailable` means the signal was not provided, cannot be accessed, or should not be exposed.
- Neither value may be silently replaced by zero, `false`, or a fabricated estimate.

## Source restrictions

The [Restricted Knowledge Usage Policy](restricted-knowledge-usage-policy.md),
[Knowledge Audit Log Spec](knowledge-audit-log-spec.md), and
[Logs and Handoffs Policy](../security/logs-and-handoffs-policy.md) remain authoritative. Visual
Operations carries their restrictions forward; it does not relax them.

## Examples and demos

Published examples must use synthetic data. They may demonstrate a restricted-source reference, but
must not contain real customer, employee, credential, repository, or provider data.

## Export boundary

An export is a new disclosure boundary. Before export, a consumer must verify:

- destination and audience;
- source restrictions and classifications;
- whether references resolve outside the local environment;
- whether summaries remain authorized;
- whether human approval is required.

The docs-first layer defines this review requirement but implements no exporter.

## Related

- [Visual Operations Event Model](visual-operations-event-model.md)
- [Work Slice Visual State Contract](work-slice-visual-state-contract.md)
- [Restricted Knowledge Usage Policy](restricted-knowledge-usage-policy.md)
- [Logs and Handoffs Policy](../security/logs-and-handoffs-policy.md)
