# AletheIA — Governance Examples

## Objetivo

Esta pasta mostra exemplos mínimos do `Governance Pack` funcionando sobre fatos explícitos.

Ao contrário dos exemplos do kernel, aqui o foco não é:

- risco
- severidade
- contexto

Aqui o foco é:

- plano
- escopo
- contrato
- validação
- governança de processo

---

## Cenários iniciais

- `allow-before-execute.json`
  - tarefa bem formada, com plano e escopo claros
- `block-without-plan.json`
  - execução pedida sem plano
- `review-after-scope-expansion.json`
  - execução desviou do combinado
- `ask-human-critical-action.json`
  - ação crítica sem confirmação explícita
- `block-validation-required.json`
  - finalização bloqueada porque a validação obrigatória não aconteceu
- `block-source-of-truth-mismatch.json`
  - finalização bloqueada porque o artefato-fonte de verdade não foi atualizado

---

## O que estes exemplos querem provar

Que o `AletheIA` já consegue usar facts + rules para produzir:

- `allow`
- `review`
- `ask_human`
- `block`

com trilha explicável.
