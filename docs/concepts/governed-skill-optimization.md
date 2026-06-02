# Governed Skill Optimization

> **Optimization is evidence, not authority. Governance outranks optimization.**

This document explains *why* AletheIA treats skill optimization as a governed activity and
where the boundary sits between **producing evidence** about a proposed skill change and
**deciding** to make that change.

It is conceptual background. The normative rules live in
[skill-evolution-validation-contract.md](../contracts/skill-evolution-validation-contract.md).

## The problem

As a skill library grows, proposals to evolve a skill can be accepted because they *seem*
reasonable rather than because they were tested. Three failure modes follow:

1. A skill improves in one scenario and silently regresses in another.
2. A change looks cosmetic but shifts decision behavior.
3. A knowledge-aware skill blurs *skill evolution* with *misuse of a governed source*.

Optimization techniques that treat a natural-language skill document as an improvable
artifact make these failures worse if their output is trusted directly. The risk is not the
experimentation — it is letting an experiment's result act as authority.

## The stance

AletheIA governs the **decision**; it does not run the optimization. An experiment may
generate evidence, a comparison, or a recommendation. It may never produce a canonical
change. The strongest thing an experiment can do is create a *proposal*, which then re-enters
the normal governed path: human review and a pull request.

This mirrors how AletheIA already treats its own evolution (see
[self-application.md](self-application.md)) and how it separates *what a skill needs* from
*which source satisfies it* (see [knowledge-governance-layer.md](knowledge-governance-layer.md)).

## Where it sits

```txt
AletheIA                      contracts, gates, policies, evaluation depth, human decision
Knowledge Governance Layer    sources, authority, sensitivity, scope, restrictions, packs
Adaptive Skills               skills, modules, triggers, verification, handoff signals
Evolution Layer               observations, proposals, reviews, outcomes
Skill Evolution Validation    validation cases, experiments, regression, comparative evidence
```

The execution side of this layer — validation cases, experiments, the regression check, and
the structural validator — lives in the **Adaptive Skills** repository, beside the existing
Evolution Layer. AletheIA holds only the **contract**: the conditions an experiment and its
evidence must satisfy to be considered governed. AletheIA governs the decision; Adaptive
Skills runs the experiment.

## The authorized path

```txt
Observation
  → Validation Case
  → Skill Evolution Experiment
  → Regression Check
  → Proposal
  → Human Review
  → Pull Request
  → Canonical Skill Update
```

Everything up to and including the experiment is **evidence**. Everything after the proposal
is **human authority**. The two never collapse into a single automated step.

## What this is not

- Not an optimizer runtime, a benchmark engine, or a training loop.
- Not an auto-writeback into any skill document.
- Not a scoring system whose number becomes a decision.
- Not a license to copy confidential, restricted, or regulated content into experiment
  artifacts — synthetic-first applies, and the
  [restricted-knowledge-usage-policy.md](../contracts/restricted-knowledge-usage-policy.md)
  still binds.

## Good outcomes that are not "a change"

Confirming that a skill already behaves correctly under a new case (`reinforced`) or that a
candidate is not worth adopting (`no-change`) are **successful** results. They prevent churn
and are evidence in their own right. Few strong cases beat many weak ones.

## Related

- [skill-evolution-validation-contract.md](../contracts/skill-evolution-validation-contract.md) — the normative contract
- [self-application.md](self-application.md) — how AletheIA governs its own evolution
- [knowledge-governance-layer.md](knowledge-governance-layer.md) — source/skill/contract separation
- [sensitivity-vocabulary-mapping.md](../contracts/sensitivity-vocabulary-mapping.md) — canonical sensitivity taxonomy
