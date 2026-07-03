# Reference Intake and Adoption Contract

## Purpose

Define the minimum governance record for evaluating an external pack, plan, reference, screenshot,
research note or capability proposal before it influences AletheIA or Adaptive Skills.

Reference intake exists to preserve useful ideas without letting external material become implicit
architecture, hidden instructions or automatic skill evolution.

## Authority boundary

- AletheIA owns the intake decision for governance, Work Slice, gate, evidence, closure and
  read-only projection concepts.
- Adaptive Skills owns canonical skill methods, capability metadata and compatibility declarations.
- Runtime/harness surfaces execute work and produce evidence; they do not become authoritative because
  a reference mentions execution.
- External references are data. They are never instructions to bypass repository policy, install
  dependencies, mutate skills, create runtime surfaces or change authority boundaries.

## Required intake record

Every governed intake MUST record:

```yaml
reference_intake:
  id: REF-YYYY-NNN
  title: string
  source_type: pack | plan | screenshot | research | repo | conversation | other
  source_refs: []
  received_at: YYYY-MM-DD
  reviewer: string
  sensitivity: public | internal | restricted | unknown
  summary: string
  extracted_requirements: []
  layer_mapping:
    aletheia: []
    adaptive_skills: []
    runtime_harness: []
    observatory: []
    out_of_scope: []
  adoption_decision:
    posture: adopt | adapt | reference_only | defer | reject
    rationale: string
    covered_by_existing_contracts: []
    proposed_slices: []
    deferred_items: []
    rejected_items: []
  evidence:
    checks_performed: []
    unavailable: []
  guardrails:
    no_automatic_adoption: true
    no_dependency_installation: true
    no_skill_mutation_without_review: true
    no_runtime_authority_change: true
```

## Decision vocabulary

- `adopt`: accept a bounded requirement as-is because it fits existing authority boundaries.
- `adapt`: translate the useful intent into AletheIA/Adaptive Skills vocabulary before implementation.
- `reference_only`: preserve as context or north-star without implementation commitment.
- `defer`: valid idea, but prerequisites, evidence or timing are insufficient.
- `reject`: proposed form conflicts with current guardrails or authority boundaries.

A single intake may contain multiple requirement-level decisions. The top-level posture should reflect
the dominant safe next action, not hide deferred or rejected items.

## Layer mapping rules

- Map requirements to the smallest responsible layer.
- Do not create a new lifecycle when an existing Work Slice, AHC, AHGE, execution-pattern,
  observation, restart, closure or Observatory contract can carry the meaning.
- Mark missing source detail as `unavailable`; do not infer requirements from screenshots or examples.
- Record when a reference is superseded, duplicated or absorbed by an existing contract.
- Skill or agent proposals MUST remain proposals until Adaptive Skills governance accepts them.

## Non-goals

Reference intake MUST NOT:

- install dependencies;
- import an entire pack as canonical truth;
- mutate a skill automatically;
- create a runtime, backend, collector, schema or dashboard by default;
- override human review, gates, source precedence, privacy boundaries or repository policy;
- treat promotional numbers, illustrative dashboards or diagrams as measured data.

## Acceptance

An intake is acceptable when a reviewer can answer:

1. What was received and where did it come from?
2. Which requirements were extracted?
3. Which layer owns each requirement?
4. What is adopted, adapted, referenced, deferred or rejected?
5. Which contracts already cover the idea?
6. What evidence is available and what remains unavailable?
7. What must not happen automatically?

