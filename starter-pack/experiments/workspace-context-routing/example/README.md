# Workspace Context Routing Example

This example shows a small, optional filesystem layout for routing context through one bounded work area.

## Reading order

1. `GLOBAL_CONTEXT.md`
2. `WORKSPACE_CONTEXT.md`
3. `STAGE_CONTEXT.md`
4. selected files from `references/`
5. the current work artifacts in `artifacts/`
6. the continuation package in `handoffs/`

## Intent

The point is to make context loading more selective:

- global rules stay global
- workspace rules stay local to the slice
- stage instructions stay narrow
- stable references stay separate from transient outputs
- handoffs stay explicit

This is a demonstration only.
It is not a required project structure.
