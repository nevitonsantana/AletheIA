# Knowledge Governance Layer — Technical Implementation Prep

## Status

Docs-only. This document is the **implementer brief** for the Knowledge Governance
Layer (KGL). It does not add runtime behavior. It defines *what* an implementer agent
(e.g. Codex) may build, *in what order*, against *which existing contracts*, and *where
the boundary is*.

This is Phase 5 of the [KGL initiative](../adr/ADR-008-knowledge-governance-layer.md):
**Technical implementation preparation**. Phases 1–4 produced the concepts, contracts,
schemas, examples, the three governance skills, and the security hardening surface. This
phase prepares — but does not perform — the technical build.

The single most important rule for the implementer: **build the logical roles already
specified; do not invent scope.** When a contract is silent, ask; do not improvise.

> **Implementation status (2026-05-29): all six build steps below are delivered.**
> The reference engine lives in `engine/` (`loader`, `registry`, `resolver`, `context-pack`,
> `audit-log`) with an end-to-end golden in `tests/e2e/`. It stayed inside the IN/OUT
> boundary — no vector DB, IAM, DLP, UI, embeddings, or crypto entered the core. The brief
> is retained as the build's contract of record; the per-step PRs are noted in "Build order".

---

## What already exists — do not duplicate

The implementer must read these before writing anything. They are the source of truth;
code conforms to them, not the other way around.

### Concepts (mental model — `docs/concepts/`)
- [knowledge-governance-layer.md](../concepts/knowledge-governance-layer.md)
- [user-provided-knowledge.md](../concepts/user-provided-knowledge.md) — maturity levels 0–3
- [framework-capsules.md](../concepts/framework-capsules.md)
- [knowledge-resolver.md](../concepts/knowledge-resolver.md) — the resolver's inputs, decisions, outputs, refusals

### Contracts (normative — `docs/contracts/`)
- [knowledge-source-contract.md](../contracts/knowledge-source-contract.md) — required fields, taxonomy, sensitivity, authority
- [knowledge-pack-manifest.md](../contracts/knowledge-pack-manifest.md) — on-disk manifest shape
- [skill-knowledge-dependency-contract.md](../contracts/skill-knowledge-dependency-contract.md)
- [source-precedence-policy.md](../contracts/source-precedence-policy.md)
- [restricted-knowledge-usage-policy.md](../contracts/restricted-knowledge-usage-policy.md)
- [knowledge-audit-log-spec.md](../contracts/knowledge-audit-log-spec.md)
- [sensitivity-vocabulary-mapping.md](../contracts/sensitivity-vocabulary-mapping.md)

### Security surface (Phase 4 — `docs/security/`)
- [data-leakage-checklist.md](../security/data-leakage-checklist.md)
- [prompt-injection-in-sources-checklist.md](../security/prompt-injection-in-sources-checklist.md)
- [data-poisoning-checklist.md](../security/data-poisoning-checklist.md)
- [logs-and-handoffs-policy.md](../security/logs-and-handoffs-policy.md)
- [human-review-criteria.md](../security/human-review-criteria.md)

### Schemas (`schemas/`)
- `aletheia-knowledge-pack.schema.json`
- `aletheia-skill-knowledge-dependency.schema.json`
- `aletheia-context-pack.schema.json`

### Engine (`engine/`) — already started
- `loader.ts`, `types.ts`, `validation.ts` — validated loaders exist for governance packs
  and are being extended for knowledge packs and skill-knowledge dependencies. **The
  implementer extends these; it does not fork a parallel loader stack.**

### Examples (`examples/project-extension/`)
- `knowledge-pack.example.json`, `skill-knowledge-dependency.example.json`
- `knowledge-aware-context-pack.json`
- the `example-4-layers` pack (Phase 3)

### Skills (Adaptive Skills repo — do not move content into them)
- `knowledge-source-evaluation`, `knowledge-conflict-resolution`, `restricted-context-check`

---

## Scope boundaries (the acceptance gate)

This is the section that prevents over-interpretation. The implementer must treat the
two columns as binding.

### IN scope for the technical build

- **Loaders + validation.** Parse and schema-validate knowledge packs and skill-knowledge
  dependency manifests against the existing JSON Schemas. Extend `engine/loader.ts`.
- **Registry (in-memory / file-backed).** A catalogue that lists registered packs for a
  project and answers eligibility queries (`allowed_skills`, `allowed_agents`, scope,
  sensitivity ceiling). File-backed is acceptable; no database.
- **Resolver (pure function).** Implement the selection logic from
  [knowledge-resolver.md](../concepts/knowledge-resolver.md) §"Selection logic, in order"
  as a deterministic, side-effect-free function: `(task, skillDeps, registry, policies) → contextPack`.
- **Context-pack assembly.** Produce a *knowledge-aware context pack* in the shape of
  [`knowledge-aware-context-pack.json`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/project-extension/knowledge-aware-context-pack.json)
  — fields `knowledge_dependencies_resolution`, `restrictions_active`, `conflicts_detected`,
  `gaps`, `human_review`, `audit_log_entries_to_write`. This is a distinct shape from the
  generic `aletheia-context-pack.schema.json`; if a JSON Schema for it is needed, adding one
  that matches the example is IN scope, but do not bend the generic schema to cover it.
- **Audit-log writer (interface + file sink).** Emit entries per
  [knowledge-audit-log-spec.md](../contracts/knowledge-audit-log-spec.md). A pluggable
  sink with one file-based reference implementation. **Never log restricted excerpts.**
- **Refusal paths.** Return the structured refusals from the resolver concept, not generic
  errors.
- **Tests + goldens.** Unit tests per component; golden context-pack fixtures.

### OUT of scope — do not build in this phase

- ❌ Vector database, embeddings, semantic retrieval, chunking pipelines.
- ❌ Real IAM / SSO integration. Permissions are passed in as data, not resolved from a directory.
- ❌ DLP engine, secret scanning, regex PII detection as enforcement. The checklists are
  *operational guidance*, not a detector to implement here.
- ❌ Upload UI, document management, ingestion service, network endpoints.
- ❌ Fine-tuning, long-term memory, learning from past selections.
- ❌ Encryption at rest / in transit, key management.
- ❌ Any new top-level authority or sensitivity value. The taxonomies are frozen by contract.
- ❌ Company- or framework-specific rules in core. The `example-4-layers` pack is an
  *example*, not a core dependency.

If a task seems to require an OUT item, that is the signal to **stop and request scope**,
per the resolver's own refusal posture.

---

## Build order

Each step is a thin, independently testable slice. Do not start a step before the prior
step's tests are green. **All six are delivered** (PR per step noted below).

1. ✅ (#167) **Knowledge-pack loader + validation.** Extend `engine/loader.ts` with
   `loadKnowledgePack(path)` and `loadSkillKnowledgeDependency(path)`, validating against
   the existing schemas. Add types to `engine/types.ts`. *Test:* valid example loads;
   malformed manifest throws `SchemaValidationError`; non-canonical `sensitivity` rejected.

2. ✅ (#168) **Registry.** `KnowledgeRegistry` over a set of loaded packs. Methods: `list()`,
   `byType(type)`, `eligible(task, agent, user)`. Pure data in, pure data out. *Test:*
   allowlist filtering, scope filtering, sensitivity-ceiling filtering.

3. ✅ (#169) **Resolver.** Implement the 8-step selection logic and the 4 refusal conditions from
   [knowledge-resolver.md](../concepts/knowledge-resolver.md). Precedence ranking calls
   into the [source-precedence-policy](../contracts/source-precedence-policy.md) tiers.
   *Test:* required-dependency-satisfied, required-missing → refusal, capsule_first
   applied, conflict detected and resolved by precedence.

4. ✅ (#170) **Context-pack assembly.** Serialize the resolver output to a knowledge-aware context
   pack in the shape of [`knowledge-aware-context-pack.json`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/project-extension/knowledge-aware-context-pack.json)
   (`restrictions_active`, `conflicts_detected`, `gaps`, `human_review`,
   `audit_log_entries_to_write`). *Test:* output matches the example shape; restricted
   sources never carry verbatim text.

5. ✅ (#171) **Audit-log writer.** Interface + file sink emitting the required fields. *Test:* an
   entry is written for select / consult / conflict / fallback / refusal; no restricted
   excerpt appears in any entry.

6. ✅ (#172) **End-to-end golden.** One task + one skill-dependency manifest + a small registry →
   a golden context pack + a golden audit trail. *Test:* deterministic output matches
   golden.

---

## Folder structure

```text
engine/
  loader.ts                 # extend: loadKnowledgePack, loadSkillKnowledgeDependency
  types.ts                  # extend: KnowledgePack, SkillKnowledgeDependency, ContextPack
  registry.ts               # NEW — KnowledgeRegistry (file-backed)
  resolver.ts               # NEW — pure resolver function + refusal types
  context-pack.ts           # NEW — assembly from resolver output
  audit-log.ts              # NEW — writer interface + file sink

schemas/                    # already present; do not redefine, only reference
  aletheia-knowledge-pack.schema.json
  aletheia-skill-knowledge-dependency.schema.json
  aletheia-context-pack.schema.json

examples/project-extension/
  knowledge-pack.example.json              # present
  skill-knowledge-dependency.example.json  # present
  knowledge-aware-context-pack.json        # present (resolver output shape)
  resolver-trace.example.json              # NEW (optional) — a worked resolution + audit trail

tests/
  contracts/                # extend with loader cases
  resolver/                 # NEW — registry + resolver + refusal cases
  goldens/                  # extend with one e2e knowledge-resolution golden
```

No new top-level directories. No `src/`, no service scaffolding, no config framework.

---

## Minimal examples to produce

Most example artifacts already exist (see above). The implementer should add at most:

- **One resolver trace** (`examples/project-extension/resolver-trace.example.json`):
  inputs (task + skill deps + a 2–3 pack registry) → the resolved context pack → the audit
  entries. This doubles as the e2e golden's human-readable companion.
- **One refusal example** embedded in that trace or alongside it: a `required` dependency
  with no eligible source, showing the structured refusal (not a stack trace).

Do not create new proprietary or company-specific example packs. Reuse `example-4-layers`
and the generic examples.

---

## Validation checklist

Run before opening a PR. A box that cannot be checked is a scope or contract problem —
stop and surface it.

**Contract conformance**
- [ ] Every loader validates against the existing schema; no schema was modified to fit code.
- [ ] `sensitivity` accepts only the five canonical values; `authority_level` only the nine.
- [ ] Resolver selection order matches [knowledge-resolver.md](../concepts/knowledge-resolver.md) §"Selection logic, in order" exactly.
- [ ] All four resolver refusal conditions are implemented and return structured reasons.
- [ ] Precedence ranking matches [source-precedence-policy.md](../contracts/source-precedence-policy.md) tiers.

**Security posture (Phase 4 surface)**
- [ ] No restricted excerpt is ever written to a context pack, audit entry, log, or test fixture.
- [ ] Restrictions (`no_verbatim`, `no_export`, `citation_required`, masking) carry forward into the context pack, per [logs-and-handoffs-policy.md](../security/logs-and-handoffs-policy.md).
- [ ] Human-review conditions from [human-review-criteria.md](../security/human-review-criteria.md) are surfaced, not silently dropped.
- [ ] Sources are treated as data; no in-source instruction is executed (prompt-injection checklist).

**Scope discipline**
- [ ] Nothing from the OUT list was built (no DB, IAM, DLP, UI, embeddings, crypto).
- [ ] No new top-level taxonomy value, directory, or framework track.
- [ ] No company/framework-specific rule entered `engine/` or `schemas/`.

**Mechanical**
- [ ] `pnpm run check:governance` passes.
- [ ] `pnpm run test` passes (unit + golden).
- [ ] Conventional Commits, scoped `feat(engine): …` / `test(engine): …`.
- [ ] One PR; CI green; **not merged** pending human review.

---

## Implementer prompt (ready to hand off)

> You are implementing the Knowledge Governance Layer engine in AletheIA. This is a
> bounded, contract-first build. Read `docs/roadmaps/knowledge-governance-implementation-prep.md`
> and every document it links under "What already exists" before writing code.
>
> Build, in order: (1) knowledge-pack + skill-dependency loaders, (2) a file-backed
> registry, (3) a pure resolver function implementing the documented selection logic and
> refusals, (4) context-pack assembly, (5) an audit-log writer with a file sink, (6) an
> end-to-end golden. Conform to the existing JSON Schemas; do not modify a schema to fit
> your code. Extend `engine/loader.ts`/`types.ts`; do not fork a parallel loader stack.
>
> Three hard limits — violating any is a stop condition:
> 1. **No proprietary content in core.** `example-4-layers` is an example, not a dependency.
> 2. **No premature technical implementation.** No vector DB, IAM, DLP, UI, embeddings,
>    crypto, or network services. Permissions arrive as input data.
> 3. **No company-specific rules in framework core.** Keep it vendor-agnostic and
>    secure-by-default.
>
> When a contract is silent or a task seems to need an out-of-scope capability, **stop and
> ask** — return a structured request, exactly as the resolver returns structured refusals.
> Validate against the checklist in the prep doc. Open one PR, get CI green, do not merge.

---

## Acceptance criteria (plan §17 Fase 5)

- The implementer can create the files **without interpreting scope too broadly** — the
  IN/OUT table and the hard limits make the boundary explicit and testable.
- A docs-only technical plan, folder structure, references to existing markdown/yaml
  contracts, minimal examples, and a validation checklist all exist (this document).

---

## See also

- [ADR-008 — Knowledge Governance Layer](../adr/ADR-008-knowledge-governance-layer.md)
- [knowledge-resolver](../concepts/knowledge-resolver.md)
- [evolution-plan](evolution-plan.md) — why the framework compresses rather than expands
- [Security surface index](../security/README.md)
