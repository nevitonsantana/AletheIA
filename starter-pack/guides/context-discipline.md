# Context Discipline Guide

AletheIA treats context as a governed resource.

## Principle

Use the minimum sufficient context.

More context is not automatically better.

## Include

- the source-of-truth artifact for the task
- the smallest set of relevant files
- the rules or policies that matter for the decision
- the most recent durable learning if it changes execution

## Avoid

- dumping whole repositories into the prompt
- repeating information that already exists in durable docs
- mixing multiple tasks into the same context pack
- including files just because they are nearby

## Desired result

The context pack should make the task possible without making the task noisy.
