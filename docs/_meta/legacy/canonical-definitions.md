# Canonical Definitions

## Goal

Define the stable, tool-agnostic vocabulary of the AletheIA core.

These definitions exist so the framework can be explained without depending on one runtime surface, one board, or one provider-specific workflow.

---

## Core entities

### Work Slice

A **Work Slice** is the primary operational unit of AletheIA.

It is the smallest bounded unit of work that should remain explicit across:

- framing
- decision
- execution
- validation
- handoff when needed
- restart when boundaries change
- learning when warranted

A work slice is not the same thing as a board card, issue, ticket, or chat.
It is the unit that AletheIA governs directly.

### Work Item

A **Work Item** is the canonical abstraction for any externally coordinated unit of work.

Examples:

- GitHub Issue
- Jira ticket
- Trello card
- Linear issue
- Notion task

A work item may anchor one slice, many slices, or a larger initiative that still needs slicing.

### Restart Package

A **Restart Package** is the compact continuity artifact used to resume work after a boundary.

Its job is to preserve reviewable continuity without requiring transcript replay.

### Handoff

A **Handoff** is the transition artifact that moves a slice across an agent, review, or ownership boundary.

Every operational handoff should behave like a restart package, not a transcript dump.

### Governing Context

**Governing Context** is the minimum durable context that still constrains the next boundary.

Typical refs may include:

- active spec or plan
- policy pack
- decision log
- quality gate or release rule
- project-local constitution or operating rules

### Durable Memory

**Durable Memory** is the set of reviewable artifacts that must survive past one execution surface.

Examples include docs, decisions, handoffs, restart packages, and learnings.

### Execution Surface

An **Execution Surface** is the local runtime surface where work happens.

Examples:

- a coding-agent conversation
- an IDE agent pane
- a chat interface
- a shell-centered agent session

Execution surfaces are real and operationally important, but they are **runtime concerns**, not core framework truth.

### External Coordination System

An **External Coordination System** is any tool used to track status, priority, ownership, or progress outside the core.

Examples:

- GitHub Projects
- Jira boards
- Trello boards
- Linear views

AletheIA integrates with these systems through adapter logic or operator practice, not through core dependence.

---

## Minimum conceptual interfaces

These are conceptual interfaces only.
They define meaning, not a final wire format.

### WorkItem

A minimal WorkItem should make explicit:

- `system`
- `workspace_ref`
- `item_id`
- `item_type`
- `title`
- `status`
- `priority`
- `owner`
- `acceptance_refs`
- `source_of_truth_refs`

### WorkSlice

A minimal WorkSlice should make explicit:

- `slice_id`
- `related_work_item_ref`
- `goal`
- `in_scope`
- `out_of_scope`
- `validation_expected`
- `governing_context_refs`
- `restart_package_ref`
- `handoff_ref`
- `finalization_outcome`

### RestartPackage

A minimal RestartPackage should make explicit:

- `project_ref`
- `official_work_item_ref`
- `slice_id`
- `validation_status`
- `mission_focus`
- `resume_entrypoint`
- `last_boundary_summary`
- `next_immediate_action`
- `do_not_reopen`
- `next_official_step`
- `new_execution_surface`
- `new_execution_surface_reason`
- `known_constraints`
- `governing_context_refs`
- `governing_context_delta`

---

## Responsibility boundaries

| Concern type | Meaning | Examples | Must stay where |
| --- | --- | --- | --- |
| `core concern` | Stable framework meaning | work slice, restart package, governing context, reviewable continuity | AletheIA core docs and concepts |
| `adapter concern` | Tool-specific translation of the core | GitHub mapping, Jira mapping, slash-command mapping, runtime-local actions | adapter docs, delivery mappings, local guides |
| `operator concern` | Manual bridge work when automation is absent or intentionally light | opening a new runtime surface, linking a board item, pasting a restart package | local operations and project practice |

Core rule:

- the **core** governs boundaries, artifacts, and reviewable continuity
- **adapters** translate those meanings into concrete tools
- the **operator** bridges the gap when no adapter exists or when manual control is healthier

---

## Non-goals

These definitions do **not** yet try to:

- define a final adapter API
- define a canonical state machine for all tools
- make GitHub the default truth of the framework
- make runtime controls part of the kernel

Those belong to later adapter and delivery work.
