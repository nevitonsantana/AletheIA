# Runtime Adapter — Claude Code

## Goal

Describe how a project can map AletheIA's portable agent roles onto Claude Code while keeping Claude-local agent mechanics as adapter detail rather than framework truth.

---

## Local runtime shape

Claude Code is often used with **local agent definitions, role presets, or runtime-local agent files**.

Typical properties:

- agent structure may be more declarative than tool-based runtimes
- local agent files or metadata may carry runtime-specific configuration
- the same canonical role may be implemented through richer runtime-local conventions

This is healthy as long as the framework meaning stays portable.

---

## Core adapter rule

Claude Code may use runtime-local agent files, frontmatter, or agent-specific metadata.

Those are **adapter concerns**.
They should not silently replace the canonical role contract.

A healthy Claude Code mapping still preserves three things separately:

1. **canonical role**
2. **Claude-local agent definition or class**
3. **selected skills**

---

## Recommended Claude Code role mapping

| Canonical role | Healthy Claude Code mapping | Notes |
|---|---|---|
| `orchestrator` | main Claude Code working boundary | should own framing, delegation choice, and integration |
| `explorer` | Claude-local research or inspection agent | should reduce discoverable unknowns without absorbing implementation |
| `implementer` | Claude-local execution agent | can be more declarative locally, but still owes bounded outputs |
| `reviewer` | Claude-local review or critique agent | useful when the runtime has strong review-oriented agent patterns |
| `validator` | Claude-local validation or QA-oriented agent | should stay attached to evidence, not broad reinterpretation |

Claude Code may expose more runtime-local structure than Codex.
That does not change the canonical role model.

---

## Skills in the Claude Code adapter

Claude Code may pair portable roles with the same skills library used in other runtimes.

That means a team can preserve continuity such as:

- `implementer` + `testing` + `debugging`
- `reviewer` + `architecture-review` + `communication`
- `validator` + `testing` + `workflow`

The role still defines:

- mission
- stop rules
- handoff triggers
- proof expectation

The skill only improves the execution discipline inside that role.

---

## Runtime-local richness rule

Claude Code may support richer local agent metadata than other runtimes.

Use that richness when it helps locally, but keep these distinctions explicit:

- local metadata is not the canonical role definition
- local file format is not framework truth
- local agent naming may differ from the portable role catalog

When in doubt, preserve the portable role in the handoff and treat the Claude-local configuration as an implementation detail.

---

## Handoff pattern

A Claude Code handoff should preserve at least:

- current canonical role
- receiving canonical role when relevant
- Claude-local agent reference if it matters for continuation
- selected skills when they materially shape the work
- proof already obtained
- next action

If the next boundary moves to Codex or another runtime, keep the canonical role stable whenever the semantic responsibility did not change.

---

## Non-goals

This adapter should not assume:

- Claude-local agent files define the framework core
- every local preset must become a new canonical role
- runtime richness justifies collapsing role and skill into one artifact

The adapter can be rich locally while the framework stays portable.
