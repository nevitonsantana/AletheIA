# Agent Harness Contract

## What this is

An **Agent Harness Contract (AHC)** is the *declared operating envelope* for a task, written before
the task runs. A skill says *how* to think; a knowledge pack says *what* content is authorized; an
AHC says *in what environment the agent may act* — with which tools, autonomy, gates, sensors,
logs, and rollback.

It is a **contract**, not a runtime, orchestrator, or policy engine, and deliberately **not** a new
"layer". It is docs-first and provider-agnostic.

## Where it sits

The AHC composes three governance surfaces the framework already has. Each governs a distinct
question at its own granularity:

```
User / Request
  → AletheIA task contract
    → Knowledge Governance (authorized context)
      → Agent Harness Contract  ← the declared envelope (this document)
        → Adaptive skill selection
          → Runtime (Codex / Claude Code / …)
            → Tools + Sensors + Logs
              → Evidence + Decision Record + Handoff
```

```
REGC (how much effort, per-slice)
  → AHC (the declared envelope, per-task)
    → AHGE (execution + record, per-action)
      → Knowledge Governance (authorized context)
```

**AHC declares the envelope; [AHGE](../contracts/agent-harness-governance-extension.md) records each
action within it; [REGC](../contracts/runtime-effort-governance-contract.md) sets the effort;
[Knowledge Governance](../contracts/knowledge-source-contract.md) decides what context is
authorized.** The normative field-by-field spec and the mapping to these surfaces live in the
[Agent Harness Contract spec](../contracts/agent-harness-contract.md).

## Boundary table

| Surface | Decides | AHC's relationship |
|---|---|---|
| Skill | how to execute a capability | AHC lists `allowed_skills` / `blocked_skills`; it does not define skill behavior |
| Knowledge Governance | source authority, sensitivity, precedence | AHC references `allowed_knowledge_packs` and `retrieval_mode`; it never decides authority |
| REGC | effort level, escalation, stop, quality floor | AHC inherits the effort; it does not re-decide it |
| AHGE | per-action permission, draft/commit, budgets, trace | AHC declares the envelope AHGE enforces and records per action |

## Principles

1. **Harness is not skill.** Skill orients behavior; harness defines environment, tools, sensors,
   gates, and limits.
2. **Harness is not Knowledge Governance.** Knowledge Governance controls authorized context; the
   harness controls execution conditions.
3. **Control proportional to risk.** Reversible, local tasks may use a light harness; structural,
   sensitive, or irreversible tasks require more gates.
4. **Sensor before judgment.** Before asking another model for a semantic opinion, use
   computational sensors when available: tests, linters, type checkers, scripts, structural
   validation.
5. **Context needs hygiene.** Long sessions require offloading, checkpoints, recorded decisions, and
   re-anchoring — see [context-rot-controls.md](context-rot-controls.md).
6. **A harness expires.** Controls, guides, prompts, scripts, and sensors must be reviewed. A
   control that never fires may be excellent or useless; it needs evaluation — see
   [harness-expiration-review-checklist.md](../reference/harness-expiration-review-checklist.md).

## Related

- [Agent Harness Contract spec](../contracts/agent-harness-contract.md) — normative fields + mapping
- [Agent-Computer Interface](agent-computer-interface.md) — how to design tools agents consume
- [Context-Rot Controls](context-rot-controls.md) — long-session hygiene
- [ADR-013](../adr/ADR-013-agent-harness-contract.md) — the reconciliation decision
