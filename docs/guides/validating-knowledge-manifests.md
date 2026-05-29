# Validating Knowledge Manifests

## Goal

Show an implementer how to load and validate knowledge-governance manifests using
the engine's typed loaders, so authored manifests are checked against their schema
before anything consumes them.

This guide is bounded to **schema validation**. It does not cover retrieval, vector
storage, IAM, or DLP — those are out of scope for this phase.

---

## What exists

The engine ships three validated loaders. Each reads a JSON file, validates it
against its JSON Schema, and returns a typed object — or throws
`SchemaValidationError` if the file does not conform.

| Loader | Schema | Returns |
|---|---|---|
| `loadGovernancePack` | `aletheia-governance-pack.schema.json` | `GovernancePack` |
| `loadKnowledgePack` | `aletheia-knowledge-pack.schema.json` | `KnowledgePackManifest` |
| `loadSkillKnowledgeDependency` | `aletheia-skill-knowledge-dependency.schema.json` | `SkillKnowledgeDependency` |

All are exported from `engine/`.

---

## How to use

```ts
import {
  loadKnowledgePack,
  loadSkillKnowledgeDependency,
  SchemaValidationError,
} from "../engine";

try {
  const pack = loadKnowledgePack("path/to/knowledge-pack.json");
  console.log(pack.knowledge_pack.id);

  const dep = loadSkillKnowledgeDependency("path/to/skill-knowledge-dependency.json");
  console.log(Object.keys(dep.knowledge_dependencies));
} catch (err) {
  if (err instanceof SchemaValidationError) {
    // err.schemaId and err.errors describe what failed
    console.error(err.message);
  } else {
    throw err; // e.g. file-not-found
  }
}
```

---

## Reference fixtures

Minimal, vendor-agnostic examples to validate against and to copy from:

- `examples/project-extension/knowledge-pack.example.json`
- `examples/project-extension/skill-knowledge-dependency.example.json`

The contract test suite (`tests/contracts/test-contracts.test.ts`) validates these
fixtures and exercises both loaders for valid-load and malformed-throws behavior.

---

## Boundaries

When extending this surface, keep it model-agnostic and secure-by-default:

- Do not embed proprietary or client content in fixtures or schemas.
- Do not introduce premature implementation — no vector DB, no IAM integration, no
  DLP pipeline, no fine-tuning.
- Do not turn local company rules into framework core.
