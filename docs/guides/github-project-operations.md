# GitHub Project Operations for the AletheIA Repository

## Goal

Describe how the **AletheIA repository** may use a GitHub Project for coordination without turning GitHub into framework core truth.

---

## Positioning

The GitHub Project for this repository is:

- the coordination surface for the repo backlog
- the first real field of proof for a GitHub adapter posture
- a repository-local operating choice

It is **not**:

- the definition of a work slice
- the definition of a work item across all tools
- a required core dependency of AletheIA

---

## Recommended project scope

Use one repository project with mixed scope for:

- framework architecture
- documentation and taxonomic shifts
- starter-pack evolution
- implementation tasks
- adapter and delivery mapping work

This keeps conceptual and execution work connected without fragmenting the repo into artificial boards.

---

## Recommended statuses

Use `Workflow Status` as the operational source of truth for the repo workflow:

- `Backlog`
- `Ready`
- `In Progress`
- `Pending Handoff`
- `In Review`
- `Blocked`
- `Done`

The native GitHub `Status` field may still exist for lightweight board visibility, but it is not rich enough to express the full repo workflow by itself.

---

## Recommended fields

- `Workflow Status`
- `Status` (optional compatibility / visual summary)
- `Executor`
- `Priority`
- `Target Release`
- `Link / Context`
- `Lane`

This matches the current repository project setup more closely:

- `Workflow Status` = operational truth
- native `Status` = lightweight GitHub-native visual state when useful

Optional local fields may exist, but these should be enough to keep the repo readable.

---

## Initial backlog lanes

Create and maintain at least these groupings in the repo backlog:

1. `Core repositioning`
2. `Canonical model`
3. `Starter-pack agnostic`
4. `Adapters & delivery mappings`

---

## Suggested first issues

- revise the central framework vocabulary
- publish canonical definitions
- formalize `core vs adapter vs operator` boundaries
- revise finalization / restart / handoff docs
- add a work-item-ready template
- revise the work-slice template
- publish the thread-centric deprecation note

---

## Operating rule

When this repo uses GitHub Project as its coordination system, the meaning should be read as:

- GitHub Project = local **External Coordination System**
- GitHub Issue = local **Work Item** representation
- AletheIA docs and templates = durable memory and operational artifacts
- active agent surface = local **Execution Surface**

That mapping is healthy precisely because the concepts stay distinct.
