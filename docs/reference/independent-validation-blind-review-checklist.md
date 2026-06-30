# Independent Validation Blind-Review Checklist

Use this checklist when a Work Slice needs a critic or separate reviewer before closure.

## Scope

- This is a review aid, not a runtime gate runner.
- It applies proportionally; low-risk work may rely on objective gates alone.
- It does not make model review proof or final authority.

## Checklist

- [ ] Work Slice, artifact and expectations are identified.
- [ ] Reviewer is separate from the maker, or independence is explicitly insufficient.
- [ ] Review context excludes hidden chain-of-thought, secrets and private prompts.
- [ ] Restricted sources are represented by metadata, hash, classification or authorized summary only.
- [ ] Every material finding has `source_refs`.
- [ ] Required expectations have evidence status: `proven`, `partially_proven`, `not_proven`, `not_applicable` or `unavailable`.
- [ ] `proceed` is not used while a required expectation is unproven or unavailable.
- [ ] Human review remains pending when authority, safety, sensitivity or irreversibility requires it.
- [ ] Limitations are visible in the review record.
- [ ] Audit references point back to existing AHC/AHGE, execution, decision or evidence records.

## Reviewer prompt boundary

Ask the critic to evaluate artifact, expectations, evidence and gaps. Do not ask it to infer private intent or inspect hidden actor reasoning.
