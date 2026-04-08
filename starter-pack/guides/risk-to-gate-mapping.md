# Risk-to-Gate Mapping

## Goal

This guide explains how to connect task framing, risk posture, validation depth, and closure behavior **without** turning every task into the same ceremony.

It is an operational guide.
It does not introduce a new core policy pack.

---

## Why this matters

AletheIA already treats validation as mandatory in proportion to the work.
The practical question is:

**how much proof should this slice need before it advances or closes?**

A useful answer should connect:

- the task brief's classification
- the risk posture
- the kind of gate required
- whether structured inference is proportional
- what should happen if the required proof is missing

---

## Primary inputs

Start with the task brief.
The most relevant fields are:

- `classification.task_type`
- `classification.severity`
- `classification.risk`
- `validation_plan`
- `human_gate_required`

### Reading rule

Use **risk** as the main signal.
Then use **task type**, **severity**, reversibility, trust-boundary impact, and semantic uncertainty to decide how heavy the gate should be.

---

## Three practical postures

### 1. Low risk -> light validation

Typical fit:

- small local change
- reversible docs or non-critical code path
- no trust-boundary shift
- low semantic ambiguity

Typical validation:

- diff inspection
- manual review
- light smoke if relevant

Typical human gate posture:

- not required by default

Structured inference posture:

- usually not recommended

Typical closure rule:

- may close after lightweight proof exists

---

### 2. Medium risk -> expanded validation

Typical fit:

- broader but still bounded change
- reusable operating guidance or multi-file refactor
- moderate semantic uncertainty
- meaningful review boundary, even if no human gate is required

Typical validation:

- targeted tests or smoke checks
- diff inspection
- review of boundary files
- contract or behavior consistency check

Typical human gate posture:

- not always required
- recommended when reversibility is lower or when trust boundaries start to matter

Structured inference posture:

- selective
- useful when semantic risk is high, the validation plan is unclear, or a handoff carries non-trivial interpretation risk

Typical closure rule:

- should not close on confidence alone
- may close after expanded proof or pause for review

---

### 3. High or critical risk -> explicit gate

Typical fit:

- global or hard-to-reverse mutation
- security-sensitive change
- trust-boundary change
- system-wide policy, permissions, critical actions, or high-impact data flow
- high semantic uncertainty with meaningful downside

Typical validation:

- targeted validation with explicit rationale
- human approval when the task brief or context demands it
- reviewable evidence before execution or rollout

Typical human gate posture:

- strongly recommended
- mandatory when the task brief already marks `human_gate_required = true`

Structured inference posture:

- often proportional
- especially useful for high-stakes refactors, semantic-risk handoffs, and hard-to-reverse decisions

Typical closure rule:

- block or escalate until the required gate is satisfied
- do not treat confidence as a substitute for approval

---

## Common escalation triggers

Even if the base task looks moderate, increase the gate when one or more of these appear:

- trust-boundary changes
- global configuration or policy mutation
- higher exfiltration or abuse potential
- fragile semantics across many files
- cross-agent continuation with low ambiguity tolerance
- unclear validation design for a high-impact change

---

## Common block triggers

Block or slow closure when:

- the promised validation did not happen
- the risk read and the proof depth are mismatched
- a human gate is required but missing
- structured inference was clearly warranted but skipped without replacement
- the slice crossed a boundary without a usable restart package

---

## Simple operational recipe

1. Read the task brief classification.
2. Confirm whether the work is low, medium, or high/critical in practice.
3. Set the minimum proof depth.
4. Decide whether a human gate is required.
5. Decide whether structured inference is proportional.
6. Make the closure rule explicit before execution ends.

---

## Examples

See these governance examples for a compact posture mapping:

- `examples/governance/risk-low-light-validation.json`
- `examples/governance/risk-medium-expanded-validation.json`
- `examples/governance/risk-high-human-gate.json`

---

## Suggested next reading

- `starter-pack/guides/quality-gates.md`
- `docs/work-slice-pattern.md`
- `docs/structured-risk-inference.md`
- `docs/agent-handoffs.md`
