# AI lessons

## Purpose

Record recurring lessons from AI-assisted work without turning this file into a loose session diary.

This file preserves:

- repeatable mistakes;
- process adjustments;
- genuinely useful new heuristics;
- patterns that prevent recurrence.

## When to record

Record a lesson only when at least one of these applies:

- the same mistake could reappear in another task;
- an activation rule had to be refined;
- a new heuristic clearly improved execution;
- a coordination failure exposed a process gap.

## When not to record

Do not record:

- trivial observations;
- notes redundant with `docs/DECISIONS.md`;
- routine task summaries;
- comments that only make sense for one isolated session.

## Recommended format

```md
### LESSON-XXX — short title

Context:
-

Lesson:
-

Future application:
-

References:
-
```

## Entries

### LESSON-001 — Validate a boundary crossing with the smallest contract change before opening UI or telemetry

Context:
- In the second operating-system test, the work needed to validate a `Type B` task in `PR/Comms` crossing `Feature Development` and `Cris Assistant`.
- The chosen evolution was to make the origin of the hybrid executive summary explicit in the export contract.

Lesson:
- When the boundary crossing is real but the scope is still medium-sized, the best pilot is usually a minimal, verifiable contract change.
- Exposing metadata in an HTTP header was enough to validate dominant front, crossing, lightweight triad and lightweight QA without invading UI or observability.

Future application:
- Before opening visual surfaces or additional telemetry, prefer a small, reversible and testable contract change first.

References:
- `docs/FEATURE_pr-comms-backend-phase2.md`
- `docs/DECISIONS.md` (`PRC-003`)

### LESSON-002 — Separating text ownership from visual ownership avoids false conflict between Codex and Claude Code

Context:
- The process evolved into stable collaboration between `Codex`, `Claude Code` and occasional `ChatGPT` support.
- Recent work touched landing, `/guia`, `/docs` and interface handoffs, where text needed to evolve without reopening Claude Code's visual ownership.

Lesson:
- In UX/UI surfaces, the most useful boundary is not always “who touches the file”, but “what is the dominant nature of the change”.
- UX Writing changes may cross visual surfaces when they do not silently become redesign.
- This reduces artificial tool conflict and avoids blocking copy, glossary and documentation evolution.

Future application:
- Before blocking an edit because of file ownership, classify whether the change is visual, functional or textual.
- When a change is textual on a visually owned surface, preserve layout and behavior; only create a handoff for visual polish when needed.
- Use dedicated handoffs when the interface depends on backend work already consolidated elsewhere.

References:
- `AGENTS.md`
- `docs/THREAD_OPERATING_SYSTEM.md`
- `docs/THREAD_CHECKLIST.md`
- `docs/handoffs/claude-code-ui-handoff-2026-03-27.md`

### LESSON-003 — Deterministic heuristics must inspect the positive task scope, not the empty excluded scope

Context:
- In the first AletheIA kernel smoke test, a low-risk documentation `hello-world` returned `continue` instead of `allow`.
- The cause was a `docsOnlyHint` heuristic derived from the wrong scope field (`scope.out`), preventing correct recognition of a small documentation task.

Lesson:
- In deterministic kernels, simple heuristics should start from what the task explicitly includes, not from the absence of clues in excluded areas.
- For lightweight flows such as `docs-only`, `local-only` and `low-risk`, the strongest signal is usually in the positive scope and declared inputs.
- Small heuristics deserve immediate smoke tests because regressions can change framework semantics without breaking the runtime.

Future application:
- When adding new heuristic gates in AletheIA, start from affirmative signals in the `Task Brief` and `Context Pack`.
- Keep small smoke tests for each important semantic path: `allow`, `review`, `ask_human` and `block`.
- Avoid relying on “nothing appeared” as the main evidence for classification.

References:
- `lib/aletheia/compiler.ts`
- `scripts/aletheia/test-kernel.ts`
- `scripts/aletheia/hello-world.ts`

### LESSON-004 — Operational ambiguity is a legitimate review trigger even without extreme risk

Context:
- While expanding the minimum AletheIA kernel, the work needed to prove not only the `allow` path but also a brake path for low confidence.
- A `low-confidence-review` scenario was added: the task stayed small and low-risk, but the request and context were too ambiguous for direct execution.

Lesson:
- In AI-assisted work frameworks, review decisions should not depend only on high risk or structural severity.
- Enough ambiguity is already a valid operational signal to stop, review and clarify before acting.

Future application:
- Treat unclear goals, unstable scope and insufficient source context as first-class review triggers.
- Keep review paths lightweight enough to use before ambiguity becomes rework.

References:
- `scripts/aletheia/test-kernel.ts`
- `scripts/aletheia/low-confidence-review.ts`

### LESSON-005 — A strong governance pack does not replace the framework; it must be treated as a cross-cutting layer

Context:
- The repository evaluated a strong governance pack with useful contracts, checklists and operating guidance.
- The pack overlapped with existing AletheIA concepts but did not own the entire framework.

Lesson:
- Strong reference material should be mapped into the existing governance architecture instead of becoming a parallel framework.
- Cross-cutting concerns are safer when attached to explicit layers, gates and evidence records.

Future application:
- Intake future packs through source mapping, posture, non-goals and promotion gates before implementing anything.
- Preserve useful patterns without letting imported language redefine AletheIA boundaries by accident.

References:
- `docs/contracts/reference-intake-adoption-contract.md`
- `docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md`

### LESSON-006 — Policy Trace is part of the governance product, not just an interpreter detail

Context:
- A deterministic interpreter needed to explain why a decision was made.
- The trace became useful for human review, not only for debugging.

Lesson:
- Governance systems need explainable policy traces as a user-facing artifact.
- A decision without a trace is harder to audit, teach, challenge or reuse.

Future application:
- Treat traces as product surfaces: concise enough for readers, precise enough for reviewers.
- Preserve the link between rules, evidence and outcome whenever decisions become visible.

References:
- `docs/contracts/policy-verdicts.md`
- `docs/contracts/execution-audit-record.md`

### LESSON-007 — Governance becomes more useful when change boundaries and evaluations become their own artifacts

Context:
- Several slices needed to separate what changed from how the change was evaluated.
- When both were explicit, review became easier and safer.

Lesson:
- The boundary of a change and the evaluation of that change should not be implicit in prose.
- Small artifacts make scope, evidence and review state visible without expanding runtime behavior.

Future application:
- Use dedicated records for boundary, evidence and evaluation when a slice affects governance semantics.
- Avoid hiding important decisions inside implementation diffs only.

References:
- `docs/contracts/execution-audit-record.md`
- `starter-pack/templates/slice-record-template.md`

### LESSON-008 — A real framework hook is where governance stops being only a capability and becomes a flow

Context:
- AletheIA had many governance concepts, but practical adoption depended on where those concepts attached to real work.

Lesson:
- Governance becomes operational when it has a clear hook in the working flow.
- Without a hook, even strong guidance can remain advisory and unused.

Future application:
- When adding governance concepts, define where they attach: planning, intake, validation, closure, handoff or publication.
- Keep the hook small and observable before expanding scope.

References:
- `docs/concepts/work-slice-pattern.md`
- `docs/guides/core-operating-path.md`

### LESSON-009 — Finalization must distinguish “not validated” from “validated but not aligned with the source of truth”

Context:
- Finalization work exposed two different failure modes: missing validation and validation against the wrong or stale source.

Lesson:
- “I did not validate” and “I validated but not against the authoritative source” are different risks.
- Closure needs to record both validation status and source alignment.

Future application:
- In closeout records, separate evidence availability from source authority.
- Avoid treating a green local check as complete proof when the canonical source is elsewhere.

References:
- `docs/contracts/source-precedence-policy.md`
- `docs/guides/slice-finalization-and-restart.md`

### LESSON-010 — Validation failure should produce useful learning, not only a block

Context:
- Some validation failures exposed reusable process gaps instead of one-off mistakes.

Lesson:
- A failed validation is not just a stop signal; it can reveal a reusable learning if the failure could recur.
- Recording that learning prevents the same failure from becoming repeated coordination cost.

Future application:
- When validation fails, ask whether the failure is local noise or a reusable process lesson.
- Capture reusable lessons in this file only when they change future behavior.

References:
- `docs/reference/learnings.md`
- `docs/contracts/independent-validation-hardening-contract.md`
