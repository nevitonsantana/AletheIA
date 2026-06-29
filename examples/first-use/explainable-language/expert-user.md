# Expert user fixture — expert mode

- **Confirmed mode:** `expert`
- **Task:** correct one broken documentation reference.
- **Expected output:** scoped diff, resolved path, green tests/typecheck/governance and clean diff check.

## Explanation

Bound the change to the stale ref; preserve source authority and avoid adjacent cleanup.

## Validation

Run `pnpm test && pnpm typecheck && pnpm check:governance && git diff --check`, then inspect scope.

## Escalation

The same stop conditions apply: architecture, security, policy or public-behavior drift requires a new reviewed slice. Expert depth does not bypass gates.

