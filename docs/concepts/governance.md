# AletheIA — Development Governance Pack v1

## Objective

This document formalizes the first `Governance Pack` for `AletheIA`.

In plain language:

if the `Decision Kernel` is the “minimum engine”, the `Governance Pack` is the layer that defines:

- what is mandatory;
- what is forbidden;
- what needs review;
- what needs human approval.

---

## What this pack is

This is the **first official AletheIA governance pack for AI-assisted software development**.

It exists to turn good practices into evaluable rules during:

- analysis;
- planning;
- execution;
- validation.

---

## What this pack is not

- it is not the whole framework;
- it is not a prompt;
- it is not the `Rule Interpreter`;
- it is not a universal policy for every type of work.

It is a **software-development-specific policy pack** inside the broader `AletheIA` umbrella.

---

## Relationship to token discipline

The `Governance Pack` says when work may or may not proceed.

The `Token Policy` complements it by defining:

- how much context should be loaded;
- when that context should be loaded;
- when context expansion is justified.

Recommended reading together:

- `docs/token-policy.md`
- `docs/durable-decisions.md`

---

## Why this matters

Without explicit governance, AI can:

- expand scope without noticing;
- write without enough context;
- change contracts implicitly;
- skip validation;
- touch files outside the boundary.

The `Governance Pack` exists to reduce those risks.

---

## Enforcement boundary

The `Governance Pack` describes rules and expectations.

Not every rule described here is already technically unavoidable.

To make that explicit, read it together with:

- `docs/enforcement-boundaries.md`

---

## Normalized AletheIA vocabulary

To keep the framework more domain-agnostic, this pack uses more general terms:

| Previous term | Normalized term |
|---|---|
| `SPEC` | `Source-of-Truth Artifact` |
| `Issue` | `Work Item` |
| `Backend as source of truth` | `Authoritative Layer` |
| `Allowed/forbidden files` | `Execution Scope` |

### What these terms mean

#### Source-of-Truth Artifact

The artifact that defines the expected behavior.

It can be a:

- SPEC;
- feature spec;
- task brief;
- architecture note;
- contract document.

#### Work Item

A Work Item is the official governed unit of work in AletheIA.

It is tracker-agnostic by design.

A GitHub issue may represent a Work Item in one project, but the framework does not depend on GitHub or any other specific tracker to define the concept.

A Work Item should keep an objective, an expected outcome, a governing context, and a local lifecycle state explicit enough to be reviewed and resumed.

For canonical vocabulary, see:

- `docs/canonical-vocabulary.md`

#### Authoritative Layer

The layer responsible for the final critical decision.

If a backend exists, it usually plays this role.

But `AletheIA` does not depend on the word “backend” to exist.

The important rule is:

> critical validation must not live in a fragile or untrusted layer.

#### Execution Scope

The explicit boundary of a change.

It defines:

- what may be changed;
- what may not be changed;
- what type of operation is expected.

---

## Principles reinforced by this pack

1. clarity over speed;
2. control over automation;
3. consistency over convenience;
4. analysis before writing;
5. contract before implementation;
6. validation before completion.

---

## Governance areas covered

## 1. Pipeline

Ensures that work passes through:

- analysis;
- planning;
- execution;
- validation.

## 2. Scope Control

Ensures:

- one change per Work Item;
- explicit boundaries;
- prohibition of implicit expansion.

## 3. Context Awareness

Ensures:

- reading before writing;
- minimum analysis before code generation.

## 4. Contracts

Ensures:

- input/output definition;
- interface stability;
- blocking of implicit changes.

## 5. Security

Ensures:

- no secret exposure;
- critical validation in the authoritative layer;
- explicit confirmation for sensitive operations.

## 6. Validation

Ensures:

- post-execution validation;
- alignment with the source-of-truth artifact;
- regression protection.

## 7. Source-of-Truth Governance

Ensures:

- required updates when behavior changes;
- coherence between code and the reference artifact.

---

## Possible actions
