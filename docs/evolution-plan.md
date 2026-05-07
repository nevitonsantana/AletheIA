# AletheIA Evolution Plan

## Status

AletheIA has reached a stable 1.0 baseline. The next evolution should not expand the framework horizontally by adding more concepts. The priority is to make the existing core easier to operate, easier to test in real slices, and harder to inflate by documentation or premature automation.

This plan treats the current repository state as the baseline after:

- the refreshed README and operating-loop framing
- the AletheIA architecture and core framework images
- the 1.1 constrained-adoption / trust-boundary hardening track
- the 1.2 resource-aware operations track
- the context graph decision record
- the Hermes Phase -1 pre-pilot artifacts

## Guiding decision

The next healthy move is **operational compression**, not conceptual expansion.

AletheIA already explains what it is: a portable operating layer that turns model or agent output into bounded, reviewable, validated action.

The next question is narrower:

> Can a person or team execute useful work through AletheIA with low friction, visible decisions, proportional telemetry, and clean restartability?

## Strategic posture

### Do now

- Consolidate the core operating path.
- Align the visual framework language with canonical concepts.
- Reduce entry friction for first-time users.
- Capture real work-slice evidence.
- Turn resource-aware guidance into lightweight operating practice.
- Keep signals advisory and reviewable.

### Do not do yet

- Do not add a new major framework track.
- Do not turn telemetry into rigid scoring.
- Do not create auto-routing claims.
- Do not promote Hermes beyond controlled-runtime executor without real pilot evidence.
- Do not convert context graph usage into standard practice for Next.js projects.
- Do not absorb Adaptative Skills into the AletheIA core.

## Current strengths

### 1. Core framing is now clear

The README now explains AletheIA as a portable layer between model or agent output and governed action. This creates a strong public explanation and reduces the earlier risk of the framework being perceived as only a set of prompts or a personal workflow.

### 2. Work-slice orientation is defensible

The framework uses Work Slice as the main unit of operational work. This is the right abstraction because it carries goal, scope, risk, validation, handoff, and telemetry meaning.

### 3. The framework is correctly provider-agnostic

AletheIA separates framework meaning from runtime implementation. Execution Surface and Runtime Adapter preserve meaning without binding the core to Codex, Claude Code, Hermes, Goose, or any other runtime.

### 4. 1.2 resource-aware operations is pointed in the right direction

The current 1.2 track treats resource awareness as operational observability, not token optimization. It includes context size, cold boot cost, restart and handoff weight, retry waste, runtime fit, and human review effort.

### 5. Context graph usage was tested instead of assumed

The context graph decision is a good example of framework discipline: the graph informs but does not govern. Tests showed weak usefulness in Next.js with shared design systems, so usage should remain optional and specific.

### 6. Hermes is contained by policy

Hermes is currently defined as a controlled runtime executor, not a governor of process, memory, or skills. This preserves the AletheIA principle that runtime does not govern process.

## Main risks

### 1. Surface inflation

The repository now has many useful documents. The risk is that users need to read too much before operating the framework.

Signal of failure:

- a new user understands the philosophy but cannot execute the first slice without guidance from the author.

### 2. Premature instrumentation

Telemetry is useful, but it can become ceremony if every slice requires too many fields.

Signal of failure:

- operators fill telemetry after the fact as documentation theater rather than using it to notice context inflation, retry waste, handoff inflation, or runtime mismatch.

### 3. Semantic drift between image, docs, and operating vocabulary

The new image is strong, but its Kanban Decision Protocol uses terms that do not exactly match readiness gate outcomes.

Signal of failure:

- people treat visual labels as separate framework concepts instead of communication aliases for canonical outcomes.

### 4. Runtime autonomy creep

Hermes, context graph, and future adapters can slowly become sources of process authority.

Signal of failure:

- a runtime starts promoting memory, skills, routing decisions, or permissions without explicit human-reviewed policy.

### 5. Evidence gap

AletheIA has strong structure, but the next maturity level requires comparable evidence from real slices.

Signal of failure:

- the framework keeps adding guidance without showing repeated patterns from real work.

## Evolution cycles

## Cycle 1 — Core Operability Compression

### Objective

Make the AletheIA Core executable with minimal reading.

### Rationale

The framework is conceptually strong, but adoption depends on a small operational path. A person should be able to run one useful slice without reading the full repository.

### Deliverables

1. `docs/core-operating-path.md`
   - A short guide explaining the minimum path from signal to closeout.
   - Target length: 2–3 pages.
   - It should answer: what to do first, what artifact to create, when to decide, when to validate, and when to close or restart.

2. `starter-pack/templates/slice-record-template.md`
   - A unified, lightweight record for first-use operation.
   - It should combine enough of Task Brief, Execution Scope, Context Pack, Decision Record, Execution Record, validation, closeout, restart, and telemetry to support one practical slice.
   - It should not replace specialized artifacts for higher-assurance work.

3. `docs/kanban-decision-protocol.md`
   - A short canonical mapping between visual decision labels and readiness-gate outcomes.

4. Optional image refinement
   - Rename `Restart Package / Learning` to `Restart Package + Learning Record`.
   - Rename or explain `Closeout` as `Encerramento / Closeout` for PT-BR communication use.
   - Map `Avançar`, `Revisar`, `Bloquear`, `Encerrar`, and `Bifurcar` to canonical outcomes.

### Kanban Decision Protocol mapping

| Visual label | Canonical outcome | Meaning |
|---|---|---|
| Avançar | `continue` | Conditions are sufficiently met; continue under current posture. |
| Revisar | `tighten` or `review` | Evidence is weak, ambiguous, or scope/context needs tightening before continuation. |
| Bloquear | `stop` or `review-required` | Risk, missing precondition, or governance issue prevents safe continuation. |
| Encerrar | `closeout` / validated closure | Objective was reached and evidence is enough to close the slice. |
| Bifurcar | `handoff`, `escalate`, or new Work Slice | A new front, boundary, runtime, approval level, or scope should be separated. |

### Acceptance criteria

- A new reader can run one Lite or Standard slice using only:
  - `docs/getting-started.md`
  - `docs/core-operating-path.md`
  - `starter-pack/templates/slice-record-template.md`
- The visual decision labels do not create new competing concepts.
- The core image remains communicable without weakening canonical vocabulary.

### Stop line

Do not create new taxonomy. Consolidate what already exists.

---

## Cycle 2 — Lightweight Resource-Aware Operation

### Objective

Make 1.2 usable in practice without turning telemetry into bureaucracy.

### Rationale

The 1.2 track has good conceptual coverage. The next step is to define a minimum telemetry set for real use.

### Minimum fields for first use

Required:

- `slice_id`
- `project_id`
- `task_shape`
- `risk_posture`
- `cold_boot_budget`
- `exploration_events`
- `expansion_events`
- `expansion_reason_present`
- `runtime_id`
- `reasoning_depth`
- `retry_count`
- `retry_pattern`
- `validation_outcome`
- `human_review_level`
- `manual_rescue_required`
- `handoff_required`
- `handoff_quality`
- `restart_burden`

Optional:

- elapsed time
- estimated cost
- tool-call count
- exact token count
- files read
- files suggested by graph

### Deliverables

1. Update or extend `docs/slice-telemetry-model.md`
   - Add a clearly marked `minimum viable telemetry` section.

2. Add `examples/resource-aware-operations/minimum-viable-slice-record.md`
   - One realistic example using the minimum fields only.

3. Add `starter-pack/checklists/resource-aware-slice-review.md`
   - A checklist for review after 5–10 slices.

### Acceptance criteria

- At least 10 real or near-real slices can be recorded without requiring exact token or cost math.
- The records make context inflation, retry waste, handoff inflation, runtime mismatch, or human rescue visible when present.
- The telemetry remains reviewable by a human without a dashboard.

### Stop line

Do not require universal numeric scoring. Use classes and reviewable proxies.

---

## Cycle 3 — Advisory Signals Before Enforcement

### Objective

Turn telemetry into visible decision prompts without creating hard automation too early.

### Rationale

AletheIA should first surface useful signals. It should not begin with rigid blocking, universal thresholds, or automatic routing.

### Signal levels

Use three levels only:

| Level | Meaning | Default action |
|---|---|---|
| `note` | Mild signal; visibility is enough. | Continue, but record observation. |
| `warning` | Waste, ambiguity, or mismatch is becoming meaningful. | Review before continuing by habit. |
| `review-required` | Current path may no longer be healthy. | Pause and explicitly decide. |

### Signal families

Use the existing 1.2 families:

- context inflation
- expansion reason missing
- retry waste
- handoff inflation
- runtime / task-shape mismatch
- hidden human rescue
- slice creep

### Deliverables

1. `docs/policy-signal-operating-guide.md`
   - How to use signals in real slice review.

2. `examples/resource-aware-operations/signal-review-cases.md`
   - 3 examples: healthy continuation, warning with tightening, review-required with handoff/escalation.

3. Update `docs/readiness-gates-spec.md`
   - Add a short section mapping signal families to gate inspection.

### Acceptance criteria

- Every signal points to one of these actions:
  - continue
  - tighten
  - review
  - handoff
  - escalate
  - stop
- No signal claims automatic enforcement.
- Reviewers can explain each signal in one sentence.

### Stop line

Do not introduce scores, rankings, or vendor-specific routing policy.

---

## Cycle 4 — Controlled Evidence Pilots

### Objective

Collect repeated, comparable evidence from real work before opening stronger 1.3 evaluation.

### Rationale

The framework should now prove usefulness across slices, not add more surface by inertia.

### Pilot lanes

#### Lane A — AletheIA self-application

Use the AletheIA repository itself as dogfooding.

Best for testing:

- documentation slices
- decision records
- closeout quality
- restart burden
- governance checks
- resource-aware telemetry

#### Lane B — Crisis Monitor

Use Crisis Monitor as the main applied product context.

Best for testing:

- multi-runtime work
- handoffs between agents
- resource-aware context control
- runtime fit
- PR review / implementation slices
- project-local extension boundaries

#### Lane C — External or simulated lightweight project

Use a smaller, less familiar project to test portability.

Best for testing:

- onboarding clarity
- minimum operating path
- whether the framework depends too much on the author’s context

### Evidence target

Minimum useful evidence set:

- 15–20 recorded slices total
- at least 2 project contexts
- at least 3 task shapes
- at least 5 examples involving handoff or restart
- at least 3 cases where a warning or review-required signal affected the next action

### Review questions

After the evidence set, review:

- Where did context inflate?
- Where did handoffs become narrative replay?
- Where did retries repeat without strategy change?
- Where was the runtime stronger or weaker than the task needed?
- Where did human rescue hide poor model/runtime fit?
- Which local rules repeated across projects?
- Which docs were not used at all?

### Deliverables

1. `docs/evidence-pilot-plan.md`
   - Defines lanes, target slices, and review cadence.

2. `examples/pilot-conversion/aletheia-self-application-review.md`
   - First review after a small batch of self-application slices.

3. `examples/pilot-conversion/resource-aware-slice-comparison.md`
   - A comparative review across multiple slices.

### Acceptance criteria

- Evidence shows repeated patterns, not isolated anecdotes.
- At least one framework surface is simplified or removed based on pilot evidence.
- At least one local pattern is intentionally kept local instead of promoted to core.

### Stop line

Do not claim 1.3 readiness from one interesting example.

---

## Cycle 5 — 1.3 Comparative Evaluation Gate

### Objective

Only open 1.3 when repeated evidence justifies comparative evaluation.

### Rationale

1.3 should not mean “more documentation.” It should mean AletheIA can compare slices, runtimes, handoffs, and resource patterns with enough evidence to avoid speculation.

### Conditions to open 1.3

Open 1.3 only if at least three conditions are true:

- Multiple slices show similar resource-aware pressure.
- The same warning pattern appears across more than one slice.
- The same local translation appears in more than one project.
- Runtime mismatch is visible in repeated cases.
- Handoff quality differs meaningfully by artifact shape.
- Human review burden reveals a repeatable failure pattern.
- A comparative review can be written without hiding local differences.

### Possible 1.3 deliverables

Only after gate approval:

- comparative slice review model
- runtime fit comparison guide
- handoff quality pattern library
- context inflation pattern library
- lightweight benchmark posture
- repeated-signal review template

### Deferred until later

Keep these out of 1.3 unless evidence becomes unusually strong:

- auto-routing
- vendor ranking
- learning-layer automation
- runtime self-optimization
- hard enforcement engine

### Acceptance criteria

- 1.3 is opened through an explicit decision record.
- The decision references repeated evidence.
- The scope remains comparative, not orchestration-heavy.

---

## Immediate implementation backlog

### P0 — Core compression

1. Create `docs/core-operating-path.md`.
2. Create `starter-pack/templates/slice-record-template.md`.
3. Create `docs/kanban-decision-protocol.md`.
4. Review the core framework image against canonical vocabulary.

### P1 — Minimum telemetry

5. Add `minimum viable telemetry` to `docs/slice-telemetry-model.md`.
6. Create `examples/resource-aware-operations/minimum-viable-slice-record.md`.
7. Create `starter-pack/checklists/resource-aware-slice-review.md`.

### P2 — Signal practice

8. Create `docs/policy-signal-operating-guide.md`.
9. Create `examples/resource-aware-operations/signal-review-cases.md`.
10. Update `docs/readiness-gates-spec.md` with signal-to-gate mapping.

### P3 — Evidence pilots

11. Create `docs/evidence-pilot-plan.md`.
12. Run 5 self-application slices.
13. Run 5 Crisis Monitor slices.
14. Review what should be simplified, removed, or kept local.

### P4 — 1.3 gate

15. Create a decision record only if repeated evidence justifies comparative evaluation.

---

## Suggested issue breakdown

### Issue 1 — Consolidate Core Operating Path

Goal: create the minimum path for running one AletheIA slice.

Files:

- `docs/core-operating-path.md`
- `starter-pack/templates/slice-record-template.md`

Acceptance:

- A new user can complete one Lite/Standard slice with minimal reading.

### Issue 2 — Align Kanban Decision Protocol

Goal: map public visual labels to canonical readiness outcomes.

Files:

- `docs/kanban-decision-protocol.md`
- optional README cross-link

Acceptance:

- No visual label creates a competing canonical concept.

### Issue 3 — Define Minimum Viable Telemetry

Goal: make 1.2 usable in real slices.

Files:

- `docs/slice-telemetry-model.md`
- `examples/resource-aware-operations/minimum-viable-slice-record.md`
- `starter-pack/checklists/resource-aware-slice-review.md`

Acceptance:

- First-use telemetry works without exact token/cost metrics.

### Issue 4 — Operationalize Policy Signals

Goal: turn telemetry into reviewable decision prompts.

Files:

- `docs/policy-signal-operating-guide.md`
- `examples/resource-aware-operations/signal-review-cases.md`
- `docs/readiness-gates-spec.md`

Acceptance:

- Signals map to explicit next actions and remain advisory-first.

### Issue 5 — Run Controlled Evidence Pilot

Goal: collect enough repeated evidence to decide whether 1.3 is justified.

Files:

- `docs/evidence-pilot-plan.md`
- pilot review artifacts under `examples/pilot-conversion/`

Acceptance:

- 15–20 slices across at least two contexts before 1.3 is opened.

---

## Success criteria for this evolution plan

The plan is working if AletheIA becomes easier to use without becoming less rigorous.

Concrete signs:

- fewer documents needed for first successful use
- clearer decision outcomes
- lighter but more useful telemetry
- visible context and handoff waste
- real pilot evidence before new framework claims
- stronger separation between core, local extension, runtime, and skill layers

## Final recommendation

Do not open a new conceptual track now.

Compress the operating path, run real slices, collect comparable evidence, and only then decide whether 1.3 comparative evaluation is justified.
