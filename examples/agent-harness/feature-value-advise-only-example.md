# Example — Feature Value Governance, advise-only

A worked **policy/verdict** walkthrough for a `feature-value-governance` task. This is a
**consultative** skill: it produces a governed recommendation and nothing more. It must not look like
authorization to act — it cannot move the roadmap, create issues, or write project files.

It sits alongside [`../harness/feature-planning-harness.md`](../harness/feature-planning-harness.md),
which also stays at `advise`. The upstream per-skill declaration is the Adaptative Skills
`examples/harness-requirements/feature-value-governance-harness-requirements.yaml`
(`autonomy.floor: advise`, `ceiling: advise`). All content here is synthetic.

## The skill produces a verdict — about the feature, not an action

```yaml
recommendation:
  feature: "inline-comments-v2"
  verdict: advance_with_constraints
  rationale: "Two of three value slots satisfied; one unsatisfied slot (adoption evidence)."
  unsatisfied_slots: [adoption_evidence]
  conflicts_and_resolution: "Cost estimate conflicts with the latest sizing capsule; deferred to PM."
  review_required: true
```

This `verdict` is the skill's **output**, not a permission decision. It advises a human; it changes
nothing.

## Three proposed actions, all blocked from acting

### Action 1 — resolve an authorized knowledge pack (allowed)

```yaml
proposed_action: { tool: knowledge.resolve, args: { pack: "product-value@1.4" } }
risk_class: search_only          # coarse: medium
policy_verdict: allow
reason: "Reading authorized knowledge is within an advise-level skill."
```

### Action 2 — update the roadmap (denied)

```yaml
proposed_action: { tool: roadmap.update, args: { item: "inline-comments-v2", status: "committed" } }
risk_class: write_internal       # coarse: high
policy_verdict: deny
reason: "The skill advises; it does not alter roadmap state. Declared restriction: deny."
```

### Action 3 — create an issue (require approval)

```yaml
proposed_action: { tool: issue.create, args: { title: "Build inline-comments-v2" } }
risk_class: write_external       # coarse: high
policy_verdict: require_approval
reason: "Creating work items is an external workflow action; declared restriction: require_approval."
```

```yaml
agent_action_audit_record:
  task_id: fvg-eval-014
  skill_id: feature-value-governance
  autonomy_level: advise
  tool_name: issue.create
  risk_class: high
  policy_verdict: require_approval
  approval_required: true
  approval_by: null
  evidence_refs: [source_pack_versions, unsatisfied_slots, verdict_rationale]
  result_summary: "Recommendation produced; issue creation paused for human approval, not executed."
```

## What this demonstrates

- A consultative skill **never acts**: its only allowed action is reading authorized knowledge; every
  state-changing tool is `deny` or `require_approval`.
- A skill *verdict* ("advance the feature") is **not** a policy *verdict* ("allow the tool"). The two
  must not be confused — that confusion is exactly what `advise`-only enforcement prevents.
- The audit record proves the skill produced advice and that no roadmap/issue mutation occurred.

Contrast with [`codex-debugging-policy-example.md`](codex-debugging-policy-example.md), where an
**operational** skill may act with approval.
