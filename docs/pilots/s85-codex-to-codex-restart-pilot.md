# S85 — Codex-to-Codex Restart Pilot

## Protocol

This is a read-only same-runtime pilot. Two fresh Codex sessions receive one package each, have no prior chat history, and may read only the listed authoritative sources before returning the post-resume check. They must not mutate files, run validation, replay old transcript history, or infer missing state.

## Frozen real Work Slice

- **Source slice:** S84 Restart Package Portability Compatibility Review (merged through PR #456 and status-reconciled through PR #457).
- **Frozen commit:** `efbb551514191ef5d1a59d7c028dcec1f2f725bf`.
- **Objective:** determine whether existing Restart Package fields absorb portability semantics or justify only a pilot-only optional profile.
- **Decision:** `refine`; Restart Package remains canonical; `canonical_artifact_count: 0`.
- **Validation:** PR #456 CI passed; PR #457 CI passed; `SYSTEM_STATE.md` is `Active: none`.
- **Sensitivity:** `internal`; no secrets, personal data, or external source content are included.

## Authoritative sources allowed after resume

1. `SYSTEM_STATE.md`
2. `docs/reports/s84-restart-package-portability-compatibility-review.md`
3. `docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md` (S84/S85 sections only)

## Baseline package

<!-- RESTART_PACKAGE_BEGIN -->
## Context for Clean Restart
- **Project:** `AletheIA`
- **Official Work Item:** `S84 Restart Package Portability Compatibility Review`
- **Slice ID:** `S84`
- **Validation Status:** `validated and merged`
- **Mission Focus:** Review existing Restart Package continuity fields before any portability experiment.
- **Resume Entrypoint:** `docs/reports/s84-restart-package-portability-compatibility-review.md`
- **Last Boundary Summary:** Existing contracts absorb compact restart semantics; only bounded portability metadata remained under review.
- **Do Not Reopen:** A second continuity artifact, schema, composer, runtime adapter, template adoption, automation, or Adaptive Skills mutation.
- **Next Official Step:** `S85`, only as a read-only Codex-to-Codex pilot.
- **Open New Execution Surface:** `yes`
- **Why:** The next work is a separate evidence slice and must not rely on previous transcript history.
- **Next Immediate Action:** Perform the post-resume check and identify the safe next action without mutation.
- **Known Constraints:** Read only the listed authoritative sources; missing state remains unavailable; do not infer pilot success.
- **Governing Context Refs:** `SYSTEM_STATE.md`; S84 review; integrated roadmap S84/S85.
- **Active Decisions and Evidence Refs:** S84 verdict `refine`; PR #456; PR #457.
- **Active Risks:** Treating a pilot-only profile as adopted contract; losing sensitivity or validation constraints during restart.
- **Accepted Limitations:** No baseline/candidate value claim is available before the two session outputs are independently reviewed.
- **Reload Required Before Acting:** `SYSTEM_STATE.md`, S84 report, roadmap S84/S85.
- **Technical Review Still Required:** Independent comparison against these authoritative sources.
<!-- RESTART_PACKAGE_END -->

## Candidate package

The candidate is the baseline package plus the pilot-only profile approved by S84:

```md
### Portability Check (pilot only)
- **Source runtime / destination runtime:** `Codex desktop / Codex desktop`
- **Frozen commit / checked at:** `efbb551514191ef5d1a59d7c028dcec1f2f725bf / 2026-07-25`
- **Invalidation triggers:** source commit changes; source refs disagree; required sensitivity is above `internal`; validation status is not `validated and merged`.
- **Allowed receiving sensitivity:** `internal`
- **Redactions or blocked references:** `none`; any unlisted source is blocked.
- **Unavailable destination semantics:** runtime trust configuration and historical transcript state are `unavailable`.
```

## Required receiving-session output

Return exactly:

1. known from package;
2. missing or unavailable;
3. sources reloaded;
4. safe next action;
5. human or technical review still required.

The evidence report must retain the complete outputs and compare them against the frozen sources. No template, schema, or runtime behavior is changed by this pilot.

## Complete receiving-session outputs

### Baseline fresh Codex session

1. **Known from package**
   - S84 is validated and merged; its `refine` verdict leaves one bounded portability-metadata gap.
   - S85 is planned as a separately activated, read-only Codex-to-Codex baseline/candidate post-resume comparison from the same Work Slice snapshot.
   - Restart Package remains the sole continuity artifact. No mutation, transcript replay, canonization, automation, runtime configuration, or comparative claim is allowed.
2. **Missing or unavailable**
   - Pilot success/value is unavailable: no independently reviewed baseline and candidate outputs exist.
   - Any missing portability values must remain `unavailable`; do not infer sensitivity, destination semantics, redactions, freshness, or invalidation state.
   - No adopted optional profile, template/schema/composer/adapter authority, or S86 decision exists.
3. **Sources reloaded**
   - Baseline package in this file; `SYSTEM_STATE.md`; S84 review; S84/S85 and P25 roadmap sections.
4. **Safe next action**
   - Keep the session read-only and identify/record only the safe next action: conduct the separately activated S85 post-resume baseline check against the frozen authoritative state, without claiming results or changing files.
5. **Human or technical review still required**
   - Independently compare complete baseline and candidate outputs against listed authoritative sources, then verify frozen state, validation/sensitivity constraints, correct next action, and absence of critical loss before S86.

### Candidate fresh Codex session

1. **Known from package**
   - S84 is validated and merged with a `refine` verdict; Restart Package remains sole canonical continuity artifact (`canonical_artifact_count: 0`).
   - Candidate adds pilot-only Portability Check: Codex desktop → Codex desktop, frozen commit `efbb551514191ef5d1a59d7c028dcec1f2f725bf`, checked 2026-07-25, sensitivity `internal`, and no redactions.
   - Invalidation triggers are commit/ref disagreement, sensitivity above `internal`, or validation not `validated and merged`.
2. **Missing or unavailable**
   - Runtime trust configuration and historical transcript state are `unavailable`.
   - No baseline/candidate value claim is available before independent review; S85 is planned, not active; no adoption may be inferred.
3. **Sources reloaded**
   - `SYSTEM_STATE.md`; S84 review; S84/S85 roadmap sections.
4. **Safe next action**
   - Preserve the read-only candidate output and independently compare it with baseline against frozen authoritative sources; do not mutate, replay transcripts, or adopt the profile.
5. **Human or technical review still required**
   - Verify constraint, sensitivity, validation, and unavailable-state preservation across both outputs; S86 remains deferred.

## Independent comparison

| Check against frozen sources | Baseline | Candidate | Result |
|---|---|---|---|
| Restart Package remains canonical | Explicit | Explicit | preserved |
| Validation and no-mutation boundary | Explicit | Explicit | preserved |
| Safe next action | Read-only post-resume check | Independent comparison after check | preserved |
| Source/destination runtime | `unavailable` | explicit | candidate adds only the approved metadata |
| Frozen commit and check moment | `unavailable` | explicit | candidate adds only the approved metadata |
| Invalidation, sensitivity, blocked refs | `unavailable` | explicit/internal/no unlisted refs | candidate adds only the approved metadata |
| Unavailable destination semantics | generic only | explicit | candidate preserves `unavailable` rather than inferring |

The candidate makes the bounded metadata legible without loss of a critical constraint or boundary in this small same-runtime observation. It does **not** establish value, reduce a measured human interaction, or authorize S86: those decisions remain for the S86 value gate.
