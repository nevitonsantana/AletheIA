# S7 Debugging Loop Pilot — Unreported Iterations

## Work Slice

Prevent the read-only Resource Observatory inspector from presenting an absent loop iteration count as `0`.

## Failure / Reproduction

The inspector rendered `0 / unavailable` when both `currentIterations` and `maxIterations` were absent. The focused component test reproduced the behavior before the production code changed.

## Pattern Selection

- Pattern: `loop_until_done`
- Vehicle: `skill_execution`
- Selection: [`execution-pattern-selection.json`](execution-pattern-selection.json)

## Skill Compatibility

Adaptive Skills declares `debugging@0.1.0` compatible with `loop_until_done` only when a test or reproduction command supplies the objective stop condition. The canonical declaration remains authoritative.

## Controls

- Objective gate: `pnpm --filter @aletheia/mission-control test -- ResourceSignalInspector.test.tsx`
- Maximum iterations: `3`
- Time budget: `30 minutes`
- Token budget: `8000`
- Evidence required for every iteration
- Human review required before merge

## Iterations

### Iteration 1

- **Hypothesis:** the `currentIterations ?? 0` presentation fallback invents a zero when no source value exists.
- **Change:** add a failing regression test, then render `unavailable` when the count is absent.
- **Evidence before:** focused suite reported `1 failed, 3 passed` and exposed `0 / unavailable` in the DOM.
- **Evidence after:** the same command reported `4 passed`.
- **Result:** objective gate passed; stop immediately.

No second or third iteration ran.

Post-loop browser validation opened `/resource-observatory`, exercised the Skill usage inspector, confirmed the read-only source context, and reported no console warnings or errors. Screenshot capture was attempted twice but remained `unavailable` because the in-app browser timed out; DOM and console evidence were retained in the loop record.

## Final Outcome

`reinforced` — the existing unavailable-first rule was correct; the implementation now follows it and the focused test guards against recurrence.

No success percentage is admissible from this single case.

## Evidence refs

- [`loop-run-record.json`](loop-run-record.json)
- [`skill-execution-record.json`](skill-execution-record.json)
- [`ResourceSignalInspector.tsx`](../../../../apps/mission-control/src/features/resource-observatory/ResourceSignalInspector.tsx)
- [`ResourceSignalInspector.test.tsx`](../../../../apps/mission-control/src/features/resource-observatory/ResourceSignalInspector.test.tsx)

## Human review boundary

The test gate permits the loop to stop; it does not authorize merge. Human review remains pending until the pull request is accepted.

## Learning signal

Missing operational data must stay `unavailable`. A plausible default is still invented data when no source record supports it.
