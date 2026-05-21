# ADR 006 — AletheIA: domain agnosticism

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-05-21 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR-004 (AletheIA as operating overlay), ADR-005 (Positioning in agentic ecosystem) |
| Supersedes | — |

## 1. Context

AletheIA was developed against a single consumer project — **Crisis Monitor** — used as sandbox throughout its formative phase. That project shaped the canonical vocabulary, the slice/handoff patterns, the closeout templates, and the pilots in [`docs/pilots/`](../pilots/). The shaping is real and useful, but it leaves a residue: Crisis Monitor appears as the implicit reference example in canonical content, and a new reader cannot always tell whether a given decision is general or Crisis-Monitor-specific.

The 2026-05-21 cross-repo plan declares the soft-launch goal — adopting AletheIA inside the author's company alongside BMAD/SDD — which forces this question: *is AletheIA a Crisis-Monitor framework that pretends to be general, or a general framework that was first validated on Crisis Monitor?*

Both readings are possible from the current state of `docs/`. The reading must be fixed.

## 2. Decision

**AletheIA is domain-agnostic. Crisis Monitor is the first validation case, not the canonical case.** Other consumer projects are expected and prioritized.

### 2.1 Membership criterion (canonical vs. example)

A piece of content belongs in **canonical layer** (`docs/concepts/`, `docs/contracts/`, `docs/guides/`, `docs/adr/`) only if it remains true after substituting Crisis Monitor for any other domain (software product, design system, data pipeline, operations runbook, regulatory program, etc.).

A piece of content belongs in **example layer** (`docs/pilots/`, `docs/examples/`, case studies) when it depends on Crisis-Monitor-specific facts, vocabulary, stakeholders, or incidents.

When an artifact mixes both, it is mis-factored: separate the canonical insight from the Crisis-Monitor illustration, place each in its layer, and link.

### 2.2 Reading test (operational)

For any canonical document, the test is: *if a new adopter from a different domain reads this, do they see general guidance and a labeled example, or do they see Crisis Monitor and have to translate?* The latter is a defect, tracked by Epic 2 of the 2026-05-21 cross-repo plan.

### 2.3 What this is not

- This is **not** a requirement to produce a fictional second case study for balance. Declared agnosticism plus first-validation transparency is sufficient until soft-launch produces real cases.
- This is **not** a removal of Crisis Monitor content. The case study is preserved as labeled evidence in [`docs/pilots/`](../pilots/) and (after Epic 2) in `docs/examples/`.
- This is **not** a claim that *any* domain is equally well-supported today. The claim is that nothing in the *framework* prevents another domain; the framework was *exercised* on one.

## 3. Consequences

**Positive.** Adoption pitch generalizes: a design squad or a data team can read the canonical docs and recognize themselves without translation. Risk that adopters cite "no case for my domain" as blocker is mitigated by transparency, not by faking coverage. The Crisis Monitor case study gains a clearer role: labeled field evidence, not implicit canon.

**Negative.** Some canonical docs need rewriting to remove embedded Crisis-Monitor framing — that work is real (Epic 2). Until that work lands, the gap between declared agnosticism and observable agnosticism is visible.

**Accepted tradeoff.** A short window of declared-but-not-yet-observable agnosticism is preferable to keeping Crisis Monitor entangled in canonical content. The window closes with Epic 2.

## 4. Alternatives considered

- **A. Declare AletheIA Crisis-Monitor-specific; ship a generic fork later.** Rejected — the framework was already general by intent; only the examples are specific. Forking would duplicate maintenance for no gain.
- **B. Keep Crisis Monitor as the canonical reference and treat other domains as ports.** Rejected — institutionalizes the residue ADR-006 is trying to remove and contradicts the cross-repo plan's H1 (complementary positioning).
- **C. Produce a synthetic second case for balance before declaring agnosticism.** Rejected — premature, expensive, and creates a fictional artifact whose existence reduces credibility.
- **D. Leave agnosticism implicit and rely on each conversation to clarify.** Rejected — same re-litigation cost argument as ADR-005.

## 5. Relationship

ADR-004 fixed *what* AletheIA is (overlay). ADR-005 fixed *where* it sits in the ecosystem. This ADR fixes *what it applies to* (any domain). Epic 2 of the 2026-05-21 cross-repo plan implements section 2.1 by auditing and reclassifying Crisis Monitor references across the repo. The mirror ADR in the Adaptive Skills repo (ADR-002) carries the same principle for capability libraries.

## 6. Review

Reopen when:

- A second consumer project adopts AletheIA and surfaces a structural assumption that *is* genuinely Crisis-Monitor-specific (i.e., the framework turned out to be less general than this ADR claims) → narrow the agnosticism scope.
- Soft-launch feedback shows adopters consistently fail to map a canonical concept to their domain without translation → the canonical content needs further despoluição beyond Epic 2.
- A domain emerges where AletheIA *should* take an opinionated stance (e.g., regulated environments with mandatory artifacts) → consider domain packs rather than reopening the core agnosticism claim.

If a review confirms the decision unchanged, record the confirmation date here and continue.
