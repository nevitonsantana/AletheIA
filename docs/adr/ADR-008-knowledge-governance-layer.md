# ADR 008 — Knowledge Governance Layer

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-05-28 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR-004 (AletheIA as operating overlay), ADR-005 (Positioning in agentic ecosystem), ADR-006 (Domain agnosticism) |
| Supersedes | — |

## 1. Context

AletheIA already treats context as a governed resource (context graph, context packs, project-extension pattern). What it did not yet have was a vocabulary for **user-provided knowledge bases** — proprietary frameworks, internal policies, personas, design systems, research findings — used by agents and skills.

The recurring failure modes when this gap is left unaddressed:

- Skills start carrying proprietary content directly, losing portability.
- Users paste documents into prompts without scope, owner, version, sensitivity, or usage policy.
- Restricted text leaks into responses, logs, traces, and handoffs.
- Sources of very different authority (a persona vs. an accessibility guideline vs. a compliance policy) are treated as equivalent.
- There is no audit trail for *which* source influenced a decision.

A first concrete consumer (the Feature Value Governance Pack) made the gap unavoidable: it needs a strategic framework, personas, accessibility guidelines, and operating-model context — and none of those should be inlined into the skill.

## 2. Decision

Introduce a **Knowledge Governance Layer** as a structural extension of AletheIA, with the following non-negotiables:

1. **Knowledge is not raw context.** Every source is a governed object with `id`, `owner`, `version`, `sensitivity`, `authority_level`, `scope`, `retrieval_mode`, and usage policy.
2. **Skills declare types, not sources.** A skill says it needs a `proprietary_framework` or `accessibility_guideline`; the resolver picks the concrete pack under the active permissions and policy.
3. **Capsule-first.** The default unit of consumption is an operational capsule of the source, not the full source. Full source is the exception, not the rule.
4. **Sensitivity and authority are independent vocabularies.** A `regulated` persona is still a persona.
5. **Source precedence is framework-stable.** Compliance / security / privacy / mandatory accessibility outrank policies, operating model, strategy, interpretive frameworks, personas, benchmarks, and stakeholder input — in that order.
6. **Restricted use limits are policy, not preference.** Internal/confidential/restricted/regulated sources have explicit citation, exposure, export, and human-review rules.
7. **Every relevant use is auditable.** Source, version, scope, agent, skill, task, restrictions, conflicts, and outcome are logged.
8. **First phase is docs-only.** No vector DB, no runtime, no UI, no IAM/DLP. Schemas exist as conceptual contracts.

The layer ships as concepts, contracts, schemas, and generic examples in this repository, with a companion skill-side surface in Adaptive Skills (boundaries doc, templates, three governance skills).

## 3. Consequences

**Positive**
- Skills become portable: no proprietary residue inside reusable artifacts.
- User-provided knowledge gets a single, vendor-agnostic envelope (`knowledge_pack`).
- The resolver becomes the one place that adjudicates source eligibility and exposure — eliminating ad-hoc rules scattered across skills.
- Audit and conflict-resolution are first-class, not afterthoughts.
- Feature Value Governance — and any later consumer — can declare dependencies without coupling to one organization's framework.

**Negative / accepted tradeoffs**
- Onboarding a new knowledge source has overhead (manifest + capsule + classification). Mitigated by progressive maturity levels (`minimal | operational | governed`).
- A skill that needs governed knowledge cannot run knowledge-aware until at least one matching pack is registered. We treat this as a feature: loud refusal over silent fallback.
- The layer increases the conceptual surface area of AletheIA. Mitigated by keeping it strictly docs-only in phase one and by binding it to existing context discipline rather than replacing it.

## 4. Alternatives considered

- **Embed framework content directly into skills.** Rejected: destroys portability, makes auditing impossible, and forces every skill consumer to inherit one organization's content.
- **Treat knowledge as raw prompt context.** Rejected: no scope, no authority, no audit, no exposure control. The exact failure mode the layer exists to prevent.
- **Build a runtime registry + resolver implementation up front.** Rejected for phase one. The conceptual contracts must stabilize before code is committed; a premature implementation would foreclose vocabulary choices.
- **Bind the layer to a specific vector store or retrieval stack.** Rejected: violates vendor-agnosticism and ADR-006 (Domain agnosticism).
- **Put the Feature Value Governance Pack content inside the layer.** Rejected: the pack is a *consumer*, not the parent. The layer must not absorb one consumer's content.

## 5. Relationship

- Extends the context discipline introduced by the context-graph integration and the project-extension pattern.
- Provides the substrate for the Feature Value Governance Pack and any future consumer that needs proprietary or restricted knowledge.
- Pairs with the Adaptive Skills companion changes (skill-knowledge boundaries, templates, governance skills).
- Does not modify any existing contract or schema; only adds.

## 6. Review

This ADR should be revisited when any of the following becomes true:

- A runtime resolver implementation is proposed (would change "logical role" → contract).
- A vector store or retrieval-stack integration is on the table.
- Multiple consumers (beyond Feature Value Governance) exist and reveal gaps in the taxonomy or precedence policy.
- IAM, DLP, or formal IP governance are integrated and reshape the restricted-use policy.
- The `sensitivity` or `authority_level` vocabularies prove insufficient in practice.
