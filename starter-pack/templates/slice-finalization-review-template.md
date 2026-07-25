# Slice Finalization Review

## Slice

- Project:
- Official work item:
- Slice ID:
- Related Work Item:
- Validation status:
- Handoff ref: (`not_needed` if not applicable)
- Next action:
- Resume entrypoint:

## Finalization outcome

- Finalization outcome: `continue-on-current-surface | recommend-clean-restart | review-required | not-ready`
- Reason:
- Clean execution-surface signal before next boundary: `not_needed | recommended | required`
- Operator note if a clean execution surface is required:

## User-facing closeout

Write this after the finalization outcome. It is required even when work is not
ready to close. Use plain language and do not make the reader infer completion
from a PR, a validation command, or silence.

- Plan: `complete | in review | incomplete`
- Validation: what passed, or what is still missing
- Documentation impact review: `not_needed | updated | pending | unavailable` for README, changelog, public docs/Pages, knowledge base, handoff and continuity context; name every affected surface
- Documentation and publication: `current | pending | not_applicable`, with reason
- Next action: `none` or one named action with its owner
- Continuity: `not_needed | continue_on_current_surface | use_restart_package`
- This thread may be archived: `yes | no`, with reason when `no`

## AI Fatigue Read

- Stale context risk: `low | medium | high`
- Transcript replay needed: `yes | no`
- Restart burden: `low | medium | high`
- Handoff size class: `compact | inflated | heavy`
- Redundant question risk: `low | medium | high`
- Governing context changed: `yes | no`
- Governing context refs:
- Governing context summary:

## Validation and continuity notes

- Next bounded slice starts on a clean execution surface: `yes | no`
- Runtime-local clean-start action available: `yes | no`
- What was delivered:
- Evidence:
- What was effectively proved:
- Do not reopen:
- Next official step:
- Open new execution surface: `yes | no`
- Why:
- Known constraints:
- Why the next step should stay on the current surface or restart cleanly:

## Proportional cognitive and documentation closure

- Review required: `yes | no`
- Review ref: (`not_required` if the slice meets the proportional exemption)
- Confirmed intent preserved: `yes | changed_with_confirmation | unresolved | unavailable`
- Understanding risk: `low | medium | high | critical | not_required`
- Documentation coherence: `current | update_required | conflicting | unavailable | not_required`
- Closure verdict: `proceed | add_explainable_brief | document_before_closing | human_review_required | block_closure | not_required`
- Evidence refs:

Use the [Cognitive, Intent and Documentation Closure Review](cognitive-documentation-closure-template.md) when this proportional review is required.

## Restart Package

<!-- RESTART_PACKAGE_BEGIN -->
## Context for Clean Restart
- **Project:**
- **Official Work Item:**
- **Slice ID:**
- **Related Work Item:**
- **Validation Status:**
- **Mission Focus:**
- **Resume Entrypoint:**
- **Last Boundary Summary:**
- **Do Not Reopen:**
- **Next Official Step:**
- **Open New Execution Surface:** `yes | no`
- **Why:**
- **Next Immediate Action:**
- **Known Constraints:**
- **Governing Context Refs:**
- **Governing Context Delta:**
- **User Intent:**
- **Active Decisions and Evidence Refs:**
- **Open Questions and Owners:**
- **Active Risks:**
- **Accepted Limitations:**
- **Context Intentionally Discarded:**
- **Documentation Updates Needed:**
- **Reload Required Before Acting:**
- **Validated Learnings for Next Execution:**
- **Local-History-Only Learnings:**
- **Do-Not-Reopen Decisions or Assumptions:**
- **Claims Requiring Verification Before Reuse:**
- **User-Facing Learning Explanation:**
- **Technical Review Still Required:**
<!-- RESTART_PACKAGE_END -->
