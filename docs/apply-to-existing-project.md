# Applying AletheIA to an Existing Project

## Goal

This guide explains how to introduce AletheIA into a project that already exists.

In simple terms:

You do not need to rebuild your project around the framework.
You only need to add enough structure to make AI-assisted work more explicit, reviewable, and reusable.

---

## Why start this way

Most teams will not adopt AletheIA on a blank repository.

They will adopt it inside a project that already has:

- a product in flight
- existing docs
- local conventions
- technical debt
- mixed human and AI workflows

That means adoption should begin with the smallest useful layer, not with a full rewrite.

---

## Recommended adoption order

### 1. Choose one real slice

Start with one flow, one feature area, or one repeated kind of work.

Good first candidates usually are:

- a small AI-assisted feature flow
- a review or approval flow
- a task type that suffers from context sprawl
- a part of the project where decisions are not clearly recorded

Avoid starting with the biggest or riskiest part of the system.

### 2. Define the local extension boundary

Before changing anything, make explicit:

- what is framework core
- what is project-local
- what language belongs only to this project

See also:

- `docs/project-extension-pattern.md`

### 3. Add the minimum operating layer

For a first adoption pass, this usually means:

- a small work-item discipline
- explicit scope boundaries
- a validation expectation
- a place to preserve durable learnings

You do not need full ceremony for everything.
You need enough ceremony to stop important work from becoming invisible.

### 4. Add the minimum governance baseline

Use the smallest checks that make the work safer and more reviewable.

Examples:

- a governance checklist
- a decision template
- a validation rule
- a small executable baseline if the repo is ready for it

### 5. Pilot first, then generalize

Do not generalize from theory alone.

Run the framework in one real slice.
Then ask:

- what helped?
- what was too heavy?
- what remained local?
- what should become reusable?

That is the start of the conversion loop.

See also:

- `docs/pilot-conversion.md`

---

## The minimum adoption set

If a team wants the smallest practical AletheIA starting point, begin with:

1. `docs/00-overview.md`
2. `docs/governance.md`
3. `docs/token-policy.md`
4. `docs/durable-decisions.md`
5. `docs/project-extension-pattern.md`
6. one starter-pack guide or template that matches the first pilot

This is often enough to begin without pretending the whole framework is already fully installed.

---

## What to keep local at first

At the beginning, keep these things local unless there is a strong reason to generalize them:

- product vocabulary
- file ownership rules
- branch conventions
- provider-specific rules
- local assistant behavior
- team-specific rituals

AletheIA should help make those things explicit.
It should not force them to become public framework rules too early.

---

## What to extract first

The first things worth extracting into reusable framework artifacts are usually:

- recurring decision patterns
- validation patterns
- governance boundaries
- small learnings that reduce repeated mistakes
- starter-pack templates that help future work start cleaner

---

## Good first-adoption signs

A first adoption is going well when:

- one real slice is clearer than before
- decisions are easier to review
- the team knows what stayed local and what became reusable
- AI-assisted work feels more explicit, not more theatrical

---

## What not to do

Do not start by:

- rewriting the whole repo around AletheIA
- turning every small edit into ceremony
- universalizing product-specific rules too early
- promising adoption before one real slice has worked

The framework should enter the project proportionally.

---

## Relationship to Alpha 3

Alpha 3 is about making AletheIA easier to adopt.

This guide is one of the first adoption-facing artifacts because it answers a practical question:

**How do I start if my project already exists?**

That question matters more than abstract completeness.

---

## Suggested next reading

After this guide, continue with:

1. `docs/project-extension-pattern.md`
2. `docs/self-application.md`
3. `docs/pilot-conversion.md`
4. `starter-pack/README.md`

If you already know the slice you want to pilot, go directly into the matching starter-pack guide or template.
