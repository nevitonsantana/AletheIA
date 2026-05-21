# Claude Code harness shims

Thin adapters that let a Claude Code session consume the AletheIA operating overlay in a consumer project. The shims do not contain the overlay — they point at it.

See [docs/contracts/consumer-project-overlay.md §4](../../../docs/contracts/consumer-project-overlay.md) for the normative spec these templates satisfy, and [docs/guides/setting-up-harnesses.md](../../../docs/guides/setting-up-harnesses.md) for the adoption walkthrough.

## What's here

| File | Purpose | Goes to |
|---|---|---|
| [`AGENTS.md.template`](AGENTS.md.template) | Cross-agent dispatcher (contract §4.1, MUST, ≤150 lines) | `<project>/AGENTS.md` |
| [`CLAUDE.md.template`](CLAUDE.md.template) | Claude-specific shim (contract §4.2, MUST if Claude, ≤30 own lines) | `<project>/CLAUDE.md` |
| [`.claude/settings.json.template`](.claude/settings.json.template) | Claude Code configuration (contract §4.3, SHOULD) | `<project>/.claude/settings.json` |
| [`.claude/rules/src.md`](.claude/rules/src.md) | Path-scoped rule example for product source | `<project>/.claude/rules/src.md` |
| [`.claude/rules/tests.md`](.claude/rules/tests.md) | Path-scoped rule example for tests | `<project>/.claude/rules/tests.md` |
| [`.claude/rules/ops-ai.md`](.claude/rules/ops-ai.md) | Path-scoped rule for the overlay folder itself | `<project>/.claude/rules/ops-ai.md` |

## Template variables

| Variable | Replace with |
|---|---|
| `{{PROJECT_NAME}}` | Display name of the project (e.g., `Crisis Monitor`) |
| `{{PROJECT_ONE_LINER}}` | One-sentence description: what the project does, for whom |
| `{{PRIMARY_STACK}}` | Comma-separated primary languages/frameworks (e.g., `TypeScript, Node 20, Postgres`) |
| `{{INSTALL_CMD}}` | Install command (e.g., `pnpm install`) |
| `{{TEST_CMD}}` | Test command (e.g., `pnpm test`) |
| `{{LINT_CMD}}` | Lint command (e.g., `pnpm lint`) |
| `{{BUILD_CMD}}` | Build command (e.g., `pnpm build`) |
| `{{DEV_CMD}}` | Local dev command, or `n/a` (e.g., `pnpm dev`) |

A trivial substitution one-liner that works on macOS and Linux is in the setup guide.

## Adoption

Three steps; the full walkthrough lives in [setting-up-harnesses.md](../../../docs/guides/setting-up-harnesses.md):

1. Copy this directory's contents into the consumer project root.
2. Rename each `*.template` file by removing the suffix.
3. Substitute the template variables.

After that, the project must also have `ops/ai/` populated per the contract (see [`examples/consumer-overlay-minimal/`](../../../examples/consumer-overlay-minimal/) for a reference instantiation).

## What this is not

- **Not the overlay.** The overlay lives in `ops/ai/`; these shims only point at it.
- **Not Codex- or Cursor-aware.** Other harnesses get their own shim directory when a real project needs one.
- **Not a generator.** This is a copy-and-substitute pack, intentionally static and reviewable.
