# Restricted Knowledge Usage Policy

## Goal

Define usage rules for knowledge sources that are **internal**, **confidential**, **restricted**, **regulated**, or otherwise sensitive — including proprietary frameworks the organization does not want exposed verbatim.

This policy applies in addition to the [knowledge-source-contract](knowledge-source-contract.md) and is enforced by the [knowledge-resolver](../concepts/knowledge-resolver.md).

---

## What restricted means here

"Restricted" is shorthand for any source whose `sensitivity` is `internal`, `confidential`, `restricted`, or `regulated`. The exact controls depend on the level (see the sensitivity table in [knowledge-source-contract](knowledge-source-contract.md)).

---

## What may be done with a restricted source

| Action | internal | confidential | restricted | regulated |
|---|---|---|---|---|
| Consult capsule | yes | yes | yes if authorized | yes if authorized |
| Cite identifier (id + version) | yes | yes | yes if authorized | per regulation |
| Quote verbatim excerpts | discouraged | only with authorization | no by default | per regulation |
| Reproduce full source | no | no | no | no |
| Include in external deliverables | summary only | no | no | no |
| Include in logs / handoffs | yes if masked at boundary | masked | redacted | per regulation |
| Export outside workspace | discouraged | no | no | no |

When the table forbids an action, the resolver must surface the limit as a structured restriction in the context pack, not silently drop the action.

---

## When human review is required

Human review is mandatory when at least one of the following is true:

- the source is used in an **external publication** or **client delivery**
- the use would create a **policy conflict** between mandatory sources
- the source's `human_review_required_for` list matches the task
- the resolver cannot determine sensitivity with confidence
- the task crosses **trust boundaries** (project, client, organization)
- the source is `regulated` and used in a decision with legal or financial impact

A skill must pause and surface a review request. It must not produce a final deliverable while review is pending.

---

## Logs, handoffs, and traces

Restricted content is easy to lose at the edges. The policy explicitly covers them:

- **Logs.** Do not write restricted excerpts to logs. Log identifiers, versions, scope, and decisions instead.
- **Handoffs.** Strip restricted excerpts when handing off across agents, threads, or boundaries. Replace with capsule + pack id + version.
- **Traces / telemetry.** Same as logs. If a trace captures prompt and response, mask restricted segments.
- **Long-term memory.** Do not persist restricted excerpts into agent or session memory.

If a system cannot honor these rules, it must refuse to operate on the source rather than degrade silently.

---

## Refusal patterns

When a use violates this policy, the resolver returns one of:

- `request_authorized_context_pack` — the task is plausible but needs explicit authorization
- `downgrade_to_capsule` — the task can continue with the capsule alone
- `refuse` — the task cannot proceed under current permissions

Refusals must include: source id, version, sensitivity, authority, scope, and the specific rule violated.

---

## What this policy is not

- It is not a substitute for IAM, DLP, or encryption at rest / in transit.
- It is not legal advice for any specific regulation.
- It is not a license framework.
- It is operational discipline for how an agent fleet handles sensitive sources.

Integrations with IAM, DLP, secrets management, and review workflows are explicit future work and are out of scope for this docs-only phase.

---

## Operationalized by

The per-task checklists that enforce this policy live in [`docs/security/`](../security/README.md):

- [data-leakage-checklist](../security/data-leakage-checklist.md)
- [logs-and-handoffs-policy](../security/logs-and-handoffs-policy.md)
- [human-review-criteria](../security/human-review-criteria.md)

## See also

- [knowledge-source-contract](knowledge-source-contract.md)
- [source-precedence-policy](source-precedence-policy.md)
- [knowledge-audit-log-spec](knowledge-audit-log-spec.md)
- [restricted-enterprise-context (example)](https://github.com/nevitonsantana/AletheIA/blob/main/examples/project-extension/restricted-enterprise-context.md)
