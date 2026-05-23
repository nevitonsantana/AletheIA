# CLAUDE.md

Read [`AGENTS.md`](AGENTS.md) first. It is the source of truth for project shape, commands, gates, and rules. This file adds only Claude-specific notes.

## Claude-specific notes

- Path-scoped rules live in [`.claude/rules/`](.claude/rules/). Honor them when editing files under the matching paths.
- When in doubt about scope, prefer asking over inventing. The constitution is short on purpose.
- End every non-trivial session with a handoff in [`ops/ai/handoffs/`](ops/ai/handoffs/) using the four-section structure (Context, State, Next, Open questions).
