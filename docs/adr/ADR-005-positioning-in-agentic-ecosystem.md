# ADR 005 — AletheIA: positioning in the agentic ecosystem

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-05-21 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR-004 (AletheIA as operating overlay), ADR-006 (Domain agnosticism) |
| Supersedes | — |

## 1. Context

ADR-004 fixed AletheIA's internal boundary (overlay vs. product vs. harness). It did not place AletheIA inside the **external** ecosystem of agentic tooling that consolidated through Q1–Q2 2026.

By mid-2026 the ecosystem has visible, distinct layers:

- **Open standards** for interop: [`AGENTS.md`](https://agents.md/), [`agentskills.io`](https://agentskills.io/), [MCP](https://modelcontextprotocol.io/).
- **Package distribution**: [APM](https://microsoft.github.io/apm/) (Microsoft).
- **Squad-ready bundles**: BMAD, SDD-style internal frameworks.
- **Brain / runtime**: Agentic Stack, Hermes.
- **Capability libraries**: Anthropic skills, awesome-copilot, agentskills.io packs, [Adaptive Skills](https://github.com/nevitonsantana/adaptive-skills).
- **Harnesses**: Claude Code, Cursor, Codex, OpenCode, Gemini, Windsurf, etc.

Without an explicit position statement, AletheIA gets confused with each adjacent layer ("is this another BMAD?", "is this a runtime?", "is this a package?"). The cost of re-explaining the boundary in every conversation already exceeds the cost of fixing it.

## 2. Decision

**AletheIA is an operating overlay in the ecosystem sense as well: a portable layer that governs *how* agent-assisted work happens, agnostic to which framework, runtime, harness, or domain is below.**

### 2.1 Ecosystem map

| Layer | Question it answers | Ecosystem solution | AletheIA's relationship |
|---|---|---|---|
| Open standards | How to interoperate? | `AGENTS.md`, `agentskills.io`, MCP | **Conforms** (consumer of standards) |
| Package distribution | How to install and version? | APM | **Consumed by** (AletheIA is published as an APM package) |
| Operating overlay | How to decide, validate, hand off, report? | — (under-occupied niche) | **This is AletheIA** |
| Capability library | Reusable portable skills? | Anthropic skills, awesome-copilot, [Adaptive Skills](https://github.com/nevitonsantana/adaptive-skills) | **References** (overlays can call skills; skills are independent) |
| Squad bundles | Pre-built agents for a squad? | BMAD, SDD | **Complementary** — runs alongside, does not replace |
| Brain / runtime | Memory, hooks, autonomy? | Agentic Stack, Hermes | **Different layer** — overlay sits above runtime concerns |
| Harness | Where to execute? | Claude Code, Cursor, Codex, etc. | **Consumer of overlay output** — receives shims, not contracts |

### 2.2 Non-competition statements (normative)

- AletheIA **does not compete with** BMAD, SDD, or similar squad-ready bundles. Those bundles ship agents; AletheIA governs how the work those agents do is decided, validated, handed off, and reported. An adopter can keep BMAD/SDD and add AletheIA on top.
- AletheIA **does not compete with** APM. AletheIA is published *via* APM; APM is the distribution mechanism, AletheIA is the content.
- AletheIA **does not compete with** Hermes, Agentic Stack, or other runtime/brain layers. Those persist sessions, hooks, autonomy; AletheIA shapes the contract that crosses the runtime boundary, not the boundary itself.
- AletheIA **does not compete with** Adaptive Skills. Skills are reusable capabilities; AletheIA can call them, an adopter can use either without the other. See ADR-003 in the Adaptive Skills repo for the mirror of this statement.

### 2.3 Value proposition (positioning summary)

AletheIA occupies the *operating overlay* layer — the layer the ecosystem under-serves today. Every other layer assumes governance happens "somewhere else": standards do not legislate it, package managers do not enforce it, runtimes do not own it, capability libraries do not embody it, and squad bundles concentrate it inside their own framework. AletheIA externalizes governance as a portable layer that travels with the consumer project, independent of which agent framework, runtime, or harness is in use.

## 3. Consequences

**Positive.** Pitch becomes one sentence: "governance overlay, framework-agnostic, runs alongside BMAD/SDD/anything." Adopters who already invested in a squad framework do not have to abandon it. APM publication path is unblocked. Risk of being read as "yet another framework" is bounded.

**Negative.** "Overlay" is conceptually less immediate than "bundle of agents you install"; education cost on first conversation. Some adopters who want a turnkey squad framework will see AletheIA as too abstract for their need — that is the correct read and they should use a bundle instead.

**Accepted tradeoff.** Smaller surface, sharper differentiation, lower risk of duplication.

## 4. Alternatives considered

- **A. Build a squad bundle (BMAD-style).** Rejected — duplicates existing solutions, no differentiated value, contradicts ADR-004's overlay boundary.
- **B. Position as a BMAD/SDD competitor.** Rejected — unfavorable terrain (BMAD has community traction); also factually wrong, since the layer differs.
- **C. Position as a runtime / brain.** Rejected — collapses overlay into runtime, contradicting ADR-004.
- **D. Stay silent on positioning and let adopters infer.** Rejected — re-litigation cost across conversations already exceeds the cost of this ADR.

## 5. Relationship

ADR-004 fixed the *internal* layering (overlay vs. product vs. harness). This ADR fixes the *ecosystem* layering. ADR-006 fixes the orthogonal axis: domain agnosticism. The 2026-05-21 cross-repo plan (Epic 4) consumes this ADR as prerequisite for APM packaging. [`docs/concepts/ecosystem-map.md`](../concepts/ecosystem-map.md) is the public-facing mirror of section 2.1.

## 6. Review

Reopen when:

- BMAD, SDD, or a comparable bundle starts shipping a native governance overlay layer with similar properties → re-evaluate whether the niche is still distinct.
- Adopters report at volume that they read AletheIA as a competitor of BMAD/SDD despite the positioning text → revise the framing or the artifact, not the decision.
- A consolidated open standard for "operating overlay" appears (does not exist as of 2026-05) → align or supersede.
- The cited adjacent layers (APM, MCP, AGENTS.md) consolidate or fragment in ways that change the map → update section 2.1 first; reopen ADR only if the boundary itself moves.

If a review confirms the decision unchanged, record the confirmation date here and continue.
