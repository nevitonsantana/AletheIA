# AletheIA Token Policy

## Goal

This document makes token discipline explicit inside AletheIA.

In simple terms:

the framework should not read everything by default.
It should read only what is needed for the current step, with a visible budget and a reason.

---

## Why token policy exists

Without explicit token discipline, AI-assisted workflows tend to drift into:

- oversized cold boots
- unnecessary file reads
- repeated context expansion
- expensive handoffs
- weak explainability about why so much context was pulled in

That creates three kinds of waste:

1. **cost waste**
2. **attention waste**
3. **decision waste**

AletheIA treats token usage as an operating concern, not only a pricing concern.

---

## Principle

> Context should be pulled in proportion to the decision being made.

This means:

- simple tasks should stay small
- ambiguity should justify expansion
- handoffs should carry only the minimum durable context
- large context should be an explicit choice, not the default behavior

---

## The five token moments

### 1. Cold boot

The first context load for a task or session.

Goal:
- understand the task
- identify the dominant front
- decide whether deeper exploration is necessary

Rule:
- start with the smallest context that can still support a safe first decision

Typical contents:
- task brief
- one source-of-truth artifact
- the most relevant file or contract

---

### 2. Exploration

Additional context loaded to reduce ambiguity before execution.

Goal:
- understand dependencies
- inspect neighboring files
- check existing patterns

Rule:
- exploration must be justified by a concrete uncertainty

Good reasons:
- contract is unclear
- routing depends on another module
- prior decision may constrain the change

Bad reasons:
- “maybe it will be useful”
- “read everything just in case”

---

### 3. Expansion

Context added because the task crosses a boundary or becomes structurally more complex.

Goal:
- support a bigger decision without losing control

Rule:
- expansion should happen only when the task clearly stopped being local

Typical triggers:
- contract change
- multi-front impact
- governance-sensitive change
- decision that requires triad-style arbitration

---

### 4. Delegation

Context prepared for a subagent, worker, or parallel lane.

Goal:
- give enough context for execution
- avoid sending the whole parent thread by reflex

Rule:
- delegated context must be narrower than the main thread whenever possible

Good delegation pack:
- objective
- scope
- files owned
- constraints
- expected output

---

### 5. Handoff

Context preserved for future continuation.

Goal:
- make resumption possible without replaying the full history

Rule:
- handoff should preserve decisions, boundaries, and next steps — not transcript bulk

Good handoff content:
- what changed
- why it changed
- what remains open
- risks or caveats
- relevant files

---

## Budget model

This first alpha does not enforce token counting at runtime.

Instead, it defines a **policy budget model** that future implementations can interpret.

### Budget levels

#### Minimal

Use when:
- task is local
- scope is clear
- decision is low risk

Expected behavior:
- read only the core artifact(s)
- avoid large neighboring exploration

#### Moderate

Use when:
- task is still bounded, but ambiguity exists
- one or two adjacent modules matter

Expected behavior:
- allow targeted exploration
- keep expansion local

#### Extended

Use when:
- task crosses fronts
- contract or governance impact is real
- more structured arbitration is needed

Expected behavior:
- allow broader context packs
- document why expansion happened

---

## Policy expectations by moment

| Moment | Default budget | Escalation trigger |
|---|---|---|
| Cold boot | Minimal | task unclear or source-of-truth insufficient |
| Exploration | Minimal -> Moderate | unresolved ambiguity after first read |
| Expansion | Moderate | cross-boundary or structural change |
| Delegation | Minimal per worker | subtask cannot be executed safely without extra context |
| Handoff | Minimal | only expand if future resumption would otherwise be unsafe |

---

## Practical rules

### Rule 1 — Do not front-load context

Do not read a large set of files before knowing whether they matter.

### Rule 2 — Expansion needs a reason

Every meaningful context expansion should be explainable in one sentence.

### Rule 3 — Handoff is not transcript replay

Preserve decisions and next steps, not the full narrative.

### Rule 4 — Delegation should reduce, not duplicate, context

Subagents should not receive the full parent scope unless absolutely necessary.

### Rule 5 — Token discipline supports governance

Oversized context is not only inefficient; it also makes decision quality harder to audit.

---

## Relationship to model strategy

Token policy and model strategy are related, but they are not the same thing.

- `docs/token-policy.md` answers: **how much context and cost expansion is justified?**
- `starter-pack/guides/model-strategy-by-task.md` answers: **what kind of model fit and reasoning depth are proportional to this task?**

Both layers should reinforce each other.
Neither one should silently replace the other.

---

## Relationship to the rest of AletheIA

This policy connects directly to:

- `Context Pack`
- `Decision Record`
- `Execution Scope`
- `Handoff Record`
- `Learning Record`

In future iterations, token policy can become:

- a governance check
- a warning surface
- a technical enforcement baseline

But in Alpha 1, its main role is to make context discipline explicit and reusable.

---

## What Alpha 1 should prove with this policy

By adding token policy, AletheIA should show that:

- context discipline is intentional
- large context is not the silent default
- handoffs can stay small and durable
- delegation can be scoped instead of copied wholesale
- governance and token usage can reinforce each other

---

## Future evolution

Later versions may add:

- executable budget checks
- context-pack size warnings
- policy trace for expansion reasons
- project-specific token extensions

Alpha 1 does not need all of that.

It only needs to prove that token discipline can be:

- explicit
- teachable
- reusable
- aligned with the operating loop
