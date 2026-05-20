# AI Agent Security & Prompt Injection

## Goal

This document explains a future domain governance pack for AI agent security and prompt injection in AletheIA.

In simple terms:

make agent security boundaries explicit and reusable,
without confusing them with provider-specific prompt recipes or pretending the problem is solved by the framework core alone.

---

## Why this future pack exists

AletheIA already contributes useful generic discipline for agent work.

It already reinforces things such as:

- execution boundaries
- semantic guardrails
- explicit handoffs
- authoritative validation
- controlled critical actions
- structured risk inference for higher-risk tasks

That is useful, but still not the same as an explicit agent-security layer.

A real assistant such as Cris can still face risks such as:

- direct prompt injection
- indirect prompt injection through retrieved or monitored content
- tool abuse
- data exfiltration through tool calls
- memory or retrieval poisoning
- ambiguity about what content is trusted enough to influence action

This future pack exists to make those security boundaries explicit and reusable.

---

## Core idea

This pack should define a reusable operating layer where:

- instructions are not all trusted equally
- external content is not promoted into instructions by default
- tool use follows least privilege
- ambiguous or adversarial inputs fail safely
- agent action remains bounded even when the input tries to redefine those bounds

---

## Planned pack blocks

### A. Instruction Trust Hierarchy

This future pack should make explicit that not all instructions have the same authority.

A reusable hierarchy should distinguish between things such as:

- framework or core instructions
- project rules
- system policy
- user input
- retrieved content
- tool outputs
- external documents or monitored content

The goal is to keep instruction authority reviewable instead of implicit.

### B. Trusted vs Untrusted Content

This future pack should make explicit that:

- external content should enter as data, evidence, or context
- external content should not become instruction by default
- retrieved content and monitoring content are untrusted unless explicitly reclassified by trusted logic
- the system should distinguish content trust from instruction authority

### C. Prompt Injection Resistance

This future pack should make explicit that the assistant should resist:

- direct prompt injection
- indirect prompt injection
- hidden instructions inside retrieved material
- attempts to override scope, policy, role, or validation expectations

The goal is not perfect immunity.
The goal is explicit defensive posture.

### D. Monitoring Content as Untrusted Input

For agentic products such as Crisis Monitor, this future pack should make explicit that:

- monitored content is untrusted by default
- mentions, documents, news, snippets, and captured text enter as evidence or context
- monitored content must not silently become operational instruction
- the assistant should preserve the boundary between what was observed and what it is allowed to do

### E. Tool Permissioning & Least Privilege

This future pack should make explicit that:

- tools should have the narrowest useful scope
- read, mutate, and exfiltrate capabilities should be distinguished
- unsafe tool chaining should be avoided
- sensitive tool use may require human gate or explicit confirmation
- data should not be sent to third parties without a clear rule that allows it

### F. Tool-Use Guardrails

This future pack should make explicit that:

- tool use must stay inside the execution boundary
- inputs should not coerce unsafe tool calls indirectly
- tools must not become a bypass around policy or scope
- trust in a tool output does not automatically imply permission to act on it

### G. Memory / Retrieval Safety

This future pack should make explicit that:

- retrieved memory is not equivalent to trusted truth
- retrieval poisoning and memory poisoning are real risks
- source marking matters
- the system should distinguish retrieved fact, inferred conclusion, and executable instruction

### H. Agent Action Boundaries

This future pack should make explicit that:

- the agent may suggest some actions
- the agent may execute only some actions
- some actions require confirmation or human escalation
- an input asking for something unsafe should not redefine the agent's allowed boundary

### I. Safe Failure, Refusal & Escalation

This future pack should make explicit that:

- ambiguous trust conditions should tend toward safe failure
- refusal is sometimes the correct behavior
- escalation should happen when trust hierarchy or execution boundary becomes unclear
- higher-risk ambiguity should not be smoothed over by confident language

### J. Adversarial Evaluation Scenarios

Good future evaluation scenarios for this pack would include:

- a retrieved document trying to redefine assistant behavior
- prompt injection through externally monitored content
- a user trying to extract policy or hidden instructions
- a tool-use path that could exfiltrate sensitive data
- a poisoned memory or retrieval layer influencing action
- an input trying to pressure the agent into skipping validation or scope boundaries

---

## Relationship to Alpha 4 and Alpha 5

This future pack connects directly to the phases already in progress.

### Alpha 4

Alpha 4 contributes:

- execution boundaries
- restart packages
- semantic guardrails
- safer continuity between agents

### Alpha 5

Alpha 5 may later contribute:

- selective structured inference for higher-risk agent changes
- clearer assumptions, unknowns, and test gaps before execution

This future pack should build on those phases,
not replace them.

---

## Crisis Monitor motivation without lock-in

Crisis Monitor and the Cris Assistente are strong motivating examples for this pack.

They make concrete problems visible, such as:

- monitored content that should not become instruction
- sensitive assistant-mediated workflows
- tool and context boundaries that matter operationally

Those examples are useful.

But this future pack should still remain reusable beyond one assistant or one product.

---

## What this pack is not

This future pack is not:

- a perfect defense against jailbreaks
- a substitute for server-side security
- a policy for one provider family only
- a prompt recipe disguised as framework logic
- proof that AletheIA already enforces these protections technically

The goal is explicit reusable agent-security discipline,
not exaggerated claims.

---

## Good signs

This future pack is going well when:

- monitored and retrieved content stay in the right trust category
- tool use becomes easier to review for least privilege and exfiltration risk
- refusal and escalation feel like part of the operating model, not a special case
- the pack still makes sense across different providers and agent shells

---

## Suggested next reading

- `docs/domain-governance-packs.md`
- `docs/agent-handoffs.md`
- `docs/structured-risk-inference.md`
- `docs/project-extension-pattern.md`
