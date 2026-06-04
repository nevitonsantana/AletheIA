# AletheIA Documentation Index

Reading map organized by intent. Each entry links to the most useful starting point for that goal.

---

## I want to understand what AletheIA is

1. [Overview](concepts/overview.md) — what AletheIA is and how the repo is organized
2. [Architecture](concepts/architecture.md) — core contracts and canonical surfaces
3. [Operating overlay](concepts/operating-overlay.md) — what the overlay layer is and how to tell what belongs in it
4. [ADR-004 — AletheIA as operating overlay](adr/ADR-004-aletheia-as-operating-overlay.md) — the boundary decision between product, overlay, and harness
5. [Governance](concepts/governance.md) — what is mandatory, forbidden, and requires approval

---

## I want to start using AletheIA on a project

1. [Getting started](guides/getting-started.md) — shortest path from zero to first work slice
2. [Core operating path](guides/core-operating-path.md) — minimum operational loop
3. [Apply to an existing project](guides/apply-to-existing-project.md) — how to adopt without rebuilding
4. [Canonical vocabulary](concepts/canonical-vocabulary.md) — shared language: Work Slice, Restart Package, Operational Boundary

---

## I want to understand the operating model in depth

1. [Work slice pattern](concepts/work-slice-pattern.md) — the primary operational unit
2. [Work item pattern](concepts/work-item-pattern.md) — external coordination abstraction
3. [Slice finalization and restart](guides/slice-finalization-and-restart.md) — how to close cleanly and resume
4. [Agent handoffs](concepts/agent-handoffs.md) — cross-agent transitions
5. [Durable decisions](concepts/durable-decisions.md) — how decisions survive sessions
6. [Enforcement boundaries](concepts/enforcement-boundaries.md) — behavioral vs technical enforcement

---

## I want to configure an agent harness (Claude Code, Codex, Qwen)

1. [Runtime adapter — Claude Code](reference/runtime-adapter-claude-code.md)
2. [Runtime adapter — Codex](reference/runtime-adapter-codex.md)
3. [Runtime adapter — Qwen](reference/runtime-adapter-qwen.md)
4. [Setting up harnesses](guides/setting-up-harnesses.md) — wire a consumer project to Claude Code via the shim pack
5. [Runtime adapter contract](contracts/runtime-adapter-contract.md) — what any adapter must honor
6. [Agent role catalog](reference/agent-role-catalog.md) — portable roles across runtimes
7. [Agent runtime decision guide](guides/agent-runtime-decision-guide.md) — choosing between runtimes

---

## I want to read a normative contract

1. [Delivery output contract](contracts/delivery-output-contract.md)
2. [Bootstrap generator contract](contracts/bootstrap-generator-contract.md)
3. [Readiness gates spec](contracts/readiness-gates-spec.md)
4. [Work slice spec bundle](contracts/work-slice-spec-bundle.md)
5. [Slice telemetry model](contracts/slice-telemetry-model.md)
6. [Runtime effort governance contract](contracts/runtime-effort-governance-contract.md) — how an agent decides effort: start, escalate, de-escalate, stop, checkpoint
7. [Agent harness governance extension](contracts/agent-harness-governance-extension.md) — how the harness authorizes, budgets, and bounds execution of model-proposed actions
8. [All contracts →](contracts/README.md)

---

## I want to see real adoption evidence

> AletheIA is domain-agnostic (see [ADR-006](adr/ADR-006-domain-agnosticism.md)). The pilots below are labeled field evidence — first validation case, not canonical content.

1. [Crisis Monitor pilot](pilots/pilot-crisis-monitor.md) — first validation case
2. [Migration from Crisis Monitor](pilots/migration-from-crisis-monitor.md) — how AletheIA became standalone after the first case
3. [Context graph decision](pilots/context-graph-decision.md) — decision record with real test data
4. [Hermes closeouts →](pilots/closeouts/) — operation records from Hermes pre-pilot
5. [All pilots →](pilots/README.md)

---

## I want to understand the roadmap

1. [Roadmap alpha](roadmaps/roadmap-alpha.md) — 1.0 baseline and 1.x evolution
2. [Enterprise readiness roadmap](roadmaps/enterprise-readiness-roadmap.md) — 1.1 constrained adoption track
3. [Resource-aware operations roadmap](roadmaps/resource-aware-operations-roadmap.md) — 1.2 track
4. [Evolution plan](roadmaps/evolution-plan.md) — post-1.0 direction

---

## I want to harden a knowledge source against leakage, injection, or poisoning

1. [Security overview](security/README.md) — how the hardening checklists and policies fit together
2. [Data-leakage checklist](security/data-leakage-checklist.md) — what must never leave the boundary
3. [Prompt-injection-in-sources checklist](security/prompt-injection-in-sources-checklist.md) — source content as data, not instruction
4. [Data-poisoning checklist](security/data-poisoning-checklist.md) — provenance, versioning, rollback
5. [Logs-and-handoffs policy](security/logs-and-handoffs-policy.md) — carry restrictions across boundaries
6. [Human-review criteria](security/human-review-criteria.md) — when review is mandatory

---

## I want to look up policies and reference material

1. [Token policy](reference/token-policy.md)
2. [Waste heuristics](reference/waste-heuristics.md)
3. [Effort escalation signals](reference/effort-escalation-signals.md)
4. [Planning depth profiles](reference/planning-depth-profiles.md)
5. [Tool permission matrix](reference/tool-permission-matrix.md) — risk taxonomy and permission decisions for model-requested tools
6. [Runtime budget policy](reference/runtime-budget-policy.md) — hard runtime limits and budget profiles
7. [Prompt caching and context cost strategy](reference/prompt-caching-context-cost-strategy.md) — cache-aware context architecture
8. [Launch kit](reference/launch-kit.md) — public-facing descriptions and taglines
9. [All reference →](reference/README.md)
