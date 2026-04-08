# High-Stakes Handoff

## Handoff type

Operational handoff with elevated review expectations

### Receiving agent role

Risk-aware reviewer

### Dominant frontier

Higher-risk validation and execution boundary review

### Cross-boundary reason

The originating agent stopped at its execution boundary because the next step affects a higher-risk change and should not continue on implicit trust.

---

## Current status

### Status

blocked on validation

### What was completed

- the task was framed and classified as high impact
- the initial decision and rationale were captured
- the risky next step was explicitly not executed

### What remains pending

- confirm whether a human gate is mandatory in practice
- review the proposed validation evidence before any continuation
- decide whether structured inference should be attached before execution resumes

---

## Execution boundary

### Allowed files

- high-risk review notes
- validation design artifacts
- handoff and inference artifacts

### Forbidden files

- direct rollout targets
- policy mutation paths
- global trust-boundary configuration

### Explicitly out of scope

- silent continuation into execution
- substituting model confidence for approval
- collapsing review into a transcript dump

---

## Available context

### Allowed data or contracts

- task brief classification
- decision record rationale
- current validation plan
- existing trust-boundary guardrails

### Relevant files

- task brief for the high-risk slice
- decision record for the slice
- structured inference guidance if needed

---

## Semantic guardrails

The receiving agent must preserve the distinction between recommendation, approval, and execution.
The handoff exists because the next step should not be interpreted as automatically allowed.

---

## Acceptance criteria

Before the slice can continue, the reviewer should be able to say:

- what proof is still missing
- whether human approval is required
- whether the next action is review, ask_human, or block

---

## Validation expectation

- explicit review of risk posture
- justification for any human gate decision
- targeted validation evidence matched to the downside of the change

---

## Risks and unknowns

### Main risks

- semantic drift during continuation
- pressure to treat review as a formality
- under-scoped validation for a high-impact change

### Unknowns still open

- whether the existing validation plan is sufficient without structured inference
- whether the current trust boundary has hidden dependencies

---

## Expected response format

Report back with:

- gate decision
- evidence reviewed
- remaining blockers
- recommended next action

---

## Next action

Evaluate whether the slice should remain blocked, escalate to a human gate, or proceed only after a structured inference artifact is attached.
