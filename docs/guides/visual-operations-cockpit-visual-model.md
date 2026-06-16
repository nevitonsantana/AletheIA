# Visual Operations Cockpit Visual Model

## Purpose

Translate the Visual Operations contracts and dogfood evidence into a minimum visual model for a
future AletheIA Mission Control cockpit.

This is not a UI implementation, design system, wireframe, schema, backend, collector, or runtime.
It is a docs-first bridge between source-bound projection data and the way a human should read that
state on a board, card, detail view, or alert surface.

## Design intent

The cockpit should help a product, design, governance, or delivery practitioner understand:

- where a Work Slice appears to be;
- how confident the projection is;
- what evidence supports the reading;
- what is missing or unavailable;
- what needs human attention next.

The cockpit must not look more certain than the sources allow. A clear interface is not the same as
a confident claim.

## What this model protects

A visual layer can accidentally create false authority. This model exists to prevent that.

| Risk in a future UI | Required design response |
|---|---|
| A closed lane looks like the framework approved the work | Label lanes as presentation/derived state and keep source links visible. |
| `unavailable` looks like failure | Treat it as honest absence of source evidence, not as an error state. |
| Green CI looks like human approval | Keep evidence, readiness, and human review as separate signals. |
| A skill activation looks like a governance decision | Show skills as capability/activity signals only. |
| Tokens/cost look like productivity ranking | Show provenance and context; avoid scoring people or slices by spend alone. |
| Alerts look like automated enforcement | Phrase alerts as review prompts, not decisions. |

## Minimum cockpit surfaces

The first visual model has four surfaces. They can be represented as Markdown, a design mockup, or a
future UI, but the semantics stay the same.

| Surface | Job to be done | Must show | Must not do |
|---|---|---|---|
| Project overview | Orient the reviewer to current posture and exceptions | counts, blocked/review items, evidence posture, unresolved alerts, telemetry availability | replace the source project plan |
| Work Slice board | Group slices by derived presentation lane | lane name, lane confidence, card count, exceptions | mutate source state by drag/drop |
| Work Slice card | Let a reviewer decide whether to open detail | objective, lane, confidence, evidence, review, risk, key alert, source refs | hide unknown/unavailable fields to look cleaner |
| Slice detail / trace | Explain why the card says what it says | event trace, evidence, alerts, decisions, validation, source refs | become the authoritative audit log |

## Board lanes as visual posture

Use lanes as reading aids, not a required lifecycle.

| Lane | Visual meaning | Design caution |
|---|---|---|
| `intake` | A candidate slice exists, but framing is incomplete | Avoid implying work has started. |
| `framing` | Objective, scope, risk, or non-goals are being clarified | Show open questions prominently. |
| `context_ready` | Minimum context is recorded as adequate | Do not imply readiness gates passed unless sourced. |
| `planning` | Plan, pattern, or readiness preparation is active | Separate planning depth from execution progress. |
| `execution` | Work is active in a source record or runtime | Execution activity is not success evidence. |
| `validation` | Outputs exist and evidence is being checked | Make pass/fail/inconclusive visually distinct. |
| `human_review` | A source requires or requests human review | Show reviewer role/open question when known. |
| `reconcile` | Closeout, learning, docs, or continuity is being reconciled | Do not hide remaining follow-ups. |
| `closed` | Source records support closure with required evidence | Keep evidence status visible. |
| `blocked` | A gate, policy, failure, or missing authority prevents progress | Show the blocking reason and source. |

## Card anatomy

A minimum card should be scannable without stripping provenance.

```text
[Lane chip] [Lane confidence]
Title / Work Slice ID
Objective summary

Evidence: sufficient | partial | failed | inconclusive | unknown
Human review: completed | pending | unavailable | unknown
Risk: low | medium | high | critical | unknown
Primary alert: none | warning | critical

Source refs · Projected at
```

### Card fields

| Field | Why it is visible | Designer note |
|---|---|---|
| Lane chip | Gives spatial orientation | Label as derived/presentation state in detail. |
| Lane confidence | Prevents false certainty | Use quieter treatment for `inferred`; strong caution for `conflicted`. |
| Evidence status | Shows whether claims are supported | Do not equate artifact count with sufficiency. |
| Human review | Protects human decision boundaries | `unavailable` means no durable source, not review failure. |
| Risk | Tells whether attention should be proportional | `unknown` should remain visible when unsourced. |
| Primary alert | Directs attention | Alerts request review; they do not decide. |
| Source refs | Keeps the card auditable | Source access can be a link, reference ID, hash, or metadata-only pointer. |

## Status language

Use status words consistently so the UI teaches the reader what is known.

| Status family | Meaning | Visual treatment |
|---|---|---|
| Known positive | Durable source supports completion, sufficiency, or pass | Stable/confirmed treatment; still link to source. |
| Known pending | Durable source says attention, review, or completion is pending | Active attention treatment; show owner/role when known. |
| Known negative | Durable source records failure, block, stop, or rejected evidence | High-salience treatment with reason and source. |
| Unknown | A source exists but does not answer the field | Neutral incomplete-information treatment. |
| Unavailable | No authoritative source was supplied or exported for the field | Neutral metadata gap treatment; do not style as failure. |
| Conflicted | Sources disagree or precedence cannot be resolved | Warning treatment and show all relevant source refs. |

## Empty, unknown, and unavailable states

These states need intentional design because they are easy to misread.

| Value | Plain-language copy | Design behavior |
|---|---|---|
| `unknown` | “The available source does not establish this.” | Keep the field visible; provide source context. |
| `unavailable` | “No authoritative source was supplied for this field.” | Use neutral tone; do not mark failed. |
| `none` | “No evidence has been recorded.” | Use only for evidence posture; do not imply evidence failed. |
| `partial` | “Some evidence exists, but not enough to support the claim.” | Show what is missing if known. |
| `inconclusive` | “Evidence conflicts or cannot establish the claim.” | Pair with alert and source refs. |

Dogfood evidence from PR #207 confirmed the most important rule: `human_review=unavailable` should
communicate honest restraint. The system is saying “I do not have a durable review source,” not “the
work failed review.”

## Alert visual semantics

Alerts should be designed as questions for review.

| Alert severity | Meaning | Example copy pattern |
|---|---|---|
| `info` | Useful context or absence of projected issue | “No projected alerts.” |
| `warning` | Human review is useful before trusting the projection | “Evidence is partial; check validation source.” |
| `critical` | A source indicates stop, block, failed evidence, or unresolved required review | “Required human review is pending.” |

Avoid copy such as “approved,” “rejected,” or “authorized” unless the source record explicitly uses
that authority.

## Visual hierarchy

Prioritize the information that affects human attention:

1. blocked, failed, conflicted, or required human-review signals;
2. lane and lane confidence;
3. evidence status and readiness outcome;
4. objective and scope summary;
5. telemetry availability, token/cost, skill/runtime signals;
6. secondary trace and source refs.

Telemetry is useful, but it should not dominate risk, evidence, or review state.

## Source reference affordances

Every card/detail/alert must make source access obvious without copying restricted content.

Acceptable affordances:

- link to PR, CI job, local doc, commit, or generated snapshot;
- source reference ID;
- hash or metadata-only restricted-source marker;
- authorized summary with provenance label.

Do not reveal prompts, secrets, personal data, or restricted source bodies in the cockpit.

## Designer checklist

Before turning this into a wireframe or UI, check:

- Are lanes visibly presented as derived posture, not lifecycle truth?
- Can a reviewer see why a card is in its lane?
- Are `unknown` and `unavailable` visible without looking like bugs?
- Are human review, readiness, CI evidence, and merge state visually separate?
- Does every alert include a review action and source refs?
- Are telemetry and cost clearly optional and provenance-labeled?
- Could a non-engineer understand what to inspect next?
- Does the design avoid storing or displaying restricted content?

## Implementation boundary

This model may justify future design artifacts or prototypes, but it does not by itself authorize:

- dashboard UI implementation;
- backend, database, or persistence;
- GitHub collector/importer;
- runtime or event bus;
- schema changes;
- policy engine changes;
- Adaptive Skills integration.

Those require separate Work Slices with evidence that static Markdown/JSON is insufficient for a real
cadence.

## Related

- [Mission Control Cockpit](../concepts/mission-control-cockpit.md)
- [Visual Operations Layer](../concepts/visual-operations-layer.md)
- [Work Slice Visual State Contract](../contracts/work-slice-visual-state-contract.md)
- [Visual Operations Human Review Source Mapping](../reference/visual-operations-human-review-source-mapping.md)
- [Visual Operations Usage Evidence](visual-operations-usage-evidence.md)
- [Visual Operations PR #207 dogfood evidence](../pilots/visual-operations-usage-pr-207-dogfood.md)
