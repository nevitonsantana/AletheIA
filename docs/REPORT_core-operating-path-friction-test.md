# Core Operating Path Friction Test

## Goal

Validate whether `docs/core-operating-path.md` is sufficient for a reader to reconstruct and operate one AletheIA Work Slice with minimal repository reading.

## Test boundary

The test intentionally started from the minimum path requested for P0.5:

1. `docs/getting-started.md`
2. `docs/core-operating-path.md`

The anchor slice was Issue `#100` — Hermes Agent + Agentic Stack controlled sandbox readiness.

## Documents opened

### Minimum path

- `docs/getting-started.md`
- `docs/core-operating-path.md`

### Additional repository document required

- `docs/aletheia/closeouts/2026-04-25-hermes-agentic-stack-sandbox-readiness.md`

Justification: `docs/core-operating-path.md` is sufficient to reconstruct the operating shape of the slice, but the closeout is the single evidence artifact needed to verify exact Issue #100 details such as command checks, harness absence, upstream references, blocked contract test, and final no-go wording.

Additional repository document count: **1**.

### Supporting GitHub artifacts checked outside the repo-document count

- Issue `#100` comments
- PR `#118` metadata and diff summary

These were used to confirm the task history and P0 context, not as additional repository documents required by a first reader.

## Reconstruction result

| Path step | Reconstructed from minimum path? | Notes |
|---|---:|---|
| Signal / intent | Yes | The core path gives the exact anchor intent: determine controlled Hermes + Agentic Stack sandbox readiness without treating Codex simulation as Hermes telemetry. |
| Work Slice | Yes | Goal, scope, out of scope, risk posture, expected evidence, and stop line are present. |
| Minimum context | Partially | The core path lists Issue `#100`, Hermes policy/pre-pilot artifacts, upstream repos, local command checks, and clean worktree harness check. Exact evidence still requires the closeout. |
| Decision | Yes | The decision path and outcome are explicit: controlled no-go for real Hermes runtime execution; next boundary is a separate sandbox-install diagnostics slice if approved. |
| Execution | Yes | The guide states what happened and what did not happen: checks and documentation only, no install, no productive Hermes task, no memory/skill promotion, no automation. |
| Validation | Partially | The validation categories are present, but the closeout is needed to verify exact evidence and blocked local contract-test state. |
| Closeout / restart | Partially | The operating conclusion is present; the closeout is needed as the restart/evidence artifact. |

## Friction points

1. `docs/getting-started.md` does not currently point directly to `docs/core-operating-path.md` as the next step for a reader who wants to run one Work Slice.
   - Impact: the README has the fastest understanding path, but a reader who starts inside `getting-started.md` can miss the new operating path.
   - Actionable follow-up: add `docs/core-operating-path.md` to the suggested next steps in `docs/getting-started.md`.

2. `docs/core-operating-path.md` compresses the anchor slice well, but it does not clearly label the closeout as the one acceptable extra evidence artifact for the friction test.
   - Impact: a reader may over-open Hermes policy, readiness gates, restart docs, or templates to verify the anchor slice, even though the closeout is enough.
   - Actionable follow-up: add one sentence near the anchor slice or friction-test section: for exact reconstruction, the closeout is the only expected extra repository document.

3. The `Suggested next reading` section in `docs/core-operating-path.md` lists multiple documents immediately after the friction-test section.
   - Impact: for first-use validation, this can blur the difference between required path and optional deeper reading.
   - Actionable follow-up: split the section into `Optional deeper reading` or explicitly state that these are not required to run the first Work Slice.

## Verdict

The success criterion is met with a caveat.

Issue `#100` can be reconstructed with **one additional repository document**: the completed closeout. The operating path is sufficient for the slice shape and decision path, but the navigation and optional-reading labels should be tightened so the minimum path remains obvious.

## Recommendation for next issue

Recommended next issue: **small correction to `core-operating-path.md`**, paired with a tiny navigation update in `docs/getting-started.md` if allowed in the same documentation-validation slice.

Do **not** create `slice-record-template.md` yet. The friction found does not prove a missing template; it proves that the existing compressed guide needs clearer evidence/navigation boundaries.

Do **not** create `kanban-decision-protocol.md` yet. The friction was not about board state or Kanban decision semantics; it was about first-reader navigation and evidence scope.

## Validation

- Repository documents required beyond the minimum path: **1**.
- Required extra document explicitly justified: yes.
- Gaps recorded as actionable follow-ups: yes.
- Next issue recommendation explicit: yes.
