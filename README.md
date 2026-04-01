# AletheIA  
**Decision Layer for AI Systems**  
_From output to decision_

## Tese

Modelos de IA geram respostas.  
Não estruturam decisão.

AletheIA define uma camada entre **output e ação**, organizando contexto, interpretação e decisão de forma explicável, rastreável e controlada.

---

## O que é

Uma decision layer para sistemas baseados em IA.

AletheIA estrutura como decisões são formadas a partir de:

- sinais (inputs, dados, eventos)
- contexto (histórico, ambiente, restrições)
- interpretação (modelos, heurísticas, regras)
- justificativa (explicabilidade)
- decisão (ação recomendada ou tomada)

---

## Problema

Sistemas de IA hoje:

- geram respostas sem contexto suficiente  
- não explicitam por que decidiram algo  
- não mantêm memória consistente  
- não oferecem rastreabilidade  
- misturam análise com decisão sem controle  

Resultado: decisões frágeis, difíceis de confiar e auditar.

---

## Abordagem

AletheIA organiza o fluxo:

Signal → Context → Interpretation → Decision → Action

E define uma camada explícita entre:

Model Output → Decision

---

## Princípios

- IA sugere. Decisão é estruturada.
- Toda decisão deve ser explicável.
- Toda ação deve ser rastreável.
- Contexto precede interpretação.
- Controle antes de automação.

---

## Arquitetura (alto nível)

/engine
compiler/      → estrutura inputs em artefatos de decisão
policy/        → regras, limites e governança
simulator/     → cenários e validação
runtime/       → execução em tempo real
debugger/      → inspeção e rastreabilidade

/adapters
codex/
claude/
goose/

/schemas
decision.schema.json

/starter-pack
docs/
features/
evals/
playbooks/

---

## O que este repositório entrega

- Estrutura base da decision layer
- Schema de decisão (alpha)
- DSL inicial
- Simulações de cenários
- Pseudo-engine para implementação
- Estratégias de memória e runtime
- Starter pack de projeto

---

## O que não está aqui

- Interface final
- integrações completas
- datasets proprietários
- modelos treinados específicos

Este projeto define **como decisões são estruturadas**, não apenas executadas.

---

## Casos de uso

- sistemas multi-agente
- copilotos e assistentes avançados
- workflows críticos com IA
- ambientes que exigem auditabilidade
- tomada de decisão sob incerteza

---

## Status

Alpha — foco em:

- coerência do modelo
- estrutura da decision layer
- base para implementação

---

## Como usar

1. Explore `/starter-pack`
2. Entenda `/schemas`
3. Implemente `/engine`
4. Rode `/simulator`
5. Integre via `/adapters`

---

## Direção

Este projeto não compete por melhores respostas.

Ele compete por:

- melhores decisões
- decisões explicáveis
- decisões confiáveis

---

## Licença

Apache 2.0

---

## Nota final

IA responde.  
AletheIA decide como decidir.
