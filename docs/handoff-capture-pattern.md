# Handoff Capture Pattern

## Goal

This document explains how AletheIA can move from manual handoff writing toward automated or semi-automated handoff creation from completed work.

In simple terms:

capture the right signals from the work item,
then assemble a compact restart package.

---

## Why this matters

Alpha 4 already defines:

- what an agent handoff is
- how to structure it
- how to generate it intentionally
- how projects may define local conventions on top of it

The next step is reducing the amount of manual reconstruction needed after a work slice is completed.

If the right signals already exist, the framework should be able to help transform them into a handoff artifact.

That does not require full automation on day one.

AletheIA should support a spectrum such as:

- fully manual handoff drafting
- semi-automated handoff assembly from captured signals
- more automated artifact generation later, when the signals are reliable enough

---

## Core rule

Do not automate the transcript.

Automate the restart package inputs.

That means the capture pattern should collect signals such as:

- what changed
- what remains pending
- what is allowed next
- what is forbidden next
- what validation already happened
- what unknowns remain open

The goal is not to summarize everything.

The goal is to preserve the minimum useful structure for the next agent.

---

## Signals worth capturing

AletheIA should prefer signals that are already close to the handoff structure.

### 1. Dominant frontier

What kind of work owned the completed slice?

### 2. Changed files

Which files were actually touched?

### 3. Protected or forbidden files

Which files or layers were intentionally left outside the slice?

### 4. Relevant context sources

Which files, contracts, or docs were used as the main basis for the work?

### 5. Validation performed

What proof already exists?

Examples:

- lint
- smoke
- targeted test
- human review
- audit check

### 6. Remaining blockers or unknowns

What could not be closed yet?

### 7. Recommended next action

What should the next agent do first?

---

## Capture sources

A project may derive these signals from different places.

Examples:

- branch diff
- changed file list
- validation commands already run
- decision records
- project-state updates
- task briefs
- explicit handoff notes written during execution
- local work logs

The capture mechanism may vary by project.

The meaning of the output should remain stable.

---

## When one handoff is not enough

Sometimes the right output is not one handoff artifact, but a **chain of smaller handoffs**.

This usually happens when:

- the dominant frontier changes more than once
- different boundaries need different validation expectations
- one later boundary should not be pre-decided too early

In those cases, the capture pattern should help generate:

- a draft for the immediate next boundary first
- and only then a later draft when the next boundary has actually been crossed

This is safer than generating one artifact that pretends to know every later continuation already.

---

## Manual vs semi-automated vs automated

### Manual

A person or agent writes the full handoff intentionally.

Use when:

- the task is small
- the risk is low
- few artifacts exist to capture from

### Semi-automated

The system pre-fills a handoff draft from captured signals, and a human or agent reviews the result.

Use when:

- stable signals already exist
- the work is repetitive enough to benefit from drafting help
- the output still needs semantic review before use

This is the most realistic near-term target for Alpha 4.

### Automated

The system generates the handoff artifact with minimal extra work.

Use only when:

- the capture signals are trustworthy
- the execution boundary is already explicit
- the risk of semantic drift is acceptable

AletheIA should not assume this is safe by default.

---

## Minimum capture-to-handoff mapping

A useful semi-automated flow should usually be able to map:

- changed files -> candidate allowed files
- untouched protected layers -> candidate forbidden files
- validation logs -> validation expectation or completed proof
- task brief or decision record -> dominant frontier and acceptance criteria
- unresolved notes -> risks or unknowns
- last verified recommendation -> next action

This mapping may be incomplete.

That is acceptable.

AletheIA should prefer an editable draft over a falsely authoritative artifact.

---

## Good signs

The capture pattern is healthy when:

- handoff drafting becomes faster without becoming vague
- the receiving agent needs less reconstruction work
- scope boundaries are preserved better than in narrative-only recaps
- multi-boundary work can be split into smaller restart packages when needed
- the generated draft still works across different LLMs or execution tools

---

## Risks

The main risks are:

- transcript-like output disguised as structure
- false confidence in incomplete capture
- over-automation for simple tasks
- provider-specific assumptions leaking into the artifact
- premature generation of later-boundary handoffs that should remain local until the next step is real

---

## Mitigations

AletheIA should mitigate those risks by:

- preferring semi-automated drafts over unchecked automation
- requiring editable fields for unknowns and semantic guardrails
- keeping provider-specific prompt logic outside the framework structure
- making missing fields explicit rather than inventing them
- preferring immediate-boundary drafts over giant multi-step artifacts

---

## Relationship to Alpha 5

Alpha 4 capture patterns focus on continuity.

Alpha 5 may later enrich some handoffs with structured risk inference.

That means a future semi-automated handoff generator might eventually attach:

- a restart package
- plus, when triggered, an inference artifact

But Alpha 4 does not need Alpha 5 in order to be useful.

---

## Suggested next reading

- `docs/agent-handoffs.md`
- `starter-pack/guides/agent-handoff-generation.md`
- `starter-pack/templates/agent-handoff-template.md`
- `examples/handoffs/multi-boundary-continuity.md`
- `docs/project-handoff-conventions.md`
