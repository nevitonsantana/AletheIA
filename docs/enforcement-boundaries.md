# AletheIA Enforcement Boundaries

## Goal

This document makes one Alpha 1 distinction explicit:

the difference between **behavioral enforcement** and **technical enforcement**.

In simple terms:

some rules work because people and agents are taught to follow them.
Other rules work because the system can actually check or block them.

AletheIA needs both, but it should not confuse one for the other.

---

## Why this distinction matters

AI-assisted workflows often sound safer than they really are because the documentation says:

- “the agent must do X”
- “the workflow requires Y”
- “the project follows rule Z”

But there is a difference between:

- a rule that is written down
- a rule that is reviewed in practice
- a rule that is technically enforced

If these are mixed together, the framework becomes harder to trust.

---

## Behavioral enforcement

Behavioral enforcement is guidance that depends on the operator, contributor, or agent actually following the rule.

Examples:

- keep tasks small
- read before write
- do not expand scope silently
- record durable decisions when the tradeoff matters
- keep handoffs short and useful

Behavioral enforcement is still valuable.

It helps:

- shape habits
- reduce ambiguity
- improve consistency
- teach the operating method

But it is not technically inevitable.

---

## Technical enforcement

Technical enforcement is a rule that can be checked, surfaced, or blocked by the system itself.

Examples in Alpha 1:

- `scripts/check-governance.sh` verifying required files
- placeholder checks in key public surfaces
- test commands exposed in `package.json`
- future governance hooks evaluating rule outcomes programmatically

Technical enforcement matters because it turns part of the framework from intention into mechanism.

But Alpha 1 only needs a small baseline, not full automation.

---

## What Alpha 1 should avoid

Alpha 1 should avoid two mistakes:

### Mistake 1 — Pretending behavioral rules are already enforced technically

If a rule is only described in prose, say so.

### Mistake 2 — Waiting for perfect technical enforcement before documenting a rule

Some rules need to exist behaviorally before the framework can enforce them technically.

Alpha 1 is allowed to be small and asymmetric, as long as it is honest about what is real.

---

## AletheIA guidance

### Use behavioral enforcement for:

- operating principles
- team discipline
- planning and scope expectations
- handoff quality
- decision hygiene

### Use technical enforcement for:

- baseline repository checks
- executable validations
- structured policy evaluation
- future hook-based governance

---

## Practical reading rule

When reading an AletheIA artifact, ask:

1. Is this describing expected behavior?
2. Is this describing an executable check?
3. Is it clear which one it is?

If the answer to the third question is “no”, the framework still needs clarification.

---

## Relationship to current Alpha 1 artifacts

### Mostly behavioral today

- `docs/governance.md`
- `docs/token-policy.md`
- `docs/durable-decisions.md`
- starter-pack guides and templates

### Mostly technical today

- `scripts/check-governance.sh`
- test commands in `package.json`
- the deterministic kernel and governance evaluation paths already present in the repo

### Transitional zone

Some artifacts start behaviorally and later gain technical enforcement.

That is expected.

The important thing is to make the transition visible.

---

## What this should prove in Alpha 1

By adding this distinction, AletheIA should show that:

- the framework does not overclaim enforcement
- governance prose and executable checks are not treated as the same thing
- contributors can understand which guarantees are soft and which are harder

---

## Future evolution

Later versions may connect this distinction more directly to:

- governance hooks
- policy trace
- warning surfaces
- project-specific enforcement levels

Alpha 1 does not need that yet.

It only needs to be explicit and honest about the boundary.
