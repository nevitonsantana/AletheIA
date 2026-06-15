# Visual Operations Usage Evidence

> Use this only after a generated Visual Operations snapshot was actually used in a review,
> planning, handoff, or closeout decision. Do not backfill from memory and do not invent missing
> telemetry.

## Identification

| Field | Value |
|---|---|
| Evidence ID |  |
| Date | YYYY-MM-DD |
| Recorder |  |
| Review or decision context |  |
| Snapshot used | path or URL |
| Source refs |  |

## Usage boundary

- What was being reviewed:
- Who used the snapshot:
- Decision or question the snapshot supported:
- Source refs:

## Snapshot utility

| Question | Answer | Source refs |
|---|---|---|
| Which fields helped the review? |  |  |
| Which fields were missing, misleading, stale, or too noisy? |  |  |
| Did the snapshot change a decision, shorten review, or only confirm known state? |  |  |
| Did the reviewer need to open the source PR, CI run, or evidence file anyway? |  |  |

## Missing or unavailable signals

Record `unknown` or `unavailable`; do not infer values.

| Signal | Status | Why | Source refs |
|---|---|---|---|
| Planning depth | unknown / available |  |  |
| Human review requirement | unknown / available |  |  |
| Runtime session | unavailable / available |  |  |
| Skill activation | unknown / available |  |  |
| Tokens | unavailable / reported / estimated |  |  |
| Cost | unavailable / reported / estimated |  |  |

## Activation signal check

This record is not enough by itself to activate future infrastructure. Mark only what this usage
actually supports.

| Possible future surface | Supported by this evidence? | Reason | Source refs |
|---|---|---|---|
| Add another checked-in snapshot to CI | yes / no / unclear |  |  |
| Improve projector field mapping | yes / no / unclear |  |  |
| Add GitHub collection/import | yes / no / unclear |  |  |
| Add dashboard/UI | yes / no / unclear |  |  |
| Add persistence/backend | yes / no / unclear |  |  |
| Add Adaptive Skills integration | yes / no / unclear |  |  |
| Add runtime/token/cost telemetry | yes / no / unclear |  |  |

## Outcome

- Decision supported:
- Follow-up Work Slice, if any:
- Stop condition or reason to keep phase closed:
- Source refs:

## Privacy and restrictions

- Sensitive content withheld:
- Metadata-only references used:
- Hashes or authorized summaries:
- Source refs:
