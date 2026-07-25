# User-Facing Closeout

## Purpose

Use this guide at the end of every AletheIA Work Slice so the person who asked for
the work does not need to infer whether it is finished from technical evidence,
pull-request state, or a long handoff.

This guide adds a **communication profile** to the existing finalization review.
It does not add a lifecycle, a schema, runtime automation, or a second continuity
artifact.

Use it with:

- [`slice-finalization-and-restart.md`](slice-finalization-and-restart.md)
- `starter-pack/templates/slice-finalization-review-template.md` in the repository

## When to use it

Write a user-facing closeout whenever a Work Slice reaches a decision boundary:

- a delivery is ready for review or merge;
- a plan is complete;
- validation or publication is still pending;
- work is blocked or needs human review;
- the next work must resume in a new execution surface.

Do not wait until everything is complete. A clear `not ready` message is better
than an ambiguous silence.

## Required answers

Answer these six questions in the order below:

1. **Plan:** Is the requested plan complete, in review, or incomplete?
2. **Validation:** What was checked, and did it pass?
3. **Documentation impact and publication:** Did this slice require updates to any supporting surface, and are repository docs and any requested public publication current?
4. **Next action:** Is there nothing left, or exactly what must happen next and who owns it?
5. **Continuity:** Can work stop, continue in the current execution surface, or must it use a Restart Package?
6. **Archive readiness:** May this thread be archived now?

## Copyable closeout

```markdown
## Status at a glance
- **Plan:** complete.
- **Validation:** `pnpm run docs:validate` passed.
- **Documentation impact review:** updated: README and public docs. Not needed: changelog, knowledge base and handoff. Public Pages was published and verified.
- **Documentation and publication:** current; GitHub Pages was published and verified.
- **Next action:** none.
- **Continuity:** not needed.
- **This thread may be archived:** yes.
```

When something remains, name the missing gate instead of softening it:

```markdown
## Status at a glance
- **Plan:** in review.
- **Validation:** tests passed; human approval for PR #123 is still required.
- **Documentation impact review:** pending: handoff and Restart Package must be updated if review continues in another thread. Not needed: README, changelog, knowledge base and public publication.
- **Documentation and publication:** documentation is current; publication was not requested.
- **Next action:** review and decide on PR #123 — owner: approver.
- **Continuity:** use a Restart Package if review continues in another thread.
- **This thread may be archived:** no; the PR decision is still pending.
```

## Rules

- Say `none` when there is no next action. Do not invent follow-up work.
- State publication separately from repository documentation; a merged change does
  not imply a public deploy.
- Before declaring documentation current, assess each relevant surface below. Mark
  it `not needed`, `updated`, `pending`, or `unavailable`, and give a reason for
  every non-`not needed` result:
  - README or project entrypoint;
  - changelog or release history;
  - repository documentation and public Docs/Pages;
  - project knowledge base or source index;
  - handoff and Restart Package;
  - active context, governing-context references and user-facing status.
- Link evidence when available, but put the plain-language answer first.
- If the finalization outcome is `review-required` or `not-ready`, archive
  readiness is `no`.
- If continuity is `use_restart_package`, include or link the package before ending
  the current execution surface.

## Limits

This guide does not guarantee that a runtime will display the closeout
automatically. A runtime-local adapter may make it easier to invoke, but the
operator remains responsible for providing the summary until an explicitly
authorized runtime integration exists.
