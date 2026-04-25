# Hermes Closeout Template

> Copy this file to `docs/aletheia/closeouts/YYYY-MM-DD-[slug].md` when starting a Hermes-controlled execution.
>
> Fill sections 1–3 before execution, section 4 during execution, and sections 5–9 at closeout.
>
> Empty fields are omitted, not filled with `N/A`.
>
> Durable decisions must live in versioned artifacts, not only in chat.

## 1. Identification

| Field | Value |
|---|---|
| Title | … |
| Issue | #… |
| PR | #… |
| Branch | … |
| Repository | AletheIA / Adaptative Skills / Crisis Monitor / other |
| Start date | YYYY-MM-DD |
| Closeout date | YYYY-MM-DD |
| Executor | Hermes / Codex / Claude Code / Human |
| Human operator | … |

## 2. Pre-execution — AletheIA Protocol inputs

Filled before execution. Without this, the task does not start.

**Intent**
One sentence describing what must be true at close.

**Scope**
What is inside this execution.

**Out of scope**
What not to do, even if useful.

**Risk classification**
Low / Medium / High, with one-line rationale.

**Applied skill**
Skill ID and stage: `draft` / `proposed` / `experimental` / `validated` / `default`.

If no skill applies, write: `none — ad-hoc execution` and note whether a recurring pattern may justify a candidate skill.

`default` means preferential loading/routing when trigger, context, and risk match. It does not mean automatic execution or expanded permissions.

**Selected model**
Model and provider, with one-line rationale using risk / cost / context / reasoning / sensitivity.

**Allowed tools**
Explicit list. Anything not listed is forbidden.

**Expected evidence**
How completion will be proven.

**Human approval required?**
Yes / No. If yes, where approval will be recorded.

## 3. Active sandbox and gates

For Hermes in `AletheIA Lab`. Omit if executor is human.

- [ ] `AletheIA Lab` profile active
- [ ] Unattended cron disabled
- [ ] Writes restricted to allowed paths
- [ ] Skill auto-promotion disabled
- [ ] Semantic memory write disabled
- [ ] Isolated branch or sandbox repository active

## 4. Execution — Layer 1, operational core

**Delivered**
One objective sentence.

**Validated**
Tests, diff review, smoke, link check, or other proof.

**Current state**
Commit / PR / merge / deploy / blocked.

**Artifacts**
- PR: …
- Docs updated: …
- Closeout: this file

**Completeness**
Final / partial. If partial, name the next step and dependency.

**Next issue?**
Yes -> create Context Seed.
No -> close here.

## 5. Human approval

Required for medium-risk and high-risk tasks.

| Field | Value |
|---|---|
| Approved by | … |
| Date | YYYY-MM-DD HH:MM |
| Approval location | PR comment / issue comment / decision artifact |
| Note | optional |

## 6. Learning and memory — Layer 2

Only fill when something changes the operational repertoire.

### Candidate learning

**Description**
What was learned that may matter later.

**Type**
Personal / Operational / Procedural / Episodic.

Belonging test: if executable by an agent with triggers, it is Procedural. If it is a convention or rule, it is Operational.

**Proposed destination**
- `memory/proposed/` -> awaiting review for semantic memory
- durable decision artifact -> decision worth retaining
- discard -> not worth maintenance

### Proposed skill

| ID | Name | Domain | Estimated risk | Initial stage |
|---|---|---|---|---|
| … | … | … | low / medium / high | `draft` or `proposed` |

Justification: why this skill represents a recurring pattern.

### Discarded memory

If generated candidate memory is discarded, record why. Discarded candidates are useful evidence, but pilot success is measured by promotion rate below 30%, not by maximizing discard volume.

## 7. Durable decision — Layer 2

Only fill when the task produced a decision that matters beyond this task.

**Decision**
One line.

**Record location**
ADR or durable decision path.

**Human approval**
Link or reference to section 5.

**Rejected alternatives**
What was considered and rejected.

## 8. End of cycle — Layer 3

Only fill when closing a larger cycle, release, or handoff.

**Roadmap status**
What changed for the milestone.

**Metrics recorded**

| Metric | Value |
|---|---|
| Time to closeout | … h |
| Execution cost | USD … |
| Context re-explanations | … |
| Human corrections | … |
| Scope violations | 0 / … |

**Handoff**
Who receives what, when. Link Context Seed when applicable.

**Key learnings**
What to carry into the next cycle.

**Recalibration**
- Was the model choice adequate?
- Did the skill help?
- Did estimated effort match actual effort?
- Should model matrix or gates change?

## 9. Audit

| Field | Value |
|---|---|
| Did the task violate scope? | yes / no — detail |
| Did the task require human approval? | yes / no |
| Was human approval effective? | yes / no |
| Did any gate fail or get bypassed? | yes / no — detail |
| Was cost inside ADR 001 limit? | yes / no |

If any violation field is `yes`, open a post-mortem durable decision before closing the task.

## Notes

Free space for durable context that does not fit above.
