# AletheIA — Examples

## Objetivo

Esta pasta existe para tornar os contratos do `AletheIA` tangíveis.

Se os schemas explicam **a estrutura** e os docs explicam **a lógica**, os exemplos mostram **como tudo se parece na prática**.

---

## Estrutura atual

- `first-use/explainable-language/`
  - fixtures guided/expert e revisão de legibilidade do piloto S17, preservando os mesmos gates em diferentes profundidades

- `hello-world/`
  - fluxo mínimo de ponta a ponta
  - um exemplo para cada um dos 6 contratos centrais
- `low-confidence-review/`
  - mostra quando a execução deve parar por ambiguidade e baixa confiança
- `high-risk-human-gate/`
  - mostra quando a execução deve parar e exigir aprovação humana
- `governance/`
  - mostra como facts + governance rules produzem `allow`, `review`, `ask_human` e `block`
- `learning-from-failed-validation/`
  - mostra como uma falha de validação vira bloqueio + aprendizado reaproveitável
- `handoffs/`
  - mostra restart packages compactos para continuidade operacional entre agentes
- `work-slices/`
  - exemplos opcionais de Intent-to-Evidence que separam intenção humana, expectativas verificáveis, risco de adivinhação, evidência e reconcile sem criar lifecycle paralelo
  - revisão proporcional de fechamento para intenção preservada, entendimento humano, coerência documental e escalada técnica
  - mostra como task brief, decision, execution, handoff e learning podem compor uma unidade operacional
- `structured-risk-inference/`
  - mostra exemplos concretos de inference artifacts para risco de refactor e handoff de alto impacto
- `model-strategy/`
  - mostra routing provider-agnostic e um profile local ilustrativo para fleets mistos de modelos
- `iterative-maintenance/`
  - mostra um loop de manutenção em três rodadas com regressão escalando o gate e gerando learning reutilizável
- `pilot-conversion/`
  - mostra como uma validação real no Crisis Monitor vira endurecimento pequeno e reutilizável no framework
- `consumer-overlay-minimal/`
  - instância mínima viável do [consumer-project-overlay contract](../docs/contracts/consumer-project-overlay.md) — layout `ops/ai/` + shims Claude prontos para copiar
- `delivery/`
  - exemplo de bundle gerado revisável e seus limites de entrega
- `distribution/`
  - exemplo de mapeamento para adoção constrained/distribution
- `feature-governance/`
  - exemplos de build/kill/sunset/test para governança de valor de feature
- `goldens/`
  - fixtures canônicos para cenários de validação e governança
- `project-extension/`
  - exemplos de extensões locais, knowledge packs, trust boundaries, personas e sensitivity mapping
- `harness/`
  - Agent Harness Contracts trabalhados (per-task envelope) para debugging, testing e feature-planning
- `agent-harness/`
  - fluxo de **policy/verdict por ação** (allow/deny/require_approval) + audit record, contrastando skill operacional (debugging) vs consultiva (feature-value-governance)
- `agent-security/`
  - revisão sintética S28 de prompt injection em conteúdo recuperado, mantendo o conteúdo como evidência sem autoridade instrucional e bloqueando tool use fora do envelope
- `execution-patterns/`
  - Execution Pattern Selections trabalhadas (topologia antes da execução): CI triage (scheduled stateful loop), síntese de entrevistas (fan-out + filter), review adversarial de PRD (maker-checker) e feature value review (loops explicitamente inadmissíveis)
  - piloto real S7 de debugging governado, com skill e tools rastreadas, falha reproduzida, uma iteração, gate objetivo, orçamento explícito e revisão humana antes do merge
- `governed-loops/`
  - exemplo sintético S23 de Loop Readiness Gate com stop condition objetivo, orçamento, review capacity, drift controls e proibição explícita de scheduler/runtime
- `design-system-intelligence/`
  - exemplo sintético S24 de revisão Pulso-aware, com observações de conformidade, finding acionável e Pattern Generalization Gate sem autoridade de promoção
- `human-expertise-learning/`
  - exemplo sintético S25 que separa regras de especialista humano, limites de decisão e aprendizado evidenciado sem autoevolução
- `reference-intake/`
  - exemplo S2 de intake do pack de evolução AletheIA + Adaptive Skills, com mapeamento de camadas, decisão adapt/reference/defer/reject e guardrails contra adoção automática
- `coding-safety/`
  - exemplo S9 de plano Standard para coding seguro, declarando base state, escopo, verificação, drift, rollback, stop conditions e revisão humana
- `agent-roles/`
  - exemplo S12 que mapeia Software Engineer para `implementer` e QA/Governance Reviewer para `reviewer`, com autoridade, evidência, stop rules e handoff explícitos
- `context-surface-governance/`
  - registro mínimo de superfícies que distingue contexto persistente, carregamento sob demanda, provider de skill e evidência que não deve virar instrução
- `resource-aware-operations/`
  - exemplos da trilha 1.2 para runtime fit, policy signals, pilotos bounded, restart/finalization, adapters e observações recuperáveis
- `visual-operations/`
  - projeção sintética e somente leitura de duas Work Slices, com eventos normalizados, evidência, revisão humana, telemetria opcional e fonte restrita representada apenas por metadados
  - entrada e saídas reproduzíveis do projetor GitHub PR → Visual Operations, incluindo distinção entre evidência observada por CI e validação reportada pelo autor
  - snapshot dogfood do PR #200 usado para registrar a primeira evidência real de uso da Visual Operations no próprio AletheIA
  - snapshot dogfood do PR #201 usado como segunda evidência real e confirmação de que não há threshold para nova infraestrutura
  - registro real e não sensível de `feature-planning` usado para provar a primeira esteira AletheIA + Adaptive Skills no Resource Observatory
  - evento sintético S22 para `lean-implementation`, mostrando skill activation como evidência read-only sem autoridade sobre gates ou decisões
  - segundo piloto real da PR #195, gerado e verificável pelo CLI local com `--check`
  - exemplos estáticos de cards do cockpit para revisar estados visuais antes de qualquer UI
  - composição estática de board com lanes, contagens e exceções antes de wireframe/UI
- `independent-validation/`
  - caso sintético S21 para critic context, evidence-to-expectation gate e validation review record, mantendo evidência indisponível como `unavailable` e sem transformar LLM review em prova
- `work-observatory/`
  - primeiro `work_record` derivado do piloto S7, conectando executor, skills, tools, gate, resultado e revisão sem inventar duração, custo, aceitação, retrabalho, work units ou valor
  - segundo `work_record` derivado do piloto S12, registrando reconciliação de papéis, artefatos, gate e revisão humana sem ativar métricas comparativas
  - terceiro `work_record` derivado da S25, registrando contrato, templates, exemplo e gate de aprendizado evidenciado sem autoevolução
  - quarto `work_record` derivado da S21, registrando validação independente, checklist, template, exemplo e gate sem transformar crítica em prova
  - quinto `work_record` derivado da S23, registrando loop readiness, stop conditions, review capacity e drift controls sem ativar scheduler/runtime
  - review de prontidão comparativa que mantém S18 bloqueada apesar de cinco registros totais, por falta de um `comparison_group` estável
  - wireframe leve/documental do Mission Control, com direção visual e hierarquia de tela
  - mock visual versionado do Mission Control, escolhendo Trace Room + Evidence Desk como direção inicial
  - mock visual refinado de tela única, agora tratado como precursor visual
  - protótipo frontend estático e read-only do Mission Control com mock data, aceito como Evidence Ledger + Inspector full-browser
  - roteiro de iteração visual do protótipo, preservando read-only e source authority

---

## Regra de uso

Os exemplos do alpha devem ser:

- pequenos
- legíveis
- agnósticos a domínio
- fáceis de adaptar para outros projetos

---

## Estado atual

O alpha agora já cobre:

- `allow`
- `review`
- `ask_human`
- `block`
- `block + learning`
- work-slice composition across existing contracts
- compact operational handoff examples
- risk-to-gate posture examples
- optional filesystem-context-routing experimentation
- examples of structured risk inference for bounded semantic-risk scenarios
- advisory-only model-strategy examples for task-to-model-fit guidance
- iterative maintenance examples where regression changes the round gate instead of remaining only a final observation
- pilot-conversion examples where real-world validation becomes a smaller framework improvement instead of core inflation
- slice-finalization examples where restart packages reduce AI Fatigue without depending on transcript replay
- clean-restart adapter examples where slash-command style delivery stays local to the adapter instead of becoming framework truth

Together, these newer examples make the repo more practical in three directions:

- how to choose model fit without making vendor choice part of the core
- how to carry maintenance work across rounds without treating regression as a purely final metric
- how to convert real pilot evidence into small reusable framework changes
