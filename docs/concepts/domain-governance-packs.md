# Domain Governance Packs

## Goal

This document explains a future track for reusable domain governance packs in AletheIA.

In simple terms:

some governance patterns are too domain-specific to live in the framework core,
but too reusable to remain only as project-local rules.

---

## Why this layer exists

AletheIA already has a growing reusable core.

That core covers things such as:

- decision structure
- governance hooks
- validation expectations
- learnings
- handoff discipline
- structured risk inference direction

Real projects still need domain-specific governance on top of that.

Examples:

- web app security
- trust boundaries in multi-tenant products
- agent security
- prompt injection resistance
- tool-use hardening

If all of that is pushed into the framework core, the core becomes too heavy.

If all of that stays purely local, reuse is lost.

Domain governance packs exist to hold that middle layer.

---

## Where this layer sits

AletheIA should eventually be understood as three layers:

### 1. Framework core

The reusable baseline.

Examples:

- governance concepts
- token discipline
- durable decisions
- quality and validation expectations
- handoff structure
- structured risk inference direction

### 2. Domain governance pack

The reusable domain layer.

Examples:

- web app security and trust boundaries
- AI agent security and prompt injection resistance
- future domain-specific governance packs that can be reused across more than one project

### 3. Project extension

The local layer.

Examples:

- one product's ownership map
- one team's branch rules
- one repo's provider choices
- one assistant's local operating behavior

The intended relationship is:

`AletheIA core -> domain governance pack -> project extension`

---

## What a domain governance pack is

A domain governance pack is a reusable operating layer for a specific class of risks, boundaries, and trust assumptions.

It should help answer questions such as:

- what should remain authoritative in this domain?
- what is safe or unsafe by default?
- what boundaries matter most?
- what should be treated as trusted versus untrusted?
- what kinds of validation or escalation should happen before closure?

A domain governance pack is not required to begin as executable enforcement.

It can begin as:

- a public framing document
- reusable operating guidance
- candidate evaluation scenarios
- future template or checklist direction

---

## What a domain governance pack is not

A domain governance pack is not:

- a replacement for the framework core
- a project-local operating manual disguised as reusable truth
- a vendor-specific implementation guide
- a new Alpha phase by itself
- a promise that technical enforcement already exists

The right goal is reusable domain discipline, not premature universality.

---

## When something deserves a pack

A pattern deserves to become a reusable domain governance pack when it is:

- recurring across more than one project shape
- still meaningful after removing one product's vocabulary
- strongly tied to a domain-specific trust model or risk model
- useful enough to teach as a reusable layer
- likely to benefit from future examples, templates, or evaluation scenarios

A pattern should probably stay project-local when it depends mostly on:

- one product
- one team's workflow
- one provider choice
- one repository structure
- one assistant's local behavior

---

## Relationship to the roadmap

This future track connects to the current roadmap in a specific way.

### Alpha 1

Provides the generic governance baseline.

### Alpha 3

Creates the opening for reusable domain governance packs without forcing them into the core too early.

### Alpha 4

Contributes execution boundaries, restart-package logic, semantic guardrails, and safer continuity between agents.

### Alpha 5

May later strengthen higher-risk decisions inside domain packs through selective structured inference.

Domain governance packs should therefore be understood as a future extension layer,
not as a replacement for those phases.

---

## First planned packs

The first planned packs in this future track are:

### 1. Web App Security & Trust Boundaries Pack

This pack would focus on things such as:

- client versus server separation
- secrets and credentials
- auth and data isolation patterns
- tenant-scoped context assembly
- runtime hardening
- inbound integration trust
- logging and artifact hygiene
- untrusted content handling

### 2. AI Agent Security & Prompt Injection Pack

This pack would focus on things such as:

- instruction trust hierarchy
- trusted versus untrusted content
- prompt injection resistance
- monitoring content as untrusted input
- tool permissioning and least privilege
- retrieval and memory safety
- refusal and escalation boundaries
- adversarial evaluation scenarios

---

## Good signs

This future track is going well when:

- domain-specific guidance becomes more reusable without bloating the core
- packs remain provider-agnostic and teachable
- project-local rules remain clearly local
- the framework stays recognizable even as domain coverage grows

---

## Risks

The main risks are:

- turning one product's security habits into framework truth
- importing vendor-specific language too early
- pretending a future pack is already technically enforced
- letting domain packs quietly replace the core operating model

---

## Mitigations

This future track should reduce those risks by:

- clearly labeling the packs as future reusable layers
- keeping them separate from the framework core
- writing them in vendor-agnostic language
- treating enforcement as a later question, not an implied claim
- preserving the boundary between reusable pack and project extension

---

## Suggested next reading

- `docs/roadmap-alpha.md`
- `docs/governance.md`
- `docs/project-extension-pattern.md`
- `docs/agent-handoffs.md`
- `docs/structured-risk-inference.md`
