# AletheIA — Capability Catalog

This catalog describes what the AletheIA operating overlay provides, how to activate each element, and recommended flows for common adoption scenarios.

For installation, see [`installation-guide.md`](installation-guide.md). For the normative contract these elements satisfy, see [`docs/contracts/consumer-project-overlay.md`](../contracts/consumer-project-overlay.md).

---

## What the overlay provides

After installation, your project has two kinds of overlay elements:

1. **Entry points** — files that agents read on startup to understand scope and rules.
2. **Working folders** — directories where operating artifacts accumulate as work happens.

### Entry points

| File | Conformance | What it does |
|---|---|---|
| `AGENTS.md` | MUST | Cross-agent dispatcher. The first file any conformant agent reads. Points to the overlay location, declares which harnesses are in use, and sets the top-level reading order. |
| `CLAUDE.md` | MUST (if using Claude Code) | Claude Code–specific shim. Keeps harness-specific config out of the portable overlay. |
| `.claude/settings.json` | MUST (if using Claude Code) | Claude Code runtime configuration: permissions, tool allowlists, model selection. |
| `.claude/rules/*.md` | SHOULD | Path-scoped rules that apply per directory. `src.md` for product code, `tests.md` for tests, `ops-ai.md` for the overlay folder. |
| `ops/ai/constitution/` | MUST | The project's anchor. Mission, scope, stack, and non-negotiable principles. Agents read this before acting. |

### Working folders

| Folder | Conformance | What accumulates here |
|---|---|---|
| `ops/ai/handoffs/` | MUST | Session and boundary transitions. One file per handoff, named `YYYY-MM-DD-<slug>.md`. |
| `ops/ai/reports/` | MUST | Closeouts and progress reports. One file per work slice or sprint, named `YYYY-MM-DD-<slug>-closeout.md`. |
| `ops/ai/policies/` | SHOULD | Project-local constraints beyond canonical AletheIA (PR conventions, branching rules, security gates). |
| `ops/ai/schemas/` | MAY | Project-specific data structures used by overlay operations. |
| `ops/ai/skills/` | MAY | Reusable operating procedures local to this project. Not the same as Adaptive Skills — these are project-specific operating recipes. |
| `ops/ai/learnings/` | SHOULD | Durable lessons extracted from real work. One file per learning, named `YYYY-MM-DD-<slug>.md`. |

---

## How to activate each element

### Constitution

The constitution is passive — agents read it automatically if `AGENTS.md` is correctly configured. Your job is to keep it current.

- Replace `ops/ai/constitution/README.md` with four files: `mission.md`, `scope.md`, `stack.md`, `principles.md`.
- Start minimal. One paragraph each is enough.
- Trigger a re-read when scope or principles change: open a new session and tell the agent "re-read the constitution before we start."

### Work Slices

A Work Slice is not a file you create — it is a bounded unit of work you declare at the start of a session. Activating it means framing the task explicitly:

```
Task: migrate the orders table to the new schema
Scope: only ops/db/migrations/ — no application code changes
Risk: High (production data)
Stop line: if migration plan requires touching more than 3 files, surface and pause
```

The agent records the slice framing in a decision record (see below). You can also use the Work Slice spec bundle for high-risk tasks:
- [`docs/work-slice-spec-bundle.md`](../work-slice-spec-bundle.md)

### Handoffs

A handoff is created at the end of a session or at a meaningful boundary. To trigger one, tell the agent:

```
Create a handoff for this session.
```

The handoff captures: what was worked on, what is done, what is in progress, what is blocked, and what the next operator needs to know. It lands in `ops/ai/handoffs/YYYY-MM-DD-<slug>.md`.

For the full handoff pattern: [`docs/concepts/handoff-capture-pattern.md`](../concepts/handoff-capture-pattern.md).

### Reports and closeouts

A closeout is created when a work slice is done. To trigger one:

```
Create a closeout report for this slice.
```

Reports land in `ops/ai/reports/YYYY-MM-DD-<slug>-closeout.md`. They contain: what was done, proof of validation, decisions made, and open questions.

### Learnings

A learning is created when you want to capture a durable lesson from a session:

```
Capture a learning: we found that X consistently happens when Y. Adjust Z going forward.
```

Learnings land in `ops/ai/learnings/YYYY-MM-DD-<slug>.md` and are read by future agents to inform behavior without repeating the same friction.

### Policies

Policies are project-local rules you write manually. Create one file per concern in `ops/ai/policies/`:

- `pr-policy.md` — branch naming, required reviewers, commit conventions.
- `security-gates.md` — what requires a human review gate.
- `data-access.md` — what data the agent may and may not read.

Agents read the policies folder on startup if `AGENTS.md` points to it (the default shim does).

---

## Recommended flows

### New project from scratch

1. Install AletheIA (see [`installation-guide.md`](installation-guide.md)).
2. Fill the constitution with at least `mission.md` and `scope.md`.
3. Open the first Claude Code session.
4. Run a low-risk Work Slice to validate the overlay is working (e.g., scaffold a README or write a spec).
5. At session end, create the first handoff.
6. Expand the constitution and policies as you learn what constraints matter.

### Existing project (legacy adoption)

You do not need to stop work to adopt AletheIA. The minimum viable path:

1. Install the overlay into the project root (step 2 of installation-guide.md).
2. Write a minimal constitution that captures the current reality — even if the project is already running.
3. For in-flight work, create a handoff that captures current state as if starting fresh.
4. Add policies for the constraints you already enforce informally.
5. Start using Work Slices for new work; retrofit existing tasks gradually.

For the full guidance: [`docs/apply-to-existing-project.md`](../apply-to-existing-project.md).

### Squad with BMAD or SDD

AletheIA is complementary, not competing. If your squad already uses BMAD or SDD:

- Keep your existing squad method — do not replace it.
- AletheIA adds the operating loop your method does not provide: scope boundaries, governance gates, handoffs, and learnings.
- Point BMAD/SDD agents at the constitution so they operate within declared scope.
- Use handoffs to pass work between BMAD/SDD agents and AletheIA-governed sessions.

For the positionining: [`docs/adr/ADR-005-positioning-in-agentic-ecosystem.md`](../adr/ADR-005-positioning-in-agentic-ecosystem.md).

### Using Adaptive Skills alongside AletheIA

[Adaptive Skills](https://github.com/nevitonsantana/adaptive-skills) is a compatible capability library. To use both:

1. Install Adaptive Skills separately: `apm install nevitonsantana/adaptive-skills`.
2. Skills live in the project's `ops/ai/skills/` folder (project-local) or in the Adaptive Skills library (shared).
3. AletheIA governs when and how skills are invoked — skills execute, AletheIA decides the flow.

For the full relationship: [`docs/adr/ADR-005-positioning-in-agentic-ecosystem.md`](../adr/ADR-005-positioning-in-agentic-ecosystem.md).

---

## Checklist for first adoption

Use this checklist after installation and before the first real session.

```
[ ] apm_modules/AletheIA/ exists and is non-empty
[ ] ops/ai/ exists with all required subfolders
[ ] AGENTS.md exists at project root (no {{...}} placeholders)
[ ] CLAUDE.md exists at project root (no {{...}} placeholders)
[ ] .claude/settings.json exists (no {{...}} placeholders)
[ ] ops/ai/constitution/ has at least mission.md and scope.md (non-empty)
[ ] First Claude Code session read AGENTS.md on startup (check session output)
[ ] Agent acknowledged the overlay under ops/ai/ without prompting
[ ] Agent surfaced a conflict or asked for clarification when given an out-of-scope task
```

If any box is unchecked, the overlay is not fully active. See [`installation-guide.md#troubleshooting`](installation-guide.md#troubleshooting) or the technical reference at [`docs/guides/install-via-apm.md`](../guides/install-via-apm.md).

---

## Further reference

| Need | Where to look |
|---|---|
| Full contract for all overlay elements | [`docs/contracts/consumer-project-overlay.md`](../contracts/consumer-project-overlay.md) |
| Work Slice pattern in depth | [`docs/concepts/work-slice-pattern.md`](../concepts/work-slice-pattern.md) |
| Handoff pattern in depth | [`docs/concepts/handoff-capture-pattern.md`](../concepts/handoff-capture-pattern.md) |
| Governance gates and decision records | [`docs/governance.md`](../governance.md) |
| Daily operations workflow | [`starter-pack/guides/daily-operations.md`](../../starter-pack/guides/daily-operations.md) |
| Harness-specific setup (Claude Code, Codex, etc.) | [`docs/guides/setting-up-harnesses.md`](../guides/setting-up-harnesses.md) |
| Manual adoption (no APM) | [`packs/operating-overlay/README.md`](../../packs/operating-overlay/README.md) |
