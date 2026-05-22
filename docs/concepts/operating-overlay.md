# Operating overlay

> **Read this when:** you're deciding whether something belongs in AletheIA, in the consumer project, or in the harness. For the formal decision and rationale, see [ADR-004](../adr/ADR-004-aletheia-as-operating-overlay.md).

## What it is

An **operating overlay** is a portable layer that governs *how AI-assisted work is operated, decided, validated, handed off, and learned from* — distinct from the product being built and from the runtime that executes the agent. AletheIA is an operating overlay. It does not absorb product architecture, and it does not absorb runtime state.

## The three layers

```
┌─────────────────────────────────────────────────────────────┐
│  PRODUCT / APP                                              │
│  "How is the system built?"                                 │
│  src/, services/, schemas of the domain, framework code     │
│  Owned by: the consumer project                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              │  the overlay sits BETWEEN
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  OPERATING OVERLAY (AletheIA)                               │
│  "How do we decide, validate, deliver, hand off, learn?"    │
│  ops/ai/, AGENTS.md, constitution/, handoffs/, reports/     │
│  Owned by: AletheIA (canonical) + consumer project (local)  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  HARNESS RUNTIME                                            │
│  "Where and with what resources do we execute?"             │
│  ~/.claude/, ~/.codex/, ~/.hermes/, session DB, plugins     │
│  Owned by: the harness vendor (Anthropic, OpenAI, Hermes…)  │
└─────────────────────────────────────────────────────────────┘
```

Each layer answers one question. When an artifact tries to answer two, it is mis-factored — refactor before relocating.

## Membership criterion (the one-liner test)

| If the artifact is about… | …it belongs in |
|---|---|
| how the code is built (framework, files, data, integrations) | **product** |
| how to decide, validate, deliver, hand off, learn | **overlay** |
| credentials, sessions, plugins, local agent logs | **harness** |

## Belongs / doesn't belong

The hard part is not the obvious cases — it's the ambiguous ones. These are the references.

| Example | Layer | Why |
|---|---|---|
| `src/services/orders.ts` in a consumer project | **product** | Code that implements the domain. AletheIA has no opinion on it. |
| `ops/ai/constitution/mission.md` in a consumer project | **overlay (local)** | Local instance of an overlay pattern, inside the consumer project. |
| `docs/contracts/delivery-output-contract.md` in AletheIA repo | **overlay (canonical)** | A normative spec for how AI-assisted deliveries must be shaped. |
| Hermes session DB schema | **harness** | Runtime state — where the agent stored its session, not how the work was decided. |
| Hermes logging plugin | **harness** | A vendor capability for the runtime, not a portable governance pattern. |
| `canonical-vocabulary.md` (Work Slice, Restart Package, etc.) | **overlay (canonical)** | Stable language used to operate, regardless of harness or project. |
| `AGENTS.md` in a consumer project | **overlay (local)** | A dispatcher that points the harness at the local overlay. |
| `.claude/settings.json` in a consumer project | **harness shim** | A thin adapter so a specific harness (Claude Code) can consume the overlay. |
| `closeout-template.md` in AletheIA repo | **overlay (canonical)** | A pattern for how to finalize and hand off work. |
| Postgres connection string for the product DB | **product** | Build/runtime detail of the consumer system. |
| `~/.claude/projects/.../memory/` | **harness** | Local cache of conversational state managed by the harness. |

## Five "looks like X but is Y" calls

These are the calls that recur in PR review. Get them right and most ambiguity disappears.

1. **A Hermes plugin that captures handoff signals** — *looks like overlay* (handoffs are an overlay concern). **Is harness.** The handoff *pattern* is overlay; the plugin that implements it for one runtime is harness. Promote the pattern to AletheIA; keep the plugin where it ran.

2. **A `closeout-template.md` saved inside `~/.claude/`** — *looks like harness* (it's in the harness home directory). **Is overlay.** The location is incidental — the artifact governs how work is delivered, regardless of which agent ran. Move it to the canonical overlay (or the project's local overlay) and reference it from the harness.

3. **A `deployment-runbook.md` describing how to deploy the consumer product** — *looks like overlay* (it's a runbook). **Is product.** Operating the product ≠ operating the AI-assisted work. The deploy runbook is part of the consumer project's own docs, not its `ops/ai/` overlay.

4. **A `risk-inference-skill.md` invoked by Claude during planning** — *looks like harness* (skills feel like a Claude Code feature). **Is overlay.** The skill encodes how a decision is made; the harness merely executes it. Belongs in the canonical overlay; the harness shim points at it.

5. **A `.env` file with API keys for the agent's tool use** — *looks like overlay* (the agent uses it during operation). **Is harness.** Credentials are runtime concerns. The overlay can specify *that* the agent needs credentials, never *what* they are.

When in doubt, ask: *would this artifact still make sense if we swapped the harness?* If yes → overlay. *Would it still make sense if we swapped the project?* If yes → canonical overlay (otherwise local overlay).

## How the overlay relates to specific harnesses

**Claude Code.** The overlay is reached through `AGENTS.md` and `CLAUDE.md` at the project root, plus `.claude/rules/` for path-scoped rules. These files are *shims*, not the overlay itself — they import or reference the canonical patterns and the project's local `ops/ai/`. The harness contributes execution, file access, MCP servers, and its own memory; it does not own the operating discipline.

**Codex / Cursor / other code agents.** Same shape, different shim. The overlay is identical; only the dispatcher file changes. AletheIA does not ship Codex shims today — it will when a real project needs one (see [ADR-004 §4](../adr/ADR-004-aletheia-as-operating-overlay.md) on the "no premature shims" position).

**Hermes Agent.** Hermes is a runtime. Its session DB, cron, plugins, and local logs are harness concerns. Hermes consumes overlay patterns (handoffs, closeouts, restart packages) the same way Claude Code does — through shims — but it does not push runtime mechanics into the overlay. The pattern-vs-plugin distinction in example 1 above came directly from Hermes integration work.

## Antifragile patterns: how to avoid drift

Two forces push the overlay out of shape. Resist both.

**Drift toward product.** A consumer project will ask the overlay to encode product-specific decisions ("our orders service uses event sourcing, so the overlay should…"). The overlay must stay agnostic about *what* is built. Encode product-specific guidance in the project's local overlay (`ops/ai/`), never in canonical AletheIA. If a pattern looks generalizable, wait for a second project to confirm it before promoting.

**Drift toward harness.** A harness will offer capabilities that feel natural to absorb ("Claude Code skills are great, let's make them a core AletheIA concept"). The pattern can be overlay; the capability cannot. Encode the *pattern* (e.g., "skills are a way to package reusable operating procedures") in canonical AletheIA; let each harness shim adapt the pattern to its mechanism.

Two heuristics make this concrete:

- **The swap test.** *Would this artifact still be useful if we swapped the harness or the project?* Yes to both → canonical overlay. Yes to harness swap only → local overlay. Yes to project swap only → harness. Neither → it's mis-factored; refactor first.
- **The promotion gate.** A pattern is promoted from local overlay to canonical AletheIA only when at least two consumer projects use it with <20% diff. Until then, it lives locally. This is the same rule ADR-004 §6 applies to bootstrap extraction.

## See also

- **[ADR-004](../adr/ADR-004-aletheia-as-operating-overlay.md)** — the formal decision, the rejected alternatives, and the conditions for reopening.
- **[architecture.md](architecture.md)** — the canonical contracts that live inside the overlay layer.
- **[governance.md](governance.md)** — what is mandatory, forbidden, and requires approval within the overlay.
- **[canonical-vocabulary.md](canonical-vocabulary.md)** — the stable language used across the overlay.
- **[project-extension-pattern.md](project-extension-pattern.md)** — how a consumer project extends the overlay without distorting it.
- **`contracts/consumer-project-overlay.md`** *(Epic 4, not yet written)* — the normative spec for how consumer projects instantiate the overlay layer.
