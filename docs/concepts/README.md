# Concepts

Explanations of ideas, principles, and mental models. These documents answer "what is X and why does it work this way?"

If you need a step-by-step guide, see [`guides/`](../guides/README.md). If you need a normative spec, see [`contracts/`](../contracts/README.md).

## Contents

| Document | What it explains |
|---|---|
| [overview.md](overview.md) | What AletheIA is and how the repo is structured |
| [operating-overlay.md](operating-overlay.md) | The overlay layer: what it is, what belongs in it, what doesn't |
| [architecture.md](architecture.md) | Core contracts and canonical surfaces |
| [canonical-vocabulary.md](canonical-vocabulary.md) | Stable shared language: Work Slice, Restart Package, Operational Boundary, Handoff, etc. |
| [governance.md](governance.md) | What is mandatory, forbidden, and requires approval |
| [quality.md](quality.md) | Quality baseline — what the framework must prove |
| [enforcement-boundaries.md](enforcement-boundaries.md) | Behavioral vs technical enforcement |
| [durable-decisions.md](durable-decisions.md) | How important decisions survive sessions |
| [work-slice-pattern.md](work-slice-pattern.md) | The primary operational unit |
| [work-item-pattern.md](work-item-pattern.md) | External coordination abstraction |
| [agent-handoffs.md](agent-handoffs.md) | Cross-agent and cross-session transitions |
| [handoff-capture-pattern.md](handoff-capture-pattern.md) | How to capture handoff signals from completed work |
| [slice-finalization-and-restart.md](../guides/slice-finalization-and-restart.md) | → see guides/ |
| [agent-harness-contract.md](agent-harness-contract.md) | The declared per-task operating envelope (autonomy, tools, gates, sensors, rollback) |
| [autonomy-levels.md](autonomy-levels.md) | The four canonical authority levels and how external five-level drafts map onto them |
| [tool-risk-taxonomy.md](tool-risk-taxonomy.md) | Coarse risk classes for skill declaration, mapped to the authoritative permission matrix |
| [agent-computer-interface.md](agent-computer-interface.md) | How to design tools agents consume (ACI), complementing the permission matrix |
| [context-rot-controls.md](context-rot-controls.md) | Signals of long-session degradation and the minimal controls + checkpoint |
| [self-application.md](self-application.md) | How AletheIA governs its own evolution |
| [structured-risk-inference.md](structured-risk-inference.md) | Experimental risk inference layer |
| [project-extension-pattern.md](project-extension-pattern.md) | How projects extend the overlay without distorting it |
| [project-local-constitution-context.md](project-local-constitution-context.md) | Project-local constitution layer |
| [local-trust-boundary-posture.md](local-trust-boundary-posture.md) | Trust-boundary posture as project-extension concern |
| [iterative-maintenance-governance.md](iterative-maintenance-governance.md) | Governance across maintenance rounds |
| [progressive-policy-signals.md](progressive-policy-signals.md) | From telemetry to reviewable policy signals |
| [context-graph-integration.md](context-graph-integration.md) | How a code graph fits into the operating model |
| [bootstrap-principles.md](bootstrap-principles.md) | Alpha 7 bootstrap posture |
| [distribution-presets-adapters.md](distribution-presets-adapters.md) | Alpha 6 distribution direction |
| [adapter-taxonomy.md](adapter-taxonomy.md) | Taxonomy for AletheIA adapters |
| [preset-taxonomy.md](preset-taxonomy.md) | Taxonomy for AletheIA presets |
| [domain-governance-packs.md](domain-governance-packs.md) | Future domain-specific governance packs |
| [ai-agent-security-prompt-injection.md](ai-agent-security-prompt-injection.md) | Future domain pack for AI agent security |
| [web-app-security-trust-boundaries.md](web-app-security-trust-boundaries.md) | Future domain pack for web security |
| [knowledge-governance-layer.md](knowledge-governance-layer.md) | Layer that governs user-provided knowledge bases used by agents and skills |
| [user-provided-knowledge.md](user-provided-knowledge.md) | How users register knowledge bases without dumping documents into prompts |
| [framework-capsules.md](framework-capsules.md) | Operational summary of a framework or large source; the default unit a skill consumes |
| [knowledge-resolver.md](knowledge-resolver.md) | Logical role that selects which knowledge sources enter task context |
| [governed-skill-optimization.md](governed-skill-optimization.md) | Why skill optimization is governed: evidence vs. authority, and where the boundary sits |
