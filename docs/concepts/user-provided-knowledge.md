# User-Provided Knowledge

## Goal

Describe how a user or project can add a knowledge base for use by agents and skills **without** that addition turning into a document dump in the prompt.

This is the human-side surface of the [Knowledge Governance Layer](knowledge-governance-layer.md).

---

## What "adding knowledge" means

When a user attaches a framework, policy, persona pack, research report, or design guideline to a project, they are doing four things at once — even if the UI hides it:

1. **declaring a source** (file, link, internal doc)
2. **claiming a purpose** (what tasks it should inform)
3. **classifying it** (sensitivity, authority, owner)
4. **constraining its use** (citation, exposure, export)

If only step 1 happens, the system has a document. It does not have governed knowledge.

---

## What user-provided knowledge is not

- It is not a system prompt extension.
- It is not raw paste into agent context.
- It is not a memory store.
- It is not a fine-tuning dataset.
- It is not an authority override for compliance, security, or accessibility sources.

---

## The minimum a user provides

To register a base, the user supplies (or is asked for) at least:

- a short name and id
- a type (see source taxonomy in [knowledge-source-contract](../contracts/knowledge-source-contract.md))
- an owner
- a sensitivity level
- an authority level
- a scope (which task families this source is allowed to inform)
- a retrieval mode preference (capsule-first, excerpt-only, etc.)
- a usage policy (citation, exposure, export)

This is captured in a [knowledge pack manifest](../contracts/knowledge-pack-manifest.md).

---

## Why not just paste the document

Pasting bypasses every guardrail this layer exists for:

- no version, no rollback when the document changes
- no owner, no review cycle
- no scope, so the document influences tasks it should not
- no authority level, so a persona suggestion can outrank an accessibility rule
- no audit, so no one can answer "what did this source change?"
- no exposure limit, so restricted text can land in logs, traces, and handoffs

A document without manifest is a leak waiting for a trigger.

---

## Progressive maturity

A user does not need a full manifest on day one. The system should accept:

| Level | What the user provides | What the system can do |
|---|---|---|
| **0 — Unregistered** | nothing | refuse to use as governed source |
| **1 — Minimal** | id, owner, sensitivity, scope | use only in low-risk tasks, no citation, no export |
| **2 — Operational** | + authority level, retrieval mode, capsule | use in declared scope with capsule-first |
| **3 — Governed** | + usage policy, review cycle, audit fields | full participation under the resolver |

A skill that requires governed knowledge should be unable to bind to a level-0 source. A skill that accepts minimal sources should mark its output with an *uncertainty / lower-authority* signal.

---

## Failure modes to make visible

When user-provided knowledge cannot be used safely, the system must say so — not silently swap to a generic mode:

- *"This source is not registered. Either register it or proceed in generic mode."*
- *"This source has authority `interpretive` but the task requires a `mandatory` source. Cannot proceed without a higher-authority anchor."*
- *"This source is `confidential`. It cannot be cited verbatim in an external-facing deliverable. Capsule-only mode applied."*

Loud refusal is a feature.

---

## See also

- [framework-capsules](framework-capsules.md)
- [knowledge-resolver](knowledge-resolver.md)
- [knowledge-pack-manifest](../contracts/knowledge-pack-manifest.md)
- [restricted-knowledge-usage-policy](../contracts/restricted-knowledge-usage-policy.md)
