# SYSTEM_STATE Registry — Minimum Contract

## Purpose

Define a compact repository-level first-load index that answers **what is true enough to orient the next safe action** without replacing the documents and records that prove those claims.

## Authority boundary

`SYSTEM_STATE.md` is an index, not universal truth. Precedence remains:

1. safety and restricted-use policy;
2. accepted contracts and ADRs;
3. current Work Slice constraints and durable decisions;
4. execution, review and evidence records;
5. canonical roadmap or backlog;
6. SYSTEM_STATE summary.

When the state conflicts with a higher-authority source, mark the state stale and update it. Do not reinterpret the source to preserve the summary.

## Minimum content

A repository state must identify:

- project, version or explicit `unavailable`, maturity and purpose;
- current architecture summary with source references;
- delivered, active, planned, deferred and deprecated/merged work;
- documentation health, including explicit `not assessed` states;
- cognitive debt and open risks;
- next safe steps;
- review date, evidence baseline and review triggers.

## Size and loading boundary

- The state has a target maximum of 120 lines.
- It stores metadata and references, not prompts, secrets, restricted content, full plans or execution logs.
- It is a first-load surface for repository entry, planning and resume. Detailed sources remain on demand.
- An agent must load the referenced source before changing architecture, policy or accepted decisions.

## Update triggers

Review the state after an accepted change to:

- maturity or public version;
- architecture or ownership boundary;
- integrated roadmap/backlog status;
- active/deferred/deprecated plan posture;
- documentation-health verdict;
- cognitive-debt level or open risk;
- next safe step.

Ordinary implementation details do not require a state update unless they change one of these summaries.

## Relationship to Restart Package

- `SYSTEM_STATE` describes repository-level current posture.
- Restart Package describes one active boundary: intent, decisions, evidence, risks, discarded context, reload needs and next action.
- A Restart Package may reference SYSTEM_STATE as a resume entrypoint but must not copy it wholesale.
- “Continuity Capsule” fields are compatibility fields inside the Restart Package; they do not create another lifecycle or authority.

## Validation

- required headings exist;
- local references resolve;
- line budget is respected;
- authority disclaimer is visible;
- unknown information is `unavailable` or `not assessed`, never inferred;
- no prompt body, secret, personal data or restricted source content is embedded.
