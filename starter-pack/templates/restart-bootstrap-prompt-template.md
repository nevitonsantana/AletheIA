# Restart Bootstrap Prompt

Use this template after a slice closes with `recommend-clean-restart`.

Use it only after the previous execution surface has already been abandoned for the next slice or work item.

The prompt should rely on:

- the restart package
- the next action
- the resume entrypoint
- the governing-context refs when present

It should **not** rely on transcript replay by default.

---

## Template

```text
Continue the work using only the minimum finalization context below.

Read only:
- the finalization context package below
- the resume entrypoint
- the governing-context refs listed in the package, if present

Do not replay old transcript history unless the restart package proves insufficient.

Project:
{{project_ref}}

Official work item:
{{official_work_item_ref}}

Objective:
{{next_action}}

Open a new execution surface:
{{new_execution_surface}}

Why:
{{new_execution_surface_reason}}

Resume entrypoint:
{{resume_entrypoint}}

Do not reopen:
{{do_not_reopen}}

Next official step:
{{next_official_step}}

Finalization context package:
{{restart_package_block}}

Before acting, perform the post-resume check:
- Known from the Restart Package:
- Missing or unavailable:
- Sources reloaded:
- Safe next action:
- Human or technical review still required:
```

---

## Notes

- if the restart package is not self-contained enough, fix the package rather than normalizing transcript replay
- if `Open a new execution surface = no`, keep working only if the next action still belongs to the same bounded slice
- if the package references governing-context docs, load only the minimum needed refs
- if the previous slice ended with `review-required` or `not-ready`, do not use this template yet
