# AletheIA — Documentation

This directory contains all framework documentation, organized by the **intent of the reader**, not by the component or feature being described.

## How to navigate

If you want to… | Start here
---|---
Understand a concept or mental model | [`concepts/`](concepts/README.md)
Follow a step-by-step guide | [`guides/`](guides/README.md)
Read a normative specification | [`contracts/`](contracts/README.md)
See real adoption evidence or closeouts | [`pilots/`](pilots/README.md)
Track roadmap and track evolution | [`roadmaps/`](roadmaps/README.md)
Look up a reference (catalog, checklist, policy) | [`reference/`](reference/README.md)
Apply a security checklist or policy | [`security/`](security/README.md)
Read an architecture decision record | [`adr/`](adr/README.md)
See the full reading map by intent | [`index.md`](index.md)

## Structure rationale

Documents are organized by **type** (what the document does) rather than by topic or component. This makes it possible to find a document by asking "what kind of document do I need?" rather than "which feature does this belong to?"

Architecture decisions that fix boundary disputes live in [`adr/`](adr/README.md). The key decision establishing the three-layer model (product / overlay / harness) is [ADR-004](adr/ADR-004-aletheia-as-operating-overlay.md).

Migration table for links that changed during the 2026-05-20 reorganization: [`_meta/MIGRATION.md`](https://github.com/nevitonsantana/AletheIA/blob/main/docs/_meta/MIGRATION.md).
