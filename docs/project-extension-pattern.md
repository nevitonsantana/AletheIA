# AletheIA Project Extension Pattern

## Goal

This document explains how a real project can extend AletheIA without turning the framework into a copy of that project.

In simple terms:

AletheIA should provide a stable core,
while each project should be free to add a local operating layer on top of that core.

---

## Why this matters

Alpha 2 is not only about proving the framework in a real pilot.

It is also about proving that:

- the pilot does not become the framework
- project-specific language does not silently replace reusable language
- teams can adapt AletheIA locally without forking its logic into incompatible shapes

Without an explicit extension pattern, two problems appear quickly:

- the framework becomes too generic to help real projects
- or it becomes too contaminated by the first project that shaped it

The extension pattern exists to hold that boundary.

---

## Core idea

AletheIA should be understood as two layers:

### 1. Framework core

The reusable layer.

This includes things such as:

- operating principles
- governance concepts
- token discipline
- durable decision discipline
- quality and validation expectations
- starter-pack operating patterns
- pilot conversion logic

### 2. Project extension

The local layer.

This includes things such as:

- product-specific thread labels
- local ownership maps
- branch conventions for a given team
- domain terminology
- provider choices
- local handoff patterns
- risk policies that depend on the project context

The framework core should stay recognizable even when the project extension changes.

---

## The extension question

When a project adds a local rule, ask:

**is this a framework principle, or a project extension?**

That question matters because not every useful rule belongs in the public framework.

Some things should stay local because they depend on:

- one product
- one team structure
- one stack
- one risk model
- one operating context

The right goal is not to remove local adaptation.

The right goal is to keep local adaptation explicit.

---

## What belongs in the framework core

A rule or artifact belongs in the framework core when it is:

- reusable across more than one project shape
- still valid after removing one product's vocabulary
- more about operating discipline than local implementation detail
- useful as a teaching artifact for adopters

Examples:

- token policy
- enforcement boundaries
- durable decision discipline
- self-application loop
- pilot-to-framework conversion logic

---

## What belongs in a project extension

A rule or artifact belongs in a project extension when it depends strongly on the local context.

Examples:

- a product-specific assistant like Cris
- local file ownership agreements between Codex and Claude
- domain thread labels used by one team
- provider-specific trust rules
- local merge conventions tied to a repo or org

These can still be rigorous.

They just should not be mistaken for universal framework truth.

---

## The minimum extension pattern

A small project extension should be able to answer four things:

### 1. What local context exists?

Examples:

- product name
- team roles
- thread taxonomy
- repo boundaries

### 2. What local rules exist on top of the core?

Examples:

- ownership maps
- branch discipline
- domain glossary
- escalation expectations

### 3. What remains framework core?

Make the shared layer explicit.

### 4. What pilot learnings might later generalize?

Some local rules are only local.
Some may eventually become framework artifacts.

That distinction should remain reviewable.

---

## Crisis Monitor example

The Crisis Monitor work is a good example of a project extension.

It contains local patterns such as:

- Cris-specific operating behavior
- thread labels tied to crisis management work
- ownership boundaries between Codex and Claude Code
- domain-specific routing, audit, and approval semantics

Those details are useful and real.

But AletheIA should not pretend they are universally required.

Instead, the framework should extract only the reusable logic from them.

For example:

- decision explicability as a principle may generalize
- one product's exact routing fields probably do not

This is the discipline the extension pattern is meant to support.

---

## Relationship to pilots and self-application

The project extension pattern connects directly to the other Alpha 2 artifacts.

- `docs/pilot-crisis-monitor.md` shows a real project context
- `docs/self-application.md` shows how the framework evolves itself
- `docs/pilot-conversion.md` shows how pilot evidence becomes framework change

The extension pattern adds the missing boundary:

**what stays local, and what becomes core?**

That question is essential if Alpha 2 is going to prove real reuse.

---

## Good Alpha 2 signs

Alpha 2 is going well when:

- a project can extend AletheIA without rewriting its core language
- local rules are documented as local rules
- reusable principles are extracted without dragging all pilot residue with them
- the framework stays recognizable across different project contexts

---

## What Alpha 2 should prove with this

By adding the project extension pattern, AletheIA should show that:

- the framework can survive outside its first pilot
- local rigor does not require framework contamination
- reuse can happen through explicit layering rather than vague generalization

---

## Future evolution

Later versions may add:

- a starter-pack template for project extensions
- explicit project-extension examples
- mapping between local rules and reusable core rules
- more than one pilot to compare extension patterns across projects

Alpha 2 does not need all of that yet.

It only needs to make the extension boundary visible and teachable.
