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
| [context-surface-registry.md](context-surface-registry.md) | Minimum metadata, loading boundaries, freshness and evidence for surfaces that influence agent behavior |
| [system-state-registry.md](system-state-registry.md) | Compact per-repository first-load state, authority boundary, update triggers and Restart Package relationship |
| [observation-governance-contract.md](observation-governance-contract.md) | Minimum structured, source-backed and recoverable observation record |
| [slice-telemetry-model.md](slice-telemetry-model.md) | Minimal model for recording slice-level telemetry |
| [visual-operations-event-model.md](visual-operations-event-model.md) | Normalized, source-referenced events for read-only visual projection |
| [work-slice-visual-state-contract.md](work-slice-visual-state-contract.md) | Presentation lanes and derived Work Slice card state without a new lifecycle |
| [visual-ops-privacy-boundaries.md](visual-ops-privacy-boundaries.md) | Metadata-first privacy rules for cockpit views, traces, telemetry, and exports |
| [work-slice-spec-bundle.md](work-slice-spec-bundle.md) | Optional spec bundle for slices that need pre-execution clarity |
| [intent-to-evidence-extension.md](intent-to-evidence-extension.md) | Optional human-owned Intent, Expectations, Guessing Risk, evidence mapping and reconcile inside a Work Slice |
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
| [runtime-effort-governance-contract.md](runtime-effort-governance-contract.md) | How an agent decides runtime effort for a work slice: start, escalate, de-escalate, stop, and human checkpoint |
| [agent-harness-governance-extension.md](agent-harness-governance-extension.md) | How the harness validates, authorizes, executes, budgets, and returns structured observations for model-proposed actions |
| [agent-harness-contract.md](agent-harness-contract.md) | The per-task declaration: autonomy, allowed tools/skills, gates, sensors, rollback, human review, context policy |
| [policy-verdicts.md](policy-verdicts.md) | The verdict vocabulary (allow/deny/require_approval/transform/log_only) and its mapping to harness decision values |
| [agent-action-audit-record.md](agent-action-audit-record.md) | Minimum audit fields proving skill → tool → verdict → evidence → approval |
| [execution-pattern-selection.md](execution-pattern-selection.md) | How a task records its selected execution topology and required controls |
| [orchestration-contract.md](orchestration-contract.md) | What an orchestrated execution must declare before stages run |
| [loop-state-contract.md](loop-state-contract.md) | Minimum state shape for recurring or looped work |
| [objective-gate-policy.md](objective-gate-policy.md) | Objective stop/gate requirements before loops can run safely |
| [maker-checker-policy.md](maker-checker-policy.md) | When separate generation and verification roles are required |
| [execution-audit-record.md](execution-audit-record.md) | Pattern-level audit view over existing AHGE evidence |

### Operationalized by security checklists

The restricted-use and audit contracts above are *specifications*. The per-task
checklists and policies that apply them at runtime live in [`docs/security/`](../security/README.md)
(data-leakage, prompt-injection-in-sources, data-poisoning, logs-and-handoffs,
human-review-criteria).

### Bootstrap contracts — note on relationship

`bootstrap-generator-contract.md` and `delivery-output-contract.md` are complementary, not duplicates:
- Generator contract: spec of the *process* (what the tool receives and emits)
- Output contract: spec of the *artifact* (what the produced package must reveal)
