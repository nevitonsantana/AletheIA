# Human-Review Criteria

## Goal

Consolidate, in one place, **when human review is mandatory** before a knowledge-aware
skill produces a final deliverable. The conditions are scattered across the
restricted-use policy, the precedence policy, and the audit-log spec; this document
is the single checklist the governance skills point to.

When any condition below is true, the skill must **pause, surface a structured review
request, and withhold the final deliverable** until review returns.

---

## Mandatory review conditions

Review is required when **at least one** holds:

1. **Mandatory-source conflict.** Two `mandatory` sources collide on the same
   decision point and precedence cannot settle it (same tier, no tie-break). See
   [source-precedence-policy](../contracts/source-precedence-policy.md).

2. **Regulatory risk.** A `regulated` source is used in a decision with legal,
   financial, or contractual impact — or any source touches a named regulation.

3. **High-impact decision.** The decision is irreversible, externally binding, or
   high blast-radius (pricing, legal commitment, public claim, safety-relevant).

4. **External publication.** Output leaves the organization as a public artifact.

5. **Client delivery.** Output is delivered to a specific client or third party.

6. **Sensitivity uncertainty.** The resolver cannot determine a source's sensitivity
   with confidence (default: escalate one level and review).

7. **Trust-boundary crossing.** The task combines sources, or moves content, across
   project / client / organization boundaries.

8. **Source manifest opt-in.** The source's `human_review_required_for` list matches
   the current task.

---

## What a review request must contain

A pause without context is not a review request. Include:

- `task_id`, `agent_id`, `skill_id`
- the triggering condition(s) from the list above
- source id(s) + version(s), sensitivity, authority
- the decision or deliverable being withheld
- the specific question the reviewer must answer
- (for conflicts) prevailing vs. suppressed sources

This mirrors the `human_review_required` / `human_review_reason` fields in the
[knowledge-audit-log-spec](../contracts/knowledge-audit-log-spec.md); the request and
the log entry carry the same reason.

---

## Behavior while review is pending

- No final deliverable is produced.
- The pending state travels with any handoff (see [logs-and-handoffs-policy](logs-and-handoffs-policy.md)).
- Restrictions remain in force; the pause does not relax them.
- The request and its outcome are recorded in the audit log.

---

## What this is not

This consolidates *when* review is mandatory. It does not define a review **workflow,
approver hierarchy, or SLA** — those are project-extension and future-integration
concerns, not framework core.

---

## See also

- [restricted-knowledge-usage-policy](../contracts/restricted-knowledge-usage-policy.md)
- [source-precedence-policy](../contracts/source-precedence-policy.md)
- [knowledge-audit-log-spec](../contracts/knowledge-audit-log-spec.md)
- [data-leakage-checklist](data-leakage-checklist.md)
