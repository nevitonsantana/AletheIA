# Minimum Context Surface Registry Example

This example applies the [minimum registry contract](../../docs/contracts/context-surface-registry.md) to the Work Slice that introduced unavailable-first execution-pattern context in Mission Control.

It demonstrates four distinctions:

- the repository manifest is minimal and always loaded;
- the accepted execution-pattern contract is loaded on demand;
- the Adaptive Skills debugging declaration is capability-scoped and intentionally not loaded for a `feature-planning` observation;
- test output is evidence, not instruction.

The example is metadata-only. It does not copy prompts or skill content, and it does not implement a context router.

