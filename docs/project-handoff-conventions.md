# Project-Level Handoff Conventions

## Goal

This document explains how a project can define local handoff conventions on top of AletheIA without breaking the framework's model-agnostic handoff structure.

In simple terms:

AletheIA defines the handoff shape.
A project may define local conventions for how that shape is filled.

---

## Why this matters

Alpha 4 should not stop at a generic handoff template.

Real projects often need local conventions such as:

- ownership boundaries between agents
- preferred handoff folder locations
- local frontier labels
- repo-specific file scope rules
- project-specific validation expectations
- local wording for response formats

Those conventions are useful.

But if they replace the framework structure itself, handoffs become tied to one product or one toolchain.

The point of project-level conventions is to keep the local layer explicit.

---

## Core rule

A project may customize:

- vocabulary
- local ownership rules
- storage location
- naming patterns
- validation expectations
- handoff cadence
- multi-boundary chain rules

A project should not silently replace:

- the restart-package concept
- the distinction between narrative and operational handoffs
- the need for explicit execution boundaries
- the model-agnostic meaning of the artifact

---

## What a project may define locally

### 1. Frontier taxonomy

A project may define its own dominant frontier labels.

Examples:

- integration
- UX writing
- visual polish
- security
- observability
- internal platform

The exact labels may vary by project.

### 2. Ownership map

A project may define which agent or team usually owns which layer.

Examples:

- backend owned by one agent
- visual refinement owned by another
- copy allowed to cross the visual surface under specific rules

### 3. Handoff storage convention

A project may define where handoffs live.

Examples:

- `docs/handoffs/`
- `ops/handoffs/`
- issue-linked artifacts
- task-linked artifacts in a work log

### 4. Naming convention

A project may define how handoff artifacts are named.

Examples:

- date + target + scope
- task id + target agent + frontier
- feature slice + handoff type

### 5. Validation expectation defaults

A project may define recurring proof expectations.

Examples:

- lint for UI changes
- smoke for route behavior
- domain-specific audit checks
- human review for sensitive flows

### 6. Response format preference

A project may define the preferred return format from the receiving agent.

Examples:

- changed files + validation + next step
- execution summary + blockers + suggested follow-up
- implementation status + out-of-scope notes

### 7. Multi-boundary chain convention

A project may define when one task should generate:

- one operational handoff
- or a sequence of smaller handoffs

Examples:

- implementation -> observability -> review
- backend boundary -> UX writing boundary -> visual polish boundary
- feature hardening -> security review -> release check

The project may define naming or storage patterns for these chains, but the framework meaning should remain the same: each step is still a restart package with explicit scope and validation continuity.

---

## What should remain framework-stable

The following should remain stable even when the project layer changes:

- handoff as restart package
- allowed files vs forbidden files distinction
- semantic guardrails
- acceptance criteria
- validation expectation
- explicit next action
- provider-agnostic meaning of the artifact

These are part of the framework logic, not only local preference.

---

## Recommended project convention checklist

If a project wants handoffs to be consistent, it should make explicit:

1. where handoffs are stored
2. how they are named
3. which frontier labels are valid locally
4. which ownership boundaries matter most
5. what proof is expected by default for each major frontier
6. what response format the receiving agent should use
7. when a handoff should be narrative vs operational
8. when a multi-boundary chain is preferred over one larger artifact

---

## Relationship to project extension pattern

This document is a direct extension of:

- `docs/project-extension-pattern.md`

The project extension pattern explains the boundary between framework core and local project rules.

This document applies that same discipline specifically to inter-agent handoffs.

---

## Good signs

Project-level handoff conventions are healthy when:

- local conventions reduce ambiguity without changing the framework meaning
- handoffs are easier to generate and easier to review
- multiple agents can work in the same project without relying on hidden memory
- the project can evolve local rules without forking the framework logic
- multi-boundary chains remain smaller and more explicit than one oversized recap

---

## What not to do

Do not let project conventions turn into:

- provider-specific framework rules
- hidden assumptions not written anywhere
- one team's habits masquerading as universal structure
- prompts that only make sense in one agent shell
- giant handoff bundles that hide the actual boundary transitions

---

## Suggested next reading

- `docs/agent-handoffs.md`
- `starter-pack/guides/agent-handoff-generation.md`
- `starter-pack/templates/agent-handoff-template.md`
- `examples/handoffs/multi-boundary-continuity.md`
- `docs/project-extension-pattern.md`
