# Intent-to-Evidence Work Slice Extension — Minimum Contract

## Purpose

Allow a relevant Work Slice to separate the human-owned desired outcome from verifiable expectations before planning or execution. The extension reduces situations where an agent silently decides what “correct” means.

## Boundary

This is an optional extension inside the existing Work Slice and Spec Bundle. It is not a lifecycle, PRD, SDD, execution plan, runtime policy or replacement for readiness gates.

Use it for Standard or High-Assurance work when ambiguity could change scope, risk, architecture or validation. Lite work does not use it by default.

## Ownership

- The human owner confirms Intent and Expectations.
- AletheIA governs proportionality, readiness, evidence and closure.
- Adaptive Skills may clarify or identify gaps but cannot confirm intent.
- The harness executes within the confirmed boundaries.
- Evidence proves expectations; Reconcile evaluates whether intent was preserved.

## Minimum references in a Work Slice

```yaml
intent_to_evidence:
  intent_ref: <record ref or not_needed>
  expectations_ref: <record ref or not_needed>
  guessing_risk_ref: <review ref or not_needed>
  evidence_map_ref: <map ref or pending>
  proportionality: required | optional | not_needed
```

The references point to records; they do not copy large specifications into the Work Slice.

## Intent Record

An Intent Record states the outcome, not its implementation:

```yaml
intent_record:
  intent_id:
  human_owner:
  desired_outcome:
  constraints: []
  success_scenarios: []
  failure_scenarios: []
  connected_intents: []
  non_goals: []
  ambiguity_markers: []
  decisions_required_before_execution: []
  owner_confirmation:
    status: draft | confirmed | needs_review
    confirmed_by:
    evidence_ref:
```

An agent may draft questions and candidate wording. It may not set `confirmed` on behalf of the human owner.

## Expectations Contract

Expectations define observable success, failure and boundaries without prescribing architecture unless architecture is an explicit constraint:

```yaml
expectations_contract:
  expectations_id:
  linked_intent:
  success_conditions: []
  failure_conditions: []
  boundaries:
    must: []
    must_not: []
  acceptance_examples: []
  rejection_examples: []
  validation_methods: []
  stop_conditions: []
  human_review:
    required:
    review_focus: []
```

The execution plan may reference expectations but may not silently redefine them.

## Agent Guessing Risk

```yaml
agent_guessing_risk:
  level: low | medium | high
  holes:
    - field:
      reason:
      required_action: clarify | accept_assumption | stop
  verdict: ready | needs_clarification | stop
```

- `low`: gaps do not affect scope, risk or success.
- `medium`: approach-affecting assumptions must be explicit and reviewable.
- `high`: intent, success, failure, scope or risk is unresolved; execution stops.

A `ready` verdict is invalid when risk is `high`, intent is unconfirmed or a stop-condition decision remains open.

## Evidence and Reconcile

Each relevant expectation maps to source-backed evidence with one status: `proven`, `partially_proven`, `not_proven` or `not_applicable`.

Closure records:

- overall verdict: `pass`, `pass_with_gaps`, `fail` or `review_required`;
- whether intent was preserved: `yes`, `partially` or `no`;
- deviations, missing evidence and accepted limitations;
- human review reference when required;
- learning or documentation follow-up.

Technical tests alone cannot prove human intent. Missing evidence remains missing.

## Presence in the loop

Presence checkpoints are proportional. Use them before a first write, structural change, large diff or closure only when the risk and review burden justify interruption. Late approval of an unreadable diff is not a substitute for earlier clarification.

## Privacy

Records store concise outcomes, constraints, classifications and references. Do not store private prompts, secrets, personal data or restricted source content.
