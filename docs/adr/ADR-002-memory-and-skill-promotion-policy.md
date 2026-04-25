# ADR 002 — Memory and skill promotion policy for Hermes pre-pilot

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-04-25 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR 001 — Hermes role in the AletheIA pipeline |
| Supersedes | — |

## 1. Context

AletheIA depends on durable memory and reusable skills, but those surfaces can easily become self-referential governance if a runtime is allowed to create, promote, and consume them without review.

Hermes may help produce candidate memories and candidate skill updates during the pre-pilot. It must not own promotion.

The design goal is to preserve learning while preventing memory bloat, skill drift, and runtime self-governance.

## 2. Decision

### 2.1 Memory lifecycle

Hermes may write only to candidate memory:

- `memory/proposed/`

Promotion from proposed memory to semantic or durable memory requires human review. Hermes cannot promote memory directly.

The default memory flow is:

1. Hermes records a candidate learning in the task closeout.
2. If the learning is worth retaining, Hermes may create or reference a file in `memory/proposed/`.
3. Human review accepts, edits, merges, or discards the candidate.
4. Only accepted items move to semantic/durable memory.

### 2.2 Memory promotion threshold

The pilot should show evidence of curation, not accumulation.

The go threshold is:

- promoted memories remain below **30%** of proposed memories during the pilot review window.

This captures selectivity without rewarding the creation of bad memories merely to increase discard volume.

A high discard count is not itself success. Success is a low promotion rate plus clear reasons for what was promoted.

### 2.3 Memory types and belonging test

Use the following direct belonging test:

| Type | Belongs here when |
|---|---|
| Personal | It reflects a human preference or durable collaboration constraint |
| Operational | It is a convention, rule, boundary, or project operating fact |
| Procedural | It is executable by an agent with triggers or steps |
| Episodic | It records a specific run, task, incident, or short-lived occurrence |

If a candidate is executable by an agent with triggers, it is **Procedural**.
If it is a convention or rule, it is **Operational**.

### 2.4 Skill lifecycle

Skills use this lifecycle:

| Stage | Meaning |
|---|---|
| `draft` | Idea captured but not yet shaped for use |
| `proposed` | Candidate skill with owner and intended trigger |
| `experimental` | Used in bounded tests with explicit review |
| `validated` | Proven useful across repeated tasks or pilot evidence |
| `default` | Preferentially loaded or routed when trigger, risk, and context match |

`default` is operational, not decorative: it gives the skill preferential loading/routing when its trigger and risk profile match the task.

`default` does **not** mean automatic execution, bypassed review, or permission expansion.

### 2.5 Skill promotion

Hermes may propose a new skill or a lifecycle change, but cannot approve it.

Promotion requires:

- human review;
- evidence from at least one closeout;
- a clear trigger;
- a clear risk boundary;
- a rollback path when the skill causes confusion or drift.

Hermes cannot promote a skill that changes its own permissions, routing priority, memory access, or runtime autonomy.

### 2.6 Baseline and measurement windows

Use separate baseline windows for different signal types.

Operational metrics use a **2-week pre-pilot baseline**:

- time to closeout;
- rework rate;
- number of context re-explanations;
- cost per task;
- violations of scope or gates.

Qualitative metrics use a **continuous baseline through Phase 5**, then compare against the same amount of post-Hermes work:

- perceived handoff quality;
- gaps found after handoff;
- clarity of candidate memories;
- usefulness of proposed skill changes.

This avoids pretending that one or two weeks create enough qualitative signal.

## 3. Consequences

### Positive

- Memory stays curated rather than accumulated.
- Skill lifecycle has practical meaning.
- Hermes can contribute learning without governing learning.
- Go/no-go review has numeric thresholds and qualitative evidence.

### Negative

- Some useful memories and skills may wait for human review.
- The pilot measures discipline before automation speed.
- Qualitative baselines require patience through Phase 5.

## 4. Alternatives considered

### A. Let Hermes promote memory automatically

Rejected because it gives the runtime governance over what future executions inherit.

### B. Let Hermes promote skills after successful use

Rejected because successful use is not enough to prove safe default routing.

### C. Use discard volume as the curation metric

Rejected because it can reward producing low-quality candidates. Promotion rate below 30% is safer.

## 5. Boundaries

This ADR does not define a full memory database, active skill registry, or runtime adapter implementation.

It defines the pre-pilot promotion policy that any later implementation must respect.

## 6. Review

| When | What to review |
|---|---|
| After manual simulation | Whether the closeout captures candidate learning without overwork |
| After 2 weeks of baseline | Operational metric availability |
| At Phase 5 | Qualitative baseline maturity |
| After 60-day pilot | Whether any promotion rule can be relaxed |
