# Schemas — MAY be empty

Project-local data structures for overlay operations (custom telemetry shapes, project-specific closeout extensions). One file per schema, JSON Schema or YAML.

**MAY** be omitted entirely. If present, every schema MUST validate and be linked from the artifact that consumes it.

**Not for product domain schemas** — those belong in the product layer.

See [docs/contracts/consumer-project-overlay.md §3.5](https://github.com/nevitonsantana/AletheIA/blob/main/docs/contracts/consumer-project-overlay.md#35-opsai-schemas-—-may).
