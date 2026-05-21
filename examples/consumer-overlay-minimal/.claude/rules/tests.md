# Rules — `tests/`

Applies when editing files under `tests/`.

- Use Vitest. Don't introduce a second test runner without an entry in `ops/ai/learnings/`.
- Integration tests MUST hit a real Postgres (via the `docker-compose.test.yml` setup), not a mock. Mocks at the DB layer have masked migration breakage before.
- Each test file MUST have a single top-level `describe` matching the module under test.
- Snapshot tests are permitted only for alert payloads; use explicit assertions elsewhere.
