# Pulso Token Comparison Pass

## Purpose

Compare the current Mission Control static prototype with **Pulso Design System v3** before changing the prototype HTML/CSS.

This pass is intentionally docs-first. It does not import Pulso, add a build step, introduce a package dependency, or turn the static prototype into a frontend app.

## Sources reviewed

- Pulso `DESIGN.md`
- Pulso `src/app/globals.css`
- Mission Control `examples/visual-operations/prototype/mission-control-static.html`

## Current prototype token posture

The prototype currently uses a small local token set:

| Area | Current prototype posture |
|---|---|
| Typography | Inter/system sans plus local monospace stack. |
| Surfaces | Dark operational palette: `--bg`, `--shell`, `--panel`, `--panel-2`, `--panel-3`. |
| Lines | Blue-gray translucent borders: `--line`, `--line-strong`. |
| State colors | Local evidence colors: `--critical`, `--review`, `--stable`, `--info`, `--violet`. |
| Radius | Larger product-shell radius: `14px`; smaller card radius: `9px`. |
| Layout | Static full-browser shell with collapsible rail and side sheet. |

This local system is useful for speed, but it is not yet aligned to the broader design language.

## Pulso tokens that fit Mission Control

| Pulso area | Tokens / rules | Fit for Mission Control | Recommendation |
|---|---|---|---|
| Type families | `--font-pulso-sans`, `--font-pulso-mono` | Good fit. Manrope + IBM Plex Mono can make the prototype feel more systemized and less generic. | Adopt in a future HTML pass if local font loading is acceptable. |
| Type scale | `--text-display`, `--text-h1`, `--text-h2`, `--text-body`, `--text-support`, `--text-label`, `--text-micro` | Strong fit. The prototype already uses hierarchy similar to Pulso. | Map local sizes to Pulso names before changing values. |
| Kicker tracking | `--tracking-kicker: 0.12em` | Strong fit for labels like `Evidence Ledger`, `Human Review`, `Source Refs`. | Adopt. |
| Radius | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl` | Good fit, but Mission Control should stay slightly sharper than commercial SaaS. | Prefer `md/lg`; avoid over-rounded surfaces. |
| Spacing | `--space-3`, `--space-4`, `--space-5`, `--space-6` | Good fit for card, rail, and inspector spacing. | Adopt selectively. |
| Rhythm | `--rhythm-cadence-tight`, `--rhythm-cadence-beat`, `--rhythm-cadence-breath` | Strong fit for designer-facing consistency. | Use to tune sections, not to create hero spacing. |
| Density | `compact`, `comfortable`, `spacious` density tokens | Strong fit. Mission Control needs dense but readable operational mode. | Use `compact` or a Mission Control-specific compact derivative. |
| Borders | `--border`, `--border-strong`, sidebar border tokens | Strong fit with current line-based design. | Adopt border discipline before adding shadows. |
| Shadows | nearly invisible Pulso shadows | Good fit. Current prototype should remain low-glow. | Keep borders as primary structure. |
| AI markers | `--ai-marker-border`, `--ai-marker-bg-mix` | Conditional fit. Useful for AI-assisted/source-derived content, but can imply AI authority if overused. | Use only where provenance is explicit. |

## Pulso tokens that need caution

| Area | Why caution is needed | Mission Control rule |
|---|---|---|
| Brand purple | Pulso primary can make the screen look like branded SaaS if over-applied. | Use as focus/navigation accent only, not as evidence state. |
| Light theme defaults | Mission Control’s accepted direction is dark, sober, and operational. | Do not switch the prototype to Pulso light defaults in this phase. |
| AI marker styling | AI-origin decoration can be mistaken for trust or automation authority. | AI markers must mean “source/activation trace exists,” not “AI decided.” |
| Success color | Green can imply approval or completion. | Use stable/closed carefully; never imply a gate passed without source refs. |
| Warning/destructive colors | Can make `unavailable` look like failure. | `unavailable` remains neutral. |
| Large display typography | Pulso display tokens can create too much hero energy. | Keep titles compact and operational. |

## Proposed token mapping

| Mission Control local token | Pulso-aligned candidate | Notes |
|---|---|---|
| `--sans` | `--font-pulso-sans` | Improves DS alignment; keep fallback stack. |
| `--mono` | `--font-pulso-mono` | Useful for source refs, trace IDs, event timestamps. |
| title sizes | `--text-display`, `--text-h1` | Avoid `--text-display-lg` for cockpit title. |
| card title/body/meta | `--text-h2`, `--text-body`, `--text-support`, `--text-micro` | Good direct mapping. |
| label tracking | `--tracking-kicker` | Good direct mapping. |
| `--radius-sm` | `--radius-md` or `--radius-lg` | Current card radius is close to Pulso `lg`; review visually. |
| `--radius` | `--radius-xl` | Shell can keep larger radius; avoid adding extra rounding inside. |
| card padding | `--density-pad-card` compact derivative | Mission Control likely needs compact density. |
| row/metadata spacing | `--density-pad-row`, `--space-3`, `--space-4` | Good for ledger rows and inspector sections. |
| section spacing | `--rhythm-cadence-beat` | Good for grouping within ledger and inspector. |
| `--line` | Pulso `--border` adapted to current dark palette | Border-first structure should remain. |
| `--line-strong` | Pulso `--border-strong` adapted to current dark palette | Use for active card and side sheet edges. |
| `--violet` | Pulso `--primary` | Navigation/focus only. |
| `--critical` | Pulso destructive/critical family | Review carefully for accessibility and alarm fatigue. |
| `--review` | Pulso warning/attention family | Alerts are review prompts, not decisions. |
| `--stable` | Pulso success/stable family | Stable must still show source refs. |
| `--info` | Pulso evidence/info family | Best candidate for source refs and trace metadata. |

## Mission Control-specific gaps

Pulso does not fully answer these Mission Control semantics yet:

- `unavailable` as a neutral state, not warning/error;
- source-authority treatment for evidence refs;
- derived-lane treatment for Work Slice posture;
- review prompt vs decision distinction;
- confidence/provenance labels that avoid scoring theater;
- side-sheet inspection language for read-only evidence.

These should remain Mission Control-specific tokens or component rules until Pulso has explicit primitives for them.

## Recommended HTML pass after this

The next prototype edit can safely:

1. rename local CSS variables toward Pulso vocabulary;
2. introduce Pulso type and spacing aliases locally inside the static file;
3. keep the current dark palette unless a designer chooses a Pulso-derived dark palette;
4. preserve evidence-state colors and neutral `unavailable`;
5. avoid importing any package or external build pipeline.

## HTML alias pass applied

The first HTML pass applied this recommendation by adding local aliases inside `mission-control-static.html`:

- Pulso-inspired local type aliases: `--font-pulso-sans`, `--font-pulso-mono`, `--text-*`;
- Pulso-inspired spacing/rhythm aliases: `--space-*`, `--rhythm-cadence-*`;
- Pulso-inspired radius aliases: `--radius-md`, `--radius-lg`, `--radius-xl`;
- Mission Control semantic aliases: `--mc-surface-*`, `--mc-border*`, `--mc-text*`, `--mc-critical`, `--mc-review`, `--mc-stable`, `--mc-evidence`, `--mc-primary`;
- backward-compatible prototype tokens pointing to those aliases.

This keeps the prototype static and local while making later visual tuning easier.

## Visible tuning pass applied

A follow-up visual pass used those aliases to make the Pulso influence perceptible:

- shifted the base surface from neutral blue-black toward Pulso dark indigo;
- strengthened lavender borders and panel separation;
- made the primary accent closer to Pulso purple while keeping it out of evidence-state meaning;
- kept review, critical, stable, and evidence colors semantically distinct;
- kept `unavailable` neutral and did not turn it into a warning/error color.

This pass changes visual tone only. It does not add interaction, runtime data, or dependencies.

## Component structure tuning applied

A later prototype pass refined the component structure without adding new behavior:

- renamed the board confidence label to `Ledger confidence`;
- replaced the board/lifecycle hint with explicit source-authority language;
- made lanes feel more like ledger columns than project-management buckets;
- added a thin evidence posture rail to each Work Slice record;
- reduced selected-card treatment from a strong vertical bar to a quieter outline;
- made source refs and chips more like compact ledger metadata;
- tightened the inspector boundary note into a Pulso-like side-sheet treatment.

This keeps the same static mock data and interactions while reducing generic kanban cues.

## Non-goals

This pass does not:

- import Pulso code;
- add Tailwind;
- add fonts as a runtime dependency;
- create a shared package;
- change prototype HTML behavior;
- add backend, runtime, collector, schema, policy engine, or Adaptive Skills integration.
