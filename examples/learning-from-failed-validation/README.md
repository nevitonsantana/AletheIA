# AletheIA — Learning from Failed Validation

## Objetivo

Este exemplo mostra um caso em que a execução não pode ser encerrada com sucesso porque a validação falhou.

O foco aqui não é só bloquear.

O foco é mostrar que o `AletheIA` também consegue transformar essa falha em aprendizado reaproveitável.

---

## Cenário

Uma tarefa foi executada, mas:

- a validação obrigatória não foi concluída
- o fechamento foi bloqueado
- o sistema precisa registrar o que essa falha ensinou

---

## O que este exemplo quer provar

O `AletheIA` deve conseguir:

- bloquear a finalização
- gerar `Policy Evaluation`
- produzir um `Learning Record` útil a partir da falha

---

## Resultado esperado

- `before_finalize -> block`
- `learning.learning_type = test_gap`
- `learning.review.status = accepted`

---

## Arquivos deste exemplo

- `facts.json`
- `learning-record.json`
