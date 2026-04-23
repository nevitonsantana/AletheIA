# Agent Role Card Template

Use this template to define a portable AletheIA agent role.

This is a semantic role card.
It is not a runtime-specific agent file.

---

## Role identity

### role_id

### mission

State the portable responsibility of this role in one short paragraph.

---

## Boundaries

### allowed_work

List the types of work this role may do.

### out_of_scope

List what this role should not absorb.

---

## Skill fit

### preferred_skills

List the skills this role commonly uses.

These are helpers, not the definition of the role itself.

---

## Input / output contract

### expected_inputs

Describe the minimum inputs this role needs.

### expected_outputs

Describe the bounded outputs this role should return.

---

## Stop / handoff discipline

### stop_rules

Describe when this role must stop instead of continuing.

### handoff_triggers

Describe when the work should move to another role, runtime, reviewer, or owner.

---

## Proof expectation

### proof_expectation

Describe the minimum evidence expected before this role can claim completion.

Examples:
- targeted test
- smoke
- explicit reasoning summary
- review note
- handoff package

---

## Optional runtime mapping notes

Use this only if a project wants to document how the same role maps to real runtimes.

### Codex mapping

### Claude Code mapping

### Other runtime mapping
