# Advisory routing review worksheet — synthetic rehearsal

**Status:** non-normative study aid. The bounded pilot was approved in ADR-018; this worksheet
remains synthetic rehearsal, not evidence of a real pilot case.
This worksheet is not a new Work Slice, routing schema, approval record or execution instruction.

## Questions for a reviewer

Use an existing Work Slice or observation record for any actual governed decision. Attach the
experimental result as evidence; do not put a model suggestion into canonical
`selected_vehicle` or `selected_capabilities` fields.

1. **Task and sources:** What task is being considered? Which source supports each required
   capability, provider permission, availability declaration and preference?
2. **Age:** When was the inventory observed, when was it evaluated, and what maximum age was
   declared? Is it `within_window`, `stale` or `undated`? An age check does not prove health.
3. **Recommendation:** What route, if any, was suggested? Which candidates were rejected and why?
   Are alternatives subject to the same filters?
4. **Human disposition:** Accept, reject or defer the *suggestion*? Why? A reviewer may decline
   even a technically eligible route.
5. **Boundary:** What was **not** established (for example, current authorization, quality or cost)?
   Was any model, provider or tool actually invoked? For this rehearsal, the answer must be no.
6. **Next step:** Preserve the source input, freshness parameters, deterministic result and review
   rationale as references in the existing record. Do not infer outcome metrics from one decision.

## Worked synthetic example

| Review question | Example answer |
|---|---|
| Task and inventory | `task-analysis.json`; all routes and capabilities are fictional; `inventory_origin: synthetic_fixture`. |
| Freshness | No real observation exists. The separate demo's `1_000`/`3_001` millisecond values are deliberately synthetic; its result is `stale`. |
| Suggested route | Without freshness demotion: `fictional-sparrow`, with `fictional-otter` as an eligible alternative. With stale demotion: `no_eligible_route`. |
| Human disposition | **Defer.** There is no real availability or capability evidence, so no operational selection is justified. |
| Boundary | No Codex discovery, model call, provider switch, tool invocation, cost claim or quality claim. |
| Evidence reference | The synthetic fixture, `pnpm routing:demo` output, and this reviewer rationale; not a new canonical decision record. |

The distinction under study is whether a person can inspect and decline a recommendation without
mistaking it for authority. This example does not validate a real model or approve pilot use.
The [ten synthetic review rounds](ten-synthetic-review-rounds.md) extend this rehearsal across
requirements, preference, policy, availability and freshness without introducing real inputs.
