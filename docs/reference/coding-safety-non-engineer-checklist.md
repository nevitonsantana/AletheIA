# Coding Safety Non-Engineer Review Checklist

Use this checklist before approving execution, PR creation or merge for a bounded coding Work Slice.
It is intentionally plain-language and does not replace engineering review when engineering review is
required.

## 1. Scope clarity

- [ ] I can say what this change is trying to accomplish.
- [ ] I can say what is explicitly out of scope.
- [ ] I can identify any decision the implementer is not allowed to make alone.

## 2. Evidence clarity

- [ ] The plan lists validation commands or manual checks.
- [ ] The plan says what a passing result should look like.
- [ ] Missing checks are marked as unavailable rather than silently ignored.

## 3. Drift and stop lines

- [ ] The plan lists signs that the slice is drifting.
- [ ] The plan says whether drift should tighten scope, ask a human, stop or split the slice.
- [ ] The plan blocks auto-merge/deploy unless explicitly authorized elsewhere.

## 4. Rollback or containment

- [ ] The plan says how the change can be reverted or contained.
- [ ] If rollback is unavailable, the plan explains the risk and required human review.

## 5. Merge decision

- [ ] Passing tests are treated as evidence, not as the merge decision.
- [ ] A human owner still decides whether the change is accepted.

