# Agentic ecosystem map

> **Synchronized document.** This file is maintained identically in two repositories:
> [`AletheIA/docs/concepts/ecosystem-map.md`](https://github.com/nevitonsantana/AletheIA/blob/main/docs/concepts/ecosystem-map.md)
> and [`adaptive-skills/docs/concepts/ecosystem-map.md`](https://github.com/nevitonsantana/adaptive-skills/blob/main/docs/concepts/ecosystem-map.md).
> Edits in either repo must be mirrored to the other. The plan that introduced this document is the 2026-05-21 cross-repo plan (Epic 1).

## Purpose

Place AletheIA and Adaptive Skills inside the broader 2026 ecosystem of agent-assisted work tooling, so that adopters can answer three questions without re-litigation:

1. *Does this duplicate something I already use?*
2. *Does this replace something I already use?*
3. *Where does this fit in my stack?*

## Layers

The ecosystem is organized by **what question each layer answers**, not by vendor or product family.

| Layer | Question it answers | Ecosystem solutions | This ecosystem |
|---|---|---|---|
| Open standards | How do components interoperate? | `AGENTS.md`, `agentskills.io`, MCP | Conformance target |
| Package distribution | How is content installed and versioned? | APM (Microsoft) | Both repos publish here |
| Operating overlay | How do we decide, validate, hand off, report? | — (under-occupied) | **AletheIA** |
| Capability library | What reusable, portable skills are available? | Anthropic skills, awesome-copilot, agentskills.io packs | **Adaptive Skills** |
| Squad-ready bundle | What pre-built agents do I drop into a squad? | BMAD, SDD, similar internal frameworks | Not built here |
| Brain / runtime | How is memory, hooks, autonomy managed? | Agentic Stack, Hermes | Not built here (deferred) |
| Harness | Where does the code actually execute? | Claude Code, Cursor, Codex, OpenCode, Gemini, Windsurf, etc. | Consumer of the layers above |

## Differentiated value

**AletheIA** occupies the *operating overlay* layer — under-occupied today. The other layers either delegate governance elsewhere (standards, package managers, runtimes, capability libraries) or concentrate it inside a specific framework (squad bundles). AletheIA externalizes governance as a portable layer that travels with the consumer project, independent of which framework, runtime, or harness is in use.

**Adaptive Skills** occupies the *capability library* layer — populated but fragmented. The differentiator is conformance with open standards (`agentskills.io`, AGENTS.md) plus a governed evolution discipline (no skill self-edits; protected surfaces; observation → proposal → review).

**Together** they provide a *governance overlay + capability library* combination that plugs into any squad setup without replacing the squad's existing framework. The two are usable independently — neither is a hard dependency of the other.

## Relationship to adjacent solutions

| Adjacent solution | Layer | Relationship |
|---|---|---|
| BMAD | Squad-ready bundle | **Complementary.** Keep BMAD; add AletheIA on top for governance; reference Adaptive Skills for portable capabilities. |
| SDD-style internal framework | Squad-ready bundle | Same as BMAD. |
| APM | Package distribution | **Consumed by.** Both repos are published as APM packages. |
| Hermes / Agentic Stack | Brain / runtime | **Different layer.** No competition; AletheIA shapes contracts that cross the runtime boundary. |
| Anthropic skills, awesome-copilot | Capability library | **Adjacent.** Adaptive Skills aims for `agentskills.io` conformance so artifacts are interoperable. |
| Claude Code, Cursor, Codex, etc. | Harness | **Consumer.** Receives shims and projected artifacts; does not negotiate the contract. |

## What this map deliberately does not say

- It does not rank the layers by importance — each answers a distinct question.
- It does not claim AletheIA + Adaptive Skills is sufficient for every squad. A squad without BMAD/SDD/equivalent still has to decide *which agents* to run; this ecosystem governs *how the work the agents do* is operated.
- It does not claim domain coverage. Domain agnosticism is declared (see ADR-006 in AletheIA, ADR-002 in Adaptive Skills); observable agnosticism is a work item (Epic 2 of the cross-repo plan).

## Source ADRs

- AletheIA: [ADR-004 — Operating overlay](../adr/ADR-004-aletheia-as-operating-overlay.md), [ADR-005 — Positioning in agentic ecosystem](../adr/ADR-005-positioning-in-agentic-ecosystem.md), [ADR-006 — Domain agnosticism](../adr/ADR-006-domain-agnosticism.md).
- Adaptive Skills: [ADR-001 — Adaptive Skills as capability library](https://github.com/nevitonsantana/adaptive-skills/blob/main/docs/adr/ADR-001-adaptive-skills-as-capability-library.md), [ADR-002 — Domain agnosticism](https://github.com/nevitonsantana/adaptive-skills/blob/main/docs/adr/ADR-002-domain-agnosticism.md), [ADR-003 — Relationship with AletheIA](https://github.com/nevitonsantana/adaptive-skills/blob/main/docs/adr/ADR-003-relationship-with-aletheia.md).

## Revision

This map updates when the ecosystem itself shifts (new consolidated layer, layer collapse, new dominant standard). Routine updates to a single solution within a layer do not require a new revision — only the table cell.
