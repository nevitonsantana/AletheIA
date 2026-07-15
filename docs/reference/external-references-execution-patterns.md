# External references — execution patterns

External sources evaluated while designing the
[Execution Pattern Governance](../concepts/execution-pattern-governance.md) layer. This is the
**only** place where vendor-specific workflow terminology appears: these terms are external
references, never canonical AletheIA language (the canonical terms are *execution pattern*,
*execution vehicle*, *looping model*, *orchestration contract*, *pattern selection*, *loop state*,
*objective gate*, *human-led workflow*).

## Primary source

### Anthropic — "A harness for every task: dynamic workflows in Claude Code"

URL: <https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code>

How it informed the layer:

- the idea that orchestration can move out of the model and into a harness;
- named execution shapes — classify-and-act, fan-out-and-synthesize, adversarial verification,
  generate-and-filter, tournament, loop-until-done — that the
  [pattern library](../concepts/execution-pattern-library.md) abstracts;
- failure modes worth designing against: agentic laziness, self-preferential bias, goal drift;
- the cost observation that complex workflows consume more tokens and are not needed for every
  task — the root of the proportionality principle;
- the observation that workflows are useful beyond engineering.

Decision: used as an external reference only. "Dynamic workflow" is **not** internal canonical
language; the abstraction is Execution Pattern Governance.

## Secondary source

### Paweł Huryn — "Claude Dynamic Workflows (not only) for PMs: The Ultimate Guide"

URL: <https://x.com/PawelHuryn/status/2064079508689358857>

How it informed the layer:

- translating execution shapes to product, research, and PM work;
- the interviews → opportunities → score → prototypes example behind the
  [interview synthesis example](https://github.com/nevitonsantana/AletheIA/blob/main/examples/execution-patterns/interview-synthesis-pattern-selection.md);
- the principle that code can coordinate while the model judges.

Decision: used as an applied reference. The example's numbers are not treated as general
benchmarks; vendor-specific naming is not adopted.

## Tertiary source

### awesome-agent-loops

URL: <https://github.com/serenakeyitan/awesome-agent-loops>

How it informed the layer:

- the distinction between interval loops, goal-until-condition loops, and scheduled loops;
- the layering heuristic "timer outside, condition inside, skill innermost".

Decision: used as a practical inspiration library; its specific commands are not canonical
contract language.

## Evaluated, not incorporated

### OpenVera

URL: <https://github.com/Reef123/OpenVera>

Not incorporated as a structuring source in this round — insufficient consistent verification.

### Fazm

URL: <https://fazm.ai/cc>

May be evaluated in a separate round for session persistence, chat forking, handoff, and agent UI
topics.
