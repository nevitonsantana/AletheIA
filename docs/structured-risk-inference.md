# Structured Risk Inference (Experimental)

## Status

Proposed

## Goal

This document describes a possible future AletheIA capability for improving decision quality before execution.

In simple terms:

it adds a structured, evidence-oriented inference step for cases where the decision itself needs more semantic scrutiny before code or workflow execution proceeds.

---

## Why this matters

AletheIA already helps structure:

- intent
- context
- decision
- execution
- validation
- learning

It is also growing stronger in:

- adoption
- inter-agent continuity
- project extension boundaries

But one gap still remains in higher-risk work:

**how do we make the reasoning behind a decision more explicit before execution starts?**

Today, many AI-assisted systems can answer:

- what to do
- how to execute

But they still struggle to answer in a structured, reviewable way:

- why this change is likely correct
- where it may fail
- what evidence supports the claim
- which unknowns still remain
- what tests would reduce the main risk

---

## Problem

LLMs can propose changes and partially validate them, but several failure modes remain common:

- semantic inferences stay implicit
- reasoning may sound correct while still being incomplete
- test suites may not cover the real risk surface
- handoffs may preserve the instruction but lose the rationale
- confidence may look stronger than the underlying evidence justifies

The result is often:

- fragile confidence
- reactive validation
- hidden risk in apparently safe changes

---

## Non-goals

This capability should **not** try to:

- replace automated tests
- prove formal correctness
- eliminate empirical validation
- act as an oracle of truth
- run on every small task by default

This is not formal verification.

It is a structured way of making risk-bearing inference more reviewable.

---

## Core concept

The proposed capability is:

**structured risk inference**

This is a conditional step between `decision` and `execution` that produces a compact artifact describing:

- the hypothesis being made
- the evidence or premises supporting that hypothesis
- the assumptions not yet demonstrated
- impacted paths
- invariants that must continue to hold
- major risks
- unknowns
- test gaps
- suggested tests
- confidence level and basis

---

## Updated flow

The flow should remain proportional.

This means inference is **not** universal.

### Default flow

`intent -> context -> decision -> execution -> validation -> learning`

### Triggered flow

`intent -> context -> decision -> [if triggered: inference] -> execution -> validation -> learning`

---

## Trigger conditions

Structured risk inference should be triggered only when the work justifies it.

Typical triggers include:

- changes that cross multiple modules or layers
- sensitive business or domain rules
- security or governance impact
- refactors with invisible regression risk
- tests that appear insufficient for the semantic risk
- low confidence from the executing agent
- high-stakes inter-agent handoff

For a more operational trigger guide, see:

- `starter-pack/guides/inference-trigger-guidance.md`
- `starter-pack/guides/inference-artifact-generation.md`

---

## Artifact contract (v1)

For a practical method for assembling this artifact from real work, see:

- `starter-pack/guides/inference-artifact-generation.md`


```json
{
  "hypothesis": "Expected behavior after the change",
  "premises": [
    "Observed evidence from file or contract X"
  ],
  "assumptions": [
    "Assumption not fully demonstrated"
  ],
  "impacted_paths": [
    "Flow A -> function X -> effect Y"
  ],
  "invariants": [
    "Rule that must remain true"
  ],
  "risks": [
    {
      "description": "Potential semantic regression",
      "likelihood": "low | medium | high",
      "impact": "low | medium | high"
    }
  ],
  "unknowns": [
    "What could not be verified"
  ],
  "test_gaps": [
    "Scenario not covered today"
  ],
  "suggested_tests": [
    "Test that would validate the critical path"
  ],
  "confidence_level": "low | medium | high",
  "confidence_basis": "Why this confidence level was assigned"
}
```

---

## Relationship to Alpha 4 handoffs

Alpha 4 improves inter-agent continuity.

Alpha 5 would strengthen that continuity by making the rationale more portable.

Before:

- context
- instruction
- scope

After:

- context
- instruction
- scope
- structured risk inference artifact

That makes it easier for the next agent to:

- understand the rationale
- challenge assumptions
- refine the validation plan
- avoid redoing the same uncertainty blindly

---

## Use cases

For recommended first pilots, see:

- `docs/inference-pilot-scenarios.md`

For concrete example artifacts, see:

- `examples/structured-risk-inference/README.md`


### 1. Patch review

Compare likely before/after behavior without relying only on raw intuition.

### 2. Refactoring risk analysis

Surface likely regressions that tests may miss.

### 3. Test generation guidance

Suggest tests based on risk concentration rather than coverage alone.

### 4. Multi-agent continuity

Preserve semantic rationale across handoffs, not only execution instructions.

---

## Risks

This capability also carries risks of its own:

- false sense of rigor
- increased token and latency cost
- overuse in simple tasks
- artifacts that become verbose without adding clarity
- confidence labels that appear more precise than they really are

---

## Mitigations

To keep the capability proportional:

- use explicit triggers
- limit the depth of analysis
- keep the prompt question bounded
- always expose unknowns and assumptions
- never treat the artifact as a substitute for empirical validation
- avoid numeric confidence unless it is truly grounded

---

## Success criteria

Alpha 5 would be successful if it:

- improves risk identification before execution
- improves the quality of suggested tests in risky changes
- reduces unexpected regressions in pilot scenarios
- improves handoff clarity in high-stakes cases
- is used selectively rather than becoming universal ceremony

---

## Open questions

- how should inference quality be evaluated?
- how can verbosity stay bounded without losing value?
- what trigger threshold is practical?
- how should this connect to observability and post-execution signals?
- when should a risk inference become durable learning?

---

## Recommended starting position

If this enters the roadmap, it should start as:

- experimental
- selective
- evidence-oriented
- scoped primarily to code and semantic-risk tasks

It should not start as a mandatory core phase for every workflow.

---

## Suggested next reading

- `starter-pack/templates/inference-artifact-template.md`
- `docs/agent-handoffs.md`
