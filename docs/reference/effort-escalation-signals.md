# Effort Escalation Signals

## Goal

Catalog the observable signals an AletheIA-governed runtime uses to decide whether to
**escalate**, **de-escalate**, or **stop** within a work slice, and define which signal wins
when several appear at once.

This reference is consumed by the
[Runtime Effort Governance Contract](../contracts/runtime-effort-governance-contract.md),
which defines the operational response to each signal. This document lists the signals; the
contract decides what to do with them.

Effort is never escalated by habit. It is escalated only when at least one observable signal
below is present, and only as far as the signal justifies.

---

## Escalation signals

A reason to spend more effort, expand context, or raise planning depth.

| Signal | Meaning |
|---|---|
| `missing_required_context` | Context required for a correct, safe, or complete answer is absent. |
| `conflicting_requirements` | Two or more requirements cannot both be satisfied as stated. |
| `multi_file_dependency_detected` | The change reaches beyond the local artifact into linked files. |
| `test_or_validation_failure` | A check, test, or validation did not pass. |
| `low_confidence` | The agent's confidence in the current answer is materially low. |
| `security_privacy_or_compliance_risk` | The slice touches security, privacy, or compliance surface. |
| `irreversible_or_external_action` | The next step is hard to undo or causes an external side effect. |
| `risk_exceeds_authority` | The risk is above what the agent is authorized to take; escalate toward a human checkpoint. |
| `quality_floor_at_risk` | Continuing at current effort would breach the required quality floor. |

---

## De-escalation signals

A reason to reduce effort, stop expanding context, or lower planning depth — valid only when
no blocking escalation signal is active.

| Signal | Meaning |
|---|---|
| `scope_became_local` | The task turned out to be narrow and locally contained. |
| `required_context_found` | The context the slice needed has been located. |
| `risk_confirmed_low` | Investigation confirmed the risk of error is low. |
| `answer_sufficient_without_more_tools` | The current answer meets the requested output without further tool use. |

---

## Stop signals

A reason to stop the slice — either because more effort adds cost without quality, or because
the next step requires human authority.

| Signal | Meaning |
|---|---|
| `sufficient_quality_reached` | The output already satisfies the quality floor and the request. |
| `budget_exhausted` | The effort, tool, or revision budget is spent. |
| `human_decision_required` | The next step is a human decision, not more reasoning. |
| `risk_exceeds_authority` | The risk is above what the agent is authorized to take. |
| `next_action_is_not_reversible` | Proceeding would cross an irreversibility boundary. |

---

## Waste signals and operational response

Waste signals come from [waste-heuristics.md](waste-heuristics.md). The contract maps each to
a response.

| Waste signal | Response |
|---|---|
| broad context read with no relevant gain | de-escalate or stop expanding context |
| tool calls repeating without progress | stop or ask for human direction |
| heavy planning for a simple local change | reduce depth toward Lite |
| concise answer that risks quality | escalate |
| repeated validation failure | stop or request a handoff |

---

## Risk signals

Risk signals always bias toward escalation or a human checkpoint, never toward de-escalation:

- `security_privacy_or_compliance_risk`
- `irreversible_or_external_action`
- `risk_exceeds_authority`
- `quality_floor_at_risk`

---

## Signal priority

When escalation and de-escalation signals appear simultaneously, resolve with this order.
Escalation signals override de-escalation signals when quality, safety, reversibility, or
authority is at risk.

```yaml
signal_priority:
  rule: "Escalation signals override de-escalation signals when quality, safety, reversibility, or authority is at risk."

  always_escalate:
    - "security_privacy_or_compliance_risk"
    - "irreversible_or_external_action"
    - "risk_exceeds_authority"
    - "quality_floor_at_risk"

  escalate_before_deescalate:
    - "test_or_validation_failure"
    - "conflicting_requirements"
    - "low_confidence"

  conditional_escalation:
    - "multi_file_dependency_detected"
    - "missing_required_context"

  deescalate_only_when_no_blocking_risk:
    - "answer_sufficient_without_more_tools"
    - "scope_became_local"
    - "risk_confirmed_low"
    - "required_context_found"
```

Read the tiers top-down:

1. **always_escalate** — a single one of these forces escalation or a human checkpoint, no
   matter what de-escalation signals are also present.
2. **escalate_before_deescalate** — resolve these toward more effort before considering any
   reduction.
3. **conditional_escalation** — escalate only if the signal actually blocks quality, safety,
   or correctness; otherwise it does not force escalation.
4. **deescalate_only_when_no_blocking_risk** — reduce effort only when no signal from the
   higher tiers is active.

---

## Examples by task type

- **Lite edit** (`task_type: edit`, reversible, local): typically no escalation signal fires;
  the slice stays Lite and stops on `sufficient_quality_reached`.
- **Standard plan** (`task_type: plan`, multi-file, read-only): `multi_file_dependency_detected`
  is present but conditional — escalate only if a linked file actually changes the answer.
- **High-Assurance code change** (`task_type: code_change`, systemic, low reversibility):
  `irreversible_or_external_action` and `risk_exceeds_authority` force escalation and a human
  checkpoint.

---

## Conflict examples

- `missing_required_context` + `answer_sufficient_without_more_tools` → escalate if the missing
  context is required for quality; de-escalate only if it is not required for the requested
  output. See example 4 in
  [runtime-effort-contract-example.md](../../examples/resource-aware-operations/runtime-effort-contract-example.md).
- `scope_became_local` + `risk_confirmed_low` + `answer_sufficient_without_more_tools` with no
  blocking risk → de-escalate to Lite. See example 7 in the same file.

---

## Suggested next reading

- [runtime-effort-governance-contract.md](../contracts/runtime-effort-governance-contract.md)
- [planning-depth-profiles.md](planning-depth-profiles.md)
- [waste-heuristics.md](waste-heuristics.md)
- [runtime-effort-contract-example.md](../../examples/resource-aware-operations/runtime-effort-contract-example.md)
