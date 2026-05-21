# Example — consumer-overlay-minimal

A navigable minimum-viable instantiation of the [consumer-project-overlay contract](../../docs/contracts/consumer-project-overlay.md). Models a fictional consumer project ("Crisis Monitor") at its very first day of overlay adoption.

## What this example shows

- The exact directory layout required by the contract.
- Realistic-but-fictional content in each MUST and SHOULD folder.
- A working `AGENTS.md` and `CLAUDE.md` that a real Claude Code session could load.
- The shape of a first handoff and a first closeout.
- Empty placeholder folders for elements that accrue over time (`schemas/`, `skills/`).

## What this example does NOT show

- Product source code. The product layer is intentionally absent — this example exists only to demonstrate the overlay surface.
- Multiple cumulative slices. This is day-one state; a real project's `handoffs/`, `reports/`, and `learnings/` grow over time.
- Multi-harness configuration. Only the Claude shim is included.

## How to use it

**Reading.** Walk the tree in this order:

1. [`AGENTS.md`](AGENTS.md) — what any harness sees first.
2. [`CLAUDE.md`](CLAUDE.md) — the Claude-specific shim.
3. [`ops/ai/constitution/`](ops/ai/constitution/) — mission, scope, stack, principles.
4. [`ops/ai/handoffs/`](ops/ai/handoffs/) — the latest transition.
5. [`ops/ai/reports/`](ops/ai/reports/) — the latest closeout.
6. [`ops/ai/policies/`](ops/ai/policies/) and [`ops/ai/learnings/`](ops/ai/learnings/) — supporting surfaces.

**Adapting for a real project.** Copy `examples/consumer-overlay-minimal/` to your project root, then:

1. Replace `Crisis Monitor` with your project name across all files.
2. Rewrite the four `constitution/` files for your project.
3. Trim or extend the rules in `.claude/rules/`.
4. Delete the seed handoff/closeout/learning files; they are fiction.
5. Update `AGENTS.md` essential-commands section with your actual build/test/run commands.

## Conformance trace

Each file in this example maps to a contract clause:

| Path | Contract clause |
|---|---|
| `ops/ai/constitution/{mission,scope,stack,principles}.md` | §3.1 MUST |
| `ops/ai/handoffs/2026-05-20-initial-overlay-adoption.md` | §3.2 MUST, §5 naming |
| `ops/ai/reports/2026-05-20-overlay-bootstrap-closeout.md` | §3.3 MUST, three-layer structure |
| `ops/ai/policies/pr-policy.md` | §3.4 SHOULD |
| `ops/ai/learnings/2026-05-20-overlay-adoption-cost.md` | §3.7 SHOULD |
| `AGENTS.md` | §4.1 MUST, ≤150 lines |
| `CLAUDE.md` | §4.2 MUST, ≤30 own lines |
| `.claude/rules/{src,tests}.md` | §4.3 SHOULD, path-scoped |
| `.claude/settings.json` | §4.3 SHOULD |

`ops/ai/schemas/` and `ops/ai/skills/` are MAY-level and omitted here.
