# ADR 004 — AletheIA as operating overlay

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-05-20 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR-001 (Hermes role), ADR-002 (Memory and skill promotion), ADR-003 (Slice record / closeout) |
| Supersedes | — |

## 1. Context

AletheIA's information surface conflates three concerns: the **product** being built, the **operating discipline** for building it with AI, and the **runtime** that executes the agent. The ambiguity produces recurring friction — PRs stuck on "overlay or app?", runtime patterns pressing to be absorbed into the core, and documents drifting into `docs/` without a clear owner-category. The boundary must be fixed before reorganizing `docs/` (Epic 1 of the 2026-05-20 structural plan); otherwise reorganization only relocates the ambiguity.

## 2. Decision

**AletheIA is the operating overlay — a portable layer between the consumer project and the execution harness.** It does not absorb product architecture and does not absorb runtime state.

| Layer | Question it answers | Where it lives |
|---|---|---|
| Product / app | *How to build it?* | Consumer project repository |
| Operating overlay (AletheIA) | *How to operate, decide, validate, hand off?* | Dedicated directory in the consumer project + canonical framework in AletheIA repo |
| Harness runtime | *Where and with what resources to execute?* | `~/.claude/`, `~/.codex/`, `~/.hermes/`, etc. |

### 2.1 Membership criterion

- About *how the code is built* → **product**.
- About *how to decide what to do, validate, deliver, hand off, learn* → **overlay**.
- About *credentials, sessions, plugins, local agent logs* → **harness**.

When an artifact appears to belong to two layers, it is mis-factored, not evidence the boundary is wrong. Refactor before relocating.

### 2.2 Resolved examples (normative)

1. **Hermes session DB / cron / plugin state** → harness, not AletheIA core.
2. **Crisis Monitor local `constitution/`** → overlay, but inside the *consumer project*.
3. **Canonical vocabulary, planning depth profiles, waste heuristics** → overlay in AletheIA core.
4. **Hermes logging plugin or message gateway adapter** → harness.
5. **Delivery output contract, runtime adapter contract, readiness gates spec** → overlay in AletheIA core.
6. **Closeout templates and handoff schemas** → overlay in AletheIA core.
7. **`src/`, `services/`, framework-of-choice conventions** → product. AletheIA does not opine.

## 3. Consequences

**Positive**: PRs gain an explicit "does this belong here?" criterion; pressure to absorb runtime capabilities is bounded by rule, not taste; `docs/` reorganization has a fixed reference; harness shims are defined as thin adapters, not standalone surfaces.

**Negative**: judgment is still required in genuinely ambiguous zones; some natural-feeling integrations (e.g., logging plugins in core) are deliberately excluded; consumer projects must accept a dedicated overlay directory.

**Accepted tradeoff**: a narrower core with a defended boundary beats a broader core that drifts into product or runtime.

## 4. Alternatives considered

- **A. Extract the bootstrap into a separate repo now.** Rejected — crystallizes conventions before evidence they generalize.
- **B. AletheIA absorbs Hermes-style runtime state.** Rejected — conflates governing with executing; inflates core, reduces portability.
- **C. AletheIA dictates product architecture.** Rejected — invades the consumer project's territory.
- **D. Keep the ambiguity, decide case by case.** Rejected — re-litigation cost already exceeds the cost of this ADR.

## 5. Relationship

ADR-001 is the runtime-specific instance of this principle. ADR-002 and ADR-003 describe artifacts that live inside the overlay layer. The 2026-05-20 structural plan consumes this ADR as prerequisite for Epic 1; the `consumer-project-overlay` contract (Epic 4) is its normative instantiation.

## 6. Review

Reopen when:

- **3+ consumer projects** adopt the same overlay with diffs <20% → consider extracting the bootstrap.
- A recurring pattern genuinely belongs to two layers and splitting produces two worse artifacts → revisit section 2.1.
- A harness arrives whose state cannot be cleanly separated from overlay → revisit the harness layer definition.
- The term "operating overlay" starts being cited with materially different meaning → re-tighten section 2.

If a review confirms the decision unchanged, record the confirmation date here and continue.
