# Security

Operational hardening for the Knowledge Governance Layer. These documents turn the
guardrails named in [ADR-008](../adr/ADR-008-knowledge-governance-layer.md) and the
governance plan into **checklists and policies an agent or reviewer can apply per task**.

They are *operational architecture*, not DLP code: they say what must be checked and
forbidden, not how to implement scanning. Integrations with IAM, DLP, secrets
management, and review workflows remain explicit future work.

## How this relates to contracts

The [contracts](../contracts/README.md) say what must be *true* about a source
(audit fields, restricted-use limits). The checklists here say what must be *done*
before and after a source is used. They reference the contracts; they do not restate them.

## Contents

| Document | What it covers |
|---|---|
| [data-leakage-checklist.md](data-leakage-checklist.md) | What must never leave the boundary in output, logs, traces, or handoffs |
| [prompt-injection-in-sources-checklist.md](prompt-injection-in-sources-checklist.md) | Treating source content as data, not instruction |
| [data-poisoning-checklist.md](data-poisoning-checklist.md) | Provenance, validation, versioning, and rollback before a source is trusted |
| [logs-and-handoffs-policy.md](logs-and-handoffs-policy.md) | Carrying restrictions forward across every boundary |
| [human-review-criteria.md](human-review-criteria.md) | Consolidated conditions under which human review is mandatory |

## Operating model

Two repositories share this surface:

- **AletheIA** owns the checklists and policies here, because it governs risk.
- **Adaptive Skills** operationalizes them: the three governance skills
  (`restricted-context-check`, `knowledge-source-evaluation`,
  `knowledge-conflict-resolution`) point to these documents as their verification
  reference. The checks live in the skills; the standards live here.

## Canonical vocabulary

All documents use the five canonical sensitivity levels — `public`, `internal`,
`confidential`, `restricted`, `regulated` — defined in
[sensitivity-vocabulary-mapping](../contracts/sensitivity-vocabulary-mapping.md).
No document here introduces a new level or a company-specific label.

## See also

- [restricted-knowledge-usage-policy](../contracts/restricted-knowledge-usage-policy.md)
- [knowledge-audit-log-spec](../contracts/knowledge-audit-log-spec.md)
- [ai-agent-security-prompt-injection](../concepts/ai-agent-security-prompt-injection.md)
- [web-app-security-trust-boundaries](../concepts/web-app-security-trust-boundaries.md)
- [local-trust-boundary-posture](../concepts/local-trust-boundary-posture.md)
