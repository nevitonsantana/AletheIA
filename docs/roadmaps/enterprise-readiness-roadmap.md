# Enterprise-Readiness / Regulated Adoption Roadmap

## Why this is now the 1.1 focus

AletheIA 1.0 closed the baseline question.

The next question is different:

**how should a reusable operating framework become more usable inside constrained, bureaucratic, or regulated environments without inflating the core?**

That is the purpose of the current 1.1 track.

This track does **not** assume that AletheIA should become a banking framework, a compliance pack, or an enterprise product.
It assumes something narrower:

- the core is now stable enough
- real projects may need stronger local operating posture
- those constraints should land in the local layer first
- the framework should become easier to adapt to those environments without pretending to encode every enterprise rule

---

## What enterprise-readiness means here

In AletheIA, enterprise-readiness should be read as:

- stronger adoption guidance for constrained environments
- clearer mapping between framework artifacts and heavier local review/gate expectations
- stronger examples of trust-boundary-aware project extension
- stronger language for what stays local versus what belongs in the framework

It does **not** mean:

- enterprise-ready by default
- finished regulated-domain packs
- built-in SDLC automation for large organizations
- a claim that one framework shape fits every enterprise environment

The goal is to improve **regulated adoption readiness**, not to turn AletheIA into a fully packaged enterprise platform.

---

## What already helps

AletheIA 1.0 already has several pieces that matter for constrained contexts.

### 1. Project extension boundary

The framework already distinguishes between:

- reusable core
- local extension

This matters because enterprise restrictions usually depend on:

- local org policy
- local approval structure
- local trust boundary
- local allowed tools and model posture
- local ownership maps

Anchor:

- `docs/project-extension-pattern.md`

### 2. Adoption modes

The framework already recognizes that not every context should start with the same operating depth.

This matters because highly constrained environments often need:

- more explicit review layers
- but also bounded introduction
- and a safer first lane instead of broad rollout

Anchor:

- `docs/adoption-mode-guidance.md`

### 3. Distribution / preset / adapter framing

The framework already separates:

- preset
- adapter
- adoption mode
- project extension boundary

This matters because constrained environments often require a specific delivery surface, not a different framework truth.

Anchor:

- `docs/distribution-presets-adapters.md`

### 4. Existing trust-boundary and governance direction

The framework already contains future-facing material related to:

- trust boundaries
- prompt-injection posture
- domain governance packs

That means enterprise-readiness does not begin from zero.
It begins from a baseline that already treats those topics as real.

Anchors:

- `docs/web-app-security-trust-boundaries.md`
- `docs/ai-agent-security-prompt-injection.md`
- `docs/domain-governance-packs.md`

### 5. Operational-composition baseline

The current operational-composition layer already helps constrained adoption through:

- stronger work-slice discipline
- risk-to-gate mapping
- handoff continuity
- advisory model strategy by trust / hosting posture

That matters because many enterprise environments need stronger reviewability long before they need more automation.

---

## What is still maturing

The 1.1 track exists because the current baseline still has real gaps, even
though the first documentation artifacts now exist.

### 1. Enterprise adoption guidance has started

The framework baseline now includes a direct guide for constrained adoption:

- `starter-pack/guides/enterprise-adoption-considerations.md`

That guide starts answering:

- how to start in a constrained environment
- how to keep the rollout bounded
- how to treat local approvals, tool restrictions, and trust boundaries

What remains is not the existence of the guide, but stronger evidence from
real constrained adoption loops.

### 2. Restricted-environment extension examples have started

AletheIA now includes a restricted enterprise project-extension example:

- `examples/project-extension/restricted-enterprise-context.md`

That example starts showing:

- what stays in the core
- what becomes local rule
- how local model/tool restrictions should be expressed

What remains is not the existence of an example, but stronger repetition across
real or realistic constrained contexts.

### 3. No stronger mapping from framework artifacts to heavier local governance

Many constrained environments need a practical mapping from:

- task brief
- risk-to-gate
- handoff
- validation
- durable decision

into a context where review and escalation are heavier than in a lightweight team.

### 4. No finished domain pack for regulated contexts

That is intentional.
But it also means the framework still needs more intermediate guidance before a regulated-domain pack would be justified.

---

## Low-regret next steps

The lowest-regret path for 1.1 is still documentation-first.

### Step 1 — enterprise adoption guidance

Started through:

- `starter-pack/guides/enterprise-adoption-considerations.md`

This guide introduces AletheIA in environments with:

- heavier approvals
- stronger review layers
- tighter trust boundaries
- allowed / restricted tool posture

### Step 2 — restricted enterprise extension example

Started through:

- `examples/project-extension/restricted-enterprise-context.md`

This example shows how a project can define a local enterprise integration
layer without contaminating the framework core.

### Step 3 — stronger trust-boundary posture in local mapping

Strengthen the language that local trust and hosting posture should be handled in:

- project extension
- local model strategy
- local tool allowlists

not in the framework core.

This step now begins with:

- `docs/local-trust-boundary-posture.md`
- `starter-pack/templates/local-trust-boundary-template.md`
- `examples/project-extension/local-trust-boundary-mapping.md`

### Step 4 — pilot in a constrained environment

Use a bounded, reviewable lane before claiming broader readiness.

That means:

- one lane
- one local extension posture
- one proof chain
- one conversion loop back into the framework if it teaches something reusable

This step now begins with:

- `docs/constrained-adoption-pilot.md`
- `examples/pilot-conversion/constrained-adoption-bounded-validation.md`
- `docs/constrained-pilot-review-checklist.md`
- `starter-pack/templates/constrained-pilot-review-template.md`

---

## Recommended boundaries for 1.1

To keep the track healthy, AletheIA 1.1 should preserve a few boundaries.

### Keep in the framework

- reusable operating guidance
- extension patterns
- reviewable examples
- trust-boundary-aware framing
- adoption guidance for constrained contexts

### Keep local to the project

- org-specific approval chains
- vendor allow / deny rules
- compliance-specific review matrices
- exact tool permissions
- exact model hosting restrictions
- branch and handoff rules tied to one team or one enterprise

### Do not do yet

- broad enterprise packaging claims
- hard-coded regulated presets as if they were universal
- CLI/bootstrap promises for constrained environments
- one-size-fits-all compliance framing

---

## Current 1.1 deliverables

This track currently begins with:

- `docs/enterprise-readiness-roadmap.md`
- `starter-pack/guides/enterprise-adoption-considerations.md`
- `examples/project-extension/restricted-enterprise-context.md`

These are meant to improve adoption posture first.
They are not meant to close the whole enterprise-readiness track.

## What follows 1.1

This track should stay focused on constrained adoption and local trust posture.
It should not become the place where AletheIA tries to solve broader resource-aware operations all at once.

The next queued track after this one is:

- `docs/resource-aware-operations-roadmap.md`

That later track should build on the 1.1 posture work, but it should solve a different problem: making context and resource use more observable, comparable, and reviewable across real runtimes and agents.
