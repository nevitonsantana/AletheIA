# Structured Risk Inference (Experimental Baseline)

## Status

Experimental baseline established, still open for hardening before 1.0.

## Goal

This document describes AletheIA's structured risk inference layer for cases where a decision needs more semantic scrutiny before execution.

In simple terms:

it adds a compact, evidence-oriented inference step for work where the decision itself needs to become more reviewable before code or workflow execution proceeds.

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
- regression-aware iterative maintenance

But one gap still matters in higher-risk work:

**how do we make the reasoning behind a decision more explicit before execution starts, especially when tests or confidence do not fully match the semantic risk?**

Today, many AI-assisted systems can answer:

- what to do
- how to execute

But they still struggle to answer in a structured, reviewable way:

- why this change is likely correct
- where it may fail
- what evidence supports the claim
- which unknowns still remain
- what tests would reduce the main risk
- whether the current gate is too light for the downside involved

---

## Problem

LLMs can propose changes and partially validate them, but several failure modes remain common:

- semantic inferences stay implicit
- reasoning may sound correct while still being incomplete
- test suites may not cover the real risk surface
- handoffs may preserve the instruction but lose the rationale
- confidence may look stronger than the underlying evidence justifies
- a maintenance round may appear successful while a silent degradation is already forming

The result is often:

- fragile confidence
- reactive validation
- hidden risk in apparently safe changes
- gates that are too light for the actual uncertainty

---

## Non-goals

This capability should **not** try to:

- replace automated tests
- prove formal correctness
- eliminate empirical validation
- act as an oracle of truth
- run on every small task by default
- become a required ceremony for every maintenance round

This is not formal verification.

It is a structured way of making risk-bearing inference more reviewable.

---

## Core concept

The capability is:

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
- maintenance rounds where regression, health signals, or alerts suggest that the current validation plan may be too weak for the uncertainty involved

For a more operational trigger guide, see:

- `starter-pack/guides/inference-trigger-guidance.md`
- `starter-pack/guides/inference-artifact-generation.md`
- `starter-pack/guides/risk-to-gate-mapping.md`

---

## When inference earns its cost

Inference is usually worth the extra step when it improves at least one of these:

- the quality of the validation plan
- the quality of the handoff rationale
- the quality of the gate decision
- the ability to explain why a regression risk is still unresolved

If the artifact would only restate what the team already knows without changing proof depth, gate choice, or reviewability, it is probably unnecessary overhead.

That is the most important Alpha 5 discipline.

---

## Relationship to risk-to-gate mapping

Alpha 5 should not float separately from validation posture.

A practical reading is:

- **risk-to-gate** decides how much proof and what kind of gate the slice needs
- **structured inference** helps when the team cannot justify that proof depth cleanly from the current evidence

In other words, inference often becomes proportional when there is a mismatch such as:

- medium-to-high downside with weak semantic proof
- a likely regression surface with unclear test coverage
- a high-stakes handoff where rationale must travel with the task
- a maintenance lane where regression or alert signals suggest a hidden semantic issue

This keeps Alpha 5 tied to governance rather than to abstract analysis.

---

## Relationship to iterative maintenance

In iterative maintenance, inference should remain selective.

It is usually most useful when:

- a previously stable behavior regressed
- the degradation is semantic rather than purely mechanical
- health or alert signals suggest that a round is no longer as trustworthy as it looked
- the next continuation would otherwise rely on confidence rather than reviewable rationale

In those cases, the artifact can help answer:

- what exactly are we assuming now?
- what evidence do we actually have?
- what test gap is still open?
- should the round stay blocked, reviewed, or widened before continuing?

This does **not** make observability or inference mandatory for every project.
It simply makes Alpha 5 more concrete in important iterative loops.

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

Alpha 5 strengthens that continuity by making the rationale more portable.

Before:

- context
- instruction
- scope

After, when the trigger is justified:

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

### 5. Regression-aware maintenance rounds

Surface why a round should stay blocked, widened, or selectively escalated when regression or health signals suggest that validation is underpowered.

---

## Risks

This capability also carries risks of its own:

- false sense of rigor
- increased token and latency cost
- overuse in simple tasks
- artifacts that become verbose without adding clarity
- confidence labels that appear more precise than they really are
- using inference as a substitute for gate discipline instead of as support for it

---

## Mitigations

To keep the capability proportional:

- use explicit triggers
- limit the depth of analysis
- keep the question bounded
- always expose unknowns and assumptions
- tie suggested tests back to the identified risk surface
- connect the artifact to the actual gate decision
- never treat the artifact as a substitute for empirical validation
- avoid numeric confidence unless it is truly grounded

---

## Success criteria

Alpha 5 is getting stronger when it:

- improves risk identification before execution
- improves the quality of suggested tests in risky changes
- reduces hidden ambiguity in high-stakes handoffs
- helps explain why a gate should widen, stay blocked, or proceed
- improves regression-aware reasoning in selective maintenance cases
- is used selectively rather than becoming universal ceremony

---

## Open questions

- how should inference quality be evaluated?
- how can verbosity stay bounded without losing value?
- what trigger threshold is practical?
- how should this connect to observability and post-execution signals without making them universal requirements?
- when should a risk inference become durable learning?

---

## Recommended starting position

Alpha 5 should remain:

- experimental
- selective
- evidence-oriented
- scoped primarily to code and semantic-risk tasks
- connected to risk-to-gate and iterative-maintenance reading without becoming mandatory in either one

It should not become a mandatory core phase for every workflow.

---

## Suggested next reading

- `starter-pack/templates/inference-artifact-template.md`
- `starter-pack/guides/inference-trigger-guidance.md`
- `starter-pack/guides/inference-artifact-generation.md`
- `starter-pack/guides/risk-to-gate-mapping.md`
- `docs/agent-handoffs.md`
- `docs/iterative-maintenance-governance.md`
