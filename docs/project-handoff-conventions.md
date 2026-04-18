# Project-Level Handoff Conventions

## Goal

Explain how a project may define local handoff conventions on top of AletheIA without replacing the framework's model-agnostic meaning.

---

## Core rule

A project may customize:

- vocabulary
- storage locations
- ownership boundaries
- validation defaults
- response-format preferences
- coordination-system mappings

A project should not silently replace:

- handoff as restart package
- work slice as the operational unit
- work item as the external coordination abstraction
- execution surface as a runtime detail

---

## What may stay project-local

A project may define:

- dominant frontier labels
- ownership maps
- local storage conventions
- naming conventions
- default proof expectations
- how a GitHub/Jira/Trello item is mapped locally

These rules are healthy when they reduce ambiguity without turning local habits into framework truth.

---

## Stable framework meaning

The following should remain stable even when the local layer changes:

- handoff as restart package
- explicit next action
- validation expectation
- semantic guardrails when needed
- provider-agnostic meaning of the artifact
- separation between work slice, work item, and execution surface

---

## Good signs

Project-level handoff conventions are healthy when:

- local conventions reduce ambiguity without changing framework meaning
- multiple agents can continue work without hidden memory
- the project can evolve local rules without forking the framework logic
- coordination-system choices remain clearly local
