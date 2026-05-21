# Rules — `tests/`

Applies when editing files under `tests/`.

- Honor the project's chosen test runner. Don't introduce a second one without an entry in `ops/ai/learnings/`.
- Integration tests SHOULD hit real dependencies (DB, queues) rather than mocks, unless the project's policy says otherwise. Mocks at the boundary have masked real regressions before.
- Each test file SHOULD have a single top-level `describe` (or equivalent) matching the module under test.
- Snapshot tests are permitted only when the asserted value is intentionally opaque (e.g., a large rendered payload). Prefer explicit assertions elsewhere.

> Adapt to this project's runner conventions on first use, then delete this note.
