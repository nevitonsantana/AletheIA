# Context Surface Registry — Minimum Contract

## Purpose

Define the minimum metadata required to govern an artifact that can influence agent behavior. The registry answers where a surface lives, who owns it, when it may be loaded, what should be extracted, and when it must stay out of context.

This contract extends existing [context-rot controls](../concepts/context-rot-controls.md) and [Knowledge Governance](../concepts/knowledge-governance-layer.md). It does not centralize source content or create an automatic context router.

## Boundary

A context surface may be a persistent manifest, role contract, skill/provider declaration, project document, tool configuration, runtime policy, Work Slice artifact or evidence record.

The registry stores metadata about the surface. It must not copy prompts, secrets, restricted source content or full skill methods into the registry.

## Minimum registry

```yaml
context_surface_registry:
  version: "0.1"
  owner: <registry owner>
  reviewed_at: YYYY-MM-DD
  surfaces:
    - id: <stable id>
      title: <human-readable title>
      type: persistent_manifest | agent_role_contract | skill_provider | project_doc | tool_config | runtime_policy | work_artifact | evidence_artifact
      path: <repository path or authorized reference>
      owner: <person, team, or project role>
      provider: aletheia | adaptive_skills | project_local | runtime_native | external | user_defined
      scope: repository | package | feature | agent_role | capability | work_slice | evidence
      load_mode: always | on_demand | role_scoped | capability_scoped | work_slice_scoped | evidence_only | never_directly
      priority: critical | high | medium | low
      activation_conditions:
        - condition: <when this surface becomes relevant>
          rationale: <why loading is justified>
          expected_extraction: <minimum information to retrieve>
      freshness:
        last_reviewed: YYYY-MM-DD
        review_interval_days: <positive integer>
      budget:
        max_lines: <positive integer or unavailable>
        max_tokens: <positive integer or unavailable>
        origin: reported | estimated | unavailable
      allowed_content:
        - <content class allowed in this surface>
      must_not_contain:
        - <content class prohibited in this surface>
      evidence_required:
        - <proof that use complied with the contract>
```

## Required rules

1. Every surface has a stable ID, path/reference, owner, provider, scope and load mode.
2. Every surface except `always` has at least one activation condition with an expected extraction.
3. Every surface has freshness metadata and an explicit budget. Unknown budget data is `unavailable`, never invented.
4. `always` is reserved for the smallest persistent identity and critical safety constraints.
5. `evidence_only` surfaces may support review but may not become instructions.
6. `never_directly` surfaces require an authorized summary, capsule, retrieval result or adapter.
7. Skill providers are loaded by capability need; an entire skill library must not become persistent context.
8. Deterministic rules belong in tools, tests, linters, scanners or CI. Prompts request evidence from those tools instead of repeating their rules.
9. Restricted content follows the [restricted knowledge usage policy](restricted-knowledge-usage-policy.md) and privacy metadata remains separate from content.
10. Missing, stale or conflicting context must be visible in the Work Slice; it must not be silently replaced by agent inference.

## Precedence

When active surfaces conflict, resolve them in this order:

1. safe explicit user instruction for the current Work Slice;
2. safety, legal and restricted-use policy;
3. current Work Slice constraints and accepted decisions;
4. project-local architecture, security, design and ADR contracts;
5. active agent-role contract;
6. activated skill/provider method;
7. persistent manifest;
8. general documentation.

The resolution must cite the conflicting surfaces and record the chosen authority. Knowledge-source conflicts continue to use the [source precedence policy](source-precedence-policy.md).

## Work Slice evidence

A closure or handoff should be able to report:

```yaml
context_surface_usage:
  work_slice_id: <id>
  loaded:
    - surface_id: <id>
      reason: <activation condition met>
      extracted: <minimum relevant context>
      evidence_ref: <reference>
  intentionally_not_loaded:
    - surface_id: <id>
      reason: <why it was outside scope>
  delegated_to_tools:
    - rule_class: <class>
      tool: <tool or command>
      evidence_ref: <reference>
  conflicts: []
```

## Validation

- All required fields are present.
- Local paths resolve.
- Non-`always` surfaces have activation conditions.
- Budgets state their origin.
- Allowed and prohibited content do not conflict.
- No secret, prompt body or restricted source content is embedded.
- Loaded and intentionally-not-loaded surfaces are recorded for the example Work Slice.

## Non-goals

- No runtime router, loader or policy engine.
- No universal inventory of every repository document.
- No automatic prompt refactoring.
- No requirement to use Adaptive Skills.
- No Visual Operations metric until source-backed usage evidence exists.

