# Visual Operations Cockpit Light Wireframe Spec

## Purpose

Turn the static board composition into a lightweight screen-level wireframe spec for AletheIA
Mission Control.

This is not a runnable UI, Figma file, generated dashboard, schema, backend, collector, runtime, or
policy engine. It is a design-facing spec that describes layout, visual hierarchy, status treatment,
and copy so the next artifact can be reviewed before implementation.

## Product Design brief

| Question | Answer |
|---|---|
| What should this thing do? | Help a technical-adjacent reviewer understand Work Slice posture, evidence, attention needs, and source confidence without opening every raw PR/check/document first. |
| Visual source | Existing AletheIA Visual Operations docs, static board composition, card-state examples, and governance-first repository tone. No saved Product Design context exists. |
| Interactivity level | Static. This wireframe spec defines screen structure and state treatment only. |

## Design thesis

Mission Control should feel like an **evidence desk**, not a project-management board.

The strongest visual idea is a restrained “source ledger” treatment: every important claim is paired
with a visible confidence/source affordance. The interface should feel calm enough for governance
review, but sharp enough that pending review and conflicts cannot be missed.

## Visual direction

### Palette

| Token | Hex | Use |
|---|---|---|
| Ledger ink | `#18201F` | Primary text and dense labels |
| Evidence paper | `#F6F3EC` | App background; warmer than neutral gray but not decorative |
| Source line | `#C7BFAF` | Dividers, card borders, source-reference rails |
| Verified moss | `#3E6B55` | Confirmed/sufficient/pass states |
| Review amber | `#B8762B` | Pending review, warnings, attention-needed states |
| Stop vermilion | `#B84233` | Failed/critical/conflicted emphasis only |

Design restraint: avoid a generic dark cyber dashboard. AletheIA is about governed clarity, so the
surface should feel like a review table with source marks, not a command center fantasy.

### Typography

| Role | Typeface direction | Use |
|---|---|---|
| Display / screen title | A narrow editorial sans or restrained slab, used sparingly | “Mission Control” title, major section labels |
| Body | Highly legible humanist sans | Card titles, summaries, reviewer actions |
| Utility / data | Monospaced or tabular utility face | lane chips, counts, source refs, timestamps, hashes |

If implemented later, choose actual fonts from the consuming product/design-system constraints. This
spec defines personality and hierarchy, not a dependency.

### Signature element

Use a **source rail** on each card: a narrow vertical or horizontal metadata strip that carries lane
confidence, source-ref count, and last projection time. This makes provenance visible without turning
every card into a table.

Aesthetic risk: let source/provenance marks be visibly part of the card anatomy instead of hiding
them in hover-only detail. The cockpit should look auditable at rest.

## Screen structure

### Region 1 — Header and authority boundary

| Element | Content | Design behavior |
|---|---|---|
| Product title | “AletheIA Mission Control” | Strong but restrained; no marketing tagline. |
| Mode label | “Read-only projection” | Always visible near title. |
| Projection timestamp | `Projected at 2026-06-16T16:30:00Z` | Utility typography. |
| Authority notice | “Source records remain authoritative.” | Persistent, calm boundary copy. |

Reviewer goal: understand immediately that this surface informs but does not govern.

### Region 2 — Overview strip

The overview strip appears before the board and answers “what needs attention first?”

| Tile | Value | Visual treatment |
|---|---:|---|
| Needs attention | 2 | Amber emphasis; links to exception strip. |
| Critical alerts | 1 | Vermilion emphasis; highest priority. |
| Conflicted | 1 | Vermilion/amber hybrid; source comparison required. |
| Closed stable | 2 | Moss emphasis, but still shows metadata gaps. |
| Unavailable signals | 3 | Neutral treatment; not a failure tile. |

Design behavior:

- Tiles should be compact and comparable.
- Critical/warning states lead; closed counts do not dominate.
- `Unavailable signals` stays neutral and explanatory.

### Region 3 — Exception strip

The exception strip is a horizontal review queue above the lanes.

| Priority | Item | Copy |
|---|---|---|
| Critical | `Slice auth-002` | “Validation failed; required human review is pending.” |
| Warning | `Slice api-guardrail-006` | “Sources conflict; review before trusting lane.” |
| Info | `Slice docs-telemetry-004` | “Optional telemetry unavailable.” |

Design behavior:

- This strip is not a command queue; use “Review” language, not “Approve/Reject.”
- The critical item should be visually first even if its lane is not first.
- Each item must expose a source-ref affordance.

### Region 4 — Board lanes

Show only populated lanes by default, with a collapsed empty-lane summary.

| Lane | Count | First read |
|---|---:|---|
| Validation | 1 | One conflicted source state needs review. |
| Human review | 1 | One required review is pending. |
| Reconcile | 1 | One low-risk card has optional telemetry unavailable. |
| Closed | 2 | Two stable cards still show human-review source gaps. |
| Empty lanes | 6 | Collapsed; absence does not indicate missing process. |

Design behavior:

- Lane headings include count and confidence summary.
- Lane order should prioritize attention before closure in this static composition.
- Do not imply drag/drop state mutation. If implemented later, cards may be opened, not moved.

### Region 5 — Card anatomy in context

Each card uses the same hierarchy:

1. source rail: lane, confidence, source count, projected time;
2. title and objective;
3. evidence and human-review row;
4. risk and primary alert;
5. reviewer action;
6. compact source refs.

Card density should be moderate: enough for scan, not enough to replace detail/trace.

## Card treatments

### Critical pending review card

| Layer | Content |
|---|---|
| Source rail | `human_review · confirmed · 2 sources` |
| Title | `Slice auth-002 — Restrict sensitive credential flow` |
| Evidence | `failed` |
| Human review | `pending · Security reviewer` |
| Open question | `Approve mitigation path?` |
| Alert | `Critical: Required human review is pending.` |
| Reviewer action | `Open failed validation and review request.` |

Visual treatment: vermilion alert edge, amber review chip, source rail visible. The card should be
the first thing the eye catches.

### Conflicted validation card

| Layer | Content |
|---|---|
| Source rail | `validation · conflicted · 2 sources` |
| Title | `Slice api-guardrail-006 — Confirm restricted-source handling` |
| Evidence | `inconclusive` |
| Human review | `pending · Governance reviewer` |
| Alert | `Warning: Sources conflict; review before trusting lane.` |
| Reviewer action | `Compare validation and review-request sources.` |

Visual treatment: warning state should emphasize conflict, not failure. Pair the lane chip with a
strong confidence chip so the reader does not over-trust the lane.

### Reconcile telemetry-unavailable card

| Layer | Content |
|---|---|
| Source rail | `reconcile · inferred · 1 source` |
| Title | `Slice docs-telemetry-004 — Reconcile docs-only closeout` |
| Evidence | `partial` |
| Human review | `not requested` |
| Telemetry | `tokens unavailable · cost unavailable` |
| Alert | `Info: Optional telemetry unavailable.` |
| Reviewer action | `Decide whether missing telemetry matters for this slice.` |

Visual treatment: neutral/info. The telemetry gap should be readable but lower priority than review
or validation problems.

### Closed stable cards

| Layer | Content |
|---|---|
| Source rail | `closed · confirmed · source refs visible` |
| Titles | `PR #207 — Human-review source mapping`; `PR #201 — Dogfood evidence record` |
| Evidence | `sufficient` |
| Human review | `unavailable` |
| Alert | `none` |
| Reviewer action | `Open source refs only if verification is needed.` |

Visual treatment: stable moss evidence chip plus neutral unavailable chip. Do not use “approved.”

## Interaction notes for a future prototype

If this becomes a prototype later, the first interactions should stay narrow:

- open card detail;
- expand source refs;
- filter by attention status;
- show/hide empty lanes;
- open trace for a card.

Do not implement drag/drop lane movement in the first prototype. It would imply state mutation and
violate the read-only projection boundary.

## Responsive behavior

| Viewport | Behavior |
|---|---|
| Desktop | Overview strip, exception strip, and horizontal/scrollable board lanes. |
| Tablet | Overview wraps to two rows; lanes become stacked sections. |
| Mobile | Exception strip becomes first list; board cards stack by attention priority before lane grouping. |

Design priority: preserve attention hierarchy over strict board shape on small screens.

## Copy rules

Use language that names evidence posture rather than judging the work.

| Avoid | Prefer |
|---|---|
| “Approved” | “Source supports closure” |
| “Review failed” | “No review source supplied” or “review pending,” depending on source |
| “Bad telemetry” | “Telemetry unavailable” |
| “Blocked by dashboard” | “Source indicates stop/block” |
| “Move to closed” | “Open source record / verify closure” |

## Self-critique before visual production

This direction avoids common AI-dashboard defaults by rejecting dark neon command-center styling,
vanity metrics, and decorative charts. The specific visual signature is provenance: source rails,
confidence chips, and persistent authority boundaries.

Potential risk: the “evidence desk” direction could become too dry. If visual production follows,
spend boldness in the source rail and exception strip, not in decorative backgrounds.

## Review checklist

Before moving to a visual mock or coded prototype, confirm:

- The first read is “what needs attention,” not “how many things exist.”
- Closed cards still expose unavailable review sources.
- Critical review and conflicted sources are visually different.
- `unavailable` does not look like failure.
- Source refs are visible without overwhelming card scan.
- No interaction suggests the board can mutate source truth.
- The design can explain itself to a designer, PM, or governance reviewer without code context.

## Next step

If accepted, this spec can feed one of two bounded next slices:

1. a visual mock/wireframe artifact in a design tool; or
2. a static frontend prototype that renders this screen with mock data only.

Either path should remain read-only and avoid backend, runtime, collector, schema, or policy-engine
changes.
