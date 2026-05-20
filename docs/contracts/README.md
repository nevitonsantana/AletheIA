# Contracts

Normative specifications — documents that say what **must be true**. These answer "what does X have to satisfy?"

If you need conceptual background, see [`concepts/`](../concepts/README.md). If you need a step-by-step guide, see [`guides/`](../guides/README.md).

**What NOT to put here:** implementation recipes, tutorials, or exploratory ideas. A contract specifies; it does not explain. If a document mostly explains, it belongs in `concepts/`.

## Contents

| Document | What it specifies |
|---|---|
| [runtime-adapter-contract.md](runtime-adapter-contract.md) | What any runtime adapter must honor |
| [delivery-output-contract.md](delivery-output-contract.md) | What a generated delivery output must reveal |
| [bootstrap-generator-contract.md](bootstrap-generator-contract.md) | What a bootstrap generator must receive, emit, and preserve |
| [delivery-tooling-boundaries.md](delivery-tooling-boundaries.md) | What delivery tooling may and may not do |
| [readiness-gates-spec.md](readiness-gates-spec.md) | When a slice is ready to continue, review, hand off, or stop |
| [context-resource-telemetry-spec.md](context-resource-telemetry-spec.md) | Telemetry surface for resource-aware operations |
| [slice-telemetry-model.md](slice-telemetry-model.md) | Minimal model for recording slice-level telemetry |
| [work-slice-spec-bundle.md](work-slice-spec-bundle.md) | Optional spec bundle for slices that need pre-execution clarity |
| [durable-decision-finalization-context-prompt.md](durable-decision-finalization-context-prompt.md) | Accepted durable decision: require finalization context prompt at slice close |

### Bootstrap contracts — note on relationship

`bootstrap-generator-contract.md` and `delivery-output-contract.md` are complementary, not duplicates:
- Generator contract: spec of the *process* (what the tool receives and emits)
- Output contract: spec of the *artifact* (what the produced package must reveal)
