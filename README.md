# AletheIA

**AletheIA** is an operating framework for AI-assisted work: a portable layer that turns model or agent output into bounded, reviewable, validated action.

![AletheIA ecosystem and operating boundary](docs/assets/aletheia-architecture-flow.svg)

AletheIA exists because capable agents still need an operating system around the work: scope, context, governance, validation, handoff and learning. The framework is not trying to replace human judgment or project-local rules. It makes the decision path visible enough that people can trust, review and restart the work.

In short:

```text
model or agent output -> AletheIA -> governed action
```

---

## What AletheIA is

AletheIA is:

- **provider-agnostic** — it can be applied across models, agents and local runtimes
- **work-slice oriented** — every meaningful task has a bounded goal, scope, risk and validation path
- **governance-first** — risky or unclear work can slow down, escalate, require review or stop
- **restartable** — continuity is carried through handoffs and restart packages, not fragile transcript memory
- **evidence-seeking** — proof is part of closure, not a decorative afterthought
- **learning-oriented** — repeated friction and validation failures can become durable, reviewable improvements

## What AletheIA is not

AletheIA is not:

- a chatbot
- a single-runtime wrapper
- a hidden autonomous router
- a replacement for human accountability
- a substitute for project-local operating rules
- a claim that every future tooling or enterprise track is already complete

---

## How the operating loop works

The first image above shows AletheIA inside the broader AI-assisted work ecosystem. The diagram below zooms in on the AletheIA core itself: how a signal becomes a bounded slice, a decision, validated execution, closeout, restartable continuity and learning.

![AletheIA core operating loop](docs/assets/aletheia-core-framework.svg)

AletheIA moves work from a loose prompt-output pattern into an explicit operating loop:

```text
signal -> framing -> context -> governance -> bounded execution -> validation -> learning / restartable handoff
```

That means the framework asks practical questions before treating output as executable:

1. **What is the work slice?**  
   Define the goal, scope, risk, assumptions and stop line.
2. **What context is enough?**  
   Load the context needed for the slice without turning every transcript into mandatory state.
3. **What decision is being made?**  
   Allow, slow down, escalate, block, hand off or restart.
4. **What execution surface is appropriate?**  
   Keep runtime choice explicit instead of pretending every agent has the same trust boundary.
5. **What proof closes the slice?**  
   Use proportional validation: tests, review, smoke checks, artifacts or documented evidence.
6. **What survives the boundary?**  
   Preserve durable decisions, restart packages, handoffs and learnings.

---

## Current status

AletheIA is at **1.0.0**.

What 1.0 means:

- the Alpha 1–7 baseline is complete enough for public reuse
- the core vocabulary and adoption path are stable enough to teach and apply
- new work now belongs to **1.x evolution tracks**, not unfinished baseline buildup

What 1.0 does **not** mean:

- enterprise-ready by default
- fully automated orchestration
- completed domain governance packs
- active delivery tooling implementation
- universal runtime enforcement

### Recent evolution

The active post-1.0 work has moved in three important directions:

- **1.1 constrained adoption / trust-boundary hardening**  
  Guidance for safer adoption in local, regulated or high-context environments.
- **1.2 resource-aware operations**  
  Advisory observability for context size, restart cost, handoff weight, retry waste, runtime fit and human review effort.
- **clean restart and project-local constitution patterns**  
  Stronger restart packages, local governing-context prompts and explicit fresh-thread signaling without making any one runtime command part of the portable core.

For release framing, see:

- `CHANGELOG.md`
- `docs/roadmaps/release-1.0-readiness.md`
- `docs/roadmaps/roadmap-alpha.md`
- `docs/roadmaps/enterprise-readiness-roadmap.md`
- `docs/roadmaps/resource-aware-operations-roadmap.md`

---

## Core concepts

AletheIA keeps a stable vocabulary so the framework is not redefined by one tracker, one chat surface or one runtime.

The most important concepts are:

- **Work Slice** — the bounded unit of operational work
- **Work Item** — the external coordination unit a slice may point to
- **Context Pack** — the explicit context selected for a slice
- **Decision Record** — the reviewable reason for continuing, slowing down, escalating or stopping
- **Execution Surface** — the local runtime where work happens
- **Runtime Adapter** — the runtime-local mapping that preserves framework meaning
- **Handoff** — the transition artifact for a meaningful boundary
- **Restart Package** — the compact continuity artifact used after a boundary
- **Learning Record** — a reviewable improvement extracted from real work

Canonical definitions start here:

- `docs/concepts/canonical-vocabulary.md`
- `docs/concepts/overview.md`
- `docs/concepts/work-slice-pattern.md`
- `docs/contracts/runtime-adapter-contract.md`

---

## What is in this repository

The repository is organized around four practical blocks:

1. **Framework core**
   - `engine/`, schemas, governance, token discipline, quality, learnings, examples and tests
2. **Starter pack**
   - reusable guides, templates, checklists and playbooks for applying AletheIA in a project
3. **Pilot and adoption materials**
   - self-application, first-validation grounding (Crisis Monitor — see `docs/pilots/`), constrained adoption, project extension and pilot conversion
4. **1.x evolution tracks**
   - trust-boundary hardening, resource-aware operations, runtime-adapter guidance and future domain governance work

### First validation case

AletheIA is **domain-agnostic** (see [`docs/adr/ADR-006-domain-agnosticism.md`](docs/adr/ADR-006-domain-agnosticism.md)). The framework was first validated against the **Crisis Monitor** project — that case is preserved as labeled field evidence under `docs/pilots/` and `examples/`, but it is not the canonical reference. Additional consumer projects across other domains are expected and prioritized.

For the current ownership and re-entry boundary on the first case specifically, see [`docs/pilots/migration-from-crisis-monitor.md`](docs/pilots/migration-from-crisis-monitor.md).

---

## Full-system ecosystem and optional dependencies

The AletheIA core can be read, adopted and validated without installing a separate agent runtime. The broader system shown in the ecosystem diagram is intentionally modular: AletheIA governs the work, while companion components may provide execution surfaces, specialist capability, infrastructure or advisory context.

These components are **not bundled runtime dependencies** of the framework core. Treat them as optional integrations with their own trust boundaries, setup steps and review gates.

| Component | Role in the complete system | Current posture | Links |
|---|---|---|---|
| **AletheIA core** | Macro governance: Work Slice, context, decision, risk, validation, handoff, closeout and learning. | Stable 1.0 baseline; evolves through bounded 1.x tracks. | `docs/concepts/overview.md`, `docs/concepts/governance.md`, `docs/concepts/canonical-vocabulary.md`, `docs/contracts/runtime-adapter-contract.md` |
| **Adaptive Skills** | Micro capability layer for specialist execution patterns such as product, UX, technical review, QA, observability or domain analysis. | Complementary external skill library; AletheIA should make its macro posture explicit around skills, not absorb every skill into core. | [nevitonsantana/adaptive-skills](https://github.com/nevitonsantana/adaptive-skills), `docs/roadmaps/resource-aware-operations-roadmap.md`, `starter-pack/templates/agent-role-card-template.md` |
| **Runtime adapters / execution surfaces** | Local mapping from AletheIA semantics to a concrete executor. | Runtime-specific; should preserve AletheIA meaning without becoming process authority. | `docs/contracts/runtime-adapter-contract.md`, `docs/reference/runtime-adapter-codex.md`, `docs/reference/runtime-adapter-claude-code.md`, `docs/reference/runtime-adapter-qwen.md` |
| **Hermes Agent** | Candidate controlled runtime executor. It may execute bounded work only under AletheIA policy and human gates. | Pre-pilot / guarded. Hermes must not govern process, promote memory/skills automatically or expand autonomy by habit. | [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent), `docs/pilots/closeouts/2026-04-25-hermes-agentic-stack-sandbox-readiness.md`, `docs/adr/ADR-001-hermes-role.md`, `docs/adr/ADR-002-memory-and-skill-promotion-policy.md` |
| **Agentic Stack** | Optional infrastructure/harness for portable agent folders, memory, skills, protocols and tools. | Optional complement; not part of AletheIA core and not required for the baseline. | [codejunkie99/agentic-stack](https://github.com/codejunkie99/agentic-stack), `docs/pilots/closeouts/2026-04-25-hermes-agentic-stack-sandbox-readiness.md` |
| **Context graph tooling** | Advisory context access for code structure, impact exploration and review support. | Experimental/consultative. The graph informs; it does not govern, gate, orchestrate or replace validation. | `docs/concepts/context-graph-integration.md`, `docs/pilots/context-graph-decision.md`, `starter-pack/guides/context-graph-usage-guide.md` |

### Integration rule of thumb

Use the complete system in this order:

1. Start with an AletheIA **Work Slice** and explicit decision gate.
2. Choose any **Adaptive Skills** needed for the specialist work.
3. Select the **runtime adapter / execution surface** that fits the risk and environment.
4. Add optional infrastructure such as **Hermes Agent** or **Agentic Stack** only when the sandbox, approval and telemetry boundaries are explicit.
5. Use graph tooling only as **advisory context**, then validate with normal AletheIA proof.

The governing rule stays the same:

```text
AletheIA decides the flow. Skills shape capability. Runtimes execute. Tools inform.
```

---

## Where to start

### New to AletheIA? Start here

Four documents for adopters with no prior context:

1. [`docs/getting-started/overview.md`](docs/getting-started/overview.md) — what AletheIA is, who it's for, when to use it
2. [`docs/getting-started/installation-guide.mdx`](docs/getting-started/installation-guide.mdx) — step-by-step install via APM
3. [`docs/getting-started/catalog.md`](docs/getting-started/catalog.md) — what the overlay provides and how to activate each element
4. [`docs/getting-started/faq.md`](docs/getting-started/faq.md) — common questions about setup, security, and teamwork

### Fastest understanding path (deep dive)

1. `docs/getting-started/overview.md`
2. `docs/guides/core-operating-path.md`
3. `docs/concepts/overview.md`
4. `docs/concepts/governance.md`
5. `docs/reference/token-policy.md`
6. `docs/concepts/canonical-vocabulary.md`

### Apply AletheIA to a project

1. `starter-pack/README.md`
2. `starter-pack/guides/daily-operations.md`
3. `docs/guides/apply-to-existing-project.md`
4. `docs/concepts/project-extension-pattern.md`
5. `docs/contracts/work-slice-spec-bundle.md` when a `Standard` or `High-Assurance` slice needs clearer pre-execution specification

### Work with handoffs and restart

1. `docs/concepts/agent-handoffs.md`
2. `docs/guides/slice-finalization-and-restart.md`
3. `starter-pack/guides/clean-restart-command-adapters.md`
4. `starter-pack/templates/restart-bootstrap-prompt-template.md`

### Work with runtime fit and resource-aware operations

1. `docs/contracts/runtime-adapter-contract.md`
2. `docs/guides/agent-runtime-decision-guide.md`
3. `docs/contracts/context-resource-telemetry-spec.md`
4. `docs/contracts/slice-telemetry-model.md`
5. `docs/reference/waste-heuristics.md`

### Inspect examples first

1. `examples/hello-world/`
2. `examples/handoffs/compact-reviewable-handoff.md`
3. `examples/work-slices/standard-slice/README.md`
4. `examples/work-slices/standard-spec-bundle/README.md`
5. `examples/resource-aware-operations/`

### Try it in two minutes

Use a disposable or already version-controlled project. This first test is intentionally low risk: it checks whether AletheIA makes one small task clearer before you adopt the full operating overlay.

**Prerequisites:** Node.js 20+, pnpm 9+, and [APM](https://microsoft.github.io/apm/) installed as `apm`.

From the consumer project root:

```bash
apm install nevitonsantana/AletheIA#v1.0.0
apm run scaffold-overlay
```

Then choose a reversible task, such as clarifying a README paragraph or writing a small test plan. Before acting, define one Work Slice with the intended result, scope, assumptions, risk, approval gate, and evidence needed to close it.

**Expected result:** the task has a visible boundary, an explicit decision path, and a proportional validation step. The overlay should make it easier to explain what happened and what the next safe action is.

**Important limits:** installation does not install an agent runtime, grant permissions, select a model, create autonomous behavior, or replace human judgment and project-local rules. AletheIA governs the flow; runtimes execute; tools inform.

### Tell us what happened

Feedback is most useful after one real, low-risk test. Open an issue or discussion and report only non-confidential information:

1. What task did you use?
2. What became clearer?
3. Where did you encounter friction?
4. What felt unnecessary?
5. Would you repeat the process?

---

## Design principles

1. Clarity over speed
2. Control over automation
3. Consistency over convenience
4. Reuse before duplication
5. Validation before closure
6. Learnings must stay reviewable
7. Project-local rules stay project-local

---

## Quick check

After cloning, run the lightweight governance check:

```bash
bash scripts/check-governance.sh
```

If you are changing the TypeScript engine or examples, run the package tests as well:

```bash
pnpm install --frozen-lockfile
pnpm test
```

---

## License

AletheIA is released under the Apache License 2.0. See `LICENSE`.

---

## See also

- `docs/reference/launch-kit.md`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
