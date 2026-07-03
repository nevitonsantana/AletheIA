# Human Expertise & Evidence-Based Learning Contract

This contract defines how AletheIA records human expertise and learning evidence without turning either into automatic authority.

## Purpose

AletheIA may use human expertise to clarify domain rules, edge cases, review expectations, and decision boundaries before or during a governed Work Slice.

AletheIA may also record evidence-based learning after execution, validation, review, or failure. Learning records preserve what was observed and what may change next time, but they do not mutate skills, policies, gates, or source contracts by themselves.

## Domain Expertise Brief

A Domain Expertise Brief captures human-owned knowledge that should influence a bounded Work Slice.

A valid brief MUST include:

- `brief_id`;
- `work_slice_ref` or `scope_ref`;
- `expert_ref` or role reference;
- `expertise_scope`;
- `domain_rules` with source refs or human authority refs;
- `edge_cases` when known;
- `decision_boundaries` that identify what the expert can and cannot authorize;
- `review_required_for` when human review is mandatory;
- `source_refs` for all material claims.

The brief MUST NOT contain secrets, private prompts, restricted content, or personal data beyond the minimum role/reference needed for accountability.

## Evidence-Based Learning Record

An Evidence-Based Learning Record captures what the system learned from observed work.

A valid record MUST include:

- `learning_id`;
- `work_slice_ref`;
- `hypothesis_or_expectation`;
- `observed_result`;
- `surprise_or_delta`;
- `evidence_refs`;
- `source_refs`;
- `recommended_future_change`;
- `change_authority`;
- `status`.

The record MAY recommend a future documentation, skill, capability, policy, or workflow change. It MUST NOT apply that change automatically.

## Authority boundary

Human expertise is not universal truth. It is scoped evidence with accountable ownership.

Learning records are not self-evolution. They are inputs to later review, proposal, backlog, or validation processes.

AletheIA MUST preserve these boundaries:

- domain experts can clarify domain rules but do not bypass governance gates;
- reviewers can accept or reject evidence for the slice but do not rewrite canonical skills silently;
- skills can report observations but do not promote themselves;
- dashboards or observatories can display learning state but do not rank capabilities without comparable evidence.

## Required statuses

A learning record MUST use one of:

- `captured` — learning was recorded but not yet reviewed;
- `reviewed` — a human or governance reviewer assessed the learning;
- `accepted_for_future_work` — the learning may influence a future planned slice;
- `converted_to_proposal` — a separate proposal exists;
- `rejected` — the learning was reviewed and not accepted;
- `superseded` — a newer source or record replaces it.

## Non-goals

This contract does not create:

- automatic skill evolution;
- capability fitness rankings;
- learning dashboards;
- replacement for human review in high-risk work;
- a second source of truth for domain policy;
- permission to store restricted source content.
