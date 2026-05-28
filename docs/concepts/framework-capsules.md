# Framework Capsules

## Goal

Define the **capsule**: an operational summary of a knowledge source — typically a proprietary framework, a policy document, or any source large enough that loading it whole would be wasteful or risky.

A capsule is the default unit a skill consumes. The full source is consulted only when the task and the source's retrieval mode allow it.

---

## What a capsule is

A capsule is a structured, short document that answers, for one source:

- what is this source for
- when should it be used
- when should it **not** be used
- the small set of concepts an agent needs to reason with it
- the key questions it prompts
- the criteria for applying it
- the limits of its applicability
- signals that suggest the source is being misused or overreached
- the expected output format when this source is in play

A capsule is to a framework what a runbook is to a system: enough to operate it correctly, not enough to reconstruct it.

---

## What a capsule is not

A capsule must not contain:

- the integral text of the source
- examples that include client, customer, or partner identifiers
- excerpts from regulated, contractual, or confidential material
- internal narrative ("we adopted this in Q2 because X") unless the narrative is part of the operational logic
- enterprise-specific carve-outs that belong in a project extension

If a capsule starts to read like the source itself, it is no longer a capsule.

---

## Capsule vs. playbook vs. full source vs. restricted source

| Artifact | Purpose | Typical size | Who can consume |
|---|---|---|---|
| **Capsule** | operate the source correctly | 1–3 pages | any authorized agent or skill |
| **Playbook** | step-by-step procedure for a specific task using the source | varies | task-bound agents |
| **Full source** | the original document | as-is | only when retrieval mode permits |
| **Restricted source** | full source with sensitivity controls | as-is | only with explicit authorization + audit |

A skill in **knowledge-aware mode** asks the resolver for a capsule first. It escalates to a playbook, an excerpt, or the full source only when the task explicitly requires it and the [restricted-knowledge-usage-policy](../contracts/restricted-knowledge-usage-policy.md) allows it.

---

## Why capsule-first

- **Lower context cost.** A capsule is small and cacheable.
- **Lower leakage risk.** A capsule does not contain sensitive verbatim text.
- **Lower interpretive noise.** A capsule is curated; the full source includes scaffolding the task does not need.
- **Clearer authority.** The capsule states the source's intended scope, so an agent will not overreach.
- **Versionable surface.** A capsule changes more slowly than the underlying source's edits.

---

## Capsule lifecycle

- **Author** the capsule with the source's owner.
- **Review** with at least one person not involved in authoring.
- **Version** alongside the knowledge pack.
- **Re-review** on the cycle declared in the manifest (`expiry.review_cycle`).
- **Retire** when the source is deprecated or superseded.

---

## See also

- [knowledge-governance-layer](knowledge-governance-layer.md)
- [knowledge-resolver](knowledge-resolver.md)
- [knowledge-pack-manifest](../contracts/knowledge-pack-manifest.md)
