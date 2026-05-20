# Delivery Mapping Examples

## Goal

This document provides first concrete examples of how the same AletheIA meaning can be mapped across different delivery surfaces.

In simple terms:

if Alpha 6 is about distribution without core distortion,
it should show a few practical examples of how one framework concept can appear in more than one surface without changing its meaning.

---

## Why this matters

Preset taxonomy, adapter taxonomy, and adoption modes define the model.

But teams also need to see what that model looks like in practice.

Delivery mapping examples help answer questions such as:

- how does the same concept appear in a repo-native surface versus an agent instruction surface?
- what should stay semantically identical even when the wording or format changes?
- how much compression is safe before meaning starts to drift?

These examples are not implementation tooling.
They are illustrative mappings for how Alpha 6 should think.

---

## Mapping principle

A delivery mapping is healthy when:

- the same framework meaning survives across surfaces
- compression changes form without changing intent
- the canonical docs remain the reference source
- adapters stay subordinate to the framework, not the other way around

A delivery mapping is unhealthy when:

- one surface quietly changes policy or scope
- a compressed format becomes a hidden fork
- a tool-specific output starts to redefine framework truth

---

## Example 1 — Governance baseline

### Canonical repo-native meaning

The repo-native surface explains that AletheIA introduces an operating layer between output and action, with explicit governance, validation, and learnings.

### Compressed agent-instruction mapping

An agent-instruction surface might compress that into a small operational reminder such as:

- do not treat raw model output as execution authority
- respect explicit governance and validation expectations
- prefer blocking or escalation over unsafe closure

### Meaning that must remain stable

- model output does not directly become action
- governance still has blocking authority
- validation still matters before closure

### Meaning that may vary by surface

- narrative depth
- wording style
- file format
- ordering of supporting explanation

---

## Example 2 — Project extension boundary

### Canonical repo-native meaning

The repo-native docs explain that the framework core should remain reusable while project-local rules stay in a clearly separated extension layer.

### Existing-project adoption mapping

A project adoption surface might express that as:

- keep reusable framework rules in shared AletheIA surfaces
- keep local business constraints in a project extension doc
- do not silently promote local habits into framework truth

### Meaning that must remain stable

- core and local extension are distinct layers
- local rules can exist without redefining the framework
- reuse depends on that boundary staying visible

---

## Example 3 — Handoff continuity

### Canonical repo-native meaning

Alpha 4 defines a handoff as a restart package rather than a loose summary.

### Handoff adapter mapping

A handoff surface might compress that into fields such as:

- dominant frontier
- allowed files
- forbidden files
- semantic guardrails
- validation already performed
- next action

### Meaning that must remain stable

- the handoff is operational, not merely narrative
- the next agent should inherit scoped continuity, not hidden assumptions
- restart quality matters more than transcript volume

### Meaning that may vary by surface

- exact field ordering
- level of detail
- whether the artifact is rendered for humans, agents, or both

---

## Example 4 — Structured risk inference

### Canonical repo-native meaning

Alpha 5 defines structured risk inference as a selective step for higher-risk work where evidence, assumptions, unknowns, and validation gaps should be surfaced before execution.

### Review-oriented mapping

A review surface might compress that into:

- question
- evidence
- assumptions
- invariants
- risks
- suggested tests
- confidence

### Meaning that must remain stable

- inference is selective, not universal ceremony
- the artifact improves reviewability rather than pretending to formally verify correctness
- risk and validation stay linked

---

## Example 5 — Adoption mode mapping

### Canonical repo-native meaning

Alpha 6 adoption modes define Lite, Standard, and Fuller as entry postures for how much structure to introduce initially.

### Delivery mapping example

A lightweight onboarding surface might say:

- start with governance baseline, overview, and apply-to-existing-project guidance
- postpone richer handoffs and inference artifacts until they are justified

A fuller operating surface might say:

- activate the Alpha 3 adoption baseline
- use Alpha 4 handoff discipline across agent boundaries
- use Alpha 5 artifacts selectively for higher-risk work

### Meaning that must remain stable

- adoption depth changes entry posture, not framework meaning
- lighter does not mean careless
- fuller does not mean mandatory for every team

---

## Example 6 — Constrained local distribution

See:

- `examples/distribution/constrained-adoption-mapping.md`

That example shows a tangible Alpha 6 combination:

- **preset**: existing project adoption
- **adapters**: repo-native + agent instruction
- **adoption mode**: standard
- **project extension**: local constraints kept outside framework core

This helps make Alpha 6 easier to explain as plugable through local extension without claiming enterprise-readiness.

---

## What these examples should not become

These examples should not become:

- hidden normative templates for every tool
- proof that one editor should become canonical
- substitute docs for the canonical repo-native surfaces
- premature CLI or generator contracts

Their role is illustrative.
They help Alpha 6 show what safe delivery variation looks like before tooling exists.

---

## Good signs

The delivery mapping model is healthy when:

- one can move from canonical docs to compressed surfaces without losing meaning
- teams can compare surfaces and still recognize the same framework
- future tooling has examples of fidelity to preserve
- Alpha 6 stays rooted in delivery clarity rather than tool preference

---

## Suggested next reading

- `docs/distribution-presets-adapters.md`
- `docs/preset-taxonomy.md`
- `docs/adapter-taxonomy.md`
- `docs/adoption-mode-guidance.md`
- `examples/distribution/constrained-adoption-mapping.md`
- `docs/roadmap-alpha.md`
