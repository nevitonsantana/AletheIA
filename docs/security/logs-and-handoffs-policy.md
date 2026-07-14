# Logs-and-Handoffs Policy

## Goal

Keep a source's restrictions **attached to its content across every boundary**.
Restrictions decided at use time are worthless if they are dropped the moment the
content moves to a log, a trace, another agent, another thread, or another task.

This policy specifies how restrictions are carried forward. It is enforced together
with the [restricted-knowledge-usage-policy](../contracts/restricted-knowledge-usage-policy.md)
(which sets the per-level limits) and the
[data-leakage-checklist](data-leakage-checklist.md) (which checks a single emission).

---

## The carry-forward rule

When governed content crosses any boundary, its restrictions cross with it. A
boundary is any of:

- agent → agent (handoff)
- thread → thread (continuation, restart package)
- task → task (reuse of resolved context)
- runtime → log / trace / telemetry sink
- session → long-term memory
- workspace → export / external deliverable

If the receiving side cannot honor a restriction, the content does not cross —
downgrade to capsule + id + version, or refuse. Restrictions never weaken by transit.

---

## Restriction labels that must travel

These labels are set by the resolver and the
`restricted-context-check` skill, and must be preserved on every handoff:

| Label | Meaning |
|---|---|
| `no_verbatim` | The content may be summarized but not quoted verbatim. |
| `no_export` | The content must not leave the workspace. |
| `citation_required` | Use must cite source id + version. |
| `mask_in_logs` | Restricted segments are masked before any log/trace write. |
| `capsule_only` | Only the capsule may be carried; full source and excerpts are stripped. |
| `summary_only` | Only a summary may cross; no excerpt. |

A handoff payload that includes governed content **must** include its restriction
set. A payload missing the restriction set is treated as untrusted and held.

---

## Logs and traces

- Write identifiers, versions, scope, and decisions — never restricted excerpts.
- Mask restricted segments in any captured prompt/response pair.
- Mask **incidental** sensitive content too: a client name or secret that surfaces
  mid-reasoning is masked at the boundary, not only in the final answer.
- Do not persist restricted excerpts into agent or session long-term memory.

## Handoffs

- Strip restricted excerpts; replace with capsule + pack id + version.
- Attach the restriction set (table above) to the handoff payload.
- A restart package or continuation inherits the same restrictions as the originating task.
- The receiving agent re-applies the [data-leakage-checklist](data-leakage-checklist.md)
  before emitting anything derived from the carried content.

---

## Conflict and review records

When a source conflict is resolved or a review is requested, the **record** crosses
boundaries even though the restricted content does not:

- The conflict record (prevailing / suppressed sources, decision) is preserved and
  handed forward — see the `knowledge-conflict-resolution` skill.
- A pending human-review request blocks production of a final deliverable until it
  returns; the pending state travels with the handoff.

---

## Failure posture

Fail closed. If a boundary cannot carry the restriction set or apply masking, the
governed content does not cross it. Degrading silently to an unrestricted form is a
policy violation, not a fallback.

---

## See also

- [restricted-knowledge-usage-policy](../contracts/restricted-knowledge-usage-policy.md)
- [data-leakage-checklist](data-leakage-checklist.md)
- [human-review-criteria](human-review-criteria.md)
- [knowledge-audit-log-spec](../contracts/knowledge-audit-log-spec.md)
- [agent-handoffs](../concepts/agent-handoffs.md)
