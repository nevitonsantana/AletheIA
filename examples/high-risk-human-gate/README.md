# AletheIA — High Risk Human Gate

## Objetivo

Este exemplo mostra um caso em que o sistema não deve apenas pedir review.

Ele deve **parar e exigir decisão humana**.

---

## Cenário

Uma pessoa pede uma mudança ampla de política de execução para workflows assistidos por IA.

Esse tipo de pedido afeta:

- governança
- segurança
- execução futura de agentes
- risco sistêmico

---

## O que este exemplo quer provar

O `AletheIA` deve deixar explícito que:

- há risco alto demais para seguir sozinho
- existe `human gate`
- a execução deve ser bloqueada antes de qualquer mutação

---

## Resultado esperado

- `decision.action = ask_human`
- `execution.status = blocked`
- `handoff.status = ready_for_validation`

---

## Arquivos deste exemplo

- `task-brief.json`
- `context-pack.json`

Os demais records são derivados pelo kernel executável.
