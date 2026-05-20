# Preset Taxonomy

## Goal

This document defines a first concrete taxonomy for AletheIA presets.

In simple terms:

if Alpha 6 is going to package AletheIA for different project shapes,
it needs a clearer idea of what kinds of preset should exist before any heavier tooling appears.

---

## Why this matters

AletheIA already has a stronger core, better adoption materials, a handoff baseline, and an experimental inference baseline.

The next distribution question is not only:

**how do we package the framework?**

It is also:

**what kinds of package should exist without turning into incompatible forks?**

A preset taxonomy exists to answer that question before any installer, CLI, or adapter layer becomes heavier.

---

## Core idea

A preset should be understood as:

**a curated distribution shape for a recurring project context**

A preset is not a new framework.
It is not a fork of the core.
It is not a domain governance pack.

A preset should decide things such as:

- which public docs matter most first
- which starter-pack assets should be emphasized
- which optional layers are recommended or postponed
- which adoption posture is the best default for that project shape

The preset should not redefine the core meaning of AletheIA.

---

## Three preset layers

AletheIA presets should eventually vary along three axes:

### 1. Project shape

What kind of project is this?

Examples:

- web application
- AI product
- constrained workflow
- lightweight internal tool

### 2. Operating depth

How much structure should be emphasized at the start?

Examples:

- lite
- standard
- fuller operating mode

### 3. Delivery surface

Where will the preset be delivered?

Examples:

- repo reading order
- starter-pack bundle
- editor or agent adapter
- future bootstrap tooling

This doc focuses mainly on the first axis: project shape.

---

## First preset families

### 1. Core Starter preset

Use when the main goal is:

- understanding the framework
- testing the operating model lightly
- avoiding too much ceremony early

This preset should emphasize:

- getting started
- overview
- governance baseline
- token policy
- quality baseline
- small starter-pack usage

This is the closest preset to a lightweight orientation path.

### 2. Existing Project Adoption preset

Use when the main goal is:

- applying AletheIA inside a repo that already exists
- making local extension boundaries explicit
- adding discipline without starting from scratch

This preset should emphasize:

- `docs/apply-to-existing-project.md`
- contribution boundaries
- project extension template
- starter-pack usage around real work

### 3. Multi-Agent Continuity preset

Use when the main goal is:

- continuity across more than one agent or environment
- explicit restart packages
- safer ownership transfer between agents

This preset should emphasize:

- Alpha 4 handoff docs
- handoff template
- handoff generation guide
- project-level handoff conventions
- handoff capture pattern

### 4. Risk-Aware Delivery preset

Use when the main goal is:

- improving decision quality in higher-risk work
- making semantic risk more reviewable before execution
- keeping validation more tightly linked to the real risk surface

This preset should emphasize:

- Alpha 5 concept doc
- inference artifact template
- trigger guidance
- generation guide
- pilot scenarios
- example artifacts

### 5. Security-Sensitive preset

Use when the main goal is:

- emphasizing stronger trust boundaries from the start
- making domain-specific security concerns explicit early
- preparing the repo for reusable governance packs where risk justifies them

This preset should emphasize:

- governance baseline
- durable decision discipline
- handoff boundaries
- Alpha 5 inference posture for higher-risk work
- future domain governance packs for web security and AI agent security

This preset should remain careful not to imply that those future packs are already active enforcement layers.

---

## A tangible selection example

See:

- `examples/distribution/constrained-adoption-mapping.md`

That example shows how a project can choose:

- an **existing project adoption** preset
- a **repo-native + agent-instruction** adapter combination
- a **standard** adoption mode

without treating those choices as a fork of the framework.

---

## What a preset should not do

A preset should not:

- redefine the AletheIA core
- replace the roadmap phases with packaging language
- silently import one tool vendor's assumptions into framework truth
- turn domain-specific packs into mandatory defaults for every team
- promise a complete install experience before Alpha 7 exists

---

## Relationship to domain governance packs

A preset and a domain governance pack are not the same thing.

### Preset

A curated way of packaging the framework for a project shape.

### Domain governance pack

A reusable governance layer for a recurring domain-specific trust or risk model.

A preset may point to a domain governance pack.
But it should not collapse the two concepts into one.

---

## Good signs

The preset taxonomy is healthy when:

- different project shapes can be described without distorting the core
- preset choice feels like packaging, not ideology
- teams can choose an entry shape without being forced into maximum ceremony
- future adapters and tooling have a clearer model to target

---

## Suggested next reading

- `docs/distribution-presets-adapters.md`
- `docs/adoption-mode-guidance.md`
- `docs/project-extension-pattern.md`
- `examples/distribution/constrained-adoption-mapping.md`
- `docs/roadmap-alpha.md`
