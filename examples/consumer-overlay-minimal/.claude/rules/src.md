# Rules — `src/`

Applies when editing files under `src/`.

- All new modules MUST have at least one unit test in the matching `tests/` path.
- Never introduce a new third-party dependency without recording the choice in `ops/ai/learnings/`.
- Public APIs (anything exported from `src/index.ts`) MUST have a JSDoc comment with at least the parameters and return value documented.
- Alert-sink modules (`src/sinks/`) MUST handle failures by emitting a higher-priority alert; never swallow.
