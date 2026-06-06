# Agent-Computer Interface (ACI)

## What this is

ACI is the discipline of **designing tools for AI agents** with the same seriousness UX brings to
designing interfaces for people. A well-designed tool lets an agent act predictably, recover from
errors, and stay within scope.

ACI is about tool **design**. It complements — does not replace — the
[tool permission matrix](../reference/tool-permission-matrix.md), which classifies a tool's *risk
and permission*. ACI asks *is this a good tool to expose to an agent at all?*; the matrix asks
*what permission does this action require?*

## Rules for tools

A good agent tool has:

- an explicit name that reveals its consequence;
- a short, unambiguous description;
- a restricted input schema;
- a predictable output schema;
- actionable error messages (what to do next, not just what failed);
- usage examples;
- explicit states;
- idempotent behavior where possible;
- scope limits;
- confirmation for irreversible actions.

## Anti-patterns

- A tool that is too generic.
- Free-text output where a schema would do.
- An error with no recommended action.
- A name that hides the consequence.
- A tool that mixes read and write.
- A tool that performs an irreversible action without a gate.
- A tool that returns too much context.

## Relationship to the harness contract

The [Agent Harness Contract](../contracts/agent-harness-contract.md) lists `allowed_tools` with a
`permission` and `constraints`. ACI is the design quality bar those tools should meet before they
are listed. A template for documenting a single tool against this bar lives in the Adaptative Skills
repo (`templates/aci-tool-guideline.md`).

## Related

- [Agent Harness Contract](../contracts/agent-harness-contract.md)
- [Tool permission matrix](../reference/tool-permission-matrix.md)
