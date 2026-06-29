# First-time user fixture — guided mode

- **Confirmed mode:** `guided`
- **Task:** correct one broken documentation reference.
- **Expected output:** one bounded diff, a valid destination path, passing repository checks and an Explainable Change Brief.

## Explanation

A **Work Slice** is one small unit of work with an explicit goal, boundary and proof. It matters here because correcting one link should not silently become a broad documentation rewrite. The slice is recorded with the starter-pack Work Slice template.

## Validation

Run `pnpm test`, `pnpm typecheck`, `pnpm check:governance` and `git diff --check`. Confirm that the destination file exists and the diff contains only the intended correction.

## Escalation

Stop and request technical or governance review if the broken link reveals an architecture, security, public-behavior or policy decision.

