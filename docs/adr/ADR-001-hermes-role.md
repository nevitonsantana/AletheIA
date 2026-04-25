# ADR 001 — Hermes role in the AletheIA pipeline

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-04-25 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR 002 — Memory and skill promotion policy |
| Supersedes | — |

## 1. Context

AletheIA already operates across multiple agents and model families. As the operating surface grows, continuity friction increases: context can be lost between sessions, handoffs can degrade, durable decisions can need to be re-explained, and durable memory needs a clear owner.

Hermes Agent is a candidate persistent operational runtime with multi-model routing, messaging gateways, subagents, tools, and its own memory surface.

The architectural risk is Hermes drifting into process sovereignty: creating skills by itself, curating semantic memory without review, selecting models without an explicit policy, or silently expanding autonomy. That would violate the core AletheIA principle: **runtime does not govern process**.

This ADR defines the role of Hermes for the pre-pilot and pilot period.

## 2. Decision

### 2.1 Hermes type

Hermes is a **controlled runtime executor**.

It is not a copilot, not a semi-autonomous operating brain, and not the source of AletheIA governance. It is an execution layer subordinated to:

- AletheIA Protocol;
- AletheIA Runtime Policy;
- Adaptative Skills catalog;
- human approval gates where required.

This role can only be re-evaluated after the 60-day pilot, using recorded metrics. It must not expand through implicit operational habit.

### 2.2 What Hermes may execute without human approval

Hermes may execute without additional approval only when **all** conditions are true:

- risk is classified as **low** by AletheIA Protocol;
- scope is inside the `AletheIA Lab` profile;
- tools are restricted to reading and sandboxed execution;
- write access is limited to explicitly allowed paths;
- the task does not touch production, security, credentials, paid integrations, or Crisis Monitor product core.

Allowed write paths for the pre-pilot are:

- `memory/proposed/`;
- `docs/aletheia/closeouts/`;
- isolated test branches or disposable sandbox repositories.

Everything else requires human approval recorded in a versioned or GitHub-linked artifact.

### 2.3 What Hermes must never execute

Hermes must never execute:

- changes to Crisis Monitor core product behavior;
- production changes;
- writes to credentials, secrets, or environment-variable files;
- sensitive API calls, paywall access, scraping, or paid integrations without prior approval;
- memory promotion from `memory/proposed/` to semantic memory;
- skill promotion between lifecycle stages;
- creation or modification of ADRs;
- modification of its own permissions, adapters, or runtime profile;
- unattended cron execution for real tasks.

The final rule is absolute: **Hermes does not promote its own autonomy**.

### 2.4 Who chooses the model

Model choice follows a fixed chain:

1. **AletheIA Protocol suggests** a model based on risk, cost, latency, context, reasoning depth, and sensitivity.
2. **Hermes may propose an alternative**, but must record the reason.
3. **Human confirmation is required** for medium-risk and high-risk tasks.
4. **Low-risk tasks** follow the Protocol suggestion without extra approval when inside the `AletheIA Lab` profile.

Model choice and rationale must be recorded in the closeout.

### 2.5 How execution is recorded

Every Hermes execution produces a closeout in:

- `docs/aletheia/closeouts/YYYY-MM-DD-[slug].md`

The closeout must use `starter-pack/templates/hermes-closeout-template.md` and include:

- source issue or PR;
- selected model and rationale;
- applied skill;
- tools used;
- evidence of completion;
- human approval record when applicable;
- candidate learning, if any, with proposed destination.

A task is not closed if required closeout fields are missing.

### 2.6 Containment and shutdown criteria

Hermes must be **contained** or **shut down** if any trigger occurs during the pilot.

| Event | Response |
|---|---|
| 1+ critical scope violation | Shut down immediately and open post-mortem |
| 3+ non-critical scope violations in 7 days | Contain by revoking permissions pending review |
| Rework rate above pre-pilot baseline for 2 consecutive weeks | Contain |
| Episodic memory remains unmanageable after 4 weeks | Contain and review retention policy |
| Cost per task above the ADR 001 limit | Contain |
| Human approvals are confirmed without effective reading | Stop pilot and redesign HITL mechanics |

Cost limits for the pre-pilot/pilot are:

- USD 0.50 per documentation task;
- USD 2.00 per discovery task.

Human approval timeout is **24 business hours**. After that, the task fails fast and returns to backlog as `awaiting-human`.

Critical Crisis Monitor areas where Hermes must not write, even through PR, are:

- `src/app/api/`;
- `lib/cris*`;
- credentials, secrets, and environment files;
- production configuration;
- auth/security surfaces;
- paid or sensitive integrations;
- Crisis Monitor product core behavior.

Containment or shutdown decisions must be recorded as an ADR or durable decision artifact.

## 3. Consequences

### Positive

- Hermes operates predictably.
- Auditing remains simple through versioned closeouts and GitHub-linked approvals.
- Runtime autonomy is bounded by explicit policy rather than intent.
- Reversal is cheap: disabling Hermes does not collapse the AletheIA operating model.

### Negative

- Hermes starts with nominal features disabled, including auto-skill, auto-memory, and unattended cron.
- Medium-risk and high-risk tasks include real human review friction.
- Operating cost includes review time, not only model/runtime cost.

### Accepted tradeoff

The pre-pilot goal is to prove value before expanding autonomy. Losing nominal automation in exchange for auditable governance is intentional.

## 4. Alternatives considered

### A. Hermes as semi-autonomous agent from the start

Keeps auto-skill and auto-memory enabled with later human review.

Rejected because review queues tend to become batch approval theater, weakening governance exactly where it should be strongest.

### B. Hermes only as messaging gateway

Uses Hermes only for Telegram, Discord, or Slack coordination.

Rejected as the primary path because it underuses the runtime. Kept as a fallback if the controlled pilot misses go thresholds.

### C. Do not use Hermes; build a smaller custom agent loop

Rejected for now because construction cost is high and the current friction has not yet justified bespoke runtime work.

## 5. Relationship to Phase -1

Phase -1 planning must treat ADR 001 and ADR 002 as the decision source of truth.

Roadmaps, matrices, and templates may reference these ADRs, but should not duplicate or re-litigate the same decisions. If a Phase -1 rule changes, update the relevant ADR first and then update dependent artifacts.

## 6. Review

| When | What to review |
|---|---|
| After manual simulation | Whether the model-choice chain is usable in practice |
| After 30 days of pilot | Containment and shutdown thresholds |
| After 60 days of pilot | Go/no-go for any autonomy expansion |
| After any critical violation | Full ADR review |
