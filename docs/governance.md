# AletheIA — Development Governance Pack v1

## Objetivo

Este documento formaliza o primeiro `Governance Pack` do `AletheIA`.

Em linguagem simples:

se o `Decision Kernel` é o “motor mínimo”,
o `Governance Pack` é a camada que diz:

- o que é obrigatório
- o que é proibido
- o que precisa de revisão
- o que precisa de aprovação humana

---

## O que este pack é

Este é o **primeiro pack oficial de governança do AletheIA para desenvolvimento assistido por IA**.

Ele existe para transformar boas práticas em regras avaliáveis durante:

- análise
- planejamento
- execução
- validação

---

## O que este pack não é

- não é o framework inteiro
- não é um prompt
- não é o `Rule Interpreter`
- não é uma policy universal para qualquer tipo de trabalho

Ele é um **policy pack específico para software development**, dentro do guarda-chuva maior do `AletheIA`.

---

## Relação com token discipline

O `Governance Pack` diz quando o trabalho pode ou não pode seguir.

A `Token Policy` complementa isso dizendo:

- quanto contexto deve entrar
- em que momento ele deve entrar
- quando expansão de contexto é justificável

Leitura recomendada em conjunto:

- `docs/token-policy.md`
- `docs/durable-decisions.md`

---

## Por que isso importa

Sem governança explícita, a IA pode:

- expandir escopo sem perceber
- escrever sem contexto suficiente
- mudar contratos implicitamente
- pular validação
- tocar arquivos fora da fronteira

O `Governance Pack` existe para reduzir isso.

---

## Enforcement boundary

O `Governance Pack` descreve regras e expectativas.

Mas nem toda regra descrita aqui já é tecnicamente inevitável.

Para deixar isso explícito, ler em conjunto:

- `docs/enforcement-boundaries.md`

---

## Vocabulário normalizado do AletheIA

Para deixar o framework mais agnóstico, este pack usa termos mais gerais:

| Termo anterior | Termo normalizado |
|---|---|
| `SPEC` | `Source-of-Truth Artifact` |
| `Issue` | `Work Item` |
| `Backend as source of truth` | `Authoritative Layer` |
| `Allowed/forbidden files` | `Execution Scope` |

### O que esses termos significam

#### Source-of-Truth Artifact

É o artefato que define o comportamento esperado.

Pode ser:

- SPEC
- feature spec
- task brief
- architecture note
- contract doc

#### Work Item

É a unidade mínima de trabalho governável.

Idealmente, ele deve ter:

- um objetivo
- um output claro
- limites explícitos

#### Authoritative Layer

É a camada responsável pela decisão crítica final.

Se houver backend, normalmente ele cumpre esse papel.

Mas o `AletheIA` não depende do termo “backend” para existir.

O importante é:

> a validação crítica não pode ficar numa camada frágil ou não confiável.

#### Execution Scope

É a fronteira explícita da mudança.

Define:

- o que pode ser alterado
- o que não pode ser alterado
- qual tipo de operação é esperado

---

## Princípios que este pack reforça

1. clareza sobre velocidade  
2. controle sobre automação  
3. consistência sobre conveniência  
4. análise antes de escrita  
5. contrato antes de implementação  
6. validação antes de concluir  

---

## Áreas de governança cobertas

## 1. Pipeline

Garante que o trabalho passe por:

- análise
- planejamento
- execução
- validação

## 2. Scope Control

Garante:

- uma mudança por work item
- fronteiras explícitas
- proibição de expansão implícita

## 3. Context Awareness

Garante:

- leitura antes de escrita
- análise mínima antes de gerar código

## 4. Contracts

Garante:

- definição de input/output
- estabilidade de interfaces
- bloqueio de mudanças implícitas

## 5. Security

Garante:

- não expor segredos
- validação crítica na camada autoritativa
- confirmação explícita em operações sensíveis

## 6. Validation

Garante:

- validação pós-execução
- alinhamento com o artefato-fonte de verdade
- proteção contra regressão

## 7. Source-of-Truth Governance

Garante:

- atualização obrigatória quando o comportamento muda
- coerência entre código e artefato de referência

---

## Ações possíveis

O pack deve falar a mesma língua do kernel.

Por isso, suas saídas recomendadas são:

- `allow`
- `review`
- `ask_human`
- `block`

### Regra prática

- `allow` -> pode seguir
- `review` -> precisa revisão antes de seguir
- `ask_human` -> precisa decisão humana explícita
- `block` -> não pode prosseguir nesse estado

---

## Modos de enforcement

Este pack já nasce pensando em 3 modos:

- `strict`
- `balanced`
- `relaxed`

### Por que isso importa

O mesmo pack pode precisar de rigidez diferente conforme:

- criticidade do projeto
- maturidade do time
- estágio da tarefa

### Regra recomendada do alpha

No alpha do `AletheIA`, a leitura padrão deve ser:

- `strict` para regras críticas de segurança, escopo e validação
- `balanced` para desvios estruturais que ainda cabem em revisão

---

## Hooks recomendados

Este pack fica mais útil quando é avaliado em pontos claros do fluxo:

## 1. `before_execute`

Usado para impedir:

- execução sem plano
- execução sem artefato-fonte de verdade
- escrita sem análise mínima
- escopo indefinido

## 2. `after_execute`

Usado para detectar:

- desvio do plano
- mudança de contrato não declarada
- alteração fora do escopo

## 3. `before_finalize`

Usado para impedir:

- conclusão sem validação
- mismatch com o artefato-fonte de verdade
- mudança comportamental sem atualização documental

---

## Facts Model mínimo

O pack ainda não é um engine.

Para ser interpretado, ele depende de um `Facts Model`.

Em termos simples:

o sistema precisa conseguir dizer se fatos como estes são verdadeiros ou falsos:

- `analysis.performed`
- `plan.exists`
- `source_of_truth.exists`
- `scope.allowed_files_defined`
- `scope.forbidden_files_defined`
- `contracts.io_defined`
- `execution.modifies_undeclared_files`
- `execution.changes_contract`
- `validation.performed`
- `validation.spec_alignment_ok`

Sem isso, o JSON continua sendo só uma tabela de regras.

---

## Supporting artifacts recomendados

Além dos 6 contratos centrais do alpha, esta camada de governança sugere dois artefatos de apoio:

### Execution Scope

Para registrar:

- arquivos permitidos
- arquivos proibidos
- operação esperada
- fronteira declarada

### Policy Evaluation

Para registrar:

- regras avaliadas
- regras acionadas
- fatos usados
- decisão final

---

## Decisão de arquitetura importante

Este pack **não deve substituir o kernel**.

O desenho correto é:

- o `Decision Kernel` continua decidindo sobre risco, severidade, confiança e contexto
- o `Governance Pack` adiciona disciplina operacional sobre escopo, contrato, source of truth e validação

Ou seja:

> o kernel decide se algo parece seguro  
> a governança decide se algo está obedecendo o sistema de trabalho

---

## Próximo passo recomendado

Depois deste pack:

1. definir o `Facts Model` executável
2. criar o `Rule Interpreter v1`
3. gerar `Policy Trace`
4. ligar isso aos hooks:
   - `before_execute`
   - `after_execute`
   - `before_finalize`
