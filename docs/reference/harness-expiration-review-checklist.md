# Harness Expiration Review — Checklist

## Goal

Provide a short, repeatable routine for deciding whether a harness control — a gate, sensor, guide,
prompt, or script declared in an [Agent Harness Contract](../contracts/agent-harness-contract.md) —
still earns its place, or should be **simplified, updated, or removed**.

A harness is not permanent. A control that never fires may be excellent or useless; without review
you cannot tell. This routine is the sibling of the
[Agent Harness Governance validation checklist](agent-harness-governance-validation-checklist.md):
that one validates the per-action contract against a real trace; this one decides when a *control*
has expired.

The discipline is the same as the rest of the framework: **evidence is an input, not an authority.**
Remove a control because it stopped reducing real risk, not because it feels heavy.

---

## When to run this

Review a harness control when any of the following changes:

- the model changes capability;
- a skill changes;
- a tool changes its schema;
- a sensor stops firing;
- a sensor fires too much noise;
- the project context changes;
- a gate adds delay without reducing risk;
- human review keeps finding the same errors the control was meant to catch.

---

## The checklist

For each control under review, answer:

```txt
Does the control still prevent a real error?
Does the sensor capture something that matters?
Is the cost of the control still justified?
Does the instruction contradict another rule?
Does the current model still need this support?
Could the gate be reduced without increasing risk?
Is the harness creating bureaucracy without evidence?
```

A single "no" is a candidate for change, not an automatic removal. The core review question:

```txt
Does this control still reduce real risk, or does it only preserve an old fear?
```

---

## Decide (with restraint)

- **Keep** — the control still prevents a real, observed error class.
- **Simplify** — the control's intent is valid but its cost is too high; reduce the gate or sensor.
- **Remove** — the control no longer maps to a real risk, and removing it does not raise blast
  radius, irreversibility, or quality risk.

Removing a gate that guards a write, delete, external call, or irreversible action requires the same
human authority AHGE requires for those actions — do not auto-relax a safety gate. Record the
decision and the evidence behind it.

---

## What stays out of scope

This routine reviews *controls*, not the contract's safety floor. It never authorizes removing
rollback or human review from a `hard_to_reverse` task, and never turns a harness review into a way
to bypass human review (Guardrails). The framework stays provider-agnostic and review-oriented.
