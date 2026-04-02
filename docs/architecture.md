# AletheIA — Core Contracts

## Objetivo

Este documento traduz a visão do `AletheIA` em contratos concretos.

Em linguagem simples: se o documento principal explica **o que o framework é**, este arquivo explica **quais peças mínimas ele precisa ter para funcionar**.

Os contratos existem para evitar ambiguidade.

Sem eles, cada tarefa, decisão, execução ou handoff pode nascer em um formato diferente — e o framework perde:

- clareza
- rastreabilidade
- comparabilidade
- reuso

---

## Leitura rápida

O alpha do `AletheIA` deve começar com **6 contratos centrais**:

1. `Task Brief`
2. `Context Pack`
3. `Decision Record`
4. `Execution Record`
5. `Handoff Record`
6. `Learning Record`

Eles representam a jornada completa do trabalho assistido por IA:

`tarefa -> contexto -> decisão -> execução -> handoff -> learning`

---

## Por que começar pelos contratos

Porque o `AletheIA` não deve nascer como um monte de automação sem espinha dorsal.

Ele precisa primeiro deixar claro:

- qual problema está sendo resolvido
- qual contexto foi usado
- qual decisão foi tomada
- o que foi executado
- como outra thread retoma
- o que foi aprendido

Isso é o que torna o framework:

- confiável
- auditável
- explicável

---

## 1. Task Brief

Define a tarefa antes da execução.

Responde:

- qual é o problema?
- qual é o objetivo?
- qual é o nível de risco?
- qual é o tipo da tarefa?
- como vamos saber se deu certo?

---

## 2. Context Pack

Define o contexto mínimo suficiente para aquela tarefa.

Responde:

- quais arquivos/docs entram?
- por que eles entram?
- o que ficou de fora?
- qual é o budget de contexto?

---

## 3. Decision Record

É o coração do `AletheIA`.

Registra:

- o que entrou
- como foi interpretado
- o que foi decidido
- por que foi decidido
- com qual risco
- com qual confiança

---

## 4. Execution Record

Registra a execução real ou mockada.

Responde:

- o que foi executado?
- por qual adapter?
- em qual branch/worktree?
- com qual resultado?
- com quais validações?

---

## 5. Handoff Record

É o contrato de retomada.

Responde:

- o que foi feito?
- o que falta?
- quais são os riscos?
- como retomar sem reler toda a conversa?

---

## 6. Learning Record

Transforma execução em aprendizado reaproveitável.

Responde:

- o que foi aprendido?
- de onde veio esse aprendizado?
- isso vira regra, teste, doc ou heurística?
- isso foi revisado ou ainda é hipótese?

---

## Artefatos de apoio à governança

Os 6 contratos centrais continuam sendo o coração do alpha.

Mas a camada de governança do `AletheIA` já indica dois artefatos de apoio que devem entrar em seguida:

### 1. Execution Scope

Ajuda a explicitar:

- arquivos permitidos
- arquivos proibidos
- tipo de operação
- fronteira da mudança

Status atual:

- contrato humano formalizado
- schema inicial criado
- tipo TypeScript criado
- helper mínimo de geração implementado

### 2. Policy Evaluation

Ajuda a registrar:

- quais regras foram avaliadas
- quais regras dispararam
- qual ação final foi produzida
- quais fatos sustentaram a decisão

Status atual:

- contrato humano formalizado
- schema inicial criado
- tipo TypeScript criado
- helper mínimo de geração implementado a partir do `Policy Trace`

Esses artefatos não substituem os 6 contratos centrais.

Eles existem para fortalecer a camada de governança e tornar o futuro `Rule Interpreter` mais auditável.

---

## Fluxo mínimo

```text
Task Brief
  ↓
Context Pack
  ↓
Decision Record
  ↓
Execution Record
  ↓
Handoff Record
  ↓
Learning Record
```

---

## Regras de qualidade

- contratos precisam ser legíveis para humano
- contratos precisam ser pequenos no alpha
- contratos precisam ser agnósticos a produto e provider
- contratos precisam ser versionáveis
- contratos precisam conversar com testes e evals

---

## Próximo passo recomendado

Depois desta fase:

1. criar exemplos mínimos dos contratos
2. montar `hello-world`
3. implementar o `Decision Kernel` mínimo em TypeScript
