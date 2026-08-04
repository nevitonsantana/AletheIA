# Governed Pilot Report

## Goal

Use a governed pilot report when a real project tests AletheIA, Adaptive Skills, a domain pack, a local overlay, or a new AI-assisted work pattern.

The report should answer one question:

**what did the pilot prove, what did it fail to prove, and what reusable change is justified?**

## When to use it

Use the template after a pilot has real evidence, such as:

- merged PRs;
- issue closeouts;
- validation runs;
- runtime smoke tests;
- negative controls;
- user or maintainer review;
- a source-backed incident or correction.

Do not use it to make an experiment look more mature than it is. If the work only installed a package or ran a compile check, record that as setup evidence, not as adoption proof.

## Template

Starter-pack template:

- `starter-pack/templates/governed-pilot-report-template.md`

The template is intentionally Markdown. It is not a schema, collector, compliance preset, autonomous loop, or dashboard contract.

## Minimum report shape

A useful pilot report should include:

1. pilot identity and decision question;
2. hypotheses and success/failure signals;
3. scope, out-of-scope items, and non-goals;
4. governance posture and human-review boundary;
5. tools, skills, overlays, and local project rules used;
6. evidence ledger with inspectable sources;
7. controls and negative tests;
8. validation performed;
9. incidents, frictions, and corrections;
10. hypothesis results;
11. reusable learning versus consumer-local residue;
12. conversion recommendation;
13. closeout.

## What counts as evidence

Prefer evidence that another maintainer can inspect:

| Evidence | Stronger than |
|---|---|
| Merged PR with diff and validation | Chat statement that a change was made |
| Live smoke with URL/run output | Local assumption that publication worked |
| Negative test result | Claim that sensitive data is excluded |
| Source commit and content hash | Unversioned copy/paste |
| Issue closeout with next gate | Memory of a conversation |

## Controls to consider

Only include controls that match the pilot.

Common controls:

- installation-only proof is not enough;
- runtime fallback must fail safely;
- restricted or technical sources must not leak;
- public distribution must not include private overlays;
- publication must be validated after merge;
- generated artifacts must be traceable to source;
- reusable learning must be separated from consumer-local rules.

## Conversion decision

A pilot does not automatically justify a new framework mechanism.

Choose the smallest justified conversion:

- no framework change;
- documentation clarification;
- starter-pack checklist;
- field case;
- governance wording refinement;
- executable validation;
- separate proposal before implementation.

When in doubt, prefer a field case or template before adding schema or runtime behavior.

## Crisis Monitor documentation pilot

The Crisis Monitor documentation work is the reference example for this template.

What the pilot tested:

- AletheIA as macro-governance for a real, safe work lane;
- Adaptive Skills as method guidance for documentation, testing, and knowledge governance;
- a private Blume source and clean public export;
- a versioned documentation snapshot for the Cris assistant;
- controls that blocked technical sources from the user-facing corpus;
- live smoke by manifest after publication.

What it proved for AletheIA:

- installation is not adoption;
- a pilot needs hypotheses, controls, inspectable evidence, and closeout;
- reusable framework learning should be extracted without absorbing consumer-local rules;
- small templates and guides can preserve learning without creating unnecessary runtime authority.

What it did not prove:

- that all documentation pilots need snapshots;
- that Ask AI or MCP should be activated by default;
- that one consumer project proves universal effectiveness;
- that AletheIA should own Adaptive Skills' method layer;
- that a report template should become a mandatory schema.

## Safe use rule

A governed pilot report improves judgment. It does not grant permission.

If the pilot touches data sensitivity, external publication, runtime behavior, or human decision authority, keep the existing AletheIA gates and local project rules in force.
