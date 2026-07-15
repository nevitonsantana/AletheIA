# Public documentation language policy

## Decision

The official language for AletheIA public documentation is **English**.

This applies to reader-facing documentation intended for the published documentation site, including:

- getting started material;
- concepts;
- guides;
- contracts;
- reference pages;
- security checklists;
- ADR indexes and navigation labels;
- public reports that explain current documentation posture.

## Why

The published documentation should feel coherent to readers. Mixing English and Portuguese in the same public docs surface increases cognitive load and makes navigation, search and review less predictable.

## Scope boundaries

English is the target language for public documentation going forward, but historical records should not be rewritten casually.

Preserve original language unless a reviewer explicitly approves normalization for:

- historical evidence records;
- pilot closeouts;
- legacy/meta material;
- archived migration notes;
- source excerpts copied from an original context.

When a historical document needs a public-facing explanation, prefer adding a short English summary or index note instead of rewriting the record itself.

## Normalization order

Use small reviewed slices:

1. normalize public reader-facing pages first;
2. keep evidence and legacy/meta pages intact unless they block public comprehension;
3. validate links, headings and Blume output after each slice;
4. do not use automatic translation without human review.

## Non-goals

- No bulk translation in one pass.
- No automatic language classifier.
- No rewriting of source evidence without explicit review.
- No publishing automation or runtime behavior change.
