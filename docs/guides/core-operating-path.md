# Core Operating Path

## Goal

This is the shortest operational path for running one AletheIA Work Slice.

Use it after `docs/getting-started.md` when you want to execute a useful slice without reading the whole repository first.

The path is intentionally small:

```text
signal / intent -> Work Slice -> minimum context -> decision -> execution -> validation -> closeout / restart
```

This document does not introduce a new taxonomy. It compresses existing AletheIA concepts into a first-use operating path.

---

## Anchor slice used by this guide

This guide is anchored in a real completed slice:

- Issue: `#100 — Hermes Agent + Agentic Stack controlled sandbox readiness`
- Closeout: `docs/aletheia/closeouts/2026-04-25-hermes-agentic-stack-sandbox-readiness.md`
- Slice result: controlled no-go for real Hermes runtime execution until a separate human-approved sandbox install/diagnostics slice exists

The slice is a good anchor because it had a clear intent, explicit stop lines, real validation evidence, and a non-trivial decision: it advanced readiness without pretending that Codex simulation was Hermes telemetry.

For exact reconstruction of Issue `#100`, the linked closeout is the only expected additional repository document beyond this guide.

---

## 1. Start from a signal or intent

Write the reason the slice exists in one sentence.

A useful intent says what must be true at close, not every step you might take.

For the anchor slice:

> Determine whether the current environment is ready for a controlled Hermes Agent + Agentic Stack sandbox pilot without treating Codex simulation as Hermes runtime telemetry.

Good intent is bounded enough that a reviewer can later ask: did this become true, false, or blocked?

Avoid starting from:

- a broad theme;
- a runtime preference;
- a tool someone wants to try;
- a list of documents to create without a decision to reach.

---

## 2. Shape one Work Slice

Turn the intent into one bounded Work Slice.

Minimum fields:

- goal;
- scope;
- out of scope;
- risk posture;
- expected evidence;
- stop line.

For the anchor slice:

- goal: record readiness/no-go evidence for Hermes Agent and Agentic Stack;
- scope: local availability checks, upstream capability/risk inspection, minimum no-go/readiness boundary;
- out of scope: no install, no productive Hermes task, no cron/gateway, no memory or skill promotion, no autonomy expansion;
- risk posture: low, because the slice was documentation/readiness only;
- expected evidence: closeout report, local checks, upstream references, validation results, issue/PR trail;
- stop line: do not treat any Codex-simulated result as Hermes runtime telemetry.

A Work Slice is healthy when the operator can stop without needing to solve the next slice.

---

## 3. Gather the minimum context

Collect only the context needed to make the slice decision.

Minimum context should answer:

- what is the official work item?
- what prior decision or artifact governs this slice?
- what files or external references are necessary?
- what cannot be assumed?

For the anchor slice, the minimum context was:

- Issue `#100`;
- existing Hermes policy and pre-pilot artifacts;
- public upstream repositories for Hermes Agent and Agentic Stack;
- local command availability checks;
- clean AletheIA worktree harness check.

The important negative context was also explicit: no local Hermes runtime was available, no `.agent/` harness was present, and no real Hermes telemetry existed.

Stop gathering context when more reading would mostly make the slice larger rather than safer.

---

## 4. Make the decision path visible

Before execution, state what decision the slice is meant to support.

Common decision postures include:

- continue under current scope;
- tighten scope or context;
- pause for review;
- hand off to a new boundary;
- escalate to stronger approval or runtime fit;
- stop under current conditions.

For the anchor slice, the decision path was:

- if Hermes/Agentic Stack were not installed or constrained, do not run a real Hermes task;
- if readiness evidence was enough, close this slice as documentation/readiness;
- if the human wanted to proceed, create a separate sandbox-install diagnostics slice.

The outcome was a controlled no-go for real Hermes runtime execution from the current environment, with a recommended next boundary.

Do not hide a decision inside narrative. AletheIA works when the next action is reviewable.

---

## 5. Execute only inside the slice boundary

Execute the smallest set of actions that can produce the expected evidence.

For the anchor slice, execution stayed inside documentation/readiness:

- checked whether Hermes-related commands were available;
- inspected whether AletheIA already contained Agentic Stack-style harness files;
- inspected public upstream surfaces;
- recorded risks and gates;
- wrote a closeout report.

It did not install Hermes Agent, did not run a productive Hermes task, did not create memory or skills, did not enable background automation, and did not change the runtime policy.

If execution discovers that the next action has a different risk, owner, runtime, or contract, stop and split the next Work Slice.

---

## 6. Validate proportionally

Validation should match the slice risk and claim.

For a low-risk documentation/readiness slice, validation can be command output, diff review, link/reference checks, governance scripts, or a closeout with explicit evidence.

For the anchor slice, validation included:

- local command availability checks showing `hermes`, `hermes-agent`, and `agentic-stack` were not available on PATH;
- repository harness check showing no `.agent/`, `.agents/`, `AGENTS.md`, `CLAUDE.md`, or `ANTIGRAVITY.md` in the clean worktree;
- governance baseline check;
- whitespace/diff check;
- explicit note that contract tests were blocked locally because dependencies were absent.

The validation proved readiness/no-go evidence. It did not prove Hermes runtime behavior.

A good validation statement says both what was proved and what was not proved.

---

## 7. Close, restart, or split

End the slice by recording:

- what was delivered;
- what was validated;
- current state;
- artifacts;
- completeness;
- next issue or next boundary;
- key learning if it changes future operation.

For the anchor slice, closeout recorded:

- delivered: controlled readiness/no-go report;
- validated: local checks, clean harness state, governance check, diff check;
- current state: no-go for real Hermes runtime execution from that environment;
- next boundary: human-approved disposable sandbox install/diagnostics issue;
- learning: Agentic Stack's memory/skills layer must be treated as a candidate runtime brain layer until reviewed.

A slice can close successfully even when the operational answer is no-go.
The value is the reviewable decision and the clean next boundary.

---

## Friction test for this path

After writing or changing this guide, test it against the anchor slice:

1. Start from `docs/getting-started.md`.
2. Use only this file to reconstruct the path of Issue `#100`.
3. Open the linked closeout only if exact evidence or restart detail is needed.
4. Count every additional repository document you must open.
5. If you need more than one extra document, the operating path still has a gap.

Expected first-use result:

- one reader can understand how to run a Lite or Standard Work Slice;
- the reader can see where intent, scope, risk, evidence, and closeout appear;
- no new framework vocabulary is required.

---

## What not to add here

Do not use this guide to add:

- a new template system;
- a Kanban decision protocol;
- telemetry scoring;
- runtime-specific automation;
- Hermes or Agentic Stack setup steps;
- Adaptive Skills adoption rules.

Those may be useful in later slices, but this P0 path exists to compress the core operating route first.

## Optional deeper reading

These documents are not required to run the first Work Slice. Use them only when the slice needs deeper gates, restart mechanics, or template detail.

- `docs/getting-started.md`
- `docs/readiness-gates-spec.md`
- `docs/slice-finalization-and-restart.md`
- `starter-pack/templates/slice-finalization-review-template.md`
