# Cross-Repo Closeout — Work Slice Spec Bundle and Specification Facilitation

## Identification

| Field | Value |
| --- | --- |
| Title | Work Slice Spec Bundle and Specification Facilitation cross-repo closeout |
| Date | 2026-05-19 |
| AletheIA repository | `nevitonsantana/AletheIA` |
| Adaptive Skills repository | `nevitonsantana/adaptive-skills` |
| AletheIA PRs | #137, #138 |
| Adaptive Skills commit | `2d7cbf8 docs: add specification facilitation composition` |
| Executor | Codex |
| Human operator | Neviton Santana |

## Intent

Record the outcome of the two coordinated fronts that improved planning and specification discipline without importing Spec Kit as a framework dependency or creating a parallel methodology.

## Scope

This closeout covers:

- AletheIA's macro-layer Work Slice Spec Bundle;
- the AletheIA worked example for a `Standard` Work Slice using the bundle;
- Adaptive Skills' micro-layer specification facilitation composition;
- the boundary between the two repositories.

Out of scope:

- reopening AletheIA architecture;
- copying Spec Kit structure;
- creating `.specify/`, CLI commands, project constitutions, or automation;
- making the bundle mandatory for `Lite` slices;
- turning Adaptive Skills into the macro governance layer.

## What changed in AletheIA

AletheIA now has a docs-first optional bundle for slices that need more pre-execution clarity:

- `docs/work-slice-spec-bundle.md`
- `starter-pack/templates/work-slice-spec-template.md`
- `starter-pack/templates/work-slice-plan-template.md`
- `starter-pack/templates/work-slice-tasks-template.md`
- `starter-pack/templates/work-slice-readiness-review-template.md`

The bundle is explicitly scoped to `Standard` and `High-Assurance` slices when ambiguity, traceability, or readiness evidence justify it.

AletheIA also now includes a worked example:

- `examples/work-slices/standard-spec-bundle/README.md`

The example shows:

- when a `Standard` slice activates the optional bundle;
- where `[NEEDS CLARIFICATION]` appears;
- how `what/why` stays separate from `how`;
- requirement -> decision -> task -> evidence traceability;
- AletheIA readiness gates as macro governance;
- `premortem` as optional only when the cost of failure is meaningful.

## What changed in Adaptive Skills

Adaptive Skills implemented specification facilitation as a composition, not as a new skill by default.

The active composition is:

```text
workflow -> feature-planning -> optional premortem
```

That composition adds or reinforces:

- specification clarification;
- `[NEEDS CLARIFICATION]` handling;
- what/why versus how boundary;
- traceability from requirement to decision, task, and evidence;
- anti-overengineering review;
- optional premortem only for consequential plans that can still change.

Key Adaptive Skills artifacts:

- `docs/specification-facilitation.md`
- `skills/engineering/feature-planning/SKILL.md`
- `examples/aletheia/specification-facilitation-composition.md`

## Boundary decision

The cross-repo boundary remains:

```text
AletheIA governs the slice.
Adaptive Skills facilitates the method.
```

AletheIA owns:

- Work Slice framing;
- planning depth;
- readiness gates;
- continuity;
- handoff and restart decisions;
- proof before closure.

Adaptive Skills owns:

- clarification prompts;
- feature-planning discipline;
- traceability and anti-overengineering checks;
- optional premortem execution;
- reusable micro-execution support that can be used with or without AletheIA.

## Validation evidence

AletheIA PR #137:

- local validation: `git diff --check`, `bash scripts/check-governance.sh`, direct whitespace scan on new docs/templates;
- GitHub CI: build, governance, lockfile, contracts, goldens, e2e, learnings, quality gate;
- merged into `main` at `4785eb4`.

AletheIA PR #138:

- local validation: `git diff --check`, `bash scripts/check-governance.sh`, direct whitespace scan on the new example;
- GitHub CI: build, governance, lockfile, contracts, goldens, e2e, learnings, quality gate;
- merged into `main` at `43b7abc`.

Adaptive Skills front:

- merged into `main` at `2d7cbf8`;
- repository status observed clean against `origin/main` after execution.

## Risks and guardrails

Primary remaining risk: ceremony creep.

Guardrails now encoded across the two repositories:

- `Lite` slices do not use the bundle by default;
- the bundle is optional and proportional;
- tasks remain slice-sized, not roadmap-sized;
- readiness review instantiates existing AletheIA gates instead of redefining them;
- Adaptive Skills does not become a macro framework;
- `premortem` is not automatic.

## Current state

The coordinated planning/specification improvement is complete for this slice.

AletheIA has the macro artifact model and example.
Adaptive Skills has the micro facilitation composition.
The two layers are aligned without creating a shared runtime dependency.

## Recommended next boundary

Do not add more framework surface immediately.

The next useful boundary is empirical:

- run the bundle on one real `Standard` Work Slice;
- record where the bundle reduced ambiguity or added ceremony;
- only then decide whether AletheIA needs another example, checklist, or policy signal.

## Closeout verdict

Closed as complete.

The original goal was not to adopt Spec Kit, but to strengthen planning and specification quality while preserving AletheIA's core posture. That goal is satisfied by the current split:

```text
AletheIA = macro governance and readiness
Adaptive Skills = micro facilitation and clarification
Spec Kit = external inspiration, not imported structure
```
