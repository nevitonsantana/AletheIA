# Source Precedence Policy

## Goal

Define the policy that resolves conflict between knowledge sources used in the same task.

Conflict resolution is part of the framework core. The list of concrete sources is not. Projects bind their packs to the types below; the precedence between types is stable.

---

## Default precedence

From highest to lowest:

1. **Legal, compliance, security, privacy, and mandatory accessibility sources.**
2. **Formal corporate policies.**
3. **Organizational operating model.**
4. **Product or business strategy.**
5. **Proprietary supporting frameworks.**
6. **Personas, research findings, and user evidence.**
7. **Benchmarks and external references.**
8. **Stakeholder preferences and contextual input.**

A source in a higher tier overrides a source in a lower tier *in the dimension of conflict*. It does not erase the lower source; it constrains it.

---

## How the resolver applies precedence

1. Identify that two or more selected sources disagree on a decision-relevant point.
2. Locate each source's tier (via `type` → tier mapping below).
3. The higher-tier source's position is taken.
4. The lower-tier source is preserved as **context**, not authority.
5. The conflict, the chosen source, and the suppressed source are written to the audit log.
6. If the higher source is `mandatory` and the lower source's removal materially changes the deliverable, escalate to human review per `human_review_required_for`.

---

## Type-to-tier mapping

| Tier | Source types |
|---|---|
| 1 | `compliance_policy`, `security_policy`, `privacy_policy`, `accessibility_guideline` (when normative) |
| 2 | corporate policies expressed as `operating_model` with `authority: mandatory` |
| 3 | `operating_model` |
| 4 | `product_strategy` |
| 5 | `proprietary_framework`, `design_system` (when guiding) |
| 6 | `persona`, `research_finding` |
| 7 | `benchmark` |
| 8 | `stakeholder_input` |

Within a tier, break ties by, in order:

1. higher `authority_level`
2. narrower, more specific `scope`
3. more recent `version` (only when both are still inside `expiry`)
4. explicit `prerequisite_sources` / `supersedes` relationships

---

## Worked conflict

```text
Detected:
  - persona "casual-shopper" suggests removing inline labels for visual minimalism.
  - accessibility_guideline "wcag-2.1-aa-internal" requires explicit labels on every form field.

Tiers:
  - persona → tier 6
  - accessibility_guideline → tier 1

Resolution:
  - accessibility_guideline prevails.
  - persona preserved as design context, not as authority.
  - Output must keep explicit labels; the simplification must be redesigned without removing them.

Audit:
  - conflict_id: <uuid>
  - prevailing_source: wcag-2.1-aa-internal@<version>
  - suppressed_sources: [casual-shopper@<version>]
  - human_review_required: false
```

---

## When precedence is not enough

Precedence resolves *which source wins*. It does not resolve cases where:

- two sources at the same tier disagree and tie-breakers do not settle it
- a `mandatory` source conflicts with another `mandatory` source (e.g. privacy vs. accessibility)
- the lower source's removal makes the deliverable infeasible

In these cases the resolver must **escalate to human review** with a structured conflict record. Skills must not invent a compromise.

---

## See also

- [restricted-knowledge-usage-policy](restricted-knowledge-usage-policy.md)
- [knowledge-audit-log-spec](knowledge-audit-log-spec.md)
- [knowledge-resolver](../concepts/knowledge-resolver.md)
