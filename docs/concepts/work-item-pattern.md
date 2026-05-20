# Work Item Pattern

## Goal

Define how AletheIA treats an externally coordinated unit of work without making any single board or ticketing tool part of the core.

---

## What a Work Item is

A **Work Item** is the canonical abstraction for a unit of externally coordinated work.

It is how the framework refers to items such as:

- GitHub Issues
- Jira tickets
- Trello cards
- Linear issues
- Notion tasks

A work item is **not** the same thing as a work slice.

- the **work item** tracks external coordination
- the **work slice** tracks bounded operational execution

---

## Why this distinction matters

Without a work-item abstraction, teams drift into tool-first thinking:

- an issue starts to look like the only valid unit of work
- a board column starts to look like framework truth
- the runtime conversation starts to carry continuity that should live in artifacts

AletheIA should prevent that drift.

---

## One Work Item, many slices

A single work item may relate to:

- one slice
- multiple sequential slices
- one initiative that still needs slicing before execution

This is normal.
The point is not to force one exact mapping.
The point is to keep the operational unit and the coordination unit distinct.

---

## Minimum conceptual contract

A minimal work item should make these things explicit:

- `system` — external coordination system
- `workspace_ref` — project, board, repo, or workspace reference
- `item_id` — stable external identifier
- `item_type` — issue, task, ticket, card, or equivalent
- `title`
- `status`
- `priority`
- `owner`
- `acceptance_refs`
- `source_of_truth_refs`

This is enough to anchor a slice without claiming a final adapter schema.

---

## Relationship to execution surfaces

Work items do not belong to one execution surface.

A slice may move across:

- one agent conversation
- another agent conversation
- human review
- a fresh execution surface after restart

The related work item may remain the same while the execution surface changes.
That is exactly why the distinction matters.

---

## Examples

### GitHub

- Work item = issue
- Coordination system = GitHub Issues / GitHub Project
- Work slice = bounded implementation, review, or hardening step attached to that issue

### Jira

- Work item = ticket
- Coordination system = Jira board / project
- Work slice = bounded delivery or review step that may span more than one agent surface

### Trello

- Work item = card
- Coordination system = Trello board
- Work slice = bounded work package, even if Trello itself carries only lightweight metadata

---

## What this pattern is not

A work item is not:

- the new kernel contract
- the same thing as a work slice
- proof that GitHub-like semantics should become core truth
- a demand for rich automation before the framework is usable

It is a stable concept that allows adapters and manual operations to stay coherent later.
