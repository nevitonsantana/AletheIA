# AletheIA — Overview

AletheIA is a portable **operating overlay** — a thin governance layer you place over your project that turns raw model or agent output into bounded, reviewable, validated action. It does not replace your agent runtime, your task tracker, or your team's method. It adds the operating loop those tools leave out: explicit scope, governance gates, validation proof, and restartable continuity.

---

## The problem it solves

When you work with AI models or agents on real project tasks, two things tend to go wrong:

1. **Loss of boundaries.** The session drifts. The model acts on assumptions you did not share. Work happens outside the agreed scope without anyone noticing until something breaks.
2. **Loss of continuity.** The transcript grows until it overflows, or the session ends, and the next agent or human has to re-derive everything from scratch — wasting time and introducing errors.

AletheIA solves both by making the operating loop explicit:

```
signal → framing → context → governance → bounded execution → validation → handoff / learning
```

Every meaningful task becomes a **Work Slice**: a bounded unit with a defined goal, scope, risk level, assumptions, and a stop line. The agent works within that boundary. Decisions are recorded. Validation is required before closure. Handoffs carry the state forward so the next session does not start blind.

---

## Practical daily benefits

| Before AletheIA | With AletheIA |
|---|---|
| Agent scope unclear; drifts into adjacent work | Slice defines scope and stop line upfront |
| No record of why a decision was made | Decision Record captures reasoning |
| Session ends, next session re-derives everything | Handoff carries state, decisions, open questions |
| Validation is informal ("does it look right?") | Conformance test specifies minimum proof |
| Governance rules live in someone's head | Constitution externalizes rules for every agent |

---

## Who it is for

AletheIA is useful for:

- **Teams using agents on multi-session work** — where continuity and scope discipline matter.
- **Tech leads governing hybrid squads** — where some tasks go to agents and some stay with humans; the overlay makes that boundary explicit.
- **Individual developers using Claude Code or similar** — who want their sessions to be restartable, auditable, and scope-bound without building a custom system.
- **Anyone rolling out AI-assisted work to a team** — who needs a lightweight governance layer that does not require everyone to become a prompt engineer.

AletheIA is **not** a good fit if:

- You need a ready-made squad of specialized agents (look at BMAD or SDD).
- You need a portable agent runtime with memory and tool orchestration (look at Agentic Stack or Hermes).
- You are running a one-shot automation where continuity and governance do not matter.

---

## When to use it

Use AletheIA when:

- A project will span multiple sessions, agents, or people.
- You need a human-reviewable record of what agents decided and why.
- The work carries risk: data migration, production changes, spec-driven development, compliance-sensitive tasks.
- You want the same operating rules to apply regardless of which model or harness you use tomorrow.

You do not need AletheIA for quick explorations, throwaway scripts, or tasks where the full context fits in a single session with no downstream consequence.

---

## How it relates to other tools

AletheIA governs the work. It does not replace your tools — it adds a layer above them.

| Tool category | Example | How it relates to AletheIA |
|---|---|---|
| Agent bundles / squad methods | BMAD, SDD | Complementary. AletheIA governs the loop; BMAD/SDD define the squad. Use together. |
| Capability library | Adaptive Skills | Complementary. AletheIA governs when and how skills are invoked. |
| Package manager | APM (Microsoft) | AletheIA is distributed as an APM package. |
| Harness | Claude Code, Cursor, Codex | AletheIA is harness-agnostic. Each harness gets a lightweight adapter shim. |
| Agent runtime | Agentic Stack, Hermes | Separate layer. AletheIA governs the flow; runtimes execute it. |

For the full ecosystem map, see [`docs/concepts/ecosystem-map.md`](../concepts/ecosystem-map.md).

---

## Risks and cautions

**AletheIA adds structure, not autonomy.** If you want agents to operate without human review gates, AletheIA will slow you down — that friction is intentional.

**The constitution must reflect reality.** The overlay works because agents read the constitution before acting. If the constitution is stale or vague, the governance layer breaks silently. Keep it current.

**Handoffs are only as good as what you put in them.** If the session closes without a handoff, the next operator starts blind. This is not AletheIA's failure — it is a discipline gap.

**The overlay is not a security boundary.** AletheIA shapes behavior through instructions, not enforcement. A model that ignores instructions will ignore the overlay too. Treat AletheIA as a governance aid, not a sandbox wall.

---

## Next steps

- Install AletheIA: [`installation-guide.mdx`](installation-guide.mdx)
- Browse what the overlay provides: [`catalog.md`](catalog.md)
- Questions? [Frequently asked questions](/getting-started/faq/)
- Deep dive: [`docs/concepts/overview.md`](../concepts/overview.md), [`docs/concepts/governance.md`](../concepts/governance.md)
