# AletheIA + Adaptive Skills Integrated Evolution Backlog

## Status

- **Backlog version:** 0.1
- **Baseline date:** 2026-06-22
- **Canonical backlog owner:** AletheIA
- **Capability-side partner:** Adaptive Skills
- **Source archive SHA-256:** `dabc9d75fb4c7f4febacebe5d2032d93d92a93610d4bb857484004f1c230244f`

This backlog reconciles ten evolution packs with the implementation already present in AletheIA and Adaptive Skills. It is an executive map and dependency graph, not a replacement for the source packs.

Before implementing an epic, reopen its complete pack. Ask for a new copy only when the archive is unavailable or a newer revision exists.

## Operating boundary

| Layer | Owns | Does not own |
|---|---|---|
| AletheIA | Macro governance, Work Slice policy, pattern selection, gates, decisions, closure and visual projection contracts | Canonical skill methods or runtime execution |
| Adaptive Skills | Portable methods, capability metadata, compatibility declarations, evidence hints and governed evolution | AletheIA decisions, approval or global routing |
| Runtime / harness | Tool execution, tests, diffs, logs, budgets and evidence capture | Governance interpretation or canonical skill evolution |
| Resource Observatory | Read-only projection of source-backed signals | Selection, execution, approval, mutation or inferred compatibility |

## Status vocabulary

| Status | Meaning |
|---|---|
| `delivered` | The intended capability is already represented by accepted implementation or contracts. |
| `partially-delivered` | A meaningful baseline exists, but a bounded gap remains. |
| `planned` | Approved backlog candidate with a dependency-aware implementation slice. |
| `absorbed` | The requirement is already covered by another canonical contract and must not create a duplicate. |
| `deferred` | Valid idea that lacks evidence, prerequisite maturity or a safe first slice. |
| `rejected` | The proposed form conflicts with current boundaries; the rationale is recorded. |

No requirement may disappear silently. A changed status requires evidence or a decision reference.

## Pack reconciliation

| Pack | Posture | Canonical destination | Next decision |
|---|---|---|---|
| P0 — Coding Safety Workflow | `planned` | Coding specialization of the existing Work Slice plan | Start only after P4 defines intent and expectations boundaries. |
| P1 — Visual Operations Layer | `partially-delivered` | Current Visual Operations contracts, examples and Mission Control | Treat current layer as baseline; gate live importers and advanced telemetry on repeated evidence. |
| P2 — Reference Intake & Adoption | `planned` | Cross-repository intake protocol owned by AletheIA | Use the ten-pack archive as the first reconciliation example. |
| P3 — Observation Governance | `planned` | AletheIA observation contract plus Adaptive Skills return pattern | Begin with docs, examples and recoverability; defer automatic adapters. |
| P4 — Intent-to-Evidence Work Slice | `planned` | Optional Work Slice references and consultative intent clarification | Avoid a parallel lifecycle or mandatory ceremony for every slice. |
| P5 — Capability Routing Governance | `partially-delivered` | Existing execution vehicle, AHC, capability graph and pattern declarations | Publish one reconciliation note; do not create a routing engine. |
| P6 — System-Aware Governance | `deferred` as umbrella | Small capability modules and evidence-backed pilots | Pilot one Design System/Pulso module before promoting broader governance. |
| P7 — Agent Role Orchestration | `partially-delivered` | Existing portable role catalog, adoption guide and runtime adapters | Reconcile missing contract fields; do not add a second role model. |
| P8 — Context Surface Governance | `partially-delivered` | Minimum registry and progressive-loading policy | Manual registry and provider-loading example are delivered; automation and broader smell detection remain evidence-gated. |
| P9 — Governed Loop Observation | `partially-delivered` | Existing Resource Observatory skill inspector | Unavailable-first observation is delivered; source-backed states and the bounded debugging pilot still depend on canonical sources. |

## Dependency graph

```text
S0 Stabilize current inspector context
  -> S1 Register source packs and canonical backlog
      -> S2 Reference Intake minimum protocol (P2)
      -> S3 Pattern context unavailable states (P9)
          -> S4 Context Surface minimum registry (P8)
          -> S5 Observation contract + skill return (P3)
              -> S6 Source-backed pattern context (P9)
                  -> S7 Bounded debugging pilot (P9)
      -> S8 Intent-to-Evidence contracts (P4)
          -> S9 Coding Safety specialization (P0)
      -> S10 Capability routing reconciliation (P5)
          -> S11 System-aware Design System pilot (P6)
      S4 + S5 + S10
          -> S12 Agent-role reconciliation pilot (P7)
```

P1 remains the delivered visual baseline across these slices. Its future importers and comparative metrics reopen only when the existing next-signal gates are met.

## PR-ready slices

### S0 — Integrate skill execution context

- **Repository / layer:** AletheIA / Resource Observatory
- **Covers:** P1 operational baseline; P9 prerequisite
- **Dependencies:** none
- **Status:** `delivered` by PR #250
- **Acceptance:** mode, result, modules, handoff and evidence remain optional, source-backed and inspector-only.
- **Evidence:** merge commit `d7c35bf`; CI governance, build, tests and visual snapshots passed.

### S1 — Publish integrated backlog and traceability

- **Repository / layer:** AletheIA canonical; Adaptive Skills cross-link
- **Covers:** all packs
- **Dependencies:** S0
- **Non-goals:** importing pack files into canonical contracts; implementing any pack wholesale.
- **Acceptance:** every pack has posture, requirement-family mapping, dependencies, acceptance evidence and deferred/rejected rationale.
- **Evidence:** governance check, link validation and clean diff.

### S2 — Reference Intake minimum protocol

- **Repository / layer:** AletheIA governance; Adaptive Skills capability-side template
- **Covers:** P2
- **Dependencies:** S1
- **Non-goals:** dependency installation, automatic adoption or skill mutation.
- **Acceptance:** one intake contract, one adoption decision template and one worked example based on this archive.
- **Evidence:** source provenance, layer mapping and adopt/adapt/reference/defer/reject decision are explicit.

### S3 — Pattern context unavailable states

- **Repository / layer:** AletheIA / Resource Observatory view model
- **Covers:** P9 pattern selection and compatibility fallback
- **Dependencies:** S0, S1
- **Status:** `delivered` by PR #252
- **Non-goals:** new page, card, persistence schema, selection action or loop execution.
- **Acceptance:** optional `patternContext` renders no-context, unavailable compatibility and missing-gate states without inference.
- **Evidence:** merge commit `0d8f8b8`; typed fixtures, adapter/inspector tests, keyboard/focus regression, desktop/mobile browser QA and CI snapshots.

### S4 — Context Surface minimum registry

- **Repository / layer:** AletheIA context governance
- **Covers:** P8
- **Dependencies:** S1
- **Status:** `delivered` by AletheIA PR #254 and Adaptive Skills PR #65
- **Non-goals:** automatic context router or mandatory registry of every document.
- **Acceptance:** each registered surface declares owner, scope, load mode, path, activation, freshness, budget and allowed/prohibited content.
- **Evidence:** AletheIA merge `3f2df81` provides the contract, template and Work Slice example; Adaptive Skills merge `3606089` provides the capability-scoped provider-loading example; both repositories passed their full CI gates.

### S5 — Recoverable observation contract

- **Repository / layer:** AletheIA contract; Adaptive Skills return pattern
- **Covers:** P3
- **Dependencies:** S1; aligns with S4
- **Status:** `delivered` by AletheIA PR #256 and Adaptive Skills PR #66
- **Non-goals:** terminal proxy, RTK dependency, evidence database or automatic normalizer.
- **Acceptance:** structured observations preserve decision-relevant evidence; any lossy observation requires a recovery pointer; unavailable metrics are not invented.
- **Evidence:** AletheIA merge `a5f3e9c` provides the contract, template and test-output example; Adaptive Skills merge `60de75d` provides the portable skill return, template and feature-planning example; both repositories passed their full CI gates.

### S6 — Source-backed pattern context

- **Repository / layer:** AletheIA projection adapters; Adaptive Skills compatibility source
- **Covers:** P9 observe milestone
- **Dependencies:** S3, S5; canonical execution-pattern records already exist
- **Status:** `delivered` by AletheIA PR #258
- **Non-goals:** pattern selection or compatibility inference inside the UI.
- **Acceptance:** inspector separates pattern, mode, autonomy and result; every displayed field carries a source reference.
- **Evidence:** merge `ddb6b32` adds a read-only projection adapter, a schema-valid debugging selection fixture, canonical Adaptive Skills declaration refs, and compatible, incompatible, unavailable, missing-objective-gate and analytics-gating tests; full CI passed.

### S7 — Bounded debugging loop pilot

- **Repository / layer:** AletheIA governance; Adaptive Skills debugging declaration; runtime evidence
- **Covers:** P9 pilot milestone
- **Dependencies:** S5, S6
- **Non-goals:** generic loop engine, strategic loops, automatic merge or skill self-update.
- **Acceptance:** one reproducible failure; `loop_until_done`; maximum three iterations; explicit budget; objective test/reproduction gate; evidence per iteration; human review before merge.
- **Evidence:** selection record, compatibility declaration, loop-run record, audit refs and closure outcome.

### S8 — Intent-to-Evidence minimum contracts

- **Repository / layer:** AletheIA Work Slice; Adaptive Skills consultative pattern
- **Covers:** P4
- **Dependencies:** S1
- **Non-goals:** replacing PRD/SDD, mandatory use for Lite slices or agent-authored intent without confirmation.
- **Acceptance:** optional Intent and Expectations references, guessing-risk review and evidence-to-expectation map integrate with readiness and reconcile.
- **Evidence:** one synthetic example and one real bounded pilot.

### S9 — Coding Safety specialization

- **Repository / layer:** AletheIA coding plan profile; Adaptive Skills planning advisor candidate
- **Covers:** P0
- **Dependencies:** S8
- **Non-goals:** new runtime, `/improve` command, autonomous coding, policy engine or auto-merge.
- **Acceptance:** plan declares base state, in/out scope, verification commands and expected results, drift check, rollback and stop conditions.
- **Evidence:** one Standard coding slice reviewed by a non-engineer-facing checklist.

Promote `implementation-planning-advisor` only if the pilot proves a recurring gap not covered by `feature-planning`, `testing`, `debugging` and `architecture-review`.

### S10 — Capability routing reconciliation

- **Repository / layer:** AletheIA governance; Adaptive Skills capability metadata
- **Covers:** P5
- **Dependencies:** S1
- **Non-goals:** routing engine, hard-coded provider selection or global routing owned by Adaptive Skills.
- **Acceptance:** one canonical mapping explains tool, skill, subagent, execution vehicle, execution pattern and AHC without adding competing terms.
- **Evidence:** four worked decisions and explicit references to existing contracts.

### S11 — System-aware Design System pilot

- **Repository / layer:** Adaptive Skills capability module; AletheIA pilot governance
- **Covers:** first bounded slice of P6
- **Dependencies:** S2, S4, S10
- **Non-goals:** adopting the entire SAGP umbrella or creating many first-class skills.
- **Acceptance:** one Pulso-aware review loads the governing Design System only when relevant, reports compliance and exceptions, and creates an evolution proposal only when evidence supports it.
- **Evidence:** source registry, activation record, review output and reconcile.

### S12 — Agent-role contract reconciliation pilot

- **Repository / layer:** AletheIA roles and adapters; Adaptive Skills provider integration
- **Covers:** P7
- **Dependencies:** S4, S5, S10
- **Non-goals:** seven autonomous agents, provider lock-in or duplicated role catalog.
- **Acceptance:** existing Software Engineer and QA/Governance Reviewer roles declare authority, allowed capabilities/tools, evidence, stop and handoff behavior for one real Work Slice.
- **Evidence:** role plan, review record, closure brief and provider references.

## Requirement traceability matrix

The identifiers below preserve requirement families. The complete pack remains authoritative for detailed wording, examples and edge cases.

| Requirement family | Source | Status | Backlog destination | Preservation note |
|---|---|---|---|---|
| P0-R1 Plan-first coding governance | P0 PRD/SDD | `planned` | S9 | Specialization of Work Slice planning, not a lifecycle. |
| P0-R2 Advisor/executor/verifier/reconciler separation | P0 PRD | `planned` | S9, S12 | Reuse role and harness boundaries. |
| P0-R3 Scope, drift, rollback, stop and expected evidence | P0 templates | `planned` | S9 | Preserve non-engineer review checklist. |
| P0-R4 Optional plan validator | P0 roadmap | `deferred` | Post-S9 evidence gate | Stabilize manually first. |
| P1-R1 Read-only Mission Control projection | P1 PRD/guardrails | `delivered` | P1 baseline | Existing Visual Operations contracts and app. |
| P1-R2 Source refs, unavailable and metadata-first privacy | P1 SDD/guardrails | `delivered` | P1 baseline, all UI slices | Remains invariant. |
| P1-R3 Static/typed cockpit and Observatory | P1 roadmap | `delivered` | P1 baseline | Evidence Ledger and Resource Observatory exist. |
| P1-R4 Live importers and advanced observability | P1 roadmap | `deferred` | Future next-signal review | Requires repeated real evidence. |
| P2-R1 External reference intake and pattern extraction | P2 PRD | `planned` | S2 | First example uses the ten-pack archive. |
| P2-R2 Layer mapping and adoption decision | P2 SDD/templates | `planned` | S2 | AletheIA owns adoption decision. |
| P2-R3 Pilot before canon promotion | P2 guardrails | `planned` | S2 and every later epic | Adaptive Skills evolution remains governed. |
| P2-R4 Automatic adoption/dependency installation | P2 non-goals | `rejected` | None | Conflicts with human-reviewed adoption boundary. |
| P3-R1 Structured observation normalization | P3 PRD/contract | `partially-delivered` | S5 | Minimum record is delivered; automatic normalization remains deferred. |
| P3-R2 Lossy output recovery pointer | P3 contract | `delivered` | S5 | Mandatory invariant in both repository templates and examples. |
| P3-R3 Progressive visibility | P3 PRD/SDD | `partially-delivered` | S5 and future UI | Rendering levels are contracted; no new UI or visibility switch was introduced. |
| P3-R4 Automatic adapters and telemetry | P3 implementation plan | `deferred` | Post-S5 pilot | No invented compression or token precision. |
| P3-R5 Skill observation return | P3 Adaptive Skills addendum | `delivered` | S5 | Portable summary, evidence, risk, advisory handoff and governed recovery. |
| P4-R1 Intent and Expectations references | P4 PRD/SDD | `planned` | S8 | Optional and proportional. |
| P4-R2 Agent guessing risk and presence checkpoints | P4 SDD | `planned` | S8 | High-risk holes stop execution. |
| P4-R3 Evidence-to-expectation and reconcile | P4 SDD/templates | `planned` | S8 | Evidence closes expectations, not agent confidence. |
| P4-R4 `intent-clarification` capability | P4 Adaptive Skills proposal | `planned` | S8 | Begin consultative/docs-first if skill promotion is premature. |
| P5-R1 Tool/skill/subagent routing vocabulary | P5 PRD | `partially-delivered` | S10 | Reconcile with vehicle and pattern contracts. |
| P5-R2 Delegation envelope and evidence | P5 SDD | `absorbed` | AHC/orchestration contracts; S10 cross-link | No duplicate schema unless a concrete gap remains. |
| P5-R3 Adaptive Skills capability manifest | P5 proposal | `absorbed` | Existing capability graph and declarations | Extend only through governed evolution. |
| P5-R4 Runtime routing engine | P5 non-goal | `rejected` | None | Advisory routing remains the boundary. |
| P6-R1 Detect and honor existing systems | P6 PRD | `planned` | S11 | First pilot: Pulso Design System. |
| P6-R2 Quality, design, engineering and QA governance umbrella | P6 packs | `deferred` | Post-S11 modules | Decompose; do not batch. |
| P6-R3 Capability-first modules and route hints | P6 assessment | `planned` | S11 | Promote only after recurring evidence. |
| P6-R4 Large set of new skills | P6 anti-patterns | `rejected` | None | Prefer modules and metadata. |
| P7-R1 Portable professional roles | P7 PRD | `partially-delivered` | S12 | Existing role catalog is canonical. |
| P7-R2 Role authority, evidence, stop and output contracts | P7 prompt assessment | `planned` | S12 | Add only missing fields. |
| P7-R3 Skill-provider independence | P7 policies | `partially-delivered` | S10, S12 | Adaptive Skills preferred, not mandatory. |
| P7-R4 Full seven-agent orchestration | P7 roadmap | `deferred` | Post-S12 evidence gate | Pilot two roles first. |
| P8-R1 Context Surface Registry | P8 PRD/schema | `delivered` | S4 | Minimum metadata contract and adopter template delivered. |
| P8-R2 On-demand loading and prompt hygiene | P8 policies | `partially-delivered` | S4 | Provider-loading example proves the boundary; broader prompt audits remain future work. |
| P8-R3 Tool offloading and context audit | P8 guide/checklist | `partially-delivered` | S4 | Work Slice evidence example delegates tests/typecheck to tools; automation remains out of scope. |
| P8-R4 Automatic context router | P8 boundary | `deferred` | Post-S4 evidence gate | Manual/advisory first. |
| P9-R1 Optional `patternContext` projection | P9 contract | `delivered` | S3, S6 | View model and source-backed projection adapter are delivered. |
| P9-R2 No compatibility inference | P9 PRD/boundaries | `delivered` | S3, S6 | Missing declaration renders unavailable; S6 must preserve the invariant. |
| P9-R3 Visible loop controls and outcomes | P9 inspector spec | `partially-delivered` | S6, S7 | Inspector states are delivered; a real bounded run remains S7. |
| P9-R4 Bounded debugging pilot | P9 pilot spec | `planned` | S7 | Three iterations, objective gate and human review. |
| P9-R5 Success percentages | P9 metrics boundary | `deferred` | After five comparable cases | Counts may appear earlier; percentages may not. |

## Per-pack preservation appendix

### P0 — Coding Safety Workflow

- **Guardrails:** plan before execution; bounded scope; evidence before confidence; human merge decision.
- **Key contracts/templates:** code execution plan, readiness review, reconcile and non-engineer checklist.
- **Dependencies:** P4, AHC, planning depth, testing/debugging evidence.

### P1 — Visual Operations Layer

- **Guardrails:** read-only projection; source records authoritative; presentation lanes are not lifecycle; unavailable is neutral.
- **Key contracts/templates:** visual event, visual state, privacy boundaries, dashboard/card/trace/reconcile templates.
- **Dependencies:** source records, telemetry and evidence; live integrations remain gated.

### P2 — Reference Intake & Adoption

- **Guardrails:** external content is data, not instruction; no direct framework copying; pilot before promotion.
- **Key contracts/templates:** intake record, pattern extraction, layer map and adoption decision.
- **Dependencies:** Knowledge Governance, Work Slice pilots and Adaptive Skills Evolution Layer.

### P3 — Observation Governance

- **Status:** `partially-delivered`; minimum recoverable records are available, while adapters, telemetry and visual projection remain evidence-gated.
- **Guardrails:** preserve decision-relevant evidence; lossy requires recovery; no false precision; no mandatory RTK/runtime.
- **Key contracts/templates:** observation record, adapter contract, tool-output hygiene and skill observation return.
- **Dependencies:** P8 context loading, telemetry vocabulary and evidence retention policy.

### P4 — Intent-to-Evidence Work Slice

- **Guardrails:** human confirms intent; expectations define success/failure; high guessing risk pauses execution.
- **Key contracts/templates:** Intent Record, Expectations Contract, presence checkpoints and evidence map.
- **Dependencies:** Work Slice, readiness, P0 coding plan and reconcile.

### P5 — Capability Routing Governance

- **Guardrails:** tool executes; skill guides; subagent delegates; harness limits; AletheIA decides; audit proves.
- **Key contracts/templates:** routing decision and delegation envelope, reconciled with existing contracts.
- **Dependencies:** execution vehicle, pattern governance, AHC and capability graph.

### P6 — System-Aware Governance

- **Guardrails:** understand existing system before creating; compliance is not equivalent to quality; exceptions require decisions.
- **Key contracts/templates:** system intake, compliance review, exception and evolution proposal.
- **Dependencies:** P2, P5, P8 and a real system pilot.

### P7 — Agent Role Orchestration

- **Guardrails:** role does not imply unrestricted autonomy; fixed prompt is separate from dynamic Work Slice context; no role approves outside authority.
- **Key contracts/templates:** role contract, activation, provider, review, closure and human-review request.
- **Dependencies:** P5 routing, P8 context loading and P3 evidence return.

### P8 — Context Surface Governance

- **Guardrails:** load only when relevant; record owner/scope/freshness/budget; avoid prompt, skill and provider leakage.
- **Key contracts/templates:** surface registry, routing policy, smell catalog, loading policy and closure context list.
- **Dependencies:** current context-rot and Knowledge Governance contracts.

### P9 — Governed Loop Observation

- **Status:** `partially-delivered`; the observe milestone is complete and the bounded debugging pilot remains.
- **Guardrails:** observe before pilot; no UI authority; no inferred compatibility; objective gate, budget, limits and human boundary are mandatory.
- **Key contracts/templates:** `patternContext`, debugging pilot record, inspector states and loop-run evidence.
- **Dependencies:** PR #250, ADR-015, Adaptive Skills compatibility declarations, P3 observation return.

## Validation contract for every slice

Every implementation slice must report:

1. repository and owning layer;
2. pack requirement families covered;
3. dependencies and baseline ref;
4. explicit non-goals;
5. acceptance criteria and evidence produced;
6. risks, deferred requirements and any status changes;
7. applicable repository checks.

Minimum checks:

- AletheIA governance validation and `git diff --check`;
- schema, JSON and YAML validation when structured artifacts change;
- Mission Control typecheck, tests, build, snapshots and inspector accessibility regression when UI changes;
- Adaptive Skills skill, evolution, projection and capability validators when that repository changes;
- link/reference validation for all changed documentation.

## Reopening and change control

Before starting a pack:

1. verify the source archive checksum or register the newer revision;
2. reopen the complete pack, including guardrails, templates, examples and assessment;
3. compare it with the current repositories instead of trusting this snapshot alone;
4. update requirement statuses only with evidence;
5. create a small Work Slice and preserve unresolved requirements in this backlog.

This prevents the backlog from becoming a lossy summary while keeping day-to-day planning readable.
