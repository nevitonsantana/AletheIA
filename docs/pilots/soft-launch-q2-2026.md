# Soft Launch Q2 2026 — AletheIA + Adaptive Skills

> **Status:** Pre-launch scaffold. Sections marked `[TO FILL]` are populated after the soft launch concludes.
>
> **Audience:** Framework maintainers and future adopters. Squads are not identified by name without explicit authorization.
>
> **Template used for squad collection:** [`starter-pack/templates/squad-feedback-template.md`](https://github.com/nevitonsantana/AletheIA/blob/main/starter-pack/templates/squad-feedback-template.md)

---

## 1. Overview

| Field | Value |
|---|---|
| Launch period | `[TO FILL — e.g. 2026-06-01 to 2026-07-15]` |
| Squads participating | `[TO FILL — number only until authorization to name]` |
| Domains covered | `[TO FILL — e.g. software engineering, data, design]` |
| AletheIA version | v0.1.0-alpha |
| Adaptive Skills version | v0.1.0-alpha-apm |
| Primary harness | Claude Code (others as declared by squads) |
| Feedback rounds | `[TO FILL]` |

---

## 2. What was tested

The soft launch validated the full adoption path introduced by Epics 1–7:

- **Installation:** APM two-step flow (`apm install` + `apm run scaffold-overlay`) for AletheIA; single-step for Adaptive Skills.
- **Documentation:** Four-doc getting-started format for each repo.
- **Governance overlay:** constitution, handoffs, reports, policies, learnings in real project context.
- **Skill invocation:** at least the recommended starter bundle (`workflow`, `feature-planning`, `testing`).
- **Positionment:** AletheIA as operating overlay, not agent bundle — tested against squads that already use BMAD or SDD.

What was explicitly **not** tested:

- Hermes Agent integration (deferred).
- Multi-harness projections beyond Claude Code.
- Domain packs beyond `crisis-management` (excluded from standard package).
- Enterprise compliance tracks (1.1 hardening, not in scope for soft launch).

---

## 3. Participating squads

> Squad names and project details are withheld until authorization is confirmed. Each squad is referenced by a coded tag (Squad A, Squad B, etc.) in the findings below.

| Tag | Domain | Duration | AletheIA used | Adaptive Skills used | Existing method |
|---|---|---|---|---|---|
| Squad A | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` |
| Squad B | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` |
| Squad C | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` |

---

## 4. Key findings

> `[TO FILL post-launch — populate from consolidated squad feedback reports]`

### 4.1 What worked consistently

### 4.2 Consistent friction points

### 4.3 Unexpected findings

### 4.4 What squads did not use (and why)

---

## 5. Metrics

| Metric | Target | Actual | Notes |
|---|---|---|---|
| Time to first functional session after install | < 30 min | `[TO FILL]` | |
| Clarification questions in first 30 minutes | Low | `[TO FILL]` | |
| Squads able to articulate what AletheIA is not | ≥ 2 of 3 | `[TO FILL]` | Differentiability signal |
| Squads continuing after pilot period | ≥ 2 of 3 | `[TO FILL]` | Traction signal |
| H2 maintenance cost per sprint post-stabilization | < 1 day | `[TO FILL]` | APM packaging hypothesis |

---

## 6. Hypotheses assessment

| ID | Hypothesis | Result | Evidence |
|---|---|---|---|
| H1 | AletheIA and Adaptive Skills occupy distinct, complementary layers to BMAD/SDD | `[TO FILL]` | |
| H2 | APM packaging accelerates adoption without excessive maintenance cost | Partially falsified (two-step install required) — see ADR-007 | Documented at launch |
| H4 | 4-doc getting-started format covers adoption needs without friction | `[TO FILL]` | |
| H5 | Crisis Monitor can be deprioritized without credibility loss | `[TO FILL]` | |

> H3 (agentskills.io conformance is viable without major rewrite) was assessed in Epic 3 as **Sustained** (Caso A). Not re-tested in soft launch.

---

## 7. Prioritized adjustments

> `[TO FILL post-launch — rank by: frequency reported × severity × effort to fix]`

| Priority | Area | Adjustment | Source squads | Effort estimate |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

---

## 8. Continuity decision

> `[TO FILL post-launch]`

**Decision:** Scale / Refine and re-run / Pause

**Rationale:**

**Next wave criteria** (what must be true before inviting more squads):

**Open risks entering next wave:**

---

## 9. Raw feedback index

> Links to individual squad feedback reports. Each report is stored privately until the squad authorizes publication.

| Squad | Feedback report | Authorization status |
|---|---|---|
| Squad A | `[private link or path]` | `[pending / authorized / anonymized]` |
| Squad B | `[private link or path]` | `[pending / authorized / anonymized]` |
| Squad C | `[private link or path]` | `[pending / authorized / anonymized]` |

---

## 10. Lessons promoted to the framework

> Lessons that passed the evolution gate and produced changes in the framework canon (skills, contracts, guides, or ADRs).

`[TO FILL — populated as lessons are reviewed and promoted]`

---

*Document owner: Neviton Santana*
*Last updated: 2026-05-27*
*Next scheduled update: after soft launch concludes*
