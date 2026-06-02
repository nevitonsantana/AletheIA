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
| [consumer-project-overlay.md](consumer-project-overlay.md) | How a consumer project instantiates the operating overlay (`ops/ai/` + harness shims). Reference example: [`examples/consumer-overlay-minimal/`](../../examples/consumer-overlay-minimal/) |
| [knowledge-source-contract.md](knowledge-source-contract.md) | What every knowledge source must satisfy to be governed by the Knowledge Governance Layer |
| [knowledge-pack-manifest.md](knowledge-pack-manifest.md) | YAML manifest schema for a knowledge pack on disk |
| [skill-knowledge-dependency-contract.md](skill-knowledge-dependency-contract.md) | How a skill declares knowledge it needs without binding to a specific source |
| [source-precedence-policy.md](source-precedence-policy.md) | How conflicts between knowledge sources are resolved |
| [restricted-knowledge-usage-policy.md](restricted-knowledge-usage-policy.md) | Usage rules for confidential, restricted, and regulated sources |
| [knowledge-audit-log-spec.md](knowledge-audit-log-spec.md) | Minimum audit fields when a knowledge source influences output |
| [sensitivity-vocabulary-mapping.md](sensitivity-vocabulary-mapping.md) | Canonical sensitivity taxonomy and how project extensions map local labels to it |
| [skill-evolution-validation-contract.md](skill-evolution-validation-contract.md) | What a skill evolution experiment and its validation evidence must satisfy to be governed |

### Operationalized by security checklists

The restricted-use and audit contracts above are *specifications*. The per-task
checklists and policies that apply them at runtime live in [`docs/security/`](../security/README.md)
(data-leakage, prompt-injection-in-sources, data-poisoning, logs-and-handoffs,
human-review-criteria).

### Bootstrap contracts — note on relationship

`bootstrap-generator-contract.md` and `delivery-output-contract.md` are complementary, not duplicates:
- Generator contract: spec of the *process* (what the tool receives and emits)
- Output contract: spec of the *artifact* (what the produced package must reveal)
