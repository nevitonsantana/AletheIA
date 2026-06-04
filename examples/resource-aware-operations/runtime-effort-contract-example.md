# Runtime Effort Contract — Operational Examples and Edge Cases

Concrete examples that exercise the
[Runtime Effort Governance Contract](../../docs/contracts/runtime-effort-governance-contract.md).
They show how an AletheIA-governed runtime decides effort, escalates, de-escalates,
stops, and asks for a human checkpoint — without naming any specific model.

## 1. Lite slice — Local, reversible edit

### Scenario

A user asks: "Adjust this paragraph for clarity."

### Classification

```yaml
task_type: "edit"
reversibility: "high"
blast_radius: "local"
uncertainty: "low"
risk_of_error: "low"
context_need: "none"
tool_need: "none"
initial_depth: "lite"
max_depth: "lite"
```

### Expected behavior

- Do not expand project context.
- Do not create a heavy plan.
- Produce the edited paragraph.
- Stop when quality is sufficient.

### Telemetry expectation

```yaml
initial_effort: "lite"
final_effort: "lite"
escalation_count: 0
deescalation_count: 0
stop_reason: "sufficient_quality_reached"
quality_floor_maintained: true
```

---

## 2. Standard slice — Bounded project document update

### Scenario

A user asks: "Update the governance guide to mention runtime effort and telemetry."

### Classification

```yaml
task_type: "plan"
reversibility: "medium"
blast_radius: "multi_file"
uncertainty: "medium"
risk_of_error: "medium"
context_need: "project"
tool_need: "read_only"
initial_depth: "standard"
max_depth: "standard"
```

### Expected behavior

- Inspect related governance docs.
- Create a short plan.
- Apply bounded changes.
- Validate internal consistency.
- Avoid broad repository exploration unless a trigger appears.

### Telemetry expectation

```yaml
initial_effort: "standard"
final_effort: "standard"
escalation_count: 0
deescalation_count: 0
context_expansion_level: "targeted"
stop_reason: "sufficient_quality_reached"
quality_floor_maintained: true
```

---

## 3. High-Assurance slice — Systemic governance change

### Scenario

A user asks: "Change the runtime adapter contract so all consumers follow the new effort governance policy."

### Classification

```yaml
task_type: "code_change"
reversibility: "low"
blast_radius: "systemic"
uncertainty: "high"
risk_of_error: "high"
context_need: "project"
tool_need: "write"
initial_depth: "standard"
max_depth: "high_assurance"
```

### Expected behavior

- Start in Standard if the initial task is clear.
- Escalate to High-Assurance when systemic impact is confirmed.
- Map affected contracts and examples.
- Produce explicit plan before changes.
- Request human checkpoint before high-impact or irreversible changes.
- Record escalation reason.

### Telemetry expectation

```yaml
initial_effort: "standard"
final_effort: "high_assurance"
escalation_count: 1
escalation_reasons:
  - "systemic_blast_radius_detected"
human_checkpoint_triggered: true
stop_reason: "human_decision_required"
quality_floor_maintained: true
```

---

## 4. Edge case — Escalation vs. de-escalation conflict

### Scenario

The agent detects:

```yaml
signals_detected:
  - "missing_required_context"
  - "answer_sufficient_without_more_tools"
```

### Conflict

One signal suggests escalation. Another suggests de-escalation.

### Resolution

`missing_required_context` wins if the missing context is required to preserve quality, safety, evidence, or correctness.

`answer_sufficient_without_more_tools` wins only when the missing context is not required for the user's requested output.

### Expected decision

```yaml
decision:
  action: "escalate_or_ask_for_context"
  reason: "missing_required_context blocks quality_floor"
```

### Alternative decision

```yaml
decision:
  action: "deescalate_and_stop"
  reason: "missing context not required for sufficient answer"
```

### Rule validated

De-escalation only happens when no blocking risk exists.

---

## 5. Edge case — User intent conflict

### Scenario

The user asks:

"Be fast, precise and save tokens."

### Conflict

Speed, precision and cost saving can conflict.

### Resolution

```yaml
intent_resolution:
  applied_order:
    - "precision"
    - "speed"
    - "cost_saving"
  rule_applied:
    - "precision overrides speed when risk_of_error is medium or high"
    - "cost_saving never overrides quality_floor"
```

### Expected behavior

- Reduce verbosity where possible.
- Do not skip required validation.
- Avoid broad context expansion unless triggered.
- Explain limitations if answering without full certainty.

### Expected decision

```yaml
decision:
  initial_effort: "standard"
  max_effort: "standard"
  verbosity: "concise"
  validation: "required"
  token_saving: "secondary"
```

---

## 6. Edge case — Human checkpoint

### Scenario

The agent is asked to alter a file that changes behavior across multiple consumers.

Detected signals:

```yaml
signals_detected:
  - "irreversible_or_external_action"
  - "risk_exceeds_authority"
```

### Expected behavior

The agent must stop and ask for human confirmation.

### Expected decision

```yaml
decision:
  action: "stop_for_human_checkpoint"
  reason:
    - "risk_exceeds_authority"
    - "irreversible_or_external_action"
  human_checkpoint_triggered: true
```

### Rule validated

More reasoning must not replace human authority.

---

## 7. Edge case — Economy justified

### Scenario

The agent starts in Standard, but discovers the task is a local typo fix in one Markdown file.

Detected signals:

```yaml
signals_detected:
  - "scope_became_local"
  - "risk_confirmed_low"
  - "answer_sufficient_without_more_tools"
```

### Expected behavior

The agent de-escalates to Lite and avoids broad context expansion.

### Expected decision

```yaml
decision:
  action: "deescalate"
  initial_effort: "standard"
  final_effort: "lite"
  reason:
    - "scope_became_local"
    - "risk_confirmed_low"
    - "answer_sufficient_without_more_tools"
  token_saving: "allowed_without_quality_loss"
```

### Rule validated

Token saving is allowed when quality floor is preserved.
