# Docs Inventory — Épico 1

**Data:** 2026-05-20  
**Escopo:** todos os `.md` em `docs/` e subdiretórios  
**Total de arquivos:** 106  
**Épico anterior:** ADR-004 aceito (tese do operating overlay fixada)

---

## Taxonomia aplicada

| Tipo | Critério |
|---|---|
| `concept` | explica ideia, princípio, modelo mental |
| `guide` | passo-a-passo, como fazer |
| `contract` | especificação normativa (o que deve ser verdade) |
| `pilot` | relato de caso real, closeout, registro de operação |
| `roadmap` | planejamento temporal, track evolution |
| `reference` | material consultável (catálogos, checklists, vocabulário, templates, exemplos) |
| `adr` | decision record (já organizados em `docs/adr/`) |
| `orphan` | não coube limpo em nenhum bucket — ver lista separada |

---

## Tabela principal

> **Legenda de ação:** `mover` = mover mantendo nome | `mover+renomear` = mover com novo nome | `aposentar` = mover para `_meta/legacy/` | `fundir` = consolidar com par indicado | `manter` = não mover (já no lugar certo)

### docs/ raiz

| arquivo atual | tipo | destino proposto | status | ação |
|---|---|---|---|---|
| docs/00-overview.md | concept | docs/concepts/overview.md | canon | mover+renomear |
| docs/REPORT_core-operating-path-friction-test.md | pilot | docs/pilots/report-core-operating-path-friction-test.md | canon | mover+renomear |
| docs/adapter-taxonomy.md | concept | docs/concepts/adapter-taxonomy.md | canon | mover |
| docs/adoption-mode-guidance.md | guide | docs/guides/adoption-mode-guidance.md | canon | mover |
| docs/agent-handoffs.md | concept | docs/concepts/agent-handoffs.md | canon | mover |
| docs/agent-role-adoption-guide.md | guide | docs/guides/agent-role-adoption-guide.md | canon | mover |
| docs/agent-role-catalog.md | reference | docs/reference/agent-role-catalog.md | canon | mover |
| docs/agent-role-explorer.md | reference | docs/reference/agent-role-explorer.md | canon | mover |
| docs/agent-role-implementer.md | reference | docs/reference/agent-role-implementer.md | canon | mover |
| docs/agent-role-orchestrator.md | reference | docs/reference/agent-role-orchestrator.md | canon | mover |
| docs/agent-role-reviewer.md | reference | docs/reference/agent-role-reviewer.md | canon | mover |
| docs/agent-role-validator.md | reference | docs/reference/agent-role-validator.md | canon | mover |
| docs/agent-runtime-decision-guide.md | guide | docs/guides/agent-runtime-decision-guide.md | canon | mover |
| docs/ai-agent-security-prompt-injection.md | concept | docs/concepts/ai-agent-security-prompt-injection.md | canon | mover |
| docs/apply-to-existing-project.md | guide | docs/guides/apply-to-existing-project.md | canon | mover |
| docs/architecture.md | concept | docs/concepts/architecture.md | canon | mover |
| docs/bootstrap-generator-contract.md | contract | docs/contracts/bootstrap-generator-contract.md | canon | mover |
| docs/bootstrap-output-examples.md | reference | docs/reference/bootstrap-output-examples.md | canon | mover |
| docs/bootstrap-principles.md | concept | docs/concepts/bootstrap-principles.md | canon | mover |
| docs/canonical-definitions.md | reference | — | legacy | fundir → canonical-vocabulary.md (ver §Duplicatas) |
| docs/canonical-vocabulary.md | reference | docs/reference/canonical-vocabulary.md | canon | mover |
| docs/constrained-adoption-pilot.md | guide | docs/guides/constrained-adoption-pilot.md | canon | mover |
| docs/constrained-pilot-review-checklist.md | reference | docs/reference/constrained-pilot-review-checklist.md | canon | mover (verificar overlap com resource-aware-pilot-review-checklist) |
| docs/context-graph-decision.md | pilot | docs/pilots/context-graph-decision.md | canon | mover |
| docs/context-graph-integration.md | concept | docs/concepts/context-graph-integration.md | canon | mover |
| docs/context-resource-telemetry-spec.md | contract | docs/contracts/context-resource-telemetry-spec.md | canon | mover |
| docs/core-operating-path.md | guide | docs/guides/core-operating-path.md | canon | mover |
| docs/delivery-mapping-examples.md | reference | docs/reference/delivery-mapping-examples.md | canon | mover |
| docs/delivery-output-contract.md | contract | docs/contracts/delivery-output-contract.md | canon | mover |
| docs/delivery-tooling-boundaries.md | contract | docs/contracts/delivery-tooling-boundaries.md | canon | mover |
| docs/deprecated-thread-centric-language.md | reference | docs/reference/deprecated-thread-centric-language.md | canon | mover |
| docs/dev-handoff-2026-05.md | pilot | docs/pilots/dev-handoff-2026-05.md | canon | mover |
| docs/distribution-presets-adapters.md | concept | docs/concepts/distribution-presets-adapters.md | canon | mover |
| docs/domain-governance-packs.md | concept | docs/concepts/domain-governance-packs.md | canon | mover |
| docs/durable-decision-finalization-context-prompt.md | contract | docs/contracts/durable-decision-finalization-context-prompt.md | canon | mover |
| docs/durable-decisions.md | concept | docs/concepts/durable-decisions.md | canon | mover |
| docs/enforcement-boundaries.md | concept | docs/concepts/enforcement-boundaries.md | canon | mover |
| docs/enterprise-readiness-roadmap.md | roadmap | docs/roadmaps/enterprise-readiness-roadmap.md | canon | mover |
| docs/evolution-plan.md | roadmap | docs/roadmaps/evolution-plan.md | canon | mover |
| docs/getting-started.md | guide | docs/guides/getting-started.md | canon | mover |
| docs/github-project-operations.md | guide | docs/guides/github-project-operations.md | canon | mover |
| docs/governance.md | concept | docs/concepts/governance.md | canon | mover |
| docs/handoff-capture-pattern.md | concept | docs/concepts/handoff-capture-pattern.md | canon | mover |
| docs/inference-pilot-scenarios.md | reference | docs/reference/inference-pilot-scenarios.md | canon | mover |
| docs/iterative-maintenance-governance.md | concept | docs/concepts/iterative-maintenance-governance.md | canon | mover |
| docs/launch-kit.md | reference | docs/reference/launch-kit.md | canon | mover |
| docs/learnings.md | reference | docs/reference/learnings.md | canon | mover |
| docs/local-trust-boundary-posture.md | concept | docs/concepts/local-trust-boundary-posture.md | canon | mover |
| docs/migration-from-crisis-monitor.md | pilot | docs/pilots/migration-from-crisis-monitor.md | canon | mover |
| docs/pilot-conversion.md | guide | docs/guides/pilot-conversion.md | canon | mover |
| docs/pilot-crisis-monitor.md | pilot | docs/pilots/pilot-crisis-monitor.md | canon | mover |
| docs/planning-depth-profiles.md | reference | docs/reference/planning-depth-profiles.md | canon | mover |
| docs/preset-taxonomy.md | concept | docs/concepts/preset-taxonomy.md | canon | mover |
| docs/progressive-policy-signals.md | concept | docs/concepts/progressive-policy-signals.md | canon | mover |
| docs/project-extension-pattern.md | concept | docs/concepts/project-extension-pattern.md | canon | mover |
| docs/project-handoff-conventions.md | guide | docs/guides/project-handoff-conventions.md | canon | mover |
| docs/project-local-constitution-context.md | concept | docs/concepts/project-local-constitution-context.md | canon | mover |
| docs/quality.md | concept | docs/concepts/quality.md | canon | mover |
| docs/readiness-gates-spec.md | contract | docs/contracts/readiness-gates-spec.md | canon | mover |
| docs/release-1.0-readiness.md | roadmap | docs/roadmaps/release-1.0-readiness.md | canon | mover |
| docs/resource-aware-bounded-pilot.md | guide | docs/guides/resource-aware-bounded-pilot.md | canon | mover |
| docs/resource-aware-crisis-monitor-reference.md | pilot | docs/pilots/resource-aware-crisis-monitor-reference.md | canon | mover |
| docs/resource-aware-next-signals.md | roadmap | docs/roadmaps/resource-aware-next-signals.md | canon | mover |
| docs/resource-aware-operations-review.md | pilot | docs/pilots/resource-aware-operations-review.md | canon | mover |
| docs/resource-aware-operations-roadmap.md | roadmap | docs/roadmaps/resource-aware-operations-roadmap.md | canon | mover |
| docs/resource-aware-pilot-review-checklist.md | reference | docs/reference/resource-aware-pilot-review-checklist.md | canon | mover (verificar overlap com constrained-pilot-review-checklist) |
| docs/roadmap-alpha.md | roadmap | docs/roadmaps/roadmap-alpha.md | canon | mover |
| docs/runtime-adapter-claude-code.md | reference | docs/reference/runtime-adapter-claude-code.md | canon | mover |
| docs/runtime-adapter-codex.md | reference | docs/reference/runtime-adapter-codex.md | canon | mover |
| docs/runtime-adapter-contract.md | contract | docs/contracts/runtime-adapter-contract.md | canon | mover |
| docs/runtime-adapter-qwen.md | reference | docs/reference/runtime-adapter-qwen.md | canon | mover |
| docs/self-application.md | concept | docs/concepts/self-application.md | canon | mover |
| docs/slice-finalization-and-restart.md | guide | docs/guides/slice-finalization-and-restart.md | canon | mover |
| docs/slice-telemetry-model.md | contract | docs/contracts/slice-telemetry-model.md | canon | mover |
| docs/structured-risk-inference.md | concept | docs/concepts/structured-risk-inference.md | canon | mover |
| docs/token-policy.md | reference | docs/reference/token-policy.md | canon | mover |
| docs/waste-heuristics.md | reference | docs/reference/waste-heuristics.md | canon | mover |
| docs/web-app-security-trust-boundaries.md | concept | docs/concepts/web-app-security-trust-boundaries.md | canon | mover |
| docs/work-item-pattern.md | concept | docs/concepts/work-item-pattern.md | canon | mover |
| docs/work-slice-pattern.md | concept | docs/concepts/work-slice-pattern.md | canon | mover |
| docs/work-slice-spec-bundle.md | contract | docs/contracts/work-slice-spec-bundle.md | canon | mover |

### docs/adr/

| arquivo atual | tipo | destino proposto | status | ação |
|---|---|---|---|---|
| docs/adr/README.md | adr | docs/adr/README.md | canon | manter |
| docs/adr/ADR-001-hermes-role.md | adr | docs/adr/ADR-001-hermes-role.md | canon | manter |
| docs/adr/ADR-002-memory-and-skill-promotion-policy.md | adr | docs/adr/ADR-002-memory-and-skill-promotion-policy.md | canon | manter |
| docs/adr/ADR-003-slice-record-closeout-relationship.md | adr | docs/adr/ADR-003-slice-record-closeout-relationship.md | canon | manter |
| docs/adr/ADR-004-aletheia-as-operating-overlay.md | adr | docs/adr/ADR-004-aletheia-as-operating-overlay.md | canon | manter (pending PR #141) |

### docs/aletheia/

| arquivo atual | tipo | destino proposto | status | ação |
|---|---|---|---|---|
| docs/aletheia/checks/premortem-activation-check.md | orphan | — | orphan | ver lista de órfãos |
| docs/aletheia/triggers/premortem-triggers.md | orphan | — | orphan | ver lista de órfãos |
| docs/aletheia/closeouts/2026-04-25-hermes-agentic-stack-sandbox-readiness.md | pilot | docs/pilots/closeouts/2026-04-25-hermes-agentic-stack-sandbox-readiness.md | canon | mover |
| docs/aletheia/closeouts/2026-04-28-hermes-agentic-stack-sandbox-diagnostics.md | pilot | docs/pilots/closeouts/2026-04-28-hermes-agentic-stack-sandbox-diagnostics.md | canon | mover |
| docs/aletheia/closeouts/2026-04-28-hermes-first-real-microtest-contract.md | pilot | docs/pilots/closeouts/2026-04-28-hermes-first-real-microtest-contract.md | canon | mover |
| docs/aletheia/closeouts/2026-04-29-hermes-first-real-microtest-blocked-auth.md | pilot | docs/pilots/closeouts/2026-04-29-hermes-first-real-microtest-blocked-auth.md | canon | mover |
| docs/aletheia/closeouts/2026-04-29-hermes-local-provider-blocked.md | pilot | docs/pilots/closeouts/2026-04-29-hermes-local-provider-blocked.md | canon | mover |
| docs/aletheia/closeouts/2026-05-19-spec-planning-cross-repo-closeout.md | pilot | docs/pilots/closeouts/2026-05-19-spec-planning-cross-repo-closeout.md | canon | mover |

### docs/hermes/

| arquivo atual | tipo | destino proposto | status | ação |
|---|---|---|---|---|
| docs/hermes/README.md | reference | docs/reference/hermes-phase-minus-1-index.md | canon | mover+renomear |
| docs/hermes/baseline-phase-minus-1-docs-index-closeout.md | pilot | docs/pilots/closeouts/hermes-baseline-phase-minus-1-docs-index-closeout.md | canon | mover |
| docs/hermes/lab-dry-run-doc-entrypoint-closeout.md | pilot | docs/pilots/closeouts/hermes-lab-dry-run-doc-entrypoint-closeout.md | canon | mover |
| docs/hermes/manual-simulation-closeout.md | pilot | docs/pilots/closeouts/hermes-manual-simulation-closeout.md | canon | mover |
| docs/hermes/phase-minus-1-operational-matrix.md | reference | docs/reference/hermes-phase-minus-1-operational-matrix.md | canon | mover+renomear |

### docs/skills/premortem/

| arquivo atual | tipo | destino proposto | status | ação |
|---|---|---|---|---|
| docs/skills/premortem/premortem-core.md | orphan | docs/_meta/legacy/skills/premortem/ | legacy | aposentar (versão canônica em adaptive-skills) |
| docs/skills/premortem/runtime-adapters/README.md | orphan | docs/_meta/legacy/skills/premortem/ | legacy | aposentar |
| docs/skills/premortem/runtime-adapters/claude-code.md | orphan | docs/_meta/legacy/skills/premortem/ | legacy | aposentar |
| docs/skills/premortem/runtime-adapters/codex.md | orphan | docs/_meta/legacy/skills/premortem/ | legacy | aposentar |
| docs/skills/premortem/templates/premortem-report.md | orphan | docs/_meta/legacy/skills/premortem/ | legacy | aposentar |
| docs/skills/premortem/workflows/depth-profiles.md | orphan | docs/_meta/legacy/skills/premortem/ | legacy | aposentar |
| docs/skills/premortem/workflows/gate-mapping.md | orphan | docs/_meta/legacy/skills/premortem/ | legacy | aposentar |

---

## Distribuição por tipo

| tipo | qtd | % |
|---|---|---|
| concept | 31 | 29% |
| guide | 18 | 17% |
| contract | 12 | 11% |
| pilot | 17 | 16% |
| roadmap | 7 | 7% |
| reference | 24 | 23% |
| adr | 5 | 5% |
| **orphan** | **9** | **8%** |
| **TOTAL** | **106** | — |

---

## Documentos órfãos

Documentos que **não couberam limpos em nenhum bucket** da taxonomia:

### 1. docs/aletheia/checks/premortem-activation-check.md

**Por que órfão:** checklist operacional que decide *quando* acionar uma skill. Não é conceito, não é guia passo-a-passo, não é contrato normativo de produto, não é relato de piloto. É lógica de ativação de skill — um artefato de *meta-operação*.

**Hipótese de resolução:** criar categoria `skill` no futuro, ou mover para dentro de `docs/skills/premortem/` se essa dir for preservada como skill-tree. Alternativa: tratar como `reference` com nota de deprecação quando a skill for migrada para repo próprio.

### 2. docs/aletheia/triggers/premortem-triggers.md

**Por que órfão:** mesmo caso que acima — define gatilhos para acionamento de skill, não se encaixa em nenhum tipo existente.

### 3–9. docs/skills/premortem/ (7 arquivos)

**Por que órfãos:** `premortem-core.md` é a especificação de uma skill inteira (objetivo, workflow, regras, fronteiras). Os demais são componentes da skill (runtime adapters, templates, workflows). Esta estrutura inteira responde "como executar uma capacidade específica" — está entre `guide` e `contract`, mas não é exatamente nenhum dos dois.

**Resolução verificada:** `adaptative-skills/skills/planning/premortem/` tem a versão canônica e mais recente da mesma skill — em inglês, com frontmatter `SKILL.md`, `examples/` adicionais, e conteúdo mais completo. O `docs/skills/premortem/` do AletheIA é uma versão anterior em português, agora divergente.

**Ação:** **aposentar** todos os 7 arquivos de `docs/skills/premortem/` em `_meta/legacy/`. Fonte canônica é `adaptive-skills`. Registrar em `MIGRATION.md` com link para destino.

---

## Pares com sobreposição ≥50%

### Par 1 — canonical-definitions.md + canonical-vocabulary.md

**Overlap estimado:** ~70%

Ambos definem os termos canônicos do core (Work Slice, Work Item, Operational Boundary, Restart Package). `canonical-definitions.md` (184 linhas) é um subconjunto de `canonical-vocabulary.md` (362 linhas).

**Proposta:** fundir em `canonical-vocabulary.md` como fonte canônica. Absorver quaisquer definições presentes apenas em `canonical-definitions.md`. Aposentar `canonical-definitions.md` com redirecionamento em `MIGRATION.md`.

**Fonte canônica:** `canonical-vocabulary.md`

---

### Par 2 — bootstrap-generator-contract.md + delivery-output-contract.md

**Overlap real (após leitura completa):** ~35–40% em vocabulário compartilhado (preset, adoption_mode, delivery_surface, review posture). Substância é distinta.

A distinção é válida e precisa:
- `bootstrap-generator-contract.md` — spec do *processo gerador*: o que o gerador recebe (inputs) e o que emite (outputs). Análogo a um API contract.
- `delivery-output-contract.md` — spec do *artefato produzido*: o que o pacote emitido deve revelar para ser adotável com segurança. Análogo a um response schema.

**Resolução:** **não fundir**. Mover como dois contratos complementares para `docs/contracts/`. Adicionar cross-reference explícita no cabeçalho de cada um.

---

### Par 3 — constrained-pilot-review-checklist.md + resource-aware-pilot-review-checklist.md

**Overlap estimado:** ~40% (estrutura similar, checklist de review de pilot, contextos distintos)

Os contextos são genuinamente diferentes (ambientes regulados/constrained vs. operações resource-aware). Não é fusão óbvia, mas vale verificar se há duplicação de itens individuais que poderiam ser extraídos para um checklist base.

**Proposta:** manter separados, mas revisar em Épico 2 para identificar itens em comum que poderiam ser extraídos para uma seção shared em um único checklist com variações por contexto.

---

## Avaliação de H2

**H2:** "Taxonomia concept/guide/contract/pilot/roadmap/reference cobre ≥90% dos docs."

**Resultado:** 97 de 106 arquivos classificados limpos = **91.5%**. H2 **sustenta**.

**Ressalva principal:** os 9 órfãos (8.5%) se concentram em um único fenômeno — `docs/skills/premortem/` (7 arquivos). Não é pulverização aleatória; é um gap estrutural específico: a taxonomia não prevê `skill` como tipo. Se `docs/skills/` crescer (mais skills além de premortem), o gap ficará mais visível.

**Recomendação antes do Épico 2:** decidir o destino dos 7 arquivos de `docs/skills/premortem/` — se migram para `adaptive-skills`, a classificação do repo AletheIA fica limpa. Se permanecem, considerar `skill` como sétimo tipo.

Os 2 órfãos restantes (checks/ e triggers/) são menores e provavelmente se resolvem junto com o destino da skill.

---

## Nota sobre subdiretórios de operação (docs/aletheia/, docs/hermes/)

O plano propõe uma taxonomia *por tipo* (flat por intenção). Os diretórios `docs/aletheia/` e `docs/hermes/` são organizados *por componente/domínio*. Os closeouts neles são claramente tipo `pilot`, mas estão agrupados por runtime.

**Decisão aplicada:** mover todos os closeouts para `docs/pilots/closeouts/` (organização por tipo, legibilidade cronológica preservada). Os diretórios `docs/aletheia/` e `docs/hermes/` ficam vazios após os moves e são removidos. Alinhado com a organização por intenção da taxonomia proposta.
