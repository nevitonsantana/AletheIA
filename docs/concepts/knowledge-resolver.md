# Knowledge Resolver

## Goal

Define, conceptually, the mechanism that decides **which sources enter the context of a task**.

The resolver is a logical role inside AletheIA. This document describes its inputs, decisions, outputs, and failure modes. It does not specify an implementation.

---

## Inputs

For a given task, the resolver reads:

- the **task contract** — purpose, risk, scope, audience, deliverable
- the **skill's knowledge dependency manifest** — what types of knowledge are required, optional, or conditional
- the **knowledge registry** — knowledge packs available to this project / agent / user
- the **source precedence policy** — how to rank when sources conflict
- the **restricted knowledge usage policy** — what may be retrieved and how
- the **agent and user permissions** — scope, project, sensitivity clearance

---

## Decisions the resolver makes

1. **Eligibility.** Which registered sources are in-scope for this task, agent, skill, and user?
2. **Sufficiency.** Are all `required` knowledge dependencies satisfied?
3. **Mode.** For each eligible source, which retrieval mode applies (capsule-first, excerpt-only, metadata-only, full, human-review-required, blocked)?
4. **Selection.** Among eligible sources of the same type, which one to use? Tie-break by precedence, recency, and authority.
5. **Composition.** How to assemble a *minimum sufficient* context pack from the selected sources.
6. **Disclosure.** Which restrictions apply (citation required, no verbatim, no export, etc.).
7. **Escalation.** Whether the task must pause for human review.

---

## Outputs

The resolver returns a **knowledge-aware context pack**:

- the set of selected sources with version pins
- the retrieved scope (capsule, excerpts, metadata)
- the active restrictions
- the gaps (required dependencies not satisfied)
- the conflicts detected and how precedence resolved them
- the audit log entries to be written when the pack is used

See [knowledge-aware-context-pack.json](../../examples/project-extension/knowledge-aware-context-pack.json) for a concrete shape.

---

## Selection logic, in order

1. Filter the registry by `allowed_skills`, `allowed_agents`, project scope, and user permission.
2. For each dependency declared by the skill, find candidates whose `type` is in `accepted_types`.
3. Drop candidates whose `retrieval_mode` is `blocked` for this task.
4. Drop candidates whose sensitivity exceeds the task's allowed sensitivity.
5. Rank surviving candidates by source precedence.
6. Apply `capsule_first` when the source allows it.
7. Mark unsatisfied `required` dependencies as gaps; unsatisfied `optional` as assumptions.
8. Detect conflicts between selected sources; resolve with precedence; log both the conflict and the resolution.

---

## When the resolver refuses

The resolver must refuse — not silently fall back — when:

- a `required` dependency has no eligible source
- the only eligible source for a required type is `restricted` and not authorized for this task
- the task crosses a sensitivity boundary not granted to the agent
- a mandatory source (compliance, security, privacy, accessibility) conflicts with the task in a way the agent cannot resolve

Refusal returns a structured reason, not a generic error. The skill then chooses between `stop_and_request_source`, `continue_with_assumption_marker`, or `request_authorized_context_pack` per its fallback behavior.

---

## What the resolver does not do

- It does not write or evaluate the source content itself.
- It does not adjudicate factual correctness.
- It does not replace human review when the policy requires it.
- It does not learn from past selections (no implicit memory beyond audit).

---

## See also

- [knowledge-governance-layer](knowledge-governance-layer.md)
- [framework-capsules](framework-capsules.md)
- [skill-knowledge-dependency-contract](../contracts/skill-knowledge-dependency-contract.md)
- [source-precedence-policy](../contracts/source-precedence-policy.md)
- [knowledge-audit-log-spec](../contracts/knowledge-audit-log-spec.md)
