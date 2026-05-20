# AletheIA — Core Contracts

## Goal

Translate the AletheIA vision into the minimum contracts and conceptual surfaces the framework needs in order to stay reviewable, portable, and bounded.

---

## Two layers to keep distinct

AletheIA now makes an explicit distinction between:

1. **core contracts**
2. **canonical operating concepts**

The core contracts are the structured artifacts already backed by schemas and engine helpers.
The canonical operating concepts are the stable meanings that connect those artifacts across tools and runtime surfaces.

See also:

- `docs/canonical-definitions.md`
- `docs/work-item-pattern.md`

---

## Canonical operating concepts

The stable public concepts are:

1. `Work Slice`
2. `Work Item`
3. `Restart Package`
4. `Handoff`
5. `Governing Context`
6. `Durable Memory`
7. `Execution Surface`
8. `External Coordination System`

These concepts are broader than any one schema, runtime, or board.

---

## Core contracts

The current baseline still starts from **6 core contracts**:

1. `Task Brief`
2. `Context Pack`
3. `Decision Record`
4. `Execution Record`
5. `Handoff Record`
6. `Learning Record`

They represent the reviewable chain:

`tarefa -> contexto -> decisão -> execução -> handoff -> learning`

---

## Why start from contracts and concepts together

Without contracts, the framework becomes vague.
Without concepts, the contracts can become tool-shaped and drift into one local workflow.

AletheIA should make both explicit.

That is how the framework stays:

- clear
- auditable
- reusable
- less dependent on hidden runtime state

---

## Contract purpose summary

### 1. Task Brief

Defines the task before execution.

### 2. Context Pack

Defines the minimum sufficient context for that task.

### 3. Decision Record

Explains what was interpreted, decided, and why.

### 4. Execution Record

Shows what actually ran, through which adapter, and with what result.

### 5. Handoff Record

Preserves explicit continuity across a boundary.

### 6. Learning Record

Turns the result into reusable learning when warranted.

---

## How the concepts and contracts fit together

- a **Work Slice** is the bounded operational unit built from one or more of the core contracts
- a **Work Item** is the external coordination anchor a slice may point to
- a **Restart Package** is the compact continuity block used when the slice crosses a new boundary
- a **Handoff Record** is the structured carrier of that continuity
- an **Execution Surface** is where the slice is currently being worked, but not where durable truth should live

This avoids treating threads, chats, sessions, issues, or boards as if they were the framework itself.

---

## Governance-supporting artifacts

The 6 core contracts remain central.
AletheIA also keeps two governance-supporting artifacts explicit:

### 1. Execution Scope

Makes the execution boundary explicit.

### 2. Policy Evaluation

Makes rule evaluation and action selection more auditable.

These artifacts strengthen the governance layer, but they do not replace the core contracts or the canonical concepts.

---

## Quality rule

Contracts and concepts should remain:

- legible for humans
- versionable
- smaller than full transcript replay
- provider-agnostic
- tool-agnostic at the core

---

## Next reading

- `docs/canonical-definitions.md`
- `docs/work-item-pattern.md`
- `docs/work-slice-pattern.md`
- `docs/slice-finalization-and-restart.md`
