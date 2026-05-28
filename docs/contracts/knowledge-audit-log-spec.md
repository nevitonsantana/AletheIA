# Knowledge Audit Log — Specification

## Goal

Define the minimum information that must be recorded each time a knowledge source influences an agent or skill output.

The audit log makes it possible to answer, after the fact: *which source, at what version, in what scope, under what restrictions, produced what outcome — by which agent and skill, for which task.*

---

## When to write an entry

Write a log entry when:

- a knowledge pack is **selected** by the resolver for a task
- a knowledge pack is **consulted** during execution (capsule, excerpt, or full)
- a **conflict** between sources is detected and resolved
- a **fallback** is triggered (missing required, restricted, etc.)
- a **human review** request is raised
- a **refusal** is returned by the resolver or the skill

Do not log restricted excerpts themselves. Log identifiers, versions, scopes, and decisions.

---

## Required fields

| Field | Notes |
|---|---|
| `task_id` | the task under execution |
| `agent_id` | the agent that ran the skill |
| `skill_id` | the skill that consumed the source |
| `skill_version` | semver |
| `source_id` | knowledge pack id |
| `source_version` | semver of the pack consumed |
| `sensitivity` | snapshot at use time |
| `authority_level` | snapshot at use time |
| `retrieved_scope` | one of `capsule`, `excerpt`, `metadata`, `full` |
| `retrieval_mode_applied` | which mode the resolver actually used |
| `restrictions_applied` | list (e.g. `no_verbatim`, `no_export`, `citation_required`) |
| `human_review_required` | boolean |
| `human_review_reason` | required when the boolean is true |
| `decision_output` | short structured summary of the effect on the deliverable |
| `conflict_id` | optional; links to conflict resolution entries |
| `prevailing_source` / `suppressed_sources` | optional; used in conflict entries |
| `fallback_applied` | optional; values from skill `fallback_behavior` |
| `refusal_reason` | optional; required when the entry records a refusal |
| `timestamp` | ISO 8601 UTC |

---

## Optional but recommended

- `user_id` — actor who initiated the task
- `project_id` / `workspace_id` — scope boundary
- `trust_boundary` — local label for the boundary this task ran inside
- `pack_integrity_hash` — content hash of the consumed slice (capsule digest, not full source)
- `resolver_version` — useful when policies evolve

---

## Example entry — normal use

```json
{
  "task_id": "task_2026-05-28_feat-001",
  "agent_id": "product-agent",
  "skill_id": "feature-value-governance",
  "skill_version": "0.1.0",
  "source_id": "example-4-layers",
  "source_version": "1.0.0",
  "sensitivity": "internal",
  "authority_level": "interpretive",
  "retrieved_scope": "capsule",
  "retrieval_mode_applied": "capsule_first",
  "restrictions_applied": ["no_verbatim", "no_export", "citation_required"],
  "human_review_required": false,
  "decision_output": "Used 4-layers capsule to frame revenue-lever analysis.",
  "timestamp": "2026-05-28T12:55:00Z"
}
```

## Example entry — conflict

```json
{
  "task_id": "task_2026-05-28_feat-001",
  "agent_id": "design-agent",
  "skill_id": "knowledge-conflict-resolution",
  "skill_version": "0.1.0",
  "conflict_id": "conflict_2026-05-28_001",
  "prevailing_source": "wcag-internal@1.2.0",
  "suppressed_sources": ["casual-shopper@0.4.0"],
  "decision_output": "Kept explicit form labels per accessibility guideline.",
  "human_review_required": false,
  "timestamp": "2026-05-28T12:56:10Z"
}
```

## Example entry — refusal

```json
{
  "task_id": "task_2026-05-28_feat-001",
  "agent_id": "product-agent",
  "skill_id": "feature-value-governance",
  "skill_version": "0.1.0",
  "source_id": "internal-pricing-policy",
  "source_version": "2.3.0",
  "sensitivity": "confidential",
  "authority_level": "mandatory",
  "retrieved_scope": "metadata",
  "retrieval_mode_applied": "blocked",
  "refusal_reason": "External deliverable; full_text_exposure forbidden and no authorized excerpt available.",
  "human_review_required": true,
  "human_review_reason": "Client delivery flagged in human_review_required_for.",
  "timestamp": "2026-05-28T12:57:42Z"
}
```

---

## Storage posture

This spec does not mandate a storage technology. Any store is acceptable that:

- preserves entries for the retention period required by the most sensitive source touched
- supports filtering by `task_id`, `source_id`, `agent_id`, and `human_review_required`
- does not retain restricted excerpts beyond their authorized lifetime
- can be exported for review without exposing restricted text

---

## See also

- [knowledge-source-contract](knowledge-source-contract.md)
- [restricted-knowledge-usage-policy](restricted-knowledge-usage-policy.md)
- [source-precedence-policy](source-precedence-policy.md)
