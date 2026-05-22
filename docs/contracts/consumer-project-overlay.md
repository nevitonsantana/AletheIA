# Consumer-project overlay contract

> **Normative.** This contract specifies how a consumer project instantiates the AletheIA operating overlay. It does not dictate product architecture (see [operating-overlay](../concepts/operating-overlay.md) §"Antifragile patterns") and does not replace an application framework. It defines only the overlay surface.
>
> See also: [ADR-004](../adr/ADR-004-aletheia-as-operating-overlay.md), [operating-overlay](../concepts/operating-overlay.md), [project-extension-pattern](../concepts/project-extension-pattern.md), [project-local-constitution-context](../concepts/project-local-constitution-context.md).

## 1. Scope

This contract specifies:

- The directory layout a consumer project MUST adopt to host the overlay.
- The purpose, minimum content, and exclusion rules for each overlay folder.
- The conformance level of each element: **MUST**, **SHOULD**, **MAY** (RFC 2119).
- A minimum-viable adoption path for legacy projects.
- File-naming conventions for overlay artifacts.

This contract does NOT specify:

- The product's source layout (`src/`, `services/`, `app/`, etc.).
- Build, test, or deploy tooling for the product.
- Harness-specific runtime behavior (those are harness shims; see [runtime-adapter-contract](runtime-adapter-contract.md)).

## 2. Required directory layout

```
consumer-project/
├── <product code>                   # OUT OF SCOPE — product layer
├── AGENTS.md                        # MUST — cross-agent dispatcher
├── CLAUDE.md                        # MUST (if Claude Code is used)
├── .claude/                         # MUST (if Claude Code is used) — harness shim
│   ├── rules/                       # SHOULD
│   └── settings.json                # SHOULD
└── ops/ai/                          # MUST — the overlay root
    ├── constitution/                # MUST
    ├── handoffs/                    # MUST
    ├── reports/                     # MUST
    ├── policies/                    # SHOULD
    ├── schemas/                     # MAY
    ├── skills/                      # MAY
    └── learnings/                   # SHOULD
```

The overlay root MUST be `ops/ai/`. Renaming is non-conformant; the path is the contract.

## 3. Folder specifications

Each subsection states: **purpose**, **minimum content**, **examples**, **what NOT to put**, and **conformance**.

### 3.1 `ops/ai/constitution/` — MUST

**Purpose.** Fix the project's mission, scope, primary stack, principles, and non-negotiables. The constitution is the document an agent reads first to know what game it is playing.

**Minimum content.**
- `mission.md` — one paragraph: what the project exists to do, for whom.
- `scope.md` — in/out of scope; what the project does NOT do.
- `stack.md` — primary languages, frameworks, infra; one line each.
- `principles.md` — 5–10 non-negotiable principles; no platitudes.

**Examples of good entries** *(drawn from the first validation case — see [`pilots/pilot-crisis-monitor.md`](../pilots/pilot-crisis-monitor.md))*:
- mission: *"`<consumer-product>` surfaces emerging operational incidents across our regions in under 5 minutes, for the incident-response team."*
- principle: *"Never silently drop an alert. If a sink fails, surface the failure as a higher-priority alert."*

**What NOT to put.**
- Product architecture diagrams (those belong in product docs).
- API specifications (product docs).
- Runtime credentials, tokens, environment URLs (harness).

**Conformance.** MUST exist with at least the four files above non-empty.

### 3.2 `ops/ai/handoffs/` — MUST

**Purpose.** Capture transitions between sessions, agents, or humans. A handoff lets the next operator start without re-deriving context.

**Minimum content.** At least the most recent handoff file. Naming: `YYYY-MM-DD-<slug>.md` (ISO date prefix, see §5).

**Required handoff structure** (see [handoff-capture-pattern](../concepts/handoff-capture-pattern.md) for full pattern):
- **Context** — what was being worked on and why.
- **State** — what is done, in progress, blocked.
- **Next** — concrete next steps for the resumer.
- **Open questions** — anything that needs human input.

**Examples.**
- `2026-05-18-claude-to-codex-auth-refactor.md`
- `2026-05-19-end-of-session-incident-pipeline.md`

**What NOT to put.**
- Long-form decision rationale (use `reports/` for closeouts or a project ADR for decisions).
- Conversational session transcripts (those are harness state).

**Conformance.** MUST contain at least one handoff after the first non-trivial session. Empty directory is acceptable only before first use.

### 3.3 `ops/ai/reports/` — MUST

**Purpose.** Closeouts and progress reports. A report makes a unit of work reviewable by someone who was not in the room.

**Minimum content.** Closeout per work slice (or per sprint, depending on cadence). Naming: `YYYY-MM-DD-<slug>-closeout.md`.

**Required closeout structure** (three layers, per the author's standard format):
1. **Done** — what shipped.
2. **Pending** — what was scoped but not shipped, with reason.
3. **Frictions** — what got in the way; signal for overlay or local refinement.

**Examples.**
- `2026-05-15-alert-pipeline-v1-closeout.md`
- `2026-05-19-onboarding-flow-closeout.md`

**What NOT to put.**
- Real-time status (Slack/standup is the right channel).
- Marketing copy. Closeouts are operational, not promotional.

**Conformance.** MUST contain at least one closeout per shipped slice.

### 3.4 `ops/ai/policies/` — SHOULD

**Purpose.** Local rules that constrain how the agent operates on this project, beyond what canonical AletheIA already imposes.

**Minimum content.** One file per concern. Examples:
- `pr-policy.md` — required reviewers, branch naming, commit conventions.
- `data-handling-policy.md` — what data can/can't enter logs, prompts, or context windows.
- `tool-use-policy.md` — which MCP servers or external services are permitted.

**What NOT to put.**
- Restatements of canonical AletheIA policies (link to them).
- Hard-coded credentials or API keys.

**Conformance.** SHOULD exist if the project has non-default operational constraints. MAY be omitted for purely exploratory projects.

### 3.5 `ops/ai/schemas/` — MAY

**Purpose.** Project-local data structures used by overlay operations (e.g., custom telemetry shapes, project-specific closeout extensions).

**Minimum content.** JSON Schema or YAML; one file per structure.

**What NOT to put.**
- Product domain schemas (those belong in the product layer).
- Schemas already specified in canonical AletheIA (link to them).

**Conformance.** MAY be omitted entirely. If present, every schema MUST be valid JSON Schema / YAML and linked from the artifact that uses it.

### 3.6 `ops/ai/skills/` — MAY

**Purpose.** Reusable operating procedures specific to this project, packaged so the agent can invoke them by name.

**Minimum content.** One folder per skill, each with a `SKILL.md` describing trigger, inputs, outputs, and steps.

**Examples.**
- `incident-triage/SKILL.md` — how to triage an operational incident in the consumer product.
- `migration-checklist/SKILL.md` — pre-deploy checklist for schema migrations.

**What NOT to put.**
- Generic skills that would apply to any project (promote to canonical AletheIA via the [promotion gate](../concepts/operating-overlay.md#antifragile-patterns-how-to-avoid-drift)).
- Product code disguised as a skill.

**Conformance.** MAY be omitted.

### 3.7 `ops/ai/learnings/` — SHOULD

**Purpose.** Durable lessons that survive sessions and inform future work. A learning is the bridge between "we found this once" and "we now operate differently because of it."

**Minimum content.** One file per learning, naming: `YYYY-MM-DD-<slug>.md`. Each learning MUST state:
- **Context** — what was happening.
- **Observation** — what we noticed.
- **Change** — what we now do differently (or why we decided not to change).

**What NOT to put.**
- Bug reports (those are tickets).
- One-off observations with no behavioral consequence (those are notes; keep them out of the canonical learnings stream).

**Conformance.** SHOULD accumulate over time. Empty after several sprints is a smell.

## 4. Harness shim files (project root)

### 4.1 `AGENTS.md` — MUST

**Purpose.** Cross-agent dispatcher. Any harness reads this first to learn the project shape.

**Required sections** (see [project-extension-pattern](../concepts/project-extension-pattern.md)):
1. **Project one-liner.**
2. **Where the overlay lives** (`ops/ai/`).
3. **Essential commands** (build, test, lint, run).
4. **Validation gates** (what must pass before merge).
5. **Non-negotiable rules** (3–5 max; link to `ops/ai/constitution/principles.md` for the full list).
6. **Pointers** to overlay folders the agent should consult.

**Size limit.** SHOULD be ≤150 lines. Longer means it is absorbing what belongs in overlay folders.

### 4.2 `CLAUDE.md` — MUST if Claude Code is used

**Purpose.** Claude Code-specific shim. Imports or links to `AGENTS.md`, adds at most a few Claude-specific notes.

**Size limit.** SHOULD be ≤30 own lines (excluding imports).

### 4.3 `.claude/` — SHOULD if Claude Code is used

- `.claude/rules/` — path-scoped rules (one file per scope, e.g., `src.md`, `tests.md`).
- `.claude/settings.json` — Claude Code configuration.

Other harnesses (Codex, Cursor, Qwen) have their own shim directory; see the relevant adapter (e.g., [runtime-adapter-claude-code](../reference/runtime-adapter-claude-code.md), [runtime-adapter-codex](../reference/runtime-adapter-codex.md)). The overlay (`ops/ai/`) is identical across harnesses; only the shim changes.

## 5. File-naming conventions

- **Dated artifacts** (handoffs, reports, learnings): `YYYY-MM-DD-<kebab-slug>.md`.
  - Date is the ISO date of the *event*, not the file's last edit.
- **Closeouts**: append `-closeout` suffix: `YYYY-MM-DD-<slug>-closeout.md`.
- **Slugs**: lowercase, kebab-case, ≤6 words; describe the subject, not the actor.
  - Good: `2026-05-19-incident-pipeline-cutover.md`
  - Bad: `2026-05-19-claude-finished-pipeline.md`
- **Skills**: one folder per skill, `SKILL.md` inside.
- **Schemas**: descriptive noun, `.schema.json` or `.schema.yaml`.

## 6. Adopting in a legacy project (minimum-viable path)

A legacy project SHOULD NOT be rewritten to adopt the overlay. The minimum adoption path is:

1. **Create `ops/ai/`** with empty `constitution/`, `handoffs/`, `reports/` subfolders.
2. **Fill the constitution** — mission, scope, stack, principles. Two paragraphs each is enough to start.
3. **Add `AGENTS.md`** at the project root with sections from §4.1; point to `ops/ai/`.
4. **Add `CLAUDE.md`** (or the relevant harness shim) — 10–30 lines, importing from `AGENTS.md`.
5. **Write the first handoff** at the end of the next session, even if the session was small.

That is the conformance floor. Everything else (`policies/`, `schemas/`, `skills/`, `learnings/`) accretes naturally as the project encounters the need.

**Anti-pattern: don't backfill.** Do not generate fake historical handoffs, closeouts, or learnings. The overlay starts at adoption date; the past is the product's history, not the overlay's.

## 7. Conformance summary

| Element | Level | Empty allowed | Notes |
|---|---|---|---|
| `ops/ai/` (root) | MUST | No | The path is the contract |
| `constitution/` | MUST | No | Four files non-empty |
| `handoffs/` | MUST | Only pre-first-use | At least one after first non-trivial session |
| `reports/` | MUST | Only pre-first-slice | One closeout per shipped slice |
| `policies/` | SHOULD | Yes | MAY omit for exploratory projects |
| `schemas/` | MAY | Yes | If present, must validate |
| `skills/` | MAY | Yes | Project-specific only |
| `learnings/` | SHOULD | Yes early on | Empty after several sprints is a smell |
| `AGENTS.md` | MUST | No | ≤150 lines |
| `CLAUDE.md` | MUST (if Claude) | No | ≤30 own lines |
| `.claude/rules/` | SHOULD (if Claude) | Yes | Path-scoped |
| `.claude/settings.json` | SHOULD (if Claude) | No | Required for non-default Claude config |

## 8. Conformance test (minimum)

A consumer project conforms to this contract when, given a fresh agent session pointed at the project root:

1. The agent locates `AGENTS.md` without being told.
2. The agent locates `ops/ai/constitution/` from `AGENTS.md` in ≤2 hops.
3. The agent can describe mission, scope, and stack from the constitution in its first response.
4. The agent finds the most recent handoff and continues from it without asking for context already captured there.

Failing any of these indicates a shim or constitution gap; see §6 step 5 and §4.1.

## 9. See also

- **Reference example:** `examples/consumer-overlay-minimal/` — a navigable minimum-viable overlay instantiation.
- **[operating-overlay](../concepts/operating-overlay.md)** — conceptual background and the three-layer model.
- **[ADR-004](../adr/ADR-004-aletheia-as-operating-overlay.md)** — the boundary decision and its rationale.
- **[handoff-capture-pattern](../concepts/handoff-capture-pattern.md)** — full pattern for handoff artifacts.
- **[project-extension-pattern](../concepts/project-extension-pattern.md)** — how local extensions stay portable.
