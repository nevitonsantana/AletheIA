# Agent Role Adoption Guide

## Goal

Explain how a project can adopt AletheIA's portable role system without turning every slice into unnecessary ceremony.

This guide is for teams that want continuity across runtimes such as Codex, Claude Code, and Qwen while keeping the system proportionate to the work.

---

## Core adoption rule

Adopt the role system as a **clarity layer**, not as a mandatory ritual.

Use it to make these things explicit when they matter:

- who is framing the slice
- whether the blocker is discovery, execution, critique, or proof
- what role continuity should survive a runtime switch
- what proof is still expected before closure

Do not use it to create paperwork for slices that are already obvious and low-risk.

---

## Minimum viable adoption

A healthy minimum adoption usually needs only:

1. the role catalog
2. one or two runtime adapters that the team actually uses
3. the handoff template when work crosses a real boundary
4. one or two example continuations that the team can copy

This is enough to make the system useful without inflating the local process.

---

## Recommended adoption sequence

### 1. Start with the catalog

Read:

- `docs/agent-role-catalog.md`
- `docs/agent-role-orchestrator.md`
- `docs/agent-role-implementer.md`
- `docs/agent-role-reviewer.md`

This gives the team the smallest stable spine first.

### 2. Add the roles that reduce real ambiguity

Most teams can start with:

- `orchestrator`
- `implementer`
- `reviewer`

Then add:

- `explorer` when discoverable unknowns are a recurring problem
- `validator` when proof continuity is regularly getting lost

### 3. Add only the runtime adapters you actually need

If the team only uses Codex and Claude Code, start with:

- `docs/runtime-adapter-codex.md`
- `docs/runtime-adapter-claude-code.md`

Do not force every possible runtime up front.

### 4. Preserve one shared handoff shape

When work crosses a real boundary, preserve at least:

- current role
- receiving role when relevant
- selected skills when materially relevant
- what was completed
- what remains pending
- next action
- proof expectation

This is what keeps runtime switching from becoming reinterpretation.

### 5. Add project-local guidance only after the portable layer is clear

Project-local guidance should answer questions such as:

- when does the team really delegate?
- which runtimes are preferred for which task shapes?
- what trust/hosting limits exist locally?
- when is a handoff required vs optional?

Keep these as local rules.
Do not rewrite the portable role meanings.

---

## Healthy adoption patterns

Good signs:

- the team can switch runtimes without renaming the role
- handoffs get shorter because role and proof are clearer
- skills are reused across runtimes instead of duplicated
- the team adds roles only when one of the canonical roles is truly too broad

---

## Unhealthy adoption patterns

Warning signs:

- every runtime invents different role names for the same job
- local agent files become mistaken for framework truth
- skills are treated as if they were the roles themselves
- every slice is forced through all five roles regardless of need
- the role system becomes an excuse to over-delegate simple work

---

## Small-team default

For a solo operator or very small team, a good default is:

- keep `orchestrator` in the main working boundary
- use `implementer` for bounded execution
- use `reviewer` only when semantic critique is really needed
- add `explorer` or `validator` only when the slice clearly benefits

This keeps the system light while preserving portability.

---

## Cross-runtime default

When the same work continues across runtimes, prefer:

- same canonical role
- same proof expectation
- same selected skills when relevant
- different runtime adapter only

See:

- `examples/resource-aware-operations/cross-runtime-role-handoff-example.md`

---

## Suggested next reading

- `docs/agent-role-catalog.md`
- `docs/agent-handoffs.md`
- `docs/runtime-adapter-contract.md`
- `docs/agent-runtime-decision-guide.md`
- `starter-pack/templates/agent-role-card-template.md`
