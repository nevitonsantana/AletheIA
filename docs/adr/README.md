# Architecture Decision Records (ADRs)

This directory holds **durable architectural decisions** for AletheIA. ADRs are written when a decision is hard to reverse, affects multiple parts of the framework, or settles a recurring ambiguity that has cost time to re-litigate.

## What an ADR is — and is not

- **Is**: a record of *why* we decided something at a specific date, with the alternatives we rejected and the conditions that would reopen the decision.
- **Is not**: a tutorial, a roadmap, or a contract spec. Those live in `docs/concepts/`, `docs/roadmaps/`, and `docs/contracts/` (taxonomy in progress — see the structural improvement plan).

If a document explains *how* to do something, it is a guide. If it specifies *what must be true*, it is a contract. ADRs answer *why this path and not another*.

## Convention

- **Format**: lightweight, repo-native. Not strict [MADR](https://adr.github.io/madr/) — adopted incrementally as needed.
- **Filename**: `ADR-NNN-<kebab-case-title>.md`, with `NNN` zero-padded.
- **Numbering**: monotonic, never reused. If an ADR is superseded, the new ADR gets the next number and links back via the `Supersedes` field.
- **Status values**: `Proposed`, `Accepted`, `Superseded by ADR-XXX`, `Rejected`, `Deprecated`.
- **Length**: prefer ≤2 pages. If an ADR grows past that, the decision is probably mixing two concerns.

## Required structure

Every ADR starts with a metadata table:

```markdown
| Field | Value |
|---|---|
| Status | Accepted |
| Date | YYYY-MM-DD |
| Author | <name> |
| Deciders | <names> |
| Related | ADR-XXX — <title> |
| Supersedes | — or ADR-XXX |
```

Followed by numbered sections:

1. **Context** — what is the state of the world and what is the open question.
2. **Decision** — what we decided, in normative voice.
3. **Consequences** — positive, negative, and accepted tradeoffs.
4. **Alternatives considered** — what we rejected and why.
5. **Relationship** — to other ADRs, phases, or artifacts that depend on this decision.
6. **Review** — conditions that would reopen the ADR.

See [ADR-001](ADR-001-hermes-role.md) as the canonical example.

## When to write an ADR

Write one when:

- A decision will be cited or contested across multiple PRs or sessions.
- A boundary is being drawn (what belongs / what does not belong).
- An autonomy or safety threshold is being fixed.
- A path is being chosen that closes off other paths for a non-trivial period.

Do *not* write one for:

- Implementation choices that are obvious from the code.
- Decisions that only affect a single PR's scope.
- Documentation reorganization (use the docs index + migration table instead).

## Current ADRs

| ID | Title | Status |
|---|---|---|
| [ADR-001](ADR-001-hermes-role.md) | Hermes role in the AletheIA pipeline | Accepted |
| [ADR-002](ADR-002-memory-and-skill-promotion-policy.md) | Memory and skill promotion policy | Accepted |
| [ADR-003](ADR-003-slice-record-closeout-relationship.md) | Slice record / closeout relationship | Accepted |
| [ADR-004](ADR-004-aletheia-as-operating-overlay.md) | AletheIA as operating overlay | Accepted |
| [ADR-005](ADR-005-positioning-in-agentic-ecosystem.md) | Positioning in the agentic ecosystem | Accepted |
| [ADR-006](ADR-006-domain-agnosticism.md) | Domain agnosticism | Accepted |
| [ADR-007](ADR-007-apm-packaging-strategy.md) | APM packaging strategy | Accepted |
| [ADR-008](ADR-008-knowledge-governance-layer.md) | Knowledge Governance Layer | Accepted |
| [ADR-009](ADR-009-feature-value-governance-pack.md) | Feature Value Governance Pack | Accepted |
| [ADR-010](ADR-010-runtime-effort-governance-contract.md) | Runtime Effort Governance Contract | Accepted |
| [ADR-011](ADR-011-agent-harness-governance-extension.md) | Agent Harness Governance Extension | Accepted |
| [ADR-012](ADR-012-resource-aware-signal-validation.md) | Resource-Aware Signal Validation Layer | Accepted |
| [ADR-013](ADR-013-agent-harness-contract.md) | Agent Harness Contract (per-task declaration) | Accepted |
| [ADR-014](ADR-014-harness-enforcement-addendum.md) | Harness Enforcement Addendum: vocabulary reconciliation | Accepted |
| [ADR-015](ADR-015-execution-pattern-governance-pack.md) | Execution Pattern Governance Pack | Accepted |
