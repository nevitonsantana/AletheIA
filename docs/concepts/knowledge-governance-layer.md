# Knowledge Governance Layer

## Goal

Define a layer that lets users and projects register knowledge bases (frameworks, policies, personas, research, design systems, guidelines) for use by agents and skills **without** coupling proprietary content to skills and **without** turning internal documents into raw prompt context.

This layer is an extension of AletheIA's existing context discipline. It evolves the idea of *context packs* into *knowledge packs* governed by registry, manifest, precedence, and audit.

---

## Problem

Without explicit governance over knowledge sources, four failure modes appear quickly:

- skills start carrying proprietary content directly
- internal sources are pulled wholesale into prompts
- restricted documents leak into responses, logs, or handoffs
- sources of very different authority are treated as equivalent

The problem is not that users add knowledge. The problem is that they add it without scope, owner, version, sensitivity, authority, or usage policy.

---

## Principles

1. **Knowledge is not raw context.** Every source is a governed object with metadata.
2. **Skills declare dependencies; they do not carry content.** A skill states the *type* of knowledge it needs, not the document itself.
3. **AletheIA resolves access and risk.** Decisions about which sources may be used in which task by which agent stay in the framework, not in the skill.
4. **Capsule first.** Prefer an operational capsule of a source over the full source.
5. **Minimum sufficient context.** Retrieve only the slice required for the task.
6. **Sources differ in authority.** Compliance, normative guidelines, strategy, interpretive frameworks, personas, benchmarks, and stakeholder input do not weigh equally.
7. **Restricted sources require exposure limits.** Internal, confidential, regulated, or proprietary content must not be reproduced or exported without authorization.
8. **Every relevant use is auditable.** When a source influences a recommendation or decision, the system records source, version, scope, agent, skill, task, and outcome.

---

## Scope

### In scope (this layer, docs-only)

- a registry concept for knowledge sources
- a manifest for knowledge packs
- a contract for how skills declare knowledge dependencies
- precedence policy between sources
- usage policy for restricted sources
- a conceptual knowledge resolver
- audit log specification
- examples that are generic and safe

### Out of scope (for this phase)

- a real vector database
- a UI for uploads and management
- IAM, SSO, or DLP integration
- fine-tuning with internal content
- formal IP governance
- runtime enforcement code

These remain future evolutions and must not block the documental groundwork.

---

## Relationship to context discipline

AletheIA already treats context as a governed resource (see [context-graph-integration](context-graph-integration.md) and the *project-extension* pattern). The Knowledge Governance Layer is a continuation, not a replacement:

| Concern | Existing layer | This layer adds |
|---|---|---|
| What to read | context graph, context packs | knowledge packs with manifest |
| Why a source is allowed | task scope | source ownership, sensitivity, authority |
| How much to read | minimum sufficient context | capsule-first, retrieval modes |
| Where conflicts go | durable decisions | source precedence policy |
| Trail of use | telemetry | knowledge audit log |

A skill operating in *knowledge-aware mode* reuses the same minimum-sufficient-context posture; it just gets its candidate sources from a governed registry instead of an unbounded document pool.

---

## Relationship to the Feature Value Governance Pack

The Feature Value Governance Pack is **the first consumer** of this layer, not its parent. The two have distinct responsibilities:

| Concern | Owned by |
|---|---|
| Declaring which knowledge a feature analysis needs | Feature Value Governance (skill side) |
| Resolving which sources fill those slots | Knowledge Governance Layer (AletheIA) |
| Governing exposure, citation, audit, conflict | Knowledge Governance Layer (AletheIA) |
| Executing the analysis | Adaptative Skills |

The content of the Feature Value Governance Pack does **not** move into this layer. The pack continues to live where it lives; it gains a knowledge-dependency declaration and consumes whatever framework, persona, and policy packs the resolver authorizes for its tasks.

---

## Limits

- This layer does not decide whether a source is *true*. It decides whether a source may be *used*, *cited*, *summarized*, or *exposed* in a given task.
- This layer does not replace human judgment for high-impact decisions; it routes those to review.
- This layer does not move enterprise-specific rules into framework core. Specific frameworks, policies, and personas live in project extensions.

---

## See also

- [user-provided-knowledge](user-provided-knowledge.md)
- [framework-capsules](framework-capsules.md)
- [knowledge-resolver](knowledge-resolver.md)
- [knowledge-source-contract](../contracts/knowledge-source-contract.md)
- [knowledge-pack-manifest](../contracts/knowledge-pack-manifest.md)
- [source-precedence-policy](../contracts/source-precedence-policy.md)
- [restricted-knowledge-usage-policy](../contracts/restricted-knowledge-usage-policy.md)
- [knowledge-audit-log-spec](../contracts/knowledge-audit-log-spec.md)
