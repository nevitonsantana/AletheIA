# Migration from Crisis Monitor

This document records the operational boundary between the original Crisis Monitor
pilot and the standalone AletheIA repository.

## Current boundary

AletheIA is a standalone macro framework.
Crisis Monitor is now a consumer and field case, not the backlog or source of
truth for AletheIA evolution.

Operationally:

- Crisis Monitor product delivery is owned by the Crisis Monitor team.
- AletheIA framework evolution is owned in this repository.
- Adaptive Skills remains a separate micro-capability layer in its own
  repository.
- Pulso Design System remains a separate design-system repository.

This repository may continue to cite Crisis Monitor as a pilot because the pilot
generated real evidence.
Those references should not import Crisis Monitor's product ownership,
launch priorities, UI decisions, assistant behavior, or project-management rules
into the AletheIA core.

## Migration rule

Reusable learnings may move from Crisis Monitor into AletheIA only when they can
be expressed as framework-level guidance.

Do migrate:

- bounded operating patterns;
- restart, handoff, validation, and governance lessons;
- runtime-adapter constraints that stay project-agnostic;
- examples that make the pilot evidence understandable.

Do not migrate:

- Crisis Monitor backlog ownership;
- product roadmap commitments;
- Cris-specific assistant behavior;
- Pulso UI/design-system decisions;
- Adaptive Skills implementation details.

## Re-entry rule

Future Crisis Monitor work should affect AletheIA only through an explicit
integration issue or equivalent decision record that states:

1. what framework-level problem was found;
2. why the problem cannot stay local to Crisis Monitor;
3. what portable AletheIA concept or contract needs to change;
4. what validation proves the change remains reusable outside Crisis Monitor.

## Related external evidence

The Adaptive Skills repository keeps a matching case-study boundary in:

- `docs/crisis-monitor-case-study.md`

That document is external evidence for the macro/micro split.
It is not imported here as an AletheIA source file because Adaptive Skills has
its own repository and ownership boundary.
