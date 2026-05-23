# Rules — `src/`

Applies when editing files under `src/` (or this project's primary source path).

- All new modules MUST have at least one unit test in the matching `tests/` path.
- Never introduce a new third-party dependency without recording the choice in `ops/ai/learnings/` — the justification must be durable, not chat-thread.
- Public APIs MUST have a docstring or JSDoc comment with parameters and return value documented.
- If a change touches a module that has historically broken (per `ops/ai/learnings/`), re-read the relevant learning before editing.

> Adapt the path and language-specific bits (JSDoc vs docstring vs Javadoc, etc.) to this project's stack on first use, then delete this note.
